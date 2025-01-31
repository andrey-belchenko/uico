/**
 * DevExtreme (cjs/__internal/scheduler/m_date_adapter.js)
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
var _date = _interopRequireDefault(require("../../core/utils/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const toMs = _date.default.dateToMilliseconds;
class DateAdapterCore {
    constructor(source) {
        this._source = new Date(source.getTime ? source.getTime() : source)
    }
    get source() {
        return this._source
    }
    result() {
        return this._source
    }
    getTimezoneOffset() {
        let format = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
        const value = this._source.getTimezoneOffset();
        if ("minute" === format) {
            return value * toMs("minute")
        }
        return value
    }
    getTime() {
        return this._source.getTime()
    }
    setTime(value) {
        this._source.setTime(value);
        return this
    }
    addTime(value) {
        this._source.setTime(this._source.getTime() + value);
        return this
    }
    setMinutes(value) {
        this._source.setMinutes(value);
        return this
    }
    addMinutes(value) {
        this._source.setMinutes(this._source.getMinutes() + value);
        return this
    }
    subtractMinutes(value) {
        this._source.setMinutes(this._source.getMinutes() - value);
        return this
    }
}
const DateAdapter = date => new DateAdapterCore(date);
var _default = exports.default = DateAdapter;
