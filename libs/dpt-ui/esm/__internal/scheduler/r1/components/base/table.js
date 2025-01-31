/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/table.js)
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
    renderUtils
} from "../../utils/index";
import {
    VirtualRow,
    VirtualRowDefaultProps
} from "./virtual_row";
export const TableDefaultProps = {
    topVirtualRowHeight: 0,
    bottomVirtualRowHeight: 0,
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0,
    virtualCellsCount: 0
};
export class Table extends BaseInfernoComponent {
    getResultStyles() {
        const {
            height: height,
            width: width,
            styles: styles
        } = this.props;
        const heightAdded = renderUtils.addHeightToStyle(height, styles);
        return renderUtils.addWidthToStyle(width, heightAdded)
    }
    render() {
        const {
            className: className,
            topVirtualRowHeight: topVirtualRowHeight,
            bottomVirtualRowHeight: bottomVirtualRowHeight,
            children: children,
            leftVirtualCellCount: leftVirtualCellCount,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellCount: rightVirtualCellCount,
            rightVirtualCellWidth: rightVirtualCellWidth,
            tableRef: tableRef,
            virtualCellsCount: virtualCellsCount
        } = this.props;
        const hasTopVirtualRow = !!topVirtualRowHeight;
        const hasBottomVirtualRow = !!bottomVirtualRowHeight;
        const resultStyles = this.getResultStyles();
        return createVNode(1, "table", className, createVNode(1, "tbody", null, [hasTopVirtualRow && createComponentVNode(2, VirtualRow, {
            height: topVirtualRowHeight,
            cellsCount: virtualCellsCount ?? VirtualRowDefaultProps.cellsCount,
            leftVirtualCellWidth: leftVirtualCellWidth ?? VirtualRowDefaultProps.leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth ?? VirtualRowDefaultProps.rightVirtualCellWidth,
            leftVirtualCellCount: leftVirtualCellCount,
            rightVirtualCellCount: rightVirtualCellCount
        }), children, hasBottomVirtualRow && createComponentVNode(2, VirtualRow, {
            height: bottomVirtualRowHeight,
            cellsCount: virtualCellsCount ?? VirtualRowDefaultProps.cellsCount,
            leftVirtualCellWidth: leftVirtualCellWidth ?? VirtualRowDefaultProps.leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth ?? VirtualRowDefaultProps.rightVirtualCellWidth,
            leftVirtualCellCount: leftVirtualCellCount,
            rightVirtualCellCount: rightVirtualCellCount
        })], 0), 2, {
            style: normalizeStyles(resultStyles)
        }, null, tableRef)
    }
}
Table.defaultProps = TableDefaultProps;
