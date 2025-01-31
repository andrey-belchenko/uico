/**
 * DevExtreme (esm/renovation/ui/common/ink_ripple.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["config"];
import {
    createVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    initConfig,
    showWave,
    hideWave
} from "../../../ui/widget/utils.ink_ripple";
export const viewFunction = model => normalizeProps(createVNode(1, "div", "dx-inkripple", null, 1, _extends({}, model.restAttributes)));
export const InkRippleProps = {
    config: Object.freeze({})
};
export class InkRipple extends BaseInfernoComponent {
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
            return initConfig(config)
        })()
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    hideWave(opts) {
        hideWave(this.getConfig, opts)
    }
    showWave(opts) {
        showWave(this.getConfig, opts)
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
InkRipple.defaultProps = InkRippleProps;
