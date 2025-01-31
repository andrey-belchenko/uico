/**
 * DevExtreme (esm/renovation/common/config_provider.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["children", "rtlEnabled"];
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    ConfigContext
} from "./config_context";
export const viewFunction = viewModel => viewModel.props.children;
export const ConfigProviderProps = {};
export class ConfigProvider extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {}
    }
    getChildContext() {
        return _extends({}, this.context, {
            [ConfigContext.id]: this.config || ConfigContext.defaultValue
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
ConfigProvider.defaultProps = ConfigProviderProps;
