/**
 * DevExtreme (esm/renovation/ui/toolbar/toolbar.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "className", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "items", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import LegacyToolbar from "../../../ui/toolbar";
import {
    DomComponentWrapper
} from "../common/dom_component_wrapper";
import {
    ToolbarProps
} from "./toolbar_props";
import {
    isObject
} from "../../../core/utils/type";
import {
    ConfigContext
} from "../../common/config_context";
import {
    resolveRtlEnabled
} from "../../utils/resolve_rtl";
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacyToolbar,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
export class Toolbar extends BaseInfernoComponent {
    get config() {
        if (this.context[ConfigContext.id]) {
            return this.context[ConfigContext.id]
        }
        return ConfigContext.defaultValue
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {}
    }
    get componentProps() {
        if (void 0 !== this.__getterCache.componentProps) {
            return this.__getterCache.componentProps
        }
        return this.__getterCache.componentProps = (() => {
            const {
                items: items
            } = this.props;
            const toolbarItems = null === items || void 0 === items ? void 0 : items.map((item => {
                if (!isObject(item)) {
                    return item
                }
                const options = item.options ?? {};
                options.rtlEnabled = options.rtlEnabled ?? this.resolvedRtlEnabled;
                return _extends({}, item, {
                    options: options
                })
            }));
            return _extends({}, this.props, {
                items: toolbarItems
            })
        })()
    }
    get resolvedRtlEnabled() {
        const {
            rtlEnabled: rtlEnabled
        } = this.props;
        return !!resolveRtlEnabled(rtlEnabled, this.config)
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.items !== nextProps.items || this.props.rtlEnabled !== nextProps.rtlEnabled || this.context[ConfigContext.id] !== context[ConfigContext.id] || this.props !== nextProps) {
            this.__getterCache.componentProps = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            config: this.config,
            componentProps: this.componentProps,
            resolvedRtlEnabled: this.resolvedRtlEnabled,
            restAttributes: this.restAttributes
        })
    }
}
Toolbar.defaultProps = ToolbarProps;
