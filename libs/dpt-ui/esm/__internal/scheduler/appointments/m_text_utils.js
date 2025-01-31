/**
 * DevExtreme (esm/__internal/scheduler/appointments/m_text_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateUtils from "../../../core/utils/date";
import dateLocalization from "../../../localization/date";
export const createFormattedDateText = options => {
    const {
        startDate: startDate,
        endDate: endDate,
        allDay: allDay,
        format: format
    } = options;
    const formatType = format || getFormatType(startDate, endDate, allDay);
    return formatDates(startDate, endDate, formatType)
};
export const getFormatType = (startDate, endDate, isAllDay, isDateAndTimeView) => {
    if (isAllDay) {
        return "DATE"
    }
    if (isDateAndTimeView && dateUtils.sameDate(startDate, endDate)) {
        return "TIME"
    }
    return "DATETIME"
};
export const formatDates = (startDate, endDate, formatType) => {
    const isSameDate = startDate.getDate() === endDate.getDate();
    switch (formatType) {
        case "DATETIME":
            return [dateLocalization.format(startDate, "monthandday"), " ", dateLocalization.format(startDate, "shorttime"), " - ", isSameDate ? "" : `${dateLocalization.format(endDate,"monthandday")} `, dateLocalization.format(endDate, "shorttime")].join("");
        case "TIME":
            return `${dateLocalization.format(startDate,"shorttime")} - ${dateLocalization.format(endDate,"shorttime")}`;
        case "DATE":
            return `${dateLocalization.format(startDate,"monthandday")}${isSameDate?"":` - ${dateLocalization.format(endDate,"monthandday")}`}`
    }
};
