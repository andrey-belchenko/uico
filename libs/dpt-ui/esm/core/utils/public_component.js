/**
 * DevExtreme (esm/core/utils/public_component.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    data as elementData
} from "../../core/element_data";
import eventsEngine from "../../events/core/events_engine";
import {
    isDefined
} from "./type";
import {
    removeEvent
} from "../../events/remove";
const COMPONENT_NAMES_DATA_KEY = "dxComponents";
const ANONYMOUS_COMPONENT_DATA_KEY = "dxPrivateComponent";
const componentNames = new WeakMap;
let nextAnonymousComponent = 0;
const getName = function(componentClass, newName) {
    if (isDefined(newName)) {
        componentNames.set(componentClass, newName);
        return
    }
    if (!componentNames.has(componentClass)) {
        const generatedName = "dxPrivateComponent" + nextAnonymousComponent++;
        componentNames.set(componentClass, generatedName);
        return generatedName
    }
    return componentNames.get(componentClass)
};
export function attachInstanceToElement($element, componentInstance, disposeFn) {
    const data = elementData($element.get(0));
    const name = getName(componentInstance.constructor);
    data[name] = componentInstance;
    if (disposeFn) {
        eventsEngine.one($element, removeEvent, (function() {
            disposeFn.call(componentInstance)
        }))
    }
    if (!data.dxComponents) {
        data.dxComponents = []
    }
    data.dxComponents.push(name)
}
export function getInstanceByElement($element, componentClass) {
    const name = getName(componentClass);
    return elementData($element.get(0), name)
}
export {
    getName as name
};
