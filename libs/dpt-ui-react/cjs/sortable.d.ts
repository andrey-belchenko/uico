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
import dxSortable, { Properties } from "dpt-ui/ui/sortable";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { AddEvent, DisposingEvent, DragChangeEvent, DragEndEvent, DragMoveEvent, DragStartEvent, InitializedEvent, RemoveEvent, ReorderEvent } from "dpt-ui/ui/sortable";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ISortableOptionsNarrowedEvents = {
    onAdd?: ((e: AddEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onDragChange?: ((e: DragChangeEvent) => void);
    onDragEnd?: ((e: DragEndEvent) => void);
    onDragMove?: ((e: DragMoveEvent) => void);
    onDragStart?: ((e: DragStartEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onRemove?: ((e: RemoveEvent) => void);
    onReorder?: ((e: ReorderEvent) => void);
};
type ISortableOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ISortableOptionsNarrowedEvents> & IHtmlOptions & {
    dragRender?: (...params: any) => React.ReactNode;
    dragComponent?: React.ComponentType<any>;
}>;
interface SortableRef {
    instance: () => dxSortable;
}
declare const Sortable: (props: React.PropsWithChildren<ISortableOptions> & {
    ref?: Ref<SortableRef>;
}) => ReactElement | null;
type ICursorOffsetProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentCursorOffset: React.MemoExoticComponent<(props: ICursorOffsetProps) => React.FunctionComponentElement<ICursorOffsetProps>>;
declare const CursorOffset: typeof _componentCursorOffset & IElementDescriptor;
export default Sortable;
export { Sortable, ISortableOptions, SortableRef, CursorOffset, ICursorOffsetProps };
import type * as SortableTypes from 'dpt-ui/ui/sortable_types';
export { SortableTypes };
