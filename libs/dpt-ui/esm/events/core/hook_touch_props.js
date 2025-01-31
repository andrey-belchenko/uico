/**
 * DevExtreme (esm/events/core/hook_touch_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const touchPropsToHook = ["pageX", "pageY", "screenX", "screenY", "clientX", "clientY"];
const touchPropHook = function(name, event) {
    if (event[name] && !event.touches || !event.touches) {
        return event[name]
    }
    const touches = event.touches.length ? event.touches : event.changedTouches;
    if (!touches.length) {
        return
    }
    return touches[0][name]
};
export default function(callback) {
    touchPropsToHook.forEach((function(name) {
        callback(name, (function(event) {
            return touchPropHook(name, event)
        }))
    }), this)
}
