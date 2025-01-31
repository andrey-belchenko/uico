/**
 * DevExtreme (renovation/ui/box/box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.Box = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _widget = require("../common/widget");
var _box_props = require("./box_props");
var _combine_classes = require("../../utils/combine_classes");
const _excluded = ["align", "crossAlign", "direction"];

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
const viewFunction = viewModel => (0, _inferno.createComponentVNode)(2, _widget.Widget, {
    classes: viewModel.cssClasses,
    style: (0, _inferno2.normalizeStyles)(viewModel.cssStyles)
});
exports.viewFunction = viewFunction;
class Box extends _inferno2.InfernoWrapperComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    createEffects() {
        return [(0, _inferno2.createReRenderEffect)()]
    }
    get cssClasses() {
        return (0, _combine_classes.combineClasses)({
            "dx-box dx-box-flex": true
        })
    }
    get cssStyles() {
        const tryGetFromMap = (prop, map) => prop in map ? map[prop] : prop;
        return {
            display: "flex",
            flexDirection: {
                row: "row",
                col: "column"
            } [this.props.direction],
            justifyContent: tryGetFromMap(this.props.align, {
                start: "flex-start",
                end: "flex-end",
                center: "center",
                "space-between": "space-between",
                "space-around": "space-around"
            }),
            alignItems: tryGetFromMap(this.props.crossAlign, {
                start: "flex-start",
                end: "flex-end",
                center: "center",
                stretch: "stretch"
            })
        }
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
            cssClasses: this.cssClasses,
            cssStyles: this.cssStyles,
            restAttributes: this.restAttributes
        })
    }
}
exports.Box = Box;
Box.defaultProps = _box_props.BoxProps;
