/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/header_cell.js)
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
exports.HeaderCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _ordinary_cell = require("./ordinary_cell");
class HeaderCell extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            children: children,
            className: className,
            colSpan: colSpan,
            styles: styles
        } = this.props;
        return (0, _inferno.createVNode)(1, "th", className, children, 0, {
            style: (0, _inferno2.normalizeStyles)(styles),
            colSpan: colSpan
        })
    }
}
exports.HeaderCell = HeaderCell;
HeaderCell.defaultProps = _ordinary_cell.OrdinaryCellDefaultProps;
