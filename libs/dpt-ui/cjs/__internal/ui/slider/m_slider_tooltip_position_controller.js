/**
 * DevExtreme (cjs/__internal/ui/slider/m_slider_tooltip_position_controller.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SliderTooltipPositionController = void 0;
var _position = _interopRequireDefault(require("../../../animation/position"));
var _translator = require("../../../animation/translator");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _popover_position_controller = require("../../../ui/popover/popover_position_controller");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const SLIDER_TOOLTIP_POSITION_ALIASES = {
    top: {
        my: "bottom center",
        at: "top center",
        collision: "fit none"
    },
    bottom: {
        my: "top center",
        at: "bottom center",
        collision: "fit none"
    }
};
const SLIDER_TOOLTIP_DEFAULT_BOUNDARY_OFFSET = {
    h: 2,
    v: 1
};
const SLIDER_CLASS = "dx-slider";
class SliderTooltipPositionController extends _popover_position_controller.PopoverPositionController {
    _normalizePosition(positionProp) {
        const $sliderHandle = this._props.target;
        const $slider = null === $sliderHandle || void 0 === $sliderHandle ? void 0 : $sliderHandle.closest(".dx-slider");
        const defaultPositionConfig = {
            of: $sliderHandle,
            boundaryOffset: SLIDER_TOOLTIP_DEFAULT_BOUNDARY_OFFSET,
            boundary: null === $slider || void 0 === $slider ? void 0 : $slider.get(0)
        };
        const resultPosition = (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
        this._positionSide = this._getDisplaySide(resultPosition);
        return resultPosition
    }
    _renderContentInitialPosition() {
        super._renderContentInitialPosition();
        this._fitIntoSlider()
    }
    _fitIntoSlider() {
        const {
            collisionSide: collisionSide,
            oversize: oversize
        } = _position.default.calculate(this._$content, this._position).h;
        const {
            left: left
        } = this._visualPosition;
        const isLeftSide = "left" === collisionSide;
        const offset = (isLeftSide ? 1 : -1) * oversize;
        (0, _translator.move)(this._$content, {
            left: left + offset
        });
        this._updateVisualPositionValue()
    }
    _positionToObject(positionProp) {
        if ((0, _type.isString)(positionProp)) {
            return (0, _extend.extend)({}, SLIDER_TOOLTIP_POSITION_ALIASES[positionProp])
        }
        return positionProp
    }
}
exports.SliderTooltipPositionController = SliderTooltipPositionController;
