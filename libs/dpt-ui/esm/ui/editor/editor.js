/**
 * DevExtreme (esm/ui/editor/editor.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import {
    data
} from "../../core/element_data";
import Callbacks from "../../core/utils/callbacks";
import {
    hasWindow
} from "../../core/utils/window";
import {
    addNamespace,
    normalizeKeyName
} from "../../events/utils/index";
import {
    extend
} from "../../core/utils/extend";
import Widget from "../widget/ui.widget";
import ValidationEngine from "../validation_engine";
import EventsEngine from "../../events/core/events_engine";
import ValidationMessage from "../validation_message";
import Guid from "../../core/guid";
import {
    noop
} from "../../core/utils/common";
import {
    resetActiveElement
} from "../../core/utils/dom";
const INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
const READONLY_STATE_CLASS = "dx-state-readonly";
const INVALID_CLASS = "dx-invalid";
const DX_INVALID_BADGE_CLASS = "dx-show-invalid-badge";
const VALIDATION_TARGET = "dx-validation-target";
const VALIDATION_STATUS_VALID = "valid";
const VALIDATION_STATUS_INVALID = "invalid";
const READONLY_NAMESPACE = "editorReadOnly";
const ALLOWED_STYLING_MODES = ["outlined", "filled", "underlined"];
const VALIDATION_MESSAGE_KEYS_MAP = {
    validationMessageMode: "mode",
    validationMessagePosition: "positionSide",
    validationMessageOffset: "offset",
    validationBoundary: "boundary"
};
const Editor = Widget.inherit({
    ctor: function() {
        this.showValidationMessageTimeout = null;
        this.validationRequest = Callbacks();
        this.callBase.apply(this, arguments)
    },
    _createElement: function(element) {
        this.callBase(element);
        const $element = this.$element();
        if ($element) {
            data($element[0], VALIDATION_TARGET, this)
        }
    },
    _initOptions: function(options) {
        this.callBase.apply(this, arguments);
        this.option(ValidationEngine.initValidationOptions(options))
    },
    _init: function() {
        this._initialValue = this.option("value");
        this.callBase();
        this._options.cache("validationTooltipOptions", this.option("validationTooltipOptions"));
        const $element = this.$element();
        $element.addClass(DX_INVALID_BADGE_CLASS)
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            value: null,
            name: "",
            onValueChanged: null,
            readOnly: false,
            isValid: true,
            validationError: null,
            validationErrors: null,
            validationStatus: "valid",
            validationMessageMode: "auto",
            validationMessagePosition: "bottom",
            validationBoundary: void 0,
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            validationTooltipOptions: {},
            _showValidationMessage: true,
            isDirty: false
        })
    },
    _attachKeyboardEvents: function() {
        if (!this.option("readOnly")) {
            this.callBase()
        }
    },
    _setOptionsByReference: function() {
        this.callBase();
        extend(this._optionsByReference, {
            validationError: true
        })
    },
    _createValueChangeAction: function() {
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _suppressValueChangeAction: function() {
        this._valueChangeActionSuppressed = true
    },
    _resumeValueChangeAction: function() {
        this._valueChangeActionSuppressed = false
    },
    _initMarkup: function() {
        var _this$option;
        this._toggleReadOnlyState();
        this._setSubmitElementName(this.option("name"));
        this.callBase();
        this._renderValidationState();
        null === (_this$option = this.option("_onMarkupRendered")) || void 0 === _this$option || _this$option()
    },
    _raiseValueChangeAction: function(value, previousValue) {
        if (!this._valueChangeAction) {
            this._createValueChangeAction()
        }
        this._valueChangeAction(this._valueChangeArgs(value, previousValue))
    },
    _valueChangeArgs: function(value, previousValue) {
        return {
            value: value,
            previousValue: previousValue,
            event: this._valueChangeEventInstance
        }
    },
    _saveValueChangeEvent: function(e) {
        this._valueChangeEventInstance = e
    },
    _focusInHandler: function(e) {
        const isValidationMessageShownOnFocus = "auto" === this.option("validationMessageMode");
        if (this._canValueBeChangedByClick() && isValidationMessageShownOnFocus) {
            var _this$_validationMess;
            const $validationMessageWrapper = null === (_this$_validationMess = this._validationMessage) || void 0 === _this$_validationMess ? void 0 : _this$_validationMess.$wrapper();
            null === $validationMessageWrapper || void 0 === $validationMessageWrapper || $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
            clearTimeout(this.showValidationMessageTimeout);
            this.showValidationMessageTimeout = setTimeout((() => null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO)), 150)
        }
        return this.callBase(e)
    },
    _canValueBeChangedByClick: function() {
        return false
    },
    _getStylingModePrefix: function() {
        return "dx-editor-"
    },
    _renderStylingMode: function() {
        const optionValue = this.option("stylingMode");
        const prefix = this._getStylingModePrefix();
        const allowedStylingClasses = ALLOWED_STYLING_MODES.map((mode => prefix + mode));
        allowedStylingClasses.forEach((className => this.$element().removeClass(className)));
        let stylingModeClass = prefix + optionValue;
        if (-1 === allowedStylingClasses.indexOf(stylingModeClass)) {
            const defaultOptionValue = this._getDefaultOptions().stylingMode;
            const platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules()).stylingMode;
            stylingModeClass = prefix + (platformOptionValue || defaultOptionValue)
        }
        this.$element().addClass(stylingModeClass)
    },
    _getValidationErrors: function() {
        let validationErrors = this.option("validationErrors");
        if (!validationErrors && this.option("validationError")) {
            validationErrors = [this.option("validationError")]
        }
        return validationErrors
    },
    _disposeValidationMessage: function() {
        if (this._$validationMessage) {
            this._$validationMessage.remove();
            this.setAria("describedby", null);
            this._$validationMessage = void 0;
            this._validationMessage = void 0
        }
    },
    _toggleValidationClasses: function(isInvalid) {
        this.$element().toggleClass("dx-invalid", isInvalid);
        this.setAria("invalid", isInvalid || void 0)
    },
    _renderValidationState: function() {
        const isValid = this.option("isValid") && "invalid" !== this.option("validationStatus");
        const validationErrors = this._getValidationErrors();
        const $element = this.$element();
        this._toggleValidationClasses(!isValid);
        if (!hasWindow() || false === this.option("_showValidationMessage")) {
            return
        }
        this._disposeValidationMessage();
        if (!isValid && validationErrors) {
            const {
                validationMessageMode: validationMessageMode,
                validationMessageOffset: validationMessageOffset,
                validationBoundary: validationBoundary,
                rtlEnabled: rtlEnabled
            } = this.option();
            this._$validationMessage = $("<div>").appendTo($element);
            const validationMessageContentId = `dx-${new Guid}`;
            this.setAria("describedby", validationMessageContentId);
            this._validationMessage = new ValidationMessage(this._$validationMessage, extend({
                validationErrors: validationErrors,
                rtlEnabled: rtlEnabled,
                target: this._getValidationMessageTarget(),
                visualContainer: $element,
                mode: validationMessageMode,
                positionSide: this._getValidationMessagePosition(),
                offset: validationMessageOffset,
                boundary: validationBoundary,
                contentId: validationMessageContentId
            }, this._options.cache("validationTooltipOptions")));
            this._bindInnerWidgetOptions(this._validationMessage, "validationTooltipOptions")
        }
    },
    _getValidationMessagePosition: function() {
        return this.option("validationMessagePosition")
    },
    _getValidationMessageTarget: function() {
        return this.$element()
    },
    _toggleReadOnlyState: function() {
        const readOnly = this.option("readOnly");
        this._toggleBackspaceHandler(readOnly);
        this.$element().toggleClass("dx-state-readonly", !!readOnly);
        this._setAriaReadonly(readOnly)
    },
    _setAriaReadonly(readOnly) {
        this.setAria("readonly", readOnly || void 0)
    },
    _toggleBackspaceHandler: function(isReadOnly) {
        const $eventTarget = this._keyboardEventBindingTarget();
        const eventName = addNamespace("keydown", "editorReadOnly");
        EventsEngine.off($eventTarget, eventName);
        if (isReadOnly) {
            EventsEngine.on($eventTarget, eventName, (e => {
                if ("backspace" === normalizeKeyName(e)) {
                    e.preventDefault()
                }
            }))
        }
    },
    _dispose: function() {
        const element = this.$element()[0];
        data(element, VALIDATION_TARGET, null);
        clearTimeout(this.showValidationMessageTimeout);
        this._disposeValidationMessage();
        this.callBase()
    },
    _setSubmitElementName: function(name) {
        const $submitElement = this._getSubmitElement();
        if (!$submitElement) {
            return
        }
        if (name.length > 0) {
            $submitElement.attr("name", name)
        } else {
            $submitElement.removeAttr("name")
        }
    },
    _getSubmitElement: function() {
        return null
    },
    _setValidationMessageOption: function(_ref) {
        var _this$_validationMess2;
        let {
            name: name,
            value: value
        } = _ref;
        const optionKey = VALIDATION_MESSAGE_KEYS_MAP[name] ? VALIDATION_MESSAGE_KEYS_MAP[name] : name;
        null === (_this$_validationMess2 = this._validationMessage) || void 0 === _this$_validationMess2 || _this$_validationMess2.option(optionKey, value)
    },
    _hasActiveElement: noop,
    _optionChanged: function(args) {
        var _this$_validationMess3;
        switch (args.name) {
            case "onValueChanged":
                this._createValueChangeAction();
                break;
            case "readOnly":
                this._toggleReadOnlyState();
                this._refreshFocusState();
                break;
            case "value":
                if (args.value != args.previousValue) {
                    this.option("isDirty", this._initialValue !== args.value);
                    this.validationRequest.fire({
                        value: args.value,
                        editor: this
                    })
                }
                if (!this._valueChangeActionSuppressed) {
                    this._raiseValueChangeAction(args.value, args.previousValue);
                    this._saveValueChangeEvent(void 0)
                }
                break;
            case "width":
                this.callBase(args);
                null === (_this$_validationMess3 = this._validationMessage) || void 0 === _this$_validationMess3 || _this$_validationMess3.updateMaxWidth();
                break;
            case "name":
                this._setSubmitElementName(args.value);
                break;
            case "isValid":
            case "validationError":
            case "validationErrors":
            case "validationStatus":
                this.option(ValidationEngine.synchronizeValidationOptions(args, this.option()));
                this._renderValidationState();
                break;
            case "validationBoundary":
            case "validationMessageMode":
            case "validationMessagePosition":
            case "validationMessageOffset":
                this._setValidationMessageOption(args);
                break;
            case "rtlEnabled":
                this._setValidationMessageOption(args);
                this.callBase(args);
                break;
            case "validationTooltipOptions":
                this._innerWidgetOptionChanged(this._validationMessage, args);
                break;
            case "_showValidationMessage":
            case "isDirty":
                break;
            default:
                this.callBase(args)
        }
    },
    _resetToInitialValue: function() {
        this.option("value", this._initialValue)
    },
    blur: function() {
        if (this._hasActiveElement()) {
            resetActiveElement()
        }
    },
    clear: function() {
        const defaultOptions = this._getDefaultOptions();
        this.option("value", defaultOptions.value)
    },
    reset: function() {
        let value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
        if (arguments.length) {
            this._initialValue = value
        }
        this._resetToInitialValue();
        this.option("isDirty", false);
        this.option("isValid", true)
    }
});
Editor.isEditor = instance => instance instanceof Editor;
export default Editor;
