/**
 * DevExtreme (esm/viz/vector_map/projection.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    projection
} from "./projection.main";
const _min = Math.min;
const _max = Math.max;
const _sin = Math.sin;
const _asin = Math.asin;
const _tan = Math.tan;
const _atan = Math.atan;
const _exp = Math.exp;
const _log = Math.log;
const PI = Math.PI;
const PI_DIV_4 = PI / 4;
const GEO_LON_BOUND = 180;
const GEO_LAT_BOUND = 90;
const RADIANS = PI / 180;
const MERCATOR_LAT_BOUND = (2 * _atan(_exp(PI)) - PI / 2) / RADIANS;
const MILLER_LAT_BOUND = (2.5 * _atan(_exp(.8 * PI)) - .625 * PI) / RADIANS;

function clamp(value, threshold) {
    return _max(_min(value, +threshold), -threshold)
}
projection.add("mercator", projection({
    aspectRatio: 1,
    to: function(coordinates) {
        return [coordinates[0] / 180, _log(_tan(PI_DIV_4 + clamp(coordinates[1], MERCATOR_LAT_BOUND) * RADIANS / 2)) / PI]
    },
    from: function(coordinates) {
        return [180 * coordinates[0], (2 * _atan(_exp(coordinates[1] * PI)) - PI / 2) / RADIANS]
    }
}));
projection.add("equirectangular", projection({
    aspectRatio: 2,
    to: function(coordinates) {
        return [coordinates[0] / 180, coordinates[1] / 90]
    },
    from: function(coordinates) {
        return [180 * coordinates[0], 90 * coordinates[1]]
    }
}));
projection.add("lambert", projection({
    aspectRatio: 2,
    to: function(coordinates) {
        return [coordinates[0] / 180, _sin(clamp(coordinates[1], 90) * RADIANS)]
    },
    from: function(coordinates) {
        return [180 * coordinates[0], _asin(clamp(coordinates[1], 1)) / RADIANS]
    }
}));
projection.add("miller", projection({
    aspectRatio: 1,
    to: function(coordinates) {
        return [coordinates[0] / 180, 1.25 * _log(_tan(PI_DIV_4 + clamp(coordinates[1], MILLER_LAT_BOUND) * RADIANS * .4)) / PI]
    },
    from: function(coordinates) {
        return [180 * coordinates[0], (2.5 * _atan(_exp(.8 * coordinates[1] * PI)) - .625 * PI) / RADIANS]
    }
}));
export {
    projection
};
