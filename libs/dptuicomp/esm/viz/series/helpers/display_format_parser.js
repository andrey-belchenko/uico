/**
 * DevExtreme (esm/viz/series/helpers/display_format_parser.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import {
    formatDate,
    formatNumber
} from "../../../localization";
const startPlaceHolderChar = "{";
const endPlaceHolderChar = "}";
const placeholderFormatDelimiter = ":";

function formatValue(value, format) {
    if (format) {
        if (value instanceof Date) {
            return formatDate(value, format)
        }
        if ("number" === typeof value) {
            return formatNumber(value, format)
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
export function processDisplayFormat(displayFormat, pointInfo) {
    let actualText = displayFormat;
    let continueProcess = true;
    while (continueProcess) {
        const startBracketIndex = actualText.indexOf("{");
        const endBracketIndex = actualText.indexOf("}");
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
