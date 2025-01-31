/**
 * DevExtreme (esm/events/pointer/touch.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import devices from "../../core/devices";
import {
    extend
} from "../../core/utils/extend";
import {
    each
} from "../../core/utils/iterator";
import BaseStrategy from "./base";
const eventMap = {
    dxpointerdown: "touchstart",
    dxpointermove: "touchmove",
    dxpointerup: "touchend",
    dxpointercancel: "touchcancel",
    dxpointerover: "",
    dxpointerout: "",
    dxpointerenter: "",
    dxpointerleave: ""
};
const normalizeTouchEvent = function(e) {
    const pointers = [];
    each(e.touches, (function(_, touch) {
        pointers.push(extend({
            pointerId: touch.identifier
        }, touch))
    }));
    return {
        pointers: pointers,
        pointerId: e.changedTouches[0].identifier
    }
};
const skipTouchWithSameIdentifier = function(pointerEvent) {
    return "ios" === devices.real().platform && ("dxpointerdown" === pointerEvent || "dxpointerup" === pointerEvent)
};
const TouchStrategy = BaseStrategy.inherit({
    ctor: function() {
        this.callBase.apply(this, arguments);
        this._pointerId = 0
    },
    _handler: function(e) {
        if (skipTouchWithSameIdentifier(this._eventName)) {
            const touch = e.changedTouches[0];
            if (this._pointerId === touch.identifier && 0 !== this._pointerId) {
                return
            }
            this._pointerId = touch.identifier
        }
        return this.callBase.apply(this, arguments)
    },
    _fireEvent: function(args) {
        return this.callBase(extend(normalizeTouchEvent(args.originalEvent), args))
    }
});
TouchStrategy.map = eventMap;
TouchStrategy.normalize = normalizeTouchEvent;
export default TouchStrategy;
