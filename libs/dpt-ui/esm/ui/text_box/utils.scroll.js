/**
 * DevExtreme (esm/ui/text_box/utils.scroll.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import {
    isDxMouseWheelEvent
} from "../../events/utils/index";
const allowScroll = function(container, delta, shiftKey) {
    const $container = $(container);
    const scrollTopPos = shiftKey ? $container.scrollLeft() : $container.scrollTop();
    const prop = shiftKey ? "Width" : "Height";
    const scrollSize = $container.prop(`scroll${prop}`);
    const clientSize = $container.prop(`client${prop}`);
    const scrollBottomPos = scrollSize - clientSize - scrollTopPos | 0;
    if (0 === scrollTopPos && 0 === scrollBottomPos) {
        return false
    }
    const isScrollFromTop = 0 === scrollTopPos && delta >= 0;
    const isScrollFromBottom = 0 === scrollBottomPos && delta <= 0;
    const isScrollFromMiddle = scrollTopPos > 0 && scrollBottomPos > 0;
    if (isScrollFromTop || isScrollFromBottom || isScrollFromMiddle) {
        return true
    }
};
const prepareScrollData = function(container, validateTarget) {
    const $container = $(container);
    return {
        validate: function(e) {
            if (isDxMouseWheelEvent(e) && (eventTarget = e.target, validateTarget ? $(eventTarget).is(container) : true)) {
                if (allowScroll($container, -e.delta, e.shiftKey)) {
                    e._needSkipEvent = true;
                    return true
                }
                return false
            }
            var eventTarget
        }
    }
};
export {
    allowScroll,
    prepareScrollData
};
