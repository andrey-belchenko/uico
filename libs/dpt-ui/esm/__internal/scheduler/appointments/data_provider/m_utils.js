/**
 * DevExtreme (esm/__internal/scheduler/appointments/data_provider/m_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateUtils from "../../../../core/utils/date";
import dateSerialization from "../../../../core/utils/date_serialization";
import {
    ExpressionUtils
} from "../../m_expression_utils";
import timeZoneUtils from "../../m_utils_time_zone";
const toMs = dateUtils.dateToMilliseconds;
const FULL_DATE_FORMAT = "yyyyMMddTHHmmss";
export const compareDateWithStartDayHour = (startDate, endDate, startDayHour, allDay, severalDays) => {
    const startTime = dateUtils.dateTimeFromDecimal(startDayHour);
    const result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
    return result
};
export const compareDateWithEndDayHour = options => {
    const {
        startDate: startDate,
        endDate: endDate,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        viewStartDayHour: viewStartDayHour,
        viewEndDayHour: viewEndDayHour,
        allDay: allDay,
        severalDays: severalDays,
        min: min,
        max: max,
        checkIntersectViewport: checkIntersectViewport
    } = options;
    const hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs("hour");
    const apptDuration = endDate.getTime() - startDate.getTime();
    const delta = (hiddenInterval - apptDuration) / toMs("hour");
    const apptStartHour = startDate.getHours();
    const apptStartMinutes = startDate.getMinutes();
    let result;
    const endTime = dateUtils.dateTimeFromDecimal(endDayHour);
    const startTime = dateUtils.dateTimeFromDecimal(startDayHour);
    const apptIntersectViewport = startDate < max && endDate > min;
    result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || 60 * endDate.getHours() + endDate.getMinutes() > 60 * startTime.hours);
    if (apptDuration < hiddenInterval) {
        if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
            result = false
        }
    }
    return result
};
export const getAppointmentTakesSeveralDays = adapter => !dateUtils.sameDate(adapter.startDate, adapter.endDate);
export const _isEndDateWrong = (startDate, endDate) => !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
export const _appointmentPartInInterval = (startDate, endDate, startDayHour, endDayHour) => {
    const apptStartDayHour = startDate.getHours();
    const apptEndDayHour = endDate.getHours();
    return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour
};
export const getRecurrenceException = (appointmentAdapter, timeZoneCalculator, timeZone) => {
    const {
        recurrenceException: recurrenceException
    } = appointmentAdapter;
    if (recurrenceException) {
        const exceptions = recurrenceException.split(",");
        for (let i = 0; i < exceptions.length; i++) {
            exceptions[i] = _convertRecurrenceException(exceptions[i], appointmentAdapter.startDate, timeZoneCalculator, timeZone)
        }
        return exceptions.join()
    }
    return recurrenceException
};
export const _convertRecurrenceException = (exceptionString, startDate, timeZoneCalculator, timeZone) => {
    exceptionString = exceptionString.replace(/\s/g, "");
    const getConvertedToTimeZone = date => timeZoneCalculator.createDate(date, {
        path: "toGrid"
    });
    const exceptionDate = dateSerialization.deserializeDate(exceptionString);
    const convertedStartDate = getConvertedToTimeZone(startDate);
    let convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
    convertedExceptionDate = timeZoneUtils.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, timeZone);
    exceptionString = dateSerialization.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
    return exceptionString
};
export const replaceWrongEndDate = (rawAppointment, startDate, endDate, appointmentDuration, dataAccessors) => {
    if (_isEndDateWrong(startDate, endDate)) {
        const isAllDay = ExpressionUtils.getField(dataAccessors, "allDay", rawAppointment);
        const calculatedEndDate = ((isAllDay, startDate) => {
            if (isAllDay) {
                return dateUtils.setToDayEnd(new Date(startDate))
            }
            return new Date(startDate.getTime() + appointmentDuration * toMs("minute"))
        })(isAllDay, startDate);
        dataAccessors.setter.endDate(rawAppointment, calculatedEndDate)
    }
};
export const sortAppointmentsByStartDate = (appointments, dataAccessors) => {
    appointments.sort(((a, b) => {
        const firstDate = new Date(ExpressionUtils.getField(dataAccessors, "startDate", a.settings || a));
        const secondDate = new Date(ExpressionUtils.getField(dataAccessors, "startDate", b.settings || b));
        return Math.sign(firstDate.getTime() - secondDate.getTime())
    }))
};
