/**
 * DevExtreme (esm/events/remove.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../core/renderer";
import {
    beforeCleanData
} from "../core/element_data";
import eventsEngine from "./core/events_engine";
import registerEvent from "./core/event_registrator";
export const removeEvent = "dxremove";
const eventPropName = "dxRemoveEvent";
beforeCleanData((function(elements) {
    elements = [].slice.call(elements);
    for (let i = 0; i < elements.length; i++) {
        const $element = $(elements[i]);
        if ($element.prop(eventPropName)) {
            $element[0][eventPropName] = null;
            eventsEngine.triggerHandler($element, "dxremove")
        }
    }
}));
registerEvent("dxremove", {
    noBubble: true,
    setup: function(element) {
        $(element).prop(eventPropName, true)
    }
});
