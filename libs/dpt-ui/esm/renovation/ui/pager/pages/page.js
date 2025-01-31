/**
 * DevExtreme (esm/renovation/ui/pager/pages/page.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "index", "onClick", "selected"];
import {
    createComponentVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    LightButton
} from "../common/light_button";
import {
    PAGER_PAGE_CLASS,
    PAGER_SELECTION_CLASS
} from "../common/consts";
import {
    combineClasses
} from "../../../utils/combine_classes";
import messageLocalization from "../../../../localization/message";
import {
    format
} from "../../../../core/utils/string";
export const viewFunction = _ref => {
    let {
        className: className,
        label: label,
        props: {
            onClick: onClick,
            selected: selected
        },
        value: value
    } = _ref;
    return createComponentVNode(2, LightButton, {
        className: className,
        label: label,
        onClick: onClick,
        selected: selected,
        children: value
    })
};
export const PageProps = {
    index: 0,
    selected: false,
    className: PAGER_PAGE_CLASS
};
export class Page extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    get label() {
        return format(messageLocalization.getFormatter("dxPager-page"), this.value)
    }
    get value() {
        return this.props.index + 1
    }
    get className() {
        const {
            selected: selected
        } = this.props;
        return combineClasses({
            [`${this.props.className}`]: !!this.props.className,
            [PAGER_SELECTION_CLASS]: !!selected
        })
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
            label: this.label,
            value: this.value,
            className: this.className,
            restAttributes: this.restAttributes
        })
    }
}
Page.defaultProps = PageProps;
