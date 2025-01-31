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

export { ExplicitTypes } from "dpt-ui/ui/context_menu";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxContextMenu, { Properties } from "dpt-ui/ui/context_menu";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxContextMenuItem, ContentReadyEvent, DisposingEvent, HiddenEvent, HidingEvent, InitializedEvent, ItemClickEvent, ItemContextMenuEvent, ItemRenderedEvent, PositioningEvent, ShowingEvent, ShownEvent } from "dpt-ui/ui/context_menu";
import type { AnimationConfig, AnimationState } from "dpt-ui/animation/fx";
import type { PositionConfig } from "dpt-ui/animation/position";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IContextMenuOptionsNarrowedEvents<TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TKey>) => void);
    onHidden?: ((e: HiddenEvent<TKey>) => void);
    onHiding?: ((e: HidingEvent<TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TKey>) => void);
    onPositioning?: ((e: PositioningEvent<TKey>) => void);
    onShowing?: ((e: ShowingEvent<TKey>) => void);
    onShown?: ((e: ShownEvent<TKey>) => void);
};
type IContextMenuOptions<TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TKey>, IContextMenuOptionsNarrowedEvents<TKey>> & IHtmlOptions & {
    dataSource?: Properties<TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultItems?: Array<dxContextMenuItem>;
    defaultSelectedItem?: any;
    defaultVisible?: boolean;
    onItemsChange?: (value: Array<dxContextMenuItem>) => void;
    onSelectedItemChange?: (value: any) => void;
    onVisibleChange?: (value: boolean) => void;
}>;
interface ContextMenuRef<TKey = any> {
    instance: () => dxContextMenu<TKey>;
}
declare const ContextMenu: <TKey = any>(props: ReplaceFieldTypes<Properties<TKey>, IContextMenuOptionsNarrowedEvents<TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<dxContextMenuItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    defaultItems?: dxContextMenuItem[] | undefined;
    defaultSelectedItem?: any;
    defaultVisible?: boolean | undefined;
    onItemsChange?: ((value: Array<dxContextMenuItem>) => void) | undefined;
    onSelectedItemChange?: ((value: any) => void) | undefined;
    onVisibleChange?: ((value: boolean) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<ContextMenuRef<TKey>> | undefined;
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
type IDelayProps = React.PropsWithChildren<{
    hide?: number;
    show?: number;
}>;
declare const _componentDelay: React.MemoExoticComponent<(props: IDelayProps) => React.FunctionComponentElement<IDelayProps>>;
declare const Delay: typeof _componentDelay & IElementDescriptor;
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
type IItemProps = React.PropsWithChildren<{
    beginGroup?: boolean;
    closeMenuOnClick?: boolean;
    disabled?: boolean;
    icon?: string;
    items?: Array<dxContextMenuItem>;
    selectable?: boolean;
    selected?: boolean;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
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
type IShowSubmenuModeProps = React.PropsWithChildren<{
    delay?: number | Record<string, any> | {
        hide?: number;
        show?: number;
    };
    name?: "onClick" | "onHover";
}>;
declare const _componentShowSubmenuMode: React.MemoExoticComponent<(props: IShowSubmenuModeProps) => React.FunctionComponentElement<IShowSubmenuModeProps>>;
declare const ShowSubmenuMode: typeof _componentShowSubmenuMode & IElementDescriptor;
type IToProps = React.PropsWithChildren<{
    left?: number;
    opacity?: number;
    position?: PositionConfig;
    scale?: number;
    top?: number;
}>;
declare const _componentTo: React.MemoExoticComponent<(props: IToProps) => React.FunctionComponentElement<IToProps>>;
declare const To: typeof _componentTo & IElementDescriptor;
export default ContextMenu;
export { ContextMenu, IContextMenuOptions, ContextMenuRef, Animation, IAnimationProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Collision, ICollisionProps, Delay, IDelayProps, From, IFromProps, Hide, IHideProps, Item, IItemProps, My, IMyProps, Offset, IOffsetProps, Position, IPositionProps, Show, IShowProps, ShowEvent, IShowEventProps, ShowSubmenuMode, IShowSubmenuModeProps, To, IToProps };
import type * as ContextMenuTypes from 'dpt-ui/ui/context_menu_types';
export { ContextMenuTypes };
