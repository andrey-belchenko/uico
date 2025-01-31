/**
 * DevExtreme (cjs/renovation/ui/resizable/container.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.ResizableContainerProps = exports.ResizableContainer = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _handle = require("./handle");
var _combine_classes = require("../../utils/combine_classes");
var _visibility_change = require("../../../events/visibility_change");
var _utils = require("../../../core/options/utils");
const _excluded = ["children", "disabled", "handles", "height", "mainRef", "onResize", "onResizeEnd", "onResizeStart", "rtlEnabled", "width"];

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
const getCssClasses = (disabled, rtlEnabled, isResizing) => (0, _combine_classes.combineClasses)({
    "dx-resizable": true,
    "dx-state-disabled": disabled,
    "dx-rtl": rtlEnabled,
    "dx-resizable-resizing": isResizing
});
const viewFunction = viewModel => {
    const {
        cssClasses: cssClasses,
        handles: handles,
        mainContainerRef: mainContainerRef,
        onHandleResize: onHandleResize,
        onHandleResizeEnd: onHandleResizeEnd,
        onHandleResizeStart: onHandleResizeStart,
        props: props,
        restAttributes: restAttributes,
        styles: styles
    } = viewModel;
    const {
        children: children,
        disabled: disabled
    } = props;
    return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", cssClasses, [children, handles.map((handleType => (0, _inferno.createComponentVNode)(2, _handle.ResizableHandle, {
        onResizeStart: event => onHandleResizeStart(event, handleType),
        onResize: event => onHandleResize(event, handleType),
        onResizeEnd: event => onHandleResizeEnd(event, handleType),
        disabled: disabled,
        direction: handleType
    }, handleType)))], 0, _extends({
        style: (0, _inferno2.normalizeStyles)(styles)
    }, restAttributes), null, mainContainerRef))
};
exports.viewFunction = viewFunction;
const ResizableContainerProps = exports.ResizableContainerProps = {
    handles: Object.freeze([]),
    children: Object.freeze([]),
    rtlEnabled: false,
    disabled: false
};
class ResizableContainer extends _inferno2.InfernoComponent {
    constructor(props) {
        super(props);
        this.startX = Number.NaN;
        this.startY = Number.NaN;
        this.mainContainerRef = (0, _inferno.createRef)();
        this.__getterCache = {};
        this.state = {
            isResizing: false
        };
        this.forwardRefInitEffect = this.forwardRefInitEffect.bind(this);
        this.onHandleResizeStart = this.onHandleResizeStart.bind(this);
        this.onHandleResize = this.onHandleResize.bind(this);
        this.onHandleResizeEnd = this.onHandleResizeEnd.bind(this)
    }
    createEffects() {
        return [new _inferno2.InfernoEffect(this.forwardRefInitEffect, [])]
    }
    forwardRefInitEffect() {
        if (this.props.mainRef) {
            this.props.mainRef.current = this.mainContainerRef.current
        }
        return
    }
    onHandleResizeStart(event, handle) {
        var _this$props$onResizeS, _this$props;
        this.setState((__state_argument => ({
            isResizing: true
        })));
        this.startX = event.clientX;
        this.startY = event.clientY;
        null === (_this$props$onResizeS = (_this$props = this.props).onResizeStart) || void 0 === _this$props$onResizeS || _this$props$onResizeS.call(_this$props, {
            event: event,
            handle: handle
        });
        event.targetElements = [];
        return
    }
    onHandleResize(event, handle) {
        const {
            onResize: onResize
        } = this.props;
        null === onResize || void 0 === onResize || onResize({
            event: event,
            handle: handle,
            delta: {
                x: event.clientX - this.startX,
                y: event.clientY - this.startY
            }
        });
        (0, _visibility_change.triggerResizeEvent)(this.mainContainerRef.current);
        return
    }
    onHandleResizeEnd(event, handle) {
        var _this$props$onResizeE, _this$props2;
        this.setState((__state_argument => ({
            isResizing: false
        })));
        this.startX = Number.NaN;
        this.startY = Number.NaN;
        null === (_this$props$onResizeE = (_this$props2 = this.props).onResizeEnd) || void 0 === _this$props$onResizeE || _this$props$onResizeE.call(_this$props2, {
            event: event,
            handle: handle
        });
        return
    }
    get cssClasses() {
        const {
            disabled: disabled,
            rtlEnabled: rtlEnabled
        } = this.props;
        return getCssClasses(!!disabled, !!rtlEnabled, this.state.isResizing)
    }
    get styles() {
        const {
            height: height,
            width: width
        } = this.props;
        const style = this.restAttributes.style || {};
        return _extends({}, style, {
            height: height,
            width: width
        })
    }
    get handles() {
        if (void 0 !== this.__getterCache.handles) {
            return this.__getterCache.handles
        }
        return this.__getterCache.handles = (() => {
            let {
                handles: handles
            } = this.props;
            if ("string" === typeof handles) {
                handles = [handles]
            }
            const result = handles.map((handle => handle));
            if (result.includes("bottom")) {
                result.includes("right") && result.push("corner-bottom-right");
                result.includes("left") && result.push("corner-bottom-left")
            }
            if (result.includes("top")) {
                result.includes("right") && result.push("corner-top-right");
                result.includes("left") && result.push("corner-top-left")
            }
            return result
        })()
    }
    get restAttributes() {
        const _this$props3 = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props3, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props.handles !== nextProps.handles) {
            this.__getterCache.handles = void 0
        }
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            isResizing: this.state.isResizing,
            mainContainerRef: this.mainContainerRef,
            onHandleResizeStart: this.onHandleResizeStart,
            onHandleResize: this.onHandleResize,
            onHandleResizeEnd: this.onHandleResizeEnd,
            cssClasses: this.cssClasses,
            styles: this.styles,
            handles: this.handles,
            restAttributes: this.restAttributes
        })
    }
}
exports.ResizableContainer = ResizableContainer;
ResizableContainer.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(ResizableContainerProps), Object.getOwnPropertyDescriptors(_extends({}, (0, _utils.convertRulesToOptions)([])))));
const __defaultOptionRules = [];

function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    ResizableContainer.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(ResizableContainer.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)([])), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))))
}
