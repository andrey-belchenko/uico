/**
 * DevExtreme (cjs/renovation/utils/combine_classes.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.combineClasses = combineClasses;

function combineClasses(classesMap) {
    return Object.keys(classesMap).filter((p => classesMap[p])).join(" ")
}
