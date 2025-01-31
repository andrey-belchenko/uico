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
import dxTagBox, { Properties } from "dpt-ui/ui/tag_box";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ChangeEvent, ClosedEvent, ContentReadyEvent, CustomItemCreatingEvent, DisposingEvent, EnterKeyEvent, FocusInEvent, FocusOutEvent, InitializedEvent, InputEvent, ItemClickEvent, KeyDownEvent, KeyUpEvent, MultiTagPreparingEvent, OpenedEvent, SelectAllValueChangedEvent, ValueChangedEvent } from "dpt-ui/ui/tag_box";
import type { ContentReadyEvent as ButtonContentReadyEvent, DisposingEvent as ButtonDisposingEvent, InitializedEvent as ButtonInitializedEvent, dxButtonOptions, ClickEvent, OptionChangedEvent } from "dpt-ui/ui/button";
import type { AnimationConfig, AnimationState } from "dpt-ui/animation/fx";
import type { event, EventInfo } from "dpt-ui/events/index";
import type { template } from "dpt-ui/core/templates/template";
import type { Component } from "dpt-ui/core/component";
import type { PositionConfig } from "dpt-ui/animation/position";
import type { dxPopupToolbarItem } from "dpt-ui/ui/popup";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type dxOverlay from "dpt-ui/ui/overlay";
import type DOMComponent from "dpt-ui/core/dom_component";
import type dxPopup from "dpt-ui/ui/popup";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ITagBoxOptionsNarrowedEvents = {
    onChange?: ((e: ChangeEvent) => void);
    onClosed?: ((e: ClosedEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onCustomItemCreating?: ((e: CustomItemCreatingEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onEnterKey?: ((e: EnterKeyEvent) => void);
    onFocusIn?: ((e: FocusInEvent) => void);
    onFocusOut?: ((e: FocusOutEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onInput?: ((e: InputEvent) => void);
    onItemClick?: ((e: ItemClickEvent) => void);
    onKeyDown?: ((e: KeyDownEvent) => void);
    onKeyUp?: ((e: KeyUpEvent) => void);
    onMultiTagPreparing?: ((e: MultiTagPreparingEvent) => void);
    onOpened?: ((e: OpenedEvent) => void);
    onSelectAllValueChanged?: ((e: SelectAllValueChangedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type ITagBoxOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ITagBoxOptionsNarrowedEvents> & IHtmlOptions & {
    dropDownButtonRender?: (...params: any) => React.ReactNode;
    dropDownButtonComponent?: React.ComponentType<any>;
    fieldRender?: (...params: any) => React.ReactNode;
    fieldComponent?: React.ComponentType<any>;
    groupRender?: (...params: any) => React.ReactNode;
    groupComponent?: React.ComponentType<any>;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    tagRender?: (...params: any) => React.ReactNode;
    tagComponent?: React.ComponentType<any>;
    defaultOpened?: boolean;
    defaultValue?: Array<any | number | string>;
    onOpenedChange?: (value: boolean) => void;
    onValueChange?: (value: Array<any | number | string>) => void;
}>;
interface TagBoxRef {
    instance: () => dxTagBox;
}
declare const TagBox: (props: React.PropsWithChildren<ITagBoxOptions> & {
    ref?: Ref<TagBoxRef>;
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
type IButtonProps = React.PropsWithChildren<{
    location?: "after" | "before";
    name?: string;
    options?: dxButtonOptions;
}>;
declare const _componentButton: React.MemoExoticComponent<(props: IButtonProps) => React.FunctionComponentElement<IButtonProps>>;
declare const Button: typeof _componentButton & IElementDescriptor;
type ICollisionProps = React.PropsWithChildren<{
    x?: "fit" | "flip" | "flipfit" | "none";
    y?: "fit" | "flip" | "flipfit" | "none";
}>;
declare const _componentCollision: React.MemoExoticComponent<(props: ICollisionProps) => React.FunctionComponentElement<ICollisionProps>>;
declare const Collision: typeof _componentCollision & IElementDescriptor;
type IDropDownOptionsProps = React.PropsWithChildren<{
    accessKey?: string;
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
    dragAndResizeArea?: any | string;
    dragEnabled?: boolean;
    dragOutsideBoundary?: boolean;
    enableBodyScroll?: boolean;
    focusStateEnabled?: boolean;
    fullScreen?: boolean;
    height?: (() => number | string) | number | string;
    hideOnOutsideClick?: boolean | ((event: event) => boolean);
    hideOnParentScroll?: boolean;
    hint?: string;
    hoverStateEnabled?: boolean;
    maxHeight?: (() => number | string) | number | string;
    maxWidth?: (() => number | string) | number | string;
    minHeight?: (() => number | string) | number | string;
    minWidth?: (() => number | string) | number | string;
    onContentReady?: ((e: EventInfo<any>) => void);
    onDisposing?: ((e: EventInfo<any>) => void);
    onHidden?: ((e: EventInfo<any>) => void);
    onHiding?: ((e: {
        cancel: boolean | any;
        component: dxOverlay<any>;
        element: any;
        model: any;
    }) => void);
    onInitialized?: ((e: {
        component: Component<any>;
        element: any;
    }) => void);
    onOptionChanged?: ((e: {
        component: DOMComponent;
        element: any;
        fullName: string;
        model: any;
        name: string;
        previousValue: any;
        value: any;
    }) => void);
    onResize?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onResizeEnd?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onResizeStart?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onShowing?: ((e: {
        cancel: boolean | any;
        component: dxOverlay<any>;
        element: any;
        model: any;
    }) => void);
    onShown?: ((e: EventInfo<any>) => void);
    onTitleRendered?: ((e: {
        component: dxPopup;
        element: any;
        model: any;
        titleElement: any;
    }) => void);
    position?: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top";
    resizeEnabled?: boolean;
    restorePosition?: boolean;
    rtlEnabled?: boolean;
    shading?: boolean;
    shadingColor?: string;
    showCloseButton?: boolean;
    showTitle?: boolean;
    tabIndex?: number;
    title?: string;
    titleTemplate?: ((titleElement: any) => string | any) | template;
    toolbarItems?: Array<dxPopupToolbarItem>;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    wrapperAttr?: any;
    defaultHeight?: (() => number | string) | number | string;
    onHeightChange?: (value: (() => number | string) | number | string) => void;
    defaultPosition?: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top";
    onPositionChange?: (value: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top") => void;
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
type IOptionsProps = React.PropsWithChildren<{
    accessKey?: string;
    activeStateEnabled?: boolean;
    bindingOptions?: Record<string, any>;
    disabled?: boolean;
    elementAttr?: Record<string, any>;
    focusStateEnabled?: boolean;
    height?: (() => number | string) | number | string;
    hint?: string;
    hoverStateEnabled?: boolean;
    icon?: string;
    onClick?: ((e: ClickEvent) => void);
    onContentReady?: ((e: ButtonContentReadyEvent) => void);
    onDisposing?: ((e: ButtonDisposingEvent) => void);
    onInitialized?: ((e: ButtonInitializedEvent) => void);
    onOptionChanged?: ((e: OptionChangedEvent) => void);
    rtlEnabled?: boolean;
    stylingMode?: "text" | "outlined" | "contained";
    tabIndex?: number;
    template?: ((buttonData: {
        icon: string;
        text: string;
    }, contentElement: any) => string | any) | template;
    text?: string;
    type?: "danger" | "default" | "normal" | "success";
    useSubmitBehavior?: boolean;
    validationGroup?: string;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentOptions: React.MemoExoticComponent<(props: IOptionsProps) => React.FunctionComponentElement<IOptionsProps>>;
declare const Options: typeof _componentOptions & IElementDescriptor;
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
export default TagBox;
export { TagBox, ITagBoxOptions, TagBoxRef, Animation, IAnimationProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Button, IButtonProps, Collision, ICollisionProps, DropDownOptions, IDropDownOptionsProps, From, IFromProps, Hide, IHideProps, Item, IItemProps, My, IMyProps, Offset, IOffsetProps, Options, IOptionsProps, Position, IPositionProps, Show, IShowProps, To, IToProps, ToolbarItem, IToolbarItemProps };
import type * as TagBoxTypes from 'dpt-ui/ui/tag_box_types';
export { TagBoxTypes };
