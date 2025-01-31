/**
 * DevExtreme (esm/__internal/common/m_charts.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    getNextDefsSvgId
} from "../../viz/core/utils";
const graphicObjects = {};
export const registerPattern = options => {
    const id = getNextDefsSvgId();
    graphicObjects[id] = _extends({
        type: "pattern"
    }, options);
    return id
};
export const registerGradient = (type, options) => {
    const id = getNextDefsSvgId();
    graphicObjects[id] = _extends({
        type: type
    }, options);
    return id
};
const getGraphicObjects = () => graphicObjects;
export default {
    getGraphicObjects: getGraphicObjects
};
