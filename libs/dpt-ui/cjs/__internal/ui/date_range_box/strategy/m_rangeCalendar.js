/**
 * DevExtreme (cjs/__internal/ui/date_range_box/strategy/m_rangeCalendar.js)
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
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _m_date_boxStrategy = _interopRequireDefault(require("../../date_box/m_date_box.strategy.calendar"));
var _m_date_range = require("../m_date_range.utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
class RangeCalendarStrategy extends _m_date_boxStrategy.default {
    constructor(dateBox) {
        super();
        this._dateSelectedCounter = 0;
        this.dateBox = dateBox;
        this.dateRangeBox = dateBox.option("_dateRangeBoxInstance")
    }
    popupConfig(popupConfig) {
        return (0, _extend.extend)(true, super.popupConfig(popupConfig), {
            position: {
                of: this.getDateRangeBox().$element()
            }
        })
    }
    popupShowingHandler() {
        this.getWidget()._restoreViewsMinMaxOptions();
        this._dateSelectedCounter = 0
    }
    _getPopup() {
        return super._getPopup() || this.getDateRangeBox().getStartDateBox()._popup
    }
    supportedKeys() {
        const dateRangeBox = this.getDateRangeBox();
        return _extends({}, super.supportedKeys(), {
            rightArrow: () => {
                if (dateRangeBox.option("opened")) {
                    return true
                }
                return
            },
            leftArrow: () => {
                if (dateRangeBox.option("opened")) {
                    return true
                }
                return
            },
            enter: e => {
                if (dateRangeBox.option("opened")) {
                    const dateBoxValue = this.dateBox.dateOption("value");
                    this.dateBox._valueChangeEventHandler(e);
                    const newDateBoxValue = this.dateBox.dateOption("value");
                    const dateBoxValueChanged = !(0, _m_date_range.isSameDates)(dateBoxValue, newDateBoxValue);
                    if (dateBoxValueChanged) {
                        dateRangeBox.getStartDateBox().getStrategy().getWidget().option("value", dateRangeBox.option("value"))
                    } else {
                        dateRangeBox.getStartDateBox().getStrategy().getWidget()._enterKeyHandler(e)
                    }
                    return false
                }
                return
            },
            tab: e => {
                if (!dateRangeBox.option("opened")) {
                    return
                }
                if (!this._getPopup().getFocusableElements().length) {
                    if (!e.shiftKey && dateRangeBox._isEndDateActiveElement() || e.shiftKey && dateRangeBox._isStartDateActiveElement()) {
                        dateRangeBox.close()
                    }
                    return
                }
                if (!e.shiftKey && dateRangeBox._isStartDateActiveElement() || e.shiftKey && dateRangeBox._isEndDateActiveElement()) {
                    return
                }
                const $focusableElement = e.shiftKey ? dateRangeBox.getStartDateBox()._getLastPopupElement() : dateRangeBox.getStartDateBox()._getFirstPopupElement();
                if ($focusableElement) {
                    _events_engine.default.trigger($focusableElement, "focus");
                    $focusableElement.select()
                }
                e.preventDefault()
            }
        })
    }
    _getWidgetOptions() {
        const {
            disabledDates: disabledDatesValue,
            value: value,
            multiView: multiView
        } = this.dateRangeBox.option();
        const disabledDates = (0, _type.isFunction)(disabledDatesValue) ? this._injectComponent(disabledDatesValue) : disabledDatesValue ?? void 0;
        return (0, _extend.extend)(super._getWidgetOptions(), {
            disabledDates: disabledDates,
            value: value,
            selectionMode: "range",
            viewsCount: multiView ? 2 : 1,
            _allowChangeSelectionOrder: true,
            _currentSelection: this.getCurrentSelection()
        })
    }
    _refreshActiveDescendant(e) {
        this.getDateRangeBox().setAria("activedescendant", e.actionValue)
    }
    _injectComponent(func) {
        return params => func((0, _extend.extend)(params, {
            component: this.getDateRangeBox()
        }))
    }
    getKeyboardListener() {
        const dateRangeBox = this.getDateRangeBox();
        return dateRangeBox.getStartDateBox() ? dateRangeBox.getStartDateBox().getStrategy().getWidget() : this.getWidget()
    }
    getValue() {
        return this.getWidget().option("value")
    }
    _updateValue() {
        const {
            value: value
        } = this.getDateRangeBox().option();
        if (!this.getWidget()) {
            return
        }
        this._shouldPreventFocusChange = true;
        this.getWidget().option("value", value)
    }
    _isInstantlyMode() {
        return "instantly" === this.getDateRangeBox().option("applyValueMode")
    }
    _valueChangedHandler(_ref) {
        let {
            value: value,
            previousValue: previousValue,
            event: event
        } = _ref;
        if ((0, _m_date_range.isSameDateArrays)(value, previousValue) && !this.getWidget()._valueSelected) {
            this._shouldPreventFocusChange = false;
            return
        }
        this.getWidget()._valueSelected = false;
        const dateRangeBox = this.getDateRangeBox();
        if (this._isInstantlyMode()) {
            if (!dateRangeBox.option("disableOutOfRangeSelection")) {
                if ("startDate" === this._getCalendarCurrentSelection()) {
                    this._dateSelectedCounter = 0
                } else {
                    this._dateSelectedCounter = 1;
                    if (!value[0]) {
                        this._dateSelectedCounter = -1
                    } else if ((0, _m_date_range.getDeserializedDate)(value[0]) > (0, _m_date_range.getDeserializedDate)(value[1])) {
                        dateRangeBox.updateValue([value[0], null], event);
                        return
                    }
                }
            }
            dateRangeBox.updateValue(value, event);
            this._dateSelectedCounter += 1;
            if (2 === this._dateSelectedCounter) {
                dateRangeBox.close();
                return
            }
        } else if ("endDate" === this._getCalendarCurrentSelection()) {
            if (value[0] && (0, _m_date_range.getDeserializedDate)(value[0]) > (0, _m_date_range.getDeserializedDate)(value[1])) {
                return
            }
        }
        if (!this._shouldPreventFocusChange) {
            this._moveFocusToNextInput()
        }
        this._shouldPreventFocusChange = false
    }
    _moveFocusToNextInput() {
        const targetDateBox = "startDate" === this._getCalendarCurrentSelection() ? this.getDateRangeBox().getEndDateBox() : this.getDateRangeBox().getStartDateBox();
        targetDateBox.focus();
        _events_engine.default.trigger(targetDateBox.field(), "dxclick")
    }
    getCurrentSelection() {
        return this.getDateRangeBox().option("_currentSelection")
    }
    _getCalendarCurrentSelection() {
        return this.getWidget().option("_currentSelection")
    }
    _closeDropDownByEnter() {
        if ("startDate" === this._getCalendarCurrentSelection()) {
            return false
        }
        return true
    }
    dateBoxValue() {
        const {
            dateBox: dateBox
        } = this;
        if (arguments.length) {
            return dateBox.dateValue.apply(dateBox, arguments)
        }
        return dateBox.dateOption.apply(dateBox, ["value"])
    }
    _cellClickHandler() {}
    setActiveStartDateBox() {
        this.dateBox = this.getDateRangeBox().getStartDateBox()
    }
    setActiveEndDateBox() {
        this.dateBox = this.getDateRangeBox().getEndDateBox()
    }
    getDateRangeBox() {
        return this.dateRangeBox
    }
    getWidget() {
        return this._widget
    }
}
var _default = exports.default = RangeCalendarStrategy;
