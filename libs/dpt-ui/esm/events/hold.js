/**
 * DevExtreme (esm/events/hold.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    eventData,
    eventDelta
} from "./utils/index";
import Emitter from "./core/emitter";
import registerEmitter from "./core/emitter_registrator";
const abs = Math.abs;
const HOLD_EVENT_NAME = "dxhold";
const HOLD_TIMEOUT = 750;
const TOUCH_BOUNDARY = 5;
const HoldEmitter = Emitter.inherit({
    start: function(e) {
        this._startEventData = eventData(e);
        this._startTimer(e)
    },
    _startTimer: function(e) {
        const holdTimeout = "timeout" in this ? this.timeout : 750;
        this._holdTimer = setTimeout(function() {
            this._requestAccept(e);
            this._fireEvent("dxhold", e, {
                target: e.target
            });
            this._forgetAccept()
        }.bind(this), holdTimeout)
    },
    move: function(e) {
        if (this._touchWasMoved(e)) {
            this._cancel(e)
        }
    },
    _touchWasMoved: function(e) {
        const delta = eventDelta(this._startEventData, eventData(e));
        return abs(delta.x) > 5 || abs(delta.y) > 5
    },
    end: function() {
        this._stopTimer()
    },
    _stopTimer: function() {
        clearTimeout(this._holdTimer)
    },
    cancel: function() {
        this._stopTimer()
    },
    dispose: function() {
        this._stopTimer()
    }
});
registerEmitter({
    emitter: HoldEmitter,
    bubble: true,
    events: ["dxhold"]
});
export default {
    name: "dxhold"
};
