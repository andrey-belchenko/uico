/**
 * DevExtreme (cjs/ui/html_editor/formats/align.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dptuicompQuill = _interopRequireDefault(require("dptuicomp-quill"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
let AlignStyle = {};
if (_dptuicompQuill.default) {
    AlignStyle = _dptuicompQuill.default.import("attributors/style/align");
    AlignStyle.whitelist.push("left")
}
var _default = exports.default = AlignStyle;
module.exports = exports.default;
module.exports.default = exports.default;
