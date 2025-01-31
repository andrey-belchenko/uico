/**
 * DevExtreme (cjs/__internal/scheduler/r1/timezone_calculator/calculator.js)
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
exports.TimeZoneCalculator = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _type = require("../../../../core/utils/type");
var _date2 = require("../../../core/utils/date");
var _const = require("./const");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const MS_IN_MINUTE = 6e4;
const MS_IN_HOUR = 36e5;
const toMs = _date.default.dateToMilliseconds;
class TimeZoneCalculator {
    constructor(options) {
        this.options = options
    }
    createDate(sourceDate, info) {
        const date = new Date(sourceDate);
        switch (info.path) {
            case _const.PathTimeZoneConversion.fromSourceToAppointment:
                return this.getConvertedDate(date, info.appointmentTimeZone, true, false);
            case _const.PathTimeZoneConversion.fromAppointmentToSource:
                return this.getConvertedDate(date, info.appointmentTimeZone, true, true);
            case _const.PathTimeZoneConversion.fromSourceToGrid:
                return this.getConvertedDate(date, info.appointmentTimeZone, false, false);
            case _const.PathTimeZoneConversion.fromGridToSource:
                return this.getConvertedDate(date, info.appointmentTimeZone, false, true);
            default:
                throw new Error("not specified pathTimeZoneConversion")
        }
    }
    getOffsets(date, appointmentTimezone) {
        const clientOffset = -this.getClientOffset(date) / _date.default.dateToMilliseconds("hour");
        const commonOffset = this.getCommonOffset(date);
        const appointmentOffset = this.getAppointmentOffset(date, appointmentTimezone);
        return {
            client: clientOffset,
            common: !(0, _type.isDefined)(commonOffset) ? clientOffset : commonOffset,
            appointment: "number" !== typeof appointmentOffset ? clientOffset : appointmentOffset
        }
    }
    getConvertedDateByOffsets(date, clientOffset, targetOffset, isBack) {
        const direction = isBack ? -1 : 1;
        const resultDate = new Date(date);
        return _date2.dateUtilsTs.addOffsets(resultDate, [direction * (toMs("hour") * targetOffset), -direction * (toMs("hour") * clientOffset)])
    }
    getOriginStartDateOffsetInMs(date, timezone, isUTCDate) {
        const offsetInHours = this.getOffsetInHours(date, timezone, isUTCDate);
        return 36e5 * offsetInHours
    }
    getOffsetInHours(date, timezone, isUTCDate) {
        const {
            client: client,
            appointment: appointment,
            common: common
        } = this.getOffsets(date, timezone);
        if (!!timezone && isUTCDate) {
            return appointment - client
        }
        if (!!timezone && !isUTCDate) {
            return appointment - common
        }
        if (!timezone && isUTCDate) {
            return common - client
        }
        return 0
    }
    getClientOffset(date) {
        return this.options.getClientOffset(date)
    }
    getCommonOffset(date) {
        return this.options.tryGetCommonOffset(date)
    }
    getAppointmentOffset(date, appointmentTimezone) {
        return this.options.tryGetAppointmentOffset(date, appointmentTimezone)
    }
    getConvertedDate(date, appointmentTimezone, useAppointmentTimeZone, isBack) {
        const newDate = new Date(date.getTime());
        const offsets = this.getOffsets(newDate, appointmentTimezone);
        if (useAppointmentTimeZone && !!appointmentTimezone) {
            return this.getConvertedDateByOffsets(date, offsets.client, offsets.appointment, isBack)
        }
        return this.getConvertedDateByOffsets(date, offsets.client, offsets.common, isBack)
    }
}
exports.TimeZoneCalculator = TimeZoneCalculator;
