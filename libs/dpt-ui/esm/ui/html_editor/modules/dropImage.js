/**
 * DevExtreme (esm/ui/html_editor/modules/dropImage.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Quill from "dpt-ui-quill";
import eventsEngine from "../../../events/core/events_engine";
import {
    addNamespace
} from "../../../events/utils/index";
import {
    each
} from "../../../core/utils/iterator";
import browser from "../../../core/utils/browser";
import {
    getWindow
} from "../../../core/utils/window";
import BaseModule from "./base";
let DropImageModule = BaseModule;
if (Quill) {
    DropImageModule = class extends BaseModule {
        constructor(quill, options) {
            super(quill, options);
            const widgetName = this.editorInstance.NAME;
            eventsEngine.on(this.quill.root, addNamespace("drop", widgetName), this._dropHandler.bind(this));
            eventsEngine.on(this.quill.root, addNamespace("paste", widgetName), this._pasteHandler.bind(this))
        }
        _dropHandler(e) {
            var _dataTransfer$files;
            const dataTransfer = e.originalEvent.dataTransfer;
            const hasFiles = null === dataTransfer || void 0 === dataTransfer || null === (_dataTransfer$files = dataTransfer.files) || void 0 === _dataTransfer$files ? void 0 : _dataTransfer$files.length;
            this.saveValueChangeEvent(e);
            e.preventDefault();
            if (hasFiles) {
                this._getImage(dataTransfer.files, this._addImage.bind(this))
            }
        }
        _pasteHandler(e) {
            var _clipboardData$items;
            const {
                clipboardData: clipboardData
            } = e.originalEvent;
            this.saveValueChangeEvent(e);
            if (!clipboardData) {
                return
            }
            const hasDataItems = null === (_clipboardData$items = clipboardData.items) || void 0 === _clipboardData$items ? void 0 : _clipboardData$items.length;
            const isHtmlData = clipboardData.getData("text/html");
            if (!isHtmlData && hasDataItems) {
                this._getImage(clipboardData.items, (imageData => {
                    if (browser.mozilla) {
                        return
                    }
                    this._addImage(imageData)
                }))
            }
        }
        _isImage(file) {
            return !!file.type.match(/^image\/(a?png|bmp|gif|p?jpe?g|svg|vnd\.microsoft\.icon|webp)/i)
        }
        _getImage(files, callback) {
            const window = getWindow();
            each(files, ((index, file) => {
                if (!this._isImage(file)) {
                    return
                }
                const reader = new window.FileReader;
                reader.onload = _ref => {
                    let {
                        target: target
                    } = _ref;
                    callback(target.result)
                };
                const readableFile = file.getAsFile ? file.getAsFile() : file;
                if (readableFile instanceof window.Blob) {
                    reader.readAsDataURL(readableFile)
                }
            }))
        }
        _addImage(data) {
            const selection = this.quill.getSelection();
            const pasteIndex = selection ? selection.index : this.quill.getLength();
            this.quill.insertEmbed(pasteIndex, "extendedImage", data, "user")
        }
    }
}
export default DropImageModule;
