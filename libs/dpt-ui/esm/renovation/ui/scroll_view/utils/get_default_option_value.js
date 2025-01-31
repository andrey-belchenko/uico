/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_default_option_value.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import devices from "../../../../core/devices";
import {
    nativeScrolling
} from "../../../../core/utils/support";
import browser from "../../../../core/utils/browser";
export function isDesktop() {
    return !devices.isSimulator() && "desktop" === devices.real().deviceType && "generic" === devices.current().platform
}
export function getDefaultUseSimulatedScrollbar() {
    return !!nativeScrolling && "android" === devices.real().platform && !browser.mozilla
}
export function getDefaultBounceEnabled() {
    return !isDesktop()
}
export function getDefaultUseNative() {
    return !!nativeScrolling
}
export function getDefaultNativeRefreshStrategy() {
    return "android" === devices.real().platform ? "swipeDown" : "pullDown"
}
