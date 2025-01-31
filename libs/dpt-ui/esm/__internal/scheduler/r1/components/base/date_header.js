/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/date_header.js)
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
    isHorizontalGroupingApplied,
    themeUtils
} from "../../utils/index";
import {
    DateHeaderCell
} from "./date_header_cell";
import {
    Row
} from "./row";
const {
    isMaterialBased: isMaterialBased
} = themeUtils.getThemeType();
export const DateHeaderDefaultProps = {
    groupOrientation: "horizontal",
    groupByDate: false,
    groups: []
};
export class DateHeader extends BaseInfernoComponent {
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
        const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation) && !groupByDate;
        const DateCellTemplateComponent = getTemplate(dateCellTemplate);
        return createFragment(dataMap.map(((dateHeaderRow, rowIndex) => createComponentVNode(2, Row, {
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
                return createComponentVNode(2, DateHeaderCell, {
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
DateHeader.defaultProps = DateHeaderDefaultProps;
