/**
 * DevExtreme (cjs/ui/html_editor/ui/formDialog.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _popup = _interopRequireDefault(require("../../popup"));
var _form = _interopRequireDefault(require("../../form"));
var _deferred = require("../../../core/utils/deferred");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _window = require("../../../core/utils/window");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _themes = require("../../themes");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
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
const DIALOG_CLASS = "dx-formdialog";
const FORM_CLASS = "dx-formdialog-form";
const DROPDOWN_EDITOR_OVERLAY_CLASS = "dx-dropdowneditor-overlay";
const getApplyButtonConfig = () => {
    if ((0, _themes.isFluent)()) {
        return {
            stylingMode: "contained",
            type: "default"
        }
    }
    return {}
};
const getCancelButtonConfig = () => {
    if ((0, _themes.isFluent)()) {
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
        const $container = (0, _renderer.default)("<div>").addClass(DIALOG_CLASS).appendTo(editorInstance.$element());
        const popupConfig = this._getPopupConfig();
        return editorInstance._createComponent($container, _popup.default, popupConfig)
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
        const screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)() : null;
        return "phone" === _devices.default.real().deviceType || "xs" === screenFactor
    }
    _getPopupConfig() {
        return (0, _extend.extend)({
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
                const $formContainer = (0, _renderer.default)("<div>").appendTo(contentElem);
                this._renderForm($formContainer, {
                    onEditorEnterKey: e => this.callAddButtonAction(e.event),
                    customizeItem: item => {
                        if ("simple" === item.itemType) {
                            item.editorOptions = (0, _extend.extend)(true, {}, item.editorOptions, {
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
                    text: _message.default.format("OK"),
                    onClick: e => this.callAddButtonAction(e.event)
                }, getApplyButtonConfig())
            }, {
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: _extends({
                    onInitialized: this._addEscapeHandler.bind(this),
                    text: _message.default.format("Cancel"),
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
        this._form = this._editorInstance._createComponent($container, _form.default, options);
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
            labelLocation: (0, _themes.isMaterialBased)() ? "top" : "left"
        }
    }
    formOption(optionName, optionValue) {
        return this._form.option.apply(this._form, arguments)
    }
    show(formUserConfig) {
        if (this._popup.option("visible")) {
            return
        }
        this.deferred = new _deferred.Deferred;
        const formConfig = (0, _extend.extend)(this._getDefaultFormOptions(), formUserConfig);
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
var _default = exports.default = FormDialog;
module.exports = exports.default;
module.exports.default = exports.default;
