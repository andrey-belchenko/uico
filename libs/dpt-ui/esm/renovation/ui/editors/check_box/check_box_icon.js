/**
 * DevExtreme (esm/renovation/ui/editors/check_box/check_box_icon.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["size"];
import {
    createVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    normalizeStyles
} from "@dpt-ui/runtime/inferno";
import {
    normalizeStyleProp
} from "../../../../core/utils/style";
import "../../../../ui/themes";
export const viewFunction = viewModel => {
    const {
        cssStyles: cssStyles,
        elementRef: elementRef
    } = viewModel;
    return createVNode(1, "span", "dx-checkbox-icon", null, 1, {
        style: normalizeStyles(cssStyles)
    }, null, elementRef)
};
export const CheckBoxIconProps = {};
import {
    createRef as infernoCreateRef
} from "inferno";
export class CheckBoxIcon extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.elementRef = infernoCreateRef();
        this.__getterCache = {}
    }
    get cssStyles() {
        if (void 0 !== this.__getterCache.cssStyles) {
            return this.__getterCache.cssStyles
        }
        return this.__getterCache.cssStyles = (() => {
            const {
                size: size
            } = this.props;
            const fontSize = normalizeStyleProp("fontSize", size);
            return {
                fontSize: fontSize
            }
        })()
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.size !== nextProps.size) {
            this.__getterCache.cssStyles = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            elementRef: this.elementRef,
            cssStyles: this.cssStyles,
            restAttributes: this.restAttributes
        })
    }
}
CheckBoxIcon.defaultProps = CheckBoxIconProps;
