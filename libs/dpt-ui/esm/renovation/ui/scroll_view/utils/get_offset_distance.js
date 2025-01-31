/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_offset_distance.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    ensureDefined
} from "../../../../core/utils/common";
export function getOffsetDistance(targetLocation, scrollOffset) {
    return {
        top: ensureDefined(targetLocation.top, scrollOffset.top) - scrollOffset.top,
        left: ensureDefined(targetLocation.left, scrollOffset.left) - scrollOffset.left
    }
}
