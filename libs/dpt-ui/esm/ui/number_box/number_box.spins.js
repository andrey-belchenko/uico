/**
 * DevExtreme (esm/ui/number_box/number_box.spins.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import TextEditorButton from "../text_box/texteditor_button_collection/button";
import SpinButton from "./number_box.spin";
import {
    addNamespace
} from "../../events/utils/index";
import pointer from "../../events/pointer";
import {
    extend
} from "../../core/utils/extend";
const SPIN_CLASS = "dx-numberbox-spin";
const SPIN_CONTAINER_CLASS = "dx-numberbox-spin-container";
const SPIN_TOUCH_FRIENDLY_CLASS = "dx-numberbox-spin-touch-friendly";
export default class SpinButtons extends TextEditorButton {
    _attachEvents(instance, $spinContainer) {
        const {
            editor: editor
        } = this;
        const eventName = addNamespace(pointer.down, editor.NAME);
        const $spinContainerChildren = $spinContainer.children();
        const pointerDownAction = editor._createAction((e => editor._spinButtonsPointerDownHandler(e)));
        eventsEngine.off($spinContainer, eventName);
        eventsEngine.on($spinContainer, eventName, (e => pointerDownAction({
            event: e
        })));
        SpinButton.getInstance($spinContainerChildren.eq(0)).option("onChange", (e => editor._spinUpChangeHandler(e)));
        SpinButton.getInstance($spinContainerChildren.eq(1)).option("onChange", (e => editor._spinDownChangeHandler(e)))
    }
    _create() {
        const {
            editor: editor
        } = this;
        const $spinContainer = $("<div>").addClass(SPIN_CONTAINER_CLASS);
        const $spinUp = $("<div>").appendTo($spinContainer);
        const $spinDown = $("<div>").appendTo($spinContainer);
        const options = this._getOptions();
        this._addToContainer($spinContainer);
        editor._createComponent($spinUp, SpinButton, extend({
            direction: "up"
        }, options));
        editor._createComponent($spinDown, SpinButton, extend({
            direction: "down"
        }, options));
        this._legacyRender(editor.$element(), this._isTouchFriendly(), options.visible);
        return {
            instance: $spinContainer,
            $element: $spinContainer
        }
    }
    _getOptions() {
        const {
            editor: editor
        } = this;
        const visible = this._isVisible();
        const disabled = editor.option("disabled");
        return {
            visible: visible,
            disabled: disabled
        }
    }
    _isVisible() {
        const {
            editor: editor
        } = this;
        return super._isVisible() && editor.option("showSpinButtons")
    }
    _isTouchFriendly() {
        const {
            editor: editor
        } = this;
        return editor.option("showSpinButtons") && editor.option("useLargeSpinButtons")
    }
    _legacyRender($editor, isTouchFriendly, isVisible) {
        $editor.toggleClass(SPIN_TOUCH_FRIENDLY_CLASS, isTouchFriendly);
        $editor.toggleClass(SPIN_CLASS, isVisible)
    }
    update() {
        const shouldUpdate = super.update();
        if (shouldUpdate) {
            const {
                editor: editor,
                instance: instance
            } = this;
            const $editor = editor.$element();
            const isVisible = this._isVisible();
            const isTouchFriendly = this._isTouchFriendly();
            const $spinButtons = instance.children();
            const spinUp = SpinButton.getInstance($spinButtons.eq(0));
            const spinDown = SpinButton.getInstance($spinButtons.eq(1));
            const options = this._getOptions();
            spinUp.option(options);
            spinDown.option(options);
            this._legacyRender($editor, isTouchFriendly, isVisible)
        }
    }
}
