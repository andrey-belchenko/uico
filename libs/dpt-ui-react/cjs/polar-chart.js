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
exports.PolarChartTitle = exports.PointSelectionStyle = exports.PointHoverStyle = exports.PointBorder = exports.Point = exports.MinVisualRangeLength = exports.MinorTickInterval = exports.MinorTick = exports.MinorGrid = exports.Margin = exports.LoadingIndicator = exports.Length = exports.LegendTitleSubtitle = exports.LegendTitle = exports.Legend = exports.Label = exports.Image = exports.HoverStyle = exports.Hatching = exports.Grid = exports.Format = exports.Font = exports.Export = exports.DataPrepareSettings = exports.ConstantLineStyleLabel = exports.ConstantLineStyle = exports.ConstantLineLabel = exports.ConstantLine = exports.Connector = exports.CommonSeriesSettingsSelectionStyle = exports.CommonSeriesSettingsLabel = exports.CommonSeriesSettingsHoverStyle = exports.CommonSeriesSettings = exports.CommonAxisSettingsTick = exports.CommonAxisSettingsMinorTick = exports.CommonAxisSettingsLabel = exports.CommonAxisSettings = exports.CommonAnnotationSettings = exports.Color = exports.Border = exports.AxisLabel = exports.ArgumentFormat = exports.ArgumentAxisTick = exports.ArgumentAxisMinorTick = exports.ArgumentAxis = exports.AnnotationBorder = exports.Annotation = exports.Animation = exports.AdaptiveLayout = exports.PolarChart = void 0;
exports.WholeRange = exports.VisualRange = exports.ValueErrorBar = exports.ValueAxis = exports.TooltipBorder = exports.Tooltip = exports.Title = exports.TickInterval = exports.Tick = exports.Subtitle = exports.StripStyleLabel = exports.StripStyle = exports.StripLabel = exports.Strip = exports.Size = exports.Shadow = exports.SeriesTemplate = exports.SeriesBorder = exports.Series = exports.SelectionStyle = exports.PolarChartTitleSubtitle = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const polar_chart_1 = __importDefault(require("dpt-ui/viz/polar_chart"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const PolarChart = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["loadingIndicator", "loadingIndicator.show", "valueAxis", "valueAxis.visualRange"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onArgumentAxisClick", "onDisposing", "onDone", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onLegendClick", "onPointClick", "onSeriesClick", "onTooltipHidden", "onTooltipShown", "onZoomEnd", "onZoomStart"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultLoadingIndicator: "loadingIndicator",
        defaultValueAxis: "valueAxis",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        adaptiveLayout: { optionName: "adaptiveLayout", isCollectionItem: false },
        animation: { optionName: "animation", isCollectionItem: false },
        annotation: { optionName: "annotations", isCollectionItem: true },
        argumentAxis: { optionName: "argumentAxis", isCollectionItem: false },
        commonAnnotationSettings: { optionName: "commonAnnotationSettings", isCollectionItem: false },
        commonAxisSettings: { optionName: "commonAxisSettings", isCollectionItem: false },
        commonSeriesSettings: { optionName: "commonSeriesSettings", isCollectionItem: false },
        dataPrepareSettings: { optionName: "dataPrepareSettings", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        legend: { optionName: "legend", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        polarChartTitle: { optionName: "title", isCollectionItem: false },
        series: { optionName: "series", isCollectionItem: true },
        seriesTemplate: { optionName: "seriesTemplate", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false },
        valueAxis: { optionName: "valueAxis", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: polar_chart_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.PolarChart = PolarChart;
const _componentAdaptiveLayout = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AdaptiveLayout = Object.assign(_componentAdaptiveLayout, {
    OptionName: "adaptiveLayout",
});
exports.AdaptiveLayout = AdaptiveLayout;
const _componentAnimation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Animation = Object.assign(_componentAnimation, {
    OptionName: "animation",
});
exports.Animation = Animation;
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
const _componentArgumentAxis = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ArgumentAxis = Object.assign(_componentArgumentAxis, {
    OptionName: "argumentAxis",
    ExpectedChildren: {
        argumentAxisMinorTick: { optionName: "minorTick", isCollectionItem: false },
        argumentAxisTick: { optionName: "tick", isCollectionItem: false },
        axisLabel: { optionName: "label", isCollectionItem: false },
        constantLine: { optionName: "constantLines", isCollectionItem: true },
        constantLineStyle: { optionName: "constantLineStyle", isCollectionItem: false },
        grid: { optionName: "grid", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        minorGrid: { optionName: "minorGrid", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        minorTickInterval: { optionName: "minorTickInterval", isCollectionItem: false },
        strip: { optionName: "strips", isCollectionItem: true },
        stripStyle: { optionName: "stripStyle", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false },
        tickInterval: { optionName: "tickInterval", isCollectionItem: false }
    },
});
exports.ArgumentAxis = ArgumentAxis;
const _componentArgumentAxisMinorTick = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ArgumentAxisMinorTick = Object.assign(_componentArgumentAxisMinorTick, {
    OptionName: "minorTick",
});
exports.ArgumentAxisMinorTick = ArgumentAxisMinorTick;
const _componentArgumentAxisTick = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ArgumentAxisTick = Object.assign(_componentArgumentAxisTick, {
    OptionName: "tick",
});
exports.ArgumentAxisTick = ArgumentAxisTick;
const _componentArgumentFormat = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ArgumentFormat = Object.assign(_componentArgumentFormat, {
    OptionName: "argumentFormat",
});
exports.ArgumentFormat = ArgumentFormat;
const _componentAxisLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AxisLabel = Object.assign(_componentAxisLabel, {
    OptionName: "label",
});
exports.AxisLabel = AxisLabel;
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
const _componentCommonAxisSettings = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonAxisSettings = Object.assign(_componentCommonAxisSettings, {
    OptionName: "commonAxisSettings",
    ExpectedChildren: {
        commonAxisSettingsLabel: { optionName: "label", isCollectionItem: false },
        commonAxisSettingsMinorTick: { optionName: "minorTick", isCollectionItem: false },
        commonAxisSettingsTick: { optionName: "tick", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false }
    },
});
exports.CommonAxisSettings = CommonAxisSettings;
const _componentCommonAxisSettingsLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonAxisSettingsLabel = Object.assign(_componentCommonAxisSettingsLabel, {
    OptionName: "label",
});
exports.CommonAxisSettingsLabel = CommonAxisSettingsLabel;
const _componentCommonAxisSettingsMinorTick = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonAxisSettingsMinorTick = Object.assign(_componentCommonAxisSettingsMinorTick, {
    OptionName: "minorTick",
});
exports.CommonAxisSettingsMinorTick = CommonAxisSettingsMinorTick;
const _componentCommonAxisSettingsTick = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonAxisSettingsTick = Object.assign(_componentCommonAxisSettingsTick, {
    OptionName: "tick",
});
exports.CommonAxisSettingsTick = CommonAxisSettingsTick;
const _componentCommonSeriesSettings = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommonSeriesSettings = Object.assign(_componentCommonSeriesSettings, {
    OptionName: "commonSeriesSettings",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        commonSeriesSettingsHoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        commonSeriesSettingsLabel: { optionName: "label", isCollectionItem: false },
        commonSeriesSettingsSelectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        point: { optionName: "point", isCollectionItem: false },
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
const _componentConstantLine = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ConstantLine = Object.assign(_componentConstantLine, {
    OptionName: "constantLines",
    IsCollectionItem: true,
});
exports.ConstantLine = ConstantLine;
const _componentConstantLineLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ConstantLineLabel = Object.assign(_componentConstantLineLabel, {
    OptionName: "label",
});
exports.ConstantLineLabel = ConstantLineLabel;
const _componentConstantLineStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ConstantLineStyle = Object.assign(_componentConstantLineStyle, {
    OptionName: "constantLineStyle",
    ExpectedChildren: {
        constantLineStyleLabel: { optionName: "label", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false }
    },
});
exports.ConstantLineStyle = ConstantLineStyle;
const _componentConstantLineStyleLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ConstantLineStyleLabel = Object.assign(_componentConstantLineStyleLabel, {
    OptionName: "label",
});
exports.ConstantLineStyleLabel = ConstantLineStyleLabel;
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
const _componentGrid = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Grid = Object.assign(_componentGrid, {
    OptionName: "grid",
});
exports.Grid = Grid;
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
});
exports.HoverStyle = HoverStyle;
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
});
exports.Label = Label;
const _componentLegend = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Legend = Object.assign(_componentLegend, {
    OptionName: "legend",
    ExpectedChildren: {
        annotationBorder: { optionName: "border", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
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
const _componentMinorGrid = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MinorGrid = Object.assign(_componentMinorGrid, {
    OptionName: "minorGrid",
});
exports.MinorGrid = MinorGrid;
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
const _componentMinVisualRangeLength = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MinVisualRangeLength = Object.assign(_componentMinVisualRangeLength, {
    OptionName: "minVisualRangeLength",
});
exports.MinVisualRangeLength = MinVisualRangeLength;
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
const _componentPolarChartTitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PolarChartTitle = Object.assign(_componentPolarChartTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        polarChartTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
exports.PolarChartTitle = PolarChartTitle;
const _componentPolarChartTitleSubtitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PolarChartTitleSubtitle = Object.assign(_componentPolarChartTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.PolarChartTitleSubtitle = PolarChartTitleSubtitle;
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
const _componentStrip = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Strip = Object.assign(_componentStrip, {
    OptionName: "strips",
    IsCollectionItem: true,
});
exports.Strip = Strip;
const _componentStripLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const StripLabel = Object.assign(_componentStripLabel, {
    OptionName: "label",
});
exports.StripLabel = StripLabel;
const _componentStripStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const StripStyle = Object.assign(_componentStripStyle, {
    OptionName: "stripStyle",
    ExpectedChildren: {
        label: { optionName: "label", isCollectionItem: false },
        stripStyleLabel: { optionName: "label", isCollectionItem: false }
    },
});
exports.StripStyle = StripStyle;
const _componentStripStyleLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const StripStyleLabel = Object.assign(_componentStripStyleLabel, {
    OptionName: "label",
});
exports.StripStyleLabel = StripStyleLabel;
const _componentSubtitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Subtitle = Object.assign(_componentSubtitle, {
    OptionName: "subtitle",
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
});
exports.Title = Title;
const _componentTooltip = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tooltip = Object.assign(_componentTooltip, {
    OptionName: "tooltip",
    ExpectedChildren: {
        argumentFormat: { optionName: "argumentFormat", isCollectionItem: false },
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
const _componentValueAxis = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ValueAxis = Object.assign(_componentValueAxis, {
    OptionName: "valueAxis",
    DefaultsProps: {
        defaultVisualRange: "visualRange"
    },
    ExpectedChildren: {
        axisLabel: { optionName: "label", isCollectionItem: false },
        commonAxisSettingsTick: { optionName: "tick", isCollectionItem: false },
        constantLine: { optionName: "constantLines", isCollectionItem: true },
        label: { optionName: "label", isCollectionItem: false },
        minorTickInterval: { optionName: "minorTickInterval", isCollectionItem: false },
        minVisualRangeLength: { optionName: "minVisualRangeLength", isCollectionItem: false },
        strip: { optionName: "strips", isCollectionItem: true },
        tick: { optionName: "tick", isCollectionItem: false },
        tickInterval: { optionName: "tickInterval", isCollectionItem: false },
        visualRange: { optionName: "visualRange", isCollectionItem: false },
        wholeRange: { optionName: "wholeRange", isCollectionItem: false }
    },
});
exports.ValueAxis = ValueAxis;
const _componentValueErrorBar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ValueErrorBar = Object.assign(_componentValueErrorBar, {
    OptionName: "valueErrorBar",
});
exports.ValueErrorBar = ValueErrorBar;
const _componentVisualRange = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const VisualRange = Object.assign(_componentVisualRange, {
    OptionName: "visualRange",
    DefaultsProps: {
        defaultEndValue: "endValue",
        defaultStartValue: "startValue"
    },
    ExpectedChildren: {
        length: { optionName: "length", isCollectionItem: false }
    },
});
exports.VisualRange = VisualRange;
const _componentWholeRange = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const WholeRange = Object.assign(_componentWholeRange, {
    OptionName: "wholeRange",
    DefaultsProps: {
        defaultEndValue: "endValue",
        defaultStartValue: "startValue"
    },
});
exports.WholeRange = WholeRange;
exports.default = PolarChart;
