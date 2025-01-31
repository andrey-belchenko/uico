/**
 * DevExtreme (esm/ui/html_editor/ui/formDialog.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from "../../../core/renderer";
import {
    extend
} from "../../../core/utils/extend";
import Popup from "../../popup";
import Form from "../../form";
import {
    Deferred
} from "../../../core/utils/deferred";
import localizationMessage from "../../../localization/message";
import {
    getCurrentScreenFactor,
    hasWindow
} from "../../../core/utils/window";
import devices from "../../../core/devices";
import {
    isFluent,
    isMaterialBased
} from "../../themes";
const DIALOG_CLASS = "dx-formdialog";
const FORM_CLASS = "dx-formdialog-form";
const DROPDOWN_EDITOR_OVERLAY_CLASS = "dx-dropdowneditor-overlay";
const getApplyButtonConfig = () => {
    if (isFluent()) {
        return {
            stylingMode: "contained",
            type: "default"
        }
    }
    return {}
};
const getCancelButtonConfig = () => {
    if (isFluent()) {
        return {
            stylingMode: "outlined",
            type: "normal"
        }
    }
    return {}
};
class FormDialog {
    constructor(editorInstance, popupConfig) {
        this._editorInstance = editorInstance;
        this._popupUserConfig = popupConfig;
        this._renderPopup();
        this._attachOptionChangedHandler()
    }
    _renderPopup() {
        const editorInstance = this._editorInstance;
        const $container = $("<div>").addClass(DIALOG_CLASS).appendTo(editorInstance.$element());
        const popupConfig = this._getPopupConfig();
        return editorInstance._createComponent($container, Popup, popupConfig)
    }
    _attachOptionChangedHandler() {
        var _this$_popup;
        null === (_this$_popup = this._popup) || void 0 === _this$_popup || _this$_popup.on("optionChanged", (_ref => {
            let {
                name: name,
                value: value
            } = _ref;
            if ("title" === name) {
                this._updateFormLabel(value)
            }
        }))
    }
    _escKeyHandler() {
        this._popup.hide()
    }
    _addEscapeHandler(e) {
        e.component.registerKeyHandler("escape", this._escKeyHandler.bind(this))
    }
    _isSmallScreen() {
        const screenFactor = hasWindow() ? getCurrentScreenFactor() : null;
        return "phone" === devices.real().deviceType || "xs" === screenFactor
    }
    _getPopupConfig() {
        return extend({
            onInitialized: e => {
                this._popup = e.component;
                this._popup.on("hiding", (() => this.onHiding()));
                this._popup.on("shown", (() => {
                    this._form.focus()
                }))
            },
            deferRendering: false,
            focusStateEnabled: false,
            showCloseButton: false,
            fullScreen: this._isSmallScreen(),
            contentTemplate: contentElem => {
                const $formContainer = $("<div>").appendTo(contentElem);
                this._renderForm($formContainer, {
                    onEditorEnterKey: e => this.callAddButtonAction(e.event),
                    customizeItem: item => {
                        if ("simple" === item.itemType) {
                            item.editorOptions = extend(true, {}, item.editorOptions, {
                                onInitialized: this._addEscapeHandler.bind(this)
                            })
                        }
                    }
                })
            },
            toolbarItems: [{
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: _extends({
                    onInitialized: this._addEscapeHandler.bind(this),
                    text: localizationMessage.format("OK"),
                    onClick: e => this.callAddButtonAction(e.event)
                }, getApplyButtonConfig())
            }, {
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: _extends({
                    onInitialized: this._addEscapeHandler.bind(this),
                    text: localizationMessage.format("Cancel"),
                    onClick: () => {
                        this._popup.hide()
                    }
                }, getCancelButtonConfig())
            }],
            _wrapperClassExternal: `${DIALOG_CLASS} dx-dropdowneditor-overlay`
        }, this._popupUserConfig)
    }
    onHiding() {
        this.beforeAddButtonAction = void 0;
        this.deferred.reject()
    }
    callAddButtonAction(event) {
        if (this.beforeAddButtonAction && !this.beforeAddButtonAction()) {
            return
        }
        this.hide(this._form.option("formData"), event)
    }
    _renderForm($container, options) {
        $container.addClass(FORM_CLASS);
        this._form = this._editorInstance._createComponent($container, Form, options);
        this._updateFormLabel()
    }
    _updateFormLabel(text) {
        var _this$_form;
        const label = text ?? this.popupOption("title");
        null === (_this$_form = this._form) || void 0 === _this$_form || _this$_form.$element().attr("aria-label", label)
    }
    _getDefaultFormOptions() {
        return {
            colCount: 1,
            width: "auto",
            labelLocation: isMaterialBased() ? "top" : "left"
        }
    }
    formOption(optionName, optionValue) {
        return this._form.option.apply(this._form, arguments)
    }
    show(formUserConfig) {
        if (this._popup.option("visible")) {
            return
        }
        this.deferred = new Deferred;
        const formConfig = extend(this._getDefaultFormOptions(), formUserConfig);
        this._form.option(formConfig);
        this._popup.show();
        return this.deferred.promise()
    }
    hide(formData, event) {
        this.deferred.resolve(formData, event);
        this._popup.hide()
    }
    popupOption(optionName, optionValue) {
        return this._popup.option.apply(this._popup, arguments)
    }
}
export default FormDialog;
