/**
 * DevExtreme (esm/renovation/ui/overlays/overlay.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["_checkParentVisibility", "accessKey", "activeStateEnabled", "animation", "className", "container", "contentTemplate", "disabled", "focusStateEnabled", "height", "hideOnOutsideClick", "hideOnParentScroll", "hint", "hoverStateEnabled", "integrationOptions", "maxWidth", "onClick", "onKeyDown", "position", "propagateOutsideClick", "rtlEnabled", "shading", "tabIndex", "templatesRenderAsynchronously", "visible", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import LegacyOverlay from "../../../ui/overlay/ui.overlay";
import {
    DomComponentWrapper
} from "../common/dom_component_wrapper";
import {
    BaseWidgetProps
} from "../common/base_props";
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacyOverlay,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
export const OverlayProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(BaseWidgetProps), Object.getOwnPropertyDescriptors({
    integrationOptions: Object.freeze({}),
    templatesRenderAsynchronously: false,
    shading: true,
    hideOnOutsideClick: false,
    hideOnParentScroll: false,
    animation: Object.freeze({
        type: "pop",
        duration: 300,
        to: {
            opacity: 0,
            scale: .55
        },
        from: {
            opacity: 1,
            scale: 1
        }
    }),
    visible: false,
    propagateOutsideClick: true,
    _checkParentVisibility: false,
    rtlEnabled: false,
    contentTemplate: "content",
    maxWidth: null,
    isReactComponentWrapper: true
})));
export class Overlay extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    get componentProps() {
        return this.props
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
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
Overlay.defaultProps = OverlayProps;
