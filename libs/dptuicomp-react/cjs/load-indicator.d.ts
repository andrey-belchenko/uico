/*!
 * dptuicomp-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dptuicomp-react
 */

import * as React from "react";
import { Ref, ReactElement } from "react";
import dxLoadIndicator, { Properties } from "dptuicomp/ui/load_indicator";
import { IHtmlOptions } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, InitializedEvent } from "dptuicomp/ui/load_indicator";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ILoadIndicatorOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type ILoadIndicatorOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ILoadIndicatorOptionsNarrowedEvents> & IHtmlOptions>;
interface LoadIndicatorRef {
    instance: () => dxLoadIndicator;
}
declare const LoadIndicator: (props: React.PropsWithChildren<ILoadIndicatorOptions> & {
    ref?: Ref<LoadIndicatorRef>;
}) => ReactElement | null;
export default LoadIndicator;
export { LoadIndicator, ILoadIndicatorOptions, LoadIndicatorRef };
import type * as LoadIndicatorTypes from 'dptuicomp/ui/load_indicator_types';
export { LoadIndicatorTypes };
