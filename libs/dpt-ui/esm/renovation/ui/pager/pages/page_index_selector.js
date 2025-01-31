/**
 * DevExtreme (esm/renovation/ui/pager/pages/page_index_selector.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["hasKnownLastPage", "isLargeDisplayMode", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText", "showNavigationButtons", "totalCount"];
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
    LightButton
} from "../common/light_button";
import {
    PagesLarge
} from "./large";
import {
    PagesSmall
} from "./small";
import {
    InternalPagerProps
} from "../common/pager_props";
import {
    ConfigContext
} from "../../../common/config_context";
import messageLocalization from "../../../../localization/message";
const PAGER_NAVIGATE_BUTTON = "dx-navigate-button";
const PAGER_PREV_BUTTON_CLASS = "dx-prev-button";
const PAGER_NEXT_BUTTON_CLASS = "dx-next-button";
export const PAGER_BUTTON_DISABLE_CLASS = "dx-button-disable";
const getNextButtonLabel = () => messageLocalization.getFormatter("dxPager-nextPage")();
const getPrevButtonLabel = () => messageLocalization.getFormatter("dxPager-prevPage")();
const classNames = {
    nextEnabledClass: "dx-navigate-button dx-next-button",
    prevEnabledClass: "dx-navigate-button dx-prev-button",
    nextDisabledClass: "dx-button-disable dx-navigate-button dx-next-button",
    prevDisabledClass: "dx-button-disable dx-navigate-button dx-prev-button"
};
const reverseDirections = {
    next: "prev",
    prev: "next"
};
export const viewFunction = _ref => {
    let {
        nextButtonProps: nextButtonProps,
        pageIndexChange: pageIndexChange,
        prevButtonProps: prevButtonProps,
        props: {
            isLargeDisplayMode: isLargeDisplayMode,
            maxPagesCount: maxPagesCount,
            pageCount: pageCount,
            pageIndex: pageIndex,
            pagesCountText: pagesCountText
        },
        renderNextButton: renderNextButton,
        renderPrevButton: renderPrevButton
    } = _ref;
    return createFragment([renderPrevButton && createComponentVNode(2, LightButton, {
        label: getPrevButtonLabel(),
        className: prevButtonProps.className,
        tabIndex: prevButtonProps.tabIndex,
        onClick: prevButtonProps.navigate
    }), isLargeDisplayMode && createComponentVNode(2, PagesLarge, {
        maxPagesCount: maxPagesCount,
        pageCount: pageCount,
        pageIndex: pageIndex,
        pageIndexChange: pageIndexChange
    }), !isLargeDisplayMode && createComponentVNode(2, PagesSmall, {
        pageCount: pageCount,
        pageIndex: pageIndex,
        pageIndexChange: pageIndexChange,
        pagesCountText: pagesCountText
    }), renderNextButton && createComponentVNode(2, LightButton, {
        label: getNextButtonLabel(),
        className: nextButtonProps.className,
        tabIndex: nextButtonProps.tabIndex,
        onClick: nextButtonProps.navigate
    })], 0)
};

function getIncrement(direction) {
    return "next" === direction ? 1 : -1
}
export const PageIndexSelectorProps = {
    isLargeDisplayMode: true
};
const PageIndexSelectorPropsType = {
    get pageIndex() {
        return InternalPagerProps.pageIndex
    },
    get maxPagesCount() {
        return InternalPagerProps.maxPagesCount
    },
    get pageCount() {
        return InternalPagerProps.pageCount
    },
    get hasKnownLastPage() {
        return InternalPagerProps.hasKnownLastPage
    },
    get showNavigationButtons() {
        return InternalPagerProps.showNavigationButtons
    },
    get totalCount() {
        return InternalPagerProps.totalCount
    },
    get isLargeDisplayMode() {
        return PageIndexSelectorProps.isLargeDisplayMode
    }
};
export class PageIndexSelector extends BaseInfernoComponent {
    get config() {
        if (this.context[ConfigContext.id]) {
            return this.context[ConfigContext.id]
        }
        return ConfigContext.defaultValue
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {};
        this.pageIndexChange = this.pageIndexChange.bind(this);
        this.getButtonProps = this.getButtonProps.bind(this);
        this.canNavigateToPage = this.canNavigateToPage.bind(this);
        this.getNextPageIndex = this.getNextPageIndex.bind(this);
        this.canNavigateTo = this.canNavigateTo.bind(this);
        this.navigateToPage = this.navigateToPage.bind(this)
    }
    pageIndexChange(pageIndex) {
        if (this.canNavigateToPage(pageIndex)) {
            this.props.pageIndexChange(pageIndex)
        }
    }
    getButtonProps(direction) {
        var _this$config;
        const rtlAwareDirection = null !== (_this$config = this.config) && void 0 !== _this$config && _this$config.rtlEnabled ? reverseDirections[direction] : direction;
        const canNavigate = this.canNavigateTo(rtlAwareDirection);
        const className = classNames[`${direction}${canNavigate?"Enabled":"Disabled"}Class`];
        return {
            className: className,
            tabIndex: canNavigate ? 0 : -1,
            navigate: () => this.navigateToPage(rtlAwareDirection)
        }
    }
    canNavigateToPage(pageIndex) {
        if (!this.props.hasKnownLastPage) {
            return pageIndex >= 0
        }
        return pageIndex >= 0 && pageIndex <= this.props.pageCount - 1
    }
    getNextPageIndex(direction) {
        return this.props.pageIndex + getIncrement(direction)
    }
    canNavigateTo(direction) {
        return this.canNavigateToPage(this.getNextPageIndex(direction))
    }
    navigateToPage(direction) {
        this.pageIndexChange(this.getNextPageIndex(direction))
    }
    get renderPrevButton() {
        const {
            isLargeDisplayMode: isLargeDisplayMode,
            showNavigationButtons: showNavigationButtons
        } = this.props;
        return !isLargeDisplayMode || showNavigationButtons
    }
    get renderNextButton() {
        return this.renderPrevButton || !this.props.hasKnownLastPage
    }
    get prevButtonProps() {
        if (void 0 !== this.__getterCache.prevButtonProps) {
            return this.__getterCache.prevButtonProps
        }
        return this.__getterCache.prevButtonProps = (() => this.getButtonProps("prev"))()
    }
    get nextButtonProps() {
        if (void 0 !== this.__getterCache.nextButtonProps) {
            return this.__getterCache.nextButtonProps
        }
        return this.__getterCache.nextButtonProps = (() => this.getButtonProps("next"))()
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.context[ConfigContext.id] !== context[ConfigContext.id] || this.props.hasKnownLastPage !== nextProps.hasKnownLastPage || this.props.pageCount !== nextProps.pageCount || this.props.pageIndex !== nextProps.pageIndex || this.props.pageIndexChange !== nextProps.pageIndexChange) {
            this.__getterCache.prevButtonProps = void 0
        }
        if (this.context[ConfigContext.id] !== context[ConfigContext.id] || this.props.hasKnownLastPage !== nextProps.hasKnownLastPage || this.props.pageCount !== nextProps.pageCount || this.props.pageIndex !== nextProps.pageIndex || this.props.pageIndexChange !== nextProps.pageIndexChange) {
            this.__getterCache.nextButtonProps = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            config: this.config,
            pageIndexChange: this.pageIndexChange,
            renderPrevButton: this.renderPrevButton,
            renderNextButton: this.renderNextButton,
            prevButtonProps: this.prevButtonProps,
            nextButtonProps: this.nextButtonProps,
            restAttributes: this.restAttributes
        })
    }
}
PageIndexSelector.defaultProps = PageIndexSelectorPropsType;
