/**
 * DevExtreme (esm/__internal/scheduler/header/m_header.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import "../../../ui/button_group";
import "../../../ui/drop_down_button";
import registerComponent from "../../../core/component_registrator";
import devices from "../../../core/devices";
import errors from "../../../core/errors";
import $ from "../../../core/renderer";
import dateUtils from "../../../core/utils/date";
import {
    extend
} from "../../../core/utils/extend";
import Toolbar from "../../../ui/toolbar";
import Widget from "../../../ui/widget/ui.widget";
import {
    viewsUtils
} from "../../scheduler/r1/utils/index";
import SchedulerCalendar from "./m_calendar";
import {
    getDateNavigator
} from "./m_date_navigator";
import {
    getCaption,
    getNextIntervalDate,
    getStep,
    getViewName,
    getViewType,
    nextWeek,
    validateViews
} from "./m_utils";
import {
    getDropDownViewSwitcher,
    getViewSwitcher
} from "./m_view_switcher";
const DEFAULT_ELEMENT = "defaultElement";
const VIEW_SWITCHER = "viewSwitcher";
const DATE_NAVIGATOR = "dateNavigator";
const COMPONENT_CLASS = "dx-scheduler-header";
export class SchedulerHeader extends Widget {
    get views() {
        return this.option("views")
    }
    get captionText() {
        return this._getCaption().text
    }
    get intervalOptions() {
        const step = getStep(this.currentView);
        const intervalCount = this.option("intervalCount");
        const firstDayOfWeek = this.option("firstDayOfWeek");
        const agendaDuration = this.option("agendaDuration");
        return {
            step: step,
            intervalCount: intervalCount,
            firstDayOfWeek: firstDayOfWeek,
            agendaDuration: agendaDuration
        }
    }
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            _useShortDateFormat: !devices.real().generic || devices.isSimulator()
        })
    }
    _createEventMap() {
        this.eventMap = new Map([
            ["currentView", [view => {
                this.currentView = viewsUtils.getCurrentView(getViewName(view), this.option("views"))
            }]],
            ["items", [this.repaint.bind(this)]],
            ["views", [validateViews]],
            ["currentDate", [this._getCalendarOptionUpdater("value")]],
            ["min", [this._getCalendarOptionUpdater("min")]],
            ["max", [this._getCalendarOptionUpdater("max")]],
            ["tabIndex", [this.repaint.bind(this)]],
            ["focusStateEnabled", [this.repaint.bind(this)]],
            ["useDropDownViewSwitcher", [this.repaint.bind(this)]]
        ])
    }
    _addEvent(name, event) {
        if (!this.eventMap.has(name)) {
            this.eventMap.set(name, [])
        }
        const events = this.eventMap.get(name);
        this.eventMap.set(name, [...events, event])
    }
    _optionChanged(args) {
        const {
            name: name,
            value: value
        } = args;
        if (this.eventMap.has(name)) {
            const events = this.eventMap.get(name);
            events.forEach((event => {
                event(value)
            }))
        }
    }
    _init() {
        super._init();
        this._createEventMap();
        this.$element().addClass(COMPONENT_CLASS);
        this.currentView = viewsUtils.getCurrentView(getViewName(this.option("currentView")), this.option("views"))
    }
    _render() {
        super._render();
        this._createEventMap();
        this._renderToolbar()
    }
    _renderToolbar() {
        const config = this._createToolbarConfig();
        const toolbarElement = $("<div>");
        toolbarElement.appendTo(this.$element());
        this._toolbar = this._createComponent(toolbarElement, Toolbar, config)
    }
    _createToolbarConfig() {
        const items = this.option("items");
        const parsedItems = items.map((element => this._parseItem(element)));
        return {
            items: parsedItems
        }
    }
    _parseItem(item) {
        const isDefaultElement = this._isDefaultItem(item);
        if (isDefaultElement) {
            const defaultElementType = item[DEFAULT_ELEMENT];
            switch (defaultElementType) {
                case VIEW_SWITCHER:
                    if (this.option("useDropDownViewSwitcher")) {
                        return getDropDownViewSwitcher(this, item)
                    }
                    return getViewSwitcher(this, item);
                case DATE_NAVIGATOR:
                    this._renderCalendar();
                    return getDateNavigator(this, item);
                default:
                    errors.log(`Unknown default element type: ${defaultElementType}`)
            }
        }
        return item
    }
    _callEvent(event, arg) {
        if (this.eventMap.has(event)) {
            const events = this.eventMap.get(event);
            events.forEach((event => event(arg)))
        }
    }
    _updateCurrentView(view) {
        const onCurrentViewChange = this.option("onCurrentViewChange");
        onCurrentViewChange(view.name);
        this._callEvent("currentView", view)
    }
    _updateCalendarValueAndCurrentDate(date) {
        this._updateCurrentDate(date);
        this._calendar.option("value", date)
    }
    _updateCurrentDate(date) {
        const onCurrentDateChange = this.option("onCurrentDateChange");
        onCurrentDateChange(date);
        this._callEvent("currentDate", date)
    }
    _renderCalendar() {
        this._calendar = this._createComponent("<div>", SchedulerCalendar, {
            value: this.option("currentDate"),
            min: this.option("min"),
            max: this.option("max"),
            firstDayOfWeek: this.option("firstDayOfWeek"),
            focusStateEnabled: this.option("focusStateEnabled"),
            tabIndex: this.option("tabIndex"),
            onValueChanged: e => {
                this._updateCurrentDate(e.value);
                this._calendar.hide()
            }
        });
        this._calendar.$element().appendTo(this.$element())
    }
    _getCalendarOptionUpdater(name) {
        return value => {
            if (this._calendar) {
                this._calendar.option(name, value)
            }
        }
    }
    _getNextDate(direction) {
        let initialDate = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        const date = initialDate ?? this.option("currentDate");
        const options = _extends({}, this.intervalOptions, {
            date: date
        });
        return getNextIntervalDate(options, direction)
    }
    _isMonth() {
        const {
            currentView: currentView
        } = this;
        return "month" === getViewType(currentView)
    }
    _getDisplayedDate() {
        const startViewDate = this.option("startViewDate");
        if (this._isMonth()) {
            return nextWeek(startViewDate)
        }
        return new Date(startViewDate)
    }
    _getCaption() {
        let date = this.option("currentDate");
        if (this.option("startViewDate")) {
            date = this._getDisplayedDate()
        }
        date = dateUtils.trimTime(date);
        const options = _extends({}, this.intervalOptions, {
            date: date
        });
        const customizationFunction = this.option("customizeDateNavigatorText");
        const useShortDateFormat = this.option("_useShortDateFormat");
        return getCaption(options, useShortDateFormat, customizationFunction)
    }
    _updateDateByDirection(direction) {
        const date = this._getNextDate(direction);
        this._updateCalendarValueAndCurrentDate(date)
    }
    _showCalendar(e) {
        this._calendar.show(e.element)
    }
    _hideCalendar() {
        this._calendar.hide()
    }
    _isDefaultItem(item) {
        return Object.prototype.hasOwnProperty.call(item, DEFAULT_ELEMENT)
    }
}
registerComponent("dxSchedulerHeader", SchedulerHeader);
