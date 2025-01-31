/**
 * DevExtreme (cjs/events/remove.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.removeEvent = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _element_data = require("../core/element_data");
var _events_engine = _interopRequireDefault(require("./core/events_engine"));
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const removeEvent = exports.removeEvent = "dxremove";
const eventPropName = "dxRemoveEvent";
(0, _element_data.beforeCleanData)((function(elements) {
    elements = [].slice.call(elements);
    for (let i = 0; i < elements.length; i++) {
        const $element = (0, _renderer.default)(elements[i]);
        if ($element.prop(eventPropName)) {
            $element[0][eventPropName] = null;
            _events_engine.default.triggerHandler($element, removeEvent)
        }
    }
}));
(0, _event_registrator.default)(removeEvent, {
    noBubble: true,
    setup: function(element) {
        (0, _renderer.default)(element).prop(eventPropName, true)
    }
});
