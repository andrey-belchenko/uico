/**
 * DevExtreme (cjs/ui/popover/popover_position_controller.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.PopoverPositionController = exports.POPOVER_POSITION_ALIASES = void 0;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _position = _interopRequireDefault(require("../../animation/position"));
var _common = require("../../core/utils/common");
var _utils = require("../../renovation/ui/resizable/utils");
var _size = require("../../core/utils/size");
var _overlay_position_controller = require("../overlay/overlay_position_controller");
const _excluded = ["shading", "target", "$arrow"];

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}
const WEIGHT_OF_SIDES = {
    left: -1,
    top: -1,
    center: 0,
    right: 1,
    bottom: 1
};
const POPOVER_POSITION_ALIASES = exports.POPOVER_POSITION_ALIASES = {
    top: {
        my: "bottom center",
        at: "top center",
        collision: "fit flip"
    },
    bottom: {
        my: "top center",
        at: "bottom center",
        collision: "fit flip"
    },
    right: {
        my: "left center",
        at: "right center",
        collision: "flip fit"
    },
    left: {
        my: "right center",
        at: "left center",
        collision: "flip fit"
    }
};
const POPOVER_DEFAULT_BOUNDARY_OFFSET = {
    h: 10,
    v: 10
};
class PopoverPositionController extends _overlay_position_controller.OverlayPositionController {
    constructor(_ref) {
        let {
            shading: shading,
            target: target,
            $arrow: $arrow
        } = _ref, args = _objectWithoutPropertiesLoose(_ref, _excluded);
        super(args);
        this._props = _extends({}, this._props, {
            shading: shading,
            target: target
        });
        this._$arrow = $arrow;
        this._positionSide = void 0;
        this.updatePosition(this._props.position)
    }
    positionWrapper() {
        if (this._props.shading) {
            this._$wrapper.css({
                top: 0,
                left: 0
            })
        }
    }
    updateTarget(target) {
        this._props.target = target;
        this.updatePosition(this._props.position)
    }
    _renderBoundaryOffset() {}
    _getContainerPosition() {
        const offset = (0, _common.pairToObject)(this._position.offset || "");
        let {
            h: hOffset,
            v: vOffset
        } = offset;
        const isVerticalSide = this._isVerticalSide();
        const isHorizontalSide = this._isHorizontalSide();
        if (isVerticalSide || isHorizontalSide) {
            const isPopoverInside = this._isPopoverInside();
            const sign = (isPopoverInside ? -1 : 1) * WEIGHT_OF_SIDES[this._positionSide];
            const arrowSize = isVerticalSide ? (0, _size.getHeight)(this._$arrow) : (0, _size.getWidth)(this._$arrow);
            const arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);
            const arrowOffset = sign * (arrowSize - arrowSizeCorrection);
            isVerticalSide ? vOffset += arrowOffset : hOffset += arrowOffset
        }
        return (0, _extend.extend)({}, this._position, {
            offset: hOffset + " " + vOffset
        })
    }
    _getContentBorderWidth(side) {
        const borderWidth = this._$content.css(_utils.borderWidthStyles[side]);
        return parseInt(borderWidth) || 0
    }
    _isPopoverInside() {
        const my = _position.default.setup.normalizeAlign(this._position.my);
        const at = _position.default.setup.normalizeAlign(this._position.at);
        return my.h === at.h && my.v === at.v
    }
    _isVerticalSide() {
        let side = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._positionSide;
        return "top" === side || "bottom" === side
    }
    _isHorizontalSide() {
        let side = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._positionSide;
        return "left" === side || "right" === side
    }
    _getDisplaySide(position) {
        const my = _position.default.setup.normalizeAlign(position.my);
        const at = _position.default.setup.normalizeAlign(position.at);
        const weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
        const horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
        const verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
        return horizontalWeight > verticalWeight ? at.h : at.v
    }
    _normalizePosition(positionProp) {
        const defaultPositionConfig = {
            of: this._props.target,
            boundaryOffset: POPOVER_DEFAULT_BOUNDARY_OFFSET
        };
        let resultPosition;
        if ((0, _type.isDefined)(positionProp)) {
            resultPosition = (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp))
        } else {
            resultPosition = defaultPositionConfig
        }
        this._positionSide = this._getDisplaySide(resultPosition);
        return resultPosition
    }
    _positionToObject(positionProp) {
        if ((0, _type.isString)(positionProp)) {
            return (0, _extend.extend)({}, POPOVER_POSITION_ALIASES[positionProp])
        }
        return positionProp
    }
}
exports.PopoverPositionController = PopoverPositionController;
