/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_vertical_cell.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    createVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    GroupPanelCellDefaultProps
} from "./group_panel_props";
export class GroupPanelVerticalCell extends BaseInfernoComponent {
    render() {
        const {
            className: className,
            data: data,
            id: id,
            color: color,
            text: text,
            index: index,
            cellTemplate: cellTemplate
        } = this.props;
        const CellTemplateComponent = getTemplate(cellTemplate);
        return createVNode(1, "div", `dx-scheduler-group-header ${className}`, CellTemplateComponent ? CellTemplateComponent({
            data: {
                data: data,
                id: id,
                color: color,
                text: text
            },
            index: index
        }) : createVNode(1, "div", "dx-scheduler-group-header-content", text, 0), 0)
    }
}
GroupPanelVerticalCell.defaultProps = GroupPanelCellDefaultProps;
