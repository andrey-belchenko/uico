/**
 * DevExtreme (renovation/ui/scroll_view/utils/normalize_offset_left.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.normalizeOffsetLeft = normalizeOffsetLeft;

function normalizeOffsetLeft(scrollLeft, maxLeftOffset, rtlEnabled) {
    if (rtlEnabled) {
        return maxLeftOffset + scrollLeft
    }
    return scrollLeft
}
