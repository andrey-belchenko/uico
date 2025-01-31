/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_timeline_day.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import {
    VIEWS
} from "../m_constants";
import SchedulerTimeline from "./m_timeline";
const TIMELINE_CLASS = "dx-scheduler-timeline-day";
class SchedulerTimelineDay extends SchedulerTimeline {
    get type() {
        return VIEWS.TIMELINE_DAY
    }
    _getElementClass() {
        return TIMELINE_CLASS
    }
    _needRenderWeekHeader() {
        return this._isWorkSpaceWithCount()
    }
}
registerComponent("dxSchedulerTimelineDay", SchedulerTimelineDay);
export default SchedulerTimelineDay;
