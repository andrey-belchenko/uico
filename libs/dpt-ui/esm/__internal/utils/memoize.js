/**
 * DevExtreme (esm/__internal/utils/memoize.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    equalByValue
} from "../../core/utils/common";
const compareByReference = (args, lastArgs) => args.length === lastArgs.length && !Object.keys(args).some((key => args[key] !== lastArgs[key]));
const compareByValue = (args, lastArgs) => equalByValue(args, lastArgs, {
    maxDepth: 4
});
const createCacheFunc = (firstArgs, firstResult, originFunc, compareFunc) => {
    let lastArgs = firstArgs;
    let lastResult = firstResult;
    return function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        const argsEquals = compareFunc(args, lastArgs);
        if (argsEquals) {
            return lastResult
        }
        lastArgs = args;
        lastResult = originFunc(...lastArgs);
        return lastResult
    }
};
const MEMOIZE_DEFAULT_OPTIONS = {
    compareType: "reference"
};
export const memoize = function(func) {
    let {
        compareType: compareType
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : MEMOIZE_DEFAULT_OPTIONS;
    let cachedFunc = null;
    return function() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2]
        }
        if (!cachedFunc) {
            const firstResult = func(...args);
            cachedFunc = createCacheFunc(args, firstResult, func, "reference" === compareType ? compareByReference : compareByValue);
            return firstResult
        }
        return cachedFunc(...args)
    }
};
