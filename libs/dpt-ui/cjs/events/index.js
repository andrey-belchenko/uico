/**
 * DevExtreme (cjs/events/index.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.triggerHandler = exports.trigger = exports.one = exports.on = exports.off = exports.Event = void 0;
var _events_engine = _interopRequireDefault(require("./core/events_engine"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const on = exports.on = _events_engine.default.on;
const one = exports.one = _events_engine.default.one;
const off = exports.off = _events_engine.default.off;
const trigger = exports.trigger = _events_engine.default.trigger;
const triggerHandler = exports.triggerHandler = _events_engine.default.triggerHandler;
const Event = exports.Event = _events_engine.default.Event;
