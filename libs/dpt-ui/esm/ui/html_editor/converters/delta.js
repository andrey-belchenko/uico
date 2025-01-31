/**
 * DevExtreme (esm/ui/html_editor/converters/delta.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import ConverterController from "../converterController";
class DeltaConverter {
    setQuillInstance(quillInstance) {
        this.quillInstance = quillInstance
    }
    toHtml() {
        if (!this.quillInstance) {
            return
        }
        return this._isQuillEmpty() ? "" : this.quillInstance.getSemanticHTML(0, this.quillInstance.getLength() + 1)
    }
    _isQuillEmpty() {
        const delta = this.quillInstance.getContents();
        return 1 === delta.length() && this._isDeltaEmpty(delta)
    }
    _isDeltaEmpty(delta) {
        return delta.reduce(((__, _ref) => {
            let {
                insert: insert
            } = _ref;
            return -1 !== insert.indexOf("\n")
        }))
    }
}
ConverterController.addConverter("delta", DeltaConverter);
export default DeltaConverter;
