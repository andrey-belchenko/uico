/**
 * DevExtreme (renovation/ui/editors/common/editor_label_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.EditorLabelProps = void 0;
var _themes = require("../../../../ui/themes");
const EditorLabelProps = exports.EditorLabelProps = {
    label: "",
    get labelMode() {
        return (0, _themes.isMaterial)((0, _themes.current)()) ? "floating" : "static"
    }
};
