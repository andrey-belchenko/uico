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
import dxFunnel, { Properties } from "dpt-ui/viz/funnel";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { DisposingEvent, DrawnEvent, ExportedEvent, ExportingEvent, FileSavingEvent, IncidentOccurredEvent, InitializedEvent, ItemClickEvent, LegendClickEvent, dxFunnelItem, FunnelLegendItem } from "dpt-ui/viz/funnel";
import type { Font as ChartsFont } from "dpt-ui/common/charts";
import type { template } from "dpt-ui/core/templates/template";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IFunnelOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onDrawn?: ((e: DrawnEvent) => void);
    onExported?: ((e: ExportedEvent) => void);
    onExporting?: ((e: ExportingEvent) => void);
    onFileSaving?: ((e: FileSavingEvent) => void);
    onIncidentOccurred?: ((e: IncidentOccurredEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onItemClick?: ((e: ItemClickEvent) => void);
    onLegendClick?: ((e: LegendClickEvent) => void);
};
type IFunnelOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IFunnelOptionsNarrowedEvents> & IHtmlOptions & {
    defaultLoadingIndicator?: Record<string, any>;
    onLoadingIndicatorChange?: (value: Record<string, any>) => void;
}>;
interface FunnelRef {
    instance: () => dxFunnel;
}
declare const Funnel: (props: React.PropsWithChildren<IFunnelOptions> & {
    ref?: Ref<FunnelRef>;
}) => ReactElement | null;
type IAdaptiveLayoutProps = React.PropsWithChildren<{
    height?: number;
    keepLabels?: boolean;
    width?: number;
}>;
declare const _componentAdaptiveLayout: React.MemoExoticComponent<(props: IAdaptiveLayoutProps) => React.FunctionComponentElement<IAdaptiveLayoutProps>>;
declare const AdaptiveLayout: typeof _componentAdaptiveLayout & IElementDescriptor;
type IBorderProps = React.PropsWithChildren<{
    color?: string;
    visible?: boolean;
    width?: number;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    cornerRadius?: number;
    opacity?: number;
}>;
declare const _componentBorder: React.MemoExoticComponent<(props: IBorderProps) => React.FunctionComponentElement<IBorderProps>>;
declare const Border: typeof _componentBorder & IElementDescriptor;
type IConnectorProps = React.PropsWithChildren<{
    color?: string;
    opacity?: number;
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
type IFunnelTitleProps = React.PropsWithChildren<{
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
declare const _componentFunnelTitle: React.MemoExoticComponent<(props: IFunnelTitleProps) => React.FunctionComponentElement<IFunnelTitleProps>>;
declare const FunnelTitle: typeof _componentFunnelTitle & IElementDescriptor;
type IFunnelTitleSubtitleProps = React.PropsWithChildren<{
    font?: ChartsFont;
    offset?: number;
    text?: string;
    textOverflow?: "ellipsis" | "hide" | "none";
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentFunnelTitleSubtitle: React.MemoExoticComponent<(props: IFunnelTitleSubtitleProps) => React.FunctionComponentElement<IFunnelTitleSubtitleProps>>;
declare const FunnelTitleSubtitle: typeof _componentFunnelTitleSubtitle & IElementDescriptor;
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
        visible?: boolean;
        width?: number;
    };
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
}>;
declare const _componentHoverStyle: React.MemoExoticComponent<(props: IHoverStyleProps) => React.FunctionComponentElement<IHoverStyleProps>>;
declare const HoverStyle: typeof _componentHoverStyle & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
    };
    selectionStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
    };
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
type IItemBorderProps = React.PropsWithChildren<{
    color?: string;
    visible?: boolean;
    width?: number;
}>;
declare const _componentItemBorder: React.MemoExoticComponent<(props: IItemBorderProps) => React.FunctionComponentElement<IItemBorderProps>>;
declare const ItemBorder: typeof _componentItemBorder & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    backgroundColor?: string;
    border?: Record<string, any> | {
        color?: string;
        dashStyle?: "dash" | "dot" | "longDash" | "solid";
        visible?: boolean;
        width?: number;
    };
    connector?: Record<string, any> | {
        color?: string;
        opacity?: number;
        visible?: boolean;
        width?: number;
    };
    customizeText?: ((itemInfo: {
        item: dxFunnelItem;
        percent: number;
        percentText: string;
        value: number;
        valueText: string;
    }) => string);
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    horizontalAlignment?: "left" | "right";
    horizontalOffset?: number;
    position?: "columns" | "inside" | "outside";
    showForZeroValues?: boolean;
    textOverflow?: "ellipsis" | "hide" | "none";
    visible?: boolean;
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
type ILabelBorderProps = React.PropsWithChildren<{
    color?: string;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    visible?: boolean;
    width?: number;
}>;
declare const _componentLabelBorder: React.MemoExoticComponent<(props: ILabelBorderProps) => React.FunctionComponentElement<ILabelBorderProps>>;
declare const LabelBorder: typeof _componentLabelBorder & IElementDescriptor;
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
        item: dxFunnelItem;
        text: string;
    }) => string);
    customizeItems?: ((items: Array<FunnelLegendItem>) => Array<FunnelLegendItem>);
    customizeText?: ((itemInfo: {
        item: dxFunnelItem;
        text: string;
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
    markerSize?: number;
    markerTemplate?: ((legendItem: FunnelLegendItem, element: any) => string | any) | template;
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
type ILegendBorderProps = React.PropsWithChildren<{
    color?: string;
    cornerRadius?: number;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    opacity?: number;
    visible?: boolean;
    width?: number;
}>;
declare const _componentLegendBorder: React.MemoExoticComponent<(props: ILegendBorderProps) => React.FunctionComponentElement<ILegendBorderProps>>;
declare const LegendBorder: typeof _componentLegendBorder & IElementDescriptor;
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
type ISelectionStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
}>;
declare const _componentSelectionStyle: React.MemoExoticComponent<(props: ISelectionStyleProps) => React.FunctionComponentElement<ISelectionStyleProps>>;
declare const SelectionStyle: typeof _componentSelectionStyle & IElementDescriptor;
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
    contentTemplate?: ((info: {
        item: dxFunnelItem;
        percent: number;
        percentText: string;
        value: number;
        valueText: string;
    }, element: any) => string | any) | template;
    cornerRadius?: number;
    customizeTooltip?: ((info: {
        item: dxFunnelItem;
        percent: number;
        percentText: string;
        value: number;
        valueText: string;
    }) => Record<string, any>);
    enabled?: boolean;
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
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
export default Funnel;
export { Funnel, IFunnelOptions, FunnelRef, AdaptiveLayout, IAdaptiveLayoutProps, Border, IBorderProps, Connector, IConnectorProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, FunnelTitle, IFunnelTitleProps, FunnelTitleSubtitle, IFunnelTitleSubtitleProps, Hatching, IHatchingProps, HoverStyle, IHoverStyleProps, Item, IItemProps, ItemBorder, IItemBorderProps, Label, ILabelProps, LabelBorder, ILabelBorderProps, Legend, ILegendProps, LegendBorder, ILegendBorderProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, SelectionStyle, ISelectionStyleProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps };
import type * as FunnelTypes from 'dpt-ui/viz/funnel_types';
export { FunnelTypes };
