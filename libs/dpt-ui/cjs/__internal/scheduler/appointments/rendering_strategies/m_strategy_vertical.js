/**
 * DevExtreme (cjs/__internal/scheduler/appointments/rendering_strategies/m_strategy_vertical.js)
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
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _extend = require("../../../../core/utils/extend");
var _math = require("../../../../core/utils/math");
var _type = require("../../../../core/utils/type");
var _index = require("../../../scheduler/r1/utils/index");
var _m_appointment_adapter = require("../../m_appointment_adapter");
var _m_expression_utils = require("../../m_expression_utils");
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _m_strategy_base = _interopRequireDefault(require("./m_strategy_base"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

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
const ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET = 5;
const ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET = 20;
const toMs = _date.default.dateToMilliseconds;
class VerticalRenderingStrategy extends _m_strategy_base.default {
    getDeltaTime(args, initialSize, appointment) {
        let deltaTime = 0;
        if (this.isAllDay(appointment)) {
            deltaTime = this._getDeltaWidth(args, initialSize) * toMs("day")
        } else {
            const deltaHeight = args.height - initialSize.height;
            deltaTime = toMs("minute") * Math.round(deltaHeight / this.cellHeight * this.cellDurationInMinutes)
        }
        return deltaTime
    }
    _correctCollectorCoordinatesInAdaptive(coordinates, isAllDay) {
        if (isAllDay) {
            super._correctCollectorCoordinatesInAdaptive(coordinates, isAllDay)
        } else if (0 === this._getMaxAppointmentCountPerCellByType()) {
            const {
                cellHeight: cellHeight
            } = this;
            const {
                cellWidth: cellWidth
            } = this;
            coordinates.top += (cellHeight - this.getDropDownButtonAdaptiveSize()) / 2;
            coordinates.left += (cellWidth - this.getDropDownButtonAdaptiveSize()) / 2
        }
    }
    getAppointmentGeometry(coordinates) {
        let geometry = null;
        if (coordinates.allDay) {
            geometry = this._getAllDayAppointmentGeometry(coordinates)
        } else {
            geometry = this.isAdaptive && coordinates.isCompact ? this._getAdaptiveGeometry(coordinates) : this._getVerticalAppointmentGeometry(coordinates)
        }
        return super.getAppointmentGeometry(geometry)
    }
    _getAdaptiveGeometry(coordinates) {
        const config = this._calculateGeometryConfig(coordinates);
        return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset)
    }
    _getItemPosition(initialAppointment) {
        const allDay = this.isAllDay(initialAppointment);
        if (allDay) {
            return super._getItemPosition(initialAppointment)
        }
        const appointment = super.shiftAppointmentByViewOffset(initialAppointment);
        const adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(appointment, this.dataAccessors, this.timeZoneCalculator);
        const isRecurring = !!adapter.recurrenceRule;
        const appointmentStartDate = adapter.calculateStartDate("toGrid");
        const appointmentEndDate = adapter.calculateEndDate("toGrid");
        const appointmentDuration = appointmentEndDate - appointmentStartDate;
        const appointmentBeginInCurrentView = this.options.startViewDate < appointmentStartDate;
        const isAppointmentTakesSeveralDays = !_m_utils_time_zone.default.isSameAppointmentDates(appointmentStartDate, appointmentEndDate);
        const settings = this.generateAppointmentSettings(appointment);
        let result = [];
        for (let j = 0; j < settings.length; j++) {
            const currentSetting = settings[j];
            const height = this.calculateAppointmentHeight(appointment, currentSetting);
            const width = this.calculateAppointmentWidth(appointment, currentSetting);
            let resultHeight = height;
            let appointmentReduced = null;
            let multiDaysAppointmentParts = [];
            const currentMaxAllowedPosition = currentSetting.vMax;
            if (this._isMultiViewAppointment(currentSetting, height) || isAppointmentTakesSeveralDays && !isRecurring) {
                const trimmedStartDate = _date.default.trimTime(appointmentStartDate);
                const trimmedSettingStartDate = _date.default.trimTime(currentSetting.info.appointment.startDate);
                const reduceHead = trimmedStartDate <= trimmedSettingStartDate || isRecurring;
                if (reduceHead) {
                    resultHeight = this._reduceMultiDayAppointment(height, {
                        top: currentSetting.top,
                        bottom: currentMaxAllowedPosition
                    });
                    multiDaysAppointmentParts = this._getAppointmentParts({
                        sourceAppointmentHeight: height,
                        reducedHeight: resultHeight,
                        width: width
                    }, currentSetting)
                }
                const {
                    startDate: currentSettingStartDate,
                    normalizedEndDate: currentSettingNormalizedEndDate
                } = currentSetting.info.appointment;
                const currentSettingDuration = currentSettingNormalizedEndDate - currentSettingStartDate;
                const hasNextParts = currentSettingDuration < appointmentDuration;
                appointmentReduced = hasNextParts ? appointmentBeginInCurrentView ? "head" : "body" : appointmentBeginInCurrentView ? "head" : "tail"
            }(0, _extend.extend)(currentSetting, {
                height: resultHeight,
                width: width,
                allDay: allDay,
                appointmentReduced: appointmentReduced
            });
            result = this._getAppointmentPartsPosition(multiDaysAppointmentParts, currentSetting, result)
        }
        return result
    }
    _isMultiViewAppointment(_ref, height) {
        let {
            vMax: vMax,
            top: top
        } = _ref;
        const fullAppointmentHeight = (0, _math.roundFloatPart)(height, 2);
        const remainingHeight = (0, _math.roundFloatPart)(vMax - top, 2);
        return fullAppointmentHeight > remainingHeight
    }
    _reduceMultiDayAppointment(sourceAppointmentHeight, bound) {
        return Math.min(sourceAppointmentHeight, bound.bottom - Math.floor(bound.top))
    }
    _getGroupHeight() {
        return this.cellHeight * this.rowCount
    }
    _getGroupTopOffset(appointmentSettings) {
        const {
            groupIndex: groupIndex
        } = appointmentSettings;
        const groupTop = Math.max(0, this.positionHelper.getGroupTop({
            groupIndex: groupIndex,
            showAllDayPanel: this.showAllDayPanel,
            isGroupedAllDayPanel: this.isGroupedAllDayPanel
        }));
        const allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
            groupIndex: groupIndex,
            supportAllDayRow: this.allDaySupported(),
            showAllDayPanel: this.showAllDayPanel
        });
        const appointmentGroupTopOffset = appointmentSettings.top - groupTop - allDayPanelOffset;
        return appointmentGroupTopOffset
    }
    _getTailHeight(appointmentGeometry, appointmentSettings) {
        if (!this.isVirtualScrolling) {
            return appointmentGeometry.sourceAppointmentHeight - appointmentGeometry.reducedHeight
        }
        const appointmentGroupTopOffset = this._getGroupTopOffset(appointmentSettings);
        const {
            sourceAppointmentHeight: sourceAppointmentHeight
        } = appointmentGeometry;
        const groupHeight = this._getGroupHeight();
        const tailHeight = appointmentGroupTopOffset + sourceAppointmentHeight - groupHeight;
        return tailHeight
    }
    _getAppointmentParts(appointmentGeometry, appointmentSettings) {
        const {
            width: width
        } = appointmentGeometry;
        const result = [];
        let currentPartTop = Math.max(0, this.positionHelper.getGroupTop({
            groupIndex: appointmentSettings.groupIndex,
            showAllDayPanel: this.showAllDayPanel,
            isGroupedAllDayPanel: this.isGroupedAllDayPanel
        }));
        const cellsDiff = this.isGroupedByDate ? this.groupCount : 1;
        const offset = this.cellWidth * cellsDiff;
        const allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
            groupIndex: appointmentSettings.groupIndex,
            supportAllDayRow: this.allDaySupported(),
            showAllDayPanel: this.showAllDayPanel
        });
        currentPartTop += allDayPanelOffset;
        const minHeight = this.getAppointmentMinSize();
        const {
            vMax: vMax,
            hMax: hMax
        } = appointmentSettings;
        const hasTailPart = this.options.endViewDate > appointmentSettings.info.appointment.endDate;
        let left = Math.round(appointmentSettings.left + offset);
        let tailHeight = this._getTailHeight(appointmentGeometry, appointmentSettings);
        let {
            columnIndex: columnIndex
        } = appointmentSettings;
        while (tailHeight > 0 && left < hMax) {
            tailHeight = Math.max(minHeight, tailHeight);
            columnIndex += cellsDiff;
            const height = Math.min(tailHeight, vMax);
            result.push(_extends({}, appointmentSettings, {
                top: currentPartTop,
                left: left,
                height: height,
                width: width,
                appointmentReduced: "body",
                rowIndex: 0,
                columnIndex: columnIndex
            }));
            left += offset;
            tailHeight -= vMax
        }
        if (hasTailPart && result.length > 0) {
            result[result.length - 1].appointmentReduced = "tail"
        }
        return result
    }
    _getMinuteHeight() {
        return this.cellHeight / this.cellDurationInMinutes
    }
    _getCompactLeftCoordinate(itemLeft, index) {
        const cellWidth = this.cellWidth || this.getAppointmentMinSize();
        return itemLeft + (1 + cellWidth) * index
    }
    _getVerticalAppointmentGeometry(coordinates) {
        const config = this._calculateVerticalGeometryConfig(coordinates);
        return this._customizeVerticalCoordinates(coordinates, config.width, config.appointmentCountPerCell, config.offset)
    }
    _customizeVerticalCoordinates(coordinates, width, appointmentCountPerCell, topOffset, isAllDay) {
        const appointmentWidth = Math.max(width / appointmentCountPerCell, width / coordinates.count);
        const {
            height: height
        } = coordinates;
        const appointmentLeft = coordinates.left + coordinates.index * appointmentWidth;
        const {
            top: top
        } = coordinates;
        if (coordinates.isCompact) {
            this._markAppointmentAsVirtual(coordinates, isAllDay)
        }
        return {
            height: height,
            width: appointmentWidth,
            top: top,
            left: appointmentLeft,
            empty: this._isAppointmentEmpty(height, width)
        }
    }
    _calculateVerticalGeometryConfig(coordinates) {
        const overlappingMode = this.maxAppointmentsPerCell;
        const offsets = this._getOffsets();
        const appointmentDefaultOffset = this._getAppointmentDefaultOffset();
        let appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);
        let ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);
        let maxWidth = this._getMaxWidth();
        if (!appointmentCountPerCell) {
            appointmentCountPerCell = coordinates.count;
            ratio = (maxWidth - offsets.unlimited) / maxWidth
        }
        let topOffset = (1 - ratio) * maxWidth;
        if ("auto" === overlappingMode || (0, _type.isNumeric)(overlappingMode)) {
            ratio = 1;
            maxWidth -= appointmentDefaultOffset;
            topOffset = 0
        }
        return {
            width: ratio * maxWidth,
            appointmentCountPerCell: appointmentCountPerCell,
            offset: topOffset
        }
    }
    _getMaxWidth() {
        return this.cellWidth
    }
    isAllDay(appointmentData) {
        return (0, _index.getAppointmentTakesAllDay)((0, _m_appointment_adapter.createAppointmentAdapter)(appointmentData, this.dataAccessors, this.timeZoneCalculator), this.allDayPanelMode)
    }
    _getAppointmentMaxWidth() {
        return this.cellWidth - this._getAppointmentDefaultOffset()
    }
    calculateAppointmentWidth(appointment, position) {
        if (!this.isAllDay(appointment)) {
            return 0
        }
        const {
            startDate: startDateWithTime,
            endDate: endDate,
            normalizedEndDate: normalizedEndDate
        } = position.info.appointment;
        const startDate = _date.default.trimTime(startDateWithTime);
        const cellWidth = this.cellWidth || this.getAppointmentMinSize();
        const durationInHours = (normalizedEndDate.getTime() - startDate.getTime()) / toMs("hour");
        const skippedHours = (0, _index.getSkippedHoursInRange)(startDate, endDate, appointment.allDay, this.viewDataProvider);
        let width = Math.ceil((durationInHours - skippedHours) / 24) * cellWidth;
        width = this.cropAppointmentWidth(width, cellWidth);
        return width
    }
    calculateAppointmentHeight(appointment, position) {
        if (this.isAllDay(appointment)) {
            return 0
        }
        const {
            startDate: startDate,
            normalizedEndDate: normalizedEndDate
        } = position.info.appointment;
        const allDay = _m_expression_utils.ExpressionUtils.getField(this.dataAccessors, "allDay", appointment);
        const duration = this.getAppointmentDurationInMs(startDate, normalizedEndDate, allDay);
        const durationInMinutes = this._adjustDurationByDaylightDiff(duration, startDate, normalizedEndDate) / toMs("minute");
        const height = durationInMinutes * this._getMinuteHeight();
        return height
    }
    getDirection() {
        return "vertical"
    }
    _sortCondition(a, b) {
        if (!!a.allDay !== !!b.allDay) {
            return a.allDay ? 1 : -1
        }
        const isAllDay = a.allDay && b.allDay;
        return "vertical" === this.groupOrientation && isAllDay ? this._columnCondition(a, b) : this._rowCondition(a, b)
    }
    allDaySupported() {
        return true
    }
    _getAllDayAppointmentGeometry(coordinates) {
        const config = this._calculateGeometryConfig(coordinates);
        return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset, true)
    }
    _calculateGeometryConfig(coordinates) {
        if (!this.allowResizing || !this.allowAllDayResizing) {
            coordinates.skipResizing = true
        }
        const config = super._calculateGeometryConfig(coordinates);
        const minAppointmentCountPerCell = Math.min(config.appointmentCountPerCell, this._getDynamicAppointmentCountPerCell().allDay);
        if (coordinates.allDay && coordinates.count <= minAppointmentCountPerCell) {
            config.offset = 0
        }
        return config
    }
    _getAppointmentCount(overlappingMode, coordinates) {
        return "auto" !== overlappingMode && 1 === coordinates.count && !(0, _type.isNumeric)(overlappingMode) ? coordinates.count : this._getMaxAppointmentCountPerCellByType(coordinates.allDay)
    }
    _getDefaultRatio(coordinates, appointmentCountPerCell) {
        return coordinates.count > this.appointmentCountPerCell ? .65 : 1
    }
    _getOffsets() {
        return {
            unlimited: 5,
            auto: 20
        }
    }
    _getMaxHeight() {
        return this.allDayHeight || this.getAppointmentMinSize()
    }
    _needVerticalGroupBounds(allDay) {
        return !allDay
    }
    _needHorizontalGroupBounds() {
        return false
    }
    getPositionShift(timeShift, isAllDay) {
        if (!isAllDay && this.isAdaptive && 0 === this._getMaxAppointmentCountPerCellByType(isAllDay)) {
            return {
                top: 0,
                left: 0,
                cellPosition: 0
            }
        }
        return super.getPositionShift(timeShift, isAllDay)
    }
}
var _default = exports.default = VerticalRenderingStrategy;
