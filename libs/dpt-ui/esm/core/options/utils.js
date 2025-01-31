/**
 * DevExtreme (esm/core/options/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import devices from "../devices";
import {
    isEmptyObject,
    isFunction
} from "../utils/type";
import {
    findBestMatches
} from "../utils/common";
import {
    extend
} from "../utils/extend";
import {
    compileGetter
} from "../utils/data";
const cachedGetters = {};
export const convertRulesToOptions = rules => {
    const currentDevice = devices.current();
    return rules.reduce(((options, _ref) => {
        let {
            device: device,
            options: ruleOptions
        } = _ref;
        const deviceFilter = device || {};
        const match = isFunction(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
        if (match) {
            extend(true, options, ruleOptions)
        }
        return options
    }), {})
};
export const normalizeOptions = (options, value) => "string" !== typeof options ? options : {
    [options]: value
};
export const deviceMatch = (device, filter) => isEmptyObject(filter) || findBestMatches(device, [filter]).length > 0;
export const getFieldName = fullName => fullName.substr(fullName.lastIndexOf(".") + 1);
export const getParentName = fullName => fullName.substr(0, fullName.lastIndexOf("."));
export const getNestedOptionValue = function(optionsObject, name) {
    cachedGetters[name] = cachedGetters[name] || compileGetter(name);
    return cachedGetters[name](optionsObject, {
        functionsAsIs: true
    })
};
export const createDefaultOptionRules = function() {
    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return options
};
