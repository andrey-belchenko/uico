/**
 * DevExtreme (cjs/ui/text_box/texteditor_button_collection/button.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class TextEditorButton {
    constructor(name, editor, options) {
        this.instance = null;
        this.$container = null;
        this.$placeMarker = null;
        this.editor = editor;
        this.name = name;
        this.options = options || {}
    }
    _addPlaceMarker($container) {
        this.$placeMarker = (0, _renderer.default)("<div>").appendTo($container)
    }
    _addToContainer($element) {
        const {
            $placeMarker: $placeMarker,
            $container: $container
        } = this;
        $placeMarker ? $placeMarker.replaceWith($element) : $element.appendTo($container)
    }
    _attachEvents() {
        throw "Not implemented"
    }
    _create() {
        throw "Not implemented"
    }
    _isRendered() {
        return !!this.instance
    }
    _isVisible() {
        const {
            editor: editor,
            options: options
        } = this;
        return options.visible || !editor.option("readOnly")
    }
    _isDisabled() {
        throw "Not implemented"
    }
    _shouldRender() {
        return this._isVisible() && !this._isRendered()
    }
    dispose() {
        const {
            instance: instance,
            $placeMarker: $placeMarker
        } = this;
        if (instance) {
            instance.dispose ? instance.dispose() : instance.remove();
            this.instance = null
        }
        $placeMarker && $placeMarker.remove()
    }
    render() {
        let $container = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.$container;
        this.$container = $container;
        if (this._isVisible()) {
            const {
                instance: instance,
                $element: $element
            } = this._create();
            this.instance = instance;
            this._attachEvents(instance, $element)
        } else {
            this._addPlaceMarker($container)
        }
    }
    update() {
        if (this._shouldRender()) {
            this.render()
        }
        return !!this.instance
    }
}
exports.default = TextEditorButton;
module.exports = exports.default;
module.exports.default = exports.default;
