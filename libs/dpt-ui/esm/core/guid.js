/**
 * DevExtreme (esm/core/guid.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Class from "./class";
const Guid = Class.inherit({
    ctor: function(value) {
        if (value) {
            value = String(value)
        }
        this._value = this._normalize(value || this._generate())
    },
    _normalize: function(value) {
        value = value.replace(/[^a-f0-9]/gi, "").toLowerCase();
        while (value.length < 32) {
            value += "0"
        }
        return [value.substr(0, 8), value.substr(8, 4), value.substr(12, 4), value.substr(16, 4), value.substr(20, 12)].join("-")
    },
    _generate: function() {
        let value = "";
        for (let i = 0; i < 32; i++) {
            value += Math.round(15 * Math.random()).toString(16)
        }
        return value
    },
    toString: function() {
        return this._value
    },
    valueOf: function() {
        return this._value
    },
    toJSON: function() {
        return this._value
    }
});
export default Guid;
