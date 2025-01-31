/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/virtual_cell.js)
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
    renderUtils
} from "../../utils/index";
import {
    HeaderCell
} from "./header_cell";
import {
    OrdinaryCell
} from "./ordinary_cell";
export const VirtualCellDefaultProps = {
    width: 0,
    isHeaderCell: false
};
export class VirtualCell extends BaseInfernoComponent {
    render() {
        const {
            colSpan: colSpan,
            isHeaderCell: isHeaderCell,
            width: width,
            styles: styles
        } = this.props;
        const modifiedStyles = renderUtils.addWidthToStyle(width, styles);
        const Cell = isHeaderCell ? HeaderCell : OrdinaryCell;
        return createComponentVNode(2, Cell, {
            className: "dx-scheduler-virtual-cell",
            styles: modifiedStyles,
            colSpan: colSpan
        })
    }
}
VirtualCell.defaultProps = VirtualCellDefaultProps;
