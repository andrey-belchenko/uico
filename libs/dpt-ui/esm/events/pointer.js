/**
 * DevExtreme (esm/events/pointer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import GlobalConfig from "../core/config";
import * as support from "../core/utils/support";
import {
    each
} from "../core/utils/iterator";
import devices from "../core/devices";
import registerEvent from "./core/event_registrator";
import TouchStrategy from "./pointer/touch";
import MouseStrategy from "./pointer/mouse";
import MouseAndTouchStrategy from "./pointer/mouse_and_touch";
const getStrategy = (support, _ref) => {
    let {
        tablet: tablet,
        phone: phone
    } = _ref;
    const pointerEventStrategy = getStrategyFromGlobalConfig();
    if (pointerEventStrategy) {
        return pointerEventStrategy
    }
    if (support.touch && !(tablet || phone)) {
        return MouseAndTouchStrategy
    }
    if (support.touch) {
        return TouchStrategy
    }
    return MouseStrategy
};
const EventStrategy = getStrategy(support, devices.real());
each(EventStrategy.map, ((pointerEvent, originalEvents) => {
    registerEvent(pointerEvent, new EventStrategy(pointerEvent, originalEvents))
}));
const pointer = {
    down: "dxpointerdown",
    up: "dxpointerup",
    move: "dxpointermove",
    cancel: "dxpointercancel",
    enter: "dxpointerenter",
    leave: "dxpointerleave",
    over: "dxpointerover",
    out: "dxpointerout"
};

function getStrategyFromGlobalConfig() {
    const eventStrategyName = GlobalConfig().pointerEventStrategy;
    return {
        "mouse-and-touch": MouseAndTouchStrategy,
        touch: TouchStrategy,
        mouse: MouseStrategy
    } [eventStrategyName]
}
export default pointer;
