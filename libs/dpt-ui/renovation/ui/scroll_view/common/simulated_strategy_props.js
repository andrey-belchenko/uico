/**
 * DevExtreme (renovation/ui/scroll_view/common/simulated_strategy_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.ScrollableSimulatedProps = void 0;
var _base_scrollable_props = require("./base_scrollable_props");
var _get_default_option_value = require("../utils/get_default_option_value");
const ScrollableSimulatedProps = exports.ScrollableSimulatedProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(_base_scrollable_props.BaseScrollableProps), Object.getOwnPropertyDescriptors({
    inertiaEnabled: true,
    useKeyboard: true,
    get showScrollbar() {
        return (0, _get_default_option_value.isDesktop)() ? "onHover" : "onScroll"
    },
    get scrollByThumb() {
        return (0, _get_default_option_value.isDesktop)()
    },
    refreshStrategy: "simulated"
})));
