/**
 * DevExtreme (esm/__internal/scheduler/header/m_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import errors from "../../../core/errors";
import dateUtils from "../../../core/utils/date";
import {
    camelize
} from "../../../core/utils/inflector";
import {
    isFunction,
    isObject
} from "../../../core/utils/type";
import dateLocalization from "../../../localization/date";
import messageLocalization from "../../../localization/message";
import {
    VIEWS
} from "../m_constants";
const DAY_FORMAT = "d";
const DAYS_IN_WORK_WEEK = 5;
const {
    correctDateWithUnitBeginning: getPeriodStart,
    getFirstWeekDate: getWeekStart,
    getLastMonthDay: getLastMonthDay,
    addDateInterval: addDateInterval
} = dateUtils;
const {
    format: formatDate
} = dateLocalization;
const MS_DURATION = {
    milliseconds: 1
};
const DAY_DURATION = {
    days: 1
};
const WEEK_DURATION = {
    days: 7
};
const SATURDAY_INDEX = 6;
const SUNDAY_INDEX = 0;
const subMS = date => addDateInterval(date, MS_DURATION, -1);
const addMS = date => addDateInterval(date, MS_DURATION, 1);
const nextDay = date => addDateInterval(date, DAY_DURATION, 1);
export const nextWeek = date => addDateInterval(date, WEEK_DURATION, 1);
const nextMonth = date => {
    const days = getLastMonthDay(date);
    return addDateInterval(date, {
        days: days
    }, 1)
};
const isWeekend = date => 6 === date.getDay() || 0 === date.getDay();
const getWorkWeekStart = firstDayOfWeek => {
    let date = new Date(firstDayOfWeek);
    while (isWeekend(date)) {
        date = nextDay(date)
    }
    return date
};
const getDateAfterWorkWeek = workWeekStart => {
    let date = new Date(workWeekStart);
    let workDaysCount = 0;
    while (workDaysCount < 5) {
        if (!isWeekend(date)) {
            workDaysCount++
        }
        date = nextDay(date)
    }
    return date
};
const nextAgendaStart = (date, agendaDuration) => addDateInterval(date, {
    days: agendaDuration
}, 1);
const getInterval = options => {
    const startDate = getIntervalStartDate(options);
    const endDate = getIntervalEndDate(startDate, options);
    return {
        startDate: startDate,
        endDate: endDate
    }
};
const getIntervalStartDate = options => {
    const {
        date: date,
        step: step,
        firstDayOfWeek: firstDayOfWeek
    } = options;
    switch (step) {
        case "day":
        case "week":
        case "month":
            return getPeriodStart(date, step, false, firstDayOfWeek);
        case "workWeek":
            const firstWeekDay = getWeekStart(date, firstDayOfWeek);
            return getWorkWeekStart(firstWeekDay);
        case "agenda":
            return new Date(date)
    }
};
const getIntervalEndDate = (startDate, options) => {
    const {
        intervalCount: intervalCount,
        step: step,
        agendaDuration: agendaDuration
    } = options;
    let periodStartDate;
    let periodEndDate;
    let nextPeriodStartDate = new Date(startDate);
    for (let i = 0; i < intervalCount; i++) {
        periodStartDate = nextPeriodStartDate;
        periodEndDate = getPeriodEndDate(periodStartDate, step, agendaDuration);
        nextPeriodStartDate = getNextPeriodStartDate(periodEndDate, step)
    }
    return periodEndDate
};
const getPeriodEndDate = (currentPeriodStartDate, step, agendaDuration) => {
    let date;
    switch (step) {
        case "day":
            date = nextDay(currentPeriodStartDate);
            break;
        case "week":
            date = nextWeek(currentPeriodStartDate);
            break;
        case "month":
            date = nextMonth(currentPeriodStartDate);
            break;
        case "workWeek":
            date = getDateAfterWorkWeek(currentPeriodStartDate);
            break;
        case "agenda":
            date = nextAgendaStart(currentPeriodStartDate, agendaDuration)
    }
    return subMS(date)
};
const getNextPeriodStartDate = (currentPeriodEndDate, step) => {
    let date = addMS(currentPeriodEndDate);
    if ("workWeek" === step) {
        while (isWeekend(date)) {
            date = nextDay(date)
        }
    }
    return date
};
export const getNextIntervalDate = (options, direction) => {
    const {
        date: date,
        step: step,
        intervalCount: intervalCount,
        agendaDuration: agendaDuration
    } = options;
    let dayDuration;
    switch (step) {
        case "day":
            dayDuration = 1 * intervalCount;
            break;
        case "week":
        case "workWeek":
            dayDuration = 7 * intervalCount;
            break;
        case "agenda":
            dayDuration = agendaDuration;
            break;
        case "month":
            return getNextMonthDate(date, intervalCount, direction)
    }
    return addDateInterval(date, {
        days: dayDuration
    }, direction)
};
const getNextMonthDate = (date, intervalCount, direction) => {
    const currentDate = date.getDate();
    const currentMonthFirstDate = new Date(new Date(date.getTime()).setDate(1));
    const thatMonthFirstDate = new Date(currentMonthFirstDate.setMonth(currentMonthFirstDate.getMonth() + intervalCount * direction));
    const thatMonthDuration = getLastMonthDay(thatMonthFirstDate);
    const minDate = currentDate < thatMonthDuration ? currentDate : thatMonthDuration;
    const currentMonthMinDate = new Date(new Date(date.getTime()).setDate(minDate));
    const thatMonthMinDate = new Date(currentMonthMinDate.setMonth(currentMonthMinDate.getMonth() + intervalCount * direction));
    return thatMonthMinDate
};
const getDateMonthFormatter = isShort => {
    const monthType = isShort ? "abbreviated" : "wide";
    const months = dateLocalization.getMonthNames(monthType);
    return date => {
        const day = formatDate(date, "day");
        const month = months[date.getMonth()];
        return `${day} ${month}`
    }
};
const formatMonthYear = date => {
    const months = dateLocalization.getMonthNames("abbreviated");
    const month = months[date.getMonth()];
    const year = formatDate(date, "year");
    return `${month} ${year}`
};
const getDateMonthYearFormatter = isShort => date => {
    const dateMonthFormat = getDateMonthFormatter(isShort);
    const dateMonth = dateMonthFormat(date);
    const year = formatDate(date, "year");
    return `${dateMonth} ${year}`
};
const getDifferentYearCaption = (startDate, endDate) => {
    const firstDateText = formatDate(startDate, getDateMonthYearFormatter(true));
    const lastDateDateText = formatDate(endDate, getDateMonthYearFormatter(true));
    return `${firstDateText}-${lastDateDateText}`
};
const getSameYearCaption = (startDate, endDate, isShort) => {
    const isDifferentMonthDates = startDate.getMonth() !== endDate.getMonth();
    const useShortFormat = isDifferentMonthDates || isShort;
    const firstDateFormat = isDifferentMonthDates ? getDateMonthFormatter(useShortFormat) : "d";
    const firstDateText = formatDate(startDate, firstDateFormat);
    const lastDateText = formatDate(endDate, getDateMonthYearFormatter(useShortFormat));
    return `${firstDateText}-${lastDateText}`
};
const getSameDateCaption = (date, step, isShort) => {
    const useShortFormat = "agenda" === step ? isShort : false;
    const dateMonthFormat = getDateMonthFormatter(useShortFormat);
    const dateMonth = dateMonthFormat(date);
    const year = formatDate(date, "year");
    return `${dateMonth} ${year}`
};
const formatCaptionByMonths = (startDate, endDate, isShort) => {
    const isDifferentYears = startDate.getFullYear() !== endDate.getFullYear();
    if (isDifferentYears) {
        return getDifferentYearCaption(startDate, endDate)
    }
    return getSameYearCaption(startDate, endDate, isShort)
};
const formatMonthViewCaption = (startDate, endDate) => {
    if (dateUtils.sameMonth(startDate, endDate)) {
        return formatDate(startDate, "monthandyear")
    }
    const isSameYear = dateUtils.sameYear(startDate, endDate);
    const firstDateText = isSameYear ? dateLocalization.getMonthNames("abbreviated")[startDate.getMonth()] : formatMonthYear(startDate);
    const lastDateText = formatMonthYear(endDate);
    return `${firstDateText}-${lastDateText}`
};
const getCaptionText = (startDate, endDate, isShort, step) => {
    if (dateUtils.sameDate(startDate, endDate)) {
        return getSameDateCaption(startDate, step, isShort)
    }
    if ("month" === step) {
        return formatMonthViewCaption(startDate, endDate)
    }
    return formatCaptionByMonths(startDate, endDate, isShort)
};
export const getCaption = (options, isShort, customizationFunction) => {
    const {
        startDate: startDate,
        endDate: endDate
    } = getInterval(options);
    let text = getCaptionText(startDate, endDate, isShort, options.step);
    if (isFunction(customizationFunction)) {
        text = customizationFunction({
            startDate: startDate,
            endDate: endDate,
            text: text
        })
    }
    return {
        startDate: startDate,
        endDate: endDate,
        text: text
    }
};
const STEP_MAP = {
    day: "day",
    week: "week",
    workWeek: "workWeek",
    month: "month",
    timelineDay: "day",
    timelineWeek: "week",
    timelineWorkWeek: "workWeek",
    timelineMonth: "month",
    agenda: "agenda"
};
export const getStep = view => STEP_MAP[getViewType(view)];
export const getViewType = view => {
    if (isObject(view) && view.type) {
        return view.type
    }
    return view
};
export const getViewName = view => {
    if (isObject(view)) {
        return view.name ? view.name : view.type
    }
    return view
};
export const getViewText = view => {
    if (view.name) {
        return view.name
    }
    const viewName = camelize(view.type || view, true);
    return messageLocalization.format(`dxScheduler-switcher${viewName}`)
};
const isValidView = view => Object.values(VIEWS).includes(view);
export const validateViews = views => {
    views.forEach((view => {
        const viewType = getViewType(view);
        if (!isValidView(viewType)) {
            errors.log("W0008", viewType)
        }
    }))
};
export const formatViews = views => {
    validateViews(views);
    return views.map((view => {
        const text = getViewText(view);
        const type = getViewType(view);
        const name = getViewName(view);
        return {
            text: text,
            name: name,
            view: {
                text: text,
                type: type,
                name: name
            }
        }
    }))
};
export const isOneView = (views, selectedView) => 1 === views.length && views[0].name === selectedView;
