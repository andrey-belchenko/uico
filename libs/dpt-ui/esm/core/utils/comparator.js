/**
 * DevExtreme (esm/core/utils/comparator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../dom_adapter";
import {
    toComparable
} from "./data";
import {
    isRenderer
} from "./type";
const hasNegation = function(oldValue, newValue) {
    return 1 / oldValue === 1 / newValue
};
export const equals = function(oldValue, newValue) {
    oldValue = toComparable(oldValue, true);
    newValue = toComparable(newValue, true);
    if (oldValue && newValue && isRenderer(oldValue) && isRenderer(newValue)) {
        return newValue.is(oldValue)
    }
    const oldValueIsNaN = oldValue !== oldValue;
    const newValueIsNaN = newValue !== newValue;
    if (oldValueIsNaN && newValueIsNaN) {
        return true
    }
    if (0 === oldValue && 0 === newValue) {
        return hasNegation(oldValue, newValue)
    }
    if (null === oldValue || "object" !== typeof oldValue || domAdapter.isElementNode(oldValue)) {
        return oldValue === newValue
    }
    return false
};
