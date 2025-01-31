/**
 * DevExtreme (esm/ui/html_editor/modules/mentions.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import Quill from "dpt-ui-quill";
import {
    compileGetter
} from "../../../core/utils/data";
import {
    isString
} from "../../../core/utils/type";
import {
    extend
} from "../../../core/utils/extend";
import {
    getPublicElement
} from "../../../core/element";
import eventsEngine from "../../../events/core/events_engine";
import BaseModule from "./base";
import PopupModule from "./popup";
import Mention from "../formats/mention";
let MentionModule = BaseModule;
if (Quill) {
    const USER_ACTION = "user";
    const DEFAULT_MARKER = "@";
    const KEYS = {
        ARROW_UP: "upArrow",
        ARROW_DOWN: "downArrow",
        ARROW_LEFT: "leftArrow",
        ARROW_RIGHT: "rightArrow",
        ENTER: "enter",
        ESCAPE: "escape",
        SPACE: "space",
        PAGE_UP: "pageUp",
        PAGE_DOWN: "pageDown",
        END: "end",
        HOME: "home"
    };
    const NAVIGATION_KEYS = [KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT, KEYS.PAGE_UP, KEYS.PAGE_DOWN, KEYS.END, KEYS.HOME];
    const ALLOWED_PREFIX_CHARS = [" ", "\n"];
    const DISABLED_STATE_CLASS = "dx-state-disabled";
    Quill.register({
        "formats/mention": Mention
    }, true);
    MentionModule = class extends PopupModule {
        _getDefaultOptions() {
            const baseConfig = super._getDefaultOptions();
            return extend(baseConfig, {
                itemTemplate: "item",
                valueExpr: "this",
                displayExpr: "this",
                template: null,
                searchExpr: null,
                searchTimeout: 500,
                minSearchLength: 0
            })
        }
        constructor(quill, options) {
            super(quill, options);
            this._mentions = {};
            options.mentions.forEach((item => {
                let marker = item.marker;
                if (!marker) {
                    item.marker = marker = DEFAULT_MARKER
                }
                const template = item.template;
                if (template) {
                    const preparedTemplate = this.editorInstance._getTemplate(template);
                    preparedTemplate && Mention.addTemplate({
                        marker: marker,
                        editorKey: this.editorInstance.getMentionKeyInTemplateStorage()
                    }, preparedTemplate)
                }
                this._mentions[marker] = extend({}, this._getDefaultOptions(), item)
            }));
            this._attachKeyboardHandlers();
            this.addCleanCallback(this.clean.bind(this));
            this.quill.on("text-change", this.onTextChange.bind(this))
        }
        _attachKeyboardHandlers() {
            this.quill.keyboard.addBinding({
                key: KEYS.ARROW_UP
            }, this._moveToItem.bind(this, "prev"));
            this.quill.keyboard.addBinding({
                key: KEYS.ARROW_DOWN
            }, this._moveToItem.bind(this, "next"));
            this.quill.keyboard.addBinding({
                key: [KEYS.ENTER, KEYS.SPACE]
            }, this._selectItemHandler.bind(this));
            const enterBindings = this.quill.keyboard.bindings[KEYS.ENTER];
            enterBindings.unshift(enterBindings.pop());
            this.quill.keyboard.addBinding({
                key: KEYS.ESCAPE
            }, this._escapeKeyHandler.bind(this));
            this.quill.keyboard.addBinding({
                key: [KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT],
                shiftKey: true
            }, this._ignoreKeyHandler.bind(this));
            this.quill.keyboard.addBinding({
                key: NAVIGATION_KEYS
            }, this._ignoreKeyHandler.bind(this))
        }
        _moveToItem(direction) {
            const dataSource = this._list.getDataSource();
            if (this._isMentionActive && !dataSource.isLoading()) {
                const $focusedItem = $(this._list.option("focusedElement"));
                const defaultItemPosition = "next" === direction ? "first" : "last";
                let $nextItem = $focusedItem[direction]();
                $nextItem = $nextItem.length ? $nextItem : this._activeListItems[defaultItemPosition]();
                this._list.option("focusedElement", getPublicElement($nextItem));
                this._list.scrollToItem($nextItem)
            }
            return !this._isMentionActive
        }
        _ignoreKeyHandler() {
            return !this._isMentionActive
        }
        _fitIntoRange(value, start, end) {
            if (value > end) {
                return start
            }
            if (value < start) {
                return end
            }
            return value
        }
        _selectItemHandler() {
            if (this._isMentionActive) {
                this._list.option("items").length ? this._list.selectItem(this._list.option("focusedElement")) : this._popup.hide()
            }
            return !this._isMentionActive
        }
        _escapeKeyHandler() {
            if (this._isMentionActive) {
                this._popup.hide()
            }
            return !this._isMentionActive
        }
        renderList($container, options) {
            this.compileGetters(this.options);
            super.renderList($container, options)
        }
        compileGetters(_ref) {
            let {
                displayExpr: displayExpr,
                valueExpr: valueExpr
            } = _ref;
            this._valueGetter = compileGetter(displayExpr);
            this._idGetter = compileGetter(valueExpr)
        }
        _getListConfig(options) {
            const baseConfig = super._getListConfig(options);
            return extend(baseConfig, {
                itemTemplate: this.options.itemTemplate,
                onContentReady: () => {
                    if (this._hasSearch) {
                        this._popup.repaint();
                        this._focusFirstElement();
                        this._hasSearch = false
                    }
                }
            })
        }
        insertEmbedContent() {
            const markerLength = this._activeMentionConfig.marker.length;
            const textLength = markerLength + this._searchValue.length;
            const caretPosition = this.getPosition();
            const selectedItem = this._list.option("selectedItem");
            const value = {
                value: this._valueGetter(selectedItem),
                id: this._idGetter(selectedItem),
                marker: this._activeMentionConfig.marker,
                keyInTemplateStorage: this.editorInstance.getMentionKeyInTemplateStorage()
            };
            const Delta = Quill.import("delta");
            const startIndex = Math.max(0, caretPosition - markerLength);
            const newDelta = (new Delta).retain(startIndex).delete(textLength).insert({
                mention: value
            }).insert(" ");
            this.quill.updateContents(newDelta);
            this.quill.setSelection(startIndex + 2)
        }
        _getLastInsertOperation(ops) {
            const lastOperation = ops[ops.length - 1];
            const isLastOperationInsert = "insert" in lastOperation;
            if (isLastOperationInsert) {
                return lastOperation
            }
            const isLastOperationDelete = "delete" in lastOperation;
            if (isLastOperationDelete && ops.length >= 2) {
                const penultOperation = ops[ops.length - 2];
                const isPenultOperationInsert = "insert" in penultOperation;
                const isSelectionReplacing = isLastOperationDelete && isPenultOperationInsert;
                if (isSelectionReplacing) {
                    return penultOperation
                }
            }
            return null
        }
        onTextChange(newDelta, oldDelta, source) {
            if (source === USER_ACTION) {
                const lastOperation = newDelta.ops[newDelta.ops.length - 1];
                if (this._isMentionActive && this._isPopupVisible) {
                    this._processSearchValue(lastOperation) && this._filterList(this._searchValue)
                } else {
                    const {
                        ops: ops
                    } = newDelta;
                    const lastInsertOperation = this._getLastInsertOperation(ops);
                    if (lastInsertOperation) {
                        this.checkMentionRequest(lastInsertOperation, ops)
                    }
                }
            }
        }
        get _isPopupVisible() {
            var _this$_popup;
            return null === (_this$_popup = this._popup) || void 0 === _this$_popup ? void 0 : _this$_popup.option("visible")
        }
        _processSearchValue(operation) {
            const isInsertOperation = "insert" in operation;
            if (isInsertOperation) {
                this._searchValue += operation.insert
            } else if (!this._searchValue.length || operation.delete > 1) {
                this._popup.hide();
                return false
            } else {
                this._searchValue = this._searchValue.slice(0, -1)
            }
            return true
        }
        checkMentionRequest(_ref2, ops) {
            let {
                insert: insert
            } = _ref2;
            const caret = this.quill.getSelection();
            if (!insert || !isString(insert) || !caret || this._isMarkerPartOfText(ops[0].retain)) {
                return
            }
            this._activeMentionConfig = this._mentions[insert];
            if (this._activeMentionConfig) {
                this._updateList(this._activeMentionConfig);
                const isOnNewLine = caret.index && "\n" === this._getCharByIndex(caret.index - 1);
                this.savePosition(caret.index + isOnNewLine);
                this._popup.option("position", this._popupPosition);
                this._searchValue = "";
                this._popup.show()
            }
        }
        _isMarkerPartOfText(retain) {
            if (!retain || -1 !== ALLOWED_PREFIX_CHARS.indexOf(this._getCharByIndex(retain - 1))) {
                return false
            }
            return true
        }
        _getCharByIndex(index) {
            return this.quill.getContents(index, 1).ops[0].insert
        }
        _updateList(_ref3) {
            let {
                dataSource: dataSource,
                displayExpr: displayExpr,
                valueExpr: valueExpr,
                itemTemplate: itemTemplate,
                searchExpr: searchExpr
            } = _ref3;
            this.compileGetters({
                displayExpr: displayExpr,
                valueExpr: valueExpr
            });
            this._list.unselectAll();
            this._list.option({
                dataSource: dataSource,
                displayExpr: displayExpr,
                itemTemplate: itemTemplate,
                searchExpr: searchExpr
            })
        }
        _filterList(searchValue) {
            if (!this._isMinSearchLengthExceeded(searchValue)) {
                this._resetFilter();
                return
            }
            const searchTimeout = this._activeMentionConfig.searchTimeout;
            if (searchTimeout) {
                clearTimeout(this._searchTimer);
                this._searchTimer = setTimeout((() => {
                    this._search(searchValue)
                }), searchTimeout)
            } else {
                this._search(searchValue)
            }
        }
        _isMinSearchLengthExceeded(searchValue) {
            return searchValue.length >= this._activeMentionConfig.minSearchLength
        }
        _resetFilter() {
            clearTimeout(this._searchTimer);
            this._search(null)
        }
        _search(searchValue) {
            this._hasSearch = true;
            this._list.option("searchValue", searchValue)
        }
        _focusFirstElement() {
            if (!this._list) {
                return
            }
            const $firstItem = this._activeListItems.first();
            this._list.option("focusedElement", getPublicElement($firstItem));
            this._list.scrollToItem($firstItem)
        }
        _toggleActiveDescendant(shown) {
            if (shown) {
                const ariaId = this._list.getFocusedItemId();
                this.quill.root.setAttribute("aria-activedescendant", ariaId)
            } else {
                this.quill.root.removeAttribute("aria-activedescendant")
            }
        }
        get _popupPosition() {
            const position = this.getPosition();
            const {
                left: mentionLeft,
                top: mentionTop,
                height: mentionHeight
            } = this.quill.getBounds(position ? position - 1 : position);
            const {
                left: leftOffset,
                top: topOffset
            } = $(this.quill.root).offset();
            const positionEvent = eventsEngine.Event("positionEvent", {
                pageX: leftOffset + mentionLeft,
                pageY: topOffset + mentionTop
            });
            return {
                of: positionEvent,
                offset: {
                    v: mentionHeight
                },
                my: "top left",
                at: "top left",
                collision: {
                    y: "flip",
                    x: "flipfit"
                }
            }
        }
        _getPopupConfig() {
            return extend(super._getPopupConfig(), {
                hideOnParentScroll: false,
                onShown: () => {
                    this._toggleActiveDescendant(true);
                    this._isMentionActive = true;
                    this._hasSearch = false;
                    this._focusFirstElement()
                },
                onHidden: () => {
                    this._toggleActiveDescendant(false);
                    this._list.unselectAll();
                    this._list.option("focusedElement", null);
                    this._isMentionActive = false;
                    this._search(null)
                },
                focusStateEnabled: false
            })
        }
        get _activeListItems() {
            return this._list.itemElements().filter(`:not(.${DISABLED_STATE_CLASS})`)
        }
        clean() {
            Object.keys(this._mentions).forEach((marker => {
                if (this._mentions[marker].template) {
                    Mention.removeTemplate({
                        marker: marker,
                        editorKey: this.editorInstance.getMentionKeyInTemplateStorage()
                    })
                }
            }))
        }
    }
}
export default MentionModule;
