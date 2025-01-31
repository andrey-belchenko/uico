/**
 * DevExtreme (cjs/ui/html_editor/modules/popup.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../../core/utils/size");
var _dpt-uiQuill = _interopRequireDefault(require("dpt-ui-quill"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _window = require("../../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _index = require("../../../events/utils/index");
var _base = _interopRequireDefault(require("./base"));
var _popup = _interopRequireDefault(require("../../popup"));
var _list_light = _interopRequireDefault(require("../../list_light"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const MODULE_NAMESPACE = "dxHtmlEditorPopupModule";
let ListPopupModule = _base.default;
if (_dpt-uiQuill.default) {
    const SUGGESTION_LIST_CLASS = "dx-suggestion-list";
    const SUGGESTION_LIST_WRAPPER_CLASS = "dx-suggestion-list-wrapper";
    const DROPDOWN_EDITOR_OVERLAY_CLASS = "dx-dropdowneditor-overlay";
    const MIN_HEIGHT = 100;
    ListPopupModule = class extends _base.default {
        _getDefaultOptions() {
            return {
                dataSource: null
            }
        }
        constructor(quill, options) {
            super(quill, options);
            this.options = (0, _extend.extend)({}, this._getDefaultOptions(), options);
            this._popup = this.renderPopup();
            this._popup.$wrapper().addClass(`${SUGGESTION_LIST_WRAPPER_CLASS} ${DROPDOWN_EDITOR_OVERLAY_CLASS}`);
            this._renderPreventFocusOut()
        }
        renderList($container, options) {
            const $list = (0, _renderer.default)("<div>").addClass(SUGGESTION_LIST_CLASS).appendTo($container);
            this._list = this.options.editorInstance._createComponent($list, _list_light.default, options)
        }
        renderPopup() {
            const editorInstance = this.options.editorInstance;
            const $container = (0, _renderer.default)("<div>").appendTo(editorInstance.$element());
            const popupConfig = this._getPopupConfig();
            return editorInstance._createComponent($container, _popup.default, popupConfig)
        }
        _getPopupConfig() {
            return {
                contentTemplate: contentElem => {
                    const listConfig = this._getListConfig(this.options);
                    this.renderList((0, _renderer.default)(contentElem), listConfig)
                },
                deferRendering: false,
                onShown: () => {
                    this._list.focus()
                },
                onHidden: () => {
                    this._list.unselectAll();
                    this._list.option("focusedElement", null)
                },
                showTitle: false,
                width: "auto",
                height: "auto",
                shading: false,
                hideOnParentScroll: true,
                hideOnOutsideClick: true,
                animation: {
                    show: {
                        type: "fade",
                        duration: 0,
                        from: 0,
                        to: 1
                    },
                    hide: {
                        type: "fade",
                        duration: 400,
                        from: 1,
                        to: 0
                    }
                },
                fullScreen: false,
                maxHeight: this.maxHeight
            }
        }
        _getListConfig(options) {
            return {
                dataSource: options.dataSource,
                onSelectionChanged: this.selectionChangedHandler.bind(this),
                selectionMode: "single",
                pageLoadMode: "scrollBottom"
            }
        }
        get maxHeight() {
            const window = (0, _window.getWindow)();
            const windowHeight = window && (0, _size.getHeight)(window) || 0;
            return Math.max(MIN_HEIGHT, .5 * windowHeight)
        }
        selectionChangedHandler(e) {
            if (this._popup.option("visible")) {
                this._popup.hide();
                this.insertEmbedContent(e)
            }
        }
        _renderPreventFocusOut() {
            const eventName = (0, _index.addNamespace)("mousedown", MODULE_NAMESPACE);
            _events_engine.default.on(this._popup.$wrapper(), eventName, (e => {
                e.preventDefault()
            }))
        }
        insertEmbedContent(selectionChangedEvent) {}
        showPopup() {
            this._popup && this._popup.show()
        }
        savePosition(position) {
            this.caretPosition = position
        }
        getPosition() {
            return this.caretPosition
        }
    }
}
var _default = exports.default = ListPopupModule;
module.exports = exports.default;
module.exports.default = exports.default;
