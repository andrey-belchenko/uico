/**
 * DevExtreme (cjs/__internal/scheduler/r1/utils/exclude_from_recurrence.js)
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
exports.excludeFromRecurrence = void 0;
var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));
var _m_appointment_adapter = require("../../m_appointment_adapter");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const FULL_DATE_FORMAT = "yyyyMMddTHHmmss";
const UTC_FULL_DATE_FORMAT = `${FULL_DATE_FORMAT}Z`;
const getSerializedDate = (date, startDate, isAllDay) => {
    if (isAllDay) {
        date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds())
    }
    return _date_serialization.default.serializeDate(date, UTC_FULL_DATE_FORMAT)
};
const createRecurrenceException = (appointmentAdapter, exceptionDate) => {
    const result = [];
    if (appointmentAdapter.recurrenceException) {
        result.push(appointmentAdapter.recurrenceException)
    }
    result.push(getSerializedDate(exceptionDate, appointmentAdapter.startDate, appointmentAdapter.allDay));
    return result.join()
};
const excludeFromRecurrence = (appointment, exceptionDate, dataAccessors, timeZoneCalculator) => {
    const appointmentAdapter = (0, _m_appointment_adapter.createAppointmentAdapter)(_extends({}, appointment), dataAccessors, timeZoneCalculator);
    appointmentAdapter.recurrenceException = createRecurrenceException(appointmentAdapter, exceptionDate);
    return appointmentAdapter
};
exports.excludeFromRecurrence = excludeFromRecurrence;
