/**
 * DevExtreme (cjs/__internal/ui/date_box/m_date_box.strategy.calendar_with_time.js)
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
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _window = require("../../../core/utils/window");
var _date2 = _interopRequireDefault(require("../../../localization/date"));
var _box = _interopRequireDefault(require("../../../ui/box"));
var _m_date_boxStrategy = _interopRequireDefault(require("./m_date_box.strategy.calendar"));
var _m_date_utils = _interopRequireDefault(require("./m_date_utils"));
var _m_time_view = _interopRequireDefault(require("./m_time_view"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const window = (0, _window.getWindow)();
const SHRINK_VIEW_SCREEN_WIDTH = 573;
const DATEBOX_ADAPTIVITY_MODE_CLASS = "dx-datebox-adaptivity-mode";
const DATEBOX_TIMEVIEW_SIDE_CLASS = "dx-datebox-datetime-time-side";
const CalendarWithTimeStrategy = _m_date_boxStrategy.default.inherit({
    NAME: "CalendarWithTime",
    getDefaultOptions() {
        return (0, _extend.extend)(this.callBase(), {
            applyValueMode: "useButtons",
            buttonsLocation: "bottom after",
            "dropDownOptions.showTitle": false
        })
    },
    _closeDropDownByEnter() {
        return _date.default.sameDate(this._getContouredValue(), this.widgetOption("value"))
    },
    getDisplayFormat: displayFormat => displayFormat || "shortdateshorttime",
    _is24HourFormat() {
        return _date2.default.is24HourFormat(this.getDisplayFormat(this.dateBox.option("displayFormat")))
    },
    _getContouredValue() {
        const viewDate = this.callBase();
        return this._updateDateTime(viewDate)
    },
    _renderWidget() {
        this.callBase();
        this._timeView = this.dateBox._createComponent((0, _renderer.default)("<div>"), _m_time_view.default, {
            value: this.dateBoxValue(),
            _showClock: !this._isShrinkView(),
            use24HourFormat: this._is24HourFormat(),
            onValueChanged: this._valueChangedHandler.bind(this),
            stylingMode: this.dateBox.option("stylingMode")
        })
    },
    renderOpenedState() {
        this.callBase();
        const popup = this._getPopup();
        if (popup) {
            popup.$wrapper().toggleClass("dx-datebox-adaptivity-mode", this._isSmallScreen())
        }
        clearTimeout(this._repaintTimer);
        this._repaintTimer = setTimeout((() => {
            this._getPopup() && this._getPopup().repaint()
        }), 0)
    },
    isAdaptivityChanged() {
        const isAdaptiveMode = this._isShrinkView();
        const currentAdaptiveMode = this._currentAdaptiveMode;
        if (isAdaptiveMode !== currentAdaptiveMode) {
            this._currentAdaptiveMode = isAdaptiveMode;
            return void 0 !== currentAdaptiveMode
        }
        return this.callBase()
    },
    _updateValue(preventDefaultValue) {
        let date = this.dateBoxValue();
        if (!date && !preventDefaultValue) {
            date = new Date;
            _m_date_utils.default.normalizeTime(date)
        }
        this.callBase();
        if (this._timeView) {
            date && this._timeView.option("value", date);
            this._timeView.option("use24HourFormat", this._is24HourFormat())
        }
    },
    _isSmallScreen: () => (0, _size.getWidth)(window) <= 573,
    _isShrinkView() {
        return !this.dateBox.option("showAnalogClock") || this.dateBox.option("adaptivityEnabled") && this._isSmallScreen()
    },
    _getBoxItems() {
        const items = [{
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            name: "calendar"
        }];
        if (!this._isShrinkView()) {
            items.push({
                ratio: 0,
                shrink: 0,
                baseSize: "auto",
                name: "time"
            })
        }
        return items
    },
    renderPopupContent() {
        this.callBase();
        this._currentAdaptiveMode = this._isShrinkView();
        const $popupContent = this._getPopup().$content();
        this._box = this.dateBox._createComponent((0, _renderer.default)("<div>").appendTo($popupContent), _box.default, {
            direction: "row",
            crossAlign: "stretch",
            items: this._getBoxItems(),
            itemTemplate: function(data, i, element) {
                const $container = (0, _renderer.default)("<div>");
                switch (data.name) {
                    case "calendar":
                        $container.append(this._widget.$element());
                        if (this._isShrinkView()) {
                            this._timeView.$element().addClass(DATEBOX_TIMEVIEW_SIDE_CLASS);
                            $container.append(this._timeView.$element())
                        }
                        break;
                    case "time":
                        $container.append(this._timeView.$element());
                        (0, _renderer.default)(element).addClass(DATEBOX_TIMEVIEW_SIDE_CLASS)
                }
                return $container
            }.bind(this)
        })
    },
    popupConfig(popupConfig) {
        const calendarPopupConfig = this.callBase(popupConfig);
        return (0, _extend.extend)(calendarPopupConfig, {
            width: "auto"
        })
    },
    _preventFocusOnPopup(e) {
        if (!(0, _renderer.default)(e.target).hasClass("dx-texteditor-input")) {
            this.callBase.apply(this, arguments);
            if (!this.dateBox._hasFocusClass()) {
                this.dateBox.focus()
            }
        }
    },
    _updateDateTime(date) {
        const time = this._timeView.option("value");
        date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
        return date
    },
    getValue() {
        let date = this._widget.option("value") ?? this._widget.getContouredDate();
        date = date ? new Date(date) : new Date;
        return this._updateDateTime(date)
    },
    dispose() {
        clearTimeout(this._removeMinWidthTimer);
        clearTimeout(this._repaintTimer);
        this.callBase()
    }
});
var _default = exports.default = CalendarWithTimeStrategy;
