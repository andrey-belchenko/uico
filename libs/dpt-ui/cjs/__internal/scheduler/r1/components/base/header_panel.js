/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/header_panel.js)
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
exports.HeaderPanelDefaultProps = exports.HeaderPanel = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _date_header = require("./date_header");
var _group_panel = require("./group_panel");

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const HeaderPanelDefaultProps = exports.HeaderPanelDefaultProps = _extends({}, _group_panel.GroupPanelDefaultProps, {
    isRenderDateHeader: true,
    dateHeaderTemplate: _date_header.DateHeader
});
class HeaderPanel extends _inferno2.InfernoWrapperComponent {
    createEffects() {
        return [(0, _inferno2.createReRenderEffect)()]
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
        const isHorizontalGrouping = (0, _index2.isHorizontalGroupingApplied)(groups, groupOrientation);
        const DateCellTemplateComponent = (0, _index.getTemplate)(dateCellTemplate);
        const DateHeaderTemplateComponent = (0, _index.getTemplate)(dateHeaderTemplate);
        const ResourceCellTemplateComponent = (0, _index.getTemplate)(resourceCellTemplate);
        const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
        return (0, _inferno.createVNode)(1, "thead", null, [isHorizontalGrouping && !groupByDate && (0, _inferno.createComponentVNode)(2, _group_panel.GroupPanel, {
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
        }), groupByDate && (0, _inferno.createComponentVNode)(2, _group_panel.GroupPanel, {
            viewContext: viewContext,
            groupPanelData: groupPanelData,
            groups: groups,
            groupByDate: groupByDate,
            groupOrientation: groupOrientation,
            resourceCellTemplate: ResourceCellTemplateComponent
        })], 0)
    }
}
exports.HeaderPanel = HeaderPanel;
HeaderPanel.defaultProps = HeaderPanelDefaultProps;
