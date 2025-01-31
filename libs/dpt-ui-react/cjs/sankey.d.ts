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
import dxSankey, { Properties } from "dpt-ui/viz/sankey";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { DisposingEvent, DrawnEvent, ExportedEvent, ExportingEvent, FileSavingEvent, IncidentOccurredEvent, InitializedEvent, LinkClickEvent, NodeClickEvent, dxSankeyNode } from "dpt-ui/viz/sankey";
import type { Font as ChartsFont } from "dpt-ui/common/charts";
import type { template } from "dpt-ui/core/templates/template";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ISankeyOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onDrawn?: ((e: DrawnEvent) => void);
    onExported?: ((e: ExportedEvent) => void);
    onExporting?: ((e: ExportingEvent) => void);
    onFileSaving?: ((e: FileSavingEvent) => void);
    onIncidentOccurred?: ((e: IncidentOccurredEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onLinkClick?: ((e: LinkClickEvent) => void);
    onNodeClick?: ((e: NodeClickEvent) => void);
};
type ISankeyOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ISankeyOptionsNarrowedEvents> & IHtmlOptions & {
    defaultLoadingIndicator?: Record<string, any>;
    onLoadingIndicatorChange?: (value: Record<string, any>) => void;
}>;
interface SankeyRef {
    instance: () => dxSankey;
}
declare const Sankey: (props: React.PropsWithChildren<ISankeyOptions> & {
    ref?: Ref<SankeyRef>;
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
    opacity?: number;
}>;
declare const _componentBorder: React.MemoExoticComponent<(props: IBorderProps) => React.FunctionComponentElement<IBorderProps>>;
declare const Border: typeof _componentBorder & IElementDescriptor;
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
        visible?: boolean;
        width?: number;
    };
    color?: string;
    hatching?: Record<string, any> | {
        direction?: "left" | "none" | "right";
        opacity?: number;
        step?: number;
        width?: number;
    };
    opacity?: number;
}>;
declare const _componentHoverStyle: React.MemoExoticComponent<(props: IHoverStyleProps) => React.FunctionComponentElement<IHoverStyleProps>>;
declare const HoverStyle: typeof _componentHoverStyle & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    customizeText?: ((itemInfo: dxSankeyNode) => string);
    font?: ChartsFont;
    horizontalOffset?: number;
    overlappingBehavior?: "ellipsis" | "hide" | "none";
    shadow?: Record<string, any> | {
        blur?: number;
        color?: string;
        offsetX?: number;
        offsetY?: number;
        opacity?: number;
    };
    useNodeColors?: boolean;
    verticalOffset?: number;
    visible?: boolean;
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
type ILinkProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    color?: string;
    colorMode?: "none" | "source" | "target" | "gradient";
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        color?: string;
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        opacity?: number;
    };
    opacity?: number;
}>;
declare const _componentLink: React.MemoExoticComponent<(props: ILinkProps) => React.FunctionComponentElement<ILinkProps>>;
declare const Link: typeof _componentLink & IElementDescriptor;
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
type INodeProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        visible?: boolean;
        width?: number;
    };
    color?: string;
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            visible?: boolean;
            width?: number;
        };
        color?: string;
        hatching?: Record<string, any> | {
            direction?: "left" | "none" | "right";
            opacity?: number;
            step?: number;
            width?: number;
        };
        opacity?: number;
    };
    opacity?: number;
    padding?: number;
    width?: number;
}>;
declare const _componentNode: React.MemoExoticComponent<(props: INodeProps) => React.FunctionComponentElement<INodeProps>>;
declare const Node: typeof _componentNode & IElementDescriptor;
type ISankeyborderProps = React.PropsWithChildren<{
    color?: string;
    visible?: boolean;
    width?: number;
}>;
declare const _componentSankeyborder: React.MemoExoticComponent<(props: ISankeyborderProps) => React.FunctionComponentElement<ISankeyborderProps>>;
declare const Sankeyborder: typeof _componentSankeyborder & IElementDescriptor;
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
    cornerRadius?: number;
    customizeLinkTooltip?: ((info: {
        source: string;
        target: string;
        weight: number;
    }) => Record<string, any>);
    customizeNodeTooltip?: ((info: {
        label: string;
        title: string;
        weightIn: number;
        weightOut: number;
    }) => Record<string, any>);
    enabled?: boolean;
    font?: ChartsFont;
    format?: LocalizationTypes.Format;
    linkTooltipTemplate?: ((info: {
        source: string;
        target: string;
        weight: number;
    }, element: any) => string | any) | template;
    nodeTooltipTemplate?: ((info: {
        label: string;
        weightIn: number;
        weightOut: number;
    }, element: any) => string | any) | template;
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
    linkTooltipRender?: (...params: any) => React.ReactNode;
    linkTooltipComponent?: React.ComponentType<any>;
    nodeTooltipRender?: (...params: any) => React.ReactNode;
    nodeTooltipComponent?: React.ComponentType<any>;
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
export default Sankey;
export { Sankey, ISankeyOptions, SankeyRef, AdaptiveLayout, IAdaptiveLayoutProps, Border, IBorderProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Hatching, IHatchingProps, HoverStyle, IHoverStyleProps, Label, ILabelProps, Link, ILinkProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, Node, INodeProps, Sankeyborder, ISankeyborderProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps };
import type * as SankeyTypes from 'dpt-ui/viz/sankey_types';
export { SankeyTypes };
