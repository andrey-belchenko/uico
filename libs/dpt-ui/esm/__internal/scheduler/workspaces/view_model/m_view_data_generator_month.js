/**
 * DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator_month.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateUtils from "../../../../core/utils/date";
import dateLocalization from "../../../../localization/date";
import {
    getToday,
    isFirstCellInMonthWithIntervalCount,
    monthUtils,
    setOptionHour
} from "../../../scheduler/r1/utils/index";
import timezoneUtils from "../../m_utils_time_zone";
import {
    calculateAlignedWeeksBetweenDates
} from "./m_utils";
import {
    ViewDataGenerator
} from "./m_view_data_generator";
const toMs = dateUtils.dateToMilliseconds;
const DAYS_IN_WEEK = 7;
export class ViewDataGeneratorMonth extends ViewDataGenerator {
    constructor() {
        super(...arguments);
        this.tableAllDay = void 0
    }
    getCellData(rowIndex, columnIndex, options, allDay) {
        const {
            indicatorTime: indicatorTime,
            timeZoneCalculator: timeZoneCalculator,
            intervalCount: intervalCount,
            viewOffset: viewOffset
        } = options;
        const data = super.getCellData(rowIndex, columnIndex, options, false);
        const startDate = timezoneUtils.addOffsetsWithoutDST(data.startDate, -viewOffset);
        data.today = this.isCurrentDate(startDate, indicatorTime, timeZoneCalculator);
        data.otherMonth = this.isOtherMonth(startDate, this._minVisibleDate, this._maxVisibleDate);
        data.firstDayOfMonth = isFirstCellInMonthWithIntervalCount(startDate, intervalCount);
        data.text = monthUtils.getCellText(startDate, intervalCount);
        return data
    }
    isCurrentDate(date, indicatorTime, timeZoneCalculator) {
        return dateUtils.sameDate(date, getToday(indicatorTime, timeZoneCalculator))
    }
    isOtherMonth(cellDate, minDate, maxDate) {
        return !dateUtils.dateInRange(cellDate, minDate, maxDate, "date")
    }
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
        return monthUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, options.intervalCount, this.getFirstDayOfWeek(options.firstDayOfWeek))
    }
    _setVisibilityDates(options) {
        const {
            intervalCount: intervalCount,
            startDate: startDate,
            currentDate: currentDate
        } = options;
        const firstMonthDate = dateUtils.getFirstMonthDate(startDate);
        const viewStart = monthUtils.getViewStartByOptions(startDate, currentDate, intervalCount, firstMonthDate);
        this._minVisibleDate = new Date(viewStart.setDate(1));
        const nextMonthDate = new Date(viewStart.setMonth(viewStart.getMonth() + intervalCount));
        this._maxVisibleDate = new Date(nextMonthDate.setDate(0))
    }
    getCellCount() {
        return 7
    }
    getRowCount(options) {
        const startDate = new Date(options.currentDate);
        startDate.setDate(1);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + options.intervalCount);
        endDate.setDate(0);
        return calculateAlignedWeeksBetweenDates(startDate, endDate, options.firstDayOfWeek ?? dateLocalization.firstDayOfWeekIndex())
    }
    getCellCountInDay() {
        return 1
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
