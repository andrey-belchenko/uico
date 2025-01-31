/**
 * DevExtreme (esm/ui/toolbar/internal/ui.toolbar.menu.list.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import {
    each
} from "../../../core/utils/iterator";
import {
    ListBase
} from "../../list/ui.list.base";
const TOOLBAR_MENU_ACTION_CLASS = "dx-toolbar-menu-action";
const TOOLBAR_HIDDEN_BUTTON_CLASS = "dx-toolbar-hidden-button";
const TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS = "dx-toolbar-hidden-button-group";
const TOOLBAR_MENU_SECTION_CLASS = "dx-toolbar-menu-section";
const TOOLBAR_MENU_CUSTOM_CLASS = "dx-toolbar-menu-custom";
const TOOLBAR_MENU_LAST_SECTION_CLASS = "dx-toolbar-menu-last-section";
const SCROLLVIEW_CONTENT_CLASS = "dx-scrollview-content";
export default class ToolbarMenuList extends ListBase {
    _init() {
        super._init();
        this._activeStateUnit = ".dx-toolbar-menu-action:not(.dx-toolbar-hidden-button-group)"
    }
    _initMarkup() {
        this._renderSections();
        super._initMarkup();
        this._setMenuRole()
    }
    _getSections() {
        return this._itemContainer().children()
    }
    _itemElements() {
        return this._getSections().children(this._itemSelector())
    }
    _renderSections() {
        const $container = this._itemContainer();
        each(["before", "center", "after", "menu"], ((_, section) => {
            const sectionName = `_$${section}Section`;
            if (!this[sectionName]) {
                this[sectionName] = $("<div>").addClass("dx-toolbar-menu-section")
            }
            this[sectionName].appendTo($container)
        }))
    }
    _renderItems() {
        super._renderItems.apply(this, arguments);
        this._updateSections()
    }
    _setMenuRole() {
        const $menuContainer = this.$element().find(".dx-scrollview-content");
        $menuContainer.attr("role", "menu")
    }
    _updateSections() {
        const $sections = this.$element().find(".dx-toolbar-menu-section");
        $sections.removeClass("dx-toolbar-menu-last-section");
        $sections.not(":empty").eq(-1).addClass("dx-toolbar-menu-last-section")
    }
    _renderItem(index, item, itemContainer, $after) {
        const location = item.location ?? "menu";
        const $container = this[`_$${location}Section`];
        const itemElement = super._renderItem(index, item, $container, $after);
        if (this._getItemTemplateName({
                itemData: item
            })) {
            itemElement.addClass("dx-toolbar-menu-custom")
        }
        if ("menu" === location || "dxButton" === item.widget || "dxButtonGroup" === item.widget || item.isAction) {
            itemElement.addClass("dx-toolbar-menu-action")
        }
        if ("dxButton" === item.widget) {
            itemElement.addClass("dx-toolbar-hidden-button")
        }
        if ("dxButtonGroup" === item.widget) {
            itemElement.addClass("dx-toolbar-hidden-button-group")
        }
        itemElement.addClass(item.cssClass);
        return itemElement
    }
    _getItemTemplateName(args) {
        const template = super._getItemTemplateName(args);
        const data = args.itemData;
        const menuTemplate = data && data.menuItemTemplate;
        return menuTemplate || template
    }
    _dataSourceOptions() {
        return {
            paginate: false
        }
    }
    _itemClickHandler(e, args, config) {
        if ($(e.target).closest(".dx-toolbar-menu-action").length) {
            super._itemClickHandler(e, args, config)
        }
    }
    _clean() {
        this._getSections().empty();
        super._clean()
    }
}
