/**
 * DevExtreme (esm/renovation/ui/resizable/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isWindow
} from "../../../core/utils/type";
import {
    extend
} from "../../../core/utils/extend";
import {
    getOuterWidth,
    getInnerWidth,
    getOuterHeight,
    getInnerHeight,
    getOffset
} from "../../../core/utils/size";
export const borderWidthStyles = {
    left: "borderLeftWidth",
    top: "borderTopWidth",
    right: "borderRightWidth",
    bottom: "borderBottomWidth"
};

function getBorderWidth(el, direction) {
    if (!isWindow(el)) {
        const borderWidth = el.style[borderWidthStyles[direction]];
        return parseInt(borderWidth, 10) || 0
    }
    return 0
}
const correctGeometry = function(area, mainEl) {
    let el = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
    const {
        height: height,
        offset: offset,
        width: width
    } = area;
    const {
        left: left,
        top: top
    } = offset;
    const areaBorderLeft = el ? getBorderWidth(el, "left") : 0;
    const areaBorderTop = el ? getBorderWidth(el, "top") : 0;
    return {
        width: width - getOuterWidth(mainEl) - getInnerWidth(mainEl),
        height: height - getOuterHeight(mainEl) - getInnerHeight(mainEl),
        offset: {
            left: left + areaBorderLeft + getBorderWidth(mainEl, "left"),
            top: top + areaBorderTop + getBorderWidth(mainEl, "top")
        }
    }
};
export const getAreaFromElement = (el, mainEl) => correctGeometry({
    width: getInnerWidth(el),
    height: getInnerHeight(el),
    offset: extend({
        top: 0,
        left: 0
    }, isWindow(el) ? {} : getOffset(el))
}, mainEl, el);
export const getAreaFromObject = (_ref, mainEl) => {
    let {
        bottom: bottom,
        left: left,
        right: right,
        top: top
    } = _ref;
    return correctGeometry({
        width: right - left,
        height: bottom - top,
        offset: {
            left: left,
            top: top
        }
    }, mainEl)
};
export const getMovingSides = el => {
    const {
        className: className
    } = el;
    const hasCornerTopLeftClass = className.includes("dx-resizable-handle-corner-top-left");
    const hasCornerTopRightClass = className.includes("dx-resizable-handle-corner-top-right");
    const hasCornerBottomLeftClass = className.includes("dx-resizable-handle-corner-bottom-left");
    const hasCornerBottomRightClass = className.includes("dx-resizable-handle-corner-bottom-right");
    return {
        top: className.includes("dx-resizable-handle-top") || hasCornerTopLeftClass || hasCornerTopRightClass,
        left: className.includes("dx-resizable-handle-left") || hasCornerTopLeftClass || hasCornerBottomLeftClass,
        bottom: className.includes("dx-resizable-handle-bottom") || hasCornerBottomLeftClass || hasCornerBottomRightClass,
        right: className.includes("dx-resizable-handle-right") || hasCornerTopRightClass || hasCornerBottomRightClass
    }
};
export function getDragOffsets(area, handleEl, areaProp) {
    const hWidth = getOuterWidth(handleEl);
    const hHeight = getOuterHeight(handleEl);
    const hOffset = getOffset(handleEl);
    const areaOffset = area.offset;
    const isAreaWindow = isWindow(areaProp);
    const scrollOffset_scrollX = isAreaWindow ? areaProp.pageXOffset : 0,
        scrollOffset_scrollY = isAreaWindow ? areaProp.pageYOffset : 0;
    return {
        maxLeftOffset: hOffset.left - areaOffset.left - scrollOffset_scrollX,
        maxRightOffset: areaOffset.left + area.width - hOffset.left - hWidth + scrollOffset_scrollX,
        maxTopOffset: hOffset.top - areaOffset.top - scrollOffset_scrollY,
        maxBottomOffset: areaOffset.top + area.height - hOffset.top - hHeight + scrollOffset_scrollY
    }
}
export const filterOffsets = (offset, handleEl) => {
    const sides = getMovingSides(handleEl);
    const offsetX = !sides.left && !sides.right ? 0 : offset.x;
    const offsetY = !sides.top && !sides.bottom ? 0 : offset.y;
    return {
        x: offsetX,
        y: offsetY
    }
};
