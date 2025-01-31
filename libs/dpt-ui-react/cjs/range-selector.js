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
exports.Size = exports.Shutter = exports.SeriesTemplate = exports.SeriesBorder = exports.Series = exports.SelectionStyle = exports.ScaleLabel = exports.Scale = exports.Reduction = exports.PointSelectionStyle = exports.PointImage = exports.PointHoverStyle = exports.PointBorder = exports.Point = exports.MinRange = exports.MinorTickInterval = exports.MinorTick = exports.MaxRange = exports.MarkerLabel = exports.Marker = exports.Margin = exports.LoadingIndicator = exports.Length = exports.Label = exports.Indent = exports.Image = exports.HoverStyle = exports.Height = exports.Hatching = exports.Format = exports.Font = exports.Export = exports.DataPrepareSettings = exports.Connector = exports.CommonSeriesSettingsSelectionStyle = exports.CommonSeriesSettingsLabel = exports.CommonSeriesSettingsHoverStyle = exports.CommonSeriesSettings = exports.Color = exports.Chart = exports.BreakStyle = exports.Break = exports.Border = exports.Behavior = exports.BackgroundImage = exports.Background = exports.ArgumentFormat = exports.AggregationInterval = exports.Aggregation = exports.RangeSelector = void 0;
exports.Width = exports.ValueErrorBar = exports.ValueAxis = exports.Value = exports.Url = exports.Title = exports.TickInterval = exports.Tick = exports.Subtitle = exports.SliderMarker = exports.SliderHandle = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const range_selector_1 = __importDefault(require("dpt-ui/viz/range_selector"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const RangeSelector = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["loadingIndicator", "loadingIndicator.show", "value"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onValueChanged"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultLoadingIndicator: "loadingIndicator",
        defaultValue: "value",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        background: { optionName: "background", isCollectionItem: false },
        behavior: { optionName: "behavior", isCollectionItem: false },
        chart: { optionName: "chart", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        indent: { optionName: "indent", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        scale: { optionName: "scale", isCollectionItem: false },
        shutter: { optionName: "shutter", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        sliderHandle: { optionName: "sliderHandle", isCollectionItem: false },
        sliderMarker: { optionName: "sliderMarker", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        value: { optionName: "value", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: range_selector_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.RangeSelector = RangeSelector;
const _componentAggregation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Aggregation = Object.assign(_componentAggregation, {
    OptionName: "aggregation",
});
exports.Aggregation = Aggregation;
const _componentAggregationInterval = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AggregationInterval = Object.assign(_componentAggregationInterval, {
    OptionName: "aggregationInterval",
});
exports.AggregationInterval = AggregationInterval;
const _componentArgumentFormat = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ArgumentFormat = Object.assign(_componentArgumentFormat, {
    OptionName: "argumentFormat",
});
exports.ArgumentFormat = ArgumentFormat;
const _componentBackground = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Background = Object.assign(_componentBackground, {
    OptionName: "background",
    ExpectedChildren: {
        backgroundImage: { optionName: "image", isCollectionItem: false },
        image: { optionName: "image", isCollectionItem: false }
    },
});
exports.Background = Background;
const _componentBackgroundImage = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const BackgroundImage = Object.assign(_componentBackgroundImage, {
    OptionName: "image",
});
exports.BackgroundImage = BackgroundImage;
const _componentBehavior = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Behavior = Object.assign(_componentBehavior, {
    OptionName: "behavior",
});
exports.Behavior = Behavior;
const _componentBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
exports.Border = Border;
const _componentBreak = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Break = Object.assign(_componentBreak, {
    OptionName: "breaks",
    IsCollectionItem: true,
});
exports.Break = Break;
const _componentBreakStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const BreakStyle = Object.assign(_componentBreakStyle, {
    OptionName: "breakStyle",
});
exports.BreakStyle = BreakStyle;
const _componentChart = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Chart = Object.assign(_componentChart, {
    OptionName: "chart",
    ExpectedChildren: {
        commonSeriesSettings: { optionName: "commonSeriesSettings", isCollectionItem: false },
        dataPrepareSettings: { optionName: "dataPrepareSettings", isCollectionItem: false },
        series: { optionName: "series", isCollectionItem: true },
        seriesTemplate: { optionName: "seriesTemplate", isCollectionItem: false },
        valueAxis: { optionName: "valueAxis", isCollectionItem: false }
    },
});
exports.Chart = Chart;
const _componentColor = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Color = Object.assign(_componentColor, {
    OptionName: "color",
});
exports.Color = Color;
const _componentCommonSeriesSettings = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonSeriesSettings = Object.assign(_componentCommonSeriesSettings, {
    OptionName: "commonSeriesSettings",
    ExpectedChildren: {
        aggregation: { optionName: "aggregation", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        commonSeriesSettingsHoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        commonSeriesSettingsLabel: { optionName: "label", isCollectionItem: false },
        commonSeriesSettingsSelectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        point: { optionName: "point", isCollectionItem: false },
        reduction: { optionName: "reduction", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false },
        valueErrorBar: { optionName: "valueErrorBar", isCollectionItem: false }
    },
});
exports.CommonSeriesSettings = CommonSeriesSettings;
const _componentCommonSeriesSettingsHoverStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonSeriesSettingsHoverStyle = Object.assign(_componentCommonSeriesSettingsHoverStyle, {
    OptionName: "hoverStyle",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false }
    },
});
exports.CommonSeriesSettingsHoverStyle = CommonSeriesSettingsHoverStyle;
const _componentCommonSeriesSettingsLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonSeriesSettingsLabel = Object.assign(_componentCommonSeriesSettingsLabel, {
    OptionName: "label",
    ExpectedChildren: {
        argumentFormat: { optionName: "argumentFormat", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        connector: { optionName: "connector", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false }
    },
});
exports.CommonSeriesSettingsLabel = CommonSeriesSettingsLabel;
const _componentCommonSeriesSettingsSelectionStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonSeriesSettingsSelectionStyle = Object.assign(_componentCommonSeriesSettingsSelectionStyle, {
    OptionName: "selectionStyle",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false }
    },
});
exports.CommonSeriesSettingsSelectionStyle = CommonSeriesSettingsSelectionStyle;
const _componentConnector = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Connector = Object.assign(_componentConnector, {
    OptionName: "connector",
});
exports.Connector = Connector;
const _componentDataPrepareSettings = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const DataPrepareSettings = Object.assign(_componentDataPrepareSettings, {
    OptionName: "dataPrepareSettings",
});
exports.DataPrepareSettings = DataPrepareSettings;
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
const _componentHatching = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Hatching = Object.assign(_componentHatching, {
    OptionName: "hatching",
});
exports.Hatching = Hatching;
const _componentHeight = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Height = Object.assign(_componentHeight, {
    OptionName: "height",
});
exports.Height = Height;
const _componentHoverStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const HoverStyle = Object.assign(_componentHoverStyle, {
    OptionName: "hoverStyle",
});
exports.HoverStyle = HoverStyle;
const _componentImage = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Image = Object.assign(_componentImage, {
    OptionName: "image",
});
exports.Image = Image;
const _componentIndent = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Indent = Object.assign(_componentIndent, {
    OptionName: "indent",
});
exports.Indent = Indent;
const _componentLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
});
exports.Label = Label;
const _componentLength = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Length = Object.assign(_componentLength, {
    OptionName: "length",
});
exports.Length = Length;
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
const _componentMarker = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Marker = Object.assign(_componentMarker, {
    OptionName: "marker",
    ExpectedChildren: {
        label: { optionName: "label", isCollectionItem: false },
        markerLabel: { optionName: "label", isCollectionItem: false }
    },
});
exports.Marker = Marker;
const _componentMarkerLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MarkerLabel = Object.assign(_componentMarkerLabel, {
    OptionName: "label",
    ExpectedChildren: {
        format: { optionName: "format", isCollectionItem: false }
    },
});
exports.MarkerLabel = MarkerLabel;
const _componentMaxRange = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MaxRange = Object.assign(_componentMaxRange, {
    OptionName: "maxRange",
});
exports.MaxRange = MaxRange;
const _componentMinorTick = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MinorTick = Object.assign(_componentMinorTick, {
    OptionName: "minorTick",
});
exports.MinorTick = MinorTick;
const _componentMinorTickInterval = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MinorTickInterval = Object.assign(_componentMinorTickInterval, {
    OptionName: "minorTickInterval",
});
exports.MinorTickInterval = MinorTickInterval;
const _componentMinRange = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MinRange = Object.assign(_componentMinRange, {
    OptionName: "minRange",
});
exports.MinRange = MinRange;
const _componentPoint = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Point = Object.assign(_componentPoint, {
    OptionName: "point",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        image: { optionName: "image", isCollectionItem: false },
        pointBorder: { optionName: "border", isCollectionItem: false },
        pointHoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        pointImage: { optionName: "image", isCollectionItem: false },
        pointSelectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false }
    },
});
exports.Point = Point;
const _componentPointBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PointBorder = Object.assign(_componentPointBorder, {
    OptionName: "border",
});
exports.PointBorder = PointBorder;
const _componentPointHoverStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PointHoverStyle = Object.assign(_componentPointHoverStyle, {
    OptionName: "hoverStyle",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        pointBorder: { optionName: "border", isCollectionItem: false }
    },
});
exports.PointHoverStyle = PointHoverStyle;
const _componentPointImage = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PointImage = Object.assign(_componentPointImage, {
    OptionName: "image",
    ExpectedChildren: {
        height: { optionName: "height", isCollectionItem: false },
        url: { optionName: "url", isCollectionItem: false },
        width: { optionName: "width", isCollectionItem: false }
    },
});
exports.PointImage = PointImage;
const _componentPointSelectionStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PointSelectionStyle = Object.assign(_componentPointSelectionStyle, {
    OptionName: "selectionStyle",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        pointBorder: { optionName: "border", isCollectionItem: false }
    },
});
exports.PointSelectionStyle = PointSelectionStyle;
const _componentReduction = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Reduction = Object.assign(_componentReduction, {
    OptionName: "reduction",
});
exports.Reduction = Reduction;
const _componentScale = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Scale = Object.assign(_componentScale, {
    OptionName: "scale",
    ExpectedChildren: {
        aggregationInterval: { optionName: "aggregationInterval", isCollectionItem: false },
        break: { optionName: "breaks", isCollectionItem: true },
        breakStyle: { optionName: "breakStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        marker: { optionName: "marker", isCollectionItem: false },
        maxRange: { optionName: "maxRange", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        minorTickInterval: { optionName: "minorTickInterval", isCollectionItem: false },
        minRange: { optionName: "minRange", isCollectionItem: false },
        scaleLabel: { optionName: "label", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false },
        tickInterval: { optionName: "tickInterval", isCollectionItem: false }
    },
});
exports.Scale = Scale;
const _componentScaleLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ScaleLabel = Object.assign(_componentScaleLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    },
});
exports.ScaleLabel = ScaleLabel;
const _componentSelectionStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SelectionStyle = Object.assign(_componentSelectionStyle, {
    OptionName: "selectionStyle",
});
exports.SelectionStyle = SelectionStyle;
const _componentSeries = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Series = Object.assign(_componentSeries, {
    OptionName: "series",
    IsCollectionItem: true,
});
exports.Series = Series;
const _componentSeriesBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SeriesBorder = Object.assign(_componentSeriesBorder, {
    OptionName: "border",
});
exports.SeriesBorder = SeriesBorder;
const _componentSeriesTemplate = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SeriesTemplate = Object.assign(_componentSeriesTemplate, {
    OptionName: "seriesTemplate",
});
exports.SeriesTemplate = SeriesTemplate;
const _componentShutter = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Shutter = Object.assign(_componentShutter, {
    OptionName: "shutter",
});
exports.Shutter = Shutter;
const _componentSize = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Size = Object.assign(_componentSize, {
    OptionName: "size",
});
exports.Size = Size;
const _componentSliderHandle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SliderHandle = Object.assign(_componentSliderHandle, {
    OptionName: "sliderHandle",
});
exports.SliderHandle = SliderHandle;
const _componentSliderMarker = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SliderMarker = Object.assign(_componentSliderMarker, {
    OptionName: "sliderMarker",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    },
});
exports.SliderMarker = SliderMarker;
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
const _componentTick = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tick = Object.assign(_componentTick, {
    OptionName: "tick",
});
exports.Tick = Tick;
const _componentTickInterval = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TickInterval = Object.assign(_componentTickInterval, {
    OptionName: "tickInterval",
});
exports.TickInterval = TickInterval;
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
const _componentUrl = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Url = Object.assign(_componentUrl, {
    OptionName: "url",
});
exports.Url = Url;
const _componentValue = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Value = Object.assign(_componentValue, {
    OptionName: "value",
    DefaultsProps: {
        defaultEndValue: "endValue",
        defaultStartValue: "startValue"
    },
    ExpectedChildren: {
        length: { optionName: "length", isCollectionItem: false }
    },
});
exports.Value = Value;
const _componentValueAxis = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ValueAxis = Object.assign(_componentValueAxis, {
    OptionName: "valueAxis",
});
exports.ValueAxis = ValueAxis;
const _componentValueErrorBar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ValueErrorBar = Object.assign(_componentValueErrorBar, {
    OptionName: "valueErrorBar",
});
exports.ValueErrorBar = ValueErrorBar;
const _componentWidth = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Width = Object.assign(_componentWidth, {
    OptionName: "width",
});
exports.Width = Width;
exports.default = RangeSelector;
