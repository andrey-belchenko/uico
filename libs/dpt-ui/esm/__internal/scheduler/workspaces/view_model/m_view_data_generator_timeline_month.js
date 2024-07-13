/**
 * DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator_timeline_month.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateUtils from "../../../../core/utils/date";
import {
    monthUtils,
    setOptionHour,
    timelineMonthUtils
} from "../../../scheduler/r1/utils/index";
import timezoneUtils from "../../m_utils_time_zone";
import {
    ViewDataGenerator
} from "./m_view_data_generator";
const toMs = dateUtils.dateToMilliseconds;
export class ViewDataGeneratorTimelineMonth extends ViewDataGenerator {
    _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
        return monthUtils.calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount)
    }
    calculateEndDate(startDate, interval, endDayHour) {
        return setOptionHour(startDate, endDayHour)
    }
    getInterval() {
        return toMs("day")
    }
    _calculateStartViewDate(options) {
        return timelineMonthUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, options.intervalCount)
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
        return timezoneUtils.addOffsetsWithoutDST(cellStartDate, durationMs)
    }
}
