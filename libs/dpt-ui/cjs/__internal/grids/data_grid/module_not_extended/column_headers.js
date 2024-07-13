/**
 * DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/column_headers.js)
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
exports.ColumnHeadersView = void 0;
var _m_column_headers = require("../../../grids/grid_core/column_headers/m_column_headers");
var _m_core = _interopRequireDefault(require("../m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const ColumnHeadersView = exports.ColumnHeadersView = _m_column_headers.columnHeadersModule.views.columnHeadersView;
_m_core.default.registerModule("columnHeaders", _m_column_headers.columnHeadersModule);
