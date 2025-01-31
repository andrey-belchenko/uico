/**
 * DevExtreme (esm/viz/components/tracker.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    eventData as _eventData
} from "../../events/utils/index";
import domAdapter from "../../core/dom_adapter";
import {
    name as clickEventName
} from "../../events/click";
import pointer from "../../events/pointer";
import eventsEngine from "../../events/core/events_engine";
const downPointerEventName = pointer.down;
const movePointerEventName = pointer.move;
export function Tracker(parameters) {
    this._initHandlers(parameters)
}
Tracker.prototype = {
    constructor: Tracker,
    _initHandlers: function(parameters) {
        const document = domAdapter.getDocument();
        parameters.getCoords = function(e) {
            const data = _eventData(e);
            const offset = parameters.widget._renderer.getRootOffset();
            return [data.x - offset.left, data.y - offset.top]
        };
        parameters.root.on(clickEventName, clickHandler);
        parameters.root.on(downPointerEventName, downHandler);
        eventsEngine.on(document, downPointerEventName, downHandler);
        eventsEngine.on(document, movePointerEventName, moveHandler);
        this._disposeHandlers = function() {
            parameters.root.off(clickEventName, clickHandler);
            parameters.root.off(downPointerEventName, downHandler);
            eventsEngine.off(document, downPointerEventName, downHandler);
            eventsEngine.off(document, movePointerEventName, moveHandler)
        };

        function clickHandler(e) {
            processClick(e, parameters)
        }
        let isRootDown = false;

        function downHandler(e) {
            if (isRootDown) {
                isRootDown = false
            } else {
                if (void 0 !== parameters.getData(e)) {
                    isRootDown = true
                }
                moveHandler(e)
            }
        }

        function moveHandler(e) {
            processHover(e, parameters);
            parameters.widget._getOption("tooltip").enabled && processTooltip(e, parameters)
        }
    },
    dispose: function() {
        this._disposeHandlers()
    }
};

function processClick(e, params) {
    const id = params.getData(e);
    if (id >= 0) {
        params.click({
            node: params.getNode(id),
            coords: params.getCoords(e),
            event: e
        })
    }
}

function processHover(e, params) {
    const id = params.getData(e);
    if (id >= 0) {
        params.getNode(id).setHover()
    } else {
        params.widget.clearHover()
    }
}

function processTooltip(e, params) {
    const id = params.getData(e, true);
    let coords;
    if (id >= 0) {
        coords = _eventData(e);
        params.getNode(id).showTooltip([coords.x, coords.y])
    } else {
        params.widget.hideTooltip()
    }
}
