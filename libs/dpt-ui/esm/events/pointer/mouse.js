/**
 * DevExtreme (esm/events/pointer/mouse.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../core/utils/extend";
import BaseStrategy from "./base";
import Observer from "./observer";
const eventMap = {
    dxpointerdown: "mousedown",
    dxpointermove: "mousemove",
    dxpointerup: "mouseup",
    dxpointercancel: "",
    dxpointerover: "mouseover",
    dxpointerout: "mouseout",
    dxpointerenter: "mouseenter",
    dxpointerleave: "mouseleave"
};
const normalizeMouseEvent = function(e) {
    e.pointerId = 1;
    return {
        pointers: observer.pointers(),
        pointerId: 1
    }
};
let observer;
let activated = false;
const activateStrategy = function() {
    if (activated) {
        return
    }
    observer = new Observer(eventMap, (function() {
        return true
    }));
    activated = true
};
const MouseStrategy = BaseStrategy.inherit({
    ctor: function() {
        this.callBase.apply(this, arguments);
        activateStrategy()
    },
    _fireEvent: function(args) {
        return this.callBase(extend(normalizeMouseEvent(args.originalEvent), args))
    }
});
MouseStrategy.map = eventMap;
MouseStrategy.normalize = normalizeMouseEvent;
MouseStrategy.activate = activateStrategy;
MouseStrategy.resetObserver = function() {
    observer.reset()
};
export default MouseStrategy;
