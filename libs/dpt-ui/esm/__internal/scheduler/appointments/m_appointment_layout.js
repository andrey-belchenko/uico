/**
 * DevExtreme (esm/__internal/scheduler/appointments/m_appointment_layout.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../../../core/dom_adapter";
import $ from "../../../core/renderer";
import messageLocalization from "../../../localization/message";
import {
    APPOINTMENT_CONTENT_CLASSES
} from "../m_classes";
const allDayText = ` ${messageLocalization.format("dxScheduler-allDay")}: `;
export const createAppointmentLayout = (formatText, config) => {
    const result = $(domAdapter.createDocumentFragment());
    $("<div>").text(formatText.text).addClass(APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_TITLE).appendTo(result);
    if (config.html) {
        result.html(config.html)
    }
    const $contentDetails = $("<div>").addClass(APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS).appendTo(result);
    $("<div>").addClass(APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_DATE).text(formatText.formatDate).appendTo($contentDetails);
    config.isRecurrence && $("<span>").addClass(`${APPOINTMENT_CONTENT_CLASSES.RECURRING_ICON} dx-icon-repeat`).appendTo(result);
    config.isAllDay && $("<div>").text(allDayText).addClass(APPOINTMENT_CONTENT_CLASSES.ALL_DAY_CONTENT).prependTo($contentDetails);
    return result
};
export const createAgendaAppointmentLayout = (formatText, config) => {
    const result = $(domAdapter.createDocumentFragment());
    const leftLayoutContainer = $("<div>").addClass("dx-scheduler-agenda-appointment-left-layout").appendTo(result);
    const rightLayoutContainer = $("<div>").addClass("dx-scheduler-agenda-appointment-right-layout").appendTo(result);
    const marker = $("<div>").addClass(APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER).appendTo(leftLayoutContainer);
    config.isRecurrence && $("<span>").addClass(`${APPOINTMENT_CONTENT_CLASSES.RECURRING_ICON} dx-icon-repeat`).appendTo(marker);
    $("<div>").addClass(APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_TITLE).text(formatText.text).appendTo(rightLayoutContainer);
    const additionalContainer = $("<div>").addClass(APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS).appendTo(rightLayoutContainer);
    $("<div>").addClass(APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_DATE).text(formatText.formatDate).appendTo(additionalContainer);
    if (config.isAllDay) {
        $("<div>").text(allDayText).addClass(APPOINTMENT_CONTENT_CLASSES.ALL_DAY_CONTENT).prependTo(additionalContainer)
    }
    return result
};
