/**
 * DevExtreme (cjs/viz/funnel/tiling.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.addAlgorithm = addAlgorithm;
exports.getAlgorithm = getAlgorithm;
var _utils = require("../core/utils");
const algorithms = {};
let defaultAlgorithm;

function getAlgorithm(name) {
    return algorithms[(0, _utils.normalizeEnum)(name)] || defaultAlgorithm
}

function addAlgorithm(name, callback, setDefault) {
    algorithms[name] = callback;
    if (setDefault) {
        defaultAlgorithm = algorithms[name]
    }
}
