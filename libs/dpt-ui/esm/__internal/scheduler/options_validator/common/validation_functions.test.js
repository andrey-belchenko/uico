/**
 * DevExtreme (esm/__internal/scheduler/options_validator/common/validation_functions.test.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import each from "jest-each";
import {
    divisibleBy,
    greaterThan,
    inRange,
    isInteger,
    lessThan
} from "./validation_functions";
describe("isInteger", (() => {
    each`
    value   | expectedResult
    ${1}    | ${true}
    ${1.5}  | ${false}
    ${-1}   | ${true}
    ${-1.5} | ${false}
    ${0}    | ${true}
  `.it("should detect integer correctly", (_ref => {
        let {
            value: value,
            expectedResult: expectedResult
        } = _ref;
        const result = isInteger(value);
        expect(result).toEqual(expectedResult)
    }))
}));
describe("greaterThat", (() => {
    each`
    value   | min     | strict    | expectedResult
    ${10}   | ${5}    | ${true}   | ${true}
    ${10}   | ${15}   | ${true}   | ${false}
    ${10}   | ${10}   | ${true}   | ${false}
    ${0}    | ${0}    | ${true}   | ${false}
    ${-10}  | ${-10}  | ${true}   | ${false}
    ${-10}  | ${-5}   | ${true}   | ${false}
    ${-10}  | ${-15}  | ${true}   | ${true}
    ${10}   | ${5}    | ${false}  | ${true}
    ${10}   | ${15}   | ${false}  | ${false}
    ${10}   | ${10}   | ${false}  | ${true}
    ${0}    | ${0}    | ${false}  | ${true}
    ${-10}  | ${-10}  | ${false}  | ${true}
    ${-10}  | ${-5}   | ${false}  | ${false}
    ${-10}  | ${-15}  | ${false}  | ${true}
  `.it("should compare numbers correctly", (_ref2 => {
        let {
            value: value,
            min: min,
            strict: strict,
            expectedResult: expectedResult
        } = _ref2;
        const result = greaterThan(value, min, strict);
        expect(result).toEqual(expectedResult)
    }))
}));
describe("lessThat", (() => {
    each`
    value   | min     | strict    | expectedResult
    ${10}   | ${5}    | ${true}   | ${false}
    ${10}   | ${15}   | ${true}   | ${true}
    ${10}   | ${10}   | ${true}   | ${false}
    ${0}    | ${0}    | ${true}   | ${false}
    ${-10}  | ${-10}  | ${true}   | ${false}
    ${-10}  | ${-5}   | ${true}   | ${true}
    ${-10}  | ${-15}  | ${true}   | ${false}
    ${10}   | ${5}    | ${false}  | ${false}
    ${10}   | ${15}   | ${false}  | ${true}
    ${10}   | ${10}   | ${false}  | ${true}
    ${0}    | ${0}    | ${false}  | ${true}
    ${-10}  | ${-10}  | ${false}  | ${true}
    ${-10}  | ${-5}   | ${false}  | ${true}
    ${-10}  | ${-15}  | ${false}  | ${false}
  `.it("should compare numbers correctly", (_ref3 => {
        let {
            value: value,
            min: min,
            strict: strict,
            expectedResult: expectedResult
        } = _ref3;
        const result = lessThan(value, min, strict);
        expect(result).toEqual(expectedResult)
    }))
}));
describe("inRange", (() => {
    each`
    value | range         | expectedResult
    ${5}  | ${[-10,10]}  | ${true}
    ${5}  | ${[5,10]}    | ${true}
    ${5}  | ${[-10,5]}   | ${true}
    ${5}  | ${[-10,4]}   | ${false}
    ${5}  | ${[6,10]}    | ${false}
    ${-5} | ${[-10,10]}  | ${true}
    ${-5} | ${[-5,0]}    | ${true}
    ${-5} | ${[-10,-5]}  | ${true}
    ${-5} | ${[-10,-6]}  | ${false}
    ${-5} | ${[-4,0]}    | ${false}
  `.it("should determine interval correctly", (_ref4 => {
        let {
            value: value,
            range: range,
            expectedResult: expectedResult
        } = _ref4;
        const result = inRange(value, range);
        expect(result).toEqual(expectedResult)
    }))
}));
describe("divisibleBy", (() => {
    each`
    value  | divider  | expectedResult
    ${4}   | ${2}     | ${true}
    ${5}   | ${2}     | ${false}
    ${0}   | ${111}   | ${true}
    ${4}   | ${-2}     | ${true}
    ${5}   | ${-2}     | ${false}
    ${0}   | ${-111}   | ${true}
    ${-4}  | ${2}     | ${true}
    ${-5}  | ${2}     | ${false}
    ${4}   | ${-2}     | ${true}
    ${5}   | ${-2}     | ${false}
  `.it("should determine divisible by correctly", (_ref5 => {
        let {
            value: value,
            divider: divider,
            expectedResult: expectedResult
        } = _ref5;
        const result = divisibleBy(value, divider);
        expect(result).toEqual(expectedResult)
    }))
}));
