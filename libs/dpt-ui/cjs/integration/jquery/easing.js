/**
 * DevExtreme (cjs/integration/jquery/easing.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _jquery = _interopRequireDefault(require("jquery"));
var _easing = require("../../animation/easing");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
if (_jquery.default) {
    (0, _easing.setEasing)(_jquery.default.easing)
}
