/**
 * DevExtreme (esm/ui/html_editor/quill_importer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Errors from "../widget/ui.errors";
import Quill from "dpt-ui-quill";
export function getQuill() {
    if (!Quill) {
        throw Errors.Error("E1041", "Quill")
    }
    return Quill
}
