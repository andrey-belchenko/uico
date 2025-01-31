/**
 * DevExtreme (cjs/ui/list/ui.list.edit.decorator.switchable.button.js)
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
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _button = _interopRequireDefault(require("../button"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiListEdit = require("./ui.list.edit.decorator_registry");
var _uiListEditDecorator = _interopRequireDefault(require("./ui.list.edit.decorator.switchable"));
var _themes = require("../themes");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS = "dx-list-switchable-delete-button-container";
const SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS = "dx-list-switchable-delete-button-wrapper";
const SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS = "dx-list-switchable-delete-button-inner-wrapper";
const SWITCHABLE_DELETE_BUTTON_CLASS = "dx-list-switchable-delete-button";
const SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION = 200;
const SwitchableButtonEditDecorator = _uiListEditDecorator.default.inherit({
    _init: function() {
        this.callBase.apply(this, arguments);
        const $buttonContainer = (0, _renderer.default)("<div>").addClass(SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS);
        const $buttonWrapper = (0, _renderer.default)("<div>").addClass(SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS);
        const $buttonInnerWrapper = (0, _renderer.default)("<div>").addClass(SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS);
        const $button = (0, _renderer.default)("<div>").addClass(SWITCHABLE_DELETE_BUTTON_CLASS);
        this._list._createComponent($button, _button.default, {
            text: _message.default.format("dxListEditDecorator-delete"),
            type: "danger",
            stylingMode: (0, _themes.isMaterialBased)() ? "text" : "contained",
            onClick: function(e) {
                this._deleteItem();
                e.event.stopPropagation()
            }.bind(this),
            integrationOptions: {}
        });
        $buttonContainer.append($buttonWrapper);
        $buttonWrapper.append($buttonInnerWrapper);
        $buttonInnerWrapper.append($button);
        this._$buttonContainer = $buttonContainer;
        this._updateButtonAttributes($button)
    },
    _enablePositioning: function($itemElement) {
        this.callBase.apply(this, arguments);
        _fx.default.stop(this._$buttonContainer, true);
        this._$buttonContainer.appendTo($itemElement)
    },
    _disablePositioning: function() {
        this.callBase.apply(this, arguments);
        this._$buttonContainer.detach()
    },
    _animatePrepareDeleteReady: function() {
        const rtl = this._isRtlEnabled();
        const listWidth = (0, _size.getWidth)(this._list.$element());
        const buttonWidth = this._buttonWidth();
        const fromValue = rtl ? listWidth : -buttonWidth;
        const toValue = rtl ? listWidth - buttonWidth : 0;
        return _fx.default.animate(this._$buttonContainer, {
            type: "custom",
            duration: 200,
            from: {
                right: fromValue
            },
            to: {
                right: toValue
            }
        })
    },
    _animateForgetDeleteReady: function() {
        const rtl = this._isRtlEnabled();
        const listWidth = (0, _size.getWidth)(this._list.$element());
        const buttonWidth = this._buttonWidth();
        const fromValue = rtl ? listWidth - buttonWidth : 0;
        const toValue = rtl ? listWidth : -buttonWidth;
        return _fx.default.animate(this._$buttonContainer, {
            type: "custom",
            duration: 200,
            from: {
                right: fromValue
            },
            to: {
                right: toValue
            }
        })
    },
    _buttonWidth: function() {
        if (!this._buttonContainerWidth) {
            this._buttonContainerWidth = (0, _size.getOuterWidth)(this._$buttonContainer)
        }
        return this._buttonContainerWidth
    },
    dispose: function() {
        if (this._$buttonContainer) {
            this._$buttonContainer.remove()
        }
        this.callBase.apply(this, arguments)
    }
});
const TOGGLE_DELETE_SWITCH_CONTAINER_CLASS = "dx-list-toggle-delete-switch-container";
const TOGGLE_DELETE_SWITCH_CLASS = "dx-list-toggle-delete-switch";
(0, _uiListEdit.register)("delete", "toggle", SwitchableButtonEditDecorator.inherit({
    beforeBag: function(config) {
        const $itemElement = config.$itemElement;
        const $container = config.$container;
        const $toggle = (0, _renderer.default)("<div>").addClass(TOGGLE_DELETE_SWITCH_CLASS);
        this._list._createComponent($toggle, _button.default, {
            icon: "toggle-delete",
            onClick: function(e) {
                _fx.default.stop(this._$buttonContainer, false);
                this._toggleDeleteReady($itemElement);
                e.event.stopPropagation()
            }.bind(this),
            integrationOptions: {}
        });
        $container.addClass(TOGGLE_DELETE_SWITCH_CONTAINER_CLASS);
        $container.append($toggle);
        this._updateButtonAttributes($toggle)
    }
}));
(0, _uiListEdit.register)("delete", "slideButton", SwitchableButtonEditDecorator.inherit({
    _shouldHandleSwipe: true,
    _swipeEndHandler: function($itemElement, args) {
        if (0 !== args.targetOffset) {
            _fx.default.stop(this._$buttonContainer, false);
            this._toggleDeleteReady($itemElement)
        }
        return true
    }
}));
var _default = exports.default = SwitchableButtonEditDecorator;
module.exports = exports.default;
module.exports.default = exports.default;
