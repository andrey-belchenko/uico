/**
 * DevExtreme (esm/ui/validator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    data as elementData
} from "../core/element_data";
import Callbacks from "../core/utils/callbacks";
import errors from "./widget/ui.errors";
import DOMComponent from "../core/dom_component";
import {
    extend
} from "../core/utils/extend";
import {
    map
} from "../core/utils/iterator";
import ValidationEngine from "./validation_engine";
import DefaultAdapter from "./validation/default_adapter";
import registerComponent from "../core/component_registrator";
import {
    Deferred
} from "../core/utils/deferred";
import Guid from "../core/guid";
const VALIDATOR_CLASS = "dx-validator";
const VALIDATION_STATUS_VALID = "valid";
const VALIDATION_STATUS_INVALID = "invalid";
const VALIDATION_STATUS_PENDING = "pending";
const Validator = DOMComponent.inherit({
    _initOptions: function(options) {
        this.callBase.apply(this, arguments);
        this.option(ValidationEngine.initValidationOptions(options))
    },
    _getDefaultOptions() {
        return extend(this.callBase(), {
            validationRules: []
        })
    },
    _init() {
        this.callBase();
        this._initGroupRegistration();
        this.focused = Callbacks();
        this._initAdapter();
        this._validationInfo = {
            result: null,
            deferred: null,
            skipValidation: false
        }
    },
    _initGroupRegistration() {
        const group = this._findGroup();
        if (!this._groupWasInit) {
            this.on("disposing", (function(args) {
                ValidationEngine.removeRegisteredValidator(args.component._validationGroup, args.component)
            }))
        }
        if (!this._groupWasInit || this._validationGroup !== group) {
            ValidationEngine.removeRegisteredValidator(this._validationGroup, this);
            this._groupWasInit = true;
            this._validationGroup = group;
            ValidationEngine.registerValidatorInGroup(group, this)
        }
    },
    _setOptionsByReference() {
        this.callBase();
        extend(this._optionsByReference, {
            validationGroup: true
        })
    },
    _getEditor() {
        const element = this.$element()[0];
        return elementData(element, "dx-validation-target")
    },
    _initAdapter() {
        const dxStandardEditor = this._getEditor();
        let adapter = this.option("adapter");
        if (!adapter) {
            if (dxStandardEditor) {
                adapter = new DefaultAdapter(dxStandardEditor, this);
                adapter.validationRequestsCallbacks.push((args => {
                    if (this._validationInfo.skipValidation) {
                        return
                    }
                    this.validate(args)
                }));
                this.option("adapter", adapter);
                return
            }
            throw errors.Error("E0120")
        }
        const callbacks = adapter.validationRequestsCallbacks;
        if (callbacks) {
            callbacks.push((args => {
                this.validate(args)
            }))
        }
    },
    _toggleRTLDirection(isRtl) {
        var _this$option;
        const rtlEnabled = (null === (_this$option = this.option("adapter")) || void 0 === _this$option || null === (_this$option = _this$option.editor) || void 0 === _this$option ? void 0 : _this$option.option("rtlEnabled")) ?? isRtl;
        this.callBase(rtlEnabled)
    },
    _initMarkup() {
        this.$element().addClass("dx-validator");
        this.callBase()
    },
    _render() {
        this.callBase();
        this._toggleAccessibilityAttributes()
    },
    _toggleAccessibilityAttributes() {
        const dxStandardEditor = this._getEditor();
        if (dxStandardEditor) {
            const rules = this.option("validationRules") || [];
            const isRequired = rules.some((_ref => {
                let {
                    type: type
                } = _ref;
                return "required" === type
            })) || null;
            if (dxStandardEditor.isInitialized()) {
                dxStandardEditor.setAria("required", isRequired)
            }
            dxStandardEditor.option("_onMarkupRendered", (() => {
                dxStandardEditor.setAria("required", isRequired)
            }))
        }
    },
    _visibilityChanged(visible) {
        if (visible) {
            this._initGroupRegistration()
        }
    },
    _optionChanged(args) {
        switch (args.name) {
            case "validationGroup":
                this._initGroupRegistration();
                return;
            case "validationRules":
                this._resetValidationRules();
                this._toggleAccessibilityAttributes();
                void 0 !== this.option("isValid") && this.validate();
                return;
            case "adapter":
                this._initAdapter();
                break;
            case "isValid":
            case "validationStatus":
                this.option(ValidationEngine.synchronizeValidationOptions(args, this.option()));
                break;
            default:
                this.callBase(args)
        }
    },
    _getValidationRules() {
        if (!this._validationRules) {
            this._validationRules = map(this.option("validationRules"), ((rule, index) => extend({}, rule, {
                validator: this,
                index: index
            })))
        }
        return this._validationRules
    },
    _findGroup() {
        const $element = this.$element();
        return this.option("validationGroup") || ValidationEngine.findGroup($element, this._modelByElement($element))
    },
    _resetValidationRules() {
        delete this._validationRules
    },
    validate(args) {
        const adapter = this.option("adapter");
        const name = this.option("name");
        const bypass = adapter.bypass && adapter.bypass();
        const value = args && void 0 !== args.value ? args.value : adapter.getValue();
        const currentError = adapter.getCurrentValidationError && adapter.getCurrentValidationError();
        const rules = this._getValidationRules();
        const currentResult = this._validationInfo && this._validationInfo.result;
        if (currentResult && "pending" === currentResult.status && currentResult.value === value) {
            return extend({}, currentResult)
        }
        let result;
        if (bypass) {
            result = {
                isValid: true,
                status: "valid"
            }
        } else if (currentError && currentError.editorSpecific) {
            currentError.validator = this;
            result = {
                isValid: false,
                status: "invalid",
                brokenRule: currentError,
                brokenRules: [currentError]
            }
        } else {
            result = ValidationEngine.validate(value, rules, name)
        }
        result.id = (new Guid).toString();
        this._applyValidationResult(result, adapter);
        result.complete && result.complete.then((res => {
            if (res.id === this._validationInfo.result.id) {
                this._applyValidationResult(res, adapter)
            }
        }));
        return extend({}, this._validationInfo.result)
    },
    reset() {
        const adapter = this.option("adapter");
        const result = {
            id: null,
            isValid: true,
            brokenRule: null,
            brokenRules: null,
            pendingRules: null,
            status: "valid",
            complete: null
        };
        this._validationInfo.skipValidation = true;
        adapter.reset();
        this._validationInfo.skipValidation = false;
        this._resetValidationRules();
        this._applyValidationResult(result, adapter)
    },
    _updateValidationResult(result) {
        if (!this._validationInfo.result || this._validationInfo.result.id !== result.id) {
            const complete = this._validationInfo.deferred && this._validationInfo.result.complete;
            this._validationInfo.result = extend({}, result, {
                complete: complete
            })
        } else {
            for (const prop in result) {
                if ("id" !== prop && "complete" !== prop) {
                    this._validationInfo.result[prop] = result[prop]
                }
            }
        }
    },
    _applyValidationResult(result, adapter) {
        const validatedAction = this._createActionByOption("onValidated", {
            excludeValidators: ["readOnly"]
        });
        result.validator = this;
        this._updateValidationResult(result);
        adapter.applyValidationResults && adapter.applyValidationResults(this._validationInfo.result);
        this.option({
            validationStatus: this._validationInfo.result.status
        });
        if ("pending" === this._validationInfo.result.status) {
            if (!this._validationInfo.deferred) {
                this._validationInfo.deferred = new Deferred;
                this._validationInfo.result.complete = this._validationInfo.deferred.promise()
            }
            this._eventsStrategy.fireEvent("validating", [this._validationInfo.result]);
            return
        }
        if ("pending" !== this._validationInfo.result.status) {
            validatedAction(result);
            if (this._validationInfo.deferred) {
                this._validationInfo.deferred.resolve(result);
                this._validationInfo.deferred = null
            }
        }
    },
    focus() {
        const adapter = this.option("adapter");
        adapter && adapter.focus && adapter.focus()
    },
    _useTemplates: function() {
        return false
    }
});
registerComponent("dxValidator", Validator);
export default Validator;
