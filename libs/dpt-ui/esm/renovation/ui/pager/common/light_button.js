/**
 * DevExtreme (esm/renovation/ui/pager/common/light_button.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className", "label", "onClick", "selected", "tabIndex"];
import {
    createVNode
} from "inferno";
import {
    InfernoEffect,
    InfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    subscribeToClickEvent
} from "../../../utils/subscribe_to_event";
import {
    KeyboardActionContext
} from "./keyboard_action_context";
export const viewFunction = _ref => {
    let {
        props: {
            children: children,
            className: className,
            label: label,
            selected: selected,
            tabIndex: tabIndex
        },
        widgetRef: widgetRef
    } = _ref;
    return createVNode(1, "div", className, children, 0, {
        tabIndex: tabIndex,
        role: "button",
        "aria-label": label,
        "aria-current": selected ? "page" : void 0
    }, null, widgetRef)
};
export const LightButtonProps = {
    className: "",
    label: "",
    tabIndex: 0,
    selected: false
};
import {
    createRef as infernoCreateRef
} from "inferno";
export class LightButton extends InfernoComponent {
    get keyboardContext() {
        if (this.context[KeyboardActionContext.id]) {
            return this.context[KeyboardActionContext.id]
        }
        return KeyboardActionContext.defaultValue
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.widgetRef = infernoCreateRef();
        this.keyboardEffect = this.keyboardEffect.bind(this);
        this.subscribeToClick = this.subscribeToClick.bind(this)
    }
    createEffects() {
        return [new InfernoEffect(this.keyboardEffect, [this.keyboardContext, this.props.onClick]), new InfernoEffect(this.subscribeToClick, [this.props.onClick])]
    }
    updateEffects() {
        var _this$_effects$, _this$_effects$2;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ || _this$_effects$.update([this.keyboardContext, this.props.onClick]);
        null === (_this$_effects$2 = this._effects[1]) || void 0 === _this$_effects$2 || _this$_effects$2.update([this.props.onClick])
    }
    keyboardEffect() {
        return this.keyboardContext.registerKeyboardAction(this.widgetRef.current, this.props.onClick)
    }
    subscribeToClick() {
        return subscribeToClickEvent(this.widgetRef.current, this.props.onClick)
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            widgetRef: this.widgetRef,
            keyboardContext: this.keyboardContext,
            restAttributes: this.restAttributes
        })
    }
}
LightButton.defaultProps = LightButtonProps;
