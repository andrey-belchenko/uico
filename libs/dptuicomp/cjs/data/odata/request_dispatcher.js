/**
 * DevExtreme (cjs/data/odata/request_dispatcher.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _utils = require("./utils");
require("./query_adapter");
const DEFAULT_PROTOCOL_VERSION = 4;
class RequestDispatcher {
    constructor(options) {
        options = options || {};
        this._url = String(options.url).replace(/\/+$/, "");
        this._beforeSend = options.beforeSend;
        this._jsonp = options.jsonp;
        this._version = options.version || 4;
        this._withCredentials = options.withCredentials;
        this._deserializeDates = options.deserializeDates;
        this._filterToLower = options.filterToLower
    }
    sendRequest(url, method, params, payload) {
        return (0, _utils.sendRequest)(this.version, {
            url: url,
            method: method,
            params: params || {},
            payload: payload
        }, {
            beforeSend: this._beforeSend,
            jsonp: this._jsonp,
            withCredentials: this._withCredentials,
            deserializeDates: this._deserializeDates
        })
    }
    get version() {
        return this._version
    }
    get beforeSend() {
        return this._beforeSend
    }
    get url() {
        return this._url
    }
    get jsonp() {
        return this._jsonp
    }
    get filterToLower() {
        return this._filterToLower
    }
}
exports.default = RequestDispatcher;
module.exports = exports.default;
module.exports.default = exports.default;
