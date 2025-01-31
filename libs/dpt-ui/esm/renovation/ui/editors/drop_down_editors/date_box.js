/**
 * DevExtreme (esm/renovation/ui/editors/drop_down_editors/date_box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "calendarOptions", "className", "defaultValue", "disabled", "field", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "label", "labelMode", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "type", "useMaskBehavior", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import LegacyDateBox from "../../../../ui/date_box";
import {
    DomComponentWrapper
} from "../../common/dom_component_wrapper";
import {
    EditorProps
} from "../common/editor";
import {
    EditorStateProps
} from "../common/editor_state_props";
import {
    EditorLabelProps
} from "../common/editor_label_props";
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacyDateBox,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
export const DateBoxProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(EditorProps), Object.getOwnPropertyDescriptors({
    type: "date",
    useMaskBehavior: false,
    defaultValue: null,
    isReactComponentWrapper: true
})));
export const DateBoxPropsType = {
    get type() {
        return DateBoxProps.type
    },
    get useMaskBehavior() {
        return DateBoxProps.useMaskBehavior
    },
    get defaultValue() {
        return DateBoxProps.defaultValue
    },
    get readOnly() {
        return DateBoxProps.readOnly
    },
    get name() {
        return DateBoxProps.name
    },
    get validationError() {
        return DateBoxProps.validationError
    },
    get validationErrors() {
        return DateBoxProps.validationErrors
    },
    get validationMessageMode() {
        return DateBoxProps.validationMessageMode
    },
    get validationMessagePosition() {
        return DateBoxProps.validationMessagePosition
    },
    get validationStatus() {
        return DateBoxProps.validationStatus
    },
    get isValid() {
        return DateBoxProps.isValid
    },
    get isDirty() {
        return DateBoxProps.isDirty
    },
    get inputAttr() {
        return DateBoxProps.inputAttr
    },
    get className() {
        return DateBoxProps.className
    },
    get activeStateEnabled() {
        return EditorStateProps.activeStateEnabled
    },
    get disabled() {
        return DateBoxProps.disabled
    },
    get focusStateEnabled() {
        return EditorStateProps.focusStateEnabled
    },
    get hoverStateEnabled() {
        return EditorStateProps.hoverStateEnabled
    },
    get tabIndex() {
        return DateBoxProps.tabIndex
    },
    get visible() {
        return DateBoxProps.visible
    },
    get label() {
        return EditorLabelProps.label
    },
    get labelMode() {
        return EditorLabelProps.labelMode
    },
    isReactComponentWrapper: true
};
export class DateBox extends BaseInfernoComponent {
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
DateBox.defaultProps = DateBoxPropsType;
