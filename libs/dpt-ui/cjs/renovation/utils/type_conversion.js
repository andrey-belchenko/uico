/**
 * DevExtreme (cjs/renovation/utils/type_conversion.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.toNumber = toNumber;

function toNumber(attribute) {
    return attribute ? Number(attribute.replace("px", "")) : 0
}
