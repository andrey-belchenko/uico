/**
 * DevExtreme (cjs/__internal/core/r1/template_wrapper.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildTemplateArgs = exports.TemplateWrapper = void 0;
var _inferno = require("@dpt-ui/runtime/inferno");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _dom = require("../../../core/utils/dom");
var _type = require("../../../core/utils/type");
var _inferno2 = require("inferno");
var _shallow_equals = require("./utils/shallow_equals");
const _excluded = ["isEqual"];

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
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
const isDxElementWrapper = element => !!element.toArray;
const buildTemplateArgs = (model, template) => {
    const args = {
        template: template,
        model: _extends({}, model)
    };
    const _ref = model.data ?? {},
        {
            isEqual: isEqual
        } = _ref,
        data = _objectWithoutPropertiesLoose(_ref, _excluded);
    if (isEqual) {
        args.model.data = data;
        args.isEqual = isEqual
    }
    return args
};
exports.buildTemplateArgs = buildTemplateArgs;
const renderTemplateContent = (props, container) => {
    const {
        data: data,
        index: index
    } = props.model ?? {
        data: {}
    };
    if (data) {
        Object.keys(data).forEach((name => {
            if (data[name] && _dom_adapter.default.isNode(data[name])) {
                data[name] = (0, _element.getPublicElement)((0, _renderer.default)(data[name]))
            }
        }))
    }
    const rendered = props.template.render(_extends({
        container: container,
        transclude: props.transclude
    }, {
        renovated: props.renovated
    }, !props.transclude ? {
        model: data
    } : {}, !props.transclude && Number.isFinite(index) ? {
        index: index
    } : {}));
    if (void 0 === rendered) {
        return []
    }
    return isDxElementWrapper(rendered) ? rendered.toArray() : [(0, _renderer.default)(rendered).get(0)]
};
const removeDifferentElements = (oldChildren, newChildren) => {
    newChildren.forEach((newElement => {
        const hasOldChild = !!oldChildren.find((oldElement => newElement === oldElement));
        if (!hasOldChild && newElement.parentNode) {
            (0, _renderer.default)(newElement).remove()
        }
    }))
};
class TemplateWrapper extends _inferno.InfernoComponent {
    constructor(props) {
        super(props);
        this.renderTemplate = this.renderTemplate.bind(this)
    }
    renderTemplate() {
        const node = (0, _inferno2.findDOMfromVNode)(this.$LI, true);
        if (!(null !== node && void 0 !== node && node.parentNode)) {
            return () => {}
        }
        const container = node.parentNode;
        const $container = (0, _renderer.default)(container);
        const $oldContainerContent = $container.contents().toArray();
        const content = renderTemplateContent(this.props, (0, _element.getPublicElement)($container));
        (0, _dom.replaceWith)((0, _renderer.default)(node), (0, _renderer.default)(content));
        return () => {
            const $actualContainerContent = (0, _renderer.default)(container).contents().toArray();
            removeDifferentElements($oldContainerContent, $actualContainerContent);
            container.appendChild(node)
        }
    }
    shouldComponentUpdate(nextProps) {
        const {
            template: template,
            model: model
        } = this.props;
        const {
            template: nextTemplate,
            model: nextModel,
            isEqual: isEqual
        } = nextProps;
        const equalityComparer = isEqual ?? _shallow_equals.shallowEquals;
        if (template !== nextTemplate) {
            return true
        }
        if (!(0, _type.isDefined)(model) || !(0, _type.isDefined)(nextModel)) {
            return model !== nextModel
        }
        const {
            data: data,
            index: index
        } = model;
        const {
            data: nextData,
            index: nextIndex
        } = nextModel;
        if (index !== nextIndex) {
            return true
        }
        return !equalityComparer(data, nextData)
    }
    createEffects() {
        return [new _inferno.InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])]
    }
    updateEffects() {
        this._effects[0].update([this.props.template, this.props.model])
    }
    componentWillUnmount() {}
    render() {
        return null
    }
}
exports.TemplateWrapper = TemplateWrapper;
