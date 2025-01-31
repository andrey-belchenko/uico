/**
 * DevExtreme (cjs/__internal/ui/toast/m_hide_toasts.js)
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
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const TOAST_CLASS = "dx-toast";

function hideAllToasts(container) {
    const toasts = (0, _renderer.default)(".dx-toast").toArray();
    if (!arguments.length) {
        toasts.forEach((toast => {
            (0, _renderer.default)(toast).dxToast("hide")
        }));
        return
    }
    const containerElement = (0, _renderer.default)(container).get(0);
    toasts.map((toast => (0, _renderer.default)(toast).dxToast("instance"))).filter((instance => {
        const toastContainerElement = (0, _renderer.default)(instance.option("container")).get(0);
        return containerElement === toastContainerElement && containerElement
    })).forEach((instance => {
        instance.hide()
    }))
}
var _default = exports.default = hideAllToasts;
