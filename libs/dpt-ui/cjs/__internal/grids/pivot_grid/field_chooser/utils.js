/**
 * DevExtreme (cjs/__internal/grids/pivot_grid/field_chooser/utils.js)
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
exports.reverseSortOrder = void 0;
var _const = require("./const");
const reverseSortOrder = sortOrder => sortOrder === _const.SORT_ORDER.descending ? _const.SORT_ORDER.ascending : _const.SORT_ORDER.descending;
exports.reverseSortOrder = reverseSortOrder;
