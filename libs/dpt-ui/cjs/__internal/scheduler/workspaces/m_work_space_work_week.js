/**
 * DevExtreme (cjs/__internal/scheduler/workspaces/m_work_space_work_week.js)
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
var _m_work_space_week = _interopRequireDefault(require("./m_work_space_week"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const WORK_WEEK_CLASS = "dx-scheduler-work-space-work-week";
class SchedulerWorkSpaceWorkWeek extends _m_work_space_week.default {
    get type() {
        return _m_constants.VIEWS.WORK_WEEK
    }
    constructor() {
        super(...arguments);
        this._getWeekendsCount = _index.getWeekendsCount
    }
    _getElementClass() {
        return WORK_WEEK_CLASS
    }
}(0, _component_registrator.default)("dxSchedulerWorkSpaceWorkWeek", SchedulerWorkSpaceWorkWeek);
var _default = exports.default = SchedulerWorkSpaceWorkWeek;
