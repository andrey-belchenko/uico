/**
 * DevExtreme (cjs/core/utils/console.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.logger = exports.debug = void 0;
var _type = require("./type");
const noop = function() {};
const getConsoleMethod = function(method) {
    if ("undefined" === typeof console || !(0, _type.isFunction)(console[method])) {
        return noop
    }
    return console[method].bind(console)
};
const logger = exports.logger = {
    log: getConsoleMethod("log"),
    info: getConsoleMethod("info"),
    warn: getConsoleMethod("warn"),
    error: getConsoleMethod("error")
};
const debug = exports.debug = function() {
    function assert(condition, message) {
        if (!condition) {
            throw new Error(message)
        }
    }
    return {
        assert: assert,
        assertParam: function(parameter, message) {
            assert(null !== parameter && void 0 !== parameter, message)
        }
    }
}();
