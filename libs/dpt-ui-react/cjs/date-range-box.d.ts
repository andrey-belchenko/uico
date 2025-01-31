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
import dxDateRangeBox, { Properties } from "dpt-ui/ui/date_range_box";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ChangeEvent, ClosedEvent, ContentReadyEvent, CopyEvent, CutEvent, DisposingEvent, EnterKeyEvent, FocusInEvent, FocusOutEvent, InitializedEvent, InputEvent, KeyDownEvent, KeyUpEvent, OpenedEvent, PasteEvent, ValueChangedEvent } from "dpt-ui/ui/date_range_box";
import type { ContentReadyEvent as ButtonContentReadyEvent, DisposingEvent as ButtonDisposingEvent, InitializedEvent as ButtonInitializedEvent, dxButtonOptions, OptionChangedEvent as ButtonOptionChangedEvent, ClickEvent } from "dpt-ui/ui/button";
import type { DisposingEvent as CalendarDisposingEvent, InitializedEvent as CalendarInitializedEvent, ValueChangedEvent as CalendarValueChangedEvent, DisabledDate, OptionChangedEvent } from "dpt-ui/ui/calendar";
import type { AnimationConfig, AnimationState } from "dpt-ui/animation/fx";
import type { template } from "dpt-ui/core/templates/template";
import type { event, EventInfo } from "dpt-ui/events/index";
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
type IDateRangeBoxOptionsNarrowedEvents = {
    onChange?: ((e: ChangeEvent) => void);
    onClosed?: ((e: ClosedEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onCopy?: ((e: CopyEvent) => void);
    onCut?: ((e: CutEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onEnterKey?: ((e: EnterKeyEvent) => void);
    onFocusIn?: ((e: FocusInEvent) => void);
    onFocusOut?: ((e: FocusOutEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onInput?: ((e: InputEvent) => void);
    onKeyDown?: ((e: KeyDownEvent) => void);
    onKeyUp?: ((e: KeyUpEvent) => void);
    onOpened?: ((e: OpenedEvent) => void);
    onPaste?: ((e: PasteEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type IDateRangeBoxOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IDateRangeBoxOptionsNarrowedEvents> & IHtmlOptions & {
    dropDownButtonRender?: (...params: any) => React.ReactNode;
    dropDownButtonComponent?: React.ComponentType<any>;
    defaultEndDate?: Date | number | string;
    defaultOpened?: boolean;
    defaultStartDate?: Date | number | string;
    defaultValue?: Array<Date | number | string>;
    onEndDateChange?: (value: Date | number | string) => void;
    onOpenedChange?: (value: boolean) => void;
    onStartDateChange?: (value: Date | number | string) => void;
    onValueChange?: (value: Array<Date | number | string>) => void;
}>;
interface DateRangeBoxRef {
    instance: () => dxDateRangeBox;
}
declare const DateRangeBox: (props: React.PropsWithChildren<IDateRangeBoxOptions> & {
    ref?: Ref<DateRangeBoxRef>;
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
type ICalendarOptionsProps = React.PropsWithChildren<{
    accessKey?: string;
    activeStateEnabled?: boolean;
    bindingOptions?: Record<string, any>;
    cellTemplate?: ((itemData: {
        date: Date;
        text: string;
        view: string;
    }, itemIndex: number, itemElement: any) => string | any) | template;
    dateSerializationFormat?: string;
    disabled?: boolean;
    disabledDates?: Array<Date> | ((data: DisabledDate) => boolean);
    elementAttr?: Record<string, any>;
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    focusStateEnabled?: boolean;
    height?: (() => number | string) | number | string;
    hint?: string;
    hoverStateEnabled?: boolean;
    isDirty?: boolean;
    isValid?: boolean;
    max?: Date | number | string;
    maxZoomLevel?: "century" | "decade" | "month" | "year";
    min?: Date | number | string;
    minZoomLevel?: "century" | "decade" | "month" | "year";
    name?: string;
    onDisposing?: ((e: CalendarDisposingEvent) => void);
    onInitialized?: ((e: CalendarInitializedEvent) => void);
    onOptionChanged?: ((e: OptionChangedEvent) => void);
    onValueChanged?: ((e: CalendarValueChangedEvent) => void);
    readOnly?: boolean;
    rtlEnabled?: boolean;
    selectionMode?: "single" | "multiple" | "range";
    selectWeekOnClick?: boolean;
    showTodayButton?: boolean;
    showWeekNumbers?: boolean;
    tabIndex?: number;
    validationError?: any;
    validationErrors?: Array<any>;
    validationMessageMode?: "always" | "auto";
    validationMessagePosition?: "bottom" | "left" | "right" | "top";
    validationStatus?: "valid" | "invalid" | "pending";
    value?: Array<Date | number | string> | Date | number | string;
    visible?: boolean;
    weekNumberRule?: "auto" | "firstDay" | "fullWeek" | "firstFourDays";
    width?: (() => number | string) | number | string;
    zoomLevel?: "century" | "decade" | "month" | "year";
    defaultValue?: Array<Date | number | string> | Date | number | string;
    onValueChange?: (value: Array<Date | number | string> | Date | number | string) => void;
    defaultZoomLevel?: "century" | "decade" | "month" | "year";
    onZoomLevelChange?: (value: "century" | "decade" | "month" | "year") => void;
    cellRender?: (...params: any) => React.ReactNode;
    cellComponent?: React.ComponentType<any>;
}>;
declare const _componentCalendarOptions: React.MemoExoticComponent<(props: ICalendarOptionsProps) => React.FunctionComponentElement<ICalendarOptionsProps>>;
declare const CalendarOptions: typeof _componentCalendarOptions & IElementDescriptor;
type ICollisionProps = React.PropsWithChildren<{
    x?: "fit" | "flip" | "flipfit" | "none";
    y?: "fit" | "flip" | "flipfit" | "none";
}>;
declare const _componentCollision: React.MemoExoticComponent<(props: ICollisionProps) => React.FunctionComponentElement<ICollisionProps>>;
declare const Collision: typeof _componentCollision & IElementDescriptor;
type IDisplayFormatProps = React.PropsWithChildren<{
    currency?: string;
    formatter?: ((value: number | Date) => string);
    parser?: ((value: string) => number | Date);
    precision?: number;
    type?: "billions" | "currency" | "day" | "decimal" | "exponential" | "fixedPoint" | "largeNumber" | "longDate" | "longTime" | "millions" | "millisecond" | "month" | "monthAndDay" | "monthAndYear" | "percent" | "quarter" | "quarterAndYear" | "shortDate" | "shortTime" | "thousands" | "trillions" | "year" | "dayOfWeek" | "hour" | "longDateLongTime" | "minute" | "second" | "shortDateShortTime";
    useCurrencyAccountingStyle?: boolean;
}>;
declare const _componentDisplayFormat: React.MemoExoticComponent<(props: IDisplayFormatProps) => React.FunctionComponentElement<IDisplayFormatProps>>;
declare const DisplayFormat: typeof _componentDisplayFormat & IElementDescriptor;
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
    onOptionChanged?: ((e: ButtonOptionChangedEvent) => void);
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
export default DateRangeBox;
export { DateRangeBox, IDateRangeBoxOptions, DateRangeBoxRef, Animation, IAnimationProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Button, IButtonProps, CalendarOptions, ICalendarOptionsProps, Collision, ICollisionProps, DisplayFormat, IDisplayFormatProps, DropDownOptions, IDropDownOptionsProps, From, IFromProps, Hide, IHideProps, My, IMyProps, Offset, IOffsetProps, Options, IOptionsProps, Position, IPositionProps, Show, IShowProps, To, IToProps, ToolbarItem, IToolbarItemProps };
import type * as DateRangeBoxTypes from 'dpt-ui/ui/date_range_box_types';
export { DateRangeBoxTypes };
