/**
 * DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/rows.js)
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
exports.RowsView = void 0;
var _m_rows_view = require("../../../grids/grid_core/views/m_rows_view");
var _m_core = _interopRequireDefault(require("../m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const RowsView = exports.RowsView = _m_rows_view.rowsModule.views.rowsView;
_m_core.default.registerModule("rows", _m_rows_view.rowsModule);
