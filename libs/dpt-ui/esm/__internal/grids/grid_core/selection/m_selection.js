/**
 * DevExtreme (esm/__internal/grids/grid_core/selection/m_selection.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    equalByValue
} from "../../../../core/utils/common";
import {
    Deferred
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import {
    touch
} from "../../../../core/utils/support";
import {
    isDefined
} from "../../../../core/utils/type";
import {
    applyBatch
} from "../../../../data/array_utils";
import {
    name as clickEventName
} from "../../../../events/click";
import eventsEngine from "../../../../events/core/events_engine";
import holdEvent from "../../../../events/hold";
import {
    addNamespace,
    isCommandKeyPressed
} from "../../../../events/utils/index";
import messageLocalization from "../../../../localization/message";
import Selection from "../../../../ui/selection/selection";
import errors from "../../../../ui/widget/ui.errors";
import modules from "../m_modules";
import gridCoreUtils from "../m_utils";
const EDITOR_CELL_CLASS = "dx-editor-cell";
const ROW_CLASS = "dx-row";
const ROW_SELECTION_CLASS = "dx-selection";
const SELECT_CHECKBOX_CLASS = "dx-select-checkbox";
const CHECKBOXES_HIDDEN_CLASS = "dx-select-checkboxes-hidden";
const COMMAND_SELECT_CLASS = "dx-command-select";
const SELECTION_DISABLED_CLASS = "dx-selection-disabled";
const DATA_ROW_CLASS = "dx-data-row";
const SHOW_CHECKBOXES_MODE = "selection.showCheckBoxesMode";
const SELECTION_MODE = "selection.mode";
const processLongTap = function(that, dxEvent) {
    const rowsView = that.getView("rowsView");
    const selectionController = that.getController("selection");
    const $row = $(dxEvent.target).closest(".dx-data-row");
    const rowIndex = rowsView.getRowIndex($row);
    if (rowIndex < 0) {
        return
    }
    if ("onLongTap" === that.option(SHOW_CHECKBOXES_MODE)) {
        if (selectionController.isSelectionWithCheckboxes()) {
            selectionController.stopSelectionWithCheckboxes()
        } else {
            selectionController.startSelectionWithCheckboxes()
        }
    } else {
        if ("onClick" === that.option(SHOW_CHECKBOXES_MODE)) {
            selectionController.startSelectionWithCheckboxes()
        }
        if ("always" !== that.option(SHOW_CHECKBOXES_MODE)) {
            selectionController.changeItemSelection(rowIndex, {
                control: true
            })
        }
    }
};
const isSeveralRowsSelected = function(that, selectionFilter) {
    let keyIndex = 0;
    const store = that._dataController.store();
    const key = store && store.key();
    const isComplexKey = Array.isArray(key);
    if (!selectionFilter.length) {
        return false
    }
    if (isComplexKey && Array.isArray(selectionFilter[0]) && "and" === selectionFilter[1]) {
        for (let i = 0; i < selectionFilter.length; i++) {
            if (Array.isArray(selectionFilter[i])) {
                if (selectionFilter[i][0] !== key[keyIndex] || "=" !== selectionFilter[i][1]) {
                    return true
                }
                keyIndex++
            }
        }
        return false
    }
    return key !== selectionFilter[0]
};
const selectionCellTemplate = (container, options) => {
    const {
        component: component
    } = options;
    const rowsView = component.getView("rowsView");
    if (component.option("renderAsync") && !component.option("selection.deferred")) {
        options.value = component.isRowSelected(options.row.key)
    }
    rowsView.renderSelectCheckBoxContainer($(container), options)
};
const selectionHeaderTemplate = (container, options) => {
    const {
        column: column
    } = options;
    const $cellElement = $(container);
    const columnHeadersView = options.component.getView("columnHeadersView");
    $cellElement.addClass("dx-editor-cell");
    columnHeadersView._renderSelectAllCheckBox($cellElement, column);
    columnHeadersView._attachSelectAllCheckBoxClickEvent($cellElement)
};
export class SelectionController extends modules.Controller {
    init() {
        const {
            deferred: deferred,
            selectAllMode: selectAllMode,
            mode: mode
        } = this.option("selection") ?? {};
        if ("infinite" === this.option("scrolling.mode") && !deferred && "multiple" === mode && "allPages" === selectAllMode) {
            errors.log("W1018")
        }
        this._dataController = this.getController("data");
        this._columnsController = this.getController("columns");
        this._stateStoringController = this.getController("stateStoring");
        this._selectionMode = mode;
        this._isSelectionWithCheckboxes = false;
        this._selection = this._createSelection();
        this._updateSelectColumn();
        this.createAction("onSelectionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        });
        if (!this._dataPushedHandler) {
            this._dataPushedHandler = this._handleDataPushed.bind(this);
            this._dataController.pushed.add(this._dataPushedHandler)
        }
    }
    _handleDataPushed(changes) {
        this._deselectRemovedOnPush(changes);
        this._updateSelectedOnPush(changes)
    }
    _deselectRemovedOnPush(changes) {
        const isDeferredSelection = this.option("selection.deferred");
        let removedKeys = changes.filter((change => "remove" === change.type)).map((change => change.key));
        if (isDeferredSelection) {
            const selectedKeys = this._dataController.items().filter((item => item.isSelected)).map((item => item.key));
            removedKeys = removedKeys.filter((key => selectedKeys.find((selectedKey => equalByValue(selectedKey, key)))))
        }
        removedKeys.length && this.deselectRows(removedKeys)
    }
    _updateSelectedOnPush(changes) {
        const isDeferredSelection = this.option("selection.deferred");
        if (isDeferredSelection) {
            return
        }
        const updateChanges = changes.filter((change => "update" === change.type));
        const data = this.getSelectedRowsData();
        applyBatch({
            keyInfo: this._selection.options,
            data: data,
            changes: updateChanges
        })
    }
    _getSelectionConfig() {
        const dataController = this._dataController;
        const columnsController = this._columnsController;
        const selectionOptions = this.option("selection") ?? {};
        const {
            deferred: deferred
        } = selectionOptions;
        const scrollingMode = this.option("scrolling.mode");
        const virtualPaging = "virtual" === scrollingMode || "infinite" === scrollingMode;
        const allowSelectAll = this.option("selection.allowSelectAll");
        const legacyScrollingMode = this.option("scrolling.legacyMode");
        return {
            selectedKeys: this.option("selectedRowKeys"),
            mode: this._selectionMode,
            deferred: deferred,
            alwaysSelectByShift: selectionOptions.alwaysSelectByShift,
            maxFilterLengthInRequest: selectionOptions.maxFilterLengthInRequest,
            selectionFilter: this.option("selectionFilter"),
            ignoreDisabledItems: true,
            isVirtualPaging: virtualPaging,
            allowLoadByRange() {
                const hasGroupColumns = columnsController.getGroupColumns().length > 0;
                return virtualPaging && !legacyScrollingMode && !hasGroupColumns && allowSelectAll && !deferred
            },
            key: () => null === dataController || void 0 === dataController ? void 0 : dataController.key(),
            keyOf: item => null === dataController || void 0 === dataController ? void 0 : dataController.keyOf(item),
            dataFields() {
                var _dataController$dataS;
                return null === (_dataController$dataS = dataController.dataSource()) || void 0 === _dataController$dataS ? void 0 : _dataController$dataS.select()
            },
            load(options) {
                var _dataController$dataS2;
                return (null === (_dataController$dataS2 = dataController.dataSource()) || void 0 === _dataController$dataS2 ? void 0 : _dataController$dataS2.load(options)) || (new Deferred).resolve([])
            },
            plainItems: cached => dataController.items(true),
            isItemSelected: item => item.selected,
            isSelectableItem: item => "data" === (null === item || void 0 === item ? void 0 : item.rowType) && !item.isNewRow,
            getItemData: item => isDefined(null === item || void 0 === item ? void 0 : item.rowType) ? (null === item || void 0 === item ? void 0 : item.oldData) || (null === item || void 0 === item ? void 0 : item.data) : item,
            filter: () => dataController.getCombinedFilter(deferred),
            totalCount: () => dataController.totalCount(),
            getLoadOptions(loadItemIndex, focusedItemIndex, shiftItemIndex) {
                var _dataController$dataS3;
                const {
                    sort: sort,
                    filter: filter
                } = (null === (_dataController$dataS3 = dataController.dataSource()) || void 0 === _dataController$dataS3 ? void 0 : _dataController$dataS3.lastLoadOptions()) ?? {};
                let minIndex = Math.min(loadItemIndex, focusedItemIndex);
                let maxIndex = Math.max(loadItemIndex, focusedItemIndex);
                if (isDefined(shiftItemIndex)) {
                    minIndex = Math.min(shiftItemIndex, minIndex);
                    maxIndex = Math.max(shiftItemIndex, maxIndex)
                }
                const take = maxIndex - minIndex + 1;
                return {
                    skip: minIndex,
                    take: take,
                    filter: filter,
                    sort: sort
                }
            },
            onSelectionChanged: this._updateSelectedItems.bind(this)
        }
    }
    _updateSelectColumn() {
        const columnsController = this._columnsController;
        const isSelectColumnVisible = this.isSelectColumnVisible();
        columnsController.addCommandColumn({
            type: "selection",
            command: "select",
            visible: isSelectColumnVisible,
            visibleIndex: -1,
            dataType: "boolean",
            alignment: "center",
            cssClass: "dx-command-select",
            width: "auto",
            cellTemplate: selectionCellTemplate,
            headerCellTemplate: selectionHeaderTemplate
        });
        columnsController.columnOption("command:select", "visible", isSelectColumnVisible)
    }
    _createSelection() {
        const options = this._getSelectionConfig();
        return new Selection(options)
    }
    _fireSelectionChanged(options) {
        const argument = this.option("selection.deferred") ? {
            selectionFilter: this.option("selectionFilter")
        } : {
            selectedRowKeys: this.option("selectedRowKeys")
        };
        this.selectionChanged.fire(argument);
        if (options) {
            this.executeAction("onSelectionChanged", options)
        }
    }
    _updateCheckboxesState(options) {
        const {
            isDeferredMode: isDeferredMode
        } = options;
        const {
            selectionFilter: selectionFilter
        } = options;
        const {
            selectedItemKeys: selectedItemKeys
        } = options;
        const {
            removedItemKeys: removedItemKeys
        } = options;
        if ("onClick" === this.option(SHOW_CHECKBOXES_MODE)) {
            if (isDeferredMode ? selectionFilter && isSeveralRowsSelected(this, selectionFilter) : selectedItemKeys.length > 1) {
                this.startSelectionWithCheckboxes()
            } else if (isDeferredMode ? selectionFilter && !selectionFilter.length : 0 === selectedItemKeys.length && removedItemKeys.length) {
                this.stopSelectionWithCheckboxes()
            }
        }
    }
    _updateSelectedItems(args) {
        const that = this;
        let selectionChangedOptions;
        const isDeferredMode = that.option("selection.deferred");
        const selectionFilter = that._selection.selectionFilter();
        const dataController = that._dataController;
        const items = dataController.items(true);
        const visibleItems = dataController.items();
        if (!items) {
            return
        }
        const isSelectionWithCheckboxes = that.isSelectionWithCheckboxes();
        const changedItemIndexes = that.getChangedItemIndexes(items);
        const visibleChangedItemIndexes = that.getChangedItemIndexes(visibleItems);
        that._updateCheckboxesState({
            selectedItemKeys: args.selectedItemKeys,
            removedItemKeys: args.removedItemKeys,
            selectionFilter: selectionFilter,
            isDeferredMode: isDeferredMode
        });
        if (changedItemIndexes.length || isSelectionWithCheckboxes !== that.isSelectionWithCheckboxes()) {
            dataController.updateItems({
                changeType: "updateSelection",
                itemIndexes: visibleChangedItemIndexes
            })
        }
        if (isDeferredMode) {
            that.option("selectionFilter", selectionFilter);
            selectionChangedOptions = {}
        } else if (args.addedItemKeys.length || args.removedItemKeys.length) {
            that._selectedItemsInternalChange = true;
            that.option("selectedRowKeys", args.selectedItemKeys.slice(0));
            that._selectedItemsInternalChange = false;
            selectionChangedOptions = {
                selectedRowsData: args.selectedItems.slice(0),
                selectedRowKeys: args.selectedItemKeys.slice(0),
                currentSelectedRowKeys: args.addedItemKeys.slice(0),
                currentDeselectedRowKeys: args.removedItemKeys.slice(0)
            }
        }
        that._fireSelectionChanged(selectionChangedOptions)
    }
    getChangedItemIndexes(items) {
        const that = this;
        const itemIndexes = [];
        const isDeferredSelection = this.option("selection.deferred");
        for (let i = 0, {
                length: length
            } = items; i < length; i++) {
            const row = items[i];
            const isItemSelected = that.isRowSelected(isDeferredSelection ? row.data : row.key);
            if (that._selection.isDataItem(row) && row.isSelected !== isItemSelected) {
                itemIndexes.push(i)
            }
        }
        return itemIndexes
    }
    callbackNames() {
        return ["selectionChanged"]
    }
    optionChanged(args) {
        super.optionChanged(args);
        switch (args.name) {
            case "selection": {
                const oldSelectionMode = this._selectionMode;
                this.init();
                if ("selection.showCheckBoxesMode" !== args.fullName) {
                    const selectionMode = this._selectionMode;
                    let selectedRowKeys = this.option("selectedRowKeys");
                    if (oldSelectionMode !== selectionMode) {
                        if ("single" === selectionMode) {
                            if (selectedRowKeys.length > 1) {
                                selectedRowKeys = [selectedRowKeys[0]]
                            }
                        } else if ("multiple" !== selectionMode) {
                            selectedRowKeys = []
                        }
                    }
                    this.selectRows(selectedRowKeys).always((() => {
                        this._fireSelectionChanged()
                    }))
                }
                this._columnsController.updateColumns();
                args.handled = true;
                break
            }
            case "selectionFilter":
                this._selection.selectionFilter(args.value);
                args.handled = true;
                break;
            case "selectedRowKeys": {
                const value = args.value || [];
                if (Array.isArray(value) && !this._selectedItemsInternalChange && (this.component.getDataSource() || !value.length)) {
                    this.selectRows(value)
                }
                args.handled = true;
                break
            }
        }
    }
    publicMethods() {
        return ["selectRows", "deselectRows", "selectRowsByIndexes", "getSelectedRowKeys", "getSelectedRowsData", "clearSelection", "selectAll", "deselectAll", "startSelectionWithCheckboxes", "stopSelectionWithCheckboxes", "isRowSelected"]
    }
    isRowSelected(arg) {
        return this._selection.isItemSelected(arg)
    }
    isSelectColumnVisible() {
        return "multiple" === this.option(SELECTION_MODE) && ("always" === this.option(SHOW_CHECKBOXES_MODE) || "onClick" === this.option(SHOW_CHECKBOXES_MODE) || this._isSelectionWithCheckboxes)
    }
    _isOnePageSelectAll() {
        return "page" === this.option("selection.selectAllMode")
    }
    isSelectAll() {
        return this._selection.getSelectAllState(this._isOnePageSelectAll())
    }
    selectAll() {
        if ("onClick" === this.option(SHOW_CHECKBOXES_MODE)) {
            this.startSelectionWithCheckboxes()
        }
        return this._selection.selectAll(this._isOnePageSelectAll())
    }
    deselectAll() {
        return this._selection.deselectAll(this._isOnePageSelectAll())
    }
    clearSelection() {
        return this.selectedItemKeys([])
    }
    refresh() {
        const selectedRowKeys = this.option("selectedRowKeys") ?? [];
        if (!this.option("selection.deferred") && selectedRowKeys.length) {
            return this.selectedItemKeys(selectedRowKeys)
        }
        return (new Deferred).resolve().promise()
    }
    selectedItemKeys(value, preserve, isDeselect, isSelectAll) {
        return this._selection.selectedItemKeys(value, preserve, isDeselect, isSelectAll)
    }
    getSelectedRowKeys(mode) {
        return this._selection.getSelectedItemKeys()
    }
    selectRows(keys, preserve) {
        return this.selectedItemKeys(keys, preserve)
    }
    deselectRows(keys) {
        return this.selectedItemKeys(keys, true, true)
    }
    selectRowsByIndexes(indexes) {
        const items = this._dataController.items();
        const keys = [];
        if (!Array.isArray(indexes)) {
            indexes = Array.prototype.slice.call(arguments, 0)
        }
        each(indexes, (function() {
            const item = items[this];
            if (item && "data" === item.rowType) {
                keys.push(item.key)
            }
        }));
        return this.selectRows(keys)
    }
    getSelectedRowsData(mode) {
        return this._selection.getSelectedItems()
    }
    loadSelectedItemsWithFilter() {
        return this._selection.loadSelectedItemsWithFilter()
    }
    changeItemSelection(visibleItemIndex, keys, setFocusOnly) {
        keys = keys || {};
        if (this.isSelectionWithCheckboxes()) {
            keys.control = true
        }
        const loadedItemIndex = visibleItemIndex + this._dataController.getRowIndexOffset() - this._dataController.getRowIndexOffset(true);
        return this._selection.changeItemSelection(loadedItemIndex, keys, setFocusOnly)
    }
    focusedItemIndex(itemIndex) {
        const that = this;
        if (isDefined(itemIndex)) {
            that._selection._focusedItemIndex = itemIndex
        } else {
            return that._selection._focusedItemIndex
        }
        return
    }
    isSelectionWithCheckboxes() {
        return "multiple" === this.option(SELECTION_MODE) && ("always" === this.option(SHOW_CHECKBOXES_MODE) || this._isSelectionWithCheckboxes)
    }
    startSelectionWithCheckboxes() {
        const that = this;
        if ("multiple" === that.option(SELECTION_MODE) && !that.isSelectionWithCheckboxes()) {
            that._isSelectionWithCheckboxes = true;
            that._updateSelectColumn();
            return true
        }
        return false
    }
    stopSelectionWithCheckboxes() {
        const that = this;
        if (that._isSelectionWithCheckboxes) {
            that._isSelectionWithCheckboxes = false;
            that._updateSelectColumn();
            return true
        }
        return false
    }
}
export const dataSelectionExtenderMixin = Base => class extends Base {
    init() {
        const isDeferredMode = this.option("selection.deferred");
        super.init.apply(this, arguments);
        if (isDeferredMode) {
            this._selectionController._updateCheckboxesState({
                isDeferredMode: true,
                selectionFilter: this.option("selectionFilter")
            })
        }
    }
    _loadDataSource() {
        const that = this;
        return super._loadDataSource().always((() => {
            that._selectionController.refresh()
        }))
    }
    _processDataItem(item, options) {
        const hasSelectColumn = this._selectionController.isSelectColumnVisible();
        const isDeferredSelection = options.isDeferredSelection = void 0 === options.isDeferredSelection ? this.option("selection.deferred") : options.isDeferredSelection;
        const dataItem = super._processDataItem.apply(this, arguments);
        dataItem.isSelected = this._selectionController.isRowSelected(isDeferredSelection ? dataItem.data : dataItem.key);
        if (hasSelectColumn && dataItem.values) {
            for (let i = 0; i < options.visibleColumns.length; i++) {
                if ("select" === options.visibleColumns[i].command) {
                    dataItem.values[i] = dataItem.isSelected;
                    break
                }
            }
        }
        return dataItem
    }
    refresh(options) {
        const that = this;
        const d = new Deferred;
        super.refresh.apply(this, arguments).done((() => {
            if (!options || options.selection) {
                that._selectionController.refresh().done(d.resolve).fail(d.reject)
            } else {
                d.resolve()
            }
        })).fail(d.reject);
        return d.promise()
    }
    _handleDataChanged(e) {
        const hasLoadOperation = this.hasLoadOperation();
        super._handleDataChanged.apply(this, arguments);
        if (hasLoadOperation && !this._repaintChangesOnly) {
            this._selectionController.focusedItemIndex(-1)
        }
    }
    _applyChange(change) {
        if (change && "updateSelection" === change.changeType) {
            change.items.forEach(((item, index) => {
                const currentItem = this._items[index];
                if (currentItem) {
                    currentItem.isSelected = item.isSelected;
                    currentItem.values = item.values
                }
            }));
            return
        }
        return super._applyChange.apply(this, arguments)
    }
    _endUpdateCore() {
        const changes = this._changes;
        const isUpdateSelection = changes.length > 1 && changes.every((change => "updateSelection" === change.changeType));
        if (isUpdateSelection) {
            const itemIndexes = changes.map((change => change.itemIndexes || [])).reduce(((a, b) => a.concat(b)));
            this._changes = [{
                changeType: "updateSelection",
                itemIndexes: itemIndexes
            }]
        }
        super._endUpdateCore.apply(this, arguments)
    }
};
const contextMenu = Base => class extends Base {
    _contextMenuPrepared(options) {
        const dxEvent = options.event;
        if (dxEvent.originalEvent && "dxhold" !== dxEvent.originalEvent.type || options.items && options.items.length > 0) {
            return
        }
        processLongTap(this, dxEvent)
    }
};
export const columnHeadersSelectionExtenderMixin = Base => class extends Base {
    init() {
        super.init();
        this._selectionController.selectionChanged.add(this._updateSelectAllValue.bind(this))
    }
    _updateSelectAllValue() {
        const that = this;
        const $element = that.element();
        const $editor = $element && $element.find(".dx-select-checkbox");
        if ($element && $editor.length && "multiple" === that.option("selection.mode")) {
            const selectAllValue = that._selectionController.isSelectAll();
            const hasSelection = false !== selectAllValue;
            const isVisible = that.option("selection.allowSelectAll") ? !that._dataController.isEmpty() : hasSelection;
            $editor.dxCheckBox("instance").option({
                visible: isVisible,
                value: selectAllValue
            })
        }
    }
    _handleDataChanged(e) {
        super._handleDataChanged(e);
        if (!e || "refresh" === e.changeType || e.repaintChangesOnly && "update" === e.changeType) {
            this.waitAsyncTemplates().done((() => {
                this._updateSelectAllValue()
            }))
        }
    }
    _renderSelectAllCheckBox($container, column) {
        const that = this;
        const isEmptyData = that._dataController.isEmpty();
        const groupElement = $("<div>").appendTo($container).addClass("dx-select-checkbox");
        that.setAria("label", messageLocalization.format("dxDataGrid-ariaSelectAll"), groupElement);
        that._editorFactoryController.createEditor(groupElement, extend({}, column, {
            parentType: "headerRow",
            dataType: "boolean",
            value: this._selectionController.isSelectAll(),
            editorOptions: {
                visible: !isEmptyData && (that.option("selection.allowSelectAll") || false !== this._selectionController.isSelectAll())
            },
            tabIndex: that.option("useLegacyKeyboardNavigation") ? -1 : that.option("tabIndex") || 0,
            setValue: (value, e) => {
                const allowSelectAll = that.option("selection.allowSelectAll");
                e.component.option("visible", allowSelectAll || false !== e.component.option("value"));
                if (!e.event || this._selectionController.isSelectAll() === value) {
                    return
                }
                if (e.value && !allowSelectAll) {
                    e.component.option("value", false)
                } else {
                    e.value ? this._selectionController.selectAll() : this._selectionController.deselectAll()
                }
                e.event.preventDefault()
            }
        }));
        return groupElement
    }
    _attachSelectAllCheckBoxClickEvent($element) {
        eventsEngine.on($element, clickEventName, this.createAction((e => {
            const {
                event: event
            } = e;
            if (!$(event.target).closest(".dx-select-checkbox").length) {
                eventsEngine.trigger($(event.currentTarget).children(".dx-select-checkbox"), clickEventName)
            }
            event.preventDefault()
        })))
    }
};
export const rowsViewSelectionExtenderMixin = Base => class extends Base {
    renderSelectCheckBoxContainer($container, options) {
        if ("data" === options.rowType && !options.row.isNewRow) {
            $container.addClass("dx-editor-cell");
            this._attachCheckBoxClickEvent($container);
            this._renderSelectCheckBox($container, options)
        } else {
            gridCoreUtils.setEmptyText($container)
        }
    }
    _renderSelectCheckBox(container, options) {
        const groupElement = $("<div>").addClass("dx-select-checkbox").appendTo(container);
        this.setAria("label", messageLocalization.format("dxDataGrid-ariaSelectRow"), groupElement);
        this._editorFactoryController.createEditor(groupElement, extend({}, options.column, {
            parentType: "dataRow",
            dataType: "boolean",
            lookup: null,
            value: options.value,
            setValue(value, e) {
                var _e$event;
                if ("keydown" === (null === e || void 0 === e || null === (_e$event = e.event) || void 0 === _e$event ? void 0 : _e$event.type)) {
                    eventsEngine.trigger(e.element, clickEventName, e)
                }
            },
            row: options.row
        }));
        return groupElement
    }
    _attachCheckBoxClickEvent($element) {
        eventsEngine.on($element, clickEventName, this.createAction((function(e) {
            const {
                event: event
            } = e;
            const rowIndex = this.getRowIndex($(event.currentTarget).closest(".dx-row"));
            if (rowIndex >= 0) {
                this._selectionController.startSelectionWithCheckboxes();
                this._selectionController.changeItemSelection(rowIndex, {
                    shift: event.shiftKey
                });
                if ($(event.target).closest(".dx-select-checkbox").length) {
                    this._dataController.updateItems({
                        changeType: "updateSelection",
                        itemIndexes: [rowIndex]
                    })
                }
            }
        })))
    }
    _update(change) {
        const that = this;
        const tableElements = that.getTableElements();
        if ("updateSelection" === change.changeType) {
            if (tableElements.length > 0) {
                each(tableElements, ((_, tableElement) => {
                    each(change.itemIndexes || [], ((_, index) => {
                        let $row;
                        if (change.items[index]) {
                            $row = that._getRowElements($(tableElement)).eq(index);
                            if ($row.length) {
                                const {
                                    isSelected: isSelected
                                } = change.items[index];
                                $row.toggleClass("dx-selection", void 0 === isSelected ? false : isSelected).find(".dx-select-checkbox").dxCheckBox("option", "value", isSelected);
                                that.setAria("selected", isSelected, $row)
                            }
                        }
                    }))
                }));
                that._updateCheckboxesClass()
            }
        } else {
            super._update(change)
        }
    }
    _createTable() {
        const that = this;
        const selectionMode = that.option("selection.mode");
        const $table = super._createTable.apply(that, arguments);
        if ("none" !== selectionMode) {
            if ("onLongTap" === that.option(SHOW_CHECKBOXES_MODE) || !touch) {
                eventsEngine.on($table, addNamespace(holdEvent.name, "dxDataGridRowsView"), ".dx-data-row", that.createAction((e => {
                    processLongTap(that.component, e.event);
                    e.event.stopPropagation()
                })))
            }
            eventsEngine.on($table, "mousedown selectstart", that.createAction((e => {
                const {
                    event: event
                } = e;
                if (event.shiftKey) {
                    event.preventDefault()
                }
            })))
        }
        return $table
    }
    _createRow(row) {
        const $row = super._createRow.apply(this, arguments);
        if (row) {
            const {
                isSelected: isSelected
            } = row;
            if (isSelected) {
                $row.addClass("dx-selection")
            }
            const selectionMode = this.option(SELECTION_MODE);
            if ("none" !== selectionMode) {
                this.setAria("selected", isSelected, $row)
            }
        }
        return $row
    }
    _rowClickForTreeList(e) {
        super._rowClick(e)
    }
    _rowClick(e) {
        const that = this;
        const dxEvent = e.event;
        const isSelectionDisabled = $(dxEvent.target).closest(".dx-selection-disabled").length;
        if (!that.isClickableElement($(dxEvent.target))) {
            if (!isSelectionDisabled && ("multiple" !== that.option(SELECTION_MODE) || "always" !== that.option(SHOW_CHECKBOXES_MODE))) {
                if (that._selectionController.changeItemSelection(e.rowIndex, {
                        control: isCommandKeyPressed(dxEvent),
                        shift: dxEvent.shiftKey
                    })) {
                    dxEvent.preventDefault();
                    e.handled = true
                }
            }
            super._rowClick(e)
        }
    }
    isClickableElement($target) {
        const isCommandSelect = $target.closest(".dx-command-select").length;
        return !!isCommandSelect
    }
    _renderCore(change) {
        const deferred = super._renderCore(change);
        this._updateCheckboxesClass();
        return deferred
    }
    _updateCheckboxesClass() {
        const tableElements = this.getTableElements();
        const isCheckBoxesHidden = this._selectionController.isSelectColumnVisible() && !this._selectionController.isSelectionWithCheckboxes();
        each(tableElements, ((_, tableElement) => {
            $(tableElement).toggleClass(CHECKBOXES_HIDDEN_CLASS, isCheckBoxesHidden)
        }))
    }
};
export const selectionModule = {
    defaultOptions: () => ({
        selection: {
            mode: "none",
            showCheckBoxesMode: "onClick",
            allowSelectAll: true,
            selectAllMode: "allPages",
            deferred: false,
            maxFilterLengthInRequest: 1500,
            alwaysSelectByShift: false
        },
        selectionFilter: [],
        selectedRowKeys: []
    }),
    controllers: {
        selection: SelectionController
    },
    extenders: {
        controllers: {
            data: dataSelectionExtenderMixin,
            contextMenu: contextMenu
        },
        views: {
            columnHeadersView: columnHeadersSelectionExtenderMixin,
            rowsView: rowsViewSelectionExtenderMixin
        }
    }
};
