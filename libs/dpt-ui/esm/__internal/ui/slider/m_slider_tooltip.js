/**
 * DevExtreme (esm/__internal/ui/slider/m_slider_tooltip.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import numberLocalization from "../../../localization/number";
import Tooltip from "../../../ui/tooltip";
import {
    SliderTooltipPositionController
} from "./m_slider_tooltip_position_controller";
const SLIDER_TOOLTIP_VISIBILITY_CLASS = "dx-slider-tooltip-visible-on-hover";
const SliderTooltip = Tooltip.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
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
        const formattedText = numberLocalization.format(value ?? 0, format);
        this.$content().text(formattedText);
        this._renderPosition()
    },
    _toggleShowModeClass() {
        const isHoverMode = "onHover" === this.option("showMode");
        const $sliderHandle = this.option("target");
        $sliderHandle.toggleClass(SLIDER_TOOLTIP_VISIBILITY_CLASS, isHoverMode)
    },
    _initPositionController() {
        this._positionController = new SliderTooltipPositionController(this._getPositionControllerConfig())
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
export default SliderTooltip;
