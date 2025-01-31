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
import dxDraggable, { Properties } from "dpt-ui/ui/draggable";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { DisposingEvent, DragEndEvent, DragMoveEvent, DragStartEvent, InitializedEvent } from "dpt-ui/ui/draggable";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IDraggableOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onDragEnd?: ((e: DragEndEvent) => void);
    onDragMove?: ((e: DragMoveEvent) => void);
    onDragStart?: ((e: DragStartEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type IDraggableOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IDraggableOptionsNarrowedEvents> & IHtmlOptions & {
    dragRender?: (...params: any) => React.ReactNode;
    dragComponent?: React.ComponentType<any>;
}>;
interface DraggableRef {
    instance: () => dxDraggable;
}
declare const Draggable: (props: React.PropsWithChildren<IDraggableOptions> & {
    ref?: Ref<DraggableRef>;
}) => ReactElement | null;
type ICursorOffsetProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentCursorOffset: React.MemoExoticComponent<(props: ICursorOffsetProps) => React.FunctionComponentElement<ICursorOffsetProps>>;
declare const CursorOffset: typeof _componentCursorOffset & IElementDescriptor;
export default Draggable;
export { Draggable, IDraggableOptions, DraggableRef, CursorOffset, ICursorOffsetProps };
import type * as DraggableTypes from 'dpt-ui/ui/draggable_types';
export { DraggableTypes };
