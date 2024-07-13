/**
 * DevExtreme (cjs/__internal/scheduler/options_validator/core/validator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Validator = void 0;
class Validator {
    constructor(valueSelector, rules) {
        this.valueSelector = valueSelector;
        this.rules = rules
    }
    validate(options) {
        const value = this.valueSelector(options);
        const errors = this.rules.reduce(((result, rule) => {
            const validationResult = rule(value);
            if (true !== validationResult) {
                result[rule.name] = validationResult
            }
            return result
        }), {});
        return Object.keys(errors).length ? errors : true
    }
}
exports.Validator = Validator;
