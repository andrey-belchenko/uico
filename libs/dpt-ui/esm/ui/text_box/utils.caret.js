/**
 * DevExtreme (esm/ui/text_box/utils.caret.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import {
    isDefined
} from "../../core/utils/type";
import devices from "../../core/devices";
import domAdapter from "../../core/dom_adapter";
const {
    ios: ios,
    mac: mac
} = devices.real();
const isFocusingOnCaretChange = ios || mac;
const getCaret = function(input) {
    let range;
    try {
        range = {
            start: input.selectionStart,
            end: input.selectionEnd
        }
    } catch (e) {
        range = {
            start: 0,
            end: 0
        }
    }
    return range
};
const setCaret = function(input, position) {
    const body = domAdapter.getBody();
    if (!body.contains(input) && !body.contains(input.getRootNode().host)) {
        return
    }
    try {
        input.selectionStart = position.start;
        input.selectionEnd = position.end
    } catch (e) {}
};
const caret = function(input, position) {
    let force = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
    input = $(input).get(0);
    if (!isDefined(position)) {
        return getCaret(input)
    }
    if (!force && isFocusingOnCaretChange && domAdapter.getActiveElement(input) !== input) {
        return
    }
    setCaret(input, position)
};
export default caret;
