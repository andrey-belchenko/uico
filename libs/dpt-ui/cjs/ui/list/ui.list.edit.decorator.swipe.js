/**
 * DevExtreme (cjs/ui/list/ui.list.edit.decorator.swipe.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _size = require("../../core/utils/size");
var _translator = require("../../animation/translator");
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _uiListEdit = require("./ui.list.edit.decorator_registry");
var _uiListEdit2 = _interopRequireDefault(require("./ui.list.edit.decorator"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}(0, _uiListEdit.register)("delete", "swipe", _uiListEdit2.default.inherit({
    _shouldHandleSwipe: true,
    _renderItemPosition: function($itemElement, offset, animate) {
        const deferred = new _deferred.Deferred;
        const itemOffset = offset * this._itemElementWidth;
        if (animate) {
            _fx.default.animate($itemElement, {
                to: {
                    left: itemOffset
                },
                type: "slide",
                complete: function() {
                    deferred.resolve($itemElement, offset)
                }
            })
        } else {
            (0, _translator.move)($itemElement, {
                left: itemOffset
            });
            deferred.resolve()
        }
        return deferred.promise()
    },
    _swipeStartHandler: function($itemElement) {
        this._itemElementWidth = (0, _size.getWidth)($itemElement);
        return true
    },
    _swipeUpdateHandler: function($itemElement, args) {
        this._renderItemPosition($itemElement, args.offset);
        return true
    },
    _swipeEndHandler: function($itemElement, args) {
        const offset = args.targetOffset;
        this._renderItemPosition($itemElement, offset, true).done(function($itemElement, offset) {
            if (Math.abs(offset)) {
                this._list.deleteItem($itemElement).fail(function() {
                    this._renderItemPosition($itemElement, 0, true)
                }.bind(this))
            }
        }.bind(this));
        return true
    }
}));
