/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/header_cell.js)
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
    BaseInfernoComponent,
    normalizeStyles
} from "@dpt-ui/runtime/inferno";
import {
    OrdinaryCellDefaultProps
} from "./ordinary_cell";
export class HeaderCell extends BaseInfernoComponent {
    render() {
        const {
            children: children,
            className: className,
            colSpan: colSpan,
            styles: styles
        } = this.props;
        return createVNode(1, "th", className, children, 0, {
            style: normalizeStyles(styles),
            colSpan: colSpan
        })
    }
}
HeaderCell.defaultProps = OrdinaryCellDefaultProps;
