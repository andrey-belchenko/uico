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

export { ExplicitTypes } from "dpt-ui/ui/list";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxList, { Properties } from "dpt-ui/ui/list";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxListItem, ContentReadyEvent, DisposingEvent, GroupRenderedEvent, InitializedEvent, ItemClickEvent, ItemContextMenuEvent, ItemDeletedEvent, ItemDeletingEvent, ItemHoldEvent, ItemRenderedEvent, ItemReorderedEvent, ItemSwipeEvent, PageLoadingEvent, PullRefreshEvent, ScrollEvent, SelectAllValueChangedEvent } from "dpt-ui/ui/list";
import type { ContentReadyEvent as ButtonContentReadyEvent, DisposingEvent as ButtonDisposingEvent, InitializedEvent as ButtonInitializedEvent, dxButtonOptions, OptionChangedEvent as ButtonOptionChangedEvent, ClickEvent } from "dpt-ui/ui/button";
import type { ContentReadyEvent as TextBoxContentReadyEvent, DisposingEvent as TextBoxDisposingEvent, InitializedEvent as TextBoxInitializedEvent, OptionChangedEvent as TextBoxOptionChangedEvent, ChangeEvent, CopyEvent, CutEvent, EnterKeyEvent, FocusInEvent, FocusOutEvent, InputEvent, KeyDownEvent, KeyUpEvent, PasteEvent, ValueChangedEvent } from "dpt-ui/ui/text_box";
import type { DisposingEvent as SortableDisposingEvent, InitializedEvent as SortableInitializedEvent, AddEvent, DragChangeEvent, DragEndEvent, DragMoveEvent, DragStartEvent, OptionChangedEvent, RemoveEvent, ReorderEvent } from "dpt-ui/ui/sortable";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
import type { TextEditorButton } from "dpt-ui/common";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IListOptionsNarrowedEvents<TItem = any, TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TItem, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TItem, TKey>) => void);
    onGroupRendered?: ((e: GroupRenderedEvent<TItem, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TItem, TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TItem, TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TItem, TKey>) => void);
    onItemDeleted?: ((e: ItemDeletedEvent<TItem, TKey>) => void);
    onItemDeleting?: ((e: ItemDeletingEvent<TItem, TKey>) => void);
    onItemHold?: ((e: ItemHoldEvent<TItem, TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TItem, TKey>) => void);
    onItemReordered?: ((e: ItemReorderedEvent<TItem, TKey>) => void);
    onItemSwipe?: ((e: ItemSwipeEvent<TItem, TKey>) => void);
    onPageLoading?: ((e: PageLoadingEvent<TItem, TKey>) => void);
    onPullRefresh?: ((e: PullRefreshEvent<TItem, TKey>) => void);
    onScroll?: ((e: ScrollEvent<TItem, TKey>) => void);
    onSelectAllValueChanged?: ((e: SelectAllValueChangedEvent<TItem, TKey>) => void);
};
type IListOptions<TItem = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TItem, TKey>, IListOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TItem, TKey>["dataSource"];
    groupRender?: (...params: any) => React.ReactNode;
    groupComponent?: React.ComponentType<any>;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultItems?: Array<any | dxListItem | string>;
    defaultSelectedItemKeys?: Array<any>;
    defaultSelectedItems?: Array<any>;
    onItemsChange?: (value: Array<any | dxListItem | string>) => void;
    onSelectedItemKeysChange?: (value: Array<any>) => void;
    onSelectedItemsChange?: (value: Array<any>) => void;
}>;
interface ListRef<TItem = any, TKey = any> {
    instance: () => dxList<TItem, TKey>;
}
declare const List: <TItem = any, TKey = any>(props: ReplaceFieldTypes<Properties<TItem, TKey>, IListOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TItem, TKey> | null | undefined;
    groupRender?: ((...params: any) => React.ReactNode) | undefined;
    groupComponent?: React.ComponentType<any> | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    defaultItems?: any[] | undefined;
    defaultSelectedItemKeys?: any[] | undefined;
    defaultSelectedItems?: any[] | undefined;
    onItemsChange?: ((value: Array<any | dxListItem | string>) => void) | undefined;
    onSelectedItemKeysChange?: ((value: Array<any>) => void) | undefined;
    onSelectedItemsChange?: ((value: Array<any>) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<ListRef<TItem, TKey>> | undefined;
}) => ReactElement | null;
type IButtonProps = React.PropsWithChildren<{
    location?: "after" | "before";
    name?: string;
    options?: dxButtonOptions;
}>;
declare const _componentButton: React.MemoExoticComponent<(props: IButtonProps) => React.FunctionComponentElement<IButtonProps>>;
declare const Button: typeof _componentButton & IElementDescriptor;
type ICursorOffsetProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentCursorOffset: React.MemoExoticComponent<(props: ICursorOffsetProps) => React.FunctionComponentElement<ICursorOffsetProps>>;
declare const CursorOffset: typeof _componentCursorOffset & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    badge?: string;
    disabled?: boolean;
    html?: string;
    icon?: string;
    key?: string;
    showChevron?: boolean;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
