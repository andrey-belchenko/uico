/**
 * DevExtreme (cjs/localization/default_date_names.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _iterator = require("../core/utils/iterator");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PERIODS = ["AM", "PM"];
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const cutCaptions = (captions, format) => {
    const lengthByFormat = {
        abbreviated: 3,
        short: 2,
        narrow: 1
    };
    return (0, _iterator.map)(captions, (caption => caption.substr(0, lengthByFormat[format])))
};
var _default = exports.default = {
    getMonthNames: function(format) {
        return cutCaptions(MONTHS, format)
    },
    getDayNames: function(format) {
        return cutCaptions(DAYS, format)
    },
    getQuarterNames: function(format) {
        return QUARTERS
    },
    getPeriodNames: function(format) {
        return PERIODS
    }
};
module.exports = exports.default;
module.exports.default = exports.default;
