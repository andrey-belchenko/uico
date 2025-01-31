/**
 * DevExtreme (cjs/ui/toolbar/strategy/toolbar.multiline.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.MultiLineStrategy = void 0;
var _size = require("../../../core/utils/size");
const TOOLBAR_LABEL_CLASS = "dx-toolbar-label";
class MultiLineStrategy {
    constructor(toolbar) {
        this._toolbar = toolbar
    }
    _initMarkup() {}
    _updateMenuVisibility() {}
    _renderMenuItems() {}
    _renderItem() {}
    _getMenuItems() {}
    _getToolbarItems() {
        return this._toolbar.option("items") ?? []
    }
    _getItemsWidth() {
        return this._toolbar._getSummaryItemsSize("width", this._toolbar.itemElements(), true)
    }
    _arrangeItems() {
        const $label = this._toolbar._$toolbarItemsContainer.find(".dx-toolbar-label").eq(0);
        if (!$label.length) {
            return
        }
        const elementWidth = (0, _size.getWidth)(this._toolbar.$element());
        const labelPaddings = (0, _size.getOuterWidth)($label) - (0, _size.getWidth)($label);
        $label.css("maxWidth", elementWidth - labelPaddings)
    }
    _hideOverflowItems() {}
    _dimensionChanged() {}
    _itemOptionChanged() {}
    _optionChanged() {}
}
exports.MultiLineStrategy = MultiLineStrategy;
