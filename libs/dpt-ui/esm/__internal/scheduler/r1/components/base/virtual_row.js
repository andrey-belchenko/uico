/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/virtual_row.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
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
    Row,
    RowDefaultProps
} from "./row";
import {
    VirtualCell,
    VirtualCellDefaultProps
} from "./virtual_cell";
export const VirtualRowDefaultProps = _extends({}, RowDefaultProps, {
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0,
    cellsCount: 1
});
export class VirtualRow extends BaseInfernoComponent {
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
        const modifiedStyles = renderUtils.addHeightToStyle(height, styles);
        const virtualCells = this.getVirtualCells();
        return createComponentVNode(2, Row, {
            className: classes,
            styles: modifiedStyles,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth,
            leftVirtualCellCount: leftVirtualCellCount,
            rightVirtualCellCount: rightVirtualCellCount,
            children: virtualCells.map(((_, index) => createComponentVNode(2, VirtualCell, {
                width: VirtualCellDefaultProps.width,
                isHeaderCell: VirtualCellDefaultProps.isHeaderCell
            }, index.toString())))
        })
    }
}
VirtualRow.defaultProps = VirtualRowDefaultProps;
