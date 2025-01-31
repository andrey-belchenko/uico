/**
 * DevExtreme (esm/__internal/scheduler/m_data_structures.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export class AppointmentTooltipInfo {
    constructor(appointment) {
        let targetedAppointment = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
        let color = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        let settings = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
        this.appointment = appointment;
        this.targetedAppointment = targetedAppointment;
        this.color = color;
        this.settings = settings
    }
}
