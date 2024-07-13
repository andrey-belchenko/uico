/**
 * DevExtreme (esm/ui/context_menu/ui.context_menu.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import domAdapter from "../../core/dom_adapter";
import eventsEngine from "../../events/core/events_engine";
import Guid from "../../core/guid";
import registerComponent from "../../core/component_registrator";
import {
    noop
} from "../../core/utils/common";
import {
    isDefined,
    isFunction,
    isObject,
    isPlainObject,
    isRenderer,
    isWindow
} from "../../core/utils/type";
import {
    contains
} from "../../core/utils/dom";
import {
    getPublicElement
} from "../../core/element";
import {
    each
} from "../../core/utils/iterator";
import {
    extend
} from "../../core/utils/extend";
import {
    getWindow,
    hasWindow
} from "../../core/utils/window";
import fx from "../../animation/fx";
import animationPosition from "../../animation/position";
import devices from "../../core/devices";
import {
    addNamespace
} from "../../events/utils/index";
import Overlay from "../overlay/ui.overlay";
import MenuBase from "./ui.menu_base";
import {
    Deferred
} from "../../core/utils/deferred";
import {
    name as contextMenuEventName
} from "../../events/contextmenu";
import holdEvent from "../../events/hold";
import Scrollable from "../scroll_view/ui.scrollable";
import {
    getOuterHeight
} from "../../core/utils/size";
import {
    isMaterialBased,
    current as currentTheme
} from "../themes";
const DX_MENU_CLASS = "dx-menu";
const DX_MENU_ITEM_CLASS = "dx-menu-item";
const DX_MENU_ITEM_EXPANDED_CLASS = "dx-menu-item-expanded";
const DX_MENU_PHONE_CLASS = "dx-menu-phone-overlay";
const DX_MENU_ITEMS_CONTAINER_CLASS = "dx-menu-items-container";
const DX_MENU_ITEM_WRAPPER_CLASS = "dx-menu-item-wrapper";
const DX_SUBMENU_CLASS = "dx-submenu";
const DX_CONTEXT_MENU_CLASS = "dx-context-menu";
const DX_HAS_CONTEXT_MENU_CLASS = "dx-has-context-menu";
const DX_STATE_DISABLED_CLASS = "dx-state-disabled";
const DX_STATE_FOCUSED_CLASS = "dx-state-focused";
const DX_STATE_HOVER_CLASS = "dx-state-hover";
const OVERLAY_CONTENT_CLASS = "dx-overlay-content";
const SCROLLABLE_CLASS = "dx-scrollable";
const FOCUS_UP = "up";
const FOCUS_DOWN = "down";
const FOCUS_LEFT = "left";
const FOCUS_RIGHT = "right";
const FOCUS_FIRST = "first";
const FOCUS_LAST = "last";
const ACTIONS = ["onShowing", "onShown", "onSubmenuCreated", "onHiding", "onHidden", "onPositioning", "onLeftFirstItem", "onLeftLastItem", "onCloseRootSubmenu", "onExpandLastSubmenu"];
const LOCAL_SUBMENU_DIRECTIONS = ["up", "down", "first", "last"];
const DEFAULT_SHOW_EVENT = "dxcontextmenu";
const SUBMENU_PADDING = 10;
const BORDER_WIDTH = 1;
const window = getWindow();
class ContextMenu extends MenuBase {
    getShowEvent(showEventOption) {
        let result = null;
        if (isObject(showEventOption)) {
            if (null !== showEventOption.name) {
                result = showEventOption.name || "dxcontextmenu"
            }
        } else {
            result = showEventOption
        }
        return result
    }
    getShowDelay(showEventOption) {
        return isObject(showEventOption) && showEventOption.delay
    }
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            showEvent: "dxcontextmenu",
            hideOnOutsideClick: true,
            position: {
                at: "top left",
                my: "top left"
            },
            onShowing: null,
            onShown: null,
            onSubmenuCreated: null,
            onHiding: null,
            onHidden: null,
            onPositioning: null,
            submenuDirection: "auto",
            visible: false,
            target: void 0,
            onLeftFirstItem: null,
            onLeftLastItem: null,
            onCloseRootSubmenu: null,
            onExpandLastSubmenu: null
        })
    }
    _defaultOptionsRules() {
        return super._defaultOptionsRules().concat([{
            device: () => !hasWindow(),
            options: {
                animation: null
            }
        }])
    }
    _setDeprecatedOptions() {
        super._setDeprecatedOptions();
        extend(this._deprecatedOptions, {
            closeOnOutsideClick: {
                since: "22.2",
                alias: "hideOnOutsideClick"
            }
        })
    }
    _initActions() {
        this._actions = {};
        each(ACTIONS, ((index, action) => {
            this._actions[action] = this._createActionByOption(action) || noop
        }))
    }
    _setOptionsByReference() {
        super._setOptionsByReference();
        extend(this._optionsByReference, {
            animation: true,
            selectedItem: true
        })
    }
    _focusInHandler() {}
    _itemContainer() {
        return this._overlay ? this._overlay.$content() : $()
    }
    _eventBindingTarget() {
        return this._itemContainer()
    }
    itemsContainer() {
        return this._overlay ? this._overlay.$content() : void 0
    }
    _supportedKeys() {
        return extend(super._supportedKeys(), {
            space: () => {
                const $item = $(this.option("focusedElement"));
                this.hide();
                if (!$item.length || !this._isSelectionEnabled()) {
                    return
                }
                this.selectItem($item[0])
            },
            escape: this.hide
        })
    }
    _getActiveItem() {
        const $availableItems = this._getAvailableItems();
        const $focusedItem = $availableItems.filter(".dx-state-focused");
        const $hoveredItem = $availableItems.filter(".dx-state-hover");
        const $hoveredItemContainer = $hoveredItem.closest(".dx-menu-items-container");
        if ($hoveredItemContainer.find(".dx-menu-item").index($focusedItem) >= 0) {
            return $focusedItem
        }
        if ($hoveredItem.length) {
            return $hoveredItem
        }
        return super._getActiveItem()
    }
    _moveFocus(location) {
        const $items = this._getItemsByLocation(location);
        const $oldTarget = this._getActiveItem(true);
        const $hoveredItem = this.itemsContainer().find(".dx-state-hover");
        const $focusedItem = $(this.option("focusedElement"));
        const $activeItemHighlighted = !!($focusedItem.length || $hoveredItem.length);
        let $newTarget;
        switch (location) {
            case "up":
                $newTarget = $activeItemHighlighted ? this._prevItem($items) : $oldTarget;
                this._setFocusedElement($newTarget);
                if ($oldTarget.is($items.first())) {
                    this._actions.onLeftFirstItem($oldTarget)
                }
                break;
            case "down":
                $newTarget = $activeItemHighlighted ? this._nextItem($items) : $oldTarget;
                this._setFocusedElement($newTarget);
                if ($oldTarget.is($items.last())) {
                    this._actions.onLeftLastItem($oldTarget)
                }
                break;
            case "right":
                $newTarget = this.option("rtlEnabled") ? this._hideSubmenuHandler() : this._expandSubmenuHandler($items, location);
                this._setFocusedElement($newTarget);
                break;
            case "left":
                $newTarget = this.option("rtlEnabled") ? this._expandSubmenuHandler($items, location) : this._hideSubmenuHandler();
                this._setFocusedElement($newTarget);
                break;
            case "first":
                $newTarget = $items.first();
                this._setFocusedElement($newTarget);
                break;
            case "last":
                $newTarget = $items.last();
                this._setFocusedElement($newTarget);
                break;
            default:
                return super._moveFocus(location)
        }
    }
    _setFocusedElement($element) {
        if ($element && 0 !== $element.length) {
            this.option("focusedElement", getPublicElement($element));
            this._scrollToElement($element)
        }
    }
    _scrollToElement($element) {
        const $scrollableElement = $element.closest(".dx-scrollable");
        const scrollableInstance = $scrollableElement.dxScrollable("instance");
        null === scrollableInstance || void 0 === scrollableInstance || scrollableInstance.scrollToElement($element)
    }
    _getItemsByLocation(location) {
        const $activeItem = this._getActiveItem(true);
        let $items;
        if (LOCAL_SUBMENU_DIRECTIONS.includes(location)) {
            $items = $activeItem.closest(".dx-menu-items-container").children().children()
        }
        $items = this._getAvailableItems($items);
        return $items
    }
    _getAriaTarget() {
        return this.$element()
    }
    _refreshActiveDescendant() {
        if (isDefined(this._overlay)) {
            const $target = this._overlay.$content();
            super._refreshActiveDescendant($target)
        }
    }
    _hideSubmenuHandler() {
        const $curItem = this._getActiveItem(true);
        const $parentItem = $curItem.parents(".dx-menu-item-expanded").first();
        if ($parentItem.length) {
            this._hideSubmenusOnSameLevel($parentItem);
            this._hideSubmenu($curItem.closest(".dx-submenu"));
            return $parentItem
        }
        this._actions.onCloseRootSubmenu($curItem)
    }
    _expandSubmenuHandler($items, location) {
        const $curItem = this._getActiveItem(true);
        const itemData = this._getItemData($curItem);
        const node = this._dataAdapter.getNodeByItem(itemData);
        const isItemHasSubmenu = this._hasSubmenu(node);
        const $submenu = $curItem.children(".dx-submenu");
        if (isItemHasSubmenu && !$curItem.hasClass("dx-state-disabled")) {
            if (!$submenu.length || "hidden" === $submenu.css("visibility")) {
                this._showSubmenu($curItem)
            }
            return this._nextItem(this._getItemsByLocation(location))
        }
        this._actions.onExpandLastSubmenu($curItem);
        return
    }
    _clean() {
        if (this._overlay) {
            this._overlay.$element().remove();
            this._overlay = null
        }
        this._detachShowContextMenuEvents(this._getTarget());
        super._clean()
    }
    _initMarkup() {
        this.$element().addClass("dx-has-context-menu");
        super._initMarkup()
    }
    _render() {
        super._render();
        this._renderVisibility(this.option("visible"));
        this._addWidgetClass()
    }
    _isTargetOutOfComponent(relatedTarget) {
        const isInsideContextMenu = 0 !== $(relatedTarget).closest(".dx-context-menu").length;
        return !isInsideContextMenu
    }
    _focusOutHandler(e) {
        const {
            relatedTarget: relatedTarget
        } = e;
        if (relatedTarget) {
            const isTargetOutside = this._isTargetOutOfComponent(relatedTarget);
            if (isTargetOutside) {
                this.hide()
            }
        }
        super._focusOutHandler(e)
    }
    _renderContentImpl() {
        this._detachShowContextMenuEvents(this._getTarget());
        this._attachShowContextMenuEvents()
    }
    _attachKeyboardEvents() {
        !this._keyboardListenerId && this._focusTarget().length && super._attachKeyboardEvents()
    }
    _renderContextMenuOverlay() {
        if (this._overlay) {
            return
        }
        const overlayOptions = this._getOverlayOptions();
        this._overlay = this._createComponent($("<div>").appendTo(this._$element), Overlay, overlayOptions);
        const $overlayContent = this._overlay.$content();
        $overlayContent.addClass("dx-context-menu");
        this._addCustomCssClass($overlayContent);
        this._addPlatformDependentClass($overlayContent);
        this._attachContextMenuEvent()
    }
    preventShowingDefaultContextMenuAboveOverlay() {
        const $itemContainer = this._itemContainer();
        const eventName = addNamespace(contextMenuEventName, this.NAME);
        eventsEngine.off($itemContainer, eventName, ".dx-submenu");
        eventsEngine.on($itemContainer, eventName, ".dx-submenu", (e => {
            e.stopPropagation();
            e.preventDefault();
            eventsEngine.off($itemContainer, eventName, ".dx-submenu")
        }).bind(this))
    }
    _itemContextMenuHandler(e) {
        super._itemContextMenuHandler(e);
        e.stopPropagation()
    }
    _addPlatformDependentClass($element) {
        if (devices.current().phone) {
            $element.addClass(DX_MENU_PHONE_CLASS)
        }
    }
    _detachShowContextMenuEvents(target) {
        const showEvent = this.getShowEvent(this.option("showEvent"));
        if (!showEvent) {
            return
        }
        const eventName = addNamespace(showEvent, this.NAME);
        if (this._showContextMenuEventHandler) {
            eventsEngine.off(domAdapter.getDocument(), eventName, target, this._showContextMenuEventHandler)
        } else {
            eventsEngine.off($(target), eventName)
        }
    }
    _attachShowContextMenuEvents() {
        const target = this._getTarget();
        const showEvent = this.getShowEvent(this.option("showEvent"));
        if (!showEvent) {
            return
        }
        const eventName = addNamespace(showEvent, this.NAME);
        let contextMenuAction = this._createAction((e => {
            const delay = this.getShowDelay(this.option("showEvent"));
            if (delay) {
                setTimeout((() => this._show(e.event)), delay)
            } else {
                this._show(e.event)
            }
        }), {
            validatingTargetName: "target"
        });
        const handler = e => contextMenuAction({
            event: e,
            target: $(e.currentTarget)
        });
        contextMenuAction = this._createAction(contextMenuAction);
        if (isRenderer(target) || target.nodeType || isWindow(target)) {
            this._showContextMenuEventHandler = void 0;
            eventsEngine.on(target, eventName, handler)
        } else {
            this._showContextMenuEventHandler = handler;
            eventsEngine.on(domAdapter.getDocument(), eventName, target, this._showContextMenuEventHandler)
        }
    }
    _hoverEndHandler(e) {
        super._hoverEndHandler(e);
        e.stopPropagation()
    }
    _renderDimensions() {}
    _renderContainer($wrapper, submenuContainer) {
        const $holder = submenuContainer || this._itemContainer();
        $wrapper = $("<div>");
        $wrapper.appendTo($holder).addClass("dx-submenu").css("visibility", submenuContainer ? "hidden" : "visible");
        if (!$wrapper.parent().hasClass("dx-overlay-content")) {
            this._addCustomCssClass($wrapper)
        }
        const $itemsContainer = super._renderContainer($wrapper);
        if (submenuContainer) {
            return $itemsContainer
        }
        if (this.option("width")) {
            return $itemsContainer.css("minWidth", this.option("width"))
        }
        if (this.option("height")) {
            return $itemsContainer.css("minHeight", this.option("height"))
        }
        return $itemsContainer
    }
    _renderSubmenuItems(node, $itemFrame) {
        this._renderItems(this._getChildNodes(node), $itemFrame);
        const $submenu = $itemFrame.children(".dx-submenu");
        this._actions.onSubmenuCreated({
            itemElement: getPublicElement($itemFrame),
            itemData: node.internalFields.item,
            submenuElement: getPublicElement($submenu)
        });
        this._initScrollable($submenu);
        this.setAria({
            role: "menu"
        }, $submenu)
    }
    _getOverlayOptions() {
        const position = this.option("position");
        const overlayOptions = {
            focusStateEnabled: this.option("focusStateEnabled"),
            animation: this.option("animation"),
            innerOverlay: true,
            hideOnOutsideClick: e => this._hideOnOutsideClickHandler(e),
            propagateOutsideClick: true,
            hideOnParentScroll: true,
            deferRendering: false,
            position: {
                at: position.at,
                my: position.my,
                of: this._getTarget(),
                collision: "flipfit"
            },
            shading: false,
            showTitle: false,
            height: "auto",
            width: "auto",
            onShown: this._overlayShownActionHandler.bind(this),
            onHiding: this._overlayHidingActionHandler.bind(this),
            onHidden: this._overlayHiddenActionHandler.bind(this),
            visualContainer: window
        };
        return overlayOptions
    }
    _overlayShownActionHandler(arg) {
        this._actions.onShown(arg)
    }
    _overlayHidingActionHandler(arg) {
        this._actions.onHiding(arg);
        if (!arg.cancel) {
            this._hideAllShownSubmenus();
            this._setOptionWithoutOptionChange("visible", false)
        }
    }
    _overlayHiddenActionHandler(arg) {
        this._actions.onHidden(arg)
    }
    _shouldHideOnOutsideClick(e) {
        const {
            closeOnOutsideClick: closeOnOutsideClick,
            hideOnOutsideClick: hideOnOutsideClick
        } = this.option();
        if (isFunction(hideOnOutsideClick)) {
            return hideOnOutsideClick(e)
        } else if (isFunction(closeOnOutsideClick)) {
            return closeOnOutsideClick(e)
        } else {
            return hideOnOutsideClick || closeOnOutsideClick
        }
    }
    _hideOnOutsideClickHandler(e) {
        if (!this._shouldHideOnOutsideClick(e)) {
            return false
        }
        if (domAdapter.isDocument(e.target)) {
            return true
        }
        const $activeItemContainer = this._getActiveItemsContainer(e.target);
        const $itemContainers = this._getItemsContainers();
        const $clickedItem = this._searchActiveItem(e.target);
        const $rootItem = this.$element().parents(".dx-menu-item");
        const isRootItemClicked = $clickedItem[0] === $rootItem[0] && $clickedItem.length && $rootItem.length;
        const isInnerOverlayClicked = this._isIncludeOverlay($activeItemContainer, $itemContainers) && $clickedItem.length;
        if (isInnerOverlayClicked || isRootItemClicked) {
            if ("onClick" === this._getShowSubmenuMode()) {
                this._hideAllShownChildSubmenus($clickedItem)
            }
            return false
        }
        return true
    }
    _getActiveItemsContainer(target) {
        return $(target).closest(".dx-menu-items-container")
    }
    _getItemsContainers() {
        return this._overlay.$content().find(".dx-menu-items-container")
    }
    _searchActiveItem(target) {
        return $(target).closest(".dx-menu-item").eq(0)
    }
    _isIncludeOverlay($activeOverlay, $allOverlays) {
        let isSame = false;
        each($allOverlays, ((index, $overlay) => {
            if ($activeOverlay.is($overlay) && !isSame) {
                isSame = true
            }
        }));
        return isSame
    }
    _hideAllShownChildSubmenus($clickedItem) {
        const $submenuElements = $clickedItem.find(".dx-submenu");
        const shownSubmenus = extend([], this._shownSubmenus);
        if ($submenuElements.length > 0) {
            each(shownSubmenus, ((index, $submenu) => {
                const $context = this._searchActiveItem($submenu.context).parent();
                if ($context.parent().is($clickedItem.parent().parent()) && !$context.is($clickedItem.parent())) {
                    this._hideSubmenu($submenu)
                }
            }))
        }
    }
    _initScrollable($container) {
        this._createComponent($container, Scrollable, {
            useKeyboard: false,
            _onVisibilityChanged: scrollable => {
                scrollable.scrollTo(0)
            }
        })
    }
    _setSubMenuHeight($submenu, anchor, isNestedSubmenu) {
        const $itemsContainer = $submenu.find(".dx-menu-items-container");
        const contentHeight = getOuterHeight($itemsContainer);
        const maxHeight = this._getMaxHeight(anchor, !isNestedSubmenu);
        const menuHeight = Math.min(contentHeight, maxHeight);
        $submenu.css("height", isNestedSubmenu ? menuHeight : "100%")
    }
    _getMaxHeight(anchor) {
        let considerAnchorHeight = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
        const windowHeight = getOuterHeight(window);
        const isAnchorRenderer = isRenderer(anchor);
        const document = domAdapter.getDocument();
        const isAnchorDocument = anchor.length && anchor[0] === document;
        if (!isAnchorRenderer || isAnchorDocument) {
            return windowHeight
        }
        const offsetTop = anchor[0].getBoundingClientRect().top;
        const anchorHeight = getOuterHeight(anchor);
        const availableHeight = considerAnchorHeight ? Math.max(offsetTop, windowHeight - offsetTop - anchorHeight) : Math.max(offsetTop + anchorHeight, windowHeight - offsetTop);
        return availableHeight - 10
    }
    _dimensionChanged() {
        if (!this._shownSubmenus) {
            return
        }
        this._shownSubmenus.forEach(($submenu => {
            const $item = $submenu.closest(".dx-menu-item");
            this._setSubMenuHeight($submenu, $item, true);
            this._scrollToElement($item);
            const submenuPosition = this._getSubmenuPosition($item);
            animationPosition.setup($submenu, submenuPosition)
        }))
    }
    _getSubmenuBorderWidth() {
        return isMaterialBased(currentTheme()) ? 0 : 1
    }
    _showSubmenu($item) {
        const node = this._dataAdapter.getNodeByItem(this._getItemData($item));
        this._hideSubmenusOnSameLevel($item);
        if (!this._hasSubmenu(node)) {
            return
        }
        let $submenu = $item.children(".dx-submenu");
        const isSubmenuRendered = $submenu.length;
        super._showSubmenu($item);
        if (!isSubmenuRendered) {
            this._renderSubmenuItems(node, $item);
            $submenu = $item.children(".dx-submenu")
        }
        this._setSubMenuHeight($submenu, $item, true);
        if (!this._isSubmenuVisible($submenu)) {
            this._drawSubmenu($item)
        }
    }
    _hideSubmenusOnSameLevel($item) {
        const $expandedItems = $item.parent(".dx-menu-item-wrapper").siblings().find(".dx-menu-item-expanded");
        if ($expandedItems.length) {
            $expandedItems.removeClass("dx-menu-item-expanded");
            this._hideSubmenu($expandedItems.find(".dx-submenu"))
        }
    }
    _hideSubmenuGroup($submenu) {
        if (this._isSubmenuVisible($submenu)) {
            this._hideSubmenuCore($submenu)
        }
    }
    _isSubmenuVisible($submenu) {
        return "visible" === $submenu.css("visibility")
    }
    _drawSubmenu($itemElement) {
        const animation = this.option("animation") ? this.option("animation").show : {};
        const $submenu = $itemElement.children(".dx-submenu");
        const submenuPosition = this._getSubmenuPosition($itemElement);
        if (this._overlay && this._overlay.option("visible")) {
            if (!isDefined(this._shownSubmenus)) {
                this._shownSubmenus = []
            }
            if (!this._shownSubmenus.includes($submenu)) {
                this._shownSubmenus.push($submenu)
            }
            if (animation) {
                fx.stop($submenu)
            }
            animationPosition.setup($submenu, submenuPosition);
            if (animation) {
                if (isPlainObject(animation.to)) {
                    animation.to.position = submenuPosition
                }
                this._animate($submenu, animation)
            }
            $submenu.css("visibility", "visible")
        }
    }
    _animate($container, options) {
        fx.animate($container, options)
    }
    _getSubmenuPosition($rootItem) {
        const submenuDirection = this.option("submenuDirection").toLowerCase();
        const $rootItemWrapper = $rootItem.parent(".dx-menu-item-wrapper");
        const position = {
            collision: "flip",
            of: $rootItemWrapper,
            offset: {
                h: 0,
                v: -1
            }
        };
        switch (submenuDirection) {
            case "left":
                position.at = "left top";
                position.my = "right top";
                break;
            case "right":
                position.at = "right top";
                position.my = "left top";
                break;
            default:
                if (this.option("rtlEnabled")) {
                    position.at = "left top";
                    position.my = "right top"
                } else {
                    position.at = "right top";
                    position.my = "left top"
                }
        }
        return position
    }
    _updateSubmenuVisibilityOnClick(actionArgs) {
        if (!actionArgs.args.length) {
            return
        }
        const itemData = actionArgs.args[0].itemData;
        const node = this._dataAdapter.getNodeByItem(itemData);
        if (!node) {
            return
        }
        const $itemElement = $(actionArgs.args[0].itemElement);
        let $submenu = $itemElement.find(".dx-submenu");
        const shouldRenderSubmenu = this._hasSubmenu(node) && !$submenu.length;
        if (shouldRenderSubmenu) {
            this._renderSubmenuItems(node, $itemElement);
            $submenu = $itemElement.find(".dx-submenu")
        }
        if ($itemElement.context === $submenu.context && "visible" === $submenu.css("visibility")) {
            return
        }
        this._updateSelectedItemOnClick(actionArgs);
        const notCloseMenuOnItemClick = itemData && false === itemData.closeMenuOnClick;
        if (!itemData || itemData.disabled || notCloseMenuOnItemClick) {
            return
        }
        if (0 === $submenu.length) {
            const $prevSubmenu = $($itemElement.parents(".dx-submenu")[0]);
            this._hideSubmenu($prevSubmenu);
            if (!actionArgs.canceled && this._overlay && this._overlay.option("visible")) {
                this.option("visible", false)
            }
        } else {
            if (this._shownSubmenus && this._shownSubmenus.length > 0) {
                if (this._shownSubmenus[0].is($submenu)) {
                    this._hideSubmenu($submenu)
                }
            }
            this._showSubmenu($itemElement)
        }
    }
    _hideSubmenu($curSubmenu) {
        const shownSubmenus = extend([], this._shownSubmenus);
        each(shownSubmenus, ((index, $submenu) => {
            if ($curSubmenu.is($submenu) || contains($curSubmenu[0], $submenu[0])) {
                $submenu.parent().removeClass("dx-menu-item-expanded");
                this._hideSubmenuCore($submenu)
            }
        }))
    }
    _hideSubmenuCore($submenu) {
        const index = this._shownSubmenus.indexOf($submenu);
        const animation = this.option("animation") ? this.option("animation").hide : null;
        if (index >= 0) {
            this._shownSubmenus.splice(index, 1)
        }
        this._stopAnimate($submenu);
        animation && this._animate($submenu, animation);
        $submenu.css("visibility", "hidden");
        const scrollableInstance = $submenu.dxScrollable("instance");
        scrollableInstance.scrollTo(0);
        this.option("focusedElement", null)
    }
    _stopAnimate($container) {
        fx.stop($container, true)
    }
    _hideAllShownSubmenus() {
        const shownSubmenus = extend([], this._shownSubmenus);
        const $expandedItems = this._overlay.$content().find(".dx-menu-item-expanded");
        $expandedItems.removeClass("dx-menu-item-expanded");
        each(shownSubmenus, ((_, $submenu) => {
            this._hideSubmenu($submenu)
        }))
    }
    _visibilityChanged(visible) {
        if (visible) {
            this._renderContentImpl()
        }
    }
    _optionChanged(args) {
        if (ACTIONS.includes(args.name)) {
            this._initActions();
            return
        }
        switch (args.name) {
            case "visible":
                this._renderVisibility(args.value);
                break;
            case "showEvent":
            case "position":
            case "submenuDirection":
                this._invalidate();
                break;
            case "target":
                args.previousValue && this._detachShowContextMenuEvents(args.previousValue);
                this._invalidate();
                break;
            case "closeOnOutsideClick":
            case "hideOnOutsideClick":
                break;
            default:
                super._optionChanged(args)
        }
    }
    _renderVisibility(showing) {
        return showing ? this._show() : this._hide()
    }
    _toggleVisibility() {}
    _show(event) {
        const args = {
            jQEvent: event
        };
        let promise = (new Deferred).reject().promise();
        this._actions.onShowing(args);
        if (args.cancel) {
            return promise
        }
        const position = this._positionContextMenu(event);
        if (position) {
            var _event$originalEvent;
            if (!this._overlay) {
                this._renderContextMenuOverlay();
                this._overlay.$content().addClass(this._widgetClass());
                this._renderFocusState();
                this._attachHoverEvents();
                this._attachClickEvent();
                this._renderItems(this._dataAdapter.getRootNodes())
            }
            const $subMenu = $(this._overlay.content()).children(".dx-submenu");
            this._setOptionWithoutOptionChange("visible", true);
            this._overlay.option({
                height: () => this._getMaxHeight(position.of),
                maxHeight: () => {
                    const $content = $subMenu.find(".dx-menu-items-container");
                    const borderWidth = this._getSubmenuBorderWidth();
                    return getOuterHeight($content) + 2 * borderWidth
                },
                position: position
            });
            if ($subMenu.length) {
                this._setSubMenuHeight($subMenu, position.of, false)
            }
            promise = this._overlay.show();
            event && event.stopPropagation();
            this._setAriaAttributes();
            if ((null === event || void 0 === event || null === (_event$originalEvent = event.originalEvent) || void 0 === _event$originalEvent ? void 0 : _event$originalEvent.type) === holdEvent.name) {
                this.preventShowingDefaultContextMenuAboveOverlay()
            }
        }
        return promise
    }
    _renderItems(nodes, submenuContainer) {
        super._renderItems(nodes, submenuContainer);
        const $submenu = $(this._overlay.content()).children(".dx-submenu");
        if ($submenu.length) {
            this._initScrollable($submenu)
        }
    }
    _setAriaAttributes() {
        this._overlayContentId = `dx-${new Guid}`;
        this.setAria("owns", this._overlayContentId);
        this.setAria({
            id: this._overlayContentId,
            role: "menu"
        }, this._overlay.$content())
    }
    _cleanAriaAttributes() {
        this._overlay && this.setAria("id", null, this._overlay.$content());
        this.setAria("owns", void 0)
    }
    _getTarget() {
        return this.option("target") || this.option("position").of || $(domAdapter.getDocument())
    }
    _getContextMenuPosition() {
        return extend({}, this.option("position"), {
            of: this._getTarget()
        })
    }
    _positionContextMenu(jQEvent) {
        let position = this._getContextMenuPosition();
        const isInitialPosition = this._isInitialOptionValue("position");
        const positioningAction = this._createActionByOption("onPositioning");
        if (jQEvent && jQEvent.preventDefault && isInitialPosition) {
            position.of = jQEvent
        }
        const actionArgs = {
            position: position,
            event: jQEvent
        };
        positioningAction(actionArgs);
        if (actionArgs.cancel) {
            position = null
        } else if (actionArgs.event) {
            actionArgs.event.cancel = true;
            jQEvent.preventDefault()
        }
        return position
    }
    _refresh() {
        if (!hasWindow()) {
            super._refresh()
        } else if (this._overlay) {
            const lastPosition = this._overlay.option("position");
            super._refresh();
            this._overlay && this._overlay.option("position", lastPosition)
        } else {
            super._refresh()
        }
    }
    _hide() {
        let promise;
        if (this._overlay) {
            promise = this._overlay.hide();
            this._setOptionWithoutOptionChange("visible", false)
        }
        this._cleanAriaAttributes();
        this.option("focusedElement", null);
        return promise || (new Deferred).reject().promise()
    }
    toggle(showing) {
        const visible = this.option("visible");
        showing = void 0 === showing ? !visible : showing;
        return this._renderVisibility(showing)
    }
    show() {
        return this.toggle(true)
    }
    hide() {
        return this.toggle(false)
    }
}
registerComponent("dxContextMenu", ContextMenu);
export default ContextMenu;
