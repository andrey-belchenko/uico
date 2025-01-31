/**
 * DevExtreme (cjs/renovation/ui/scroll_view/utils/subscribe_to_resize.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.subscribeToResize = subscribeToResize;
var _resize_observer = _interopRequireDefault(require("../../../../core/resize_observer"));
var _window = require("../../../../core/utils/window");
var _frame = require("../../../../animation/frame");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function subscribeToResize(element, handler) {
    if ((0, _window.hasWindow)() && element) {
        let resizeAnimationFrameID = -1;
        _resize_observer.default.observe(element, (_ref => {
            let {
                target: target
            } = _ref;
            resizeAnimationFrameID = (0, _frame.requestAnimationFrame)((() => {
                handler(target)
            }))
        }));
        return () => {
            (0, _frame.cancelAnimationFrame)(resizeAnimationFrameID);
            _resize_observer.default.unobserve(element)
        }
    }
    return
}
