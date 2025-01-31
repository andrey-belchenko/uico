/**
 * DevExtreme (cjs/ui/list/ui.list.edit.decorator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _common = require("../../core/utils/common");
var _class = _interopRequireDefault(require("../../core/class"));
var _swipe = require("../../events/swipe");
var _index = require("../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const LIST_EDIT_DECORATOR = "dxListEditDecorator";
const SWIPE_START_EVENT_NAME = (0, _index.addNamespace)(_swipe.start, LIST_EDIT_DECORATOR);
const SWIPE_UPDATE_EVENT_NAME = (0, _index.addNamespace)(_swipe.swipe, LIST_EDIT_DECORATOR);
const SWIPE_END_EVENT_NAME = (0, _index.addNamespace)(_swipe.end, LIST_EDIT_DECORATOR);
const EditDecorator = _class.default.inherit({
    ctor: function(list) {
        this._list = list;
        this._init()
    },
    _init: _common.noop,
    _shouldHandleSwipe: false,
    _attachSwipeEvent: function(config) {
        const swipeConfig = {
            itemSizeFunc: function() {
                if (this._clearSwipeCache) {
                    this._itemWidthCache = (0, _size.getWidth)(this._list.$element());
                    this._clearSwipeCache = false
                }
                return this._itemWidthCache
            }.bind(this)
        };
        _events_engine.default.on(config.$itemElement, SWIPE_START_EVENT_NAME, swipeConfig, this._itemSwipeStartHandler.bind(this));
        _events_engine.default.on(config.$itemElement, SWIPE_UPDATE_EVENT_NAME, this._itemSwipeUpdateHandler.bind(this));
        _events_engine.default.on(config.$itemElement, SWIPE_END_EVENT_NAME, this._itemSwipeEndHandler.bind(this))
    },
    _itemSwipeStartHandler: function(e) {
        const $itemElement = (0, _renderer.default)(e.currentTarget);
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            e.cancel = true;
            return
        }
        clearTimeout(this._list._inkRippleTimer);
        this._swipeStartHandler($itemElement, e)
    },
    _itemSwipeUpdateHandler: function(e) {
        const $itemElement = (0, _renderer.default)(e.currentTarget);
        this._swipeUpdateHandler($itemElement, e)
    },
    _itemSwipeEndHandler: function(e) {
        const $itemElement = (0, _renderer.default)(e.currentTarget);
        this._swipeEndHandler($itemElement, e);
        this._clearSwipeCache = true
    },
    beforeBag: _common.noop,
    afterBag: _common.noop,
    _commonOptions: function() {
        return {
            activeStateEnabled: this._list.option("activeStateEnabled"),
            hoverStateEnabled: this._list.option("hoverStateEnabled"),
            focusStateEnabled: this._list.option("focusStateEnabled")
        }
    },
    _updateButtonAttributes($button) {
        $button.attr({
            tabindex: -1,
            role: null,
            "aria-label": null
        })
    },
    modifyElement: function(config) {
        if (this._shouldHandleSwipe) {
            this._attachSwipeEvent(config);
            this._clearSwipeCache = true
        }
    },
    afterRender: _common.noop,
    handleClick: _common.noop,
    handleKeyboardEvents: _common.noop,
    handleEnterPressing: _common.noop,
    handleContextMenu: _common.noop,
    _swipeStartHandler: _common.noop,
    _swipeUpdateHandler: _common.noop,
    _swipeEndHandler: _common.noop,
    visibilityChange: _common.noop,
    getExcludedSelectors: _common.noop,
    dispose: _common.noop
});
var _default = exports.default = EditDecorator;
module.exports = exports.default;
module.exports.default = exports.default;
