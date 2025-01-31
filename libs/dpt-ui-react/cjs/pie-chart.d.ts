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
import dxPieChart, { Properties } from "dpt-ui/viz/pie_chart";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { DisposingEvent, DoneEvent, DrawnEvent, ExportedEvent, ExportingEvent, FileSavingEvent, IncidentOccurredEvent, InitializedEvent, LegendClickEvent, PointClickEvent, TooltipHiddenEvent, TooltipShownEvent, dxPieChartAnnotationConfig, dxPieChartCommonAnnotationConfig, PieChartLegendItem, PieChartSeries } from "dpt-ui/viz/pie_chart";
import type { Font as ChartsFont, ChartsColor } from "dpt-ui/common/charts";
import type { template } from "dpt-ui/core/templates/template";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IPieChartOptionsNarrowedEvents = {
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
    onTooltipHidden?: ((e: TooltipHiddenEvent) => void);
    onTooltipShown?: ((e: TooltipShownEvent) => void);
};
type IPieChartOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IPieChartOptionsNarrowedEvents> & IHtmlOptions & {
    centerRender?: (...params: any) => React.ReactNode;
    centerComponent?: React.ComponentType<any>;
    defaultLoadingIndicator?: Record<string, any>;
    onLoadingIndicatorChange?: (value: Record<string, any>) => void;
}>;
interface PieChartRef {
    instance: () => dxPieChart;
}
declare const PieChart: (props: React.PropsWithChildren<IPieChartOptions> & {
    ref?: Ref<PieChartRef>;
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
    customizeTooltip?: ((annotation: dxPieChartAnnotationConfig | any) => Record<string, any>);
    data?: any;
    description?: string;
    font?: ChartsFont;
    height?: number;
    image?: Record<string, any> | string | {
        height?: number;
        url?: string;
        width?: number;
    };
    location?: "center" | "edge";
    name?: string;
    offsetX?: number;
    offsetY?: number;
    opacity?: number;
    paddingLeftRight?: number;
    paddingTopBottom?: number;
    series?: string;
    shadow?: Record<string, any> | {
        blur?: number;
        color?: string;
        offsetX?: number;
        offsetY?: number;
        opacity?: number;
    };
    template?: ((annotation: dxPieChartCommonAnnotationConfig | any, element: any) => string | any) | template;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    tooltipEnabled?: boolean;
    tooltipTemplate?: ((annotation: dxPieChartAnnotationConfig | any, element: any) => string | any) | template;
    type?: "text" | "image" | "custom";
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
    customizeTooltip?: ((annotation: dxPieChartAnnotationConfig | any) => Record<string, any>);
    data?: any;
    description?: string;
    font?: ChartsFont;
    height?: number;
    image?: Record<string, any> | string | {
        height?: number;
        url?: string;
        width?: number;
    };
    location?: "center" | "edge";
    offsetX?: number;
    offsetY?: number;
    opacity?: number;
    paddingLeftRight?: number;
    paddingTopBottom?: number;
    series?: string;
    shadow?: Record<string, any> | {
        blur?: number;
        color?: string;
        offsetX?: number;
        offsetY?: number;
        opacity?: number;
    };
    template?: ((annotation: dxPieChartCommonAnnotationConfig | any, element: any) => string | any) | template;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    tooltipEnabled?: boolean;
    tooltipTemplate?: ((annotation: dxPieChartAnnotationConfig | any, element: any) => string | any) | template;
    type?: "text" | "image" | "custom";
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
type ICommonSeriesSettingsProps = React.PropsWithChildren<{
    argumentField?: string;
    argumentType?: "datetime" | "numeric" | "string";
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    hoverMode?: "none" | "onlyPoint";
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        highlight?: boolean;
    };
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
        position?: "columns" | "inside" | "outside";
        radialOffset?: number;
        rotationAngle?: number;
        textOverflow?: "ellipsis" | "hide" | "none";
        visible?: boolean;
        wordWrap?: "normal" | "breakWord" | "none";
    };
    maxLabelCount?: number;
    minSegmentSize?: number;
    selectionMode?: "none" | "onlyPoint";
    selectionStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        highlight?: boolean;
    };
    smallValuesGrouping?: Record<string, any> | {
        groupName?: string;
        mode?: "none" | "smallValueThreshold" | "topN";
        threshold?: number;
        topCount?: number;
    };
    tagField?: string;
    valueField?: string;
}>;
declare const _componentCommonSeriesSettings: React.MemoExoticComponent<(props: ICommonSeriesSettingsProps) => React.FunctionComponentElement<ICommonSeriesSettingsProps>>;
declare const CommonSeriesSettings: typeof _componentCommonSeriesSettings & IElementDescriptor;
type IConnectorProps = React.PropsWithChildren<{
    color?: string;
    visible?: boolean;
    width?: number;
}>;
declare const _componentConnector: React.MemoExoticComponent<(props: IConnectorProps) => React.FunctionComponentElement<IConnectorProps>>;
declare const Connector: typeof _componentConnector & IElementDescriptor;
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
type IHoverStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
    highlight?: boolean;
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
    position?: "columns" | "inside" | "outside";
    radialOffset?: number;
    rotationAngle?: number;
    textOverflow?: "ellipsis" | "hide" | "none";
    visible?: boolean;
    wordWrap?: "normal" | "breakWord" | "none";
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
    customizeHint?: ((pointInfo: {
        pointColor: string;
        pointIndex: number;
        pointName: any;
    }) => string);
    customizeItems?: ((items: Array<PieChartLegendItem>) => Array<PieChartLegendItem>);
    customizeText?: ((pointInfo: {
        pointColor: string;
        pointIndex: number;
        pointName: any;
    }) => string);
    font?: ChartsFont;
    horizontalAlignment?: "center" | "left" | "right";
    hoverMode?: "none" | "allArgumentPoints";
    itemsAlignment?: "center" | "left" | "right";
    itemTextPosition?: "bottom" | "left" | "right" | "top";
    margin?: number | Record<string, any> | {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    };
    markerSize?: number;
    markerTemplate?: ((legendItem: PieChartLegendItem, element: any) => string | any) | template;
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
type IPieChartTitleProps = React.PropsWithChildren<{
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
declare const _componentPieChartTitle: React.MemoExoticComponent<(props: IPieChartTitleProps) => React.FunctionComponentElement<IPieChartTitleProps>>;
declare const PieChartTitle: typeof _componentPieChartTitle & IElementDescriptor;
type IPieChartTitleSubtitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    offset?: number;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentPieChartTitleSubtitle: React.MemoExoticComponent<(props: IPieChartTitleSubtitleProps) => React.FunctionComponentElement<IPieChartTitleSubtitleProps>>;
declare const PieChartTitleSubtitle: typeof _componentPieChartTitleSubtitle & IElementDescriptor;
type ISelectionStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
    highlight?: boolean;
}>;
declare const _componentSelectionStyle: React.MemoExoticComponent<(props: ISelectionStyleProps) => React.FunctionComponentElement<ISelectionStyleProps>>;
declare const SelectionStyle: typeof _componentSelectionStyle & IElementDescriptor;
type ISeriesProps = React.PropsWithChildren<{
    argumentField?: string;
    argumentType?: "datetime" | "numeric" | "string";
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    color?: ChartsColor | string;
    hoverMode?: "none" | "onlyPoint";
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        highlight?: boolean;
    };
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
        position?: "columns" | "inside" | "outside";
        radialOffset?: number;
        rotationAngle?: number;
        textOverflow?: "ellipsis" | "hide" | "none";
        visible?: boolean;
        wordWrap?: "normal" | "breakWord" | "none";
    };
    maxLabelCount?: number;
    minSegmentSize?: number;
    name?: string;
    selectionMode?: "none" | "onlyPoint";
    selectionStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            dashStyle?: "dash" | "dot" | "longDash" | "solid";
            visible?: boolean;
            width?: number;
        };
        color?: ChartsColor | string;
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        highlight?: boolean;
    };
    smallValuesGrouping?: Record<string, any> | {
        groupName?: string;
        mode?: "none" | "smallValueThreshold" | "topN";
        threshold?: number;
        topCount?: number;
    };
    tag?: any;
    tagField?: string;
    valueField?: string;
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
    customizeSeries?: ((seriesName: any) => PieChartSeries);
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
type ISmallValuesGroupingProps = React.PropsWithChildren<{
    groupName?: string;
    mode?: "none" | "smallValueThreshold" | "topN";
    threshold?: number;
    topCount?: number;
}>;
declare const _componentSmallValuesGrouping: React.MemoExoticComponent<(props: ISmallValuesGroupingProps) => React.FunctionComponentElement<ISmallValuesGroupingProps>>;
declare const SmallValuesGrouping: typeof _componentSmallValuesGrouping & IElementDescriptor;
type ISubtitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    offset?: number;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentSubtitle: React.MemoExoticComponent<(props: ISubtitleProps) => React.FunctionComponentElement<ISubtitleProps>>;
declare const Subtitle: typeof _componentSubtitle & IElementDescriptor;
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
export default PieChart;
export { PieChart, IPieChartOptions, PieChartRef, AdaptiveLayout, IAdaptiveLayoutProps, Animation, IAnimationProps, Annotation, IAnnotationProps, AnnotationBorder, IAnnotationBorderProps, ArgumentFormat, IArgumentFormatProps, Border, IBorderProps, Color, IColorProps, CommonAnnotationSettings, ICommonAnnotationSettingsProps, CommonSeriesSettings, ICommonSeriesSettingsProps, Connector, IConnectorProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Hatching, IHatchingProps, HoverStyle, IHoverStyleProps, Image, IImageProps, Label, ILabelProps, Legend, ILegendProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, PieChartTitle, IPieChartTitleProps, PieChartTitleSubtitle, IPieChartTitleSubtitleProps, SelectionStyle, ISelectionStyleProps, Series, ISeriesProps, SeriesBorder, ISeriesBorderProps, SeriesTemplate, ISeriesTemplateProps, Shadow, IShadowProps, Size, ISizeProps, SmallValuesGrouping, ISmallValuesGroupingProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps };
import type * as PieChartTypes from 'dpt-ui/viz/pie_chart_types';
export { PieChartTypes };
