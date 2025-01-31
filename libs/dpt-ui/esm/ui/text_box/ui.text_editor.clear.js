/**
 * DevExtreme (esm/ui/text_box/ui.text_editor.clear.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import TextEditorButton from "./texteditor_button_collection/button";
import {
    addNamespace
} from "../../events/utils/index";
import pointer from "../../events/pointer";
import {
    name as click
} from "../../events/click";
const pointerDown = pointer.down;
const STATE_INVISIBLE_CLASS = "dx-state-invisible";
const TEXTEDITOR_CLEAR_BUTTON_CLASS = "dx-clear-button-area";
const TEXTEDITOR_CLEAR_ICON_CLASS = "dx-icon-clear";
const TEXTEDITOR_ICON_CLASS = "dx-icon";
const TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS = "dx-show-clear-button";
export default class ClearButton extends TextEditorButton {
    _create() {
        const $element = $("<span>").addClass("dx-clear-button-area").append($("<span>").addClass("dx-icon").addClass("dx-icon-clear"));
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
        eventsEngine.on($button, addNamespace(pointerDown, editorName), (e => {
            e.preventDefault();
            if ("mouse" !== e.pointerType) {
                editor._clearValueHandler(e)
            }
        }));
        eventsEngine.on($button, addNamespace(click, editorName), (e => editor._clearValueHandler(e)))
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
