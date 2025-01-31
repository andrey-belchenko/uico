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
import dxSlider, { Properties } from "dpt-ui/ui/slider";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, InitializedEvent, ValueChangedEvent } from "dpt-ui/ui/slider";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ISliderOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type ISliderOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ISliderOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: number;
    onValueChange?: (value: number) => void;
}>;
interface SliderRef {
    instance: () => dxSlider;
}
declare const Slider: (props: React.PropsWithChildren<ISliderOptions> & {
    ref?: Ref<SliderRef>;
}) => ReactElement | null;
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
type ILabelProps = React.PropsWithChildren<{
    format?: LocalizationTypes.Format;
    position?: "bottom" | "top";
    visible?: boolean;
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
type ITooltipProps = React.PropsWithChildren<{
    enabled?: boolean;
    format?: LocalizationTypes.Format;
    position?: "bottom" | "top";
    showMode?: "always" | "onHover";
}>;
declare const _componentTooltip: React.MemoExoticComponent<(props: ITooltipProps) => React.FunctionComponentElement<ITooltipProps>>;
declare const Tooltip: typeof _componentTooltip & IElementDescriptor;
export default Slider;
export { Slider, ISliderOptions, SliderRef, Format, IFormatProps, Label, ILabelProps, Tooltip, ITooltipProps };
import type * as SliderTypes from 'dpt-ui/ui/slider_types';
export { SliderTypes };
