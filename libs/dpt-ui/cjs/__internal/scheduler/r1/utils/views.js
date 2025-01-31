/**
 * DevExtreme (cjs/__internal/scheduler/r1/utils/views.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentView = void 0;
var _type = require("../../../../core/utils/type");
var _const = require("../const");
const getCurrentView = (currentView, views) => {
    let currentViewProps = views.find((view => {
        const names = (0, _type.isObject)(view) ? [view.name, view.type] : [view];
        if (names.includes(currentView)) {
            return true
        }
        return false
    }));
    if (void 0 === currentViewProps) {
        if (_const.VIEW_TYPES.includes(currentView)) {
            currentViewProps = currentView
        } else {
            [currentViewProps] = views
        }
    }
    return currentViewProps
};
exports.getCurrentView = getCurrentView;
