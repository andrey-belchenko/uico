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
import dxTooltip, { Properties } from "dpt-ui/ui/tooltip";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { PositionConfig } from "dpt-ui/animation/position";
import type { ContentReadyEvent, DisposingEvent, HiddenEvent, HidingEvent, InitializedEvent, ShowingEvent, ShownEvent } from "dpt-ui/ui/tooltip";
import type { AnimationConfig, AnimationState } from "dpt-ui/animation/fx";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ITooltipOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onHidden?: ((e: HiddenEvent) => void);
    onHiding?: ((e: HidingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onShowing?: ((e: ShowingEvent) => void);
    onShown?: ((e: ShownEvent) => void);
};
type ITooltipOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ITooltipOptionsNarrowedEvents> & IHtmlOptions & {
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    defaultHeight?: (() => number | string) | number | string;
    defaultPosition?: PositionConfig | "bottom" | "left" | "right" | "top";
    defaultVisible?: boolean;
    defaultWidth?: (() => number | string) | number | string;
    onHeightChange?: (value: (() => number | string) | number | string) => void;
    onPositionChange?: (value: PositionConfig | "bottom" | "left" | "right" | "top") => void;
    onVisibleChange?: (value: boolean) => void;
    onWidthChange?: (value: (() => number | string) | number | string) => void;
}>;
interface TooltipRef {
    instance: () => dxTooltip;
}
declare const Tooltip: (props: React.PropsWithChildren<ITooltipOptions> & {
    ref?: Ref<TooltipRef>;
}) => ReactElement | null;
type IAnimationProps = React.PropsWithChildren<{
    hide?: AnimationConfig;
    show?: AnimationConfig;
}>;
declare const _componentAnimation: React.MemoExoticComponent<(props: IAnimationProps) => React.FunctionComponentElement<IAnimationProps>>;
declare const Animation: typeof _componentAnimation & IElementDescriptor;
type IAtProps = React.PropsWithChildren<{
    x?: "center" | "left" | "right";
    y?: "bottom" | "center" | "top";
}>;
declare const _componentAt: React.MemoExoticComponent<(props: IAtProps) => React.FunctionComponentElement<IAtProps>>;
declare const At: typeof _componentAt & IElementDescriptor;
type IBoundaryOffsetProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentBoundaryOffset: React.MemoExoticComponent<(props: IBoundaryOffsetProps) => React.FunctionComponentElement<IBoundaryOffsetProps>>;
declare const BoundaryOffset: typeof _componentBoundaryOffset & IElementDescriptor;
type ICollisionProps = React.PropsWithChildren<{
    x?: "fit" | "flip" | "flipfit" | "none";
    y?: "fit" | "flip" | "flipfit" | "none";
}>;
declare const _componentCollision: React.MemoExoticComponent<(props: ICollisionProps) => React.FunctionComponentElement<ICollisionProps>>;
declare const Collision: typeof _componentCollision & IElementDescriptor;
type IFromProps = React.PropsWithChildren<{
    left?: number;
    opacity?: number;
    position?: PositionConfig;
    scale?: number;
    top?: number;
}>;
declare const _componentFrom: React.MemoExoticComponent<(props: IFromProps) => React.FunctionComponentElement<IFromProps>>;
declare const From: typeof _componentFrom & IElementDescriptor;
type IHideProps = React.PropsWithChildren<{
    complete?: (($element: any, config: AnimationConfig) => void);
    delay?: number;
    direction?: "bottom" | "left" | "right" | "top";
    duration?: number;
    easing?: string;
    from?: AnimationState;
    staggerDelay?: number;
    start?: (($element: any, config: AnimationConfig) => void);
    to?: AnimationState;
    type?: "css" | "fade" | "fadeIn" | "fadeOut" | "pop" | "slide" | "slideIn" | "slideOut";
}>;
declare const _componentHide: React.MemoExoticComponent<(props: IHideProps) => React.FunctionComponentElement<IHideProps>>;
declare const Hide: typeof _componentHide & IElementDescriptor;
type IHideEventProps = React.PropsWithChildren<{
    delay?: number;
    name?: string;
}>;
declare const _componentHideEvent: React.MemoExoticComponent<(props: IHideEventProps) => React.FunctionComponentElement<IHideEventProps>>;
declare const HideEvent: typeof _componentHideEvent & IElementDescriptor;
type IMyProps = React.PropsWithChildren<{
    x?: "center" | "left" | "right";
    y?: "bottom" | "center" | "top";
}>;
declare const _componentMy: React.MemoExoticComponent<(props: IMyProps) => React.FunctionComponentElement<IMyProps>>;
declare const My: typeof _componentMy & IElementDescriptor;
type IOffsetProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentOffset: React.MemoExoticComponent<(props: IOffsetProps) => React.FunctionComponentElement<IOffsetProps>>;
declare const Offset: typeof _componentOffset & IElementDescriptor;
type IPositionProps = React.PropsWithChildren<{
    at?: Record<string, any> | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top" | {
        x?: "center" | "left" | "right";
        y?: "bottom" | "center" | "top";
    };
    boundary?: any | string;
    boundaryOffset?: Record<string, any> | string | {
        x?: number;
        y?: number;
    };
    collision?: Record<string, any> | "fit" | "fit flip" | "fit flipfit" | "fit none" | "flip" | "flip fit" | "flip none" | "flipfit" | "flipfit fit" | "flipfit none" | "none" | "none fit" | "none flip" | "none flipfit" | {
        x?: "fit" | "flip" | "flipfit" | "none";
        y?: "fit" | "flip" | "flipfit" | "none";
    };
    my?: Record<string, any> | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top" | {
        x?: "center" | "left" | "right";
        y?: "bottom" | "center" | "top";
    };
    of?: any | string;
    offset?: Record<string, any> | string | {
        x?: number;
        y?: number;
    };
}>;
declare const _componentPosition: React.MemoExoticComponent<(props: IPositionProps) => React.FunctionComponentElement<IPositionProps>>;
declare const Position: typeof _componentPosition & IElementDescriptor;
type IShowProps = React.PropsWithChildren<{
    complete?: (($element: any, config: AnimationConfig) => void);
    delay?: number;
    direction?: "bottom" | "left" | "right" | "top";
    duration?: number;
    easing?: string;
    from?: AnimationState;
    staggerDelay?: number;
    start?: (($element: any, config: AnimationConfig) => void);
    to?: AnimationState;
    type?: "css" | "fade" | "fadeIn" | "fadeOut" | "pop" | "slide" | "slideIn" | "slideOut";
}>;
declare const _componentShow: React.MemoExoticComponent<(props: IShowProps) => React.FunctionComponentElement<IShowProps>>;
declare const Show: typeof _componentShow & IElementDescriptor;
type IShowEventProps = React.PropsWithChildren<{
    delay?: number;
    name?: string;
}>;
declare const _componentShowEvent: React.MemoExoticComponent<(props: IShowEventProps) => React.FunctionComponentElement<IShowEventProps>>;
declare const ShowEvent: typeof _componentShowEvent & IElementDescriptor;
type IToProps = React.PropsWithChildren<{
    left?: number;
    opacity?: number;
    position?: PositionConfig;
    scale?: number;
    top?: number;
}>;
declare const _componentTo: React.MemoExoticComponent<(props: IToProps) => React.FunctionComponentElement<IToProps>>;
declare const To: typeof _componentTo & IElementDescriptor;
export default Tooltip;
export { Tooltip, ITooltipOptions, TooltipRef, Animation, IAnimationProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Collision, ICollisionProps, From, IFromProps, Hide, IHideProps, HideEvent, IHideEventProps, My, IMyProps, Offset, IOffsetProps, Position, IPositionProps, Show, IShowProps, ShowEvent, IShowEventProps, To, IToProps };
import type * as TooltipTypes from 'dpt-ui/ui/tooltip_types';
export { TooltipTypes };
