/**
 * DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/column_chooser.js)
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
exports.ColumnChooserView = exports.ColumnChooserController = void 0;
var _m_column_chooser = require("../../../grids/grid_core/column_chooser/m_column_chooser");
var _m_core = _interopRequireDefault(require("../m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const ColumnChooserController = exports.ColumnChooserController = _m_column_chooser.columnChooserModule.controllers.columnChooser;
const ColumnChooserView = exports.ColumnChooserView = _m_column_chooser.columnChooserModule.views.columnChooserView;
_m_core.default.registerModule("columnChooser", _m_column_chooser.columnChooserModule);
