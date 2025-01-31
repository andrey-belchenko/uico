/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/row.js)
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
    BaseInfernoComponent,
    normalizeStyles
} from "@dpt-ui/runtime/inferno";
import {
    splitNumber
} from "../../utils/index";
import {
    VirtualCell,
    VirtualCellDefaultProps
} from "./virtual_cell";
const MAX_COL_SPAN = 1e3;
export const RowDefaultProps = {
    className: "",
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0,
    isHeaderRow: false
};
export class Row extends BaseInfernoComponent {
    render() {
        const {
            children: children,
            className: className,
            isHeaderRow: isHeaderRow,
            leftVirtualCellCount: leftVirtualCellCount,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellCount: rightVirtualCellCount,
            rightVirtualCellWidth: rightVirtualCellWidth,
            styles: styles
        } = this.props;
        const hasLeftVirtualCell = !!leftVirtualCellCount;
        const hasRightVirtualCell = !!rightVirtualCellCount;
        return createVNode(1, "tr", className, [hasLeftVirtualCell && null != leftVirtualCellCount && splitNumber(leftVirtualCellCount, 1e3).map(((colSpan, index) => createComponentVNode(2, VirtualCell, {
            className: `left-virtual-cell-${index}`,
            width: leftVirtualCellWidth * (colSpan / leftVirtualCellCount),
            colSpan: colSpan,
            isHeaderCell: isHeaderRow ?? VirtualCellDefaultProps.isHeaderCell
        }))), children, hasRightVirtualCell && null != rightVirtualCellCount && splitNumber(rightVirtualCellCount, 1e3).map(((colSpan, index) => createComponentVNode(2, VirtualCell, {
            className: `right-virtual-cell-${index}`,
            width: rightVirtualCellWidth * (colSpan / rightVirtualCellCount),
            colSpan: colSpan,
            isHeaderCell: isHeaderRow ?? VirtualCellDefaultProps.isHeaderCell
        })))], 0, {
            style: normalizeStyles(styles)
        })
    }
}
Row.defaultProps = RowDefaultProps;
