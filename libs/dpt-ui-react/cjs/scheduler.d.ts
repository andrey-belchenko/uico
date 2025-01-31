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
import dxScheduler, { Properties } from "dpt-ui/ui/scheduler";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { AppointmentAddedEvent, AppointmentAddingEvent, AppointmentClickEvent, AppointmentContextMenuEvent, AppointmentDblClickEvent, AppointmentDeletedEvent, AppointmentDeletingEvent, AppointmentFormOpeningEvent, AppointmentRenderedEvent, AppointmentTooltipShowingEvent, AppointmentUpdatedEvent, AppointmentUpdatingEvent, CellClickEvent, CellContextMenuEvent, ContentReadyEvent, DisposingEvent, InitializedEvent, AppointmentTemplateData, AppointmentTooltipTemplateData, dxSchedulerScrolling } from "dpt-ui/ui/scheduler";
import type { event } from "dpt-ui/events/index";
import type { DataSourceOptions } from "dpt-ui/data/data_source";
import type { Store } from "dpt-ui/data/store";
import type { template } from "dpt-ui/core/templates/template";
import type dxSortable from "dpt-ui/ui/sortable";
import type dxDraggable from "dpt-ui/ui/draggable";
import type DataSource from "dpt-ui/data/data_source";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ISchedulerOptionsNarrowedEvents = {
    onAppointmentAdded?: ((e: AppointmentAddedEvent) => void);
    onAppointmentAdding?: ((e: AppointmentAddingEvent) => void);
    onAppointmentClick?: ((e: AppointmentClickEvent) => void);
    onAppointmentContextMenu?: ((e: AppointmentContextMenuEvent) => void);
    onAppointmentDblClick?: ((e: AppointmentDblClickEvent) => void);
    onAppointmentDeleted?: ((e: AppointmentDeletedEvent) => void);
    onAppointmentDeleting?: ((e: AppointmentDeletingEvent) => void);
    onAppointmentFormOpening?: ((e: AppointmentFormOpeningEvent) => void);
    onAppointmentRendered?: ((e: AppointmentRenderedEvent) => void);
    onAppointmentTooltipShowing?: ((e: AppointmentTooltipShowingEvent) => void);
    onAppointmentUpdated?: ((e: AppointmentUpdatedEvent) => void);
    onAppointmentUpdating?: ((e: AppointmentUpdatingEvent) => void);
    onCellClick?: ((e: CellClickEvent) => void);
    onCellContextMenu?: ((e: CellContextMenuEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type ISchedulerOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ISchedulerOptionsNarrowedEvents> & IHtmlOptions & {
    appointmentCollectorRender?: (...params: any) => React.ReactNode;
    appointmentCollectorComponent?: React.ComponentType<any>;
    appointmentRender?: (...params: any) => React.ReactNode;
    appointmentComponent?: React.ComponentType<any>;
    appointmentTooltipRender?: (...params: any) => React.ReactNode;
    appointmentTooltipComponent?: React.ComponentType<any>;
    dataCellRender?: (...params: any) => React.ReactNode;
    dataCellComponent?: React.ComponentType<any>;
    dateCellRender?: (...params: any) => React.ReactNode;
    dateCellComponent?: React.ComponentType<any>;
    dropDownAppointmentRender?: (...params: any) => React.ReactNode;
    dropDownAppointmentComponent?: React.ComponentType<any>;
    resourceCellRender?: (...params: any) => React.ReactNode;
    resourceCellComponent?: React.ComponentType<any>;
    timeCellRender?: (...params: any) => React.ReactNode;
    timeCellComponent?: React.ComponentType<any>;
    defaultCurrentDate?: Date | number | string;
    defaultCurrentView?: "agenda" | "day" | "month" | "timelineDay" | "timelineMonth" | "timelineWeek" | "timelineWorkWeek" | "week" | "workWeek";
    onCurrentDateChange?: (value: Date | number | string) => void;
    onCurrentViewChange?: (value: "agenda" | "day" | "month" | "timelineDay" | "timelineMonth" | "timelineWeek" | "timelineWorkWeek" | "week" | "workWeek") => void;
}>;
interface SchedulerRef {
    instance: () => dxScheduler;
}
declare const Scheduler: (props: React.PropsWithChildren<ISchedulerOptions> & {
    ref?: Ref<SchedulerRef>;
}) => ReactElement | null;
type IAppointmentDraggingProps = React.PropsWithChildren<{
    autoScroll?: boolean;
    data?: any;
    group?: string;
    onAdd?: ((e: {
        component: dxScheduler;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
    }) => void);
    onDragEnd?: ((e: {
        cancel: boolean;
        component: dxScheduler;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
        toItemData: any;
    }) => void);
    onDragMove?: ((e: {
        cancel: boolean;
        component: dxScheduler;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
    }) => void);
    onDragStart?: ((e: {
        cancel: boolean;
        component: dxScheduler;
        event: event;
        fromData: any;
        itemData: any;
        itemElement: any;
    }) => void);
    onRemove?: ((e: {
        component: dxScheduler;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
    }) => void);
    scrollSensitivity?: number;
    scrollSpeed?: number;
}>;
declare const _componentAppointmentDragging: React.MemoExoticComponent<(props: IAppointmentDraggingProps) => React.FunctionComponentElement<IAppointmentDraggingProps>>;
declare const AppointmentDragging: typeof _componentAppointmentDragging & IElementDescriptor;
type IEditingProps = React.PropsWithChildren<{
    allowAdding?: boolean;
    allowDeleting?: boolean;
    allowDragging?: boolean;
    allowResizing?: boolean;
    allowTimeZoneEditing?: boolean;
    allowUpdating?: boolean;
}>;
declare const _componentEditing: React.MemoExoticComponent<(props: IEditingProps) => React.FunctionComponentElement<IEditingProps>>;
declare const Editing: typeof _componentEditing & IElementDescriptor;
type IResourceProps = React.PropsWithChildren<{
    allowMultiple?: boolean;
    colorExpr?: string;
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Store | string;
    displayExpr?: ((resource: any) => string) | string;
    fieldExpr?: string;
    label?: string;
    useColorAsDefault?: boolean;
    valueExpr?: (() => void) | string;
}>;
declare const _componentResource: React.MemoExoticComponent<(props: IResourceProps) => React.FunctionComponentElement<IResourceProps>>;
declare const Resource: typeof _componentResource & IElementDescriptor;
type IScrollingProps = React.PropsWithChildren<{
    mode?: "standard" | "virtual";
}>;
declare const _componentScrolling: React.MemoExoticComponent<(props: IScrollingProps) => React.FunctionComponentElement<IScrollingProps>>;
declare const Scrolling: typeof _componentScrolling & IElementDescriptor;
type IViewProps = React.PropsWithChildren<{
    agendaDuration?: number;
    allDayPanelMode?: "all" | "allDay" | "hidden";
    appointmentCollectorTemplate?: ((data: {
        appointmentCount: number;
        isCompact: boolean;
    }, collectorElement: any) => string | any) | template;
    appointmentTemplate?: ((model: AppointmentTemplateData | {
        appointmentData: Record<string, any>;
        targetedAppointmentData: Record<string, any>;
    }, itemIndex: number, contentElement: any) => string | any) | template;
    appointmentTooltipTemplate?: ((model: AppointmentTooltipTemplateData | {
        appointmentData: Record<string, any>;
        targetedAppointmentData: Record<string, any>;
    }, itemIndex: number, contentElement: any) => string | any) | template;
    cellDuration?: number;
    dataCellTemplate?: ((itemData: any, itemIndex: number, itemElement: any) => string | any) | template;
    dateCellTemplate?: ((itemData: any, itemIndex: number, itemElement: any) => string | any) | template;
    dropDownAppointmentTemplate?: ((itemData: any, itemIndex: number, contentElement: any) => string | any) | template;
    endDayHour?: number;
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    groupByDate?: boolean;
    groupOrientation?: "horizontal" | "vertical";
    groups?: Array<string>;
    intervalCount?: number;
    maxAppointmentsPerCell?: number | "auto" | "unlimited";
    name?: string;
    offset?: number;
    resourceCellTemplate?: ((itemData: any, itemIndex: number, itemElement: any) => string | any) | template;
    scrolling?: dxSchedulerScrolling;
    startDate?: Date | number | string;
    startDayHour?: number;
    timeCellTemplate?: ((itemData: any, itemIndex: number, itemElement: any) => string | any) | template;
    type?: "agenda" | "day" | "month" | "timelineDay" | "timelineMonth" | "timelineWeek" | "timelineWorkWeek" | "week" | "workWeek";
    appointmentCollectorRender?: (...params: any) => React.ReactNode;
    appointmentCollectorComponent?: React.ComponentType<any>;
    appointmentRender?: (...params: any) => React.ReactNode;
    appointmentComponent?: React.ComponentType<any>;
    appointmentTooltipRender?: (...params: any) => React.ReactNode;
    appointmentTooltipComponent?: React.ComponentType<any>;
    dataCellRender?: (...params: any) => React.ReactNode;
    dataCellComponent?: React.ComponentType<any>;
    dateCellRender?: (...params: any) => React.ReactNode;
    dateCellComponent?: React.ComponentType<any>;
    dropDownAppointmentRender?: (...params: any) => React.ReactNode;
    dropDownAppointmentComponent?: React.ComponentType<any>;
    resourceCellRender?: (...params: any) => React.ReactNode;
    resourceCellComponent?: React.ComponentType<any>;
    timeCellRender?: (...params: any) => React.ReactNode;
    timeCellComponent?: React.ComponentType<any>;
}>;
declare const _componentView: React.MemoExoticComponent<(props: IViewProps) => React.FunctionComponentElement<IViewProps>>;
declare const View: typeof _componentView & IElementDescriptor;
export default Scheduler;
export { Scheduler, ISchedulerOptions, SchedulerRef, AppointmentDragging, IAppointmentDraggingProps, Editing, IEditingProps, Resource, IResourceProps, Scrolling, IScrollingProps, View, IViewProps };
import type * as SchedulerTypes from 'dpt-ui/ui/scheduler_types';
export { SchedulerTypes };
