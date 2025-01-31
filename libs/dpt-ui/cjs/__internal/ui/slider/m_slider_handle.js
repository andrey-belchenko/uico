/**
 * DevExtreme (cjs/__internal/ui/slider/m_slider_handle.js)
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
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
var _m_slider_tooltip = _interopRequireDefault(require("./m_slider_tooltip"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const SLIDER_HANDLE_CLASS = "dx-slider-handle";
const SliderHandle = _ui.default.inherit({
    _getDefaultOptions() {
        return (0, _extend.extend)(this.callBase(), {
            hoverStateEnabled: false,
            value: 0,
            tooltip: {
                enabled: false,
                format: value => value,
                position: "top",
                showMode: "onHover"
            }
        })
    },
    _initMarkup() {
        this.callBase();
        this.$element().addClass("dx-slider-handle");
        this.setAria({
            role: "slider",
            valuenow: this.option("value"),
            label: "Slider"
        })
    },
    _render() {
        this.callBase();
        this._renderTooltip()
    },
    _renderTooltip() {
        const {
            tooltip: tooltip,
            value: value
        } = this.option();
        const {
            position: position,
            format: format,
            enabled: enabled,
            showMode: showMode
        } = tooltip;
        const $sliderTooltip = (0, _renderer.default)("<div>");
        this._sliderTooltip = this._createComponent($sliderTooltip, _m_slider_tooltip.default, {
            target: this.$element(),
            container: $sliderTooltip,
            position: position,
            visible: enabled,
            showMode: showMode,
            format: format,
            value: value
        })
    },
    _clean() {
        this.callBase();
        this._sliderTooltip = null
    },
    _updateTooltipOptions(args) {
        var _this$_sliderTooltip;
        const tooltipOptions = _ui.default.getOptionsFromContainer(args);
        this._setWidgetOption("_sliderTooltip", [tooltipOptions]);
        null === (_this$_sliderTooltip = this._sliderTooltip) || void 0 === _this$_sliderTooltip || _this$_sliderTooltip.option("visible", tooltipOptions.enabled)
    },
    _optionChanged(args) {
        const {
            name: name,
            value: value
        } = args;
        switch (name) {
            case "value":
                var _this$_sliderTooltip2;
                null === (_this$_sliderTooltip2 = this._sliderTooltip) || void 0 === _this$_sliderTooltip2 || _this$_sliderTooltip2.option("value", value);
                this.setAria("valuenow", value);
                break;
            case "tooltip":
                this._updateTooltipOptions(args);
                break;
            default:
                this.callBase(args)
        }
    },
    updateTooltipPosition() {
        var _this$_sliderTooltip3;
        null === (_this$_sliderTooltip3 = this._sliderTooltip) || void 0 === _this$_sliderTooltip3 || _this$_sliderTooltip3.updatePosition()
    },
    repaint() {
        var _this$_sliderTooltip4;
        null === (_this$_sliderTooltip4 = this._sliderTooltip) || void 0 === _this$_sliderTooltip4 || _this$_sliderTooltip4.repaint()
    }
});
var _default = exports.default = SliderHandle;
