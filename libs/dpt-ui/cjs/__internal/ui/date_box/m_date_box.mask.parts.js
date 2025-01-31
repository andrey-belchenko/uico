/**
 * DevExtreme (cjs/__internal/ui/date_box/m_date_box.mask.parts.js)
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
exports.renderDateParts = exports.getDatePartIndexByPosition = void 0;
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _math = require("../../../core/utils/math");
var _date = require("../../../localization/ldml/date.parser");
const monthGetter = date => date.getMonth() + 1;
const monthSetter = (date, value) => {
    const day = date.getDate();
    const monthLimits = getLimits("M", date);
    const newValue = (0, _math.fitIntoRange)(parseInt(value), monthLimits.min, monthLimits.max);
    date.setMonth(newValue - 1, 1);
    const {
        min: min,
        max: max
    } = getLimits("dM", date);
    const newDay = (0, _math.fitIntoRange)(day, min, max);
    date.setDate(newDay)
};
const PATTERN_GETTERS = {
    a: date => date.getHours() < 12 ? 0 : 1,
    E: "getDay",
    y: "getFullYear",
    M: monthGetter,
    L: monthGetter,
    d: "getDate",
    H: "getHours",
    h: "getHours",
    m: "getMinutes",
    s: "getSeconds",
    S: "getMilliseconds"
};
const PATTERN_SETTERS = (0, _extend.extend)({}, (0, _date.getPatternSetters)(), {
    a: (date, value) => {
        const hours = date.getHours();
        const current = hours >= 12;
        if (current === !!parseInt(value)) {
            return
        }
        date.setHours((hours + 12) % 24)
    },
    d: (date, value) => {
        const lastDayInMonth = getLimits("dM", date).max;
        if (value > lastDayInMonth) {
            date.setMonth(date.getMonth() + 1)
        }
        date.setDate(value)
    },
    h: (date, value) => {
        const isPM = date.getHours() >= 12;
        date.setHours(+value % 12 + (isPM ? 12 : 0))
    },
    M: monthSetter,
    L: monthSetter,
    E: (date, value) => {
        if (value < 0) {
            return
        }
        date.setDate(date.getDate() - date.getDay() + parseInt(value))
    },
    y: (date, value) => {
        const currentYear = date.getFullYear();
        const valueLength = String(value).length;
        const maxLimitLength = String(getLimits("y", date).max).length;
        const newValue = parseInt(String(currentYear).substr(0, maxLimitLength - valueLength) + value);
        date.setFullYear(newValue)
    }
});
const getPatternGetter = patternChar => PATTERN_GETTERS[patternChar] || (() => patternChar);
const renderDateParts = (text, regExpInfo) => {
    const result = regExpInfo.regexp.exec(text);
    let start = 0;
    let end = 0;
    const sections = [];
    for (let i = 1; i < result.length; i++) {
        start = end;
        end = start + result[i].length;
        const pattern = regExpInfo.patterns[i - 1].replace(/^'|'$/g, "");
        const getter = getPatternGetter(pattern[0]);
        sections.push({
            index: i - 1,
            isStub: pattern === result[i],
            caret: {
                start: start,
                end: end
            },
            pattern: pattern,
            text: result[i],
            limits: function() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return getLimits(pattern[0], ...args)
            },
            setter: PATTERN_SETTERS[pattern[0]] || _common.noop,
            getter: getter
        })
    }
    return sections
};
exports.renderDateParts = renderDateParts;
const getLimits = (pattern, date, forcedPattern) => {
    const limits = {
        y: {
            min: 0,
            max: 9999
        },
        M: {
            min: 1,
            max: 12
        },
        L: {
            min: 1,
            max: 12
        },
        d: {
            min: 1,
            max: 31
        },
        dM: {
            min: 1,
            max: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        },
        E: {
            min: 0,
            max: 6
        },
        H: {
            min: 0,
            max: 23
        },
        h: {
            min: 1,
            max: 12
        },
        m: {
            min: 0,
            max: 59
        },
        s: {
            min: 0,
            max: 59
        },
        S: {
            min: 0,
            max: 999
        },
        a: {
            min: 0,
            max: 1
        }
    };
    return limits[forcedPattern || pattern] || limits.getAmPm
};
const getDatePartIndexByPosition = (dateParts, position) => {
    for (let i = 0; i < dateParts.length; i++) {
        const caretInGroup = dateParts[i].caret.end >= position;
        if (!dateParts[i].isStub && caretInGroup) {
            return i
        }
    }
    return null
};
exports.getDatePartIndexByPosition = getDatePartIndexByPosition;
