/**
 * DevExtreme (cjs/core/element.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getPublicElement = getPublicElement;
exports.setPublicElementWrapper = setPublicElementWrapper;
let strategy = function(element) {
    return element && element.get(0)
};

function getPublicElement(element) {
    return strategy(element)
}

function setPublicElementWrapper(newStrategy) {
    strategy = newStrategy
}
