/**
 * DevExtreme (cjs/integration/jquery/ajax.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _jquery = _interopRequireDefault(require("jquery"));
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
    _ajax.default.inject({
        sendRequest: function(options) {
            if (!options.responseType && !options.upload) {
                return _jquery.default.ajax(options)
            }
            return this.callBase.apply(this, [options])
        }
    })
}
