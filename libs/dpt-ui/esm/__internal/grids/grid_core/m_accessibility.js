/**
 * DevExtreme (esm/__internal/grids/grid_core/m_accessibility.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import * as accessibility from "../../../ui/shared/accessibility";
export const registerKeyboardAction = function(viewName, instance, $element, selector, action) {
    const keyboardController = instance.getController("keyboardNavigation");
    if (instance.option("useLegacyKeyboardNavigation") || keyboardController && !keyboardController.isKeyboardEnabled()) {
        return
    }
    instance.createAction("onKeyDown");
    accessibility.registerKeyboardAction(viewName, instance, $element, selector, action, (args => {
        instance.executeAction("onKeyDown", args)
    }))
};
