/**
 * DevExtreme (renovation/ui/common/ink_ripple.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.InkRippleProps = exports.InkRipple = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _utils = require("../../../ui/widget/utils.ink_ripple");
const _excluded = ["config"];

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
const viewFunction = model => (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", "dx-inkripple", null, 1, _extends({}, model.restAttributes)));
exports.viewFunction = viewFunction;
const InkRippleProps = exports.InkRippleProps = {
    config: Object.freeze({})
};
class InkRipple extends _inferno2.BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {};
        this.hideWave = this.hideWave.bind(this);
        this.showWave = this.showWave.bind(this)
    }
    get getConfig() {
        if (void 0 !== this.__getterCache.getConfig) {
            return this.__getterCache.getConfig
        }
        return this.__getterCache.getConfig = (() => {
            const {
                config: config
            } = this.props;
            return (0, _utils.initConfig)(config)
        })()
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    hideWave(opts) {
        (0, _utils.hideWave)(this.getConfig, opts)
    }
    showWave(opts) {
        (0, _utils.showWave)(this.getConfig, opts)
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.config !== nextProps.config) {
            this.__getterCache.getConfig = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            getConfig: this.getConfig,
            restAttributes: this.restAttributes
        })
    }
}
exports.InkRipple = InkRipple;
InkRipple.defaultProps = InkRippleProps;
