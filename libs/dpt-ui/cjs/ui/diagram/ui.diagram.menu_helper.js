/**
 * DevExtreme (cjs/ui/diagram/ui.diagram.menu_helper.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _icon = require("../../core/utils/icon");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DIAGRAM_CONTEXT_MENU_CLASS = "dx-diagram-contextmenu";
const DiagramMenuHelper = {
    getContextMenuItemTemplate(contextMenu, itemData, itemIndex, itemElement) {
        const $itemElement = (0, _renderer.default)(itemElement);
        $itemElement.empty();
        const itemKey = void 0 !== itemData.rootCommand ? itemData.rootCommand : -1;
        if (itemData.icon && !itemData.checked) {
            const $iconElement = (0, _icon.getImageContainer)(itemData.icon);
            $itemElement.append($iconElement)
        } else if (contextMenu._menuHasCheckedItems && true === contextMenu._menuHasCheckedItems[itemKey]) {
            const $checkElement = (0, _icon.getImageContainer)("check");
            $checkElement.css("visibility", !itemData.checked ? "hidden" : "visible");
            $itemElement.append($checkElement)
        }
        $itemElement.append('<span class="dx-menu-item-text">' + itemData.text + "</span>");
        if (Array.isArray(itemData.items) && itemData.items.length > 0) {
            $itemElement.append('<span class="dx-menu-item-popout-container"><div class="dx-menu-item-popout"></div></span>')
        }
    },
    getContextMenuCssClass: () => "dx-diagram-contextmenu",
    onContextMenuItemClick(widget, itemData, actionHandler) {
        if ((void 0 !== itemData.command || void 0 !== itemData.name) && (!Array.isArray(itemData.items) || !itemData.items.length)) {
            const parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData);
            actionHandler.call(this, itemData.command, itemData.name, parameter)
        } else if (void 0 !== itemData.rootCommand && void 0 !== itemData.value) {
            const parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData, itemData.value);
            actionHandler.call(this, itemData.rootCommand, void 0, parameter)
        }
    },
    getItemValue: item => "object" === typeof item.value ? JSON.stringify(item.value) : item.value,
    getItemOptionText(contextMenu, indexPath) {
        if (contextMenu) {
            indexPath = indexPath.slice();
            const parentItemOptionText = this._getParentItemOptionText(indexPath);
            if (contextMenu._originalItemsInfo && contextMenu._originalItemsInfo[parentItemOptionText]) {
                indexPath[indexPath.length - 1] += contextMenu._originalItemsInfo[parentItemOptionText].indexPathCorrection
            }
        }
        return this._getItemOptionTextCore(indexPath)
    },
    _getParentItemOptionText(indexPath) {
        const parentIndexPath = indexPath.slice(0, indexPath.length - 1);
        return this._getItemOptionTextCore(parentIndexPath)
    },
    _getItemOptionTextCore: indexPath => indexPath.reduce(((r, i) => r + `items[${i}].`), ""),
    getItemCommandParameter(widget, item, value) {
        if (item.getParameter) {
            return item.getParameter(widget)
        }
        return value
    },
    updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items) {
        if (!contextMenu._originalItemsInfo) {
            contextMenu._originalItemsInfo = {}
        }
        if (!contextMenu._originalItemsInfo[itemOptionText]) {
            contextMenu._originalItemsInfo[itemOptionText] = {
                items: contextMenu.option(itemOptionText + "items") || []
            }
        }
        items = items.map((item => ({
            value: this.getItemValue(item),
            text: item.text,
            checked: item.checked,
            widget: contextMenu,
            rootCommand: rootCommandKey
        })));
        const originalItems = contextMenu._originalItemsInfo[itemOptionText].items;
        contextMenu.option(itemOptionText + "items", items.concat(originalItems));
        if (contextMenu._originalItemsInfo[itemOptionText] && originalItems.length) {
            contextMenu._originalItemsInfo[itemOptionText].indexPathCorrection = items.length
        }
    },
    updateContextMenuItemVisible(contextMenu, itemOptionText, visible) {
        contextMenu.option(itemOptionText + "visible", visible)
    },
    updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value) {
        const items = contextMenu.option(itemOptionText + "items");
        if ("boolean" === typeof value && (!items || !items.length)) {
            this._setContextMenuHasCheckedItems(contextMenu, -1);
            contextMenu.option(itemOptionText + "checked", value)
        } else if (void 0 !== value) {
            this._setContextMenuHasCheckedItems(contextMenu, rootCommandKey);
            if (Array.isArray(items)) {
                items.forEach(((item, index) => {
                    item.checked = item.value === value
                }))
            }
        }
    },
    _setContextMenuHasCheckedItems(contextMenu, key) {
        if (!contextMenu._menuHasCheckedItems) {
            contextMenu._menuHasCheckedItems = {}
        }
        contextMenu._menuHasCheckedItems[key] = true
    }
};
var _default = exports.default = DiagramMenuHelper;
module.exports = exports.default;
module.exports.default = exports.default;
