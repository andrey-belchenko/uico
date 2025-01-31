/**
 * DevExtreme (esm/events/hover.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import eventsEngine from "../events/core/events_engine";
import {
    removeData,
    data as elementData
} from "../core/element_data";
import Class from "../core/class";
import devices from "../core/devices";
import registerEvent from "./core/event_registrator";
import {
    addNamespace,
    isTouchEvent,
    fireEvent
} from "./utils/index";
import pointerEvents from "./pointer";
const HOVERSTART_NAMESPACE = "dxHoverStart";
const HOVERSTART = "dxhoverstart";
const POINTERENTER_NAMESPACED_EVENT_NAME = addNamespace(pointerEvents.enter, "dxHoverStart");
const HOVEREND_NAMESPACE = "dxHoverEnd";
const HOVEREND = "dxhoverend";
const POINTERLEAVE_NAMESPACED_EVENT_NAME = addNamespace(pointerEvents.leave, "dxHoverEnd");
const Hover = Class.inherit({
    noBubble: true,
    ctor: function() {
        this._handlerArrayKeyPath = this._eventNamespace + "_HandlerStore"
    },
    setup: function(element) {
        elementData(element, this._handlerArrayKeyPath, {})
    },
    add: function(element, handleObj) {
        const that = this;
        const handler = function(e) {
            that._handler(e)
        };
        eventsEngine.on(element, this._originalEventName, handleObj.selector, handler);
        elementData(element, this._handlerArrayKeyPath)[handleObj.guid] = handler
    },
    _handler: function(e) {
        if (isTouchEvent(e) || devices.isSimulator()) {
            return
        }
        fireEvent({
            type: this._eventName,
            originalEvent: e,
            delegateTarget: e.delegateTarget
        })
    },
    remove: function(element, handleObj) {
        const handler = elementData(element, this._handlerArrayKeyPath)[handleObj.guid];
        eventsEngine.off(element, this._originalEventName, handleObj.selector, handler)
    },
    teardown: function(element) {
        removeData(element, this._handlerArrayKeyPath)
    }
});
const HoverStart = Hover.inherit({
    ctor: function() {
        this._eventNamespace = "dxHoverStart";
        this._eventName = HOVERSTART;
        this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
        this.callBase()
    },
    _handler: function(e) {
        const pointers = e.pointers || [];
        if (!pointers.length) {
            this.callBase(e)
        }
    }
});
const HoverEnd = Hover.inherit({
    ctor: function() {
        this._eventNamespace = "dxHoverEnd";
        this._eventName = HOVEREND;
        this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
        this.callBase()
    }
});
registerEvent(HOVERSTART, new HoverStart);
registerEvent(HOVEREND, new HoverEnd);
export {
    HOVERSTART as start, HOVEREND as end
};
