/**
 * DevExtreme (esm/__internal/scheduler/r1/components/timeline/date_header_timeline.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    createFragment,
    createComponentVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    getThemeType
} from "../../../../scheduler/r1/utils/themes";
import {
    isHorizontalGroupingApplied
} from "../../utils/index";
import {
    DateHeaderDefaultProps
} from "../base/date_header";
import {
    DateHeaderCell,
    DateHeaderCellDefaultProps
} from "../base/date_header_cell";
import {
    Row,
    RowDefaultProps
} from "../base/row";
const {
    isMaterialBased: isMaterialBased
} = getThemeType();
export class TimelineDateHeaderLayout extends BaseInfernoComponent {
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
        const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation) && !groupByDate;
        const DateCellTemplateComponent = getTemplate(dateCellTemplate);
        const TimeCellTemplateComponent = getTemplate(timeCellTemplate);
        return createFragment(dataMap.map(((dateHeaderRow, rowIndex) => {
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
            return createComponentVNode(2, Row, {
                className: "dx-scheduler-header-row",
                leftVirtualCellWidth: validLeftVirtualCellWidth ?? RowDefaultProps.leftVirtualCellWidth,
                leftVirtualCellCount: validLeftVirtualCellCount,
                rightVirtualCellWidth: validRightVirtualCellWidth ?? RowDefaultProps.rightVirtualCellWidth,
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
                    return createComponentVNode(2, DateHeaderCell, {
                        viewContext: viewContext,
                        startDate: startDate,
                        endDate: endDate,
                        groups: isHorizontalGrouping ? cellGroups : void 0,
                        groupIndex: isHorizontalGrouping ? groupIndex : void 0,
                        today: today ?? DateHeaderCellDefaultProps.today,
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
TimelineDateHeaderLayout.defaultProps = DateHeaderDefaultProps;
