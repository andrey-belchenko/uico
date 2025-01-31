/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/week.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateUtils from "../../../../core/utils/date";
import dateLocalization from "../../../../localization/date";
import {
    getCalculatedFirstDayOfWeek,
    getValidCellDateForLocalTimeFormat,
    getViewStartByOptions,
    setOptionHour
} from "./base";
export const getTimePanelCellText = (rowIndex, date, startViewDate, cellDuration, startDayHour, viewOffset) => {
    if (rowIndex % 2 !== 0) {
        return ""
    }
    const validTimeDate = getValidCellDateForLocalTimeFormat(date, {
        startViewDate: startViewDate,
        startDayHour: startDayHour,
        cellIndexShift: Math.round(cellDuration) * rowIndex,
        viewOffset: viewOffset
    });
    return dateLocalization.format(validTimeDate, "shorttime")
};
export const getIntervalDuration = intervalCount => 7 * dateUtils.dateToMilliseconds("day") * intervalCount;
export const getValidStartDate = (startDate, firstDayOfWeek) => startDate ? dateUtils.getFirstWeekDate(startDate, firstDayOfWeek) : void 0;
export const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) => {
    const firstDayOfWeek = getCalculatedFirstDayOfWeek(firstDayOfWeekOption);
    const viewStart = getViewStartByOptions(startDate, currentDate, intervalDuration, getValidStartDate(startDate, firstDayOfWeek));
    const firstViewDate = dateUtils.getFirstWeekDate(viewStart, firstDayOfWeek);
    return setOptionHour(firstViewDate, startDayHour)
};
export const calculateViewStartDate = (startDateOption, firstDayOfWeek) => {
    const validFirstDayOfWeek = firstDayOfWeek ?? dateLocalization.firstDayOfWeekIndex();
    return dateUtils.getFirstWeekDate(startDateOption, validFirstDayOfWeek)
};
