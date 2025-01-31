/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/header_panel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    createVNode,
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
    isHorizontalGroupingApplied
} from "../../utils/index";
import {
    DateHeader
} from "./date_header";
import {
    GroupPanel,
    GroupPanelDefaultProps
} from "./group_panel";
export const HeaderPanelDefaultProps = _extends({}, GroupPanelDefaultProps, {
    isRenderDateHeader: true,
    dateHeaderTemplate: DateHeader
});
export class HeaderPanel extends InfernoWrapperComponent {
    createEffects() {
        return [createReRenderEffect()]
    }
    render() {
        const {
            viewContext: viewContext,
            dateHeaderData: dateHeaderData,
            groupByDate: groupByDate,
            groupOrientation: groupOrientation,
            groupPanelData: groupPanelData,
            groups: groups,
            isRenderDateHeader: isRenderDateHeader,
            dateCellTemplate: dateCellTemplate,
            dateHeaderTemplate: dateHeaderTemplate,
            resourceCellTemplate: resourceCellTemplate,
            timeCellTemplate: timeCellTemplate
        } = this.props;
        const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
        const DateCellTemplateComponent = getTemplate(dateCellTemplate);
        const DateHeaderTemplateComponent = getTemplate(dateHeaderTemplate);
        const ResourceCellTemplateComponent = getTemplate(resourceCellTemplate);
        const TimeCellTemplateComponent = getTemplate(timeCellTemplate);
        return createVNode(1, "thead", null, [isHorizontalGrouping && !groupByDate && createComponentVNode(2, GroupPanel, {
            viewContext: viewContext,
            groupPanelData: groupPanelData,
            groups: groups,
            groupByDate: groupByDate,
            groupOrientation: groupOrientation,
            resourceCellTemplate: ResourceCellTemplateComponent
        }), isRenderDateHeader && DateHeaderTemplateComponent({
            viewContext: viewContext,
            groupByDate: groupByDate,
            dateHeaderData: dateHeaderData,
            groupOrientation: groupOrientation,
            groups: groups,
            dateCellTemplate: DateCellTemplateComponent,
            timeCellTemplate: TimeCellTemplateComponent
        }), groupByDate && createComponentVNode(2, GroupPanel, {
            viewContext: viewContext,
            groupPanelData: groupPanelData,
            groups: groups,
            groupByDate: groupByDate,
            groupOrientation: groupOrientation,
            resourceCellTemplate: ResourceCellTemplateComponent
        })], 0)
    }
}
HeaderPanel.defaultProps = HeaderPanelDefaultProps;
