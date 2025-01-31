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
import dxRadioGroup, { Properties } from "dpt-ui/ui/radio_group";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, InitializedEvent, ValueChangedEvent } from "dpt-ui/ui/radio_group";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IRadioGroupOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type IRadioGroupOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IRadioGroupOptionsNarrowedEvents> & IHtmlOptions & {
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}>;
interface RadioGroupRef {
    instance: () => dxRadioGroup;
}
declare const RadioGroup: (props: React.PropsWithChildren<IRadioGroupOptions> & {
    ref?: Ref<RadioGroupRef>;
}) => ReactElement | null;
type IItemProps = React.PropsWithChildren<{
    disabled?: boolean;
    html?: string;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
export default RadioGroup;
export { RadioGroup, IRadioGroupOptions, RadioGroupRef, Item, IItemProps };
import type * as RadioGroupTypes from 'dpt-ui/ui/radio_group_types';
export { RadioGroupTypes };
