/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/all_day_panel_cell.js)
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
    ALL_DAY_PANEL_CELL_CLASS
} from "../const";
import {
    DateTableCallBaseDefaultProps,
    DateTableCellBase
} from "./date_table_cell_base";
export class AllDayPanelCell extends BaseInfernoComponent {
    render() {
        const {
            className: className,
            viewContext: viewContext,
            dataCellTemplate: dataCellTemplate,
            endDate: endDate,
            groupIndex: groupIndex,
            groups: groups,
            index: index,
            isFirstGroupCell: isFirstGroupCell,
            isFocused: isFocused,
            isLastGroupCell: isLastGroupCell,
            isSelected: isSelected,
            startDate: startDate
        } = this.props;
        const DataCellTemplateComponent = getTemplate(dataCellTemplate);
        return createComponentVNode(2, DateTableCellBase, {
            className: `${ALL_DAY_PANEL_CELL_CLASS} ${className}`,
            viewContext: viewContext,
            startDate: startDate,
            endDate: endDate,
            groups: groups,
            groupIndex: groupIndex,
            allDay: true,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            index: index,
            dataCellTemplate: DataCellTemplateComponent,
            isSelected: isSelected,
            isFocused: isFocused
        })
    }
}
AllDayPanelCell.defaultProps = DateTableCallBaseDefaultProps;
