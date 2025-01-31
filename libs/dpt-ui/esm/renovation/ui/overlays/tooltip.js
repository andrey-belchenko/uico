/**
 * DevExtreme (esm/renovation/ui/overlays/tooltip.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["children"],
    _excluded2 = ["accessKey", "activeStateEnabled", "animation", "children", "className", "container", "contentTemplate", "defaultVisible", "deferRendering", "disabled", "focusStateEnabled", "fullScreen", "height", "hideEvent", "hideOnOutsideClick", "hint", "hoverStateEnabled", "maxHeight", "maxWidth", "minHeight", "minWidth", "onClick", "onHidden", "onHiding", "onInitialized", "onKeyDown", "onOptionChanged", "onShowing", "onShown", "onTitleRendered", "position", "rtlEnabled", "shading", "shadingColor", "showEvent", "tabIndex", "target", "visible", "visibleChange", "width", "wrapperAttr"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    InfernoEffect,
    InfernoComponent
} from "@dpt-ui/runtime/inferno";
import devices from "../../../core/devices";
import LegacyTooltip from "../../../ui/tooltip";
import {
    DomComponentWrapper
} from "../common/dom_component_wrapper";
import {
    BaseWidgetProps
} from "../common/base_props";
const isDesktop = !(!devices.real().generic || devices.isSimulator());
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        domComponentWrapperRef: domComponentWrapperRef,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacyTooltip,
        componentProps: componentProps.restProps,
        templateNames: ["contentTemplate"]
    }, restAttributes, {
        children: componentProps.children
    }), null, domComponentWrapperRef))
};
export const TooltipProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(BaseWidgetProps), Object.getOwnPropertyDescriptors({
    animation: Object.freeze({
        show: {
            type: "fade",
            from: 0,
            to: 1
        },
        hide: {
            type: "fade",
            to: 0
        }
    }),
    hideOnOutsideClick: true,
    contentTemplate: "content",
    deferRendering: true,
    disabled: false,
    wrapperAttr: Object.freeze({}),
    focusStateEnabled: isDesktop,
    fullScreen: false,
    height: "auto",
    hoverStateEnabled: false,
    maxHeight: null,
    maxWidth: null,
    minHeight: null,
    minWidth: null,
    position: "bottom",
    rtlEnabled: false,
    shading: false,
    shadingColor: "",
    width: "auto",
    defaultVisible: true,
    visibleChange: () => {},
    isReactComponentWrapper: true
})));
import {
    createRef as infernoCreateRef
} from "inferno";
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class Tooltip extends InfernoComponent {
    constructor(props) {
        super(props);
        this.domComponentWrapperRef = infernoCreateRef();
        this.__getterCache = {};
        this.state = {
            visible: void 0 !== this.props.visible ? this.props.visible : this.props.defaultVisible
        };
        this.saveInstance = this.saveInstance.bind(this);
        this.setHideEventListener = this.setHideEventListener.bind(this)
    }
    createEffects() {
        return [new InfernoEffect(this.saveInstance, []), new InfernoEffect(this.setHideEventListener, [this.props.visibleChange])]
    }
    updateEffects() {
        var _this$_effects$, _this$_effects$2;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ || _this$_effects$.update([]);
        null === (_this$_effects$2 = this._effects[1]) || void 0 === _this$_effects$2 || _this$_effects$2.update([this.props.visibleChange])
    }
    saveInstance() {
        var _this$domComponentWra;
        this.instance = null === (_this$domComponentWra = this.domComponentWrapperRef.current) || void 0 === _this$domComponentWra ? void 0 : _this$domComponentWra.getInstance()
    }
    setHideEventListener() {
        this.instance.option("onHiding", (() => {
            {
                let __newValue;
                this.setState((__state_argument => {
                    __newValue = false;
                    return {
                        visible: __newValue
                    }
                }));
                this.props.visibleChange(__newValue)
            }
        }))
    }
    get componentProps() {
        if (void 0 !== this.__getterCache.componentProps) {
            return this.__getterCache.componentProps
        }
        return this.__getterCache.componentProps = (() => {
            const _this$props$visible = _extends({}, this.props, {
                    visible: void 0 !== this.props.visible ? this.props.visible : this.state.visible
                }),
                {
                    children: children
                } = _this$props$visible,
                restProps = _objectWithoutPropertiesLoose(_this$props$visible, _excluded);
            return {
                children: children,
                restProps: restProps
            }
        })()
    }
    get restAttributes() {
        const _this$props$visible2 = _extends({}, this.props, {
                visible: void 0 !== this.props.visible ? this.props.visible : this.state.visible
            }),
            restProps = _objectWithoutPropertiesLoose(_this$props$visible2, _excluded2);
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
            props: _extends({}, props, {
                visible: void 0 !== this.props.visible ? this.props.visible : this.state.visible,
                contentTemplate: getTemplate(props.contentTemplate)
            }),
            domComponentWrapperRef: this.domComponentWrapperRef,
            componentProps: this.componentProps,
            restAttributes: this.restAttributes
        })
    }
}
Tooltip.defaultProps = TooltipProps;
