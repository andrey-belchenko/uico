/**
 * DevExtreme (esm/viz/tree_map/colorizing.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    normalizeEnum as _normalizeEnum
} from "../core/utils";
import {
    noop as _noop
} from "../../core/utils/common";
const colorizers = {};
let defaultColorizerName;

function wrapLeafColorGetter(getter) {
    return function(node) {
        return !node.isNode() ? getter(node) : void 0
    }
}

function wrapGroupColorGetter(getter) {
    return function(node) {
        const parent = !node.isNode() && node.parent;
        return parent ? parent._groupColor = parent._groupColor || getter(parent) : void 0
    }
}
export function getColorizer(options, themeManager, root) {
    const type = _normalizeEnum(options.type || defaultColorizerName);
    const colorizer = colorizers[type] && colorizers[type](options, themeManager, root);
    return colorizer ? (options.colorizeGroups ? wrapGroupColorGetter : wrapLeafColorGetter)(colorizer) : _noop
}
export function addColorizer(name, colorizer) {
    colorizers[name] = colorizer
}
export function setDefaultColorizer(name) {
    defaultColorizerName = name
}

function getValueAsColorCode(node) {
    return node.value
}

function createColorCode(colorCodeField) {
    return function(node) {
        return Number(node.data[colorCodeField])
    }
}
export function createColorCodeGetter(options) {
    return options.colorCodeField ? createColorCode(options.colorCodeField) : getValueAsColorCode
}
