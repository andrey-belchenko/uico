/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/work_week.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateUtils from "../../../../core/utils/date";
import {
    getViewStartByOptions,
    isDataOnWeekend,
    setOptionHour
} from "./base";
import {
    getValidStartDate
} from "./week";
const MONDAY_INDEX = 1;
const DAYS_IN_WEEK = 7;
export const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeek) => {
    const viewStart = getViewStartByOptions(startDate, currentDate, intervalDuration, getValidStartDate(startDate, firstDayOfWeek));
    const firstViewDate = dateUtils.getFirstWeekDate(viewStart, firstDayOfWeek);
    if (isDataOnWeekend(firstViewDate)) {
        const currentDay = firstViewDate.getDay();
        const distance = (8 - currentDay) % 7;
        firstViewDate.setDate(firstViewDate.getDate() + distance)
    }
    return setOptionHour(firstViewDate, startDayHour)
};
