/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/all_day_panel_table_body.js)
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
exports.AllDayPanelTableBodyDefaultProps = exports.AllDayPanelTableBody = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _all_day_panel_cell = require("./all_day_panel_cell");
var _row = require("./row");
const AllDayPanelTableBodyDefaultProps = exports.AllDayPanelTableBodyDefaultProps = {
    viewData: [],
    isVerticalGroupOrientation: false,
    className: "",
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0
};
class AllDayPanelTableBody extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            className: className,
            viewData: viewData,
            viewContext: viewContext,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth,
            leftVirtualCellCount: leftVirtualCellCount,
            rightVirtualCellCount: rightVirtualCellCount,
            isVerticalGroupOrientation: isVerticalGroupOrientation,
            dataCellTemplate: dataCellTemplate
        } = this.props;
        const classes = _index2.renderUtils.combineClasses({
            "dx-scheduler-all-day-table-row": true,
            [className ?? ""]: !!className
        });
        const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
        return (0, _inferno.createComponentVNode)(2, _row.Row, {
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth,
            leftVirtualCellCount: leftVirtualCellCount,
            rightVirtualCellCount: rightVirtualCellCount,
            className: classes,
            children: viewData.map((_ref => {
                let {
                    endDate: endDate,
                    groupIndex: cellGroupIndex,
                    groups: groups,
                    index: cellIndex,
                    isFirstGroupCell: isFirstGroupCell,
                    isFocused: isFocused,
                    isLastGroupCell: isLastGroupCell,
                    isSelected: isSelected,
                    key: key,
                    startDate: startDate
                } = _ref;
                return (0, _inferno.createComponentVNode)(2, _all_day_panel_cell.AllDayPanelCell, {
                    viewContext: viewContext,
                    isFirstGroupCell: !isVerticalGroupOrientation && isFirstGroupCell,
                    isLastGroupCell: !isVerticalGroupOrientation && isLastGroupCell,
                    startDate: startDate,
                    endDate: endDate,
                    groups: groups,
                    groupIndex: cellGroupIndex,
                    index: cellIndex,
                    dataCellTemplate: DataCellTemplateComponent,
                    isSelected: isSelected ?? false,
                    isFocused: isFocused ?? false
                }, key)
            }))
        })
    }
}
exports.AllDayPanelTableBody = AllDayPanelTableBody;
AllDayPanelTableBody.defaultProps = AllDayPanelTableBodyDefaultProps;
