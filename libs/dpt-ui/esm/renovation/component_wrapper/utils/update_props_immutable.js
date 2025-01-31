/**
 * DevExtreme (esm/renovation/component_wrapper/utils/update_props_immutable.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    isPlainObject
} from "../../../core/utils/type";
import {
    getPathParts
} from "../../../core/utils/data";

function cloneObjectValue(value) {
    return Array.isArray(value) ? [...value] : _extends({}, value)
}

function cloneObjectProp(value, prevValue, fullNameParts) {
    const result = fullNameParts.length > 0 && prevValue && value !== prevValue ? cloneObjectValue(prevValue) : cloneObjectValue(value);
    const name = fullNameParts[0];
    if (fullNameParts.length > 1) {
        result[name] = cloneObjectProp(value[name], null === prevValue || void 0 === prevValue ? void 0 : prevValue[name], fullNameParts.slice(1))
    } else if (name) {
        if (isPlainObject(value[name])) {
            result[name] = cloneObjectValue(value[name])
        } else {
            result[name] = value[name]
        }
    }
    return result
}
export function updatePropsImmutable(props, option, name, fullName) {
    const currentPropsValue = option[name];
    const prevPropsValue = props[name];
    const result = props;
    if (isPlainObject(currentPropsValue) || name !== fullName && Array.isArray(currentPropsValue)) {
        result[name] = cloneObjectProp(currentPropsValue, prevPropsValue, getPathParts(fullName).slice(1))
    } else {
        result[name] = currentPropsValue
    }
}
