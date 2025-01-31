/**
 * DevExtreme (renovation/ui/common/icon.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.viewFunction = exports.IconProps = exports.Icon = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _icon = require("../../../core/utils/icon");
var _combine_classes = require("../../utils/combine_classes");
const _excluded = ["iconTemplate", "position", "source"];

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
        iconClassName: iconClassName,
        props: {
            iconTemplate: IconTemplate,
            source: source
        },
        sourceType: sourceType
    } = _ref;
    return (0, _inferno.createFragment)(["dxIcon" === sourceType && (0, _inferno.createVNode)(1, "i", iconClassName), "fontIcon" === sourceType && (0, _inferno.createVNode)(1, "i", iconClassName), "image" === sourceType && (0, _inferno.createVNode)(1, "img", iconClassName, null, 1, {
        alt: "",
        src: source
    }), IconTemplate && (0, _inferno.createVNode)(1, "i", iconClassName, IconTemplate({}), 0)], 0)
};
exports.viewFunction = viewFunction;
const IconProps = exports.IconProps = {
    position: "left",
    source: ""
};
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
class Icon extends _inferno2.BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    get sourceType() {
        return (0, _icon.getImageSourceType)(this.props.source)
    }
    get cssClass() {
        return "left" !== this.props.position ? "dx-icon-right" : ""
    }
    get iconClassName() {
        const generalClasses = {
            "dx-icon": true,
            [this.cssClass]: !!this.cssClass
        };
        const {
            source: source
        } = this.props;
        if ("dxIcon" === this.sourceType) {
            return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
                [`dx-icon-${source}`]: true
            }))
        }
        if ("fontIcon" === this.sourceType) {
            return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
                [String(source)]: !!source
            }))
        }
        if ("image" === this.sourceType) {
            return (0, _combine_classes.combineClasses)(generalClasses)
        }
        if ("svg" === this.sourceType) {
            return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
                "dx-svg-icon": true
            }))
        }
        return ""
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                iconTemplate: getTemplate(props.iconTemplate)
            }),
            sourceType: this.sourceType,
            cssClass: this.cssClass,
            iconClassName: this.iconClassName,
            restAttributes: this.restAttributes
        })
    }
}
exports.Icon = Icon;
Icon.defaultProps = IconProps;
