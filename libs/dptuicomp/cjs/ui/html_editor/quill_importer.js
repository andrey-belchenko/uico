/**
 * DevExtreme (cjs/ui/html_editor/quill_importer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.getQuill = getQuill;
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _dptuicompQuill = _interopRequireDefault(require("dptuicomp-quill"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function getQuill() {
    if (!_dptuicompQuill.default) {
        throw _ui.default.Error("E1041", "Quill")
    }
    return _dptuicompQuill.default
}
