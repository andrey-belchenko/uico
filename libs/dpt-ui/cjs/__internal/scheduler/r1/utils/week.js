/**
 * DevExtreme (cjs/__internal/scheduler/r1/utils/week.js)
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
exports.getValidStartDate = exports.getTimePanelCellText = exports.getIntervalDuration = exports.calculateViewStartDate = exports.calculateStartViewDate = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _date2 = _interopRequireDefault(require("../../../../localization/date"));
var _base = require("./base");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const getTimePanelCellText = (rowIndex, date, startViewDate, cellDuration, startDayHour, viewOffset) => {
    if (rowIndex % 2 !== 0) {
        return ""
    }
    const validTimeDate = (0, _base.getValidCellDateForLocalTimeFormat)(date, {
        startViewDate: startViewDate,
        startDayHour: startDayHour,
        cellIndexShift: Math.round(cellDuration) * rowIndex,
        viewOffset: viewOffset
    });
    return _date2.default.format(validTimeDate, "shorttime")
};
exports.getTimePanelCellText = getTimePanelCellText;
const getIntervalDuration = intervalCount => 7 * _date.default.dateToMilliseconds("day") * intervalCount;
exports.getIntervalDuration = getIntervalDuration;
const getValidStartDate = (startDate, firstDayOfWeek) => startDate ? _date.default.getFirstWeekDate(startDate, firstDayOfWeek) : void 0;
exports.getValidStartDate = getValidStartDate;
const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) => {
    const firstDayOfWeek = (0, _base.getCalculatedFirstDayOfWeek)(firstDayOfWeekOption);
    const viewStart = (0, _base.getViewStartByOptions)(startDate, currentDate, intervalDuration, getValidStartDate(startDate, firstDayOfWeek));
    const firstViewDate = _date.default.getFirstWeekDate(viewStart, firstDayOfWeek);
    return (0, _base.setOptionHour)(firstViewDate, startDayHour)
};
exports.calculateStartViewDate = calculateStartViewDate;
const calculateViewStartDate = (startDateOption, firstDayOfWeek) => {
    const validFirstDayOfWeek = firstDayOfWeek ?? _date2.default.firstDayOfWeekIndex();
    return _date.default.getFirstWeekDate(startDateOption, validFirstDayOfWeek)
};
exports.calculateViewStartDate = calculateViewStartDate;
