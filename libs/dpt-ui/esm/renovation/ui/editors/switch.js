/**
 * DevExtreme (esm/renovation/ui/editors/switch.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "switchedOffText", "switchedOnText", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import LegacySwitch from "../../../ui/switch";
import {
    EditorProps
} from "./common/editor";
import {
    EditorStateProps
} from "./common/editor_state_props";
import {
    DomComponentWrapper
} from "../common/dom_component_wrapper";
import messageLocalization from "../../../localization/message";
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacySwitch,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
export const SwitchProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(EditorProps), Object.getOwnPropertyDescriptors({
    get switchedOnText() {
        return messageLocalization.format("dxSwitch-switchedOnText")
    },
    get switchedOffText() {
        return messageLocalization.format("dxSwitch-switchedOffText")
    },
    defaultValue: false,
    isReactComponentWrapper: true
})));
export const SwitchPropsType = {
    get switchedOnText() {
        return SwitchProps.switchedOnText
    },
    get switchedOffText() {
        return SwitchProps.switchedOffText
    },
    get defaultValue() {
        return SwitchProps.defaultValue
    },
    get readOnly() {
        return SwitchProps.readOnly
    },
    get name() {
        return SwitchProps.name
    },
    get validationError() {
        return SwitchProps.validationError
    },
    get validationErrors() {
        return SwitchProps.validationErrors
    },
    get validationMessageMode() {
        return SwitchProps.validationMessageMode
    },
    get validationMessagePosition() {
        return SwitchProps.validationMessagePosition
    },
    get validationStatus() {
        return SwitchProps.validationStatus
    },
    get isValid() {
        return SwitchProps.isValid
    },
    get isDirty() {
        return SwitchProps.isDirty
    },
    get inputAttr() {
        return SwitchProps.inputAttr
    },
    get className() {
        return SwitchProps.className
    },
    get activeStateEnabled() {
        return EditorStateProps.activeStateEnabled
    },
    get disabled() {
        return SwitchProps.disabled
    },
    get focusStateEnabled() {
        return EditorStateProps.focusStateEnabled
    },
    get hoverStateEnabled() {
        return EditorStateProps.hoverStateEnabled
    },
    get tabIndex() {
        return SwitchProps.tabIndex
    },
    get visible() {
        return SwitchProps.visible
    },
    isReactComponentWrapper: true
};
export class Switch extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: void 0 !== this.props.value ? this.props.value : this.props.defaultValue
        }
    }
    get componentProps() {
        return _extends({}, this.props, {
            value: void 0 !== this.props.value ? this.props.value : this.state.value
        })
    }
    get restAttributes() {
        const _this$props$value = _extends({}, this.props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            restProps = _objectWithoutPropertiesLoose(_this$props$value, _excluded);
        return restProps
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            componentProps: this.componentProps,
            restAttributes: this.restAttributes
        })
    }
}
Switch.defaultProps = SwitchPropsType;
