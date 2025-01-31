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
import dxPolarChart, { Properties } from "dpt-ui/viz/polar_chart";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ArgumentAxisClickEvent, DisposingEvent, DoneEvent, DrawnEvent, ExportedEvent, ExportingEvent, FileSavingEvent, IncidentOccurredEvent, InitializedEvent, LegendClickEvent, PointClickEvent, SeriesClickEvent, TooltipHiddenEvent, TooltipShownEvent, ZoomEndEvent, ZoomStartEvent, dxPolarChartAnnotationConfig, dxPolarChartCommonAnnotationConfig, PolarChartSeries } from "dpt-ui/viz/polar_chart";
import type { Font as ChartsFont, ChartsColor, LegendItem } from "dpt-ui/common/charts";
import type { template } from "dpt-ui/core/templates/template";
import type * as CommonChartTypes from "dpt-ui/common/charts";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IPolarChartOptionsNarrowedEvents = {
    onArgumentAxisClick?: ((e: ArgumentAxisClickEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onDone?: ((e: DoneEvent) => void);
    onDrawn?: ((e: DrawnEvent) => void);
    onExported?: ((e: ExportedEvent) => void);
    onExporting?: ((e: ExportingEvent) => void);
    onFileSaving?: ((e: FileSavingEvent) => void);
    onIncidentOccurred?: ((e: IncidentOccurredEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onLegendClick?: ((e: LegendClickEvent) => void);
    onPointClick?: ((e: PointClickEvent) => void);
    onSeriesClick?: ((e: SeriesClickEvent) => void);
    onTooltipHidden?: ((e: TooltipHiddenEvent) => void);
    onTooltipShown?: ((e: TooltipShownEvent) => void);
    onZoomEnd?: ((e: ZoomEndEvent) => void);
    onZoomStart?: ((e: ZoomStartEvent) => void);
};
type IPolarChartOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IPolarChartOptionsNarrowedEvents> & IHtmlOptions & {
    defaultLoadingIndicator?: Record<string, any>;
    defaultValueAxis?: Record<string, any>;
    onLoadingIndicatorChange?: (value: Record<string, any>) => void;
    onValueAxisChange?: (value: Record<string, any>) => void;
}>;
interface PolarChartRef {
    instance: () => dxPolarChart;
}
declare const PolarChart: (props: React.PropsWithChildren<IPolarChartOptions> & {
    ref?: Ref<PolarChartRef>;
}) => ReactElement | null;
type IAdaptiveLayoutProps = React.PropsWithChildren<{
    height?: number;
    keepLabels?: boolean;
    width?: number;
}>;
declare const _componentAdaptiveLayout: React.MemoExoticComponent<(props: IAdaptiveLayoutProps) => React.FunctionComponentElement<IAdaptiveLayoutProps>>;
declare const AdaptiveLayout: typeof _componentAdaptiveLayout & IElementDescriptor;
type IAnimationProps = React.PropsWithChildren<{
    duration?: number;
    easing?: "easeOutCubic" | "linear";
    enabled?: boolean;
    maxPointCountSupported?: number;
}>;
declare const _componentAnimation: React.MemoExoticComponent<(props: IAnimationProps) => React.FunctionComponentElement<IAnimationProps>>;
declare const Animation: typeof _componentAnimation & IElementDescriptor;
type IAnnotationProps = React.PropsWithChildren<{
    allowDragging?: boolean;
    angle?: number;
    argument?: Date | number | string;
    arrowLength?: number;
    arrowWidth?: number;
    border?: Record<string, any> | {
        color?: string;
        cornerRadius?: number;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    color?: string;
    customizeTooltip?: ((annotation: dxPolarChartAnnotationConfig | any) => Record<string, any>);
    data?: any;
    description?: string;
    font?: ChartsFont;
    height?: number;
    image?: Record<string, any> | string | {
        height?: number;
        url?: string;
        width?: number;
    };
    name?: string;
    offsetX?: number;
    offsetY?: number;
    opacity?: number;
    paddingLeftRight?: number;
    paddingTopBottom?: number;
    radius?: number;
    series?: string;
    shadow?: Record<string, any> | {
        blur?: number;
        color?: string;
        offsetX?: number;
        offsetY?: number;
        opacity?: number;
    };
    template?: ((annotation: dxPolarChartCommonAnnotationConfig | any, element: any) => string | any) | template;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    tooltipEnabled?: boolean;
    tooltipTemplate?: ((annotation: dxPolarChartAnnotationConfig | any, element: any) => string | any) | template;
    type?: "text" | "image" | "custom";
    value?: Date | number | string;
    width?: number;
    wordWrap?: "normal" | "breakWord" | "none";
    x?: number;
    y?: number;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    tooltipRender?: (...params: any) => React.ReactNode;
    tooltipComponent?: React.ComponentType<any>;
}>;
declare const _componentAnnotation: React.MemoExoticComponent<(props: IAnnotationProps) => React.FunctionComponentElement<IAnnotationProps>>;
declare const Annotation: typeof _componentAnnotation & IElementDescriptor;
type IAnnotationBorderProps = React.PropsWithChildren<{
    color?: string;
    cornerRadius?: number;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentAnnotationBorder: React.MemoExoticComponent<(props: IAnnotationBorderProps) => React.FunctionComponentElement<IAnnotationBorderProps>>;
declare const AnnotationBorder: typeof _componentAnnotationBorder & IElementDescriptor;
type IArgumentAxisProps = React.PropsWithChildren<{
    allowDecimals?: boolean;
    argumentType?: "datetime" | "numeric" | "string";
    axisDivisionFactor?: number;
    categories?: Array<Date | number | string>;
    color?: string;
    constantLines?: Array<Record<string, any>> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        displayBehindSeries?: boolean;
        extendAxis?: boolean;
        label?: Record<string, any> | {
            font?: ChartsFont;
            text?: string;
            visible?: boolean;
        };
        value?: Date | number | string;
        width?: number;
    }[];
    constantLineStyle?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        label?: Record<string, any> | {
            font?: ChartsFont;
            visible?: boolean;
        };
        width?: number;
    };
    discreteAxisDivisionMode?: "betweenLabels" | "crossLabels";
    endOnTick?: boolean;
    firstPointOnStartAngle?: boolean;
    grid?: Record<string, any> | {
        color?: string;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    hoverMode?: "allArgumentPoints" | "none";
    inverted?: boolean;
    label?: Record<string, any> | {
        customizeHint?: ((argument: {
            value: Date | number | string;
            valueText: string;
        }) => string);
        customizeText?: ((argument: {
            value: Date | number | string;
            valueText: string;
        }) => string);
        font?: ChartsFont;
        format?: LocalizationTypes.Format;
        indentFromAxis?: number;
        overlappingBehavior?: "hide" | "none";
        visible?: boolean;
    };
    linearThreshold?: number;
    logarithmBase?: number;
    minorGrid?: Record<string, any> | {
        color?: string;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    minorTick?: Record<string, any> | {
        color?: string;
        length?: number;
        opacity?: number;
        shift?: number;
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
    opacity?: number;
    originValue?: number;
    period?: number;
    startAngle?: number;
    strips?: Array<Record<string, any>> | {
        color?: string;
        endValue?: Date | number | string;
        label?: Record<string, any> | {
            font?: ChartsFont;
            text?: string;
        };
        startValue?: Date | number | string;
    }[];
    stripStyle?: Record<string, any> | {
        label?: Record<string, any> | {
            font?: ChartsFont;
        };
    };
    tick?: Record<string, any> | {
        color?: string;
        length?: number;
        opacity?: number;
        shift?: number;
        visible?: boolean;
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
    type?: "continuous" | "discrete" | "logarithmic";
    visible?: boolean;
    width?: number;
}>;
declare const _componentArgumentAxis: React.MemoExoticComponent<(props: IArgumentAxisProps) => React.FunctionComponentElement<IArgumentAxisProps>>;
declare const ArgumentAxis: typeof _componentArgumentAxis & IElementDescriptor;
type IArgumentAxisMinorTickProps = React.PropsWithChildren<{
    color?: string;
    length?: number;
    opacity?: number;
    shift?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentArgumentAxisMinorTick: React.MemoExoticComponent<(props: IArgumentAxisMinorTickProps) => React.FunctionComponentElement<IArgumentAxisMinorTickProps>>;
declare const ArgumentAxisMinorTick: typeof _componentArgumentAxisMinorTick & IElementDescriptor;
type IArgumentAxisTickProps = React.PropsWithChildren<{
    color?: string;
    length?: number;
    opacity?: number;
    shift?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentArgumentAxisTick: React.MemoExoticComponent<(props: IArgumentAxisTickProps) => React.FunctionComponentElement<IArgumentAxisTickProps>>;
declare const ArgumentAxisTick: typeof _componentArgumentAxisTick & IElementDescriptor;
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
type IAxisLabelProps = React.PropsWithChildren<{
    customizeHint?: ((argument: {
        value: Date | number | string;
        valueText: string;
    }) => string);
    customizeText?: ((argument: {
        value: Date | number | string;
        valueText: string;
    }) => string);
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    indentFromAxis?: number;
    overlappingBehavior?: "hide" | "none";
    visible?: boolean;
}>;
declare const _componentAxisLabel: React.MemoExoticComponent<(props: IAxisLabelProps) => React.FunctionComponentElement<IAxisLabelProps>>;
declare const AxisLabel: typeof _componentAxisLabel & IElementDescriptor;
type IBorderProps = React.PropsWithChildren<{
    color?: string;
    cornerRadius?: number;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentBorder: React.MemoExoticComponent<(props: IBorderProps) => React.FunctionComponentElement<IBorderProps>>;
declare const Border: typeof _componentBorder & IElementDescriptor;
type IColorProps = React.PropsWithChildren<{
    base?: string;
    fillId?: string;
}>;
declare const _componentColor: React.MemoExoticComponent<(props: IColorProps) => React.FunctionComponentElement<IColorProps>>;
declare const Color: typeof _componentColor & IElementDescriptor;
type ICommonAnnotationSettingsProps = React.PropsWithChildren<{
    allowDragging?: boolean;
    angle?: number;
    argument?: Date | number | string;
    arrowLength?: number;
    arrowWidth?: number;
    border?: Record<string, any> | {
        color?: string;
        cornerRadius?: number;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    color?: string;
    customizeTooltip?: ((annotation: dxPolarChartAnnotationConfig | any) => Record<string, any>);
    data?: any;
    description?: string;
    font?: ChartsFont;
    height?: number;
    image?: Record<string, any> | string | {
        height?: number;
        url?: string;
        width?: number;
    };
    offsetX?: number;
    offsetY?: number;
    opacity?: number;
    paddingLeftRight?: number;
    paddingTopBottom?: number;
    radius?: number;
    series?: string;
    shadow?: Record<string, any> | {
        blur?: number;
        color?: string;
        offsetX?: number;
        offsetY?: number;
        opacity?: number;
    };
    template?: ((annotation: dxPolarChartCommonAnnotationConfig | any, element: any) => string | any) | template;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    tooltipEnabled?: boolean;
    tooltipTemplate?: ((annotation: dxPolarChartAnnotationConfig | any, element: any) => string | any) | template;
    type?: "text" | "image" | "custom";
    value?: Date | number | string;
    width?: number;
    wordWrap?: "normal" | "breakWord" | "none";
    x?: number;
    y?: number;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    tooltipRender?: (...params: any) => React.ReactNode;
    tooltipComponent?: React.ComponentType<any>;
}>;
declare const _componentCommonAnnotationSettings: React.MemoExoticComponent<(props: ICommonAnnotationSettingsProps) => React.FunctionComponentElement<ICommonAnnotationSettingsProps>>;
declare const CommonAnnotationSettings: typeof _componentCommonAnnotationSettings & IElementDescriptor;
type ICommonAxisSettingsProps = React.PropsWithChildren<{
    allowDecimals?: boolean;
    color?: string;
    constantLineStyle?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        label?: Record<string, any> | {
            font?: ChartsFont;
            visible?: boolean;
        };
        width?: number;
    };
    discreteAxisDivisionMode?: "betweenLabels" | "crossLabels";
    endOnTick?: boolean;
    grid?: Record<string, any> | {
        color?: string;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    inverted?: boolean;
    label?: Record<string, any> | {
        font?: ChartsFont;
        indentFromAxis?: number;
        overlappingBehavior?: "hide" | "none";
        visible?: boolean;
    };
    minorGrid?: Record<string, any> | {
        color?: string;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    minorTick?: Record<string, any> | {
        color?: string;
        length?: number;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    opacity?: number;
    stripStyle?: Record<string, any> | {
        label?: Record<string, any> | {
            font?: ChartsFont;
        };
    };
    tick?: Record<string, any> | {
        color?: string;
        length?: number;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    visible?: boolean;
    width?: number;
}>;
declare const _componentCommonAxisSettings: React.MemoExoticComponent<(props: ICommonAxisSettingsProps) => React.FunctionComponentElement<ICommonAxisSettingsProps>>;
declare const CommonAxisSettings: typeof _componentCommonAxisSettings & IElementDescriptor;
type ICommonAxisSettingsLabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
    indentFromAxis?: number;
    overlappingBehavior?: "hide" | "none";
    visible?: boolean;
}>;
declare const _componentCommonAxisSettingsLabel: React.MemoExoticComponent<(props: ICommonAxisSettingsLabelProps) => React.FunctionComponentElement<ICommonAxisSettingsLabelProps>>;
declare const CommonAxisSettingsLabel: typeof _componentCommonAxisSettingsLabel & IElementDescriptor;
type ICommonAxisSettingsMinorTickProps = React.PropsWithChildren<{
    color?: string;
    length?: number;
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentCommonAxisSettingsMinorTick: React.MemoExoticComponent<(props: ICommonAxisSettingsMinorTickProps) => React.FunctionComponentElement<ICommonAxisSettingsMinorTickProps>>;
declare const CommonAxisSettingsMinorTick: typeof _componentCommonAxisSettingsMinorTick & IElementDescriptor;
type ICommonAxisSettingsTickProps = React.PropsWithChildren<{
    color?: string;
    length?: number;
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentCommonAxisSettingsTick: React.MemoExoticComponent<(props: ICommonAxisSettingsTickProps) => React.FunctionComponentElement<ICommonAxisSettingsTickProps>>;
declare const CommonAxisSettingsTick: typeof _componentCommonAxisSettingsTick & IElementDescriptor;
type ICommonSeriesSettingsProps = React.PropsWithChildren<{
    area?: any;
    argumentField?: string;
    bar?: any;
    barPadding?: number;
    barWidth?: number;
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    closed?: boolean;
    color?: ChartsColor | string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
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
    label?: Record<string, any> | {
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
        position?: "inside" | "outside";
        rotationAngle?: number;
        showForZeroValues?: boolean;
        visible?: boolean;
    };
    line?: any;
    maxLabelCount?: number;
    minBarSize?: number;
    opacity?: number;
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
            height?: number;
            url?: string;
            width?: number;
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
    stack?: string;
    stackedbar?: any;
    tagField?: string;
    type?: "area" | "bar" | "line" | "scatter" | "stackedbar";
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
    position?: "inside" | "outside";
    rotationAngle?: number;
    showForZeroValues?: boolean;
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
type IConstantLineProps = React.PropsWithChildren<{
    color?: string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    displayBehindSeries?: boolean;
    extendAxis?: boolean;
    label?: Record<string, any> | {
        font?: ChartsFont;
        text?: string;
        visible?: boolean;
    };
    value?: Date | number | string;
    width?: number;
}>;
declare const _componentConstantLine: React.MemoExoticComponent<(props: IConstantLineProps) => React.FunctionComponentElement<IConstantLineProps>>;
declare const ConstantLine: typeof _componentConstantLine & IElementDescriptor;
type IConstantLineLabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
    text?: string;
    visible?: boolean;
}>;
declare const _componentConstantLineLabel: React.MemoExoticComponent<(props: IConstantLineLabelProps) => React.FunctionComponentElement<IConstantLineLabelProps>>;
declare const ConstantLineLabel: typeof _componentConstantLineLabel & IElementDescriptor;
type IConstantLineStyleProps = React.PropsWithChildren<{
    color?: string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    label?: Record<string, any> | {
        font?: ChartsFont;
        visible?: boolean;
    };
    width?: number;
}>;
declare const _componentConstantLineStyle: React.MemoExoticComponent<(props: IConstantLineStyleProps) => React.FunctionComponentElement<IConstantLineStyleProps>>;
declare const ConstantLineStyle: typeof _componentConstantLineStyle & IElementDescriptor;
type IConstantLineStyleLabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
    visible?: boolean;
}>;
declare const _componentConstantLineStyleLabel: React.MemoExoticComponent<(props: IConstantLineStyleLabelProps) => React.FunctionComponentElement<IConstantLineStyleLabelProps>>;
declare const ConstantLineStyleLabel: typeof _componentConstantLineStyleLabel & IElementDescriptor;
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
type IGridProps = React.PropsWithChildren<{
    color?: string;
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentGrid: React.MemoExoticComponent<(props: IGridProps) => React.FunctionComponentElement<IGridProps>>;
declare const Grid: typeof _componentGrid & IElementDescriptor;
type IHatchingProps = React.PropsWithChildren<{
    direction?: "left" | "none" | "right";
    opacity?: number;
    step?: number;
    width?: number;
}>;
declare const _componentHatching: React.MemoExoticComponent<(props: IHatchingProps) => React.FunctionComponentElement<IHatchingProps>>;
declare const Hatching: typeof _componentHatching & IElementDescriptor;
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
    height?: number;
    url?: string;
    width?: number;
}>;
declare const _componentImage: React.MemoExoticComponent<(props: IImageProps) => React.FunctionComponentElement<IImageProps>>;
declare const Image: typeof _componentImage & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
    text?: string;
    visible?: boolean;
    customizeHint?: ((argument: {
        value: Date | number | string;
        valueText: string;
    }) => string);
    customizeText?: ((argument: {
        value: Date | number | string;
        valueText: string;
    }) => string);
    format?: LocalizationTypes.Format;
    indentFromAxis?: number;
    overlappingBehavior?: "hide" | "none";
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
    displayFormat?: string;
    position?: "inside" | "outside";
    rotationAngle?: number;
    showForZeroValues?: boolean;
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
type ILegendProps = React.PropsWithChildren<{
    backgroundColor?: string;
    border?: Record<string, any> | {
        color?: string;
        cornerRadius?: number;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    columnCount?: number;
    columnItemSpacing?: number;
    customizeHint?: ((seriesInfo: {
        seriesColor: string;
        seriesIndex: number;
        seriesName: any;
    }) => string);
    customizeItems?: ((items: Array<LegendItem>) => Array<LegendItem>);
    customizeText?: ((seriesInfo: {
        seriesColor: string;
        seriesIndex: number;
        seriesName: any;
    }) => string);
    font?: ChartsFont;
    horizontalAlignment?: "center" | "left" | "right";
    hoverMode?: "excludePoints" | "includePoints" | "none";
    itemsAlignment?: "center" | "left" | "right";
    itemTextPosition?: "bottom" | "left" | "right" | "top";
    margin?: number | Record<string, any> | {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    };
    markerSize?: number;
    markerTemplate?: ((legendItem: LegendItem, element: any) => string | any) | template;
    orientation?: "horizontal" | "vertical";
    paddingLeftRight?: number;
    paddingTopBottom?: number;
    rowCount?: number;
    rowItemSpacing?: number;
    title?: Record<string, any> | string | {
        font?: ChartsFont;
        horizontalAlignment?: "center" | "left" | "right";
        margin?: Record<string, any> | {
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
        };
        text?: string;
        verticalAlignment?: "bottom" | "top";
    };
    verticalAlignment?: "bottom" | "top";
    visible?: boolean;
    markerRender?: (...params: any) => React.ReactNode;
    markerComponent?: React.ComponentType<any>;
}>;
declare const _componentLegend: React.MemoExoticComponent<(props: ILegendProps) => React.FunctionComponentElement<ILegendProps>>;
declare const Legend: typeof _componentLegend & IElementDescriptor;
type ILegendTitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    horizontalAlignment?: "center" | "left" | "right";
    margin?: Record<string, any> | {
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
    };
    text?: string;
    verticalAlignment?: "bottom" | "top";
}>;
declare const _componentLegendTitle: React.MemoExoticComponent<(props: ILegendTitleProps) => React.FunctionComponentElement<ILegendTitleProps>>;
declare const LegendTitle: typeof _componentLegendTitle & IElementDescriptor;
type ILegendTitleSubtitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    offset?: number;
    text?: string;
}>;
declare const _componentLegendTitleSubtitle: React.MemoExoticComponent<(props: ILegendTitleSubtitleProps) => React.FunctionComponentElement<ILegendTitleSubtitleProps>>;
declare const LegendTitleSubtitle: typeof _componentLegendTitleSubtitle & IElementDescriptor;
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
type IMinorGridProps = React.PropsWithChildren<{
    color?: string;
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentMinorGrid: React.MemoExoticComponent<(props: IMinorGridProps) => React.FunctionComponentElement<IMinorGridProps>>;
declare const MinorGrid: typeof _componentMinorGrid & IElementDescriptor;
type IMinorTickProps = React.PropsWithChildren<{
    color?: string;
    length?: number;
    opacity?: number;
    shift?: number;
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
type IMinVisualRangeLengthProps = React.PropsWithChildren<{
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
declare const _componentMinVisualRangeLength: React.MemoExoticComponent<(props: IMinVisualRangeLengthProps) => React.FunctionComponentElement<IMinVisualRangeLengthProps>>;
declare const MinVisualRangeLength: typeof _componentMinVisualRangeLength & IElementDescriptor;
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
        height?: number;
        url?: string;
        width?: number;
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
type IPolarChartTitleProps = React.PropsWithChildren<{
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
declare const _componentPolarChartTitle: React.MemoExoticComponent<(props: IPolarChartTitleProps) => React.FunctionComponentElement<IPolarChartTitleProps>>;
declare const PolarChartTitle: typeof _componentPolarChartTitle & IElementDescriptor;
type IPolarChartTitleSubtitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    offset?: number;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentPolarChartTitleSubtitle: React.MemoExoticComponent<(props: IPolarChartTitleSubtitleProps) => React.FunctionComponentElement<IPolarChartTitleSubtitleProps>>;
declare const PolarChartTitleSubtitle: typeof _componentPolarChartTitleSubtitle & IElementDescriptor;
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
    argumentField?: string;
    barPadding?: number;
    barWidth?: number;
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    closed?: boolean;
    color?: ChartsColor | string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
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
    label?: Record<string, any> | {
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
        position?: "inside" | "outside";
        rotationAngle?: number;
        showForZeroValues?: boolean;
        visible?: boolean;
    };
    maxLabelCount?: number;
    minBarSize?: number;
    name?: string;
    opacity?: number;
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
            height?: number;
            url?: string;
            width?: number;
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
    stack?: string;
    tag?: any;
    tagField?: string;
    type?: "area" | "bar" | "line" | "scatter" | "stackedbar";
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
    customizeSeries?: ((seriesName: any) => PolarChartSeries);
    nameField?: string;
}>;
declare const _componentSeriesTemplate: React.MemoExoticComponent<(props: ISeriesTemplateProps) => React.FunctionComponentElement<ISeriesTemplateProps>>;
declare const SeriesTemplate: typeof _componentSeriesTemplate & IElementDescriptor;
type IShadowProps = React.PropsWithChildren<{
    blur?: number;
    color?: string;
    offsetX?: number;
    offsetY?: number;
    opacity?: number;
}>;
declare const _componentShadow: React.MemoExoticComponent<(props: IShadowProps) => React.FunctionComponentElement<IShadowProps>>;
declare const Shadow: typeof _componentShadow & IElementDescriptor;
type ISizeProps = React.PropsWithChildren<{
    height?: number;
    width?: number;
}>;
declare const _componentSize: React.MemoExoticComponent<(props: ISizeProps) => React.FunctionComponentElement<ISizeProps>>;
declare const Size: typeof _componentSize & IElementDescriptor;
type IStripProps = React.PropsWithChildren<{
    color?: string;
    endValue?: Date | number | string;
    label?: Record<string, any> | {
        font?: ChartsFont;
        text?: string;
    };
    startValue?: Date | number | string;
}>;
declare const _componentStrip: React.MemoExoticComponent<(props: IStripProps) => React.FunctionComponentElement<IStripProps>>;
declare const Strip: typeof _componentStrip & IElementDescriptor;
type IStripLabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
    text?: string;
}>;
declare const _componentStripLabel: React.MemoExoticComponent<(props: IStripLabelProps) => React.FunctionComponentElement<IStripLabelProps>>;
declare const StripLabel: typeof _componentStripLabel & IElementDescriptor;
type IStripStyleProps = React.PropsWithChildren<{
    label?: Record<string, any> | {
        font?: ChartsFont;
    };
}>;
declare const _componentStripStyle: React.MemoExoticComponent<(props: IStripStyleProps) => React.FunctionComponentElement<IStripStyleProps>>;
declare const StripStyle: typeof _componentStripStyle & IElementDescriptor;
type IStripStyleLabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
}>;
declare const _componentStripStyleLabel: React.MemoExoticComponent<(props: IStripStyleLabelProps) => React.FunctionComponentElement<IStripStyleLabelProps>>;
declare const StripStyleLabel: typeof _componentStripStyleLabel & IElementDescriptor;
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
    length?: number;
    opacity?: number;
    shift?: number;
    visible?: boolean;
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
    margin?: Record<string, any> | number | {
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
    verticalAlignment?: "bottom" | "top";
    textOverflow?: "ellipsis" | "hide" | "none";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentTitle: React.MemoExoticComponent<(props: ITitleProps) => React.FunctionComponentElement<ITitleProps>>;
declare const Title: typeof _componentTitle & IElementDescriptor;
type ITooltipProps = React.PropsWithChildren<{
    argumentFormat?: LocalizationTypes.Format;
    arrowLength?: number;
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    color?: string;
    container?: any | string;
    contentTemplate?: ((pointInfo: any, element: any) => string | any) | template;
    cornerRadius?: number;
    customizeTooltip?: ((pointInfo: any) => Record<string, any>);
    enabled?: boolean;
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    interactive?: boolean;
    opacity?: number;
    paddingLeftRight?: number;
    paddingTopBottom?: number;
    shadow?: Record<string, any> | {
        blur?: number;
        color?: string;
        offsetX?: number;
        offsetY?: number;
        opacity?: number;
    };
    shared?: boolean;
    zIndex?: number;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
}>;
declare const _componentTooltip: React.MemoExoticComponent<(props: ITooltipProps) => React.FunctionComponentElement<ITooltipProps>>;
declare const Tooltip: typeof _componentTooltip & IElementDescriptor;
type ITooltipBorderProps = React.PropsWithChildren<{
    color?: string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentTooltipBorder: React.MemoExoticComponent<(props: ITooltipBorderProps) => React.FunctionComponentElement<ITooltipBorderProps>>;
declare const TooltipBorder: typeof _componentTooltipBorder & IElementDescriptor;
type IValueAxisProps = React.PropsWithChildren<{
    allowDecimals?: boolean;
    axisDivisionFactor?: number;
    categories?: Array<Date | number | string>;
    color?: string;
    constantLines?: Array<Record<string, any>> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        displayBehindSeries?: boolean;
        extendAxis?: boolean;
        label?: Record<string, any> | {
            font?: ChartsFont;
            text?: string;
            visible?: boolean;
        };
        value?: Date | number | string;
        width?: number;
    }[];
    constantLineStyle?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        label?: Record<string, any> | {
            font?: ChartsFont;
            visible?: boolean;
        };
        width?: number;
    };
    discreteAxisDivisionMode?: "betweenLabels" | "crossLabels";
    endOnTick?: boolean;
    grid?: Record<string, any> | {
        color?: string;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    inverted?: boolean;
    label?: Record<string, any> | {
        customizeHint?: ((axisValue: {
            value: Date | number | string;
            valueText: string;
        }) => string);
        customizeText?: ((axisValue: {
            value: Date | number | string;
            valueText: string;
        }) => string);
        font?: ChartsFont;
        format?: LocalizationTypes.Format;
        indentFromAxis?: number;
        overlappingBehavior?: "hide" | "none";
        visible?: boolean;
    };
    linearThreshold?: number;
    logarithmBase?: number;
    maxValueMargin?: number;
    minorGrid?: Record<string, any> | {
        color?: string;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    minorTick?: Record<string, any> | {
        color?: string;
        length?: number;
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
    minValueMargin?: number;
    minVisualRangeLength?: number | Record<string, any> | "day" | "hour" | "millisecond" | "minute" | "month" | "quarter" | "second" | "week" | "year" | {
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
    opacity?: number;
    showZero?: boolean;
    strips?: Array<Record<string, any>> | {
        color?: string;
        endValue?: Date | number | string;
        label?: Record<string, any> | {
            font?: ChartsFont;
            text?: string;
        };
        startValue?: Date | number | string;
    }[];
    stripStyle?: Record<string, any> | {
        label?: Record<string, any> | {
            font?: ChartsFont;
        };
    };
    tick?: Record<string, any> | {
        color?: string;
        length?: number;
        opacity?: number;
        visible?: boolean;
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
    type?: "continuous" | "discrete" | "logarithmic";
    valueMarginsEnabled?: boolean;
    valueType?: "datetime" | "numeric" | "string";
    visible?: boolean;
    visualRange?: Array<Date | number | string> | CommonChartTypes.VisualRange;
    visualRangeUpdateMode?: "auto" | "keep" | "reset";
    wholeRange?: Array<Date | number | string> | CommonChartTypes.VisualRange;
    width?: number;
    defaultVisualRange?: Array<Date | number | string> | CommonChartTypes.VisualRange;
    onVisualRangeChange?: (value: Array<Date | number | string> | CommonChartTypes.VisualRange) => void;
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
type IVisualRangeProps = React.PropsWithChildren<{
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
declare const _componentVisualRange: React.MemoExoticComponent<(props: IVisualRangeProps) => React.FunctionComponentElement<IVisualRangeProps>>;
declare const VisualRange: typeof _componentVisualRange & IElementDescriptor;
type IWholeRangeProps = React.PropsWithChildren<{
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
declare const _componentWholeRange: React.MemoExoticComponent<(props: IWholeRangeProps) => React.FunctionComponentElement<IWholeRangeProps>>;
declare const WholeRange: typeof _componentWholeRange & IElementDescriptor;
export default PolarChart;
export { PolarChart, IPolarChartOptions, PolarChartRef, AdaptiveLayout, IAdaptiveLayoutProps, Animation, IAnimationProps, Annotation, IAnnotationProps, AnnotationBorder, IAnnotationBorderProps, ArgumentAxis, IArgumentAxisProps, ArgumentAxisMinorTick, IArgumentAxisMinorTickProps, ArgumentAxisTick, IArgumentAxisTickProps, ArgumentFormat, IArgumentFormatProps, AxisLabel, IAxisLabelProps, Border, IBorderProps, Color, IColorProps, CommonAnnotationSettings, ICommonAnnotationSettingsProps, CommonAxisSettings, ICommonAxisSettingsProps, CommonAxisSettingsLabel, ICommonAxisSettingsLabelProps, CommonAxisSettingsMinorTick, ICommonAxisSettingsMinorTickProps, CommonAxisSettingsTick, ICommonAxisSettingsTickProps, CommonSeriesSettings, ICommonSeriesSettingsProps, CommonSeriesSettingsHoverStyle, ICommonSeriesSettingsHoverStyleProps, CommonSeriesSettingsLabel, ICommonSeriesSettingsLabelProps, CommonSeriesSettingsSelectionStyle, ICommonSeriesSettingsSelectionStyleProps, Connector, IConnectorProps, ConstantLine, IConstantLineProps, ConstantLineLabel, IConstantLineLabelProps, ConstantLineStyle, IConstantLineStyleProps, ConstantLineStyleLabel, IConstantLineStyleLabelProps, DataPrepareSettings, IDataPrepareSettingsProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Grid, IGridProps, Hatching, IHatchingProps, HoverStyle, IHoverStyleProps, Image, IImageProps, Label, ILabelProps, Legend, ILegendProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, Length, ILengthProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, MinorGrid, IMinorGridProps, MinorTick, IMinorTickProps, MinorTickInterval, IMinorTickIntervalProps, MinVisualRangeLength, IMinVisualRangeLengthProps, Point, IPointProps, PointBorder, IPointBorderProps, PointHoverStyle, IPointHoverStyleProps, PointSelectionStyle, IPointSelectionStyleProps, PolarChartTitle, IPolarChartTitleProps, PolarChartTitleSubtitle, IPolarChartTitleSubtitleProps, SelectionStyle, ISelectionStyleProps, Series, ISeriesProps, SeriesBorder, ISeriesBorderProps, SeriesTemplate, ISeriesTemplateProps, Shadow, IShadowProps, Size, ISizeProps, Strip, IStripProps, StripLabel, IStripLabelProps, StripStyle, IStripStyleProps, StripStyleLabel, IStripStyleLabelProps, Subtitle, ISubtitleProps, Tick, ITickProps, TickInterval, ITickIntervalProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps, ValueAxis, IValueAxisProps, ValueErrorBar, IValueErrorBarProps, VisualRange, IVisualRangeProps, WholeRange, IWholeRangeProps };
import type * as PolarChartTypes from 'dpt-ui/viz/polar_chart_types';
export { PolarChartTypes };
