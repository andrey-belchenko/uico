/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_element_location_internal.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    titleize
} from "../../../../core/utils/inflector";
import {
    getRelativeOffset
} from "./get_relative_offset";
import {
    DIRECTION_VERTICAL,
    SCROLLABLE_CONTENT_CLASS
} from "../common/consts";
export function getElementLocationInternal(targetElement, direction, containerElement, scrollOffset, offset) {
    const additionalOffset = _extends({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }, offset);
    const isVertical = direction === DIRECTION_VERTICAL;
    const prop = isVertical ? "top" : "left";
    const inverseProp = isVertical ? "bottom" : "right";
    const dimension = isVertical ? "height" : "width";
    const containerOffsetSize = containerElement[`offset${titleize(dimension)}`];
    const containerClientSize = containerElement[`client${titleize(dimension)}`];
    const containerSize = containerElement.getBoundingClientRect()[dimension];
    const elementSize = targetElement.getBoundingClientRect()[dimension];
    let scale = 1;
    if (Math.abs(containerSize - containerOffsetSize) > 1) {
        scale = containerSize / containerOffsetSize
    }
    const relativeElementOffset = getRelativeOffset(SCROLLABLE_CONTENT_CLASS, targetElement)[prop] / scale;
    const containerScrollOffset = scrollOffset[prop];
    const relativeStartOffset = containerScrollOffset - relativeElementOffset + additionalOffset[prop];
    const relativeEndOffset = containerScrollOffset - relativeElementOffset - elementSize / scale + containerClientSize - additionalOffset[inverseProp];
    if (relativeStartOffset <= 0 && relativeEndOffset >= 0) {
        return containerScrollOffset
    }
    return containerScrollOffset - (Math.abs(relativeStartOffset) > Math.abs(relativeEndOffset) ? relativeEndOffset : relativeStartOffset)
}