type IItemDraggingProps = React.PropsWithChildren<{
    allowDropInsideItem?: boolean;
    allowReordering?: boolean;
    autoScroll?: boolean;
    bindingOptions?: Record<string, any>;
    boundary?: any | string;
    container?: any | string;
    cursorOffset?: Record<string, any> | string | {
        x?: number;
        y?: number;
    };
    data?: any;
    dragDirection?: "both" | "horizontal" | "vertical";
    dragTemplate?: ((dragInfo: {
        fromIndex: number;
        itemData: any;
        itemElement: any;
    }, containerElement: any) => string | any) | template;
    dropFeedbackMode?: "push" | "indicate";
    elementAttr?: Record<string, any>;
    filter?: string;
    group?: string;
    handle?: string;
    height?: (() => number | string) | number | string;
    itemOrientation?: "horizontal" | "vertical";
    moveItemOnDrop?: boolean;
    onAdd?: ((e: AddEvent) => void);
    onDisposing?: ((e: SortableDisposingEvent) => void);
    onDragChange?: ((e: DragChangeEvent) => void);
    onDragEnd?: ((e: DragEndEvent) => void);
    onDragMove?: ((e: DragMoveEvent) => void);
    onDragStart?: ((e: DragStartEvent) => void);
    onInitialized?: ((e: SortableInitializedEvent) => void);
    onOptionChanged?: ((e: OptionChangedEvent) => void);
    onRemove?: ((e: RemoveEvent) => void);
    onReorder?: ((e: ReorderEvent) => void);
    rtlEnabled?: boolean;
    scrollSensitivity?: number;
    scrollSpeed?: number;
    width?: (() => number | string) | number | string;
    dragRender?: (...params: any) => React.ReactNode;
    dragComponent?: React.ComponentType<any>;
}>;
declare const _componentItemDragging: React.MemoExoticComponent<(props: IItemDraggingProps) => React.FunctionComponentElement<IItemDraggingProps>>;
declare const ItemDragging: typeof _componentItemDragging & IElementDescriptor;
type IMenuItemProps = React.PropsWithChildren<{
    action?: ((itemElement: any, itemData: any) => void);
    text?: string;
}>;
declare const _componentMenuItem: React.MemoExoticComponent<(props: IMenuItemProps) => React.FunctionComponentElement<IMenuItemProps>>;
declare const MenuItem: typeof _componentMenuItem & IElementDescriptor;
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
type ISearchEditorOptionsProps = React.PropsWithChildren<{
    accessKey?: string;
    activeStateEnabled?: boolean;
    bindingOptions?: Record<string, any>;
    buttons?: Array<string | "clear" | TextEditorButton>;
    disabled?: boolean;
    elementAttr?: Record<string, any>;
    focusStateEnabled?: boolean;
    height?: (() => number | string) | number | string;
    hint?: string;
    hoverStateEnabled?: boolean;
    inputAttr?: any;
    isDirty?: boolean;
    isValid?: boolean;
    label?: string;
    labelMode?: "static" | "floating" | "hidden" | "outside";
    mask?: string;
    maskChar?: string;
    maskInvalidMessage?: string;
    maskRules?: any;
    maxLength?: number | string;
    mode?: "email" | "password" | "search" | "tel" | "text" | "url";
    name?: string;
    onChange?: ((e: ChangeEvent) => void);
    onContentReady?: ((e: TextBoxContentReadyEvent) => void);
    onCopy?: ((e: CopyEvent) => void);
    onCut?: ((e: CutEvent) => void);
    onDisposing?: ((e: TextBoxDisposingEvent) => void);
    onEnterKey?: ((e: EnterKeyEvent) => void);
    onFocusIn?: ((e: FocusInEvent) => void);
    onFocusOut?: ((e: FocusOutEvent) => void);
    onInitialized?: ((e: TextBoxInitializedEvent) => void);
    onInput?: ((e: InputEvent) => void);
    onKeyDown?: ((e: KeyDownEvent) => void);
    onKeyUp?: ((e: KeyUpEvent) => void);
    onOptionChanged?: ((e: TextBoxOptionChangedEvent) => void);
    onPaste?: ((e: PasteEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
    placeholder?: string;
    readOnly?: boolean;
    rtlEnabled?: boolean;
    showClearButton?: boolean;
    showMaskMode?: "always" | "onFocus";
    spellcheck?: boolean;
    stylingMode?: "outlined" | "underlined" | "filled";
    tabIndex?: number;
    text?: string;
    useMaskedValue?: boolean;
    validationError?: any;
    validationErrors?: Array<any>;
    validationMessageMode?: "always" | "auto";
    validationMessagePosition?: "bottom" | "left" | "right" | "top";
    validationStatus?: "valid" | "invalid" | "pending";
    value?: string;
    valueChangeEvent?: string;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}>;
declare const _componentSearchEditorOptions: React.MemoExoticComponent<(props: ISearchEditorOptionsProps) => React.FunctionComponentElement<ISearchEditorOptionsProps>>;
declare const SearchEditorOptions: typeof _componentSearchEditorOptions & IElementDescriptor;
export default List;
export { List, IListOptions, ListRef, Button, IButtonProps, CursorOffset, ICursorOffsetProps, Item, IItemProps, ItemDragging, IItemDraggingProps, MenuItem, IMenuItemProps, Options, IOptionsProps, SearchEditorOptions, ISearchEditorOptionsProps };
import type * as ListTypes from 'dpt-ui/ui/list_types';
export { ListTypes };
