/**
 * DevExtreme (cjs/__internal/ui/date_range_box/m_date_range.utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sortDatesArray = exports.monthDifference = exports.isSameDates = exports.isSameDateArrays = exports.getDeserializedDate = void 0;
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const getDeserializedDate = value => _date_serialization.default.deserializeDate(value);
exports.getDeserializedDate = getDeserializedDate;
const isSameDates = (date1, date2) => {
    if (!date1 && !date2) {
        return true
    }
    return _date.default.sameDate(getDeserializedDate(date1), getDeserializedDate(date2))
};
exports.isSameDates = isSameDates;
const isSameDateArrays = (value, previousValue) => {
    const [startDate, endDate] = value;
    const [previousStartDate, previousEndDate] = previousValue;
    return isSameDates(startDate, previousStartDate) && isSameDates(endDate, previousEndDate)
};
exports.isSameDateArrays = isSameDateArrays;
const sortDatesArray = value => {
    const [startDate, endDate] = value;
    if (startDate && endDate && getDeserializedDate(startDate) > getDeserializedDate(endDate)) {
        return [endDate, startDate]
    }
    return value
};
exports.sortDatesArray = sortDatesArray;
const monthDifference = (date1, date2) => 12 * (date2.getFullYear() - date1.getFullYear()) - date1.getMonth() + date2.getMonth();
exports.monthDifference = monthDifference;
