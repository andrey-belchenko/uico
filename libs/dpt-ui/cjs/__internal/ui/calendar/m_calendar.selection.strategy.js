/**
 * DevExtreme (cjs/__internal/ui/calendar/m_calendar.selection.strategy.js)
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
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _type = require("../../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class CalendarSelectionStrategy {
    constructor(component) {
        this.calendar = component
    }
    dateOption(optionName) {
        return this.calendar._dateOption(optionName)
    }
    dateValue(value, e) {
        this.calendar._dateValue(value, e)
    }
    skipNavigate() {
        this.calendar._skipNavigate = true
    }
    updateAriaSelected(value, previousValue) {
        this.calendar._updateAriaSelected(value, previousValue);
        if (value[0] && this.calendar.option("currentDate").getTime() === value[0].getTime()) {
            this.calendar._updateAriaId(value[0])
        }
    }
    processValueChanged(value, previousValue) {
        var _value, _previousValue;
        if ((0, _type.isDefined)(value) && !Array.isArray(value)) {
            value = [value]
        }
        if ((0, _type.isDefined)(previousValue) && !Array.isArray(previousValue)) {
            previousValue = [previousValue]
        }
        value = (null === (_value = value) || void 0 === _value ? void 0 : _value.map((item => this._convertToDate(item)))) || [];
        previousValue = (null === (_previousValue = previousValue) || void 0 === _previousValue ? void 0 : _previousValue.map((item => this._convertToDate(item)))) || [];
        this._updateViewsValue(value);
        this.updateAriaSelected(value, previousValue);
        if (!this._currentDateChanged) {
            this.calendar._initCurrentDate()
        }
        this._currentDateChanged = false
    }
    _isDateDisabled(date) {
        const min = this.calendar._dateOption("min");
        const max = this.calendar._dateOption("max");
        const isLessThanMin = (0, _type.isDefined)(min) && date < min && !_date.default.sameDate(min, date);
        const isBiggerThanMax = (0, _type.isDefined)(max) && date > max && !_date.default.sameDate(max, date);
        return this.calendar._view.isDateDisabled(date) || isLessThanMin || isBiggerThanMax
    }
    _getLowestDateInArray(dates) {
        if (dates.length) {
            return new Date(Math.min(...dates))
        }
    }
    _convertToDate(value) {
        return this.calendar._convertToDate(value)
    }
    _isMaxZoomLevel() {
        return this.calendar._isMaxZoomLevel()
    }
    _updateViewsOption(optionName, optionValue) {
        this.calendar._updateViewsOption(optionName, optionValue)
    }
    _updateViewsValue(value) {
        this._updateViewsOption("value", value)
    }
    _updateCurrentDate(value) {
        this.calendar.option("currentDate", value ?? new Date)
    }
    _shouldHandleWeekNumberClick() {
        const {
            selectionMode: selectionMode,
            selectWeekOnClick: selectWeekOnClick
        } = this.calendar.option();
        return selectWeekOnClick && "single" !== selectionMode
    }
}
var _default = exports.default = CalendarSelectionStrategy;
