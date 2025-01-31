/**
 * DevExtreme (renovation/ui/overlays/tooltip.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.TooltipProps = exports.Tooltip = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _tooltip = _interopRequireDefault(require("../../../ui/tooltip"));
var _dom_component_wrapper = require("../common/dom_component_wrapper");
var _base_props = require("../common/base_props");
const _excluded = ["children"],
    _excluded2 = ["accessKey", "activeStateEnabled", "animation", "children", "className", "container", "contentTemplate", "defaultVisible", "deferRendering", "disabled", "focusStateEnabled", "fullScreen", "height", "hideEvent", "hideOnOutsideClick", "hint", "hoverStateEnabled", "maxHeight", "maxWidth", "minHeight", "minWidth", "onClick", "onHidden", "onHiding", "onInitialized", "onKeyDown", "onOptionChanged", "onShowing", "onShown", "onTitleRendered", "position", "rtlEnabled", "shading", "shadingColor", "showEvent", "tabIndex", "target", "visible", "visibleChange", "width", "wrapperAttr"];

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
const isDesktop = !(!_devices.default.real().generic || _devices.default.isSimulator());
const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        domComponentWrapperRef: domComponentWrapperRef,
        restAttributes: restAttributes
    } = _ref;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
        componentType: _tooltip.default,
        componentProps: componentProps.restProps,
        templateNames: ["contentTemplate"]
    }, restAttributes, {
        children: componentProps.children
    }), null, domComponentWrapperRef))
};
exports.viewFunction = viewFunction;
const TooltipProps = exports.TooltipProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(_base_props.BaseWidgetProps), Object.getOwnPropertyDescriptors({
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
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
class Tooltip extends _inferno2.InfernoComponent {
    constructor(props) {
        super(props);
        this.domComponentWrapperRef = (0, _inferno.createRef)();
        this.__getterCache = {};
        this.state = {
            visible: void 0 !== this.props.visible ? this.props.visible : this.props.defaultVisible
        };
        this.saveInstance = this.saveInstance.bind(this);
        this.setHideEventListener = this.setHideEventListener.bind(this)
    }
    createEffects() {
        return [new _inferno2.InfernoEffect(this.saveInstance, []), new _inferno2.InfernoEffect(this.setHideEventListener, [this.props.visibleChange])]
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
exports.Tooltip = Tooltip;
Tooltip.defaultProps = TooltipProps;
