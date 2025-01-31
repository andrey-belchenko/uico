/**
 * DevExtreme (esm/__internal/scheduler/m_expression_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined
} from "../../core/utils/type";
export const ExpressionUtils = {
    getField: (dataAccessors, field, obj) => {
        if (!isDefined(dataAccessors.getter[field])) {
            return
        }
        return dataAccessors.getter[field](obj)
    },
    setField: (dataAccessors, field, obj, value) => {
        if (!isDefined(dataAccessors.setter[field])) {
            return
        }
        dataAccessors.setter[field](obj, value);
        return obj
    }
};
