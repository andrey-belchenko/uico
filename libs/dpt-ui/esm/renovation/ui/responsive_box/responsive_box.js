/**
 * DevExtreme (esm/renovation/ui/responsive_box/responsive_box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["screenByWidth"];
import {
    createComponentVNode
} from "inferno";
import {
    InfernoWrapperComponent
} from "@dpt-ui/runtime/inferno";
import {
    Widget
} from "../common/widget";
import {
    ResponsiveBoxProps
} from "./responsive_box_props";
import {
    combineClasses
} from "../../utils/combine_classes";
import {
    Box
} from "../box/box";
import {
    hasWindow
} from "../../../core/utils/window";
import domAdapter from "../../../core/dom_adapter";
import {
    convertToScreenSizeQualifier
} from "./screen_utils";
const HD_SCREEN_WIDTH = 1920;
const RESPONSIVE_BOX_CLASS = "dx-responsivebox";
const SCREEN_SIZE_CLASS_PREFIX = "dx-responsivebox-screen-";
export const viewFunction = viewModel => {
    const screenSizeQualifier = (() => {
        const screenWidth = hasWindow() ? domAdapter.getDocumentElement().clientWidth : 1920;
        const screenSizeFunc = viewModel.props.screenByWidth ?? convertToScreenSizeQualifier;
        return screenSizeFunc(screenWidth)
    })();
    const cssClasses = combineClasses({
        [RESPONSIVE_BOX_CLASS]: true,
        [SCREEN_SIZE_CLASS_PREFIX + screenSizeQualifier]: true
    });
    return createComponentVNode(2, Widget, {
        classes: cssClasses,
        children: createComponentVNode(2, Box)
    })
};
import {
    createReRenderEffect
} from "@dpt-ui/runtime/inferno";
export class ResponsiveBox extends InfernoWrapperComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    createEffects() {
        return [createReRenderEffect()]
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
            restAttributes: this.restAttributes
        })
    }
}
ResponsiveBox.defaultProps = ResponsiveBoxProps;
