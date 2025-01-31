/**
 * DevExtreme (esm/integration/knockout/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import ko from "knockout";
import $ from "../../core/renderer";
export const getClosestNodeWithContext = node => {
    const context = ko.contextFor(node);
    if (!context && node.parentNode) {
        return getClosestNodeWithContext(node.parentNode)
    }
    return node
};
export const getClosestNodeWithKoCreation = node => {
    const $el = $(node);
    const data = $el.data();
    const hasFlag = data && data.dxKoCreation;
    if (hasFlag) {
        return node
    }
    if (node.parentNode) {
        return getClosestNodeWithKoCreation(node.parentNode)
    }
    return null
};
