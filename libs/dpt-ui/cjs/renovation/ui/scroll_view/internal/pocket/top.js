/**
 * DevExtreme (cjs/renovation/ui/scroll_view/internal/pocket/top.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.TopPocketProps = exports.TopPocket = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _load_indicator = require("../../../load_indicator");
var _combine_classes = require("../../../../utils/combine_classes");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _consts = require("../../common/consts");
var _themes = require("../../../../../ui/themes");
const _excluded = ["pocketState", "pocketTop", "pullDownIconAngle", "pullDownOpacity", "pullDownTranslateTop", "pulledDownText", "pullingDownText", "refreshStrategy", "refreshingText", "topPocketRef", "topPocketTranslateTop", "visible"];

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
const viewFunction = viewModel => {
    const {
        props: {
            pulledDownText: pulledDownText,
            pullingDownText: pullingDownText,
            refreshStrategy: refreshStrategy,
            refreshingText: refreshingText,
            topPocketRef: topPocketRef
        },
        pullDownClasses: pullDownClasses,
        pullDownIconStyles: pullDownIconStyles,
        pullDownRef: pullDownRef,
        pullDownStyles: pullDownStyles,
        readyVisibleClass: readyVisibleClass,
        refreshVisibleClass: refreshVisibleClass,
        releaseVisibleClass: releaseVisibleClass,
        topPocketClasses: topPocketClasses,
        topPocketStyles: topPocketStyles
    } = viewModel;
    return (0, _inferno.createVNode)(1, "div", topPocketClasses, (0, _inferno.createVNode)(1, "div", pullDownClasses, ["swipeDown" !== refreshStrategy && (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_IMAGE_CLASS), "swipeDown" === refreshStrategy && (0, _inferno.createVNode)(1, "div", _consts.PULLDOWN_ICON_CLASS, null, 1, {
        style: (0, _inferno2.normalizeStyles)(pullDownIconStyles)
    }), (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_INDICATOR_CLASS, (0, _inferno.createComponentVNode)(2, _load_indicator.LoadIndicator), 2), "swipeDown" !== refreshStrategy && (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_TEXT_CLASS, [(0, _inferno.createVNode)(1, "div", releaseVisibleClass, pullingDownText, 0), (0, _inferno.createVNode)(1, "div", readyVisibleClass, pulledDownText, 0), (0, _inferno.createVNode)(1, "div", refreshVisibleClass, refreshingText, 0)], 4)], 0, {
        style: (0, _inferno2.normalizeStyles)(pullDownStyles)
    }, null, pullDownRef), 2, {
        style: (0, _inferno2.normalizeStyles)(topPocketStyles)
    }, null, topPocketRef)
};
exports.viewFunction = viewFunction;
const TopPocketProps = exports.TopPocketProps = {
    get pullingDownText() {
        return (0, _themes.isMaterial)((0, _themes.current)()) ? "" : _message.default.format("dxScrollView-pullingDownText")
    },
    get pulledDownText() {
        return (0, _themes.isMaterial)((0, _themes.current)()) ? "" : _message.default.format("dxScrollView-pulledDownText")
    },
    get refreshingText() {
        return (0, _themes.isMaterial)((0, _themes.current)()) ? "" : _message.default.format("dxScrollView-refreshingText")
    },
    get pocketState() {
        return _consts.TopPocketState.STATE_RELEASED
    },
    pullDownTranslateTop: 0,
    pullDownIconAngle: 0,
    pullDownOpacity: 0,
    pocketTop: 0,
    topPocketTranslateTop: 0,
    visible: true
};
class TopPocket extends _inferno2.BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.pullDownRef = (0, _inferno.createRef)();
        this.__getterCache = {}
    }
    get releaseVisibleClass() {
        return this.props.pocketState === _consts.TopPocketState.STATE_RELEASED ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : void 0
    }
    get readyVisibleClass() {
        return this.props.pocketState === _consts.TopPocketState.STATE_READY ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : void 0
    }
    get refreshVisibleClass() {
        return this.props.pocketState === _consts.TopPocketState.STATE_REFRESHING ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : void 0
    }
    get pullDownClasses() {
        const {
            pocketState: pocketState,
            visible: visible
        } = this.props;
        const classesMap = {
            [_consts.SCROLLVIEW_PULLDOWN]: true,
            [_consts.SCROLLVIEW_PULLDOWN_READY_CLASS]: pocketState === _consts.TopPocketState.STATE_READY,
            [_consts.SCROLLVIEW_PULLDOWN_LOADING_CLASS]: pocketState === _consts.TopPocketState.STATE_REFRESHING,
            "dx-state-invisible": !visible
        };
        return (0, _combine_classes.combineClasses)(classesMap)
    }
    get topPocketClasses() {
        const classesMap = {
            [_consts.SCROLLVIEW_TOP_POCKET_CLASS]: true,
            "dx-state-invisible": !this.props.visible
        };
        return (0, _combine_classes.combineClasses)(classesMap)
    }
    get pullDownStyles() {
        if (void 0 !== this.__getterCache.pullDownStyles) {
            return this.__getterCache.pullDownStyles
        }
        return this.__getterCache.pullDownStyles = (() => {
            if ("swipeDown" === this.props.refreshStrategy) {
                return {
                    opacity: this.props.pullDownOpacity,
                    transform: `translate(0px, ${this.props.pullDownTranslateTop}px)`
                }
            }
            return
        })()
    }
    get topPocketStyles() {
        if (void 0 !== this.__getterCache.topPocketStyles) {
            return this.__getterCache.topPocketStyles
        }
        return this.__getterCache.topPocketStyles = (() => {
            if ("pullDown" === this.props.refreshStrategy) {
                return {
                    top: -this.props.pocketTop + "px",
                    transform: `translate(0px, ${this.props.topPocketTranslateTop}px)`
                }
            }
            return
        })()
    }
    get pullDownIconStyles() {
        if (void 0 !== this.__getterCache.pullDownIconStyles) {
            return this.__getterCache.pullDownIconStyles
        }
        return this.__getterCache.pullDownIconStyles = (() => ({
            transform: `rotate(${this.props.pullDownIconAngle}deg)`
        }))()
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.refreshStrategy !== nextProps.refreshStrategy || this.props.pullDownOpacity !== nextProps.pullDownOpacity || this.props.pullDownTranslateTop !== nextProps.pullDownTranslateTop) {
            this.__getterCache.pullDownStyles = void 0
        }
        if (this.props.refreshStrategy !== nextProps.refreshStrategy || this.props.pocketTop !== nextProps.pocketTop || this.props.topPocketTranslateTop !== nextProps.topPocketTranslateTop) {
            this.__getterCache.topPocketStyles = void 0
        }
        if (this.props.pullDownIconAngle !== nextProps.pullDownIconAngle) {
            this.__getterCache.pullDownIconStyles = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            pullDownRef: this.pullDownRef,
            releaseVisibleClass: this.releaseVisibleClass,
            readyVisibleClass: this.readyVisibleClass,
            refreshVisibleClass: this.refreshVisibleClass,
            pullDownClasses: this.pullDownClasses,
            topPocketClasses: this.topPocketClasses,
            pullDownStyles: this.pullDownStyles,
            topPocketStyles: this.topPocketStyles,
            pullDownIconStyles: this.pullDownIconStyles,
            restAttributes: this.restAttributes
        })
    }
}
exports.TopPocket = TopPocket;
TopPocket.defaultProps = TopPocketProps;
