/**
 * DevExtreme (cjs/ui/diagram/diagram.edges_option.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _diagram = _interopRequireDefault(require("./diagram.items_option"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class EdgesOption extends _diagram.default {
    _getKeyExpr() {
        return this._diagramWidget._createOptionGetter("edges.keyExpr")
    }
}
var _default = exports.default = EdgesOption;
module.exports = exports.default;
module.exports.default = exports.default;
