/**
 * DevExtreme (esm/__internal/ui/splitter/utils/component.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export function getComponentInstance($element) {
    var _$element$data, _$element$data2;
    const componentName = null === (_$element$data = $element.data) || void 0 === _$element$data ? void 0 : _$element$data.call($element, "dxComponents")[0];
    return componentName && (null === (_$element$data2 = $element.data) || void 0 === _$element$data2 ? void 0 : _$element$data2.call($element, `${componentName}`))
}
