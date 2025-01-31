/**
 * DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator_day.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    dayUtils
} from "../../../scheduler/r1/utils/index";
import {
    ViewDataGenerator
} from "./m_view_data_generator";
export class ViewDataGeneratorDay extends ViewDataGenerator {
    _calculateStartViewDate(options) {
        return dayUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount))
    }
}
