/**
 * DevExtreme (cjs/__internal/scheduler/appointments/rendering_strategies/m_strategy_horizontal_month.js)
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
var _m_position_helper = require("../../workspaces/helpers/m_position_helper");
var _m_strategy_horizontal_month_line = _interopRequireDefault(require("./m_strategy_horizontal_month_line"));

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
const MONTH_APPOINTMENT_HEIGHT_RATIO = .6;
const MONTH_APPOINTMENT_MIN_OFFSET = 26;
const MONTH_APPOINTMENT_MAX_OFFSET = 30;
const MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
const MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;
const toMs = _date.default.dateToMilliseconds;
class HorizontalMonthRenderingStrategy extends _m_strategy_horizontal_month_line.default {
    get endViewDate() {
        return this.options.endViewDate
    }
    get adaptivityEnabled() {
        return this.options.adaptivityEnabled
    }
    get DOMMetaData() {
        return this.options.DOMMetaData
    }
    _getLeftPosition(settings) {
        const fullWeekAppointmentWidth = this.getGroupWidth(settings.groupIndex);
        return this._calculateMultiWeekAppointmentLeftOffset(settings.hMax, fullWeekAppointmentWidth)
    }
    _getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth, settings) {
        const {
            groupIndex: groupIndex,
            info: {
                appointment: {
                    startDate: startDate
                }
            }
        } = settings;
        const rawFullChunksWidth = fullChunksWidth - firstChunkWidth + weekWidth;
        const allChunksCount = Math.ceil(rawFullChunksWidth / weekWidth);
        const viewRowIndex = this._tryGetRowIndexInView(startDate);
        if (void 0 !== viewRowIndex) {
            const viewChunksCount = this.viewDataProvider.getRowCountInGroup(groupIndex);
            const allowedChunksCount = viewChunksCount - viewRowIndex;
            return allChunksCount <= allowedChunksCount ? allChunksCount : allowedChunksCount
        }
        return allChunksCount
    }
    _tryGetRowIndexInView(positionStartDate) {
        var _this$options$dataRan;
        const columnsCount = this.viewDataProvider.getColumnsCount();
        if ((null === (_this$options$dataRan = this.options.dataRange) || void 0 === _this$options$dataRan ? void 0 : _this$options$dataRan.length) < 1 || !columnsCount) {
            return
        }
        const [startViewDate] = this.options.dateRange;
        const dayDurationMs = toMs("day");
        const timeFromStart = positionStartDate.getTime() - startViewDate.getTime();
        return Math.floor(timeFromStart / dayDurationMs / columnsCount)
    }
    _getChunkWidths(geometry, settings, weekWidth) {
        const firstChunkWidth = geometry.reducedWidth;
        const fullChunksWidth = Math.floor(geometry.sourceAppointmentWidth);
        const widthWithoutFirstChunk = fullChunksWidth - firstChunkWidth;
        return [firstChunkWidth, fullChunksWidth, widthWithoutFirstChunk]
    }
    _getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition) {
        const tailChunkWidth = withoutFirstChunkWidth % weekWidth || weekWidth;
        const rtlPosition = leftPosition + (weekWidth - tailChunkWidth);
        const tailChunkLeftPosition = this.rtlEnabled ? rtlPosition : leftPosition;
        return [tailChunkWidth, tailChunkLeftPosition]
    }
    _getAppointmentParts(geometry, settings) {
        const result = [];
        const weekWidth = Math.round(this.getGroupWidth(settings.groupIndex));
        const [firstChunkWidth, fullChunksWidth, withoutFirstChunkWidth] = this._getChunkWidths(geometry, settings, weekWidth);
        const leftPosition = this._getLeftPosition(settings);
        const {
            endDate: endDate
        } = settings.info.appointment;
        const hasTailChunk = this.endViewDate > endDate;
        const chunkCount = this._getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth, settings);
        const [tailChunkWidth, tailChunkLeftPosition] = this._getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition);
        for (let chunkIndex = 1; chunkIndex < chunkCount; chunkIndex++) {
            const topPosition = settings.top + this.cellHeight * chunkIndex;
            const isTailChunk = hasTailChunk && chunkIndex === chunkCount - 1;
            result.push(_extends({}, settings, {
                top: topPosition,
                left: isTailChunk ? tailChunkLeftPosition : leftPosition,
                height: geometry.height,
                width: isTailChunk ? tailChunkWidth : weekWidth,
                appointmentReduced: isTailChunk ? "tail" : "body",
                rowIndex: ++settings.rowIndex,
                columnIndex: 0
            }))
        }
        return result
    }
    _calculateMultiWeekAppointmentLeftOffset(max, width) {
        return this.rtlEnabled ? max : max - width
    }
    getGroupWidth(groupIndex) {
        return (0, _m_position_helper.getGroupWidth)(groupIndex, this.viewDataProvider, {
            intervalCount: this.options.intervalCount,
            currentDate: this.options.currentDate,
            viewType: this.options.viewType,
            hoursInterval: this.options.hoursInterval,
            startDayHour: this.options.startDayHour,
            endDayHour: this.options.endDayHour,
            isVirtualScrolling: this.isVirtualScrolling,
            rtlEnabled: this.rtlEnabled,
            DOMMetaData: this.DOMMetaData
        })
    }
    _getAppointmentDefaultHeight() {
        return this._getAppointmentHeightByTheme()
    }
    _getAppointmentMinHeight() {
        return this._getAppointmentDefaultHeight()
    }
    createTaskPositionMap(items) {
        return super.createTaskPositionMap(items, true)
    }
    _getSortedPositions(map) {
        return super._getSortedPositions(map, true)
    }
    _getDefaultRatio() {
        return .6
    }
    _getOffsets() {
        return {
            unlimited: 26,
            auto: 30
        }
    }
    getDropDownAppointmentWidth(intervalCount, isAllDay) {
        if (this.adaptivityEnabled) {
            return this.getDropDownButtonAdaptiveSize()
        }
        const offset = intervalCount > 1 ? 60 : 36;
        return this.cellWidth - offset
    }
    needCorrectAppointmentDates() {
        return false
    }
    _needVerticalGroupBounds() {
        return false
    }
    _needHorizontalGroupBounds() {
        return true
    }
}
var _default = exports.default = HorizontalMonthRenderingStrategy;
