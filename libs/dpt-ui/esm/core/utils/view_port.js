/**
 * DevExtreme (esm/core/utils/view_port.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../renderer";
import readyCallbacks from "./ready_callbacks";
const ready = readyCallbacks.add;
import callbacks from "./callbacks";
const changeCallback = callbacks();
let $originalViewPort = $();
const value = function() {
    let $current;
    return function(element) {
        if (!arguments.length) {
            return $current
        }
        const $element = $(element);
        $originalViewPort = $element;
        const isNewViewportFound = !!$element.length;
        const prevViewPort = value();
        $current = isNewViewportFound ? $element : $("body");
        changeCallback.fire(isNewViewportFound ? value() : $(), prevViewPort)
    }
}();
ready((function() {
    value(".dx-viewport")
}));
export {
    value,
    changeCallback
};
export function originalViewPort() {
    return $originalViewPort
}
