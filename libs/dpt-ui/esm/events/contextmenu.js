/**
 * DevExtreme (esm/events/contextmenu.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../core/renderer";
import eventsEngine from "../events/core/events_engine";
import {
    touch
} from "../core/utils/support";
import devices from "../core/devices";
import Class from "../core/class";
import registerEvent from "./core/event_registrator";
import {
    addNamespace,
    fireEvent,
    isMouseEvent
} from "./utils/index";
import holdEvent from "./hold";
const CONTEXTMENU_NAMESPACE = "dxContexMenu";
const CONTEXTMENU_NAMESPACED_EVENT_NAME = addNamespace("contextmenu", "dxContexMenu");
const HOLD_NAMESPACED_EVENT_NAME = addNamespace(holdEvent.name, "dxContexMenu");
const CONTEXTMENU_EVENT_NAME = "dxcontextmenu";
const ContextMenu = Class.inherit({
    setup: function(element) {
        const $element = $(element);
        eventsEngine.on($element, CONTEXTMENU_NAMESPACED_EVENT_NAME, this._contextMenuHandler.bind(this));
        if (touch || devices.isSimulator()) {
            eventsEngine.on($element, HOLD_NAMESPACED_EVENT_NAME, this._holdHandler.bind(this))
        }
    },
    _holdHandler: function(e) {
        if (isMouseEvent(e) && !devices.isSimulator()) {
            return
        }
        this._fireContextMenu(e)
    },
    _contextMenuHandler: function(e) {
        this._fireContextMenu(e)
    },
    _fireContextMenu: function(e) {
        return fireEvent({
            type: "dxcontextmenu",
            originalEvent: e
        })
    },
    teardown: function(element) {
        eventsEngine.off(element, ".dxContexMenu")
    }
});
registerEvent("dxcontextmenu", new ContextMenu);
export const name = "dxcontextmenu";
