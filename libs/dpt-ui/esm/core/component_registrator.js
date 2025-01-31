/**
 * DevExtreme (esm/core/component_registrator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "./renderer";
import callbacks from "./component_registrator_callbacks";
import errors from "./errors";
import {
    name as publicComponentName
} from "./utils/public_component";
const registerComponent = function(name, namespace, componentClass) {
    if (!componentClass) {
        componentClass = namespace
    } else {
        namespace[name] = componentClass
    }
    publicComponentName(componentClass, name);
    callbacks.fire(name, componentClass)
};
const registerRendererComponent = function(name, componentClass) {
    $.fn[name] = function(options) {
        const isMemberInvoke = "string" === typeof options;
        let result;
        if (isMemberInvoke) {
            const memberName = options;
            const memberArgs = [].slice.call(arguments).slice(1);
            this.each((function() {
                const instance = componentClass.getInstance(this);
                if (!instance) {
                    throw errors.Error("E0009", name)
                }
                const member = instance[memberName];
                const memberValue = member.apply(instance, memberArgs);
                if (void 0 === result) {
                    result = memberValue
                }
            }))
        } else {
            this.each((function() {
                const instance = componentClass.getInstance(this);
                if (instance) {
                    instance.option(options)
                } else {
                    new componentClass(this, options)
                }
            }));
            result = this
        }
        return result
    }
};
callbacks.add(registerRendererComponent);
export default registerComponent;
