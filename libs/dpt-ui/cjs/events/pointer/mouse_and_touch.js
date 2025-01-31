/**
 * DevExtreme (cjs/events/pointer/mouse_and_touch.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend = require("../../core/utils/extend");
var _base = _interopRequireDefault(require("./base"));
var _mouse = _interopRequireDefault(require("./mouse"));
var _touch = _interopRequireDefault(require("./touch"));
var _index = require("../utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const eventMap = {
    dxpointerdown: "touchstart mousedown",
    dxpointermove: "touchmove mousemove",
    dxpointerup: "touchend mouseup",
    dxpointercancel: "touchcancel",
    dxpointerover: "mouseover",
    dxpointerout: "mouseout",
    dxpointerenter: "mouseenter",
    dxpointerleave: "mouseleave"
};
let activated = false;
const activateStrategy = function() {
    if (activated) {
        return
    }
    _mouse.default.activate();
    activated = true
};
const MouseAndTouchStrategy = _base.default.inherit({
    EVENT_LOCK_TIMEOUT: 100,
    ctor: function() {
        this.callBase.apply(this, arguments);
        activateStrategy()
    },
    _handler: function(e) {
        const isMouse = (0, _index.isMouseEvent)(e);
        if (!isMouse) {
            this._skipNextEvents = true
        }
        if (isMouse && this._mouseLocked) {
            return
        }
        if (isMouse && this._skipNextEvents) {
            this._skipNextEvents = false;
            this._mouseLocked = true;
            clearTimeout(this._unlockMouseTimer);
            const that = this;
            this._unlockMouseTimer = setTimeout((function() {
                that._mouseLocked = false
            }), this.EVENT_LOCK_TIMEOUT);
            return
        }
        return this.callBase(e)
    },
    _fireEvent: function(args) {
        const normalizer = (0, _index.isMouseEvent)(args.originalEvent) ? _mouse.default.normalize : _touch.default.normalize;
        return this.callBase((0, _extend.extend)(normalizer(args.originalEvent), args))
    },
    dispose: function() {
        this.callBase();
        this._skipNextEvents = false;
        this._mouseLocked = false;
        clearTimeout(this._unlockMouseTimer)
    }
});
MouseAndTouchStrategy.map = eventMap;
MouseAndTouchStrategy.resetObserver = _mouse.default.resetObserver;
var _default = exports.default = MouseAndTouchStrategy;
module.exports = exports.default;
module.exports.default = exports.default;
