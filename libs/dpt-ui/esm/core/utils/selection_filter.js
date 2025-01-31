/**
 * DevExtreme (esm/core/utils/selection_filter.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getKeyHash,
    equalByValue
} from "./common";
import {
    isString,
    isObject
} from "./type";
import {
    compileGetter
} from "./data";
export const SelectionFilterCreator = function(selectedItemKeys, isSelectAll) {
    this.getLocalFilter = function(keyGetter, equalKeys, equalByReference, keyExpr) {
        equalKeys = void 0 === equalKeys ? equalByValue : equalKeys;
        return functionFilter.bind(this, equalKeys, keyGetter, equalByReference, keyExpr)
    };
    this.getExpr = function(keyExpr) {
        if (!keyExpr) {
            return
        }
        let filterExpr;
        selectedItemKeys.forEach((function(key, index) {
            filterExpr = filterExpr || [];
            let filterExprPart;
            if (index > 0) {
                filterExpr.push(isSelectAll ? "and" : "or")
            }
            if (isString(keyExpr)) {
                filterExprPart = getFilterForPlainKey(keyExpr, key)
            } else {
                filterExprPart = function(keyExpr, itemKeyValue) {
                    const filterExpr = [];
                    for (let i = 0, length = keyExpr.length; i < length; i++) {
                        const currentKeyExpr = keyExpr[i];
                        const keyValueGetter = compileGetter(currentKeyExpr);
                        const currentKeyValue = itemKeyValue && keyValueGetter(itemKeyValue);
                        const filterExprPart = getFilterForPlainKey(currentKeyExpr, currentKeyValue);
                        if (!filterExprPart) {
                            break
                        }
                        if (i > 0) {
                            filterExpr.push(isSelectAll ? "or" : "and")
                        }
                        filterExpr.push(filterExprPart)
                    }
                    return filterExpr
                }(keyExpr, key)
            }
            filterExpr.push(filterExprPart)
        }));
        if (filterExpr && 1 === filterExpr.length) {
            filterExpr = filterExpr[0]
        }
        return filterExpr
    };
    this.getCombinedFilter = function(keyExpr, dataSourceFilter) {
        let forceCombinedFilter = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
        const filterExpr = this.getExpr(keyExpr);
        let combinedFilter = filterExpr;
        if ((forceCombinedFilter || isSelectAll) && dataSourceFilter) {
            if (filterExpr) {
                combinedFilter = [];
                combinedFilter.push(filterExpr);
                combinedFilter.push(dataSourceFilter)
            } else {
                combinedFilter = dataSourceFilter
            }
        }
        return combinedFilter
    };
    let selectedItemKeyHashesMap;
    const getSelectedItemKeyHashesMap = function(keyOf, keyExpr) {
        if (!selectedItemKeyHashesMap) {
            selectedItemKeyHashesMap = {};
            const normalizedKeys = normalizeKeys(selectedItemKeys, keyOf, keyExpr);
            for (let i = 0; i < normalizedKeys.length; i++) {
                selectedItemKeyHashesMap[getKeyHash(normalizedKeys[i])] = true
            }
        }
        return selectedItemKeyHashesMap
    };
    const normalizeKeys = function(keys, keyOf, keyExpr) {
        return Array.isArray(keyExpr) ? keys.map((key => keyOf(key))) : keys
    };

    function functionFilter(equalKeys, keyOf, equalByReference, keyExpr, item) {
        const key = keyOf(item);
        let keyHash;
        let i;
        if (!equalByReference) {
            keyHash = getKeyHash(key);
            if (!isObject(keyHash)) {
                const selectedKeyHashesMap = getSelectedItemKeyHashesMap(keyOf, keyExpr);
                if (selectedKeyHashesMap[keyHash]) {
                    return !isSelectAll
                }
                return !!isSelectAll
            }
        }
        for (i = 0; i < selectedItemKeys.length; i++) {
            if (equalKeys(selectedItemKeys[i], key)) {
                return !isSelectAll
            }
        }
        return !!isSelectAll
    }

    function getFilterForPlainKey(keyExpr, keyValue) {
        if (void 0 === keyValue) {
            return
        }
        return [keyExpr, isSelectAll ? "<>" : "=", keyValue]
    }
};
