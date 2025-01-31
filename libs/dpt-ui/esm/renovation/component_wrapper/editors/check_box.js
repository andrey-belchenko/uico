/**
 * DevExtreme (esm/renovation/component_wrapper/editors/check_box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Editor from "./editor";
export default class CheckBox extends Editor {
    _useTemplates() {
        return false
    }
    _isFocused() {
        const focusTarget = this.$element()[0];
        return focusTarget.classList.contains("dx-state-focused")
    }
    getSupportedKeyNames() {
        return ["space"]
    }
    getProps() {
        const props = super.getProps();
        if (null !== props.value) {
            props.value = Boolean(props.value)
        }
        return props
    }
}
