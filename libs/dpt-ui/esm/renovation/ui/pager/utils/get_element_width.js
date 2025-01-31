/**
 * DevExtreme (esm/renovation/ui/pager/utils/get_element_width.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import getElementComputedStyle from "../../../utils/get_computed_style";
import {
    toNumber
} from "../../../utils/type_conversion";
export function getElementStyle(name, element) {
    const computedStyle = getElementComputedStyle(element) ?? {};
    return toNumber(computedStyle[name])
}
export function getElementContentWidth(element) {
    const padding = getElementStyle("paddingLeft", element) + getElementStyle("paddingRight", element);
    const width = getElementStyle("width", element);
    return width - padding
}
export function getElementWidth(element) {
    const margin = getElementStyle("marginLeft", element) + getElementStyle("marginRight", element);
    const width = getElementStyle("width", element);
    return margin + width
}
export function getElementMinWidth(element) {
    return getElementStyle("minWidth", element)
}
