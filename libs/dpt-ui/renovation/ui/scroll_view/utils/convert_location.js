/**
 * DevExtreme (renovation/ui/scroll_view/utils/convert_location.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.convertToLocation = convertToLocation;
var _type = require("../../../../core/utils/type");
var _common = require("../../../../core/utils/common");
var _scroll_direction = require("./scroll_direction");

function convertToLocation(location, direction) {
    if ((0, _type.isPlainObject)(location)) {
        const left = (0, _common.ensureDefined)(location.left, location.x);
        const top = (0, _common.ensureDefined)(location.top, location.y);
        return {
            left: (0, _type.isDefined)(left) ? left : void 0,
            top: (0, _type.isDefined)(top) ? top : void 0
        }
    }
    const {
        isHorizontal: isHorizontal,
        isVertical: isVertical
    } = new _scroll_direction.ScrollDirection(direction);
    return {
        left: isHorizontal && (0, _type.isDefined)(location) ? location : void 0,
        top: isVertical && (0, _type.isDefined)(location) ? location : void 0
    }
}
