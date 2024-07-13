/**
 * DevExtreme (esm/ui/validation/default_adapter.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import Class from "../../core/class";
const DefaultAdapter = Class.inherit({
    ctor(editor, validator) {
        this.editor = editor;
        this.validator = validator;
        this.validationRequestsCallbacks = [];
        const handler = args => {
            this.validationRequestsCallbacks.forEach((item => item(args)))
        };
        editor.validationRequest.add(handler);
        editor.on("disposing", (function() {
            editor.validationRequest.remove(handler)
        }))
    },
    getValue() {
        return this.editor.option("value")
    },
    getCurrentValidationError() {
        return this.editor.option("validationError")
    },
    bypass() {
        return this.editor.option("disabled")
    },
    applyValidationResults(params) {
        this.editor.option({
            validationErrors: params.brokenRules,
            validationStatus: params.status
        })
    },
    reset() {
        this.editor.clear()
    },
    focus() {
        this.editor.focus()
    }
});
export default DefaultAdapter;
