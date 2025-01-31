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
import dxCircularGauge, { Properties } from "dpt-ui/viz/circular_gauge";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { DisposingEvent, DrawnEvent, ExportedEvent, ExportingEvent, FileSavingEvent, IncidentOccurredEvent, InitializedEvent, TooltipHiddenEvent, TooltipShownEvent } from "dpt-ui/viz/circular_gauge";
import type { Font as ChartsFont, ChartsColor } from "dpt-ui/common/charts";
import type { template } from "dpt-ui/core/templates/template";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ICircularGaugeOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onDrawn?: ((e: DrawnEvent) => void);
    onExported?: ((e: ExportedEvent) => void);
    onExporting?: ((e: ExportingEvent) => void);
    onFileSaving?: ((e: FileSavingEvent) => void);
    onIncidentOccurred?: ((e: IncidentOccurredEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onTooltipHidden?: ((e: TooltipHiddenEvent) => void);
    onTooltipShown?: ((e: TooltipShownEvent) => void);
};
type ICircularGaugeOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ICircularGaugeOptionsNarrowedEvents> & IHtmlOptions & {
    centerRender?: (...params: any) => React.ReactNode;
    centerComponent?: React.ComponentType<any>;
    defaultLoadingIndicator?: Record<string, any>;
    defaultSubvalues?: Array<number>;
    defaultValue?: number;
    onLoadingIndicatorChange?: (value: Record<string, any>) => void;
    onSubvaluesChange?: (value: Array<number>) => void;
    onValueChange?: (value: number) => void;
}>;
interface CircularGaugeRef {
    instance: () => dxCircularGauge;
}
declare const CircularGauge: (props: React.PropsWithChildren<ICircularGaugeOptions> & {
    ref?: Ref<CircularGaugeRef>;
}) => ReactElement | null;
type IAnimationProps = React.PropsWithChildren<{
    duration?: number;
    easing?: "easeOutCubic" | "linear";
    enabled?: boolean;
}>;
declare const _componentAnimation: React.MemoExoticComponent<(props: IAnimationProps) => React.FunctionComponentElement<IAnimationProps>>;
declare const Animation: typeof _componentAnimation & IElementDescriptor;
type IBackgroundColorProps = React.PropsWithChildren<{
    base?: string;
    fillId?: string;
}>;
declare const _componentBackgroundColor: React.MemoExoticComponent<(props: IBackgroundColorProps) => React.FunctionComponentElement<IBackgroundColorProps>>;
declare const BackgroundColor: typeof _componentBackgroundColor & IElementDescriptor;
type IBorderProps = React.PropsWithChildren<{
    color?: string;
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
type IGeometryProps = React.PropsWithChildren<{
    endAngle?: number;
    startAngle?: number;
}>;
declare const _componentGeometry: React.MemoExoticComponent<(props: IGeometryProps) => React.FunctionComponentElement<IGeometryProps>>;
declare const Geometry: typeof _componentGeometry & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    customizeText?: ((scaleValue: {
        value: number;
        valueText: string;
    }) => string);
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    hideFirstOrLast?: "first" | "last";
    indentFromTick?: number;
    overlappingBehavior?: "hide" | "none";
    useRangeColors?: boolean;
    visible?: boolean;
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
type ILoadingIndicatorProps = React.PropsWithChildren<{
    backgroundColor?: string;
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
type IMinorTickProps = React.PropsWithChildren<{
    color?: string;
    length?: number;
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentMinorTick: React.MemoExoticComponent<(props: IMinorTickProps) => React.FunctionComponentElement<IMinorTickProps>>;
declare const MinorTick: typeof _componentMinorTick & IElementDescriptor;
type IRangeProps = React.PropsWithChildren<{
    color?: ChartsColor | string;
    endValue?: number;
    startValue?: number;
}>;
declare const _componentRange: React.MemoExoticComponent<(props: IRangeProps) => React.FunctionComponentElement<IRangeProps>>;
declare const Range: typeof _componentRange & IElementDescriptor;
type IRangeContainerProps = React.PropsWithChildren<{
    backgroundColor?: ChartsColor | string;
    offset?: number;
    orientation?: "center" | "inside" | "outside";
    palette?: Array<string> | "Bright" | "Harmony Light" | "Ocean" | "Pastel" | "Soft" | "Soft Pastel" | "Vintage" | "Violet" | "Carmine" | "Dark Moon" | "Dark Violet" | "Green Mist" | "Soft Blue" | "Material" | "Office";
    paletteExtensionMode?: "alternate" | "blend" | "extrapolate";
    ranges?: Array<Record<string, any>> | {
        color?: ChartsColor | string;
        endValue?: number;
        startValue?: number;
    }[];
    width?: number;
}>;
declare const _componentRangeContainer: React.MemoExoticComponent<(props: IRangeContainerProps) => React.FunctionComponentElement<IRangeContainerProps>>;
declare const RangeContainer: typeof _componentRangeContainer & IElementDescriptor;
type IScaleProps = React.PropsWithChildren<{
    allowDecimals?: boolean;
    customMinorTicks?: Array<number>;
    customTicks?: Array<number>;
    endValue?: number;
    label?: Record<string, any> | {
        customizeText?: ((scaleValue: {
            value: number;
            valueText: string;
        }) => string);
        font?: ChartsFont;
        format?: LocalizationTypes.Format;
        hideFirstOrLast?: "first" | "last";
        indentFromTick?: number;
        overlappingBehavior?: "hide" | "none";
        useRangeColors?: boolean;
        visible?: boolean;
    };
    minorTick?: Record<string, any> | {
        color?: string;
        length?: number;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    minorTickInterval?: number;
    orientation?: "center" | "inside" | "outside";
    scaleDivisionFactor?: number;
    startValue?: number;
    tick?: Record<string, any> | {
        color?: string;
        length?: number;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    tickInterval?: number;
}>;
declare const _componentScale: React.MemoExoticComponent<(props: IScaleProps) => React.FunctionComponentElement<IScaleProps>>;
declare const Scale: typeof _componentScale & IElementDescriptor;
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
type ISubtitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    offset?: number;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentSubtitle: React.MemoExoticComponent<(props: ISubtitleProps) => React.FunctionComponentElement<ISubtitleProps>>;
declare const Subtitle: typeof _componentSubtitle & IElementDescriptor;
type ISubvalueIndicatorProps = React.PropsWithChildren<{
    arrowLength?: number;
    backgroundColor?: string;
    baseValue?: number;
    beginAdaptingAtRadius?: number;
    color?: ChartsColor | string;
    horizontalOrientation?: "left" | "right";
    indentFromCenter?: number;
    length?: number;
    offset?: number;
    palette?: Array<string> | "Bright" | "Harmony Light" | "Ocean" | "Pastel" | "Soft" | "Soft Pastel" | "Vintage" | "Violet" | "Carmine" | "Dark Moon" | "Dark Violet" | "Green Mist" | "Soft Blue" | "Material" | "Office";
    secondColor?: string;
    secondFraction?: number;
    size?: number;
    spindleGapSize?: number;
    spindleSize?: number;
    text?: Record<string, any> | {
        customizeText?: ((indicatedValue: {
            value: number;
            valueText: string;
        }) => string);
        font?: ChartsFont;
        format?: LocalizationTypes.Format;
        indent?: number;
    };
    type?: "circle" | "rangeBar" | "rectangle" | "rectangleNeedle" | "rhombus" | "textCloud" | "triangleMarker" | "triangleNeedle" | "twoColorNeedle";
    verticalOrientation?: "bottom" | "top";
    width?: number;
}>;
declare const _componentSubvalueIndicator: React.MemoExoticComponent<(props: ISubvalueIndicatorProps) => React.FunctionComponentElement<ISubvalueIndicatorProps>>;
declare const SubvalueIndicator: typeof _componentSubvalueIndicator & IElementDescriptor;
type ITextProps = React.PropsWithChildren<{
    customizeText?: ((indicatedValue: {
        value: number;
        valueText: string;
    }) => string);
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    indent?: number;
}>;
declare const _componentText: React.MemoExoticComponent<(props: ITextProps) => React.FunctionComponentElement<ITextProps>>;
declare const Text: typeof _componentText & IElementDescriptor;
type ITickProps = React.PropsWithChildren<{
    color?: string;
    length?: number;
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentTick: React.MemoExoticComponent<(props: ITickProps) => React.FunctionComponentElement<ITickProps>>;
declare const Tick: typeof _componentTick & IElementDescriptor;
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
type ITooltipProps = React.PropsWithChildren<{
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
    contentTemplate?: ((scaleValue: {
        value: number;
        valueText: string;
    }, element: any) => string | any) | template;
    cornerRadius?: number;
    customizeTooltip?: ((scaleValue: {
        value: number;
        valueText: string;
    }) => Record<string, any>);
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
    zIndex?: number;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
}>;
declare const _componentTooltip: React.MemoExoticComponent<(props: ITooltipProps) => React.FunctionComponentElement<ITooltipProps>>;
declare const Tooltip: typeof _componentTooltip & IElementDescriptor;
type IValueIndicatorProps = React.PropsWithChildren<{
    arrowLength?: number;
    backgroundColor?: string;
    baseValue?: number;
    beginAdaptingAtRadius?: number;
    color?: ChartsColor | string;
    horizontalOrientation?: "left" | "right";
    indentFromCenter?: number;
    length?: number;
    offset?: number;
    palette?: Array<string> | "Bright" | "Harmony Light" | "Ocean" | "Pastel" | "Soft" | "Soft Pastel" | "Vintage" | "Violet" | "Carmine" | "Dark Moon" | "Dark Violet" | "Green Mist" | "Soft Blue" | "Material" | "Office";
    secondColor?: string;
    secondFraction?: number;
    size?: number;
    spindleGapSize?: number;
    spindleSize?: number;
    text?: Record<string, any> | {
        customizeText?: ((indicatedValue: {
            value: number;
            valueText: string;
        }) => string);
        font?: ChartsFont;
        format?: LocalizationTypes.Format;
        indent?: number;
    };
    type?: "circle" | "rangeBar" | "rectangle" | "rectangleNeedle" | "rhombus" | "textCloud" | "triangleMarker" | "triangleNeedle" | "twoColorNeedle";
    verticalOrientation?: "bottom" | "top";
    width?: number;
}>;
declare const _componentValueIndicator: React.MemoExoticComponent<(props: IValueIndicatorProps) => React.FunctionComponentElement<IValueIndicatorProps>>;
declare const ValueIndicator: typeof _componentValueIndicator & IElementDescriptor;
export default CircularGauge;
export { CircularGauge, ICircularGaugeOptions, CircularGaugeRef, Animation, IAnimationProps, BackgroundColor, IBackgroundColorProps, Border, IBorderProps, Color, IColorProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Geometry, IGeometryProps, Label, ILabelProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, MinorTick, IMinorTickProps, Range, IRangeProps, RangeContainer, IRangeContainerProps, Scale, IScaleProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, SubvalueIndicator, ISubvalueIndicatorProps, Text, ITextProps, Tick, ITickProps, Title, ITitleProps, Tooltip, ITooltipProps, ValueIndicator, IValueIndicatorProps };
import type * as CircularGaugeTypes from 'dpt-ui/viz/circular_gauge_types';
export { CircularGaugeTypes };
