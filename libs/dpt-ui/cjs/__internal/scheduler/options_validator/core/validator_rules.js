/**
 * DevExtreme (cjs/__internal/scheduler/options_validator/core/validator_rules.js)
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
exports.createValidatorRule = void 0;
const createValidatorRule = (name, ruleFunc) => {
    Object.defineProperty(ruleFunc, "name", {
        value: name,
        writable: false
    });
    return ruleFunc
};
exports.createValidatorRule = createValidatorRule;
