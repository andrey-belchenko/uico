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

export { ExplicitTypes } from "dpt-ui/ui/tree_view";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxTreeView, { Properties } from "dpt-ui/ui/tree_view";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxTreeViewItem, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemCollapsedEvent, ItemContextMenuEvent, ItemExpandedEvent, ItemHoldEvent, ItemRenderedEvent, SelectAllValueChangedEvent } from "dpt-ui/ui/tree_view";
import type { ContentReadyEvent as ButtonContentReadyEvent, DisposingEvent as ButtonDisposingEvent, InitializedEvent as ButtonInitializedEvent, dxButtonOptions, ClickEvent, OptionChangedEvent } from "dpt-ui/ui/button";
import type { ContentReadyEvent as TextBoxContentReadyEvent, DisposingEvent as TextBoxDisposingEvent, InitializedEvent as TextBoxInitializedEvent, OptionChangedEvent as TextBoxOptionChangedEvent, ChangeEvent, CopyEvent, CutEvent, EnterKeyEvent, FocusInEvent, FocusOutEvent, InputEvent, KeyDownEvent, KeyUpEvent, PasteEvent, ValueChangedEvent } from "dpt-ui/ui/text_box";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
import type { TextEditorButton } from "dpt-ui/common";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ITreeViewOptionsNarrowedEvents<TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TKey>) => void);
    onItemCollapsed?: ((e: ItemCollapsedEvent<TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TKey>) => void);
    onItemExpanded?: ((e: ItemExpandedEvent<TKey>) => void);
    onItemHold?: ((e: ItemHoldEvent<TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TKey>) => void);
    onSelectAllValueChanged?: ((e: SelectAllValueChangedEvent<TKey>) => void);
};
type ITreeViewOptions<TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TKey>, ITreeViewOptionsNarrowedEvents<TKey>> & IHtmlOptions & {
    dataSource?: Properties<TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultItems?: Array<dxTreeViewItem>;
    onItemsChange?: (value: Array<dxTreeViewItem>) => void;
}>;
interface TreeViewRef<TKey = any> {
    instance: () => dxTreeView<TKey>;
}
declare const TreeView: <TKey = any>(props: ReplaceFieldTypes<Properties<TKey>, ITreeViewOptionsNarrowedEvents<TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<dxTreeViewItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    defaultItems?: dxTreeViewItem[] | undefined;
    onItemsChange?: ((value: Array<dxTreeViewItem>) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<TreeViewRef<TKey>> | undefined;
}) => ReactElement | null;
type IButtonProps = React.PropsWithChildren<{
    location?: "after" | "before";
    name?: string;
    options?: dxButtonOptions;
}>;
declare const _componentButton: React.MemoExoticComponent<(props: IButtonProps) => React.FunctionComponentElement<IButtonProps>>;
declare const Button: typeof _componentButton & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    disabled?: boolean;
    expanded?: boolean;
    hasItems?: boolean;
    html?: string;
    icon?: string;
    id?: number | string;
    items?: Array<dxTreeViewItem>;
    parentId?: number | string;
    selected?: boolean;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
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
export default TreeView;
export { TreeView, ITreeViewOptions, TreeViewRef, Button, IButtonProps, Item, IItemProps, Options, IOptionsProps, SearchEditorOptions, ISearchEditorOptionsProps };
import type * as TreeViewTypes from 'dpt-ui/ui/tree_view_types';
export { TreeViewTypes };
