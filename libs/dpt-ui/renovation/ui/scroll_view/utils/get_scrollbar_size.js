/**
 * DevExtreme (renovation/ui/scroll_view/utils/get_scrollbar_size.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getScrollbarSize = getScrollbarSize;

function getScrollbarSize(element, direction) {
    if ("vertical" === direction) {
        return element.offsetWidth - element.clientWidth
    }
    return element.offsetHeight - element.clientHeight
}
