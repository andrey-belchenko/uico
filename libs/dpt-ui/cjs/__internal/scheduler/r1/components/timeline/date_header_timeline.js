/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/timeline/date_header_timeline.js)
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
exports.TimelineDateHeaderLayout = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _themes = require("../../../../scheduler/r1/utils/themes");
var _index2 = require("../../utils/index");
var _date_header = require("../base/date_header");
var _date_header_cell = require("../base/date_header_cell");
var _row = require("../base/row");
const {
    isMaterialBased: isMaterialBased
} = (0, _themes.getThemeType)();
class TimelineDateHeaderLayout extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            viewContext: viewContext,
            groupByDate: groupByDate,
            groupOrientation: groupOrientation,
            groups: groups,
            dateHeaderData: dateHeaderData,
            dateCellTemplate: dateCellTemplate,
            timeCellTemplate: timeCellTemplate
        } = this.props;
        const {
            dataMap: dataMap,
            isMonthDateHeader: isMonthDateHeader,
            leftVirtualCellCount: leftVirtualCellCount,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellCount: rightVirtualCellCount,
            rightVirtualCellWidth: rightVirtualCellWidth,
            weekDayLeftVirtualCellCount: weekDayLeftVirtualCellCount,
            weekDayLeftVirtualCellWidth: weekDayLeftVirtualCellWidth,
            weekDayRightVirtualCellCount: weekDayRightVirtualCellCount,
            weekDayRightVirtualCellWidth: weekDayRightVirtualCellWidth
        } = dateHeaderData;
        const isHorizontalGrouping = (0, _index2.isHorizontalGroupingApplied)(groups, groupOrientation) && !groupByDate;
        const DateCellTemplateComponent = (0, _index.getTemplate)(dateCellTemplate);
        const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
        return (0, _inferno.createFragment)(dataMap.map(((dateHeaderRow, rowIndex) => {
            const rowsCount = dataMap.length;
            const isTimeCellTemplate = rowsCount - 1 === rowIndex;
            const isWeekDayRow = rowsCount > 1 && 0 === rowIndex;
            const splitText = isMaterialBased && (isMonthDateHeader || isWeekDayRow);
            let validLeftVirtualCellCount = leftVirtualCellCount;
            let validRightVirtualCellCount = rightVirtualCellCount;
            let validRightVirtualCellWidth = rightVirtualCellWidth;
            let validLeftVirtualCellWidth = leftVirtualCellWidth;
            if (isWeekDayRow) {
                validLeftVirtualCellCount = weekDayLeftVirtualCellCount;
                validRightVirtualCellCount = weekDayRightVirtualCellCount;
                validRightVirtualCellWidth = weekDayRightVirtualCellWidth;
                validLeftVirtualCellWidth = weekDayLeftVirtualCellWidth
            }
            return (0, _inferno.createComponentVNode)(2, _row.Row, {
                className: "dx-scheduler-header-row",
                leftVirtualCellWidth: validLeftVirtualCellWidth ?? _row.RowDefaultProps.leftVirtualCellWidth,
                leftVirtualCellCount: validLeftVirtualCellCount,
                rightVirtualCellWidth: validRightVirtualCellWidth ?? _row.RowDefaultProps.rightVirtualCellWidth,
                rightVirtualCellCount: validRightVirtualCellCount,
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
                        today: today ?? _date_header_cell.DateHeaderCellDefaultProps.today,
                        index: index,
                        text: text,
                        isFirstGroupCell: isFirstGroupCell,
                        isLastGroupCell: isLastGroupCell,
                        isWeekDayCell: isWeekDayRow,
                        colSpan: colSpan,
                        splitText: splitText,
                        dateCellTemplate: DateCellTemplateComponent,
                        timeCellTemplate: TimeCellTemplateComponent,
                        isTimeCellTemplate: isTimeCellTemplate
                    }, key)
                }))
            }, rowIndex.toString())
        })), 0)
    }
}
exports.TimelineDateHeaderLayout = TimelineDateHeaderLayout;
TimelineDateHeaderLayout.defaultProps = _date_header.DateHeaderDefaultProps;
