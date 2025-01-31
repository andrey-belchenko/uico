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

import * as React from "react";
import { Ref, ReactElement } from "react";
import dxRangeSelector, { Properties } from "dpt-ui/viz/range_selector";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { DisposingEvent, DrawnEvent, ExportedEvent, ExportingEvent, FileSavingEvent, IncidentOccurredEvent, InitializedEvent, ValueChangedEvent } from "dpt-ui/viz/range_selector";
import type { chartPointAggregationInfoObject, chartSeriesObject, dxChartCommonSeriesSettings } from "dpt-ui/viz/chart";
import type { ChartSeries } from "dpt-ui/viz/common";
import type { ChartsColor, Font as ChartsFont, ScaleBreak } from "dpt-ui/common/charts";
import type * as CommonChartTypes from "dpt-ui/common/charts";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IRangeSelectorOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onDrawn?: ((e: DrawnEvent) => void);
    onExported?: ((e: ExportedEvent) => void);
    onExporting?: ((e: ExportingEvent) => void);
    onFileSaving?: ((e: FileSavingEvent) => void);
    onIncidentOccurred?: ((e: IncidentOccurredEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type IRangeSelectorOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IRangeSelectorOptionsNarrowedEvents> & IHtmlOptions & {
    defaultLoadingIndicator?: Record<string, any>;
    defaultValue?: Array<Date | number | string> | CommonChartTypes.VisualRange;
    onLoadingIndicatorChange?: (value: Record<string, any>) => void;
    onValueChange?: (value: Array<Date | number | string> | CommonChartTypes.VisualRange) => void;
}>;
interface RangeSelectorRef {
    instance: () => dxRangeSelector;
}
declare const RangeSelector: (props: React.PropsWithChildren<IRangeSelectorOptions> & {
    ref?: Ref<RangeSelectorRef>;
}) => ReactElement | null;
type IAggregationProps = React.PropsWithChildren<{
    calculate?: ((aggregationInfo: chartPointAggregationInfoObject, series: chartSeriesObject) => Record<string, any> | Array<Record<string, any>>);
    enabled?: boolean;
    method?: "avg" | "count" | "max" | "min" | "ohlc" | "range" | "sum" | "custom";
}>;
declare const _componentAggregation: React.MemoExoticComponent<(props: IAggregationProps) => React.FunctionComponentElement<IAggregationProps>>;
declare const Aggregation: typeof _componentAggregation & IElementDescriptor;
type IAggregationIntervalProps = React.PropsWithChildren<{
    days?: number;
    hours?: number;
    milliseconds?: number;
    minutes?: number;
    months?: number;
    quarters?: number;
    seconds?: number;
    weeks?: number;
    years?: number;
}>;
declare const _componentAggregationInterval: React.MemoExoticComponent<(props: IAggregationIntervalProps) => React.FunctionComponentElement<IAggregationIntervalProps>>;
declare const AggregationInterval: typeof _componentAggregationInterval & IElementDescriptor;
type IArgumentFormatProps = React.PropsWithChildren<{
    currency?: string;
    formatter?: ((value: number | Date) => string);
    parser?: ((value: string) => number | Date);
    precision?: number;
    type?: "billions" | "currency" | "day" | "decimal" | "exponential" | "fixedPoint" | "largeNumber" | "longDate" | "longTime" | "millions" | "millisecond" | "month" | "monthAndDay" | "monthAndYear" | "percent" | "quarter" | "quarterAndYear" | "shortDate" | "shortTime" | "thousands" | "trillions" | "year" | "dayOfWeek" | "hour" | "longDateLongTime" | "minute" | "second" | "shortDateShortTime";
    useCurrencyAccountingStyle?: boolean;
}>;
declare const _componentArgumentFormat: React.MemoExoticComponent<(props: IArgumentFormatProps) => React.FunctionComponentElement<IArgumentFormatProps>>;
declare const ArgumentFormat: typeof _componentArgumentFormat & IElementDescriptor;
type IBackgroundProps = React.PropsWithChildren<{
    color?: string;
    image?: Record<string, any> | {
        location?: "center" | "centerBottom" | "centerTop" | "full" | "leftBottom" | "leftCenter" | "leftTop" | "rightBottom" | "rightCenter" | "rightTop";
        url?: string;
    };
    visible?: boolean;
}>;
declare const _componentBackground: React.MemoExoticComponent<(props: IBackgroundProps) => React.FunctionComponentElement<IBackgroundProps>>;
declare const Background: typeof _componentBackground & IElementDescriptor;
type IBackgroundImageProps = React.PropsWithChildren<{
    location?: "center" | "centerBottom" | "centerTop" | "full" | "leftBottom" | "leftCenter" | "leftTop" | "rightBottom" | "rightCenter" | "rightTop";
    url?: string;
}>;
declare const _componentBackgroundImage: React.MemoExoticComponent<(props: IBackgroundImageProps) => React.FunctionComponentElement<IBackgroundImageProps>>;
declare const BackgroundImage: typeof _componentBackgroundImage & IElementDescriptor;
type IBehaviorProps = React.PropsWithChildren<{
    allowSlidersSwap?: boolean;
    animationEnabled?: boolean;
    callValueChanged?: "onMoving" | "onMovingComplete";
    manualRangeSelectionEnabled?: boolean;
    moveSelectedRangeByClick?: boolean;
    snapToTicks?: boolean;
    valueChangeMode?: "onHandleMove" | "onHandleRelease";
}>;
declare const _componentBehavior: React.MemoExoticComponent<(props: IBehaviorProps) => React.FunctionComponentElement<IBehaviorProps>>;
declare const Behavior: typeof _componentBehavior & IElementDescriptor;
type IBorderProps = React.PropsWithChildren<{
    color?: string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    visible?: boolean;
    width?: number;
}>;
declare const _componentBorder: React.MemoExoticComponent<(props: IBorderProps) => React.FunctionComponentElement<IBorderProps>>;
declare const Border: typeof _componentBorder & IElementDescriptor;
type IBreakProps = React.PropsWithChildren<{
    endValue?: Date | number | string;
    startValue?: Date | number | string;
}>;
declare const _componentBreak: React.MemoExoticComponent<(props: IBreakProps) => React.FunctionComponentElement<IBreakProps>>;
declare const Break: typeof _componentBreak & IElementDescriptor;
type IBreakStyleProps = React.PropsWithChildren<{
    color?: string;
    line?: "straight" | "waved";
    width?: number;
}>;
declare const _componentBreakStyle: React.MemoExoticComponent<(props: IBreakStyleProps) => React.FunctionComponentElement<IBreakStyleProps>>;
declare const BreakStyle: typeof _componentBreakStyle & IElementDescriptor;
type IChartProps = React.PropsWithChildren<{
    barGroupPadding?: number;
    barGroupWidth?: number;
    bottomIndent?: number;
    commonSeriesSettings?: dxChartCommonSeriesSettings;
    dataPrepareSettings?: Record<string, any> | {
        checkTypeForAllData?: boolean;
        convertToAxisDataType?: boolean;
        sortingMethod?: boolean | ((a: {
            arg: Date | number | string;
            val: Date | number | string;
        }, b: {
            arg: Date | number | string;
            val: Date | number | string;
        }) => number);
    };
    maxBubbleSize?: number;
    minBubbleSize?: number;
    negativesAsZeroes?: boolean;
    palette?: Array<string> | "Bright" | "Harmony Light" | "Ocean" | "Pastel" | "Soft" | "Soft Pastel" | "Vintage" | "Violet" | "Carmine" | "Dark Moon" | "Dark Violet" | "Green Mist" | "Soft Blue" | "Material" | "Office";
    paletteExtensionMode?: "alternate" | "blend" | "extrapolate";
    series?: Array<ChartSeries> | ChartSeries;
    seriesTemplate?: Record<string, any> | {
        customizeSeries?: ((seriesName: any) => ChartSeries);
        nameField?: string;
    };
    topIndent?: number;
    valueAxis?: Record<string, any> | {
        inverted?: boolean;
        logarithmBase?: number;
        max?: number;
        min?: number;
        type?: "continuous" | "logarithmic";
        valueType?: "datetime" | "numeric" | "string";
    };
}>;
declare const _componentChart: React.MemoExoticComponent<(props: IChartProps) => React.FunctionComponentElement<IChartProps>>;
declare const Chart: typeof _componentChart & IElementDescriptor;
type IColorProps = React.PropsWithChildren<{
    base?: string;
    fillId?: string;
}>;
declare const _componentColor: React.MemoExoticComponent<(props: IColorProps) => React.FunctionComponentElement<IColorProps>>;
declare const Color: typeof _componentColor & IElementDescriptor;
type ICommonSeriesSettingsProps = React.PropsWithChildren<{
    aggregation?: Record<string, any> | {
        calculate?: ((aggregationInfo: chartPointAggregationInfoObject, series: chartSeriesObject) => Record<string, any> | Array<Record<string, any>>);
        enabled?: boolean;
        method?: "avg" | "count" | "max" | "min" | "ohlc" | "range" | "sum" | "custom";
    };
    area?: any;
    argumentField?: string;
    axis?: string;
    bar?: any;
    barOverlapGroup?: string;
    barPadding?: number;
    barWidth?: number;
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    bubble?: any;
    candlestick?: any;
    closeValueField?: string;
    color?: ChartsColor | string;
    cornerRadius?: number;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    fullstackedarea?: any;
    fullstackedbar?: any;
    fullstackedline?: any;
    fullstackedspline?: any;
    fullstackedsplinearea?: any;
    highValueField?: string;
    hoverMode?: "allArgumentPoints" | "allSeriesPoints" | "excludePoints" | "includePoints" | "nearestPoint" | "none" | "onlyPoint";
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        highlight?: boolean;
        width?: number;
    };
    ignoreEmptyPoints?: boolean;
    innerColor?: string;
    label?: Record<string, any> | {
        alignment?: "center" | "left" | "right";
        argumentFormat?: LocalizationTypes.Format;
        backgroundColor?: string;
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        connector?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        customizeText?: ((pointInfo: any) => string);
        displayFormat?: string;
        font?: ChartsFont;
        format?: LocalizationTypes.Format;
        horizontalOffset?: number;
        position?: "inside" | "outside";
        rotationAngle?: number;
        showForZeroValues?: boolean;
        verticalOffset?: number;
        visible?: boolean;
    };
    line?: any;
    lowValueField?: string;
    maxLabelCount?: number;
    minBarSize?: number;
    opacity?: number;
    openValueField?: string;
    pane?: string;
    point?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        hoverMode?: "allArgumentPoints" | "allSeriesPoints" | "none" | "onlyPoint";
        hoverStyle?: Record<string, any> | {
            border?: Record<string, any> | {
                color?: string;
                visible?: boolean;
                width?: number;
            };
            color?: ChartsColor | string;
            size?: number;
        };
        image?: Record<string, any> | string | {
            height?: number | Record<string, any> | {
                rangeMaxPoint?: number;
                rangeMinPoint?: number;
            };
            url?: Record<string, any> | string | {
                rangeMaxPoint?: string;
                rangeMinPoint?: string;
            };
            width?: number | Record<string, any> | {
                rangeMaxPoint?: number;
                rangeMinPoint?: number;
            };
        };
        selectionMode?: "allArgumentPoints" | "allSeriesPoints" | "none" | "onlyPoint";
        selectionStyle?: Record<string, any> | {
            border?: Record<string, any> | {
                color?: string;
                visible?: boolean;
                width?: number;
            };
            color?: ChartsColor | string;
            size?: number;
        };
        size?: number;
        symbol?: "circle" | "cross" | "polygon" | "square" | "triangle" | "triangleDown" | "triangleUp";
        visible?: boolean;
    };
    rangearea?: any;
    rangebar?: any;
    rangeValue1Field?: string;
    rangeValue2Field?: string;
    reduction?: Record<string, any> | {
        color?: string;
        level?: "close" | "high" | "low" | "open";
    };
    scatter?: any;
    selectionMode?: "allArgumentPoints" | "allSeriesPoints" | "excludePoints" | "includePoints" | "none" | "onlyPoint";
    selectionStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        highlight?: boolean;
        width?: number;
    };
    showInLegend?: boolean;
    sizeField?: string;
    spline?: any;
    splinearea?: any;
    stack?: string;
    stackedarea?: any;
    stackedbar?: any;
    stackedline?: any;
    stackedspline?: any;
    stackedsplinearea?: any;
    steparea?: any;
    stepline?: any;
    stock?: any;
    tagField?: string;
    type?: "area" | "bar" | "bubble" | "candlestick" | "fullstackedarea" | "fullstackedbar" | "fullstackedline" | "fullstackedspline" | "fullstackedsplinearea" | "line" | "rangearea" | "rangebar" | "scatter" | "spline" | "splinearea" | "stackedarea" | "stackedbar" | "stackedline" | "stackedspline" | "stackedsplinearea" | "steparea" | "stepline" | "stock";
    valueErrorBar?: Record<string, any> | {
        color?: string;
        displayMode?: "auto" | "high" | "low" | "none";
        edgeLength?: number;
        highValueField?: string;
        lineWidth?: number;
        lowValueField?: string;
        opacity?: number;
        type?: "fixed" | "percent" | "stdDeviation" | "stdError" | "variance";
        value?: number;
    };
    valueField?: string;
    visible?: boolean;
    width?: number;
}>;
declare const _componentCommonSeriesSettings: React.MemoExoticComponent<(props: ICommonSeriesSettingsProps) => React.FunctionComponentElement<ICommonSeriesSettingsProps>>;
declare const CommonSeriesSettings: typeof _componentCommonSeriesSettings & IElementDescriptor;
type ICommonSeriesSettingsHoverStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
    highlight?: boolean;
    width?: number;
}>;
declare const _componentCommonSeriesSettingsHoverStyle: React.MemoExoticComponent<(props: ICommonSeriesSettingsHoverStyleProps) => React.FunctionComponentElement<ICommonSeriesSettingsHoverStyleProps>>;
declare const CommonSeriesSettingsHoverStyle: typeof _componentCommonSeriesSettingsHoverStyle & IElementDescriptor;
type ICommonSeriesSettingsLabelProps = React.PropsWithChildren<{
    alignment?: "center" | "left" | "right";
    argumentFormat?: LocalizationTypes.Format;
    backgroundColor?: string;
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    connector?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    customizeText?: ((pointInfo: any) => string);
    displayFormat?: string;
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    horizontalOffset?: number;
    position?: "inside" | "outside";
    rotationAngle?: number;
    showForZeroValues?: boolean;
    verticalOffset?: number;
    visible?: boolean;
}>;
declare const _componentCommonSeriesSettingsLabel: React.MemoExoticComponent<(props: ICommonSeriesSettingsLabelProps) => React.FunctionComponentElement<ICommonSeriesSettingsLabelProps>>;
declare const CommonSeriesSettingsLabel: typeof _componentCommonSeriesSettingsLabel & IElementDescriptor;
type ICommonSeriesSettingsSelectionStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
    highlight?: boolean;
    width?: number;
}>;
declare const _componentCommonSeriesSettingsSelectionStyle: React.MemoExoticComponent<(props: ICommonSeriesSettingsSelectionStyleProps) => React.FunctionComponentElement<ICommonSeriesSettingsSelectionStyleProps>>;
declare const CommonSeriesSettingsSelectionStyle: typeof _componentCommonSeriesSettingsSelectionStyle & IElementDescriptor;
type IConnectorProps = React.PropsWithChildren<{
    color?: string;
    visible?: boolean;
    width?: number;
}>;
declare const _componentConnector: React.MemoExoticComponent<(props: IConnectorProps) => React.FunctionComponentElement<IConnectorProps>>;
declare const Connector: typeof _componentConnector & IElementDescriptor;
type IDataPrepareSettingsProps = React.PropsWithChildren<{
    checkTypeForAllData?: boolean;
    convertToAxisDataType?: boolean;
    sortingMethod?: boolean | ((a: {
        arg: Date | number | string;
        val: Date | number | string;
    }, b: {
        arg: Date | number | string;
        val: Date | number | string;
    }) => number);
}>;
declare const _componentDataPrepareSettings: React.MemoExoticComponent<(props: IDataPrepareSettingsProps) => React.FunctionComponentElement<IDataPrepareSettingsProps>>;
declare const DataPrepareSettings: typeof _componentDataPrepareSettings & IElementDescriptor;
type IExportProps = React.PropsWithChildren<{
    backgroundColor?: string;
    enabled?: boolean;
    fileName?: string;
    formats?: Array<"GIF" | "JPEG" | "PDF" | "PNG" | "SVG">;
    margin?: number;
    printingEnabled?: boolean;
    svgToCanvas?: ((svg: any, canvas: any) => any);
}>;
declare const _componentExport: React.MemoExoticComponent<(props: IExportProps) => React.FunctionComponentElement<IExportProps>>;
declare const Export: typeof _componentExport & IElementDescriptor;
type IFontProps = React.PropsWithChildren<{
    color?: string;
    family?: string;
    opacity?: number;
    size?: number | string;
    weight?: number;
}>;
declare const _componentFont: React.MemoExoticComponent<(props: IFontProps) => React.FunctionComponentElement<IFontProps>>;
declare const Font: typeof _componentFont & IElementDescriptor;
type IFormatProps = React.PropsWithChildren<{
    currency?: string;
    formatter?: ((value: number | Date) => string);
    parser?: ((value: string) => number | Date);
    precision?: number;
    type?: "billions" | "currency" | "day" | "decimal" | "exponential" | "fixedPoint" | "largeNumber" | "longDate" | "longTime" | "millions" | "millisecond" | "month" | "monthAndDay" | "monthAndYear" | "percent" | "quarter" | "quarterAndYear" | "shortDate" | "shortTime" | "thousands" | "trillions" | "year" | "dayOfWeek" | "hour" | "longDateLongTime" | "minute" | "second" | "shortDateShortTime";
    useCurrencyAccountingStyle?: boolean;
}>;
declare const _componentFormat: React.MemoExoticComponent<(props: IFormatProps) => React.FunctionComponentElement<IFormatProps>>;
declare const Format: typeof _componentFormat & IElementDescriptor;
type IHatchingProps = React.PropsWithChildren<{
    direction?: "left" | "none" | "right";
    opacity?: number;
    step?: number;
    width?: number;
}>;
declare const _componentHatching: React.MemoExoticComponent<(props: IHatchingProps) => React.FunctionComponentElement<IHatchingProps>>;
declare const Hatching: typeof _componentHatching & IElementDescriptor;
type IHeightProps = React.PropsWithChildren<{
    rangeMaxPoint?: number;
    rangeMinPoint?: number;
}>;
declare const _componentHeight: React.MemoExoticComponent<(props: IHeightProps) => React.FunctionComponentElement<IHeightProps>>;
declare const Height: typeof _componentHeight & IElementDescriptor;
type IHoverStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
    highlight?: boolean;
    width?: number;
    size?: number;
}>;
declare const _componentHoverStyle: React.MemoExoticComponent<(props: IHoverStyleProps) => React.FunctionComponentElement<IHoverStyleProps>>;
declare const HoverStyle: typeof _componentHoverStyle & IElementDescriptor;
type IImageProps = React.PropsWithChildren<{
    location?: "center" | "centerBottom" | "centerTop" | "full" | "leftBottom" | "leftCenter" | "leftTop" | "rightBottom" | "rightCenter" | "rightTop";
    url?: string | Record<string, any> | {
        rangeMaxPoint?: string;
        rangeMinPoint?: string;
    };
    height?: number | Record<string, any> | {
        rangeMaxPoint?: number;
        rangeMinPoint?: number;
    };
    width?: number | Record<string, any> | {
        rangeMaxPoint?: number;
        rangeMinPoint?: number;
    };
}>;
declare const _componentImage: React.MemoExoticComponent<(props: IImageProps) => React.FunctionComponentElement<IImageProps>>;
declare const Image: typeof _componentImage & IElementDescriptor;
type IIndentProps = React.PropsWithChildren<{
    left?: number;
    right?: number;
}>;
declare const _componentIndent: React.MemoExoticComponent<(props: IIndentProps) => React.FunctionComponentElement<IIndentProps>>;
declare const Indent: typeof _componentIndent & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    alignment?: "center" | "left" | "right";
    argumentFormat?: LocalizationTypes.Format;
    backgroundColor?: string;
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    connector?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    customizeText?: ((pointInfo: any) => string);
    displayFormat?: string;
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    horizontalOffset?: number;
    position?: "inside" | "outside";
    rotationAngle?: number;
    showForZeroValues?: boolean;
    verticalOffset?: number;
    visible?: boolean;
    overlappingBehavior?: "hide" | "none";
    topIndent?: number;
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
type ILengthProps = React.PropsWithChildren<{
    days?: number;
    hours?: number;
    milliseconds?: number;
    minutes?: number;
    months?: number;
    quarters?: number;
    seconds?: number;
    weeks?: number;
    years?: number;
}>;
declare const _componentLength: React.MemoExoticComponent<(props: ILengthProps) => React.FunctionComponentElement<ILengthProps>>;
declare const Length: typeof _componentLength & IElementDescriptor;
type ILoadingIndicatorProps = React.PropsWithChildren<{
    backgroundColor?: string;
    enabled?: boolean;
    font?: ChartsFont;
    show?: boolean;
    text?: string;
    defaultShow?: boolean;
    onShowChange?: (value: boolean) => void;
}>;
declare const _componentLoadingIndicator: React.MemoExoticComponent<(props: ILoadingIndicatorProps) => React.FunctionComponentElement<ILoadingIndicatorProps>>;
declare const LoadingIndicator: typeof _componentLoadingIndicator & IElementDescriptor;
type IMarginProps = React.PropsWithChildren<{
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
}>;
declare const _componentMargin: React.MemoExoticComponent<(props: IMarginProps) => React.FunctionComponentElement<IMarginProps>>;
declare const Margin: typeof _componentMargin & IElementDescriptor;
type IMarkerProps = React.PropsWithChildren<{
    label?: Record<string, any> | {
        customizeText?: ((markerValue: {
            value: Date | number;
            valueText: string;
        }) => string);
        format?: LocalizationTypes.Format;
    };
    separatorHeight?: number;
    textLeftIndent?: number;
    textTopIndent?: number;
    topIndent?: number;
    visible?: boolean;
}>;
declare const _componentMarker: React.MemoExoticComponent<(props: IMarkerProps) => React.FunctionComponentElement<IMarkerProps>>;
declare const Marker: typeof _componentMarker & IElementDescriptor;
type IMarkerLabelProps = React.PropsWithChildren<{
    customizeText?: ((markerValue: {
        value: Date | number;
        valueText: string;
    }) => string);
    format?: LocalizationTypes.Format;
}>;
declare const _componentMarkerLabel: React.MemoExoticComponent<(props: IMarkerLabelProps) => React.FunctionComponentElement<IMarkerLabelProps>>;
declare const MarkerLabel: typeof _componentMarkerLabel & IElementDescriptor;
type IMaxRangeProps = React.PropsWithChildren<{
    days?: number;
    hours?: number;
    milliseconds?: number;
    minutes?: number;
    months?: number;
    quarters?: number;
    seconds?: number;
    weeks?: number;
    years?: number;
}>;
declare const _componentMaxRange: React.MemoExoticComponent<(props: IMaxRangeProps) => React.FunctionComponentElement<IMaxRangeProps>>;
declare const MaxRange: typeof _componentMaxRange & IElementDescriptor;
type IMinorTickProps = React.PropsWithChildren<{
    color?: string;
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentMinorTick: React.MemoExoticComponent<(props: IMinorTickProps) => React.FunctionComponentElement<IMinorTickProps>>;
declare const MinorTick: typeof _componentMinorTick & IElementDescriptor;
type IMinorTickIntervalProps = React.PropsWithChildren<{
    days?: number;
    hours?: number;
    milliseconds?: number;
    minutes?: number;
    months?: number;
    quarters?: number;
    seconds?: number;
    weeks?: number;
    years?: number;
}>;
declare const _componentMinorTickInterval: React.MemoExoticComponent<(props: IMinorTickIntervalProps) => React.FunctionComponentElement<IMinorTickIntervalProps>>;
declare const MinorTickInterval: typeof _componentMinorTickInterval & IElementDescriptor;
type IMinRangeProps = React.PropsWithChildren<{
    days?: number;
    hours?: number;
    milliseconds?: number;
    minutes?: number;
    months?: number;
    quarters?: number;
    seconds?: number;
    weeks?: number;
    years?: number;
}>;
declare const _componentMinRange: React.MemoExoticComponent<(props: IMinRangeProps) => React.FunctionComponentElement<IMinRangeProps>>;
declare const MinRange: typeof _componentMinRange & IElementDescriptor;
type IPointProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    hoverMode?: "allArgumentPoints" | "allSeriesPoints" | "none" | "onlyPoint";
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        size?: number;
    };
    image?: Record<string, any> | string | {
        height?: number | Record<string, any> | {
            rangeMaxPoint?: number;
            rangeMinPoint?: number;
        };
        url?: Record<string, any> | string | {
            rangeMaxPoint?: string;
            rangeMinPoint?: string;
        };
        width?: number | Record<string, any> | {
            rangeMaxPoint?: number;
            rangeMinPoint?: number;
        };
    };
    selectionMode?: "allArgumentPoints" | "allSeriesPoints" | "none" | "onlyPoint";
    selectionStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        size?: number;
    };
    size?: number;
    symbol?: "circle" | "cross" | "polygon" | "square" | "triangle" | "triangleDown" | "triangleUp";
    visible?: boolean;
}>;
declare const _componentPoint: React.MemoExoticComponent<(props: IPointProps) => React.FunctionComponentElement<IPointProps>>;
declare const Point: typeof _componentPoint & IElementDescriptor;
type IPointBorderProps = React.PropsWithChildren<{
    color?: string;
    visible?: boolean;
    width?: number;
}>;
declare const _componentPointBorder: React.MemoExoticComponent<(props: IPointBorderProps) => React.FunctionComponentElement<IPointBorderProps>>;
declare const PointBorder: typeof _componentPointBorder & IElementDescriptor;
type IPointHoverStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    size?: number;
}>;
declare const _componentPointHoverStyle: React.MemoExoticComponent<(props: IPointHoverStyleProps) => React.FunctionComponentElement<IPointHoverStyleProps>>;
declare const PointHoverStyle: typeof _componentPointHoverStyle & IElementDescriptor;
type IPointImageProps = React.PropsWithChildren<{
    height?: number | Record<string, any> | {
        rangeMaxPoint?: number;
        rangeMinPoint?: number;
    };
    url?: Record<string, any> | string | {
        rangeMaxPoint?: string;
        rangeMinPoint?: string;
    };
    width?: number | Record<string, any> | {
        rangeMaxPoint?: number;
        rangeMinPoint?: number;
    };
}>;
declare const _componentPointImage: React.MemoExoticComponent<(props: IPointImageProps) => React.FunctionComponentElement<IPointImageProps>>;
declare const PointImage: typeof _componentPointImage & IElementDescriptor;
type IPointSelectionStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    size?: number;
}>;
declare const _componentPointSelectionStyle: React.MemoExoticComponent<(props: IPointSelectionStyleProps) => React.FunctionComponentElement<IPointSelectionStyleProps>>;
declare const PointSelectionStyle: typeof _componentPointSelectionStyle & IElementDescriptor;
type IReductionProps = React.PropsWithChildren<{
    color?: string;
    level?: "close" | "high" | "low" | "open";
}>;
declare const _componentReduction: React.MemoExoticComponent<(props: IReductionProps) => React.FunctionComponentElement<IReductionProps>>;
declare const Reduction: typeof _componentReduction & IElementDescriptor;
type IScaleProps = React.PropsWithChildren<{
    aggregateByCategory?: boolean;
    aggregationGroupWidth?: number;
    aggregationInterval?: number | Record<string, any> | "day" | "hour" | "millisecond" | "minute" | "month" | "quarter" | "second" | "week" | "year" | {
        days?: number;
        hours?: number;
        milliseconds?: number;
        minutes?: number;
        months?: number;
        quarters?: number;
        seconds?: number;
        weeks?: number;
        years?: number;
    };
    allowDecimals?: boolean;
    breaks?: Array<ScaleBreak> | {
        endValue?: Date | number | string;
        startValue?: Date | number | string;
    }[];
    breakStyle?: Record<string, any> | {
        color?: string;
        line?: "straight" | "waved";
        width?: number;
    };
    categories?: Array<Date | number | string>;
    discreteAxisDivisionMode?: "betweenLabels" | "crossLabels";
    endOnTick?: boolean;
    endValue?: Date | number | string;
    holidays?: Array<Date | string> | Array<number>;
    label?: Record<string, any> | {
        customizeText?: ((scaleValue: {
            value: Date | number | string;
            valueText: string;
        }) => string);
        font?: ChartsFont;
        format?: LocalizationTypes.Format;
        overlappingBehavior?: "hide" | "none";
        topIndent?: number;
        visible?: boolean;
    };
    linearThreshold?: number;
    logarithmBase?: number;
    marker?: Record<string, any> | {
        label?: Record<string, any> | {
            customizeText?: ((markerValue: {
                value: Date | number;
                valueText: string;
            }) => string);
            format?: LocalizationTypes.Format;
        };
        separatorHeight?: number;
        textLeftIndent?: number;
        textTopIndent?: number;
        topIndent?: number;
        visible?: boolean;
    };
    maxRange?: number | Record<string, any> | "day" | "hour" | "millisecond" | "minute" | "month" | "quarter" | "second" | "week" | "year" | {
        days?: number;
        hours?: number;
        milliseconds?: number;
        minutes?: number;
        months?: number;
        quarters?: number;
        seconds?: number;
        weeks?: number;
        years?: number;
    };
    minorTick?: Record<string, any> | {
        color?: string;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    minorTickCount?: number;
    minorTickInterval?: number | Record<string, any> | "day" | "hour" | "millisecond" | "minute" | "month" | "quarter" | "second" | "week" | "year" | {
        days?: number;
        hours?: number;
        milliseconds?: number;
        minutes?: number;
        months?: number;
        quarters?: number;
        seconds?: number;
        weeks?: number;
        years?: number;
    };
    minRange?: number | Record<string, any> | "day" | "hour" | "millisecond" | "minute" | "month" | "quarter" | "second" | "week" | "year" | {
        days?: number;
        hours?: number;
        milliseconds?: number;
        minutes?: number;
        months?: number;
        quarters?: number;
        seconds?: number;
        weeks?: number;
        years?: number;
    };
    placeholderHeight?: number;
    showCustomBoundaryTicks?: boolean;
    singleWorkdays?: Array<Date | string> | Array<number>;
    startValue?: Date | number | string;
    tick?: Record<string, any> | {
        color?: string;
        opacity?: number;
        width?: number;
    };
    tickInterval?: number | Record<string, any> | "day" | "hour" | "millisecond" | "minute" | "month" | "quarter" | "second" | "week" | "year" | {
        days?: number;
        hours?: number;
        milliseconds?: number;
        minutes?: number;
        months?: number;
        quarters?: number;
        seconds?: number;
        weeks?: number;
        years?: number;
    };
    type?: "continuous" | "discrete" | "logarithmic" | "semidiscrete";
    valueType?: "datetime" | "numeric" | "string";
    workdaysOnly?: boolean;
    workWeek?: Array<number>;
}>;
declare const _componentScale: React.MemoExoticComponent<(props: IScaleProps) => React.FunctionComponentElement<IScaleProps>>;
declare const Scale: typeof _componentScale & IElementDescriptor;
type IScaleLabelProps = React.PropsWithChildren<{
    customizeText?: ((scaleValue: {
        value: Date | number | string;
        valueText: string;
    }) => string);
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    overlappingBehavior?: "hide" | "none";
    topIndent?: number;
    visible?: boolean;
}>;
declare const _componentScaleLabel: React.MemoExoticComponent<(props: IScaleLabelProps) => React.FunctionComponentElement<IScaleLabelProps>>;
declare const ScaleLabel: typeof _componentScaleLabel & IElementDescriptor;
type ISelectionStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
    };
    color?: ChartsColor | string;
    size?: number;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
    highlight?: boolean;
    width?: number;
}>;
declare const _componentSelectionStyle: React.MemoExoticComponent<(props: ISelectionStyleProps) => React.FunctionComponentElement<ISelectionStyleProps>>;
declare const SelectionStyle: typeof _componentSelectionStyle & IElementDescriptor;
type ISeriesProps = React.PropsWithChildren<{
    aggregation?: Record<string, any> | {
        calculate?: ((aggregationInfo: chartPointAggregationInfoObject, series: chartSeriesObject) => Record<string, any> | Array<Record<string, any>>);
        enabled?: boolean;
        method?: "avg" | "count" | "max" | "min" | "ohlc" | "range" | "sum" | "custom";
    };
    argumentField?: string;
    axis?: string;
    barOverlapGroup?: string;
    barPadding?: number;
    barWidth?: number;
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    closeValueField?: string;
    color?: ChartsColor | string;
    cornerRadius?: number;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    highValueField?: string;
    hoverMode?: "allArgumentPoints" | "allSeriesPoints" | "excludePoints" | "includePoints" | "nearestPoint" | "none" | "onlyPoint";
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        highlight?: boolean;
        width?: number;
    };
    ignoreEmptyPoints?: boolean;
    innerColor?: string;
    label?: Record<string, any> | {
        alignment?: "center" | "left" | "right";
        argumentFormat?: LocalizationTypes.Format;
        backgroundColor?: string;
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        connector?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        customizeText?: ((pointInfo: any) => string);
        displayFormat?: string;
        font?: ChartsFont;
        format?: LocalizationTypes.Format;
        horizontalOffset?: number;
        position?: "inside" | "outside";
        rotationAngle?: number;
        showForZeroValues?: boolean;
        verticalOffset?: number;
        visible?: boolean;
    };
    lowValueField?: string;
    maxLabelCount?: number;
    minBarSize?: number;
    name?: string;
    opacity?: number;
    openValueField?: string;
    pane?: string;
    point?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        hoverMode?: "allArgumentPoints" | "allSeriesPoints" | "none" | "onlyPoint";
        hoverStyle?: Record<string, any> | {
            border?: Record<string, any> | {
                color?: string;
                visible?: boolean;
                width?: number;
            };
            color?: ChartsColor | string;
            size?: number;
        };
        image?: Record<string, any> | string | {
            height?: number | Record<string, any> | {
                rangeMaxPoint?: number;
                rangeMinPoint?: number;
            };
            url?: Record<string, any> | string | {
                rangeMaxPoint?: string;
                rangeMinPoint?: string;
            };
            width?: number | Record<string, any> | {
                rangeMaxPoint?: number;
                rangeMinPoint?: number;
            };
        };
        selectionMode?: "allArgumentPoints" | "allSeriesPoints" | "none" | "onlyPoint";
        selectionStyle?: Record<string, any> | {
            border?: Record<string, any> | {
                color?: string;
                visible?: boolean;
                width?: number;
            };
            color?: ChartsColor | string;
            size?: number;
        };
        size?: number;
        symbol?: "circle" | "cross" | "polygon" | "square" | "triangle" | "triangleDown" | "triangleUp";
        visible?: boolean;
    };
    rangeValue1Field?: string;
    rangeValue2Field?: string;
    reduction?: Record<string, any> | {
        color?: string;
        level?: "close" | "high" | "low" | "open";
    };
    selectionMode?: "allArgumentPoints" | "allSeriesPoints" | "excludePoints" | "includePoints" | "none" | "onlyPoint";
    selectionStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        highlight?: boolean;
        width?: number;
    };
    showInLegend?: boolean;
    sizeField?: string;
    stack?: string;
    tag?: any;
    tagField?: string;
    type?: "area" | "bar" | "bubble" | "candlestick" | "fullstackedarea" | "fullstackedbar" | "fullstackedline" | "fullstackedspline" | "fullstackedsplinearea" | "line" | "rangearea" | "rangebar" | "scatter" | "spline" | "splinearea" | "stackedarea" | "stackedbar" | "stackedline" | "stackedspline" | "stackedsplinearea" | "steparea" | "stepline" | "stock";
    valueErrorBar?: Record<string, any> | {
        color?: string;
        displayMode?: "auto" | "high" | "low" | "none";
        edgeLength?: number;
        highValueField?: string;
        lineWidth?: number;
        lowValueField?: string;
        opacity?: number;
        type?: "fixed" | "percent" | "stdDeviation" | "stdError" | "variance";
        value?: number;
    };
    valueField?: string;
    visible?: boolean;
    width?: number;
}>;
declare const _componentSeries: React.MemoExoticComponent<(props: ISeriesProps) => React.FunctionComponentElement<ISeriesProps>>;
declare const Series: typeof _componentSeries & IElementDescriptor;
type ISeriesBorderProps = React.PropsWithChildren<{
    color?: string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    visible?: boolean;
    width?: number;
}>;
declare const _componentSeriesBorder: React.MemoExoticComponent<(props: ISeriesBorderProps) => React.FunctionComponentElement<ISeriesBorderProps>>;
declare const SeriesBorder: typeof _componentSeriesBorder & IElementDescriptor;
type ISeriesTemplateProps = React.PropsWithChildren<{
    customizeSeries?: ((seriesName: any) => ChartSeries);
    nameField?: string;
}>;
declare const _componentSeriesTemplate: React.MemoExoticComponent<(props: ISeriesTemplateProps) => React.FunctionComponentElement<ISeriesTemplateProps>>;
declare const SeriesTemplate: typeof _componentSeriesTemplate & IElementDescriptor;
type IShutterProps = React.PropsWithChildren<{
    color?: string;
    opacity?: number;
}>;
declare const _componentShutter: React.MemoExoticComponent<(props: IShutterProps) => React.FunctionComponentElement<IShutterProps>>;
declare const Shutter: typeof _componentShutter & IElementDescriptor;
type ISizeProps = React.PropsWithChildren<{
    height?: number;
    width?: number;
}>;
declare const _componentSize: React.MemoExoticComponent<(props: ISizeProps) => React.FunctionComponentElement<ISizeProps>>;
declare const Size: typeof _componentSize & IElementDescriptor;
type ISliderHandleProps = React.PropsWithChildren<{
    color?: string;
    opacity?: number;
    width?: number;
}>;
declare const _componentSliderHandle: React.MemoExoticComponent<(props: ISliderHandleProps) => React.FunctionComponentElement<ISliderHandleProps>>;
declare const SliderHandle: typeof _componentSliderHandle & IElementDescriptor;
type ISliderMarkerProps = React.PropsWithChildren<{
    color?: string;
    customizeText?: ((scaleValue: {
        value: Date | number | string;
        valueText: string;
    }) => string);
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    invalidRangeColor?: string;
    paddingLeftRight?: number;
    paddingTopBottom?: number;
    placeholderHeight?: number;
    visible?: boolean;
}>;
declare const _componentSliderMarker: React.MemoExoticComponent<(props: ISliderMarkerProps) => React.FunctionComponentElement<ISliderMarkerProps>>;
declare const SliderMarker: typeof _componentSliderMarker & IElementDescriptor;
type ISubtitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    offset?: number;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentSubtitle: React.MemoExoticComponent<(props: ISubtitleProps) => React.FunctionComponentElement<ISubtitleProps>>;
declare const Subtitle: typeof _componentSubtitle & IElementDescriptor;
type ITickProps = React.PropsWithChildren<{
    color?: string;
    opacity?: number;
    width?: number;
}>;
declare const _componentTick: React.MemoExoticComponent<(props: ITickProps) => React.FunctionComponentElement<ITickProps>>;
declare const Tick: typeof _componentTick & IElementDescriptor;
type ITickIntervalProps = React.PropsWithChildren<{
    days?: number;
    hours?: number;
    milliseconds?: number;
    minutes?: number;
    months?: number;
    quarters?: number;
    seconds?: number;
    weeks?: number;
    years?: number;
}>;
declare const _componentTickInterval: React.MemoExoticComponent<(props: ITickIntervalProps) => React.FunctionComponentElement<ITickIntervalProps>>;
declare const TickInterval: typeof _componentTickInterval & IElementDescriptor;
type ITitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    horizontalAlignment?: "center" | "left" | "right";
    margin?: number | Record<string, any> | {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    };
    placeholderSize?: number;
    subtitle?: Record<string, any> | string | {
        font?: ChartsFont;
        offset?: number;
        text?: string;
        textOverflow?: "ellipsis" | "hide" | "none";
        wordWrap?: "normal" | "breakWord" | "none";
    };
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    verticalAlignment?: "bottom" | "top";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentTitle: React.MemoExoticComponent<(props: ITitleProps) => React.FunctionComponentElement<ITitleProps>>;
declare const Title: typeof _componentTitle & IElementDescriptor;
type IUrlProps = React.PropsWithChildren<{
    rangeMaxPoint?: string;
    rangeMinPoint?: string;
}>;
declare const _componentUrl: React.MemoExoticComponent<(props: IUrlProps) => React.FunctionComponentElement<IUrlProps>>;
declare const Url: typeof _componentUrl & IElementDescriptor;
type IValueProps = React.PropsWithChildren<{
    endValue?: Date | number | string;
    length?: number | Record<string, any> | "day" | "hour" | "millisecond" | "minute" | "month" | "quarter" | "second" | "week" | "year" | {
        days?: number;
        hours?: number;
        milliseconds?: number;
        minutes?: number;
        months?: number;
        quarters?: number;
        seconds?: number;
        weeks?: number;
        years?: number;
    };
    startValue?: Date | number | string;
    defaultEndValue?: Date | number | string;
    onEndValueChange?: (value: Date | number | string) => void;
    defaultStartValue?: Date | number | string;
    onStartValueChange?: (value: Date | number | string) => void;
}>;
declare const _componentValue: React.MemoExoticComponent<(props: IValueProps) => React.FunctionComponentElement<IValueProps>>;
declare const Value: typeof _componentValue & IElementDescriptor;
type IValueAxisProps = React.PropsWithChildren<{
    inverted?: boolean;
    logarithmBase?: number;
    max?: number;
    min?: number;
    type?: "continuous" | "logarithmic";
    valueType?: "datetime" | "numeric" | "string";
}>;
declare const _componentValueAxis: React.MemoExoticComponent<(props: IValueAxisProps) => React.FunctionComponentElement<IValueAxisProps>>;
declare const ValueAxis: typeof _componentValueAxis & IElementDescriptor;
type IValueErrorBarProps = React.PropsWithChildren<{
    color?: string;
    displayMode?: "auto" | "high" | "low" | "none";
    edgeLength?: number;
    highValueField?: string;
    lineWidth?: number;
    lowValueField?: string;
    opacity?: number;
    type?: "fixed" | "percent" | "stdDeviation" | "stdError" | "variance";
    value?: number;
}>;
declare const _componentValueErrorBar: React.MemoExoticComponent<(props: IValueErrorBarProps) => React.FunctionComponentElement<IValueErrorBarProps>>;
declare const ValueErrorBar: typeof _componentValueErrorBar & IElementDescriptor;
type IWidthProps = React.PropsWithChildren<{
    rangeMaxPoint?: number;
    rangeMinPoint?: number;
}>;
declare const _componentWidth: React.MemoExoticComponent<(props: IWidthProps) => React.FunctionComponentElement<IWidthProps>>;
declare const Width: typeof _componentWidth & IElementDescriptor;
export default RangeSelector;
export { RangeSelector, IRangeSelectorOptions, RangeSelectorRef, Aggregation, IAggregationProps, AggregationInterval, IAggregationIntervalProps, ArgumentFormat, IArgumentFormatProps, Background, IBackgroundProps, BackgroundImage, IBackgroundImageProps, Behavior, IBehaviorProps, Border, IBorderProps, Break, IBreakProps, BreakStyle, IBreakStyleProps, Chart, IChartProps, Color, IColorProps, CommonSeriesSettings, ICommonSeriesSettingsProps, CommonSeriesSettingsHoverStyle, ICommonSeriesSettingsHoverStyleProps, CommonSeriesSettingsLabel, ICommonSeriesSettingsLabelProps, CommonSeriesSettingsSelectionStyle, ICommonSeriesSettingsSelectionStyleProps, Connector, IConnectorProps, DataPrepareSettings, IDataPrepareSettingsProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Hatching, IHatchingProps, Height, IHeightProps, HoverStyle, IHoverStyleProps, Image, IImageProps, Indent, IIndentProps, Label, ILabelProps, Length, ILengthProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, Marker, IMarkerProps, MarkerLabel, IMarkerLabelProps, MaxRange, IMaxRangeProps, MinorTick, IMinorTickProps, MinorTickInterval, IMinorTickIntervalProps, MinRange, IMinRangeProps, Point, IPointProps, PointBorder, IPointBorderProps, PointHoverStyle, IPointHoverStyleProps, PointImage, IPointImageProps, PointSelectionStyle, IPointSelectionStyleProps, Reduction, IReductionProps, Scale, IScaleProps, ScaleLabel, IScaleLabelProps, SelectionStyle, ISelectionStyleProps, Series, ISeriesProps, SeriesBorder, ISeriesBorderProps, SeriesTemplate, ISeriesTemplateProps, Shutter, IShutterProps, Size, ISizeProps, SliderHandle, ISliderHandleProps, SliderMarker, ISliderMarkerProps, Subtitle, ISubtitleProps, Tick, ITickProps, TickInterval, ITickIntervalProps, Title, ITitleProps, Url, IUrlProps, Value, IValueProps, ValueAxis, IValueAxisProps, ValueErrorBar, IValueErrorBarProps, Width, IWidthProps };
import type * as RangeSelectorTypes from 'dpt-ui/viz/range_selector_types';
export { RangeSelectorTypes };
