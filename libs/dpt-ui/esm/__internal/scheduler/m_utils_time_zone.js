/**
 * DevExtreme (esm/__internal/scheduler/m_utils_time_zone.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import errors from "../../core/errors";
import {
    dateUtilsTs
} from "../core/utils/date";
import dateUtils from "../../core/utils/date";
import DateAdapter from "./m_date_adapter";
import timeZoneDataUtils from "./timezones/m_utils_timezones_data";
import timeZoneList from "./timezones/timezone_list";
const toMs = dateUtils.dateToMilliseconds;
const MINUTES_IN_HOUR = 60;
const MS_IN_MINUTE = 6e4;
const GMT = "GMT";
const offsetFormatRegexp = /^GMT(?:[+-]\d{2}:\d{2})?$/;
const createUTCDateWithLocalOffset = date => {
    if (!date) {
        return null
    }
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
};
const createDateFromUTCWithLocalOffset = date => {
    const result = DateAdapter(date);
    const timezoneOffsetBeforeInMin = result.getTimezoneOffset();
    result.addTime(result.getTimezoneOffset("minute"));
    result.subtractMinutes(timezoneOffsetBeforeInMin - result.getTimezoneOffset());
    return result.source
};
const getTimeZones = function() {
    let date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date;
    return timeZoneList.value.map((tz => ({
        offset: calculateTimezoneByValue(tz, date),
        title: getTimezoneTitle(tz, date),
        id: tz
    })))
};
const createUTCDate = date => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
const getTimezoneOffsetChangeInMinutes = (startDate, endDate, updatedStartDate, updatedEndDate) => getDaylightOffset(updatedStartDate, updatedEndDate) - getDaylightOffset(startDate, endDate);
const getTimezoneOffsetChangeInMs = (startDate, endDate, updatedStartDate, updatedEndDate) => getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) * toMs("minute");
const getDaylightOffset = (startDate, endDate) => new Date(startDate).getTimezoneOffset() - new Date(endDate).getTimezoneOffset();
const getDaylightOffsetInMs = (startDate, endDate) => getDaylightOffset(startDate, endDate) * toMs("minute");
const isValidDate = date => date instanceof Date && !isNaN(date.valueOf());
const calculateTimezoneByValueOld = function(timezone) {
    let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    const customTimezones = timeZoneDataUtils.getTimeZonesOld();
    if (0 === customTimezones.length) {
        return
    }
    const dateUtc = createUTCDate(date);
    return timeZoneDataUtils.getTimeZoneOffsetById(timezone, dateUtc.getTime())
};
const calculateTimezoneByValueCore = function(timeZone) {
    let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    const offset = getStringOffset(timeZone, date);
    if (void 0 === offset) {
        return
    }
    if (offset === GMT) {
        return 0
    }
    const isMinus = "-" === offset.substring(3, 4);
    const hours = offset.substring(4, 6);
    const minutes = offset.substring(7, 9);
    const result = parseInt(hours, 10) + parseInt(minutes, 10) / 60;
    return isMinus ? -result : result
};
const calculateTimezoneByValue = function(timeZone) {
    let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    if (!timeZone) {
        return
    }
    const isValidTimezone = timeZoneList.value.includes(timeZone);
    if (!isValidTimezone) {
        errors.log("W0009", timeZone);
        return
    }
    if (!isValidDate(date)) {
        return
    }
    let result = calculateTimezoneByValueOld(timeZone, date);
    if (void 0 === result) {
        result = calculateTimezoneByValueCore(timeZone, date)
    }
    return result
};
const getStringOffset = function(timeZone) {
    let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    let result = "";
    try {
        var _dateTimeFormat$forma;
        const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
            timeZone: timeZone,
            timeZoneName: "longOffset"
        });
        result = (null === (_dateTimeFormat$forma = dateTimeFormat.formatToParts(date).find((_ref => {
            let {
                type: type
            } = _ref;
            return "timeZoneName" === type
        }))) || void 0 === _dateTimeFormat$forma ? void 0 : _dateTimeFormat$forma.value) ?? ""
    } catch (e) {
        errors.log("W0009", timeZone);
        return
    }
    const isSupportedFormat = offsetFormatRegexp.test(result);
    if (!isSupportedFormat) {
        errors.log("W0009", timeZone);
        return
    }
    return result
};
const getOffsetNamePart = offset => {
    if (offset === GMT) {
        return `${offset} +00:00`
    }
    return offset.replace(GMT, `${GMT} `)
};
const getTimezoneTitle = function(timeZone) {
    let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    if (!isValidDate(date)) {
        return ""
    }
    const tzNamePart = timeZone.replace(/\//g, " - ").replace(/_/g, " ");
    const offset = getStringOffset(timeZone, date);
    if (void 0 === offset) {
        return
    }
    const offsetNamePart = getOffsetNamePart(offset);
    return `(${offsetNamePart}) ${tzNamePart}`
};
const _getDaylightOffsetByTimezone = (startDate, endDate, timeZone) => {
    const startDayOffset = calculateTimezoneByValue(timeZone, startDate);
    const endDayOffset = calculateTimezoneByValue(timeZone, endDate);
    if (void 0 === startDayOffset || void 0 === endDayOffset) {
        return 0
    }
    return startDayOffset - endDayOffset
};
const getCorrectedDateByDaylightOffsets = (convertedOriginalStartDate, convertedDate, date, timeZone, startDateTimezone) => {
    const daylightOffsetByCommonTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, timeZone);
    const daylightOffsetByAppointmentTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, startDateTimezone);
    const diff = daylightOffsetByCommonTimezone - daylightOffsetByAppointmentTimezone;
    return new Date(date.getTime() - diff * toMs("hour"))
};
const correctRecurrenceExceptionByTimezone = function(exception, exceptionByStartDate, timeZone, startDateTimeZone) {
    let isBackConversion = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
    let timezoneOffset = (exception.getTimezoneOffset() - exceptionByStartDate.getTimezoneOffset()) / 60;
    if (startDateTimeZone) {
        timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, startDateTimeZone)
    } else if (timeZone) {
        timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, timeZone)
    }
    return new Date(exception.getTime() + (isBackConversion ? -1 : 1) * timezoneOffset * toMs("hour"))
};
const isTimezoneChangeInDate = date => {
    const startDayDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    const endDayDate = new Date(new Date(date).setHours(23, 59, 59, 0));
    return startDayDate.getTimezoneOffset() - endDayDate.getTimezoneOffset() !== 0
};
const getDateWithoutTimezoneChange = date => {
    const clonedDate = new Date(date);
    if (isTimezoneChangeInDate(clonedDate)) {
        const result = new Date(clonedDate);
        return new Date(result.setDate(result.getDate() + 1))
    }
    return clonedDate
};
const isSameAppointmentDates = (startDate, endDate) => {
    endDate = new Date(endDate.getTime() - 1);
    return dateUtils.sameDate(startDate, endDate)
};
const getClientTimezoneOffset = function() {
    let date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date;
    return 6e4 * date.getTimezoneOffset()
};
const getDiffBetweenClientTimezoneOffsets = function() {
    let firstDate = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date;
    let secondDate = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    return getClientTimezoneOffset(firstDate) - getClientTimezoneOffset(secondDate)
};
const isEqualLocalTimeZone = function(timeZoneName) {
    let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date;
    if (Intl) {
        const localTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (localTimeZoneName === timeZoneName) {
            return true
        }
    }
    return isEqualLocalTimeZoneByDeclaration(timeZoneName, date)
};
const hasDSTInLocalTimeZone = () => {
    const [startDate, endDate] = getExtremeDates();
    return startDate.getTimezoneOffset() !== endDate.getTimezoneOffset()
};
const getOffset = date => -date.getTimezoneOffset() / 60;
const getDateAndMoveHourBack = dateStamp => new Date(dateStamp - toMs("hour"));
const isEqualLocalTimeZoneByDeclarationOld = (timeZoneName, date) => {
    const year = date.getFullYear();
    const configTuple = timeZoneDataUtils.getTimeZoneDeclarationTuple(timeZoneName, year);
    const [summerTime, winterTime] = configTuple;
    const noDSTInTargetTimeZone = configTuple.length < 2;
    if (noDSTInTargetTimeZone) {
        const targetTimeZoneOffset = timeZoneDataUtils.getTimeZoneOffsetById(timeZoneName, date);
        const localTimeZoneOffset = getOffset(date);
        if (targetTimeZoneOffset !== localTimeZoneOffset) {
            return false
        }
        return !hasDSTInLocalTimeZone()
    }
    const localSummerOffset = getOffset(new Date(summerTime.date));
    const localWinterOffset = getOffset(new Date(winterTime.date));
    if (localSummerOffset !== summerTime.offset) {
        return false
    }
    if (localSummerOffset === getOffset(getDateAndMoveHourBack(summerTime.date))) {
        return false
    }
    if (localWinterOffset !== winterTime.offset) {
        return false
    }
    if (localWinterOffset === getOffset(getDateAndMoveHourBack(winterTime.date))) {
        return false
    }
    return true
};
const isEqualLocalTimeZoneByDeclaration = (timeZoneName, date) => {
    const customTimezones = timeZoneDataUtils.getTimeZonesOld();
    const targetTimezoneData = customTimezones.filter((tz => tz.id === timeZoneName));
    if (1 === targetTimezoneData.length) {
        return isEqualLocalTimeZoneByDeclarationOld(timeZoneName, date)
    }
    return false
};
const getExtremeDates = () => {
    const nowDate = new Date(Date.now());
    const startDate = new Date;
    const endDate = new Date;
    startDate.setFullYear(nowDate.getFullYear(), 0, 1);
    endDate.setFullYear(nowDate.getFullYear(), 6, 1);
    return [startDate, endDate]
};
const setOffsetsToDate = (targetDate, offsetsArray) => {
    const newDateMs = offsetsArray.reduce(((result, offset) => result + offset), targetDate.getTime());
    return new Date(newDateMs)
};
const addOffsetsWithoutDST = function(date) {
    for (var _len = arguments.length, offsets = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        offsets[_key - 1] = arguments[_key]
    }
    const newDate = dateUtilsTs.addOffsets(date, offsets);
    const daylightShift = getDaylightOffsetInMs(date, newDate);
    if (!daylightShift) {
        return newDate
    }
    const correctLocalDate = dateUtilsTs.addOffsets(newDate, [-daylightShift]);
    const daylightSecondShift = getDaylightOffsetInMs(newDate, correctLocalDate);
    return !daylightSecondShift ? correctLocalDate : newDate
};
const utils = {
    getDaylightOffset: getDaylightOffset,
    getDaylightOffsetInMs: getDaylightOffsetInMs,
    getTimezoneOffsetChangeInMinutes: getTimezoneOffsetChangeInMinutes,
    getTimezoneOffsetChangeInMs: getTimezoneOffsetChangeInMs,
    calculateTimezoneByValue: calculateTimezoneByValue,
    getCorrectedDateByDaylightOffsets: getCorrectedDateByDaylightOffsets,
    isSameAppointmentDates: isSameAppointmentDates,
    correctRecurrenceExceptionByTimezone: correctRecurrenceExceptionByTimezone,
    getClientTimezoneOffset: getClientTimezoneOffset,
    getDiffBetweenClientTimezoneOffsets: getDiffBetweenClientTimezoneOffsets,
    createUTCDateWithLocalOffset: createUTCDateWithLocalOffset,
    createDateFromUTCWithLocalOffset: createDateFromUTCWithLocalOffset,
    createUTCDate: createUTCDate,
    isTimezoneChangeInDate: isTimezoneChangeInDate,
    getDateWithoutTimezoneChange: getDateWithoutTimezoneChange,
    hasDSTInLocalTimeZone: hasDSTInLocalTimeZone,
    isEqualLocalTimeZone: isEqualLocalTimeZone,
    isEqualLocalTimeZoneByDeclaration: isEqualLocalTimeZoneByDeclaration,
    getTimeZones: getTimeZones,
    setOffsetsToDate: setOffsetsToDate,
    addOffsetsWithoutDST: addOffsetsWithoutDST
};
export default utils;
