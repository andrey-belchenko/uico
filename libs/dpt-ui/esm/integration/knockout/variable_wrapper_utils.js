/**
 * DevExtreme (esm/integration/knockout/variable_wrapper_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import ko from "knockout";
import variableWrapper from "../../core/utils/variable_wrapper";
if (ko) {
    variableWrapper.inject({
        isWrapped: ko.isObservable,
        isWritableWrapped: ko.isWritableObservable,
        wrap: ko.observable,
        unwrap: function(value) {
            if (ko.isObservable(value)) {
                return ko.utils.unwrapObservable(value)
            }
            return this.callBase(value)
        },
        assign: function(variable, value) {
            if (ko.isObservable(variable)) {
                variable(value)
            } else {
                this.callBase(variable, value)
            }
        }
    })
}
