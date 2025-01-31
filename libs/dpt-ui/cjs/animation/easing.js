/**
 * DevExtreme (cjs/animation/easing.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.convertTransitionTimingFuncToEasing = void 0;
exports.getEasing = getEasing;
exports.setEasing = setEasing;
var _type = require("../core/utils/type");
const CSS_TRANSITION_EASING_REGEX = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/;
const TransitionTimingFuncMap = {
    linear: "cubic-bezier(0, 0, 1, 1)",
    swing: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
    "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
    "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"
};
const polynomBezier = function(x1, y1, x2, y2) {
    const Cx = 3 * x1;
    const Bx = 3 * (x2 - x1) - Cx;
    const Ax = 1 - Cx - Bx;
    const Cy = 3 * y1;
    const By = 3 * (y2 - y1) - Cy;
    const Ay = 1 - Cy - By;
    const bezierX = function(t) {
        return t * (Cx + t * (Bx + t * Ax))
    };
    const derivativeX = function(t) {
        return Cx + t * (2 * Bx + 3 * t * Ax)
    };
    return function(t) {
        return function(t) {
            return t * (Cy + t * (By + t * Ay))
        }(function(t) {
            let x = t;
            let i = 0;
            let z;
            while (i < 14) {
                z = bezierX(x) - t;
                if (Math.abs(z) < .001) {
                    break
                }
                x -= z / derivativeX(x);
                i++
            }
            return x
        }(t))
    }
};
let easing = {};
const convertTransitionTimingFuncToEasing = function(cssTransitionEasing) {
    cssTransitionEasing = TransitionTimingFuncMap[cssTransitionEasing] || cssTransitionEasing;
    let coeffs = cssTransitionEasing.match(CSS_TRANSITION_EASING_REGEX);
    let forceName;
    if (!coeffs) {
        forceName = "linear";
        coeffs = TransitionTimingFuncMap[forceName].match(CSS_TRANSITION_EASING_REGEX)
    }
    coeffs = coeffs.slice(1, 5);
    for (let i = 0; i < coeffs.length; i++) {
        coeffs[i] = parseFloat(coeffs[i])
    }
    const easingName = forceName || "cubicbezier_" + coeffs.join("_").replace(/\./g, "p");
    if (!(0, _type.isFunction)(easing[easingName])) {
        easing[easingName] = function(x, t, b, c, d) {
            return c * polynomBezier(coeffs[0], coeffs[1], coeffs[2], coeffs[3])(t / d) + b
        }
    }
    return easingName
};
exports.convertTransitionTimingFuncToEasing = convertTransitionTimingFuncToEasing;

function setEasing(value) {
    easing = value
}

function getEasing(name) {
    return easing[name]
}
