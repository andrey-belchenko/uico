/**
 * DevExtreme (cjs/__internal/scheduler/r1/utils/timeline_week.js)
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
exports.getDateForHeaderText = void 0;
var _base = require("./base");
const getDateForHeaderText = (index, date, _ref) => {
    let {
        startDayHour: startDayHour,
        startViewDate: startViewDate,
        cellCountInDay: cellCountInDay,
        interval: interval,
        viewOffset: viewOffset
    } = _ref;
    return (0, _base.getValidCellDateForLocalTimeFormat)(date, {
        startViewDate: startViewDate,
        startDayHour: startDayHour,
        cellIndexShift: index % cellCountInDay * interval,
        viewOffset: viewOffset
    })
};
exports.getDateForHeaderText = getDateForHeaderText;
