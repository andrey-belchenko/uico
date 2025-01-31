/**
 * DevExtreme (cjs/__internal/ui/splitter/utils/number_comparison.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PRECISION = void 0;
exports.compareNumbersWithPrecision = compareNumbersWithPrecision;
var _utils = require("../../../../localization/utils");
const PRECISION = exports.PRECISION = 10;

function compareNumbersWithPrecision(actual, expected) {
    let precision = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : PRECISION;
    const delta = parseFloat((0, _utils.toFixed)(actual, precision)) - parseFloat((0, _utils.toFixed)(expected, precision));
    if (0 === delta) {
        return 0
    }
    return delta > 0 ? 1 : -1
}
