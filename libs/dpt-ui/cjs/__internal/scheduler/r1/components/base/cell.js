/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/cell.js)
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
exports.CellBaseDefaultProps = exports.CellBase = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../utils/index");
const CellBaseDefaultProps = exports.CellBaseDefaultProps = {
    className: "",
    isFirstGroupCell: false,
    isLastGroupCell: false,
    startDate: new Date,
    endDate: new Date,
    allDay: false,
    text: "",
    index: 0,
    contentTemplateProps: {
        data: {},
        index: 0
    }
};
class CellBase extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            className: className,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            children: children,
            ariaLabel: ariaLabel
        } = this.props;
        const classes = _index.renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, className);
        return (0, _inferno.createVNode)(1, "td", classes, children, 0, {
            "aria-label": ariaLabel
        })
    }
}
exports.CellBase = CellBase;
CellBase.defaultProps = CellBaseDefaultProps;
