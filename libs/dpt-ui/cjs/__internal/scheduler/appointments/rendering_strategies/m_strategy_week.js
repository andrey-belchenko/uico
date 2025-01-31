/**
 * DevExtreme (cjs/__internal/scheduler/appointments/rendering_strategies/m_strategy_week.js)
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
exports.default = void 0;
var _m_strategy_vertical = _interopRequireDefault(require("./m_strategy_vertical"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class WeekAppointmentRenderingStrategy extends _m_strategy_vertical.default {
    isApplyCompactAppointmentOffset() {
        if (this.isAdaptive && 0 === this._getMaxAppointmentCountPerCellByType()) {
            return false
        }
        return this.supportCompactDropDownAppointments()
    }
}
var _default = exports.default = WeekAppointmentRenderingStrategy;
