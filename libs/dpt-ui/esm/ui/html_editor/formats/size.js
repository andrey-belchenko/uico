/**
 * DevExtreme (esm/ui/html_editor/formats/size.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Quill from "dpt-ui-quill";
let SizeStyle = {};
if (Quill) {
    SizeStyle = Quill.import("attributors/style/size");
    SizeStyle.whitelist = null
}
export default SizeStyle;
