/**
 * DevExtreme (esm/renovation/ui/form/wrapper/form.j.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../../core/component_registrator";
import BaseComponent from "../../../component_wrapper/common/component";
import {
    Form as FormComponent
} from "./form";
export default class Form extends BaseComponent {
    getProps() {
        const props = super.getProps();
        props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
        return props
    }
    _getActionConfigs() {
        return {
            onClick: {}
        }
    }
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: [],
            props: ["showValidationSummary", "scrollingEnabled", "showColonAfterLabel", "labelLocation", "colCountByScreen", "colCount", "items", "formData", "className", "accessKey", "activeStateEnabled", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width"]
        }
    }
    get _viewComponent() {
        return FormComponent
    }
}
registerComponent("dxForm", Form);
