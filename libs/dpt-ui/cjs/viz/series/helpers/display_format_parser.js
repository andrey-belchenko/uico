/**
 * DevExtreme (cjs/viz/series/helpers/display_format_parser.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.processDisplayFormat = processDisplayFormat;
var _localization = require("../../../localization");
const startPlaceHolderChar = "{";
const endPlaceHolderChar = "}";
const placeholderFormatDelimiter = ":";

function formatValue(value, format) {
    if (format) {
        if (value instanceof Date) {
            return (0, _localization.formatDate)(value, format)
        }
        if ("number" === typeof value) {
            return (0, _localization.formatNumber)(value, format)
        }
    }
    return value
}

function getValueByPlaceHolder(placeHolder, pointInfo) {
    let customFormat = "";
    const customFormatIndex = placeHolder.indexOf(placeholderFormatDelimiter);
    if (customFormatIndex > 0) {
        customFormat = placeHolder.substr(customFormatIndex + 1);
        placeHolder = placeHolder.substr(0, customFormatIndex)
    }
    return formatValue(pointInfo[placeHolder], customFormat)
}

function processDisplayFormat(displayFormat, pointInfo) {
    let actualText = displayFormat;
    let continueProcess = true;
    while (continueProcess) {
        const startBracketIndex = actualText.indexOf(startPlaceHolderChar);
        const endBracketIndex = actualText.indexOf(endPlaceHolderChar);
        if (startBracketIndex >= 0 && endBracketIndex > 0) {
            const placeHolder = actualText.substring(startBracketIndex + 1, endBracketIndex);
            const value = getValueByPlaceHolder(placeHolder, pointInfo);
            actualText = actualText.substr(0, startBracketIndex) + value + actualText.substr(endBracketIndex + 1)
        } else {
            continueProcess = false
        }
    }
    return actualText
}
