/**
 * DevExtreme (cjs/viz/tree_map/tree_map.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _tree_map = _interopRequireDefault(require("./tree_map.base"));
require("./tiling.squarified");
require("./tiling.strip");
require("./tiling.slice_and_dice");
require("./tiling.rotated_slice_and_dice");
require("./colorizing.discrete");
require("./colorizing.gradient");
require("./colorizing.range");
require("./api");
require("./hover");
require("./selection");
require("./tooltip");
require("./tracker");
require("./drilldown");
require("./plain_data_source");
var _export = require("../core/export");
var _title = require("../core/title");
var _loading_indicator = require("../core/loading_indicator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var _default = exports.default = _tree_map.default;
_tree_map.default.addPlugin(_export.plugin);
_tree_map.default.addPlugin(_title.plugin);
_tree_map.default.addPlugin(_loading_indicator.plugin);
module.exports = exports.default;
module.exports.default = exports.default;
