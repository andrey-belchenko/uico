/**
 * DevExtreme (cjs/exporter/jspdf/export_gantt.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.exportGantt = exportGantt;

function exportGantt(options) {
    const component = options.component;
    return null === component || void 0 === component ? void 0 : component.exportToPdf(options)
}
