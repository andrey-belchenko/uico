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

export { ExplicitTypes } from "dpt-ui/ui/toolbar";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxToolbar, { Properties } from "dpt-ui/ui/toolbar";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxToolbarItem, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemContextMenuEvent, ItemHoldEvent, ItemRenderedEvent } from "dpt-ui/ui/toolbar";
import type { template } from "dpt-ui/core/templates/template";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IToolbarOptionsNarrowedEvents<TItem = any, TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TItem, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TItem, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TItem, TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TItem, TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TItem, TKey>) => void);
    onItemHold?: ((e: ItemHoldEvent<TItem, TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TItem, TKey>) => void);
};
type IToolbarOptions<TItem = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TItem, TKey>, IToolbarOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TItem, TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    defaultItems?: Array<any | dxToolbarItem | string>;
    onItemsChange?: (value: Array<any | dxToolbarItem | string>) => void;
}>;
interface ToolbarRef<TItem = any, TKey = any> {
    instance: () => dxToolbar<TItem, TKey>;
}
declare const Toolbar: <TItem = any, TKey = any>(props: ReplaceFieldTypes<Properties<TItem, TKey>, IToolbarOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    menuItemRender?: ((...params: any) => React.ReactNode) | undefined;
    menuItemComponent?: React.ComponentType<any> | undefined;
    defaultItems?: any[] | undefined;
    onItemsChange?: ((value: Array<any | dxToolbarItem | string>) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<ToolbarRef<TItem, TKey>> | undefined;
}) => ReactElement | null;
type IItemProps = React.PropsWithChildren<{
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
    visible?: boolean;
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
export default Toolbar;
export { Toolbar, IToolbarOptions, ToolbarRef, Item, IItemProps };
import type * as ToolbarTypes from 'dpt-ui/ui/toolbar_types';
export { ToolbarTypes };
