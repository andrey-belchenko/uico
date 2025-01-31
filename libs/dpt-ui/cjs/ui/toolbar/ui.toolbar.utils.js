/**
 * DevExtreme (cjs/ui/toolbar/ui.toolbar.utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.toggleItemFocusableElementTabIndex = toggleItemFocusableElementTabIndex;
var _renderer = _interopRequireDefault(require("../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const BUTTON_GROUP_CLASS = "dx-buttongroup";
const TOOLBAR_ITEMS = ["dxAutocomplete", "dxButton", "dxCheckBox", "dxDateBox", "dxMenu", "dxSelectBox", "dxTabs", "dxTextBox", "dxButtonGroup", "dxDropDownButton"];
const getItemInstance = function($element) {
    const itemData = $element.data && $element.data();
    const dxComponents = itemData && itemData.dxComponents;
    const widgetName = dxComponents && dxComponents[0];
    return widgetName && itemData[widgetName]
};

function toggleItemFocusableElementTabIndex(context, item) {
    var _itemData$options;
    if (!context) {
        return
    }
    const $item = context._findItemElementByItem(item);
    if (!$item.length) {
        return
    }
    const itemData = context._getItemData($item);
    const isItemNotFocusable = !!(null !== (_itemData$options = itemData.options) && void 0 !== _itemData$options && _itemData$options.disabled || itemData.disabled || context.option("disabled"));
    const {
        widget: widget
    } = itemData;
    if (widget && -1 !== TOOLBAR_ITEMS.indexOf(widget)) {
        const $widget = $item.find(widget.toLowerCase().replace("dx", ".dx-"));
        if ($widget.length) {
            var _itemInstance$_focusT, _itemData$options2;
            const itemInstance = getItemInstance($widget);
            if (!itemInstance) {
                return
            }
            let $focusTarget = null === (_itemInstance$_focusT = itemInstance._focusTarget) || void 0 === _itemInstance$_focusT ? void 0 : _itemInstance$_focusT.call(itemInstance);
            if ("dxDropDownButton" === widget) {
                $focusTarget = $focusTarget && $focusTarget.find(`.${BUTTON_GROUP_CLASS}`)
            } else {
                $focusTarget = $focusTarget ?? (0, _renderer.default)(itemInstance.element())
            }
            const tabIndex = null === (_itemData$options2 = itemData.options) || void 0 === _itemData$options2 ? void 0 : _itemData$options2.tabIndex;
            if (isItemNotFocusable) {
                $focusTarget.attr("tabIndex", -1)
            } else {
                $focusTarget.attr("tabIndex", tabIndex ?? 0)
            }
        }
    }
}
