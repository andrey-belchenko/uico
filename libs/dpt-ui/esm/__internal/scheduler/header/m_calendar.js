/**
 * DevExtreme (esm/__internal/scheduler/header/m_calendar.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import devices from "../../../core/devices";
import $ from "../../../core/renderer";
import Calendar from "../../../ui/calendar";
import Popover from "../../../ui/popover/ui.popover";
import Popup from "../../../ui/popup/ui.popup";
import Scrollable from "../../../ui/scroll_view/ui.scrollable";
import Widget from "../../../ui/widget/ui.widget";
const CALENDAR_CLASS = "dx-scheduler-navigator-calendar";
const CALENDAR_POPOVER_CLASS = "dx-scheduler-navigator-calendar-popover";
export default class SchedulerCalendar extends Widget {
    show(target) {
        if (!this._isMobileLayout()) {
            this._overlay.option("target", target)
        }
        this._overlay.show()
    }
    hide() {
        this._overlay.hide()
    }
    _keyboardHandler(opts) {
        var _this$_calendar;
        null === (_this$_calendar = this._calendar) || void 0 === _this$_calendar || _this$_calendar._keyboardHandler(opts)
    }
    _init() {
        super._init();
        this.$element()
    }
    _render() {
        super._render();
        this._renderOverlay()
    }
    _renderOverlay() {
        this.$element().addClass(CALENDAR_POPOVER_CLASS);
        const isMobileLayout = this._isMobileLayout();
        const overlayType = isMobileLayout ? Popup : Popover;
        this._overlay = this._createComponent(this.$element(), overlayType, {
            contentTemplate: () => this._createOverlayContent(),
            onShown: () => this._calendar.focus(),
            defaultOptionsRules: [{
                device: () => isMobileLayout,
                options: {
                    fullScreen: true,
                    showCloseButton: false,
                    toolbarItems: [{
                        shortcut: "cancel"
                    }],
                    _ignorePreventScrollEventsDeprecation: true,
                    preventScrollEvents: false,
                    enableBodyScroll: false
                }
            }]
        })
    }
    _createOverlayContent() {
        const result = $("<div>").addClass(CALENDAR_CLASS);
        this._calendar = this._createComponent(result, Calendar, this._getCalendarOptions());
        if (this._isMobileLayout()) {
            const scrollable = this._createScrollable(result);
            return scrollable.$element()
        }
        return result
    }
    _createScrollable(content) {
        const result = this._createComponent("<div>", Scrollable, {
            height: "auto",
            direction: "both"
        });
        result.$content().append(content);
        return result
    }
    _optionChanged(_ref) {
        var _this$_calendar2;
        let {
            name: name,
            value: value
        } = _ref;
        if ("value" === name) {
            null === (_this$_calendar2 = this._calendar) || void 0 === _this$_calendar2 || _this$_calendar2.option("value", value)
        }
    }
    _getCalendarOptions() {
        return {
            value: this.option("value"),
            min: this.option("min"),
            max: this.option("max"),
            firstDayOfWeek: this.option("firstDayOfWeek"),
            focusStateEnabled: this.option("focusStateEnabled"),
            onValueChanged: this.option("onValueChanged"),
            skipFocusCheck: true,
            tabIndex: this.option("tabIndex")
        }
    }
    _isMobileLayout() {
        return !devices.current().generic
    }
}
registerComponent("dxSchedulerCalendarPopup", SchedulerCalendar);
