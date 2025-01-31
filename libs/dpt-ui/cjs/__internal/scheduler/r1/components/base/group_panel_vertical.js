/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/group_panel_vertical.js)
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
exports.GroupPanelVertical = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _group_panel_props = require("./group_panel_props");
var _group_panel_vertical_row = require("./group_panel_vertical_row");
class GroupPanelVertical extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            className: className,
            elementRef: elementRef,
            groupPanelData: groupPanelData,
            resourceCellTemplate: resourceCellTemplate,
            height: height,
            styles: styles
        } = this.props;
        const style = (0, _inferno2.normalizeStyles)(_index2.renderUtils.addHeightToStyle(height, styles));
        const ResourceCellTemplateComponent = (0, _index.getTemplate)(resourceCellTemplate);
        return (0, _inferno.createVNode)(1, "div", className, (0, _inferno.createVNode)(1, "div", "dx-scheduler-group-flex-container", groupPanelData.groupPanelItems.map((group => (0, _inferno.createComponentVNode)(2, _group_panel_vertical_row.GroupPanelVerticalRow, {
            groupItems: group,
            cellTemplate: ResourceCellTemplateComponent
        }, group[0].key))), 0), 2, {
            style: style
        }, null, elementRef)
    }
}
exports.GroupPanelVertical = GroupPanelVertical;
GroupPanelVertical.defaultProps = _group_panel_props.GroupPanelBaseDefaultProps;
