/**
 * DevExtreme (esm/events/click.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../core/renderer";
import eventsEngine from "../events/core/events_engine";
import devices from "../core/devices";
import domAdapter from "../core/dom_adapter";
import {
    resetActiveElement
} from "../core/utils/dom";
import {
    requestAnimationFrame,
    cancelAnimationFrame
} from "../animation/frame";
import {
    addNamespace,
    fireEvent
} from "./utils/index";
import {
    subscribeNodesDisposing,
    unsubscribeNodesDisposing
} from "./utils/event_nodes_disposing";
import {
    getEventTarget
} from "./utils/event_target";
import pointerEvents from "./pointer";
import Emitter from "./core/emitter";
import registerEmitter from "./core/emitter_registrator";
const CLICK_EVENT_NAME = "dxclick";
const misc = {
    requestAnimationFrame: requestAnimationFrame,
    cancelAnimationFrame: cancelAnimationFrame
};
let prevented = null;
let lastFiredEvent = null;
const onNodeRemove = () => {
    lastFiredEvent = null
};
const clickHandler = function(e) {
    const originalEvent = e.originalEvent;
    const eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
    const leftButton = !e.which || 1 === e.which;
    if (leftButton && !prevented && !eventAlreadyFired) {
        if (originalEvent) {
            originalEvent.DXCLICK_FIRED = true
        }
        unsubscribeNodesDisposing(lastFiredEvent, onNodeRemove);
        lastFiredEvent = originalEvent;
        subscribeNodesDisposing(lastFiredEvent, onNodeRemove);
        fireEvent({
            type: "dxclick",
            originalEvent: e
        })
    }
};
const ClickEmitter = Emitter.inherit({
    ctor: function(element) {
        this.callBase(element);
        eventsEngine.on(this.getElement(), "click", clickHandler)
    },
    start: function(e) {
        prevented = null
    },
    cancel: function() {
        prevented = true
    },
    dispose: function() {
        eventsEngine.off(this.getElement(), "click", clickHandler)
    }
});
! function() {
    const desktopDevice = devices.real().generic;
    if (!desktopDevice) {
        let startTarget = null;
        let blurPrevented = false;
        const isInput = function(element) {
            return $(element).is("input, textarea, select, button ,:focus, :focus *")
        };
        const pointerDownHandler = function(e) {
            startTarget = e.target;
            blurPrevented = e.isDefaultPrevented()
        };
        const getTarget = function(e) {
            const target = getEventTarget(e);
            return $(target)
        };
        const clickHandler = function(e) {
            const $target = getTarget(e);
            if (!blurPrevented && startTarget && !$target.is(startTarget) && !$(startTarget).is("label") && isInput($target)) {
                resetActiveElement()
            }
            startTarget = null;
            blurPrevented = false
        };
        const NATIVE_CLICK_FIXER_NAMESPACE = "NATIVE_CLICK_FIXER";
        const document = domAdapter.getDocument();
        eventsEngine.subscribeGlobal(document, addNamespace(pointerEvents.down, NATIVE_CLICK_FIXER_NAMESPACE), pointerDownHandler);
        eventsEngine.subscribeGlobal(document, addNamespace("click", NATIVE_CLICK_FIXER_NAMESPACE), clickHandler)
    }
}();
registerEmitter({
    emitter: ClickEmitter,
    bubble: true,
    events: ["dxclick"]
});
export {
    CLICK_EVENT_NAME as name
};
