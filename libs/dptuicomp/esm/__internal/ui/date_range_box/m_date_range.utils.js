/**
 * DevExtreme (esm/__internal/ui/date_range_box/m_date_range.utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import dateUtils from "../../../core/utils/date";
import dateSerialization from "../../../core/utils/date_serialization";
export const getDeserializedDate = value => dateSerialization.deserializeDate(value);
export const isSameDates = (date1, date2) => {
    if (!date1 && !date2) {
        return true
    }
    return dateUtils.sameDate(getDeserializedDate(date1), getDeserializedDate(date2))
};
export const isSameDateArrays = (value, previousValue) => {
    const [startDate, endDate] = value;
    const [previousStartDate, previousEndDate] = previousValue;
    return isSameDates(startDate, previousStartDate) && isSameDates(endDate, previousEndDate)
};
export const sortDatesArray = value => {
    const [startDate, endDate] = value;
    if (startDate && endDate && getDeserializedDate(startDate) > getDeserializedDate(endDate)) {
        return [endDate, startDate]
    }
    return value
};
export const monthDifference = (date1, date2) => 12 * (date2.getFullYear() - date1.getFullYear()) - date1.getMonth() + date2.getMonth();
