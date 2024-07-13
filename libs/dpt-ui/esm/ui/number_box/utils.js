/**
 * DevExtreme (esm/ui/number_box/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    adjust
} from "../../core/utils/math";
const getRealSeparatorIndex = function(str) {
    let quoteBalance = 0;
    let separatorCount = 0;
    for (let i = 0; i < str.length; ++i) {
        if ("'" === str[i]) {
            quoteBalance++
        }
        if ("." === str[i]) {
            ++separatorCount;
            if (quoteBalance % 2 === 0) {
                return {
                    occurrence: separatorCount,
                    index: i
                }
            }
        }
    }
    return {
        occurrence: 1,
        index: -1
    }
};
const getNthOccurrence = function(str, c, n) {
    let i = -1;
    while (n-- && i++ < str.length) {
        i = str.indexOf(c, i)
    }
    return i
};
const splitByIndex = function(str, index) {
    if (-1 === index) {
        return [str]
    }
    return [str.slice(0, index), str.slice(index + 1)]
};
const adjustPercentValue = function(rawValue, precision) {
    return rawValue && adjust(rawValue / 100, precision)
};
export {
    getRealSeparatorIndex,
    getNthOccurrence,
    splitByIndex,
    adjustPercentValue
};
