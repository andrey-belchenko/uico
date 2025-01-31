/**
 * DevExtreme (esm/__internal/ui/calendar/m_calendar.range.selection.strategy.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateUtils from "../../../core/utils/date";
import CalendarSelectionStrategy from "./m_calendar.selection.strategy";
const DAY_INTERVAL = 864e5;
class CalendarRangeSelectionStrategy extends CalendarSelectionStrategy {
    constructor(component) {
        super(component);
        this.NAME = "RangeSelection"
    }
    getViewOptions() {
        const value = this._getValue();
        const range = this._getDaysInRange(value[0], value[1]);
        return {
            value: value,
            range: range,
            selectionMode: "range",
            onCellHover: this._cellHoverHandler.bind(this),
            onWeekNumberClick: this._shouldHandleWeekNumberClick() ? this._weekNumberClickHandler.bind(this) : null
        }
    }
    selectValue(selectedValue, e) {
        const [startDate, endDate] = this._getValue();
        this.skipNavigate();
        this._updateCurrentDate(selectedValue);
        this._currentDateChanged = true;
        if (true === this.calendar.option("_allowChangeSelectionOrder")) {
            this.calendar._valueSelected = true;
            if ("startDate" === this.calendar.option("_currentSelection")) {
                if (this.calendar._convertToDate(selectedValue) > this.calendar._convertToDate(endDate)) {
                    this.dateValue([selectedValue, null], e)
                } else {
                    this.dateValue([selectedValue, endDate], e)
                }
            } else if (this.calendar._convertToDate(selectedValue) >= this.calendar._convertToDate(startDate)) {
                this.dateValue([startDate, selectedValue], e)
            } else {
                this.dateValue([selectedValue, null], e)
            }
        } else if (!startDate || endDate) {
            this.dateValue([selectedValue, null], e)
        } else {
            this.dateValue(startDate < selectedValue ? [startDate, selectedValue] : [selectedValue, startDate], e)
        }
    }
    updateAriaSelected(value, previousValue) {
        value ?? (value = this._getValue());
        previousValue ?? (previousValue = []);
        super.updateAriaSelected(value, previousValue)
    }
    processValueChanged(value, previousValue) {
        super.processValueChanged(value, previousValue);
        const range = this._getRange();
        this._updateViewsOption("range", range)
    }
    getDefaultCurrentDate() {
        const {
            _allowChangeSelectionOrder: _allowChangeSelectionOrder,
            _currentSelection: _currentSelection
        } = this.calendar.option();
        const value = this.dateOption("value");
        if (_allowChangeSelectionOrder) {
            if ("startDate" === _currentSelection && value[0]) {
                return value[0]
            }
            if ("endDate" === _currentSelection && value[1]) {
                return value[1]
            }
        }
        const dates = value.filter((value => value));
        return this._getLowestDateInArray(dates)
    }
    restoreValue() {
        this.calendar.option("value", [null, null])
    }
    _getValue() {
        const value = this.dateOption("value");
        if (!value.length) {
            return value
        }
        let [startDate, endDate] = value;
        if (startDate && endDate && startDate > endDate) {
            [startDate, endDate] = [endDate, startDate]
        }
        return [startDate, endDate]
    }
    _getRange() {
        const [startDate, endDate] = this._getValue();
        return this._getDaysInRange(startDate, endDate)
    }
    _getDaysInRange(startDate, endDate) {
        if (!startDate || !endDate) {
            return []
        }
        const {
            currentDate: currentDate,
            viewsCount: viewsCount
        } = this.calendar.option();
        const isAdditionalViewDate = this.calendar._isAdditionalViewDate(currentDate);
        const firstDateInViews = dateUtils.getFirstMonthDate(dateUtils.addDateInterval(currentDate, "month", isAdditionalViewDate ? -2 : -1));
        const lastDateInViews = dateUtils.getLastMonthDate(dateUtils.addDateInterval(currentDate, "month", isAdditionalViewDate ? 1 : viewsCount));
        const rangeStartDate = new Date(Math.max(firstDateInViews, startDate));
        const rangeEndDate = new Date(Math.min(lastDateInViews, endDate));
        return [...dateUtils.getDatesOfInterval(rangeStartDate, rangeEndDate, 864e5), rangeEndDate]
    }
    _cellHoverHandler(e) {
        const isMaxZoomLevel = this._isMaxZoomLevel();
        const [startDate, endDate] = this._getValue();
        const {
            _allowChangeSelectionOrder: _allowChangeSelectionOrder,
            _currentSelection: _currentSelection
        } = this.calendar.option();
        if (isMaxZoomLevel) {
            const skipHoveredRange = _allowChangeSelectionOrder && "startDate" === _currentSelection;
            if (startDate && !endDate && !skipHoveredRange) {
                if (e.value > startDate) {
                    this._updateViewsOption("hoveredRange", this._getDaysInRange(startDate, e.value));
                    return
                }
            } else if (!startDate && endDate && !(_allowChangeSelectionOrder && "endDate" === _currentSelection)) {
                if (e.value < endDate) {
                    this._updateViewsOption("hoveredRange", this._getDaysInRange(e.value, endDate));
                    return
                }
            } else if (startDate && endDate) {
                if ("startDate" === _currentSelection && e.value < startDate) {
                    this._updateViewsOption("hoveredRange", this._getDaysInRange(e.value, startDate));
                    return
                }
                if ("endDate" === _currentSelection && e.value > endDate) {
                    this._updateViewsOption("hoveredRange", this._getDaysInRange(endDate, e.value));
                    return
                }
            }
            this._updateViewsOption("hoveredRange", [])
        }
    }
    _weekNumberClickHandler(_ref) {
        let {
            rowDates: rowDates,
            event: event
        } = _ref;
        const selectedDates = rowDates.filter((date => !this._isDateDisabled(date)));
        const value = selectedDates.length ? [selectedDates[0], selectedDates[selectedDates.length - 1]] : [null, null];
        this.dateValue(value, event)
    }
}
export default CalendarRangeSelectionStrategy;
