/**
 * DevExtreme (esm/core/utils/extend.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isPlainObject
} from "./type";
export const extendFromObject = function(target, source, overrideExistingValues) {
    target = target || {};
    for (const prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
            const value = source[prop];
            if (!(prop in target) || overrideExistingValues) {
                target[prop] = value
            }
        }
    }
    return target
};
export const extend = function(target) {
    target = target || {};
    let i = 1;
    let deep = false;
    if ("boolean" === typeof target) {
        deep = target;
        target = arguments[1] || {};
        i++
    }
    for (; i < arguments.length; i++) {
        const source = arguments[i];
        if (null == source) {
            continue
        }
        for (const key in source) {
            const targetValue = target[key];
            const sourceValue = source[key];
            let sourceValueIsArray = false;
            let clone;
            if ("__proto__" === key || "constructor" === key || target === sourceValue) {
                continue
            }
            if (deep && sourceValue && (isPlainObject(sourceValue) || (sourceValueIsArray = Array.isArray(sourceValue)))) {
                if (sourceValueIsArray) {
                    clone = targetValue && Array.isArray(targetValue) ? targetValue : []
                } else {
                    clone = targetValue && isPlainObject(targetValue) ? targetValue : {}
                }
                target[key] = extend(deep, clone, sourceValue)
            } else if (void 0 !== sourceValue) {
                target[key] = sourceValue
            }
        }
    }
    return target
};
