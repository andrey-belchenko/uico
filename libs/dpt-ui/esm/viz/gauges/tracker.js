/**
 * DevExtreme (esm/viz/gauges/tracker.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import eventsEngine from "../../events/core/events_engine";
import Class from "../../core/class";
import domAdapter from "../../core/dom_adapter";
import {
    name as wheelEventName
} from "../../events/core/wheel";
import ReadyCallbacks from "../../core/utils/ready_callbacks";
import {
    addNamespace
} from "../../events/utils/index";
import pointerEvents from "../../events/pointer";
const EVENT_NS = "gauge-tooltip";
const TOOLTIP_HIDE_DELAY = 100;
const ready = ReadyCallbacks.add;
const Tracker = Class.inherit({
    ctor: function(parameters) {
        const that = this;
        that._element = parameters.renderer.g().attr({
            class: "dxg-tracker",
            stroke: "none",
            "stroke-width": 0,
            fill: "#000000",
            opacity: 1e-4
        }).linkOn(parameters.container, {
            name: "tracker",
            after: "peripheral"
        });
        that._showTooltipCallback = function() {
            const target = that._tooltipEvent.target;
            const data_target = target["gauge-data-target"];
            const data_info = target["gauge-data-info"];
            that._targetEvent = null;
            if (that._tooltipTarget !== target) {
                const callback = result => {
                    result && (that._tooltipTarget = target)
                };
                callback(that._callbacks["tooltip-show"](data_target, data_info, callback))
            }
        };
        that._hideTooltipCallback = function() {
            that._hideTooltipTimeout = null;
            that._targetEvent = null;
            if (that._tooltipTarget) {
                that._callbacks["tooltip-hide"]();
                that._tooltipTarget = null
            }
        };
        that._dispose = function() {
            clearTimeout(that._hideTooltipTimeout);
            that._showTooltipCallback = that._hideTooltipCallback = that._dispose = null
        }
    },
    dispose: function() {
        this._dispose();
        this.deactivate();
        this._element.off("." + EVENT_NS);
        this._element.linkOff();
        this._element = this._context = this._callbacks = null;
        return this
    },
    activate: function() {
        this._element.linkAppend();
        return this
    },
    deactivate: function() {
        this._element.linkRemove().clear();
        return this
    },
    attach: function(element, target, info) {
        element.data({
            "gauge-data-target": target,
            "gauge-data-info": info
        }).append(this._element);
        return this
    },
    detach: function(element) {
        element.remove();
        return this
    },
    setTooltipState: function(state) {
        const that = this;
        that._element.off("." + EVENT_NS);
        if (state) {
            const data = {
                tracker: that
            };
            that._element.on(addNamespace([pointerEvents.move], EVENT_NS), data, handleTooltipMouseOver).on(addNamespace([pointerEvents.out], EVENT_NS), data, handleTooltipMouseOut).on(addNamespace([pointerEvents.down], EVENT_NS), data, handleTooltipTouchStart).on(addNamespace([pointerEvents.up], EVENT_NS), data, handleTooltipTouchEnd).on(addNamespace([wheelEventName], EVENT_NS), data, handleTooltipMouseWheel)
        }
        return that
    },
    setCallbacks: function(callbacks) {
        this._callbacks = callbacks;
        return this
    },
    _showTooltip: function(event) {
        clearTimeout(this._hideTooltipTimeout);
        this._hideTooltipTimeout = null;
        if (this._tooltipTarget === event.target) {
            return
        }
        this._tooltipEvent = event;
        this._showTooltipCallback()
    },
    _hideTooltip: function(delay) {
        const that = this;
        clearTimeout(that._hideTooltipTimeout);
        if (delay) {
            that._hideTooltipTimeout = setTimeout(that._hideTooltipCallback, delay)
        } else {
            that._hideTooltipCallback()
        }
    }
});
let active_touch_tooltip_tracker = null;

function handleTooltipMouseOver(event) {
    const tracker = event.data.tracker;
    tracker._x = event.pageX;
    tracker._y = event.pageY;
    tracker._showTooltip(event)
}

function handleTooltipMouseOut(event) {
    event.data.tracker._hideTooltip(100)
}

function handleTooltipMouseWheel(event) {
    event.data.tracker._hideTooltip()
}

function handleTooltipTouchStart(event) {
    const tracker = active_touch_tooltip_tracker = event.data.tracker;
    tracker._touch = true;
    handleTooltipMouseOver(event)
}

function handleTooltipTouchEnd() {
    active_touch_tooltip_tracker._touch = false
}

function handleDocumentTooltipTouchStart(event) {
    const tracker = active_touch_tooltip_tracker;
    if (tracker && !tracker._touch) {
        tracker._hideTooltip(100);
        active_touch_tooltip_tracker = null
    }
}
ready((function() {
    eventsEngine.subscribeGlobal(domAdapter.getDocument(), addNamespace([pointerEvents.down], EVENT_NS), handleDocumentTooltipTouchStart)
}));
export default Tracker;
