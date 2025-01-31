/**
 * DevExtreme (renovation/ui/form/wrapper/form.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.Form = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _form = _interopRequireDefault(require("../../../../ui/form"));
var _dom_component_wrapper = require("../../common/dom_component_wrapper");
var _form_props = require("./form_props");
const _excluded = ["accessKey", "activeStateEnabled", "className", "colCount", "colCountByScreen", "disabled", "focusStateEnabled", "formData", "height", "hint", "hoverStateEnabled", "items", "labelLocation", "onClick", "onKeyDown", "rtlEnabled", "scrollingEnabled", "showColonAfterLabel", "showValidationSummary", "tabIndex", "visible", "width"];

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
const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
        componentType: _form.default,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
exports.viewFunction = viewFunction;
class Form extends _inferno2.InfernoWrapperComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {}
    }
    createEffects() {
        return [(0, _inferno2.createReRenderEffect)()]
    }
    get componentProps() {
        if (void 0 !== this.__getterCache.componentProps) {
            return this.__getterCache.componentProps
        }
        return this.__getterCache.componentProps = (() => this.props)()
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props !== nextProps) {
            this.__getterCache.componentProps = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            componentProps: this.componentProps,
            restAttributes: this.restAttributes
        })
    }
}
exports.Form = Form;
Form.defaultProps = _form_props.FormProps;
