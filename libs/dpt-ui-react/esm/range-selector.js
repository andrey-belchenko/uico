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
import dxRangeSelector from "dpt-ui/viz/range_selector";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const RangeSelector = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["loadingIndicator", "loadingIndicator.show", "value"]), []);
    const independentEvents = useMemo(() => (["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onValueChanged"]), []);
    const defaults = useMemo(() => ({
        defaultLoadingIndicator: "loadingIndicator",
        defaultValue: "value",
    }), []);
    const expectedChildren = useMemo(() => ({
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
    return (React.createElement((BaseComponent), {
        WidgetClass: dxRangeSelector,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentAggregation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Aggregation = Object.assign(_componentAggregation, {
    OptionName: "aggregation",
});
const _componentAggregationInterval = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AggregationInterval = Object.assign(_componentAggregationInterval, {
    OptionName: "aggregationInterval",
});
const _componentArgumentFormat = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ArgumentFormat = Object.assign(_componentArgumentFormat, {
    OptionName: "argumentFormat",
});
const _componentBackground = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Background = Object.assign(_componentBackground, {
    OptionName: "background",
    ExpectedChildren: {
        backgroundImage: { optionName: "image", isCollectionItem: false },
        image: { optionName: "image", isCollectionItem: false }
    },
});
const _componentBackgroundImage = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const BackgroundImage = Object.assign(_componentBackgroundImage, {
    OptionName: "image",
});
const _componentBehavior = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Behavior = Object.assign(_componentBehavior, {
    OptionName: "behavior",
});
const _componentBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
const _componentBreak = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Break = Object.assign(_componentBreak, {
    OptionName: "breaks",
    IsCollectionItem: true,
});
const _componentBreakStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const BreakStyle = Object.assign(_componentBreakStyle, {
    OptionName: "breakStyle",
});
const _componentChart = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentColor = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Color = Object.assign(_componentColor, {
    OptionName: "color",
});
const _componentCommonSeriesSettings = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentHatching = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Hatching = Object.assign(_componentHatching, {
    OptionName: "hatching",
});
const _componentHeight = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Height = Object.assign(_componentHeight, {
    OptionName: "height",
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
const _componentIndent = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Indent = Object.assign(_componentIndent, {
    OptionName: "indent",
});
const _componentLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
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
const _componentMarker = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Marker = Object.assign(_componentMarker, {
    OptionName: "marker",
    ExpectedChildren: {
        label: { optionName: "label", isCollectionItem: false },
        markerLabel: { optionName: "label", isCollectionItem: false }
    },
});
const _componentMarkerLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MarkerLabel = Object.assign(_componentMarkerLabel, {
    OptionName: "label",
    ExpectedChildren: {
        format: { optionName: "format", isCollectionItem: false }
    },
});
const _componentMaxRange = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MaxRange = Object.assign(_componentMaxRange, {
    OptionName: "maxRange",
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
const _componentMinRange = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MinRange = Object.assign(_componentMinRange, {
    OptionName: "minRange",
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
        pointImage: { optionName: "image", isCollectionItem: false },
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
const _componentPointImage = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PointImage = Object.assign(_componentPointImage, {
    OptionName: "image",
    ExpectedChildren: {
        height: { optionName: "height", isCollectionItem: false },
        url: { optionName: "url", isCollectionItem: false },
        width: { optionName: "width", isCollectionItem: false }
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
const _componentReduction = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Reduction = Object.assign(_componentReduction, {
    OptionName: "reduction",
});
const _componentScale = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentScaleLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ScaleLabel = Object.assign(_componentScaleLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
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
const _componentShutter = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Shutter = Object.assign(_componentShutter, {
    OptionName: "shutter",
});
const _componentSize = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Size = Object.assign(_componentSize, {
    OptionName: "size",
});
const _componentSliderHandle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SliderHandle = Object.assign(_componentSliderHandle, {
    OptionName: "sliderHandle",
});
const _componentSliderMarker = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SliderMarker = Object.assign(_componentSliderMarker, {
    OptionName: "sliderMarker",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    },
});
const _componentSubtitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Subtitle = Object.assign(_componentSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
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
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
const _componentUrl = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Url = Object.assign(_componentUrl, {
    OptionName: "url",
});
const _componentValue = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentValueAxis = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ValueAxis = Object.assign(_componentValueAxis, {
    OptionName: "valueAxis",
});
const _componentValueErrorBar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ValueErrorBar = Object.assign(_componentValueErrorBar, {
    OptionName: "valueErrorBar",
});
const _componentWidth = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Width = Object.assign(_componentWidth, {
    OptionName: "width",
});
export default RangeSelector;
export { RangeSelector, Aggregation, AggregationInterval, ArgumentFormat, Background, BackgroundImage, Behavior, Border, Break, BreakStyle, Chart, Color, CommonSeriesSettings, CommonSeriesSettingsHoverStyle, CommonSeriesSettingsLabel, CommonSeriesSettingsSelectionStyle, Connector, DataPrepareSettings, Export, Font, Format, Hatching, Height, HoverStyle, Image, Indent, Label, Length, LoadingIndicator, Margin, Marker, MarkerLabel, MaxRange, MinorTick, MinorTickInterval, MinRange, Point, PointBorder, PointHoverStyle, PointImage, PointSelectionStyle, Reduction, Scale, ScaleLabel, SelectionStyle, Series, SeriesBorder, SeriesTemplate, Shutter, Size, SliderHandle, SliderMarker, Subtitle, Tick, TickInterval, Title, Url, Value, ValueAxis, ValueErrorBar, Width };
