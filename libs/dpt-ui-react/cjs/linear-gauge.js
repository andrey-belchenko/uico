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
exports.Width = exports.ValueIndicator = exports.Tooltip = exports.Title = exports.Tick = exports.Text = exports.SubvalueIndicator = exports.Subtitle = exports.Size = exports.Shadow = exports.Scale = exports.RangeContainer = exports.Range = exports.MinorTick = exports.Margin = exports.LoadingIndicator = exports.Label = exports.Geometry = exports.Format = exports.Font = exports.Export = exports.Color = exports.Border = exports.BackgroundColor = exports.Animation = exports.LinearGauge = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const linear_gauge_1 = __importDefault(require("dpt-ui/viz/linear_gauge"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const LinearGauge = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["loadingIndicator", "loadingIndicator.show", "subvalues", "value"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onTooltipHidden", "onTooltipShown"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultLoadingIndicator: "loadingIndicator",
        defaultSubvalues: "subvalues",
        defaultValue: "value",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        animation: { optionName: "animation", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        geometry: { optionName: "geometry", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        rangeContainer: { optionName: "rangeContainer", isCollectionItem: false },
        scale: { optionName: "scale", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        subvalueIndicator: { optionName: "subvalueIndicator", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false },
        valueIndicator: { optionName: "valueIndicator", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: linear_gauge_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.LinearGauge = LinearGauge;
const _componentAnimation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Animation = Object.assign(_componentAnimation, {
    OptionName: "animation",
});
exports.Animation = Animation;
const _componentBackgroundColor = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const BackgroundColor = Object.assign(_componentBackgroundColor, {
    OptionName: "backgroundColor",
});
exports.BackgroundColor = BackgroundColor;
const _componentBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
exports.Border = Border;
const _componentColor = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Color = Object.assign(_componentColor, {
    OptionName: "color",
});
exports.Color = Color;
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
const _componentGeometry = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Geometry = Object.assign(_componentGeometry, {
    OptionName: "geometry",
});
exports.Geometry = Geometry;
const _componentLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    },
});
exports.Label = Label;
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
const _componentMinorTick = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MinorTick = Object.assign(_componentMinorTick, {
    OptionName: "minorTick",
});
exports.MinorTick = MinorTick;
const _componentRange = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Range = Object.assign(_componentRange, {
    OptionName: "ranges",
    IsCollectionItem: true,
    ExpectedChildren: {
        color: { optionName: "color", isCollectionItem: false }
    },
});
exports.Range = Range;
const _componentRangeContainer = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const RangeContainer = Object.assign(_componentRangeContainer, {
    OptionName: "rangeContainer",
    ExpectedChildren: {
        backgroundColor: { optionName: "backgroundColor", isCollectionItem: false },
        range: { optionName: "ranges", isCollectionItem: true },
        width: { optionName: "width", isCollectionItem: false }
    },
});
exports.RangeContainer = RangeContainer;
const _componentScale = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Scale = Object.assign(_componentScale, {
    OptionName: "scale",
    ExpectedChildren: {
        label: { optionName: "label", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false }
    },
});
exports.Scale = Scale;
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
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.Subtitle = Subtitle;
const _componentSubvalueIndicator = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SubvalueIndicator = Object.assign(_componentSubvalueIndicator, {
    OptionName: "subvalueIndicator",
    ExpectedChildren: {
        color: { optionName: "color", isCollectionItem: false },
        text: { optionName: "text", isCollectionItem: false }
    },
});
exports.SubvalueIndicator = SubvalueIndicator;
const _componentText = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Text = Object.assign(_componentText, {
    OptionName: "text",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    },
});
exports.Text = Text;
const _componentTick = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tick = Object.assign(_componentTick, {
    OptionName: "tick",
});
exports.Tick = Tick;
const _componentTitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Title = Object.assign(_componentTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
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
        shadow: { optionName: "shadow", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent"
        }],
});
exports.Tooltip = Tooltip;
const _componentValueIndicator = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ValueIndicator = Object.assign(_componentValueIndicator, {
    OptionName: "valueIndicator",
});
exports.ValueIndicator = ValueIndicator;
const _componentWidth = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Width = Object.assign(_componentWidth, {
    OptionName: "width",
});
exports.Width = Width;
exports.default = LinearGauge;
