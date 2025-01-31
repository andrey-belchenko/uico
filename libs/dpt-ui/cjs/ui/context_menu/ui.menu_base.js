/**
 * DevExtreme (cjs/ui/context_menu/ui.menu_base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _utils = require("../widget/utils.ink_ripple");
var _ui = _interopRequireDefault(require("../hierarchical_collection/ui.hierarchical_collection_widget"));
var _uiMenu_baseEdit = _interopRequireDefault(require("./ui.menu_base.edit.strategy"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _item = _interopRequireDefault(require("../collection/item"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DX_MENU_CLASS = "dx-menu";
const DX_MENU_NO_ICONS_CLASS = "dx-menu-no-icons";
const DX_MENU_BASE_CLASS = "dx-menu-base";
const ITEM_CLASS = "dx-menu-item";
const DX_ITEM_CONTENT_CLASS = ITEM_CLASS + "-content";
const DX_MENU_SELECTED_ITEM_CLASS = ITEM_CLASS + "-selected";
const DX_MENU_ITEM_WRAPPER_CLASS = ITEM_CLASS + "-wrapper";
const DX_MENU_ITEMS_CONTAINER_CLASS = "dx-menu-items-container";
const DX_MENU_ITEM_EXPANDED_CLASS = ITEM_CLASS + "-expanded";
const DX_MENU_SEPARATOR_CLASS = "dx-menu-separator";
const DX_MENU_ITEM_LAST_GROUP_ITEM = "dx-menu-last-group-item";
const DX_ITEM_HAS_TEXT = ITEM_CLASS + "-has-text";
const DX_ITEM_HAS_ICON = ITEM_CLASS + "-has-icon";
const DX_ITEM_HAS_SUBMENU = ITEM_CLASS + "-has-submenu";
const DX_MENU_ITEM_POPOUT_CLASS = ITEM_CLASS + "-popout";
const DX_MENU_ITEM_POPOUT_CONTAINER_CLASS = "dx-menu-item-popout-container";
const DX_MENU_ITEM_CAPTION_CLASS = ITEM_CLASS + "-text";
const SINGLE_SELECTION_MODE = "single";
const DEFAULT_DELAY = {
    show: 50,
    hide: 300
};
const DX_MENU_ITEM_CAPTION_URL_CLASS = "dx-menu-item-text-with-url";
const DX_ICON_WITH_URL_CLASS = "dx-icon-with-url";
const ITEM_URL_CLASS = "dx-item-url";
class MenuBase extends _ui.default {
    _getDefaultOptions() {
        return (0, _extend.extend)(super._getDefaultOptions(), {
            items: [],
            cssClass: "",
            activeStateEnabled: true,
            showSubmenuMode: {
                name: "onHover",
                delay: {
                    show: 50,
                    hide: 300
                }
            },
            animation: {
                show: {
                    type: "fade",
                    from: 0,
                    to: 1,
                    duration: 100
                },
                hide: {
                    type: "fade",
                    from: 1,
                    to: 0,
                    duration: 100
                }
            },
            selectByClick: false,
            focusOnSelectedItem: false,
            keyExpr: null,
            _itemAttributes: {
                role: "menuitem"
            },
            useInkRipple: false
        })
    }
    _itemDataKey() {
        return "dxMenuItemDataKey"
    }
    _itemClass() {
        return ITEM_CLASS
    }
    _setAriaSelectionAttribute() {}
    _selectedItemClass() {
        return DX_MENU_SELECTED_ITEM_CLASS
    }
    _widgetClass() {
        return "dx-menu-base"
    }
    _focusTarget() {
        return this._itemContainer()
    }
    _clean() {
        this.option("focusedElement", null);
        super._clean()
    }
    _supportedKeys() {
        return (0, _extend.extend)(super._supportedKeys(), {
            space: () => {
                const $item = (0, _renderer.default)(this.option("focusedElement"));
                if (!$item.length || !this._isSelectionEnabled()) {
                    return
                }
                this.selectItem($item[0])
            },
            pageUp: _common.noop,
            pageDown: _common.noop
        })
    }
    _isSelectionEnabled() {
        return "single" === this.option("selectionMode")
    }
    _init() {
        this._activeStateUnit = `.${ITEM_CLASS}`;
        super._init();
        this._renderSelectedItem();
        this._initActions()
    }
    _getLinkContainer(iconContainer, textContainer, _ref) {
        let {
            linkAttr: linkAttr,
            url: url
        } = _ref;
        null === iconContainer || void 0 === iconContainer || iconContainer.addClass("dx-icon-with-url");
        null === textContainer || void 0 === textContainer || textContainer.addClass("dx-menu-item-text-with-url");
        return super._getLinkContainer(iconContainer, textContainer, {
            linkAttr: linkAttr,
            url: url
        })
    }
    _addContent($container, itemData) {
        const {
            html: html,
            url: url
        } = itemData;
        if (url) {
            $container.html(html);
            const link = this._getLinkContainer(this._getIconContainer(itemData), this._getTextContainer(itemData), itemData);
            $container.append(link)
        } else {
            super._addContent($container, itemData)
        }
        $container.append(this._getPopoutContainer(itemData));
        this._addContentClasses(itemData, $container.parent())
    }
    _getTextContainer(itemData) {
        const {
            text: text
        } = itemData;
        if (!text) {
            return
        }
        const $itemContainer = (0, _renderer.default)("<span>").addClass(DX_MENU_ITEM_CAPTION_CLASS);
        const itemText = (0, _type.isPlainObject)(itemData) ? text : String(itemData);
        return $itemContainer.text(itemText)
    }
    _getItemExtraPropNames() {
        return ["url", "linkAttr"]
    }
    _getPopoutContainer(itemData) {
        const items = itemData.items;
        let $popOutContainer;
        if (items && items.length) {
            const $popOutImage = (0, _renderer.default)("<div>").addClass(DX_MENU_ITEM_POPOUT_CLASS);
            $popOutContainer = (0, _renderer.default)("<span>").addClass("dx-menu-item-popout-container").append($popOutImage)
        }
        return $popOutContainer
    }
    _getDataAdapterOptions() {
        return {
            rootValue: 0,
            multipleSelection: false,
            recursiveSelection: false,
            recursiveExpansion: false,
            searchValue: ""
        }
    }
    _selectByItem(selectedItem) {
        if (!selectedItem) {
            return
        }
        const nodeToSelect = this._dataAdapter.getNodeByItem(selectedItem);
        this._dataAdapter.toggleSelection(nodeToSelect.internalFields.key, true)
    }
    _renderSelectedItem() {
        const selectedKeys = this._dataAdapter.getSelectedNodesKeys();
        const selectedKey = selectedKeys.length && selectedKeys[0];
        const selectedItem = this.option("selectedItem");
        if (!selectedKey) {
            this._selectByItem(selectedItem);
            return
        }
        const node = this._dataAdapter.getNodeByKey(selectedKey);
        if (false === node.selectable) {
            return
        }
        if (!selectedItem) {
            this.option("selectedItem", node.internalFields.item);
            return
        }
        if (selectedItem !== node.internalFields.item) {
            this._dataAdapter.toggleSelection(selectedKey, false);
            this._selectByItem(selectedItem)
        }
    }
    _initActions() {}
    _initMarkup() {
        super._initMarkup();
        this.option("useInkRipple") && this._renderInkRipple()
    }
    _renderInkRipple() {
        this._inkRipple = (0, _utils.render)()
    }
    _toggleActiveState($element, value, e) {
        super._toggleActiveState.apply(this, arguments);
        if (!this._inkRipple) {
            return
        }
        const config = {
            element: $element,
            event: e
        };
        if (value) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    }
    _getShowSubmenuMode() {
        let optionValue = this.option("showSubmenuMode");
        optionValue = (0, _type.isObject)(optionValue) ? optionValue.name : optionValue;
        return this._isDesktopDevice() ? optionValue : "onClick"
    }
    _initSelectedItems() {}
    _isDesktopDevice() {
        return "desktop" === _devices.default.real().deviceType
    }
    _initEditStrategy() {
        const Strategy = _uiMenu_baseEdit.default;
        this._editStrategy = new Strategy(this)
    }
    _addCustomCssClass($element) {
        $element.addClass(this.option("cssClass"))
    }
    _itemWrapperSelector() {
        return ".dx-menu-item-wrapper"
    }
    _hoverStartHandler(e) {
        const $itemElement = this._getItemElementByEventArgs(e);
        if (!$itemElement || this._isItemDisabled($itemElement)) {
            return
        }
        e.stopPropagation();
        if ("onHover" === this._getShowSubmenuMode()) {
            clearTimeout(this._showSubmenusTimeout);
            this._showSubmenusTimeout = setTimeout(this._showSubmenu.bind(this, $itemElement), this._getSubmenuDelay("show"))
        }
    }
    _getAvailableItems($itemElements) {
        return super._getAvailableItems($itemElements).filter((function() {
            return "hidden" !== (0, _renderer.default)(this).css("visibility")
        }))
    }
    _isItemDisabled($item) {
        return this._disabledGetter($item.data(this._itemDataKey()))
    }
    _showSubmenu($itemElement) {
        this._addExpandedClass($itemElement)
    }
    _addExpandedClass(itemElement) {
        (0, _renderer.default)(itemElement).addClass(DX_MENU_ITEM_EXPANDED_CLASS)
    }
    _getSubmenuDelay(action) {
        const {
            delay: delay
        } = this.option("showSubmenuMode");
        if (!(0, _type.isDefined)(delay)) {
            return DEFAULT_DELAY[action]
        }
        return (0, _type.isObject)(delay) ? delay[action] : delay
    }
    _getItemElementByEventArgs(eventArgs) {
        let $target = (0, _renderer.default)(eventArgs.target);
        if ($target.hasClass(this._itemClass()) || $target.get(0) === eventArgs.currentTarget) {
            return $target
        }
        while (!$target.hasClass(this._itemClass())) {
            $target = $target.parent();
            if ($target.hasClass("dx-submenu")) {
                return null
            }
        }
        return $target
    }
    _hoverEndHandler() {
        clearTimeout(this._showSubmenusTimeout)
    }
    _hasSubmenu(node) {
        return node && node.internalFields.childrenKeys.length
    }
    _renderContentImpl() {
        this._renderItems(this._dataAdapter.getRootNodes())
    }
    _renderItems(nodes, submenuContainer) {
        if (!nodes.length) {
            return
        }
        this.hasIcons = false;
        const $nodeContainer = this._renderContainer(this.$element(), submenuContainer);
        let firstVisibleIndex = -1;
        let nextGroupFirstIndex = -1;
        (0, _iterator.each)(nodes, ((index, node) => {
            const isVisibleNode = false !== node.visible;
            if (isVisibleNode && firstVisibleIndex < 0) {
                firstVisibleIndex = index
            }
            const isBeginGroup = firstVisibleIndex < index && (node.beginGroup || index === nextGroupFirstIndex);
            if (isBeginGroup) {
                nextGroupFirstIndex = isVisibleNode ? index : index + 1
            }
            if (index === nextGroupFirstIndex && firstVisibleIndex < index) {
                this._renderSeparator($nodeContainer)
            }
            this._renderItem(index, node, $nodeContainer)
        }));
        if (!this.hasIcons) {
            $nodeContainer.addClass("dx-menu-no-icons")
        }
    }
    _renderContainer($wrapper) {
        const $container = (0, _renderer.default)("<ul>");
        this.setAria("role", "none", $container);
        return $container.appendTo($wrapper).addClass("dx-menu-items-container")
    }
    _createDOMElement($nodeContainer) {
        const $node = (0, _renderer.default)("<li>");
        this.setAria("role", "none", $node);
        return $node.appendTo($nodeContainer).addClass(DX_MENU_ITEM_WRAPPER_CLASS)
    }
    _renderItem(index, node, $nodeContainer, $nodeElement) {
        const items = this.option("items");
        const $node = $nodeElement || this._createDOMElement($nodeContainer);
        if (items[index + 1] && items[index + 1].beginGroup) {
            $node.addClass("dx-menu-last-group-item")
        }
        const $itemFrame = super._renderItem(index, node.internalFields.item, $node);
        if (node.internalFields.item === this.option("selectedItem")) {
            $itemFrame.addClass(DX_MENU_SELECTED_ITEM_CLASS)
        }
        $itemFrame.attr("tabIndex", -1);
        if (this._hasSubmenu(node)) {
            this.setAria("haspopup", "true", $itemFrame)
        }
    }
    _renderItemFrame(index, itemData, $itemContainer) {
        const $itemFrame = $itemContainer.children(`.${ITEM_CLASS}`);
        return $itemFrame.length ? $itemFrame : super._renderItemFrame.apply(this, arguments)
    }
    _refreshItem($item, item) {
        const node = this._dataAdapter.getNodeByItem(item);
        const index = $item.data(this._itemIndexKey());
        const $nodeContainer = $item.closest("ul");
        const $nodeElement = $item.closest("li");
        this._renderItem(index, node, $nodeContainer, $nodeElement)
    }
    _addContentClasses(itemData, $itemFrame) {
        const hasText = itemData.text ? !!itemData.text.length : false;
        const hasIcon = !!itemData.icon;
        const hasSubmenu = itemData.items ? !!itemData.items.length : false;
        $itemFrame.toggleClass(DX_ITEM_HAS_TEXT, hasText);
        $itemFrame.toggleClass(DX_ITEM_HAS_ICON, hasIcon);
        if (!this.hasIcons) {
            this.hasIcons = hasIcon
        }
        $itemFrame.toggleClass(DX_ITEM_HAS_SUBMENU, hasSubmenu)
    }
    _getItemContent($itemFrame) {
        let $itemContent = super._getItemContent($itemFrame);
        if (!$itemContent.length) {
            $itemContent = $itemFrame.children(`.${DX_ITEM_CONTENT_CLASS}`)
        }
        return $itemContent
    }
    _postprocessRenderItem(args) {
        const $itemElement = (0, _renderer.default)(args.itemElement);
        const selectedIndex = this._dataAdapter.getSelectedNodesKeys();
        if (!selectedIndex.length || !this._selectedGetter(args.itemData) || !this._isItemSelectable(args.itemData)) {
            this._setAriaSelectionAttribute($itemElement, "false");
            return
        }
        const node = this._dataAdapter.getNodeByItem(args.itemData);
        if (node.internalFields.key === selectedIndex[0]) {
            $itemElement.addClass(this._selectedItemClass());
            this._setAriaSelectionAttribute($itemElement, "true")
        } else {
            this._setAriaSelectionAttribute($itemElement, "false")
        }
    }
    _isItemSelectable(item) {
        return false !== item.selectable
    }
    _renderSeparator($itemsContainer) {
        (0, _renderer.default)("<li>").appendTo($itemsContainer).addClass("dx-menu-separator")
    }
    _itemClickHandler(e) {
        if (e._skipHandling) {
            return
        }
        const itemClickActionHandler = this._createAction(this._updateSubmenuVisibilityOnClick.bind(this));
        this._itemDXEventHandler(e, "onItemClick", {}, {
            beforeExecute: this._itemClick,
            afterExecute: itemClickActionHandler.bind(this)
        });
        e._skipHandling = true
    }
    _itemClick(actionArgs) {
        const {
            event: event,
            itemData: itemData
        } = actionArgs.args[0];
        const $itemElement = this._getItemElementByEventArgs(event);
        const link = $itemElement && $itemElement.find(".dx-item-url").get(0);
        if (itemData.url && link) {
            link.click()
        }
    }
    _updateSubmenuVisibilityOnClick(actionArgs) {
        this._updateSelectedItemOnClick(actionArgs);
        if ("onClick" === this._getShowSubmenuMode()) {
            this._addExpandedClass(actionArgs.args[0].itemElement)
        }
    }
    _updateSelectedItemOnClick(actionArgs) {
        const args = actionArgs.args ? actionArgs.args[0] : actionArgs;
        if (!this._isItemSelectAllowed(args.itemData)) {
            return
        }
        const selectedItemKey = this._dataAdapter.getSelectedNodesKeys();
        const selectedNode = selectedItemKey.length && this._dataAdapter.getNodeByKey(selectedItemKey[0]);
        if (selectedNode) {
            this._toggleItemSelection(selectedNode, false)
        }
        if (!selectedNode || selectedNode.internalFields.item !== args.itemData) {
            this.selectItem(args.itemData)
        } else {
            this._fireSelectionChangeEvent(null, this.option("selectedItem"));
            this._setOptionWithoutOptionChange("selectedItem", null)
        }
    }
    _isItemSelectAllowed(item) {
        const isSelectByClickEnabled = this._isSelectionEnabled() && this.option("selectByClick");
        return !this._isContainerEmpty() && isSelectByClickEnabled && this._isItemSelectable(item) && !this._itemsGetter(item)
    }
    _isContainerEmpty() {
        return this._itemContainer().is(":empty")
    }
    _syncSelectionOptions() {
        return (0, _common.asyncNoop)()
    }
    _optionChanged(args) {
        switch (args.name) {
            case "showSubmenuMode":
                break;
            case "selectedItem": {
                const node = this._dataAdapter.getNodeByItem(args.value);
                const selectedKey = this._dataAdapter.getSelectedNodesKeys()[0];
                if (node && node.internalFields.key !== selectedKey) {
                    if (false === node.selectable) {
                        break
                    }
                    if (selectedKey) {
                        this._toggleItemSelection(this._dataAdapter.getNodeByKey(selectedKey), false)
                    }
                    this._toggleItemSelection(node, true);
                    this._updateSelectedItems()
                }
                break
            }
            case "cssClass":
            case "position":
            case "selectByClick":
            case "animation":
            case "useInkRipple":
                this._invalidate();
                break;
            default:
                super._optionChanged(args)
        }
    }
    _toggleItemSelection(node, value) {
        const itemElement = this._getElementByItem(node.internalFields.item);
        itemElement && (0, _renderer.default)(itemElement).toggleClass(DX_MENU_SELECTED_ITEM_CLASS);
        this._dataAdapter.toggleSelection(node.internalFields.key, value)
    }
    _getElementByItem(itemData) {
        let result;
        (0, _iterator.each)(this._itemElements(), ((_, itemElement) => {
            if ((0, _renderer.default)(itemElement).data(this._itemDataKey()) !== itemData) {
                return true
            }
            result = itemElement;
            return false
        }));
        return result
    }
    _updateSelectedItems(oldSelection, newSelection) {
        if (oldSelection || newSelection) {
            this._fireSelectionChangeEvent(newSelection, oldSelection)
        }
    }
    _fireSelectionChangeEvent(addedSelection, removedSelection) {
        this._createActionByOption("onSelectionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })({
            addedItems: [addedSelection],
            removedItems: [removedSelection]
        })
    }
    selectItem(itemElement) {
        const itemData = itemElement.nodeType ? this._getItemData(itemElement) : itemElement;
        const selectedKey = this._dataAdapter.getSelectedNodesKeys()[0];
        const selectedItem = this.option("selectedItem");
        const node = this._dataAdapter.getNodeByItem(itemData);
        if (node.internalFields.key !== selectedKey) {
            if (selectedKey) {
                this._toggleItemSelection(this._dataAdapter.getNodeByKey(selectedKey), false)
            }
            this._toggleItemSelection(node, true);
            this._updateSelectedItems(selectedItem, itemData);
            this._setOptionWithoutOptionChange("selectedItem", itemData)
        }
    }
    unselectItem(itemElement) {
        const itemData = itemElement.nodeType ? this._getItemData(itemElement) : itemElement;
        const node = this._dataAdapter.getNodeByItem(itemData);
        const selectedItem = this.option("selectedItem");
        if (node.internalFields.selected) {
            this._toggleItemSelection(node, false);
            this._updateSelectedItems(selectedItem, null);
            this._setOptionWithoutOptionChange("selectedItem", null)
        }
    }
}
MenuBase.ItemClass = _item.default;
var _default = exports.default = MenuBase;
module.exports = exports.default;
module.exports.default = exports.default;
