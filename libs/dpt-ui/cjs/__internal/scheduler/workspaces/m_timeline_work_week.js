/**
 * DevExtreme (cjs/__internal/scheduler/workspaces/m_timeline_work_week.js)
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
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _index = require("../../scheduler/r1/utils/index");
var _m_constants = require("../m_constants");
var _m_timeline_week = _interopRequireDefault(require("./m_timeline_week"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const TIMELINE_CLASS = "dx-scheduler-timeline-work-week";
const LAST_DAY_WEEK_INDEX = 5;
class SchedulerTimelineWorkWeek extends _m_timeline_week.default {
    get type() {
        return _m_constants.VIEWS.TIMELINE_WORK_WEEK
    }
    constructor() {
        super(...arguments);
        this._getWeekendsCount = _index.getWeekendsCount
    }
    _getElementClass() {
        return TIMELINE_CLASS
    }
    _incrementDate(date) {
        const day = date.getDay();
        if (5 === day) {
            date.setDate(date.getDate() + 2)
        }
        super._incrementDate(date)
    }
}(0, _component_registrator.default)("dxSchedulerTimelineWorkWeek", SchedulerTimelineWorkWeek);
var _default = exports.default = SchedulerTimelineWorkWeek;
