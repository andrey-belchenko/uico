/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_work_space_indicator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import $ from "../../../core/renderer";
import dateUtils from "../../../core/utils/date";
import {
    extend
} from "../../../core/utils/extend";
import {
    getBoundingRect
} from "../../../core/utils/position";
import {
    setWidth
} from "../../../core/utils/size";
import {
    hasWindow
} from "../../../core/utils/window";
import {
    dateUtilsTs
} from "../../core/utils/date";
import {
    getToday
} from "../../scheduler/r1/utils/index";
import {
    HEADER_CURRENT_TIME_CELL_CLASS
} from "../m_classes";
import timezoneUtils from "../m_utils_time_zone";
import SchedulerWorkSpace from "./m_work_space";
const toMs = dateUtils.dateToMilliseconds;
const SCHEDULER_DATE_TIME_INDICATOR_CLASS = "dx-scheduler-date-time-indicator";
const TIME_PANEL_CURRENT_TIME_CELL_CLASS = "dx-scheduler-time-panel-current-time-cell";
class SchedulerWorkSpaceIndicator extends SchedulerWorkSpace {
    _getToday() {
        const viewOffset = this.option("viewOffset");
        const today = getToday(this.option("indicatorTime"), this.timeZoneCalculator);
        return dateUtilsTs.addOffsets(today, [-viewOffset])
    }
    isIndicationOnView() {
        if (this.option("showCurrentTimeIndicator")) {
            const today = this._getToday();
            const endViewDate = dateUtils.trimTime(this.getEndViewDate());
            return dateUtils.dateInRange(today, this.getStartViewDate(), new Date(endViewDate.getTime() + toMs("day")))
        }
        return false
    }
    isIndicationAvailable() {
        if (!hasWindow()) {
            return false
        }
        const today = this._getToday();
        return today >= dateUtils.trimTime(new Date(this.getStartViewDate()))
    }
    isIndicatorVisible() {
        const today = this._getToday();
        const endViewDate = new Date(this.getEndViewDate().getTime() + toMs("minute") - 1);
        const firstViewDate = new Date(this.getStartViewDate());
        firstViewDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
        endViewDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
        return dateUtils.dateInRange(today, firstViewDate, endViewDate)
    }
    _renderIndicator(height, rtlOffset, $container, groupCount) {
        const groupedByDate = this.isGroupedByDate();
        const repeatCount = groupedByDate ? 1 : groupCount;
        for (let i = 0; i < repeatCount; i++) {
            const $indicator = this._createIndicator($container);
            setWidth($indicator, groupedByDate ? this.getCellWidth() * groupCount : this.getCellWidth());
            this._groupedStrategy.shiftIndicator($indicator, height, rtlOffset, i)
        }
    }
    _createIndicator($container) {
        const $indicator = $("<div>").addClass("dx-scheduler-date-time-indicator");
        $container.append($indicator);
        return $indicator
    }
    _getRtlOffset(width) {
        return this.option("rtlEnabled") ? getBoundingRect(this._dateTableScrollable.$content().get(0)).width - this.getTimePanelWidth() - width : 0
    }
    _setIndicationUpdateInterval() {
        if (!this.option("showCurrentTimeIndicator") || 0 === this.option("indicatorUpdateInterval")) {
            return
        }
        this._clearIndicatorUpdateInterval();
        this._indicatorInterval = setInterval((() => {
            this.renderCurrentDateTimeIndication()
        }), this.option("indicatorUpdateInterval"))
    }
    _clearIndicatorUpdateInterval() {
        if (this._indicatorInterval) {
            clearInterval(this._indicatorInterval);
            delete this._indicatorInterval
        }
    }
    _isVerticalShader() {
        return true
    }
    getIndicationWidth(groupIndex) {
        const maxWidth = this.getCellWidth() * this._getCellCount();
        let difference = this._getIndicatorDuration();
        if (difference > this._getCellCount()) {
            difference = this._getCellCount()
        }
        const width = difference * this.getRoundedCellWidth(groupIndex, groupIndex * this._getCellCount(), difference);
        return maxWidth < width ? maxWidth : width
    }
    getIndicatorOffset(groupIndex) {
        const difference = this._getIndicatorDuration() - 1;
        const offset = difference * this.getRoundedCellWidth(groupIndex, groupIndex * this._getCellCount(), difference);
        return offset
    }
    _getIndicatorDuration() {
        const today = this._getToday();
        const firstViewDate = new Date(this.getStartViewDate());
        let timeDiff = today.getTime() - firstViewDate.getTime();
        if ("workWeek" === this.option("type")) {
            timeDiff -= this._getWeekendsCount(Math.round(timeDiff / toMs("day"))) * toMs("day")
        }
        return Math.ceil((timeDiff + 1) / toMs("day"))
    }
    getIndicationHeight() {
        const today = timezoneUtils.getDateWithoutTimezoneChange(this._getToday());
        const cellHeight = this.getCellHeight();
        const date = new Date(this.getStartViewDate());
        if (this.isIndicationOnView()) {
            date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate())
        }
        const duration = today.getTime() - date.getTime();
        const cellCount = duration / this.getCellDuration();
        return cellCount * cellHeight
    }
    _dispose() {
        this._clearIndicatorUpdateInterval();
        super._dispose.apply(this, arguments)
    }
    renderCurrentDateTimeIndication() {
        this.renderCurrentDateTimeLineAndShader();
        if (this.isRenovatedRender()) {
            this.renderWorkSpace({
                generateNewData: true,
                renderComponents: {
                    header: true,
                    timePanel: true
                }
            })
        }
    }
    renderCurrentDateTimeLineAndShader() {
        var _this$_shader;
        this._cleanDateTimeIndicator();
        null === (_this$_shader = this._shader) || void 0 === _this$_shader || _this$_shader.clean();
        this._renderDateTimeIndication()
    }
    _isCurrentTimeHeaderCell(headerIndex) {
        if (this.isIndicationOnView()) {
            const {
                completeDateHeaderMap: completeDateHeaderMap
            } = this.viewDataProvider;
            const date = completeDateHeaderMap[completeDateHeaderMap.length - 1][headerIndex].startDate;
            return dateUtils.sameDate(date, this._getToday())
        }
        return false
    }
    _getHeaderPanelCellClass(i) {
        const cellClass = super._getHeaderPanelCellClass(i);
        if (this._isCurrentTimeHeaderCell(i)) {
            return `${cellClass} ${HEADER_CURRENT_TIME_CELL_CLASS}`
        }
        return cellClass
    }
    _cleanView() {
        super._cleanView();
        this._cleanDateTimeIndicator()
    }
    _dimensionChanged() {
        super._dimensionChanged();
        this.renderCurrentDateTimeLineAndShader()
    }
    _cleanDateTimeIndicator() {
        this.$element().find(".dx-scheduler-date-time-indicator").remove()
    }
    _cleanWorkSpace() {
        super._cleanWorkSpace();
        this._renderDateTimeIndication();
        this._setIndicationUpdateInterval()
    }
    _optionChanged(args) {
        switch (args.name) {
            case "showCurrentTimeIndicator":
            case "indicatorTime":
                this._cleanWorkSpace();
                break;
            case "indicatorUpdateInterval":
                this._setIndicationUpdateInterval();
                break;
            case "showAllDayPanel":
            case "allDayExpanded":
            case "crossScrollingEnabled":
                super._optionChanged(args);
                this.renderCurrentDateTimeIndication();
                break;
            case "shadeUntilCurrentTime":
                this.renderCurrentDateTimeIndication();
                break;
            default:
                super._optionChanged(args)
        }
    }
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            showCurrentTimeIndicator: true,
            indicatorTime: new Date,
            indicatorUpdateInterval: 5 * toMs("minute"),
            shadeUntilCurrentTime: true
        })
    }
    _getCurrentTimePanelCellIndices() {
        const rowCountPerGroup = this._getTimePanelRowCount();
        const today = this._getToday();
        const index = this.getCellIndexByDate(today);
        const {
            rowIndex: currentTimeRowIndex
        } = this._getCellCoordinatesByIndex(index);
        if (void 0 === currentTimeRowIndex) {
            return []
        }
        let cellIndices;
        if (0 === currentTimeRowIndex) {
            cellIndices = [currentTimeRowIndex]
        } else {
            cellIndices = currentTimeRowIndex % 2 === 0 ? [currentTimeRowIndex - 1, currentTimeRowIndex] : [currentTimeRowIndex, currentTimeRowIndex + 1]
        }
        const verticalGroupCount = this._isVerticalGroupedWorkSpace() ? this._getGroupCount() : 1;
        return [...new Array(verticalGroupCount)].reduce(((currentIndices, _, groupIndex) => [...currentIndices, ...cellIndices.map((cellIndex => rowCountPerGroup * groupIndex + cellIndex))]), [])
    }
    _renderDateTimeIndication() {
        if (!this.isIndicationAvailable()) {
            return
        }
        if (this.option("shadeUntilCurrentTime")) {
            this._shader.render()
        }
        if (!this.isIndicationOnView() || !this.isIndicatorVisible()) {
            return
        }
        const groupCount = this._getGroupCount() || 1;
        const $container = this._dateTableScrollable.$content();
        const height = this.getIndicationHeight();
        const rtlOffset = this._getRtlOffset(this.getCellWidth());
        this._renderIndicator(height, rtlOffset, $container, groupCount);
        if (!this.isRenovatedRender()) {
            this._setCurrentTimeCells()
        }
    }
    _setCurrentTimeCells() {
        const timePanelCells = this._getTimePanelCells();
        const currentTimeCellIndices = this._getCurrentTimePanelCellIndices();
        currentTimeCellIndices.forEach((timePanelCellIndex => {
            timePanelCells.eq(timePanelCellIndex).addClass(TIME_PANEL_CURRENT_TIME_CELL_CLASS)
        }))
    }
    _cleanCurrentTimeCells() {
        this.$element().find(`.${TIME_PANEL_CURRENT_TIME_CELL_CLASS}`).removeClass(TIME_PANEL_CURRENT_TIME_CELL_CLASS)
    }
}
registerComponent("dxSchedulerWorkSpace", SchedulerWorkSpaceIndicator);
export default SchedulerWorkSpaceIndicator;
