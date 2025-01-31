/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/virtual_cell.js)
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
exports.VirtualCellDefaultProps = exports.VirtualCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../utils/index");
var _header_cell = require("./header_cell");
var _ordinary_cell = require("./ordinary_cell");
const VirtualCellDefaultProps = exports.VirtualCellDefaultProps = {
    width: 0,
    isHeaderCell: false
};
class VirtualCell extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            colSpan: colSpan,
            isHeaderCell: isHeaderCell,
            width: width,
            styles: styles
        } = this.props;
        const modifiedStyles = _index.renderUtils.addWidthToStyle(width, styles);
        const Cell = isHeaderCell ? _header_cell.HeaderCell : _ordinary_cell.OrdinaryCell;
        return (0, _inferno.createComponentVNode)(2, Cell, {
            className: "dx-scheduler-virtual-cell",
            styles: modifiedStyles,
            colSpan: colSpan
        })
    }
}
exports.VirtualCell = VirtualCell;
VirtualCell.defaultProps = VirtualCellDefaultProps;
