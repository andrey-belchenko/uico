/**
 * DevExtreme (cjs/viz/tree_map/tiling.squarified.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _tilingSquarified = _interopRequireDefault(require("./tiling.squarified.base"));
var _tiling = require("./tiling");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const _max = Math.max;

function accumulate(total, current) {
    return _max(total, current)
}

function squarified(data) {
    return (0, _tilingSquarified.default)(data, accumulate, false)
}(0, _tiling.addAlgorithm)("squarified", squarified);
var _default = exports.default = squarified;
module.exports = exports.default;
module.exports.default = exports.default;
