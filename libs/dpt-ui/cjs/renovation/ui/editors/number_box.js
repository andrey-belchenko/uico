/**
 * DevExtreme (cjs/renovation/ui/editors/number_box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.NumberBoxPropsType = exports.NumberBoxProps = exports.NumberBox = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _number_box = _interopRequireDefault(require("../../../ui/number_box"));
var _dom_component_wrapper = require("../common/dom_component_wrapper");
var _editor = require("./common/editor");
var _editor_state_props = require("./common/editor_state_props");
var _editor_label_props = require("./common/editor_label_props");
const _excluded = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "invalidValueMessage", "isDirty", "isValid", "label", "labelMode", "max", "min", "mode", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "showSpinButtons", "step", "tabIndex", "useLargeSpinButtons", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const DEFAULT_VALUE = 0;
const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
        componentType: _number_box.default,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
exports.viewFunction = viewFunction;
const NumberBoxProps = exports.NumberBoxProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(_editor.EditorProps), Object.getOwnPropertyDescriptors({
    defaultValue: 0,
    isReactComponentWrapper: true
})));
const NumberBoxPropsType = exports.NumberBoxPropsType = {
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
        return _editor_state_props.EditorStateProps.activeStateEnabled
    },
    get disabled() {
        return NumberBoxProps.disabled
    },
    get focusStateEnabled() {
        return _editor_state_props.EditorStateProps.focusStateEnabled
    },
    get hoverStateEnabled() {
        return _editor_state_props.EditorStateProps.hoverStateEnabled
    },
    get tabIndex() {
        return NumberBoxProps.tabIndex
    },
    get visible() {
        return NumberBoxProps.visible
    },
    get label() {
        return _editor_label_props.EditorLabelProps.label
    },
    get labelMode() {
        return _editor_label_props.EditorLabelProps.labelMode
    },
    isReactComponentWrapper: true
};
class NumberBox extends _inferno2.BaseInfernoComponent {
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
exports.NumberBox = NumberBox;
NumberBox.defaultProps = NumberBoxPropsType;
