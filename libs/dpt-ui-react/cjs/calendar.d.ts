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
import dxCalendar, { Properties } from "dpt-ui/ui/calendar";
import { IHtmlOptions } from "./core/component";
import type { DisposingEvent, InitializedEvent, ValueChangedEvent } from "dpt-ui/ui/calendar";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ICalendarOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type ICalendarOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ICalendarOptionsNarrowedEvents> & IHtmlOptions & {
    cellRender?: (...params: any) => React.ReactNode;
    cellComponent?: React.ComponentType<any>;
    defaultValue?: Array<Date | number | string> | Date | number | string;
    defaultZoomLevel?: "century" | "decade" | "month" | "year";
    onValueChange?: (value: Array<Date | number | string> | Date | number | string) => void;
    onZoomLevelChange?: (value: "century" | "decade" | "month" | "year") => void;
}>;
interface CalendarRef {
    instance: () => dxCalendar;
}
declare const Calendar: (props: React.PropsWithChildren<ICalendarOptions> & {
    ref?: Ref<CalendarRef>;
}) => ReactElement | null;
export default Calendar;
export { Calendar, ICalendarOptions, CalendarRef };
import type * as CalendarTypes from 'dpt-ui/ui/calendar_types';
export { CalendarTypes };
