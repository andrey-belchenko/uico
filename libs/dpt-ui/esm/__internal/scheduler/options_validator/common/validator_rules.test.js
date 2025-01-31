/**
 * DevExtreme (esm/__internal/scheduler/options_validator/common/validator_rules.test.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    mustBeDivisibleBy,
    mustBeGreaterThan,
    mustBeInRange,
    mustBeInteger,
    mustBeLessThan
} from "../../../scheduler/options_validator/common/validator_rules";
import * as validationFunctions from "./validation_functions";
describe("mustBeInteger", (() => {
    let mock = null;
    beforeEach((() => {
        mock = jest.spyOn(validationFunctions, "isInteger")
    }));
    afterEach((() => {
        var _mock;
        null === (_mock = mock) || void 0 === _mock || _mock.mockReset()
    }));
    it("should call isInteger function", (() => {
        mustBeInteger(10);
        expect(mock).toHaveBeenCalledWith(10)
    }));
    it("should return true if valid", (() => {
        var _mock2;
        null === (_mock2 = mock) || void 0 === _mock2 || _mock2.mockImplementation((() => true));
        const result = mustBeInteger(10);
        expect(result).toBe(true)
    }));
    it("should return error (string) if invalid", (() => {
        var _mock3;
        null === (_mock3 = mock) || void 0 === _mock3 || _mock3.mockImplementation((() => false));
        const result = mustBeInteger(10.5);
        expect(result).toBe("10.5 must be an integer.")
    }));
    it("should be the function with the correct name", (() => {
        const func = mustBeInteger;
        expect(func.name).toBe("mustBeInteger")
    }))
}));
describe("mustBeGreaterThan", (() => {
    let mock = null;
    beforeEach((() => {
        mock = jest.spyOn(validationFunctions, "greaterThan")
    }));
    afterEach((() => {
        var _mock4;
        null === (_mock4 = mock) || void 0 === _mock4 || _mock4.mockReset()
    }));
    it("should call greaterThan function", (() => {
        const func = mustBeGreaterThan(10, true);
        func(15);
        expect(mock).toHaveBeenCalledWith(15, 10, true)
    }));
    it("should return true if valid", (() => {
        var _mock5;
        null === (_mock5 = mock) || void 0 === _mock5 || _mock5.mockImplementation((() => true));
        const func = mustBeGreaterThan(10, true);
        const result = func(15);
        expect(result).toBe(true)
    }));
    it("should return error (string) if invalid with strict: true", (() => {
        var _mock6;
        null === (_mock6 = mock) || void 0 === _mock6 || _mock6.mockImplementation((() => false));
        const func = mustBeGreaterThan(15, true);
        const result = func(10);
        expect(result).toBe("10 must be > than 15.")
    }));
    it("should return error (string) if invalid with strict: false", (() => {
        var _mock7;
        null === (_mock7 = mock) || void 0 === _mock7 || _mock7.mockImplementation((() => false));
        const func = mustBeGreaterThan(15, false);
        const result = func(10);
        expect(result).toBe("10 must be >= than 15.")
    }));
    it("should be the function with the correct name", (() => {
        const func = mustBeGreaterThan(15, false);
        expect(func.name).toBe("mustBeGreaterThan")
    }))
}));
describe("mustBeLessThan", (() => {
    let mock = null;
    beforeEach((() => {
        mock = jest.spyOn(validationFunctions, "lessThan")
    }));
    afterEach((() => {
        var _mock8;
        null === (_mock8 = mock) || void 0 === _mock8 || _mock8.mockReset()
    }));
    it("should call lessThan function", (() => {
        const func = mustBeLessThan(10, true);
        func(5);
        expect(mock).toHaveBeenCalledWith(5, 10, true)
    }));
    it("should return true if valid", (() => {
        var _mock9;
        null === (_mock9 = mock) || void 0 === _mock9 || _mock9.mockImplementation((() => true));
        const func = mustBeLessThan(10, true);
        const result = func(5);
        expect(result).toBe(true)
    }));
    it("should return error (string) if invalid with strict: true", (() => {
        var _mock10;
        null === (_mock10 = mock) || void 0 === _mock10 || _mock10.mockImplementation((() => false));
        const func = mustBeLessThan(10, true);
        const result = func(15);
        expect(result).toBe("15 must be < than 10.")
    }));
    it("should return error (string) if invalid with strict: false", (() => {
        var _mock11;
        null === (_mock11 = mock) || void 0 === _mock11 || _mock11.mockImplementation((() => false));
        const func = mustBeLessThan(10, false);
        const result = func(15);
        expect(result).toBe("15 must be <= than 10.")
    }));
    it("should be the function with the correct name", (() => {
        const func = mustBeLessThan(15, false);
        expect(func.name).toBe("mustBeLessThan")
    }))
}));
describe("mustBeInRange", (() => {
    let mock = null;
    beforeEach((() => {
        mock = jest.spyOn(validationFunctions, "inRange")
    }));
    afterEach((() => {
        var _mock12;
        null === (_mock12 = mock) || void 0 === _mock12 || _mock12.mockReset()
    }));
    it("should call inRange function", (() => {
        const func = mustBeInRange([0, 10]);
        func(5);
        expect(mock).toHaveBeenCalledWith(5, [0, 10])
    }));
    it("should return true if valid", (() => {
        var _mock13;
        null === (_mock13 = mock) || void 0 === _mock13 || _mock13.mockImplementation((() => true));
        const func = mustBeInRange([0, 10]);
        const result = func(5);
        expect(result).toBe(true)
    }));
    it("should return error (string) if invalid ", (() => {
        var _mock14;
        null === (_mock14 = mock) || void 0 === _mock14 || _mock14.mockImplementation((() => false));
        const func = mustBeInRange([0, 10]);
        const result = func(15);
        expect(result).toBe("15 must be in range [0, 10].")
    }));
    it("should be the function with the correct name", (() => {
        const func = mustBeInRange([0, 10]);
        expect(func.name).toBe("mustBeInRange")
    }))
}));
describe("mustBeDivisibleBy", (() => {
    let mock = null;
    beforeEach((() => {
        mock = jest.spyOn(validationFunctions, "divisibleBy")
    }));
    afterEach((() => {
        var _mock15;
        null === (_mock15 = mock) || void 0 === _mock15 || _mock15.mockReset()
    }));
    it("should call divisibleBy function", (() => {
        const func = mustBeDivisibleBy(10);
        func(100);
        expect(mock).toHaveBeenCalledWith(100, 10)
    }));
    it("should return true if valid", (() => {
        var _mock16;
        null === (_mock16 = mock) || void 0 === _mock16 || _mock16.mockImplementation((() => true));
        const func = mustBeDivisibleBy(5);
        const result = func(10);
        expect(result).toBe(true)
    }));
    it("should return error (string) if invalid ", (() => {
        var _mock17;
        null === (_mock17 = mock) || void 0 === _mock17 || _mock17.mockImplementation((() => false));
        const func = mustBeDivisibleBy(5);
        const result = func(6);
        expect(result).toBe("6 must be divisible by 5.")
    }));
    it("should be the function with the correct name", (() => {
        const func = mustBeDivisibleBy(5);
        expect(func.name).toBe("mustBeDivisibleBy")
    }))
}));
