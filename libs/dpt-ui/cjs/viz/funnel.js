/**
 * DevExtreme (cjs/viz/funnel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _funnel = _interopRequireDefault(require("./funnel/funnel"));
var _label = require("./funnel/label");
var _export = require("./core/export");
var _title = require("./core/title");
var _legend = require("./components/legend");
var _tracker = require("./funnel/tracker");
var _tooltip = require("./funnel/tooltip");
var _loading_indicator = require("./core/loading_indicator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
_funnel.default.addPlugin(_label.plugin);
_funnel.default.addPlugin(_export.plugin);
_funnel.default.addPlugin(_title.plugin);
_funnel.default.addPlugin(_legend.plugin);
_funnel.default.addPlugin(_tracker.plugin);
_funnel.default.addPlugin(_tooltip.plugin);
_funnel.default.addPlugin(_loading_indicator.plugin);
var _default = exports.default = _funnel.default;
module.exports = exports.default;
module.exports.default = exports.default;
