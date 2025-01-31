/**
 * DevExtreme (cjs/__internal/scheduler/workspaces/view_model/m_view_data_generator_timeline_month.js)
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
exports.ViewDataGeneratorTimelineMonth = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _index = require("../../../scheduler/r1/utils/index");
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _m_view_data_generator = require("./m_view_data_generator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const toMs = _date.default.dateToMilliseconds;
class ViewDataGeneratorTimelineMonth extends _m_view_data_generator.ViewDataGenerator {
    _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
        return _index.monthUtils.calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount)
    }
    calculateEndDate(startDate, interval, endDayHour) {
        return (0, _index.setOptionHour)(startDate, endDayHour)
    }
    getInterval() {
        return toMs("day")
    }
    _calculateStartViewDate(options) {
        return _index.timelineMonthUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, options.intervalCount)
    }
    getCellCount(options) {
        const {
            intervalCount: intervalCount
        } = options;
        const currentDate = new Date(options.currentDate);
        let cellCount = 0;
        for (let i = 1; i <= intervalCount; i++) {
            cellCount += new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate()
        }
        return cellCount
    }
    setHiddenInterval() {
        this.hiddenInterval = 0
    }
    getCellEndDate(cellStartDate, options) {
        const {
            startDayHour: startDayHour,
            endDayHour: endDayHour
        } = options;
        const durationMs = (endDayHour - startDayHour) * toMs("hour");
        return _m_utils_time_zone.default.addOffsetsWithoutDST(cellStartDate, durationMs)
    }
}
exports.ViewDataGeneratorTimelineMonth = ViewDataGeneratorTimelineMonth;
