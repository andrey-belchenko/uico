/**
 * DevExtreme (cjs/__internal/scheduler/appointments/rendering_strategies/m_strategy_horizontal_month_line.js)
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
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _query = _interopRequireDefault(require("../../../../data/query"));
var _m_utils = require("../data_provider/m_utils");
var _m_strategy_horizontal = _interopRequireDefault(require("./m_strategy_horizontal"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const MILLISECONDS_IN_MINUTE = 6e4;
const ZERO_APPOINTMENT_DURATION_IN_DAYS = 1;
class HorizontalMonthLineRenderingStrategy extends _m_strategy_horizontal.default {
    calculateAppointmentWidth(_, position) {
        const {
            startDate: startDateWithTime,
            normalizedEndDate: normalizedEndDate
        } = position.info.appointment;
        const startDate = _date.default.trimTime(startDateWithTime);
        const cellWidth = this.cellWidth || this.getAppointmentMinSize();
        const duration = Math.ceil(this._getDurationInDays(startDate, normalizedEndDate));
        let width = this.cropAppointmentWidth(duration * cellWidth, cellWidth);
        if (this.isVirtualScrolling) {
            const skippedDays = this.viewDataProvider.getSkippedDaysCount(position.groupIndex, startDate, normalizedEndDate, duration);
            width -= skippedDays * cellWidth
        }
        return width
    }
    _columnCondition(a, b) {
        const conditions = this._getConditions(a, b);
        return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition
    }
    _getDurationInDays(startDate, endDate) {
        const adjustedDuration = this._adjustDurationByDaylightDiff(endDate.getTime() - startDate.getTime(), startDate, endDate);
        return adjustedDuration / _date.default.dateToMilliseconds("day") || 1
    }
    getDeltaTime(args, initialSize) {
        return 864e5 * this._getDeltaWidth(args, initialSize)
    }
    isAllDay() {
        return false
    }
    createTaskPositionMap(items, skipSorting) {
        if (!skipSorting) {
            (0, _m_utils.sortAppointmentsByStartDate)(items, this.dataAccessors)
        }
        return super.createTaskPositionMap(items)
    }
    _getSortedPositions(map, skipSorting) {
        let result = super._getSortedPositions(map);
        if (!skipSorting) {
            result = (0, _query.default)(result).sortBy("top").thenBy("left").thenBy("cellPosition").thenBy("i").toArray()
        }
        return result
    }
    needCorrectAppointmentDates() {
        return false
    }
    getPositionShift(timeShift) {
        return {
            top: 0,
            left: 0,
            cellPosition: timeShift * this.cellWidth
        }
    }
}
var _default = exports.default = HorizontalMonthLineRenderingStrategy;
