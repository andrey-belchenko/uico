/**
 * DevExtreme (esm/core/utils/style.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    camelize
} from "./inflector";
import callOnce from "./call_once";
import {
    isNumeric,
    isString
} from "./type";
import domAdapter from "../dom_adapter";
const jsPrefixes = ["", "Webkit", "Moz", "O", "Ms"];
const cssPrefixes = {
    "": "",
    Webkit: "-webkit-",
    Moz: "-moz-",
    O: "-o-",
    ms: "-ms-"
};
const getStyles = callOnce((function() {
    return domAdapter.createElement("dx").style
}));
const forEachPrefixes = function(prop, callBack) {
    prop = camelize(prop, true);
    let result;
    for (let i = 0, cssPrefixesCount = jsPrefixes.length; i < cssPrefixesCount; i++) {
        const jsPrefix = jsPrefixes[i];
        const prefixedProp = jsPrefix + prop;
        const lowerPrefixedProp = camelize(prefixedProp);
        result = callBack(lowerPrefixedProp, jsPrefix);
        if (void 0 === result) {
            result = callBack(prefixedProp, jsPrefix)
        }
        if (void 0 !== result) {
            break
        }
    }
    return result || ""
};
const styleProp = function(name) {
    if (name in getStyles()) {
        return name
    }
    const originalName = name;
    name = name.charAt(0).toUpperCase() + name.substr(1);
    for (let i = 1; i < jsPrefixes.length; i++) {
        const prefixedProp = jsPrefixes[i].toLowerCase() + name;
        if (prefixedProp in getStyles()) {
            return prefixedProp
        }
    }
    return originalName
};
const stylePropPrefix = function(prop) {
    return forEachPrefixes(prop, (function(specific, jsPrefix) {
        if (specific in getStyles()) {
            return cssPrefixes[jsPrefix]
        }
    }))
};
const pxExceptions = ["fillOpacity", "columnCount", "flexGrow", "flexShrink", "fontWeight", "lineHeight", "opacity", "zIndex", "zoom"];
const parsePixelValue = function(value) {
    if (isNumeric(value)) {
        return value
    } else if (isString(value)) {
        return Number(value.replace("px", ""))
    }
    return NaN
};
const normalizeStyleProp = function(prop, value) {
    if (isNumeric(value) && -1 === pxExceptions.indexOf(prop)) {
        value += "px"
    }
    return value
};
const setDimensionProperty = function(elements, propertyName, value) {
    if (elements) {
        value = isNumeric(value) ? value += "px" : value;
        for (let i = 0; i < elements.length; ++i) {
            elements[i].style[propertyName] = value
        }
    }
};
const setWidth = function(elements, value) {
    setDimensionProperty(elements, "width", value)
};
const setHeight = function(elements, value) {
    setDimensionProperty(elements, "height", value)
};
const setStyle = function(element, styleString) {
    let resetStyle = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : true;
    if (resetStyle) {
        const styleList = [].slice.call(element.style);
        styleList.forEach((propertyName => {
            element.style.removeProperty(propertyName)
        }))
    }
    styleString.split(";").forEach((style => {
        const parts = style.split(":").map((stylePart => stylePart.trim()));
        if (2 === parts.length) {
            const [property, value] = parts;
            element.style[property] = value
        }
    }))
};
export {
    styleProp,
    setStyle,
    stylePropPrefix,
    normalizeStyleProp,
    parsePixelValue,
    setWidth,
    setHeight
};
