/**
 * DevExtreme (cjs/viz/export.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _export = require("./core/export");
Object.keys(_export).forEach((function(key) {
    if ("default" === key || "__esModule" === key) {
        return
    }
    if (key in exports && exports[key] === _export[key]) {
        return
    }
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _export[key]
        }
    })
}));
