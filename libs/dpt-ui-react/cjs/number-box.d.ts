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
import dxNumberBox, { Properties } from "dpt-ui/ui/number_box";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ChangeEvent, ContentReadyEvent, CopyEvent, CutEvent, DisposingEvent, EnterKeyEvent, FocusInEvent, FocusOutEvent, InitializedEvent, InputEvent, KeyDownEvent, KeyUpEvent, PasteEvent, ValueChangedEvent } from "dpt-ui/ui/number_box";
import type { ContentReadyEvent as ButtonContentReadyEvent, DisposingEvent as ButtonDisposingEvent, InitializedEvent as ButtonInitializedEvent, dxButtonOptions, ClickEvent, OptionChangedEvent } from "dpt-ui/ui/button";
import type { template } from "dpt-ui/core/templates/template";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type INumberBoxOptionsNarrowedEvents = {
    onChange?: ((e: ChangeEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onCopy?: ((e: CopyEvent) => void);
    onCut?: ((e: CutEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onEnterKey?: ((e: EnterKeyEvent) => void);
    onFocusIn?: ((e: FocusInEvent) => void);
    onFocusOut?: ((e: FocusOutEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onInput?: ((e: InputEvent) => void);
    onKeyDown?: ((e: KeyDownEvent) => void);
    onKeyUp?: ((e: KeyUpEvent) => void);
    onPaste?: ((e: PasteEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type INumberBoxOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, INumberBoxOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: number;
    onValueChange?: (value: number) => void;
}>;
interface NumberBoxRef {
    instance: () => dxNumberBox;
}
declare const NumberBox: (props: React.PropsWithChildren<INumberBoxOptions> & {
    ref?: Ref<NumberBoxRef>;
}) => ReactElement | null;
type IButtonProps = React.PropsWithChildren<{
    location?: "after" | "before";
    name?: string;
    options?: dxButtonOptions;
}>;
declare const _componentButton: React.MemoExoticComponent<(props: IButtonProps) => React.FunctionComponentElement<IButtonProps>>;
declare const Button: typeof _componentButton & IElementDescriptor;
type IFormatProps = React.PropsWithChildren<{
    currency?: string;
    formatter?: ((value: number | Date) => string);
    parser?: ((value: string) => number | Date);
    precision?: number;
    type?: "billions" | "currency" | "day" | "decimal" | "exponential" | "fixedPoint" | "largeNumber" | "longDate" | "longTime" | "millions" | "millisecond" | "month" | "monthAndDay" | "monthAndYear" | "percent" | "quarter" | "quarterAndYear" | "shortDate" | "shortTime" | "thousands" | "trillions" | "year" | "dayOfWeek" | "hour" | "longDateLongTime" | "minute" | "second" | "shortDateShortTime";
    useCurrencyAccountingStyle?: boolean;
}>;
declare const _componentFormat: React.MemoExoticComponent<(props: IFormatProps) => React.FunctionComponentElement<IFormatProps>>;
declare const Format: typeof _componentFormat & IElementDescriptor;
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
export default NumberBox;
export { NumberBox, INumberBoxOptions, NumberBoxRef, Button, IButtonProps, Format, IFormatProps, Options, IOptionsProps };
import type * as NumberBoxTypes from 'dpt-ui/ui/number_box_types';
export { NumberBoxTypes };
