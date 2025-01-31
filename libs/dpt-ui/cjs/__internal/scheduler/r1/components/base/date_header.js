/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/date_header.js)
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
exports.DateHeaderDefaultProps = exports.DateHeader = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _date_header_cell = require("./date_header_cell");
var _row = require("./row");
const {
    isMaterialBased: isMaterialBased
} = _index2.themeUtils.getThemeType();
const DateHeaderDefaultProps = exports.DateHeaderDefaultProps = {
    groupOrientation: "horizontal",
    groupByDate: false,
    groups: []
};
class DateHeader extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            viewContext: viewContext,
            dateCellTemplate: dateCellTemplate,
            dateHeaderData: {
                dataMap: dataMap,
                leftVirtualCellCount: leftVirtualCellCount,
                leftVirtualCellWidth: leftVirtualCellWidth,
                rightVirtualCellCount: rightVirtualCellCount,
                rightVirtualCellWidth: rightVirtualCellWidth
            },
            groupByDate: groupByDate,
            groupOrientation: groupOrientation,
            groups: groups
        } = this.props;
        const isHorizontalGrouping = (0, _index2.isHorizontalGroupingApplied)(groups, groupOrientation) && !groupByDate;
        const DateCellTemplateComponent = (0, _index.getTemplate)(dateCellTemplate);
        return (0, _inferno.createFragment)(dataMap.map(((dateHeaderRow, rowIndex) => (0, _inferno.createComponentVNode)(2, _row.Row, {
            className: "dx-scheduler-header-row",
            leftVirtualCellWidth: leftVirtualCellWidth,
            leftVirtualCellCount: leftVirtualCellCount,
            rightVirtualCellWidth: rightVirtualCellWidth,
            rightVirtualCellCount: rightVirtualCellCount,
            isHeaderRow: true,
            children: dateHeaderRow.map((_ref => {
                let {
                    colSpan: colSpan,
                    endDate: endDate,
                    groupIndex: groupIndex,
                    groups: cellGroups,
                    index: index,
                    isFirstGroupCell: isFirstGroupCell,
                    isLastGroupCell: isLastGroupCell,
                    key: key,
                    startDate: startDate,
                    text: text,
                    today: today
                } = _ref;
                return (0, _inferno.createComponentVNode)(2, _date_header_cell.DateHeaderCell, {
                    viewContext: viewContext,
                    startDate: startDate,
                    endDate: endDate,
                    groups: isHorizontalGrouping ? cellGroups : void 0,
                    groupIndex: isHorizontalGrouping ? groupIndex : void 0,
                    today: today ?? false,
                    isWeekDayCell: false,
                    isTimeCellTemplate: false,
                    index: index,
                    text: text,
                    isFirstGroupCell: isFirstGroupCell,
                    isLastGroupCell: isLastGroupCell,
                    dateCellTemplate: DateCellTemplateComponent,
                    colSpan: colSpan,
                    splitText: isMaterialBased
                }, key)
            }))
        }, rowIndex.toString()))), 0)
    }
}
exports.DateHeader = DateHeader;
DateHeader.defaultProps = DateHeaderDefaultProps;
