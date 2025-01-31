/**
 * DevExtreme (cjs/viz/range_selector/slider.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _common = require("./common");
var _slider_marker = _interopRequireDefault(require("./slider_marker"));
var _support = require("../../core/utils/support");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const animationSettings = _common.utils.animationSettings;
const SPLITTER_WIDTH = 8;
const TOUCH_SPLITTER_WIDTH = 20;

function getSliderTrackerWidth(sliderHandleWidth) {
    return _support.touchEvents || _support.pointerEvents ? 20 : 8 < sliderHandleWidth ? sliderHandleWidth : 8
}

function Slider(params, index) {
    this._translator = params.translator;
    this._sliderGroup = params.renderer.g().attr({
        class: "slider"
    }).append(params.root);
    this._line = params.renderer.path(null, "line").append(this._sliderGroup);
    this._marker = new _slider_marker.default(params.renderer, this._sliderGroup, 1 === index);
    this._tracker = params.renderer.rect().attr({
        class: "slider-tracker",
        fill: "#000000",
        opacity: 1e-4
    }).css({
        cursor: "w-resize"
    }).append(params.trackersGroup)
}
Slider.prototype = {
    constructor: Slider,
    cancelAnimation: function() {
        this._sliderGroup.stopAnimation();
        this._tracker.stopAnimation()
    },
    applyPosition: function(isAnimated) {
        const slider = this._sliderGroup;
        const tracker = this._tracker;
        const attrs = {
            translateX: this._position
        };
        this._marker.setPosition(this._position);
        if (isAnimated) {
            slider.animate(attrs, animationSettings);
            tracker.animate(attrs, animationSettings)
        } else {
            slider.attr(attrs);
            tracker.attr(attrs)
        }
    },
    _setValid: function(isValid) {
        this._marker.setValid(isValid);
        this._line.attr({
            stroke: this._colors[Number(isValid)]
        })
    },
    _setText: function(text) {
        this._marker.setText(text)
    },
    update: function(verticalRange, sliderHandleOptions, sliderMarkerOptions) {
        this._formatOptions = {
            format: sliderMarkerOptions.format,
            customizeText: sliderMarkerOptions.customizeText
        };
        this._marker.applyOptions(sliderMarkerOptions, this._translator.getScreenRange());
        this._colors = [sliderMarkerOptions.invalidRangeColor, sliderHandleOptions.color];
        this._sliderGroup.attr({
            translateY: verticalRange[0]
        });
        this._line.attr({
            "stroke-width": sliderHandleOptions.width,
            stroke: sliderHandleOptions.color,
            "stroke-opacity": sliderHandleOptions.opacity,
            sharp: "h",
            points: [0, 0, 0, verticalRange[1] - verticalRange[0]]
        });
        const trackerWidth = getSliderTrackerWidth(sliderHandleOptions.width);
        this._tracker.attr({
            x: -trackerWidth / 2,
            y: 0,
            width: trackerWidth,
            height: verticalRange[1] - verticalRange[0],
            translateY: verticalRange[0]
        })
    },
    toForeground: function() {
        this._sliderGroup.toForeground()
    },
    getSliderTracker: function() {
        return this._tracker
    },
    getPosition: function() {
        return this._position
    },
    setDisplayValue: function(value) {
        this._value = value;
        this._setText((0, _common.formatValue)(value, this._formatOptions))
    },
    setOverlapped: function(isOverlapped) {
        this._marker.setOverlapped(isOverlapped)
    },
    getValue: function() {
        return this._value
    },
    on: function(event, handler) {
        this._tracker.on(event, handler);
        this._marker.getTracker().on(event, handler)
    },
    getCloudBorder: function() {
        return this._marker.getBorderPosition()
    },
    dispose: function() {
        this._marker.dispose()
    }
};
var _default = exports.default = Slider;
module.exports = exports.default;
module.exports.default = exports.default;
