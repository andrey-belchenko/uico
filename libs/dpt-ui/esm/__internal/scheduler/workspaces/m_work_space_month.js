/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_work_space_month.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from "../../../core/component_registrator";
import {
    noop
} from "../../../core/utils/common";
import dateUtils from "../../../core/utils/date";
import {
    getBoundingRect
} from "../../../core/utils/position";
import {
    hasWindow
} from "../../../core/utils/window";
import {
    DateTableMonthComponent
} from "../../scheduler/r1/components/index";
import {
    formatWeekday,
    monthUtils
} from "../../scheduler/r1/utils/index";
import {
    VIEWS
} from "../m_constants";
import {
    utils
} from "../m_utils";
import SchedulerWorkSpace from "./m_work_space_indicator";
const MONTH_CLASS = "dx-scheduler-work-space-month";
const DATE_TABLE_CURRENT_DATE_CLASS = "dx-scheduler-date-table-current-date";
const DATE_TABLE_CELL_TEXT_CLASS = "dx-scheduler-date-table-cell-text";
const DATE_TABLE_FIRST_OF_MONTH_CLASS = "dx-scheduler-date-table-first-of-month";
const DATE_TABLE_OTHER_MONTH_DATE_CLASS = "dx-scheduler-date-table-other-month";
const toMs = dateUtils.dateToMilliseconds;
class SchedulerWorkSpaceMonth extends SchedulerWorkSpace {
    get type() {
        return VIEWS.MONTH
    }
    _getElementClass() {
        return MONTH_CLASS
    }
    _getFormat() {
        return formatWeekday
    }
    _getIntervalBetween(currentDate) {
        const firstViewDate = this.getStartViewDate();
        const timeZoneOffset = dateUtils.getTimezonesDifference(firstViewDate, currentDate);
        return currentDate.getTime() - (firstViewDate.getTime() - 36e5 * this.option("startDayHour")) - timeZoneOffset
    }
    _getDateGenerationOptions() {
        return _extends({}, super._getDateGenerationOptions(), {
            cellCountInDay: 1
        })
    }
    getCellWidth() {
        return this.cache.get("cellWidth", (() => {
            let averageWidth = 0;
            const cells = this._getCells().slice(0, 7);
            cells.each(((index, element) => {
                averageWidth += hasWindow() ? getBoundingRect(element).width : 0
            }));
            return 0 === cells.length ? void 0 : averageWidth / 7
        }))
    }
    _insertAllDayRowsIntoDateTable() {
        return false
    }
    _getCellCoordinatesByIndex(index) {
        const rowIndex = Math.floor(index / this._getCellCount());
        const columnIndex = index - this._getCellCount() * rowIndex;
        return {
            rowIndex: rowIndex,
            columnIndex: columnIndex
        }
    }
    _needCreateCrossScrolling() {
        return this.option("crossScrollingEnabled") || this._isVerticalGroupedWorkSpace()
    }
    _getViewStartByOptions() {
        return monthUtils.getViewStartByOptions(this.option("startDate"), this.option("currentDate"), this.option("intervalCount"), dateUtils.getFirstMonthDate(this.option("startDate")))
    }
    _updateIndex(index) {
        return index
    }
    isIndicationAvailable() {
        return false
    }
    getIntervalDuration() {
        return toMs("day")
    }
    getTimePanelWidth() {
        return 0
    }
    supportAllDayRow() {
        return false
    }
    keepOriginalHours() {
        return true
    }
    getWorkSpaceLeftOffset() {
        return 0
    }
    needApplyCollectorOffset() {
        return true
    }
    _getHeaderDate() {
        return this._getViewStartByOptions()
    }
    scrollToTime() {
        return noop()
    }
    renderRAllDayPanel() {}
    renderRTimeTable() {}
    renderRDateTable() {
        utils.renovation.renderComponent(this, this._$dateTable, DateTableMonthComponent, "renovatedDateTable", this._getRDateTableProps())
    }
    _createWorkSpaceElements() {
        if (this._isVerticalGroupedWorkSpace()) {
            this._createWorkSpaceScrollableElements()
        } else {
            super._createWorkSpaceElements()
        }
    }
    _toggleAllDayVisibility() {
        return noop()
    }
    _changeAllDayVisibility() {
        return noop()
    }
    _renderTimePanel() {
        return noop()
    }
    _renderAllDayPanel() {
        return noop()
    }
    _setMonthClassesToCell($cell, data) {
        $cell.toggleClass(DATE_TABLE_CURRENT_DATE_CLASS, data.isCurrentDate).toggleClass(DATE_TABLE_FIRST_OF_MONTH_CLASS, data.firstDayOfMonth).toggleClass(DATE_TABLE_OTHER_MONTH_DATE_CLASS, data.otherMonth)
    }
    _createAllDayPanelElements() {}
    _renderTableBody(options) {
        options.getCellText = (rowIndex, columnIndex) => {
            const date = this.viewDataProvider.completeViewDataMap[rowIndex][columnIndex].startDate;
            return monthUtils.getCellText(date, this.option("intervalCount"))
        };
        options.getCellTextClass = DATE_TABLE_CELL_TEXT_CLASS;
        options.setAdditionalClasses = this._setMonthClassesToCell.bind(this);
        super._renderTableBody(options)
    }
}
registerComponent("dxSchedulerWorkSpaceMonth", SchedulerWorkSpaceMonth);
export default SchedulerWorkSpaceMonth;
