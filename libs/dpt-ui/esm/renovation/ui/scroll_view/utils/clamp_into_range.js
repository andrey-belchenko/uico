/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/clamp_into_range.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export function clampIntoRange(value, max, min) {
    return Math.max(Math.min(value, max), min)
}
