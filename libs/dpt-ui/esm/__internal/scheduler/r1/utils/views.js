/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/views.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isObject
} from "../../../../core/utils/type";
import {
    VIEW_TYPES
} from "../const";
export const getCurrentView = (currentView, views) => {
    let currentViewProps = views.find((view => {
        const names = isObject(view) ? [view.name, view.type] : [view];
        if (names.includes(currentView)) {
            return true
        }
        return false
    }));
    if (void 0 === currentViewProps) {
        if (VIEW_TYPES.includes(currentView)) {
            currentViewProps = currentView
        } else {
            [currentViewProps] = views
        }
    }
    return currentViewProps
};
