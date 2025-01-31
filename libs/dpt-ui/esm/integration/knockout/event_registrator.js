/**
 * DevExtreme (esm/integration/knockout/event_registrator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import ko from "knockout";
import {
    isPlainObject
} from "../../core/utils/type";
import eventRegistratorCallbacks from "../../events/core/event_registrator_callbacks";
import {
    addNamespace
} from "../../events/utils/index";
if (ko) {
    eventRegistratorCallbacks.add((function(name) {
        const koBindingEventName = addNamespace(name, name + "Binding");
        ko.bindingHandlers[name] = {
            update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
                const $element = $(element);
                const unwrappedValue = ko.utils.unwrapObservable(valueAccessor());
                const eventSource = unwrappedValue.execute ? unwrappedValue.execute : unwrappedValue;
                eventsEngine.off($element, koBindingEventName);
                eventsEngine.on($element, koBindingEventName, isPlainObject(unwrappedValue) ? unwrappedValue : {}, (function(e) {
                    eventSource.call(viewModel, viewModel, e)
                }))
            }
        }
    }))
}
