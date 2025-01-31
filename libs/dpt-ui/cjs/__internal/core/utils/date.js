/**
 * DevExtreme (cjs/__internal/core/utils/date.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dateUtilsTs = void 0;
const addOffsets = (date, offsets) => {
    const newDateMs = offsets.reduce(((result, offset) => result + offset), date.getTime());
    return new Date(newDateMs)
};
const dateUtilsTs = exports.dateUtilsTs = {
    addOffsets: addOffsets
};
