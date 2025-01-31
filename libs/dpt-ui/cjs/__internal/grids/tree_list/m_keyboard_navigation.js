/**
 * DevExtreme (cjs/__internal/grids/tree_list/m_keyboard_navigation.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _extend = require("../../../core/utils/extend");
var _m_keyboard_navigation = require("../../grids/grid_core/keyboard_navigation/m_keyboard_navigation");
var _scrollable_a11y = require("../../grids/grid_core/keyboard_navigation/scrollable_a11y");
var _m_core = _interopRequireDefault(require("./m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const keyboardNavigation = Base => class extends((0, _scrollable_a11y.keyboardNavigationScrollableA11yExtender)(Base)) {
    _leftRightKeysHandler(eventArgs, _isEditing) {
        const rowIndex = this.getVisibleRowIndex();
        const dataController = this._dataController;
        if (eventArgs.ctrl) {
            const directionCode = this._getDirectionCodeByKey(eventArgs.keyName);
            const key = dataController.getKeyByRowIndex(rowIndex);
            if ("nextInRow" === directionCode) {
                dataController.expandRow(key)
            } else {
                dataController.collapseRow(key)
            }
        } else {
            return super._leftRightKeysHandler.apply(this, arguments)
        }
    }
};
_m_core.default.registerModule("keyboardNavigation", (0, _extend.extend)(true, {}, _m_keyboard_navigation.keyboardNavigationModule, {
    extenders: {
        controllers: {
            keyboardNavigation: keyboardNavigation
        }
    }
}));
