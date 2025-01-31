/**
 * DevExtreme (cjs/__internal/scheduler/utils/is_scheduler_component.js)
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
exports.isSchedulerComponent = isSchedulerComponent;
const schedulerComponentName = "dxScheduler";

function isSchedulerComponent(component) {
    return component.NAME === schedulerComponentName
}
