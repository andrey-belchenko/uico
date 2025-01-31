/**
 * DevExtreme (renovation/ui/scroll_view/utils/get_translate_values.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.getTranslateValues = getTranslateValues;
var _get_element_style = require("./get_element_style");

function getTranslateValues(el) {
    const matrix = (0, _get_element_style.getElementTransform)(el);
    const matrixValues = /matrix.*\((.+)\)/.exec(matrix);
    if (matrixValues) {
        const result = matrixValues[1].split(", ");
        return {
            left: Number(result[4]),
            top: Number(result[5])
        }
    }
    return {
        left: 0,
        top: 0
    }
}
