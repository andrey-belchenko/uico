/**
 * DevExtreme (esm/core/utils/window.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../dom_adapter";
let hasWindowValue = "undefined" !== typeof window;
const hasWindow = () => hasWindowValue;
let windowObject = hasWindow() ? window : void 0;
if (!windowObject) {
    windowObject = {};
    windowObject.window = windowObject
}
const getWindow = () => windowObject;
const setWindow = (newWindowObject, hasWindow) => {
    if (void 0 === hasWindow) {
        hasWindowValue = "undefined" !== typeof window && window === newWindowObject
    } else {
        hasWindowValue = hasWindow
    }
    windowObject = newWindowObject
};
const hasProperty = prop => hasWindow() && prop in windowObject;
const defaultScreenFactorFunc = width => {
    if (width < 768) {
        return "xs"
    } else if (width < 992) {
        return "sm"
    } else if (width < 1200) {
        return "md"
    } else {
        return "lg"
    }
};
const getCurrentScreenFactor = screenFactorCallback => {
    const screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;
    const windowWidth = domAdapter.getDocumentElement().clientWidth;
    return screenFactorFunc(windowWidth)
};
const getNavigator = () => hasWindow() ? windowObject.navigator : {
    userAgent: ""
};
export {
    hasWindow,
    getWindow,
    setWindow,
    hasProperty,
    defaultScreenFactorFunc,
    getCurrentScreenFactor,
    getNavigator
};
