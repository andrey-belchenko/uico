/**
 * DevExtreme (cjs/events/gesture/emitter.gesture.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _style = require("../../core/utils/style");
var _call_once = _interopRequireDefault(require("../../core/utils/call_once"));
var _dom = require("../../core/utils/dom");
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
var _math = require("../../core/utils/math");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _index = require("../utils/index");
var _emitter = _interopRequireDefault(require("../core/emitter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const ready = _ready_callbacks.default.add;
const abs = Math.abs;
const SLEEP = 0;
const INITED = 1;
const STARTED = 2;
let TOUCH_BOUNDARY = 10;
const IMMEDIATE_TOUCH_BOUNDARY = 0;
const IMMEDIATE_TIMEOUT = 180;
const supportPointerEvents = function() {
    return (0, _style.styleProp)("pointer-events")
};
const setGestureCover = (0, _call_once.default)((function() {
    const isDesktop = "desktop" === _devices.default.real().deviceType;
    if (!supportPointerEvents() || !isDesktop) {
        return _common.noop
    }
    const $cover = (0, _renderer.default)("<div>").addClass("dx-gesture-cover").css("pointerEvents", "none");
    _events_engine.default.subscribeGlobal($cover, "dxmousewheel", (function(e) {
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
const GestureEmitter = _emitter.default.inherit({
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
        if (e._needSkipEvent || (0, _index.needSkipEvent)(e)) {
            this._cancel(e);
            return
        }
        this._startEvent = (0, _index.createEvent)(e);
        this._startEventData = (0, _index.eventData)(e);
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
        const delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
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
        return this.immediate || (0, _index.isDxMouseWheelEvent)(e) ? 0 : TOUCH_BOUNDARY
    },
    _adjustStartEvent: function(e) {
        const touchBoundary = this._getTouchBoundary(e);
        const delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
        this._startEvent.pageX += (0, _math.sign)(delta.x) * touchBoundary;
        this._startEvent.pageY += (0, _math.sign)(delta.y) * touchBoundary
    },
    _resetActiveElement: function() {
        if ("ios" === _devices.default.real().platform && this.getElement().find(":focus").length) {
            (0, _dom.resetActiveElement)()
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
        if ((0, _index.isDxMouseWheelEvent)(e) || (0, _index.isTouchEvent)(e)) {
            return
        }(0, _dom.clearSelection)()
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
    _init: _common.noop,
    _start: _common.noop,
    _move: _common.noop,
    _stop: _common.noop,
    _end: _common.noop
});
GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
GestureEmitter.touchBoundary = function(newBoundary) {
    if ((0, _type.isDefined)(newBoundary)) {
        TOUCH_BOUNDARY = newBoundary;
        return
    }
    return TOUCH_BOUNDARY
};
var _default = exports.default = GestureEmitter;
module.exports = exports.default;
module.exports.default = exports.default;
