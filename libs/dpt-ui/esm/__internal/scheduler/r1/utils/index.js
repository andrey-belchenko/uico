/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/index.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getThemeType
} from "../../../scheduler/r1/utils/themes";
import {
    calculateStartViewDate
} from "./agenda";
import {
    calculateStartViewDate as dayCalculateStartViewDate
} from "./day";
import {
    calculateCellIndex,
    calculateStartViewDate as monthCalculateStartViewDate,
    getCellText,
    getViewStartByOptions
} from "./month";
import {
    addHeightToStyle,
    addToStyles,
    addWidthToStyle,
    combineClasses,
    getCellSizeHorizontalClass,
    getCellSizeVerticalClass,
    getGroupCellClasses
} from "./render";
import {
    calculateStartViewDate as timelineMonthCalculateStartViewDate
} from "./timeline_month";
import {
    getDateForHeaderText
} from "./timeline_week";
import {
    getCurrentView
} from "./views";
import {
    calculateStartViewDate as weekCalculateStartViewDate,
    calculateViewStartDate as weekCalculateViewStartDate,
    getIntervalDuration,
    getTimePanelCellText
} from "./week";
import {
    calculateStartViewDate as workWeekCalculateStartViewDate
} from "./work_week";
export {
    calculateCellIndex,
    calculateDayDuration,
    calculateIsGroupedAllDayPanel,
    calculateViewStartDate,
    extendGroupItemsForGroupingByDate,
    getAppointmentKey,
    getAppointmentRenderingStrategyName,
    getAppointmentTakesAllDay,
    getCalculatedFirstDayOfWeek,
    getCellDuration,
    getDatesWithoutTime,
    getDisplayedCellCount,
    getDisplayedRowCount,
    getGroupCount,
    getGroupPanelData,
    getHeaderCellText,
    getHorizontalGroupCount,
    getIsGroupedAllDayPanel,
    getKeyByGroup,
    getOverflowIndicatorColor,
    getSkippedHoursInRange,
    getStartViewDateTimeOffset,
    getStartViewDateWithoutDST,
    getToday,
    getTotalCellCountByCompleteData,
    getTotalRowCountByCompleteData,
    getValidCellDateForLocalTimeFormat,
    getVerticalGroupCountClass,
    getViewStartByOptions,
    getWeekendsCount,
    hasResourceValue,
    isDataOnWeekend,
    isDateAndTimeView,
    isDateInRange,
    isFirstCellInMonthWithIntervalCount,
    isGroupingByDate,
    isHorizontalGroupingApplied,
    isHorizontalView,
    isTimelineView,
    isVerticalGroupingApplied,
    setOptionHour,
    splitNumber
}
from "./base";
export {
    getPreparedDataItems
}
from "./data";
export {
    excludeFromRecurrence
}
from "./exclude_from_recurrence";
export {
    formatWeekday,
    formatWeekdayAndDay
}
from "./format_weekday";
export const agendaUtils = {
    calculateStartViewDate: calculateStartViewDate
};
export const dayUtils = {
    calculateStartViewDate: dayCalculateStartViewDate
};
export const weekUtils = {
    getIntervalDuration: getIntervalDuration,
    getTimePanelCellText: getTimePanelCellText,
    calculateStartViewDate: weekCalculateStartViewDate,
    calculateViewStartDate: weekCalculateViewStartDate
};
export const workWeekUtils = {
    calculateStartViewDate: workWeekCalculateStartViewDate
};
export const monthUtils = {
    getViewStartByOptions: getViewStartByOptions,
    getCellText: getCellText,
    calculateCellIndex: calculateCellIndex,
    calculateStartViewDate: monthCalculateStartViewDate
};
export const timelineWeekUtils = {
    getDateForHeaderText: getDateForHeaderText
};
export const timelineMonthUtils = {
    calculateStartViewDate: timelineMonthCalculateStartViewDate
};
export const viewsUtils = {
    getCurrentView: getCurrentView
};
export const renderUtils = {
    addToStyles: addToStyles,
    addWidthToStyle: addWidthToStyle,
    addHeightToStyle: addHeightToStyle,
    getGroupCellClasses: getGroupCellClasses,
    combineClasses: combineClasses,
    getCellSizeHorizontalClass: getCellSizeHorizontalClass,
    getCellSizeVerticalClass: getCellSizeVerticalClass
};
export const themeUtils = {
    getThemeType: getThemeType
};
