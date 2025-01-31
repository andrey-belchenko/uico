/**
 * DevExtreme (cjs/data/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.errorMessageFromXhr = exports.base64_encode = exports.aggregators = exports.XHR_ERROR_UNLOAD = void 0;
exports.isConjunctiveOperator = isConjunctiveOperator;
exports.isDisjunctiveOperator = isDisjunctiveOperator;
exports.rejectedPromise = exports.processRequestResultLock = exports.normalizeSortingInfo = exports.normalizeBinaryCriterion = exports.keysEqual = exports.isUniformEqualsByOr = exports.isUnaryOperation = exports.isGroupCriterion = void 0;
exports.throttleChanges = throttleChanges;
exports.trivialPromise = void 0;
var _type = require("../core/utils/type");
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _ready_callbacks = _interopRequireDefault(require("../core/utils/ready_callbacks"));
var _window = require("../core/utils/window");
var _iterator = require("../core/utils/iterator");
var _deferred = require("../core/utils/deferred");
var _common = require("../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const ready = _ready_callbacks.default.add;
const XHR_ERROR_UNLOAD = exports.XHR_ERROR_UNLOAD = "DEVEXTREME_XHR_ERROR_UNLOAD";
const normalizeBinaryCriterion = function(crit) {
    return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]]
};
exports.normalizeBinaryCriterion = normalizeBinaryCriterion;
const normalizeSortingInfo = function(info) {
    if (!Array.isArray(info)) {
        info = [info]
    }
    return (0, _iterator.map)(info, (function(i) {
        const result = {
            selector: (0, _type.isFunction)(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
            desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
        };
        if (i.compare) {
            result.compare = i.compare
        }
        return result
    }))
};
exports.normalizeSortingInfo = normalizeSortingInfo;
const errorMessageFromXhr = exports.errorMessageFromXhr = function() {
    const textStatusMessages = {
        timeout: "Network connection timeout",
        error: "Unspecified network error",
        parsererror: "Unexpected server response"
    };
    let unloading;
    ready((function() {
        const window = (0, _window.getWindow)();
        _dom_adapter.default.listen(window, "beforeunload", (function() {
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
const aggregators = exports.aggregators = {
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
const processRequestResultLock = exports.processRequestResultLock = function() {
    let lockCount = 0;
    let lockDeferred;
    return {
        obtain: function() {
            if (0 === lockCount) {
                lockDeferred = new _deferred.Deferred
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
            const deferred = 0 === lockCount ? (new _deferred.Deferred).resolve() : lockDeferred;
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

function isDisjunctiveOperator(condition) {
    return /^(or|\|\||\|)$/i.test(condition)
}

function isConjunctiveOperator(condition) {
    return /^(and|&&|&)$/i.test(condition)
}
const keysEqual = function(keyExpr, key1, key2) {
    if (Array.isArray(keyExpr)) {
        const names = (0, _iterator.map)(key1, (function(v, k) {
            return k
        }));
        let name;
        for (let i = 0; i < names.length; i++) {
            name = names[i];
            if (!(0, _common.equalByValue)(key1[name], key2[name], {
                    strict: false
                })) {
                return false
            }
        }
        return true
    }
    return (0, _common.equalByValue)(key1, key2, {
        strict: false
    })
};
exports.keysEqual = keysEqual;
const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const base64_encode = function(input) {
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
        result += (0, _iterator.map)([octet1 >> 2, (3 & octet1) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (15 & octet2) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : 63 & octet3], getBase64Char).join("")
    }
    return result
};
exports.base64_encode = base64_encode;

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
const isUnaryOperation = function(crit) {
    return "!" === crit[0] && Array.isArray(crit[1])
};
exports.isUnaryOperation = isUnaryOperation;
const isGroupOperator = function(value) {
    return "and" === value || "or" === value
};
const isUniformEqualsByOr = function(crit) {
    if (crit.length > 2 && Array.isArray(crit[0]) && "or" === crit[1] && "string" === typeof crit[0][0] && "=" === crit[0][1]) {
        const [prop] = crit[0];
        return !crit.find(((el, i) => i % 2 !== 0 ? "or" !== el : !Array.isArray(el) || 3 !== el.length || el[0] !== prop || "=" !== el[1]))
    }
    return false
};
exports.isUniformEqualsByOr = isUniformEqualsByOr;
const isGroupCriterion = function(crit) {
    const first = crit[0];
    const second = crit[1];
    if (Array.isArray(first)) {
        return true
    }
    if ((0, _type.isFunction)(first)) {
        if (Array.isArray(second) || (0, _type.isFunction)(second) || isGroupOperator(second)) {
            return true
        }
    }
    return false
};
exports.isGroupCriterion = isGroupCriterion;
const trivialPromise = function() {
    const d = new _deferred.Deferred;
    return d.resolve.apply(d, arguments).promise()
};
exports.trivialPromise = trivialPromise;
const rejectedPromise = function() {
    const d = new _deferred.Deferred;
    return d.reject.apply(d, arguments).promise()
};
exports.rejectedPromise = rejectedPromise;

function throttle(func, timeout) {
    let timeoutId;
    return function() {
        if (!timeoutId) {
            timeoutId = setTimeout((() => {
                timeoutId = void 0;
                func.call(this)
            }), (0, _type.isFunction)(timeout) ? timeout() : timeout)
        }
        return timeoutId
    }
}

function throttleChanges(func, timeout) {
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
