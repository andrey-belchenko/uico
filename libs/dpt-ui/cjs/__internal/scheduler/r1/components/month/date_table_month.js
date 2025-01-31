/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/month/date_table_month.js)
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
exports.DateTableMonth = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _date_table = require("../base/date_table");
var _date_table_month_cell = require("./date_table_month_cell");
const _excluded = ["viewData", "viewContext", "addDateTableClass", "addVerticalSizesClassToRows", "dataCellTemplate", "groupOrientation", "tableRef", "width"];

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}
class DateTableMonth extends _inferno2.InfernoWrapperComponent {
    createEffects() {
        return [(0, _inferno2.createReRenderEffect)()]
    }
    render() {
        const _this$props = this.props,
            {
                viewData: viewData,
                viewContext: viewContext,
                addDateTableClass: addDateTableClass,
                addVerticalSizesClassToRows: addVerticalSizesClassToRows,
                dataCellTemplate: dataCellTemplate,
                groupOrientation: groupOrientation,
                tableRef: tableRef,
                width: width
            } = _this$props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _date_table.DateTable, _extends({}, restProps, {
            viewData: viewData,
            viewContext: viewContext,
            groupOrientation: groupOrientation,
            addDateTableClass: addDateTableClass,
            dataCellTemplate: DataCellTemplateComponent,
            cellTemplate: _date_table_month_cell.DateTableMonthCell,
            tableRef: tableRef,
            addVerticalSizesClassToRows: addVerticalSizesClassToRows,
            width: width
        })))
    }
}
exports.DateTableMonth = DateTableMonth;
DateTableMonth.defaultProps = _date_table.DateTableDefaultProps;
