/**
 * DevExtreme (cjs/__internal/scheduler/r1/utils/agenda.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateStartViewDate = void 0;
var _base = require("./base");
const calculateStartViewDate = (currentDate, startDayHour) => {
    const validCurrentDate = new Date(currentDate);
    return (0, _base.setOptionHour)(validCurrentDate, startDayHour)
};
exports.calculateStartViewDate = calculateStartViewDate;
