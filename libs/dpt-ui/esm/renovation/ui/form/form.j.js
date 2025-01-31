/**
 * DevExtreme (esm/renovation/ui/form/form.j.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import BaseComponent from "../../component_wrapper/common/component";
import {
    Form as FormComponent
} from "./form";
export default class Form extends BaseComponent {
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: [],
            props: ["scrollingEnabled", "useNativeScrolling", "screenByWidth"]
        }
    }
    get _viewComponent() {
        return FormComponent
    }
}
registerComponent("dxForm", Form);
