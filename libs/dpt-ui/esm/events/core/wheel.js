/**
 * DevExtreme (esm/events/core/wheel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import registerEvent from "./event_registrator";
import {
    addNamespace,
    fireEvent
} from "../utils/index";
const EVENT_NAME = "dxmousewheel";
const EVENT_NAMESPACE = "dxWheel";
const NATIVE_EVENT_NAME = "wheel";
const PIXEL_MODE = 0;
const DELTA_MUTLIPLIER = 30;
const wheel = {
    setup: function(element) {
        const $element = $(element);
        eventsEngine.on($element, addNamespace("wheel", "dxWheel"), wheel._wheelHandler.bind(wheel))
    },
    teardown: function(element) {
        eventsEngine.off(element, ".dxWheel")
    },
    _wheelHandler: function(e) {
        const {
            deltaMode: deltaMode,
            deltaY: deltaY,
            deltaX: deltaX,
            deltaZ: deltaZ
        } = e.originalEvent;
        fireEvent({
            type: EVENT_NAME,
            originalEvent: e,
            delta: this._normalizeDelta(deltaY, deltaMode),
            deltaX: deltaX,
            deltaY: deltaY,
            deltaZ: deltaZ,
            deltaMode: deltaMode,
            pointerType: "mouse"
        });
        e.stopPropagation()
    },
    _normalizeDelta(delta) {
        let deltaMode = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (0 === deltaMode) {
            return -delta
        } else {
            return -30 * delta
        }
    }
};
registerEvent(EVENT_NAME, wheel);
export {
    EVENT_NAME as name
};
