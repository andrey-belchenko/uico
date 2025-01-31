/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_work_space_day.js)
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
import SchedulerWorkSpaceVertical from "./m_work_space_vertical";
const DAY_CLASS = "dx-scheduler-work-space-day";
class SchedulerWorkSpaceDay extends SchedulerWorkSpaceVertical {
    get type() {
        return VIEWS.DAY
    }
    _getElementClass() {
        return DAY_CLASS
    }
    _renderDateHeader() {
        return 1 === this.option("intervalCount") ? null : super._renderDateHeader()
    }
    renderRHeaderPanel() {
        if (1 === this.option("intervalCount")) {
            super.renderRHeaderPanel(false)
        } else {
            super.renderRHeaderPanel(true)
        }
    }
}
registerComponent("dxSchedulerWorkSpaceDay", SchedulerWorkSpaceDay);
export default SchedulerWorkSpaceDay;
