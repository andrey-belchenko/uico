/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/agenda.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    setOptionHour
} from "./base";
export const calculateStartViewDate = (currentDate, startDayHour) => {
    const validCurrentDate = new Date(currentDate);
    return setOptionHour(validCurrentDate, startDayHour)
};
