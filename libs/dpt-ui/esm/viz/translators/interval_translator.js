/**
 * DevExtreme (esm/viz/translators/interval_translator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isNumeric as isNumber,
    isDefined
} from "../../core/utils/type";
import dateUtils from "../../core/utils/date";
const floor = Math.floor;
import {
    adjust
} from "../../core/utils/math";
export default {
    _intervalize: function(value, interval) {
        if (!isDefined(value)) {
            return
        }
        if ("datetime" === this._businessRange.dataType) {
            if (isNumber(value)) {
                value = new Date(value)
            } else {
                value = new Date(value.getTime())
            }
            value = dateUtils.correctDateWithUnitBeginning(value, interval, null, this._options.firstDayOfWeek)
        } else {
            value = adjust(floor(adjust(value / interval)) * interval, interval)
        }
        return value
    },
    translate: function(bp, direction, skipRound, interval) {
        const specialValue = this.translateSpecialCase(bp);
        if (isDefined(specialValue)) {
            return Math.round(specialValue)
        }
        interval = interval || this._options.interval;
        if (!this.isValid(bp, interval)) {
            return null
        }
        return this.to(bp, direction, skipRound, interval)
    },
    getInterval: function() {
        return Math.round(this._canvasOptions.ratioOfCanvasRange * (this._businessRange.interval || Math.abs(this._canvasOptions.rangeMax - this._canvasOptions.rangeMin)))
    },
    zoom: function() {},
    getMinScale: function() {},
    getScale: function() {},
    _parse: function(value) {
        return "datetime" === this._businessRange.dataType ? new Date(value) : Number(value)
    },
    fromValue: function(value) {
        return this._parse(value)
    },
    toValue: function(value) {
        return this._parse(value)
    },
    isValid: function(value, interval) {
        const that = this;
        const co = that._canvasOptions;
        let rangeMin = co.rangeMin;
        let rangeMax = co.rangeMax;
        interval = interval || that._options.interval;
        if (null === value || isNaN(value)) {
            return false
        }
        value = "datetime" === that._businessRange.dataType && isNumber(value) ? new Date(value) : value;
        if (interval !== that._options.interval) {
            rangeMin = that._intervalize(rangeMin, interval);
            rangeMax = that._intervalize(rangeMax, interval)
        }
        if (value.valueOf() < rangeMin || value.valueOf() >= dateUtils.addInterval(rangeMax, interval)) {
            return false
        }
        return true
    },
    to: function(bp, direction, skipRound, interval) {
        interval = interval || this._options.interval;
        const v1 = this._intervalize(bp, interval);
        const v2 = dateUtils.addInterval(v1, interval);
        let res = this._to(v1, skipRound);
        const p2 = this._to(v2, skipRound);
        if (!direction) {
            res = floor((res + p2) / 2)
        } else if (direction > 0) {
            res = p2
        }
        return res
    },
    _to: function(value, skipRound) {
        const co = this._canvasOptions;
        const rMin = co.rangeMinVisible;
        const rMax = co.rangeMaxVisible;
        let offset = value - rMin;
        if (value < rMin) {
            offset = 0
        } else if (value > rMax) {
            offset = dateUtils.addInterval(rMax, this._options.interval) - rMin
        }
        const projectedValue = this._calculateProjection(offset * this._canvasOptions.ratioOfCanvasRange);
        return this._conversionValue(projectedValue, skipRound)
    },
    from: function(position, direction) {
        const origInterval = this._options.interval;
        let interval = origInterval;
        const co = this._canvasOptions;
        const rMin = co.rangeMinVisible;
        const rMax = co.rangeMaxVisible;
        let value;
        if ("datetime" === this._businessRange.dataType) {
            interval = dateUtils.dateToMilliseconds(origInterval)
        }
        value = this._calculateUnProjection((position - this._canvasOptions.startPoint) / this._canvasOptions.ratioOfCanvasRange);
        value = this._intervalize(dateUtils.addInterval(value, interval / 2, direction > 0), origInterval);
        if (value < rMin) {
            value = rMin
        } else if (value > rMax) {
            value = rMax
        }
        return value
    },
    _add: function() {
        return NaN
    },
    isValueProlonged: true
};
