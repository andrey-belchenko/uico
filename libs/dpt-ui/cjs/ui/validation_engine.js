/**
 * DevExtreme (cjs/ui/validation_engine.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _class = _interopRequireDefault(require("../core/class"));
var _extend = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _events_strategy = require("../core/events_strategy");
var _errors = _interopRequireDefault(require("../core/errors"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _number = _interopRequireDefault(require("../localization/number"));
var _message = _interopRequireDefault(require("../localization/message"));
var _deferred = require("../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const EMAIL_VALIDATION_REGEX = /^[\d\w.+_-]+@[\d\w._-]+\.[\w]+$/i;
const STATUS = {
    valid: "valid",
    invalid: "invalid",
    pending: "pending"
};
class BaseRuleValidator {
    constructor() {
        this.NAME = "base"
    }
    defaultMessage(value) {
        return _message.default.getFormatter(`validation-${this.NAME}`)(value)
    }
    defaultFormattedMessage(value) {
        return _message.default.getFormatter(`validation-${this.NAME}-formatted`)(value)
    }
    _isValueEmpty(value) {
        return !rulesValidators.required.validate(value, {})
    }
    validate(value, rule) {
        const valueArray = Array.isArray(value) ? value : [value];
        let result = true;
        if (valueArray.length) {
            valueArray.every((itemValue => {
                result = this._validate(itemValue, rule);
                return result
            }))
        } else {
            result = this._validate(null, rule)
        }
        return result
    }
}
class RequiredRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "required"
    }
    _validate(value, rule) {
        if (!(0, _type.isDefined)(value)) {
            return false
        }
        if (false === value) {
            return false
        }
        value = String(value);
        if (rule.trim || !(0, _type.isDefined)(rule.trim)) {
            value = value.trim()
        }
        return "" !== value
    }
}
class NumericRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "numeric"
    }
    _validate(value, rule) {
        if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        if (rule.useCultureSettings && (0, _type.isString)(value)) {
            return !isNaN(_number.default.parse(value))
        } else {
            return (0, _type.isNumeric)(value)
        }
    }
}
class RangeRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "range"
    }
    _validate(value, rule) {
        if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        const validNumber = rulesValidators.numeric.validate(value, rule);
        const validValue = (0, _type.isDefined)(value) && "" !== value;
        const number = validNumber ? parseFloat(value) : validValue && value.valueOf();
        const min = rule.min;
        const max = rule.max;
        if (!(validNumber || (0, _type.isDate)(value)) && !validValue) {
            return false
        }
        if ((0, _type.isDefined)(min)) {
            if ((0, _type.isDefined)(max)) {
                return number >= min && number <= max
            }
            return number >= min
        } else if ((0, _type.isDefined)(max)) {
            return number <= max
        } else {
            throw _errors.default.Error("E0101")
        }
    }
}
class StringLengthRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "stringLength"
    }
    _validate(value, rule) {
        value = String(value ?? "");
        if (rule.trim || !(0, _type.isDefined)(rule.trim)) {
            value = value.trim()
        }
        if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        return rulesValidators.range.validate(value.length, (0, _extend.extend)({}, rule))
    }
}
class CustomRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "custom"
    }
    validate(value, rule) {
        if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        const validator = rule.validator;
        const dataGetter = validator && (0, _type.isFunction)(validator.option) && validator.option("dataGetter");
        const extraParams = (0, _type.isFunction)(dataGetter) && dataGetter();
        const params = {
            value: value,
            validator: validator,
            rule: rule
        };
        if (extraParams) {
            (0, _extend.extend)(params, extraParams)
        }
        return rule.validationCallback(params)
    }
}
class AsyncRuleValidator extends CustomRuleValidator {
    constructor() {
        super();
        this.NAME = "async"
    }
    validate(value, rule) {
        if (!(0, _type.isDefined)(rule.reevaluate)) {
            (0, _extend.extend)(rule, {
                reevaluate: true
            })
        }
        if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        const validator = rule.validator;
        const dataGetter = validator && (0, _type.isFunction)(validator.option) && validator.option("dataGetter");
        const extraParams = (0, _type.isFunction)(dataGetter) && dataGetter();
        const params = {
            value: value,
            validator: validator,
            rule: rule
        };
        if (extraParams) {
            (0, _extend.extend)(params, extraParams)
        }
        const callbackResult = rule.validationCallback(params);
        if (!(0, _type.isPromise)(callbackResult)) {
            throw _errors.default.Error("E0103")
        }
        return this._getWrappedPromise((0, _deferred.fromPromise)(callbackResult).promise())
    }
    _getWrappedPromise(promise) {
        const deferred = new _deferred.Deferred;
        promise.then((function(res) {
            deferred.resolve(res)
        }), (function(err) {
            const res = {
                isValid: false
            };
            if ((0, _type.isDefined)(err)) {
                if ((0, _type.isString)(err)) {
                    res.message = err
                } else if ((0, _type.isObject)(err) && (0, _type.isDefined)(err.message) && (0, _type.isString)(err.message)) {
                    res.message = err.message
                }
            }
            deferred.resolve(res)
        }));
        return deferred.promise()
    }
}
class CompareRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "compare"
    }
    _validate(value, rule) {
        if (!rule.comparisonTarget) {
            throw _errors.default.Error("E0102")
        }
        if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }(0, _extend.extend)(rule, {
            reevaluate: true
        });
        const otherValue = rule.comparisonTarget();
        const type = rule.comparisonType || "==";
        switch (type) {
            case "==":
                return value == otherValue;
            case "!=":
                return value != otherValue;
            case "===":
                return value === otherValue;
            case "!==":
                return value !== otherValue;
            case ">":
                return value > otherValue;
            case ">=":
                return value >= otherValue;
            case "<":
                return value < otherValue;
            case "<=":
                return value <= otherValue
        }
    }
}
class PatternRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "pattern"
    }
    _validate(value, rule) {
        if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        let pattern = rule.pattern;
        if ((0, _type.isString)(pattern)) {
            pattern = new RegExp(pattern)
        }
        return pattern.test(value)
    }
}
class EmailRuleValidator extends BaseRuleValidator {
    constructor() {
        super();
        this.NAME = "email"
    }
    _validate(value, rule) {
        if (false !== rule.ignoreEmptyValue && this._isValueEmpty(value)) {
            return true
        }
        return rulesValidators.pattern.validate(value, (0, _extend.extend)({}, rule, {
            pattern: EMAIL_VALIDATION_REGEX
        }))
    }
}
const rulesValidators = {
    required: new RequiredRuleValidator,
    numeric: new NumericRuleValidator,
    range: new RangeRuleValidator,
    stringLength: new StringLengthRuleValidator,
    custom: new CustomRuleValidator,
    async: new AsyncRuleValidator,
    compare: new CompareRuleValidator,
    pattern: new PatternRuleValidator,
    email: new EmailRuleValidator
};
const GroupConfig = _class.default.inherit({
    ctor(group) {
        this.group = group;
        this.validators = [];
        this._pendingValidators = [];
        this._onValidatorStatusChanged = this._onValidatorStatusChanged.bind(this);
        this._resetValidationInfo();
        this._eventsStrategy = new _events_strategy.EventsStrategy(this)
    },
    validate() {
        const result = {
            isValid: true,
            brokenRules: [],
            validators: [],
            status: STATUS.valid,
            complete: null
        };
        this._unsubscribeFromAllChangeEvents();
        this._pendingValidators = [];
        this._resetValidationInfo();
        (0, _iterator.each)(this.validators, ((_, validator) => {
            const validatorResult = validator.validate();
            result.isValid = result.isValid && validatorResult.isValid;
            if (validatorResult.brokenRules) {
                result.brokenRules = result.brokenRules.concat(validatorResult.brokenRules)
            }
            result.validators.push(validator);
            if (validatorResult.status === STATUS.pending) {
                this._addPendingValidator(validator)
            }
            this._subscribeToChangeEvents(validator)
        }));
        if (this._pendingValidators.length) {
            result.status = STATUS.pending
        } else {
            result.status = result.isValid ? STATUS.valid : STATUS.invalid;
            this._unsubscribeFromAllChangeEvents();
            this._raiseValidatedEvent(result)
        }
        this._updateValidationInfo(result);
        return (0, _extend.extend)({}, this._validationInfo.result)
    },
    _subscribeToChangeEvents(validator) {
        validator.on("validating", this._onValidatorStatusChanged);
        validator.on("validated", this._onValidatorStatusChanged)
    },
    _unsubscribeFromChangeEvents(validator) {
        validator.off("validating", this._onValidatorStatusChanged);
        validator.off("validated", this._onValidatorStatusChanged)
    },
    _unsubscribeFromAllChangeEvents() {
        (0, _iterator.each)(this.validators, ((_, validator) => {
            this._unsubscribeFromChangeEvents(validator)
        }))
    },
    _updateValidationInfo(result) {
        this._validationInfo.result = result;
        if (result.status !== STATUS.pending) {
            return
        }
        if (!this._validationInfo.deferred) {
            this._validationInfo.deferred = new _deferred.Deferred;
            this._validationInfo.result.complete = this._validationInfo.deferred.promise()
        }
    },
    _addPendingValidator(validator) {
        const foundValidator = (0, _common.grep)(this._pendingValidators, (function(val) {
            return val === validator
        }))[0];
        if (!foundValidator) {
            this._pendingValidators.push(validator)
        }
    },
    _removePendingValidator(validator) {
        const index = this._pendingValidators.indexOf(validator);
        if (index >= 0) {
            this._pendingValidators.splice(index, 1)
        }
    },
    _orderBrokenRules(brokenRules) {
        let orderedRules = [];
        (0, _iterator.each)(this.validators, (function(_, validator) {
            const foundRules = (0, _common.grep)(brokenRules, (function(rule) {
                return rule.validator === validator
            }));
            if (foundRules.length) {
                orderedRules = orderedRules.concat(foundRules)
            }
        }));
        return orderedRules
    },
    _updateBrokenRules(result) {
        if (!this._validationInfo.result) {
            return
        }
        let brokenRules = this._validationInfo.result.brokenRules;
        const rules = (0, _common.grep)(brokenRules, (function(rule) {
            return rule.validator !== result.validator
        }));
        if (result.brokenRules) {
            brokenRules = rules.concat(result.brokenRules)
        }
        this._validationInfo.result.brokenRules = this._orderBrokenRules(brokenRules)
    },
    _onValidatorStatusChanged(result) {
        if (result.status === STATUS.pending) {
            this._addPendingValidator(result.validator);
            return
        }
        this._resolveIfComplete(result)
    },
    _resolveIfComplete(result) {
        this._removePendingValidator(result.validator);
        this._updateBrokenRules(result);
        if (!this._pendingValidators.length) {
            this._unsubscribeFromAllChangeEvents();
            if (!this._validationInfo.result) {
                return
            }
            this._validationInfo.result.status = 0 === this._validationInfo.result.brokenRules.length ? STATUS.valid : STATUS.invalid;
            this._validationInfo.result.isValid = this._validationInfo.result.status === STATUS.valid;
            const res = (0, _extend.extend)({}, this._validationInfo.result, {
                complete: null
            });
            const deferred = this._validationInfo.deferred;
            this._validationInfo.deferred = null;
            this._raiseValidatedEvent(res);
            deferred && setTimeout((() => {
                deferred.resolve(res)
            }))
        }
    },
    _raiseValidatedEvent(result) {
        this._eventsStrategy.fireEvent("validated", [result])
    },
    _resetValidationInfo() {
        this._validationInfo = {
            result: null,
            deferred: null
        }
    },
    _synchronizeValidationInfo() {
        if (this._validationInfo.result) {
            this._validationInfo.result.validators = this.validators
        }
    },
    removeRegisteredValidator(validator) {
        const index = this.validators.indexOf(validator);
        if (index > -1) {
            this.validators.splice(index, 1);
            this._synchronizeValidationInfo();
            this._resolveIfComplete({
                validator: validator
            })
        }
    },
    registerValidator(validator) {
        if (!this.validators.includes(validator)) {
            this.validators.push(validator);
            this._synchronizeValidationInfo()
        }
    },
    reset() {
        (0, _iterator.each)(this.validators, (function(_, validator) {
            validator.reset()
        }));
        this._pendingValidators = [];
        this._resetValidationInfo()
    },
    on(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    }
});
const ValidationEngine = {
    groups: [],
    getGroupConfig(group) {
        const result = (0, _common.grep)(this.groups, (function(config) {
            return config.group === group
        }));
        if (result.length) {
            return result[0]
        }
    },
    findGroup($element, model) {
        var _$element$data;
        const hasValidationGroup = null === (_$element$data = $element.data()) || void 0 === _$element$data || null === (_$element$data = _$element$data.dxComponents) || void 0 === _$element$data ? void 0 : _$element$data.includes("dxValidationGroup");
        const validationGroup = hasValidationGroup && $element.dxValidationGroup("instance");
        if (validationGroup) {
            return validationGroup
        }
        const $dxGroup = $element.parents(".dx-validationgroup").first();
        if ($dxGroup.length) {
            return $dxGroup.dxValidationGroup("instance")
        }
        return model
    },
    initGroups() {
        this.groups = [];
        this.addGroup()
    },
    addGroup(group) {
        let config = this.getGroupConfig(group);
        if (!config) {
            config = new GroupConfig(group);
            this.groups.push(config)
        }
        return config
    },
    removeGroup(group) {
        const config = this.getGroupConfig(group);
        const index = this.groups.indexOf(config);
        if (index > -1) {
            this.groups.splice(index, 1)
        }
        return config
    },
    _setDefaultMessage(info) {
        const {
            rule: rule,
            validator: validator,
            name: name
        } = info;
        if (!(0, _type.isDefined)(rule.message)) {
            if (validator.defaultFormattedMessage && (0, _type.isDefined)(name)) {
                rule.message = validator.defaultFormattedMessage(name)
            } else {
                rule.message = validator.defaultMessage()
            }
        }
    },
    _addBrokenRule(info) {
        const {
            result: result,
            rule: rule
        } = info;
        if (!result.brokenRule) {
            result.brokenRule = rule
        }
        if (!result.brokenRules) {
            result.brokenRules = []
        }
        result.brokenRules.push(rule)
    },
    validate(value, rules, name) {
        var _rules$;
        let result = {
            name: name,
            value: value,
            brokenRule: null,
            brokenRules: null,
            isValid: true,
            validationRules: rules,
            pendingRules: null,
            status: STATUS.valid,
            complete: null
        };
        const validator = null === rules || void 0 === rules || null === (_rules$ = rules[0]) || void 0 === _rules$ ? void 0 : _rules$.validator;
        const asyncRuleItems = [];
        (0, _iterator.each)(rules || [], ((_, rule) => {
            const ruleValidator = rulesValidators[rule.type];
            let ruleValidationResult;
            if (ruleValidator) {
                if ((0, _type.isDefined)(rule.isValid) && rule.value === value && !rule.reevaluate) {
                    if (!rule.isValid) {
                        result.isValid = false;
                        this._addBrokenRule({
                            result: result,
                            rule: rule
                        });
                        return false
                    }
                    return true
                }
                rule.value = value;
                if ("async" === rule.type) {
                    asyncRuleItems.push({
                        rule: rule,
                        ruleValidator: ruleValidator
                    });
                    return true
                }
                ruleValidationResult = ruleValidator.validate(value, rule);
                rule.isValid = ruleValidationResult;
                if (!ruleValidationResult) {
                    result.isValid = false;
                    this._setDefaultMessage({
                        rule: rule,
                        validator: ruleValidator,
                        name: name
                    });
                    this._addBrokenRule({
                        result: result,
                        rule: rule
                    })
                }
                if (!rule.isValid) {
                    return false
                }
            } else {
                throw _errors.default.Error("E0100")
            }
        }));
        if (result.isValid && !result.brokenRules && asyncRuleItems.length) {
            result = this._validateAsyncRules({
                value: value,
                items: asyncRuleItems,
                result: result,
                name: name
            })
        }
        this._synchronizeGroupValidationInfo(validator, result);
        result.status = result.pendingRules ? STATUS.pending : result.isValid ? STATUS.valid : STATUS.invalid;
        return result
    },
    _synchronizeGroupValidationInfo(validator, result) {
        if (!validator) {
            return
        }
        const groupConfig = ValidationEngine.getGroupConfig(validator._validationGroup);
        groupConfig._updateBrokenRules.call(groupConfig, {
            validator: validator,
            brokenRules: result.brokenRules ?? []
        })
    },
    _validateAsyncRules(_ref) {
        let {
            result: result,
            value: value,
            items: items,
            name: name
        } = _ref;
        const asyncResults = [];
        (0, _iterator.each)(items, ((_, item) => {
            const validateResult = item.ruleValidator.validate(value, item.rule);
            if (!(0, _type.isPromise)(validateResult)) {
                this._updateRuleConfig({
                    rule: item.rule,
                    ruleResult: this._getPatchedRuleResult(validateResult),
                    validator: item.ruleValidator,
                    name: name
                })
            } else {
                if (!result.pendingRules) {
                    result.pendingRules = []
                }
                result.pendingRules.push(item.rule);
                const asyncResult = validateResult.then((res => {
                    const ruleResult = this._getPatchedRuleResult(res);
                    this._updateRuleConfig({
                        rule: item.rule,
                        ruleResult: ruleResult,
                        validator: item.ruleValidator,
                        name: name
                    });
                    return ruleResult
                }));
                asyncResults.push(asyncResult)
            }
        }));
        if (asyncResults.length) {
            result.complete = Promise.all(asyncResults).then((values => this._getAsyncRulesResult({
                result: result,
                values: values
            })))
        }
        return result
    },
    _updateRuleConfig(_ref2) {
        let {
            rule: rule,
            ruleResult: ruleResult,
            validator: validator,
            name: name
        } = _ref2;
        rule.isValid = ruleResult.isValid;
        if (!ruleResult.isValid) {
            if ((0, _type.isDefined)(ruleResult.message) && (0, _type.isString)(ruleResult.message) && ruleResult.message.length) {
                rule.message = ruleResult.message
            } else {
                this._setDefaultMessage({
                    rule: rule,
                    validator: validator,
                    name: name
                })
            }
        }
    },
    _getPatchedRuleResult(ruleResult) {
        let result;
        if ((0, _type.isObject)(ruleResult)) {
            result = (0, _extend.extend)({}, ruleResult);
            if (!(0, _type.isDefined)(result.isValid)) {
                result.isValid = true
            }
        } else {
            result = {
                isValid: (0, _type.isBoolean)(ruleResult) ? ruleResult : true
            }
        }
        return result
    },
    _getAsyncRulesResult(_ref3) {
        let {
            values: values,
            result: result
        } = _ref3;
        (0, _iterator.each)(values, ((index, val) => {
            if (false === val.isValid) {
                result.isValid = val.isValid;
                const rule = result.pendingRules[index];
                this._addBrokenRule({
                    result: result,
                    rule: rule
                })
            }
        }));
        result.pendingRules = null;
        result.complete = null;
        result.status = result.isValid ? STATUS.valid : STATUS.invalid;
        return result
    },
    registerValidatorInGroup(group, validator) {
        const groupConfig = ValidationEngine.addGroup(group);
        groupConfig.registerValidator.call(groupConfig, validator)
    },
    _shouldRemoveGroup(group, validatorsInGroup) {
        const isDefaultGroup = void 0 === group;
        const isValidationGroupInstance = group && "dxValidationGroup" === group.NAME;
        return !isDefaultGroup && !isValidationGroupInstance && !validatorsInGroup.length
    },
    removeRegisteredValidator(group, validator) {
        const config = ValidationEngine.getGroupConfig(group);
        if (config) {
            config.removeRegisteredValidator.call(config, validator);
            const validatorsInGroup = config.validators;
            if (this._shouldRemoveGroup(group, validatorsInGroup)) {
                this.removeGroup(group)
            }
        }
    },
    initValidationOptions(options) {
        const initedOptions = {};
        if (options) {
            const syncOptions = ["isValid", "validationStatus", "validationError", "validationErrors"];
            syncOptions.forEach((prop => {
                if (prop in options) {
                    (0, _extend.extend)(initedOptions, this.synchronizeValidationOptions({
                        name: prop,
                        value: options[prop]
                    }, options))
                }
            }))
        }
        return initedOptions
    },
    synchronizeValidationOptions(_ref4, options) {
        let {
            name: name,
            value: value
        } = _ref4;
        switch (name) {
            case "validationStatus": {
                const isValid = value === STATUS.valid || value === STATUS.pending;
                return options.isValid !== isValid ? {
                    isValid: isValid
                } : {}
            }
            case "isValid": {
                const {
                    validationStatus: validationStatus
                } = options;
                let newStatus = validationStatus;
                if (value && validationStatus === STATUS.invalid) {
                    newStatus = STATUS.valid
                } else if (!value && validationStatus !== STATUS.invalid) {
                    newStatus = STATUS.invalid
                }
                return newStatus !== validationStatus ? {
                    validationStatus: newStatus
                } : {}
            }
            case "validationErrors": {
                const validationError = !value || !value.length ? null : value[0];
                return options.validationError !== validationError ? {
                    validationError: validationError
                } : {}
            }
            case "validationError": {
                const {
                    validationErrors: validationErrors
                } = options;
                if (!value && validationErrors) {
                    return {
                        validationErrors: null
                    }
                } else if (value && !validationErrors) {
                    return {
                        validationErrors: [value]
                    }
                } else if (value && validationErrors && value !== validationErrors[0]) {
                    validationErrors[0] = value;
                    return {
                        validationErrors: validationErrors.slice()
                    }
                }
            }
        }
        return {}
    },
    validateGroup(group) {
        const groupConfig = ValidationEngine.getGroupConfig(group);
        if (!groupConfig) {
            throw _errors.default.Error("E0110")
        }
        return groupConfig.validate()
    },
    resetGroup(group) {
        const groupConfig = ValidationEngine.getGroupConfig(group);
        if (!groupConfig) {
            throw _errors.default.Error("E0110")
        }
        return groupConfig.reset()
    }
};
ValidationEngine.initGroups();
var _default = exports.default = ValidationEngine;
module.exports = exports.default;
module.exports.default = exports.default;
