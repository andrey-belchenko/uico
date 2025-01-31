/**
 * DevExtreme (cjs/__internal/core/r1/utils/update_props_immutable.js)
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
exports.updatePropsImmutable = void 0;
var _data = require("../../../../core/utils/data");
var _type = require("../../../../core/utils/type");

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const cloneObjectValue = value => Array.isArray(value) ? [...value] : _extends({}, value);
const cloneObjectProp = (value, prevValue, fullNameParts) => {
    const result = fullNameParts.length > 0 && prevValue && value !== prevValue ? cloneObjectValue(prevValue) : cloneObjectValue(value);
    const name = fullNameParts[0];
    if (fullNameParts.length > 1) {
        result[name] = cloneObjectProp(value[name], null === prevValue || void 0 === prevValue ? void 0 : prevValue[name], fullNameParts.slice(1))
    } else if (name) {
        if ((0, _type.isPlainObject)(value[name])) {
            result[name] = cloneObjectValue(value[name])
        } else {
            result[name] = value[name]
        }
    }
    return result
};
const updatePropsImmutable = (props, option, name, fullName) => {
    const currentPropsValue = option[name];
    const prevPropsValue = props[name];
    const result = props;
    if ((0, _type.isPlainObject)(currentPropsValue) || name !== fullName && Array.isArray(currentPropsValue)) {
        result[name] = cloneObjectProp(currentPropsValue, prevPropsValue, (0, _data.getPathParts)(fullName).slice(1))
    } else {
        result[name] = currentPropsValue
    }
};
exports.updatePropsImmutable = updatePropsImmutable;
