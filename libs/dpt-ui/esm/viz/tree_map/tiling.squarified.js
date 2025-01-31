/**
 * DevExtreme (esm/viz/tree_map/tiling.squarified.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const _max = Math.max;
import _squarify from "./tiling.squarified.base";
import {
    addAlgorithm
} from "./tiling";

function accumulate(total, current) {
    return _max(total, current)
}

function squarified(data) {
    return _squarify(data, accumulate, false)
}
addAlgorithm("squarified", squarified);
export default squarified;
