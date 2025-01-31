/**
 * DevExtreme (cjs/__internal/core/utils/math.js)
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
exports.shiftIntegerByModule = void 0;
const shiftIntegerByModule = (integerValue, moduleValue) => {
    if (!Number.isInteger(integerValue)) {
        throw Error(`Passed integer value ${integerValue} is not an integer.`)
    }
    if (!Number.isInteger(moduleValue)) {
        throw Error(`Passed module value ${moduleValue} is not an integer.`)
    }
    if (moduleValue <= 0) {
        throw Error(`Passed module value ${moduleValue} must be > 0.`)
    }
    const normalizedInteger = integerValue % moduleValue;
    switch (true) {
        case 0 === normalizedInteger:
            return 0;
        case normalizedInteger > 0:
            return normalizedInteger;
        case normalizedInteger < 0:
            return moduleValue + normalizedInteger;
        default:
            throw Error(`Unexpected division (${integerValue} % ${moduleValue}) occurred.`)
    }
};
exports.shiftIntegerByModule = shiftIntegerByModule;
