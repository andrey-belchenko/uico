/**
 * DevExtreme (cjs/renovation/ui/scroll_view/utils/get_element_style.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getElementMargin = getElementMargin;
exports.getElementOverflowX = getElementOverflowX;
exports.getElementOverflowY = getElementOverflowY;
exports.getElementPadding = getElementPadding;
exports.getElementStyle = getElementStyle;
exports.getElementTransform = getElementTransform;
var _inflector = require("../../../../core/utils/inflector");
var _window = require("../../../../core/utils/window");
var _type_conversion = require("../../../utils/type_conversion");

function getElementStyle(el) {
    var _getWindow$getCompute, _getWindow;
    return el && (0, _window.hasWindow)() ? null === (_getWindow$getCompute = (_getWindow = (0, _window.getWindow)()).getComputedStyle) || void 0 === _getWindow$getCompute ? void 0 : _getWindow$getCompute.call(_getWindow, el) : null
}

function getElementMargin(element, side) {
    const style = getElementStyle(element);
    return style ? (0, _type_conversion.toNumber)(style[`margin${(0,_inflector.titleize)(side)}`]) : 0
}

function getElementPadding(element, side) {
    const style = getElementStyle(element);
    return style ? (0, _type_conversion.toNumber)(style[`padding${(0,_inflector.titleize)(side)}`]) : 0
}

function getElementOverflowX(element) {
    const style = getElementStyle(element);
    return style ? style.overflowX : "visible"
}

function getElementOverflowY(element) {
    const style = getElementStyle(element);
    return style ? style.overflowY : "visible"
}

function getElementTransform(element) {
    const style = getElementStyle(element);
    return style ? style.transform : ""
}
