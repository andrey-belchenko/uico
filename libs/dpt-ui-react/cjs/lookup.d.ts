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
import dxLookup, { Properties } from "dpt-ui/ui/lookup";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ClosedEvent, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, OpenedEvent, PageLoadingEvent, PullRefreshEvent, ScrollEvent, ValueChangedEvent } from "dpt-ui/ui/lookup";
import type { ContentReadyEvent as PopoverContentReadyEvent, DisposingEvent as PopoverDisposingEvent, InitializedEvent as PopoverInitializedEvent, HiddenEvent, HidingEvent, OptionChangedEvent, ShowingEvent, ShownEvent, TitleRenderedEvent } from "dpt-ui/ui/popover";
import type { AnimationConfig, AnimationState } from "dpt-ui/animation/fx";
import type { event } from "dpt-ui/events/index";
import type { template } from "dpt-ui/core/templates/template";
import type { PositionConfig } from "dpt-ui/animation/position";
import type { dxPopupToolbarItem } from "dpt-ui/ui/popup";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ILookupOptionsNarrowedEvents = {
    onClosed?: ((e: ClosedEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onItemClick?: ((e: ItemClickEvent) => void);
    onOpened?: ((e: OpenedEvent) => void);
    onPageLoading?: ((e: PageLoadingEvent) => void);
    onPullRefresh?: ((e: PullRefreshEvent) => void);
    onScroll?: ((e: ScrollEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type ILookupOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ILookupOptionsNarrowedEvents> & IHtmlOptions & {
    fieldRender?: (...params: any) => React.ReactNode;
    fieldComponent?: React.ComponentType<any>;
    groupRender?: (...params: any) => React.ReactNode;
    groupComponent?: React.ComponentType<any>;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultOpened?: boolean;
    defaultValue?: any;
    onOpenedChange?: (value: boolean) => void;
    onValueChange?: (value: any) => void;
}>;
interface LookupRef {
    instance: () => dxLookup;
}
declare const Lookup: (props: React.PropsWithChildren<ILookupOptions> & {
    ref?: Ref<LookupRef>;
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
type IDropDownOptionsProps = React.PropsWithChildren<{
    animation?: Record<string, any> | {
        hide?: AnimationConfig;
        show?: AnimationConfig;
    };
    bindingOptions?: Record<string, any>;
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    container?: any | string;
    contentTemplate?: ((contentElement: any) => string | any) | template;
    deferRendering?: boolean;
    disabled?: boolean;
    enableBodyScroll?: boolean;
    height?: (() => number | string) | number | string;
    hideEvent?: Record<string, any> | string | {
        delay?: number;
        name?: string;
    };
    hideOnOutsideClick?: boolean | ((event: event) => boolean);
    hideOnParentScroll?: boolean;
    hint?: string;
    hoverStateEnabled?: boolean;
    maxHeight?: (() => number | string) | number | string;
    maxWidth?: (() => number | string) | number | string;
    minHeight?: (() => number | string) | number | string;
    minWidth?: (() => number | string) | number | string;
    onContentReady?: ((e: PopoverContentReadyEvent) => void);
    onDisposing?: ((e: PopoverDisposingEvent) => void);
    onHidden?: ((e: HiddenEvent) => void);
    onHiding?: ((e: HidingEvent) => void);
    onInitialized?: ((e: PopoverInitializedEvent) => void);
    onOptionChanged?: ((e: OptionChangedEvent) => void);
    onShowing?: ((e: ShowingEvent) => void);
    onShown?: ((e: ShownEvent) => void);
    onTitleRendered?: ((e: TitleRenderedEvent) => void);
    position?: PositionConfig | "bottom" | "left" | "right" | "top";
    rtlEnabled?: boolean;
    shading?: boolean;
    shadingColor?: string;
    showCloseButton?: boolean;
    showEvent?: Record<string, any> | string | {
        delay?: number;
        name?: string;
    };
    showTitle?: boolean;
    target?: any | string;
    title?: string;
    titleTemplate?: ((titleElement: any) => string | any) | template;
    toolbarItems?: Array<dxPopupToolbarItem>;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    wrapperAttr?: any;
    defaultHeight?: (() => number | string) | number | string;
    onHeightChange?: (value: (() => number | string) | number | string) => void;
    defaultPosition?: PositionConfig | "bottom" | "left" | "right" | "top";
    onPositionChange?: (value: PositionConfig | "bottom" | "left" | "right" | "top") => void;
    defaultVisible?: boolean;
    onVisibleChange?: (value: boolean) => void;
    defaultWidth?: (() => number | string) | number | string;
    onWidthChange?: (value: (() => number | string) | number | string) => void;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    titleRender?: (...params: any) => React.ReactNode;
    titleComponent?: React.ComponentType<any>;
}>;
declare const _componentDropDownOptions: React.MemoExoticComponent<(props: IDropDownOptionsProps) => React.FunctionComponentElement<IDropDownOptionsProps>>;
declare const DropDownOptions: typeof _componentDropDownOptions & IElementDescriptor;
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
type IItemProps = React.PropsWithChildren<{
    disabled?: boolean;
    html?: string;
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
type IToProps = React.PropsWithChildren<{
    left?: number;
    opacity?: number;
    position?: PositionConfig;
    scale?: number;
    top?: number;
}>;
declare const _componentTo: React.MemoExoticComponent<(props: IToProps) => React.FunctionComponentElement<IToProps>>;
declare const To: typeof _componentTo & IElementDescriptor;
type IToolbarItemProps = React.PropsWithChildren<{
    cssClass?: string;
    disabled?: boolean;
    html?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    menuItemTemplate?: (() => string | any) | template;
    options?: any;
    showText?: "always" | "inMenu";
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    toolbar?: "bottom" | "top";
    visible?: boolean;
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentToolbarItem: React.MemoExoticComponent<(props: IToolbarItemProps) => React.FunctionComponentElement<IToolbarItemProps>>;
declare const ToolbarItem: typeof _componentToolbarItem & IElementDescriptor;
export default Lookup;
export { Lookup, ILookupOptions, LookupRef, Animation, IAnimationProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Collision, ICollisionProps, DropDownOptions, IDropDownOptionsProps, From, IFromProps, Hide, IHideProps, HideEvent, IHideEventProps, Item, IItemProps, My, IMyProps, Offset, IOffsetProps, Position, IPositionProps, Show, IShowProps, ShowEvent, IShowEventProps, To, IToProps, ToolbarItem, IToolbarItemProps };
import type * as LookupTypes from 'dpt-ui/ui/lookup_types';
export { LookupTypes };
