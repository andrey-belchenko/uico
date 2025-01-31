/**
 * DevExtreme (cjs/exporter/jspdf/autotable/export_data_grid.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.exportDataGrid = exportDataGrid;
var _type = require("../../../core/utils/type");
var _export = require("./export");

function _getFullOptions(options) {
    if (!((0, _type.isDefined)(options) && (0, _type.isObject)(options))) {
        throw Error('The "exportDataGrid" method requires a configuration object.')
    }
    if (!((0, _type.isDefined)(options.component) && (0, _type.isObject)(options.component) && "dxDataGrid" === options.component.NAME)) {
        throw Error('The "component" field must contain a DataGrid instance.')
    }
    if (!(0, _type.isDefined)(options.selectedRowsOnly)) {
        options.selectedRowsOnly = false
    }
    return _export.Export.getFullOptions(options)
}

function exportDataGrid(options) {
    return _export.Export.export(_getFullOptions(options))
}
