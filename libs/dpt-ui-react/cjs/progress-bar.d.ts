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
import dxProgressBar, { Properties } from "dpt-ui/ui/progress_bar";
import { IHtmlOptions } from "./core/component";
import type { CompleteEvent, ContentReadyEvent, DisposingEvent, InitializedEvent, ValueChangedEvent } from "dpt-ui/ui/progress_bar";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IProgressBarOptionsNarrowedEvents = {
    onComplete?: ((e: CompleteEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type IProgressBarOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IProgressBarOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: false | number;
    onValueChange?: (value: false | number) => void;
}>;
interface ProgressBarRef {
    instance: () => dxProgressBar;
}
declare const ProgressBar: (props: React.PropsWithChildren<IProgressBarOptions> & {
    ref?: Ref<ProgressBarRef>;
}) => ReactElement | null;
export default ProgressBar;
export { ProgressBar, IProgressBarOptions, ProgressBarRef };
import type * as ProgressBarTypes from 'dpt-ui/ui/progress_bar_types';
export { ProgressBarTypes };
