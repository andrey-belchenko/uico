/**
 * DevExtreme (cjs/viz/tree_map/tiling.rotated_slice_and_dice.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _tiling = require("./tiling");
const sliceAndDiceAlgorithm = (0, _tiling.getAlgorithm)("sliceanddice");

function rotatedSliceAndDice(data) {
    data.isRotated = !data.isRotated;
    return sliceAndDiceAlgorithm.call(this, data)
}(0, _tiling.addAlgorithm)("rotatedsliceanddice", rotatedSliceAndDice);
