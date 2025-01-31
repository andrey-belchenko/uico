/**
 * DevExtreme (esm/__internal/ui/splitter/utils/number_comparison.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    toFixed
} from "../../../../localization/utils";
export const PRECISION = 10;
export function compareNumbersWithPrecision(actual, expected) {
    let precision = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10;
    const delta = parseFloat(toFixed(actual, precision)) - parseFloat(toFixed(expected, precision));
    if (0 === delta) {
        return 0
    }
    return delta > 0 ? 1 : -1
}
