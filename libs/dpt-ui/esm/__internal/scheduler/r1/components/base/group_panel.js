/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel.js)
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
    createReRenderEffect,
    InfernoWrapperComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    VERTICAL_GROUP_ORIENTATION
} from "../../const";
import {
    isVerticalGroupingApplied
} from "../../utils/index";
import {
    GroupPanelHorizontal
} from "./group_panel_horizontal";
import {
    GroupPanelBaseDefaultProps
} from "./group_panel_props";
import {
    GroupPanelVertical
} from "./group_panel_vertical";
export const GroupPanelDefaultProps = _extends({}, GroupPanelBaseDefaultProps, {
    groups: [],
    groupOrientation: VERTICAL_GROUP_ORIENTATION
});
export class GroupPanel extends InfernoWrapperComponent {
    createEffects() {
        return [createReRenderEffect()]
    }
    render() {
        const {
            className: className,
            viewContext: viewContext,
            elementRef: elementRef,
            groupPanelData: groupPanelData,
            height: height,
            resourceCellTemplate: resourceCellTemplate,
            groupOrientation: groupOrientation,
            groups: groups,
            styles: styles
        } = this.props;
        const ResourceCellTemplateComponent = getTemplate(resourceCellTemplate);
        const isVerticalLayout = isVerticalGroupingApplied(groups, groupOrientation);
        const Layout = isVerticalLayout ? GroupPanelVertical : GroupPanelHorizontal;
        return createComponentVNode(2, Layout, {
            viewContext: viewContext,
            height: height,
            resourceCellTemplate: ResourceCellTemplateComponent,
            className: className,
            groupPanelData: groupPanelData,
            elementRef: elementRef,
            styles: styles,
            groups: GroupPanelDefaultProps.groups,
            groupOrientation: GroupPanelDefaultProps.groupOrientation,
            groupByDate: GroupPanelDefaultProps.groupByDate
        })
    }
}
GroupPanel.defaultProps = GroupPanelDefaultProps;
