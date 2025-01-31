/**
 * DevExtreme (esm/viz/series/points/bubble_point.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import symbolPoint from "./symbol_point";
const _extend = extend;
const MIN_BUBBLE_HEIGHT = 20;
export default _extend({}, symbolPoint, {
    correctCoordinates: function(diameter) {
        this.bubbleSize = diameter / 2
    },
    _drawMarker: function(renderer, group, animationEnabled) {
        const attr = _extend({
            translateX: this.x,
            translateY: this.y
        }, this._getStyle());
        this.graphic = renderer.circle(0, 0, animationEnabled ? 0 : this.bubbleSize).smartAttr(attr).data({
            "chart-data-point": this
        }).append(group)
    },
    getTooltipParams: function(location) {
        const graphic = this.graphic;
        if (!graphic) {
            return
        }
        const height = graphic.getBBox().height;
        return {
            x: this.x,
            y: this.y,
            offset: height < 20 || "edge" === location ? height / 2 : 0
        }
    },
    _getLabelFormatObject: function() {
        const formatObject = symbolPoint._getLabelFormatObject.call(this);
        formatObject.size = this.initialSize;
        return formatObject
    },
    _updateData: function(data) {
        symbolPoint._updateData.call(this, data);
        this.size = this.initialSize = data.size
    },
    _getGraphicBBox: function() {
        return this._getSymbolBBox(this.x, this.y, this.bubbleSize)
    },
    _updateMarker: function(animationEnabled, style) {
        const that = this;
        if (!animationEnabled) {
            style = _extend({
                r: that.bubbleSize,
                translateX: that.x,
                translateY: that.y
            }, style)
        }
        that.graphic.smartAttr(style)
    },
    _getFormatObject: function(tooltip) {
        const formatObject = symbolPoint._getFormatObject.call(this, tooltip);
        formatObject.sizeText = tooltip.formatValue(this.initialSize);
        return formatObject
    },
    _storeTrackerR: function() {
        return this.bubbleSize
    },
    _getLabelCoords: function(label) {
        let coords;
        if ("inside" === label.getLayoutOptions().position) {
            coords = this._getLabelCoordOfPosition(label, "inside")
        } else {
            coords = symbolPoint._getLabelCoords.call(this, label)
        }
        return coords
    }
});
