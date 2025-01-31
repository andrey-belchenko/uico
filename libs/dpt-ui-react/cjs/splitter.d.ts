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

export { ExplicitTypes } from "dpt-ui/ui/splitter";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxSplitter, { Properties } from "dpt-ui/ui/splitter";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxSplitterItem, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemCollapsedEvent, ItemContextMenuEvent, ItemExpandedEvent, ItemRenderedEvent, ResizeEvent, ResizeEndEvent, ResizeStartEvent, dxSplitterOptions } from "dpt-ui/ui/splitter";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ISplitterOptionsNarrowedEvents<TItem = any, TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TItem, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TItem, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TItem, TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TItem, TKey>) => void);
    onItemCollapsed?: ((e: ItemCollapsedEvent<TItem, TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TItem, TKey>) => void);
    onItemExpanded?: ((e: ItemExpandedEvent<TItem, TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TItem, TKey>) => void);
    onResize?: ((e: ResizeEvent<TKey>) => void);
    onResizeEnd?: ((e: ResizeEndEvent<TKey>) => void);
    onResizeStart?: ((e: ResizeStartEvent<TKey>) => void);
};
type ISplitterOptions<TItem = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TItem, TKey>, ISplitterOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TItem, TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultItems?: Array<dxSplitterItem>;
    onItemsChange?: (value: Array<dxSplitterItem>) => void;
}>;
interface SplitterRef<TItem = any, TKey = any> {
    instance: () => dxSplitter<TItem, TKey>;
}
declare const Splitter: <TItem = any, TKey = any>(props: ReplaceFieldTypes<Properties<TItem, TKey>, ISplitterOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    defaultItems?: dxSplitterItem<any>[] | undefined;
    onItemsChange?: ((value: Array<dxSplitterItem>) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<SplitterRef<TItem, TKey>> | undefined;
}) => ReactElement | null;
type IItemProps = React.PropsWithChildren<{
    collapsed?: boolean;
    collapsedSize?: number | string;
    collapsible?: boolean;
    maxSize?: number | string;
    minSize?: number | string;
    resizable?: boolean;
    size?: number | string;
    splitter?: dxSplitterOptions;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
export default Splitter;
export { Splitter, ISplitterOptions, SplitterRef, Item, IItemProps };
import type * as SplitterTypes from 'dpt-ui/ui/splitter_types';
export { SplitterTypes };
