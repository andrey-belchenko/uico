/**
 * DevExtreme (esm/ui/widget/swatch_container.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import {
    value
} from "../../core/utils/view_port";
const SWATCH_CONTAINER_CLASS_PREFIX = "dx-swatch-";
const getSwatchContainer = element => {
    const $element = $(element);
    const swatchContainer = $element.closest('[class^="dx-swatch-"], [class*=" dx-swatch-"]');
    const viewport = value();
    if (!swatchContainer.length) {
        return viewport
    }
    const swatchClassRegex = new RegExp("(\\s|^)(dx-swatch-.*?)(\\s|$)");
    const swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
    let viewportSwatchContainer = viewport.children("." + swatchClass);
    if (!viewportSwatchContainer.length) {
        viewportSwatchContainer = $("<div>").addClass(swatchClass).appendTo(viewport)
    }
    return viewportSwatchContainer
};
export default {
    getSwatchContainer: getSwatchContainer
};
