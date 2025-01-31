/**
 * DevExtreme (cjs/__internal/filter_builder/m_filter_operations_dictionary.js)
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
exports.default = void 0;
const OPERATION_ICONS = {
    "=": "equal",
    "<>": "notequal",
    "<": "less",
    "<=": "lessorequal",
    ">": "greater",
    ">=": "greaterorequal",
    notcontains: "doesnotcontain",
    contains: "contains",
    startswith: "startswith",
    endswith: "endswith",
    isblank: "isblank",
    isnotblank: "isnotblank"
};
const OPERATION_NAME = {
    "=": "equal",
    "<>": "notEqual",
    "<": "lessThan",
    "<=": "lessThanOrEqual",
    ">": "greaterThan",
    ">=": "greaterThanOrEqual",
    startswith: "startsWith",
    contains: "contains",
    notcontains: "notContains",
    endswith: "endsWith",
    isblank: "isBlank",
    isnotblank: "isNotBlank",
    between: "between"
};
var _default = exports.default = {
    getIconByFilterOperation: filterOperation => OPERATION_ICONS[filterOperation],
    getNameByFilterOperation: filterOperation => OPERATION_NAME[filterOperation]
};
