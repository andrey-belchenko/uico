/**
 * DevExtreme (esm/core/utils/storage.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWindow
} from "../../core/utils/window";
const window = getWindow();
const getSessionStorage = function() {
    let sessionStorage;
    try {
        sessionStorage = window.sessionStorage
    } catch (e) {}
    return sessionStorage
};
export {
    getSessionStorage as sessionStorage
};
