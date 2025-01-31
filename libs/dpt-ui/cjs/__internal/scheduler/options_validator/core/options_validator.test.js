/**
 * DevExtreme (cjs/__internal/scheduler/options_validator/core/options_validator.test.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _options_validator = require("./options_validator");
var _validator = require("./validator");
class TestOptionsValidator extends _options_validator.OptionsValidator {
    constructor(validators) {
        super(validators)
    }
}
const widgetOptions = {
    A: 1,
    B: "1",
    C: true
};
describe("OptionsValidator", (() => {
    it("should call each validator's validate method", (() => {
        const validators = [new _validator.Validator((() => {}), []), new _validator.Validator((() => {}), []), new _validator.Validator((() => {}), [])];
        const validateSpies = validators.map((validator => {
            const validateSpy = jest.spyOn(validator, "validate");
            validateSpy.mockImplementation((() => true));
            return validateSpy
        }));
        const optionsValidator = new TestOptionsValidator({
            A: validators[0],
            B: validators[1],
            C: validators[2]
        });
        optionsValidator.validate(widgetOptions);
        expect(validateSpies[0]).toHaveBeenCalledWith(widgetOptions);
        expect(validateSpies[1]).toHaveBeenCalledWith(widgetOptions);
        expect(validateSpies[2]).toHaveBeenCalledWith(widgetOptions);
        validateSpies.forEach((spy => {
            spy.mockReset()
        }))
    }));
    it("should return true if all validators validates without errors", (() => {
        const validator = new _validator.Validator((() => {}), []);
        const validateSpy = jest.spyOn(validator, "validate");
        validateSpy.mockImplementation((() => true));
        const optionsValidator = new TestOptionsValidator({
            A: validator,
            B: validator,
            C: validator
        });
        const result = optionsValidator.validate(widgetOptions);
        expect(result).toBe(true);
        validateSpy.mockReset()
    }));
    it("should return object with errors if some validators validates with errors", (() => {
        const firstValidateResult = {
            required: "false",
            isInteger: "false"
        };
        const thirdValidateResult = {
            someError: "some message"
        };
        const expectedResult = {
            A: firstValidateResult,
            C: thirdValidateResult
        };
        const validators = [new _validator.Validator((() => {}), []), new _validator.Validator((() => {}), []), new _validator.Validator((() => {}), [])];
        const firstValidateSpy = jest.spyOn(validators[0], "validate");
        const secondValidateSpy = jest.spyOn(validators[1], "validate");
        const thirdValidateSpy = jest.spyOn(validators[2], "validate");
        firstValidateSpy.mockImplementation((() => firstValidateResult));
        secondValidateSpy.mockImplementation((() => true));
        thirdValidateSpy.mockImplementation((() => thirdValidateResult));
        const optionsValidator = new TestOptionsValidator({
            A: validators[0],
            B: validators[1],
            C: validators[2]
        });
        const result = optionsValidator.validate(widgetOptions);
        expect(result).toEqual(expectedResult);
        firstValidateSpy.mockReset();
        secondValidateSpy.mockReset();
        thirdValidateSpy.mockReset()
    }))
}));
