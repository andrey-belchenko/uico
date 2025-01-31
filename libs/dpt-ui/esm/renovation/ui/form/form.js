/**
 * DevExtreme (esm/renovation/ui/form/form.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["screenByWidth", "scrollingEnabled", "useNativeScrolling"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    InfernoWrapperComponent
} from "@dpt-ui/runtime/inferno";
import {
    FormProps
} from "./form_props";
import {
    combineClasses
} from "../../utils/combine_classes";
import {
    Widget
} from "../common/widget";
import {
    LayoutManager
} from "./layout_manager";
import {
    Scrollable
} from "../scroll_view/scrollable";
export const viewFunction = viewModel => {
    const aria = {
        role: "form"
    };
    const cssClasses = combineClasses({
        "dx-form": true
    });
    const {
        props: {
            scrollingEnabled: scrollingEnabled,
            useNativeScrolling: useNativeScrolling
        },
        restAttributes: restAttributes
    } = viewModel;
    const rootLayoutManager = createComponentVNode(2, LayoutManager, {
        screenByWidth: viewModel.props.screenByWidth
    });
    return scrollingEnabled ? createComponentVNode(2, Scrollable, {
        aria: aria,
        classes: cssClasses,
        useNative: !!useNativeScrolling,
        useSimulatedScrollbar: !useNativeScrolling,
        useKeyboard: false,
        direction: "both",
        bounceEnabled: false,
        children: rootLayoutManager
    }) : normalizeProps(createComponentVNode(2, Widget, _extends({
        aria: aria,
        classes: cssClasses
    }, restAttributes, {
        children: rootLayoutManager
    })))
};
import {
    createReRenderEffect
} from "@dpt-ui/runtime/inferno";
export class Form extends InfernoWrapperComponent {
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
Form.defaultProps = FormProps;
