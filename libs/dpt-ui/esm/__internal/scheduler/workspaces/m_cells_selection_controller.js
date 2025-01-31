/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_cells_selection_controller.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    isDateAndTimeView
} from "../../scheduler/r1/utils/index";
export class CellsSelectionController {
    handleArrowClick(options) {
        const {
            key: key,
            focusedCellPosition: focusedCellPosition,
            edgeIndices: edgeIndices,
            getCellDataByPosition: getCellDataByPosition,
            isAllDayPanelCell: isAllDayPanelCell
        } = options;
        let nextCellIndices;
        switch (key) {
            case "down":
                nextCellIndices = this.getCellFromNextRowPosition(focusedCellPosition, "next", edgeIndices);
                break;
            case "up":
                nextCellIndices = this.getCellFromNextRowPosition(focusedCellPosition, "prev", edgeIndices);
                break;
            case "left":
                nextCellIndices = this.getCellFromNextColumnPosition(_extends({}, options, {
                    direction: "prev"
                }));
                break;
            case "right":
                nextCellIndices = this.getCellFromNextColumnPosition(_extends({}, options, {
                    direction: "next"
                }))
        }
        const currentCellData = getCellDataByPosition(nextCellIndices.rowIndex, nextCellIndices.columnIndex, isAllDayPanelCell);
        return this.moveToCell(_extends({}, options, {
            currentCellData: currentCellData
        }))
    }
    getCellFromNextRowPosition(focusedCellPosition, direction, edgeIndices) {
        const {
            columnIndex: columnIndex,
            rowIndex: rowIndex
        } = focusedCellPosition;
        const deltaPosition = "next" === direction ? 1 : -1;
        const nextRowIndex = rowIndex + deltaPosition;
        const validRowIndex = nextRowIndex >= 0 && nextRowIndex <= edgeIndices.lastRowIndex ? nextRowIndex : rowIndex;
        return {
            columnIndex: columnIndex,
            rowIndex: validRowIndex
        }
    }
    getCellFromNextColumnPosition(options) {
        const {
            focusedCellPosition: focusedCellPosition,
            direction: direction,
            edgeIndices: edgeIndices,
            isRTL: isRTL,
            isGroupedByDate: isGroupedByDate,
            groupCount: groupCount,
            isMultiSelection: isMultiSelection,
            viewType: viewType
        } = options;
        const {
            columnIndex: columnIndex,
            rowIndex: rowIndex
        } = focusedCellPosition;
        const {
            firstColumnIndex: firstColumnIndex,
            lastColumnIndex: lastColumnIndex,
            firstRowIndex: firstRowIndex,
            lastRowIndex: lastRowIndex
        } = edgeIndices;
        const step = isGroupedByDate && isMultiSelection ? groupCount : 1;
        const sign = isRTL ? -1 : 1;
        const deltaColumnIndex = "next" === direction ? sign * step : -1 * sign * step;
        const nextColumnIndex = columnIndex + deltaColumnIndex;
        const isValidColumnIndex = nextColumnIndex >= firstColumnIndex && nextColumnIndex <= lastColumnIndex;
        if (isValidColumnIndex) {
            return {
                columnIndex: nextColumnIndex,
                rowIndex: rowIndex
            }
        }
        return isDateAndTimeView(viewType) ? focusedCellPosition : this._processEdgeCell({
            nextColumnIndex: nextColumnIndex,
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            firstColumnIndex: firstColumnIndex,
            lastColumnIndex: lastColumnIndex,
            firstRowIndex: firstRowIndex,
            lastRowIndex: lastRowIndex,
            step: step
        })
    }
    _processEdgeCell(options) {
        const {
            nextColumnIndex: nextColumnIndex,
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            firstColumnIndex: firstColumnIndex,
            lastColumnIndex: lastColumnIndex,
            firstRowIndex: firstRowIndex,
            lastRowIndex: lastRowIndex,
            step: step
        } = options;
        let validColumnIndex = nextColumnIndex;
        let validRowIndex = rowIndex;
        const isLeftEdgeCell = nextColumnIndex < firstColumnIndex;
        const isRightEdgeCell = nextColumnIndex > lastColumnIndex;
        if (isLeftEdgeCell) {
            const columnIndexInNextRow = lastColumnIndex - (step - columnIndex % step - 1);
            const nextRowIndex = rowIndex - 1;
            const isValidRowIndex = nextRowIndex >= firstRowIndex;
            validRowIndex = isValidRowIndex ? nextRowIndex : rowIndex;
            validColumnIndex = isValidRowIndex ? columnIndexInNextRow : columnIndex
        }
        if (isRightEdgeCell) {
            const columnIndexInNextRow = firstColumnIndex + columnIndex % step;
            const nextRowIndex = rowIndex + 1;
            const isValidRowIndex = nextRowIndex <= lastRowIndex;
            validRowIndex = isValidRowIndex ? nextRowIndex : rowIndex;
            validColumnIndex = isValidRowIndex ? columnIndexInNextRow : columnIndex
        }
        return {
            columnIndex: validColumnIndex,
            rowIndex: validRowIndex
        }
    }
    moveToCell(options) {
        const {
            isMultiSelection: isMultiSelection,
            isMultiSelectionAllowed: isMultiSelectionAllowed,
            focusedCellData: focusedCellData,
            currentCellData: currentCellData
        } = options;
        const isValidMultiSelection = isMultiSelection && isMultiSelectionAllowed;
        const nextFocusedCellData = isValidMultiSelection ? this._getNextCellData(currentCellData, focusedCellData) : currentCellData;
        return nextFocusedCellData
    }
    _getNextCellData(nextFocusedCellData, focusedCellData, isVirtualCell) {
        if (isVirtualCell) {
            return focusedCellData
        }
        const isValidNextFocusedCell = this._isValidNextFocusedCell(nextFocusedCellData, focusedCellData);
        return isValidNextFocusedCell ? nextFocusedCellData : focusedCellData
    }
    _isValidNextFocusedCell(nextFocusedCellData, focusedCellData) {
        if (!focusedCellData) {
            return true
        }
        const {
            groupIndex: groupIndex,
            allDay: allDay
        } = focusedCellData;
        const {
            groupIndex: nextGroupIndex,
            allDay: nextAllDay
        } = nextFocusedCellData;
        return groupIndex === nextGroupIndex && allDay === nextAllDay
    }
}
