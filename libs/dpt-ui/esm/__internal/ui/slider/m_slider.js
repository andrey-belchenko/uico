/**
 * DevExtreme (esm/__internal/ui/slider/m_slider.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import devices from "../../../core/devices";
import $ from "../../../core/renderer";
import {
    applyServerDecimalSeparator
} from "../../../core/utils/common";
import {
    Deferred
} from "../../../core/utils/deferred";
import {
    extend
} from "../../../core/utils/extend";
import {
    getExponentLength,
    getRemainderByDivision,
    roundFloatPart
} from "../../../core/utils/math";
import {
    getWidth,
    setWidth
} from "../../../core/utils/size";
import {
    name as clickName
} from "../../../events/click";
import {
    lock
} from "../../../events/core/emitter.feedback";
import eventsEngine from "../../../events/core/events_engine";
import Swipeable from "../../../events/gesture/swipeable";
import pointerEvents from "../../../events/pointer";
import {
    addNamespace,
    eventData,
    isMouseEvent,
    isTouchEvent
} from "../../../events/utils/index";
import numberLocalization from "../../../localization/number";
import {
    current as currentTheme,
    isMaterial
} from "../../../ui/themes";
import {
    render
} from "../../../ui/widget/utils.ink_ripple";
import TrackBar from "../m_track_bar";
import SliderHandle from "./m_slider_handle";
const SLIDER_CLASS = "dx-slider";
const SLIDER_WRAPPER_CLASS = "dx-slider-wrapper";
const SLIDER_HANDLE_SELECTOR = ".dx-slider-handle";
const SLIDER_BAR_CLASS = "dx-slider-bar";
const SLIDER_RANGE_CLASS = "dx-slider-range";
const SLIDER_RANGE_VISIBLE_CLASS = "dx-slider-range-visible";
const SLIDER_LABEL_CLASS = "dx-slider-label";
const SLIDER_LABEL_POSITION_CLASS_PREFIX = "dx-slider-label-position-";
const SLIDER_TOOLTIP_POSITION_CLASS_PREFIX = "dx-slider-tooltip-position-";
const INVALID_MESSAGE_VISIBLE_CLASS = "dx-invalid-message-visible";
const SLIDER_VALIDATION_NAMESPACE = "Validation";
const Slider = TrackBar.inherit({
    _activeStateUnit: ".dx-slider-handle",
    _supportedKeys() {
        const isRTL = this.option("rtlEnabled");
        const roundedValue = (offset, isLeftDirection) => {
            offset = this._valueStep(offset);
            const step = this.option("step");
            const value = this.option("value");
            const currentPosition = value - this.option("min");
            const remainder = getRemainderByDivision(currentPosition, step, this._getValueExponentLength());
            let result = isLeftDirection ? value - offset + (remainder ? step - remainder : 0) : value + offset - remainder;
            const min = this.option("min");
            const max = this.option("max");
            if (result < min) {
                result = min
            } else if (result > max) {
                result = max
            }
            return this._roundToExponentLength(result)
        };
        const moveHandleRight = offset => {
            this.option("value", roundedValue(offset, isRTL))
        };
        const moveHandleLeft = offset => {
            this.option("value", roundedValue(offset, !isRTL))
        };
        return extend(this.callBase(), {
            leftArrow(e) {
                this._processKeyboardEvent(e);
                moveHandleLeft(this.option("step"))
            },
            rightArrow(e) {
                this._processKeyboardEvent(e);
                moveHandleRight(this.option("step"))
            },
            pageUp(e) {
                this._processKeyboardEvent(e);
                moveHandleRight(this.option("step") * this.option("keyStep"))
            },
            pageDown(e) {
                this._processKeyboardEvent(e);
                moveHandleLeft(this.option("step") * this.option("keyStep"))
            },
            home(e) {
                this._processKeyboardEvent(e);
                const min = this.option("min");
                this.option("value", min)
            },
            end(e) {
                this._processKeyboardEvent(e);
                const max = this.option("max");
                this.option("value", max)
            }
        })
    },
    _processKeyboardEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        this._saveValueChangeEvent(e)
    },
    _getDefaultOptions() {
        return extend(this.callBase(), {
            value: 50,
            hoverStateEnabled: true,
            activeStateEnabled: true,
            step: 1,
            showRange: true,
            tooltip: {
                enabled: false,
                format: value => value,
                position: "top",
                showMode: "onHover"
            },
            label: {
                visible: false,
                position: "bottom",
                format: value => value
            },
            keyStep: 1,
            useInkRipple: false,
            validationMessageOffset: isMaterial() ? {
                h: 18,
                v: 0
            } : {
                h: 7,
                v: 4
            },
            focusStateEnabled: true,
            valueChangeMode: "onHandleMove"
        })
    },
    _toggleValidationMessage(visible) {
        if (!this.option("isValid")) {
            this.$element().toggleClass("dx-invalid-message-visible", visible)
        }
    },
    _defaultOptionsRules() {
        return this.callBase().concat([{
            device: () => "desktop" === devices.real().deviceType && !devices.isSimulator(),
            options: {
                focusStateEnabled: true
            }
        }, {
            device() {
                const themeName = currentTheme();
                return isMaterial(themeName)
            },
            options: {
                useInkRipple: true
            }
        }])
    },
    _initMarkup() {
        this.$element().addClass("dx-slider");
        this._renderSubmitElement();
        this.option("useInkRipple") && this._renderInkRipple();
        this.callBase();
        this._renderLabels();
        this._renderStartHandler();
        this._renderAriaMinAndMax()
    },
    _attachFocusEvents() {
        this.callBase();
        const namespace = this.NAME + "Validation";
        const focusInEvent = addNamespace("focusin", namespace);
        const focusOutEvent = addNamespace("focusout", namespace);
        const $focusTarget = this._focusTarget();
        eventsEngine.on($focusTarget, focusInEvent, this._toggleValidationMessage.bind(this, true));
        eventsEngine.on($focusTarget, focusOutEvent, this._toggleValidationMessage.bind(this, false))
    },
    _detachFocusEvents() {
        this.callBase();
        const $focusTarget = this._focusTarget();
        this._toggleValidationMessage(false);
        eventsEngine.off($focusTarget, this.NAME + "Validation")
    },
    _render() {
        this.callBase();
        this._repaintHandle()
    },
    _renderSubmitElement() {
        this._$submitElement = $("<input>").attr("type", "hidden").appendTo(this.$element())
    },
    _getSubmitElement() {
        return this._$submitElement
    },
    _renderInkRipple() {
        this._inkRipple = render({
            waveSizeCoefficient: .7,
            isCentered: true,
            wavesNumber: 2,
            useHoldAnimation: false
        })
    },
    _renderInkWave(element, dxEvent, doRender, waveIndex) {
        if (!this._inkRipple) {
            return
        }
        const config = {
            element: element,
            event: dxEvent,
            wave: waveIndex
        };
        if (doRender) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    },
    _visibilityChanged() {
        this.repaint()
    },
    _renderWrapper() {
        this.callBase();
        this._$wrapper.addClass("dx-slider-wrapper");
        this._createComponent(this._$wrapper, Swipeable, {
            rtlEnabled: false,
            elastic: false,
            immediate: true,
            immediateTimeout: 0,
            onStart: this._swipeStartHandler.bind(this),
            onUpdated: this._swipeUpdateHandler.bind(this),
            onEnd: this._swipeEndHandler.bind(this),
            itemSizeFunc: this._itemWidthFunc.bind(this)
        })
    },
    _renderContainer() {
        this.callBase();
        this._$bar.addClass("dx-slider-bar")
    },
    _renderRange() {
        this.callBase();
        this._$range.addClass("dx-slider-range");
        this._renderHandle();
        this._renderRangeVisibility()
    },
    _renderRangeVisibility() {
        this._$range.toggleClass("dx-slider-range-visible", Boolean(this.option("showRange")))
    },
    _renderHandle() {
        this._$handle = this._renderHandleImpl(this.option("value"), this._$handle)
    },
    _renderHandleImpl(value, $element) {
        const $handle = $element || $("<div>").appendTo(this._$range);
        const tooltip = this.option("tooltip");
        this.$element().toggleClass("dx-slider-tooltip-position-bottom", tooltip.enabled && "bottom" === tooltip.position).toggleClass("dx-slider-tooltip-position-top", tooltip.enabled && "top" === tooltip.position);
        this._createComponent($handle, SliderHandle, {
            value: value,
            tooltip: tooltip
        });
        return $handle
    },
    _renderAriaMinAndMax() {
        this.setAria({
            valuemin: this.option("min"),
            valuemax: this.option("max")
        }, this._$handle)
    },
    _toggleActiveState($element, value) {
        this.callBase($element, value);
        this._renderInkWave($element, null, !!value, 1)
    },
    _toggleFocusClass(isFocused, $element) {
        this.callBase(isFocused, $element);
        if (this._disposed) {
            return
        }
        const $focusTarget = $($element || this._focusTarget());
        this._renderInkWave($focusTarget, null, isFocused, 0)
    },
    _renderLabels() {
        this.$element().removeClass("dx-slider-label-position-bottom").removeClass("dx-slider-label-position-top");
        if (this.option("label.visible")) {
            const min = this.option("min");
            const max = this.option("max");
            const position = this.option("label.position");
            const labelFormat = this.option("label.format");
            if (!this._$minLabel) {
                this._$minLabel = $("<div>").addClass("dx-slider-label").appendTo(this._$wrapper)
            }
            this._$minLabel.text(numberLocalization.format(min, labelFormat));
            if (!this._$maxLabel) {
                this._$maxLabel = $("<div>").addClass("dx-slider-label").appendTo(this._$wrapper)
            }
            this._$maxLabel.text(numberLocalization.format(max, labelFormat));
            this.$element().addClass("dx-slider-label-position-" + position)
        } else {
            if (this._$minLabel) {
                this._$minLabel.remove();
                delete this._$minLabel
            }
            if (this._$maxLabel) {
                this._$maxLabel.remove();
                delete this._$maxLabel
            }
        }
    },
    _renderStartHandler() {
        const pointerDownEventName = addNamespace(pointerEvents.down, this.NAME);
        const clickEventName = addNamespace(clickName, this.NAME);
        const startAction = this._createAction(this._startHandler.bind(this));
        const $element = this.$element();
        eventsEngine.off($element, pointerDownEventName);
        eventsEngine.on($element, pointerDownEventName, (e => {
            if (isMouseEvent(e)) {
                startAction({
                    event: e
                })
            }
        }));
        eventsEngine.off($element, clickEventName);
        eventsEngine.on($element, clickEventName, (e => {
            const $handle = this._activeHandle();
            if ($handle) {
                eventsEngine.trigger($handle, "focusin");
                eventsEngine.trigger($handle, "focus")
            }
            startAction({
                event: e
            });
            if ("onHandleRelease" === this.option("valueChangeMode")) {
                this.option("value", this._getActualValue());
                this._actualValue = void 0
            }
        }))
    },
    _itemWidthFunc() {
        return this._itemWidthRatio
    },
    _swipeStartHandler(e) {
        const rtlEnabled = this.option("rtlEnabled");
        if (isTouchEvent(e.event)) {
            this._createAction(this._startHandler.bind(this))({
                event: e.event
            })
        }
        this._feedbackDeferred = Deferred();
        lock(this._feedbackDeferred);
        this._toggleActiveState(this._activeHandle(), this.option("activeStateEnabled"));
        this._startOffset = this._currentRatio;
        const startOffset = this._startOffset * this._swipePixelRatio();
        const endOffset = (1 - this._startOffset) * this._swipePixelRatio();
        e.event.maxLeftOffset = rtlEnabled ? endOffset : startOffset;
        e.event.maxRightOffset = rtlEnabled ? startOffset : endOffset;
        this._itemWidthRatio = getWidth(this.$element()) / this._swipePixelRatio();
        this._needPreventAnimation = true
    },
    _swipeEndHandler(e) {
        if (this._isSingleValuePossible()) {
            return
        }
        this._feedbackDeferred.resolve();
        this._toggleActiveState(this._activeHandle(), false);
        const offsetDirection = this.option("rtlEnabled") ? -1 : 1;
        const ratio = this._startOffset + offsetDirection * e.event.targetOffset / this._swipePixelRatio();
        delete this._needPreventAnimation;
        this._saveValueChangeEvent(e.event);
        this._changeValueOnSwipe(ratio);
        if ("onHandleRelease" === this.option("valueChangeMode")) {
            this.option("value", this._getActualValue())
        }
        this._actualValue = void 0;
        delete this._startOffset;
        this._renderValue()
    },
    _activeHandle() {
        return this._$handle
    },
    _swipeUpdateHandler(e) {
        if (this._isSingleValuePossible()) {
            return
        }
        this._saveValueChangeEvent(e.event);
        this._updateHandlePosition(e)
    },
    _updateHandlePosition(e) {
        const offsetDirection = this.option("rtlEnabled") ? -1 : 1;
        const newRatio = Math.min(this._startOffset + offsetDirection * e.event.offset / this._swipePixelRatio(), 1);
        setWidth(this._$range, 100 * newRatio + "%");
        SliderHandle.getInstance(this._activeHandle()).fitTooltipPosition;
        this._changeValueOnSwipe(newRatio)
    },
    _swipePixelRatio() {
        const min = this.option("min");
        const max = this.option("max");
        const step = this._valueStep(this.option("step"));
        return (max - min) / step
    },
    _valueStep(step) {
        if (!step || isNaN(step)) {
            step = 1
        }
        return step
    },
    _getValueExponentLength() {
        const {
            step: step,
            min: min
        } = this.option();
        return Math.max(getExponentLength(step), getExponentLength(min))
    },
    _roundToExponentLength(value) {
        const valueExponentLength = this._getValueExponentLength();
        return roundFloatPart(value, valueExponentLength)
    },
    _changeValueOnSwipe(ratio) {
        const min = this.option("min");
        const max = this.option("max");
        const step = this._valueStep(this.option("step"));
        const newChange = ratio * (max - min);
        let newValue = min + newChange;
        if (step < 0) {
            return
        }
        if (newValue === max || newValue === min) {
            this._setValueOnSwipe(newValue)
        } else {
            const stepCount = Math.round((newValue - min) / step);
            newValue = this._roundToExponentLength(stepCount * step + min);
            this._setValueOnSwipe(Math.max(Math.min(newValue, max), min))
        }
    },
    _setValueOnSwipe(value) {
        this._actualValue = value;
        if ("onHandleRelease" === this.option("valueChangeMode")) {
            SliderHandle.getInstance(this._activeHandle()).option("value", value)
        } else {
            this.option("value", value);
            this._saveValueChangeEvent(void 0)
        }
    },
    _getActualValue() {
        return this._actualValue ?? this.option("value")
    },
    _isSingleValuePossible() {
        const {
            min: min,
            max: max
        } = this.option();
        return min === max
    },
    _startHandler(args) {
        if (this._isSingleValuePossible()) {
            return
        }
        const e = args.event;
        this._currentRatio = (eventData(e).x - this._$bar.offset().left) / getWidth(this._$bar);
        if (this.option("rtlEnabled")) {
            this._currentRatio = 1 - this._currentRatio
        }
        this._saveValueChangeEvent(e);
        this._changeValueOnSwipe(this._currentRatio)
    },
    _renderValue() {
        this.callBase();
        const value = this._getActualValue();
        this._getSubmitElement().val(applyServerDecimalSeparator(value));
        SliderHandle.getInstance(this._activeHandle()).option("value", value)
    },
    _setRangeStyles(options) {
        options && this._$range.css(options)
    },
    _callHandlerMethod(name, args) {
        SliderHandle.getInstance(this._$handle)[name](args)
    },
    _repaintHandle() {
        this._callHandlerMethod("repaint")
    },
    _fitTooltip() {
        this._callHandlerMethod("updateTooltipPosition")
    },
    _optionChanged(args) {
        switch (args.name) {
            case "visible":
                this.callBase(args);
                this._renderHandle();
                this._repaintHandle();
                break;
            case "min":
            case "max":
                this._renderValue();
                this.callBase(args);
                this._renderLabels();
                this._renderAriaMinAndMax();
                this._fitTooltip();
                break;
            case "step":
                this._renderValue();
                break;
            case "keyStep":
            case "valueChangeMode":
                break;
            case "showRange":
                this._renderRangeVisibility();
                break;
            case "tooltip":
                this._renderHandle();
                break;
            case "label":
                this._renderLabels();
                break;
            case "useInkRipple":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    _refresh() {
        this._toggleRTLDirection(this.option("rtlEnabled"));
        this._renderDimensions();
        this._renderValue();
        this._renderHandle();
        this._repaintHandle()
    },
    _clean() {
        delete this._inkRipple;
        delete this._actualValue;
        this.callBase()
    }
});
registerComponent("dxSlider", Slider);
export default Slider;
