/**
 * DevExtreme (esm/renovation/utils/get_computed_style.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWindow
} from "../../core/utils/window";
export default function getElementComputedStyle(el) {
    var _window$getComputedSt;
    const window = getWindow();
    return el ? null === (_window$getComputedSt = window.getComputedStyle) || void 0 === _window$getComputedSt ? void 0 : _window$getComputedSt.call(window, el) : null
}
