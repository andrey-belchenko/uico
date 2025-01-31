/**
 * DevExtreme (esm/core/utils/resize_callbacks.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    hasWindow,
    getWindow
} from "./window";
import domAdapter from "../dom_adapter";
import Callbacks from "./callbacks";
import readyCallbacks from "./ready_callbacks";
import callOnce from "./call_once";
const resizeCallbacks = function() {
    let prevSize;
    const callbacks = Callbacks();
    const originalCallbacksAdd = callbacks.add;
    const originalCallbacksRemove = callbacks.remove;
    if (!hasWindow()) {
        return callbacks
    }
    const formatSize = function() {
        const window = getWindow();
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
    const handleResize = function() {
        const now = formatSize();
        if (now.width === prevSize.width && now.height === prevSize.height) {
            return
        }
        let changedDimension;
        if (now.width === prevSize.width) {
            changedDimension = "height"
        }
        if (now.height === prevSize.height) {
            changedDimension = "width"
        }
        prevSize = now;
        callbacks.fire(changedDimension)
    };
    const setPrevSize = callOnce((function() {
        prevSize = formatSize()
    }));
    let removeListener;
    callbacks.add = function() {
        const result = originalCallbacksAdd.apply(callbacks, arguments);
        setPrevSize();
        readyCallbacks.add((function() {
            if (!removeListener && callbacks.has()) {
                removeListener = domAdapter.listen(getWindow(), "resize", handleResize)
            }
        }));
        return result
    };
    callbacks.remove = function() {
        const result = originalCallbacksRemove.apply(callbacks, arguments);
        if (!callbacks.has() && removeListener) {
            removeListener();
            removeListener = void 0
        }
        return result
    };
    return callbacks
}();
export default resizeCallbacks;
