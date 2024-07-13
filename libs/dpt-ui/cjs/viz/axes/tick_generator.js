/**
 * DevExtreme (cjs/viz/axes/tick_generator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.tickGenerator = void 0;
var _utils = require("../core/utils");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _type = require("../../core/utils/type");
var _math = require("../../core/utils/math");
var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const convertDateUnitToMilliseconds = _date.default.convertDateUnitToMilliseconds;
const dateToMilliseconds = _date.default.dateToMilliseconds;
const math = Math;
const mathAbs = math.abs;
const mathFloor = math.floor;
const mathCeil = math.ceil;
const mathPow = math.pow;
const NUMBER_MULTIPLIERS = [1, 2, 2.5, 5];
const LOGARITHMIC_MULTIPLIERS = [1, 2, 3, 5];
const DATETIME_MULTIPLIERS = {
    millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
    second: [1, 2, 3, 5, 10, 15, 20, 30],
    minute: [1, 2, 3, 5, 10, 15, 20, 30],
    hour: [1, 2, 3, 4, 6, 8, 12],
    day: [1, 2],
    week: [1, 2],
    month: [1, 2, 3, 6]
};
const DATETIME_MULTIPLIERS_WITH_BIG_WEEKEND = (0, _extend.extend)({}, DATETIME_MULTIPLIERS, {
    day: [1]
});
const DATETIME_MINOR_MULTIPLIERS = {
    millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
    second: [1, 2, 3, 5, 10, 15, 20, 30],
    minute: [1, 2, 3, 5, 10, 15, 20, 30],
    hour: [1, 2, 3, 4, 6, 8, 12],
    day: [1, 2, 3, 7, 14],
    month: [1, 2, 3, 6]
};
const MINOR_DELIMITERS = [2, 4, 5, 8, 10];
const VISIBILITY_DELIMITER = 3;
const MINUTE = 6e4;

function dummyGenerator(options) {
    return function(data, screenDelta, tickInterval, forceTickInterval) {
        let count = mathFloor(screenDelta / options.axisDivisionFactor);
        count = count < 1 ? 1 : count;
        const interval = screenDelta / count;
        return {
            ticks: interval > 0 ? Array.apply(null, new Array(count + 1)).map(((_, i) => interval * i)) : [],
            tickInterval: interval
        }
    }
}

function discreteGenerator(options) {
    return function(data, screenDelta, tickInterval, forceTickInterval) {
        const categories = (0, _utils.getCategoriesInfo)(data.categories, data.min, data.max).categories;
        return {
            ticks: categories,
            tickInterval: mathCeil(categories.length * options.axisDivisionFactor / screenDelta)
        }
    }
}
const getValue = value => value;
const getLogValue = (base, allowNegatives, linearThreshold) => value => (0, _utils.getLogExt)(value, base, allowNegatives, linearThreshold);
const raiseTo = (base, allowNegatives, linearThreshold) => value => (0, _utils.raiseToExt)(value, base, allowNegatives, linearThreshold);
const mathRaiseTo = base => value => (0, _utils.raiseTo)(value, base);
const logAbsValue = base => value => 0 === value ? 0 : (0, _utils.getLog)(mathAbs(value), base);
const correctValueByInterval = (post, round, getValue) => (value, interval) => (0, _math.adjust)(post(round((0, _math.adjust)(getValue(value) / interval)) * interval));

function correctMinValueByEndOnTick(floorFunc, ceilFunc, resolveEndOnTick, endOnTick) {
    if ((0, _type.isDefined)(endOnTick)) {
        return endOnTick ? floorFunc : ceilFunc
    }
    return function(value, interval, businessViewInfo, forceEndOnTick) {
        const floorTickValue = floorFunc(value, interval);
        if (value - floorTickValue === 0 || !(0, _type.isDefined)(businessViewInfo) || resolveEndOnTick(value, floorTickValue, interval, businessViewInfo) || forceEndOnTick) {
            return floorTickValue
        }
        return ceilFunc(value, interval)
    }
}

function resolveEndOnTick(curValue, tickValue, interval, businessViewInfo) {
    const prevTickDataDiff = interval - mathAbs(tickValue - curValue);
    const intervalCount = math.max(mathCeil(businessViewInfo.businessDelta / interval), 2);
    const businessRatio = businessViewInfo.screenDelta / (intervalCount * interval);
    const potentialTickScreenDiff = math.round(businessRatio * prevTickDataDiff);
    const delimiterFactor = (0, _utils.getLogExt)(businessRatio * interval / businessViewInfo.axisDivisionFactor, 2) + 1;
    const delimiterMultiplier = (businessViewInfo.isSpacedMargin ? 2 : 1) * delimiterFactor;
    const screenDelimiter = math.round(VISIBILITY_DELIMITER * delimiterMultiplier);
    return businessViewInfo.businessDelta > businessViewInfo.interval && potentialTickScreenDiff >= screenDelimiter
}

function resolveEndOnTickLog(base) {
    return function(curValue, tickValue, interval, businessViewInfo) {
        return resolveEndOnTick((0, _utils.getLogExt)(curValue, base), (0, _utils.getLogExt)(tickValue, base), interval, businessViewInfo)
    }
}

function resolveEndOnTickDate(curValue, tickValue, interval, businessViewInfo) {
    return resolveEndOnTick(curValue.valueOf(), tickValue.valueOf(), dateToMilliseconds(interval), businessViewInfo)
}

function getBusinessDelta(data, breaks) {
    let spacing = 0;
    if (breaks) {
        spacing = breaks.reduce(((prev, item) => prev + (item.to - item.from)), 0)
    }
    return mathAbs(data.max - data.min - spacing)
}

function getBusinessDeltaLog(base, allowNegatives, linearThreshold) {
    const getLog = getLogValue(base, allowNegatives, linearThreshold);
    return function(data, breaks) {
        let spacing = 0;
        if (breaks) {
            spacing = breaks.reduce(((prev, item) => prev + mathAbs(getLog(item.to / item.from))), 0)
        }
        return mathCeil(mathAbs(getLog(data.max) - getLog(data.min)) - spacing)
    }
}

function getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor, addTickCount) {
    let count = screenDelta / axisDivisionFactor - (addTickCount || 0);
    count = count < 1 ? 1 : count;
    return businessDelta / count
}

function getMultiplierFactor(interval, factorDelta) {
    return mathPow(10, mathFloor((0, _utils.getLogExt)(interval, 10)) + (factorDelta || 0))
}

function calculateTickInterval(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, addTickCount, _, minTickInterval) {
    const interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor, addTickCount);
    let result = 1;
    const onlyIntegers = false === allowDecimals;
    if (!forceTickInterval || !tickInterval) {
        if (interval >= 1 || !onlyIntegers && interval > 0) {
            result = adjustInterval(interval, multipliers, onlyIntegers)
        }
        if (!tickInterval || !forceTickInterval && tickInterval < result) {
            tickInterval = result
        }
    }
    if (!forceTickInterval && minTickInterval) {
        minTickInterval = adjustInterval(minTickInterval, multipliers, onlyIntegers);
        if (minTickInterval > tickInterval) {
            tickInterval = minTickInterval
        }
    }
    return tickInterval
}

function adjustInterval(interval, multipliers, onlyIntegers) {
    const factor = getMultiplierFactor(interval, -1);
    let result = 1;
    multipliers = multipliers || NUMBER_MULTIPLIERS;
    if (interval > 0) {
        interval /= factor;
        result = multipliers.concat(10 * multipliers[0]).map((m => 10 * m)).reduce(((r, m) => {
            if (.1 === factor && onlyIntegers && 25 === m) {
                return r
            }
            return r < interval ? m : r
        }), 0);
        result = (0, _math.adjust)(result * factor, factor)
    }
    return result
}

function calculateMinorTickInterval(businessDelta, screenDelta, tickInterval, axisDivisionFactor) {
    const interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor);
    return tickInterval || MINOR_DELIMITERS.reduce(((r, d) => {
        const cur = businessDelta / d;
        return cur >= interval ? cur : r
    }), 0)
}

function getCalculateTickIntervalLog(skipCalculationLimits) {
    return function(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, _, __, minTickInterval) {
        const interval = getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor);
        let result = 0;
        const adjustInterval = getAdjustIntervalLog(skipCalculationLimits);
        if (!forceTickInterval || !tickInterval) {
            if (interval > 0) {
                result = adjustInterval(interval, multipliers)
            }
            if (!tickInterval || !forceTickInterval && tickInterval < result) {
                tickInterval = result
            }
        }
        if (!forceTickInterval && minTickInterval) {
            minTickInterval = adjustInterval(minTickInterval, multipliers);
            if (minTickInterval > tickInterval) {
                tickInterval = minTickInterval
            }
        }
        return tickInterval
    }
}

function getAdjustIntervalLog(skipCalculationLimits) {
    return function(interval, multipliers) {
        let factor = getMultiplierFactor(interval);
        multipliers = multipliers || LOGARITHMIC_MULTIPLIERS;
        if (!skipCalculationLimits && factor < 1) {
            factor = 1
        }
        return multipliers.concat(10 * multipliers[0]).reduce(((r, m) => r < interval ? m * factor : r), 0)
    }
}

function getDataTimeMultipliers(gapSize) {
    if (gapSize && gapSize > 2) {
        return DATETIME_MULTIPLIERS_WITH_BIG_WEEKEND
    } else {
        return DATETIME_MULTIPLIERS
    }
}

function numbersReducer(interval, key) {
    return function(r, m) {
        if (!r && interval <= convertDateUnitToMilliseconds(key, m)) {
            r = {};
            r[key + "s"] = m
        }
        return r
    }
}

function yearsReducer(interval, factor) {
    return function(r, m) {
        const years = factor * m;
        if (!r && interval <= convertDateUnitToMilliseconds("year", years) && 2.5 !== years) {
            r = {
                years: years
            }
        }
        return r
    }
}

function calculateTickIntervalDateTime(businessDelta, screenDelta, tickInterval, forceTickInterval, axisDivisionFactor, multipliers, allowDecimals, addTickCount, gapSize, minTickInterval) {
    if (!forceTickInterval || !tickInterval) {
        const result = adjustIntervalDateTime(getIntervalByFactor(businessDelta, screenDelta, axisDivisionFactor), multipliers, null, gapSize);
        if (!tickInterval || !forceTickInterval && dateToMilliseconds(tickInterval) <= dateToMilliseconds(result)) {
            tickInterval = result
        }
    }
    if (!forceTickInterval && minTickInterval) {
        minTickInterval = adjustIntervalDateTime(minTickInterval, multipliers, null, gapSize);
        if (dateToMilliseconds(minTickInterval) > dateToMilliseconds(tickInterval)) {
            tickInterval = minTickInterval
        }
    }
    return tickInterval
}

function adjustIntervalDateTime(interval, multipliers, _, gapSize) {
    let result;
    multipliers = multipliers || getDataTimeMultipliers(gapSize);
    for (const key in multipliers) {
        result = multipliers[key].reduce(numbersReducer(interval, key), result);
        if (result) {
            break
        }
    }
    if (!result) {
        for (let factor = 1;; factor *= 10) {
            result = NUMBER_MULTIPLIERS.reduce(yearsReducer(interval, factor), result);
            if (result) {
                break
            }
        }
    }
    return result
}

function calculateMinorTickIntervalDateTime(businessDelta, screenDelta, tickInterval, axisDivisionFactor) {
    return calculateTickIntervalDateTime(businessDelta, screenDelta, tickInterval, true, axisDivisionFactor, DATETIME_MINOR_MULTIPLIERS)
}

function getTickIntervalByCustomTicks(getValue, postProcess) {
    return ticks => ticks ? postProcess(mathAbs((0, _math.adjust)(getValue(ticks[1]) - getValue(ticks[0])))) || void 0 : void 0
}

function addInterval(value, interval, isNegative) {
    return _date.default.addInterval(value, interval, isNegative)
}

function addIntervalLog(log, raise) {
    return (value, interval, isNegative) => raise(addInterval(log(value), interval, isNegative))
}

function addIntervalDate(value, interval, isNegative) {
    return addInterval(value, interval, isNegative)
}

function addIntervalWithBreaks(addInterval, breaks, correctValue) {
    breaks = breaks.filter((b => !b.gapSize));
    return function(value, interval, isNegative) {
        let breakSize;
        value = addInterval(value, interval, isNegative);
        if (!breaks.every((item => {
                if (value >= addInterval(item.from, interval) && addInterval(value, interval) < item.to) {
                    breakSize = item.to - item.from - 2 * (addInterval(item.from, interval) - item.from)
                }
                return !breakSize
            }))) {
            value = correctValue(addInterval(value, breakSize), interval)
        }
        return value
    }
}

function calculateTicks(addInterval, correctMinValue, adjustInterval, resolveEndOnTick) {
    return function(data, tickInterval, endOnTick, gaps, breaks, businessDelta, screenDelta, axisDivisionFactor, generateExtraTick) {
        const correctTickValue = correctTickValueOnGapSize(addInterval, gaps);
        const min = data.min;
        const max = data.max;
        const businessViewInfo = {
            screenDelta: screenDelta,
            businessDelta: businessDelta,
            axisDivisionFactor: axisDivisionFactor,
            isSpacedMargin: data.isSpacedMargin,
            interval: tickInterval
        };
        let cur = correctMinValue(min, tickInterval, businessViewInfo);
        const ticks = [];
        if (null !== breaks && void 0 !== breaks && breaks.length) {
            addInterval = addIntervalWithBreaks(addInterval, breaks, correctMinValue)
        }
        if (cur > max) {
            cur = correctMinValue(min, adjustInterval(businessDelta / 2), businessViewInfo);
            if (cur > max) {
                endOnTick = true;
                cur = correctMinValue(min, tickInterval, businessViewInfo, endOnTick)
            }
        }
        cur = correctTickValue(cur);
        let prev;
        while (cur < max && cur !== prev || generateExtraTick && cur <= max) {
            ticks.push(cur);
            prev = cur;
            cur = correctTickValue(addInterval(cur, tickInterval))
        }
        if (endOnTick || cur - max === 0 || !(0, _type.isDefined)(endOnTick) && resolveEndOnTick(max, cur, tickInterval, businessViewInfo)) {
            ticks.push(cur)
        }
        return ticks
    }
}

function calculateMinorTicks(updateTickInterval, addInterval, correctMinValue, correctTickValue, ceil) {
    return function(min, max, majorTicks, minorTickInterval, tickInterval, breaks, maxCount) {
        const factor = tickInterval / minorTickInterval;
        const lastMajor = majorTicks[majorTicks.length - 1];
        const firstMajor = majorTicks[0];
        let tickBalance = maxCount - 1;
        if (null !== breaks && void 0 !== breaks && breaks.length) {
            addInterval = addIntervalWithBreaks(addInterval, breaks, correctMinValue)
        }
        minorTickInterval = updateTickInterval(minorTickInterval, firstMajor, firstMajor, factor);
        if (0 === minorTickInterval) {
            return []
        }
        let cur = correctTickValue(correctMinValue(min, tickInterval, min), minorTickInterval);
        minorTickInterval = updateTickInterval(minorTickInterval, firstMajor, cur, factor);
        let ticks = [];
        while (cur < firstMajor && (!tickBalance || tickBalance > 0)) {
            cur >= min && ticks.push(cur);
            tickBalance--;
            cur = addInterval(cur, minorTickInterval)
        }
        const middleTicks = majorTicks.reduce(((r, tick) => {
            tickBalance = maxCount - 1;
            if (null === r.prevTick) {
                r.prevTick = tick;
                return r
            }
            minorTickInterval = updateTickInterval(minorTickInterval, tick, r.prevTick, factor);
            let cur = correctTickValue(r.prevTick, minorTickInterval);
            while (cur < tick && (!tickBalance || tickBalance > 0)) {
                cur !== r.prevTick && r.minors.push(cur);
                tickBalance--;
                cur = addInterval(cur, minorTickInterval)
            }
            r.prevTick = tick;
            return r
        }), {
            prevTick: null,
            minors: []
        });
        ticks = ticks.concat(middleTicks.minors);
        const maxValue = ceil(max, tickInterval, min);
        minorTickInterval = updateTickInterval(minorTickInterval, maxValue, maxValue, factor);
        cur = correctTickValue(lastMajor, minorTickInterval);
        let prev;
        while (cur < max && cur !== prev) {
            ticks.push(cur);
            prev = cur;
            cur = addInterval(cur, minorTickInterval)
        }
        if (lastMajor - max !== 0 && cur - max === 0) {
            ticks.push(cur)
        }
        return ticks
    }
}

function filterTicks(ticks, breaks) {
    if (breaks.length) {
        const result = breaks.reduce(((result, b) => {
            const tmpTicks = [];
            let i;
            for (i = result[1]; i < ticks.length; i++) {
                const tickValue = ticks[i];
                if (tickValue < b.from) {
                    tmpTicks.push(tickValue)
                }
                if (tickValue >= b.to) {
                    break
                }
            }
            return [result[0].concat(tmpTicks), i]
        }), [
            [], 0
        ]);
        return result[0].concat(ticks.slice(result[1]))
    }
    return ticks
}

function correctTickValueOnGapSize(addInterval, breaks) {
    return function(value) {
        let gapSize;
        if (!breaks.every((item => {
                if (value >= item.from && value < item.to) {
                    gapSize = item.gapSize
                }
                return !gapSize
            }))) {
            value = addInterval(value, gapSize)
        }
        return value
    }
}

function generator(options, getBusinessDelta, calculateTickInterval, calculateMinorTickInterval, getMajorTickIntervalByCustomTicks, getMinorTickIntervalByCustomTicks, convertTickInterval, calculateTicks, calculateMinorTicks, processScaleBreaks) {
    function correctUserTickInterval(tickInterval, businessDelta, limit) {
        if (tickInterval && businessDelta / convertTickInterval(tickInterval) >= limit + 1) {
            options.incidentOccurred("W2003");
            tickInterval = void 0
        }
        return tickInterval
    }
    return function(data, screenDelta, tickInterval, forceTickInterval, customTicks, minorTickInterval, minorTickCount, breaks) {
        customTicks = customTicks || {};
        const businessDelta = getBusinessDelta(data, breaks);
        let result = function(customTicks) {
            return {
                tickInterval: getMajorTickIntervalByCustomTicks(customTicks.majors),
                ticks: customTicks.majors || [],
                minorTickInterval: getMinorTickIntervalByCustomTicks(customTicks.minors),
                minorTicks: customTicks.minors || []
            }
        }(customTicks);
        if (!isNaN(businessDelta)) {
            if (0 === businessDelta && !customTicks.majors) {
                result.ticks = [data.min]
            } else {
                result = function(ticks, data, businessDelta, screenDelta, tickInterval, forceTickInterval, customTicks, breaks) {
                    if (customTicks.majors) {
                        ticks.breaks = breaks;
                        return ticks
                    }
                    const gaps = breaks.filter((b => b.gapSize));
                    let majorTicks;
                    tickInterval = options.skipCalculationLimits ? tickInterval : correctUserTickInterval(tickInterval, businessDelta, screenDelta);
                    tickInterval = calculateTickInterval(businessDelta, screenDelta, tickInterval, forceTickInterval, options.axisDivisionFactor, options.numberMultipliers, options.allowDecimals, breaks.length, gaps[0] && gaps[0].gapSize.days, options.minTickInterval);
                    if (!options.skipTickGeneration) {
                        majorTicks = calculateTicks(data, tickInterval, options.endOnTick, gaps, breaks, businessDelta, screenDelta, options.axisDivisionFactor, options.generateExtraTick);
                        breaks = processScaleBreaks(breaks, majorTicks, tickInterval);
                        majorTicks = filterTicks(majorTicks, breaks);
                        ticks.breaks = breaks;
                        ticks.ticks = ticks.ticks.concat(majorTicks)
                    }
                    ticks.tickInterval = tickInterval;
                    return ticks
                }(result, data, businessDelta, screenDelta, tickInterval, forceTickInterval, customTicks, breaks || []);
                if (!options.skipTickGeneration && businessDelta > 0) {
                    result = function(ticks, data, businessDelta, screenDelta, minorTickInterval, minorTickCount, customTicks) {
                        if (!options.calculateMinors) {
                            return ticks
                        }
                        if (customTicks.minors) {
                            return ticks
                        }
                        const minorBusinessDelta = convertTickInterval(ticks.tickInterval);
                        const minorScreenDelta = screenDelta * minorBusinessDelta / businessDelta;
                        const breaks = ticks.breaks;
                        if (!minorTickInterval && minorTickCount) {
                            minorTickInterval = getMinorTickIntervalByCustomTicks([minorBusinessDelta / (minorTickCount + 1), minorBusinessDelta / (minorTickCount + 1) * 2])
                        } else {
                            minorTickCount = void 0
                        }
                        minorTickInterval = correctUserTickInterval(minorTickInterval, minorBusinessDelta, minorScreenDelta);
                        minorTickInterval = calculateMinorTickInterval(minorBusinessDelta, minorScreenDelta, minorTickInterval, options.minorAxisDivisionFactor);
                        ticks.minorTicks = filterTicks(ticks.minorTicks.concat(calculateMinorTicks(data.min, data.max, ticks.ticks, minorTickInterval, ticks.tickInterval, breaks, minorTickCount)), breaks);
                        ticks.minorTickInterval = minorTickInterval;
                        return ticks
                    }(result, data, businessDelta, screenDelta, minorTickInterval, minorTickCount, customTicks)
                }
            }
        }
        return result
    }
}

function getBaseTick(breakValue, _ref, interval, getValue) {
    let [tick, insideTick] = _ref;
    if (!(0, _type.isDefined)(tick) || mathAbs(getValue(breakValue) - getValue(tick)) / interval > .25) {
        if ((0, _type.isDefined)(insideTick) && mathAbs(getValue(insideTick) - getValue(tick)) / interval < 2) {
            tick = insideTick
        } else if (!(0, _type.isDefined)(tick)) {
            tick = breakValue
        }
    }
    return tick
}

function getScaleBreaksProcessor(convertTickInterval, getValue, addCorrection) {
    return function(breaks, ticks, tickInterval) {
        const interval = convertTickInterval(tickInterval);
        const correction = .5 * interval;
        return breaks.reduce(((result, b) => {
            let breakTicks = ticks.filter((tick => tick <= b.from));
            const from = addCorrection(getBaseTick(b.from, [].concat(breakTicks[breakTicks.length - 1], ticks[breakTicks.length]), interval, getValue), correction);
            breakTicks = ticks.filter((tick => tick >= b.to));
            const to = addCorrection(getBaseTick(b.to, [].concat(breakTicks[0], ticks[ticks.length - breakTicks.length - 1]), interval, getValue), -correction);
            if (getValue(to) - getValue(from) < interval && !b.gapSize) {
                return result
            }
            if (b.gapSize) {
                return result.concat([b])
            }
            return result.concat([{
                from: from,
                to: to,
                cumulativeWidth: b.cumulativeWidth
            }])
        }), [])
    }
}

function numericGenerator(options) {
    const floor = correctValueByInterval(getValue, mathFloor, getValue);
    const ceil = correctValueByInterval(getValue, mathCeil, getValue);
    const calculateTickIntervalByCustomTicks = getTickIntervalByCustomTicks(getValue, getValue);
    return generator(options, getBusinessDelta, calculateTickInterval, calculateMinorTickInterval, calculateTickIntervalByCustomTicks, calculateTickIntervalByCustomTicks, getValue, calculateTicks(addInterval, correctMinValueByEndOnTick(floor, ceil, resolveEndOnTick, options.endOnTick), adjustInterval, resolveEndOnTick), calculateMinorTicks(getValue, addInterval, floor, addInterval, getValue), getScaleBreaksProcessor(getValue, getValue, ((value, correction) => value + correction)))
}
const correctValueByIntervalLog = (post, getRound, getValue) => (value, interval) => (0, _math.sign)(value) * (0, _math.adjust)(post(getRound(value)((0, _math.adjust)(getValue(value) / interval)) * interval));

function logarithmicGenerator(options) {
    const base = options.logBase;
    const raise = raiseTo(base, options.allowNegatives, options.linearThreshold);
    const log = getLogValue(base, options.allowNegatives, options.linearThreshold);
    const absLog = logAbsValue(base);
    const absRaise = mathRaiseTo(base);
    const floor = correctValueByIntervalLog(absRaise, (value => value < 0 ? mathCeil : mathFloor), absLog);
    const ceil = correctValueByIntervalLog(absRaise, (value => value < 0 ? mathFloor : mathCeil), absLog);
    const ceilNumber = correctValueByInterval(getValue, mathCeil, getValue);
    return generator(options, getBusinessDeltaLog(base, options.allowNegatives, options.linearThreshold), getCalculateTickIntervalLog(options.skipCalculationLimits), calculateMinorTickInterval, getTickIntervalByCustomTicks(log, getValue), getTickIntervalByCustomTicks(getValue, getValue), getValue, calculateTicks(addIntervalLog(log, raise), correctMinValueByEndOnTick(floor, ceil, resolveEndOnTickLog(base), options.endOnTick), getAdjustIntervalLog(options.skipCalculationLimits), resolveEndOnTickLog(base)), calculateMinorTicks(((_, tick, prevTick, factor) => Math.max(Math.abs(tick), Math.abs(prevTick)) / factor), addInterval, floor, ceilNumber, ceil), getScaleBreaksProcessor(getValue, log, ((value, correction) => raise(log(value) + correction))))
}

function dateGenerator(options) {
    function floor(value, interval) {
        const floorNumber = correctValueByInterval(getValue, mathFloor, getValue);
        let intervalObject = (0, _type.isString)(interval) ? _date.default.getDateIntervalByString(interval.toLowerCase()) : interval;
        const divider = dateToMilliseconds(interval);
        if (intervalObject.days % 7 === 0 || interval.quarters) {
            intervalObject = adjustIntervalDateTime(divider)
        }
        const correctDateWithUnitBeginning = v => _date.default.correctDateWithUnitBeginning(v, intervalObject, null, options.firstDayOfWeek);
        const floorAtStartDate = v => new Date(mathFloor((v.getTime() - 6e4 * v.getTimezoneOffset()) / divider) * divider + 6e4 * v.getTimezoneOffset());
        value = correctDateWithUnitBeginning(value);
        if ("years" in intervalObject) {
            value.setFullYear(floorNumber(value.getFullYear(), intervalObject.years))
        } else if ("quarters" in intervalObject) {
            value = correctDateWithUnitBeginning(floorAtStartDate(value))
        } else if ("months" in intervalObject) {
            value.setMonth(floorNumber(value.getMonth(), intervalObject.months))
        } else if ("weeks" in intervalObject || "days" in intervalObject) {
            value = correctDateWithUnitBeginning(floorAtStartDate(value))
        } else if ("hours" in intervalObject) {
            value.setHours(floorNumber(value.getHours(), intervalObject.hours))
        } else if ("minutes" in intervalObject) {
            value.setMinutes(floorNumber(value.getMinutes(), intervalObject.minutes))
        } else if ("seconds" in intervalObject) {
            value.setSeconds(floorNumber(value.getSeconds(), intervalObject.seconds))
        } else if ("milliseconds" in intervalObject) {
            value = floorAtStartDate(value)
        }
        return value
    }
    const calculateTickIntervalByCustomTicks = getTickIntervalByCustomTicks(getValue, _date.default.convertMillisecondsToDateUnits);
    return generator(options, getBusinessDelta, calculateTickIntervalDateTime, calculateMinorTickIntervalDateTime, calculateTickIntervalByCustomTicks, calculateTickIntervalByCustomTicks, dateToMilliseconds, calculateTicks(addIntervalDate, correctMinValueByEndOnTick(floor, (function(value, interval) {
        let newValue = floor(value, interval);
        while (value - newValue > 0) {
            newValue = addIntervalDate(newValue, interval)
        }
        return newValue
    }), resolveEndOnTickDate, options.endOnTick), adjustIntervalDateTime, resolveEndOnTickDate), calculateMinorTicks(getValue, addIntervalDate, floor, addIntervalDate, getValue), getScaleBreaksProcessor(dateToMilliseconds, getValue, ((value, correction) => new Date(value.getTime() + correction))))
}
const tickGenerator = function(options) {
    let result;
    if (options.rangeIsEmpty) {
        result = dummyGenerator(options)
    } else if ("discrete" === options.axisType) {
        result = discreteGenerator(options)
    } else if ("logarithmic" === options.axisType) {
        result = logarithmicGenerator(options)
    } else if ("datetime" === options.dataType) {
        result = dateGenerator(options)
    } else {
        result = numericGenerator(options)
    }
    return result
};
exports.tickGenerator = tickGenerator;
