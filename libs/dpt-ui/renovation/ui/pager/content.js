/**
 * DevExtreme (renovation/ui/pager/content.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.PagerContentProps = exports.PagerContent = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _info = require("./info");
var _page_index_selector = require("./pages/page_index_selector");
var _selector = require("./page_size/selector");
var _consts = require("./common/consts");
var _pager_props = require("./common/pager_props");
var _combine_classes = require("../../utils/combine_classes");
var _widget = require("../common/widget");
var _accessibility = require("../../../ui/shared/accessibility");
var _keyboard_action_context = require("./common/keyboard_action_context");
const _excluded = ["className", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "infoTextRef", "infoTextVisible", "isLargeDisplayMode", "label", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pageSizesRef", "pagesCountText", "pagesNavigatorVisible", "pagesRef", "rootElementRef", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];

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
const viewFunction = _ref => {
    let {
        aria: aria,
        classes: classes,
        infoVisible: infoVisible,
        isLargeDisplayMode: isLargeDisplayMode,
        pageIndexSelectorVisible: pageIndexSelectorVisible,
        pagesContainerVisibility: pagesContainerVisibility,
        pagesContainerVisible: pagesContainerVisible,
        props: {
            hasKnownLastPage: hasKnownLastPage,
            infoText: infoText,
            infoTextRef: infoTextRef,
            maxPagesCount: maxPagesCount,
            pageCount: pageCount,
            pageIndex: pageIndex,
            pageIndexChange: pageIndexChange,
            pageSize: pageSize,
            pageSizeChange: pageSizeChange,
            pageSizes: pageSizes,
            pageSizesRef: pageSizesRef,
            pagesCountText: pagesCountText,
            pagesRef: pagesRef,
            rtlEnabled: rtlEnabled,
            showNavigationButtons: showNavigationButtons,
            showPageSizes: showPageSizes,
            totalCount: totalCount,
            visible: visible
        },
        restAttributes: restAttributes,
        widgetRootElementRef: widgetRootElementRef
    } = _ref;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
        rootElementRef: widgetRootElementRef,
        rtlEnabled: rtlEnabled,
        classes: classes,
        visible: visible,
        aria: aria
    }, restAttributes, {
        children: [showPageSizes && (0, _inferno.createComponentVNode)(2, _selector.PageSizeSelector, {
            rootElementRef: pageSizesRef,
            isLargeDisplayMode: isLargeDisplayMode,
            pageSize: pageSize,
            pageSizeChange: pageSizeChange,
            pageSizes: pageSizes
        }), pagesContainerVisible && (0, _inferno.createVNode)(1, "div", _consts.PAGER_PAGES_CLASS, [infoVisible && (0, _inferno.createComponentVNode)(2, _info.InfoText, {
            rootElementRef: infoTextRef,
            infoText: infoText,
            pageCount: pageCount,
            pageIndex: pageIndex,
            totalCount: totalCount
        }), pageIndexSelectorVisible && (0, _inferno.createVNode)(1, "div", _consts.PAGER_PAGE_INDEXES_CLASS, (0, _inferno.createComponentVNode)(2, _page_index_selector.PageIndexSelector, {
            hasKnownLastPage: hasKnownLastPage,
            isLargeDisplayMode: isLargeDisplayMode,
            maxPagesCount: maxPagesCount,
            pageCount: pageCount,
            pageIndex: pageIndex,
            pageIndexChange: pageIndexChange,
            pagesCountText: pagesCountText,
            showNavigationButtons: showNavigationButtons,
            totalCount: totalCount
        }), 2, null, null, pagesRef)], 0, {
            style: (0, _inferno2.normalizeStyles)({
                visibility: pagesContainerVisibility
            })
        })]
    })))
};
exports.viewFunction = viewFunction;
const PagerContentProps = exports.PagerContentProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(_pager_props.InternalPagerProps), Object.getOwnPropertyDescriptors({
    infoTextVisible: true,
    isLargeDisplayMode: true
})));
class PagerContent extends _inferno2.InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.widgetRootElementRef = (0, _inferno.createRef)();
        this.__getterCache = {};
        this.setRootElementRef = this.setRootElementRef.bind(this);
        this.createFakeInstance = this.createFakeInstance.bind(this)
    }
    createEffects() {
        return [new _inferno2.InfernoEffect(this.setRootElementRef, [])]
    }
    getChildContext() {
        return _extends({}, this.context, {
            [_keyboard_action_context.KeyboardActionContext.id]: this.keyboardAction || _keyboard_action_context.KeyboardActionContext.defaultValue
        })
    }
    setRootElementRef() {
        const {
            rootElementRef: rootElementRef
        } = this.props;
        if (rootElementRef) {
            rootElementRef.current = this.widgetRootElementRef.current
        }
    }
    createFakeInstance() {
        return {
            option: () => false,
            element: () => this.widgetRootElementRef.current,
            _createActionByOption: () => e => {
                var _this$props$onKeyDown, _this$props;
                null === (_this$props$onKeyDown = (_this$props = this.props).onKeyDown) || void 0 === _this$props$onKeyDown || _this$props$onKeyDown.call(_this$props, e)
            }
        }
    }
    get keyboardAction() {
        if (void 0 !== this.__getterCache.keyboardAction) {
            return this.__getterCache.keyboardAction
        }
        return this.__getterCache.keyboardAction = (() => ({
            registerKeyboardAction: (element, action) => {
                const fakePagerInstance = this.createFakeInstance();
                return (0, _accessibility.registerKeyboardAction)("pager", fakePagerInstance, element, void 0, action)
            }
        }))()
    }
    get infoVisible() {
        const {
            infoTextVisible: infoTextVisible,
            showInfo: showInfo
        } = this.props;
        return showInfo && infoTextVisible
    }
    get pageIndexSelectorVisible() {
        return 0 !== this.props.pageSize
    }
    get normalizedDisplayMode() {
        const {
            displayMode: displayMode,
            lightModeEnabled: lightModeEnabled
        } = this.props;
        if ("adaptive" === displayMode && void 0 !== lightModeEnabled) {
            return lightModeEnabled ? "compact" : "full"
        }
        return displayMode
    }
    get pagesContainerVisible() {
        return !!this.props.pagesNavigatorVisible && this.props.pageCount > 0
    }
    get pagesContainerVisibility() {
        if ("auto" === this.props.pagesNavigatorVisible && 1 === this.props.pageCount && this.props.hasKnownLastPage) {
            return "hidden"
        }
        return
    }
    get isLargeDisplayMode() {
        const displayMode = this.normalizedDisplayMode;
        let result = false;
        if ("adaptive" === displayMode) {
            result = this.props.isLargeDisplayMode
        } else {
            result = "full" === displayMode
        }
        return result
    }
    get classes() {
        const classesMap = {
            [`${this.props.className}`]: !!this.props.className,
            [_consts.PAGER_CLASS]: true,
            [_consts.LIGHT_MODE_CLASS]: !this.isLargeDisplayMode
        };
        return (0, _combine_classes.combineClasses)(classesMap)
    }
    get aria() {
        return {
            role: "navigation",
            label: this.props.label
        }
    }
    get restAttributes() {
        const _this$props2 = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props2, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props.onKeyDown !== nextProps.onKeyDown) {
            this.__getterCache.keyboardAction = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            widgetRootElementRef: this.widgetRootElementRef,
            keyboardAction: this.keyboardAction,
            infoVisible: this.infoVisible,
            pageIndexSelectorVisible: this.pageIndexSelectorVisible,
            pagesContainerVisible: this.pagesContainerVisible,
            pagesContainerVisibility: this.pagesContainerVisibility,
            isLargeDisplayMode: this.isLargeDisplayMode,
            classes: this.classes,
            aria: this.aria,
            restAttributes: this.restAttributes
        })
    }
}
exports.PagerContent = PagerContent;
PagerContent.defaultProps = PagerContentProps;
