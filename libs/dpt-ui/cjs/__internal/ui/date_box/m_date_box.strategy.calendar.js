/**
 * DevExtreme (cjs/__internal/ui/date_box/m_date_box.strategy.calendar.js)
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
var _common = require("../../../core/utils/common");
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _calendar = _interopRequireDefault(require("../../../ui/calendar"));
var _themes = require("../../../ui/themes");
var _m_date_box = _interopRequireDefault(require("./m_date_box.strategy"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const TODAY_BUTTON_CLASS = "dx-button-today";
const CalendarStrategy = _m_date_box.default.inherit({
    NAME: "Calendar",
    getDefaultOptions() {
        return (0, _extend.extend)(this.callBase(), {
            todayButtonText: _message.default.format("dxCalendar-todayButtonText")
        })
    },
    supportedKeys() {
        const homeEndHandler = function(e) {
            if (this.option("opened")) {
                e.preventDefault();
                return true
            }
            return false
        };
        return {
            rightArrow() {
                if (this.option("opened")) {
                    return true
                }
            },
            leftArrow() {
                if (this.option("opened")) {
                    return true
                }
            },
            enter: function(e) {
                if (this.dateBox.option("opened")) {
                    e.preventDefault();
                    if (this._widget.option("zoomLevel") === this._widget.option("maxZoomLevel")) {
                        const viewValue = this._getContouredValue();
                        const lastActionElement = this._lastActionElement;
                        const shouldCloseDropDown = this._closeDropDownByEnter();
                        if (shouldCloseDropDown && viewValue && "calendar" === lastActionElement) {
                            this.dateBoxValue(viewValue, e)
                        }
                        shouldCloseDropDown && this.dateBox.close();
                        this.dateBox._valueChangeEventHandler(e);
                        return !shouldCloseDropDown
                    }
                    return true
                }
                this.dateBox._valueChangeEventHandler(e)
            }.bind(this),
            home: homeEndHandler,
            end: homeEndHandler
        }
    },
    getDisplayFormat: displayFormat => displayFormat || "shortdate",
    _closeDropDownByEnter: () => true,
    _getWidgetName: () => _calendar.default,
    _getContouredValue() {
        return this._widget._view.option("contouredDate")
    },
    getKeyboardListener() {
        return this._widget
    },
    _getWidgetOptions() {
        const disabledDates = this.dateBox.option("disabledDates");
        return (0, _extend.extend)(this.dateBox.option("calendarOptions"), {
            value: this.dateBoxValue() || null,
            selectionMode: "single",
            dateSerializationFormat: null,
            min: this.dateBox.dateOption("min"),
            max: this.dateBox.dateOption("max"),
            onValueChanged: this._valueChangedHandler.bind(this),
            onCellClick: this._cellClickHandler.bind(this),
            disabledDates: (0, _type.isFunction)(disabledDates) ? this._injectComponent(disabledDates.bind(this.dateBox)) : disabledDates,
            onContouredChanged: this._refreshActiveDescendant.bind(this),
            skipFocusCheck: true
        })
    },
    _injectComponent(func) {
        const that = this;
        return function(params) {
            (0, _extend.extend)(params, {
                component: that.dateBox
            });
            return func(params)
        }
    },
    _refreshActiveDescendant(e) {
        this._lastActionElement = "calendar";
        this.dateBox.setAria("activedescendant", e.actionValue)
    },
    _getTodayButtonConfig() {
        const buttonsLocation = this.dateBox.option("buttonsLocation");
        const isButtonsLocationDefault = "default" === buttonsLocation;
        const position = isButtonsLocationDefault ? ["bottom", "center"] : (0, _common.splitPair)(buttonsLocation);
        const stylingMode = (0, _themes.isMaterial)() ? "text" : "outlined";
        return {
            widget: "dxButton",
            toolbar: position[0],
            location: "after" === position[1] ? "before" : position[1],
            options: {
                onClick: args => {
                    this._widget._toTodayView(args)
                },
                text: this.dateBox.option("todayButtonText"),
                elementAttr: {
                    class: "dx-button-today"
                },
                stylingMode: stylingMode
            }
        }
    },
    _isCalendarVisible() {
        const {
            calendarOptions: calendarOptions
        } = this.dateBox.option();
        return (0, _type.isEmptyObject)(calendarOptions) || false !== calendarOptions.visible
    },
    _getPopupToolbarItems(toolbarItems) {
        const useButtons = "useButtons" === this.dateBox.option("applyValueMode");
        const shouldRenderTodayButton = useButtons && this._isCalendarVisible();
        if (shouldRenderTodayButton) {
            const todayButton = this._getTodayButtonConfig();
            return [todayButton, ...toolbarItems]
        }
        return toolbarItems
    },
    popupConfig: popupConfig => (0, _extend.extend)(true, popupConfig, {
        position: {
            collision: "flipfit flip"
        },
        width: "auto"
    }),
    _valueChangedHandler(e) {
        const {
            value: value
        } = e;
        const prevValue = e.previousValue;
        if (_date.default.sameDate(value, prevValue) && _date.default.sameHoursAndMinutes(value, prevValue)) {
            return
        }
        if ("instantly" === this.dateBox.option("applyValueMode")) {
            this.dateBoxValue(this.getValue(), e.event)
        }
    },
    _updateValue() {
        if (!this._widget) {
            return
        }
        this._widget.option("value", this.dateBoxValue())
    },
    textChangedHandler() {
        this._lastActionElement = "input";
        if (this.dateBox.option("opened") && this._widget) {
            this._updateValue(true)
        }
    },
    _cellClickHandler(e) {
        const {
            dateBox: dateBox
        } = this;
        if ("instantly" === dateBox.option("applyValueMode")) {
            dateBox.option("opened", false);
            this.dateBoxValue(this.getValue(), e.event)
        }
    }
});
var _default = exports.default = CalendarStrategy;
