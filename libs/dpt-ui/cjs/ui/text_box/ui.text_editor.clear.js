/**
 * DevExtreme (cjs/ui/text_box/ui.text_editor.clear.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _button = _interopRequireDefault(require("./texteditor_button_collection/button"));
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _click = require("../../events/click");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const pointerDown = _pointer.default.down;
const STATE_INVISIBLE_CLASS = "dx-state-invisible";
const TEXTEDITOR_CLEAR_BUTTON_CLASS = "dx-clear-button-area";
const TEXTEDITOR_CLEAR_ICON_CLASS = "dx-icon-clear";
const TEXTEDITOR_ICON_CLASS = "dx-icon";
const TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS = "dx-show-clear-button";
class ClearButton extends _button.default {
    _create() {
        const $element = (0, _renderer.default)("<span>").addClass("dx-clear-button-area").append((0, _renderer.default)("<span>").addClass("dx-icon").addClass("dx-icon-clear"));
        this._addToContainer($element);
        this.update(true);
        return {
            instance: $element,
            $element: $element
        }
    }
    _isVisible() {
        const {
            editor: editor
        } = this;
        return editor._isClearButtonVisible()
    }
    _attachEvents(instance, $button) {
        const {
            editor: editor
        } = this;
        const editorName = editor.NAME;
        _events_engine.default.on($button, (0, _index.addNamespace)(pointerDown, editorName), (e => {
            e.preventDefault();
            if ("mouse" !== e.pointerType) {
                editor._clearValueHandler(e)
            }
        }));
        _events_engine.default.on($button, (0, _index.addNamespace)(_click.name, editorName), (e => editor._clearValueHandler(e)))
    }
    _legacyRender($editor, isVisible) {
        $editor.toggleClass("dx-show-clear-button", isVisible)
    }
    update() {
        let rendered = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
        !rendered && super.update();
        const {
            editor: editor,
            instance: instance
        } = this;
        const $editor = editor.$element();
        const isVisible = this._isVisible();
        instance && instance.toggleClass("dx-state-invisible", !isVisible);
        this._legacyRender($editor, isVisible)
    }
}
exports.default = ClearButton;
module.exports = exports.default;
module.exports.default = exports.default;
