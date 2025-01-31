/**
 * DevExtreme (esm/core/resize_observer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    noop
} from "./utils/common";
import {
    getWindow,
    hasWindow
} from "./utils/window";
const window = getWindow();
const ResizeObserverMock = {
    observe: noop,
    unobserve: noop,
    disconnect: noop
};
class ResizeObserverSingleton {
    constructor() {
        if (!hasWindow() || !window.ResizeObserver) {
            return ResizeObserverMock
        }
        this._callbacksMap = new Map;
        this._observer = new window.ResizeObserver((entries => {
            entries.forEach((entry => {
                var _this$_callbacksMap$g;
                null === (_this$_callbacksMap$g = this._callbacksMap.get(entry.target)) || void 0 === _this$_callbacksMap$g || _this$_callbacksMap$g(entry)
            }))
        }))
    }
    observe(element, callback) {
        this._callbacksMap.set(element, callback);
        this._observer.observe(element)
    }
    unobserve(element) {
        this._callbacksMap.delete(element);
        this._observer.unobserve(element)
    }
    disconnect() {
        this._callbacksMap.clear();
        this._observer.disconnect()
    }
}
const resizeObserverSingleton = new ResizeObserverSingleton;
export default resizeObserverSingleton;
