/**
 * DevExtreme (cjs/__internal/ui/scroll_view/m_scrollable.device.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deviceDependentOptions = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _support = require("../../../core/utils/support");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const deviceDependentOptions = function() {
    return [{
        device: () => !_support.nativeScrolling,
        options: {
            useNative: false
        }
    }, {
        device: device => !_devices.default.isSimulator() && "desktop" === _devices.default.real().deviceType && "generic" === device.platform,
        options: {
            bounceEnabled: false,
            scrollByThumb: true,
            scrollByContent: _support.touch,
            showScrollbar: "onHover"
        }
    }]
};
exports.deviceDependentOptions = deviceDependentOptions;
