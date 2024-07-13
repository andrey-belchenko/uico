/**
 * DevExtreme (esm/__internal/ui/date_box/m_date_box.strategy.calendar_with_time.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import $ from "../../../core/renderer";
import dateUtils from "../../../core/utils/date";
import {
    extend
} from "../../../core/utils/extend";
import {
    getWidth
} from "../../../core/utils/size";
import {
    getWindow
} from "../../../core/utils/window";
import dateLocalization from "../../../localization/date";
import Box from "../../../ui/box";
import CalendarStrategy from "./m_date_box.strategy.calendar";
import uiDateUtils from "./m_date_utils";
import TimeView from "./m_time_view";
const window = getWindow();
const SHRINK_VIEW_SCREEN_WIDTH = 573;
const DATEBOX_ADAPTIVITY_MODE_CLASS = "dx-datebox-adaptivity-mode";
const DATEBOX_TIMEVIEW_SIDE_CLASS = "dx-datebox-datetime-time-side";
const CalendarWithTimeStrategy = CalendarStrategy.inherit({
    NAME: "CalendarWithTime",
    getDefaultOptions() {
        return extend(this.callBase(), {
            applyValueMode: "useButtons",
            buttonsLocation: "bottom after",
            "dropDownOptions.showTitle": false
        })
    },
    _closeDropDownByEnter() {
        return dateUtils.sameDate(this._getContouredValue(), this.widgetOption("value"))
    },
    getDisplayFormat: displayFormat => displayFormat || "shortdateshorttime",
    _is24HourFormat() {
        return dateLocalization.is24HourFormat(this.getDisplayFormat(this.dateBox.option("displayFormat")))
    },
    _getContouredValue() {
        const viewDate = this.callBase();
        return this._updateDateTime(viewDate)
    },
    _renderWidget() {
        this.callBase();
        this._timeView = this.dateBox._createComponent($("<div>"), TimeView, {
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
            uiDateUtils.normalizeTime(date)
        }
        this.callBase();
        if (this._timeView) {
            date && this._timeView.option("value", date);
            this._timeView.option("use24HourFormat", this._is24HourFormat())
        }
    },
    _isSmallScreen: () => getWidth(window) <= 573,
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
        this._box = this.dateBox._createComponent($("<div>").appendTo($popupContent), Box, {
            direction: "row",
            crossAlign: "stretch",
            items: this._getBoxItems(),
            itemTemplate: function(data, i, element) {
                const $container = $("<div>");
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
                        $(element).addClass(DATEBOX_TIMEVIEW_SIDE_CLASS)
                }
                return $container
            }.bind(this)
        })
    },
    popupConfig(popupConfig) {
        const calendarPopupConfig = this.callBase(popupConfig);
        return extend(calendarPopupConfig, {
            width: "auto"
        })
    },
    _preventFocusOnPopup(e) {
        if (!$(e.target).hasClass("dx-texteditor-input")) {
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
export default CalendarWithTimeStrategy;
