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

export { ExplicitTypes } from "dpt-ui/ui/accordion";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxAccordion, { Properties } from "dpt-ui/ui/accordion";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxAccordionItem, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemContextMenuEvent, ItemHoldEvent, ItemRenderedEvent, ItemTitleClickEvent } from "dpt-ui/ui/accordion";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IAccordionOptionsNarrowedEvents<TItem = any, TKey = any> = {
    onContentReady?: ((e: ContentReadyEvent<TItem, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TItem, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TItem, TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TItem, TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TItem, TKey>) => void);
    onItemHold?: ((e: ItemHoldEvent<TItem, TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TItem, TKey>) => void);
    onItemTitleClick?: ((e: ItemTitleClickEvent<TItem, TKey>) => void);
};
type IAccordionOptions<TItem = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TItem, TKey>, IAccordionOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TItem, TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemTitleRender?: (...params: any) => React.ReactNode;
    itemTitleComponent?: React.ComponentType<any>;
    defaultItems?: Array<any | dxAccordionItem | string>;
    defaultSelectedIndex?: number;
    defaultSelectedItem?: any;
    defaultSelectedItemKeys?: Array<any>;
    defaultSelectedItems?: Array<any>;
    onItemsChange?: (value: Array<any | dxAccordionItem | string>) => void;
    onSelectedIndexChange?: (value: number) => void;
    onSelectedItemChange?: (value: any) => void;
    onSelectedItemKeysChange?: (value: Array<any>) => void;
    onSelectedItemsChange?: (value: Array<any>) => void;
}>;
interface AccordionRef<TItem = any, TKey = any> {
    instance: () => dxAccordion<TItem, TKey>;
}
declare const Accordion: <TItem = any, TKey = any>(props: ReplaceFieldTypes<Properties<TItem, TKey>, IAccordionOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    itemTitleRender?: ((...params: any) => React.ReactNode) | undefined;
    itemTitleComponent?: React.ComponentType<any> | undefined;
    defaultItems?: any[] | undefined;
    defaultSelectedIndex?: number | undefined;
    defaultSelectedItem?: any;
    defaultSelectedItemKeys?: any[] | undefined;
    defaultSelectedItems?: any[] | undefined;
    onItemsChange?: ((value: Array<any | dxAccordionItem | string>) => void) | undefined;
    onSelectedIndexChange?: ((value: number) => void) | undefined;
    onSelectedItemChange?: ((value: any) => void) | undefined;
    onSelectedItemKeysChange?: ((value: Array<any>) => void) | undefined;
    onSelectedItemsChange?: ((value: Array<any>) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<AccordionRef<TItem, TKey>> | undefined;
}) => ReactElement | null;
type IItemProps = React.PropsWithChildren<{
    disabled?: boolean;
    html?: string;
    icon?: string;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    title?: string;
    titleTemplate?: (() => string | any) | template;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    titleRender?: (...params: any) => React.ReactNode;
    titleComponent?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
export default Accordion;
export { Accordion, IAccordionOptions, AccordionRef, Item, IItemProps };
import type * as AccordionTypes from 'dpt-ui/ui/accordion_types';
export { AccordionTypes };
