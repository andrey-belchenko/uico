/**
 * DevExtreme (esm/__internal/scheduler/r1/timezone_calculator/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import timeZoneUtils from "../../m_utils_time_zone";
import {
    TimeZoneCalculator
} from "./calculator";
export const createTimeZoneCalculator = currentTimeZone => new TimeZoneCalculator({
    getClientOffset: date => timeZoneUtils.getClientTimezoneOffset(date),
    tryGetCommonOffset: date => timeZoneUtils.calculateTimezoneByValue(currentTimeZone, date),
    tryGetAppointmentOffset: (date, appointmentTimezone) => timeZoneUtils.calculateTimezoneByValue(appointmentTimezone, date)
});
