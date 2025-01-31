/**
 * DevExtreme (cjs/core/utils/window.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.setWindow = exports.hasWindow = exports.hasProperty = exports.getWindow = exports.getNavigator = exports.getCurrentScreenFactor = exports.defaultScreenFactorFunc = void 0;
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
let hasWindowValue = "undefined" !== typeof window;
const hasWindow = () => hasWindowValue;
exports.hasWindow = hasWindow;
let windowObject = hasWindow() ? window : void 0;
if (!windowObject) {
    windowObject = {};
    windowObject.window = windowObject
}
const getWindow = () => windowObject;
exports.getWindow = getWindow;
const setWindow = (newWindowObject, hasWindow) => {
    if (void 0 === hasWindow) {
        hasWindowValue = "undefined" !== typeof window && window === newWindowObject
    } else {
        hasWindowValue = hasWindow
    }
    windowObject = newWindowObject
};
exports.setWindow = setWindow;
const hasProperty = prop => hasWindow() && prop in windowObject;
exports.hasProperty = hasProperty;
const defaultScreenFactorFunc = width => {
    if (width < 768) {
        return "xs"
    } else if (width < 992) {
        return "sm"
    } else if (width < 1200) {
        return "md"
    } else {
        return "lg"
    }
};
exports.defaultScreenFactorFunc = defaultScreenFactorFunc;
const getCurrentScreenFactor = screenFactorCallback => {
    const screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;
    const windowWidth = _dom_adapter.default.getDocumentElement().clientWidth;
    return screenFactorFunc(windowWidth)
};
exports.getCurrentScreenFactor = getCurrentScreenFactor;
const getNavigator = () => hasWindow() ? windowObject.navigator : {
    userAgent: ""
};
exports.getNavigator = getNavigator;
