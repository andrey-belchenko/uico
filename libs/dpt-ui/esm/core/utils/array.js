/**
 * DevExtreme (esm/core/utils/array.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined
} from "./type";
import {
    orderEach
} from "./object";
import config from "../config";

function createOccurrenceMap(array) {
    return array.reduce(((map, value) => {
        const count = (map.get(value) ?? 0) + 1;
        map.set(value, count);
        return map
    }), new Map)
}
export const wrapToArray = function(item) {
    return Array.isArray(item) ? item : [item]
};
export const getUniqueValues = function(values) {
    return [...new Set(values)]
};
export const getIntersection = function(firstArray, secondArray) {
    const toRemoveMap = createOccurrenceMap(secondArray);
    return firstArray.filter((value => {
        const occurrencesCount = toRemoveMap.get(value);
        occurrencesCount && toRemoveMap.set(value, occurrencesCount - 1);
        return occurrencesCount
    }))
};
export const removeDuplicates = function() {
    let from = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    let toRemove = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
    const toRemoveMap = createOccurrenceMap(toRemove);
    return from.filter((value => {
        const occurrencesCount = toRemoveMap.get(value);
        occurrencesCount && toRemoveMap.set(value, occurrencesCount - 1);
        return !occurrencesCount
    }))
};
export const normalizeIndexes = function(items, indexPropName, currentItem, needIndexCallback) {
    const indexedItems = {};
    const {
        useLegacyVisibleIndex: useLegacyVisibleIndex
    } = config();
    let currentIndex = 0;
    const shouldUpdateIndex = item => !isDefined(item[indexPropName]) && (!needIndexCallback || needIndexCallback(item));
    items.forEach((item => {
        const index = item[indexPropName];
        if (index >= 0) {
            indexedItems[index] = indexedItems[index] || [];
            if (item === currentItem) {
                indexedItems[index].unshift(item)
            } else {
                indexedItems[index].push(item)
            }
        } else {
            item[indexPropName] = void 0
        }
    }));
    if (!useLegacyVisibleIndex) {
        items.forEach((item => {
            if (shouldUpdateIndex(item)) {
                while (indexedItems[currentIndex]) {
                    currentIndex++
                }
                indexedItems[currentIndex] = [item];
                currentIndex++
            }
        }))
    }
    currentIndex = 0;
    orderEach(indexedItems, (function(index, items) {
        items.forEach((item => {
            if (index >= 0) {
                item[indexPropName] = currentIndex++
            }
        }))
    }));
    if (useLegacyVisibleIndex) {
        items.forEach((item => {
            if (shouldUpdateIndex(item)) {
                item[indexPropName] = currentIndex++
            }
        }))
    }
};
export const groupBy = (array, getGroupName) => array.reduce(((groupedResult, item) => {
    const groupName = getGroupName(item);
    groupedResult[groupName] = groupedResult[groupName] ?? [];
    groupedResult[groupName].push(item);
    return groupedResult
}), {});
