/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/day.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getViewStartByOptions,
    setOptionHour
} from "./base";
export const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration) => {
    const firstViewDate = getViewStartByOptions(startDate, currentDate, intervalDuration, startDate);
    return setOptionHour(firstViewDate, startDayHour)
};
