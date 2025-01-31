/**
 * DevExtreme (esm/renovation/ui/editors/common/editor.j.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../../core/component_registrator";
import EditorWrapperComponent from "../../../component_wrapper/editors/editor";
import {
    Editor as EditorComponent,
    defaultOptions
} from "./editor";
export default class Editor extends EditorWrapperComponent {
    getProps() {
        const props = super.getProps();
        props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
        return props
    }
    focus() {
        var _this$viewRef;
        return null === (_this$viewRef = this.viewRef) || void 0 === _this$viewRef ? void 0 : _this$viewRef.focus(...arguments)
    }
    blur() {
        var _this$viewRef2;
        return null === (_this$viewRef2 = this.viewRef) || void 0 === _this$viewRef2 ? void 0 : _this$viewRef2.blur(...arguments)
    }
    _getActionConfigs() {
        return {
            onFocusIn: {},
            onClick: {}
        }
    }
    get _propsInfo() {
        return {
            twoWay: [
                ["value", "defaultValue", "valueChange"]
            ],
            allowNull: ["validationError", "validationErrors"],
            elements: [],
            templates: [],
            props: ["readOnly", "name", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "isValid", "isDirty", "inputAttr", "onFocusIn", "defaultValue", "valueChange", "className", "accessKey", "activeStateEnabled", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width", "aria", "classes", "value"]
        }
    }
    get _viewComponent() {
        return EditorComponent
    }
}
registerComponent("dxEditor", Editor);
Editor.defaultOptions = defaultOptions;
