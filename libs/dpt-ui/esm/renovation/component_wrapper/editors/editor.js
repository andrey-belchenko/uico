/**
 * DevExtreme (esm/renovation/component_wrapper/editors/editor.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined
} from "../../../core/utils/type";
import Component from "../common/component";
import ValidationEngine from "../../../ui/validation_engine";
import {
    extend
} from "../../../core/utils/extend";
import $ from "../../../core/renderer";
import {
    data
} from "../../../core/element_data";
import Callbacks from "../../../core/utils/callbacks";
import OldEditor from "../../../ui/editor/editor";
import {
    querySelectorInSameDocument
} from "../../utils/dom";
const INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
const VALIDATION_TARGET = "dx-validation-target";
export default class Editor extends Component {
    getProps() {
        const props = super.getProps();
        props.onFocusIn = () => {
            const isValidationMessageShownOnFocus = "auto" === this.option("validationMessageMode");
            if (isValidationMessageShownOnFocus) {
                const $validationMessageWrapper = $(querySelectorInSameDocument(this.element(), ".dx-invalid-message.dx-overlay-wrapper"));
                null === $validationMessageWrapper || void 0 === $validationMessageWrapper || $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
                const timeToWaitBeforeShow = 150;
                if (this.showValidationMessageTimeout) {
                    clearTimeout(this.showValidationMessageTimeout)
                }
                this.showValidationMessageTimeout = setTimeout((() => {
                    null === $validationMessageWrapper || void 0 === $validationMessageWrapper || $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO)
                }), timeToWaitBeforeShow)
            }
        };
        props.saveValueChangeEvent = e => {
            this._valueChangeEventInstance = e
        };
        return props
    }
    _createElement(element) {
        super._createElement(element);
        this.showValidationMessageTimeout = void 0;
        this.validationRequest = Callbacks();
        data(this.$element()[0], VALIDATION_TARGET, this)
    }
    _render() {
        var _this$option;
        null === (_this$option = this.option("_onMarkupRendered")) || void 0 === _this$option || _this$option()
    }
    _init() {
        super._init();
        this._initialValue = this.option("value")
    }
    _initializeComponent() {
        super._initializeComponent();
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    }
    _initOptions(options) {
        super._initOptions(options);
        this.option(ValidationEngine.initValidationOptions(options))
    }
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            validationTooltipOptions: {}
        })
    }
    _bindInnerWidgetOptions(innerWidget, optionsContainer) {
        const innerWidgetOptions = extend({}, innerWidget.option());
        const syncOptions = () => this._silent(optionsContainer, innerWidgetOptions);
        syncOptions();
        innerWidget.on("optionChanged", syncOptions)
    }
    _raiseValidation(value, previousValue) {
        const areValuesEmpty = !isDefined(value) && !isDefined(previousValue);
        if (value !== previousValue && !areValuesEmpty) {
            this.validationRequest.fire({
                value: value,
                editor: this
            })
        }
    }
    _raiseValueChangeAction(value, previousValue) {
        var _this$_valueChangeAct;
        null === (_this$_valueChangeAct = this._valueChangeAction) || void 0 === _this$_valueChangeAct || _this$_valueChangeAct.call(this, {
            element: this.$element(),
            previousValue: previousValue,
            value: value,
            event: this._valueChangeEventInstance
        });
        this._valueChangeEventInstance = void 0
    }
    _optionChanged(option) {
        const {
            name: name,
            previousValue: previousValue,
            value: value
        } = option;
        if (name && void 0 !== this._getActionConfigs()[name]) {
            this._addAction(name)
        }
        switch (name) {
            case "value":
                this._raiseValidation(value, previousValue);
                this.option("isDirty", this._initialValue !== value);
                this._raiseValueChangeAction(value, previousValue);
                break;
            case "onValueChanged":
                this._valueChangeAction = this._createActionByOption("onValueChanged", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                break;
            case "isValid":
            case "validationError":
            case "validationErrors":
            case "validationStatus":
                this.option(ValidationEngine.synchronizeValidationOptions(option, this.option()))
        }
        super._optionChanged(option)
    }
    clear() {
        const {
            value: value
        } = this._getDefaultOptions();
        this.option({
            value: value
        })
    }
    reset() {
        let value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
        if (arguments.length) {
            this._initialValue = value
        }
        this.option("value", this._initialValue);
        this.option("isDirty", false);
        this.option("isValid", true)
    }
    _dispose() {
        super._dispose();
        data(this.element(), VALIDATION_TARGET, null);
        if (this.showValidationMessageTimeout) {
            clearTimeout(this.showValidationMessageTimeout)
        }
    }
}
const prevIsEditor = OldEditor.isEditor;
const newIsEditor = instance => prevIsEditor(instance) || instance instanceof Editor;
Editor.isEditor = newIsEditor;
OldEditor.isEditor = newIsEditor;
