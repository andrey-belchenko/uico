/**
 * DevExtreme (esm/__internal/core/r1/template_wrapper.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["isEqual"];
import {
    InfernoComponent,
    InfernoEffect
} from "@dpt-ui/runtime/inferno";
import domAdapter from "../../../core/dom_adapter";
import {
    getPublicElement
} from "../../../core/element";
import $ from "../../../core/renderer";
import {
    replaceWith
} from "../../../core/utils/dom";
import {
    isDefined
} from "../../../core/utils/type";
import {
    findDOMfromVNode
} from "inferno";
import {
    shallowEquals
} from "./utils/shallow_equals";
const isDxElementWrapper = element => !!element.toArray;
export const buildTemplateArgs = (model, template) => {
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
const renderTemplateContent = (props, container) => {
    const {
        data: data,
        index: index
    } = props.model ?? {
        data: {}
    };
    if (data) {
        Object.keys(data).forEach((name => {
            if (data[name] && domAdapter.isNode(data[name])) {
                data[name] = getPublicElement($(data[name]))
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
    return isDxElementWrapper(rendered) ? rendered.toArray() : [$(rendered).get(0)]
};
const removeDifferentElements = (oldChildren, newChildren) => {
    newChildren.forEach((newElement => {
        const hasOldChild = !!oldChildren.find((oldElement => newElement === oldElement));
        if (!hasOldChild && newElement.parentNode) {
            $(newElement).remove()
        }
    }))
};
export class TemplateWrapper extends InfernoComponent {
    constructor(props) {
        super(props);
        this.renderTemplate = this.renderTemplate.bind(this)
    }
    renderTemplate() {
        const node = findDOMfromVNode(this.$LI, true);
        if (!(null !== node && void 0 !== node && node.parentNode)) {
            return () => {}
        }
        const container = node.parentNode;
        const $container = $(container);
        const $oldContainerContent = $container.contents().toArray();
        const content = renderTemplateContent(this.props, getPublicElement($container));
        replaceWith($(node), $(content));
        return () => {
            const $actualContainerContent = $(container).contents().toArray();
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
        const equalityComparer = isEqual ?? shallowEquals;
        if (template !== nextTemplate) {
            return true
        }
        if (!isDefined(model) || !isDefined(nextModel)) {
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
        return [new InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])]
    }
    updateEffects() {
        this._effects[0].update([this.props.template, this.props.model])
    }
    componentWillUnmount() {}
    render() {
        return null
    }
}
