/**
 * DevExtreme (cjs/renovation/ui/scroll_view/utils/get_scroll_top_max.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.getScrollTopMax = getScrollTopMax;

function getScrollTopMax(element) {
    return element.scrollHeight - element.clientHeight
}
