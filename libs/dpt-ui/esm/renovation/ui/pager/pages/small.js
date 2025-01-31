/**
 * DevExtreme (esm/renovation/ui/pager/pages/small.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["inputAttr", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText"];
import {
    createVNode,
    createComponentVNode
} from "inferno";
import {
    InfernoEffect,
    InfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    Page
} from "./page";
import {
    PAGER_INFO_CLASS
} from "../info";
import {
    NumberBox
} from "../../editors/number_box";
import messageLocalization from "../../../../localization/message";
import {
    calculateValuesFittedWidth
} from "../utils/calculate_values_fitted_width";
import {
    getElementMinWidth
} from "../utils/get_element_width";
import {
    InternalPagerProps
} from "../common/pager_props";
const PAGER_INFO_TEXT_CLASS = `${PAGER_INFO_CLASS}  dx-info-text`;
const PAGER_PAGE_INDEX_CLASS = "dx-page-index";
const LIGHT_PAGES_CLASS = "dx-light-pages";
const PAGER_PAGES_COUNT_CLASS = "dx-pages-count";
export const viewFunction = _ref => {
    let {
        pageIndexRef: pageIndexRef,
        pagesCountText: pagesCountText,
        props: {
            inputAttr: inputAttr,
            pageCount: pageCount
        },
        selectLastPageIndex: selectLastPageIndex,
        value: value,
        valueChange: valueChange,
        width: width
    } = _ref;
    return createVNode(1, "div", "dx-light-pages", [createComponentVNode(2, NumberBox, {
        className: "dx-page-index",
        min: 1,
        max: Math.max(pageCount, value),
        width: width,
        value: value,
        valueChange: valueChange,
        inputAttr: inputAttr
    }), createVNode(1, "span", PAGER_INFO_TEXT_CLASS, pagesCountText, 0), createComponentVNode(2, Page, {
        className: "dx-pages-count",
        selected: false,
        index: pageCount - 1,
        onClick: selectLastPageIndex
    })], 4, null, null, pageIndexRef)
};
export const PagerSmallProps = {
    inputAttr: Object.freeze({
        "aria-label": messageLocalization.format("dxPager-ariaPageNumber")
    })
};
const PagerSmallPropsType = {
    get pageIndex() {
        return InternalPagerProps.pageIndex
    },
    get pageCount() {
        return InternalPagerProps.pageCount
    },
    get inputAttr() {
        return PagerSmallProps.inputAttr
    }
};
import {
    createRef as infernoCreateRef
} from "inferno";
export class PagesSmall extends InfernoComponent {
    constructor(props) {
        super(props);
        this.pageIndexRef = infernoCreateRef();
        this.state = {
            minWidth: 10
        };
        this.updateWidth = this.updateWidth.bind(this);
        this.selectLastPageIndex = this.selectLastPageIndex.bind(this);
        this.valueChange = this.valueChange.bind(this)
    }
    createEffects() {
        return [new InfernoEffect(this.updateWidth, [this.state.minWidth])]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ || _this$_effects$.update([this.state.minWidth])
    }
    updateWidth() {
        var _this$pageIndexRef$cu;
        const el = null === (_this$pageIndexRef$cu = this.pageIndexRef.current) || void 0 === _this$pageIndexRef$cu ? void 0 : _this$pageIndexRef$cu.querySelector(".dx-page-index");
        this.setState((__state_argument => ({
            minWidth: el && getElementMinWidth(el) || __state_argument.minWidth
        })))
    }
    get value() {
        return this.props.pageIndex + 1
    }
    get width() {
        const {
            pageCount: pageCount
        } = this.props;
        return calculateValuesFittedWidth(this.state.minWidth, [pageCount])
    }
    get pagesCountText() {
        return (this.props.pagesCountText ?? "") || messageLocalization.getFormatter("dxPager-pagesCountText")()
    }
    selectLastPageIndex() {
        this.props.pageIndexChange(this.props.pageCount - 1)
    }
    valueChange(value) {
        this.props.pageIndexChange(value - 1)
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
            pageIndexRef: this.pageIndexRef,
            value: this.value,
            width: this.width,
            pagesCountText: this.pagesCountText,
            selectLastPageIndex: this.selectLastPageIndex,
            valueChange: this.valueChange,
            restAttributes: this.restAttributes
        })
    }
}
PagesSmall.defaultProps = PagerSmallPropsType;
