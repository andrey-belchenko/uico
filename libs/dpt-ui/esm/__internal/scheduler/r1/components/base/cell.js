/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/cell.js)
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
    renderUtils
} from "../../utils/index";
export const CellBaseDefaultProps = {
    className: "",
    isFirstGroupCell: false,
    isLastGroupCell: false,
    startDate: new Date,
    endDate: new Date,
    allDay: false,
    text: "",
    index: 0,
    contentTemplateProps: {
        data: {},
        index: 0
    }
};
export class CellBase extends BaseInfernoComponent {
    render() {
        const {
            className: className,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            children: children,
            ariaLabel: ariaLabel
        } = this.props;
        const classes = renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, className);
        return createVNode(1, "td", classes, children, 0, {
            "aria-label": ariaLabel
        })
    }
}
CellBase.defaultProps = CellBaseDefaultProps;
