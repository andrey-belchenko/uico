/**
 * DevExtreme (esm/ui/toolbar/strategy/toolbar.singleline.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWidth
} from "../../../core/utils/size";
import $ from "../../../core/renderer";
import {
    each
} from "../../../core/utils/iterator";
import {
    grep,
    deferRender
} from "../../../core/utils/common";
import {
    extend
} from "../../../core/utils/extend";
import DropDownMenu from "../internal/ui.toolbar.menu";
import {
    compileGetter
} from "../../../core/utils/data";
const INVISIBLE_STATE_CLASS = "dx-state-invisible";
const TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS = "dx-toolbar-menu-container";
const TOOLBAR_BUTTON_CLASS = "dx-toolbar-button";
const TOOLBAR_AUTO_HIDE_ITEM_CLASS = "dx-toolbar-item-auto-hide";
const TOOLBAR_HIDDEN_ITEM = "dx-toolbar-item-invisible";
export class SingleLineStrategy {
    constructor(toolbar) {
        this._toolbar = toolbar
    }
    _initMarkup() {
        deferRender((() => {
            this._renderOverflowMenu();
            this._renderMenuItems()
        }))
    }
    _renderOverflowMenu() {
        if (!this._hasVisibleMenuItems()) {
            return
        }
        this._renderMenuButtonContainer();
        const $menu = $("<div>").appendTo(this._overflowMenuContainer());
        const itemClickAction = this._toolbar._createActionByOption("onItemClick");
        const menuItemTemplate = this._toolbar._getTemplateByOption("menuItemTemplate");
        this._menu = this._toolbar._createComponent($menu, DropDownMenu, {
            disabled: this._toolbar.option("disabled"),
            itemTemplate: () => menuItemTemplate,
            onItemClick: e => {
                itemClickAction(e)
            },
            container: this._toolbar.option("menuContainer"),
            onOptionChanged: _ref => {
                let {
                    name: name,
                    value: value
                } = _ref;
                if ("opened" === name) {
                    this._toolbar.option("overflowMenuVisible", value)
                }
                if ("items" === name) {
                    this._updateMenuVisibility(value)
                }
            }
        })
    }
    renderMenuItems() {
        if (!this._menu) {
            this._renderOverflowMenu()
        }
        this._menu && this._menu.option("items", this._getMenuItems());
        if (this._menu && !this._menu.option("items").length) {
            this._menu.option("opened", false)
        }
    }
    _renderMenuButtonContainer() {
        this._$overflowMenuContainer = $("<div>").appendTo(this._toolbar._$afterSection).addClass("dx-toolbar-button").addClass("dx-toolbar-menu-container")
    }
    _overflowMenuContainer() {
        return this._$overflowMenuContainer
    }
    _updateMenuVisibility(menuItems) {
        const items = menuItems ?? this._getMenuItems();
        const isMenuVisible = items.length && this._hasVisibleMenuItems(items);
        this._toggleMenuVisibility(isMenuVisible)
    }
    _toggleMenuVisibility(value) {
        if (!this._overflowMenuContainer()) {
            return
        }
        this._overflowMenuContainer().toggleClass("dx-state-invisible", !value)
    }
    _renderMenuItems() {
        deferRender((() => {
            this.renderMenuItems()
        }))
    }
    _dimensionChanged() {
        this.renderMenuItems()
    }
    _getToolbarItems() {
        return grep(this._toolbar.option("items") ?? [], (item => !this._toolbar._isMenuItem(item)))
    }
    _getHiddenItems() {
        return this._toolbar._itemContainer().children(`.dx-toolbar-item-auto-hide.${TOOLBAR_HIDDEN_ITEM}`).not(".dx-state-invisible")
    }
    _getMenuItems() {
        const menuItems = grep(this._toolbar.option("items") ?? [], (item => this._toolbar._isMenuItem(item)));
        const $hiddenItems = this._getHiddenItems();
        this._restoreItems = this._restoreItems ?? [];
        const overflowItems = [].slice.call($hiddenItems).map((hiddenItem => {
            const itemData = this._toolbar._getItemData(hiddenItem);
            const $itemContainer = $(hiddenItem);
            const $itemMarkup = $itemContainer.children();
            return extend({
                menuItemTemplate: () => {
                    this._restoreItems.push({
                        container: $itemContainer,
                        item: $itemMarkup
                    });
                    const $container = $("<div>").addClass("dx-toolbar-item-auto-hide");
                    return $container.append($itemMarkup)
                }
            }, itemData)
        }));
        return [...overflowItems, ...menuItems]
    }
    _hasVisibleMenuItems(items) {
        const menuItems = items ?? this._toolbar.option("items");
        let result = false;
        const optionGetter = compileGetter("visible");
        const overflowGetter = compileGetter("locateInMenu");
        each(menuItems, (function(index, item) {
            const itemVisible = optionGetter(item, {
                functionsAsIs: true
            });
            const itemOverflow = overflowGetter(item, {
                functionsAsIs: true
            });
            if (false !== itemVisible && ("auto" === itemOverflow || "always" === itemOverflow) || "menu" === item.location) {
                result = true
            }
        }));
        return result
    }
    _arrangeItems() {
        this._toolbar._$centerSection.css({
            margin: "0 auto",
            float: "none"
        });
        each(this._restoreItems ?? [], (function(_, obj) {
            $(obj.container).append(obj.item)
        }));
        this._restoreItems = [];
        const elementWidth = getWidth(this._toolbar.$element());
        this._hideOverflowItems(elementWidth);
        return elementWidth
    }
    _hideOverflowItems(elementWidth) {
        const overflowItems = this._toolbar.$element().find(".dx-toolbar-item-auto-hide");
        if (!overflowItems.length) {
            return
        }
        elementWidth = elementWidth ?? getWidth(this._toolbar.$element());
        $(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);
        let itemsWidth = this._getItemsWidth();
        while (overflowItems.length && elementWidth < itemsWidth) {
            const $item = overflowItems.eq(-1);
            $item.addClass(TOOLBAR_HIDDEN_ITEM);
            itemsWidth = this._getItemsWidth();
            overflowItems.splice(-1, 1)
        }
    }
    _getItemsWidth() {
        return this._toolbar._getSummaryItemsSize("width", [this._toolbar._$beforeSection, this._toolbar._$centerSection, this._toolbar._$afterSection])
    }
    _itemOptionChanged(item, property, value) {
        if ("disabled" === property || "options.disabled" === property) {
            if (this._toolbar._isMenuItem(item)) {
                var _this$_menu;
                null === (_this$_menu = this._menu) || void 0 === _this$_menu || _this$_menu._itemOptionChanged(item, property, value);
                return
            }
        }
        this.renderMenuItems()
    }
    _renderItem(item, itemElement) {
        if ("auto" === item.locateInMenu) {
            itemElement.addClass("dx-toolbar-item-auto-hide")
        }
    }
    _optionChanged(name, value) {
        var _this$_menu2, _this$_menu3, _this$_menu4, _this$_menu5, _this$_menu6;
        switch (name) {
            case "disabled":
                null === (_this$_menu2 = this._menu) || void 0 === _this$_menu2 || _this$_menu2.option(name, value);
                break;
            case "overflowMenuVisible":
                null === (_this$_menu3 = this._menu) || void 0 === _this$_menu3 || _this$_menu3.option("opened", value);
                break;
            case "onItemClick":
                null === (_this$_menu4 = this._menu) || void 0 === _this$_menu4 || _this$_menu4.option(name, value);
                break;
            case "menuContainer":
                null === (_this$_menu5 = this._menu) || void 0 === _this$_menu5 || _this$_menu5.option("container", value);
                break;
            case "menuItemTemplate":
                null === (_this$_menu6 = this._menu) || void 0 === _this$_menu6 || _this$_menu6.option("itemTemplate", value)
        }
    }
}
