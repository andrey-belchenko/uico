/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/time_panel_table.js)
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
exports.TimePanelTableDefaultProps = exports.TimePanelTable = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _all_day_panel_title = require("./all_day_panel_title");
var _cell = require("./cell");
var _row = require("./row");
var _table = require("./table");
var _time_panel_cell = require("./time_panel_cell");
const _excluded = ["timePanelData", "viewContext", "tableRef", "timeCellTemplate"];

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
const TimePanelTableDefaultProps = exports.TimePanelTableDefaultProps = {
    timePanelData: {
        groupedData: [],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        topVirtualRowCount: 0,
        bottomVirtualRowCount: 0
    }
};
class TimePanelTable extends _inferno2.InfernoWrapperComponent {
    createEffects() {
        return [(0, _inferno2.createReRenderEffect)()]
    }
    render() {
        const _this$props = this.props,
            {
                timePanelData: timePanelData,
                viewContext: viewContext,
                tableRef: tableRef,
                timeCellTemplate: timeCellTemplate
            } = _this$props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        const {
            topVirtualRowHeight: topVirtualRowHeight,
            bottomVirtualRowHeight: bottomVirtualRowHeight
        } = timePanelData;
        const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _table.Table, _extends({}, restProps, {
            className: "dx-scheduler-time-panel",
            topVirtualRowHeight: topVirtualRowHeight ?? 0,
            bottomVirtualRowHeight: bottomVirtualRowHeight ?? 0,
            virtualCellsCount: 1,
            tableRef: tableRef,
            children: timePanelData.groupedData.map((_ref => {
                let {
                    dateTable: dateTable,
                    groupIndex: groupIndex,
                    isGroupedAllDayPanel: isGroupedAllDayPanel,
                    key: fragmentKey
                } = _ref;
                return (0, _inferno.createFragment)([isGroupedAllDayPanel && (0, _inferno.createComponentVNode)(2, _row.Row, {
                    leftVirtualCellWidth: _row.RowDefaultProps.leftVirtualCellWidth,
                    rightVirtualCellWidth: _row.RowDefaultProps.rightVirtualCellWidth,
                    children: (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
                        className: "dx-scheduler-time-panel-title-cell",
                        viewContext: viewContext,
                        startDate: _cell.CellBaseDefaultProps.startDate,
                        endDate: _cell.CellBaseDefaultProps.endDate,
                        index: _cell.CellBaseDefaultProps.index,
                        children: (0, _inferno.createComponentVNode)(2, _all_day_panel_title.AllDayPanelTitle)
                    })
                }), dateTable.map((_ref2 => {
                    let {
                        groups: groups,
                        highlighted: highlighted,
                        index: cellIndex,
                        isFirstGroupCell: isFirstGroupCell,
                        isLastGroupCell: isLastGroupCell,
                        key: key,
                        startDate: startDate,
                        text: text
                    } = _ref2;
                    return (0, _inferno.createComponentVNode)(2, _row.Row, {
                        className: "dx-scheduler-time-panel-row",
                        leftVirtualCellWidth: _row.RowDefaultProps.leftVirtualCellWidth,
                        rightVirtualCellWidth: _row.RowDefaultProps.rightVirtualCellWidth,
                        children: (0, _inferno.createComponentVNode)(2, _time_panel_cell.TimePanelCell, {
                            viewContext: viewContext,
                            startDate: startDate,
                            endDate: _cell.CellBaseDefaultProps.endDate,
                            text: text,
                            groups: groups,
                            groupIndex: groupIndex,
                            isFirstGroupCell: isFirstGroupCell,
                            isLastGroupCell: isLastGroupCell,
                            index: cellIndex,
                            timeCellTemplate: TimeCellTemplateComponent,
                            highlighted: highlighted
                        })
                    }, key)
                }))], 0, fragmentKey)
            }))
        })))
    }
}
exports.TimePanelTable = TimePanelTable;
TimePanelTable.defaultProps = TimePanelTableDefaultProps;
