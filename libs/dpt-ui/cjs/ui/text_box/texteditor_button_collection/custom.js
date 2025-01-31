/**
 * DevExtreme (cjs/ui/text_box/texteditor_button_collection/custom.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _button = _interopRequireDefault(require("./button"));
var _button2 = _interopRequireDefault(require("../../button"));
var _extend = require("../../../core/utils/extend");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _hover = require("../../../events/hover");
var _click = require("../../../events/click");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const CUSTOM_BUTTON_HOVERED_CLASS = "dx-custom-button-hovered";
class CustomButton extends _button.default {
    _attachEvents(instance, $element) {
        const {
            editor: editor
        } = this;
        _events_engine.default.on($element, _hover.start, (() => {
            editor.$element().addClass("dx-custom-button-hovered")
        }));
        _events_engine.default.on($element, _hover.end, (() => {
            editor.$element().removeClass("dx-custom-button-hovered")
        }));
        _events_engine.default.on($element, _click.name, (e => {
            e.stopPropagation()
        }))
    }
    _create() {
        const {
            editor: editor
        } = this;
        const $element = (0, _renderer.default)("<div>");
        this._addToContainer($element);
        const instance = editor._createComponent($element, _button2.default, (0, _extend.extend)({}, this.options, {
            ignoreParentReadOnly: true,
            disabled: this._isDisabled(),
            integrationOptions: this._prepareIntegrationOptions(editor)
        }));
        return {
            $element: $element,
            instance: instance
        }
    }
    _prepareIntegrationOptions(editor) {
        return (0, _extend.extend)({}, editor.option("integrationOptions"), {
            skipTemplates: ["content"]
        })
    }
    update() {
        const isUpdated = super.update();
        if (this.instance) {
            this.instance.option("disabled", this._isDisabled())
        }
        return isUpdated
    }
    _isVisible() {
        const {
            editor: editor
        } = this;
        return editor.option("visible")
    }
    _isDisabled() {
        const isDefinedByUser = void 0 !== this.options.disabled;
        if (isDefinedByUser) {
            return this.instance ? this.instance.option("disabled") : this.options.disabled
        } else {
            return this.editor.option("readOnly")
        }
    }
}
exports.default = CustomButton;
module.exports = exports.default;
module.exports.default = exports.default;
