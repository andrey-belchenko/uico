/**
 * DevExtreme (cjs/renovation/ui/scroll_view/common/scrollable_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.ScrollableProps = void 0;
var _simulated_strategy_props = require("./simulated_strategy_props");
var _get_default_option_value = require("../utils/get_default_option_value");
const ScrollableProps = exports.ScrollableProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(_simulated_strategy_props.ScrollableSimulatedProps), Object.getOwnPropertyDescriptors({
    get useNative() {
        return (0, _get_default_option_value.getDefaultUseNative)()
    },
    get useSimulatedScrollbar() {
        return (0, _get_default_option_value.getDefaultUseSimulatedScrollbar)()
    },
    get refreshStrategy() {
        return (0, _get_default_option_value.getDefaultNativeRefreshStrategy)()
    }
})));
