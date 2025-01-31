/**
 * DevExtreme (esm/events/visibility_change.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../core/renderer";
import eventsEngine from "./core/events_engine";
const triggerVisibilityChangeEvent = function(eventName) {
    return function(element) {
        const $element = $(element || "body");
        const changeHandlers = $element.filter(".dx-visibility-change-handler").add($element.find(".dx-visibility-change-handler"));
        for (let i = 0; i < changeHandlers.length; i++) {
            eventsEngine.triggerHandler(changeHandlers[i], eventName)
        }
    }
};
export const triggerShownEvent = triggerVisibilityChangeEvent("dxshown");
export const triggerHidingEvent = triggerVisibilityChangeEvent("dxhiding");
export const triggerResizeEvent = triggerVisibilityChangeEvent("dxresize");
