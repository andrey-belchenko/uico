/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/group_panel_horizontal_row.js)
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
exports.GroupPanelHorizontalRow = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _group_panel_horizontal_cell = require("./group_panel_horizontal_cell");
var _group_panel_props = require("./group_panel_props");
class GroupPanelHorizontalRow extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            cellTemplate: cellTemplate,
            className: className,
            groupItems: groupItems
        } = this.props;
        const CellTemplateComponent = (0, _index.getTemplate)(cellTemplate);
        return (0, _inferno.createVNode)(1, "tr", `dx-scheduler-group-row ${className}`, groupItems.map(((_ref, index) => {
            let {
                colSpan: colSpan,
                color: color,
                data: data,
                id: id,
                isFirstGroupCell: isFirstGroupCell,
                isLastGroupCell: isLastGroupCell,
                key: key,
                text: text
            } = _ref;
            return (0, _inferno.createComponentVNode)(2, _group_panel_horizontal_cell.GroupPanelHorizontalCell, {
                text: text,
                id: id,
                data: data,
                index: index,
                color: color,
                colSpan: colSpan ?? _group_panel_horizontal_cell.GroupPanelHorizontalCellDefaultProps.colSpan,
                isFirstGroupCell: !!isFirstGroupCell,
                isLastGroupCell: !!isLastGroupCell,
                cellTemplate: CellTemplateComponent
            }, key)
        })), 0)
    }
}
exports.GroupPanelHorizontalRow = GroupPanelHorizontalRow;
GroupPanelHorizontalRow.defaultProps = _group_panel_props.GroupPanelRowDefaultProps;
