/**
 * DevExtreme (cjs/ui/file_manager/ui.file_manager.dialog.delete_item.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _message = _interopRequireDefault(require("../../localization/message"));
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _uiFile_manager = _interopRequireDefault(require("./ui.file_manager.dialog"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const FILE_MANAGER_DIALOG_DELETE_ITEM = "dx-filemanager-dialog-delete-item";
const FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP = "dx-filemanager-dialog-delete-item-popup";
class FileManagerDeleteItemDialog extends _uiFile_manager.default {
    show(_ref) {
        let {
            itemName: itemName,
            itemCount: itemCount
        } = _ref;
        const text = 1 === itemCount ? _message.default.format("dxFileManager-dialogDeleteItemSingleItemConfirmation", itemName) : _message.default.format("dxFileManager-dialogDeleteItemMultipleItemsConfirmation", itemCount);
        if (this._$text) {
            this._$text.text(text)
        } else {
            this._initialText = text
        }
        super.show()
    }
    _getDialogOptions() {
        return (0, _extend.extend)(super._getDialogOptions(), {
            title: _message.default.format("dxFileManager-dialogDeleteItemTitle"),
            buttonText: _message.default.format("dxFileManager-dialogDeleteItemButtonText"),
            contentCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM,
            popupCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP,
            height: "auto",
            maxHeight: "80vh"
        })
    }
    _createContentTemplate(element) {
        super._createContentTemplate(element);
        this._$text = (0, _renderer.default)("<div>").text(this._initialText).appendTo(this._$contentElement);
        this._createComponent(this._$contentElement, _scroll_view.default, {
            width: "100%",
            height: "100%"
        })
    }
    _getDialogResult() {
        return {}
    }
}
var _default = exports.default = FileManagerDeleteItemDialog;
module.exports = exports.default;
module.exports.default = exports.default;
