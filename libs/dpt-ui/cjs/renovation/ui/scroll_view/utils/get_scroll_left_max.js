/**
 * DevExtreme (cjs/renovation/ui/scroll_view/utils/get_scroll_left_max.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getScrollLeftMax = getScrollLeftMax;

function getScrollLeftMax(element) {
    return element.scrollWidth - element.clientWidth
}
