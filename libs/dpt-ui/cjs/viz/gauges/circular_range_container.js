/**
 * DevExtreme (cjs/viz/gauges/circular_range_container.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _base_range_container = _interopRequireDefault(require("./base_range_container"));
var _utils = require("../core/utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const _Number = Number;
const _max = Math.max;
const CircularRangeContainer = _base_range_container.default.inherit({
    _processOptions: function() {
        const that = this;
        that._inner = that._outer = 0;
        switch ((0, _utils.normalizeEnum)(that._options.orientation)) {
            case "inside":
                that._inner = 1;
                break;
            case "center":
                that._inner = that._outer = .5;
                break;
            default:
                that._outer = 1
        }
    },
    _isVisible: function(layout) {
        let width = this._options.width;
        width = _Number(width) || _max(_Number(width.start), _Number(width.end));
        return layout.radius - this._inner * width > 0
    },
    _createRange: function(range, layout) {
        const width = (range.startWidth + range.endWidth) / 2;
        return this._renderer.arc(layout.x, layout.y, layout.radius - this._inner * width, layout.radius + this._outer * width, this._translator.translate(range.end), this._translator.translate(range.start)).attr({
            "stroke-linejoin": "round"
        })
    },
    measure: function(layout) {
        let width = this._options.width;
        width = _Number(width) || _max(_Number(width.start), _Number(width.end));
        return {
            min: layout.radius - this._inner * width,
            max: layout.radius + this._outer * width
        }
    }
});
var _default = exports.default = CircularRangeContainer;
module.exports = exports.default;
module.exports.default = exports.default;
