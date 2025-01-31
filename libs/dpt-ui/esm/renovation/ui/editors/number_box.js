/**
 * DevExtreme (esm/renovation/ui/editors/number_box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "invalidValueMessage", "isDirty", "isValid", "label", "labelMode", "max", "min", "mode", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "showSpinButtons", "step", "tabIndex", "useLargeSpinButtons", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import LegacyNumberBox from "../../../ui/number_box";
import {
    DomComponentWrapper
} from "../common/dom_component_wrapper";
import {
    EditorProps
} from "./common/editor";
import {
    EditorStateProps
} from "./common/editor_state_props";
import {
    EditorLabelProps
} from "./common/editor_label_props";
const DEFAULT_VALUE = 0;
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacyNumberBox,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
export const NumberBoxProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(EditorProps), Object.getOwnPropertyDescriptors({
    defaultValue: 0,
    isReactComponentWrapper: true
})));
export const NumberBoxPropsType = {
    get defaultValue() {
        return NumberBoxProps.defaultValue
    },
    get readOnly() {
        return NumberBoxProps.readOnly
    },
    get name() {
        return NumberBoxProps.name
    },
    get validationError() {
        return NumberBoxProps.validationError
    },
    get validationErrors() {
        return NumberBoxProps.validationErrors
    },
    get validationMessageMode() {
        return NumberBoxProps.validationMessageMode
    },
    get validationMessagePosition() {
        return NumberBoxProps.validationMessagePosition
    },
    get validationStatus() {
        return NumberBoxProps.validationStatus
    },
    get isValid() {
        return NumberBoxProps.isValid
    },
    get isDirty() {
        return NumberBoxProps.isDirty
    },
    get inputAttr() {
        return NumberBoxProps.inputAttr
    },
    get className() {
        return NumberBoxProps.className
    },
    get activeStateEnabled() {
        return EditorStateProps.activeStateEnabled
    },
    get disabled() {
        return NumberBoxProps.disabled
    },
    get focusStateEnabled() {
        return EditorStateProps.focusStateEnabled
    },
    get hoverStateEnabled() {
        return EditorStateProps.hoverStateEnabled
    },
    get tabIndex() {
        return NumberBoxProps.tabIndex
    },
    get visible() {
        return NumberBoxProps.visible
    },
    get label() {
        return EditorLabelProps.label
    },
    get labelMode() {
        return EditorLabelProps.labelMode
    },
    isReactComponentWrapper: true
};
export class NumberBox extends BaseInfernoComponent {
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
NumberBox.defaultProps = NumberBoxPropsType;
