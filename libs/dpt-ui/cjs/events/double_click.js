/**
 * DevExtreme (cjs/events/double_click.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "name", {
    enumerable: true,
    get: function() {
        return _dblclick.name
    }
});
var _dblclick = require("../__internal/events/dblclick");
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}(0, _event_registrator.default)(_dblclick.name, _dblclick.dblClick);
