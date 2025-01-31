/**
 * DevExtreme (esm/renovation/ui/common/dom_component_wrapper.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["valueChange"],
    _excluded2 = ["componentProps", "componentType", "templateNames"];
import {
    createVNode
} from "inferno";
import {
    InfernoEffect,
    InfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    renderTemplate,
    hasTemplate
} from "@dpt-ui/runtime/inferno";
import {
    ConfigContext
} from "../../common/config_context";
import {
    getUpdatedOptions
} from "./utils/get_updated_options";
const normalizeProps = props => Object.keys(props).reduce(((accumulator, key) => {
    if (void 0 !== props[key]) {
        accumulator[key] = props[key]
    }
    return accumulator
}), {});
export const viewFunction = _ref => {
    let {
        props: {
            componentProps: {
                className: className
            }
        },
        restAttributes: restAttributes,
        widgetRef: widgetRef
    } = _ref;
    return normalizeProps(createVNode(1, "div", className, null, 1, _extends({}, restAttributes), null, widgetRef))
};
export const DomComponentWrapperProps = {};
import {
    createRef as infernoCreateRef
} from "inferno";
export class DomComponentWrapper extends InfernoComponent {
    get config() {
        if (this.context[ConfigContext.id]) {
            return this.context[ConfigContext.id]
        }
        return ConfigContext.defaultValue
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.widgetRef = infernoCreateRef();
        this.getInstance = this.getInstance.bind(this);
        this.setupWidget = this.setupWidget.bind(this);
        this.updateWidget = this.updateWidget.bind(this)
    }
    createEffects() {
        return [new InfernoEffect(this.setupWidget, []), new InfernoEffect(this.updateWidget, [this.props.componentProps, this.config, this.props.templateNames])]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[1]) || void 0 === _this$_effects$ || _this$_effects$.update([this.props.componentProps, this.config, this.props.templateNames])
    }
    setupWidget() {
        const componentInstance = new this.props.componentType(this.widgetRef.current, this.properties);
        this.instance = componentInstance;
        return () => {
            componentInstance.dispose();
            this.instance = null
        }
    }
    updateWidget() {
        const instance = this.getInstance();
        if (!instance) {
            return
        }
        const updatedOptions = getUpdatedOptions(this.prevProps || {}, this.properties);
        if (updatedOptions.length) {
            instance.beginUpdate();
            updatedOptions.forEach((_ref2 => {
                let {
                    path: path,
                    value: value
                } = _ref2;
                instance.option(path, value)
            }));
            instance.endUpdate()
        }
        this.prevProps = this.properties
    }
    get properties() {
        var _this$config;
        const normalizedProps = normalizeProps(this.props.componentProps);
        const {
            valueChange: valueChange
        } = normalizedProps, restProps = _objectWithoutPropertiesLoose(normalizedProps, _excluded);
        const properties = _extends({
            rtlEnabled: !!(null !== (_this$config = this.config) && void 0 !== _this$config && _this$config.rtlEnabled),
            isRenovated: true
        }, restProps);
        if (valueChange) {
            properties.onValueChanged = _ref3 => {
                let {
                    value: value
                } = _ref3;
                return valueChange(value)
            }
        }
        const templates = this.props.templateNames;
        templates.forEach((name => {
            if (hasTemplate(name, properties, this)) {
                properties[name] = (item, index, container) => {
                    renderTemplate(this.props.componentProps[name], {
                        item: item,
                        index: index,
                        container: container
                    }, this)
                }
            }
        }));
        return properties
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);
        return restProps
    }
    getInstance() {
        return this.instance
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            widgetRef: this.widgetRef,
            config: this.config,
            properties: this.properties,
            restAttributes: this.restAttributes
        })
    }
}
DomComponentWrapper.defaultProps = DomComponentWrapperProps;
