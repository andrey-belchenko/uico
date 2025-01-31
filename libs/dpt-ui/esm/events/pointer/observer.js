/**
 * DevExtreme (esm/events/pointer/observer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    each
} from "../../core/utils/iterator";
import readyCallbacks from "../../core/utils/ready_callbacks";
import domAdapter from "../../core/dom_adapter";
const addEventsListener = function(events, handler) {
    readyCallbacks.add((function() {
        events.split(" ").forEach((function(event) {
            domAdapter.listen(domAdapter.getDocument(), event, handler, true)
        }))
    }))
};
const Observer = function(eventMap, pointerEquals, onPointerAdding) {
    onPointerAdding = onPointerAdding || function() {};
    let pointers = [];
    const getPointerIndex = function(e) {
        let index = -1;
        each(pointers, (function(i, pointer) {
            if (!pointerEquals(e, pointer)) {
                return true
            }
            index = i;
            return false
        }));
        return index
    };
    const removePointer = function(e) {
        const index = getPointerIndex(e);
        if (index > -1) {
            pointers.splice(index, 1)
        }
    };
    addEventsListener(eventMap.dxpointerdown, (function(e) {
        if (-1 === getPointerIndex(e)) {
            onPointerAdding(e);
            pointers.push(e)
        }
    }));
    addEventsListener(eventMap.dxpointermove, (function(e) {
        pointers[getPointerIndex(e)] = e
    }));
    addEventsListener(eventMap.dxpointerup, removePointer);
    addEventsListener(eventMap.dxpointercancel, removePointer);
    this.pointers = function() {
        return pointers
    };
    this.reset = function() {
        pointers = []
    }
};
export default Observer;
