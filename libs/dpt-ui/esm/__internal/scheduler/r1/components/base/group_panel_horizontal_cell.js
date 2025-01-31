/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_horizontal_cell.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
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
    renderUtils
} from "../../utils/index";
import {
    GroupPanelCellDefaultProps
} from "./group_panel_props";
export const GroupPanelHorizontalCellDefaultProps = _extends({}, GroupPanelCellDefaultProps, {
    isFirstGroupCell: false,
    isLastGroupCell: false,
    colSpan: 1
});
export class GroupPanelHorizontalCell extends BaseInfernoComponent {
    render() {
        const {
            cellTemplate: cellTemplate,
            colSpan: colSpan,
            color: color,
            data: data,
            id: id,
            index: index,
            text: text,
            className: className,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell
        } = this.props;
        const classes = renderUtils.combineClasses({
            "dx-scheduler-group-header": true,
            "dx-scheduler-first-group-cell": isFirstGroupCell,
            "dx-scheduler-last-group-cell": isLastGroupCell,
            [className ?? ""]: !!className
        });
        const CellTemplateComponent = getTemplate(cellTemplate);
        return createVNode(1, "th", classes, createVNode(1, "div", "dx-scheduler-group-header-content", CellTemplateComponent ? CellTemplateComponent({
            data: {
                data: data,
                id: id,
                color: color,
                text: text
            },
            index: index
        }) : createVNode(1, "div", null, text, 0), 0), 2, {
            colSpan: colSpan
        })
    }
}
GroupPanelHorizontalCell.defaultProps = GroupPanelHorizontalCellDefaultProps;
