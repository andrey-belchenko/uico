/**
 * DevExtreme (esm/events/gesture/emitter.gesture.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import devices from "../../core/devices";
import {
    styleProp
} from "../../core/utils/style";
import callOnce from "../../core/utils/call_once";
import {
    resetActiveElement,
    clearSelection
} from "../../core/utils/dom";
import readyCallbacks from "../../core/utils/ready_callbacks";
const ready = readyCallbacks.add;
import {
    sign
} from "../../core/utils/math";
import {
    noop
} from "../../core/utils/common";
import {
    isDefined
} from "../../core/utils/type";
import {
    needSkipEvent,
    createEvent,
    eventData,
    isDxMouseWheelEvent,
    eventDelta,
    isTouchEvent
} from "../utils/index";
import Emitter from "../core/emitter";
const abs = Math.abs;
const SLEEP = 0;
const INITED = 1;
const STARTED = 2;
let TOUCH_BOUNDARY = 10;
const IMMEDIATE_TOUCH_BOUNDARY = 0;
const IMMEDIATE_TIMEOUT = 180;
const supportPointerEvents = function() {
    return styleProp("pointer-events")
};
const setGestureCover = callOnce((function() {
    const isDesktop = "desktop" === devices.real().deviceType;
    if (!supportPointerEvents() || !isDesktop) {
        return noop
    }
    const $cover = $("<div>").addClass("dx-gesture-cover").css("pointerEvents", "none");
    eventsEngine.subscribeGlobal($cover, "dxmousewheel", (function(e) {
        e.preventDefault()
    }));
    ready((function() {
        $cover.appendTo("body")
    }));
    return function(toggle, cursor) {
        $cover.css("pointerEvents", toggle ? "all" : "none");
        toggle && $cover.css("cursor", cursor)
    }
}));
const gestureCover = function(toggle, cursor) {
    const gestureCoverStrategy = setGestureCover();
    gestureCoverStrategy(toggle, cursor)
};
const GestureEmitter = Emitter.inherit({
    gesture: true,
    configure: function(data) {
        this.getElement().css("msTouchAction", data.immediate ? "pinch-zoom" : "");
        this.callBase(data)
    },
    allowInterruptionByMouseWheel: function() {
        return 2 !== this._stage
    },
    getDirection: function() {
        return this.direction
    },
    _cancel: function() {
        this.callBase.apply(this, arguments);
        this._toggleGestureCover(false);
        this._stage = 0
    },
    start: function(e) {
        if (e._needSkipEvent || needSkipEvent(e)) {
            this._cancel(e);
            return
        }
        this._startEvent = createEvent(e);
        this._startEventData = eventData(e);
        this._stage = 1;
        this._init(e);
        this._setupImmediateTimer()
    },
    _setupImmediateTimer: function() {
        clearTimeout(this._immediateTimer);
        this._immediateAccepted = false;
        if (!this.immediate) {
            return
        }
        if (0 === this.immediateTimeout) {
            this._immediateAccepted = true;
            return
        }
        this._immediateTimer = setTimeout(function() {
            this._immediateAccepted = true
        }.bind(this), this.immediateTimeout ?? 180)
    },
    move: function(e) {
        if (1 === this._stage && this._directionConfirmed(e)) {
            this._stage = 2;
            this._resetActiveElement();
            this._toggleGestureCover(true);
            this._clearSelection(e);
            this._adjustStartEvent(e);
            this._start(this._startEvent);
            if (0 === this._stage) {
                return
            }
            this._requestAccept(e);
            this._move(e);
            this._forgetAccept()
        } else if (2 === this._stage) {
            this._clearSelection(e);
            this._move(e)
        }
    },
    _directionConfirmed: function(e) {
        const touchBoundary = this._getTouchBoundary(e);
        const delta = eventDelta(this._startEventData, eventData(e));
        const deltaX = abs(delta.x);
        const deltaY = abs(delta.y);
        const horizontalMove = this._validateMove(touchBoundary, deltaX, deltaY);
        const verticalMove = this._validateMove(touchBoundary, deltaY, deltaX);
        const direction = this.getDirection(e);
        const bothAccepted = "both" === direction && (horizontalMove || verticalMove);
        const horizontalAccepted = "horizontal" === direction && horizontalMove;
        const verticalAccepted = "vertical" === direction && verticalMove;
        return bothAccepted || horizontalAccepted || verticalAccepted || this._immediateAccepted
    },
    _validateMove: function(touchBoundary, mainAxis, crossAxis) {
        return mainAxis && mainAxis >= touchBoundary && (this.immediate ? mainAxis >= crossAxis : true)
    },
    _getTouchBoundary: function(e) {
        return this.immediate || isDxMouseWheelEvent(e) ? 0 : TOUCH_BOUNDARY
    },
    _adjustStartEvent: function(e) {
        const touchBoundary = this._getTouchBoundary(e);
        const delta = eventDelta(this._startEventData, eventData(e));
        this._startEvent.pageX += sign(delta.x) * touchBoundary;
        this._startEvent.pageY += sign(delta.y) * touchBoundary
    },
    _resetActiveElement: function() {
        if ("ios" === devices.real().platform && this.getElement().find(":focus").length) {
            resetActiveElement()
        }
    },
    _toggleGestureCover: function(toggle) {
        this._toggleGestureCoverImpl(toggle)
    },
    _toggleGestureCoverImpl: function(toggle) {
        const isStarted = 2 === this._stage;
        if (isStarted) {
            gestureCover(toggle, this.getElement().css("cursor"))
        }
    },
    _clearSelection: function(e) {
        if (isDxMouseWheelEvent(e) || isTouchEvent(e)) {
            return
        }
        clearSelection()
    },
    end: function(e) {
        this._toggleGestureCover(false);
        if (2 === this._stage) {
            this._end(e)
        } else if (1 === this._stage) {
            this._stop(e)
        }
        this._stage = 0
    },
    dispose: function() {
        clearTimeout(this._immediateTimer);
        this.callBase.apply(this, arguments);
        this._toggleGestureCover(false)
    },
    _init: noop,
    _start: noop,
    _move: noop,
    _stop: noop,
    _end: noop
});
GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
GestureEmitter.touchBoundary = function(newBoundary) {
    if (isDefined(newBoundary)) {
        TOUCH_BOUNDARY = newBoundary;
        return
    }
    return TOUCH_BOUNDARY
};
export default GestureEmitter;
