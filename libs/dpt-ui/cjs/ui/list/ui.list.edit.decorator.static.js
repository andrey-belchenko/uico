/**
 * DevExtreme (cjs/ui/list/ui.list.edit.decorator.static.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _button = _interopRequireDefault(require("../button"));
var _uiListEdit = require("./ui.list.edit.decorator_registry");
var _uiListEdit2 = _interopRequireDefault(require("./ui.list.edit.decorator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const STATIC_DELETE_BUTTON_CONTAINER_CLASS = "dx-list-static-delete-button-container";
const STATIC_DELETE_BUTTON_CLASS = "dx-list-static-delete-button";
(0, _uiListEdit.register)("delete", "static", _uiListEdit2.default.inherit({
    afterBag: function(config) {
        const $itemElement = config.$itemElement;
        const $container = config.$container;
        const $button = (0, _renderer.default)("<div>").addClass(STATIC_DELETE_BUTTON_CLASS);
        this._list._createComponent($button, _button.default, {
            icon: "remove",
            onClick: function(args) {
                args.event.stopPropagation();
                this._deleteItem($itemElement)
            }.bind(this),
            integrationOptions: {}
        });
        $container.addClass(STATIC_DELETE_BUTTON_CONTAINER_CLASS).append($button);
        this._updateButtonAttributes($button)
    },
    _deleteItem: function($itemElement) {
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            return
        }
        this._list.deleteItem($itemElement)
    }
}));
