/**
 * DevExtreme (cjs/__internal/scheduler/m_recurrence.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRecurrenceProcessor = getRecurrenceProcessor;
var _errors = _interopRequireDefault(require("../../core/errors"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _iterator = require("../../core/utils/iterator");
var _rrule = require("rrule");
var _m_utils_time_zone = _interopRequireDefault(require("./m_utils_time_zone"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const toMs = _date.default.dateToMilliseconds;
const ruleNames = ["freq", "interval", "byday", "byweekno", "byyearday", "bymonth", "bymonthday", "count", "until", "byhour", "byminute", "bysecond", "bysetpos", "wkst"];
const freqNames = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "SECONDLY", "MINUTELY", "HOURLY"];
const days = {
    SU: 0,
    MO: 1,
    TU: 2,
    WE: 3,
    TH: 4,
    FR: 5,
    SA: 6
};
const loggedWarnings = [];
const MS_IN_HOUR = 36e5;
const MS_IN_DAY = 864e5;
const RRULE_BROKEN_TIMEZONES = ["Etc/GMT-13", "MIT", "Pacific/Apia", "Pacific/Enderbury", "Pacific/Tongatapu", "Etc/GMT-14", "Pacific/Kiritimati"];
let recurrence = null;

function getRecurrenceProcessor() {
    if (!recurrence) {
        recurrence = new RecurrenceProcessor
    }
    return recurrence
}
class RecurrenceProcessor {
    constructor() {
        this.rRule = null;
        this.rRuleSet = null;
        this.validator = new RecurrenceValidator
    }
    generateDates(options) {
        const recurrenceRule = this.evalRecurrenceRule(options.rule);
        const {
            rule: rule
        } = recurrenceRule;
        if (!recurrenceRule.isValid || !rule.freq) {
            return []
        }
        const rruleIntervalParams = this._createRruleIntervalParams(options);
        this._initializeRRule(options, rruleIntervalParams.startIntervalDate, rule.until);
        return this.rRuleSet.between(rruleIntervalParams.minViewDate, rruleIntervalParams.maxViewDate, true).filter((date => date.getTime() + rruleIntervalParams.appointmentDuration >= rruleIntervalParams.minViewTime)).map((date => this._convertRruleResult(rruleIntervalParams, options, date)))
    }
    _createRruleIntervalParams(options) {
        const {
            start: start,
            min: min,
            max: max,
            appointmentTimezoneOffset: appointmentTimezoneOffset
        } = options;
        const clientOffsets_startDate = _m_utils_time_zone.default.getClientTimezoneOffset(start),
            clientOffsets_minViewDate = _m_utils_time_zone.default.getClientTimezoneOffset(min),
            clientOffsets_maxViewDate = _m_utils_time_zone.default.getClientTimezoneOffset(max);
        const duration = options.end ? options.end.getTime() - options.start.getTime() : 0;
        const startIntervalDate = _m_utils_time_zone.default.setOffsetsToDate(options.start, [-clientOffsets_startDate, appointmentTimezoneOffset]);
        const minViewTime = options.min.getTime() - clientOffsets_minViewDate + appointmentTimezoneOffset;
        const minViewDate = new Date(minViewTime - duration);
        const maxViewDate = _m_utils_time_zone.default.setOffsetsToDate(options.max, [-clientOffsets_maxViewDate, appointmentTimezoneOffset]);
        const startDateDSTDifferenceMs = _m_utils_time_zone.default.getDiffBetweenClientTimezoneOffsets(options.start, startIntervalDate);
        const switchToSummerTime = startDateDSTDifferenceMs < 0;
        return {
            startIntervalDate: startIntervalDate,
            minViewTime: minViewTime,
            minViewDate: minViewDate,
            maxViewDate: maxViewDate,
            startIntervalDateDSTShift: switchToSummerTime ? 0 : startDateDSTDifferenceMs,
            appointmentDuration: duration
        }
    }
    _convertRruleResult(rruleIntervalParams, options, rruleDate) {
        const convertedBackDate = _m_utils_time_zone.default.setOffsetsToDate(rruleDate, [...this._getLocalMachineOffset(rruleDate), -options.appointmentTimezoneOffset, rruleIntervalParams.startIntervalDateDSTShift]);
        const convertedDateDSTShift = _m_utils_time_zone.default.getDiffBetweenClientTimezoneOffsets(convertedBackDate, rruleDate);
        const switchToSummerTime = convertedDateDSTShift < 0;
        const resultDate = _m_utils_time_zone.default.setOffsetsToDate(convertedBackDate, [convertedDateDSTShift]);
        const resultDateDSTShift = _m_utils_time_zone.default.getDiffBetweenClientTimezoneOffsets(resultDate, convertedBackDate);
        if (resultDateDSTShift && switchToSummerTime) {
            return new Date(resultDate.getTime() + resultDateDSTShift)
        }
        return resultDate
    }
    _getLocalMachineOffset(rruleDate) {
        const machineTimezoneOffset = _m_utils_time_zone.default.getClientTimezoneOffset(rruleDate);
        const machineTimezoneName = _date.default.getMachineTimezoneName();
        const result = [machineTimezoneOffset];
        const isTimezoneOffsetInBrokenRange = machineTimezoneOffset / 36e5 <= -13;
        const isTimezoneNameInBrokenNames = !machineTimezoneName || RRULE_BROKEN_TIMEZONES.some((timezone => machineTimezoneName.includes(timezone)));
        if (isTimezoneOffsetInBrokenRange && isTimezoneNameInBrokenNames) {
            result.push(-864e5)
        }
        return result
    }
    hasRecurrence(options) {
        return !!this.generateDates(options).length
    }
    evalRecurrenceRule(rule) {
        const result = {
            rule: {},
            isValid: false
        };
        if (rule) {
            result.rule = this._parseRecurrenceRule(rule);
            result.isValid = this.validator.validateRRule(result.rule, rule)
        }
        return result
    }
    isValidRecurrenceRule(rule) {
        return this.evalRecurrenceRule(rule).isValid
    }
    daysFromByDayRule(rule) {
        let result = [];
        if (rule.byday) {
            if (Array.isArray(rule.byday)) {
                result = rule.byday
            } else {
                result = rule.byday.split(",")
            }
        }
        return result.map((item => {
            const match = item.match(/[A-Za-z]+/);
            return !!match && match[0]
        })).filter((item => !!item))
    }
    getAsciiStringByDate(date) {
        const currentOffset = date.getTimezoneOffset() * toMs("minute");
        const offsetDate = new Date(date.getTime() + currentOffset);
        return `${offsetDate.getFullYear()+`0${offsetDate.getMonth()+1}`.slice(-2)+`0${offsetDate.getDate()}`.slice(-2)}T${`0${offsetDate.getHours()}`.slice(-2)}${`0${offsetDate.getMinutes()}`.slice(-2)}${`0${offsetDate.getSeconds()}`.slice(-2)}Z`
    }
    getRecurrenceString(object) {
        if (!object || !object.freq) {
            return
        }
        let result = "";
        for (const field in object) {
            let value = object[field];
            if ("interval" === field && value < 2) {
                continue
            }
            if ("until" === field) {
                value = this.getAsciiStringByDate(value)
            }
            result += `${field}=${value};`
        }
        result = result.substring(0, result.length - 1);
        return result.toUpperCase()
    }
    _parseExceptionToRawArray(value) {
        return value.match(/(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?(Z)?/)
    }
    getDateByAsciiString(exceptionText) {
        if ("string" !== typeof exceptionText) {
            return exceptionText
        }
        const result = this._parseExceptionToRawArray(exceptionText);
        if (!result) {
            return null
        }
        const [year, month, date, hours, minutes, seconds, isUtc] = this._createDateTuple(result);
        if (isUtc) {
            return new Date(Date.UTC(year, month, date, hours, minutes, seconds))
        }
        return new Date(year, month, date, hours, minutes, seconds)
    }
    _dispose() {
        if (this.rRuleSet) {
            delete this.rRuleSet;
            this.rRuleSet = null
        }
        if (this.rRule) {
            delete this.rRule;
            this.rRule = null
        }
    }
    _getTimeZoneOffset() {
        return (new Date).getTimezoneOffset()
    }
    _initializeRRule(options, startDateUtc, until) {
        const ruleOptions = _rrule.RRule.parseString(options.rule);
        const {
            firstDayOfWeek: firstDayOfWeek
        } = options;
        ruleOptions.dtstart = startDateUtc;
        if (!ruleOptions.wkst && firstDayOfWeek) {
            const weekDayNumbers = [6, 0, 1, 2, 3, 4, 5];
            ruleOptions.wkst = weekDayNumbers[firstDayOfWeek]
        }
        if (until) {
            ruleOptions.until = _m_utils_time_zone.default.setOffsetsToDate(until, [-_m_utils_time_zone.default.getClientTimezoneOffset(until), options.appointmentTimezoneOffset])
        }
        this._createRRule(ruleOptions);
        if (options.exception) {
            const exceptionStrings = options.exception;
            const exceptionDates = exceptionStrings.split(",").map((rule => this.getDateByAsciiString(rule)));
            exceptionDates.forEach((date => {
                if (options.getPostProcessedException) {
                    date = options.getPostProcessedException(date)
                }
                const utcDate = _m_utils_time_zone.default.setOffsetsToDate(date, [-_m_utils_time_zone.default.getClientTimezoneOffset(date), options.appointmentTimezoneOffset]);
                this.rRuleSet.exdate(utcDate)
            }))
        }
    }
    _createRRule(ruleOptions) {
        this._dispose();
        this.rRuleSet = new _rrule.RRuleSet;
        this.rRule = new _rrule.RRule(ruleOptions);
        this.rRuleSet.rrule(this.rRule)
    }
    _parseRecurrenceRule(recurrence) {
        const ruleObject = {};
        const ruleParts = recurrence.split(";");
        for (let i = 0, len = ruleParts.length; i < len; i++) {
            const rule = ruleParts[i].split("=");
            const ruleName = rule[0].toLowerCase();
            const ruleValue = rule[1];
            ruleObject[ruleName] = ruleValue
        }
        const count = parseInt(ruleObject.count);
        if (!isNaN(count)) {
            ruleObject.count = count
        }
        if (ruleObject.interval) {
            const interval = parseInt(ruleObject.interval);
            if (!isNaN(interval)) {
                ruleObject.interval = interval
            }
        } else {
            ruleObject.interval = 1
        }
        if (ruleObject.freq && ruleObject.until) {
            ruleObject.until = this.getDateByAsciiString(ruleObject.until)
        }
        return ruleObject
    }
    _createDateTuple(parseResult) {
        const isUtc = void 0 !== parseResult[8];
        parseResult.shift();
        if (void 0 === parseResult[3]) {
            parseResult.splice(3)
        } else {
            parseResult.splice(3, 1);
            parseResult.splice(6)
        }
        parseResult[1]--;
        parseResult.unshift(null);
        return [parseInt(parseResult[1]), parseInt(parseResult[2]), parseInt(parseResult[3]), parseInt(parseResult[4]) || 0, parseInt(parseResult[5]) || 0, parseInt(parseResult[6]) || 0, isUtc]
    }
}
class RecurrenceValidator {
    validateRRule(rule, recurrence) {
        if (this._brokenRuleNameExists(rule) || !freqNames.includes(rule.freq) || this._wrongCountRule(rule) || this._wrongIntervalRule(rule) || this._wrongDayOfWeek(rule) || this._wrongByMonthDayRule(rule) || this._wrongByMonth(rule) || this._wrongUntilRule(rule)) {
            this._logBrokenRule(recurrence);
            return false
        }
        return true
    }
    _wrongUntilRule(rule) {
        let wrongUntil = false;
        const {
            until: until
        } = rule;
        if (void 0 !== until && !(until instanceof Date)) {
            wrongUntil = true
        }
        return wrongUntil
    }
    _wrongCountRule(rule) {
        let wrongCount = false;
        const {
            count: count
        } = rule;
        if (count && "string" === typeof count) {
            wrongCount = true
        }
        return wrongCount
    }
    _wrongByMonthDayRule(rule) {
        let wrongByMonthDay = false;
        const byMonthDay = rule.bymonthday;
        if (byMonthDay && isNaN(parseInt(byMonthDay))) {
            wrongByMonthDay = true
        }
        return wrongByMonthDay
    }
    _wrongByMonth(rule) {
        let wrongByMonth = false;
        const byMonth = rule.bymonth;
        if (byMonth && isNaN(parseInt(byMonth))) {
            wrongByMonth = true
        }
        return wrongByMonth
    }
    _wrongIntervalRule(rule) {
        let wrongInterval = false;
        const {
            interval: interval
        } = rule;
        if (interval && "string" === typeof interval) {
            wrongInterval = true
        }
        return wrongInterval
    }
    _wrongDayOfWeek(rule) {
        const byDay = rule.byday;
        const daysByRule = getRecurrenceProcessor().daysFromByDayRule(rule);
        let brokenDaysExist = false;
        if ("" === byDay) {
            brokenDaysExist = true
        }(0, _iterator.each)(daysByRule, ((_, day) => {
            if (!Object.prototype.hasOwnProperty.call(days, day)) {
                brokenDaysExist = true;
                return false
            }
            return
        }));
        return brokenDaysExist
    }
    _brokenRuleNameExists(rule) {
        let brokenRuleExists = false;
        (0, _iterator.each)(rule, (ruleName => {
            if (!ruleNames.includes(ruleName)) {
                brokenRuleExists = true;
                return false
            }
            return
        }));
        return brokenRuleExists
    }
    _logBrokenRule(recurrence) {
        if (!loggedWarnings.includes(recurrence)) {
            _errors.default.log("W0006", recurrence);
            loggedWarnings.push(recurrence)
        }
    }
}
