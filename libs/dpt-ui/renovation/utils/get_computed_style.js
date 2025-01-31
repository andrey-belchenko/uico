/**
 * DevExtreme (renovation/utils/get_computed_style.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = getElementComputedStyle;
var _window = require("../../core/utils/window");

function getElementComputedStyle(el) {
    var _window$getComputedSt;
    const window = (0, _window.getWindow)();
    return el ? null === (_window$getComputedSt = window.getComputedStyle) || void 0 === _window$getComputedSt ? void 0 : _window$getComputedSt.call(window, el) : null
}
module.exports = exports.default;
module.exports.default = exports.default;
