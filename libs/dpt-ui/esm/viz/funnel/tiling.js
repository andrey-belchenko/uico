/**
 * DevExtreme (esm/viz/funnel/tiling.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    normalizeEnum as _normalizeEnum
} from "../core/utils";
const algorithms = {};
let defaultAlgorithm;
export function getAlgorithm(name) {
    return algorithms[_normalizeEnum(name)] || defaultAlgorithm
}
export function addAlgorithm(name, callback, setDefault) {
    algorithms[name] = callback;
    if (setDefault) {
        defaultAlgorithm = algorithms[name]
    }
}
