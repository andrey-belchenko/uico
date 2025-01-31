/**
 * DevExtreme (esm/renovation/utils/subscribe_to_event.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import eventsEngine from "../../events/core/events_engine";
import * as clickEvent from "../../events/click";
import {
    addNamespace
} from "../../events/utils/index";
import scrollEvents from "../../events/gesture/emitter.gesture.scroll";
import pointerEvents from "../../events/pointer";
export function subscribeToEvent(eventName) {
    return (element, handler, eventData, namespace) => {
        const event = namespace ? addNamespace(eventName, namespace) : eventName;
        if (handler) {
            eventsEngine.on(element, event, eventData, handler);
            return () => {
                eventsEngine.off(element, event, handler)
            }
        }
        return
    }
}
export const subscribeToClickEvent = subscribeToEvent(clickEvent.name);
export const subscribeToScrollEvent = subscribeToEvent(scrollEvents.scroll);
export const subscribeToScrollInitEvent = subscribeToEvent(scrollEvents.init);
export const subscribeToDXScrollStartEvent = subscribeToEvent(scrollEvents.start);
export const subscribeToDXScrollMoveEvent = subscribeToEvent(scrollEvents.move);
export const subscribeToDXScrollEndEvent = subscribeToEvent(scrollEvents.end);
export const subscribeToDXScrollStopEvent = subscribeToEvent(scrollEvents.stop);
export const subscribeToDXScrollCancelEvent = subscribeToEvent(scrollEvents.cancel);
export const subscribeToDXPointerDownEvent = subscribeToEvent(pointerEvents.down);
export const subscribeToDXPointerUpEvent = subscribeToEvent(pointerEvents.up);
export const subscribeToDXPointerMoveEvent = subscribeToEvent(pointerEvents.move);
export const subscribeToMouseEnterEvent = subscribeToEvent("mouseenter");
export const subscribeToMouseLeaveEvent = subscribeToEvent("mouseleave");
export const subscribeToKeyDownEvent = subscribeToEvent("keydown");
export const subscribeToDxActiveEvent = subscribeToEvent("dxactive");
export const subscribeToDxInactiveEvent = subscribeToEvent("dxinactive");
export const subscribeToDxHoverStartEvent = subscribeToEvent("dxhoverstart");
export const subscribeToDxHoverEndEvent = subscribeToEvent("dxhoverend");
export const subscribeToDxFocusInEvent = subscribeToEvent("focusin");
export const subscribeToDxFocusOutEvent = subscribeToEvent("focusout");
