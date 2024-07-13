/**
 * DevExtreme (esm/__internal/ui/date_box/m_time_view.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import $ from "../../../core/renderer";
import {
    extend
} from "../../../core/utils/extend";
import dateLocalization from "../../../localization/date";
import Box from "../../../ui/box";
import Editor from "../../../ui/editor/editor";
import NumberBox from "../../../ui/number_box";
import SelectBox from "../../../ui/select_box";
import dateUtils from "./m_date_utils";
const TIMEVIEW_CLASS = "dx-timeview";
const TIMEVIEW_CLOCK_CLASS = "dx-timeview-clock";
const TIMEVIEW_FIELD_CLASS = "dx-timeview-field";
const TIMEVIEW_HOURARROW_CLASS = "dx-timeview-hourarrow";
const TIMEVIEW_TIME_SEPARATOR_CLASS = "dx-timeview-time-separator";
const TIMEVIEW_FORMAT12_CLASS = "dx-timeview-format12";
const TIMEVIEW_FORMAT12_AM = -1;
const TIMEVIEW_FORMAT12_PM = 1;
const TIMEVIEW_MINUTEARROW_CLASS = "dx-timeview-minutearrow";
const rotateArrow = function($arrow, angle, offset) {
    cssRotate($arrow, angle, offset)
};
const cssRotate = function($arrow, angle, offset) {
    $arrow.css("transform", `rotate(${angle}deg) translate(0,${offset}px)`)
};
const TimeView = Editor.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            value: new Date(Date.now()),
            use24HourFormat: true,
            _showClock: true,
            _arrowOffset: 5,
            stylingMode: void 0
        })
    },
    _getValue() {
        return this.option("value") || new Date
    },
    _init() {
        this.callBase();
        this.$element().addClass("dx-timeview")
    },
    _render() {
        this.callBase();
        this._renderBox();
        this._updateTime()
    },
    _renderBox() {
        const $box = $("<div>").appendTo(this.$element());
        const items = [];
        if (this.option("_showClock")) {
            items.push({
                ratio: 1,
                shrink: 0,
                baseSize: "auto",
                template: this._renderClock.bind(this)
            })
        }
        items.push({
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            template: this._renderField.bind(this)
        });
        this._createComponent($box, Box, {
            height: "100%",
            width: "100%",
            direction: "col",
            items: items
        })
    },
    _renderClock(_, __, container) {
        this._$hourArrow = $("<div>").addClass("dx-timeview-hourarrow");
        this._$minuteArrow = $("<div>").addClass("dx-timeview-minutearrow");
        const $container = $(container);
        $container.addClass("dx-timeview-clock").append(this._$hourArrow).append(this._$minuteArrow);
        this.setAria("role", "presentation", $container)
    },
    _updateClock() {
        const time = this._getValue();
        const hourArrowAngle = time.getHours() / 12 * 360 + time.getMinutes() / 60 * 30;
        const minuteArrowAngle = time.getMinutes() / 60 * 360;
        rotateArrow(this._$hourArrow, hourArrowAngle, this.option("_arrowOffset"));
        rotateArrow(this._$minuteArrow, minuteArrowAngle, this.option("_arrowOffset"))
    },
    _getBoxItems(is12HourFormat) {
        const items = [{
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            template: () => this._hourBox.$element()
        }, {
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            template: $("<div>").addClass("dx-timeview-time-separator").text(dateLocalization.getTimeSeparator())
        }, {
            ratio: 0,
            shrink: 0,
            baseSize: "auto",
            template: () => this._minuteBox.$element()
        }];
        if (is12HourFormat) {
            items.push({
                ratio: 0,
                shrink: 0,
                baseSize: "auto",
                template: () => this._format12.$element()
            })
        }
        return items
    },
    _renderField() {
        const is12HourFormat = !this.option("use24HourFormat");
        this._createHourBox(is12HourFormat);
        this._createMinuteBox();
        if (is12HourFormat) {
            this._createFormat12Box()
        }
        return this._createComponent($("<div>").addClass("dx-timeview-field"), Box, {
            direction: "row",
            align: "center",
            crossAlign: "center",
            items: this._getBoxItems(is12HourFormat)
        }).$element()
    },
    _createHourBox(is12HourFormat) {
        const editor = this._hourBox = this._createComponent($("<div>"), NumberBox, extend({
            min: -1,
            max: is12HourFormat ? 13 : 24,
            value: this._getValue().getHours(),
            onValueChanged: this._onHourBoxValueChanged.bind(this),
            onKeyboardHandled: opts => this._keyboardHandler(opts)
        }, this._getNumberBoxConfig()));
        editor.setAria("label", "hours")
    },
    _isPM() {
        return !this.option("use24HourFormat") && 1 === this._format12.option("value")
    },
    _onHourBoxValueChanged(_ref) {
        let {
            value: value,
            component: component
        } = _ref;
        const currentValue = this._getValue();
        const newValue = new Date(currentValue);
        let newHours = this._convertMaxHourToMin(value);
        component.option("value", newHours);
        if (this._isPM()) {
            newHours += 12
        }
        newValue.setHours(newHours);
        dateUtils.normalizeTime(newValue);
        this.option("value", newValue)
    },
    _convertMaxHourToMin(hours) {
        const maxHoursValue = this.option("use24HourFormat") ? 24 : 12;
        return (maxHoursValue + hours) % maxHoursValue
    },
    _createMinuteBox() {
        const editor = this._minuteBox = this._createComponent($("<div>"), NumberBox, extend({
            min: -1,
            max: 60,
            value: this._getValue().getMinutes(),
            onKeyboardHandled: opts => this._keyboardHandler(opts),
            onValueChanged: _ref2 => {
                let {
                    value: value,
                    component: component
                } = _ref2;
                const newMinutes = (60 + value) % 60;
                component.option("value", newMinutes);
                const time = new Date(this._getValue());
                time.setMinutes(newMinutes);
                dateUtils.normalizeTime(time);
                this.option("value", time)
            }
        }, this._getNumberBoxConfig()));
        editor.setAria("label", "minutes")
    },
    _createFormat12Box() {
        const periodNames = dateLocalization.getPeriodNames();
        const editor = this._format12 = this._createComponent($("<div>").addClass("dx-timeview-format12"), SelectBox, {
            items: [{
                value: -1,
                text: periodNames[0]
            }, {
                value: 1,
                text: periodNames[1]
            }],
            valueExpr: "value",
            displayExpr: "text",
            onKeyboardHandled: opts => this._keyboardHandler(opts),
            onValueChanged: _ref3 => {
                let {
                    value: value
                } = _ref3;
                const hours = this._getValue().getHours();
                const time = new Date(this._getValue());
                const newHours = (hours + 12 * value) % 24;
                time.setHours(newHours);
                this.option("value", time)
            },
            value: this._getValue().getHours() >= 12 ? 1 : -1,
            stylingMode: this.option("stylingMode")
        });
        editor.setAria("label", "type")
    },
    _refreshFormat12() {
        if (this.option("use24HourFormat")) {
            return
        }
        const value = this._getValue();
        const hours = value.getHours();
        const isPM = hours >= 12;
        const newValue = isPM ? 1 : -1;
        this._silentEditorValueUpdate(this._format12, newValue)
    },
    _silentEditorValueUpdate(editor, value) {
        if (editor) {
            editor._suppressValueChangeAction();
            editor.option("value", value);
            editor._resumeValueChangeAction()
        }
    },
    _getNumberBoxConfig() {
        return {
            showSpinButtons: true,
            displayValueFormatter: value => (value < 10 ? "0" : "") + value,
            stylingMode: this.option("stylingMode")
        }
    },
    _normalizeHours(hours) {
        return this.option("use24HourFormat") ? hours : hours % 12 || 12
    },
    _updateField() {
        const hours = this._normalizeHours(this._getValue().getHours());
        this._silentEditorValueUpdate(this._hourBox, hours);
        this._silentEditorValueUpdate(this._minuteBox, this._getValue().getMinutes());
        this._refreshFormat12()
    },
    _updateTime() {
        if (this.option("_showClock")) {
            this._updateClock()
        }
        this._updateField()
    },
    _visibilityChanged(visible) {
        if (visible) {
            this._updateTime()
        }
    },
    _optionChanged(args) {
        switch (args.name) {
            case "value":
                this._updateTime();
                this.callBase(args);
                break;
            case "_arrowOffset":
                break;
            case "use24HourFormat":
            case "_showClock":
            case "stylingMode":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxTimeView", TimeView);
export default TimeView;
