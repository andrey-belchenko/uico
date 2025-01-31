/**
 * DevExtreme (esm/viz/series/points/stock_point.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import {
    isNumeric
} from "../../../core/utils/type";
import candlestickPoint from "./candlestick_point";
const _extend = extend;
const _isNumeric = isNumeric;
export default _extend({}, candlestickPoint, {
    _getPoints: function() {
        const createPoint = this._options.rotated ? function(x, y) {
            return [y, x]
        } : function(x, y) {
            return [x, y]
        };
        const openYExist = _isNumeric(this.openY);
        const closeYExist = _isNumeric(this.closeY);
        const x = this.x;
        const width = this.width;
        let points = [].concat(createPoint(x, this.highY));
        openYExist && (points = points.concat(createPoint(x, this.openY)));
        openYExist && (points = points.concat(createPoint(x - width / 2, this.openY)));
        openYExist && (points = points.concat(createPoint(x, this.openY)));
        closeYExist && (points = points.concat(createPoint(x, this.closeY)));
        closeYExist && (points = points.concat(createPoint(x + width / 2, this.closeY)));
        closeYExist && (points = points.concat(createPoint(x, this.closeY)));
        points = points.concat(createPoint(x, this.lowY));
        return points
    },
    _drawMarkerInGroup: function(group, attributes, renderer) {
        this.graphic = renderer.path(this._getPoints(), "line").attr({
            "stroke-linecap": "square"
        }).attr(attributes).data({
            "chart-data-point": this
        }).sharp().append(group)
    },
    _getMinTrackerWidth: function() {
        const width = 2 + this._styles.normal["stroke-width"];
        return width + width % 2
    }
});
