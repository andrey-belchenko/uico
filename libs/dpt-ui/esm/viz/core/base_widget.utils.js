/**
 * DevExtreme (esm/viz/core/base_widget.utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    version
} from "../../core/version";
import {
    format as _stringFormat
} from "../../core/utils/string";
import warnings from "./errors_warnings";
import {
    each
} from "../../core/utils/iterator";
import _windowResizeCallbacks from "../../core/utils/resize_callbacks";
import resizeObserverSingleton from "../../core/resize_observer";
import {
    normalizeEnum
} from "./utils";
const ERROR_MESSAGES = warnings.ERROR_MESSAGES;
export function createEventTrigger(eventsMap, callbackGetter) {
    let triggers = {};
    each(eventsMap, (function(name, info) {
        if (info.name) {
            createEvent(name)
        }
    }));
    let changes;
    triggerEvent.change = function(name) {
        const eventInfo = eventsMap[name];
        if (eventInfo) {
            (changes = changes || {})[name] = eventInfo
        }
        return !!eventInfo
    };
    triggerEvent.applyChanges = function() {
        if (changes) {
            each(changes, (function(name, eventInfo) {
                createEvent(eventInfo.newName || name)
            }));
            changes = null
        }
    };
    triggerEvent.dispose = function() {
        eventsMap = callbackGetter = triggers = null
    };
    return triggerEvent;

    function createEvent(name) {
        const eventInfo = eventsMap[name];
        triggers[eventInfo.name] = callbackGetter(name, eventInfo.actionSettings)
    }

    function triggerEvent(name, arg, complete) {
        triggers[name](arg);
        complete && complete()
    }
}
export let createIncidentOccurred = function(widgetName, eventTrigger) {
    return function(id, args) {
        eventTrigger("incidentOccurred", {
            target: {
                id: id,
                type: "E" === id[0] ? "error" : "warning",
                args: args,
                text: _stringFormat.apply(null, [ERROR_MESSAGES[id]].concat(args || [])),
                widget: widgetName,
                version: version
            }
        })
    }
};

function getResizeManager(resizeCallback) {
    return (observe, unsubscribe) => {
        const {
            handler: handler,
            dispose: dispose
        } = createDeferredHandler(resizeCallback, unsubscribe);
        observe(handler);
        return dispose
    }
}

function createDeferredHandler(callback, unsubscribe) {
    let timeout;
    const handler = function() {
        clearTimeout(timeout);
        timeout = setTimeout(callback, 100)
    };
    return {
        handler: handler,
        dispose() {
            clearTimeout(timeout);
            unsubscribe(handler)
        }
    }
}
export function createResizeHandler(contentElement, redrawOnResize, resize) {
    let disposeHandler;
    const resizeManager = getResizeManager(resize);
    if ("windowonly" === normalizeEnum(redrawOnResize)) {
        disposeHandler = resizeManager((handler => _windowResizeCallbacks.add(handler)), (handler => _windowResizeCallbacks.remove(handler)))
    } else if (true === redrawOnResize) {
        disposeHandler = resizeManager((handler => resizeObserverSingleton.observe(contentElement, handler)), (() => resizeObserverSingleton.unobserve(contentElement)))
    }
    return disposeHandler
}
