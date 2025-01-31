/**
 * DevExtreme (cjs/events/utils/event_target.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getEventTarget = void 0;
const getEventTarget = event => {
    var _originalEvent$target, _originalEvent$compos;
    const originalEvent = event.originalEvent;
    if (!originalEvent) {
        return event.target
    }
    const isShadowDOMUsed = Boolean(null === (_originalEvent$target = originalEvent.target) || void 0 === _originalEvent$target ? void 0 : _originalEvent$target.shadowRoot);
    if (!isShadowDOMUsed) {
        return originalEvent.target
    }
    const path = originalEvent.path ?? (null === (_originalEvent$compos = originalEvent.composedPath) || void 0 === _originalEvent$compos ? void 0 : _originalEvent$compos.call(originalEvent));
    const target = (null === path || void 0 === path ? void 0 : path[0]) ?? event.target;
    return target
};
exports.getEventTarget = getEventTarget;
