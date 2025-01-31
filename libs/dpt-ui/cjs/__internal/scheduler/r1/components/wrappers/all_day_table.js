/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/wrappers/all_day_table.js)
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
exports.AllDayTableComponent = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../../core/component_registrator"));
var _all_day_panel_table = require("../../../../scheduler/r1/components/base/all_day_panel_table");
var _date_table = require("./date_table");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class AllDayTableComponent extends _date_table.DateTableComponent {
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: ["dataCellTemplate"],
            props: ["viewData", "viewContext", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "bottomVirtualRowHeight", "addDateTableClass", "addVerticalSizesClassToRows", "width", "dataCellTemplate"]
        }
    }
    get _viewComponent() {
        return _all_day_panel_table.AllDayTable
    }
}
exports.AllDayTableComponent = AllDayTableComponent;
(0, _component_registrator.default)("dxAllDayTable", AllDayTableComponent);
