/**
 * DevExtreme (cjs/__internal/core/utils/date.test.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _jestEach = _interopRequireDefault(require("jest-each"));
var _date = require("./date");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const SECOND_MS = 1e3;
const MINUTE_MS = 6e4;
const HOUR_MS = 36e5;
const DAY_MS = 864e5;
describe("Date utils", (() => {
    describe("addOffsets function", (() => {
        (0, _jestEach.default)`
         offsets | expectedResult
         ${[0]} | ${new Date("2023-09-05T00:00:00Z")}
         ${[1e3]} | ${new Date("2023-09-05T00:00:01Z")}
         ${[-36e5]} | ${new Date("2023-09-04T23:00:00Z")}
         ${[72e5,-36e5]} | ${new Date("2023-09-05T01:00:00Z")}
         ${[1e3,6e4,36e5,DAY_MS]} | ${new Date("2023-09-06T01:01:01Z")}
         ${[-1e3,-6e4,-36e5,-DAY_MS]} | ${new Date("2023-09-03T22:58:59Z")}
         ${[36e5,-36e5]} | ${new Date("2023-09-05T00:00:00Z")}
    `.it("should add ms offsets to date correctly", (_ref => {
            let {
                offsets: offsets,
                expectedResult: expectedResult
            } = _ref;
            const date = new Date("2023-09-05T00:00:00Z");
            const result = _date.dateUtilsTs.addOffsets(date, offsets);
            expect(result).toEqual(expectedResult)
        }))
    }))
}));
