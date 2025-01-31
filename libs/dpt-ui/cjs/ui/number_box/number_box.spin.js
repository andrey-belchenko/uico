/**
 * DevExtreme (cjs/ui/number_box/number_box.spin.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _extend = require("../../core/utils/extend");
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _emitter = require("../../events/core/emitter.feedback");
var _hold = _interopRequireDefault(require("../../events/hold"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const SPIN_CLASS = "dx-numberbox-spin";
const SPIN_BUTTON_CLASS = "dx-numberbox-spin-button";
const SPIN_HOLD_DELAY = 100;
const NUMBER_BOX = "dxNumberBox";
const POINTERUP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, NUMBER_BOX);
const POINTERCANCEL_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.cancel, NUMBER_BOX);
const SpinButton = _ui.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            direction: "up",
            onChange: null,
            activeStateEnabled: true,
            hoverStateEnabled: true
        })
    },
    _initMarkup: function() {
        this.callBase();
        const direction = SPIN_CLASS + "-" + this.option("direction");
        this.$element().addClass(SPIN_BUTTON_CLASS).addClass(direction);
        this._spinIcon = (0, _renderer.default)("<div>").addClass(direction + "-icon").appendTo(this.$element())
    },
    _render: function() {
        this.callBase();
        const eventName = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
        const $element = this.$element();
        _events_engine.default.off($element, eventName);
        _events_engine.default.on($element, eventName, this._spinDownHandler.bind(this));
        this._spinChangeHandler = this._createActionByOption("onChange")
    },
    _spinDownHandler: function(e) {
        e.preventDefault();
        this._clearTimer();
        _events_engine.default.on(this.$element(), _hold.default.name, function() {
            this._feedBackDeferred = new _deferred.Deferred;
            (0, _emitter.lock)(this._feedBackDeferred);
            this._spinChangeHandler({
                event: e
            });
            this._holdTimer = setInterval(this._spinChangeHandler, 100, {
                event: e
            })
        }.bind(this));
        const document = _dom_adapter.default.getDocument();
        _events_engine.default.on(document, POINTERUP_EVENT_NAME, this._clearTimer.bind(this));
        _events_engine.default.on(document, POINTERCANCEL_EVENT_NAME, this._clearTimer.bind(this));
        this._spinChangeHandler({
            event: e
        })
    },
    _dispose: function() {
        this._clearTimer();
        this.callBase()
    },
    _clearTimer: function() {
        _events_engine.default.off(this.$element(), _hold.default.name);
        const document = _dom_adapter.default.getDocument();
        _events_engine.default.off(document, POINTERUP_EVENT_NAME);
        _events_engine.default.off(document, POINTERCANCEL_EVENT_NAME);
        if (this._feedBackDeferred) {
            this._feedBackDeferred.resolve()
        }
        if (this._holdTimer) {
            clearInterval(this._holdTimer)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onChange":
            case "direction":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    }
});
var _default = exports.default = SpinButton;
module.exports = exports.default;
module.exports.default = exports.default;
