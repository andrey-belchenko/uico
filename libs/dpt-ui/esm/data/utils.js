/**
 * DevExtreme (esm/data/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isFunction
} from "../core/utils/type";
import domAdapter from "../core/dom_adapter";
import readyCallbacks from "../core/utils/ready_callbacks";
import {
    getWindow
} from "../core/utils/window";
import {
    map
} from "../core/utils/iterator";
import {
    Deferred
} from "../core/utils/deferred";
import {
    equalByValue
} from "../core/utils/common";
const ready = readyCallbacks.add;
export const XHR_ERROR_UNLOAD = "DEVEXTREME_XHR_ERROR_UNLOAD";
export const normalizeBinaryCriterion = function(crit) {
    return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]]
};
export const normalizeSortingInfo = function(info) {
    if (!Array.isArray(info)) {
        info = [info]
    }
    return map(info, (function(i) {
        const result = {
            selector: isFunction(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
            desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
        };
        if (i.compare) {
            result.compare = i.compare
        }
        return result
    }))
};
export const errorMessageFromXhr = function() {
    const textStatusMessages = {
        timeout: "Network connection timeout",
        error: "Unspecified network error",
        parsererror: "Unexpected server response"
    };
    let unloading;
    ready((function() {
        const window = getWindow();
        domAdapter.listen(window, "beforeunload", (function() {
            unloading = true
        }))
    }));
    return function(xhr, textStatus) {
        if (unloading) {
            return XHR_ERROR_UNLOAD
        }
        if (xhr.status < 400) {
            return function(textStatus) {
                let result = textStatusMessages[textStatus];
                if (!result) {
                    return textStatus
                }
                return result
            }(textStatus)
        }
        return xhr.statusText
    }
}();
export const aggregators = {
    count: {
        seed: 0,
        step: function(count) {
            return 1 + count
        }
    },
    sum: {
        seed: 0,
        step: function(sum, item) {
            return sum + item
        }
    },
    min: {
        step: function(min, item) {
            return item < min ? item : min
        }
    },
    max: {
        step: function(max, item) {
            return item > max ? item : max
        }
    },
    avg: {
        seed: [0, 0],
        step: function(pair, value) {
            return [pair[0] + value, pair[1] + 1]
        },
        finalize: function(pair) {
            return pair[1] ? pair[0] / pair[1] : NaN
        }
    }
};
export const processRequestResultLock = function() {
    let lockCount = 0;
    let lockDeferred;
    return {
        obtain: function() {
            if (0 === lockCount) {
                lockDeferred = new Deferred
            }
            lockCount++
        },
        release: function() {
            lockCount--;
            if (lockCount < 1) {
                lockDeferred.resolve()
            }
        },
        promise: function() {
            const deferred = 0 === lockCount ? (new Deferred).resolve() : lockDeferred;
            return deferred.promise()
        },
        reset: function() {
            lockCount = 0;
            if (lockDeferred) {
                lockDeferred.resolve()
            }
        }
    }
}();
export function isDisjunctiveOperator(condition) {
    return /^(or|\|\||\|)$/i.test(condition)
}
export function isConjunctiveOperator(condition) {
    return /^(and|&&|&)$/i.test(condition)
}
export const keysEqual = function(keyExpr, key1, key2) {
    if (Array.isArray(keyExpr)) {
        const names = map(key1, (function(v, k) {
            return k
        }));
        let name;
        for (let i = 0; i < names.length; i++) {
            name = names[i];
            if (!equalByValue(key1[name], key2[name], {
                    strict: false
                })) {
                return false
            }
        }
        return true
    }
    return equalByValue(key1, key2, {
        strict: false
    })
};
const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
export const base64_encode = function(input) {
    if (!Array.isArray(input)) {
        input = stringToByteArray(String(input))
    }
    let result = "";

    function getBase64Char(index) {
        return BASE64_CHARS.charAt(index)
    }
    for (let i = 0; i < input.length; i += 3) {
        const octet1 = input[i];
        const octet2 = input[i + 1];
        const octet3 = input[i + 2];
        result += map([octet1 >> 2, (3 & octet1) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (15 & octet2) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : 63 & octet3], getBase64Char).join("")
    }
    return result
};

function stringToByteArray(str) {
    const bytes = [];
    let code;
    let i;
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);
        if (code < 128) {
            bytes.push(code)
        } else if (code < 2048) {
            bytes.push(192 + (code >> 6), 128 + (63 & code))
        } else if (code < 65536) {
            bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (63 & code))
        } else if (code < 2097152) {
            bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (63 & code))
        }
    }
    return bytes
}
export const isUnaryOperation = function(crit) {
    return "!" === crit[0] && Array.isArray(crit[1])
};
const isGroupOperator = function(value) {
    return "and" === value || "or" === value
};
export const isUniformEqualsByOr = function(crit) {
    if (crit.length > 2 && Array.isArray(crit[0]) && "or" === crit[1] && "string" === typeof crit[0][0] && "=" === crit[0][1]) {
        const [prop] = crit[0];
        return !crit.find(((el, i) => i % 2 !== 0 ? "or" !== el : !Array.isArray(el) || 3 !== el.length || el[0] !== prop || "=" !== el[1]))
    }
    return false
};
export const isGroupCriterion = function(crit) {
    const first = crit[0];
    const second = crit[1];
    if (Array.isArray(first)) {
        return true
    }
    if (isFunction(first)) {
        if (Array.isArray(second) || isFunction(second) || isGroupOperator(second)) {
            return true
        }
    }
    return false
};
export const trivialPromise = function() {
    const d = new Deferred;
    return d.resolve.apply(d, arguments).promise()
};
export const rejectedPromise = function() {
    const d = new Deferred;
    return d.reject.apply(d, arguments).promise()
};

function throttle(func, timeout) {
    let timeoutId;
    return function() {
        if (!timeoutId) {
            timeoutId = setTimeout((() => {
                timeoutId = void 0;
                func.call(this)
            }), isFunction(timeout) ? timeout() : timeout)
        }
        return timeoutId
    }
}
export function throttleChanges(func, timeout) {
    let cache = [];
    const throttled = throttle((function() {
        func.call(this, cache);
        cache = []
    }), timeout);
    return function(changes) {
        if (Array.isArray(changes)) {
            cache.push(...changes)
        }
        return throttled.call(this, cache)
    }
}
