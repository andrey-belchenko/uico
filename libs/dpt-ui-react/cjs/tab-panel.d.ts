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

export { ExplicitTypes } from "dpt-ui/ui/tab_panel";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxTabPanel, { Properties } from "dpt-ui/ui/tab_panel";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxTabPanelItem, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemContextMenuEvent, ItemHoldEvent, ItemRenderedEvent, TitleClickEvent, TitleHoldEvent, TitleRenderedEvent } from "dpt-ui/ui/tab_panel";
import type { template } from "dpt-ui/core/templates/template";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ITabPanelOptionsNarrowedEvents<TItem = any, TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TItem, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TItem, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TItem, TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TItem, TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TItem, TKey>) => void);
    onItemHold?: ((e: ItemHoldEvent<TItem, TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TItem, TKey>) => void);
    onTitleClick?: ((e: TitleClickEvent<TItem, TKey>) => void);
    onTitleHold?: ((e: TitleHoldEvent<TItem, TKey>) => void);
    onTitleRendered?: ((e: TitleRenderedEvent<TItem, TKey>) => void);
};
type ITabPanelOptions<TItem = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TItem, TKey>, ITabPanelOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TItem, TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemTitleRender?: (...params: any) => React.ReactNode;
    itemTitleComponent?: React.ComponentType<any>;
    defaultItems?: Array<any | dxTabPanelItem | string>;
    defaultSelectedIndex?: number;
    defaultSelectedItem?: any;
    onItemsChange?: (value: Array<any | dxTabPanelItem | string>) => void;
    onSelectedIndexChange?: (value: number) => void;
    onSelectedItemChange?: (value: any) => void;
}>;
interface TabPanelRef<TItem = any, TKey = any> {
    instance: () => dxTabPanel<TItem, TKey>;
}
declare const TabPanel: <TItem = any, TKey = any>(props: ReplaceFieldTypes<Properties<TItem, TKey>, ITabPanelOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    itemTitleRender?: ((...params: any) => React.ReactNode) | undefined;
    itemTitleComponent?: React.ComponentType<any> | undefined;
    defaultItems?: any[] | undefined;
    defaultSelectedIndex?: number | undefined;
    defaultSelectedItem?: any;
    onItemsChange?: ((value: Array<any | dxTabPanelItem | string>) => void) | undefined;
    onSelectedIndexChange?: ((value: number) => void) | undefined;
    onSelectedItemChange?: ((value: any) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<TabPanelRef<TItem, TKey>> | undefined;
}) => ReactElement | null;
type IItemProps = React.PropsWithChildren<{
    badge?: string;
    disabled?: boolean;
    html?: string;
    icon?: string;
    tabTemplate?: (() => string | any) | template;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    title?: string;
    tabRender?: (...params: any) => React.ReactNode;
    tabComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
export default TabPanel;
export { TabPanel, ITabPanelOptions, TabPanelRef, Item, IItemProps };
import type * as TabPanelTypes from 'dpt-ui/ui/tab_panel_types';
export { TabPanelTypes };
