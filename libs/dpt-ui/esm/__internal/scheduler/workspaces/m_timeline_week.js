/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_timeline_week.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import {
    getBoundingRect
} from "../../../core/utils/position";
import {
    VIEWS
} from "../m_constants";
import SchedulerTimeline from "./m_timeline";
const TIMELINE_CLASS = "dx-scheduler-timeline-week";
export default class SchedulerTimelineWeek extends SchedulerTimeline {
    get type() {
        return VIEWS.TIMELINE_WEEK
    }
    _getElementClass() {
        return TIMELINE_CLASS
    }
    _getHeaderPanelCellWidth($headerRow) {
        return getBoundingRect($headerRow.children().first().get(0)).width
    }
    _needRenderWeekHeader() {
        return true
    }
    _incrementDate(date) {
        date.setDate(date.getDate() + 1)
    }
}
registerComponent("dxSchedulerTimelineWeek", SchedulerTimelineWeek);
