/**
 * DevExtreme (renovation/ui/editors/common/editor.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.EditorPropsType = exports.EditorProps = exports.Editor = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _widget = require("../../common/widget");
var _base_props = require("../../common/base_props");
var _combine_classes = require("../../../utils/combine_classes");
var _validation_message = require("../../overlays/validation_message");
var _utils = require("../../../../core/options/utils");
const _excluded = ["accessKey", "activeStateEnabled", "aria", "children", "className", "classes", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];

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
const getCssClasses = model => {
    const {
        classes: classes,
        isValid: isValid,
        readOnly: readOnly
    } = model;
    const classesMap = {
        "dx-state-readonly": !!readOnly,
        "dx-invalid": !isValid,
        [String(classes)]: !!classes
    };
    return (0, _combine_classes.combineClasses)(classesMap)
};
const viewFunction = viewModel => {
    const {
        aria: aria,
        cssClasses: classes,
        isValidationMessageVisible: isValidationMessageVisible,
        onFocusIn: onFocusIn,
        props: {
            accessKey: accessKey,
            activeStateEnabled: activeStateEnabled,
            children: children,
            className: className,
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            height: height,
            hint: hint,
            hoverStateEnabled: hoverStateEnabled,
            onClick: onClick,
            onKeyDown: onKeyDown,
            rtlEnabled: rtlEnabled,
            tabIndex: tabIndex,
            validationMessageMode: validationMessageMode,
            validationMessagePosition: validationMessagePosition,
            visible: visible,
            width: width
        },
        restAttributes: restAttributes,
        rootElementRef: rootElementRef,
        validationErrors: validationErrors,
        validationMessageGuid: validationMessageGuid,
        validationMessageTarget: validationMessageTarget,
        widgetRef: widgetRef
    } = viewModel;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
        rootElementRef: rootElementRef,
        aria: aria,
        classes: classes,
        activeStateEnabled: activeStateEnabled,
        focusStateEnabled: focusStateEnabled,
        hoverStateEnabled: hoverStateEnabled,
        accessKey: accessKey,
        className: className,
        rtlEnabled: rtlEnabled,
        hint: hint,
        disabled: disabled,
        height: height,
        width: width,
        onFocusIn: onFocusIn,
        onClick: onClick,
        onKeyDown: onKeyDown,
        tabIndex: tabIndex,
        visible: visible
    }, restAttributes, {
        children: (0, _inferno.createFragment)([children, isValidationMessageVisible && (0, _inferno.createComponentVNode)(2, _validation_message.ValidationMessage, {
            validationErrors: validationErrors,
            mode: validationMessageMode,
            positionSide: validationMessagePosition,
            rtlEnabled: rtlEnabled,
            target: validationMessageTarget,
            boundary: validationMessageTarget,
            visualContainer: validationMessageTarget,
            contentId: validationMessageGuid
        })], 0)
    }), null, widgetRef))
};
exports.viewFunction = viewFunction;
const EditorProps = exports.EditorProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(_base_props.BaseWidgetProps), Object.getOwnPropertyDescriptors({
    readOnly: false,
    name: "",
    validationError: null,
    validationErrors: null,
    validationMessageMode: "auto",
    validationMessagePosition: "bottom",
    validationStatus: "valid",
    isValid: true,
    isDirty: false,
    inputAttr: Object.freeze({}),
    defaultValue: null,
    valueChange: () => {}
})));
const EditorPropsType = exports.EditorPropsType = {
    get readOnly() {
        return EditorProps.readOnly
    },
    get name() {
        return EditorProps.name
    },
    get validationError() {
        return EditorProps.validationError
    },
    get validationErrors() {
        return EditorProps.validationErrors
    },
    get validationMessageMode() {
        return EditorProps.validationMessageMode
    },
    get validationMessagePosition() {
        return EditorProps.validationMessagePosition
    },
    get validationStatus() {
        return EditorProps.validationStatus
    },
    get isValid() {
        return EditorProps.isValid
    },
    get isDirty() {
        return EditorProps.isDirty
    },
    get inputAttr() {
        return EditorProps.inputAttr
    },
    get defaultValue() {
        return EditorProps.defaultValue
    },
    get valueChange() {
        return EditorProps.valueChange
    },
    get className() {
        return EditorProps.className
    },
    get activeStateEnabled() {
        return EditorProps.activeStateEnabled
    },
    get disabled() {
        return EditorProps.disabled
    },
    get focusStateEnabled() {
        return EditorProps.focusStateEnabled
    },
    get hoverStateEnabled() {
        return EditorProps.hoverStateEnabled
    },
    get tabIndex() {
        return EditorProps.tabIndex
    },
    get visible() {
        return EditorProps.visible
    },
    get aria() {
        return _widget.WidgetProps.aria
    },
    get classes() {
        return _widget.WidgetProps.classes
    }
};
class Editor extends _inferno2.InfernoWrapperComponent {
    constructor(props) {
        super(props);
        this.widgetRef = (0, _inferno.createRef)();
        this.rootElementRef = (0, _inferno.createRef)();
        this.__getterCache = {};
        this.state = {
            validationMessageGuid: `dx-${new _guid.default}`,
            isValidationMessageVisible: false,
            value: void 0 !== this.props.value ? this.props.value : this.props.defaultValue
        };
        this.updateValidationMessageVisibility = this.updateValidationMessageVisibility.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this)
    }
    createEffects() {
        return [new _inferno2.InfernoEffect(this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), (0, _inferno2.createReRenderEffect)()]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ || _this$_effects$.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors])
    }
    updateValidationMessageVisibility() {
        this.setState((__state_argument => ({
            isValidationMessageVisible: this.shouldShowValidationMessage
        })))
    }
    onFocusIn(event) {
        const {
            onFocusIn: onFocusIn
        } = this.props;
        null === onFocusIn || void 0 === onFocusIn || onFocusIn(event)
    }
    get cssClasses() {
        return `${getCssClasses(_extends({},this.props,{value:void 0!==this.props.value?this.props.value:this.state.value}))}`
    }
    get shouldShowValidationMessage() {
        const {
            isValid: isValid,
            validationStatus: validationStatus
        } = this.props;
        const validationErrors = this.validationErrors ?? [];
        const isEditorValid = isValid && "invalid" !== validationStatus;
        return !isEditorValid && validationErrors.length > 0
    }
    get aria() {
        const {
            isValid: isValid,
            readOnly: readOnly
        } = this.props;
        const result = {
            readonly: readOnly ? "true" : "false",
            invalid: !isValid ? "true" : "false"
        };
        if (this.shouldShowValidationMessage) {
            result.describedBy = this.state.validationMessageGuid
        }
        return _extends({}, result, this.props.aria)
    }
    get validationErrors() {
        if (void 0 !== this.__getterCache.validationErrors) {
            return this.__getterCache.validationErrors
        }
        return this.__getterCache.validationErrors = (() => {
            const {
                validationError: validationError,
                validationErrors: validationErrors
            } = this.props;
            let allValidationErrors = validationErrors && [...validationErrors];
            if (!allValidationErrors && validationError) {
                allValidationErrors = [_extends({}, validationError)]
            }
            return allValidationErrors
        })()
    }
    get validationMessageTarget() {
        var _this$rootElementRef;
        return null === (_this$rootElementRef = this.rootElementRef) || void 0 === _this$rootElementRef ? void 0 : _this$rootElementRef.current
    }
    get restAttributes() {
        const _this$props$value = _extends({}, this.props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            restProps = _objectWithoutPropertiesLoose(_this$props$value, _excluded);
        return restProps
    }
    focus() {
        this.widgetRef.current.focus()
    }
    blur() {
        this.widgetRef.current.blur()
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props.validationError !== nextProps.validationError || this.props.validationErrors !== nextProps.validationErrors) {
            this.__getterCache.validationErrors = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            validationMessageGuid: this.state.validationMessageGuid,
            isValidationMessageVisible: this.state.isValidationMessageVisible,
            rootElementRef: this.rootElementRef,
            widgetRef: this.widgetRef,
            onFocusIn: this.onFocusIn,
            cssClasses: this.cssClasses,
            shouldShowValidationMessage: this.shouldShowValidationMessage,
            aria: this.aria,
            validationErrors: this.validationErrors,
            validationMessageTarget: this.validationMessageTarget,
            restAttributes: this.restAttributes
        })
    }
}
exports.Editor = Editor;

function __processTwoWayProps(defaultProps) {
    const twoWayProps = ["value"];
    return Object.keys(defaultProps).reduce(((props, propName) => {
        const propValue = defaultProps[propName];
        const defaultPropName = twoWayProps.some((p => p === propName)) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
        props[defaultPropName] = propValue;
        return props
    }), {})
}
Editor.defaultProps = EditorPropsType;
const __defaultOptionRules = [];

function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    Editor.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(Editor.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)))))
}
