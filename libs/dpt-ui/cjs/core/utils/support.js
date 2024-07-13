/**
 * DevExtreme (cjs/core/utils/support.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.pointerEvents = exports.nativeScrolling = exports.inputType = exports.animation = void 0;
Object.defineProperty(exports, "styleProp", {
    enumerable: true,
    get: function() {
        return _style.styleProp
    }
});
Object.defineProperty(exports, "stylePropPrefix", {
    enumerable: true,
    get: function() {
        return _style.stylePropPrefix
    }
});
exports.transitionEndEventName = exports.transition = exports.touchEvents = exports.touch = exports.supportProp = void 0;
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
var _call_once = _interopRequireDefault(require("./call_once"));
var _window = require("./window");
var _devices = _interopRequireDefault(require("../devices"));
var _style = require("./style");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const {
    maxTouchPoints: maxTouchPoints
} = (0, _window.getNavigator)();
const transitionEndEventNames = {
    webkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd",
    transition: "transitionend"
};
const supportProp = function(prop) {
    return !!(0, _style.styleProp)(prop)
};
exports.supportProp = supportProp;
const isNativeScrollingSupported = function() {
    const {
        platform: platform,
        mac: isMac
    } = _devices.default.real();
    const isNativeScrollDevice = "ios" === platform || "android" === platform || isMac;
    return isNativeScrollDevice
};
const inputType = function(type) {
    if ("text" === type) {
        return true
    }
    const input = _dom_adapter.default.createElement("input");
    try {
        input.setAttribute("type", type);
        input.value = "wrongValue";
        return !input.value
    } catch (e) {
        return false
    }
};
exports.inputType = inputType;
const detectTouchEvents = function(hasWindowProperty, maxTouchPoints) {
    return (hasWindowProperty("ontouchstart") || !!maxTouchPoints) && !hasWindowProperty("callPhantom")
};
const detectPointerEvent = function(hasWindowProperty) {
    return hasWindowProperty("PointerEvent")
};
const touchEvents = exports.touchEvents = detectTouchEvents(_window.hasProperty, maxTouchPoints);
const pointerEvents = exports.pointerEvents = detectPointerEvent(_window.hasProperty);
const touchPointersPresent = !!maxTouchPoints;
const touch = exports.touch = touchEvents || pointerEvents && touchPointersPresent;
const transition = exports.transition = (0, _call_once.default)((function() {
    return supportProp("transition")
}));
const transitionEndEventName = exports.transitionEndEventName = (0, _call_once.default)((function() {
    return transitionEndEventNames[(0, _style.styleProp)("transition")]
}));
const animation = exports.animation = (0, _call_once.default)((function() {
    return supportProp("animation")
}));
const nativeScrolling = exports.nativeScrolling = isNativeScrollingSupported();
