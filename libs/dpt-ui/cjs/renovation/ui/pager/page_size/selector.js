/**
 * DevExtreme (cjs/renovation/ui/pager/page_size/selector.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.PageSizeSelector = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _small = require("./small");
var _large = require("./large");
var _pager_props = require("../common/pager_props");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _consts = require("../common/consts");
const _excluded = ["isLargeDisplayMode", "pageSize", "pageSizeChange", "pageSizes", "rootElementRef"];

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
const viewFunction = _ref => {
    let {
        htmlRef: htmlRef,
        normalizedPageSizes: normalizedPageSizes,
        props: {
            isLargeDisplayMode: isLargeDisplayMode,
            pageSize: pageSize,
            pageSizeChange: pageSizeChange
        }
    } = _ref;
    return (0, _inferno.createVNode)(1, "div", _consts.PAGER_PAGE_SIZES_CLASS, [isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _large.PageSizeLarge, {
        pageSizes: normalizedPageSizes,
        pageSize: pageSize,
        pageSizeChange: pageSizeChange
    }), !isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _small.PageSizeSmall, {
        parentRef: htmlRef,
        pageSizes: normalizedPageSizes,
        pageSize: pageSize,
        pageSizeChange: pageSizeChange
    })], 0, null, null, htmlRef)
};
exports.viewFunction = viewFunction;

function getAllText() {
    return _message.default.getFormatter("dxPager-pageSizesAllText")()
}
const PageSizeSelectorProps = {
    isLargeDisplayMode: true
};
const PageSizeSelectorPropsType = {
    get pageSize() {
        return _pager_props.InternalPagerProps.pageSize
    },
    get pageSizes() {
        return _pager_props.InternalPagerProps.pageSizes
    },
    get isLargeDisplayMode() {
        return PageSizeSelectorProps.isLargeDisplayMode
    }
};
class PageSizeSelector extends _inferno2.InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.htmlRef = (0, _inferno.createRef)();
        this.__getterCache = {};
        this.setRootElementRef = this.setRootElementRef.bind(this)
    }
    createEffects() {
        return [new _inferno2.InfernoEffect(this.setRootElementRef, [])]
    }
    setRootElementRef() {
        const {
            rootElementRef: rootElementRef
        } = this.props;
        if (rootElementRef) {
            rootElementRef.current = this.htmlRef.current
        }
    }
    get normalizedPageSizes() {
        if (void 0 !== this.__getterCache.normalizedPageSizes) {
            return this.__getterCache.normalizedPageSizes
        }
        return this.__getterCache.normalizedPageSizes = (() => {
            const {
                pageSizes: pageSizes
            } = this.props;
            return pageSizes.map((p => "all" === p || 0 === p ? {
                text: getAllText(),
                value: 0
            } : {
                text: String(p),
                value: p
            }))
        })()
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props.pageSizes !== nextProps.pageSizes) {
            this.__getterCache.normalizedPageSizes = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            htmlRef: this.htmlRef,
            normalizedPageSizes: this.normalizedPageSizes,
            restAttributes: this.restAttributes
        })
    }
}
exports.PageSizeSelector = PageSizeSelector;
PageSizeSelector.defaultProps = PageSizeSelectorPropsType;
