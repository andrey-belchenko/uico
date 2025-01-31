/**
 * DevExtreme (esm/__internal/scheduler/appointments/rendering_strategies/m_appointments_positioning_strategy_base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined
} from "../../../../core/utils/type";
const COLLECTOR_DEFAULT_WIDTH = 24;
const COLLECTOR_DEFAULT_OFFSET = 3;
const COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET = 22;
const APPOINTMENT_MIN_COUNT = 1;
const APPOINTMENT_DEFAULT_WIDTH = 40;
const COLLECTOR_WIDTH_IN_PERCENTS = 75;
const APPOINTMENT_INCREASED_WIDTH = 50;
class AppointmentPositioningStrategy {
    constructor(renderingStrategy) {
        this._renderingStrategy = renderingStrategy
    }
    getDropDownAppointmentWidth(intervalCount, isAllDay) {
        if (isAllDay || !isDefined(isAllDay)) {
            return 75 * this._renderingStrategy.cellWidth / 100
        }
        return 24
    }
    getCollectorTopOffset(allDay) {
        return 3
    }
    getCollectorLeftOffset() {
        return 3
    }
    getAppointmentDefaultOffset() {
        if (this._renderingStrategy._isCompactTheme()) {
            return 22
        }
        return this._renderingStrategy.appointmentOffset
    }
    getDynamicAppointmentCountPerCell() {
        const renderingStrategy = this._renderingStrategy;
        const {
            cellHeight: cellHeight
        } = renderingStrategy;
        const allDayCount = Math.floor((cellHeight - renderingStrategy._getAppointmentDefaultOffset()) / renderingStrategy._getAppointmentDefaultHeight()) || this._getAppointmentMinCount();
        if (renderingStrategy.allDaySupported()) {
            return {
                allDay: "vertical" === renderingStrategy.groupOrientation ? allDayCount : this._renderingStrategy.appointmentCountPerCell,
                simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
            }
        }
        return allDayCount
    }
    getDropDownAppointmentHeight() {
        return
    }
    _getAppointmentMinCount() {
        return 1
    }
    _calculateDynamicAppointmentCountPerCell() {
        return Math.floor(this._renderingStrategy._getAppointmentMaxWidth() / 50)
    }
    _getAppointmentDefaultWidth() {
        return 40
    }
}
export default AppointmentPositioningStrategy;
