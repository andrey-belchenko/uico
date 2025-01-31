/**
 * DevExtreme (cjs/integration/jquery/deferred.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _jquery = _interopRequireDefault(require("jquery"));
var _deferred = require("../../core/utils/deferred");
var _version = require("../../core/utils/version");
var _use_jquery = _interopRequireDefault(require("./use_jquery"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
    const Deferred = _jquery.default.Deferred;
    const strategy = {
        Deferred: Deferred
    };
    strategy.when = (0, _version.compare)(_jquery.default.fn.jquery, [3]) < 0 ? _jquery.default.when : function(singleArg) {
        if (0 === arguments.length) {
            return (new Deferred).resolve()
        } else if (1 === arguments.length) {
            return singleArg && singleArg.then ? singleArg : (new Deferred).resolve(singleArg)
        } else {
            return _jquery.default.when.apply(_jquery.default, arguments)
        }
    };
    (0, _deferred.setStrategy)(strategy)
}
