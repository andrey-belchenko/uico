/**
 * DevExtreme (cjs/events/pointer/base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _class = _interopRequireDefault(require("../../core/class"));
var _index = require("../utils/index");
var _event_target = require("../utils/event_target");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const POINTER_EVENTS_NAMESPACE = "dxPointerEvents";
const BaseStrategy = _class.default.inherit({
    ctor: function(eventName, originalEvents) {
        this._eventName = eventName;
        this._originalEvents = (0, _index.addNamespace)(originalEvents, "dxPointerEvents");
        this._handlerCount = 0;
        this.noBubble = this._isNoBubble()
    },
    _isNoBubble: function() {
        const eventName = this._eventName;
        return "dxpointerenter" === eventName || "dxpointerleave" === eventName
    },
    _handler: function(e) {
        const delegateTarget = this._getDelegateTarget(e);
        const event = {
            type: this._eventName,
            pointerType: e.pointerType || (0, _index.eventSource)(e),
            originalEvent: e,
            delegateTarget: delegateTarget,
            timeStamp: _browser.default.mozilla ? (new Date).getTime() : e.timeStamp
        };
        const target = (0, _event_target.getEventTarget)(e);
        event.target = target;
        return this._fireEvent(event)
    },
    _getDelegateTarget: function(e) {
        let delegateTarget;
        if (this.noBubble) {
            delegateTarget = e.delegateTarget
        }
        return delegateTarget
    },
    _fireEvent: function(args) {
        return (0, _index.fireEvent)(args)
    },
    _setSelector: function(handleObj) {
        this._selector = this.noBubble && handleObj ? handleObj.selector : null
    },
    _getSelector: function() {
        return this._selector
    },
    setup: function() {
        return true
    },
    add: function(element, handleObj) {
        if (this._handlerCount <= 0 || this.noBubble) {
            element = this.noBubble ? element : _dom_adapter.default.getDocument();
            this._setSelector(handleObj);
            const that = this;
            _events_engine.default.on(element, this._originalEvents, this._getSelector(), (function(e) {
                that._handler(e)
            }))
        }
        if (!this.noBubble) {
            this._handlerCount++
        }
    },
    remove: function(handleObj) {
        this._setSelector(handleObj);
        if (!this.noBubble) {
            this._handlerCount--
        }
    },
    teardown: function(element) {
        if (this._handlerCount && !this.noBubble) {
            return
        }
        element = this.noBubble ? element : _dom_adapter.default.getDocument();
        if (".dxPointerEvents" !== this._originalEvents) {
            _events_engine.default.off(element, this._originalEvents, this._getSelector())
        }
    },
    dispose: function(element) {
        element = this.noBubble ? element : _dom_adapter.default.getDocument();
        _events_engine.default.off(element, this._originalEvents)
    }
});
var _default = exports.default = BaseStrategy;
module.exports = exports.default;
module.exports.default = exports.default;
