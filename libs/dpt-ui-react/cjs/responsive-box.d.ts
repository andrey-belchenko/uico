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

export { ExplicitTypes } from "dpt-ui/ui/responsive_box";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxResponsiveBox, { Properties } from "dpt-ui/ui/responsive_box";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxResponsiveBoxItem, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemContextMenuEvent, ItemHoldEvent, ItemRenderedEvent } from "dpt-ui/ui/responsive_box";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IResponsiveBoxOptionsNarrowedEvents<TItem = any, TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TItem, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TItem, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TItem, TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TItem, TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TItem, TKey>) => void);
    onItemHold?: ((e: ItemHoldEvent<TItem, TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TItem, TKey>) => void);
};
type IResponsiveBoxOptions<TItem = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TItem, TKey>, IResponsiveBoxOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TItem, TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultItems?: Array<any | dxResponsiveBoxItem | string>;
    onItemsChange?: (value: Array<any | dxResponsiveBoxItem | string>) => void;
}>;
interface ResponsiveBoxRef<TItem = any, TKey = any> {
    instance: () => dxResponsiveBox<TItem, TKey>;
}
declare const ResponsiveBox: <TItem = any, TKey = any>(props: ReplaceFieldTypes<Properties<TItem, TKey>, IResponsiveBoxOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    defaultItems?: any[] | undefined;
    onItemsChange?: ((value: Array<any | dxResponsiveBoxItem | string>) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<ResponsiveBoxRef<TItem, TKey>> | undefined;
}) => ReactElement | null;
type IColProps = React.PropsWithChildren<{
    baseSize?: number | string;
    ratio?: number;
    screen?: string;
    shrink?: number;
}>;
declare const _componentCol: React.MemoExoticComponent<(props: IColProps) => React.FunctionComponentElement<IColProps>>;
declare const Col: typeof _componentCol & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    disabled?: boolean;
    html?: string;
    location?: Array<Record<string, any>> | Record<string, any> | {
        col?: number;
        colspan?: number;
        row?: number;
        rowspan?: number;
        screen?: string;
    }[];
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
type ILocationProps = React.PropsWithChildren<{
    col?: number;
    colspan?: number;
    row?: number;
    rowspan?: number;
    screen?: string;
}>;
declare const _componentLocation: React.MemoExoticComponent<(props: ILocationProps) => React.FunctionComponentElement<ILocationProps>>;
declare const Location: typeof _componentLocation & IElementDescriptor;
type IRowProps = React.PropsWithChildren<{
    baseSize?: number | string;
    ratio?: number;
    screen?: string;
    shrink?: number;
}>;
declare const _componentRow: React.MemoExoticComponent<(props: IRowProps) => React.FunctionComponentElement<IRowProps>>;
declare const Row: typeof _componentRow & IElementDescriptor;
export default ResponsiveBox;
export { ResponsiveBox, IResponsiveBoxOptions, ResponsiveBoxRef, Col, IColProps, Item, IItemProps, Location, ILocationProps, Row, IRowProps };
import type * as ResponsiveBoxTypes from 'dpt-ui/ui/responsive_box_types';
export { ResponsiveBoxTypes };
