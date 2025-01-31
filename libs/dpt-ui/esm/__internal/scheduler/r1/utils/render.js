/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/render.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
export const addToStyles = (options, style) => {
    const nextStyle = style ?? {};
    const result = _extends({}, nextStyle);
    options.forEach((_ref => {
        let {
            attr: attr,
            value: value
        } = _ref;
        result[attr] = value || nextStyle[attr]
    }));
    return result
};
export const addWidthToStyle = (value, style) => {
    const width = value ? `${value}px` : "";
    return addToStyles([{
        attr: "width",
        value: width
    }], style)
};
export const addHeightToStyle = (value, style) => {
    const height = value ? `${value}px` : "";
    return addToStyles([{
        attr: "height",
        value: height
    }], style)
};
export const combineClasses = classesMap => Object.keys(classesMap).filter((cssClass => !!cssClass && classesMap[cssClass])).join(" ");
export const getGroupCellClasses = function() {
    let isFirstGroupCell = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    let isLastGroupCell = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
    let className = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    return combineClasses({
        "dx-scheduler-first-group-cell": isFirstGroupCell,
        "dx-scheduler-last-group-cell": isLastGroupCell,
        [className]: true
    })
};
export const getCellSizeHorizontalClass = (viewType, crossScrollingEnabled) => {
    switch (viewType) {
        case "day":
        case "week":
        case "workWeek":
        case "month":
            return crossScrollingEnabled ? "dx-scheduler-cell-sizes-horizontal" : "";
        default:
            return "dx-scheduler-cell-sizes-horizontal"
    }
};
export const getCellSizeVerticalClass = isAllDayCell => !isAllDayCell ? "dx-scheduler-cell-sizes-vertical" : "";
