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
import dxSwitch, { Properties } from "dpt-ui/ui/switch";
import { IHtmlOptions } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, InitializedEvent, ValueChangedEvent } from "dpt-ui/ui/switch";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ISwitchOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type ISwitchOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ISwitchOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: boolean;
    onValueChange?: (value: boolean) => void;
}>;
interface SwitchRef {
    instance: () => dxSwitch;
}
declare const Switch: (props: React.PropsWithChildren<ISwitchOptions> & {
    ref?: Ref<SwitchRef>;
}) => ReactElement | null;
export default Switch;
export { Switch, ISwitchOptions, SwitchRef };
import type * as SwitchTypes from 'dpt-ui/ui/switch_types';
export { SwitchTypes };
