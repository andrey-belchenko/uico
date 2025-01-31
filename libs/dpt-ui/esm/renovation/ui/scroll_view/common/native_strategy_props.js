/**
 * DevExtreme (esm/renovation/ui/scroll_view/common/native_strategy_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    BaseScrollableProps
} from "./base_scrollable_props";
import {
    getDefaultNativeRefreshStrategy,
    getDefaultUseSimulatedScrollbar
} from "../utils/get_default_option_value";
export const ScrollableNativeProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(BaseScrollableProps), Object.getOwnPropertyDescriptors({
    get useSimulatedScrollbar() {
        return getDefaultUseSimulatedScrollbar()
    },
    showScrollbar: "onScroll",
    get refreshStrategy() {
        return getDefaultNativeRefreshStrategy()
    }
})));
