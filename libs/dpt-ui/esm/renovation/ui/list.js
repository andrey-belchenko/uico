/**
 * DevExtreme (esm/renovation/ui/list.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "className", "dataSource", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "itemTemplate", "onClick", "onItemClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import LegacyList from "../../ui/list";
import {
    DomComponentWrapper
} from "./common/dom_component_wrapper";
import {
    BaseWidgetProps
} from "./common/base_props";
export const viewFunction = _ref => {
    let {
        componentProps: componentProps,
        restAttributes: restAttributes
    } = _ref;
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
        componentType: LegacyList,
        componentProps: componentProps,
        templateNames: ["itemTemplate"]
    }, restAttributes)))
};
export const ListProps = BaseWidgetProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class List extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    get componentProps() {
        return this.props
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
                itemTemplate: getTemplate(props.itemTemplate)
            }),
            componentProps: this.componentProps,
            restAttributes: this.restAttributes
        })
    }
}
List.defaultProps = ListProps;
