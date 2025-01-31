/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/date_table.js)
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
exports.DateTableDefaultProps = exports.DateTable = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _date_table_body = require("./date_table_body");
var _date_table_cell_base = require("./date_table_cell_base");
var _layout_props = require("./layout_props");
var _table = require("./table");
const _excluded = ["viewData", "viewContext", "tableRef", "addDateTableClass", "width", "cellTemplate", "dataCellTemplate", "groupOrientation", "addVerticalSizesClassToRows"];

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
const DateTableDefaultProps = exports.DateTableDefaultProps = _extends({}, _layout_props.LayoutDefaultProps, {
    cellTemplate: _date_table_cell_base.DateTableCellBase
});
class DateTable extends _inferno2.InfernoWrapperComponent {
    createEffects() {
        return [(0, _inferno2.createReRenderEffect)()]
    }
    render() {
        const _this$props = this.props,
            {
                viewData: viewData,
                viewContext: viewContext,
                tableRef: tableRef,
                addDateTableClass: addDateTableClass,
                width: width,
                cellTemplate: cellTemplate,
                dataCellTemplate: dataCellTemplate,
                groupOrientation: groupOrientation,
                addVerticalSizesClassToRows: addVerticalSizesClassToRows
            } = _this$props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        const classes = addDateTableClass ? "dx-scheduler-date-table" : void 0;
        const topVirtualRowHeight = viewData.topVirtualRowHeight ?? 0;
        const bottomVirtualRowHeight = viewData.bottomVirtualRowHeight ?? 0;
        const leftVirtualCellWidth = viewData.leftVirtualCellWidth ?? 0;
        const rightVirtualCellWidth = viewData.rightVirtualCellWidth ?? 0;
        const virtualCellsCount = viewData.groupedData[0].dateTable[0].cells.length;
        const CellTemplateComponent = (0, _index.getTemplate)(cellTemplate);
        const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _table.Table, _extends({}, restProps, {
            tableRef: tableRef,
            topVirtualRowHeight: topVirtualRowHeight,
            bottomVirtualRowHeight: bottomVirtualRowHeight,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth,
            leftVirtualCellCount: viewData.leftVirtualCellCount,
            rightVirtualCellCount: viewData.rightVirtualCellCount,
            virtualCellsCount: virtualCellsCount,
            className: classes,
            width: width,
            children: (0, _inferno.createComponentVNode)(2, _date_table_body.DateTableBody, {
                viewData: viewData,
                viewContext: viewContext,
                cellTemplate: CellTemplateComponent,
                dataCellTemplate: DataCellTemplateComponent,
                leftVirtualCellWidth: leftVirtualCellWidth,
                rightVirtualCellWidth: rightVirtualCellWidth,
                groupOrientation: groupOrientation,
                addVerticalSizesClassToRows: addVerticalSizesClassToRows,
                topVirtualRowHeight: _date_table_body.DateTableBodyDefaultProps.topVirtualRowHeight,
                bottomVirtualRowHeight: _date_table_body.DateTableBodyDefaultProps.bottomVirtualRowHeight,
                addDateTableClass: _date_table_body.DateTableBodyDefaultProps.addDateTableClass
            })
        })))
    }
}
exports.DateTable = DateTable;
DateTable.defaultProps = DateTableDefaultProps;
