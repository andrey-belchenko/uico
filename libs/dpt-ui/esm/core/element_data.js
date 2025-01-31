/**
 * DevExtreme (esm/core/element_data.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "./dom_adapter";
import eventsEngine from "../events/core/events_engine";
import MemorizedCallbacks from "./memorized_callbacks";
const dataMap = new WeakMap;
let strategy;
export const strategyChanging = new MemorizedCallbacks;
let beforeCleanDataFunc = function() {};
let afterCleanDataFunc = function() {};
export const setDataStrategy = function(value) {
    strategyChanging.fire(value);
    strategy = value;
    const cleanData = strategy.cleanData;
    strategy.cleanData = function(nodes) {
        beforeCleanDataFunc(nodes);
        const result = cleanData.call(this, nodes);
        afterCleanDataFunc(nodes);
        return result
    }
};
setDataStrategy({
    data: function() {
        const element = arguments[0];
        const key = arguments[1];
        const value = arguments[2];
        if (!element) {
            return
        }
        let elementData = dataMap.get(element);
        if (!elementData) {
            elementData = {};
            dataMap.set(element, elementData)
        }
        if (void 0 === key) {
            return elementData
        }
        if (2 === arguments.length) {
            return elementData[key]
        }
        elementData[key] = value;
        return value
    },
    removeData: function(element, key) {
        if (!element) {
            return
        }
        if (void 0 === key) {
            dataMap.delete(element)
        } else {
            const elementData = dataMap.get(element);
            if (elementData) {
                delete elementData[key]
            }
        }
    },
    cleanData: function(elements) {
        for (let i = 0; i < elements.length; i++) {
            eventsEngine.off(elements[i]);
            dataMap.delete(elements[i])
        }
    }
});
export function getDataStrategy() {
    return strategy
}
export function data() {
    return strategy.data.apply(this, arguments)
}
export function beforeCleanData(callback) {
    beforeCleanDataFunc = callback
}
export function afterCleanData(callback) {
    afterCleanDataFunc = callback
}
export function cleanData(nodes) {
    return strategy.cleanData.call(this, nodes)
}
export function removeData(element, key) {
    return strategy.removeData.call(this, element, key)
}
export function cleanDataRecursive(element, cleanSelf) {
    if (!domAdapter.isElementNode(element)) {
        return
    }
    const childElements = element.getElementsByTagName("*");
    strategy.cleanData(childElements);
    if (cleanSelf) {
        strategy.cleanData([element])
    }
}
