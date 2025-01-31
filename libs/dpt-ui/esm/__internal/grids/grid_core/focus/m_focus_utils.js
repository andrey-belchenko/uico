/**
 * DevExtreme (esm/__internal/grids/grid_core/focus/m_focus_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateSerialization from "../../../../core/utils/date_serialization";
import {
    isDate,
    isFunction
} from "../../../../core/utils/type";
const getSortFilterValue = (sortInfo, rowData, _ref) => {
    let {
        isRemoteFiltering: isRemoteFiltering,
        dateSerializationFormat: dateSerializationFormat,
        getSelector: getSelector
    } = _ref;
    const {
        selector: selector
    } = sortInfo;
    const getter = isFunction(selector) ? selector : getSelector(selector);
    const rawValue = getter ? getter(rowData) : rowData[selector];
    const safeValue = isRemoteFiltering && isDate(rawValue) ? dateSerialization.serializeDate(rawValue, dateSerializationFormat) : rawValue;
    return {
        getter: getter,
        rawValue: rawValue,
        safeValue: safeValue
    }
};
export const UiGridCoreFocusUtils = {
    getSortFilterValue: getSortFilterValue
};
