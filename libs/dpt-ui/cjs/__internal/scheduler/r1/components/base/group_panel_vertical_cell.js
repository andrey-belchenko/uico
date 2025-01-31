/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/group_panel_vertical_cell.js)
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
exports.GroupPanelVerticalCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _group_panel_props = require("./group_panel_props");
class GroupPanelVerticalCell extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            className: className,
            data: data,
            id: id,
            color: color,
            text: text,
            index: index,
            cellTemplate: cellTemplate
        } = this.props;
        const CellTemplateComponent = (0, _index.getTemplate)(cellTemplate);
        return (0, _inferno.createVNode)(1, "div", `dx-scheduler-group-header ${className}`, CellTemplateComponent ? CellTemplateComponent({
            data: {
                data: data,
                id: id,
                color: color,
                text: text
            },
            index: index
        }) : (0, _inferno.createVNode)(1, "div", "dx-scheduler-group-header-content", text, 0), 0)
    }
}
exports.GroupPanelVerticalCell = GroupPanelVerticalCell;
GroupPanelVerticalCell.defaultProps = _group_panel_props.GroupPanelCellDefaultProps;
