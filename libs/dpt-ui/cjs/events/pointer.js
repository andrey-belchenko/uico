/**
 * DevExtreme (cjs/events/pointer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _config = _interopRequireDefault(require("../core/config"));
var support = _interopRequireWildcard(require("../core/utils/support"));
var _iterator = require("../core/utils/iterator");
var _devices = _interopRequireDefault(require("../core/devices"));
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));
var _touch = _interopRequireDefault(require("./pointer/touch"));
var _mouse = _interopRequireDefault(require("./pointer/mouse"));
var _mouse_and_touch = _interopRequireDefault(require("./pointer/mouse_and_touch"));

function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) {
        return null
    }
    var r = new WeakMap,
        t = new WeakMap;
    return (_getRequireWildcardCache = function(e) {
        return e ? t : r
    })(e)
}

function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) {
        return e
    }
    if (null === e || "object" != typeof e && "function" != typeof e) {
        return {
            default: e
        }
    }
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) {
        return t.get(e)
    }
    var n = {
            __proto__: null
        },
        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e) {
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
            var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
            i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]
        }
    }
    return n.default = e, t && t.set(e, n), n
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const getStrategy = (support, _ref) => {
    let {
        tablet: tablet,
        phone: phone
    } = _ref;
    const pointerEventStrategy = getStrategyFromGlobalConfig();
    if (pointerEventStrategy) {
        return pointerEventStrategy
    }
    if (support.touch && !(tablet || phone)) {
        return _mouse_and_touch.default
    }
    if (support.touch) {
        return _touch.default
    }
    return _mouse.default
};
const EventStrategy = getStrategy(support, _devices.default.real());
(0, _iterator.each)(EventStrategy.map, ((pointerEvent, originalEvents) => {
    (0, _event_registrator.default)(pointerEvent, new EventStrategy(pointerEvent, originalEvents))
}));
const pointer = {
    down: "dxpointerdown",
    up: "dxpointerup",
    move: "dxpointermove",
    cancel: "dxpointercancel",
    enter: "dxpointerenter",
    leave: "dxpointerleave",
    over: "dxpointerover",
    out: "dxpointerout"
};

function getStrategyFromGlobalConfig() {
    const eventStrategyName = (0, _config.default)().pointerEventStrategy;
    return {
        "mouse-and-touch": _mouse_and_touch.default,
        touch: _touch.default,
        mouse: _mouse.default
    } [eventStrategyName]
}
var _default = exports.default = pointer;
module.exports = exports.default;
module.exports.default = exports.default;
