/**
 * DevExtreme (cjs/ui/text_box/texteditor_button_collection/index.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _custom = _interopRequireDefault(require("./custom"));
var _extend = require("../../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../widget/ui.errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const TEXTEDITOR_BUTTONS_CONTAINER_CLASS = "dx-texteditor-buttons-container";

function checkButtonInfo(buttonInfo) {
    (() => {
        if (!buttonInfo || "object" !== typeof buttonInfo || Array.isArray(buttonInfo)) {
            throw _ui.default.Error("E1053")
        }
    })();
    (() => {
        if (!("name" in buttonInfo)) {
            throw _ui.default.Error("E1054")
        }
    })();
    (() => {
        const {
            name: name
        } = buttonInfo;
        if ("string" !== typeof name) {
            throw _ui.default.Error("E1055")
        }
    })();
    (() => {
        const {
            location: location
        } = buttonInfo;
        if ("location" in buttonInfo && "after" !== location && "before" !== location) {
            buttonInfo.location = "after"
        }
    })()
}

function checkNamesUniqueness(existingNames, newName) {
    if (-1 !== existingNames.indexOf(newName)) {
        throw _ui.default.Error("E1055", newName)
    }
    existingNames.push(newName)
}

function isPredefinedButtonName(name, predefinedButtonsInfo) {
    return !!predefinedButtonsInfo.find((info => info.name === name))
}
class TextEditorButtonCollection {
    constructor(editor, defaultButtonsInfo) {
        this.buttons = [];
        this.defaultButtonsInfo = defaultButtonsInfo;
        this.editor = editor
    }
    _compileButtonInfo(buttons) {
        const names = [];
        return buttons.map((button => {
            const isStringButton = "string" === typeof button;
            if (!isStringButton) {
                checkButtonInfo(button)
            }
            const isDefaultButton = isStringButton || isPredefinedButtonName(button.name, this.defaultButtonsInfo);
            if (isDefaultButton) {
                const defaultButtonInfo = this.defaultButtonsInfo.find((_ref => {
                    let {
                        name: name
                    } = _ref;
                    return name === button || name === button.name
                }));
                if (!defaultButtonInfo) {
                    throw _ui.default.Error("E1056", this.editor.NAME, button)
                }
                checkNamesUniqueness(names, button);
                return defaultButtonInfo
            } else {
                const {
                    name: name
                } = button;
                checkNamesUniqueness(names, name);
                return (0, _extend.extend)(button, {
                    Ctor: _custom.default
                })
            }
        }))
    }
    _createButton(buttonsInfo) {
        const {
            Ctor: Ctor,
            options: options,
            name: name
        } = buttonsInfo;
        const button = new Ctor(name, this.editor, options);
        this.buttons.push(button);
        return button
    }
    _renderButtons(buttons, $container, targetLocation) {
        let $buttonsContainer = null;
        const buttonsInfo = buttons ? this._compileButtonInfo(buttons) : this.defaultButtonsInfo;
        buttonsInfo.forEach((buttonsInfo => {
            const {
                location: location = "after"
            } = buttonsInfo;
            if (location === targetLocation) {
                this._createButton(buttonsInfo).render((() => {
                    $buttonsContainer = $buttonsContainer || (0, _renderer.default)("<div>").addClass("dx-texteditor-buttons-container");
                    "before" === targetLocation ? $container.prepend($buttonsContainer) : $container.append($buttonsContainer);
                    return $buttonsContainer
                })())
            }
        }));
        return $buttonsContainer
    }
    clean() {
        this.buttons.forEach((button => button.dispose()));
        this.buttons = []
    }
    getButton(buttonName) {
        const button = this.buttons.find((_ref2 => {
            let {
                name: name
            } = _ref2;
            return name === buttonName
        }));
        return button && button.instance
    }
    renderAfterButtons(buttons, $container) {
        return this._renderButtons(buttons, $container, "after")
    }
    renderBeforeButtons(buttons, $container) {
        return this._renderButtons(buttons, $container, "before")
    }
    updateButtons(names) {
        this.buttons.forEach((button => {
            if (!names || -1 !== names.indexOf(button.name)) {
                button.update()
            }
        }))
    }
}
exports.default = TextEditorButtonCollection;
module.exports = exports.default;
module.exports.default = exports.default;
