/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_work_space_grouped_strategy_vertical.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getBoundingRect
} from "../../../core/utils/position";
import {
    calculateDayDuration,
    getVerticalGroupCountClass
} from "../../scheduler/r1/utils/index";
import {
    WORK_SPACE_BORDER_PX
} from "../../scheduler/workspaces/const";
import {
    FIRST_GROUP_CELL_CLASS,
    LAST_GROUP_CELL_CLASS
} from "../m_classes";
import {
    Cache
} from "./m_cache";
class VerticalGroupedStrategy {
    constructor(_workSpace) {
        this._workSpace = _workSpace;
        this.cache = new Cache
    }
    prepareCellIndexes(cellCoordinates, groupIndex, inAllDayRow) {
        let rowIndex = cellCoordinates.rowIndex + groupIndex * this._workSpace._getRowCount();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            rowIndex += groupIndex;
            if (!inAllDayRow) {
                rowIndex += 1
            }
        }
        return {
            rowIndex: rowIndex,
            columnIndex: cellCoordinates.columnIndex
        }
    }
    getGroupIndex(rowIndex) {
        return Math.floor(rowIndex / this._workSpace._getRowCount())
    }
    calculateHeaderCellRepeatCount() {
        return 1
    }
    insertAllDayRowsIntoDateTable() {
        return this._workSpace.option("showAllDayPanel")
    }
    getTotalCellCount() {
        return this._workSpace._getCellCount()
    }
    getTotalRowCount() {
        return this._workSpace._getRowCount() * this._workSpace._getGroupCount()
    }
    calculateTimeCellRepeatCount() {
        return this._workSpace._getGroupCount() || 1
    }
    getWorkSpaceMinWidth() {
        let minWidth = this._workSpace._getWorkSpaceWidth();
        const workSpaceElementWidth = getBoundingRect(this._workSpace.$element().get(0)).width;
        const workspaceContainerWidth = workSpaceElementWidth - this._workSpace.getTimePanelWidth() - this._workSpace.getGroupTableWidth() - 2 * WORK_SPACE_BORDER_PX;
        if (minWidth < workspaceContainerWidth) {
            minWidth = workspaceContainerWidth
        }
        return minWidth
    }
    getAllDayOffset() {
        return 0
    }
    getGroupCountClass(groups) {
        return getVerticalGroupCountClass(groups)
    }
    getLeftOffset() {
        return this._workSpace.getTimePanelWidth() + this._workSpace.getGroupTableWidth()
    }
    getGroupBoundsOffset(groupIndex, _ref) {
        let [$firstCell, $lastCell] = _ref;
        return this.cache.get(`groupBoundsOffset${groupIndex}`, (() => {
            const startDayHour = this._workSpace.option("startDayHour");
            const endDayHour = this._workSpace.option("endDayHour");
            const hoursInterval = this._workSpace.option("hoursInterval");
            const dayHeight = calculateDayDuration(startDayHour, endDayHour) / hoursInterval * this._workSpace.getCellHeight();
            const scrollTop = this.getScrollableScrollTop();
            const headerRowHeight = getBoundingRect(this._workSpace._$headerPanelContainer.get(0)).height;
            let topOffset = groupIndex * dayHeight + headerRowHeight + this._workSpace.option("getHeaderHeight")() - scrollTop;
            if (this._workSpace.option("showAllDayPanel") && this._workSpace.supportAllDayRow()) {
                topOffset += this._workSpace.getCellHeight() * (groupIndex + 1)
            }
            const bottomOffset = topOffset + dayHeight;
            const {
                left: left
            } = $firstCell.getBoundingClientRect();
            const {
                right: right
            } = $lastCell.getBoundingClientRect();
            this._groupBoundsOffset = {
                left: left,
                right: right,
                top: topOffset,
                bottom: bottomOffset
            };
            return this._groupBoundsOffset
        }))
    }
    shiftIndicator($indicator, height, rtlOffset, i) {
        const offset = this._workSpace.getIndicatorOffset(0);
        const tableOffset = this._workSpace.option("crossScrollingEnabled") ? 0 : this._workSpace.getGroupTableWidth();
        const horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
        let verticalOffset = this._workSpace._getRowCount() * this._workSpace.getCellHeight() * i;
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            verticalOffset += this._workSpace.getAllDayHeight() * (i + 1)
        }
        $indicator.css("left", horizontalOffset + tableOffset);
        $indicator.css("top", height + verticalOffset)
    }
    getShaderOffset(i, width) {
        const offset = this._workSpace.option("crossScrollingEnabled") ? 0 : this._workSpace.getGroupTableWidth();
        return this._workSpace.option("rtlEnabled") ? getBoundingRect(this._$container.get(0)).width - offset - this._workSpace.getWorkSpaceLeftOffset() - width : offset
    }
    getShaderTopOffset(i) {
        return 0
    }
    getShaderHeight() {
        let height = this._workSpace.getIndicationHeight();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            height += this._workSpace.getCellHeight()
        }
        return height
    }
    getShaderMaxHeight() {
        let height = this._workSpace._getRowCount() * this._workSpace.getCellHeight();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            height += this._workSpace.getCellHeight()
        }
        return height
    }
    getShaderWidth() {
        return this._workSpace.getIndicationWidth(0)
    }
    getScrollableScrollTop() {
        return this._workSpace.getScrollable().scrollTop()
    }
    addAdditionalGroupCellClasses(cellClass, index, i, j) {
        cellClass = this._addLastGroupCellClass(cellClass, i + 1);
        return this._addFirstGroupCellClass(cellClass, i + 1)
    }
    _addLastGroupCellClass(cellClass, index) {
        if (index % this._workSpace._getRowCount() === 0) {
            return `${cellClass} ${LAST_GROUP_CELL_CLASS}`
        }
        return cellClass
    }
    _addFirstGroupCellClass(cellClass, index) {
        if ((index - 1) % this._workSpace._getRowCount() === 0) {
            return `${cellClass} ${FIRST_GROUP_CELL_CLASS}`
        }
        return cellClass
    }
}
export default VerticalGroupedStrategy;
