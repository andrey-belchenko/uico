/**
 * DevExtreme (cjs/events/visibility_change.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.triggerShownEvent = exports.triggerResizeEvent = exports.triggerHidingEvent = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("./core/events_engine"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const triggerVisibilityChangeEvent = function(eventName) {
    return function(element) {
        const $element = (0, _renderer.default)(element || "body");
        const changeHandlers = $element.filter(".dx-visibility-change-handler").add($element.find(".dx-visibility-change-handler"));
        for (let i = 0; i < changeHandlers.length; i++) {
            _events_engine.default.triggerHandler(changeHandlers[i], eventName)
        }
    }
};
const triggerShownEvent = exports.triggerShownEvent = triggerVisibilityChangeEvent("dxshown");
const triggerHidingEvent = exports.triggerHidingEvent = triggerVisibilityChangeEvent("dxhiding");
const triggerResizeEvent = exports.triggerResizeEvent = triggerVisibilityChangeEvent("dxresize");
