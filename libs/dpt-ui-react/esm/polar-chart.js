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
import * as React from "react";
import { memo, forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import dxPolarChart from "dpt-ui/viz/polar_chart";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const PolarChart = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["loadingIndicator", "loadingIndicator.show", "valueAxis", "valueAxis.visualRange"]), []);
    const independentEvents = useMemo(() => (["onArgumentAxisClick", "onDisposing", "onDone", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onLegendClick", "onPointClick", "onSeriesClick", "onTooltipHidden", "onTooltipShown", "onZoomEnd", "onZoomStart"]), []);
    const defaults = useMemo(() => ({
        defaultLoadingIndicator: "loadingIndicator",
        defaultValueAxis: "valueAxis",
    }), []);
    const expectedChildren = useMemo(() => ({
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
    return (React.createElement((BaseComponent), {
        WidgetClass: dxPolarChart,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentAdaptiveLayout = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AdaptiveLayout = Object.assign(_componentAdaptiveLayout, {
    OptionName: "adaptiveLayout",
});
const _componentAnimation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Animation = Object.assign(_componentAnimation, {
    OptionName: "animation",
});
const _componentAnnotation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentAnnotationBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AnnotationBorder = Object.assign(_componentAnnotationBorder, {
    OptionName: "border",
});
const _componentArgumentAxis = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentArgumentAxisMinorTick = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ArgumentAxisMinorTick = Object.assign(_componentArgumentAxisMinorTick, {
    OptionName: "minorTick",
});
const _componentArgumentAxisTick = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ArgumentAxisTick = Object.assign(_componentArgumentAxisTick, {
    OptionName: "tick",
});
const _componentArgumentFormat = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ArgumentFormat = Object.assign(_componentArgumentFormat, {
    OptionName: "argumentFormat",
});
const _componentAxisLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AxisLabel = Object.assign(_componentAxisLabel, {
    OptionName: "label",
});
const _componentBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
const _componentColor = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Color = Object.assign(_componentColor, {
    OptionName: "color",
});
const _componentCommonAnnotationSettings = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentCommonAxisSettings = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentCommonAxisSettingsLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CommonAxisSettingsLabel = Object.assign(_componentCommonAxisSettingsLabel, {
    OptionName: "label",
});
const _componentCommonAxisSettingsMinorTick = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CommonAxisSettingsMinorTick = Object.assign(_componentCommonAxisSettingsMinorTick, {
    OptionName: "minorTick",
});
const _componentCommonAxisSettingsTick = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CommonAxisSettingsTick = Object.assign(_componentCommonAxisSettingsTick, {
    OptionName: "tick",
});
const _componentCommonSeriesSettings = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentCommonSeriesSettingsHoverStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentCommonSeriesSettingsLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentCommonSeriesSettingsSelectionStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentConnector = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Connector = Object.assign(_componentConnector, {
    OptionName: "connector",
});
const _componentConstantLine = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ConstantLine = Object.assign(_componentConstantLine, {
    OptionName: "constantLines",
    IsCollectionItem: true,
});
const _componentConstantLineLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ConstantLineLabel = Object.assign(_componentConstantLineLabel, {
    OptionName: "label",
});
const _componentConstantLineStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ConstantLineStyle = Object.assign(_componentConstantLineStyle, {
    OptionName: "constantLineStyle",
    ExpectedChildren: {
        constantLineStyleLabel: { optionName: "label", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false }
    },
});
const _componentConstantLineStyleLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ConstantLineStyleLabel = Object.assign(_componentConstantLineStyleLabel, {
    OptionName: "label",
});
const _componentDataPrepareSettings = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const DataPrepareSettings = Object.assign(_componentDataPrepareSettings, {
    OptionName: "dataPrepareSettings",
});
const _componentExport = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Export = Object.assign(_componentExport, {
    OptionName: "export",
});
const _componentFont = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Font = Object.assign(_componentFont, {
    OptionName: "font",
});
const _componentFormat = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
const _componentGrid = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Grid = Object.assign(_componentGrid, {
    OptionName: "grid",
});
const _componentHatching = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Hatching = Object.assign(_componentHatching, {
    OptionName: "hatching",
});
const _componentHoverStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const HoverStyle = Object.assign(_componentHoverStyle, {
    OptionName: "hoverStyle",
});
const _componentImage = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Image = Object.assign(_componentImage, {
    OptionName: "image",
});
const _componentLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
});
const _componentLegend = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentLegendTitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentLegendTitleSubtitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const LegendTitleSubtitle = Object.assign(_componentLegendTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
const _componentLength = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Length = Object.assign(_componentLength, {
    OptionName: "length",
});
const _componentLoadingIndicator = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentMargin = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Margin = Object.assign(_componentMargin, {
    OptionName: "margin",
});
const _componentMinorGrid = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MinorGrid = Object.assign(_componentMinorGrid, {
    OptionName: "minorGrid",
});
const _componentMinorTick = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MinorTick = Object.assign(_componentMinorTick, {
    OptionName: "minorTick",
});
const _componentMinorTickInterval = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MinorTickInterval = Object.assign(_componentMinorTickInterval, {
    OptionName: "minorTickInterval",
});
const _componentMinVisualRangeLength = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MinVisualRangeLength = Object.assign(_componentMinVisualRangeLength, {
    OptionName: "minVisualRangeLength",
});
const _componentPoint = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentPointBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PointBorder = Object.assign(_componentPointBorder, {
    OptionName: "border",
});
const _componentPointHoverStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PointHoverStyle = Object.assign(_componentPointHoverStyle, {
    OptionName: "hoverStyle",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        pointBorder: { optionName: "border", isCollectionItem: false }
    },
});
const _componentPointSelectionStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PointSelectionStyle = Object.assign(_componentPointSelectionStyle, {
    OptionName: "selectionStyle",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        color: { optionName: "color", isCollectionItem: false },
        pointBorder: { optionName: "border", isCollectionItem: false }
    },
});
const _componentPolarChartTitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentPolarChartTitleSubtitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PolarChartTitleSubtitle = Object.assign(_componentPolarChartTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
const _componentSelectionStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SelectionStyle = Object.assign(_componentSelectionStyle, {
    OptionName: "selectionStyle",
});
const _componentSeries = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Series = Object.assign(_componentSeries, {
    OptionName: "series",
    IsCollectionItem: true,
});
const _componentSeriesBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SeriesBorder = Object.assign(_componentSeriesBorder, {
    OptionName: "border",
});
const _componentSeriesTemplate = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SeriesTemplate = Object.assign(_componentSeriesTemplate, {
    OptionName: "seriesTemplate",
});
const _componentShadow = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Shadow = Object.assign(_componentShadow, {
    OptionName: "shadow",
});
const _componentSize = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Size = Object.assign(_componentSize, {
    OptionName: "size",
});
const _componentStrip = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Strip = Object.assign(_componentStrip, {
    OptionName: "strips",
    IsCollectionItem: true,
});
const _componentStripLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const StripLabel = Object.assign(_componentStripLabel, {
    OptionName: "label",
});
const _componentStripStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const StripStyle = Object.assign(_componentStripStyle, {
    OptionName: "stripStyle",
    ExpectedChildren: {
        label: { optionName: "label", isCollectionItem: false },
        stripStyleLabel: { optionName: "label", isCollectionItem: false }
    },
});
const _componentStripStyleLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const StripStyleLabel = Object.assign(_componentStripStyleLabel, {
    OptionName: "label",
});
const _componentSubtitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Subtitle = Object.assign(_componentSubtitle, {
    OptionName: "subtitle",
});
const _componentTick = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Tick = Object.assign(_componentTick, {
    OptionName: "tick",
});
const _componentTickInterval = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TickInterval = Object.assign(_componentTickInterval, {
    OptionName: "tickInterval",
});
const _componentTitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Title = Object.assign(_componentTitle, {
    OptionName: "title",
});
const _componentTooltip = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentTooltipBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TooltipBorder = Object.assign(_componentTooltipBorder, {
    OptionName: "border",
});
const _componentValueAxis = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentValueErrorBar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ValueErrorBar = Object.assign(_componentValueErrorBar, {
    OptionName: "valueErrorBar",
});
const _componentVisualRange = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentWholeRange = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const WholeRange = Object.assign(_componentWholeRange, {
    OptionName: "wholeRange",
    DefaultsProps: {
        defaultEndValue: "endValue",
        defaultStartValue: "startValue"
    },
});
export default PolarChart;
export { PolarChart, AdaptiveLayout, Animation, Annotation, AnnotationBorder, ArgumentAxis, ArgumentAxisMinorTick, ArgumentAxisTick, ArgumentFormat, AxisLabel, Border, Color, CommonAnnotationSettings, CommonAxisSettings, CommonAxisSettingsLabel, CommonAxisSettingsMinorTick, CommonAxisSettingsTick, CommonSeriesSettings, CommonSeriesSettingsHoverStyle, CommonSeriesSettingsLabel, CommonSeriesSettingsSelectionStyle, Connector, ConstantLine, ConstantLineLabel, ConstantLineStyle, ConstantLineStyleLabel, DataPrepareSettings, Export, Font, Format, Grid, Hatching, HoverStyle, Image, Label, Legend, LegendTitle, LegendTitleSubtitle, Length, LoadingIndicator, Margin, MinorGrid, MinorTick, MinorTickInterval, MinVisualRangeLength, Point, PointBorder, PointHoverStyle, PointSelectionStyle, PolarChartTitle, PolarChartTitleSubtitle, SelectionStyle, Series, SeriesBorder, SeriesTemplate, Shadow, Size, Strip, StripLabel, StripStyle, StripStyleLabel, Subtitle, Tick, TickInterval, Title, Tooltip, TooltipBorder, ValueAxis, ValueErrorBar, VisualRange, WholeRange };
