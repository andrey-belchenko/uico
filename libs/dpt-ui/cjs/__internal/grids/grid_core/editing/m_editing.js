/**
 * DevExtreme (cjs/__internal/grids/grid_core/editing/m_editing.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editingModule = exports.dataControllerEditingExtenderMixin = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _dom = require("../../../../core/utils/dom");
var _extend = require("../../../../core/utils/extend");
var iconUtils = _interopRequireWildcard(require("../../../../core/utils/icon"));
var _iterator = require("../../../../core/utils/iterator");
var _object = require("../../../../core/utils/object");
var _type = require("../../../../core/utils/type");
var _array_utils = require("../../../../data/array_utils");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _remove = require("../../../../events/remove");
var _index = require("../../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _dialog = require("../../../../ui/dialog");
var _themes = require("../../../../ui/themes");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");
var _m_editing_utils = require("./m_editing_utils");

function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) {
        return null
    }
    var r = new WeakMap,
        t = new WeakMap;
    return (_getRequireWildcardCache = function(e) {
        return e ? t : r
    })(e)
}

function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) {
        return e
    }
    if (null === e || "object" != typeof e && "function" != typeof e) {
        return {
            default: e
        }
    }
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) {
        return t.get(e)
    }
    var n = {
            __proto__: null
        },
        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e) {
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
            var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
            i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]
        }
    }
    return n.default = e, t && t.set(e, n), n
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
class EditingControllerImpl extends _m_modules.default.ViewController {
    init() {
        this._columnsController = this.getController("columns");
        this._dataController = this.getController("data");
        this._adaptiveColumnsController = this.getController("adaptiveColumns");
        this._validatingController = this.getController("validating");
        this._editorFactoryController = this.getController("editorFactory");
        this._focusController = this.getController("focus");
        this._keyboardNavigationController = this.getController("keyboardNavigation");
        this._columnsResizerController = this.getController("columnsResizer");
        this._errorHandlingController = this.getController("errorHandling");
        this._rowsView = this.getView("rowsView");
        this._headerPanelView = this.getView("headerPanel");
        this._lastOperation = null;
        this._changes = [];
        if (this._deferreds) {
            this._deferreds.forEach((d => {
                d.reject("cancel")
            }))
        }
        this._deferreds = [];
        if (!this._dataChangedHandler) {
            this._dataChangedHandler = this._handleDataChanged.bind(this);
            this._dataController.changed.add(this._dataChangedHandler)
        }
        if (!this._saveEditorHandler) {
            this.createAction("onInitNewRow", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onRowInserting", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onRowInserted", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onEditingStart", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onRowUpdating", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onRowUpdated", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onRowRemoving", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onRowRemoved", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onSaved", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onSaving", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onEditCanceling", {
                excludeValidators: ["disabled", "readOnly"]
            });
            this.createAction("onEditCanceled", {
                excludeValidators: ["disabled", "readOnly"]
            })
        }
        this._updateEditColumn();
        this._updateEditButtons();
        if (!this._internalState) {
            this._internalState = []
        }
        this.component._optionsByReference[_const.EDITING_EDITROWKEY_OPTION_NAME] = true;
        this.component._optionsByReference[_const.EDITING_CHANGES_OPTION_NAME] = true
    }
    getEditMode() {
        const editMode = this.option("editing.mode") ?? _const.EDIT_MODE_ROW;
        if (_const.EDIT_MODES.includes(editMode)) {
            return editMode
        }
        return _const.EDIT_MODE_ROW
    }
    isCellBasedEditMode() {
        const editMode = this.getEditMode();
        return _const.CELL_BASED_MODES.includes(editMode)
    }
    _getDefaultEditorTemplate() {
        return (container, options) => {
            const $editor = (0, _renderer.default)("<div>").appendTo(container);
            const editorOptions = (0, _extend.extend)({}, options.column, {
                value: options.value,
                setValue: options.setValue,
                row: options.row,
                parentType: "dataRow",
                width: null,
                readOnly: !options.setValue,
                isOnForm: options.isOnForm,
                id: options.id
            });
            const needLabel = _const.REQUIRED_EDITOR_LABELLEDBY_MODES.includes(this.getEditMode());
            if (needLabel) {
                editorOptions["aria-labelledby"] = options.column.headerId
            }
            this._editorFactoryController.createEditor($editor, editorOptions)
        }
    }
    _getNewRowPosition() {
        const newRowPosition = this.option("editing.newRowPosition");
        const scrollingMode = this.option("scrolling.mode");
        if ("virtual" === scrollingMode) {
            switch (newRowPosition) {
                case _const.PAGE_TOP_NEW_ROW_POSITION:
                    return _const.VIEWPORT_TOP_NEW_ROW_POSITION;
                case _const.PAGE_BOTTOM_NEW_ROW_POSITION:
                    return _const.VIEWPORT_BOTTOM_NEW_ROW_POSITION;
                default:
                    return newRowPosition
            }
        }
        return newRowPosition
    }
    getChanges() {
        return this.option(_const.EDITING_CHANGES_OPTION_NAME)
    }
    getInsertRowCount() {
        const changes = this.option(_const.EDITING_CHANGES_OPTION_NAME);
        return changes.filter((change => "insert" === change.type)).length
    }
    resetChanges() {
        const changes = this.getChanges();
        const needReset = null === changes || void 0 === changes ? void 0 : changes.length;
        if (needReset) {
            this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, [])
        }
    }
    _getInternalData(key) {
        return this._internalState.filter((item => (0, _common.equalByValue)(item.key, key)))[0]
    }
    _addInternalData(params) {
        const internalData = this._getInternalData(params.key);
        if (internalData) {
            return (0, _extend.extend)(internalData, params)
        }
        this._internalState.push(params);
        return params
    }
    _getOldData(key) {
        var _this$_getInternalDat;
        return null === (_this$_getInternalDat = this._getInternalData(key)) || void 0 === _this$_getInternalDat ? void 0 : _this$_getInternalDat.oldData
    }
    getUpdatedData(data) {
        const key = this._dataController.keyOf(data);
        const changes = this.getChanges();
        const editIndex = _m_utils.default.getIndexByKey(key, changes);
        if (changes[editIndex]) {
            return (0, _array_utils.createObjectWithChanges)(data, changes[editIndex].data)
        }
        return data
    }
    getInsertedData() {
        return this.getChanges().filter((change => change.data && change.type === _const.DATA_EDIT_DATA_INSERT_TYPE)).map((change => change.data))
    }
    getRemovedData() {
        return this.getChanges().filter((change => this._getOldData(change.key) && change.type === _const.DATA_EDIT_DATA_REMOVE_TYPE)).map((change => this._getOldData(change.key)))
    }
    _fireDataErrorOccurred(arg) {
        if ("cancel" === arg) {
            return
        }
        const $popupContent = this.getPopupContent();
        this._dataController.dataErrorOccurred.fire(arg, $popupContent)
    }
    _needToCloseEditableCell($targetElement) {}
    _closeEditItem($targetElement) {}
    _handleDataChanged(args) {}
    _isDefaultButtonVisible(button, options) {
        let result = true;
        switch (button.name) {
            case "delete":
                result = this.allowDeleting(options);
                break;
            case "undelete":
                result = false
        }
        return result
    }
    _isButtonVisible(button, options) {
        const {
            visible: visible
        } = button;
        if (!(0, _type.isDefined)(visible)) {
            return this._isDefaultButtonVisible(button, options)
        }
        return (0, _type.isFunction)(visible) ? visible.call(button, {
            component: options.component,
            row: options.row,
            column: options.column
        }) : visible
    }
    _isButtonDisabled(button, options) {
        const {
            disabled: disabled
        } = button;
        return (0, _type.isFunction)(disabled) ? disabled.call(button, {
            component: options.component,
            row: options.row,
            column: options.column
        }) : !!disabled
    }
    _getButtonConfig(button, options) {
        const config = (0, _type.isObject)(button) ? button : {};
        const buttonName = (0, _m_editing_utils.getButtonName)(button);
        const editingTexts = (0, _m_editing_utils.getEditingTexts)(options);
        const methodName = _const.METHOD_NAMES[buttonName];
        const editingOptions = this.option("editing");
        const actionName = _const.ACTION_OPTION_NAMES[buttonName];
        const allowAction = actionName ? editingOptions[actionName] : true;
        return (0, _extend.extend)({
            name: buttonName,
            text: editingTexts[buttonName],
            cssClass: _const.EDIT_LINK_CLASS[buttonName]
        }, {
            onClick: methodName && (e => {
                const {
                    event: event
                } = e;
                event.stopPropagation();
                event.preventDefault();
                setTimeout((() => {
                    options.row && allowAction && this[methodName] && this[methodName](options.row.rowIndex)
                }))
            })
        }, config)
    }
    _getEditingButtons(options) {
        let buttonIndex;
        const haveCustomButtons = !!options.column.buttons;
        let buttons = (options.column.buttons || []).slice();
        if (haveCustomButtons) {
            buttonIndex = (0, _m_editing_utils.getButtonIndex)(buttons, "edit");
            if (buttonIndex >= 0) {
                if ((0, _m_editing_utils.getButtonIndex)(buttons, "save") < 0) {
                    buttons.splice(buttonIndex + 1, 0, "save")
                }
                if ((0, _m_editing_utils.getButtonIndex)(buttons, "cancel") < 0) {
                    buttons.splice((0, _m_editing_utils.getButtonIndex)(buttons, "save") + 1, 0, "cancel")
                }
            }
            buttonIndex = (0, _m_editing_utils.getButtonIndex)(buttons, "delete");
            if (buttonIndex >= 0 && (0, _m_editing_utils.getButtonIndex)(buttons, "undelete") < 0) {
                buttons.splice(buttonIndex + 1, 0, "undelete")
            }
        } else {
            buttons = _const.BUTTON_NAMES.slice()
        }
        return buttons.map((button => this._getButtonConfig(button, options)))
    }
    _renderEditingButtons($container, buttons, options, change) {
        buttons.forEach((button => {
            if (this._isButtonVisible(button, options)) {
                this._createButton($container, button, options, change)
            }
        }))
    }
    _getEditCommandCellTemplate() {
        return (container, options, change) => {
            const $container = (0, _renderer.default)(container);
            if ("data" === options.rowType) {
                const buttons = this._getEditingButtons(options);
                this._renderEditingButtons($container, buttons, options, change);
                if (options.watch) {
                    const dispose = options.watch((() => buttons.map((button => ({
                        visible: this._isButtonVisible(button, options),
                        disabled: this._isButtonDisabled(button, options)
                    })))), (() => {
                        $container.empty();
                        this._renderEditingButtons($container, buttons, options)
                    }));
                    _events_engine.default.on($container, _remove.removeEvent, dispose)
                }
            } else {
                _m_utils.default.setEmptyText($container)
            }
        }
    }
    isRowBasedEditMode() {
        const editMode = this.getEditMode();
        return _const.ROW_BASED_MODES.includes(editMode)
    }
    getFirstEditableColumnIndex() {
        let columnIndex;
        const visibleColumns = this._columnsController.getVisibleColumns();
        (0, _iterator.each)(visibleColumns, ((index, column) => {
            if (column.allowEditing) {
                columnIndex = index;
                return false
            }
        }));
        return columnIndex
    }
    getFirstEditableCellInRow(rowIndex) {
        var _this$_rowsView;
        const columnIndex = this.getFirstEditableColumnIndex();
        return null === (_this$_rowsView = this._rowsView) || void 0 === _this$_rowsView ? void 0 : _this$_rowsView._getCellElement(rowIndex || 0, columnIndex)
    }
    getFocusedCellInRow(rowIndex) {
        return this.getFirstEditableCellInRow(rowIndex)
    }
    getIndexByKey(key, items) {
        return _m_utils.default.getIndexByKey(key, items)
    }
    hasChanges(rowIndex) {
        const changes = this.getChanges();
        let result = false;
        for (let i = 0; i < (null === changes || void 0 === changes ? void 0 : changes.length); i++) {
            if (changes[i].type && (!(0, _type.isDefined)(rowIndex) || this._dataController.getRowIndexByKey(changes[i].key) === rowIndex)) {
                result = true;
                break
            }
        }
        return result
    }
    dispose() {
        super.dispose();
        clearTimeout(this._inputFocusTimeoutID);
        _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.up, this._pointerUpEditorHandler);
        _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.down, this._pointerDownEditorHandler);
        _events_engine.default.off(_dom_adapter.default.getDocument(), _click.name, this._saveEditorHandler)
    }
    _silentOption(name, value) {
        if ("editing.changes" === name) {
            this._changes = (0, _object.deepExtendArraySafe)([], value)
        }
        super._silentOption(name, value)
    }
    optionChanged(args) {
        if ("editing" === args.name) {
            const {
                fullName: fullName
            } = args;
            if (fullName === _const.EDITING_EDITROWKEY_OPTION_NAME) {
                this._handleEditRowKeyChange(args)
            } else if (fullName === _const.EDITING_CHANGES_OPTION_NAME) {
                const isEqual = (0, _common.equalByValue)(args.value, this._changes, {
                    maxDepth: 4
                });
                if (!isEqual) {
                    this._changes = (0, _object.deepExtendArraySafe)([], args.value);
                    this._handleChangesChange(args)
                }
            } else if (!args.handled) {
                this._columnsController.reinit();
                this.init();
                this.resetChanges();
                this._resetEditColumnName();
                this._resetEditRowKey()
            }
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
    _handleEditRowKeyChange(args) {
        const rowIndex = this._dataController.getRowIndexByKey(args.value);
        const oldRowIndexCorrection = this._getEditRowIndexCorrection();
        const oldRowIndex = this._dataController.getRowIndexByKey(args.previousValue) + oldRowIndexCorrection;
        if ((0, _type.isDefined)(args.value)) {
            if (args.value !== args.previousValue) {
                this._editRowFromOptionChanged(rowIndex, oldRowIndex)
            }
        } else {
            this.cancelEditData()
        }
    }
    _handleChangesChange(args) {
        const dataController = this._dataController;
        const changes = args.value;
        if (!args.value.length && !args.previousValue.length) {
            return
        }
        changes.forEach((change => {
            if ("insert" === change.type) {
                this._addInsertInfo(change)
            } else {
                var _dataController$items;
                const items = dataController.getCachedStoreData() || (null === (_dataController$items = dataController.items()) || void 0 === _dataController$items ? void 0 : _dataController$items.map((item => item.data)));
                const rowIndex = _m_utils.default.getIndexByKey(change.key, items, dataController.key());
                this._addInternalData({
                    key: change.key,
                    oldData: items[rowIndex]
                })
            }
        }));
        dataController.updateItems({
            repaintChangesOnly: true,
            isLiveUpdate: false,
            isOptionChanged: true
        })
    }
    publicMethods() {
        return ["addRow", "deleteRow", "undeleteRow", "editRow", "saveEditData", "cancelEditData", "hasEditData"]
    }
    refresh() {
        if (!(0, _type.isDefined)(this._pageIndex)) {
            return
        }
        this._refreshCore.apply(this, arguments)
    }
    _refreshCore(params) {}
    isEditing() {
        const isEditRowKeyDefined = (0, _type.isDefined)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME));
        return isEditRowKeyDefined
    }
    isEditRow(rowIndex) {
        return false
    }
    _setEditRowKey(value, silent) {
        if (silent) {
            this._silentOption(_const.EDITING_EDITROWKEY_OPTION_NAME, value)
        } else {
            this.option(_const.EDITING_EDITROWKEY_OPTION_NAME, value)
        }
        if (this._refocusEditCell) {
            this._refocusEditCell = false;
            this._focusEditingCell()
        }
    }
    _setEditRowKeyByIndex(rowIndex, silent) {
        const key = this._dataController.getKeyByRowIndex(rowIndex);
        if (void 0 === key) {
            this._dataController.fireError("E1043");
            return
        }
        this._setEditRowKey(key, silent)
    }
    getEditRowIndex() {
        return this._getVisibleEditRowIndex()
    }
    getEditFormRowIndex() {
        return -1
    }
    isEditRowByIndex(rowIndex) {
        const key = this._dataController.getKeyByRowIndex(rowIndex);
        const isKeyEqual = (0, _type.isDefined)(key) && (0, _common.equalByValue)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME), key);
        if (isKeyEqual) {
            return this._getVisibleEditRowIndex() === rowIndex
        }
        return isKeyEqual
    }
    isEditCell(visibleRowIndex, columnIndex) {
        return this.isEditRowByIndex(visibleRowIndex) && this._getVisibleEditColumnIndex() === columnIndex
    }
    getPopupContent() {}
    _isProcessedItem(item) {
        return false
    }
    _getInsertRowIndex(items, change, isProcessedItems) {
        let result = -1;
        const dataController = this._dataController;
        const key = this._getInsertAfterOrBeforeKey(change);
        if (!(0, _type.isDefined)(key) && 0 === items.length) {
            result = 0
        } else if ((0, _type.isDefined)(key)) {
            items.some(((item, index) => {
                const isProcessedItem = isProcessedItems || this._isProcessedItem(item);
                if ((0, _type.isObject)(item)) {
                    if (isProcessedItem || (0, _type.isDefined)(item[_const.INSERT_INDEX])) {
                        if ((0, _common.equalByValue)(item.key, key)) {
                            result = index
                        }
                    } else if ((0, _common.equalByValue)(dataController.keyOf(item), key)) {
                        result = index
                    }
                }
                if (result >= 0) {
                    const nextItem = items[result + 1];
                    if (nextItem && ("detail" === nextItem.rowType || "detailAdaptive" === nextItem.rowType) && (0, _type.isDefined)(change.insertAfterKey)) {
                        return
                    }
                    if ((0, _type.isDefined)(change.insertAfterKey)) {
                        result += 1
                    }
                    return true
                }
            }))
        }
        return result
    }
    _generateNewItem(key) {
        var _this$_getInternalDat2;
        const item = {
            key: key
        };
        const insertInfo = null === (_this$_getInternalDat2 = this._getInternalData(key)) || void 0 === _this$_getInternalDat2 ? void 0 : _this$_getInternalDat2.insertInfo;
        if (null !== insertInfo && void 0 !== insertInfo && insertInfo[_const.INSERT_INDEX]) {
            item[_const.INSERT_INDEX] = insertInfo[_const.INSERT_INDEX]
        }
        return item
    }
    _getLoadedRowIndex(items, change, isProcessedItems) {
        let loadedRowIndex = this._getInsertRowIndex(items, change, isProcessedItems);
        const dataController = this._dataController;
        if (loadedRowIndex < 0) {
            const newRowPosition = this._getNewRowPosition();
            const pageIndex = dataController.pageIndex();
            const insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
            if (newRowPosition !== _const.LAST_NEW_ROW_POSITION && 0 === pageIndex && !(0, _type.isDefined)(insertAfterOrBeforeKey)) {
                loadedRowIndex = 0
            } else if (newRowPosition === _const.LAST_NEW_ROW_POSITION && dataController.isLastPageLoaded()) {
                loadedRowIndex = items.length
            }
        }
        return loadedRowIndex
    }
    processItems(items, e) {
        const {
            changeType: changeType
        } = e;
        this.update(changeType);
        const changes = this.getChanges();
        changes.forEach((change => {
            var _this$_getInternalDat3;
            const isInsert = change.type === _const.DATA_EDIT_DATA_INSERT_TYPE;
            if (!isInsert) {
                return
            }
            let {
                key: key
            } = change;
            let insertInfo = null === (_this$_getInternalDat3 = this._getInternalData(key)) || void 0 === _this$_getInternalDat3 ? void 0 : _this$_getInternalDat3.insertInfo;
            if (!(0, _type.isDefined)(key) || !(0, _type.isDefined)(insertInfo)) {
                insertInfo = this._addInsertInfo(change);
                key = insertInfo.key
            }
            const loadedRowIndex = this._getLoadedRowIndex(items, change);
            const item = this._generateNewItem(key);
            if (loadedRowIndex >= 0) {
                items.splice(loadedRowIndex, 0, item)
            }
        }));
        return items
    }
    processDataItem(item, options, generateDataValues) {
        const columns = options.visibleColumns;
        const key = item.data[_const.INSERT_INDEX] ? item.data.key : item.key;
        const changes = this.getChanges();
        const editIndex = _m_utils.default.getIndexByKey(key, changes);
        item.isEditing = false;
        if (editIndex >= 0) {
            this._processDataItemCore(item, changes[editIndex], key, columns, generateDataValues)
        }
    }
    _processDataItemCore(item, change, key, columns, generateDataValues) {
        const {
            data: data,
            type: type
        } = change;
        switch (type) {
            case _const.DATA_EDIT_DATA_INSERT_TYPE:
                item.isNewRow = true;
                item.key = key;
                item.data = data;
                break;
            case _const.DATA_EDIT_DATA_UPDATE_TYPE:
                item.modified = true;
                item.oldData = item.data;
                item.data = (0, _array_utils.createObjectWithChanges)(item.data, data);
                item.modifiedValues = generateDataValues(data, columns, true);
                break;
            case _const.DATA_EDIT_DATA_REMOVE_TYPE:
                item.removed = true
        }
    }
    _initNewRow(options) {
        this.executeAction("onInitNewRow", options);
        if (options.promise) {
            const deferred = new _deferred.Deferred;
            (0, _deferred.when)((0, _deferred.fromPromise)(options.promise)).done(deferred.resolve).fail((0, _m_editing_utils.createFailureHandler)(deferred)).fail((arg => this._fireDataErrorOccurred(arg)));
            return deferred
        }
    }
    _createInsertInfo() {
        const insertInfo = {};
        insertInfo[_const.INSERT_INDEX] = this._getInsertIndex();
        return insertInfo
    }
    _addInsertInfo(change, parentKey) {
        var _this$_getInternalDat4;
        let insertInfo;
        change.key = this.getChangeKeyValue(change);
        const {
            key: key
        } = change;
        insertInfo = null === (_this$_getInternalDat4 = this._getInternalData(key)) || void 0 === _this$_getInternalDat4 ? void 0 : _this$_getInternalDat4.insertInfo;
        if (!(0, _type.isDefined)(insertInfo)) {
            const insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
            insertInfo = this._createInsertInfo();
            if (!(0, _type.isDefined)(insertAfterOrBeforeKey)) {
                this._setInsertAfterOrBeforeKey(change, parentKey)
            }
        }
        this._addInternalData({
            insertInfo: insertInfo,
            key: key
        });
        return {
            insertInfo: insertInfo,
            key: key
        }
    }
    getChangeKeyValue(change) {
        if ((0, _type.isDefined)(change.key)) {
            return change.key
        }
        const keyExpr = this._dataController.key();
        let keyValue;
        if (change.data && keyExpr && !Array.isArray(keyExpr)) {
            keyValue = change.data[keyExpr]
        }
        if (!(0, _type.isDefined)(keyValue)) {
            keyValue = (0, _m_editing_utils.generateNewRowTempKey)()
        }
        return keyValue
    }
    _setInsertAfterOrBeforeKey(change, parentKey) {
        const rowsView = this.getView("rowsView");
        const dataController = this._dataController;
        const allItems = dataController.items(true);
        const newRowPosition = this._getNewRowPosition();
        switch (newRowPosition) {
            case _const.FIRST_NEW_ROW_POSITION:
            case _const.LAST_NEW_ROW_POSITION:
                break;
            case _const.PAGE_TOP_NEW_ROW_POSITION:
            case _const.PAGE_BOTTOM_NEW_ROW_POSITION:
                if (allItems.length) {
                    const itemIndex = newRowPosition === _const.PAGE_TOP_NEW_ROW_POSITION ? 0 : allItems.length - 1;
                    change[0 === itemIndex ? "insertBeforeKey" : "insertAfterKey"] = allItems[itemIndex].key
                }
                break;
            default: {
                const isViewportBottom = newRowPosition === _const.VIEWPORT_BOTTOM_NEW_ROW_POSITION;
                let visibleItemIndex = isViewportBottom ? null === rowsView || void 0 === rowsView ? void 0 : rowsView.getBottomVisibleItemIndex() : null === rowsView || void 0 === rowsView ? void 0 : rowsView.getTopVisibleItemIndex();
                const row = dataController.getVisibleRows()[visibleItemIndex];
                if (row && (!row.isEditing && "detail" === row.rowType || "detailAdaptive" === row.rowType)) {
                    visibleItemIndex++
                }
                const insertKey = dataController.getKeyByRowIndex(visibleItemIndex);
                if ((0, _type.isDefined)(insertKey)) {
                    change.insertBeforeKey = insertKey
                }
            }
        }
    }
    _getInsertIndex() {
        let maxInsertIndex = 0;
        this.getChanges().forEach((editItem => {
            var _this$_getInternalDat5;
            const insertInfo = null === (_this$_getInternalDat5 = this._getInternalData(editItem.key)) || void 0 === _this$_getInternalDat5 ? void 0 : _this$_getInternalDat5.insertInfo;
            if ((0, _type.isDefined)(insertInfo) && editItem.type === _const.DATA_EDIT_DATA_INSERT_TYPE && insertInfo[_const.INSERT_INDEX] > maxInsertIndex) {
                maxInsertIndex = insertInfo[_const.INSERT_INDEX]
            }
        }));
        return maxInsertIndex + 1
    }
    _getInsertAfterOrBeforeKey(insertChange) {
        return insertChange.insertAfterKey ?? insertChange.insertBeforeKey
    }
    _getPageIndexToInsertRow() {
        const newRowPosition = this._getNewRowPosition();
        const dataController = this._dataController;
        const pageIndex = dataController.pageIndex();
        const lastPageIndex = dataController.pageCount() - 1;
        if (newRowPosition === _const.FIRST_NEW_ROW_POSITION && 0 !== pageIndex) {
            return 0
        }
        if (newRowPosition === _const.LAST_NEW_ROW_POSITION && pageIndex !== lastPageIndex) {
            return lastPageIndex
        }
        return -1
    }
    addRow(parentKey) {
        const dataController = this._dataController;
        const store = dataController.store();
        if (!store) {
            dataController.fireError("E1052", this.component.NAME);
            return (new _deferred.Deferred).reject()
        }
        return this._addRow(parentKey)
    }
    _addRow(parentKey) {
        const dataController = this._dataController;
        const store = dataController.store();
        const key = store && store.key();
        const param = {
            data: {}
        };
        const oldEditRowIndex = this._getVisibleEditRowIndex();
        const deferred = new _deferred.Deferred;
        this.refresh({
            allowCancelEditing: true
        });
        if (!this._allowRowAdding()) {
            (0, _deferred.when)(this._navigateToNewRow(oldEditRowIndex)).done(deferred.resolve).fail(deferred.reject);
            return deferred.promise()
        }
        if (!key) {
            param.data.__KEY__ = String(new _guid.default)
        }(0, _deferred.when)(this._initNewRow(param, parentKey)).done((() => {
            if (this._allowRowAdding()) {
                (0, _deferred.when)(this._addRowCore(param.data, parentKey, oldEditRowIndex)).done(deferred.resolve).fail(deferred.reject)
            } else {
                deferred.reject("cancel")
            }
        })).fail(deferred.reject);
        return deferred.promise()
    }
    _allowRowAdding(params) {
        const insertIndex = this._getInsertIndex();
        if (insertIndex > 1) {
            return false
        }
        return true
    }
    _addRowCore(data, parentKey, initialOldEditRowIndex) {
        const change = {
            data: data,
            type: _const.DATA_EDIT_DATA_INSERT_TYPE
        };
        const editRowIndex = this._getVisibleEditRowIndex();
        const insertInfo = this._addInsertInfo(change, parentKey);
        const {
            key: key
        } = insertInfo;
        this._setEditRowKey(key, true);
        this._addChange(change);
        return this._navigateToNewRow(initialOldEditRowIndex, change, editRowIndex)
    }
    _navigateToNewRow(oldEditRowIndex, change, editRowIndex) {
        const d = new _deferred.Deferred;
        const dataController = this._dataController;
        editRowIndex = editRowIndex ?? -1;
        change = change ?? this.getChanges().filter((c => c.type === _const.DATA_EDIT_DATA_INSERT_TYPE))[0];
        if (!change) {
            return d.reject("cancel").promise()
        }
        const pageIndexToInsertRow = this._getPageIndexToInsertRow();
        let rowIndex = this._getLoadedRowIndex(dataController.items(), change, true);
        const navigateToRowByKey = key => {
            var _this$_focusControlle;
            (0, _deferred.when)(null === (_this$_focusControlle = this._focusController) || void 0 === _this$_focusControlle ? void 0 : _this$_focusControlle.navigateToRow(key)).done((() => {
                rowIndex = dataController.getRowIndexByKey(change.key);
                d.resolve()
            }))
        };
        const insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
        if (pageIndexToInsertRow >= 0) {
            dataController.pageIndex(pageIndexToInsertRow).done((() => {
                navigateToRowByKey(change.key)
            })).fail(d.reject)
        } else if (rowIndex < 0 && (0, _type.isDefined)(insertAfterOrBeforeKey)) {
            navigateToRowByKey(insertAfterOrBeforeKey)
        } else {
            dataController.updateItems({
                changeType: "update",
                rowIndices: [oldEditRowIndex, editRowIndex, rowIndex]
            });
            rowIndex = dataController.getRowIndexByKey(change.key);
            if (rowIndex < 0) {
                navigateToRowByKey(change.key)
            } else {
                d.resolve()
            }
        }
        d.done((() => {
            var _this$_rowsView2;
            null === (_this$_rowsView2 = this._rowsView) || void 0 === _this$_rowsView2 || _this$_rowsView2.waitAsyncTemplates(true).done((() => {
                this._showAddedRow(rowIndex);
                this._afterInsertRow(change.key)
            }))
        }));
        return d.promise()
    }
    _showAddedRow(rowIndex) {
        this._focusFirstEditableCellInRow(rowIndex)
    }
    _beforeFocusElementInRow(rowIndex) {}
    _focusFirstEditableCellInRow(rowIndex) {
        var _this$_keyboardNaviga;
        const dataController = this._dataController;
        const key = dataController.getKeyByRowIndex(rowIndex);
        const $firstCell = this.getFirstEditableCellInRow(rowIndex);
        null === (_this$_keyboardNaviga = this._keyboardNavigationController) || void 0 === _this$_keyboardNaviga || _this$_keyboardNaviga.focus($firstCell);
        this.option("focusedRowKey", key);
        this._editCellInProgress = true;
        this._delayedInputFocus($firstCell, (() => {
            rowIndex = dataController.getRowIndexByKey(key);
            this._editCellInProgress = false;
            this._beforeFocusElementInRow(rowIndex)
        }))
    }
    _isEditingStart(options) {
        this.executeAction("onEditingStart", options);
        return options.cancel
    }
    _beforeUpdateItems(rowIndices, rowIndex) {}
    _getVisibleEditColumnIndex() {
        const editColumnName = this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME);
        if (!(0, _type.isDefined)(editColumnName)) {
            return -1
        }
        return this._columnsController.getVisibleColumnIndex(editColumnName)
    }
    _setEditColumnNameByIndex(index, silent) {
        var _visibleColumns$index;
        const visibleColumns = this._columnsController.getVisibleColumns();
        this._setEditColumnName(null === (_visibleColumns$index = visibleColumns[index]) || void 0 === _visibleColumns$index ? void 0 : _visibleColumns$index.name, silent)
    }
    _setEditColumnName(name, silent) {
        if (silent) {
            this._silentOption(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME, name)
        } else {
            this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME, name)
        }
    }
    _resetEditColumnName() {
        this._setEditColumnName(null, true)
    }
    _getEditColumn() {
        const editColumnName = this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME);
        return this._getColumnByName(editColumnName)
    }
    _getColumnByName(name) {
        const visibleColumns = this._columnsController.getVisibleColumns();
        let editColumn;
        (0, _type.isDefined)(name) && visibleColumns.some((column => {
            if (column.name === name) {
                editColumn = column;
                return true
            }
        }));
        return editColumn
    }
    _getVisibleEditRowIndex(columnName) {
        const dataController = this._dataController;
        const editRowKey = this.option(_const.EDITING_EDITROWKEY_OPTION_NAME);
        const rowIndex = dataController.getRowIndexByKey(editRowKey);
        if (-1 === rowIndex) {
            return rowIndex
        }
        return rowIndex + this._getEditRowIndexCorrection(columnName)
    }
    _getEditRowIndexCorrection(columnName) {
        const editColumn = columnName ? this._getColumnByName(columnName) : this._getEditColumn();
        const isColumnHidden = "adaptiveHidden" === (null === editColumn || void 0 === editColumn ? void 0 : editColumn.visibleWidth);
        return isColumnHidden ? 1 : 0
    }
    _resetEditRowKey() {
        this._refocusEditCell = false;
        this._setEditRowKey(null, true)
    }
    _resetEditIndices() {
        this._resetEditColumnName();
        this._resetEditRowKey()
    }
    editRow(rowIndex) {
        const dataController = this._dataController;
        const items = dataController.items();
        const item = items[rowIndex];
        const params = {
            data: item && item.data,
            cancel: false
        };
        const oldRowIndex = this._getVisibleEditRowIndex();
        if (!item) {
            return
        }
        if (rowIndex === oldRowIndex) {
            return true
        }
        if (void 0 === item.key) {
            this._dataController.fireError("E1043");
            return
        }
        if (!item.isNewRow) {
            params.key = item.key
        }
        if (this._isEditingStart(params)) {
            return
        }
        this.resetChanges();
        this.init();
        this._resetEditColumnName();
        this._pageIndex = dataController.pageIndex();
        this._addInternalData({
            key: item.key,
            oldData: item.oldData ?? item.data
        });
        this._setEditRowKey(item.key)
    }
    _editRowFromOptionChanged(rowIndex, oldRowIndex) {
        const rowIndices = [oldRowIndex, rowIndex];
        this._beforeUpdateItems(rowIndices, rowIndex, oldRowIndex);
        this._editRowFromOptionChangedCore(rowIndices, rowIndex)
    }
    _editRowFromOptionChangedCore(rowIndices, rowIndex, preventRendering) {
        this._needFocusEditor = true;
        this._dataController.updateItems({
            changeType: "update",
            rowIndices: rowIndices,
            cancel: preventRendering
        })
    }
    _focusEditorIfNeed() {}
    _showEditPopup(rowIndex, repaintForm) {}
    _repaintEditPopup() {}
    _getEditPopupHiddenHandler() {
        return e => {
            if (this.isEditing()) {
                this.cancelEditData()
            }
        }
    }
    _getPopupEditFormTemplate(rowIndex) {}
    _getSaveButtonConfig() {
        const buttonConfig = {
            text: this.option("editing.texts.saveRowChanges"),
            onClick: this.saveEditData.bind(this)
        };
        if ((0, _themes.isFluent)((0, _themes.current)())) {
            buttonConfig.stylingMode = "contained";
            buttonConfig.type = "default"
        }
        return buttonConfig
    }
    _getCancelButtonConfig() {
        const buttonConfig = {
            text: this.option("editing.texts.cancelRowChanges"),
            onClick: this.cancelEditData.bind(this)
        };
        if ((0, _themes.isFluent)((0, _themes.current)())) {
            buttonConfig.stylingMode = "outlined"
        }
        return buttonConfig
    }
    _removeInternalData(key) {
        const internalData = this._getInternalData(key);
        const index = this._internalState.indexOf(internalData);
        if (index > -1) {
            this._internalState.splice(index, 1)
        }
    }
    _updateInsertAfterOrBeforeKeys(changes, index) {
        const removeChange = changes[index];
        changes.forEach((change => {
            const insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
            if ((0, _common.equalByValue)(insertAfterOrBeforeKey, removeChange.key)) {
                change[(0, _type.isDefined)(change.insertAfterKey) ? "insertAfterKey" : "insertBeforeKey"] = this._getInsertAfterOrBeforeKey(removeChange)
            }
        }))
    }
    _removeChange(index) {
        if (index >= 0) {
            const changes = [...this.getChanges()];
            const {
                key: key
            } = changes[index];
            this._removeInternalData(key);
            this._updateInsertAfterOrBeforeKeys(changes, index);
            changes.splice(index, 1);
            this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes);
            if ((0, _common.equalByValue)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME), key)) {
                this._resetEditIndices()
            }
        }
    }
    executeOperation(deferred, func) {
        this._lastOperation && this._lastOperation.reject();
        this._lastOperation = deferred;
        this.waitForDeferredOperations().done((() => {
            if ("rejected" === deferred.state()) {
                return
            }
            func();
            this._lastOperation = null
        })).fail((() => {
            deferred.reject();
            this._lastOperation = null
        }))
    }
    waitForDeferredOperations() {
        return (0, _deferred.when)(...this._deferreds)
    }
    _processCanceledEditingCell() {}
    _repaintEditCell(column, oldColumn, oldEditRowIndex) {
        if (!column || !column.showEditorAlways || oldColumn && !oldColumn.showEditorAlways) {
            this._editCellInProgress = true;
            this._needFocusEditor = true;
            this._editorFactoryController.loseFocus();
            this._dataController.updateItems({
                changeType: "update",
                rowIndices: [oldEditRowIndex, this._getVisibleEditRowIndex()]
            })
        } else if (column !== oldColumn) {
            this._needFocusEditor = true;
            this._dataController.updateItems({
                changeType: "update",
                rowIndices: []
            })
        }
    }
    _delayedInputFocus($cell, beforeFocusCallback, callBeforeFocusCallbackAlways) {
        const inputFocus = () => {
            if (beforeFocusCallback) {
                beforeFocusCallback()
            }
            if ($cell) {
                const $focusableElement = $cell.find(_const.FOCUSABLE_ELEMENT_SELECTOR).first();
                _m_utils.default.focusAndSelectElement(this, $focusableElement)
            }
            this._beforeFocusCallback = null
        };
        if (_devices.default.real().ios || _devices.default.real().android) {
            inputFocus()
        } else {
            if (this._beforeFocusCallback) {
                this._beforeFocusCallback()
            }
            clearTimeout(this._inputFocusTimeoutID);
            if (callBeforeFocusCallbackAlways) {
                this._beforeFocusCallback = beforeFocusCallback
            }
            this._inputFocusTimeoutID = setTimeout(inputFocus)
        }
    }
    _focusEditingCell(beforeFocusCallback, $editCell, callBeforeFocusCallbackAlways) {
        const editColumnIndex = this._getVisibleEditColumnIndex();
        $editCell = $editCell || this._rowsView && this._rowsView._getCellElement(this._getVisibleEditRowIndex(), editColumnIndex);
        if ($editCell) {
            this._delayedInputFocus($editCell, beforeFocusCallback, callBeforeFocusCallbackAlways)
        }
    }
    deleteRow(rowIndex) {
        this._checkAndDeleteRow(rowIndex)
    }
    _checkAndDeleteRow(rowIndex) {
        const editingOptions = this.option("editing");
        const editingTexts = null === editingOptions || void 0 === editingOptions ? void 0 : editingOptions.texts;
        const confirmDelete = null === editingOptions || void 0 === editingOptions ? void 0 : editingOptions.confirmDelete;
        const confirmDeleteMessage = null === editingTexts || void 0 === editingTexts ? void 0 : editingTexts.confirmDeleteMessage;
        const item = this._dataController.items()[rowIndex];
        const allowDeleting = !this.isEditing() || item.isNewRow;
        if (item && allowDeleting) {
            if (!confirmDelete || !confirmDeleteMessage) {
                this._deleteRowCore(rowIndex)
            } else {
                const confirmDeleteTitle = editingTexts && editingTexts.confirmDeleteTitle;
                const showDialogTitle = (0, _type.isDefined)(confirmDeleteTitle) && confirmDeleteTitle.length > 0;
                (0, _dialog.confirm)(confirmDeleteMessage, confirmDeleteTitle, showDialogTitle).done((confirmResult => {
                    if (confirmResult) {
                        this._deleteRowCore(rowIndex)
                    }
                }))
            }
        }
    }
    _deleteRowCore(rowIndex) {
        const dataController = this._dataController;
        const item = dataController.items()[rowIndex];
        const key = item && item.key;
        const oldEditRowIndex = this._getVisibleEditRowIndex();
        this.refresh();
        const changes = this.getChanges();
        const editIndex = _m_utils.default.getIndexByKey(key, changes);
        if (editIndex >= 0) {
            if (changes[editIndex].type === _const.DATA_EDIT_DATA_INSERT_TYPE) {
                this._removeChange(editIndex)
            } else {
                this._addChange({
                    key: key,
                    type: _const.DATA_EDIT_DATA_REMOVE_TYPE
                })
            }
        } else {
            this._addChange({
                key: key,
                oldData: item.data,
                type: _const.DATA_EDIT_DATA_REMOVE_TYPE
            })
        }
        return this._afterDeleteRow(rowIndex, oldEditRowIndex)
    }
    _afterDeleteRow(rowIndex, oldEditRowIndex) {
        return this.saveEditData()
    }
    undeleteRow(rowIndex) {
        const dataController = this._dataController;
        const item = dataController.items()[rowIndex];
        const oldEditRowIndex = this._getVisibleEditRowIndex();
        const key = item && item.key;
        const changes = this.getChanges();
        if (item) {
            const editIndex = _m_utils.default.getIndexByKey(key, changes);
            if (editIndex >= 0) {
                const {
                    data: data
                } = changes[editIndex];
                if ((0, _type.isEmptyObject)(data)) {
                    this._removeChange(editIndex)
                } else {
                    this._addChange({
                        key: key,
                        type: _const.DATA_EDIT_DATA_UPDATE_TYPE
                    })
                }
                dataController.updateItems({
                    changeType: "update",
                    rowIndices: [oldEditRowIndex, rowIndex]
                })
            }
        }
    }
    _fireOnSaving() {
        const onSavingParams = {
            cancel: false,
            promise: null,
            changes: [...this.getChanges()]
        };
        this.executeAction("onSaving", onSavingParams);
        const d = new _deferred.Deferred;
        (0, _deferred.when)((0, _deferred.fromPromise)(onSavingParams.promise)).done((() => {
            d.resolve(onSavingParams)
        })).fail((arg => {
            (0, _m_editing_utils.createFailureHandler)(d);
            this._fireDataErrorOccurred(arg);
            d.resolve({
                cancel: true
            })
        }));
        return d
    }
    _executeEditingAction(actionName, params, func) {
        if (this.component._disposed) {
            return null
        }
        const deferred = new _deferred.Deferred;
        this.executeAction(actionName, params);
        (0, _deferred.when)((0, _deferred.fromPromise)(params.cancel)).done((cancel => {
            if (cancel) {
                setTimeout((() => {
                    deferred.resolve("cancel")
                }))
            } else {
                func(params).done(deferred.resolve).fail((0, _m_editing_utils.createFailureHandler)(deferred))
            }
        })).fail((0, _m_editing_utils.createFailureHandler)(deferred));
        return deferred
    }
    _processChanges(deferreds, results, dataChanges, changes) {
        const store = this._dataController.store();
        (0, _iterator.each)(changes, ((index, change) => {
            const oldData = this._getOldData(change.key);
            const {
                data: data,
                type: type
            } = change;
            const changeCopy = _extends({}, change);
            let deferred;
            let params;
            if (this._beforeSaveEditData(change, index)) {
                return
            }
            switch (type) {
                case _const.DATA_EDIT_DATA_REMOVE_TYPE:
                    params = {
                        data: oldData,
                        key: change.key,
                        cancel: false
                    };
                    deferred = this._executeEditingAction("onRowRemoving", params, (() => store.remove(change.key).done((key => {
                        dataChanges.push({
                            type: "remove",
                            key: key
                        })
                    }))));
                    break;
                case _const.DATA_EDIT_DATA_INSERT_TYPE:
                    params = {
                        data: data,
                        cancel: false
                    };
                    deferred = this._executeEditingAction("onRowInserting", params, (() => store.insert(params.data).done(((data, key) => {
                        if ((0, _type.isDefined)(key)) {
                            changeCopy.key = key
                        }
                        if (data && (0, _type.isObject)(data) && data !== params.data) {
                            changeCopy.data = data
                        }
                        dataChanges.push({
                            type: "insert",
                            data: data,
                            index: 0
                        })
                    }))));
                    break;
                case _const.DATA_EDIT_DATA_UPDATE_TYPE:
                    params = {
                        newData: data,
                        oldData: oldData,
                        key: change.key,
                        cancel: false
                    };
                    deferred = this._executeEditingAction("onRowUpdating", params, (() => store.update(change.key, params.newData).done(((data, key) => {
                        if (data && (0, _type.isObject)(data) && data !== params.newData) {
                            changeCopy.data = data
                        }
                        dataChanges.push({
                            type: "update",
                            key: key,
                            data: data
                        })
                    }))))
            }
            changes[index] = changeCopy;
            if (deferred) {
                const doneDeferred = new _deferred.Deferred;
                deferred.always((data => {
                    results.push({
                        key: change.key,
                        result: data
                    })
                })).always(doneDeferred.resolve);
                deferreds.push(doneDeferred.promise())
            }
        }))
    }
    _processRemoveIfError(changes, editIndex) {
        const change = changes[editIndex];
        if ((null === change || void 0 === change ? void 0 : change.type) === _const.DATA_EDIT_DATA_REMOVE_TYPE) {
            if (editIndex >= 0) {
                changes.splice(editIndex, 1)
            }
        }
        return true
    }
    _processRemove(changes, editIndex, cancel) {
        const change = changes[editIndex];
        if (!cancel || !change || change.type === _const.DATA_EDIT_DATA_REMOVE_TYPE) {
            return this._processRemoveCore(changes, editIndex, !cancel || !change)
        }
    }
    _processRemoveCore(changes, editIndex, processIfBatch) {
        if (editIndex >= 0) {
            changes.splice(editIndex, 1)
        }
        return true
    }
    _processSaveEditDataResult(results) {
        let hasSavedData = false;
        const changes = [...this.getChanges()];
        const changesLength = changes.length;
        for (let i = 0; i < results.length; i++) {
            const arg = results[i].result;
            const cancel = "cancel" === arg;
            const editIndex = _m_utils.default.getIndexByKey(results[i].key, changes);
            const change = changes[editIndex];
            const isError = arg && arg instanceof Error;
            if (isError) {
                if (change) {
                    this._addInternalData({
                        key: change.key,
                        error: arg
                    })
                }
                this._fireDataErrorOccurred(arg);
                if (this._processRemoveIfError(changes, editIndex)) {
                    break
                }
            } else if (this._processRemove(changes, editIndex, cancel)) {
                hasSavedData = !cancel
            }
        }
        if (changes.length < changesLength) {
            this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes)
        }
        return hasSavedData
    }
    _fireSaveEditDataEvents(changes) {
        (0, _iterator.each)(changes, ((_, _ref) => {
            let {
                data: data,
                key: key,
                type: type
            } = _ref;
            const internalData = this._addInternalData({
                key: key
            });
            const params = {
                key: key,
                data: data
            };
            if (internalData.error) {
                params.error = internalData.error
            }
            switch (type) {
                case _const.DATA_EDIT_DATA_REMOVE_TYPE:
                    this.executeAction("onRowRemoved", (0, _extend.extend)({}, params, {
                        data: internalData.oldData
                    }));
                    break;
                case _const.DATA_EDIT_DATA_INSERT_TYPE:
                    this.executeAction("onRowInserted", params);
                    break;
                case _const.DATA_EDIT_DATA_UPDATE_TYPE:
                    this.executeAction("onRowUpdated", params)
            }
        }));
        this.executeAction("onSaved", {
            changes: changes
        })
    }
    saveEditData() {
        const deferred = new _deferred.Deferred;
        this.waitForDeferredOperations().done((() => {
            if (this.isSaving()) {
                this._resolveAfterSave(deferred);
                return
            }(0, _deferred.when)(this._beforeSaveEditData()).done((cancel => {
                if (cancel) {
                    this._resolveAfterSave(deferred, {
                        cancel: cancel
                    });
                    return
                }
                this._saving = true;
                this._saveEditDataInner().always((() => {
                    this._saving = false;
                    if (this._refocusEditCell) {
                        this._focusEditingCell()
                    }
                })).done(deferred.resolve).fail(deferred.reject)
            })).fail(deferred.reject)
        })).fail(deferred.reject);
        return deferred.promise()
    }
    _resolveAfterSave(deferred) {
        let {
            cancel: cancel,
            error: error
        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        (0, _deferred.when)(this._afterSaveEditData(cancel)).done((() => {
            deferred.resolve(error)
        })).fail(deferred.reject)
    }
    _saveEditDataInner() {
        const result = new _deferred.Deferred;
        const results = [];
        const deferreds = [];
        const dataChanges = [];
        const dataSource = this._dataController.dataSource();
        (0, _deferred.when)(this._fireOnSaving()).done((_ref2 => {
            let {
                cancel: cancel,
                changes: changes
            } = _ref2;
            if (cancel) {
                return result.resolve().promise()
            }
            this._processChanges(deferreds, results, dataChanges, changes);
            if (deferreds.length) {
                this._refocusEditCell = true;
                null === dataSource || void 0 === dataSource || dataSource.beginLoading();
                (0, _deferred.when)(...deferreds).done((() => {
                    if (this._processSaveEditDataResult(results)) {
                        this._endSaving(dataChanges, changes, result)
                    } else {
                        null === dataSource || void 0 === dataSource || dataSource.endLoading();
                        result.resolve()
                    }
                })).fail((error => {
                    null === dataSource || void 0 === dataSource || dataSource.endLoading();
                    result.resolve(error)
                }));
                return result.always((() => {
                    this._refocusEditCell = true
                })).promise()
            }
            this._cancelSaving(result)
        })).fail(result.reject);
        return result.promise()
    }
    _beforeEndSaving(changes) {
        this._resetEditIndices()
    }
    _endSaving(dataChanges, changes, deferred) {
        const dataSource = this._dataController.dataSource();
        this._beforeEndSaving(changes);
        null === dataSource || void 0 === dataSource || dataSource.endLoading();
        this._refreshDataAfterSave(dataChanges, changes, deferred)
    }
    _cancelSaving(result) {
        this.executeAction("onSaved", {
            changes: []
        });
        this._resolveAfterSave(result)
    }
    _refreshDataAfterSave(dataChanges, changes, deferred) {
        const dataController = this._dataController;
        const refreshMode = this.option("editing.refreshMode");
        const isFullRefresh = "reshape" !== refreshMode && "repaint" !== refreshMode;
        if (!isFullRefresh) {
            dataController.push(dataChanges)
        }(0, _deferred.when)(dataController.refresh({
            selection: isFullRefresh,
            reload: isFullRefresh,
            load: "reshape" === refreshMode,
            changesOnly: this.option("repaintChangesOnly")
        })).always((() => {
            this._fireSaveEditDataEvents(changes)
        })).done((() => {
            this._resolveAfterSave(deferred)
        })).fail((error => {
            this._resolveAfterSave(deferred, {
                error: error
            })
        }))
    }
    isSaving() {
        return this._saving
    }
    _updateEditColumn() {
        const isEditColumnVisible = this._isEditColumnVisible();
        const useIcons = this.option("editing.useIcons");
        const cssClass = _const.COMMAND_EDIT_CLASS + (useIcons ? ` ${_const.COMMAND_EDIT_WITH_ICONS_CLASS}` : "");
        this._columnsController.addCommandColumn({
            type: "buttons",
            command: "edit",
            visible: isEditColumnVisible,
            cssClass: cssClass,
            width: "auto",
            alignment: "center",
            cellTemplate: this._getEditCommandCellTemplate(),
            fixedPosition: "right"
        });
        this._columnsController.columnOption("command:edit", {
            visible: isEditColumnVisible,
            cssClass: cssClass
        })
    }
    _isEditColumnVisible() {
        const editingOptions = this.option("editing");
        return editingOptions.allowDeleting
    }
    _isEditButtonDisabled() {
        const hasChanges = this.hasChanges();
        const isEditRowDefined = (0, _type.isDefined)(this.option("editing.editRowKey"));
        return !(isEditRowDefined || hasChanges)
    }
    _updateEditButtons() {
        const isButtonDisabled = this._isEditButtonDisabled();
        if (this._headerPanelView) {
            this._headerPanelView.setToolbarItemDisabled("saveButton", isButtonDisabled);
            this._headerPanelView.setToolbarItemDisabled("revertButton", isButtonDisabled)
        }
    }
    _applyModified($element, options) {
        $element && $element.addClass(_const.CELL_MODIFIED)
    }
    _beforeCloseEditCellInBatchMode(rowIndices) {}
    cancelEditData() {
        const changes = this.getChanges();
        const params = {
            cancel: false,
            changes: changes
        };
        this.executeAction("onEditCanceling", params);
        if (!params.cancel) {
            this._cancelEditDataCore();
            this.executeAction("onEditCanceled", {
                changes: changes
            })
        }
    }
    _cancelEditDataCore() {
        const rowIndex = this._getVisibleEditRowIndex();
        this._beforeCancelEditData();
        this.init();
        this.resetChanges();
        this._resetEditColumnName();
        this._resetEditRowKey();
        this._afterCancelEditData(rowIndex)
    }
    _afterCancelEditData(rowIndex) {
        const dataController = this._dataController;
        dataController.updateItems({
            repaintChangesOnly: this.option("repaintChangesOnly")
        })
    }
    _hideEditPopup() {}
    hasEditData() {
        return this.hasChanges()
    }
    update(changeType) {
        const dataController = this._dataController;
        if (dataController && this._pageIndex !== dataController.pageIndex()) {
            if ("refresh" === changeType) {
                this.refresh({
                    isPageChanged: true
                })
            }
            this._pageIndex = dataController.pageIndex()
        }
        this._updateEditButtons()
    }
    _getRowIndicesForCascadeUpdating(row, skipCurrentRow) {
        return skipCurrentRow ? [] : [row.rowIndex]
    }
    addDeferred(deferred) {
        if (!this._deferreds.includes(deferred)) {
            this._deferreds.push(deferred);
            deferred.always((() => {
                const index = this._deferreds.indexOf(deferred);
                if (index >= 0) {
                    this._deferreds.splice(index, 1)
                }
            }))
        }
    }
    _prepareChange(options, value, text) {
        var _options$row;
        const newData = {};
        const oldData = null === (_options$row = options.row) || void 0 === _options$row ? void 0 : _options$row.data;
        const rowKey = options.key;
        const deferred = new _deferred.Deferred;
        if (void 0 !== rowKey) {
            options.value = value;
            const setCellValueResult = (0, _deferred.fromPromise)(options.column.setCellValue(newData, value, (0, _extend.extend)(true, {}, oldData), text));
            setCellValueResult.done((() => {
                deferred.resolve({
                    data: newData,
                    key: rowKey,
                    oldData: oldData,
                    type: _const.DATA_EDIT_DATA_UPDATE_TYPE
                })
            })).fail((0, _m_editing_utils.createFailureHandler)(deferred)).fail((arg => this._fireDataErrorOccurred(arg)));
            if ((0, _type.isDefined)(text) && options.column.displayValueMap) {
                options.column.displayValueMap[value] = text
            }
            this._updateRowValues(options);
            this.addDeferred(deferred)
        }
        return deferred
    }
    _updateRowValues(options) {
        if (options.values) {
            const dataController = this._dataController;
            const rowIndex = dataController.getRowIndexByKey(options.key);
            const row = dataController.getVisibleRows()[rowIndex];
            if (row) {
                options.row.values = row.values;
                options.values = row.values
            }
            options.values[options.columnIndex] = options.value
        }
    }
    updateFieldValue(options, value, text, forceUpdateRow) {
        const rowKey = options.key;
        const deferred = new _deferred.Deferred;
        if (void 0 === rowKey) {
            this._dataController.fireError("E1043")
        }
        if (options.column.setCellValue) {
            this._prepareChange(options, value, text).done((params => {
                (0, _deferred.when)(this._applyChange(options, params, forceUpdateRow)).always((() => {
                    deferred.resolve()
                }))
            }))
        } else {
            deferred.resolve()
        }
        return deferred.promise()
    }
    _focusPreviousEditingCellIfNeed(options) {
        if (this.hasEditData() && !this.isEditCell(options.rowIndex, options.columnIndex)) {
            this._focusEditingCell();
            this._updateEditRow(options.row, true);
            return true
        }
    }
    _needUpdateRow(column) {
        const visibleColumns = this._columnsController.getVisibleColumns();
        if (!column) {
            column = this._getEditColumn()
        }
        const isCustomSetCellValue = column && column.setCellValue !== column.defaultSetCellValue;
        const isCustomCalculateCellValue = visibleColumns.some((visibleColumn => visibleColumn.calculateCellValue !== visibleColumn.defaultCalculateCellValue));
        return isCustomSetCellValue || isCustomCalculateCellValue
    }
    _applyChange(options, params, forceUpdateRow) {
        const changeOptions = _extends({}, options, {
            forceUpdateRow: forceUpdateRow
        });
        this._addChange(params, changeOptions);
        this._updateEditButtons();
        return this._applyChangeCore(options, changeOptions.forceUpdateRow)
    }
    _applyChangeCore(options, forceUpdateRow) {
        const isCustomSetCellValue = options.column.setCellValue !== options.column.defaultSetCellValue;
        const {
            row: row
        } = options;
        if (row) {
            if (forceUpdateRow || isCustomSetCellValue) {
                this._updateEditRow(row, forceUpdateRow, isCustomSetCellValue)
            } else if (row.update) {
                row.update()
            }
        }
    }
    _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
        this._dataController.updateItems({
            changeType: "update",
            rowIndices: this._getRowIndicesForCascadeUpdating(row, skipCurrentRow)
        })
    }
    _updateEditRow(row, forceUpdateRow, isCustomSetCellValue) {
        if (forceUpdateRow) {
            this._updateRowImmediately(row, forceUpdateRow, isCustomSetCellValue)
        } else {
            this._updateRowWithDelay(row, isCustomSetCellValue)
        }
    }
    _updateRowImmediately(row, forceUpdateRow, isCustomSetCellValue) {
        this._updateEditRowCore(row, !forceUpdateRow, isCustomSetCellValue);
        this._validateEditFormAfterUpdate(row, isCustomSetCellValue);
        if (!forceUpdateRow) {
            this._focusEditingCell()
        }
    }
    _updateRowWithDelay(row, isCustomSetCellValue) {
        const deferred = new _deferred.Deferred;
        this.addDeferred(deferred);
        setTimeout((() => {
            var _this$_editForm;
            const elementContainer = (null === (_this$_editForm = this._editForm) || void 0 === _this$_editForm ? void 0 : _this$_editForm.element()) || this.component.$element().get(0);
            const $focusedElement = (0, _renderer.default)(_dom_adapter.default.getActiveElement(elementContainer));
            const columnIndex = this._rowsView.getCellIndex($focusedElement, row.rowIndex);
            let focusedElement = $focusedElement.get(0);
            const selectionRange = _m_utils.default.getSelectionRange(focusedElement);
            this._updateEditRowCore(row, false, isCustomSetCellValue);
            this._validateEditFormAfterUpdate(row, isCustomSetCellValue);
            if (columnIndex >= 0) {
                const $focusedItem = this._rowsView._getCellElement(row.rowIndex, columnIndex);
                this._delayedInputFocus($focusedItem, (() => {
                    setTimeout((() => {
                        var _this$component$$elem;
                        focusedElement = _dom_adapter.default.getActiveElement(null === (_this$component$$elem = this.component.$element()) || void 0 === _this$component$$elem ? void 0 : _this$component$$elem.get(0));
                        if (selectionRange.selectionStart >= 0) {
                            _m_utils.default.setSelectionRange(focusedElement, selectionRange)
                        }
                    }))
                }))
            }
            deferred.resolve()
        }))
    }
    _validateEditFormAfterUpdate() {}
    _addChange(changeParams, options) {
        var _this$getChanges;
        const row = null === options || void 0 === options ? void 0 : options.row;
        const changes = [...this.getChanges()];
        let index = _m_utils.default.getIndexByKey(changeParams.key, changes);
        if (index < 0) {
            index = changes.length;
            this._addInternalData({
                key: changeParams.key,
                oldData: changeParams.oldData
            });
            delete changeParams.oldData;
            changes.push(changeParams)
        }
        const change = _extends({}, changes[index]);
        if (change) {
            if (changeParams.data) {
                change.data = (0, _array_utils.createObjectWithChanges)(change.data, changeParams.data)
            }
            if ((!change.type || !changeParams.data) && changeParams.type) {
                change.type = changeParams.type
            }
            if (row) {
                row.oldData = this._getOldData(row.key);
                row.data = (0, _array_utils.createObjectWithChanges)(row.data, changeParams.data)
            }
        }
        changes[index] = change;
        this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes);
        if (options && change !== (null === (_this$getChanges = this.getChanges()) || void 0 === _this$getChanges ? void 0 : _this$getChanges[index])) {
            options.forceUpdateRow = true
        }
        return change
    }
    _getFormEditItemTemplate(cellOptions, column) {
        return column.editCellTemplate || this._getDefaultEditorTemplate()
    }
    getColumnTemplate(options) {
        const {
            column: column
        } = options;
        const rowIndex = options.row && options.row.rowIndex;
        let template;
        const isRowMode = this.isRowBasedEditMode();
        const isRowEditing = this.isEditRow(rowIndex);
        const isCellEditing = this.isEditCell(rowIndex, options.columnIndex);
        let editingStartOptions;
        if ((column.showEditorAlways || column.setCellValue && (isRowEditing && column.allowEditing || isCellEditing)) && ("data" === options.rowType || "detailAdaptive" === options.rowType) && !column.command) {
            const allowUpdating = this.allowUpdating(options);
            if (((allowUpdating || isRowEditing) && column.allowEditing || isCellEditing) && (isRowEditing || !isRowMode)) {
                if (column.showEditorAlways && !isRowMode) {
                    editingStartOptions = {
                        cancel: false,
                        key: options.row.isNewRow ? void 0 : options.row.key,
                        data: options.row.data,
                        column: column
                    };
                    this._isEditingStart(editingStartOptions)
                }
                if (!editingStartOptions || !editingStartOptions.cancel) {
                    options.setValue = (value, text) => {
                        this.updateFieldValue(options, value, text)
                    }
                }
            }
            template = column.editCellTemplate || this._getDefaultEditorTemplate()
        } else if ("detail" === column.command && "detail" === options.rowType && isRowEditing) {
            template = null === this || void 0 === this ? void 0 : this.getEditFormTemplate(options)
        }
        return template
    }
    _createButton($container, button, options, change) {
        let icon = _const.EDIT_ICON_CLASS[button.name];
        const useIcons = this.option("editing.useIcons");
        const useLegacyColumnButtonTemplate = this.option("useLegacyColumnButtonTemplate");
        let $button = (0, _renderer.default)("<a>").attr("href", "#").addClass(_const.LINK_CLASS).addClass(button.cssClass);
        if (button.template && useLegacyColumnButtonTemplate) {
            this._rowsView.renderTemplate($container, button.template, options, true)
        } else {
            if (button.template) {
                $button = (0, _renderer.default)("<span>").addClass(button.cssClass)
            } else if (useIcons && icon || button.icon) {
                icon = button.icon || icon;
                const iconType = iconUtils.getImageSourceType(icon);
                if ("image" === iconType || "svg" === iconType) {
                    $button = iconUtils.getImageContainer(icon).addClass(button.cssClass)
                } else {
                    $button.addClass(`dx-icon${"dxIcon"===iconType?"-":" "}${icon}`).attr("title", button.text)
                }
                $button.addClass(_const.LINK_ICON_CLASS);
                $container.addClass(_const.COMMAND_EDIT_WITH_ICONS_CLASS);
                const localizationName = this.getButtonLocalizationNames()[button.name];
                localizationName && $button.attr("aria-label", _message.default.format(localizationName))
            } else {
                $button.text(button.text)
            }
            if ((0, _type.isDefined)(button.hint)) {
                $button.attr("title", button.hint)
            }
            if (this._isButtonDisabled(button, options)) {
                $button.addClass("dx-state-disabled")
            } else if (!button.template || button.onClick) {
                _events_engine.default.on($button, (0, _index.addNamespace)("click", _const.EDITING_NAMESPACE), this.createAction((e => {
                    var _button$onClick;
                    null === (_button$onClick = button.onClick) || void 0 === _button$onClick || _button$onClick.call(button, (0, _extend.extend)({}, e, {
                        row: options.row,
                        column: options.column
                    }));
                    e.event.preventDefault();
                    e.event.stopPropagation()
                })))
            }
            $container.append($button);
            if (button.template) {
                options.renderAsync = false;
                this._rowsView.renderTemplate($button, button.template, options, true, change)
            }
        }
    }
    getButtonLocalizationNames() {
        return {
            edit: "dxDataGrid-editingEditRow",
            save: "dxDataGrid-editingSaveRowChanges",
            delete: "dxDataGrid-editingDeleteRow",
            undelete: "dxDataGrid-editingUndeleteRow",
            cancel: "dxDataGrid-editingCancelRowChanges"
        }
    }
    prepareButtonItem(headerPanel, name, methodName, sortIndex) {
        const editingTexts = this.option("editing.texts") ?? {};
        const titleButtonTextByClassNames = {
            revert: editingTexts.cancelAllChanges,
            save: editingTexts.saveAllChanges,
            addRow: editingTexts.addRow
        };
        const className = {
            revert: "cancel",
            save: "save",
            addRow: "addrow"
        } [name];
        const hintText = titleButtonTextByClassNames[name];
        const isButtonDisabled = ("save" === className || "cancel" === className) && this._isEditButtonDisabled();
        return {
            widget: "dxButton",
            options: {
                onInitialized: e => {
                    (0, _renderer.default)(e.element).addClass(headerPanel._getToolbarButtonClass(`${_const.EDIT_BUTTON_CLASS} ${this.addWidgetPrefix(className)}-button`))
                },
                icon: `edit-button-${className}`,
                disabled: isButtonDisabled,
                onClick: () => {
                    setTimeout((() => {
                        this[methodName]()
                    }))
                },
                text: hintText,
                hint: hintText
            },
            showText: "inMenu",
            name: `${name}Button`,
            location: "after",
            locateInMenu: "auto",
            sortIndex: sortIndex
        }
    }
    prepareEditButtons(headerPanel) {
        const editingOptions = this.option("editing") ?? {};
        const buttonItems = [];
        if (editingOptions.allowAdding) {
            buttonItems.push(this.prepareButtonItem(headerPanel, "addRow", "addRow", 20))
        }
        return buttonItems
    }
    highlightDataCell($cell, params) {
        this.shouldHighlightCell(params) && $cell.addClass(_const.CELL_MODIFIED)
    }
    _afterInsertRow(key) {}
    _beforeSaveEditData(change) {
        if (change && !(0, _type.isDefined)(change.key) && (0, _type.isDefined)(change.type)) {
            return true
        }
    }
    _afterSaveEditData() {}
    _beforeCancelEditData() {}
    _allowEditAction(actionName, options) {
        let allowEditAction = this.option(`editing.${actionName}`);
        if ((0, _type.isFunction)(allowEditAction)) {
            allowEditAction = allowEditAction({
                component: this.component,
                row: options.row
            })
        }
        return allowEditAction
    }
    allowUpdating(options, eventName) {
        const startEditAction = this.option("editing.startEditAction") ?? _const.DEFAULT_START_EDIT_ACTION;
        const needCallback = arguments.length > 1 ? startEditAction === eventName || "down" === eventName : true;
        return needCallback && this._allowEditAction("allowUpdating", options)
    }
    allowDeleting(options) {
        return this._allowEditAction("allowDeleting", options)
    }
    isCellModified(parameters) {
        var _parameters$row, _parameters$row2;
        const {
            columnIndex: columnIndex
        } = parameters;
        let modifiedValue = null === parameters || void 0 === parameters || null === (_parameters$row = parameters.row) || void 0 === _parameters$row || null === (_parameters$row = _parameters$row.modifiedValues) || void 0 === _parameters$row ? void 0 : _parameters$row[columnIndex];
        if (null !== parameters && void 0 !== parameters && null !== (_parameters$row2 = parameters.row) && void 0 !== _parameters$row2 && _parameters$row2.isNewRow) {
            modifiedValue = parameters.value
        }
        return void 0 !== modifiedValue
    }
    isNewRowInEditMode() {
        const visibleEditRowIndex = this._getVisibleEditRowIndex();
        const rows = this._dataController.items();
        return visibleEditRowIndex >= 0 ? rows[visibleEditRowIndex].isNewRow : false
    }
    _isRowDeleteAllowed() {}
    shouldHighlightCell(parameters) {
        const cellModified = this.isCellModified(parameters);
        return cellModified && parameters.column.setCellValue && (this.getEditMode() !== _const.EDIT_MODE_ROW || !parameters.row.isEditing)
    }
}
const dataControllerEditingExtenderMixin = Base => class extends Base {
    reload(full, repaintChangesOnly) {
        !repaintChangesOnly && this._editingController.refresh();
        return super.reload.apply(this, arguments)
    }
    repaintRows() {
        if (this._editingController.isSaving()) {
            return
        }
        return super.repaintRows.apply(this, arguments)
    }
    _updateEditRow(items) {
        const editRowKey = this.option(_const.EDITING_EDITROWKEY_OPTION_NAME);
        const editRowIndex = _m_utils.default.getIndexByKey(editRowKey, items);
        const editItem = items[editRowIndex];
        if (editItem) {
            var _this$_updateEditItem;
            editItem.isEditing = true;
            null === (_this$_updateEditItem = this._updateEditItem) || void 0 === _this$_updateEditItem || _this$_updateEditItem.call(this, editItem)
        }
    }
    _updateItemsCore(change) {
        super._updateItemsCore(change);
        this._updateEditRow(this.items(true))
    }
    _applyChangeUpdate(change) {
        this._updateEditRow(change.items);
        super._applyChangeUpdate(change)
    }
    _applyChangesOnly(change) {
        this._updateEditRow(change.items);
        super._applyChangesOnly(change)
    }
    _processItems(items, change) {
        items = this._editingController.processItems(items, change);
        return super._processItems(items, change)
    }
    _processDataItem(dataItem, options) {
        this._editingController.processDataItem(dataItem, options, this.generateDataValues);
        return super._processDataItem(dataItem, options)
    }
    _processItem(item, options) {
        item = super._processItem(item, options);
        if (item.isNewRow) {
            options.dataIndex--;
            delete item.dataIndex
        }
        return item
    }
    _getChangedColumnIndices(oldItem, newItem, rowIndex, isLiveUpdate) {
        if (oldItem.isNewRow !== newItem.isNewRow || oldItem.removed !== newItem.removed) {
            return
        }
        return super._getChangedColumnIndices.apply(this, arguments)
    }
    _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
        const cell = oldRow.cells && oldRow.cells[columnIndex];
        const isEditing = this._editingController && this._editingController.isEditCell(visibleRowIndex, columnIndex);
        if (isLiveUpdate && isEditing) {
            return false
        }
        if (cell && cell.column && !cell.column.showEditorAlways && cell.isEditing !== isEditing) {
            return true
        }
        return super._isCellChanged.apply(this, arguments)
    }
    needToRefreshOnDataSourceChange(args) {
        const isParasiteChange = Array.isArray(args.value) && args.value === args.previousValue && this._editingController.isSaving();
        return !isParasiteChange
    }
    _handleDataSourceChange(args) {
        const result = super._handleDataSourceChange(args);
        const changes = this.option("editing.changes");
        const dataSource = args.value;
        if (Array.isArray(dataSource) && changes.length) {
            const dataSourceKeys = dataSource.map((item => this.keyOf(item)));
            const newChanges = changes.filter((change => "insert" === change.type || dataSourceKeys.some((key => (0, _common.equalByValue)(change.key, key)))));
            if (newChanges.length !== changes.length) {
                this.option("editing.changes", newChanges)
            }
            const editRowKey = this.option("editing.editRowKey");
            const isEditNewItem = newChanges.some((change => "insert" === change.type && (0, _common.equalByValue)(editRowKey, change.key)));
            if (!isEditNewItem && dataSourceKeys.every((key => !(0, _common.equalByValue)(editRowKey, key)))) {
                this.option("editing.editRowKey", null)
            }
        }
        return result
    }
};
exports.dataControllerEditingExtenderMixin = dataControllerEditingExtenderMixin;
const rowsView = Base => class extends Base {
    getCellIndex($cell, rowIndex) {
        if (!$cell.is("td") && rowIndex >= 0) {
            const $cellElements = this.getCellElements(rowIndex);
            let cellIndex = -1;
            (0, _iterator.each)($cellElements, ((index, cellElement) => {
                if ((0, _renderer.default)(cellElement).find($cell).length) {
                    cellIndex = index
                }
            }));
            return cellIndex
        }
        return super.getCellIndex.apply(this, arguments)
    }
    publicMethods() {
        return super.publicMethods().concat(["cellValue"])
    }
    _getCellTemplate(options) {
        const template = this._editingController.getColumnTemplate(options);
        return template || super._getCellTemplate(options)
    }
    _createRow(row) {
        const $row = super._createRow.apply(this, arguments);
        if (row) {
            const isRowRemoved = !!row.removed;
            const isRowInserted = !!row.isNewRow;
            const isRowModified = !!row.modified;
            isRowInserted && $row.addClass(_const.ROW_INSERTED);
            isRowModified && $row.addClass(_const.ROW_MODIFIED);
            if (isRowInserted || isRowRemoved) {
                $row.removeClass(_const.ROW_SELECTED)
            }
        }
        return $row
    }
    _getColumnIndexByElement($element) {
        let $tableElement = $element.closest("table");
        const $tableElements = this.getTableElements();
        while ($tableElement.length && !$tableElements.filter($tableElement).length) {
            $element = $tableElement.closest("td");
            $tableElement = $element.closest("table")
        }
        return this._getColumnIndexByElementCore($element)
    }
    _getColumnIndexByElementCore($element) {
        const $targetElement = $element.closest(`.${_const.ROW_CLASS}> td:not(.dx-master-detail-cell)`);
        return this.getCellIndex($targetElement)
    }
    _editCellByClick(e, eventName) {
        const editingController = this._editingController;
        const $targetElement = (0, _renderer.default)(e.event.target);
        const columnIndex = this._getColumnIndexByElement($targetElement);
        const row = this._dataController.items()[e.rowIndex];
        const allowUpdating = editingController.allowUpdating({
            row: row
        }, eventName) || row && row.isNewRow;
        const column = this._columnsController.getVisibleColumns()[columnIndex];
        const isEditedCell = editingController.isEditCell(e.rowIndex, columnIndex);
        const allowEditing = allowUpdating && column && (column.allowEditing || isEditedCell);
        const startEditAction = this.option("editing.startEditAction") || "click";
        const isShowEditorAlways = column && column.showEditorAlways;
        if (isEditedCell) {
            return true
        }
        if ("down" === eventName) {
            if (_devices.default.real().ios || _devices.default.real().android) {
                (0, _dom.resetActiveElement)()
            }
            return isShowEditorAlways && allowEditing && editingController.editCell(e.rowIndex, columnIndex)
        }
        if ("click" === eventName && "dblClick" === startEditAction && this._pointerDownTarget === $targetElement.get(0)) {
            const isError = false;
            const withoutSaveEditData = null === row || void 0 === row ? void 0 : row.isNewRow;
            editingController.closeEditCell(isError, withoutSaveEditData)
        }
        if (allowEditing && eventName === startEditAction) {
            return editingController.editCell(e.rowIndex, columnIndex) || editingController.isEditRow(e.rowIndex)
        }
    }
    _rowPointerDown(e) {
        this._pointerDownTarget = e.event.target;
        this._pointerDownTimeout = setTimeout((() => {
            this._editCellByClick(e, "down")
        }))
    }
    _rowClickTreeListHack(e) {
        super._rowClick.apply(this, arguments)
    }
    _rowClick(e) {
        const isEditForm = (0, _renderer.default)(e.rowElement).hasClass(this.addWidgetPrefix(_const.EDIT_FORM_CLASS));
        e.event[_const.TARGET_COMPONENT_NAME] = this.component;
        if (!this._editCellByClick(e, "click") && !isEditForm) {
            super._rowClick.apply(this, arguments)
        }
    }
    _rowDblClickTreeListHack(e) {
        super._rowDblClick.apply(this, arguments)
    }
    _rowDblClick(e) {
        if (!this._editCellByClick(e, "dblClick")) {
            super._rowDblClick.apply(this, arguments)
        }
    }
    _cellPrepared($cell, parameters) {
        var _parameters$column;
        const editingController = this._editingController;
        const isCommandCell = !!parameters.column.command;
        const isEditableCell = parameters.setValue;
        const isEditRow = editingController.isEditRow(parameters.rowIndex);
        const isEditing = (0, _m_editing_utils.isEditingCell)(isEditRow, parameters);
        if ((0, _m_editing_utils.isEditingOrShowEditorAlwaysDataCell)(isEditRow, parameters)) {
            const {
                alignment: alignment
            } = parameters.column;
            $cell.toggleClass(this.addWidgetPrefix(_const.READONLY_CLASS), !isEditableCell).toggleClass(_const.CELL_FOCUS_DISABLED_CLASS, !isEditableCell);
            if (alignment) {
                $cell.find(_const.EDITORS_INPUT_SELECTOR).first().css("textAlign", alignment)
            }
        }
        if (isEditing) {
            this._editCellPrepared($cell)
        }
        const hasTemplate = !!(null !== (_parameters$column = parameters.column) && void 0 !== _parameters$column && _parameters$column.cellTemplate);
        if (parameters.column && !isCommandCell && (!hasTemplate || editingController.shouldHighlightCell(parameters))) {
            editingController.highlightDataCell($cell, parameters)
        }
        super._cellPrepared.apply(this, arguments)
    }
    _getCellOptions(options) {
        const cellOptions = super._getCellOptions(options);
        const {
            columnIndex: columnIndex,
            row: row
        } = options;
        cellOptions.isEditing = this._editingController.isEditCell(cellOptions.rowIndex, cellOptions.columnIndex);
        cellOptions.removed = row.removed;
        if (row.modified) {
            cellOptions.modified = void 0 !== row.modifiedValues[columnIndex]
        }
        return cellOptions
    }
    _setCellAriaAttributes($cell, cellOptions) {
        super._setCellAriaAttributes($cell, cellOptions);
        if (cellOptions.removed) {
            this.setAria("roledescription", _message.default.format("dxDataGrid-ariaDeletedCell"), $cell)
        }
        if (cellOptions.modified) {
            this.setAria("roledescription", _message.default.format("dxDataGrid-ariaModifiedCell"), $cell)
        }
        const isEditableCell = cellOptions.column.allowEditing && !cellOptions.removed && !cellOptions.modified && "data" === cellOptions.rowType && cellOptions.column.calculateCellValue === cellOptions.column.defaultCalculateCellValue && this._editingController.isCellBasedEditMode();
        if (isEditableCell) {
            this.setAria("roledescription", _message.default.format("dxDataGrid-ariaEditableCell"), $cell)
        }
    }
    _createCell(options) {
        const $cell = super._createCell(options);
        const isEditRow = this._editingController.isEditRow(options.rowIndex);
        (0, _m_editing_utils.isEditingOrShowEditorAlwaysDataCell)(isEditRow, options) && $cell.addClass(_const.EDITOR_CELL_CLASS);
        return $cell
    }
    cellValue(rowIndex, columnIdentifier, value, text) {
        const cellOptions = this.getCellOptions(rowIndex, columnIdentifier);
        if (cellOptions) {
            if (void 0 === value) {
                return cellOptions.value
            }
            this._editingController.updateFieldValue(cellOptions, value, text, true)
        }
    }
    dispose() {
        super.dispose.apply(this, arguments);
        clearTimeout(this._pointerDownTimeout)
    }
    _renderCore() {
        super._renderCore.apply(this, arguments);
        return this.waitAsyncTemplates(true).done((() => {
            this._editingController._focusEditorIfNeed()
        }))
    }
    _editCellPrepared() {}
    _formItemPrepared() {}
};
const headerPanel = Base => class extends Base {
    optionChanged(args) {
        const {
            fullName: fullName
        } = args;
        switch (args.name) {
            case "editing": {
                const excludedOptions = [_const.EDITING_POPUP_OPTION_NAME, _const.EDITING_CHANGES_OPTION_NAME, _const.EDITING_EDITCOLUMNNAME_OPTION_NAME, _const.EDITING_EDITROWKEY_OPTION_NAME];
                const shouldInvalidate = fullName && !excludedOptions.some((optionName => optionName === fullName));
                shouldInvalidate && this._invalidate();
                super.optionChanged(args);
                break
            }
            case "useLegacyColumnButtonTemplate":
                args.handled = true;
                break;
            default:
                super.optionChanged(args)
        }
    }
    _getToolbarItems() {
        const items = super._getToolbarItems();
        const editButtonItems = this._editingController.prepareEditButtons(this);
        return editButtonItems.concat(items)
    }
    isVisible() {
        const editingOptions = this._editingController.option("editing");
        return super.isVisible() || (null === editingOptions || void 0 === editingOptions ? void 0 : editingOptions.allowAdding)
    }
};
const editingModule = exports.editingModule = {
    defaultOptions: () => ({
        editing: {
            mode: "row",
            refreshMode: "full",
            newRowPosition: _const.VIEWPORT_TOP_NEW_ROW_POSITION,
            allowAdding: false,
            allowUpdating: false,
            allowDeleting: false,
            useIcons: false,
            selectTextOnEditStart: false,
            confirmDelete: true,
            texts: {
                editRow: _message.default.format("dxDataGrid-editingEditRow"),
                saveAllChanges: _message.default.format("dxDataGrid-editingSaveAllChanges"),
                saveRowChanges: _message.default.format("dxDataGrid-editingSaveRowChanges"),
                cancelAllChanges: _message.default.format("dxDataGrid-editingCancelAllChanges"),
                cancelRowChanges: _message.default.format("dxDataGrid-editingCancelRowChanges"),
                addRow: _message.default.format("dxDataGrid-editingAddRow"),
                deleteRow: _message.default.format("dxDataGrid-editingDeleteRow"),
                undeleteRow: _message.default.format("dxDataGrid-editingUndeleteRow"),
                confirmDeleteMessage: _message.default.format("dxDataGrid-editingConfirmDeleteMessage"),
                confirmDeleteTitle: ""
            },
            form: {
                colCount: 2
            },
            popup: {},
            startEditAction: "click",
            editRowKey: null,
            editColumnName: null,
            changes: []
        },
        useLegacyColumnButtonTemplate: false
    }),
    controllers: {
        editing: EditingControllerImpl
    },
    extenders: {
        controllers: {
            data: dataControllerEditingExtenderMixin
        },
        views: {
            rowsView: rowsView,
            headerPanel: headerPanel
        }
    }
};
