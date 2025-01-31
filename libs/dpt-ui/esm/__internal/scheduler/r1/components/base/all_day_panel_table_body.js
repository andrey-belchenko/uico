/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/all_day_panel_table_body.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    createComponentVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    renderUtils
} from "../../utils/index";
import {
    AllDayPanelCell
} from "./all_day_panel_cell";
import {
    Row
} from "./row";
export const AllDayPanelTableBodyDefaultProps = {
    viewData: [],
    isVerticalGroupOrientation: false,
    className: "",
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0
};
export class AllDayPanelTableBody extends BaseInfernoComponent {
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
        const classes = renderUtils.combineClasses({
            "dx-scheduler-all-day-table-row": true,
            [className ?? ""]: !!className
        });
        const DataCellTemplateComponent = getTemplate(dataCellTemplate);
        return createComponentVNode(2, Row, {
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
                return createComponentVNode(2, AllDayPanelCell, {
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
AllDayPanelTableBody.defaultProps = AllDayPanelTableBodyDefaultProps;
