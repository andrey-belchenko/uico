/**
 * DevExtreme (esm/renovation/ui/pager/page_size/large.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["pageSize", "pageSizeChange", "pageSizes"];
import {
    createFragment,
    createComponentVNode
} from "inferno";
import {
    Fragment
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    combineClasses
} from "../../../utils/combine_classes";
import {
    LightButton
} from "../common/light_button";
import {
    InternalPagerProps
} from "../common/pager_props";
import {
    PAGER_SELECTED_PAGE_SIZE_CLASS,
    PAGER_PAGE_SIZE_CLASS,
    FIRST_CHILD_CLASS
} from "../common/consts";
import messageLocalization from "../../../../localization/message";
import {
    format
} from "../../../../core/utils/string";
export const viewFunction = _ref => {
    let {
        pageSizesText: pageSizesText
    } = _ref;
    return createFragment(pageSizesText.map((_ref2 => {
        let {
            className: className,
            click: click,
            label: label,
            text: text
        } = _ref2;
        return createComponentVNode(2, LightButton, {
            className: className,
            label: label,
            onClick: click,
            children: text
        }, text)
    })), 0)
};
export const PageSizeLargeProps = {};
const PageSizeLargePropsType = {
    get pageSize() {
        return InternalPagerProps.pageSize
    }
};
export class PageSizeLarge extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {};
        this.onPageSizeChange = this.onPageSizeChange.bind(this)
    }
    get pageSizesText() {
        if (void 0 !== this.__getterCache.pageSizesText) {
            return this.__getterCache.pageSizesText
        }
        return this.__getterCache.pageSizesText = (() => {
            const {
                pageSize: pageSize,
                pageSizes: pageSizes
            } = this.props;
            return pageSizes.map(((_ref3, index) => {
                let {
                    text: text,
                    value: processedPageSize
                } = _ref3;
                const selected = processedPageSize === pageSize;
                const className = combineClasses({
                    [selected ? PAGER_SELECTED_PAGE_SIZE_CLASS : PAGER_PAGE_SIZE_CLASS]: true,
                    [FIRST_CHILD_CLASS]: 0 === index
                });
                return {
                    className: className,
                    click: this.onPageSizeChange(processedPageSize),
                    label: format(messageLocalization.getFormatter("dxPager-pageSize"), processedPageSize || messageLocalization.getFormatter("dxPager-pageSizesAllText")),
                    text: text
                }
            }))
        })()
    }
    onPageSizeChange(processedPageSize) {
        return () => {
            this.props.pageSizeChange(processedPageSize);
            return this.props.pageSize
        }
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.pageSize !== nextProps.pageSize || this.props.pageSizes !== nextProps.pageSizes || this.props.pageSizeChange !== nextProps.pageSizeChange) {
            this.__getterCache.pageSizesText = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            pageSizesText: this.pageSizesText,
            restAttributes: this.restAttributes
        })
    }
}
PageSizeLarge.defaultProps = PageSizeLargePropsType;
