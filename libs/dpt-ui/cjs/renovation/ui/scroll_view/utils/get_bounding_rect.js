/**
 * DevExtreme (cjs/renovation/ui/scroll_view/utils/get_bounding_rect.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getBoundingRect = getBoundingRect;

function getBoundingRect(el) {
    return null !== el && void 0 !== el && el.getBoundingClientRect ? el.getBoundingClientRect() : {
        width: 0,
        height: 0,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    }
}
