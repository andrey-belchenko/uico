/**
 * DevExtreme (esm/core/utils/type.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const types = {
    "[object Array]": "array",
    "[object Date]": "date",
    "[object Object]": "object",
    "[object String]": "string"
};
const type = function(object) {
    if (null === object) {
        return "null"
    }
    const typeOfObject = Object.prototype.toString.call(object);
    return "object" === typeof object ? types[typeOfObject] || "object" : typeof object
};
const isBoolean = function(object) {
    return "boolean" === typeof object
};
const isExponential = function(value) {
    return isNumeric(value) && -1 !== value.toString().indexOf("e")
};
const isDate = function(object) {
    return "date" === type(object)
};
const isDefined = function(object) {
    return null !== object && void 0 !== object
};
const isFunction = function(object) {
    return "function" === typeof object
};
const isString = function(object) {
    return "string" === typeof object
};
const isNumeric = function(object) {
    return "number" === typeof object && isFinite(object) || !isNaN(object - parseFloat(object))
};
const isObject = function(object) {
    return "object" === type(object)
};
const isEmptyObject = function(object) {
    let property;
    for (property in object) {
        return false
    }
    return true
};
const isPlainObject = function(object) {
    if (!object || "object" !== type(object)) {
        return false
    }
    const proto = Object.getPrototypeOf(object);
    if (!proto) {
        return true
    }
    const ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return "function" === typeof ctor && Object.toString.call(ctor) === Object.toString.call(Object)
};
const isPrimitive = function(value) {
    return -1 === ["object", "array", "function"].indexOf(type(value))
};
const isWindow = function(object) {
    return null != object && object === object.window
};
const isRenderer = function(object) {
    return !!object && !!(object.jquery || object.dxRenderer)
};
const isPromise = function(object) {
    return !!object && isFunction(object.then)
};
const isDeferred = function(object) {
    return !!object && isFunction(object.done) && isFunction(object.fail)
};
const isEvent = function(object) {
    return !!(object && object.preventDefault)
};
export {
    isBoolean,
    isExponential,
    isDate,
    isDefined,
    isFunction,
    isString,
    isNumeric,
    isObject,
    isEmptyObject,
    isPlainObject,
    isPrimitive,
    isWindow,
    isRenderer,
    isPromise,
    isDeferred,
    type,
    isEvent
};
