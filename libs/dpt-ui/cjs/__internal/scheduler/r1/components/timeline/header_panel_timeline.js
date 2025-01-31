/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/timeline/header_panel_timeline.js)
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
exports.HeaderPanelTimeline = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _header_panel = require("../base/header_panel");
var _date_header_timeline = require("./date_header_timeline");
class HeaderPanelTimeline extends _inferno2.InfernoWrapperComponent {
    createEffects() {
        return [(0, _inferno2.createReRenderEffect)()]
    }
    render() {
        const {
            viewContext: viewContext,
            dateCellTemplate: dateCellTemplate,
            dateHeaderData: dateHeaderData,
            groupByDate: groupByDate,
            groupOrientation: groupOrientation,
            groupPanelData: groupPanelData,
            groups: groups,
            isRenderDateHeader: isRenderDateHeader,
            resourceCellTemplate: resourceCellTemplate,
            timeCellTemplate: timeCellTemplate
        } = this.props;
        const DateCellTemplateComponent = (0, _index.getTemplate)(dateCellTemplate);
        const ResourceCellTemplateComponent = (0, _index.getTemplate)(resourceCellTemplate);
        const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
        return (0, _inferno.createComponentVNode)(2, _header_panel.HeaderPanel, {
            viewContext: viewContext,
            dateHeaderData: dateHeaderData,
            groupPanelData: groupPanelData,
            groupByDate: groupByDate,
            groups: groups,
            groupOrientation: groupOrientation,
            isRenderDateHeader: isRenderDateHeader,
            dateHeaderTemplate: _date_header_timeline.TimelineDateHeaderLayout,
            resourceCellTemplate: ResourceCellTemplateComponent,
            dateCellTemplate: DateCellTemplateComponent,
            timeCellTemplate: TimeCellTemplateComponent
        })
    }
}
exports.HeaderPanelTimeline = HeaderPanelTimeline;
HeaderPanelTimeline.defaultProps = _header_panel.HeaderPanelDefaultProps;
