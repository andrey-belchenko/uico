/**
 * DevExtreme (esm/events/core/event_registrator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    each
} from "../../core/utils/iterator";
import callbacks from "./event_registrator_callbacks";
const registerEvent = function(name, eventObject) {
    const strategy = {};
    if ("noBubble" in eventObject) {
        strategy.noBubble = eventObject.noBubble
    }
    if ("bindType" in eventObject) {
        strategy.bindType = eventObject.bindType
    }
    if ("delegateType" in eventObject) {
        strategy.delegateType = eventObject.delegateType
    }
    each(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], (function(_, methodName) {
        if (!eventObject[methodName]) {
            return
        }
        strategy[methodName] = function() {
            const args = [].slice.call(arguments);
            args.unshift(this);
            return eventObject[methodName].apply(eventObject, args)
        }
    }));
    callbacks.fire(name, strategy)
};
registerEvent.callbacks = callbacks;
export default registerEvent;
