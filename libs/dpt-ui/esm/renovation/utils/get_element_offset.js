/**
 * DevExtreme (esm/renovation/utils/get_element_offset.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWindow,
    hasWindow
} from "../../core/utils/window";
const window = getWindow();
const DEFAULT_OFFSET = {
    top: 0,
    left: 0
};
export function getElementOffset(el) {
    if (el && hasWindow()) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        }
    }
    return DEFAULT_OFFSET
}
