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
import dxButtonGroup, { Properties } from "dpt-ui/ui/button_group";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, InitializedEvent, ItemClickEvent } from "dpt-ui/ui/button_group";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IButtonGroupOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onItemClick?: ((e: ItemClickEvent) => void);
};
type IButtonGroupOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IButtonGroupOptionsNarrowedEvents> & IHtmlOptions & {
    buttonRender?: (...params: any) => React.ReactNode;
    buttonComponent?: React.ComponentType<any>;
    defaultSelectedItemKeys?: Array<any>;
    defaultSelectedItems?: Array<any>;
    onSelectedItemKeysChange?: (value: Array<any>) => void;
    onSelectedItemsChange?: (value: Array<any>) => void;
}>;
interface ButtonGroupRef {
    instance: () => dxButtonGroup;
}
declare const ButtonGroup: (props: React.PropsWithChildren<IButtonGroupOptions> & {
    ref?: Ref<ButtonGroupRef>;
}) => ReactElement | null;
type IItemProps = React.PropsWithChildren<{
    disabled?: boolean;
    elementAttr?: Record<string, any>;
    hint?: string;
    icon?: string;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    type?: "danger" | "default" | "normal" | "success";
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
export default ButtonGroup;
export { ButtonGroup, IButtonGroupOptions, ButtonGroupRef, Item, IItemProps };
import type * as ButtonGroupTypes from 'dpt-ui/ui/button_group_types';
export { ButtonGroupTypes };
