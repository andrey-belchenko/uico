/**
 * DevExtreme (esm/renovation/ui/editors/text_box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "buttons", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "label", "labelMode", "mask", "maskChar", "maskInvalidMessage", "maskRules", "maxLength", "mode", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "showClearButton", "showMaskMode", "spellCheck", "stylingMode", "tabIndex", "useMaskedValue", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "valueChangeEvent", "visible", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dptuicomp/runtime/inferno";
import LegacyTextBox from "../../../ui/text_box";
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
import {
    TextEditorProps
} from "./common/text_editor_props";
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacyTextBox,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
export const TextBoxProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(EditorProps), Object.getOwnPropertyDescriptors({
    mask: "",
    maskChar: "_",
    maskInvalidMessage: "Value is invalid",
    maskRules: Object.freeze({}),
    mode: "text",
    showClearButton: false,
    showMaskMode: "always",
    useMaskedValue: false,
    isReactComponentWrapper: true
})));
export const TextBoxPropsType = {
    get mask() {
        return TextBoxProps.mask
    },
    get maskChar() {
        return TextBoxProps.maskChar
    },
    get maskInvalidMessage() {
        return TextBoxProps.maskInvalidMessage
    },
    get maskRules() {
        return TextBoxProps.maskRules
    },
    get mode() {
        return TextBoxProps.mode
    },
    get showClearButton() {
        return TextBoxProps.showClearButton
    },
    get showMaskMode() {
        return TextBoxProps.showMaskMode
    },
    get useMaskedValue() {
        return TextBoxProps.useMaskedValue
    },
    get readOnly() {
        return TextBoxProps.readOnly
    },
    get name() {
        return TextBoxProps.name
    },
    get validationError() {
        return TextBoxProps.validationError
    },
    get validationErrors() {
        return TextBoxProps.validationErrors
    },
    get validationMessageMode() {
        return TextBoxProps.validationMessageMode
    },
    get validationMessagePosition() {
        return TextBoxProps.validationMessagePosition
    },
    get validationStatus() {
        return TextBoxProps.validationStatus
    },
    get isValid() {
        return TextBoxProps.isValid
    },
    get isDirty() {
        return TextBoxProps.isDirty
    },
    get defaultValue() {
        return TextEditorProps.defaultValue
    },
    get className() {
        return TextBoxProps.className
    },
    get activeStateEnabled() {
        return EditorStateProps.activeStateEnabled
    },
    get disabled() {
        return TextBoxProps.disabled
    },
    get focusStateEnabled() {
        return EditorStateProps.focusStateEnabled
    },
    get hoverStateEnabled() {
        return EditorStateProps.hoverStateEnabled
    },
    get tabIndex() {
        return TextBoxProps.tabIndex
    },
    get visible() {
        return TextBoxProps.visible
    },
    get label() {
        return EditorLabelProps.label
    },
    get labelMode() {
        return EditorLabelProps.labelMode
    },
    get maxLength() {
        return TextEditorProps.maxLength
    },
    get spellCheck() {
        return TextEditorProps.spellCheck
    },
    get valueChangeEvent() {
        return TextEditorProps.valueChangeEvent
    },
    get stylingMode() {
        return TextEditorProps.stylingMode
    },
    isReactComponentWrapper: true
};
export class TextBox extends BaseInfernoComponent {
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
TextBox.defaultProps = TextBoxPropsType;
