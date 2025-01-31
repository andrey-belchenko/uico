/**
 * DevExtreme (esm/renovation/ui/common/widget.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "addWidgetClass", "aria", "children", "className", "classes", "cssText", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onRootElementRendered", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"];
import {
    createVNode,
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    InfernoEffect,
    InfernoWrapperComponent
} from "@dpt-ui/runtime/inferno";
import {
    normalizeStyles
} from "@dpt-ui/runtime/inferno";
import "../../../events/click";
import "../../../events/hover";
import {
    isFunction
} from "../../../core/utils/type";
import {
    dxClick,
    focus,
    keyboard,
    resize,
    visibility
} from "../../../events/short";
import {
    subscribeToDxActiveEvent,
    subscribeToDxInactiveEvent,
    subscribeToDxHoverStartEvent,
    subscribeToDxHoverEndEvent,
    subscribeToDxFocusInEvent,
    subscribeToDxFocusOutEvent
} from "../../utils/subscribe_to_event";
import {
    combineClasses
} from "../../utils/combine_classes";
import {
    extend
} from "../../../core/utils/extend";
import {
    normalizeStyleProp
} from "../../../core/utils/style";
import {
    BaseWidgetProps
} from "./base_props";
import {
    ConfigContext
} from "../../common/config_context";
import {
    ConfigProvider
} from "../../common/config_provider";
import {
    resolveRtlEnabled,
    resolveRtlEnabledDefinition
} from "../../utils/resolve_rtl";
import resizeCallbacks from "../../../core/utils/resize_callbacks";
import errors from "../../../core/errors";
import domAdapter from "../../../core/dom_adapter";
const DEFAULT_FEEDBACK_HIDE_TIMEOUT = 400;
const DEFAULT_FEEDBACK_SHOW_TIMEOUT = 30;
const getAria = args => Object.keys(args).reduce(((r, key) => {
    if (args[key]) {
        return _extends({}, r, {
            ["role" === key || "id" === key ? key : `aria-${key}`]: String(args[key])
        })
    }
    return r
}), {});
export const viewFunction = viewModel => {
    const widget = normalizeProps(createVNode(1, "div", viewModel.cssClasses, viewModel.props.children, 0, _extends({}, viewModel.attributes, {
        tabIndex: viewModel.tabIndex,
        title: viewModel.props.hint,
        style: normalizeStyles(viewModel.styles)
    }), null, viewModel.widgetElementRef));
    return viewModel.shouldRenderConfigProvider ? createComponentVNode(2, ConfigProvider, {
        rtlEnabled: viewModel.rtlEnabled,
        children: widget
    }) : widget
};
export const WidgetProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(BaseWidgetProps), Object.getOwnPropertyDescriptors({
    _feedbackHideTimeout: 400,
    _feedbackShowTimeout: 30,
    cssText: "",
    aria: Object.freeze({}),
    classes: "",
    name: "",
    addWidgetClass: true
})));
import {
    createReRenderEffect
} from "@dpt-ui/runtime/inferno";
import {
    createRef as infernoCreateRef
} from "inferno";
export class Widget extends InfernoWrapperComponent {
    get config() {
        if (this.context[ConfigContext.id]) {
            return this.context[ConfigContext.id]
        }
        return ConfigContext.defaultValue
    }
    constructor(props) {
        super(props);
        this.widgetElementRef = infernoCreateRef();
        this.state = {
            active: false,
            focused: false,
            hovered: false
        };
        this.setRootElementRef = this.setRootElementRef.bind(this);
        this.activeEffect = this.activeEffect.bind(this);
        this.inactiveEffect = this.inactiveEffect.bind(this);
        this.clickEffect = this.clickEffect.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.focusInEffect = this.focusInEffect.bind(this);
        this.focusOutEffect = this.focusOutEffect.bind(this);
        this.hoverStartEffect = this.hoverStartEffect.bind(this);
        this.hoverEndEffect = this.hoverEndEffect.bind(this);
        this.keyboardEffect = this.keyboardEffect.bind(this);
        this.resizeEffect = this.resizeEffect.bind(this);
        this.windowResizeEffect = this.windowResizeEffect.bind(this);
        this.visibilityEffect = this.visibilityEffect.bind(this);
        this.checkDeprecation = this.checkDeprecation.bind(this);
        this.applyCssTextEffect = this.applyCssTextEffect.bind(this)
    }
    createEffects() {
        return [new InfernoEffect(this.setRootElementRef, []), new InfernoEffect(this.activeEffect, [this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]), new InfernoEffect(this.inactiveEffect, [this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]), new InfernoEffect(this.clickEffect, [this.props.disabled, this.props.name, this.props.onClick]), new InfernoEffect(this.focusInEffect, [this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]), new InfernoEffect(this.focusOutEffect, [this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]), new InfernoEffect(this.hoverStartEffect, [this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]), new InfernoEffect(this.hoverEndEffect, [this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]), new InfernoEffect(this.keyboardEffect, [this.props.focusStateEnabled, this.props.onKeyDown]), new InfernoEffect(this.resizeEffect, [this.props.name, this.props.onDimensionChanged]), new InfernoEffect(this.windowResizeEffect, [this.props.onDimensionChanged]), new InfernoEffect(this.visibilityEffect, [this.props.name, this.props.onVisibilityChange]), new InfernoEffect(this.checkDeprecation, [this.props.height, this.props.width]), new InfernoEffect(this.applyCssTextEffect, [this.props.cssText]), createReRenderEffect()]
    }
    updateEffects() {
        var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10, _this$_effects$11, _this$_effects$12, _this$_effects$13;
        null === (_this$_effects$ = this._effects[1]) || void 0 === _this$_effects$ || _this$_effects$.update([this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]);
        null === (_this$_effects$2 = this._effects[2]) || void 0 === _this$_effects$2 || _this$_effects$2.update([this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]);
        null === (_this$_effects$3 = this._effects[3]) || void 0 === _this$_effects$3 || _this$_effects$3.update([this.props.disabled, this.props.name, this.props.onClick]);
        null === (_this$_effects$4 = this._effects[4]) || void 0 === _this$_effects$4 || _this$_effects$4.update([this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]);
        null === (_this$_effects$5 = this._effects[5]) || void 0 === _this$_effects$5 || _this$_effects$5.update([this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]);
        null === (_this$_effects$6 = this._effects[6]) || void 0 === _this$_effects$6 || _this$_effects$6.update([this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]);
        null === (_this$_effects$7 = this._effects[7]) || void 0 === _this$_effects$7 || _this$_effects$7.update([this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]);
        null === (_this$_effects$8 = this._effects[8]) || void 0 === _this$_effects$8 || _this$_effects$8.update([this.props.focusStateEnabled, this.props.onKeyDown]);
        null === (_this$_effects$9 = this._effects[9]) || void 0 === _this$_effects$9 || _this$_effects$9.update([this.props.name, this.props.onDimensionChanged]);
        null === (_this$_effects$10 = this._effects[10]) || void 0 === _this$_effects$10 || _this$_effects$10.update([this.props.onDimensionChanged]);
        null === (_this$_effects$11 = this._effects[11]) || void 0 === _this$_effects$11 || _this$_effects$11.update([this.props.name, this.props.onVisibilityChange]);
        null === (_this$_effects$12 = this._effects[12]) || void 0 === _this$_effects$12 || _this$_effects$12.update([this.props.height, this.props.width]);
        null === (_this$_effects$13 = this._effects[13]) || void 0 === _this$_effects$13 || _this$_effects$13.update([this.props.cssText])
    }
    setRootElementRef() {
        const {
            onRootElementRendered: onRootElementRendered,
            rootElementRef: rootElementRef
        } = this.props;
        if (rootElementRef) {
            rootElementRef.current = this.widgetElementRef.current
        }
        null === onRootElementRendered || void 0 === onRootElementRendered || onRootElementRendered(this.widgetElementRef.current)
    }
    activeEffect() {
        const {
            _feedbackShowTimeout: _feedbackShowTimeout,
            activeStateEnabled: activeStateEnabled,
            activeStateUnit: activeStateUnit,
            disabled: disabled,
            onActive: onActive
        } = this.props;
        const selector = activeStateUnit;
        if (activeStateEnabled) {
            if (!disabled) {
                return subscribeToDxActiveEvent(this.widgetElementRef.current, (event => {
                    this.setState((__state_argument => ({
                        active: true
                    })));
                    null === onActive || void 0 === onActive || onActive(event)
                }), {
                    timeout: _feedbackShowTimeout,
                    selector: selector
                }, "UIFeedback")
            }
        }
        return
    }
    inactiveEffect() {
        const {
            _feedbackHideTimeout: _feedbackHideTimeout,
            activeStateEnabled: activeStateEnabled,
            activeStateUnit: activeStateUnit,
            onInactive: onInactive
        } = this.props;
        const selector = activeStateUnit;
        if (activeStateEnabled) {
            return subscribeToDxInactiveEvent(this.widgetElementRef.current, (event => {
                if (this.state.active) {
                    this.setState((__state_argument => ({
                        active: false
                    })));
                    null === onInactive || void 0 === onInactive || onInactive(event)
                }
            }), {
                timeout: _feedbackHideTimeout,
                selector: selector
            }, "UIFeedback")
        }
        return
    }
    clickEffect() {
        const {
            disabled: disabled,
            name: name,
            onClick: onClick
        } = this.props;
        const namespace = name;
        if (onClick && !disabled) {
            dxClick.on(this.widgetElementRef.current, onClick, {
                namespace: namespace
            });
            return () => dxClick.off(this.widgetElementRef.current, {
                namespace: namespace
            })
        }
        return
    }
    focusInEffect() {
        const {
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            name: name,
            onFocusIn: onFocusIn
        } = this.props;
        const namespace = `${name}Focus`;
        if (focusStateEnabled) {
            if (!disabled) {
                return subscribeToDxFocusInEvent(this.widgetElementRef.current, (event => {
                    if (!event.isDefaultPrevented()) {
                        this.setState((__state_argument => ({
                            focused: true
                        })));
                        null === onFocusIn || void 0 === onFocusIn || onFocusIn(event)
                    }
                }), null, namespace)
            }
        }
        return
    }
    focusOutEffect() {
        const {
            focusStateEnabled: focusStateEnabled,
            name: name,
            onFocusOut: onFocusOut
        } = this.props;
        const namespace = `${name}Focus`;
        if (focusStateEnabled) {
            return subscribeToDxFocusOutEvent(this.widgetElementRef.current, (event => {
                if (!event.isDefaultPrevented() && this.state.focused) {
                    this.setState((__state_argument => ({
                        focused: false
                    })));
                    null === onFocusOut || void 0 === onFocusOut || onFocusOut(event)
                }
            }), null, namespace)
        }
        return
    }
    hoverStartEffect() {
        const {
            activeStateUnit: activeStateUnit,
            disabled: disabled,
            hoverStateEnabled: hoverStateEnabled,
            onHoverStart: onHoverStart
        } = this.props;
        const selector = activeStateUnit;
        if (hoverStateEnabled) {
            if (!disabled) {
                return subscribeToDxHoverStartEvent(this.widgetElementRef.current, (event => {
                    !this.state.active && this.setState((__state_argument => ({
                        hovered: true
                    })));
                    null === onHoverStart || void 0 === onHoverStart || onHoverStart(event)
                }), {
                    selector: selector
                }, "UIFeedback")
            }
        }
        return
    }
    hoverEndEffect() {
        const {
            activeStateUnit: activeStateUnit,
            hoverStateEnabled: hoverStateEnabled,
            onHoverEnd: onHoverEnd
        } = this.props;
        const selector = activeStateUnit;
        if (hoverStateEnabled) {
            return subscribeToDxHoverEndEvent(this.widgetElementRef.current, (event => {
                if (this.state.hovered) {
                    this.setState((__state_argument => ({
                        hovered: false
                    })));
                    null === onHoverEnd || void 0 === onHoverEnd || onHoverEnd(event)
                }
            }), {
                selector: selector
            }, "UIFeedback")
        }
        return
    }
    keyboardEffect() {
        const {
            focusStateEnabled: focusStateEnabled,
            onKeyDown: onKeyDown
        } = this.props;
        if (focusStateEnabled && onKeyDown) {
            const id = keyboard.on(this.widgetElementRef.current, this.widgetElementRef.current, (e => onKeyDown(e)));
            return () => keyboard.off(id)
        }
        return
    }
    resizeEffect() {
        const namespace = `${this.props.name}VisibilityChange`;
        const {
            onDimensionChanged: onDimensionChanged
        } = this.props;
        if (onDimensionChanged) {
            resize.on(this.widgetElementRef.current, onDimensionChanged, {
                namespace: namespace
            });
            return () => resize.off(this.widgetElementRef.current, {
                namespace: namespace
            })
        }
        return
    }
    windowResizeEffect() {
        const {
            onDimensionChanged: onDimensionChanged
        } = this.props;
        if (onDimensionChanged) {
            resizeCallbacks.add(onDimensionChanged);
            return () => {
                resizeCallbacks.remove(onDimensionChanged)
            }
        }
        return
    }
    visibilityEffect() {
        const {
            name: name,
            onVisibilityChange: onVisibilityChange
        } = this.props;
        const namespace = `${name}VisibilityChange`;
        if (onVisibilityChange) {
            visibility.on(this.widgetElementRef.current, (() => onVisibilityChange(true)), (() => onVisibilityChange(false)), {
                namespace: namespace
            });
            return () => visibility.off(this.widgetElementRef.current, {
                namespace: namespace
            })
        }
        return
    }
    checkDeprecation() {
        const {
            height: height,
            width: width
        } = this.props;
        if (isFunction(width)) {
            errors.log("W0017", "width")
        }
        if (isFunction(height)) {
            errors.log("W0017", "height")
        }
    }
    applyCssTextEffect() {
        const {
            cssText: cssText
        } = this.props;
        if ("" !== cssText) {
            this.widgetElementRef.current.style.cssText = cssText
        }
    }
    get shouldRenderConfigProvider() {
        const {
            rtlEnabled: rtlEnabled
        } = this.props;
        return resolveRtlEnabledDefinition(rtlEnabled, this.config)
    }
    get rtlEnabled() {
        const {
            rtlEnabled: rtlEnabled
        } = this.props;
        return resolveRtlEnabled(rtlEnabled, this.config)
    }
    get attributes() {
        const {
            aria: aria,
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            visible: visible
        } = this.props;
        const accessKey = focusStateEnabled && !disabled && this.props.accessKey;
        return _extends({}, extend({}, accessKey && {
            accessKey: accessKey
        }), getAria(_extends({}, aria, {
            disabled: disabled,
            hidden: !visible
        })), extend({}, this.restAttributes))
    }
    get styles() {
        const {
            height: height,
            width: width
        } = this.props;
        const style = this.restAttributes.style || {};
        const computedWidth = normalizeStyleProp("width", isFunction(width) ? width() : width);
        const computedHeight = normalizeStyleProp("height", isFunction(height) ? height() : height);
        return _extends({}, style, {
            height: computedHeight ?? style.height,
            width: computedWidth ?? style.width
        })
    }
    get cssClasses() {
        const {
            activeStateEnabled: activeStateEnabled,
            addWidgetClass: addWidgetClass,
            className: className,
            classes: classes,
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            hoverStateEnabled: hoverStateEnabled,
            onVisibilityChange: onVisibilityChange,
            visible: visible
        } = this.props;
        const isFocusable = !!focusStateEnabled && !disabled;
        const isHoverable = !!hoverStateEnabled && !disabled;
        const canBeActive = !!activeStateEnabled && !disabled;
        const classesMap = {
            "dx-widget": !!addWidgetClass,
            [String(classes)]: !!classes,
            [String(className)]: !!className,
            "dx-state-disabled": !!disabled,
            "dx-state-invisible": !visible,
            "dx-state-focused": !!this.state.focused && isFocusable,
            "dx-state-active": !!this.state.active && canBeActive,
            "dx-state-hover": !!this.state.hovered && isHoverable && !this.state.active,
            "dx-rtl": !!this.rtlEnabled,
            "dx-visibility-change-handler": !!onVisibilityChange
        };
        return combineClasses(classesMap)
    }
    get tabIndex() {
        const {
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            tabIndex: tabIndex
        } = this.props;
        const isFocusable = focusStateEnabled && !disabled;
        return isFocusable ? tabIndex : void 0
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    focus() {
        focus.trigger(this.widgetElementRef.current)
    }
    blur() {
        const activeElement = domAdapter.getActiveElement(this.widgetElementRef.current);
        if (this.widgetElementRef.current === activeElement) {
            activeElement.blur()
        }
    }
    activate() {
        this.setState((__state_argument => ({
            active: true
        })))
    }
    deactivate() {
        this.setState((__state_argument => ({
            active: false
        })))
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            active: this.state.active,
            focused: this.state.focused,
            hovered: this.state.hovered,
            widgetElementRef: this.widgetElementRef,
            config: this.config,
            shouldRenderConfigProvider: this.shouldRenderConfigProvider,
            rtlEnabled: this.rtlEnabled,
            attributes: this.attributes,
            styles: this.styles,
            cssClasses: this.cssClasses,
            tabIndex: this.tabIndex,
            restAttributes: this.restAttributes
        })
    }
}
Widget.defaultProps = WidgetProps;
