/**
 * DevExtreme (esm/__internal/ui/m_switch.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import fx from "../../animation/fx";
import registerComponent from "../../core/component_registrator";
import devices from "../../core/devices";
import $ from "../../core/renderer";
import {
    Deferred
} from "../../core/utils/deferred";
import {
    extend
} from "../../core/utils/extend";
import {
    getBoundingRect
} from "../../core/utils/position";
import {
    getOuterWidth
} from "../../core/utils/size";
import {
    name as clickEventName
} from "../../events/click";
import {
    lock
} from "../../events/core/emitter.feedback";
import eventsEngine from "../../events/core/events_engine";
import Swipeable from "../../events/gesture/swipeable";
import {
    addNamespace
} from "../../events/utils/index";
import messageLocalization from "../../localization/message";
import Editor from "../../ui/editor/editor";
const SWITCH_CLASS = "dx-switch";
const SWITCH_WRAPPER_CLASS = "dx-switch-wrapper";
const SWITCH_CONTAINER_CLASS = "dx-switch-container";
const SWITCH_INNER_CLASS = "dx-switch-inner";
const SWITCH_HANDLE_CLASS = "dx-switch-handle";
const SWITCH_ON_VALUE_CLASS = "dx-switch-on-value";
const SWITCH_ON_CLASS = "dx-switch-on";
const SWITCH_OFF_CLASS = "dx-switch-off";
const SWITCH_ANIMATION_DURATION = 100;
const Switch = Editor.inherit({
    _supportedKeys() {
        const isRTL = this.option("rtlEnabled");
        const click = function(e) {
            e.preventDefault();
            this._clickAction({
                event: e
            })
        };
        const move = function(value, e) {
            e.preventDefault();
            e.stopPropagation();
            this._saveValueChangeEvent(e);
            this._animateValue(value)
        };
        return extend(this.callBase(), {
            space: click,
            enter: click,
            leftArrow: move.bind(this, !!isRTL),
            rightArrow: move.bind(this, !isRTL)
        })
    },
    _useTemplates: () => false,
    _getDefaultOptions() {
        return extend(this.callBase(), {
            hoverStateEnabled: true,
            activeStateEnabled: true,
            switchedOnText: messageLocalization.format("dxSwitch-switchedOnText"),
            switchedOffText: messageLocalization.format("dxSwitch-switchedOffText"),
            value: false
        })
    },
    _defaultOptionsRules() {
        return this.callBase().concat([{
            device: () => "desktop" === devices.real().deviceType && !devices.isSimulator(),
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _feedbackHideTimeout: 0,
    _animating: false,
    _initMarkup() {
        this._renderContainers();
        this.$element().addClass("dx-switch").append(this._$switchWrapper);
        this._renderSubmitElement();
        this._renderClick();
        this.setAria("role", "switch");
        this._renderSwipeable();
        this.callBase();
        this._renderSwitchInner();
        this._renderLabels();
        this._renderValue()
    },
    _getInnerOffset(value, offset) {
        const ratio = (offset - this._offsetDirection() * Number(!value)) / 2;
        return 100 * ratio + "%"
    },
    _getHandleOffset(value, offset) {
        if (this.option("rtlEnabled")) {
            value = !value
        }
        if (value) {
            const calcValue = 100 * -offset - 100;
            return `${calcValue}%`
        }
        return 100 * -offset + "%"
    },
    _renderSwitchInner() {
        this._$switchInner = $("<div>").addClass("dx-switch-inner").appendTo(this._$switchContainer);
        this._$handle = $("<div>").addClass("dx-switch-handle").appendTo(this._$switchInner)
    },
    _renderLabels() {
        this._$labelOn = $("<div>").addClass("dx-switch-on").prependTo(this._$switchInner);
        this._$labelOff = $("<div>").addClass("dx-switch-off").appendTo(this._$switchInner);
        this._setLabelsText()
    },
    _renderContainers() {
        this._$switchContainer = $("<div>").addClass("dx-switch-container");
        this._$switchWrapper = $("<div>").addClass("dx-switch-wrapper").append(this._$switchContainer)
    },
    _renderSwipeable() {
        this._createComponent(this.$element(), Swipeable, {
            elastic: false,
            immediate: true,
            onStart: this._swipeStartHandler.bind(this),
            onUpdated: this._swipeUpdateHandler.bind(this),
            onEnd: this._swipeEndHandler.bind(this),
            itemSizeFunc: this._getItemSizeFunc.bind(this)
        })
    },
    _getItemSizeFunc() {
        return getOuterWidth(this._$switchContainer, true) - getBoundingRect(this._$handle.get(0)).width
    },
    _renderSubmitElement() {
        this._$submitElement = $("<input>").attr("type", "hidden").appendTo(this.$element())
    },
    _getSubmitElement() {
        return this._$submitElement
    },
    _offsetDirection() {
        return this.option("rtlEnabled") ? -1 : 1
    },
    _renderPosition(state, swipeOffset) {
        const innerOffset = this._getInnerOffset(state, swipeOffset);
        const handleOffset = this._getHandleOffset(state, swipeOffset);
        this._$switchInner.css("transform", ` translateX(${innerOffset})`);
        this._$handle.css("transform", ` translateX(${handleOffset})`)
    },
    _validateValue() {
        const check = this.option("value");
        if ("boolean" !== typeof check) {
            this._options.silent("value", !!check)
        }
    },
    _renderClick() {
        const eventName = addNamespace(clickEventName, this.NAME);
        const $element = this.$element();
        this._clickAction = this._createAction(this._clickHandler.bind(this));
        eventsEngine.off($element, eventName);
        eventsEngine.on($element, eventName, (e => {
            this._clickAction({
                event: e
            })
        }))
    },
    _clickHandler(args) {
        const e = args.event;
        this._saveValueChangeEvent(e);
        if (this._animating || this._swiping) {
            return
        }
        this._animateValue(!this.option("value"))
    },
    _animateValue(value) {
        const startValue = this.option("value");
        const endValue = value;
        if (startValue === endValue) {
            return
        }
        this._animating = true;
        const fromInnerOffset = this._getInnerOffset(startValue, 0);
        const toInnerOffset = this._getInnerOffset(endValue, 0);
        const fromHandleOffset = this._getHandleOffset(startValue, 0);
        const toHandleOffset = this._getHandleOffset(endValue, 0);
        const that = this;
        const fromInnerConfig = {};
        const toInnerConfig = {};
        const fromHandleConfig = {};
        const toHandlerConfig = {};
        fromInnerConfig.transform = ` translateX(${fromInnerOffset})`;
        toInnerConfig.transform = ` translateX(${toInnerOffset})`;
        fromHandleConfig.transform = ` translateX(${fromHandleOffset})`;
        toHandlerConfig.transform = ` translateX(${toHandleOffset})`;
        this.$element().toggleClass("dx-switch-on-value", endValue);
        fx.animate(this._$handle, {
            from: fromHandleConfig,
            to: toHandlerConfig,
            duration: 100
        });
        fx.animate(this._$switchInner, {
            from: fromInnerConfig,
            to: toInnerConfig,
            duration: 100,
            complete() {
                that._animating = false;
                that.option("value", endValue)
            }
        })
    },
    _swipeStartHandler(e) {
        const state = this.option("value");
        const rtlEnabled = this.option("rtlEnabled");
        const maxOffOffset = rtlEnabled ? 0 : 1;
        const maxOnOffset = rtlEnabled ? 1 : 0;
        e.event.maxLeftOffset = state ? maxOffOffset : maxOnOffset;
        e.event.maxRightOffset = state ? maxOnOffset : maxOffOffset;
        this._swiping = true;
        this._feedbackDeferred = Deferred();
        lock(this._feedbackDeferred);
        this._toggleActiveState(this.$element(), this.option("activeStateEnabled"))
    },
    _swipeUpdateHandler(e) {
        this._renderPosition(this.option("value"), e.event.offset)
    },
    _swipeEndHandler(e) {
        const that = this;
        const offsetDirection = this._offsetDirection();
        const toInnerConfig = {};
        const toHandleConfig = {};
        const innerOffset = this._getInnerOffset(that.option("value"), e.event.targetOffset);
        const handleOffset = this._getHandleOffset(that.option("value"), e.event.targetOffset);
        toInnerConfig.transform = ` translateX(${innerOffset})`;
        toHandleConfig.transform = ` translateX(${handleOffset})`;
        fx.animate(this._$handle, {
            to: toHandleConfig,
            duration: 100
        });
        fx.animate(this._$switchInner, {
            to: toInnerConfig,
            duration: 100,
            complete() {
                that._swiping = false;
                const pos = that.option("value") + offsetDirection * e.event.targetOffset;
                that._saveValueChangeEvent(e.event);
                that.option("value", Boolean(pos));
                that._feedbackDeferred.resolve();
                that._toggleActiveState(that.$element(), false)
            }
        })
    },
    _renderValue() {
        this._validateValue();
        const value = this.option("value");
        this._renderPosition(value, 0);
        this.$element().toggleClass("dx-switch-on-value", value);
        this._getSubmitElement().val(value);
        this.setAria({
            checked: value,
            label: value ? this.option("switchedOnText") : this.option("switchedOffText")
        })
    },
    _setLabelsText() {
        this._$labelOn && this._$labelOn.text(this.option("switchedOnText"));
        this._$labelOff && this._$labelOff.text(this.option("switchedOffText"))
    },
    _visibilityChanged(visible) {
        if (visible) {
            this.repaint()
        }
    },
    _optionChanged(args) {
        switch (args.name) {
            case "width":
                delete this._marginBound;
                this._refresh();
                break;
            case "switchedOnText":
            case "switchedOffText":
                this._setLabelsText();
                break;
            case "value":
                this._renderValue();
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxSwitch", Switch);
export default Switch;
