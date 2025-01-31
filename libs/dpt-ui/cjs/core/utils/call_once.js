/**
 * DevExtreme (cjs/core/utils/call_once.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
const callOnce = function(handler) {
    let result;
    let wrappedHandler = function() {
        result = handler.apply(this, arguments);
        wrappedHandler = function() {
            return result
        };
        return result
    };
    return function() {
        return wrappedHandler.apply(this, arguments)
    }
};
var _default = exports.default = callOnce;
module.exports = exports.default;
module.exports.default = exports.default;
