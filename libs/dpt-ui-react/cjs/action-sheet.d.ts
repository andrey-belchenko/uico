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

export { ExplicitTypes } from "dpt-ui/ui/action_sheet";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxActionSheet, { Properties } from "dpt-ui/ui/action_sheet";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxActionSheetItem, CancelClickEvent, ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemContextMenuEvent, ItemHoldEvent, ItemRenderedEvent } from "dpt-ui/ui/action_sheet";
import type { NativeEventInfo } from "dpt-ui/events/index";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IActionSheetOptionsNarrowedEvents<TItem = any, TKey = any> = {
    onCancelClick?: ((e: CancelClickEvent<TItem, TKey>) => void);
    onContentReady?: ((e: ContentReadyEvent<TItem, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TItem, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TItem, TKey>) => void);
    onItemClick?: ((e: ItemClickEvent<TItem, TKey>) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent<TItem, TKey>) => void);
    onItemHold?: ((e: ItemHoldEvent<TItem, TKey>) => void);
    onItemRendered?: ((e: ItemRenderedEvent<TItem, TKey>) => void);
};
type IActionSheetOptions<TItem = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TItem, TKey>, IActionSheetOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TItem, TKey>["dataSource"];
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultItems?: Array<any | dxActionSheetItem | string>;
    defaultVisible?: boolean;
    onItemsChange?: (value: Array<any | dxActionSheetItem | string>) => void;
    onVisibleChange?: (value: boolean) => void;
}>;
interface ActionSheetRef<TItem = any, TKey = any> {
    instance: () => dxActionSheet<TItem, TKey>;
}
declare const ActionSheet: <TItem = any, TKey = any>(props: ReplaceFieldTypes<Properties<TItem, TKey>, IActionSheetOptionsNarrowedEvents<TItem, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TItem, TKey> | null | undefined;
    itemRender?: ((...params: any) => React.ReactNode) | undefined;
    itemComponent?: React.ComponentType<any> | undefined;
    defaultItems?: any[] | undefined;
    defaultVisible?: boolean | undefined;
    onItemsChange?: ((value: Array<any | dxActionSheetItem | string>) => void) | undefined;
    onVisibleChange?: ((value: boolean) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<ActionSheetRef<TItem, TKey>> | undefined;
}) => ReactElement | null;
type IItemProps = React.PropsWithChildren<{
    disabled?: boolean;
    icon?: string;
    onClick?: ((e: NativeEventInfo<any>) => void);
    stylingMode?: "text" | "outlined" | "contained";
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    type?: "danger" | "default" | "normal" | "success";
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
export default ActionSheet;
export { ActionSheet, IActionSheetOptions, ActionSheetRef, Item, IItemProps };
import type * as ActionSheetTypes from 'dpt-ui/ui/action_sheet_types';
export { ActionSheetTypes };
