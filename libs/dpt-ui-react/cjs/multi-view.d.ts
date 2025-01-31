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

export { ExplicitTypes } from "dpt-ui/ui/multi_view";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxMultiView, { Properties } from "dpt-ui/ui/multi_view";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxMultiViewItem, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemContextMenuEvent, ItemHoldEvent, ItemRenderedEvent } from "dpt-ui/ui/multi_view";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IMultiViewOptionsNarrowedEvents<TItem = any, TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TItem, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TItem, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TItem, TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TItem, TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TItem, TKey>) => void);
    onItemHold?: ((e: ItemHoldEvent<TItem, TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TItem, TKey>) => void);
};
type IMultiViewOptions<TItem = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TItem, TKey>, IMultiViewOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TItem, TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultItems?: Array<any | dxMultiViewItem | string>;
    defaultSelectedIndex?: number;
    defaultSelectedItem?: any;
    onItemsChange?: (value: Array<any | dxMultiViewItem | string>) => void;
    onSelectedIndexChange?: (value: number) => void;
    onSelectedItemChange?: (value: any) => void;
}>;
interface MultiViewRef<TItem = any, TKey = any> {
    instance: () => dxMultiView<TItem, TKey>;
}
declare const MultiView: <TItem = any, TKey = any>(props: ReplaceFieldTypes<Properties<TItem, TKey>, IMultiViewOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    defaultItems?: any[] | undefined;
    defaultSelectedIndex?: number | undefined;
    defaultSelectedItem?: any;
    onItemsChange?: ((value: Array<any | dxMultiViewItem | string>) => void) | undefined;
    onSelectedIndexChange?: ((value: number) => void) | undefined;
    onSelectedItemChange?: ((value: any) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<MultiViewRef<TItem, TKey>> | undefined;
}) => ReactElement | null;
type IItemProps = React.PropsWithChildren<{
    disabled?: boolean;
    html?: string;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
export default MultiView;
export { MultiView, IMultiViewOptions, MultiViewRef, Item, IItemProps };
import type * as MultiViewTypes from 'dpt-ui/ui/multi_view_types';
export { MultiViewTypes };
