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
import dxResizable, { Properties } from "dpt-ui/ui/resizable";
import { IHtmlOptions } from "./core/component";
import type { DisposingEvent, InitializedEvent, ResizeEvent, ResizeEndEvent, ResizeStartEvent } from "dpt-ui/ui/resizable";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IResizableOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onResize?: ((e: ResizeEvent) => void);
    onResizeEnd?: ((e: ResizeEndEvent) => void);
    onResizeStart?: ((e: ResizeStartEvent) => void);
};
type IResizableOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IResizableOptionsNarrowedEvents> & IHtmlOptions & {
    defaultHeight?: (() => number | string) | number | string;
    defaultWidth?: (() => number | string) | number | string;
    onHeightChange?: (value: (() => number | string) | number | string) => void;
    onWidthChange?: (value: (() => number | string) | number | string) => void;
}>;
interface ResizableRef {
    instance: () => dxResizable;
}
declare const Resizable: (props: React.PropsWithChildren<IResizableOptions> & {
    ref?: Ref<ResizableRef>;
}) => ReactElement | null;
export default Resizable;
export { Resizable, IResizableOptions, ResizableRef };
import type * as ResizableTypes from 'dpt-ui/ui/resizable_types';
export { ResizableTypes };
