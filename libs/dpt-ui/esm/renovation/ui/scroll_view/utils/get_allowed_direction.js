/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_allowed_direction.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    DIRECTION_BOTH,
    DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL
} from "../common/consts";
import {
    ScrollDirection
} from "./scroll_direction";
export function allowedDirection(direction, scrollTopMax, scrollLeftMax, bounceEnabled) {
    const {
        isBoth: isBoth,
        isHorizontal: isHorizontal,
        isVertical: isVertical
    } = new ScrollDirection(direction);
    const vDirectionAllowed = isVertical && (scrollTopMax > 0 || bounceEnabled);
    const hDirectionAllowed = isHorizontal && (scrollLeftMax > 0 || bounceEnabled);
    if (isBoth && vDirectionAllowed && hDirectionAllowed) {
        return DIRECTION_BOTH
    }
    if (isHorizontal && hDirectionAllowed) {
        return DIRECTION_HORIZONTAL
    }
    if (isVertical && vDirectionAllowed) {
        return DIRECTION_VERTICAL
    }
    return
}
