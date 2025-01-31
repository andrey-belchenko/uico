/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/ordinary_cell.js)
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
exports.OrdinaryCellDefaultProps = exports.OrdinaryCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
const OrdinaryCellDefaultProps = exports.OrdinaryCellDefaultProps = {};
class OrdinaryCell extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            children: children,
            className: className,
            colSpan: colSpan,
            styles: styles
        } = this.props;
        return (0, _inferno.createVNode)(1, "td", className, children, 0, {
            style: (0, _inferno2.normalizeStyles)(styles),
            colSpan: colSpan
        })
    }
}
exports.OrdinaryCell = OrdinaryCell;
OrdinaryCell.defaultProps = OrdinaryCellDefaultProps;
