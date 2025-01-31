/**
 * DevExtreme (cjs/renovation/ui/pager/pages/page_index_selector.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.PageIndexSelectorProps = exports.PageIndexSelector = exports.PAGER_BUTTON_DISABLE_CLASS = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _light_button = require("../common/light_button");
var _large = require("./large");
var _small = require("./small");
var _pager_props = require("../common/pager_props");
var _config_context = require("../../../common/config_context");
var _message = _interopRequireDefault(require("../../../../localization/message"));
const _excluded = ["hasKnownLastPage", "isLargeDisplayMode", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText", "showNavigationButtons", "totalCount"];

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}
const PAGER_NAVIGATE_BUTTON = "dx-navigate-button";
const PAGER_PREV_BUTTON_CLASS = "dx-prev-button";
const PAGER_NEXT_BUTTON_CLASS = "dx-next-button";
const PAGER_BUTTON_DISABLE_CLASS = exports.PAGER_BUTTON_DISABLE_CLASS = "dx-button-disable";
const getNextButtonLabel = () => _message.default.getFormatter("dxPager-nextPage")();
const getPrevButtonLabel = () => _message.default.getFormatter("dxPager-prevPage")();
const classNames = {
    nextEnabledClass: "dx-navigate-button dx-next-button",
    prevEnabledClass: "dx-navigate-button dx-prev-button",
    nextDisabledClass: `${PAGER_BUTTON_DISABLE_CLASS} dx-navigate-button dx-next-button`,
    prevDisabledClass: `${PAGER_BUTTON_DISABLE_CLASS} dx-navigate-button dx-prev-button`
};
const reverseDirections = {
    next: "prev",
    prev: "next"
};
const viewFunction = _ref => {
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
    return (0, _inferno.createFragment)([renderPrevButton && (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
        label: getPrevButtonLabel(),
        className: prevButtonProps.className,
        tabIndex: prevButtonProps.tabIndex,
        onClick: prevButtonProps.navigate
    }), isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _large.PagesLarge, {
        maxPagesCount: maxPagesCount,
        pageCount: pageCount,
        pageIndex: pageIndex,
        pageIndexChange: pageIndexChange
    }), !isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _small.PagesSmall, {
        pageCount: pageCount,
        pageIndex: pageIndex,
        pageIndexChange: pageIndexChange,
        pagesCountText: pagesCountText
    }), renderNextButton && (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
        label: getNextButtonLabel(),
        className: nextButtonProps.className,
        tabIndex: nextButtonProps.tabIndex,
        onClick: nextButtonProps.navigate
    })], 0)
};
exports.viewFunction = viewFunction;

function getIncrement(direction) {
    return "next" === direction ? 1 : -1
}
const PageIndexSelectorProps = exports.PageIndexSelectorProps = {
    isLargeDisplayMode: true
};
const PageIndexSelectorPropsType = {
    get pageIndex() {
        return _pager_props.InternalPagerProps.pageIndex
    },
    get maxPagesCount() {
        return _pager_props.InternalPagerProps.maxPagesCount
    },
    get pageCount() {
        return _pager_props.InternalPagerProps.pageCount
    },
    get hasKnownLastPage() {
        return _pager_props.InternalPagerProps.hasKnownLastPage
    },
    get showNavigationButtons() {
        return _pager_props.InternalPagerProps.showNavigationButtons
    },
    get totalCount() {
        return _pager_props.InternalPagerProps.totalCount
    },
    get isLargeDisplayMode() {
        return PageIndexSelectorProps.isLargeDisplayMode
    }
};
class PageIndexSelector extends _inferno2.BaseInfernoComponent {
    get config() {
        if (this.context[_config_context.ConfigContext.id]) {
            return this.context[_config_context.ConfigContext.id]
        }
        return _config_context.ConfigContext.defaultValue
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
        if (this.context[_config_context.ConfigContext.id] !== context[_config_context.ConfigContext.id] || this.props.hasKnownLastPage !== nextProps.hasKnownLastPage || this.props.pageCount !== nextProps.pageCount || this.props.pageIndex !== nextProps.pageIndex || this.props.pageIndexChange !== nextProps.pageIndexChange) {
            this.__getterCache.prevButtonProps = void 0
        }
        if (this.context[_config_context.ConfigContext.id] !== context[_config_context.ConfigContext.id] || this.props.hasKnownLastPage !== nextProps.hasKnownLastPage || this.props.pageCount !== nextProps.pageCount || this.props.pageIndex !== nextProps.pageIndex || this.props.pageIndexChange !== nextProps.pageIndexChange) {
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
exports.PageIndexSelector = PageIndexSelector;
PageIndexSelector.defaultProps = PageIndexSelectorPropsType;
