/**
 * DevExtreme (cjs/events/utils/add_namespace.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _errors = _interopRequireDefault(require("../../core/errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const addNamespace = (eventNames, namespace) => {
    if (!namespace) {
        throw _errors.default.Error("E0017")
    }
    if (Array.isArray(eventNames)) {
        return eventNames.map((eventName => addNamespace(eventName, namespace))).join(" ")
    }
    if (-1 !== eventNames.indexOf(" ")) {
        return addNamespace(eventNames.split(/\s+/g), namespace)
    }
    return `${eventNames}.${namespace}`
};
var _default = exports.default = addNamespace;
module.exports = exports.default;
module.exports.default = exports.default;
