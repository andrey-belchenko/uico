/**
 * DevExtreme (cjs/__internal/ui/slider/m_slider_tooltip.js)
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
exports.default = void 0;
var _extend = require("../../../core/utils/extend");
var _number = _interopRequireDefault(require("../../../localization/number"));
var _tooltip = _interopRequireDefault(require("../../../ui/tooltip"));
var _m_slider_tooltip_position_controller = require("./m_slider_tooltip_position_controller");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const SLIDER_TOOLTIP_VISIBILITY_CLASS = "dx-slider-tooltip-visible-on-hover";
const SliderTooltip = _tooltip.default.inherit({
    _getDefaultOptions() {
        return (0, _extend.extend)(this.callBase(), {
            visible: false,
            position: "top",
            hideOnOutsideClick: false,
            hideTopOverlayHandler: null,
            hideOnParentScroll: false,
            animation: null,
            arrowPosition: null,
            templatesRenderAsynchronously: false,
            _fixWrapperPosition: false,
            useResizeObserver: false,
            showMode: "onHover",
            format: value => value,
            value: 0
        })
    },
    _initMarkup() {
        this.callBase();
        this._attachToMarkup(this.option("visible"));
        this._toggleShowModeClass()
    },
    _renderContent() {
        this.callBase();
        this._renderContentText()
    },
    _toggleAriaAttributes() {},
    _renderContentText() {
        const {
            value: value,
            format: format
        } = this.option();
        const formattedText = _number.default.format(value ?? 0, format);
        this.$content().text(formattedText);
        this._renderPosition()
    },
    _toggleShowModeClass() {
        const isHoverMode = "onHover" === this.option("showMode");
        const $sliderHandle = this.option("target");
        $sliderHandle.toggleClass(SLIDER_TOOLTIP_VISIBILITY_CLASS, isHoverMode)
    },
    _initPositionController() {
        this._positionController = new _m_slider_tooltip_position_controller.SliderTooltipPositionController(this._getPositionControllerConfig())
    },
    _attachToMarkup(enabled) {
        const $sliderHandle = this.option("target");
        enabled ? this.$element().appendTo($sliderHandle) : this.$element().detach()
    },
    _optionChanged(args) {
        const {
            name: name,
            value: value
        } = args;
        switch (name) {
            case "visible":
                this._attachToMarkup(value);
                this.callBase(args);
                break;
            case "showMode":
                this._toggleShowModeClass();
                break;
            case "format":
            case "value":
                this._renderContentText();
                break;
            default:
                this.callBase(args)
        }
    },
    updatePosition() {
        this._renderPosition()
    }
});
var _default = exports.default = SliderTooltip;
