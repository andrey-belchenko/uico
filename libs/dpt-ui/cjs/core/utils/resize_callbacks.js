/**
 * DevExtreme (cjs/core/utils/resize_callbacks.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _window = require("./window");
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
var _callbacks = _interopRequireDefault(require("./callbacks"));
var _ready_callbacks = _interopRequireDefault(require("./ready_callbacks"));
var _call_once = _interopRequireDefault(require("./call_once"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const resizeCallbacks = function() {
    let prevSize;
    const callbacks = (0, _callbacks.default)();
    const originalCallbacksAdd = callbacks.add;
    const originalCallbacksRemove = callbacks.remove;
    if (!(0, _window.hasWindow)()) {
        return callbacks
    }
    const formatSize = function() {
        const window = (0, _window.getWindow)();
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
    const handleResize = function() {
        const now = formatSize();
        if (now.width === prevSize.width && now.height === prevSize.height) {
            return
        }
        let changedDimension;
        if (now.width === prevSize.width) {
            changedDimension = "height"
        }
        if (now.height === prevSize.height) {
            changedDimension = "width"
        }
        prevSize = now;
        callbacks.fire(changedDimension)
    };
    const setPrevSize = (0, _call_once.default)((function() {
        prevSize = formatSize()
    }));
    let removeListener;
    callbacks.add = function() {
        const result = originalCallbacksAdd.apply(callbacks, arguments);
        setPrevSize();
        _ready_callbacks.default.add((function() {
            if (!removeListener && callbacks.has()) {
                removeListener = _dom_adapter.default.listen((0, _window.getWindow)(), "resize", handleResize)
            }
        }));
        return result
    };
    callbacks.remove = function() {
        const result = originalCallbacksRemove.apply(callbacks, arguments);
        if (!callbacks.has() && removeListener) {
            removeListener();
            removeListener = void 0
        }
        return result
    };
    return callbacks
}();
var _default = exports.default = resizeCallbacks;
module.exports = exports.default;
module.exports.default = exports.default;
