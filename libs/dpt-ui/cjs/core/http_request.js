/**
 * DevExtreme (cjs/core/http_request.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _window = require("./utils/window");
var _dependency_injector = _interopRequireDefault(require("./utils/dependency_injector"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const window = (0, _window.getWindow)();
const nativeXMLHttpRequest = {
    getXhr: function() {
        return new window.XMLHttpRequest
    }
};
var _default = exports.default = (0, _dependency_injector.default)(nativeXMLHttpRequest);
module.exports = exports.default;
module.exports.default = exports.default;
