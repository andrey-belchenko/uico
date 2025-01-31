/**
 * DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateUtils from "../../../../core/utils/date";
import {
    VIEWS
} from "../../m_constants";
import {
    ViewDataGenerator
} from "./m_view_data_generator";
import {
    ViewDataGeneratorDay
} from "./m_view_data_generator_day";
import {
    ViewDataGeneratorMonth
} from "./m_view_data_generator_month";
import {
    ViewDataGeneratorTimelineMonth
} from "./m_view_data_generator_timeline_month";
import {
    ViewDataGeneratorWeek
} from "./m_view_data_generator_week";
import {
    ViewDataGeneratorWorkWeek
} from "./m_view_data_generator_work_week";
const DAYS_IN_WEEK = 7;
const MS_IN_DAY = 864e5;
export const getViewDataGeneratorByViewType = viewType => {
    switch (viewType) {
        case VIEWS.MONTH:
            return new ViewDataGeneratorMonth;
        case VIEWS.TIMELINE_MONTH:
            return new ViewDataGeneratorTimelineMonth;
        case VIEWS.DAY:
        case VIEWS.TIMELINE_DAY:
            return new ViewDataGeneratorDay;
        case VIEWS.WEEK:
        case VIEWS.TIMELINE_WEEK:
            return new ViewDataGeneratorWeek;
        case VIEWS.WORK_WEEK:
        case VIEWS.TIMELINE_WORK_WEEK:
            return new ViewDataGeneratorWorkWeek;
        default:
            return new ViewDataGenerator
    }
};
export function alignToFirstDayOfWeek(date, firstDayOfWeek) {
    const newDate = new Date(date);
    let dayDiff = newDate.getDay() - firstDayOfWeek;
    if (dayDiff < 0) {
        dayDiff += DAYS_IN_WEEK
    }
    newDate.setDate(newDate.getDate() - dayDiff);
    return newDate
}
export function alignToLastDayOfWeek(date, firstDayOfWeek) {
    const newDate = alignToFirstDayOfWeek(date, firstDayOfWeek);
    newDate.setDate(newDate.getDate() + DAYS_IN_WEEK - 1);
    return newDate
}
export function calculateDaysBetweenDates(fromDate, toDate) {
    const msDiff = dateUtils.trimTime(toDate).getTime() - dateUtils.trimTime(fromDate).getTime();
    return Math.round(msDiff / MS_IN_DAY) + 1
}
export function calculateAlignedWeeksBetweenDates(fromDate, toDate, firstDayOfWeek) {
    const alignedFromDate = alignToFirstDayOfWeek(fromDate, firstDayOfWeek);
    const alignedToDate = alignToLastDayOfWeek(toDate, firstDayOfWeek);
    const weekCount = calculateDaysBetweenDates(alignedFromDate, alignedToDate) / DAYS_IN_WEEK;
    return Math.max(weekCount, 6)
}
