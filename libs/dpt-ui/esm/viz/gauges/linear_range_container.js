/**
 * DevExtreme (esm/viz/gauges/linear_range_container.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import BaseRangeContainer from "./base_range_container";
const _Number = Number;
const _max = Math.max;
import {
    normalizeEnum as _normalizeEnum
} from "../core/utils";
const LinearRangeContainer = BaseRangeContainer.inherit({
    _processOptions: function() {
        const that = this;
        that.vertical = that._options.vertical;
        that._inner = that._outer = 0;
        if (that.vertical) {
            switch (_normalizeEnum(that._options.horizontalOrientation)) {
                case "left":
                    that._inner = 1;
                    break;
                case "center":
                    that._inner = that._outer = .5;
                    break;
                default:
                    that._outer = 1
            }
        } else {
            switch (_normalizeEnum(that._options.verticalOrientation)) {
                case "top":
                    that._inner = 1;
                    break;
                case "center":
                    that._inner = that._outer = .5;
                    break;
                default:
                    that._outer = 1
            }
        }
    },
    _isVisible: function() {
        return true
    },
    _createRange: function(range, layout) {
        const inner = this._inner;
        const outer = this._outer;
        const startPosition = this._translator.translate(range.start);
        const endPosition = this._translator.translate(range.end);
        let points;
        const x = layout.x;
        const y = layout.y;
        const startWidth = range.startWidth;
        const endWidth = range.endWidth;
        if (this.vertical) {
            points = [x - startWidth * inner, startPosition, x - endWidth * inner, endPosition, x + endWidth * outer, endPosition, x + startWidth * outer, startPosition]
        } else {
            points = [startPosition, y + startWidth * outer, startPosition, y - startWidth * inner, endPosition, y - endWidth * inner, endPosition, y + endWidth * outer]
        }
        return this._renderer.path(points, "area")
    },
    measure: function(layout) {
        const result = {};
        let width;
        result.min = result.max = layout[this.vertical ? "x" : "y"];
        width = this._options.width;
        width = _Number(width) || _max(_Number(width.start), _Number(width.end));
        result.min -= this._inner * width;
        result.max += this._outer * width;
        return result
    }
});
export default LinearRangeContainer;
