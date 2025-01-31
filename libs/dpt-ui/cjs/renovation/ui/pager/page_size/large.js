/**
 * DevExtreme (cjs/renovation/ui/pager/page_size/large.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.PageSizeLargeProps = exports.PageSizeLarge = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _combine_classes = require("../../../utils/combine_classes");
var _light_button = require("../common/light_button");
var _pager_props = require("../common/pager_props");
var _consts = require("../common/consts");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _string = require("../../../../core/utils/string");
const _excluded = ["pageSize", "pageSizeChange", "pageSizes"];

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
        pageSizesText: pageSizesText
    } = _ref;
    return (0, _inferno.createFragment)(pageSizesText.map((_ref2 => {
        let {
            className: className,
            click: click,
            label: label,
            text: text
        } = _ref2;
        return (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
            className: className,
            label: label,
            onClick: click,
            children: text
        }, text)
    })), 0)
};
exports.viewFunction = viewFunction;
const PageSizeLargeProps = exports.PageSizeLargeProps = {};
const PageSizeLargePropsType = {
    get pageSize() {
        return _pager_props.InternalPagerProps.pageSize
    }
};
class PageSizeLarge extends _inferno2.BaseInfernoComponent {
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
                const className = (0, _combine_classes.combineClasses)({
                    [selected ? _consts.PAGER_SELECTED_PAGE_SIZE_CLASS : _consts.PAGER_PAGE_SIZE_CLASS]: true,
                    [_consts.FIRST_CHILD_CLASS]: 0 === index
                });
                return {
                    className: className,
                    click: this.onPageSizeChange(processedPageSize),
                    label: (0, _string.format)(_message.default.getFormatter("dxPager-pageSize"), processedPageSize || _message.default.getFormatter("dxPager-pageSizesAllText")),
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
exports.PageSizeLarge = PageSizeLarge;
PageSizeLarge.defaultProps = PageSizeLargePropsType;
