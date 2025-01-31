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
import dxSpeedDialAction, { Properties } from "dpt-ui/ui/speed_dial_action";
import { IHtmlOptions } from "./core/component";
import type { ClickEvent, ContentReadyEvent, DisposingEvent, InitializedEvent } from "dpt-ui/ui/speed_dial_action";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ISpeedDialActionOptionsNarrowedEvents = {
    onClick?: ((e: ClickEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type ISpeedDialActionOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ISpeedDialActionOptionsNarrowedEvents> & IHtmlOptions>;
interface SpeedDialActionRef {
    instance: () => dxSpeedDialAction;
}
declare const SpeedDialAction: (props: React.PropsWithChildren<ISpeedDialActionOptions> & {
    ref?: Ref<SpeedDialActionRef>;
}) => ReactElement | null;
export default SpeedDialAction;
export { SpeedDialAction, ISpeedDialActionOptions, SpeedDialActionRef };
import type * as SpeedDialActionTypes from 'dpt-ui/ui/speed_dial_action_types';
export { SpeedDialActionTypes };
