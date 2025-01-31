/**
 * DevExtreme (cjs/core/class.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _errors = _interopRequireDefault(require("./errors"));
var _type = require("./utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const wrapOverridden = function(baseProto, methodName, method) {
    return function() {
        const prevCallBase = this.callBase;
        this.callBase = baseProto[methodName];
        try {
            return method.apply(this, arguments)
        } finally {
            this.callBase = prevCallBase
        }
    }
};
const clonePrototype = function(obj) {
    const func = function() {};
    func.prototype = obj.prototype;
    return new func
};
const redefine = function(members) {
    const that = this;
    let overridden;
    let memberName;
    let member;
    if (!members) {
        return that
    }
    for (memberName in members) {
        member = members[memberName];
        overridden = "function" === typeof that.prototype[memberName] && "function" === typeof member;
        that.prototype[memberName] = overridden ? wrapOverridden(that.parent.prototype, memberName, member) : member
    }
    return that
};
const include = function() {
    const classObj = this;
    let argument;
    let name;
    let i;
    const hasClassObjOwnProperty = Object.prototype.hasOwnProperty.bind(classObj);
    const isES6Class = !hasClassObjOwnProperty("_includedCtors") && !hasClassObjOwnProperty("_includedPostCtors");
    if (isES6Class) {
        classObj._includedCtors = classObj._includedCtors.slice(0);
        classObj._includedPostCtors = classObj._includedPostCtors.slice(0)
    }
    for (i = 0; i < arguments.length; i++) {
        argument = arguments[i];
        if (argument.ctor) {
            classObj._includedCtors.push(argument.ctor)
        }
        if (argument.postCtor) {
            classObj._includedPostCtors.push(argument.postCtor)
        }
        for (name in argument) {
            if ("ctor" === name || "postCtor" === name || "default" === name) {
                continue
            }
            classObj.prototype[name] = argument[name]
        }
    }
    return classObj
};
const subclassOf = function(parentClass) {
    const hasParentProperty = Object.prototype.hasOwnProperty.bind(this)("parent");
    const isES6Class = !hasParentProperty && this.parent;
    if (isES6Class) {
        const baseClass = Object.getPrototypeOf(this);
        return baseClass === parentClass || baseClass.subclassOf(parentClass)
    } else {
        if (this.parent === parentClass) {
            return true
        }
        if (!this.parent || !this.parent.subclassOf) {
            return false
        }
        return this.parent.subclassOf(parentClass)
    }
};
const abstract = function() {
    throw _errors.default.Error("E0001")
};
const copyStatic = function() {
    const hasOwn = Object.prototype.hasOwnProperty;
    return function(source, destination) {
        for (const key in source) {
            if (!hasOwn.call(source, key)) {
                return
            }
            destination[key] = source[key]
        }
    }
}();
const classImpl = function() {};
classImpl.inherit = function(members) {
    const inheritor = function() {
        if (!this || (0, _type.isWindow)(this) || "function" !== typeof this.constructor) {
            throw _errors.default.Error("E0003")
        }
        const instance = this;
        const ctor = instance.ctor;
        const includedCtors = instance.constructor._includedCtors;
        const includedPostCtors = instance.constructor._includedPostCtors;
        let i;
        for (i = 0; i < includedCtors.length; i++) {
            includedCtors[i].call(instance)
        }
        if (ctor) {
            ctor.apply(instance, arguments)
        }
        for (i = 0; i < includedPostCtors.length; i++) {
            includedPostCtors[i].call(instance)
        }
    };
    inheritor.prototype = clonePrototype(this);
    copyStatic(this, inheritor);
    inheritor.inherit = this.inherit;
    inheritor.abstract = abstract;
    inheritor.redefine = redefine;
    inheritor.include = include;
    inheritor.subclassOf = subclassOf;
    inheritor.parent = this;
    inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
    inheritor._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
    inheritor.prototype.constructor = inheritor;
    inheritor.redefine(members);
    return inheritor
};
classImpl.abstract = abstract;
var _default = exports.default = classImpl;
module.exports = exports.default;
module.exports.default = exports.default;
