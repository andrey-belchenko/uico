/**
 * DevExtreme (cjs/ui/form/components/empty_item.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.FIELD_EMPTY_ITEM_CLASS = void 0;
exports.renderEmptyItem = renderEmptyItem;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const FIELD_EMPTY_ITEM_CLASS = exports.FIELD_EMPTY_ITEM_CLASS = "dx-field-empty-item";

function renderEmptyItem(_ref) {
    let {
        $parent: $parent,
        rootElementCssClassList: rootElementCssClassList
    } = _ref;
    return (0, _renderer.default)("<div>").addClass(FIELD_EMPTY_ITEM_CLASS).html("&nbsp;").addClass(rootElementCssClassList.join(" ")).appendTo($parent)
}
