/**
 * DevExtreme (renovation/common/config_provider.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.ConfigProviderProps = exports.ConfigProvider = void 0;
var _inferno = require("@dpt-ui/runtime/inferno");
var _config_context = require("./config_context");
const _excluded = ["children", "rtlEnabled"];

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
const viewFunction = viewModel => viewModel.props.children;
exports.viewFunction = viewFunction;
const ConfigProviderProps = exports.ConfigProviderProps = {};
class ConfigProvider extends _inferno.BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {}
    }
    getChildContext() {
        return _extends({}, this.context, {
            [_config_context.ConfigContext.id]: this.config || _config_context.ConfigContext.defaultValue
        })
    }
    get config() {
        if (void 0 !== this.__getterCache.config) {
            return this.__getterCache.config
        }
        return this.__getterCache.config = (() => ({
            rtlEnabled: this.props.rtlEnabled
        }))()
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.rtlEnabled !== nextProps.rtlEnabled) {
            this.__getterCache.config = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            config: this.config,
            restAttributes: this.restAttributes
        })
    }
}
exports.ConfigProvider = ConfigProvider;
ConfigProvider.defaultProps = ConfigProviderProps;
