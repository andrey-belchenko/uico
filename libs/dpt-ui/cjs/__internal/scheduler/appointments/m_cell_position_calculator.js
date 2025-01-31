/**
 * DevExtreme (cjs/__internal/scheduler/appointments/m_cell_position_calculator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CellPositionCalculator = void 0;
var _type = require("../../../core/utils/type");
var _date = require("../../core/utils/date");

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
class BaseStrategy {
    constructor(options) {
        this.isVirtualScrolling = false;
        this.options = options
    }
    get DOMMetaData() {
        return this.options.DOMMetaData
    }
    get appointments() {
        return this.options.dateSettings
    }
    get viewDataProvider() {
        return this.options.viewDataProvider
    }
    get positionHelper() {
        return this.options.positionHelper
    }
    get startViewDate() {
        return this.options.startViewDate
    }
    get viewStartDayHour() {
        return this.options.viewStartDayHour
    }
    get viewEndDayHour() {
        return this.options.viewEndDayHour
    }
    get cellDuration() {
        return this.options.cellDuration
    }
    get getPositionShift() {
        return this.options.getPositionShiftCallback
    }
    get groupCount() {
        return this.options.groupCount
    }
    get rtlEnabled() {
        return this.options.rtlEnabled
    }
    get isVerticalGrouping() {
        return this.options.isVerticalGroupOrientation
    }
    get showAllDayPanel() {
        return this.options.showAllDayPanel
    }
    get supportAllDayRow() {
        return this.options.supportAllDayRow
    }
    get isGroupedAllDayPanel() {
        return this.options.isGroupedAllDayPanel
    }
    calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
        const result = [];
        this.appointments.forEach(((dateSetting, index) => {
            const coordinates = this.getCoordinateInfos({
                appointment: dateSetting,
                groupIndices: groupIndices,
                isAllDayRowAppointment: isAllDayRowAppointment,
                isRecurrentAppointment: isRecurrentAppointment
            });
            coordinates.forEach((item => {
                !!item && result.push(this._prepareObject(item, index))
            }))
        }));
        return result
    }
    getCoordinateInfos(options) {
        const {
            appointment: appointment,
            isAllDayRowAppointment: isAllDayRowAppointment,
            groupIndices: groupIndices,
            recurrent: recurrent
        } = options;
        const {
            startDate: startDate
        } = appointment;
        const groupIndex = !recurrent ? appointment.source.groupIndex : void 0;
        return this.getCoordinatesByDateInGroup(startDate, groupIndices, isAllDayRowAppointment, groupIndex)
    }
    _prepareObject(position, dateSettingIndex) {
        position.dateSettingIndex = dateSettingIndex;
        return {
            coordinates: position,
            dateSettingIndex: dateSettingIndex
        }
    }
    getCoordinatesByDate(date, groupIndex, inAllDayRow) {
        const validGroupIndex = groupIndex || 0;
        const cellInfo = {
            groupIndex: validGroupIndex,
            startDate: date,
            isAllDay: inAllDayRow
        };
        const positionByMap = this.viewDataProvider.findCellPositionInMap(cellInfo, true);
        if (!positionByMap) {
            return
        }
        const position = this.getCellPosition(positionByMap, inAllDayRow && !this.isVerticalGrouping);
        const timeShift = inAllDayRow ? 0 : this.getTimeShiftRatio(positionByMap, date);
        const shift = this.getPositionShift(timeShift, inAllDayRow);
        const horizontalHMax = this.positionHelper.getHorizontalMax(validGroupIndex, date);
        const verticalMax = this.positionHelper.getVerticalMax({
            groupIndex: validGroupIndex,
            isVirtualScrolling: this.isVirtualScrolling,
            showAllDayPanel: this.showAllDayPanel,
            supportAllDayRow: this.supportAllDayRow,
            isGroupedAllDayPanel: this.isGroupedAllDayPanel,
            isVerticalGrouping: this.isVerticalGrouping
        });
        return {
            positionByMap: positionByMap,
            cellPosition: position.left + shift.cellPosition,
            top: position.top + shift.top,
            left: position.left + shift.left,
            rowIndex: position.rowIndex,
            columnIndex: position.columnIndex,
            hMax: horizontalHMax,
            vMax: verticalMax,
            groupIndex: validGroupIndex
        }
    }
    getCoordinatesByDateInGroup(startDate, groupIndices, inAllDayRow, groupIndex) {
        const result = [];
        if (this.viewDataProvider.isSkippedDate(startDate)) {
            return result
        }
        let validGroupIndices = [groupIndex];
        if (!(0, _type.isDefined)(groupIndex)) {
            validGroupIndices = this.groupCount ? groupIndices : [0]
        }
        validGroupIndices.forEach((groupIndex => {
            const coordinates = this.getCoordinatesByDate(startDate, groupIndex, inAllDayRow);
            if (coordinates) {
                result.push(coordinates)
            }
        }));
        return result
    }
    getCellPosition(cellCoordinates, isAllDayPanel) {
        const {
            dateTableCellsMeta: dateTableCellsMeta,
            allDayPanelCellsMeta: allDayPanelCellsMeta
        } = this.DOMMetaData;
        const {
            columnIndex: columnIndex,
            rowIndex: rowIndex
        } = cellCoordinates;
        const position = isAllDayPanel ? allDayPanelCellsMeta[columnIndex] : dateTableCellsMeta[rowIndex][columnIndex];
        const validPosition = _extends({}, position);
        if (this.rtlEnabled) {
            validPosition.left += position.width
        }
        if (validPosition) {
            validPosition.rowIndex = cellCoordinates.rowIndex;
            validPosition.columnIndex = cellCoordinates.columnIndex
        }
        return validPosition
    }
    getTimeShiftRatio(positionByMap, appointmentDate) {
        const {
            cellDuration: cellDuration,
            viewOffset: viewOffset
        } = this.options;
        const {
            rowIndex: rowIndex,
            columnIndex: columnIndex
        } = positionByMap;
        const matchedCell = this.viewDataProvider.viewDataMap.dateTableMap[rowIndex][columnIndex];
        const matchedCellStartDate = _date.dateUtilsTs.addOffsets(matchedCell.cellData.startDate, [-viewOffset]);
        const result = (appointmentDate.getTime() - matchedCellStartDate.getTime()) / cellDuration;
        return result % 1
    }
}
class VirtualStrategy extends BaseStrategy {
    constructor() {
        super(...arguments);
        this.isVirtualScrolling = true
    }
    calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
        const appointments = isAllDayRowAppointment ? this.appointments : this.appointments.filter((_ref => {
            let {
                source: source,
                startDate: startDate,
                endDate: endDate
            } = _ref;
            return this.viewDataProvider.isGroupIntersectDateInterval(source.groupIndex, startDate, endDate)
        }));
        if (isRecurrentAppointment) {
            return this.createRecurrentAppointmentInfos(appointments, isAllDayRowAppointment)
        }
        return super.calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment)
    }
    createRecurrentAppointmentInfos(dateSettings, isAllDayRowAppointment) {
        const result = [];
        dateSettings.forEach(((_ref2, index) => {
            let {
                source: source,
                startDate: startDate
            } = _ref2;
            const coordinate = this.getCoordinatesByDate(startDate, source.groupIndex, isAllDayRowAppointment);
            if (coordinate) {
                result.push(this._prepareObject(coordinate, index))
            }
        }));
        return result
    }
}
class CellPositionCalculator {
    constructor(options) {
        this.options = options
    }
    calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
        const strategy = this.options.isVirtualScrolling ? new VirtualStrategy(this.options) : new BaseStrategy(this.options);
        return strategy.calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment)
    }
}
exports.CellPositionCalculator = CellPositionCalculator;
