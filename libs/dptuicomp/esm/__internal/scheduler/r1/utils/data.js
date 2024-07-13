/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/data.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import {
    isDefined
} from "../../../../core/utils/type";
import {
    replaceWrongEndDate
} from "../../appointments/data_provider/m_utils";
import {
    createAppointmentAdapter
} from "../../m_appointment_adapter";
const RECURRENCE_FREQ = "freq";
export const getPreparedDataItems = (dataItems, dataAccessors, cellDurationInMinutes, timeZoneCalculator) => {
    const result = [];
    null === dataItems || void 0 === dataItems || dataItems.forEach((rawAppointment => {
        var _recurrenceRule$match;
        const startDate = new Date(dataAccessors.getter.startDate(rawAppointment));
        const endDate = new Date(dataAccessors.getter.endDate(rawAppointment));
        replaceWrongEndDate(rawAppointment, startDate, endDate, cellDurationInMinutes, dataAccessors);
        const adapter = createAppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator);
        const comparableStartDate = adapter.startDate && adapter.calculateStartDate("toGrid");
        const comparableEndDate = adapter.endDate && adapter.calculateEndDate("toGrid");
        const regex = new RegExp("freq", "gi");
        const recurrenceRule = adapter.recurrenceRule;
        const hasRecurrenceRule = !!(null !== recurrenceRule && void 0 !== recurrenceRule && null !== (_recurrenceRule$match = recurrenceRule.match(regex)) && void 0 !== _recurrenceRule$match && _recurrenceRule$match.length);
        const visible = isDefined(rawAppointment.visible) ? !!rawAppointment.visible : true;
        if (comparableStartDate && comparableEndDate) {
            result.push({
                allDay: !!adapter.allDay,
                startDate: comparableStartDate,
                startDateTimeZone: rawAppointment.startDateTimeZone,
                endDate: comparableEndDate,
                endDateTimeZone: rawAppointment.endDateTimeZone,
                recurrenceRule: adapter.recurrenceRule,
                recurrenceException: adapter.recurrenceException,
                hasRecurrenceRule: hasRecurrenceRule,
                visible: visible,
                rawAppointment: rawAppointment
            })
        }
    }));
    return result
};
export const resolveDataItems = options => Array.isArray(options) ? options : options.data;
