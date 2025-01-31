/**
 * DevExtreme (esm/__internal/scheduler/appointments/rendering_strategies/m_strategy_week.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import VerticalRenderingStrategy from "./m_strategy_vertical";
class WeekAppointmentRenderingStrategy extends VerticalRenderingStrategy {
    isApplyCompactAppointmentOffset() {
        if (this.isAdaptive && 0 === this._getMaxAppointmentCountPerCellByType()) {
            return false
        }
        return this.supportCompactDropDownAppointments()
    }
}
export default WeekAppointmentRenderingStrategy;
