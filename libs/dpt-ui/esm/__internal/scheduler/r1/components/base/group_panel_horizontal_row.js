/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_horizontal_row.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    createVNode,
    createComponentVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    GroupPanelHorizontalCell,
    GroupPanelHorizontalCellDefaultProps
} from "./group_panel_horizontal_cell";
import {
    GroupPanelRowDefaultProps
} from "./group_panel_props";
export class GroupPanelHorizontalRow extends BaseInfernoComponent {
    render() {
        const {
            cellTemplate: cellTemplate,
            className: className,
            groupItems: groupItems
        } = this.props;
        const CellTemplateComponent = getTemplate(cellTemplate);
        return createVNode(1, "tr", `dx-scheduler-group-row ${className}`, groupItems.map(((_ref, index) => {
            let {
                colSpan: colSpan,
                color: color,
                data: data,
                id: id,
                isFirstGroupCell: isFirstGroupCell,
                isLastGroupCell: isLastGroupCell,
                key: key,
                text: text
            } = _ref;
            return createComponentVNode(2, GroupPanelHorizontalCell, {
                text: text,
                id: id,
                data: data,
                index: index,
                color: color,
                colSpan: colSpan ?? GroupPanelHorizontalCellDefaultProps.colSpan,
                isFirstGroupCell: !!isFirstGroupCell,
                isLastGroupCell: !!isLastGroupCell,
                cellTemplate: CellTemplateComponent
            }, key)
        })), 0)
    }
}
GroupPanelHorizontalRow.defaultProps = GroupPanelRowDefaultProps;
