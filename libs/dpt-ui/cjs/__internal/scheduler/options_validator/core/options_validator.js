/**
 * DevExtreme (cjs/__internal/scheduler/options_validator/core/options_validator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OptionsValidator = void 0;
class OptionsValidator {
    constructor(validators) {
        this.validators = validators
    }
    validate(options) {
        const errors = Object.entries(this.validators).reduce(((result, _ref) => {
            let [validatorName, validator] = _ref;
            const validatorResult = validator.validate(options);
            if (true !== validatorResult) {
                result[validatorName] = validatorResult
            }
            return result
        }), {});
        return Object.keys(errors).length > 0 ? errors : true
    }
}
exports.OptionsValidator = OptionsValidator;
