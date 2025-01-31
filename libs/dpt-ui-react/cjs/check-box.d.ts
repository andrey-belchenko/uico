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
import dxCheckBox, { Properties } from "dpt-ui/ui/check_box";
import { IHtmlOptions } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, InitializedEvent, ValueChangedEvent } from "dpt-ui/ui/check_box";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ICheckBoxOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type ICheckBoxOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ICheckBoxOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: boolean | null;
    onValueChange?: (value: boolean | null) => void;
}>;
interface CheckBoxRef {
    instance: () => dxCheckBox;
}
declare const CheckBox: (props: React.PropsWithChildren<ICheckBoxOptions> & {
    ref?: Ref<CheckBoxRef>;
}) => ReactElement | null;
export default CheckBox;
export { CheckBox, ICheckBoxOptions, CheckBoxRef };
import type * as CheckBoxTypes from 'dpt-ui/ui/check_box_types';
export { CheckBoxTypes };
