/**
 * DevExtreme (esm/__internal/core/utils/math.test.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    shiftIntegerByModule
} from "../../core/utils/math";
import each from "jest-each";
describe("Math utils tests", (() => {
    describe("shiftIntegerByModule", (() => {
        each`
      value         | module   | expectedResult
      ${0}          | ${2}    | ${0}
      ${2}          | ${2}    | ${0}
      ${2}          | ${4}    | ${2}
      ${2}          | ${1e3} | ${2}
      ${4}          | ${2}    | ${0}
      ${5}          | ${2}    | ${1}
      ${6}          | ${2}    | ${0}
      ${1e10}       | ${10}   | ${0}
      ${10000000003}   | ${10}   | ${3}
      ${-9}         | ${3}    | ${0}
      ${-1}         | ${6}    | ${5}
      ${-3}         | ${9}    | ${6}
      ${-5}         | ${9}    | ${4}
      ${-1e10}      | ${10}   | ${0}
      ${-9999999997}  | ${10}   | ${3}
    `.it("should return correct result", (_ref => {
            let {
                value: value,
                module: module,
                expectedResult: expectedResult
            } = _ref;
            const result = shiftIntegerByModule(value, module);
            expect(result).toEqual(expectedResult)
        }));
        it("should throw error if value isn't integer", (() => {
            expect((() => shiftIntegerByModule(1.5, 3))).toThrow()
        }));
        it("should throw error if module value isn't integer", (() => {
            expect((() => shiftIntegerByModule(2, 2.5))).toThrow()
        }));
        it("should throw error if module value equals zero", (() => {
            expect((() => shiftIntegerByModule(2, 0))).toThrow()
        }));
        it("should throw error if module value less than zero", (() => {
            expect((() => shiftIntegerByModule(2, -2))).toThrow()
        }))
    }))
}));
