/**
 * DevExtreme (esm/__internal/grids/tree_list/m_keyboard_navigation.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import {
    keyboardNavigationModule
} from "../../grids/grid_core/keyboard_navigation/m_keyboard_navigation";
import {
    keyboardNavigationScrollableA11yExtender
} from "../../grids/grid_core/keyboard_navigation/scrollable_a11y";
import core from "./m_core";
const keyboardNavigation = Base => class extends(keyboardNavigationScrollableA11yExtender(Base)) {
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
core.registerModule("keyboardNavigation", extend(true, {}, keyboardNavigationModule, {
    extenders: {
        controllers: {
            keyboardNavigation: keyboardNavigation
        }
    }
}));
