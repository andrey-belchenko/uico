/**
 * DevExtreme (esm/renovation/ui/pager/page_size/small.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["inputAttr", "pageSize", "pageSizeChange", "pageSizes", "parentRef"];
import {
    createComponentVNode
} from "inferno";
import {
    InfernoEffect,
    InfernoComponent
} from "@dpt-ui/runtime/inferno";
import messageLocalization from "../../../../localization/message";
import {
    SelectBox
} from "../../editors/drop_down_editors/select_box";
import {
    calculateValuesFittedWidth
} from "../utils/calculate_values_fitted_width";
import {
    getElementMinWidth
} from "../utils/get_element_width";
import {
    InternalPagerProps
} from "../common/pager_props";
export const viewFunction = _ref => {
    let {
        props: {
            inputAttr: inputAttr,
            pageSize: pageSize,
            pageSizeChange: pageSizeChange,
            pageSizes: pageSizes
        },
        width: width
    } = _ref;
    return createComponentVNode(2, SelectBox, {
        displayExpr: "text",
        valueExpr: "value",
        dataSource: pageSizes,
        value: pageSize,
        valueChange: pageSizeChange,
        width: width,
        inputAttr: inputAttr
    })
};
export const PageSizeSmallProps = {
    inputAttr: Object.freeze({
        "aria-label": messageLocalization.format("dxPager-ariaPageSize")
    })
};
const PageSizeSmallPropsType = {
    get pageSize() {
        return InternalPagerProps.pageSize
    },
    get inputAttr() {
        return PageSizeSmallProps.inputAttr
    }
};
export class PageSizeSmall extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
            minWidth: 10
        };
        this.updateWidth = this.updateWidth.bind(this)
    }
    createEffects() {
        return [new InfernoEffect(this.updateWidth, [this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.inputAttr])]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ || _this$_effects$.update([this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.inputAttr])
    }
    updateWidth() {
        this.setState((__state_argument => ({
            minWidth: getElementMinWidth(this.props.parentRef.current) || __state_argument.minWidth
        })))
    }
    get width() {
        return calculateValuesFittedWidth(this.state.minWidth, this.props.pageSizes.map((p => p.value)))
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
            width: this.width,
            restAttributes: this.restAttributes
        })
    }
}
PageSizeSmall.defaultProps = PageSizeSmallPropsType;
