/**
 * DevExtreme (renovation/ui/editors/common/text_editor_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.TextEditorProps = void 0;
var _themes = require("../../../../ui/themes");
const TextEditorProps = exports.TextEditorProps = {
    maxLength: null,
    spellCheck: false,
    valueChangeEvent: "change",
    get stylingMode() {
        return (0, _themes.isMaterial)((0, _themes.current)()) ? "filled" : "outlined"
    },
    defaultValue: ""
};
