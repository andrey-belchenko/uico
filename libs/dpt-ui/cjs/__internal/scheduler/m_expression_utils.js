/**
 * DevExtreme (cjs/__internal/scheduler/m_expression_utils.js)
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
exports.ExpressionUtils = void 0;
var _type = require("../../core/utils/type");
const ExpressionUtils = exports.ExpressionUtils = {
    getField: (dataAccessors, field, obj) => {
        if (!(0, _type.isDefined)(dataAccessors.getter[field])) {
            return
        }
        return dataAccessors.getter[field](obj)
    },
    setField: (dataAccessors, field, obj, value) => {
        if (!(0, _type.isDefined)(dataAccessors.setter[field])) {
            return
        }
        dataAccessors.setter[field](obj, value);
        return obj
    }
};
