/**
 * DevExtreme (esm/viz/series/points/polar_point.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
const _extend = extend;
import symbolPoint from "./symbol_point";
import barPoint from "./bar_point";
import piePoint from "./pie_point";
import {
    isDefined
} from "../../../core/utils/type";
import {
    normalizeAngle,
    convertPolarToXY,
    getCosAndSin,
    convertXYToPolar
} from "../../core/utils";
const _math = Math;
const _max = _math.max;
import consts from "../../components/consts";
const RADIAL_LABEL_INDENT = consts.radialLabelIndent;
const ERROR_BARS_ANGLE_OFFSET = 90;
const CANVAS_POSITION_START = "canvas_position_start";
const CANVAS_POSITION_END = "canvas_position_end";
const CANVAS_POSITION_DEFAULT = "canvas_position_default";
export const polarSymbolPoint = _extend({}, symbolPoint, {
    _getLabelCoords: piePoint._getLabelCoords,
    _getElementCoords: piePoint._getElementCoords,
    _moveLabelOnCanvas: function(coord, visibleArea, labelBBox) {
        let x = coord.x;
        let y = coord.y;
        if (visibleArea.minX > x) {
            x = visibleArea.minX
        }
        if (visibleArea.maxX < x + labelBBox.width) {
            x = visibleArea.maxX - labelBBox.width
        }
        if (visibleArea.minY > y) {
            y = visibleArea.minY
        }
        if (visibleArea.maxY < y + labelBBox.height) {
            y = visibleArea.maxY - labelBBox.height
        }
        return {
            x: x,
            y: y
        }
    },
    _getLabelPosition: function() {
        return "outside"
    },
    _getCoords: function(argument, value) {
        const axis = this.series.getValueAxis();
        const startAngle = axis.getAngles()[0];
        const angle = this._getArgTranslator().translate(argument);
        const radius = this._getValTranslator().translate(value);
        const coords = convertPolarToXY(axis.getCenter(), axis.getAngles()[0], angle, radius);
        coords.angle = angle + startAngle - 90, coords.radius = radius;
        return coords
    },
    _translate() {
        const center = this.series.getValueAxis().getCenter();
        const coord = this._getCoords(this.argument, this.value);
        const translator = this._getValTranslator();
        const maxRadius = translator.isInverted() ? translator.translate(CANVAS_POSITION_START) : translator.translate(CANVAS_POSITION_END);
        const normalizedRadius = isDefined(coord.radius) && coord.radius >= 0 ? coord.radius : null;
        this.vx = normalizeAngle(coord.angle);
        this.vy = this.radiusOuter = this.radiusLabels = normalizedRadius;
        this.radiusLabels += RADIAL_LABEL_INDENT;
        this.radius = normalizedRadius;
        this.middleAngle = -coord.angle;
        this.angle = -coord.angle;
        this.x = coord.x;
        this.y = coord.y;
        this.defaultX = this.centerX = center.x;
        this.defaultY = this.centerY = center.y;
        this._translateErrorBars();
        this.inVisibleArea = this._checkRadiusForVisibleArea(normalizedRadius, maxRadius)
    },
    _checkRadiusForVisibleArea: (radius, maxRadius) => isDefined(radius) && radius <= maxRadius,
    _translateErrorBars: function() {
        const errorBars = this._options.errorBars;
        const translator = this._getValTranslator();
        if (!errorBars) {
            return
        }
        isDefined(this.lowError) && (this._lowErrorCoord = this.centerY - translator.translate(this.lowError));
        isDefined(this.highError) && (this._highErrorCoord = this.centerY - translator.translate(this.highError));
        this._errorBarPos = this.centerX;
        this._baseErrorBarPos = "stdDeviation" === errorBars.type ? this._lowErrorCoord + (this._highErrorCoord - this._lowErrorCoord) / 2 : this.centerY - this.radius
    },
    _getTranslates: function(animationEnabled) {
        return animationEnabled ? this.getDefaultCoords() : {
            x: this.x,
            y: this.y
        }
    },
    getDefaultCoords: function() {
        const cosSin = getCosAndSin(-this.angle);
        const radius = this._getValTranslator().translate(CANVAS_POSITION_DEFAULT);
        const x = this.defaultX + radius * cosSin.cos;
        const y = this.defaultY + radius * cosSin.sin;
        return {
            x: x,
            y: y
        }
    },
    _addLabelAlignmentAndOffset: function(label, coord) {
        return coord
    },
    _checkLabelPosition: function(label, coord) {
        const that = this;
        const visibleArea = that._getVisibleArea();
        const graphicBBox = that._getGraphicBBox();
        if (that._isPointInVisibleArea(visibleArea, graphicBBox)) {
            coord = that._moveLabelOnCanvas(coord, visibleArea, label.getBoundingRect())
        }
        return coord
    },
    _getErrorBarSettings: function(errorBarOptions, animationEnabled) {
        const settings = symbolPoint._getErrorBarSettings.call(this, errorBarOptions, animationEnabled);
        settings.rotate = 90 - this.angle;
        settings.rotateX = this.centerX;
        settings.rotateY = this.centerY;
        return settings
    },
    getCoords: function(min) {
        return min ? this.getDefaultCoords() : {
            x: this.x,
            y: this.y
        }
    }
});
export const polarBarPoint = _extend({}, barPoint, {
    _translateErrorBars: polarSymbolPoint._translateErrorBars,
    _getErrorBarSettings: polarSymbolPoint._getErrorBarSettings,
    _moveLabelOnCanvas: polarSymbolPoint._moveLabelOnCanvas,
    _getLabelCoords: piePoint._getLabelCoords,
    _getElementCoords: piePoint._getElementCoords,
    _getLabelConnector: piePoint._getLabelConnector,
    getTooltipParams: piePoint.getTooltipParams,
    _getLabelPosition: piePoint._getLabelPosition,
    _getCoords: polarSymbolPoint._getCoords,
    _translate() {
        const that = this;
        const translator = that._getValTranslator();
        const businessRange = translator.getBusinessRange();
        const maxRadius = translator.isInverted() ? translator.translate(CANVAS_POSITION_START) : translator.translate(CANVAS_POSITION_END);
        that.radiusInner = translator.translate(that.minValue);
        polarSymbolPoint._translate.call(that);
        if (null === that.radiusInner) {
            that.radiusInner = that.radius = maxRadius
        } else if (null === that.radius) {
            that.radius = that.value >= businessRange.minVisible ? maxRadius : 0
        } else if (that.radius > maxRadius) {
            that.radius = maxRadius
        }
        that.radiusOuter = that.radiusLabels = _max(that.radiusInner, that.radius);
        that.radiusLabels += RADIAL_LABEL_INDENT;
        that.radiusInner = that.defaultRadius = _math.min(that.radiusInner, that.radius);
        that.middleAngle = that.angle = -normalizeAngle(that.middleAngleCorrection - that.angle)
    },
    _checkRadiusForVisibleArea(radius) {
        return isDefined(radius) || this._getValTranslator().translate(this.minValue) > 0
    },
    _getErrorBarBaseEdgeLength() {
        const coord = this.getMarkerCoords();
        return _math.PI * coord.outerRadius * _math.abs(coord.startAngle - coord.endAngle) / 180
    },
    getMarkerCoords: function() {
        return {
            x: this.centerX,
            y: this.centerY,
            outerRadius: this.radiusOuter,
            innerRadius: this.defaultRadius,
            startAngle: this.middleAngle - this.interval / 2,
            endAngle: this.middleAngle + this.interval / 2
        }
    },
    _drawMarker: function(renderer, group, animationEnabled) {
        const styles = this._getStyle();
        const coords = this.getMarkerCoords();
        let innerRadius = coords.innerRadius;
        let outerRadius = coords.outerRadius;
        const start = this._getCoords(this.argument, CANVAS_POSITION_DEFAULT);
        let x = coords.x;
        let y = coords.y;
        if (animationEnabled) {
            innerRadius = 0;
            outerRadius = 0;
            x = start.x;
            y = start.y
        }
        this.graphic = renderer.arc(x, y, innerRadius, outerRadius, coords.startAngle, coords.endAngle).attr(styles).data({
            "chart-data-point": this
        }).append(group)
    },
    _checkLabelPosition: function(label, coord) {
        const that = this;
        const visibleArea = that._getVisibleArea();
        const angleFunctions = getCosAndSin(that.middleAngle);
        const x = that.centerX + that.defaultRadius * angleFunctions.cos;
        const y = that.centerY - that.defaultRadius * angleFunctions.sin;
        if (x > visibleArea.minX && x < visibleArea.maxX && y > visibleArea.minY && y < visibleArea.maxY) {
            coord = that._moveLabelOnCanvas(coord, visibleArea, label.getBoundingRect())
        }
        return coord
    },
    _addLabelAlignmentAndOffset: function(label, coord) {
        return coord
    },
    correctCoordinates: function(correctOptions) {
        this.middleAngleCorrection = correctOptions.offset;
        this.interval = correctOptions.width
    },
    coordsIn: function(x, y) {
        const val = convertXYToPolar(this.series.getValueAxis().getCenter(), x, y);
        const coords = this.getMarkerCoords();
        const isBetweenAngles = coords.startAngle < coords.endAngle ? -val.phi >= coords.startAngle && -val.phi <= coords.endAngle : -val.phi <= coords.startAngle && -val.phi >= coords.endAngle;
        return val.r >= coords.innerRadius && val.r <= coords.outerRadius && isBetweenAngles
    }
});
