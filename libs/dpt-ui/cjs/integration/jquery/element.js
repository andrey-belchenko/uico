/**
 * DevExtreme (cjs/integration/jquery/element.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _element = require("../../core/element");
var _use_jquery = _interopRequireDefault(require("./use_jquery"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const useJQuery = (0, _use_jquery.default)();
const getPublicElement = function($element) {
    return $element
};
if (useJQuery) {
    (0, _element.setPublicElementWrapper)(getPublicElement)
}
