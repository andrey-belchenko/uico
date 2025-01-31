/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_relative_offset.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export function getRelativeOffset(targetElementClass, sourceElement) {
    const offset = {
        left: 0,
        top: 0
    };
    let element = sourceElement;
    while (null !== (_element = element) && void 0 !== _element && _element.offsetParent && !element.classList.contains(targetElementClass)) {
        var _element;
        const parentElement = element.offsetParent;
        const elementRect = element.getBoundingClientRect();
        const parentElementRect = parentElement.getBoundingClientRect();
        offset.left += elementRect.left - parentElementRect.left;
        offset.top += elementRect.top - parentElementRect.top;
        element = element.offsetParent
    }
    return offset
}
