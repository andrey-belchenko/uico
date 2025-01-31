/**
 * DevExtreme (cjs/__internal/scheduler/r1/timezone_calculator/utils.js)
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
exports.createTimeZoneCalculator = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _calculator = require("./calculator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const createTimeZoneCalculator = currentTimeZone => new _calculator.TimeZoneCalculator({
    getClientOffset: date => _m_utils_time_zone.default.getClientTimezoneOffset(date),
    tryGetCommonOffset: date => _m_utils_time_zone.default.calculateTimezoneByValue(currentTimeZone, date),
    tryGetAppointmentOffset: (date, appointmentTimezone) => _m_utils_time_zone.default.calculateTimezoneByValue(appointmentTimezone, date)
});
exports.createTimeZoneCalculator = createTimeZoneCalculator;
