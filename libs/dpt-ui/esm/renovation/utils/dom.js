/**
 * DevExtreme (esm/renovation/utils/dom.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export function querySelectorInSameDocument(el, selector) {
    var _el$getRootNode;
    const root = (null === (_el$getRootNode = el.getRootNode) || void 0 === _el$getRootNode ? void 0 : _el$getRootNode.call(el)) ?? document;
    return root.querySelector(selector)
}
