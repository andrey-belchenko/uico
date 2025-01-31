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
exports.VectorMapTitleSubtitle = exports.VectorMapTitle = exports.TooltipBorder = exports.Tooltip = exports.Title = exports.Subtitle = exports.Source = exports.Size = exports.Shadow = exports.Projection = exports.Margin = exports.LoadingIndicator = exports.LegendTitleSubtitle = exports.LegendTitle = exports.Legend = exports.Layer = exports.Label = exports.Image = exports.Font = exports.Export = exports.ControlBar = exports.CommonAnnotationSettings = exports.Border = exports.Background = exports.AnnotationBorder = exports.Annotation = exports.VectorMap = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const vector_map_1 = __importDefault(require("dpt-ui/viz/vector_map"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const VectorMap = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["loadingIndicator", "loadingIndicator.show"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onClick", "onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onTooltipHidden", "onTooltipShown"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultLoadingIndicator: "loadingIndicator",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        annotation: { optionName: "annotations", isCollectionItem: true },
        background: { optionName: "background", isCollectionItem: false },
        commonAnnotationSettings: { optionName: "commonAnnotationSettings", isCollectionItem: false },
        controlBar: { optionName: "controlBar", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        layer: { optionName: "layers", isCollectionItem: true },
        legend: { optionName: "legends", isCollectionItem: true },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        projection: { optionName: "projection", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false },
        vectorMapTitle: { optionName: "title", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: vector_map_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.VectorMap = VectorMap;
const _componentAnnotation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Annotation = Object.assign(_componentAnnotation, {
    OptionName: "annotations",
    IsCollectionItem: true,
    ExpectedChildren: {
        annotationBorder: { optionName: "border", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        image: { optionName: "image", isCollectionItem: false },
        shadow: { optionName: "shadow", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }, {
            tmplOption: "tooltipTemplate",
            render: "tooltipRender",
            component: "tooltipComponent"
        }],
});
exports.Annotation = Annotation;
const _componentAnnotationBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AnnotationBorder = Object.assign(_componentAnnotationBorder, {
    OptionName: "border",
});
exports.AnnotationBorder = AnnotationBorder;
const _componentBackground = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Background = Object.assign(_componentBackground, {
    OptionName: "background",
});
exports.Background = Background;
const _componentBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
exports.Border = Border;
const _componentCommonAnnotationSettings = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonAnnotationSettings = Object.assign(_componentCommonAnnotationSettings, {
    OptionName: "commonAnnotationSettings",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }, {
            tmplOption: "tooltipTemplate",
            render: "tooltipRender",
            component: "tooltipComponent"
        }],
});
exports.CommonAnnotationSettings = CommonAnnotationSettings;
const _componentControlBar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ControlBar = Object.assign(_componentControlBar, {
    OptionName: "controlBar",
});
exports.ControlBar = ControlBar;
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
const _componentImage = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Image = Object.assign(_componentImage, {
    OptionName: "image",
});
exports.Image = Image;
const _componentLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.Label = Label;
const _componentLayer = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Layer = Object.assign(_componentLayer, {
    OptionName: "layers",
    IsCollectionItem: true,
    ExpectedChildren: {
        label: { optionName: "label", isCollectionItem: false }
    },
});
exports.Layer = Layer;
const _componentLegend = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Legend = Object.assign(_componentLegend, {
    OptionName: "legends",
    IsCollectionItem: true,
    ExpectedChildren: {
        annotationBorder: { optionName: "border", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        legendTitle: { optionName: "title", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        source: { optionName: "source", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "markerTemplate",
            render: "markerRender",
            component: "markerComponent"
        }],
});
exports.Legend = Legend;
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
const _componentProjection = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Projection = Object.assign(_componentProjection, {
    OptionName: "projection",
});
exports.Projection = Projection;
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
const _componentSource = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Source = Object.assign(_componentSource, {
    OptionName: "source",
});
exports.Source = Source;
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
const _componentVectorMapTitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const VectorMapTitle = Object.assign(_componentVectorMapTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false },
        vectorMapTitleSubtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
exports.VectorMapTitle = VectorMapTitle;
const _componentVectorMapTitleSubtitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const VectorMapTitleSubtitle = Object.assign(_componentVectorMapTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.VectorMapTitleSubtitle = VectorMapTitleSubtitle;
exports.default = VectorMap;
