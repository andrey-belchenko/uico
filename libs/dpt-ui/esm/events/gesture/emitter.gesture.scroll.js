/**
 * DevExtreme (esm/events/gesture/emitter.gesture.scroll.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import eventsEngine from "../../events/core/events_engine";
import Class from "../../core/class";
const abstract = Class.abstract;
import {
    addNamespace,
    isDxMouseWheelEvent,
    isMouseEvent,
    eventData,
    eventDelta
} from "../../events/utils/index";
import GestureEmitter from "../../events/gesture/emitter.gesture";
import registerEmitter from "../../events/core/emitter_registrator";
import {
    requestAnimationFrame,
    cancelAnimationFrame
} from "../../animation/frame";
import devices from "../../core/devices";
const realDevice = devices.real();
const SCROLL_EVENT = "scroll";
const SCROLL_INIT_EVENT = "dxscrollinit";
const SCROLL_START_EVENT = "dxscrollstart";
const SCROLL_MOVE_EVENT = "dxscroll";
const SCROLL_END_EVENT = "dxscrollend";
const SCROLL_STOP_EVENT = "dxscrollstop";
const SCROLL_CANCEL_EVENT = "dxscrollcancel";
const Locker = Class.inherit(function() {
    const NAMESPACED_SCROLL_EVENT = addNamespace("scroll", "dxScrollEmitter");
    return {
        ctor: function(element) {
            this._element = element;
            this._locked = false;
            this._proxiedScroll = e => {
                if (!this._disposed) {
                    this._scroll(e)
                }
            };
            eventsEngine.on(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll)
        },
        _scroll: abstract,
        check: function(e, callback) {
            if (this._locked) {
                callback()
            }
        },
        dispose: function() {
            this._disposed = true;
            eventsEngine.off(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll)
        }
    }
}());
const TimeoutLocker = Locker.inherit({
    ctor: function(element, timeout) {
        this.callBase(element);
        this._timeout = timeout
    },
    _scroll: function() {
        this._prepare();
        this._forget()
    },
    _prepare: function() {
        if (this._timer) {
            this._clearTimer()
        }
        this._locked = true
    },
    _clearTimer: function() {
        clearTimeout(this._timer);
        this._locked = false;
        this._timer = null
    },
    _forget: function() {
        const that = this;
        this._timer = setTimeout((function() {
            that._clearTimer()
        }), this._timeout)
    },
    dispose: function() {
        this.callBase();
        this._clearTimer()
    }
});
const WheelLocker = TimeoutLocker.inherit({
    ctor: function(element) {
        this.callBase(element, 400);
        this._lastWheelDirection = null
    },
    check: function(e, callback) {
        this._checkDirectionChanged(e);
        this.callBase(e, callback)
    },
    _checkDirectionChanged: function(e) {
        if (!isDxMouseWheelEvent(e)) {
            this._lastWheelDirection = null;
            return
        }
        const direction = e.shiftKey || false;
        const directionChange = null !== this._lastWheelDirection && direction !== this._lastWheelDirection;
        this._lastWheelDirection = direction;
        this._locked = this._locked && !directionChange
    }
});
let PointerLocker = TimeoutLocker.inherit({
    ctor: function(element) {
        this.callBase(element, 400)
    }
});
! function() {
    const {
        ios: isIos,
        android: isAndroid
    } = realDevice;
    if (!(isIos || isAndroid)) {
        return
    }
    PointerLocker = Locker.inherit({
        _scroll: function() {
            this._locked = true;
            const that = this;
            cancelAnimationFrame(this._scrollFrame);
            this._scrollFrame = requestAnimationFrame((function() {
                that._locked = false
            }))
        },
        check: function(e, callback) {
            cancelAnimationFrame(this._scrollFrame);
            cancelAnimationFrame(this._checkFrame);
            const that = this;
            const callBase = this.callBase;
            this._checkFrame = requestAnimationFrame((function() {
                callBase.call(that, e, callback);
                that._locked = false
            }))
        },
        dispose: function() {
            this.callBase();
            cancelAnimationFrame(this._scrollFrame);
            cancelAnimationFrame(this._checkFrame)
        }
    })
}();
const ScrollEmitter = GestureEmitter.inherit(function() {
    const FRAME_DURATION = Math.round(1e3 / 60);
    return {
        ctor: function(element) {
            this.callBase.apply(this, arguments);
            this.direction = "both";
            this._pointerLocker = new PointerLocker(element);
            this._wheelLocker = new WheelLocker(element)
        },
        validate: function() {
            return true
        },
        configure: function(data) {
            if (data.scrollTarget) {
                this._pointerLocker.dispose();
                this._wheelLocker.dispose();
                this._pointerLocker = new PointerLocker(data.scrollTarget);
                this._wheelLocker = new WheelLocker(data.scrollTarget)
            }
            this.callBase(data)
        },
        _init: function(e) {
            this._wheelLocker.check(e, function() {
                if (isDxMouseWheelEvent(e)) {
                    this._accept(e)
                }
            }.bind(this));
            this._pointerLocker.check(e, function() {
                const skipCheck = this.isNative && isMouseEvent(e);
                if (!isDxMouseWheelEvent(e) && !skipCheck) {
                    this._accept(e)
                }
            }.bind(this));
            this._fireEvent("dxscrollinit", e);
            this._prevEventData = eventData(e)
        },
        move: function(e) {
            this.callBase.apply(this, arguments);
            e.isScrollingEvent = this.isNative || e.isScrollingEvent
        },
        _start: function(e) {
            this._savedEventData = eventData(e);
            this._fireEvent("dxscrollstart", e);
            this._prevEventData = eventData(e)
        },
        _move: function(e) {
            const currentEventData = eventData(e);
            this._fireEvent("dxscroll", e, {
                delta: eventDelta(this._prevEventData, currentEventData)
            });
            const delta = eventDelta(this._savedEventData, currentEventData);
            if (delta.time > 200) {
                this._savedEventData = this._prevEventData
            }
            this._prevEventData = eventData(e)
        },
        _end: function(e) {
            const endEventDelta = eventDelta(this._prevEventData, eventData(e));
            let velocity = {
                x: 0,
                y: 0
            };
            if (!isDxMouseWheelEvent(e) && endEventDelta.time < 100) {
                const delta = eventDelta(this._savedEventData, this._prevEventData);
                const velocityMultiplier = FRAME_DURATION / delta.time;
                velocity = {
                    x: delta.x * velocityMultiplier,
                    y: delta.y * velocityMultiplier
                }
            }
            this._fireEvent("dxscrollend", e, {
                velocity: velocity
            })
        },
        _stop: function(e) {
            this._fireEvent("dxscrollstop", e)
        },
        cancel: function(e) {
            this.callBase.apply(this, arguments);
            this._fireEvent("dxscrollcancel", e)
        },
        dispose: function() {
            this.callBase.apply(this, arguments);
            this._pointerLocker.dispose();
            this._wheelLocker.dispose()
        },
        _clearSelection: function() {
            if (this.isNative) {
                return
            }
            return this.callBase.apply(this, arguments)
        },
        _toggleGestureCover: function() {
            if (this.isNative) {
                return
            }
            return this.callBase.apply(this, arguments)
        }
    }
}());
registerEmitter({
    emitter: ScrollEmitter,
    events: ["dxscrollinit", "dxscrollstart", "dxscroll", "dxscrollend", "dxscrollstop", "dxscrollcancel"]
});
export default {
    init: "dxscrollinit",
    start: "dxscrollstart",
    move: "dxscroll",
    end: "dxscrollend",
    stop: "dxscrollstop",
    cancel: "dxscrollcancel",
    scroll: "scroll"
};
