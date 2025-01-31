/**
 * DevExtreme (esm/data/odata/query_adapter.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isFunction
} from "../../core/utils/type";
import {
    each
} from "../../core/utils/iterator";
import config from "../../core/config";
import {
    extend
} from "../../core/utils/extend";
import queryAdapters from "../query_adapters";
import {
    sendRequest,
    generateSelect,
    generateExpand,
    serializeValue,
    convertPrimitiveValue,
    serializePropName
} from "./utils";
import {
    errors
} from "../errors";
import {
    isConjunctiveOperator,
    normalizeBinaryCriterion,
    isUnaryOperation
} from "../utils";
const DEFAULT_PROTOCOL_VERSION = 4;
const STRING_FUNCTIONS = ["contains", "notcontains", "startswith", "endswith"];
const compileCriteria = (() => {
    let protocolVersion;
    let forceLowerCase;
    let fieldTypes;
    const createBinaryOperationFormatter = op => (prop, val) => `${prop} ${op} ${val}`;
    const createStringFuncFormatter = (op, reverse) => (prop, val) => {
        const bag = [op, "("];
        if (forceLowerCase) {
            prop = -1 === prop.indexOf("tolower(") ? `tolower(${prop})` : prop;
            val = val.toLowerCase()
        }
        if (reverse) {
            bag.push(val, ",", prop)
        } else {
            bag.push(prop, ",", val)
        }
        bag.push(")");
        return bag.join("")
    };
    const formatters = {
        "=": createBinaryOperationFormatter("eq"),
        "<>": createBinaryOperationFormatter("ne"),
        ">": createBinaryOperationFormatter("gt"),
        ">=": createBinaryOperationFormatter("ge"),
        "<": createBinaryOperationFormatter("lt"),
        "<=": createBinaryOperationFormatter("le"),
        startswith: createStringFuncFormatter("startswith"),
        endswith: createStringFuncFormatter("endswith")
    };
    const formattersV2 = extend({}, formatters, {
        contains: createStringFuncFormatter("substringof", true),
        notcontains: createStringFuncFormatter("not substringof", true)
    });
    const formattersV4 = extend({}, formatters, {
        contains: createStringFuncFormatter("contains"),
        notcontains: createStringFuncFormatter("not contains")
    });
    const compileBinary = criteria => {
        var _fieldTypes;
        criteria = normalizeBinaryCriterion(criteria);
        const op = criteria[1];
        const fieldName = criteria[0];
        const fieldType = fieldTypes && fieldTypes[fieldName];
        if (fieldType && (name = op, STRING_FUNCTIONS.some((funcName => funcName === name))) && "String" !== fieldType) {
            throw new errors.Error("E4024", op, fieldName, fieldType)
        }
        var name;
        const formatters = 4 === protocolVersion ? formattersV4 : formattersV2;
        const formatter = formatters[op.toLowerCase()];
        if (!formatter) {
            throw errors.Error("E4003", op)
        }
        let value = criteria[2];
        if (null !== (_fieldTypes = fieldTypes) && void 0 !== _fieldTypes && _fieldTypes[fieldName]) {
            value = convertPrimitiveValue(fieldTypes[fieldName], value)
        }
        return formatter(serializePropName(fieldName), serializeValue(value, protocolVersion))
    };
    const compileGroup = criteria => {
        const bag = [];
        let groupOperator;
        let nextGroupOperator;
        each(criteria, (function(index, criterion) {
            if (Array.isArray(criterion)) {
                if (bag.length > 1 && groupOperator !== nextGroupOperator) {
                    throw new errors.Error("E4019")
                }
                bag.push(`(${compileCore(criterion)})`);
                groupOperator = nextGroupOperator;
                nextGroupOperator = "and"
            } else {
                nextGroupOperator = isConjunctiveOperator(this) ? "and" : "or"
            }
        }));
        return bag.join(` ${groupOperator} `)
    };
    const compileCore = criteria => {
        if (Array.isArray(criteria[0])) {
            return compileGroup(criteria)
        }
        if (isUnaryOperation(criteria)) {
            return (criteria => {
                const op = criteria[0];
                const crit = compileCore(criteria[1]);
                if ("!" === op) {
                    return `not (${crit})`
                }
                throw errors.Error("E4003", op)
            })(criteria)
        }
        return compileBinary(criteria)
    };
    return (criteria, version, types, filterToLower) => {
        fieldTypes = types;
        forceLowerCase = filterToLower ?? config().oDataFilterToLower;
        protocolVersion = version;
        return compileCore(criteria)
    }
})();
const createODataQueryAdapter = queryOptions => {
    let _sorting = [];
    const _criteria = [];
    const _expand = queryOptions.expand;
    let _select;
    let _skip;
    let _take;
    let _countQuery;
    const _oDataVersion = queryOptions.version || 4;
    const hasSlice = () => _skip || void 0 !== _take;
    const hasFunction = criterion => {
        for (let i = 0; i < criterion.length; i++) {
            if (isFunction(criterion[i])) {
                return true
            }
            if (Array.isArray(criterion[i]) && hasFunction(criterion[i])) {
                return true
            }
        }
        return false
    };
    const requestData = () => {
        const result = {};
        if (!_countQuery) {
            if (_sorting.length) {
                result.$orderby = _sorting.join(",")
            }
            if (_skip) {
                result.$skip = _skip
            }
            if (void 0 !== _take) {
                result.$top = _take
            }
            result.$select = generateSelect(_oDataVersion, _select) || void 0;
            result.$expand = generateExpand(_oDataVersion, _expand, _select) || void 0
        }
        if (_criteria.length) {
            const criteria = _criteria.length < 2 ? _criteria[0] : _criteria;
            const fieldTypes = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.fieldTypes;
            const filterToLower = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.filterToLower;
            result.$filter = compileCriteria(criteria, _oDataVersion, fieldTypes, filterToLower)
        }
        if (_countQuery) {
            result.$top = 0
        }
        if (queryOptions.requireTotalCount || _countQuery) {
            if (4 !== _oDataVersion) {
                result.$inlinecount = "allpages"
            } else {
                result.$count = "true"
            }
        }
        return result
    };
    return {
        optimize: tasks => {
            let selectIndex = -1;
            for (let i = 0; i < tasks.length; i++) {
                if ("select" === tasks[i].name) {
                    selectIndex = i;
                    break
                }
            }
            if (selectIndex < 0 || !isFunction(tasks[selectIndex].args[0])) {
                return
            }
            const nextTask = tasks[1 + selectIndex];
            if (!nextTask || "slice" !== nextTask.name) {
                return
            }
            tasks[1 + selectIndex] = tasks[selectIndex];
            tasks[selectIndex] = nextTask
        },
        exec: url => sendRequest(_oDataVersion, {
            url: url,
            params: extend(requestData(), null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.params)
        }, {
            beforeSend: queryOptions.beforeSend,
            jsonp: queryOptions.jsonp,
            withCredentials: queryOptions.withCredentials,
            countOnly: _countQuery,
            deserializeDates: queryOptions.deserializeDates,
            fieldTypes: queryOptions.fieldTypes,
            isPaged: isFinite(_take)
        }),
        multiSort(args) {
            let rules;
            if (hasSlice()) {
                return false
            }
            for (let i = 0; i < args.length; i++) {
                const getter = args[i][0];
                const desc = !!args[i][1];
                let rule;
                if ("string" !== typeof getter) {
                    return false
                }
                rule = serializePropName(getter);
                if (desc) {
                    rule += " desc"
                }
                rules = rules || [];
                rules.push(rule)
            }
            _sorting = rules
        },
        slice(skipCount, takeCount) {
            if (hasSlice()) {
                return false
            }
            _skip = skipCount;
            _take = takeCount
        },
        filter(criterion) {
            if (hasSlice()) {
                return false
            }
            if (!Array.isArray(criterion)) {
                criterion = [].slice.call(arguments)
            }
            if (hasFunction(criterion)) {
                return false
            }
            if (_criteria.length) {
                _criteria.push("and")
            }
            _criteria.push(criterion)
        },
        select(expr) {
            if (_select || isFunction(expr)) {
                return false
            }
            if (!Array.isArray(expr)) {
                expr = [].slice.call(arguments)
            }
            _select = expr
        },
        count: () => _countQuery = true
    }
};
queryAdapters.odata = createODataQueryAdapter;
export const odata = createODataQueryAdapter;
