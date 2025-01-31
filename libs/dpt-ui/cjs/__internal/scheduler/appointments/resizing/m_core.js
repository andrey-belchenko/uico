/**
 * DevExtreme (cjs/__internal/scheduler/appointments/resizing/m_core.js)
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
exports.getAppointmentDateRange = void 0;

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
const getAppointmentLeftCell = options => {
    const {
        cellHeight: cellHeight,
        cellWidth: cellWidth,
        viewDataProvider: viewDataProvider,
        relativeAppointmentRect: relativeAppointmentRect,
        appointmentSettings: appointmentSettings,
        rtlEnabled: rtlEnabled
    } = options;
    const cellRowIndex = Math.floor(relativeAppointmentRect.top / cellHeight);
    const cellColumnIndex = Math.round(relativeAppointmentRect.left / cellWidth);
    const leftCell = viewDataProvider.getCellData(cellRowIndex, cellColumnIndex, appointmentSettings.allDay, rtlEnabled);
    return leftCell
};
const getDateRangeHorizontal = options => {
    const {
        cellWidth: cellWidth,
        cellCountInRow: cellCountInRow,
        relativeAppointmentRect: relativeAppointmentRect,
        viewDataProvider: viewDataProvider,
        appointmentSettings: appointmentSettings,
        handles: handles
    } = options;
    const appointmentFirstCell = getAppointmentLeftCell(options);
    const appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
    const appointmentLastCellIndex = appointmentFirstCell.index + (appointmentCellsAmount - 1);
    const {
        sourceAppointment: sourceAppointment
    } = appointmentSettings.info;
    const {
        allDay: allDay
    } = appointmentSettings.info.appointment;
    if (handles.left) {
        return {
            startDate: appointmentFirstCell.startDate,
            endDate: appointmentFirstCell.startDate > sourceAppointment.endDate ? appointmentFirstCell.startDate : sourceAppointment.endDate
        }
    }
    const appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
    const appointmentColumnIndex = appointmentLastCellIndex % cellCountInRow;
    const appointmentLastCell = viewDataProvider.getCellData(appointmentRowIndex, appointmentColumnIndex, allDay);
    const endDate = !options.considerTime ? appointmentLastCell.endDate : appointmentLastCell.startDate;
    return {
        startDate: endDate < sourceAppointment.startDate ? endDate : sourceAppointment.startDate,
        endDate: endDate
    }
};
const getDateRangeHorizontalRTL = options => {
    const {
        viewDataProvider: viewDataProvider,
        cellCountInRow: cellCountInRow,
        appointmentSettings: appointmentSettings,
        handles: handles,
        cellWidth: cellWidth,
        relativeAppointmentRect: relativeAppointmentRect
    } = options;
    const appointmentLastCell = getAppointmentLeftCell(options);
    const {
        sourceAppointment: sourceAppointment
    } = appointmentSettings.info;
    const {
        allDay: allDay
    } = appointmentSettings.info.appointment;
    if (handles.right) {
        const appointmentLastCellIndex = appointmentLastCell.index;
        const appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
        const appointmentFirstCellIndex = appointmentLastCellIndex - appointmentCellsAmount + 1;
        const appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
        const appointmentFirstCell = viewDataProvider.getCellData(appointmentRowIndex, appointmentFirstCellIndex, allDay, true);
        return {
            startDate: appointmentFirstCell.startDate,
            endDate: appointmentFirstCell.startDate > sourceAppointment.endDate ? appointmentFirstCell.startDate : sourceAppointment.endDate
        }
    }
    const endDate = !options.considerTime ? appointmentLastCell.endDate : appointmentLastCell.startDate;
    return {
        startDate: endDate < sourceAppointment.startDate ? endDate : sourceAppointment.startDate,
        endDate: endDate
    }
};
const getRelativeAppointmentRect = (appointmentRect, parentAppointmentRect) => {
    const left = appointmentRect.left - parentAppointmentRect.left;
    const top = appointmentRect.top - parentAppointmentRect.top;
    const width = left < 0 ? appointmentRect.width + left : appointmentRect.width;
    const height = top < 0 ? appointmentRect.height + top : appointmentRect.height;
    return {
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: width,
        height: height
    }
};
const getAppointmentCellsInfo = options => {
    const {
        appointmentSettings: appointmentSettings,
        isVerticalGroupedWorkSpace: isVerticalGroupedWorkSpace,
        DOMMetaData: DOMMetaData
    } = options;
    const DOMMetaTable = appointmentSettings.allDay && !isVerticalGroupedWorkSpace ? [DOMMetaData.allDayPanelCellsMeta] : DOMMetaData.dateTableCellsMeta;
    const {
        positionByMap: positionByMap
    } = appointmentSettings;
    const {
        height: cellHeight,
        width: cellWidth
    } = DOMMetaTable[positionByMap.rowIndex][positionByMap.columnIndex];
    const cellCountInRow = DOMMetaTable[positionByMap.rowIndex].length;
    return {
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        cellCountInRow: cellCountInRow
    }
};
const getAppointmentDateRange = options => {
    const {
        appointmentSettings: appointmentSettings
    } = options;
    const relativeAppointmentRect = getRelativeAppointmentRect(options.appointmentRect, options.parentAppointmentRect);
    const cellInfo = getAppointmentCellsInfo(options);
    const considerTime = !options.isDateAndTimeView || appointmentSettings.allDay;
    const extendedOptions = _extends({}, options, cellInfo, {
        considerTime: considerTime,
        relativeAppointmentRect: relativeAppointmentRect
    });
    return !options.rtlEnabled ? getDateRangeHorizontal(extendedOptions) : getDateRangeHorizontalRTL(extendedOptions)
};
exports.getAppointmentDateRange = getAppointmentDateRange;
