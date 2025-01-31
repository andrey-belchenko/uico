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
import dxTreeMap, { Properties } from "dpt-ui/viz/tree_map";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ClickEvent, DisposingEvent, DrawnEvent, DrillEvent, ExportedEvent, ExportingEvent, FileSavingEvent, IncidentOccurredEvent, InitializedEvent, NodesInitializedEvent, NodesRenderingEvent, dxTreeMapNode } from "dpt-ui/viz/tree_map";
import type { Font as ChartsFont } from "dpt-ui/common/charts";
import type { template } from "dpt-ui/core/templates/template";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ITreeMapOptionsNarrowedEvents = {
    onClick?: ((e: ClickEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onDrawn?: ((e: DrawnEvent) => void);
    onDrill?: ((e: DrillEvent) => void);
    onExported?: ((e: ExportedEvent) => void);
    onExporting?: ((e: ExportingEvent) => void);
    onFileSaving?: ((e: FileSavingEvent) => void);
    onIncidentOccurred?: ((e: IncidentOccurredEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onNodesInitialized?: ((e: NodesInitializedEvent) => void);
    onNodesRendering?: ((e: NodesRenderingEvent) => void);
};
type ITreeMapOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ITreeMapOptionsNarrowedEvents> & IHtmlOptions & {
    defaultLoadingIndicator?: Record<string, any>;
    onLoadingIndicatorChange?: (value: Record<string, any>) => void;
}>;
interface TreeMapRef {
    instance: () => dxTreeMap;
}
declare const TreeMap: (props: React.PropsWithChildren<ITreeMapOptions> & {
    ref?: Ref<TreeMapRef>;
}) => ReactElement | null;
type IBorderProps = React.PropsWithChildren<{
    color?: string;
    width?: number;
    dashStyle?: "dash" | "dot" | "longDash" | "solid";
    opacity?: number;
    visible?: boolean;
}>;
declare const _componentBorder: React.MemoExoticComponent<(props: IBorderProps) => React.FunctionComponentElement<IBorderProps>>;
declare const Border: typeof _componentBorder & IElementDescriptor;
type IColorizerProps = React.PropsWithChildren<{
    colorCodeField?: string;
    colorizeGroups?: boolean;
    palette?: Array<string> | "Bright" | "Harmony Light" | "Ocean" | "Pastel" | "Soft" | "Soft Pastel" | "Vintage" | "Violet" | "Carmine" | "Dark Moon" | "Dark Violet" | "Green Mist" | "Soft Blue" | "Material" | "Office";
    paletteExtensionMode?: "alternate" | "blend" | "extrapolate";
    range?: Array<number>;
    type?: "discrete" | "gradient" | "none" | "range";
}>;
declare const _componentColorizer: React.MemoExoticComponent<(props: IColorizerProps) => React.FunctionComponentElement<IColorizerProps>>;
declare const Colorizer: typeof _componentColorizer & IElementDescriptor;
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
type IGroupProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        width?: number;
    };
    color?: string;
    headerHeight?: number;
    hoverEnabled?: boolean;
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            width?: number;
        };
        color?: string;
    };
    label?: Record<string, any> | {
        font?: ChartsFont;
        textOverflow?: "ellipsis" | "hide" | "none";
        visible?: boolean;
    };
    padding?: number;
    selectionStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            width?: number;
        };
        color?: string;
    };
}>;
declare const _componentGroup: React.MemoExoticComponent<(props: IGroupProps) => React.FunctionComponentElement<IGroupProps>>;
declare const Group: typeof _componentGroup & IElementDescriptor;
type IGroupLabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
    textOverflow?: "ellipsis" | "hide" | "none";
    visible?: boolean;
}>;
declare const _componentGroupLabel: React.MemoExoticComponent<(props: IGroupLabelProps) => React.FunctionComponentElement<IGroupLabelProps>>;
declare const GroupLabel: typeof _componentGroupLabel & IElementDescriptor;
type IHoverStyleProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        width?: number;
    };
    color?: string;
}>;
declare const _componentHoverStyle: React.MemoExoticComponent<(props: IHoverStyleProps) => React.FunctionComponentElement<IHoverStyleProps>>;
declare const HoverStyle: typeof _componentHoverStyle & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
    textOverflow?: "ellipsis" | "hide" | "none";
    visible?: boolean;
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
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
        width?: number;
    };
    color?: string;
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
type ITileProps = React.PropsWithChildren<{
    border?: Record<string, any> | {
        color?: string;
        width?: number;
    };
    color?: string;
    hoverStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            width?: number;
        };
        color?: string;
    };
    label?: Record<string, any> | {
        font?: ChartsFont;
        textOverflow?: "ellipsis" | "hide" | "none";
        visible?: boolean;
        wordWrap?: "normal" | "breakWord" | "none";
    };
    selectionStyle?: Record<string, any> | {
        border?: Record<string, any> | {
            color?: string;
            width?: number;
        };
        color?: string;
    };
}>;
declare const _componentTile: React.MemoExoticComponent<(props: ITileProps) => React.FunctionComponentElement<ITileProps>>;
declare const Tile: typeof _componentTile & IElementDescriptor;
type ITileLabelProps = React.PropsWithChildren<{
    font?: ChartsFont;
    textOverflow?: "ellipsis" | "hide" | "none";
    visible?: boolean;
    wordWrap?: "normal" | "breakWord" | "none";
}>;
declare const _componentTileLabel: React.MemoExoticComponent<(props: ITileLabelProps) => React.FunctionComponentElement<ITileLabelProps>>;
declare const TileLabel: typeof _componentTileLabel & IElementDescriptor;
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
    contentTemplate?: ((info: {
        node: dxTreeMapNode;
        value: number;
        valueText: string;
    }, element: any) => string | any) | template;
    cornerRadius?: number;
    customizeTooltip?: ((info: {
        node: dxTreeMapNode;
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
type ITreeMapborderProps = React.PropsWithChildren<{
    color?: string;
    width?: number;
}>;
declare const _componentTreeMapborder: React.MemoExoticComponent<(props: ITreeMapborderProps) => React.FunctionComponentElement<ITreeMapborderProps>>;
declare const TreeMapborder: typeof _componentTreeMapborder & IElementDescriptor;
export default TreeMap;
export { TreeMap, ITreeMapOptions, TreeMapRef, Border, IBorderProps, Colorizer, IColorizerProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Group, IGroupProps, GroupLabel, IGroupLabelProps, HoverStyle, IHoverStyleProps, Label, ILabelProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, SelectionStyle, ISelectionStyleProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, Tile, ITileProps, TileLabel, ITileLabelProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps, TreeMapborder, ITreeMapborderProps };
import type * as TreeMapTypes from 'dpt-ui/viz/tree_map_types';
export { TreeMapTypes };
