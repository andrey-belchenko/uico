/**
 * DevExtreme (cjs/events/pointer/touch.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _devices = _interopRequireDefault(require("../../core/devices"));
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
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
    (0, _iterator.each)(e.touches, (function(_, touch) {
        pointers.push((0, _extend.extend)({
            pointerId: touch.identifier
        }, touch))
    }));
    return {
        pointers: pointers,
        pointerId: e.changedTouches[0].identifier
    }
};
const skipTouchWithSameIdentifier = function(pointerEvent) {
    return "ios" === _devices.default.real().platform && ("dxpointerdown" === pointerEvent || "dxpointerup" === pointerEvent)
};
const TouchStrategy = _base.default.inherit({
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
        return this.callBase((0, _extend.extend)(normalizeTouchEvent(args.originalEvent), args))
    }
});
TouchStrategy.map = eventMap;
TouchStrategy.normalize = normalizeTouchEvent;
var _default = exports.default = TouchStrategy;
module.exports = exports.default;
module.exports.default = exports.default;
