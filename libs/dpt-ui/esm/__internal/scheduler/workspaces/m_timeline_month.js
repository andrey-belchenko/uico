/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_timeline_month.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from "../../../core/component_registrator";
import dateUtils from "../../../core/utils/date";
import {
    HeaderPanelComponent
} from "../../scheduler/r1/components/index";
import {
    formatWeekdayAndDay,
    monthUtils
} from "../../scheduler/r1/utils/index";
import {
    VIEWS
} from "../m_constants";
import SchedulerTimeline from "./m_timeline";
const TIMELINE_CLASS = "dx-scheduler-timeline-month";
class SchedulerTimelineMonth extends SchedulerTimeline {
    constructor() {
        super(...arguments);
        this.viewDirection = "horizontal"
    }
    get type() {
        return VIEWS.TIMELINE_MONTH
    }
    get renovatedHeaderPanelComponent() {
        return HeaderPanelComponent
    }
    _renderView() {
        super._renderView();
        this._updateScrollable()
    }
    _getElementClass() {
        return TIMELINE_CLASS
    }
    _getDateHeaderTemplate() {
        return this.option("dateCellTemplate")
    }
    _calculateDurationInCells(timeDiff) {
        return timeDiff / this.getCellDuration()
    }
    isIndicatorVisible() {
        return true
    }
    _getFormat() {
        return formatWeekdayAndDay
    }
    _getIntervalBetween(currentDate) {
        const firstViewDate = this.getStartViewDate();
        const timeZoneOffset = dateUtils.getTimezonesDifference(firstViewDate, currentDate);
        return currentDate.getTime() - (firstViewDate.getTime() - 36e5 * this.option("startDayHour")) - timeZoneOffset
    }
    _getViewStartByOptions() {
        return monthUtils.getViewStartByOptions(this.option("startDate"), this.option("currentDate"), this.option("intervalCount"), dateUtils.getFirstMonthDate(this.option("startDate")))
    }
    generateRenderOptions() {
        const options = super.generateRenderOptions(true);
        return _extends({}, options, {
            getDateForHeaderText: (_, date) => date
        })
    }
    keepOriginalHours() {
        return true
    }
}
registerComponent("dxSchedulerTimelineMonth", SchedulerTimelineMonth);
export default SchedulerTimelineMonth;
