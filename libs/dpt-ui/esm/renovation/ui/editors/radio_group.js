/**
 * DevExtreme (esm/renovation/ui/editors/radio_group.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "className", "dataSource", "defaultValue", "disabled", "displayExpr", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "items", "layout", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "valueExpr", "visible", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import LegacyRadioGroup from "../../../ui/radio_group";
import {
    EditorProps
} from "./common/editor";
import {
    EditorStateProps
} from "./common/editor_state_props";
import {
    DomComponentWrapper
} from "../common/dom_component_wrapper";
import devices from "../../../core/devices";
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacyRadioGroup,
        componentProps: componentProps,
        templateNames: ["itemTemplate"]
    }, restAttributes)))
};
export const RadioGroupProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(EditorProps), Object.getOwnPropertyDescriptors({
    get layout() {
        return "tablet" === devices.real().deviceType ? "horizontal" : "vertical"
    },
    isReactComponentWrapper: true
})));
export const RadioGroupPropsType = {
    get layout() {
        return RadioGroupProps.layout
    },
    get readOnly() {
        return RadioGroupProps.readOnly
    },
    get name() {
        return RadioGroupProps.name
    },
    get validationError() {
        return RadioGroupProps.validationError
    },
    get validationErrors() {
        return RadioGroupProps.validationErrors
    },
    get validationMessageMode() {
        return RadioGroupProps.validationMessageMode
    },
    get validationMessagePosition() {
        return RadioGroupProps.validationMessagePosition
    },
    get validationStatus() {
        return RadioGroupProps.validationStatus
    },
    get isValid() {
        return RadioGroupProps.isValid
    },
    get isDirty() {
        return RadioGroupProps.isDirty
    },
    get inputAttr() {
        return RadioGroupProps.inputAttr
    },
    get defaultValue() {
        return RadioGroupProps.defaultValue
    },
    get className() {
        return RadioGroupProps.className
    },
    get activeStateEnabled() {
        return EditorStateProps.activeStateEnabled
    },
    get disabled() {
        return RadioGroupProps.disabled
    },
    get focusStateEnabled() {
        return EditorStateProps.focusStateEnabled
    },
    get hoverStateEnabled() {
        return EditorStateProps.hoverStateEnabled
    },
    get tabIndex() {
        return RadioGroupProps.tabIndex
    },
    get visible() {
        return RadioGroupProps.visible
    },
    isReactComponentWrapper: true
};
export class RadioGroup extends BaseInfernoComponent {
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
RadioGroup.defaultProps = RadioGroupPropsType;
