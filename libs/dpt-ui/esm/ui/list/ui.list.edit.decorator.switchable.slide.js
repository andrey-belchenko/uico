/**
 * DevExtreme (esm/ui/list/ui.list.edit.decorator.switchable.slide.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getOuterWidth,
    setWidth
} from "../../core/utils/size";
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import {
    noop
} from "../../core/utils/common";
import {
    name as clickEventName
} from "../../events/click";
import messageLocalization from "../../localization/message";
import {
    locate,
    move
} from "../../animation/translator";
import {
    addNamespace
} from "../../events/utils/index";
import {
    active
} from "../../events/core/emitter.feedback";
import EditDecoratorMenuHelperMixin from "./ui.list.edit.decorator_menu_helper";
import {
    register as registerDecorator
} from "./ui.list.edit.decorator_registry";
import SwitchableEditDecorator from "./ui.list.edit.decorator.switchable";
import fx from "../../animation/fx";
import {
    isMaterialBased
} from "../themes";
import ActionSheet from "../action_sheet";
const LIST_EDIT_DECORATOR = "dxListEditDecorator";
const CLICK_EVENT_NAME = addNamespace(clickEventName, LIST_EDIT_DECORATOR);
const ACTIVE_EVENT_NAME = addNamespace(active, LIST_EDIT_DECORATOR);
const SLIDE_MENU_CLASS = "dx-list-slide-menu";
const SLIDE_MENU_WRAPPER_CLASS = "dx-list-slide-menu-wrapper";
const SLIDE_MENU_CONTENT_CLASS = "dx-list-slide-menu-content";
const SLIDE_MENU_BUTTONS_CONTAINER_CLASS = "dx-list-slide-menu-buttons-container";
const SLIDE_MENU_BUTTONS_CLASS = "dx-list-slide-menu-buttons";
const SLIDE_MENU_BUTTON_CLASS = "dx-list-slide-menu-button";
const SLIDE_MENU_BUTTON_MENU_CLASS = "dx-list-slide-menu-button-menu";
const SLIDE_MENU_BUTTON_DELETE_CLASS = "dx-list-slide-menu-button-delete";
const SLIDE_MENU_ANIMATION_DURATION = 400;
const SLIDE_MENU_ANIMATION_EASING = "cubic-bezier(0.075, 0.82, 0.165, 1)";
registerDecorator("menu", "slide", SwitchableEditDecorator.inherit({
    _shouldHandleSwipe: true,
    _init: function() {
        this.callBase.apply(this, arguments);
        this._$buttonsContainer = $("<div>").addClass(SLIDE_MENU_BUTTONS_CONTAINER_CLASS);
        eventsEngine.on(this._$buttonsContainer, ACTIVE_EVENT_NAME, noop);
        this._$buttons = $("<div>").addClass(SLIDE_MENU_BUTTONS_CLASS).appendTo(this._$buttonsContainer);
        this._renderMenu();
        this._renderDeleteButton()
    },
    _renderMenu: function() {
        if (!this._menuEnabled()) {
            return
        }
        const menuItems = this._menuItems();
        if (1 === menuItems.length) {
            const menuItem = menuItems[0];
            this._renderMenuButton(menuItem.text, function(e) {
                e.stopPropagation();
                this._fireAction(menuItem)
            }.bind(this))
        } else {
            const $menu = $("<div>").addClass(SLIDE_MENU_CLASS);
            this._menu = this._list._createComponent($menu, ActionSheet, {
                showTitle: false,
                items: menuItems,
                onItemClick: function(args) {
                    this._fireAction(args.itemData)
                }.bind(this),
                integrationOptions: {}
            });
            $menu.appendTo(this._list.$element());
            const $menuButton = this._renderMenuButton(messageLocalization.format("dxListEditDecorator-more"), function(e) {
                e.stopPropagation();
                this._menu.show()
            }.bind(this));
            this._menu.option("target", $menuButton)
        }
    },
    _renderMenuButton: function(text, action) {
        const $menuButton = $("<div>").addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_MENU_CLASS).text(text);
        this._$buttons.append($menuButton);
        eventsEngine.on($menuButton, CLICK_EVENT_NAME, action);
        return $menuButton
    },
    _renderDeleteButton: function() {
        if (!this._deleteEnabled()) {
            return
        }
        const $deleteButton = $("<div>").addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_DELETE_CLASS).text(isMaterialBased() ? "" : messageLocalization.format("dxListEditDecorator-delete"));
        eventsEngine.on($deleteButton, CLICK_EVENT_NAME, function(e) {
            e.stopPropagation();
            this._deleteItem()
        }.bind(this));
        this._$buttons.append($deleteButton)
    },
    _fireAction: function(menuItem) {
        this._fireMenuAction($(this._cachedNode), menuItem.action);
        this._cancelDeleteReadyItem()
    },
    modifyElement: function(config) {
        this.callBase.apply(this, arguments);
        const $itemElement = config.$itemElement;
        $itemElement.addClass(SLIDE_MENU_WRAPPER_CLASS);
        const $slideMenuContent = $("<div>").addClass(SLIDE_MENU_CONTENT_CLASS);
        $itemElement.wrapInner($slideMenuContent)
    },
    _getDeleteButtonContainer: function() {
        return this._$buttonsContainer
    },
    handleClick: function(_, e) {
        if ($(e.target).closest("." + SLIDE_MENU_CONTENT_CLASS).length) {
            return this.callBase.apply(this, arguments)
        }
        return false
    },
    _swipeStartHandler: function($itemElement) {
        this._enablePositioning($itemElement);
        this._cacheItemData($itemElement);
        this._setPositions(this._getPositions(0))
    },
    _swipeUpdateHandler: function($itemElement, args) {
        const rtl = this._isRtlEnabled();
        const signCorrection = rtl ? -1 : 1;
        const isItemReadyToDelete = this._isReadyToDelete($itemElement);
        const moveJustStarted = this._getCurrentPositions().content === this._getStartPositions().content;
        if (moveJustStarted && !isItemReadyToDelete && args.offset * signCorrection > 0) {
            args.cancel = true;
            return
        }
        const offset = this._cachedItemWidth * args.offset;
        const startOffset = isItemReadyToDelete ? -this._cachedButtonWidth * signCorrection : 0;
        const correctedOffset = (offset + startOffset) * signCorrection;
        const percent = correctedOffset < 0 ? Math.abs((offset + startOffset) / this._cachedButtonWidth) : 0;
        this._setPositions(this._getPositions(percent));
        return true
    },
    _getStartPositions: function() {
        const rtl = this._isRtlEnabled();
        const signCorrection = rtl ? -1 : 1;
        return {
            content: 0,
            buttonsContainer: rtl ? -this._cachedButtonWidth : this._cachedItemWidth,
            buttons: -this._cachedButtonWidth * signCorrection
        }
    },
    _getPositions: function(percent) {
        const rtl = this._isRtlEnabled();
        const signCorrection = rtl ? -1 : 1;
        const startPositions = this._getStartPositions();
        return {
            content: startPositions.content - percent * this._cachedButtonWidth * signCorrection,
            buttonsContainer: startPositions.buttonsContainer - Math.min(percent, 1) * this._cachedButtonWidth * signCorrection,
            buttons: startPositions.buttons + Math.min(percent, 1) * this._cachedButtonWidth * signCorrection
        }
    },
    _getCurrentPositions: function() {
        return {
            content: locate(this._$cachedContent).left,
            buttonsContainer: locate(this._$buttonsContainer).left,
            buttons: locate(this._$buttons).left
        }
    },
    _setPositions: function(positions) {
        move(this._$cachedContent, {
            left: positions.content
        });
        move(this._$buttonsContainer, {
            left: positions.buttonsContainer
        });
        move(this._$buttons, {
            left: positions.buttons
        })
    },
    _cacheItemData: function($itemElement) {
        if ($itemElement[0] === this._cachedNode) {
            return
        }
        this._$cachedContent = $itemElement.find("." + SLIDE_MENU_CONTENT_CLASS);
        this._cachedItemWidth = getOuterWidth($itemElement);
        this._cachedButtonWidth = this._cachedButtonWidth || getOuterWidth(this._$buttons);
        setWidth(this._$buttonsContainer, this._cachedButtonWidth);
        if (this._$cachedContent.length) {
            this._cachedNode = $itemElement[0]
        }
    },
    _minButtonContainerLeftOffset: function() {
        return this._cachedItemWidth - this._cachedButtonWidth
    },
    _swipeEndHandler: function($itemElement, args) {
        this._cacheItemData($itemElement);
        const signCorrection = this._isRtlEnabled() ? 1 : -1;
        const offset = this._cachedItemWidth * args.offset;
        const endedAtReadyToDelete = !this._isReadyToDelete($itemElement) && offset * signCorrection > .2 * this._cachedButtonWidth;
        const readyToDelete = args.targetOffset === signCorrection && endedAtReadyToDelete;
        this._toggleDeleteReady($itemElement, readyToDelete);
        return true
    },
    _enablePositioning: function($itemElement) {
        fx.stop(this._$cachedContent, true);
        this.callBase.apply(this, arguments);
        this._$buttonsContainer.appendTo($itemElement)
    },
    _disablePositioning: function() {
        this.callBase.apply(this, arguments);
        this._$buttonsContainer.detach()
    },
    _animatePrepareDeleteReady: function() {
        return this._animateToPositions(this._getPositions(1))
    },
    _animateForgetDeleteReady: function($itemElement) {
        this._cacheItemData($itemElement);
        return this._animateToPositions(this._getPositions(0))
    },
    _animateToPositions: function(positions) {
        const that = this;
        const currentPosition = this._getCurrentPositions();
        const durationTimePart = Math.min(Math.abs(currentPosition.content - positions.content) / this._cachedButtonWidth, 1);
        return fx.animate(this._$cachedContent, {
            from: currentPosition,
            to: positions,
            easing: SLIDE_MENU_ANIMATION_EASING,
            duration: 400 * durationTimePart,
            strategy: "frame",
            draw: function(positions) {
                that._setPositions(positions)
            }
        })
    },
    dispose: function() {
        if (this._menu) {
            this._menu.$element().remove()
        }
        if (this._$buttonsContainer) {
            this._$buttonsContainer.remove()
        }
        this.callBase.apply(this, arguments)
    }
}).include(EditDecoratorMenuHelperMixin));
