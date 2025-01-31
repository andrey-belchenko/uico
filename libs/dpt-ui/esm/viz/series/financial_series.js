/**
 * DevExtreme (esm/viz/series/financial_series.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    chart as scatterSeries
} from "./scatter_series";
import {
    chart as barChart
} from "./bar_series";
import {
    extend as _extend
} from "../../core/utils/extend";
import {
    isDefined as _isDefined
} from "../../core/utils/type";
import {
    normalizeEnum as _normalizeEnum,
    extractColor
} from "../core/utils";
import {
    noop as _noop
} from "../../core/utils/common";
const barSeries = barChart.bar;
const DEFAULT_FINANCIAL_POINT_SIZE = 10;
export const stock = _extend({}, scatterSeries, {
    _animate: _noop,
    _applyMarkerClipRect: function(settings) {
        settings["clip-path"] = this._forceClipping ? this._paneClipRectID : this._widePaneClipRectID
    },
    _updatePointsVisibility: barSeries._updatePointsVisibility,
    _getOptionsForPoint: barSeries._getOptionsForPoint,
    _createErrorBarGroup: _noop,
    areErrorBarsVisible: _noop,
    _createGroups: scatterSeries._createGroups,
    _setMarkerGroupSettings: function() {
        const markersGroup = this._markersGroup;
        const styles = this._createPointStyles(this._getMarkerGroupOptions());
        const defaultStyle = _extend(styles.normal, {
            class: "default-markers"
        });
        const defaultPositiveStyle = _extend(styles.positive.normal, {
            class: "default-positive-markers"
        });
        const reductionStyle = _extend(styles.reduction.normal, {
            class: "reduction-markers"
        });
        const reductionPositiveStyle = _extend(styles.reductionPositive.normal, {
            class: "reduction-positive-markers"
        });
        const markerSettings = {
            class: "dxc-markers"
        };
        this._applyMarkerClipRect(markerSettings);
        markersGroup.attr(markerSettings);
        this._createGroup("defaultMarkersGroup", markersGroup, markersGroup, defaultStyle);
        this._createGroup("reductionMarkersGroup", markersGroup, markersGroup, reductionStyle);
        this._createGroup("defaultPositiveMarkersGroup", markersGroup, markersGroup, defaultPositiveStyle);
        this._createGroup("reductionPositiveMarkersGroup", markersGroup, markersGroup, reductionPositiveStyle)
    },
    _setGroupsSettings: function() {
        scatterSeries._setGroupsSettings.call(this, false)
    },
    _getCreatingPointOptions: function() {
        const that = this;
        let defaultPointOptions;
        let creatingPointOptions = that._predefinedPointOptions;
        if (!creatingPointOptions) {
            defaultPointOptions = this._getPointOptions();
            that._predefinedPointOptions = creatingPointOptions = _extend(true, {
                styles: {}
            }, defaultPointOptions);
            creatingPointOptions.styles.normal = creatingPointOptions.styles.positive.normal = creatingPointOptions.styles.reduction.normal = creatingPointOptions.styles.reductionPositive.normal = {
                "stroke-width": defaultPointOptions.styles && defaultPointOptions.styles.normal && defaultPointOptions.styles.normal["stroke-width"]
            }
        }
        return creatingPointOptions
    },
    _checkData: function(data, skippedFields) {
        const valueFields = this.getValueFields();
        return scatterSeries._checkData.call(this, data, skippedFields, {
            openValue: valueFields[0],
            highValue: valueFields[1],
            lowValue: valueFields[2],
            closeValue: valueFields[3]
        }) && data.highValue === data.highValue && data.lowValue === data.lowValue
    },
    _getPointDataSelector: function(data, options) {
        const that = this;
        let level;
        const valueFields = that.getValueFields();
        const argumentField = that.getArgumentField();
        const openValueField = valueFields[0];
        const highValueField = valueFields[1];
        const lowValueField = valueFields[2];
        const closeValueField = valueFields[3];
        that.level = that._options.reduction.level;
        switch (_normalizeEnum(that.level)) {
            case "open":
                level = openValueField;
                break;
            case "high":
                level = highValueField;
                break;
            case "low":
                level = lowValueField;
                break;
            default:
                level = closeValueField;
                that.level = "close"
        }
        let prevLevelValue;
        return data => {
            const reductionValue = data[level];
            let isReduction = false;
            if (_isDefined(reductionValue)) {
                if (_isDefined(prevLevelValue)) {
                    isReduction = reductionValue < prevLevelValue
                }
                prevLevelValue = reductionValue
            }
            return {
                argument: data[argumentField],
                highValue: this._processEmptyValue(data[highValueField]),
                lowValue: this._processEmptyValue(data[lowValueField]),
                closeValue: this._processEmptyValue(data[closeValueField]),
                openValue: this._processEmptyValue(data[openValueField]),
                reductionValue: reductionValue,
                tag: data[that.getTagField()],
                isReduction: isReduction,
                data: data
            }
        }
    },
    _parsePointStyle: function(style, defaultColor, innerColor) {
        const color = extractColor(style.color, true);
        return {
            stroke: color || defaultColor,
            "stroke-width": style.width,
            fill: color || innerColor
        }
    },
    _getDefaultStyle: function(options) {
        const mainPointColor = extractColor(options.color, true) || this._options.mainSeriesColor;
        return {
            normal: this._parsePointStyle(options, mainPointColor, mainPointColor),
            hover: this._parsePointStyle(options.hoverStyle, mainPointColor, mainPointColor),
            selection: this._parsePointStyle(options.selectionStyle, mainPointColor, mainPointColor)
        }
    },
    _getReductionStyle: function(options) {
        const reductionColor = options.reduction.color;
        return {
            normal: this._parsePointStyle({
                color: reductionColor,
                width: options.width,
                hatching: options.hatching
            }, reductionColor, reductionColor),
            hover: this._parsePointStyle(options.hoverStyle, reductionColor, reductionColor),
            selection: this._parsePointStyle(options.selectionStyle, reductionColor, reductionColor)
        }
    },
    _createPointStyles: function(pointOptions) {
        const innerColor = this._options.innerColor;
        const styles = this._getDefaultStyle(pointOptions);
        const positiveStyle = _extend(true, {}, styles);
        const reductionStyle = this._getReductionStyle(pointOptions);
        const reductionPositiveStyle = _extend(true, {}, reductionStyle);
        positiveStyle.normal.fill = positiveStyle.hover.fill = positiveStyle.selection.fill = innerColor;
        reductionPositiveStyle.normal.fill = reductionPositiveStyle.hover.fill = reductionPositiveStyle.selection.fill = innerColor;
        styles.positive = positiveStyle;
        styles.reduction = reductionStyle;
        styles.reductionPositive = reductionPositiveStyle;
        styles.labelColor = this._options.mainSeriesColor;
        return styles
    },
    _endUpdateData: function() {
        delete this._predefinedPointOptions
    },
    _defaultAggregator: "ohlc",
    _aggregators: {
        ohlc: (_ref, series) => {
            let {
                intervalStart: intervalStart,
                intervalEnd: intervalEnd,
                data: data
            } = _ref;
            if (!data.length) {
                return
            }
            let result = {};
            const valueFields = series.getValueFields();
            const highValueField = valueFields[1];
            const lowValueField = valueFields[2];
            result[highValueField] = -1 / 0;
            result[lowValueField] = 1 / 0;
            result = data.reduce((function(result, item) {
                if (null !== item[highValueField]) {
                    result[highValueField] = Math.max(result[highValueField], item[highValueField])
                }
                if (null !== item[lowValueField]) {
                    result[lowValueField] = Math.min(result[lowValueField], item[lowValueField])
                }
                return result
            }), result);
            result[valueFields[0]] = data[0][valueFields[0]];
            result[valueFields[3]] = data[data.length - 1][valueFields[3]];
            if (!isFinite(result[highValueField])) {
                result[highValueField] = null
            }
            if (!isFinite(result[lowValueField])) {
                result[lowValueField] = null
            }
            result[series.getArgumentField()] = series._getIntervalCenter(intervalStart, intervalEnd);
            return result
        }
    },
    getValueFields: function() {
        const options = this._options;
        return [options.openValueField || "open", options.highValueField || "high", options.lowValueField || "low", options.closeValueField || "close"]
    },
    getArgumentField: function() {
        return this._options.argumentField || "date"
    },
    _patchMarginOptions: function(options) {
        const pointOptions = this._getCreatingPointOptions();
        const styles = pointOptions.styles;
        const border = [styles.normal, styles.hover, styles.selection].reduce((function(max, style) {
            return Math.max(max, style["stroke-width"])
        }), 0);
        options.size = 10 + border;
        options.sizePointNormalState = 10;
        return options
    },
    getSeriesPairCoord(coord, isArgument) {
        let oppositeCoord = null;
        const points = this.getVisiblePoints();
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            let tmpCoord;
            if (isArgument) {
                tmpCoord = p.vx === coord ? (p.openY + p.closeY) / 2 : void 0
            } else {
                const coords = [Math.min(p.lowY, p.highY), Math.max(p.lowY, p.highY)];
                tmpCoord = coord >= coords[0] && coord <= coords[1] ? p.vx : void 0
            }
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    },
    usePointsToDefineAutoHiding: () => false
});
export const candlestick = _extend({}, stock, {
    _parsePointStyle: function(style, defaultColor, innerColor) {
        const color = extractColor(style.color, true) || innerColor;
        const base = stock._parsePointStyle.call(this, style, defaultColor, color);
        base.fill = color;
        base.hatching = style.hatching;
        return base
    }
});
