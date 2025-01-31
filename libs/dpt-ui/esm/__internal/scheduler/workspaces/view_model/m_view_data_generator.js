/**
 * DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from "../../../../core/utils/date";
import {
    dateUtilsTs
} from "../../../core/utils/date";
import {
    calculateCellIndex,
    calculateDayDuration,
    getDisplayedCellCount,
    getDisplayedRowCount,
    getGroupCount,
    getIsGroupedAllDayPanel,
    getKeyByGroup,
    getStartViewDateWithoutDST,
    getTotalCellCountByCompleteData,
    getTotalRowCountByCompleteData,
    isHorizontalView
} from "../../../scheduler/r1/utils/index";
import {
    HORIZONTAL_GROUP_ORIENTATION
} from "../../m_constants";
import timezoneUtils from "../../m_utils_time_zone";
import {
    getAllGroups
} from "../../resources/m_utils";
const toMs = dateUtils.dateToMilliseconds;
export class ViewDataGenerator {
    constructor() {
        this.daysInInterval = 1;
        this.isWorkView = false;
        this.tableAllDay = false
    }
    isSkippedDate(date) {
        return false
    }
    _calculateStartViewDate(options) {}
    getStartViewDate(options) {
        return this._calculateStartViewDate(options)
    }
    getCompleteViewDataMap(options) {
        const {
            groups: groups,
            isGroupedByDate: isGroupedByDate,
            isHorizontalGrouping: isHorizontalGrouping,
            isVerticalGrouping: isVerticalGrouping,
            intervalCount: intervalCount,
            currentDate: currentDate,
            viewType: viewType,
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            hoursInterval: hoursInterval
        } = options;
        this._setVisibilityDates(options);
        this.setHiddenInterval(startDayHour, endDayHour, hoursInterval);
        const groupsList = getAllGroups(groups);
        const cellCountInGroupRow = this.getCellCount({
            intervalCount: intervalCount,
            currentDate: currentDate,
            viewType: viewType,
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            hoursInterval: hoursInterval
        });
        const rowCountInGroup = this.getRowCount({
            intervalCount: intervalCount,
            currentDate: currentDate,
            viewType: viewType,
            hoursInterval: hoursInterval,
            startDayHour: startDayHour,
            endDayHour: endDayHour
        });
        let viewDataMap = [];
        const allDayPanelData = this._generateAllDayPanelData(options, rowCountInGroup, cellCountInGroupRow);
        const viewCellsData = this._generateViewCellsData(options, rowCountInGroup, cellCountInGroupRow);
        if (allDayPanelData) {
            viewDataMap.push(allDayPanelData)
        }
        viewDataMap.push(...viewCellsData);
        if (isHorizontalGrouping && !isGroupedByDate) {
            viewDataMap = this._transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList)
        }
        if (isVerticalGrouping) {
            viewDataMap = this._transformViewDataMapForVerticalGrouping(viewDataMap, groupsList)
        }
        if (isGroupedByDate) {
            viewDataMap = this._transformViewDataMapForGroupingByDate(viewDataMap, groupsList)
        }
        return this._addKeysToCells(viewDataMap)
    }
    _transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList) {
        const result = viewDataMap.map((row => row.slice()));
        groupsList.slice(1).forEach(((groups, index) => {
            const groupIndex = index + 1;
            viewDataMap.forEach(((row, rowIndex) => {
                const nextGroupRow = row.map((cellData => _extends({}, cellData, {
                    groups: groups,
                    groupIndex: groupIndex
                })));
                result[rowIndex].push(...nextGroupRow)
            }))
        }));
        return result
    }
    _transformViewDataMapForVerticalGrouping(viewDataMap, groupsList) {
        const result = viewDataMap.map((row => row.slice()));
        groupsList.slice(1).forEach(((groups, index) => {
            const groupIndex = index + 1;
            const nextGroupMap = viewDataMap.map((cellsRow => {
                const nextRow = cellsRow.map((cellData => _extends({}, cellData, {
                    groupIndex: groupIndex,
                    groups: groups
                })));
                return nextRow
            }));
            result.push(...nextGroupMap)
        }));
        return result
    }
    _transformViewDataMapForGroupingByDate(viewDataMap, groupsList) {
        const correctedGroupList = groupsList.slice(1);
        const correctedGroupCount = correctedGroupList.length;
        const result = viewDataMap.map((cellsRow => {
            const groupedByDateCellsRow = cellsRow.reduce(((currentRow, cell) => {
                const rowWithCurrentCell = [...currentRow, _extends({}, cell, {
                    isFirstGroupCell: true,
                    isLastGroupCell: 0 === correctedGroupCount
                }), ...correctedGroupList.map(((groups, index) => _extends({}, cell, {
                    groups: groups,
                    groupIndex: index + 1,
                    isFirstGroupCell: false,
                    isLastGroupCell: index === correctedGroupCount - 1
                })))];
                return rowWithCurrentCell
            }), []);
            return groupedByDateCellsRow
        }));
        return result
    }
    _addKeysToCells(viewDataMap) {
        const totalColumnCount = viewDataMap[0].length;
        const {
            currentViewDataMap: result
        } = viewDataMap.reduce(((_ref, row, rowIndex) => {
            let {
                allDayPanelsCount: allDayPanelsCount,
                currentViewDataMap: currentViewDataMap
            } = _ref;
            const isAllDay = row[0].allDay;
            const keyBase = (rowIndex - allDayPanelsCount) * totalColumnCount;
            const currentAllDayPanelsCount = isAllDay ? allDayPanelsCount + 1 : allDayPanelsCount;
            currentViewDataMap[rowIndex].forEach(((cell, columnIndex) => {
                cell.key = keyBase + columnIndex
            }));
            return {
                allDayPanelsCount: currentAllDayPanelsCount,
                currentViewDataMap: currentViewDataMap
            }
        }), {
            allDayPanelsCount: 0,
            currentViewDataMap: viewDataMap
        });
        return result
    }
    generateViewDataMap(completeViewDataMap, options) {
        const {
            rowCount: rowCount,
            startCellIndex: startCellIndex,
            startRowIndex: startRowIndex,
            cellCount: cellCount,
            isVerticalGrouping: isVerticalGrouping,
            isAllDayPanelVisible: isAllDayPanelVisible
        } = options;
        const sliceCells = (row, rowIndex, startIndex, count) => {
            const sliceToIndex = void 0 !== count ? startIndex + count : void 0;
            return row.slice(startIndex, sliceToIndex).map(((cellData, columnIndex) => ({
                cellData: cellData,
                position: {
                    rowIndex: rowIndex,
                    columnIndex: columnIndex
                }
            })))
        };
        let correctedStartRowIndex = startRowIndex;
        let allDayPanelMap = [];
        if (this._isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible)) {
            correctedStartRowIndex++;
            allDayPanelMap = sliceCells(completeViewDataMap[0], 0, startCellIndex, cellCount)
        }
        const displayedRowCount = getDisplayedRowCount(rowCount, completeViewDataMap);
        const dateTableMap = completeViewDataMap.slice(correctedStartRowIndex, correctedStartRowIndex + displayedRowCount).map(((row, rowIndex) => sliceCells(row, rowIndex, startCellIndex, cellCount)));
        return {
            allDayPanelMap: allDayPanelMap,
            dateTableMap: dateTableMap
        }
    }
    _isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible) {
        return !isVerticalGrouping && isAllDayPanelVisible
    }
    getViewDataFromMap(completeViewDataMap, viewDataMap, options) {
        const {
            topVirtualRowHeight: topVirtualRowHeight,
            bottomVirtualRowHeight: bottomVirtualRowHeight,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth,
            cellCount: cellCount,
            rowCount: rowCount,
            startRowIndex: startRowIndex,
            startCellIndex: startCellIndex,
            isProvideVirtualCellsWidth: isProvideVirtualCellsWidth,
            isGroupedAllDayPanel: isGroupedAllDayPanel,
            isVerticalGrouping: isVerticalGrouping,
            isAllDayPanelVisible: isAllDayPanelVisible
        } = options;
        const {
            allDayPanelMap: allDayPanelMap,
            dateTableMap: dateTableMap
        } = viewDataMap;
        const {
            groupedData: groupedData
        } = dateTableMap.reduce(((_ref2, cellsRow) => {
            let {
                previousGroupIndex: previousGroupIndex,
                groupedData: groupedData
            } = _ref2;
            const cellDataRow = cellsRow.map((_ref3 => {
                let {
                    cellData: cellData
                } = _ref3;
                return cellData
            }));
            const firstCell = cellDataRow[0];
            const isAllDayRow = firstCell.allDay;
            const currentGroupIndex = firstCell.groupIndex;
            if (currentGroupIndex !== previousGroupIndex) {
                groupedData.push({
                    dateTable: [],
                    isGroupedAllDayPanel: getIsGroupedAllDayPanel(!!isAllDayRow, isVerticalGrouping),
                    groupIndex: currentGroupIndex,
                    key: getKeyByGroup(currentGroupIndex, isVerticalGrouping)
                })
            }
            if (isAllDayRow) {
                groupedData[groupedData.length - 1].allDayPanel = cellDataRow
            } else {
                groupedData[groupedData.length - 1].dateTable.push({
                    cells: cellDataRow,
                    key: cellDataRow[0].key - startCellIndex
                })
            }
            return {
                groupedData: groupedData,
                previousGroupIndex: currentGroupIndex
            }
        }), {
            previousGroupIndex: -1,
            groupedData: []
        });
        if (this._isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible)) {
            groupedData[0].allDayPanel = allDayPanelMap.map((_ref4 => {
                let {
                    cellData: cellData
                } = _ref4;
                return cellData
            }))
        }
        const totalCellCount = getTotalCellCountByCompleteData(completeViewDataMap);
        const totalRowCount = getTotalRowCountByCompleteData(completeViewDataMap);
        const displayedCellCount = getDisplayedCellCount(cellCount, completeViewDataMap);
        const displayedRowCount = getDisplayedRowCount(rowCount, completeViewDataMap);
        return {
            groupedData: groupedData,
            topVirtualRowHeight: topVirtualRowHeight,
            bottomVirtualRowHeight: bottomVirtualRowHeight,
            leftVirtualCellWidth: isProvideVirtualCellsWidth ? leftVirtualCellWidth : void 0,
            rightVirtualCellWidth: isProvideVirtualCellsWidth ? rightVirtualCellWidth : void 0,
            isGroupedAllDayPanel: isGroupedAllDayPanel,
            leftVirtualCellCount: startCellIndex,
            rightVirtualCellCount: void 0 === cellCount ? 0 : totalCellCount - startCellIndex - displayedCellCount,
            topVirtualRowCount: startRowIndex,
            bottomVirtualRowCount: totalRowCount - startRowIndex - displayedRowCount
        }
    }
    _generateViewCellsData(options, rowCount, cellCountInGroupRow) {
        const viewCellsData = [];
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
            viewCellsData.push(this._generateCellsRow(options, false, rowIndex, rowCount, cellCountInGroupRow))
        }
        return viewCellsData
    }
    _generateAllDayPanelData(options, rowCount, columnCount) {
        if (!options.isAllDayPanelVisible) {
            return null
        }
        return this._generateCellsRow(options, true, 0, rowCount, columnCount)
    }
    _generateCellsRow(options, allDay, rowIndex, rowCount, columnCount) {
        const cellsRow = [];
        for (let columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
            const cellDataValue = this.getCellData(rowIndex, columnIndex, options, allDay);
            cellDataValue.index = rowIndex * columnCount + columnIndex;
            cellDataValue.isFirstGroupCell = this._isFirstGroupCell(rowIndex, columnIndex, options, rowCount, columnCount);
            cellDataValue.isLastGroupCell = this._isLastGroupCell(rowIndex, columnIndex, options, rowCount, columnCount);
            cellsRow.push(cellDataValue)
        }
        return cellsRow
    }
    getCellData(rowIndex, columnIndex, options, allDay) {
        return allDay ? this.prepareAllDayCellData(options, rowIndex, columnIndex) : this.prepareCellData(options, rowIndex, columnIndex)
    }
    prepareCellData(options, rowIndex, columnIndex) {
        const {
            groups: groups,
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            hoursInterval: hoursInterval
        } = options;
        const groupsList = getAllGroups(groups);
        const startDate = this.getDateByCellIndices(options, rowIndex, columnIndex, this.getCellCountInDay(startDayHour, endDayHour, hoursInterval));
        const endDate = this.getCellEndDate(startDate, options);
        const data = {
            startDate: startDate,
            endDate: endDate,
            allDay: this.tableAllDay,
            groupIndex: 0
        };
        if (groupsList.length > 0) {
            data.groups = groupsList[0]
        }
        return data
    }
    prepareAllDayCellData(options, rowIndex, columnIndex) {
        const data = this.prepareCellData(_extends({}, options, {
            viewOffset: 0
        }), rowIndex, columnIndex);
        const {
            viewOffset: viewOffset
        } = options;
        const startDate = dateUtils.trimTime(data.startDate);
        const shiftedStartDate = dateUtilsTs.addOffsets(startDate, [viewOffset]);
        return _extends({}, data, {
            startDate: shiftedStartDate,
            endDate: shiftedStartDate,
            allDay: true
        })
    }
    getDateByCellIndices(options, rowIndex, columnIndex, cellCountInDay) {
        let {
            startViewDate: startViewDate
        } = options;
        const {
            startDayHour: startDayHour,
            interval: interval,
            firstDayOfWeek: firstDayOfWeek,
            intervalCount: intervalCount,
            viewOffset: viewOffset
        } = options;
        const isStartViewDateDuringDST = startViewDate.getHours() !== Math.floor(startDayHour);
        if (isStartViewDateDuringDST) {
            const dateWithCorrectHours = getStartViewDateWithoutDST(startViewDate, startDayHour);
            startViewDate = new Date(dateWithCorrectHours.getTime() - toMs("day"))
        }
        const columnCountBase = this.getCellCount(options);
        const rowCountBase = this.getRowCount(options);
        const cellIndex = this._calculateCellIndex(rowIndex, columnIndex, rowCountBase, columnCountBase);
        const millisecondsOffset = this.getMillisecondsOffset(cellIndex, interval, cellCountInDay);
        const offsetByCount = this.isWorkView ? this.getTimeOffsetByColumnIndex(columnIndex, this.getFirstDayOfWeek(firstDayOfWeek), columnCountBase, intervalCount) : 0;
        const startViewDateTime = startViewDate.getTime();
        const currentDate = new Date(startViewDateTime + millisecondsOffset + offsetByCount + viewOffset);
        const timeZoneDifference = isStartViewDateDuringDST ? 0 : dateUtils.getTimezonesDifference(startViewDate, currentDate);
        currentDate.setTime(currentDate.getTime() + timeZoneDifference);
        return currentDate
    }
    getMillisecondsOffset(cellIndex, interval, cellCountInDay) {
        const dayIndex = Math.floor(cellIndex / cellCountInDay);
        const realHiddenInterval = dayIndex * this.hiddenInterval;
        return interval * cellIndex + realHiddenInterval
    }
    getTimeOffsetByColumnIndex(columnIndex, firstDayOfWeek, columnCount, intervalCount) {
        const firstDayOfWeekDiff = Math.max(0, firstDayOfWeek - 1);
        const columnsInWeek = columnCount / intervalCount;
        const weekendCount = Math.floor((columnIndex + firstDayOfWeekDiff) / columnsInWeek);
        return 2 * weekendCount * toMs("day")
    }
    calculateEndDate(startDate, interval, endDayHour) {
        return this.getCellEndDate(startDate, {
            interval: interval
        })
    }
    _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCountBase) {
        return calculateCellIndex(rowIndex, columnIndex, rowCount)
    }
    generateGroupedDataMap(viewDataMap) {
        const {
            allDayPanelMap: allDayPanelMap,
            dateTableMap: dateTableMap
        } = viewDataMap;
        const {
            previousGroupedDataMap: dateTableGroupedMap
        } = dateTableMap.reduce(((previousOptions, cellsRow) => {
            const {
                previousGroupedDataMap: previousGroupedDataMap,
                previousRowIndex: previousRowIndex,
                previousGroupIndex: previousGroupIndex
            } = previousOptions;
            const {
                groupIndex: currentGroupIndex
            } = cellsRow[0].cellData;
            const currentRowIndex = currentGroupIndex === previousGroupIndex ? previousRowIndex + 1 : 0;
            cellsRow.forEach((cell => {
                const {
                    groupIndex: groupIndex
                } = cell.cellData;
                if (!previousGroupedDataMap[groupIndex]) {
                    previousGroupedDataMap[groupIndex] = []
                }
                if (!previousGroupedDataMap[groupIndex][currentRowIndex]) {
                    previousGroupedDataMap[groupIndex][currentRowIndex] = []
                }
                previousGroupedDataMap[groupIndex][currentRowIndex].push(cell)
            }));
            return {
                previousGroupedDataMap: previousGroupedDataMap,
                previousRowIndex: currentRowIndex,
                previousGroupIndex: currentGroupIndex
            }
        }), {
            previousGroupedDataMap: [],
            previousRowIndex: -1,
            previousGroupIndex: -1
        });
        const allDayPanelGroupedMap = [];
        null === allDayPanelMap || void 0 === allDayPanelMap || allDayPanelMap.forEach((cell => {
            const {
                groupIndex: groupIndex
            } = cell.cellData;
            if (!allDayPanelGroupedMap[groupIndex]) {
                allDayPanelGroupedMap[groupIndex] = []
            }
            allDayPanelGroupedMap[groupIndex].push(cell)
        }));
        return {
            allDayPanelGroupedMap: allDayPanelGroupedMap,
            dateTableGroupedMap: dateTableGroupedMap
        }
    }
    _isFirstGroupCell(rowIndex, columnIndex, options, rowCount, columnCount) {
        const {
            groupOrientation: groupOrientation,
            groups: groups,
            isGroupedByDate: isGroupedByDate
        } = options;
        const groupCount = getGroupCount(groups);
        if (isGroupedByDate) {
            return columnIndex % groupCount === 0
        }
        if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
            return columnIndex % columnCount === 0
        }
        return rowIndex % rowCount === 0
    }
    _isLastGroupCell(rowIndex, columnIndex, options, rowCount, columnCount) {
        const {
            groupOrientation: groupOrientation,
            groups: groups,
            isGroupedByDate: isGroupedByDate
        } = options;
        const groupCount = getGroupCount(groups);
        if (isGroupedByDate) {
            return (columnIndex + 1) % groupCount === 0
        }
        if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
            return (columnIndex + 1) % columnCount === 0
        }
        return (rowIndex + 1) % rowCount === 0
    }
    markSelectedAndFocusedCells(viewDataMap, renderOptions) {
        const {
            selectedCells: selectedCells,
            focusedCell: focusedCell
        } = renderOptions;
        if (!selectedCells && !focusedCell) {
            return viewDataMap
        }
        const {
            allDayPanelMap: allDayPanelMap,
            dateTableMap: dateTableMap
        } = viewDataMap;
        const nextDateTableMap = dateTableMap.map((row => this._markSelectedAndFocusedCellsInRow(row, selectedCells, focusedCell)));
        const nextAllDayMap = this._markSelectedAndFocusedCellsInRow(allDayPanelMap, selectedCells, focusedCell);
        return {
            allDayPanelMap: nextAllDayMap,
            dateTableMap: nextDateTableMap
        }
    }
    _markSelectedAndFocusedCellsInRow(dataRow, selectedCells, focusedCell) {
        return dataRow.map((cell => {
            const {
                index: index,
                groupIndex: groupIndex,
                allDay: allDay,
                startDate: startDate
            } = cell.cellData;
            const indexInSelectedCells = selectedCells.findIndex((_ref5 => {
                let {
                    index: selectedCellIndex,
                    groupIndex: selectedCellGroupIndex,
                    allDay: selectedCellAllDay,
                    startDate: selectedCellStartDate
                } = _ref5;
                return groupIndex === selectedCellGroupIndex && (index === selectedCellIndex || void 0 === selectedCellIndex && startDate.getTime() === selectedCellStartDate.getTime()) && !!allDay === !!selectedCellAllDay
            }));
            const isFocused = !!focusedCell && index === focusedCell.cellData.index && groupIndex === focusedCell.cellData.groupIndex && allDay === focusedCell.cellData.allDay;
            if (!isFocused && -1 === indexInSelectedCells) {
                return cell
            }
            return _extends({}, cell, {
                cellData: _extends({}, cell.cellData, {
                    isSelected: indexInSelectedCells > -1,
                    isFocused: isFocused
                })
            })
        }))
    }
    getInterval(hoursInterval) {
        return hoursInterval * toMs("hour")
    }
    _getIntervalDuration(intervalCount) {
        return toMs("day") * intervalCount
    }
    _setVisibilityDates(options) {}
    getCellCountInDay(startDayHour, endDayHour, hoursInterval) {
        const result = calculateDayDuration(startDayHour, endDayHour) / hoursInterval;
        return Math.ceil(result)
    }
    getCellCount(options) {
        const {
            intervalCount: intervalCount,
            viewType: viewType,
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            hoursInterval: hoursInterval
        } = options;
        const cellCountInDay = this.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
        const columnCountInDay = isHorizontalView(viewType) ? cellCountInDay : 1;
        return this.daysInInterval * intervalCount * columnCountInDay
    }
    getRowCount(options) {
        const {
            viewType: viewType,
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            hoursInterval: hoursInterval
        } = options;
        const cellCountInDay = this.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
        const rowCountInDay = !isHorizontalView(viewType) ? cellCountInDay : 1;
        return rowCountInDay
    }
    setHiddenInterval(startDayHour, endDayHour, hoursInterval) {
        this.hiddenInterval = toMs("day") - this.getVisibleDayDuration(startDayHour, endDayHour, hoursInterval)
    }
    getVisibleDayDuration(startDayHour, endDayHour, hoursInterval) {
        const cellCountInDay = this.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
        return hoursInterval * cellCountInDay * toMs("hour")
    }
    getFirstDayOfWeek(firstDayOfWeekOption) {
        return firstDayOfWeekOption
    }
    getCellEndDate(cellStartDate, options) {
        const durationMs = Math.round(options.interval);
        return timezoneUtils.addOffsetsWithoutDST(cellStartDate, durationMs)
    }
}
