/**
 * DevExtreme (esm/mobile/hide_callback.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export const hideCallback = function() {
    let callbacks = [];
    return {
        add: function(callback) {
            if (!callbacks.includes(callback)) {
                callbacks.push(callback)
            }
        },
        remove: function(callback) {
            const indexOfCallback = callbacks.indexOf(callback);
            if (-1 !== indexOfCallback) {
                callbacks.splice(indexOfCallback, 1)
            }
        },
        fire: function() {
            const callback = callbacks.pop();
            const result = !!callback;
            if (result) {
                callback()
            }
            return result
        },
        hasCallback: function() {
            return callbacks.length > 0
        }
    }
}();
