/**
 * DevExtreme (cjs/__internal/scheduler/timezones/m_utils_timezones_data.js)
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
exports.default = void 0;
var _math = require("../../../core/utils/math");
var _config = _interopRequireDefault(require("../../../core/config"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const getConvertedUntils = value => value.split("|").map((until => {
    if ("Infinity" === until) {
        return null
    }
    return 1e3 * parseInt(until, 36)
}));
const parseTimezone = timeZoneConfig => {
    const {
        offsets: offsets
    } = timeZoneConfig;
    const {
        offsetIndices: offsetIndices
    } = timeZoneConfig;
    const {
        untils: untils
    } = timeZoneConfig;
    const offsetList = offsets.split("|").map((value => parseInt(value)));
    const offsetIndexList = offsetIndices.split("").map((value => parseInt(value)));
    const dateList = getConvertedUntils(untils).map((accumulator = 0, value => accumulator += value));
    var accumulator;
    return {
        offsetList: offsetList,
        offsetIndexList: offsetIndexList,
        dateList: dateList
    }
};
class TimeZoneCache {
    constructor() {
        this.map = new Map
    }
    tryGet(id) {
        if (!this.map.get(id)) {
            const config = timeZoneDataUtils.getTimezoneById(id);
            if (!config) {
                return false
            }
            const timeZoneInfo = parseTimezone(config);
            this.map.set(id, timeZoneInfo)
        }
        return this.map.get(id)
    }
}
const tzCache = new TimeZoneCache;
const timeZoneDataUtils = {
    _tzCache: tzCache,
    getTimeZonesOld: () => (0, _config.default)().timezones ?? [],
    formatOffset(offset) {
        const hours = Math.floor(offset);
        const minutesInDecimal = offset - hours;
        const signString = (0, _math.sign)(offset) >= 0 ? "+" : "-";
        const hoursString = `0${Math.abs(hours)}`.slice(-2);
        const minutesString = minutesInDecimal > 0 ? ":" + 60 * minutesInDecimal : ":00";
        return signString + hoursString + minutesString
    },
    formatId: id => id.split("/").join(" - ").split("_").join(" "),
    getTimezoneById(id) {
        if (!id) {
            return
        }
        const tzList = this.getTimeZonesOld();
        for (let i = 0; i < tzList.length; i++) {
            const currentId = tzList[i].id;
            if (currentId === id) {
                return tzList[i]
            }
        }
        return
    },
    getTimeZoneOffsetById(id, timestamp) {
        const timeZoneInfo = tzCache.tryGet(id);
        return timeZoneInfo ? this.getUtcOffset(timeZoneInfo, timestamp) : void 0
    },
    getTimeZoneDeclarationTuple(id, year) {
        const timeZoneInfo = tzCache.tryGet(id);
        return timeZoneInfo ? this.getTimeZoneDeclarationTupleCore(timeZoneInfo, year) : []
    },
    getTimeZoneDeclarationTupleCore(timeZoneInfo, year) {
        const {
            offsetList: offsetList
        } = timeZoneInfo;
        const {
            offsetIndexList: offsetIndexList
        } = timeZoneInfo;
        const {
            dateList: dateList
        } = timeZoneInfo;
        const tupleResult = [];
        for (let i = 0; i < dateList.length; i++) {
            const currentDate = dateList[i];
            const currentYear = new Date(currentDate).getFullYear();
            if (currentYear === year) {
                const offset = offsetList[offsetIndexList[i + 1]];
                tupleResult.push({
                    date: currentDate,
                    offset: -offset / 60
                })
            }
            if (currentYear > year) {
                break
            }
        }
        return tupleResult
    },
    getUtcOffset(timeZoneInfo, dateTimeStamp) {
        const {
            offsetList: offsetList
        } = timeZoneInfo;
        const {
            offsetIndexList: offsetIndexList
        } = timeZoneInfo;
        const {
            dateList: dateList
        } = timeZoneInfo;
        const lastIntervalStartIndex = dateList.length - 1 - 1;
        let index = lastIntervalStartIndex;
        while (index >= 0 && dateTimeStamp < dateList[index]) {
            index--
        }
        const offset = offsetList[offsetIndexList[index + 1]];
        return -offset / 60 || offset
    }
};
var _default = exports.default = timeZoneDataUtils;
