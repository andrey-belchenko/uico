/**
 * DevExtreme (esm/__internal/grids/pivot_grid/m_widget_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../../../core/dom_adapter";
import coreAjaxUtils from "../../../core/utils/ajax";
import callOnce from "../../../core/utils/call_once";
import {
    compileGetter
} from "../../../core/utils/data";
import {
    Deferred,
    when
} from "../../../core/utils/deferred";
import {
    extend
} from "../../../core/utils/extend";
import {
    each,
    map
} from "../../../core/utils/iterator";
import {
    isDefined,
    isNumeric,
    type
} from "../../../core/utils/type";
import ArrayStore from "../../../data/array_store";
import {
    DataSource
} from "../../../data/data_source/data_source";
import formatHelper from "../../../format_helper";
import localizationDate from "../../../localization/date";
import {
    CLASSES
} from "./const";
const setFieldProperty = function(field, property, value, isInitialization) {
    const initProperties = field._initProperties = field._initProperties || {};
    const initValue = isInitialization ? value : field[property];
    const needInitProperty = !Object.prototype.hasOwnProperty.call(initProperties, property) || isInitialization;
    if (needInitProperty && "_initProperties" !== property) {
        initProperties[property] = initValue
    }
    field[property] = value
};

function sendRequest(options) {
    return coreAjaxUtils.sendRequest(options)
}
let foreachTreeAsyncDate = new Date;

function createForeachTreeFunc(isAsync) {
    const foreachTreeFunc = function(items, callback, parentAtFirst, members, index, isChildrenProcessing) {
        members = members || [];
        items = items || [];
        let i;
        let deferred;
        index = index || 0;

        function createForeachTreeAsyncHandler(deferred, i, isChildrenProcessing) {
            when(foreachTreeFunc(items, callback, parentAtFirst, members, i, isChildrenProcessing)).done(deferred.resolve)
        }
        for (i = index; i < items.length; i += 1) {
            if (isAsync && i > index && i % 1e4 === 0 && new Date - foreachTreeAsyncDate >= 300) {
                foreachTreeAsyncDate = new Date;
                deferred = new Deferred;
                createForeachTreeAsyncHandler(deferred, i, false);
                return deferred
            }
            const item = items[i];
            if (!isChildrenProcessing) {
                members.unshift(item);
                if (parentAtFirst && false === callback(members, i)) {
                    return
                }
                if (item.children) {
                    const childrenDeferred = foreachTreeFunc(item.children, callback, parentAtFirst, members);
                    if (isAsync && childrenDeferred) {
                        deferred = new Deferred;
                        childrenDeferred.done(createForeachTreeAsyncHandler(deferred, i, true));
                        return deferred
                    }
                }
            }
            isChildrenProcessing = false;
            if (!parentAtFirst && false === callback(members, i)) {
                return
            }
            members.shift();
            if (items[i] !== item) {
                i -= 1
            }
        }
        return
    };
    return foreachTreeFunc
}
const foreachTree = createForeachTreeFunc(false);
const foreachTreeAsync = createForeachTreeFunc(true);

function findField(fields, id) {
    if (fields && isDefined(id)) {
        for (let i = 0; i < fields.length; i += 1) {
            const field = fields[i];
            if (field.name === id || field.caption === id || field.dataField === id || field.index === id) {
                return i
            }
        }
    }
    return -1
}

function formatValue(value, options) {
    const valueText = value === value && formatHelper.format(value, options.format);
    const formatObject = {
        value: value,
        valueText: valueText || ""
    };
    return options.customizeText ? options.customizeText.call(options, formatObject) : formatObject.valueText
}

function getCompareFunction(valueSelector) {
    return function(a, b) {
        let result = 0;
        const valueA = valueSelector(a);
        const valueB = valueSelector(b);
        const aIsDefined = isDefined(valueA);
        const bIsDefined = isDefined(valueB);
        if (aIsDefined && bIsDefined) {
            if (valueA > valueB) {
                result = 1
            } else if (valueA < valueB) {
                result = -1
            }
        }
        if (aIsDefined && !bIsDefined) {
            result = 1
        }
        if (!aIsDefined && bIsDefined) {
            result = -1
        }
        return result
    }
}

function createPath(items) {
    const result = [];
    for (let i = items.length - 1; i >= 0; i -= 1) {
        result.push(items[i].key || items[i].value)
    }
    return result
}

function foreachDataLevel(data, callback, index, childrenField) {
    index = index || 0;
    childrenField = childrenField || "children";
    if (data.length) {
        callback(data, index)
    }
    for (let i = 0; i < data.length; i += 1) {
        const item = data[i];
        if (item[childrenField] && item[childrenField].length) {
            foreachDataLevel(item[childrenField], callback, index + 1, childrenField)
        }
    }
}

function mergeArraysByMaxValue(values1, values2) {
    const result = [];
    for (let i = 0; i < values1.length; i += 1) {
        result.push(Math.max(values1[i] || 0, values2[i] || 0))
    }
    return result
}

function getExpandedLevel(options, axisName) {
    const dimensions = options[axisName];
    let expandLevel = 0;
    const expandedPaths = ("columns" === axisName ? options.columnExpandedPaths : options.rowExpandedPaths) || [];
    if (options.headerName === axisName) {
        expandLevel = options.path.length
    } else if (options.headerName && options.headerName !== axisName && options.oppositePath) {
        expandLevel = options.oppositePath.length
    } else {
        each(expandedPaths, ((_, path) => {
            expandLevel = Math.max(expandLevel, path.length)
        }))
    }
    while (dimensions[expandLevel + 1] && dimensions[expandLevel].expanded) {
        expandLevel += 1
    }
    return expandLevel
}

function createGroupFields(item) {
    return map(["year", "quarter", "month"], ((value, index) => extend({}, item, {
        groupInterval: value,
        groupIndex: index
    })))
}

function parseFields(dataSource, fieldsList, path, fieldsDataType) {
    const result = [];
    Object.keys(fieldsList || []).forEach((field => {
        if (field && field.startsWith("__")) {
            return
        }
        let dataIndex = 1;
        const currentPath = path.length ? `${path}.${field}` : field;
        let dataType = fieldsDataType[currentPath];
        const getter = compileGetter(currentPath);
        let value = fieldsList[field];
        let items;
        while (!isDefined(value) && dataSource[dataIndex]) {
            value = getter(dataSource[dataIndex]);
            dataIndex += 1
        }
        if (!dataType && isDefined(value)) {
            dataType = type(value)
        }
        items = [{
            dataField: currentPath,
            dataType: dataType,
            groupName: "date" === dataType ? field : void 0,
            groupInterval: void 0,
            displayFolder: path
        }];
        if ("date" === dataType) {
            items = items.concat(createGroupFields(items[0]))
        } else if ("object" === dataType) {
            items = parseFields(dataSource, value, currentPath, fieldsDataType)
        }
        result.push.apply(result, items)
    }));
    return result
}

function discoverObjectFields(items, fields) {
    const fieldsDataType = getFieldsDataType(fields);
    return parseFields(items, items[0], "", fieldsDataType)
}

function getFieldsDataType(fields) {
    const result = {};
    each(fields, ((_, field) => {
        result[field.dataField] = result[field.dataField] || field.dataType
    }));
    return result
}
const DATE_INTERVAL_FORMATS = {
    month: value => localizationDate.getMonthNames()[value - 1],
    quarter: value => localizationDate.format(new Date(2e3, 3 * value - 1), "quarter"),
    dayOfWeek: value => localizationDate.getDayNames()[value]
};

function setDefaultFieldValueFormatting(field) {
    if ("date" === field.dataType) {
        if (!field.format) {
            setFieldProperty(field, "format", DATE_INTERVAL_FORMATS[field.groupInterval])
        }
    } else if ("number" === field.dataType) {
        const groupInterval = isNumeric(field.groupInterval) && field.groupInterval > 0 && field.groupInterval;
        if (groupInterval && !field.customizeText) {
            setFieldProperty(field, "customizeText", (formatObject => {
                const secondValue = formatObject.value + groupInterval;
                const secondValueText = formatHelper.format(secondValue, field.format);
                return formatObject.valueText && secondValueText ? `${formatObject.valueText} - ${secondValueText}` : ""
            }))
        }
    }
}

function getFiltersByPath(fields, path) {
    const result = [];
    path = path || [];
    for (let i = 0; i < path.length; i += 1) {
        result.push(extend({}, fields[i], {
            groupIndex: null,
            groupName: null,
            filterType: "include",
            filterValues: [path[i]]
        }))
    }
    return result
}
const storeDrillDownMixin = {
    createDrillDownDataSource(descriptions, params) {
        const items = this.getDrillDownItems(descriptions, params);

        function createCustomStoreMethod(methodName) {
            return function(options) {
                let d;
                if (undefined) {
                    d = undefined[methodName](options)
                } else {
                    d = new Deferred;
                    when(items).done((data => {
                        const arrayStore = new ArrayStore(data);
                        arrayStore[methodName](options).done(d.resolve).fail(d.reject)
                    })).fail(d.reject)
                }
                return d
            }
        }
        const dataSource = new DataSource({
            load: createCustomStoreMethod("load"),
            totalCount: createCustomStoreMethod("totalCount"),
            key: this.key()
        });
        return dataSource
    }
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
const getScrollbarWidth = containerElement => containerElement.offsetWidth - containerElement.clientWidth;
const calculateScrollbarWidth = callOnce((() => {
    const document = domAdapter.getDocument();
    document.body.insertAdjacentHTML("beforeend", `<div class="${CLASSES.scrollBarMeasureElement}"></div>`);
    const scrollbar = document.body.lastElementChild;
    const scrollbarWidth = getScrollbarWidth(scrollbar);
    if (scrollbar) {
        document.body.removeChild(scrollbar)
    }
    return scrollbarWidth
}));
export default {
    setFieldProperty: setFieldProperty,
    sendRequest: sendRequest,
    foreachTree: foreachTree,
    foreachTreeAsync: foreachTreeAsync,
    findField: findField,
    formatValue: formatValue,
    getCompareFunction: getCompareFunction,
    createPath: createPath,
    foreachDataLevel: foreachDataLevel,
    mergeArraysByMaxValue: mergeArraysByMaxValue,
    getExpandedLevel: getExpandedLevel,
    discoverObjectFields: discoverObjectFields,
    getFieldsDataType: getFieldsDataType,
    setDefaultFieldValueFormatting: setDefaultFieldValueFormatting,
    getFiltersByPath: getFiltersByPath,
    storeDrillDownMixin: storeDrillDownMixin,
    capitalizeFirstLetter: capitalizeFirstLetter,
    getScrollbarWidth: getScrollbarWidth,
    calculateScrollbarWidth: calculateScrollbarWidth
};
export {
    calculateScrollbarWidth,
    capitalizeFirstLetter,
    createPath,
    discoverObjectFields,
    findField,
    foreachDataLevel,
    foreachTree,
    foreachTreeAsync,
    formatValue,
    getCompareFunction,
    getExpandedLevel,
    getFieldsDataType,
    getFiltersByPath,
    getScrollbarWidth,
    mergeArraysByMaxValue,
    sendRequest,
    setDefaultFieldValueFormatting,
    setFieldProperty,
    storeDrillDownMixin
};
