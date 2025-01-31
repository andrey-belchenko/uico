/**
 * DevExtreme (esm/__internal/events/dblclick.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Class from "../../core/class";
import domAdapter from "../../core/dom_adapter";
import {
    closestCommonParent
} from "../../core/utils/dom";
import {
    name as clickEventName
} from "../../events/click";
import eventsEngine from "../../events/core/events_engine";
import {
    addNamespace,
    fireEvent
} from "../../events/utils/index";
const DBLCLICK_EVENT_NAME = "dxdblclick";
const DBLCLICK_NAMESPACE = "dxDblClick";
const NAMESPACED_CLICK_EVENT = addNamespace(clickEventName, "dxDblClick");
const DBLCLICK_TIMEOUT = 300;
const DblClick = Class.inherit({
    ctor() {
        this._handlerCount = 0;
        this._forgetLastClick()
    },
    _forgetLastClick() {
        this._firstClickTarget = null;
        this._lastClickTimeStamp = -300
    },
    add() {
        if (this._handlerCount <= 0) {
            eventsEngine.on(domAdapter.getDocument(), NAMESPACED_CLICK_EVENT, this._clickHandler.bind(this))
        }
        this._handlerCount += 1
    },
    _clickHandler(e) {
        const timeStamp = e.timeStamp || Date.now();
        const timeBetweenClicks = timeStamp - this._lastClickTimeStamp;
        const isSimulated = timeBetweenClicks < 0;
        const isDouble = !isSimulated && timeBetweenClicks < 300;
        if (isDouble) {
            fireEvent({
                type: "dxdblclick",
                target: closestCommonParent(this._firstClickTarget, e.target),
                originalEvent: e
            });
            this._forgetLastClick()
        } else {
            this._firstClickTarget = e.target;
            this._lastClickTimeStamp = timeStamp
        }
    },
    remove() {
        this._handlerCount -= 1;
        if (this._handlerCount <= 0) {
            this._forgetLastClick();
            eventsEngine.off(domAdapter.getDocument(), NAMESPACED_CLICK_EVENT, void 0);
            this._handlerCount = 0
        }
    }
});
const dblClick = new DblClick;
export {
    dblClick,
    DBLCLICK_EVENT_NAME as name
};
