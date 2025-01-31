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
import dxVectorMap, { Properties } from "dpt-ui/viz/vector_map";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ClickEvent, DisposingEvent, DrawnEvent, ExportedEvent, ExportingEvent, FileSavingEvent, IncidentOccurredEvent, InitializedEvent, TooltipHiddenEvent, TooltipShownEvent, dxVectorMapAnnotationConfig, MapLayerElement, VectorMapLegendItem } from "dpt-ui/viz/vector_map";
import type { Font as ChartsFont } from "dpt-ui/common/charts";
import type { template } from "dpt-ui/core/templates/template";
import type { DataSourceOptions } from "dpt-ui/data/data_source";
import type { Store } from "dpt-ui/data/store";
import type DataSource from "dpt-ui/data/data_source";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IVectorMapOptionsNarrowedEvents = {
    onClick?: ((e: ClickEvent) => void);
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
type IVectorMapOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IVectorMapOptionsNarrowedEvents> & IHtmlOptions & {
    defaultLoadingIndicator?: Record<string, any>;
    onLoadingIndicatorChange?: (value: Record<string, any>) => void;
}>;
interface VectorMapRef {
    instance: () => dxVectorMap;
}
declare const VectorMap: (props: React.PropsWithChildren<IVectorMapOptions> & {
    ref?: Ref<VectorMapRef>;
}) => ReactElement | null;
type IAnnotationProps = React.PropsWithChildren<{
    allowDragging?: boolean;
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
    coordinates?: Array<number>;
    customizeTooltip?: ((annotation: dxVectorMapAnnotationConfig | any) => Record<string, any>);
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
    shadow?: Record<string, any> | {
        blur?: number;
        color?: string;
        offsetX?: number;
        offsetY?: number;
        opacity?: number;
    };
    template?: ((annotation: dxVectorMapAnnotationConfig | any, element: any) => string | any) | template;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    tooltipEnabled?: boolean;
    tooltipTemplate?: ((annotation: dxVectorMapAnnotationConfig | any, element: any) => string | any) | template;
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
type IBackgroundProps = React.PropsWithChildren<{
    borderColor?: string;
    color?: string;
}>;
declare const _componentBackground: React.MemoExoticComponent<(props: IBackgroundProps) => React.FunctionComponentElement<IBackgroundProps>>;
declare const Background: typeof _componentBackground & IElementDescriptor;
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
type ICommonAnnotationSettingsProps = React.PropsWithChildren<{
    allowDragging?: boolean;
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
    coordinates?: Array<number>;
    customizeTooltip?: ((annotation: dxVectorMapAnnotationConfig | any) => Record<string, any>);
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
    shadow?: Record<string, any> | {
        blur?: number;
        color?: string;
        offsetX?: number;
        offsetY?: number;
        opacity?: number;
    };
    template?: ((annotation: dxVectorMapAnnotationConfig | any, element: any) => string | any) | template;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    tooltipEnabled?: boolean;
    tooltipTemplate?: ((annotation: dxVectorMapAnnotationConfig | any, element: any) => string | any) | template;
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
type IControlBarProps = React.PropsWithChildren<{
    borderColor?: string;
    color?: string;
    enabled?: boolean;
    horizontalAlignment?: "center" | "left" | "right";
    margin?: number;
    opacity?: number;
    panVisible?: boolean;
    verticalAlignment?: "bottom" | "top";
    zoomVisible?: boolean;
}>;
declare const _componentControlBar: React.MemoExoticComponent<(props: IControlBarProps) => React.FunctionComponentElement<IControlBarProps>>;
declare const ControlBar: typeof _componentControlBar & IElementDescriptor;
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
type IImageProps = React.PropsWithChildren<{
    height?: number;
    url?: string;
    width?: number;
}>;
declare const _componentImage: React.MemoExoticComponent<(props: IImageProps) => React.FunctionComponentElement<IImageProps>>;
declare const Image: typeof _componentImage & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    dataField?: string;
    enabled?: boolean;
    font?: ChartsFont;
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
type ILayerProps = React.PropsWithChildren<{
    borderColor?: string;
    borderWidth?: number;
    color?: string;
    colorGroupingField?: string;
    colorGroups?: Array<number>;
    customize?: ((elements: Array<MapLayerElement>) => void);
    dataField?: string;
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Record<string, any> | Store | string;
    elementType?: "bubble" | "dot" | "image" | "pie";
    hoveredBorderColor?: string;
    hoveredBorderWidth?: number;
    hoveredColor?: string;
    hoverEnabled?: boolean;
    label?: Record<string, any> | {
        dataField?: string;
        enabled?: boolean;
        font?: ChartsFont;
    };
    maxSize?: number;
    minSize?: number;
    name?: string;
    opacity?: number;
    palette?: Array<string> | "Bright" | "Harmony Light" | "Ocean" | "Pastel" | "Soft" | "Soft Pastel" | "Vintage" | "Violet" | "Carmine" | "Dark Moon" | "Dark Violet" | "Green Mist" | "Soft Blue" | "Material" | "Office";
    paletteIndex?: number;
    paletteSize?: number;
    selectedBorderColor?: string;
    selectedBorderWidth?: number;
    selectedColor?: string;
    selectionMode?: "single" | "multiple" | "none";
    size?: number;
    sizeGroupingField?: string;
    sizeGroups?: Array<number>;
    type?: "area" | "line" | "marker";
}>;
declare const _componentLayer: React.MemoExoticComponent<(props: ILayerProps) => React.FunctionComponentElement<ILayerProps>>;
declare const Layer: typeof _componentLayer & IElementDescriptor;
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
    customizeHint?: ((itemInfo: {
        color: string;
        end: number;
        index: number;
        size: number;
        start: number;
    }) => string);
    customizeItems?: ((items: Array<VectorMapLegendItem>) => Array<VectorMapLegendItem>);
    customizeText?: ((itemInfo: {
        color: string;
        end: number;
        index: number;
        size: number;
        start: number;
    }) => string);
    font?: ChartsFont;
    horizontalAlignment?: "center" | "left" | "right";
    itemsAlignment?: "center" | "left" | "right";
    itemTextPosition?: "bottom" | "left" | "right" | "top";
    margin?: number | Record<string, any> | {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    };
    markerColor?: string;
    markerShape?: "circle" | "square";
    markerSize?: number;
    markerTemplate?: ((legendItem: VectorMapLegendItem, element: any) => string | any) | template;
    orientation?: "horizontal" | "vertical";
    paddingLeftRight?: number;
    paddingTopBottom?: number;
    rowCount?: number;
    rowItemSpacing?: number;
    source?: Record<string, any> | {
        grouping?: string;
        layer?: string;
    };
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
type IProjectionProps = React.PropsWithChildren<{
    aspectRatio?: number;
    from?: ((coordinates: Array<number>) => Array<number>);
    to?: ((coordinates: Array<number>) => Array<number>);
}>;
declare const _componentProjection: React.MemoExoticComponent<(props: IProjectionProps) => React.FunctionComponentElement<IProjectionProps>>;
declare const Projection: typeof _componentProjection & IElementDescriptor;
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
type ISourceProps = React.PropsWithChildren<{
    grouping?: string;
    layer?: string;
}>;
declare const _componentSource: React.MemoExoticComponent<(props: ISourceProps) => React.FunctionComponentElement<ISourceProps>>;
declare const Source: typeof _componentSource & IElementDescriptor;
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
    contentTemplate?: ((info: MapLayerElement, element: any) => string | any) | template;
    cornerRadius?: number;
    customizeTooltip?: ((info: MapLayerElement) => Record<string, any>);
    enabled?: boolean;
    font?: ChartsFont;
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
type ITooltipBorderProps = React.PropsWithChildren<{
    color?: string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentTooltipBorder: React.MemoExoticComponent<(props: ITooltipBorderProps) => React.FunctionComponentElement<ITooltipBorderProps>>;
declare const TooltipBorder: typeof _componentTooltipBorder & IElementDescriptor;
type IVectorMapTitleProps = React.PropsWithChildren<{
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
declare const _componentVectorMapTitle: React.MemoExoticComponent<(props: IVectorMapTitleProps) => React.FunctionComponentElement<IVectorMapTitleProps>>;
declare const VectorMapTitle: typeof _componentVectorMapTitle & IElementDescriptor;
type IVectorMapTitleSubtitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    offset?: number;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentVectorMapTitleSubtitle: React.MemoExoticComponent<(props: IVectorMapTitleSubtitleProps) => React.FunctionComponentElement<IVectorMapTitleSubtitleProps>>;
declare const VectorMapTitleSubtitle: typeof _componentVectorMapTitleSubtitle & IElementDescriptor;
export default VectorMap;
export { VectorMap, IVectorMapOptions, VectorMapRef, Annotation, IAnnotationProps, AnnotationBorder, IAnnotationBorderProps, Background, IBackgroundProps, Border, IBorderProps, CommonAnnotationSettings, ICommonAnnotationSettingsProps, ControlBar, IControlBarProps, Export, IExportProps, Font, IFontProps, Image, IImageProps, Label, ILabelProps, Layer, ILayerProps, Legend, ILegendProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, Projection, IProjectionProps, Shadow, IShadowProps, Size, ISizeProps, Source, ISourceProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps, VectorMapTitle, IVectorMapTitleProps, VectorMapTitleSubtitle, IVectorMapTitleSubtitleProps };
import type * as VectorMapTypes from 'dpt-ui/viz/vector_map_types';
export { VectorMapTypes };
