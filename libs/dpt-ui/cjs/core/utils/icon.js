/**
 * DevExtreme (cjs/core/utils/icon.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getImageSourceType = exports.getImageContainer = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const ICON_CLASS = "dx-icon";
const SVG_ICON_CLASS = "dx-svg-icon";
const getImageSourceType = source => {
    if (!source || "string" !== typeof source) {
        return false
    }
    if (/^\s*<svg[^>]*>(.|\r?\n)*?<\/svg>\s*$/i.test(source)) {
        return "svg"
    }
    if (/data:.*base64|\.|[^<\s]\/{1,1}/.test(source)) {
        return "image"
    }
    if (/^[\w-_]+$/.test(source)) {
        return "dxIcon"
    }
    if (/^\s?([\w-_:]\s?)+$/.test(source)) {
        return "fontIcon"
    }
    return false
};
exports.getImageSourceType = getImageSourceType;
const getImageContainer = source => {
    switch (getImageSourceType(source)) {
        case "image":
            return (0, _renderer.default)("<img>").attr("src", source).addClass("dx-icon");
        case "fontIcon":
            return (0, _renderer.default)("<i>").addClass(`dx-icon ${source}`);
        case "dxIcon":
            return (0, _renderer.default)("<i>").addClass(`dx-icon dx-icon-${source}`);
        case "svg":
            return (0, _renderer.default)("<i>").addClass("dx-icon dx-svg-icon").append(source);
        default:
            return null
    }
};
exports.getImageContainer = getImageContainer;
