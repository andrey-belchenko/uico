/**
 * DevExtreme (esm/renovation/ui/box/box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["align", "crossAlign", "direction"];
import {
    createComponentVNode
} from "inferno";
import {
    InfernoWrapperComponent
} from "@dpt-ui/runtime/inferno";
import {
    normalizeStyles
} from "@dpt-ui/runtime/inferno";
import {
    Widget
} from "../common/widget";
import {
    BoxProps
} from "./box_props";
import {
    combineClasses
} from "../../utils/combine_classes";
export const viewFunction = viewModel => createComponentVNode(2, Widget, {
    classes: viewModel.cssClasses,
    style: normalizeStyles(viewModel.cssStyles)
});
import {
    createReRenderEffect
} from "@dpt-ui/runtime/inferno";
export class Box extends InfernoWrapperComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    createEffects() {
        return [createReRenderEffect()]
    }
    get cssClasses() {
        return combineClasses({
            "dx-box dx-box-flex": true
        })
    }
    get cssStyles() {
        const tryGetFromMap = (prop, map) => prop in map ? map[prop] : prop;
        return {
            display: "flex",
            flexDirection: {
                row: "row",
                col: "column"
            } [this.props.direction],
            justifyContent: tryGetFromMap(this.props.align, {
                start: "flex-start",
                end: "flex-end",
                center: "center",
                "space-between": "space-between",
                "space-around": "space-around"
            }),
            alignItems: tryGetFromMap(this.props.crossAlign, {
                start: "flex-start",
                end: "flex-end",
                center: "center",
                stretch: "stretch"
            })
        }
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
            cssClasses: this.cssClasses,
            cssStyles: this.cssStyles,
            restAttributes: this.restAttributes
        })
    }
}
Box.defaultProps = BoxProps;
