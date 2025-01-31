/**
 * DevExtreme (cjs/__internal/scheduler/r1/utils/format_weekday.js)
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
exports.formatWeekdayAndDay = exports.formatWeekday = void 0;
var _date = _interopRequireDefault(require("../../../../localization/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const formatWeekday = date => _date.default.getDayNames("abbreviated")[date.getDay()];
exports.formatWeekday = formatWeekday;
const formatWeekdayAndDay = date => `${formatWeekday(date)} ${_date.default.format(date,"day")}`;
exports.formatWeekdayAndDay = formatWeekdayAndDay;
