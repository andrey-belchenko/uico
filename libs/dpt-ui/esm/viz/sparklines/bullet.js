/**
 * DevExtreme (esm/viz/sparklines/bullet.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    each
} from "../../core/utils/iterator";
import BaseSparkline from "./base_sparkline";
import componentRegistrator from "../../core/component_registrator";
const TARGET_MIN_Y = .02;
const TARGET_MAX_Y = .98;
const BAR_VALUE_MIN_Y = .1;
const BAR_VALUE_MAX_Y = .9;
const DEFAULT_CANVAS_WIDTH = 300;
const DEFAULT_CANVAS_HEIGHT = 30;
const DEFAULT_HORIZONTAL_MARGIN = 1;
const DEFAULT_VERTICAL_MARGIN = 2;
const _Number = Number;
const _isFinite = isFinite;
const dxBullet = BaseSparkline.inherit({
    _rootClassPrefix: "dxb",
    _rootClass: "dxb-bullet",
    _themeSection: "bullet",
    _defaultSize: {
        width: 300,
        height: 30,
        left: 1,
        right: 1,
        top: 2,
        bottom: 2
    },
    _disposeWidgetElements: function() {
        delete this._zeroLevelPath;
        delete this._targetPath;
        delete this._barValuePath
    },
    _cleanWidgetElements: function() {
        this._zeroLevelPath.remove();
        this._targetPath.remove();
        this._barValuePath.remove()
    },
    _drawWidgetElements: function() {
        this._drawBullet();
        this._drawn()
    },
    _createHtmlElements: function() {
        const renderer = this._renderer;
        this._zeroLevelPath = renderer.path(void 0, "line").attr({
            class: "dxb-zero-level",
            "stroke-linecap": "square"
        });
        this._targetPath = renderer.path(void 0, "line").attr({
            class: "dxb-target",
            "stroke-linecap": "square"
        });
        this._barValuePath = renderer.path(void 0, "line").attr({
            class: "dxb-bar-value",
            "stroke-linecap": "square"
        })
    },
    _prepareOptions: function() {
        const that = this;
        let options;
        let startScaleValue;
        let endScaleValue;
        let level;
        let value;
        let target;
        that._allOptions = options = that.callBase();
        const isValueUndefined = void 0 === that._allOptions.value;
        const isTargetUndefined = void 0 === that._allOptions.target;
        that._tooltipEnabled = !(isValueUndefined && isTargetUndefined);
        if (isValueUndefined) {
            that._allOptions.value = 0
        }
        if (isTargetUndefined) {
            that._allOptions.target = 0
        }
        options.value = value = _Number(options.value);
        options.target = target = _Number(options.target);
        if (void 0 === that._allOptions.startScaleValue) {
            that._allOptions.startScaleValue = target < value ? target : value;
            that._allOptions.startScaleValue = that._allOptions.startScaleValue < 0 ? that._allOptions.startScaleValue : 0
        }
        if (void 0 === that._allOptions.endScaleValue) {
            that._allOptions.endScaleValue = target > value ? target : value
        }
        options.startScaleValue = startScaleValue = _Number(options.startScaleValue);
        options.endScaleValue = endScaleValue = _Number(options.endScaleValue);
        if (endScaleValue < startScaleValue) {
            level = endScaleValue;
            that._allOptions.endScaleValue = startScaleValue;
            that._allOptions.startScaleValue = level;
            that._allOptions.inverted = true
        }
    },
    _updateRange: function() {
        const options = this._allOptions;
        this._ranges = {
            arg: {
                invert: options.rtlEnabled ? !options.inverted : options.inverted,
                min: options.startScaleValue,
                max: options.endScaleValue,
                axisType: "continuous",
                dataType: "numeric"
            },
            val: {
                min: 0,
                max: 1,
                axisType: "continuous",
                dataType: "numeric"
            }
        }
    },
    _drawBullet: function() {
        const options = this._allOptions;
        const isValidBounds = options.startScaleValue !== options.endScaleValue;
        const isValidMin = _isFinite(options.startScaleValue);
        const isValidMax = _isFinite(options.endScaleValue);
        const isValidValue = _isFinite(options.value);
        const isValidTarget = _isFinite(options.target);
        if (isValidBounds && isValidMax && isValidMin && isValidTarget && isValidValue) {
            this._drawBarValue();
            this._drawTarget();
            this._drawZeroLevel()
        }
    },
    _getTargetParams: function() {
        const options = this._allOptions;
        const translatorY = this._valueAxis.getTranslator();
        const x = this._argumentAxis.getTranslator().translate(options.target);
        return {
            points: [x, translatorY.translate(.02), x, translatorY.translate(.98)],
            stroke: options.targetColor,
            "stroke-width": options.targetWidth
        }
    },
    _getBarValueParams: function() {
        const options = this._allOptions;
        const translatorX = this._argumentAxis.getTranslator();
        const translatorY = this._valueAxis.getTranslator();
        const startLevel = options.startScaleValue;
        const endLevel = options.endScaleValue;
        const value = options.value;
        const y2 = translatorY.translate(.1);
        const y1 = translatorY.translate(.9);
        let x1;
        let x2;
        if (value > 0) {
            x1 = startLevel <= 0 ? 0 : startLevel;
            x2 = value >= endLevel ? endLevel : value < x1 ? x1 : value
        } else {
            x1 = endLevel >= 0 ? 0 : endLevel;
            x2 = value < startLevel ? startLevel : value > x1 ? x1 : value
        }
        x1 = translatorX.translate(x1);
        x2 = translatorX.translate(x2);
        return {
            points: [x1, y1, x2, y1, x2, y2, x1, y2],
            fill: options.color
        }
    },
    _getCorrectCanvas: function() {
        return this._canvas
    },
    _getZeroLevelParams: function() {
        const translatorY = this._valueAxis.getTranslator();
        const x = this._argumentAxis.getTranslator().translate(0);
        return {
            points: [x, translatorY.translate(.02), x, translatorY.translate(.98)],
            stroke: this._allOptions.targetColor,
            "stroke-width": 1
        }
    },
    _drawZeroLevel: function() {
        const options = this._allOptions;
        if (0 > options.endScaleValue || 0 < options.startScaleValue || !options.showZeroLevel) {
            return
        }
        this._zeroLevelPath.attr(this._getZeroLevelParams()).sharp().append(this._renderer.root)
    },
    _drawTarget: function() {
        const options = this._allOptions;
        const target = options.target;
        if (target > options.endScaleValue || target < options.startScaleValue || !options.showTarget) {
            return
        }
        this._targetPath.attr(this._getTargetParams()).sharp().append(this._renderer.root)
    },
    _drawBarValue: function() {
        this._barValuePath.attr(this._getBarValueParams()).append(this._renderer.root)
    },
    _getTooltipCoords: function() {
        const canvas = this._canvas;
        const rootOffset = this._renderer.getRootOffset();
        const bBox = this._barValuePath.getBBox();
        return {
            x: bBox.x + bBox.width / 2 + rootOffset.left,
            y: canvas.height / 2 + rootOffset.top
        }
    },
    _getTooltipData: function() {
        const tooltip = this._tooltip;
        const options = this._allOptions;
        const value = options.value;
        const target = options.target;
        const valueText = tooltip.formatValue(value);
        const targetText = tooltip.formatValue(target);
        return {
            originalValue: value,
            originalTarget: target,
            value: valueText,
            target: targetText,
            valueText: ["Actual Value:", valueText, "Target Value:", targetText]
        }
    },
    _isTooltipEnabled: function() {
        return this._tooltipEnabled
    }
});
each(["color", "targetColor", "targetWidth", "showTarget", "showZeroLevel", "value", "target", "startScaleValue", "endScaleValue"], (function(_, name) {
    dxBullet.prototype._optionChangesMap[name] = "OPTIONS"
}));
componentRegistrator("dxBullet", dxBullet);
export default dxBullet;
