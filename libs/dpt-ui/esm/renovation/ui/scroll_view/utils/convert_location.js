/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/convert_location.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined,
    isPlainObject
} from "../../../../core/utils/type";
import {
    ensureDefined
} from "../../../../core/utils/common";
import {
    ScrollDirection
} from "./scroll_direction";
export function convertToLocation(location, direction) {
    if (isPlainObject(location)) {
        const left = ensureDefined(location.left, location.x);
        const top = ensureDefined(location.top, location.y);
        return {
            left: isDefined(left) ? left : void 0,
            top: isDefined(top) ? top : void 0
        }
    }
    const {
        isHorizontal: isHorizontal,
        isVertical: isVertical
    } = new ScrollDirection(direction);
    return {
        left: isHorizontal && isDefined(location) ? location : void 0,
        top: isVertical && isDefined(location) ? location : void 0
    }
}
