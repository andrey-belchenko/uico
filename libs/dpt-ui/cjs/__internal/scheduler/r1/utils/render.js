/**
 * DevExtreme (cjs/__internal/scheduler/r1/utils/render.js)
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
exports.getGroupCellClasses = exports.getCellSizeVerticalClass = exports.getCellSizeHorizontalClass = exports.combineClasses = exports.addWidthToStyle = exports.addToStyles = exports.addHeightToStyle = void 0;

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const addToStyles = (options, style) => {
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
exports.addToStyles = addToStyles;
const addWidthToStyle = (value, style) => {
    const width = value ? `${value}px` : "";
    return addToStyles([{
        attr: "width",
        value: width
    }], style)
};
exports.addWidthToStyle = addWidthToStyle;
const addHeightToStyle = (value, style) => {
    const height = value ? `${value}px` : "";
    return addToStyles([{
        attr: "height",
        value: height
    }], style)
};
exports.addHeightToStyle = addHeightToStyle;
const combineClasses = classesMap => Object.keys(classesMap).filter((cssClass => !!cssClass && classesMap[cssClass])).join(" ");
exports.combineClasses = combineClasses;
const getGroupCellClasses = function() {
    let isFirstGroupCell = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    let isLastGroupCell = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
    let className = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    return combineClasses({
        "dx-scheduler-first-group-cell": isFirstGroupCell,
        "dx-scheduler-last-group-cell": isLastGroupCell,
        [className]: true
    })
};
exports.getGroupCellClasses = getGroupCellClasses;
const getCellSizeHorizontalClass = (viewType, crossScrollingEnabled) => {
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
exports.getCellSizeHorizontalClass = getCellSizeHorizontalClass;
const getCellSizeVerticalClass = isAllDayCell => !isAllDayCell ? "dx-scheduler-cell-sizes-vertical" : "";
exports.getCellSizeVerticalClass = getCellSizeVerticalClass;
