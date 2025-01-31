/**
 * DevExtreme (cjs/core/utils/error.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = _default;
var _extend = require("./extend");
var _console = require("./console");
var _string = require("./string");
var _version = require("../version");
const ERROR_URL = "https://js.dpt-ext-ui.com/error/" + _version.version.split(".").slice(0, 2).join("_") + "/";

function _default(baseErrors, errors) {
    const exports = {
        ERROR_MESSAGES: (0, _extend.extend)(errors, baseErrors),
        Error: function() {
            return function(args) {
                const id = args[0];
                args = args.slice(1);
                const details = formatDetails(id, args);
                const url = getErrorUrl(id);
                const message = formatMessage(id, details);
                return (0, _extend.extend)(new Error(message), {
                    __id: id,
                    __details: details,
                    url: url
                })
            }([].slice.call(arguments))
        },
        log: function(id) {
            let method = "log";
            if (/^E\d+$/.test(id)) {
                method = "error"
            } else if (/^W\d+$/.test(id)) {
                method = "warn"
            }
            _console.logger[method]("log" === method ? id : function(args) {
                const id = args[0];
                args = args.slice(1);
                return formatMessage(id, formatDetails(id, args))
            }([].slice.call(arguments)))
        }
    };

    function formatDetails(id, args) {
        args = [exports.ERROR_MESSAGES[id]].concat(args);
        return _string.format.apply(this, args).replace(/\.*\s*?$/, "")
    }

    function formatMessage(id, details) {
        const kind = null !== id && void 0 !== id && id.startsWith("W") ? "warning" : "error";
        return _string.format.apply(this, ["{0} - {1}.\n\nFor additional information on this {2} message, see: {3}", id, details, kind, getErrorUrl(id)])
    }

    function getErrorUrl(id) {
        return ERROR_URL + id
    }
    return exports
}
module.exports = exports.default;
module.exports.default = exports.default;
