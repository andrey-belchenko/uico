/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/virtual_row.js)
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
exports.VirtualRowDefaultProps = exports.VirtualRow = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../utils/index");
var _row = require("./row");
var _virtual_cell = require("./virtual_cell");

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const VirtualRowDefaultProps = exports.VirtualRowDefaultProps = _extends({}, _row.RowDefaultProps, {
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0,
    cellsCount: 1
});
class VirtualRow extends _inferno2.BaseInfernoComponent {
    constructor() {
        super(...arguments);
        this.virtualCells = null
    }
    getVirtualCells() {
        if (null !== this.virtualCells) {
            return this.virtualCells
        }
        const {
            cellsCount: cellsCount
        } = this.props;
        this.virtualCells = [...Array(cellsCount)];
        return this.virtualCells
    }
    componentWillUpdate(nextProps) {
        if (this.props.cellsCount !== nextProps.cellsCount) {
            this.virtualCells = null
        }
    }
    render() {
        const {
            className: className,
            leftVirtualCellCount: leftVirtualCellCount,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellCount: rightVirtualCellCount,
            rightVirtualCellWidth: rightVirtualCellWidth,
            styles: styles,
            height: height
        } = this.props;
        const classes = `dx-scheduler-virtual-row ${className}`;
        const modifiedStyles = _index.renderUtils.addHeightToStyle(height, styles);
        const virtualCells = this.getVirtualCells();
        return (0, _inferno.createComponentVNode)(2, _row.Row, {
            className: classes,
            styles: modifiedStyles,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth,
            leftVirtualCellCount: leftVirtualCellCount,
            rightVirtualCellCount: rightVirtualCellCount,
            children: virtualCells.map(((_, index) => (0, _inferno.createComponentVNode)(2, _virtual_cell.VirtualCell, {
                width: _virtual_cell.VirtualCellDefaultProps.width,
                isHeaderCell: _virtual_cell.VirtualCellDefaultProps.isHeaderCell
            }, index.toString())))
        })
    }
}
exports.VirtualRow = VirtualRow;
VirtualRow.defaultProps = VirtualRowDefaultProps;
