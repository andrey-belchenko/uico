/**
 * DevExtreme (cjs/ui/menu/ui.menu.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _common = require("../../core/utils/common");
var _element = require("../../core/element");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _utils = require("../overlay/utils");
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _hover = require("../../events/hover");
var _ui = _interopRequireDefault(require("../context_menu/ui.menu_base"));
var _ui2 = _interopRequireDefault(require("../overlay/ui.overlay"));
var _ui3 = _interopRequireDefault(require("./ui.submenu"));
var _button = _interopRequireDefault(require("../button"));
var _tree_view = _interopRequireDefault(require("../tree_view"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DX_MENU_CLASS = "dx-menu";
const DX_MENU_VERTICAL_CLASS = "dx-menu-vertical";
const DX_MENU_HORIZONTAL_CLASS = "dx-menu-horizontal";
const DX_MENU_ITEM_CLASS = "dx-menu-item";
const DX_MENU_ITEMS_CONTAINER_CLASS = "dx-menu-items-container";
const DX_MENU_ITEM_EXPANDED_CLASS = "dx-menu-item-expanded";
const DX_CONTEXT_MENU_CLASS = "dx-context-menu";
const DX_CONTEXT_MENU_CONTAINER_BORDER_CLASS = "dx-context-menu-container-border";
const DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS = "dx-context-menu-content-delimiter";
const DX_SUBMENU_CLASS = "dx-submenu";
const DX_STATE_DISABLED_CLASS = "dx-state-disabled";
const DX_STATE_HOVER_CLASS = "dx-state-hover";
const DX_STATE_ACTIVE_CLASS = "dx-state-active";
const DX_ADAPTIVE_MODE_CLASS = "dx-menu-adaptive-mode";
const DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS = "dx-menu-hamburger-button";
const DX_ADAPTIVE_MODE_OVERLAY_WRAPPER_CLASS = "dx-menu-adaptive-mode-overlay-wrapper";
const FOCUS_UP = "up";
const FOCUS_DOWN = "down";
const FOCUS_LEFT = "left";
const FOCUS_RIGHT = "right";
const SHOW_SUBMENU_OPERATION = "showSubmenu";
const NEXTITEM_OPERATION = "nextItem";
const PREVITEM_OPERATION = "prevItem";
const DEFAULT_DELAY = {
    show: 50,
    hide: 300
};
const ACTIONS = ["onSubmenuShowing", "onSubmenuShown", "onSubmenuHiding", "onSubmenuHidden", "onItemContextMenu", "onItemClick", "onSelectionChanged", "onItemRendered"];
class Menu extends _ui.default {
    _getDefaultOptions() {
        return (0, _extend.extend)(super._getDefaultOptions(), {
            orientation: "horizontal",
            submenuDirection: "auto",
            showFirstSubmenuMode: {
                name: "onClick",
                delay: {
                    show: 50,
                    hide: 300
                }
            },
            hideSubmenuOnMouseLeave: false,
            onSubmenuShowing: null,
            onSubmenuShown: null,
            onSubmenuHiding: null,
            onSubmenuHidden: null,
            adaptivityEnabled: false
        })
    }
    _setOptionsByReference() {
        super._setOptionsByReference();
        (0, _extend.extend)(this._optionsByReference, {
            animation: true,
            selectedItem: true
        })
    }
    _itemElements() {
        const rootMenuElements = super._itemElements();
        const submenuElements = this._submenuItemElements();
        return rootMenuElements.add(submenuElements)
    }
    _submenuItemElements() {
        let elements = [];
        const currentSubmenu = this._submenus.length && this._submenus[0];
        if (currentSubmenu && currentSubmenu.itemsContainer()) {
            elements = currentSubmenu.itemsContainer().find(".dx-menu-item")
        }
        return elements
    }
    _focusTarget() {
        return this.$element()
    }
    _isMenuHorizontal() {
        return "horizontal" === this.option("orientation")
    }
    _moveFocus(location) {
        const $items = this._getAvailableItems();
        const isMenuHorizontal = this._isMenuHorizontal();
        const $activeItem = this._getActiveItem(true);
        let argument;
        let operation;
        let navigationAction;
        let $newTarget;
        switch (location) {
            case "up":
                operation = isMenuHorizontal ? "showSubmenu" : this._getItemsNavigationOperation("prevItem");
                argument = isMenuHorizontal ? $activeItem : $items;
                navigationAction = this._getKeyboardNavigationAction(operation, argument);
                $newTarget = navigationAction();
                break;
            case "down":
                operation = isMenuHorizontal ? "showSubmenu" : this._getItemsNavigationOperation("nextItem");
                argument = isMenuHorizontal ? $activeItem : $items;
                navigationAction = this._getKeyboardNavigationAction(operation, argument);
                $newTarget = navigationAction();
                break;
            case "right":
                operation = isMenuHorizontal ? this._getItemsNavigationOperation("nextItem") : "showSubmenu";
                argument = isMenuHorizontal ? $items : $activeItem;
                navigationAction = this._getKeyboardNavigationAction(operation, argument);
                $newTarget = navigationAction();
                break;
            case "left":
                operation = isMenuHorizontal ? this._getItemsNavigationOperation("prevItem") : "showSubmenu";
                argument = isMenuHorizontal ? $items : $activeItem;
                navigationAction = this._getKeyboardNavigationAction(operation, argument);
                $newTarget = navigationAction();
                break;
            default:
                return super._moveFocus(location)
        }
        if ($newTarget && 0 !== $newTarget.length) {
            this.option("focusedElement", (0, _element.getPublicElement)($newTarget))
        }
    }
    _getItemsNavigationOperation(operation) {
        let navOperation = operation;
        if (this.option("rtlEnabled")) {
            navOperation = "prevItem" === operation ? "nextItem" : "prevItem"
        }
        return navOperation
    }
    _getKeyboardNavigationAction(operation, argument) {
        let action = _common.noop;
        switch (operation) {
            case "showSubmenu":
                if (!argument.hasClass("dx-state-disabled")) {
                    action = this._showSubmenu.bind(this, argument)
                }
                break;
            case "nextItem":
                action = this._nextItem.bind(this, argument);
                break;
            case "prevItem":
                action = this._prevItem.bind(this, argument)
        }
        return action
    }
    _clean() {
        super._clean();
        this.option("templatesRenderAsynchronously") && clearTimeout(this._resizeEventTimer)
    }
    _visibilityChanged(visible) {
        if (visible) {
            if (!this._menuItemsWidth) {
                this._updateItemsWidthCache()
            }
            this._dimensionChanged()
        }
    }
    _isAdaptivityEnabled() {
        return this.option("adaptivityEnabled") && "horizontal" === this.option("orientation")
    }
    _updateItemsWidthCache() {
        const $menuItems = this.$element().find("ul").first().children("li").children(".dx-menu-item");
        this._menuItemsWidth = this._getSummaryItemsSize("width", $menuItems, true)
    }
    _dimensionChanged() {
        if (!this._isAdaptivityEnabled()) {
            return
        }
        const containerWidth = (0, _size.getOuterWidth)(this.$element());
        this._toggleAdaptiveMode(this._menuItemsWidth > containerWidth)
    }
    _init() {
        super._init();
        this._submenus = []
    }
    _initActions() {
        this._actions = {};
        (0, _iterator.each)(ACTIONS, ((index, action) => {
            this._actions[action] = this._createActionByOption(action)
        }))
    }
    _initMarkup() {
        this._visibleSubmenu = null;
        this.$element().addClass("dx-menu");
        super._initMarkup();
        this._addCustomCssClass(this.$element());
        this.setAria("role", "menubar")
    }
    _render() {
        super._render();
        this._initAdaptivity()
    }
    _isTargetOutOfComponent(relatedTarget) {
        const isInsideRootMenu = 0 !== (0, _renderer.default)(relatedTarget).closest(".dx-menu").length;
        const isInsideContextMenu = 0 !== (0, _renderer.default)(relatedTarget).closest(".dx-context-menu").length;
        const isTargetOutOfComponent = !(isInsideRootMenu || isInsideContextMenu);
        return isTargetOutOfComponent
    }
    _focusOutHandler(e) {
        const {
            relatedTarget: relatedTarget
        } = e;
        if (relatedTarget) {
            const isTargetOutside = this._isTargetOutOfComponent(relatedTarget);
            if (isTargetOutside) {
                this._hideVisibleSubmenu()
            }
        }
        super._focusOutHandler(e)
    }
    _renderHamburgerButton() {
        this._hamburger = new _button.default((0, _renderer.default)("<div>").addClass("dx-menu-hamburger-button"), {
            icon: "menu",
            activeStateEnabled: false,
            onClick: this._toggleTreeView.bind(this)
        });
        return this._hamburger.$element()
    }
    _toggleTreeView(state) {
        if ((0, _type.isPlainObject)(state)) {
            state = !this._overlay.option("visible")
        }
        this._overlay.option("visible", state);
        if (state) {
            this._treeView.focus()
        }
        this._toggleHamburgerActiveState(state)
    }
    _toggleHamburgerActiveState(state) {
        this._hamburger && this._hamburger.$element().toggleClass("dx-state-active", state)
    }
    _toggleAdaptiveMode(state) {
        const $menuItemsContainer = this.$element().find(".dx-menu-horizontal");
        const $adaptiveElements = this.$element().find(`.${DX_ADAPTIVE_MODE_CLASS}`);
        if (state) {
            this._hideVisibleSubmenu()
        } else {
            this._treeView && this._treeView.collapseAll();
            this._overlay && this._toggleTreeView(state)
        }
        $menuItemsContainer.toggle(!state);
        $adaptiveElements.toggle(state)
    }
    _removeAdaptivity() {
        if (!this._$adaptiveContainer) {
            return
        }
        this._toggleAdaptiveMode(false);
        this._$adaptiveContainer.remove();
        this._$adaptiveContainer = null;
        this._treeView = null;
        this._hamburger = null;
        this._overlay = null
    }
    _treeviewItemClickHandler(e) {
        this._actions.onItemClick(e);
        if (!e.node.children.length) {
            this._toggleTreeView(false)
        }
    }
    _getAdaptiveOverlayOptions() {
        const rtl = this.option("rtlEnabled");
        const position = rtl ? "right" : "left";
        return {
            _ignoreFunctionValueDeprecation: true,
            maxHeight: () => (0, _utils.getElementMaxHeightByWindow)(this.$element()),
            deferRendering: false,
            shading: false,
            animation: false,
            hideOnParentScroll: true,
            onHidden: () => {
                this._toggleHamburgerActiveState(false)
            },
            height: "auto",
            hideOnOutsideClick: e => !(0, _renderer.default)(e.target).closest(".dx-menu-hamburger-button").length,
            position: {
                collision: "flipfit",
                at: "bottom " + position,
                my: "top " + position,
                of: this._hamburger.$element()
            }
        }
    }
    _getTreeViewOptions() {
        const menuOptions = {};
        (0, _iterator.each)(["rtlEnabled", "width", "accessKey", "activeStateEnabled", "animation", "dataSource", "disabled", "displayExpr", "displayExpr", "focusStateEnabled", "hint", "hoverStateEnabled", "itemsExpr", "items", "itemTemplate", "selectedExpr", "selectionMode", "tabIndex", "visible"], ((_, option) => {
            menuOptions[option] = this.option(option)
        }));
        (0, _iterator.each)(["onItemContextMenu", "onSelectionChanged", "onItemRendered"], ((_, actionName) => {
            menuOptions[actionName] = e => {
                this._actions[actionName](e)
            }
        }));
        return (0, _extend.extend)(menuOptions, {
            dataSource: this.getDataSource(),
            animationEnabled: !!this.option("animation"),
            onItemClick: this._treeviewItemClickHandler.bind(this),
            onItemExpanded: e => {
                this._overlay.repaint();
                this._actions.onSubmenuShown(e)
            },
            onItemCollapsed: e => {
                this._overlay.repaint();
                this._actions.onSubmenuHidden(e)
            },
            selectNodesRecursive: false,
            selectByClick: this.option("selectByClick"),
            expandEvent: "click"
        })
    }
    _initAdaptivity() {
        if (!this._isAdaptivityEnabled()) {
            return
        }
        this._$adaptiveContainer = (0, _renderer.default)("<div>").addClass(DX_ADAPTIVE_MODE_CLASS);
        const $hamburger = this._renderHamburgerButton();
        this._treeView = this._createComponent((0, _renderer.default)("<div>"), _tree_view.default, this._getTreeViewOptions());
        this._overlay = this._createComponent((0, _renderer.default)("<div>"), _ui2.default, this._getAdaptiveOverlayOptions());
        this._overlay.$content().append(this._treeView.$element()).addClass(DX_ADAPTIVE_MODE_CLASS).addClass(this.option("cssClass"));
        this._overlay.$wrapper().addClass(DX_ADAPTIVE_MODE_OVERLAY_WRAPPER_CLASS);
        this._$adaptiveContainer.append($hamburger);
        this._$adaptiveContainer.append(this._overlay.$element());
        this.$element().append(this._$adaptiveContainer);
        this._updateItemsWidthCache();
        this._dimensionChanged()
    }
    _getDelay(delayType) {
        const delay = this.option("showFirstSubmenuMode").delay;
        if (!(0, _type.isDefined)(delay)) {
            return DEFAULT_DELAY[delayType]
        } else {
            return (0, _type.isObject)(delay) ? delay[delayType] : delay
        }
    }
    _keyboardHandler(e) {
        return super._keyboardHandler(e, !!this._visibleSubmenu)
    }
    _renderContainer() {
        const $wrapper = (0, _renderer.default)("<div>");
        $wrapper.appendTo(this.$element()).addClass(this._isMenuHorizontal() ? "dx-menu-horizontal" : "dx-menu-vertical");
        return super._renderContainer($wrapper)
    }
    _renderSubmenuItems(node, $itemFrame) {
        const submenu = this._createSubmenu(node, $itemFrame);
        this._submenus.push(submenu);
        this._renderBorderElement($itemFrame);
        return submenu
    }
    _getKeyboardListeners() {
        return super._getKeyboardListeners().concat(this._visibleSubmenu)
    }
    _createSubmenu(node, $rootItem) {
        const $submenuContainer = (0, _renderer.default)("<div>").addClass("dx-context-menu").appendTo($rootItem);
        const items = this._getChildNodes(node);
        const subMenu = this._createComponent($submenuContainer, _ui3.default, (0, _extend.extend)(this._getSubmenuOptions(), {
            _dataAdapter: this._dataAdapter,
            _parentKey: node.internalFields.key,
            items: items,
            onHoverStart: this._clearTimeouts.bind(this),
            position: this.getSubmenuPosition($rootItem)
        }));
        this._attachSubmenuHandlers($rootItem, subMenu);
        return subMenu
    }
    _getSubmenuOptions() {
        const $submenuTarget = (0, _renderer.default)("<div>");
        const isMenuHorizontal = this._isMenuHorizontal();
        return {
            itemTemplate: this.option("itemTemplate"),
            target: $submenuTarget,
            orientation: this.option("orientation"),
            selectionMode: this.option("selectionMode"),
            cssClass: this.option("cssClass"),
            selectByClick: this.option("selectByClick"),
            hoverStateEnabled: this.option("hoverStateEnabled"),
            activeStateEnabled: this.option("activeStateEnabled"),
            focusStateEnabled: this.option("focusStateEnabled"),
            animation: this.option("animation"),
            showSubmenuMode: this.option("showSubmenuMode"),
            displayExpr: this.option("displayExpr"),
            disabledExpr: this.option("disabledExpr"),
            selectedExpr: this.option("selectedExpr"),
            itemsExpr: this.option("itemsExpr"),
            onFocusedItemChanged: e => {
                if (!e.component.option("visible")) {
                    return
                }
                this.option("focusedElement", e.component.option("focusedElement"))
            },
            onSelectionChanged: this._nestedItemOnSelectionChangedHandler.bind(this),
            onItemClick: this._nestedItemOnItemClickHandler.bind(this),
            onItemRendered: this._nestedItemOnItemRenderedHandler.bind(this),
            onLeftFirstItem: isMenuHorizontal ? null : this._moveMainMenuFocus.bind(this, "prevItem"),
            onLeftLastItem: isMenuHorizontal ? null : this._moveMainMenuFocus.bind(this, "nextItem"),
            onCloseRootSubmenu: this._moveMainMenuFocus.bind(this, isMenuHorizontal ? "prevItem" : null),
            onExpandLastSubmenu: isMenuHorizontal ? this._moveMainMenuFocus.bind(this, "nextItem") : null
        }
    }
    _getShowFirstSubmenuMode() {
        if (!this._isDesktopDevice()) {
            return "onClick"
        }
        const optionValue = this.option("showFirstSubmenuMode");
        return (0, _type.isObject)(optionValue) ? optionValue.name : optionValue
    }
    _moveMainMenuFocus(direction) {
        const $items = this._getAvailableItems();
        const itemCount = $items.length;
        const $currentItem = $items.filter(".dx-menu-item-expanded").eq(0);
        let itemIndex = $items.index($currentItem);
        this._hideSubmenu(this._visibleSubmenu);
        itemIndex += "prevItem" === direction ? -1 : 1;
        if (itemIndex >= itemCount) {
            itemIndex = 0
        } else if (itemIndex < 0) {
            itemIndex = itemCount - 1
        }
        const $newItem = $items.eq(itemIndex);
        this.option("focusedElement", (0, _element.getPublicElement)($newItem))
    }
    _nestedItemOnSelectionChangedHandler(args) {
        const selectedItem = args.addedItems.length && args.addedItems[0];
        const submenu = _ui3.default.getInstance(args.element);
        const onSelectionChanged = this._actions.onSelectionChanged;
        onSelectionChanged(args);
        selectedItem && this._clearSelectionInSubmenus(selectedItem[0], submenu);
        this._clearRootSelection();
        this._setOptionWithoutOptionChange("selectedItem", selectedItem)
    }
    _clearSelectionInSubmenus(item, targetSubmenu) {
        const cleanAllSubmenus = !arguments.length;
        (0, _iterator.each)(this._submenus, ((index, submenu) => {
            const $submenu = submenu._itemContainer();
            const isOtherItem = !$submenu.is(targetSubmenu && targetSubmenu._itemContainer());
            const $selectedItem = $submenu.find(`.${this._selectedItemClass()}`);
            if (isOtherItem && $selectedItem.length || cleanAllSubmenus) {
                $selectedItem.removeClass(this._selectedItemClass());
                const selectedItemData = this._getItemData($selectedItem);
                if (selectedItemData) {
                    selectedItemData.selected = false
                }
                submenu._clearSelectedItems()
            }
        }))
    }
    _clearRootSelection() {
        const $prevSelectedItem = this.$element().find(".dx-menu-items-container").first().children().children().filter(`.${this._selectedItemClass()}`);
        if ($prevSelectedItem.length) {
            const prevSelectedItemData = this._getItemData($prevSelectedItem);
            prevSelectedItemData.selected = false;
            $prevSelectedItem.removeClass(this._selectedItemClass())
        }
    }
    _nestedItemOnItemClickHandler(e) {
        this._actions.onItemClick(e)
    }
    _nestedItemOnItemRenderedHandler(e) {
        this._actions.onItemRendered(e)
    }
    _attachSubmenuHandlers($menuAnchorItem, submenu) {
        const $submenuOverlayContent = submenu.getOverlayContent();
        const submenus = $submenuOverlayContent.find(".dx-submenu");
        const submenuMouseLeaveName = (0, _index.addNamespace)(_hover.end, this.NAME + "_submenu");
        submenu.option({
            onShowing: this._submenuOnShowingHandler.bind(this, $menuAnchorItem, submenu),
            onShown: this._submenuOnShownHandler.bind(this, $menuAnchorItem, submenu),
            onHiding: this._submenuOnHidingHandler.bind(this, $menuAnchorItem, submenu),
            onHidden: this._submenuOnHiddenHandler.bind(this, $menuAnchorItem, submenu)
        });
        (0, _iterator.each)(submenus, ((index, submenu) => {
            _events_engine.default.off(submenu, submenuMouseLeaveName);
            _events_engine.default.on(submenu, submenuMouseLeaveName, null, this._submenuMouseLeaveHandler.bind(this, $menuAnchorItem))
        }))
    }
    _submenuOnShowingHandler($menuAnchorItem, submenu, _ref) {
        let {
            rootItem: rootItem
        } = _ref;
        const $border = $menuAnchorItem.children(".dx-context-menu-container-border");
        const params = this._getVisibilityChangeEventParams(rootItem, submenu, $menuAnchorItem);
        this._actions.onSubmenuShowing(params);
        $border.show();
        $menuAnchorItem.addClass("dx-menu-item-expanded")
    }
    _submenuOnShownHandler($menuAnchorItem, submenu, _ref2) {
        let {
            rootItem: rootItem
        } = _ref2;
        const params = this._getVisibilityChangeEventParams(rootItem, submenu, $menuAnchorItem);
        this._actions.onSubmenuShown(params)
    }
    _submenuOnHidingHandler($menuAnchorItem, submenu, eventArgs) {
        const $border = $menuAnchorItem.children(".dx-context-menu-container-border");
        const params = this._getVisibilityChangeEventParams(eventArgs.rootItem, submenu, $menuAnchorItem, true);
        eventArgs.itemData = params.itemData;
        eventArgs.rootItem = params.rootItem;
        eventArgs.submenuContainer = params.submenuContainer;
        eventArgs.submenu = params.submenu;
        this._actions.onSubmenuHiding(eventArgs);
        if (!eventArgs.cancel) {
            if (this._visibleSubmenu === submenu) {
                this._visibleSubmenu = null
            }
            $border.hide();
            $menuAnchorItem.removeClass("dx-menu-item-expanded")
        }
    }
    _submenuOnHiddenHandler($menuAnchorItem, submenu, _ref3) {
        let {
            rootItem: rootItem
        } = _ref3;
        const params = this._getVisibilityChangeEventParams(rootItem, submenu, $menuAnchorItem, true);
        this._actions.onSubmenuHidden(params)
    }
    _getVisibilityChangeEventParams(submenuItem, submenu, $menuAnchorItem, isHide) {
        let itemData;
        let $submenuContainer;
        if (submenuItem) {
            const anchor = isHide ? (0, _renderer.default)(submenuItem).closest(".dx-menu-item")[0] : submenuItem;
            itemData = this._getItemData(anchor);
            $submenuContainer = (0, _renderer.default)(anchor).find(".dx-submenu").first()
        } else {
            const $overlayContent = (0, _renderer.default)(submenu._overlay.content());
            itemData = this._getItemData($menuAnchorItem);
            $submenuContainer = $overlayContent.find(".dx-submenu").first()
        }
        return {
            itemData: itemData,
            rootItem: (0, _element.getPublicElement)($menuAnchorItem),
            submenuContainer: (0, _element.getPublicElement)($submenuContainer),
            submenu: submenu
        }
    }
    _submenuMouseLeaveHandler($rootItem, eventArgs) {
        const target = (0, _renderer.default)(eventArgs.relatedTarget).parents(".dx-context-menu")[0];
        const contextMenu = this._getSubmenuByRootElement($rootItem).getOverlayContent()[0];
        if (this.option("hideSubmenuOnMouseLeave") && target !== contextMenu) {
            this._clearTimeouts();
            setTimeout(this._hideSubmenuAfterTimeout.bind(this), this._getDelay("hide"))
        }
    }
    _hideSubmenuAfterTimeout() {
        if (!this._visibleSubmenu) {
            return
        }
        const isRootItemHovered = (0, _renderer.default)(this._visibleSubmenu.$element().context).hasClass("dx-state-hover");
        const isSubmenuItemHovered = this._visibleSubmenu.getOverlayContent().find(".dx-state-hover").length;
        const hoveredElementFromSubMenu = this._visibleSubmenu.getOverlayContent().get(0).querySelector(":hover");
        if (!hoveredElementFromSubMenu && !isSubmenuItemHovered && !isRootItemHovered) {
            this._visibleSubmenu.hide()
        }
    }
    _getSubmenuByRootElement($rootItem) {
        if (!$rootItem) {
            return false
        }
        const $submenu = $rootItem.children(".dx-context-menu");
        return $submenu.length && _ui3.default.getInstance($submenu)
    }
    getSubmenuPosition($rootItem) {
        const isHorizontalMenu = this._isMenuHorizontal();
        const submenuDirection = this.option("submenuDirection").toLowerCase();
        const rtlEnabled = this.option("rtlEnabled");
        const submenuPosition = {
            collision: "flip",
            of: $rootItem,
            precise: true
        };
        switch (submenuDirection) {
            case "leftortop":
                submenuPosition.at = "left top";
                submenuPosition.my = isHorizontalMenu ? "left bottom" : "right top";
                break;
            case "rightorbottom":
                submenuPosition.at = isHorizontalMenu ? "left bottom" : "right top";
                submenuPosition.my = "left top";
                break;
            default:
                if (isHorizontalMenu) {
                    submenuPosition.at = rtlEnabled ? "right bottom" : "left bottom";
                    submenuPosition.my = rtlEnabled ? "right top" : "left top"
                } else {
                    submenuPosition.at = rtlEnabled ? "left top" : "right top";
                    submenuPosition.my = rtlEnabled ? "right top" : "left top"
                }
        }
        return submenuPosition
    }
    _renderBorderElement($item) {
        (0, _renderer.default)("<div>").appendTo($item).addClass("dx-context-menu-container-border").hide()
    }
    _itemPointerDownHandler(e) {
        const $target = (0, _renderer.default)(e.target);
        const $closestItem = $target.closest(this._itemElements());
        if ($closestItem.hasClass("dx-menu-item-has-submenu")) {
            this.option("focusedElement", null);
            return
        }
        super._itemPointerDownHandler(e)
    }
    _hoverStartHandler(e) {
        const mouseMoveEventName = (0, _index.addNamespace)(_pointer.default.move, this.NAME);
        const $item = this._getItemElementByEventArgs(e);
        const node = this._dataAdapter.getNodeByItem(this._getItemData($item));
        const isSelectionActive = (0, _type.isDefined)(e.buttons) && 1 === e.buttons || !(0, _type.isDefined)(e.buttons) && 1 === e.which;
        if (this._isItemDisabled($item)) {
            return
        }
        _events_engine.default.off($item, mouseMoveEventName);
        if (!this._hasChildren(node)) {
            this._showSubmenuTimer = setTimeout(this._hideSubmenuAfterTimeout.bind(this), this._getDelay("hide"));
            return
        }
        if ("onHover" === this._getShowFirstSubmenuMode() && !isSelectionActive) {
            const submenu = this._getSubmenuByElement($item);
            this._clearTimeouts();
            if (!submenu.isOverlayVisible()) {
                _events_engine.default.on($item, mouseMoveEventName, this._itemMouseMoveHandler.bind(this));
                this._showSubmenuTimer = this._getDelay("hide")
            }
        }
    }
    _hoverEndHandler(eventArg) {
        const $item = this._getItemElementByEventArgs(eventArg);
        const relatedTarget = (0, _renderer.default)(eventArg.relatedTarget);
        super._hoverEndHandler(eventArg);
        this._clearTimeouts();
        if (this._isItemDisabled($item)) {
            return
        }
        if (relatedTarget.hasClass("dx-context-menu-content-delimiter")) {
            return
        }
        if (this.option("hideSubmenuOnMouseLeave") && !relatedTarget.hasClass("dx-menu-items-container")) {
            this._hideSubmenuTimer = setTimeout((() => {
                this._hideSubmenuAfterTimeout()
            }), this._getDelay("hide"))
        }
    }
    _hideVisibleSubmenu() {
        if (!this._visibleSubmenu) {
            return false
        }
        this._hideSubmenu(this._visibleSubmenu);
        return true
    }
    _showSubmenu($itemElement) {
        const submenu = this._getSubmenuByElement($itemElement);
        if (this._visibleSubmenu !== submenu) {
            this._hideVisibleSubmenu()
        }
        if (submenu) {
            this._clearTimeouts();
            this.focus();
            submenu.show();
            this.option("focusedElement", submenu.option("focusedElement"))
        }
        this._visibleSubmenu = submenu;
        this._hoveredRootItem = $itemElement
    }
    _hideSubmenu(submenu) {
        if (submenu) {
            submenu.hide()
        }
        if (this._visibleSubmenu === submenu) {
            this._visibleSubmenu = null
        }
        this._hoveredRootItem = null
    }
    _itemMouseMoveHandler(e) {
        if (e.pointers && e.pointers.length) {
            return
        }
        const $item = (0, _renderer.default)(e.currentTarget);
        if (!(0, _type.isDefined)(this._showSubmenuTimer)) {
            return
        }
        this._clearTimeouts();
        this._showSubmenuTimer = setTimeout((() => {
            const submenu = this._getSubmenuByElement($item);
            if (submenu && !submenu.isOverlayVisible()) {
                this._showSubmenu($item)
            }
        }), this._getDelay("show"))
    }
    _clearTimeouts() {
        clearTimeout(this._hideSubmenuTimer);
        clearTimeout(this._showSubmenuTimer)
    }
    _getSubmenuByElement($itemElement, itemData) {
        const submenu = this._getSubmenuByRootElement($itemElement);
        if (submenu) {
            return submenu
        } else {
            itemData = itemData || this._getItemData($itemElement);
            const node = this._dataAdapter.getNodeByItem(itemData);
            return this._hasChildren(node) && this._renderSubmenuItems(node, $itemElement)
        }
    }
    _updateSubmenuVisibilityOnClick(actionArgs) {
        const args = actionArgs.args.length && actionArgs.args[0];
        if (!args || this._disabledGetter(args.itemData)) {
            return
        }
        const $itemElement = (0, _renderer.default)(args.itemElement);
        const currentSubmenu = this._getSubmenuByElement($itemElement, args.itemData);
        this._updateSelectedItemOnClick(actionArgs);
        if (this._visibleSubmenu) {
            if (this._visibleSubmenu === currentSubmenu) {
                if ("onClick" === this.option("showFirstSubmenuMode")) {
                    this._hideSubmenu(this._visibleSubmenu)
                }
                return
            } else {
                this._hideSubmenu(this._visibleSubmenu)
            }
        }
        if (!currentSubmenu) {
            return
        }
        if (!currentSubmenu.isOverlayVisible()) {
            this._showSubmenu($itemElement);
            return
        }
    }
    _optionChanged(args) {
        if (ACTIONS.indexOf(args.name) >= 0) {
            this._initActions();
            return
        }
        switch (args.name) {
            case "orientation":
            case "submenuDirection":
                this._invalidate();
                break;
            case "showFirstSubmenuMode":
            case "hideSubmenuOnMouseLeave":
                break;
            case "showSubmenuMode":
                this._changeSubmenusOption(args.name, args.value);
                break;
            case "adaptivityEnabled":
                args.value ? this._initAdaptivity() : this._removeAdaptivity();
                break;
            case "width":
                if (this._isAdaptivityEnabled()) {
                    this._treeView.option(args.name, args.value);
                    this._overlay.option(args.name, args.value)
                }
                super._optionChanged(args);
                this._dimensionChanged();
                break;
            case "animation":
                if (this._isAdaptivityEnabled()) {
                    this._treeView.option("animationEnabled", !!args.value)
                }
                super._optionChanged(args);
                break;
            default:
                if (this._isAdaptivityEnabled() && (args.name === args.fullName || "items" === args.name)) {
                    this._treeView.option(args.fullName, args.value)
                }
                super._optionChanged(args)
        }
    }
    _changeSubmenusOption(name, value) {
        (0, _iterator.each)(this._submenus, ((index, submenu) => {
            submenu.option(name, value)
        }))
    }
    selectItem(itemElement) {
        this._hideSubmenu(this._visibleSubmenu);
        super.selectItem(itemElement)
    }
    unselectItem(itemElement) {
        this._hideSubmenu(this._visibleSubmenu);
        super.selectItem(itemElement)
    }
}(0, _component_registrator.default)("dxMenu", Menu);
var _default = exports.default = Menu;
module.exports = exports.default;
module.exports.default = exports.default;
