/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipBorder = exports.Tooltip = exports.Title = exports.Subtitle = exports.Size = exports.Shadow = exports.SelectionStyle = exports.Margin = exports.LoadingIndicator = exports.LegendTitleSubtitle = exports.LegendTitle = exports.LegendBorder = exports.Legend = exports.LabelBorder = exports.Label = exports.ItemBorder = exports.Item = exports.HoverStyle = exports.Hatching = exports.FunnelTitleSubtitle = exports.FunnelTitle = exports.Format = exports.Font = exports.Export = exports.Connector = exports.Border = exports.AdaptiveLayout = exports.Funnel = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const funnel_1 = __importDefault(require("dpt-ui/viz/funnel"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const Funnel = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["loadingIndicator", "loadingIndicator.show"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onItemClick", "onLegendClick"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultLoadingIndicator: "loadingIndicator",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        adaptiveLayout: { optionName: "adaptiveLayout", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        funnelTitle: { optionName: "title", isCollectionItem: false },
        item: { optionName: "item", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        legend: { optionName: "legend", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: funnel_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.Funnel = Funnel;
const _componentAdaptiveLayout = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AdaptiveLayout = Object.assign(_componentAdaptiveLayout, {
    OptionName: "adaptiveLayout",
});
exports.AdaptiveLayout = AdaptiveLayout;
const _componentBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
exports.Border = Border;
const _componentConnector = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Connector = Object.assign(_componentConnector, {
    OptionName: "connector",
});
exports.Connector = Connector;
const _componentExport = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Export = Object.assign(_componentExport, {
    OptionName: "export",
});
exports.Export = Export;
const _componentFont = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Font = Object.assign(_componentFont, {
    OptionName: "font",
});
exports.Font = Font;
const _componentFormat = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
exports.Format = Format;
const _componentFunnelTitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FunnelTitle = Object.assign(_componentFunnelTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        funnelTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
exports.FunnelTitle = FunnelTitle;
const _componentFunnelTitleSubtitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FunnelTitleSubtitle = Object.assign(_componentFunnelTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.FunnelTitleSubtitle = FunnelTitleSubtitle;
const _componentHatching = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Hatching = Object.assign(_componentHatching, {
    OptionName: "hatching",
});
exports.Hatching = Hatching;
const _componentHoverStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const HoverStyle = Object.assign(_componentHoverStyle, {
    OptionName: "hoverStyle",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        itemBorder: { optionName: "border", isCollectionItem: false }
    },
});
exports.HoverStyle = HoverStyle;
const _componentItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Item = Object.assign(_componentItem, {
    OptionName: "item",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        itemBorder: { optionName: "border", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false }
    },
});
exports.Item = Item;
const _componentItemBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ItemBorder = Object.assign(_componentItemBorder, {
    OptionName: "border",
});
exports.ItemBorder = ItemBorder;
const _componentLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        connector: { optionName: "connector", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        labelBorder: { optionName: "border", isCollectionItem: false }
    },
});
exports.Label = Label;
const _componentLabelBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const LabelBorder = Object.assign(_componentLabelBorder, {
    OptionName: "border",
});
exports.LabelBorder = LabelBorder;
const _componentLegend = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Legend = Object.assign(_componentLegend, {
    OptionName: "legend",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        legendBorder: { optionName: "border", isCollectionItem: false },
        legendTitle: { optionName: "title", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "markerTemplate",
            render: "markerRender",
            component: "markerComponent"
        }],
});
exports.Legend = Legend;
const _componentLegendBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const LegendBorder = Object.assign(_componentLegendBorder, {
    OptionName: "border",
});
exports.LegendBorder = LegendBorder;
const _componentLegendTitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const LegendTitle = Object.assign(_componentLegendTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        legendTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
exports.LegendTitle = LegendTitle;
const _componentLegendTitleSubtitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const LegendTitleSubtitle = Object.assign(_componentLegendTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.LegendTitleSubtitle = LegendTitleSubtitle;
const _componentLoadingIndicator = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const LoadingIndicator = Object.assign(_componentLoadingIndicator, {
    OptionName: "loadingIndicator",
    DefaultsProps: {
        defaultShow: "show"
    },
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.LoadingIndicator = LoadingIndicator;
const _componentMargin = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Margin = Object.assign(_componentMargin, {
    OptionName: "margin",
});
exports.Margin = Margin;
const _componentSelectionStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SelectionStyle = Object.assign(_componentSelectionStyle, {
    OptionName: "selectionStyle",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        itemBorder: { optionName: "border", isCollectionItem: false }
    },
});
exports.SelectionStyle = SelectionStyle;
const _componentShadow = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Shadow = Object.assign(_componentShadow, {
    OptionName: "shadow",
});
exports.Shadow = Shadow;
const _componentSize = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Size = Object.assign(_componentSize, {
    OptionName: "size",
});
exports.Size = Size;
const _componentSubtitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Subtitle = Object.assign(_componentSubtitle, {
    OptionName: "subtitle",
});
exports.Subtitle = Subtitle;
const _componentTitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Title = Object.assign(_componentTitle, {
    OptionName: "title",
});
exports.Title = Title;
const _componentTooltip = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tooltip = Object.assign(_componentTooltip, {
    OptionName: "tooltip",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        shadow: { optionName: "shadow", isCollectionItem: false },
        tooltipBorder: { optionName: "border", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent"
        }],
});
exports.Tooltip = Tooltip;
const _componentTooltipBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TooltipBorder = Object.assign(_componentTooltipBorder, {
    OptionName: "border",
});
exports.TooltipBorder = TooltipBorder;
exports.default = Funnel;
