/**
 * DevExtreme (esm/core/http_request.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWindow
} from "./utils/window";
const window = getWindow();
import injector from "./utils/dependency_injector";
const nativeXMLHttpRequest = {
    getXhr: function() {
        return new window.XMLHttpRequest
    }
};
export default injector(nativeXMLHttpRequest);
