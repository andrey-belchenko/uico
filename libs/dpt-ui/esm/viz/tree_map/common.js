/**
 * DevExtreme (esm/viz/tree_map/common.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    patchFontOptions as _patchFontOptions
} from "../core/utils";
export function buildRectAppearance(option) {
    const border = option.border || {};
    return {
        fill: option.color,
        opacity: option.opacity,
        stroke: border.color,
        "stroke-width": border.width,
        "stroke-opacity": border.opacity,
        hatching: option.hatching
    }
}
export function buildTextAppearance(options, filter) {
    return {
        attr: {
            filter: filter
        },
        css: _patchFontOptions(options.font)
    }
}
