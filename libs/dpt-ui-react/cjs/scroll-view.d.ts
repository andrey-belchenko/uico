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
import dxScrollView, { Properties } from "dpt-ui/ui/scroll_view";
import { IHtmlOptions } from "./core/component";
import type { DisposingEvent, InitializedEvent, PullDownEvent, ReachBottomEvent, ScrollEvent, UpdatedEvent } from "dpt-ui/ui/scroll_view";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IScrollViewOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onPullDown?: ((e: PullDownEvent) => void);
    onReachBottom?: ((e: ReachBottomEvent) => void);
    onScroll?: ((e: ScrollEvent) => void);
    onUpdated?: ((e: UpdatedEvent) => void);
};
type IScrollViewOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IScrollViewOptionsNarrowedEvents> & IHtmlOptions>;
interface ScrollViewRef {
    instance: () => dxScrollView;
}
declare const ScrollView: (props: React.PropsWithChildren<IScrollViewOptions> & {
    ref?: Ref<ScrollViewRef>;
}) => ReactElement | null;
export default ScrollView;
export { ScrollView, IScrollViewOptions, ScrollViewRef };
import type * as ScrollViewTypes from 'dpt-ui/ui/scroll_view_types';
export { ScrollViewTypes };
