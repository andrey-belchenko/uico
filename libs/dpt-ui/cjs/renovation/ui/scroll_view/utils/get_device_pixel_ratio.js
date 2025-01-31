/**
 * DevExtreme (cjs/renovation/ui/scroll_view/utils/get_device_pixel_ratio.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getDevicePixelRatio = getDevicePixelRatio;
var _window = require("../../../../core/utils/window");

function getDevicePixelRatio() {
    return (0, _window.hasWindow)() ? (0, _window.getWindow)().devicePixelRatio : 1
}
