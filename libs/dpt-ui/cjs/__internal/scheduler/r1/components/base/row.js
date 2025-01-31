/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/row.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RowDefaultProps = exports.Row = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../utils/index");
var _virtual_cell = require("./virtual_cell");
const MAX_COL_SPAN = 1e3;
const RowDefaultProps = exports.RowDefaultProps = {
    className: "",
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0,
    isHeaderRow: false
};
class Row extends _inferno2.BaseInfernoComponent {
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
        return (0, _inferno.createVNode)(1, "tr", className, [hasLeftVirtualCell && null != leftVirtualCellCount && (0, _index.splitNumber)(leftVirtualCellCount, 1e3).map(((colSpan, index) => (0, _inferno.createComponentVNode)(2, _virtual_cell.VirtualCell, {
            className: `left-virtual-cell-${index}`,
            width: leftVirtualCellWidth * (colSpan / leftVirtualCellCount),
            colSpan: colSpan,
            isHeaderCell: isHeaderRow ?? _virtual_cell.VirtualCellDefaultProps.isHeaderCell
        }))), children, hasRightVirtualCell && null != rightVirtualCellCount && (0, _index.splitNumber)(rightVirtualCellCount, 1e3).map(((colSpan, index) => (0, _inferno.createComponentVNode)(2, _virtual_cell.VirtualCell, {
            className: `right-virtual-cell-${index}`,
            width: rightVirtualCellWidth * (colSpan / rightVirtualCellCount),
            colSpan: colSpan,
            isHeaderCell: isHeaderRow ?? _virtual_cell.VirtualCellDefaultProps.isHeaderCell
        })))], 0, {
            style: (0, _inferno2.normalizeStyles)(styles)
        })
    }
}
exports.Row = Row;
Row.defaultProps = RowDefaultProps;
