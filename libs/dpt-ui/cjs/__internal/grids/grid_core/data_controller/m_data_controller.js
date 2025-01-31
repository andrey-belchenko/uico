/**
 * DevExtreme (cjs/__internal/grids/grid_core/data_controller/m_data_controller.js)
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
exports.dataControllerModule = exports.DataController = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _array_compare = require("../../../../core/utils/array_compare");
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _array_store = _interopRequireDefault(require("../../../../data/array_store"));
var _custom_store = _interopRequireDefault(require("../../../../data/custom_store"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _m_data_helper_mixin = require("./m_data_helper_mixin");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const changePaging = function(that, optionName, value) {
    const dataSource = that._dataSource;
    if (dataSource) {
        if (void 0 !== value) {
            const oldValue = that._getPagingOptionValue(optionName);
            if (oldValue !== value) {
                if ("pageSize" === optionName) {
                    dataSource.pageIndex(0)
                }
                dataSource[optionName](value);
                that._skipProcessingPagingChange = true;
                that.option(`paging.${optionName}`, value);
                that._skipProcessingPagingChange = false;
                const pageIndex = dataSource.pageIndex();
                that._isPaging = "pageIndex" === optionName;
                return dataSource["pageIndex" === optionName ? "load" : "reload"]().done((() => {
                    that._isPaging = false;
                    that.pageChanged.fire(pageIndex)
                }))
            }
            return (0, _deferred.Deferred)().resolve().promise()
        }
        return dataSource[optionName]()
    }
    return 0
};
class DataController extends((0, _m_data_helper_mixin.DataHelperMixin)(_m_modules.default.Controller)) {
    init() {
        this._items = [];
        this._cachedProcessedItems = null;
        this._columnsController = this.getController("columns");
        this._adaptiveColumnsController = this.getController("adaptiveColumns");
        this._editingController = this.getController("editing");
        this._editorFactoryController = this.getController("editorFactory");
        this._errorHandlingController = this.getController("errorHandling");
        this._filterSyncController = this.getController("filterSync");
        this._applyFilterController = this.getController("applyFilter");
        this._keyboardNavigationController = this.getController("keyboardNavigation");
        this._focusController = this.getController("focus");
        this._headerFilterController = this.getController("headerFilter");
        this._selectionController = this.getController("selection");
        this._stateStoringController = this.getController("stateStoring");
        this._validatingController = this.getController("validating");
        this._isPaging = false;
        this._currentOperationTypes = null;
        this._dataChangedHandler = e => {
            this._currentOperationTypes = this._dataSource.operationTypes();
            this._handleDataChanged(e);
            this._currentOperationTypes = null
        };
        this._columnsChangedHandler = this._handleColumnsChanged.bind(this);
        this._loadingChangedHandler = this._handleLoadingChanged.bind(this);
        this._loadErrorHandler = this._handleLoadError.bind(this);
        this._customizeStoreLoadOptionsHandler = this._handleCustomizeStoreLoadOptions.bind(this);
        this._changingHandler = this._handleChanging.bind(this);
        this._dataPushedHandler = this._handleDataPushed.bind(this);
        this._columnsController.columnsChanged.add(this._columnsChangedHandler);
        this._isLoading = false;
        this._isCustomLoading = false;
        this._repaintChangesOnly = void 0;
        this._changes = [];
        this.createAction("onDataErrorOccurred");
        this.dataErrorOccurred.add((error => this.executeAction("onDataErrorOccurred", {
            error: error
        })));
        this._refreshDataSource();
        this.postCtor()
    }
    _getPagingOptionValue(optionName) {
        return this._dataSource[optionName]()
    }
    callbackNames() {
        return ["changed", "loadingChanged", "dataErrorOccurred", "pageChanged", "dataSourceChanged", "pushed"]
    }
    callbackFlags(name) {
        if ("dataErrorOccurred" === name) {
            return {
                stopOnFalse: true
            }
        }
        return
    }
    publicMethods() {
        return ["_disposeDataSource", "beginCustomLoading", "byKey", "clearFilter", "endCustomLoading", "filter", "getCombinedFilter", "getDataByKeys", "getDataSource", "getKeyByRowIndex", "getRowIndexByKey", "getVisibleRows", "keyOf", "pageCount", "pageIndex", "pageSize", "refresh", "repaintRows", "totalCount"]
    }
    reset() {
        this._columnsController.reset();
        this._items = [];
        this._refreshDataSource()
    }
    _handleDataSourceChange(args) {
        if (args.value === args.previousValue || this.option("columns") && Array.isArray(args.value) && Array.isArray(args.previousValue)) {
            const isValueChanged = args.value !== args.previousValue;
            if (isValueChanged) {
                const store = this.store();
                if (store) {
                    store._array = args.value
                }
            }
            if (this.needToRefreshOnDataSourceChange(args)) {
                this.refresh(this.option("repaintChangesOnly"))
            }
            return true
        }
        return false
    }
    needToRefreshOnDataSourceChange(args) {
        return true
    }
    optionChanged(args) {
        const that = this;
        let dataSource;
        let changedPagingOptions;

        function handled() {
            args.handled = true
        }
        if ("dataSource" === args.name && args.name === args.fullName && this._handleDataSourceChange(args)) {
            handled();
            return
        }
        switch (args.name) {
            case "cacheEnabled":
            case "repaintChangesOnly":
            case "highlightChanges":
            case "loadingTimeout":
                handled();
                break;
            case "remoteOperations":
            case "keyExpr":
            case "dataSource":
            case "scrolling":
                handled();
                that.reset();
                break;
            case "paging":
                dataSource = that.dataSource();
                if (dataSource) {
                    changedPagingOptions = that._setPagingOptions(dataSource);
                    if (changedPagingOptions) {
                        const pageIndex = dataSource.pageIndex();
                        this._isPaging = changedPagingOptions.isPageIndexChanged;
                        dataSource.load().done((() => {
                            this._isPaging = false;
                            that.pageChanged.fire(pageIndex)
                        }))
                    }
                }
                handled();
                break;
            case "rtlEnabled":
                that.reset();
                break;
            case "columns":
                dataSource = that.dataSource();
                if (dataSource && dataSource.isLoading() && args.name === args.fullName) {
                    this._useSortingGroupingFromColumns = true;
                    dataSource.load()
                }
                break;
            default:
                super.optionChanged(args)
        }
    }
    isReady() {
        return !this._isLoading
    }
    getDataSource() {
        return this._dataSource && this._dataSource._dataSource
    }
    getCombinedFilter(returnDataField) {
        return this.combinedFilter(void 0, returnDataField)
    }
    combinedFilter(filter, returnDataField) {
        if (!this._dataSource) {
            return filter
        }
        let combined = filter ?? this._dataSource.filter();
        const isColumnsTypesDefined = this._columnsController.isDataSourceApplied() || this._columnsController.isAllDataTypesDefined();
        if (isColumnsTypesDefined) {
            const additionalFilter = this._calculateAdditionalFilter();
            combined = additionalFilter ? _m_utils.default.combineFilters([additionalFilter, combined]) : combined
        }
        const isRemoteFiltering = this._dataSource.remoteOperations().filtering || returnDataField;
        combined = this._columnsController.updateFilter(combined, isRemoteFiltering);
        return combined
    }
    waitReady() {
        if (this._updateLockCount) {
            this._readyDeferred = new _deferred.Deferred;
            return this._readyDeferred
        }
        return (0, _deferred.when)()
    }
    _endUpdateCore() {
        const changes = this._changes;
        if (changes.length) {
            this._changes = [];
            const repaintChangesOnly = changes.every((change => change.repaintChangesOnly));
            this.updateItems(1 === changes.length ? changes[0] : {
                repaintChangesOnly: repaintChangesOnly
            })
        }
        if (this._readyDeferred) {
            this._readyDeferred.resolve();
            this._readyDeferred = null
        }
    }
    _handleCustomizeStoreLoadOptions(e) {
        var _storeLoadOptions$fil;
        const columnsController = this._columnsController;
        const dataSource = this._dataSource;
        const {
            storeLoadOptions: storeLoadOptions
        } = e;
        if (e.isCustomLoading && !storeLoadOptions.isLoadingAll) {
            return
        }
        storeLoadOptions.filter = this.combinedFilter(storeLoadOptions.filter);
        if (1 === (null === (_storeLoadOptions$fil = storeLoadOptions.filter) || void 0 === _storeLoadOptions$fil ? void 0 : _storeLoadOptions$fil.length) && "!" === storeLoadOptions.filter[0]) {
            e.data = [];
            e.extra = e.extra || {};
            e.extra.totalCount = 0
        }
        if (!columnsController.isDataSourceApplied()) {
            columnsController.updateColumnDataTypes(dataSource)
        }
        this._columnsUpdating = true;
        columnsController.updateSortingGrouping(dataSource, !this._useSortingGroupingFromColumns);
        this._columnsUpdating = false;
        storeLoadOptions.sort = columnsController.getSortDataSourceParameters();
        storeLoadOptions.group = columnsController.getGroupDataSourceParameters();
        dataSource.sort(storeLoadOptions.sort);
        dataSource.group(storeLoadOptions.group);
        storeLoadOptions.sort = columnsController.getSortDataSourceParameters(!dataSource.remoteOperations().sorting);
        e.group = columnsController.getGroupDataSourceParameters(!dataSource.remoteOperations().grouping)
    }
    _handleColumnsChanged(e) {
        const that = this;
        const {
            changeTypes: changeTypes
        } = e;
        const {
            optionNames: optionNames
        } = e;
        let filterValue;
        let filterValues;
        let filterApplied;
        const updateItemsHandler = function(change) {
            var _change$changeTypes;
            that._columnsController.columnsChanged.remove(updateItemsHandler);
            that.updateItems({
                repaintChangesOnly: false,
                virtualColumnsScrolling: null === change || void 0 === change || null === (_change$changeTypes = change.changeTypes) || void 0 === _change$changeTypes ? void 0 : _change$changeTypes.virtualColumnsScrolling
            })
        };
        if (changeTypes.sorting || changeTypes.grouping) {
            if (that._dataSource && !that._columnsUpdating) {
                that._dataSource.group(that._columnsController.getGroupDataSourceParameters());
                that._dataSource.sort(that._columnsController.getSortDataSourceParameters());
                that.reload()
            }
        } else if (changeTypes.columns) {
            filterValues = that._columnsController.columnOption(e.columnIndex, "filterValues");
            if (optionNames.filterValues || optionNames.filterType && Array.isArray(filterValues) || optionNames.filterValue || optionNames.selectedFilterOperation || optionNames.allowFiltering) {
                filterValue = that._columnsController.columnOption(e.columnIndex, "filterValue");
                if (Array.isArray(filterValues) || void 0 === e.columnIndex || (0, _type.isDefined)(filterValue) || !optionNames.selectedFilterOperation || optionNames.filterValue) {
                    that._applyFilter();
                    filterApplied = true
                }
            }
            if (!that._needApplyFilter && !_m_utils.default.checkChanges(optionNames, ["width", "visibleWidth", "filterValue", "bufferedFilterValue", "selectedFilterOperation", "filterValues", "filterType"])) {
                that._columnsController.columnsChanged.add(updateItemsHandler)
            }
            if ((0, _type.isDefined)(optionNames.visible)) {
                const column = that._columnsController.columnOption(e.columnIndex);
                if (column && ((0, _type.isDefined)(column.filterValue) || (0, _type.isDefined)(column.filterValues))) {
                    that._applyFilter();
                    filterApplied = true
                }
            }
        }
        if (!filterApplied && changeTypes.filtering && !this._needApplyFilter) {
            that.reload()
        }
    }
    _handleDataChanged(e) {
        const that = this;
        const dataSource = that._dataSource;
        const columnsController = that._columnsController;
        let isAsyncDataSourceApplying = false;
        this._useSortingGroupingFromColumns = false;
        if (dataSource && !that._isDataSourceApplying) {
            that._isDataSourceApplying = true;
            (0, _deferred.when)(that._columnsController.applyDataSource(dataSource)).done((() => {
                if (that._isLoading) {
                    that._handleLoadingChanged(false)
                }
                if (isAsyncDataSourceApplying && e && e.isDelayed) {
                    e.isDelayed = false
                }
                that._isDataSourceApplying = false;
                const needApplyFilter = that._needApplyFilter;
                that._needApplyFilter = false;
                if (needApplyFilter && !that._isAllDataTypesDefined && (() => {
                        const additionalFilter = that._calculateAdditionalFilter();
                        return additionalFilter && additionalFilter.length
                    })()) {
                    _ui.default.log("W1005", that.component.NAME);
                    that._applyFilter()
                } else {
                    that.updateItems(e, true)
                }
            })).fail((() => {
                that._isDataSourceApplying = false
            }));
            if (that._isDataSourceApplying) {
                isAsyncDataSourceApplying = true;
                that._handleLoadingChanged(true)
            }
            that._needApplyFilter = !that._columnsController.isDataSourceApplied();
            that._isAllDataTypesDefined = columnsController.isAllDataTypesDefined()
        }
    }
    _handleLoadingChanged(isLoading) {
        this._isLoading = isLoading;
        this._fireLoadingChanged()
    }
    _handleLoadError(e) {
        this.dataErrorOccurred.fire(e)
    }
    _handleDataPushed(changes) {
        this.pushed.fire(changes)
    }
    fireError() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        this.dataErrorOccurred.fire(_ui.default.Error.apply(_ui.default, args))
    }
    _setPagingOptions(dataSource) {
        const pageIndex = this.option("paging.pageIndex");
        const pageSize = this.option("paging.pageSize");
        const pagingEnabled = this.option("paging.enabled");
        const scrollingMode = this.option("scrolling.mode");
        const appendMode = "infinite" === scrollingMode;
        const virtualMode = "virtual" === scrollingMode;
        const paginate = pagingEnabled || virtualMode || appendMode;
        let isPaginateChanged = false;
        let isPageSizeChanged = false;
        let isPageIndexChanged = false;
        dataSource.requireTotalCount(!appendMode);
        if (void 0 !== pagingEnabled && dataSource.paginate() !== paginate) {
            dataSource.paginate(paginate);
            isPaginateChanged = true
        }
        if (void 0 !== pageSize && dataSource.pageSize() !== pageSize) {
            dataSource.pageSize(pageSize);
            isPageSizeChanged = true
        }
        if (void 0 !== pageIndex && dataSource.pageIndex() !== pageIndex) {
            dataSource.pageIndex(pageIndex);
            isPageIndexChanged = true
        }
        if (isPaginateChanged || isPageSizeChanged || isPageIndexChanged) {
            return {
                isPaginateChanged: isPaginateChanged,
                isPageSizeChanged: isPageSizeChanged,
                isPageIndexChanged: isPageIndexChanged
            }
        }
        return false
    }
    _getSpecificDataSourceOption() {
        const dataSource = this.option("dataSource");
        if (Array.isArray(dataSource)) {
            return {
                store: {
                    type: "array",
                    data: dataSource,
                    key: this.option("keyExpr")
                }
            }
        }
        return dataSource
    }
    _initDataSource() {
        const that = this;
        const oldDataSource = this._dataSource;
        super._initDataSource();
        const dataSource = that._dataSource;
        that._useSortingGroupingFromColumns = true;
        that._cachedProcessedItems = null;
        if (dataSource) {
            const changedPagingOptions = that._setPagingOptions(dataSource);
            this._isPaging = null === changedPagingOptions || void 0 === changedPagingOptions ? void 0 : changedPagingOptions.isPageIndexChanged;
            that.setDataSource(dataSource)
        } else if (oldDataSource) {
            that.updateItems()
        }
    }
    _loadDataSource() {
        const that = this;
        const dataSource = that._dataSource;
        const result = new _deferred.Deferred;
        (0, _deferred.when)(this._columnsController.refresh(true)).always((() => {
            if (dataSource) {
                dataSource.load().done((function() {
                    that._isPaging = false;
                    result.resolve.apply(result, arguments)
                })).fail(result.reject)
            } else {
                result.resolve()
            }
        }));
        return result.promise()
    }
    _beforeProcessItems(items) {
        return items.slice(0)
    }
    getRowIndexDelta() {
        return 0
    }
    getDataIndex(change) {
        const visibleItems = this._items;
        const lastVisibleItem = "append" === change.changeType && visibleItems.length > 0 ? visibleItems[visibleItems.length - 1] : null;
        return (0, _type.isDefined)(null === lastVisibleItem || void 0 === lastVisibleItem ? void 0 : lastVisibleItem.dataIndex) ? lastVisibleItem.dataIndex + 1 : 0
    }
    _processItems(items, change) {
        const that = this;
        const rowIndexDelta = that.getRowIndexDelta();
        const {
            changeType: changeType
        } = change;
        const visibleColumns = that._columnsController.getVisibleColumns(null, "loadingAll" === changeType);
        const dataIndex = this.getDataIndex(change);
        const options = {
            visibleColumns: visibleColumns,
            dataIndex: dataIndex
        };
        const result = [];
        (0, _iterator.each)(items, ((index, item) => {
            if ((0, _type.isDefined)(item)) {
                options.rowIndex = index - rowIndexDelta;
                item = that._processItem(item, options);
                result.push(item)
            }
        }));
        return result
    }
    _processItem(item, options) {
        item = this._generateDataItem(item, options);
        item = this._processDataItem(item, options);
        item.dataIndex = options.dataIndex++;
        return item
    }
    _generateDataItem(data, options) {
        return {
            rowType: "data",
            data: data,
            key: this.keyOf(data)
        }
    }
    _processDataItem(dataItem, options) {
        dataItem.values = this.generateDataValues(dataItem.data, options.visibleColumns);
        return dataItem
    }
    generateDataValues(data, columns, isModified) {
        const values = [];
        let value;
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            value = isModified ? void 0 : null;
            if (!column.command) {
                if (column.calculateCellValue) {
                    value = column.calculateCellValue(data)
                } else if (column.dataField) {
                    value = data[column.dataField]
                }
            }
            values.push(value)
        }
        return values
    }
    _applyChange(change) {
        const that = this;
        if ("update" === change.changeType) {
            that._applyChangeUpdate(change)
        } else if (that.items().length && change.repaintChangesOnly && "refresh" === change.changeType) {
            that._applyChangesOnly(change)
        } else if ("refresh" === change.changeType) {
            that._applyChangeFull(change)
        }
    }
    _applyChangeFull(change) {
        this._items = change.items.slice(0)
    }
    _getRowIndices(change) {
        const rowIndices = change.rowIndices.slice(0);
        const rowIndexDelta = this.getRowIndexDelta();
        rowIndices.sort(((a, b) => a - b));
        for (let i = 0; i < rowIndices.length; i++) {
            let correctedRowIndex = rowIndices[i];
            if (change.allowInvisibleRowIndices) {
                correctedRowIndex += rowIndexDelta
            }
            if (correctedRowIndex < 0) {
                rowIndices.splice(i, 1);
                i--
            }
        }
        return rowIndices
    }
    _applyChangeUpdate(change) {
        const that = this;
        const {
            items: items
        } = change;
        const rowIndices = that._getRowIndices(change);
        const rowIndexDelta = that.getRowIndexDelta();
        const repaintChangesOnly = that.option("repaintChangesOnly");
        let prevIndex = -1;
        let rowIndexCorrection = 0;
        let changeType;
        change.items = [];
        change.rowIndices = [];
        change.columnIndices = [];
        change.changeTypes = [];
        const equalItems = function(item1, item2, strict) {
            let result = item1 && item2 && (0, _common.equalByValue)(item1.key, item2.key);
            if (result && strict) {
                result = item1.rowType === item2.rowType && ("detail" !== item2.rowType || item1.isEditing === item2.isEditing)
            }
            return result
        };
        (0, _iterator.each)(rowIndices, ((index, rowIndex) => {
            let columnIndices;
            rowIndex += rowIndexCorrection + rowIndexDelta;
            if (prevIndex === rowIndex) {
                return
            }
            prevIndex = rowIndex;
            const oldItem = that._items[rowIndex];
            const oldNextItem = that._items[rowIndex + 1];
            const newItem = items[rowIndex];
            const newNextItem = items[rowIndex + 1];
            const strict = equalItems(oldItem, oldNextItem) || equalItems(newItem, newNextItem);
            if (newItem) {
                newItem.rowIndex = rowIndex;
                change.items.push(newItem)
            }
            if (oldItem && newItem && equalItems(oldItem, newItem, strict)) {
                changeType = "update";
                that._items[rowIndex] = newItem;
                if (oldItem.visible !== newItem.visible) {
                    change.items.splice(-1, 1, {
                        visible: newItem.visible
                    })
                } else if (repaintChangesOnly && !change.isFullUpdate) {
                    columnIndices = that._partialUpdateRow(oldItem, newItem, rowIndex - rowIndexDelta)
                }
            } else if (newItem && !oldItem || newNextItem && equalItems(oldItem, newNextItem, strict)) {
                changeType = "insert";
                that._items.splice(rowIndex, 0, newItem);
                rowIndexCorrection++
            } else if (oldItem && !newItem || oldNextItem && equalItems(newItem, oldNextItem, strict)) {
                changeType = "remove";
                that._items.splice(rowIndex, 1);
                rowIndexCorrection--;
                prevIndex = -1
            } else if (newItem) {
                changeType = "update";
                that._items[rowIndex] = newItem
            } else {
                return
            }
            change.rowIndices.push(rowIndex - rowIndexDelta);
            change.changeTypes.push(changeType);
            change.columnIndices.push(columnIndices)
        }))
    }
    _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
        if (JSON.stringify(oldRow.values[columnIndex]) !== JSON.stringify(newRow.values[columnIndex])) {
            return true
        }

        function isCellModified(row, columnIndex) {
            return row.modifiedValues ? void 0 !== row.modifiedValues[columnIndex] : false
        }
        if (isCellModified(oldRow, columnIndex) !== isCellModified(newRow, columnIndex)) {
            return true
        }
        return false
    }
    _getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
        let columnIndices;
        if (oldItem.rowType === newItem.rowType) {
            if ("group" !== newItem.rowType && "groupFooter" !== newItem.rowType) {
                columnIndices = [];
                if ("detail" !== newItem.rowType) {
                    for (let columnIndex = 0; columnIndex < oldItem.values.length; columnIndex++) {
                        if (this._isCellChanged(oldItem, newItem, visibleRowIndex, columnIndex, isLiveUpdate)) {
                            columnIndices.push(columnIndex)
                        }
                    }
                }
            }
            if ("group" === newItem.rowType && oldItem.cells) {
                const isRowStateEquals = newItem.isExpanded === oldItem.isExpanded && newItem.data.isContinuation === oldItem.data.isContinuation && newItem.data.isContinuationOnNextPage === oldItem.data.isContinuationOnNextPage;
                if (isRowStateEquals) {
                    columnIndices = oldItem.cells.map(((cell, index) => {
                        var _cell$column;
                        return "groupExpand" !== (null === (_cell$column = cell.column) || void 0 === _cell$column ? void 0 : _cell$column.type) ? index : -1
                    })).filter((index => index >= 0))
                }
            }
        }
        return columnIndices
    }
    _partialUpdateRow(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
        var _changedColumnIndices;
        let changedColumnIndices = this._getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate);
        if (null !== (_changedColumnIndices = changedColumnIndices) && void 0 !== _changedColumnIndices && _changedColumnIndices.length && this.option("dataRowTemplate")) {
            changedColumnIndices = void 0
        }
        if (changedColumnIndices) {
            oldItem.cells && oldItem.cells.forEach(((cell, columnIndex) => {
                const isCellChanged = changedColumnIndices.indexOf(columnIndex) >= 0;
                if (!isCellChanged && cell && cell.update) {
                    cell.update(newItem)
                }
            }));
            newItem.update = oldItem.update;
            newItem.watch = oldItem.watch;
            newItem.cells = oldItem.cells;
            if (isLiveUpdate) {
                newItem.oldValues = oldItem.values
            }
            oldItem.update && oldItem.update(newItem)
        }
        return changedColumnIndices
    }
    _isItemEquals(item1, item2) {
        if (JSON.stringify(item1.values) !== JSON.stringify(item2.values)) {
            return false
        }
        if (["modified", "isNewRow", "removed", "isEditing"].some((field => item1[field] !== item2[field]))) {
            return false
        }
        if ("group" === item1.rowType || "groupFooter" === item1.rowType) {
            var _item1$data, _item2$data, _item1$data2, _item2$data2;
            const expandedMatch = item1.isExpanded === item2.isExpanded;
            const summaryCellsMatch = JSON.stringify(item1.summaryCells) === JSON.stringify(item2.summaryCells);
            const continuationMatch = (null === (_item1$data = item1.data) || void 0 === _item1$data ? void 0 : _item1$data.isContinuation) === (null === (_item2$data = item2.data) || void 0 === _item2$data ? void 0 : _item2$data.isContinuation) && (null === (_item1$data2 = item1.data) || void 0 === _item1$data2 ? void 0 : _item1$data2.isContinuationOnNextPage) === (null === (_item2$data2 = item2.data) || void 0 === _item2$data2 ? void 0 : _item2$data2.isContinuationOnNextPage);
            if (!expandedMatch || !summaryCellsMatch || !continuationMatch) {
                return false
            }
        }
        return true
    }
    _applyChangesOnly(change) {
        const rowIndices = [];
        const columnIndices = [];
        const changeTypes = [];
        const items = [];
        const newIndexByKey = {};
        const isLiveUpdate = (null === change || void 0 === change ? void 0 : change.isLiveUpdate) ?? true;

        function getRowKey(row) {
            if (row) {
                return `${row.rowType},${JSON.stringify(row.key)}`
            }
            return
        }
        const currentItems = this._items;
        const oldItems = currentItems.slice();
        change.items.forEach(((item, index) => {
            const key = getRowKey(item);
            newIndexByKey[key] = index;
            item.rowIndex = index
        }));
        const result = (0, _array_compare.findChanges)(oldItems, change.items, getRowKey, ((item1, item2) => {
            if (!this._isItemEquals(item1, item2)) {
                return false
            }
            if (item1.cells) {
                item1.update && item1.update(item2);
                item1.cells.forEach((cell => {
                    if (cell && cell.update) {
                        cell.update(item2, true)
                    }
                }))
            }
            return true
        }));
        if (!result) {
            this._applyChangeFull(change);
            return
        }
        result.forEach((change => {
            switch (change.type) {
                case "update": {
                    const {
                        index: index
                    } = change;
                    const newItem = change.data;
                    const {
                        oldItem: oldItem
                    } = change;
                    const changedColumnIndices = this._partialUpdateRow(oldItem, newItem, index, isLiveUpdate);
                    rowIndices.push(index);
                    changeTypes.push("update");
                    items.push(newItem);
                    currentItems[index] = newItem;
                    columnIndices.push(changedColumnIndices);
                    break
                }
                case "insert":
                    rowIndices.push(change.index);
                    changeTypes.push("insert");
                    items.push(change.data);
                    columnIndices.push(void 0);
                    currentItems.splice(change.index, 0, change.data);
                    break;
                case "remove":
                    rowIndices.push(change.index);
                    changeTypes.push("remove");
                    currentItems.splice(change.index, 1);
                    items.push(change.oldItem);
                    columnIndices.push(void 0)
            }
        }));
        change.repaintChangesOnly = true;
        change.changeType = "update";
        change.rowIndices = rowIndices;
        change.columnIndices = columnIndices;
        change.changeTypes = changeTypes;
        change.items = items;
        if (oldItems.length) {
            change.isLiveUpdate = true
        }
        this._correctRowIndices((rowIndex => {
            const oldRowIndexOffset = this._rowIndexOffset || 0;
            const rowIndexOffset = this.getRowIndexOffset();
            const oldItem = oldItems[rowIndex - oldRowIndexOffset];
            const key = getRowKey(oldItem);
            const newVisibleRowIndex = newIndexByKey[key];
            return newVisibleRowIndex >= 0 ? newVisibleRowIndex + rowIndexOffset - rowIndex : 0
        }))
    }
    _correctRowIndices(rowIndex) {}
    _afterProcessItems(items, change) {
        return items
    }
    _updateItemsCore(change) {
        let items;
        const dataSource = this._dataSource;
        const changeType = change.changeType || "refresh";
        change.changeType = changeType;
        if (dataSource) {
            const cachedProcessedItems = this._cachedProcessedItems;
            if (change.useProcessedItemsCache && cachedProcessedItems) {
                items = cachedProcessedItems
            } else {
                items = change.items || dataSource.items();
                items = this._beforeProcessItems(items);
                items = this._processItems(items, change);
                this._cachedProcessedItems = items
            }
            items = this._afterProcessItems(items, change);
            change.items = items;
            const oldItems = this._items.length === items.length && this._items;
            this._applyChange(change);
            const rowIndexDelta = this.getRowIndexDelta();
            (0, _iterator.each)(this._items, ((index, item) => {
                item.rowIndex = index - rowIndexDelta;
                if (oldItems) {
                    item.cells = oldItems[index].cells ?? []
                }
                const newItem = items[index];
                if (newItem) {
                    item.loadIndex = newItem.loadIndex
                }
            }));
            this._rowIndexOffset = this.getRowIndexOffset()
        } else {
            this._items = []
        }
    }
    _handleChanging(e) {
        const rows = this.getVisibleRows();
        const dataSource = this.dataSource();
        if (dataSource) {
            e.changes.forEach((change => {
                if ("insert" === change.type && change.index >= 0) {
                    let dataIndex = 0;
                    for (let i = 0; i < change.index; i++) {
                        const row = rows[i];
                        if (row && ("data" === row.rowType || "group" === row.rowType)) {
                            dataIndex++
                        }
                    }
                    change.index = dataIndex
                }
            }))
        }
    }
    updateItems(change, isDataChanged) {
        change = change || {};
        const that = this;
        if (void 0 !== that._repaintChangesOnly) {
            change.repaintChangesOnly = change.repaintChangesOnly ?? that._repaintChangesOnly;
            change.needUpdateDimensions = change.needUpdateDimensions || that._needUpdateDimensions
        } else if (change.changes) {
            change.repaintChangesOnly = that.option("repaintChangesOnly")
        } else if (isDataChanged) {
            const operationTypes = that.dataSource().operationTypes();
            change.repaintChangesOnly = operationTypes && !operationTypes.grouping && !operationTypes.filtering && that.option("repaintChangesOnly");
            change.isDataChanged = true;
            if (operationTypes && (operationTypes.reload || operationTypes.paging || operationTypes.groupExpanding)) {
                change.needUpdateDimensions = true
            }
        }
        if (that._updateLockCount && !change.cancel) {
            that._changes.push(change);
            return
        }
        that._updateItemsCore(change);
        if (change.cancel) {
            return
        }
        that._fireChanged(change)
    }
    loadingOperationTypes() {
        const dataSource = this.dataSource();
        return dataSource && dataSource.loadingOperationTypes() || {}
    }
    _fireChanged(change) {
        if (this._currentOperationTypes) {
            change.operationTypes = this._currentOperationTypes;
            this._currentOperationTypes = null
        }(0, _common.deferRender)((() => {
            this.changed.fire(change)
        }))
    }
    isLoading() {
        return this._isLoading || this._isCustomLoading
    }
    _fireLoadingChanged() {
        this.loadingChanged.fire(this.isLoading(), this._loadingText)
    }
    _calculateAdditionalFilter() {
        return null
    }
    _applyFilter() {
        const dataSource = this._dataSource;
        if (dataSource) {
            dataSource.pageIndex(0);
            this._isFilterApplying = true;
            return this.reload().done((() => {
                if (this._isFilterApplying) {
                    this.pageChanged.fire()
                }
            }))
        }
        return (new _deferred.Deferred).resolve()
    }
    resetFilterApplying() {
        this._isFilterApplying = false
    }
    filter(filterExpr) {
        const dataSource = this._dataSource;
        const filter = dataSource && dataSource.filter();
        if (0 === arguments.length) {
            return filter
        }
        filterExpr = arguments.length > 1 ? Array.prototype.slice.call(arguments, 0) : filterExpr;
        if (_m_utils.default.equalFilterParameters(filter, filterExpr)) {
            return
        }
        if (dataSource) {
            dataSource.filter(filterExpr)
        }
        this._applyFilter()
    }
    clearFilter(filterName) {
        const that = this;
        const columnsController = that._columnsController;
        const clearColumnOption = function(optionName) {
            const columnCount = columnsController.columnCount();
            for (let index = 0; index < columnCount; index++) {
                columnsController.columnOption(index, optionName, void 0)
            }
        };
        that.component.beginUpdate();
        if (arguments.length > 0) {
            switch (filterName) {
                case "dataSource":
                    that.filter(null);
                    break;
                case "search":
                    that.searchByText("");
                    break;
                case "header":
                    clearColumnOption("filterValues");
                    break;
                case "row":
                    clearColumnOption("filterValue")
            }
        } else {
            that.filter(null);
            that.searchByText("");
            clearColumnOption("filterValue");
            clearColumnOption("bufferedFilterValue");
            clearColumnOption("filterValues")
        }
        that.component.endUpdate()
    }
    _fireDataSourceChanged() {
        const that = this;
        const changedHandler = function() {
            that.changed.remove(changedHandler);
            that.dataSourceChanged.fire()
        };
        that.changed.add(changedHandler)
    }
    _getDataSourceAdapter() {}
    _createDataSourceAdapterCore(dataSource, remoteOperations) {
        const dataSourceAdapterProvider = this._getDataSourceAdapter();
        const dataSourceAdapter = dataSourceAdapterProvider.create(this.component);
        dataSourceAdapter.init(dataSource, remoteOperations);
        return dataSourceAdapter
    }
    isLocalStore() {
        let store = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.store();
        return store instanceof _array_store.default
    }
    isCustomStore(store) {
        store = store || this.store();
        return store instanceof _custom_store.default
    }
    _createDataSourceAdapter(dataSource) {
        let remoteOperations = this.option("remoteOperations");
        const store = dataSource.store();
        const enabledRemoteOperations = {
            filtering: true,
            sorting: true,
            paging: true,
            grouping: true,
            summary: true
        };
        if ((0, _type.isObject)(remoteOperations) && remoteOperations.groupPaging) {
            remoteOperations = (0, _extend.extend)({}, enabledRemoteOperations, remoteOperations)
        }
        if ("auto" === remoteOperations) {
            remoteOperations = this.isLocalStore(store) || this.isCustomStore(store) ? {} : {
                filtering: true,
                sorting: true,
                paging: true
            }
        }
        if (true === remoteOperations) {
            remoteOperations = enabledRemoteOperations
        }
        return this._createDataSourceAdapterCore(dataSource, remoteOperations)
    }
    setDataSource(dataSource) {
        const that = this;
        const oldDataSource = that._dataSource;
        if (!dataSource && oldDataSource) {
            oldDataSource.cancelAll();
            oldDataSource.changed.remove(that._dataChangedHandler);
            oldDataSource.loadingChanged.remove(that._loadingChangedHandler);
            oldDataSource.loadError.remove(that._loadErrorHandler);
            oldDataSource.customizeStoreLoadOptions.remove(that._customizeStoreLoadOptionsHandler);
            oldDataSource.changing.remove(that._changingHandler);
            oldDataSource.pushed.remove(that._dataPushedHandler);
            oldDataSource.dispose(that._isSharedDataSource)
        }
        if (dataSource) {
            dataSource = that._createDataSourceAdapter(dataSource)
        }
        that._dataSource = dataSource;
        if (dataSource) {
            that._fireDataSourceChanged();
            that._isLoading = !dataSource.isLoaded();
            that._needApplyFilter = true;
            that._isAllDataTypesDefined = that._columnsController.isAllDataTypesDefined();
            dataSource.changed.add(that._dataChangedHandler);
            dataSource.loadingChanged.add(that._loadingChangedHandler);
            dataSource.loadError.add(that._loadErrorHandler);
            dataSource.customizeStoreLoadOptions.add(that._customizeStoreLoadOptionsHandler);
            dataSource.changing.add(that._changingHandler);
            dataSource.pushed.add(that._dataPushedHandler)
        }
    }
    items(byLoaded) {
        return this._items
    }
    isEmpty() {
        return !this.items().length
    }
    pageCount() {
        return this._dataSource ? this._dataSource.pageCount() : 1
    }
    dataSource() {
        return this._dataSource
    }
    store() {
        const dataSource = this._dataSource;
        return dataSource && dataSource.store()
    }
    loadAll(data) {
        let skipFilter = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
        const that = this;
        const d = new _deferred.Deferred;
        const dataSource = that._dataSource;
        if (dataSource) {
            if (data) {
                const options = {
                    data: data,
                    isCustomLoading: true,
                    storeLoadOptions: {
                        isLoadingAll: true
                    },
                    loadOptions: {
                        filter: skipFilter ? null : that.getCombinedFilter(),
                        group: dataSource.group(),
                        sort: dataSource.sort()
                    }
                };
                dataSource._handleDataLoaded(options);
                (0, _deferred.when)(options.data).done((data => {
                    var _options$extra;
                    data = that._beforeProcessItems(data);
                    d.resolve(that._processItems(data, {
                        changeType: "loadingAll"
                    }), null === (_options$extra = options.extra) || void 0 === _options$extra ? void 0 : _options$extra.summary)
                })).fail(d.reject)
            } else if (!dataSource.isLoading()) {
                const loadOptions = (0, _extend.extend)({}, dataSource.loadOptions(), {
                    isLoadingAll: true,
                    requireTotalCount: false
                });
                dataSource.load(loadOptions).done(((items, extra) => {
                    items = that._beforeProcessItems(items);
                    items = that._processItems(items, {
                        changeType: "loadingAll"
                    });
                    d.resolve(items, extra && extra.summary)
                })).fail(d.reject)
            } else {
                d.reject()
            }
        } else {
            d.resolve([])
        }
        return d
    }
    getKeyByRowIndex(rowIndex, byLoaded) {
        const item = this.items(byLoaded)[rowIndex];
        if (item) {
            return item.key
        }
    }
    getRowIndexByKey(key, byLoaded) {
        return _m_utils.default.getIndexByKey(key, this.items(byLoaded))
    }
    keyOf(data) {
        const store = this.store();
        if (store) {
            return store.keyOf(data)
        }
    }
    byKey(key) {
        const store = this.store();
        const rowIndex = this.getRowIndexByKey(key);
        let result;
        if (!store) {
            return
        }
        if (rowIndex >= 0) {
            result = (new _deferred.Deferred).resolve(this.items()[rowIndex].data)
        }
        return result || store.byKey(key)
    }
    key() {
        const store = this.store();
        if (store) {
            return store.key()
        }
    }
    getRowIndexOffset(byLoadedRows) {
        return 0
    }
    getDataByKeys(rowKeys) {
        const that = this;
        const result = new _deferred.Deferred;
        const deferreds = [];
        const data = [];
        (0, _iterator.each)(rowKeys, ((index, key) => {
            deferreds.push(that.byKey(key).done((keyData => {
                data[index] = keyData
            })))
        }));
        _deferred.when.apply(_renderer.default, deferreds).always((() => {
            result.resolve(data)
        }));
        return result
    }
    pageIndex(value) {
        return changePaging(this, "pageIndex", value)
    }
    pageSize(value) {
        return changePaging(this, "pageSize", value)
    }
    beginCustomLoading(messageText) {
        this._isCustomLoading = true;
        this._loadingText = messageText || "";
        this._fireLoadingChanged()
    }
    endCustomLoading() {
        this._isCustomLoading = false;
        this._loadingText = void 0;
        this._fireLoadingChanged()
    }
    refresh(options) {
        if (true === options) {
            options = {
                reload: true,
                changesOnly: true
            }
        } else if (!options) {
            options = {
                lookup: true,
                selection: true,
                reload: true
            }
        }
        const that = this;
        const dataSource = that.getDataSource();
        const {
            changesOnly: changesOnly
        } = options;
        const d = new _deferred.Deferred;
        const customizeLoadResult = function() {
            that._repaintChangesOnly = !!changesOnly
        };
        (0, _deferred.when)(!options.lookup || that._columnsController.refresh()).always((() => {
            if (options.load || options.reload) {
                dataSource && dataSource.on("customizeLoadResult", customizeLoadResult);
                (0, _deferred.when)(that.reload(options.reload, changesOnly)).always((() => {
                    dataSource && dataSource.off("customizeLoadResult", customizeLoadResult);
                    that._repaintChangesOnly = void 0
                })).done(d.resolve).fail(d.reject)
            } else {
                that.updateItems({
                    repaintChangesOnly: options.changesOnly
                });
                d.resolve()
            }
        }));
        return d.promise()
    }
    getVisibleRows() {
        return this.items()
    }
    _disposeDataSource() {
        if (this._dataSource && this._dataSource._eventsStrategy) {
            this._dataSource._eventsStrategy.off("loadingChanged", this.readyWatcher)
        }
        this.setDataSource(null)
    }
    dispose() {
        this._disposeDataSource();
        super.dispose()
    }
    repaintRows(rowIndexes, changesOnly) {
        rowIndexes = Array.isArray(rowIndexes) ? rowIndexes : [rowIndexes];
        if (rowIndexes.length > 1 || (0, _type.isDefined)(rowIndexes[0])) {
            this.updateItems({
                changeType: "update",
                rowIndices: rowIndexes,
                isFullUpdate: !changesOnly
            })
        }
    }
    skipProcessingPagingChange(fullName) {
        return this._skipProcessingPagingChange && ("paging.pageIndex" === fullName || "paging.pageSize" === fullName)
    }
    getUserState() {
        return {
            searchText: this.option("searchPanel.text"),
            pageIndex: this.pageIndex(),
            pageSize: this.pageSize()
        }
    }
    getCachedStoreData() {
        return this._dataSource && this._dataSource.getCachedStoreData()
    }
    isLastPageLoaded() {
        const pageIndex = this.pageIndex();
        const pageCount = this.pageCount();
        return pageIndex === pageCount - 1
    }
    load() {
        var _this$_dataSource;
        return null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource ? void 0 : _this$_dataSource.load()
    }
    reload(reload, changesOnly) {
        var _this$_dataSource2;
        return null === (_this$_dataSource2 = this._dataSource) || void 0 === _this$_dataSource2 ? void 0 : _this$_dataSource2.reload(reload, changesOnly)
    }
    push() {
        var _this$_dataSource3;
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2]
        }
        return null === (_this$_dataSource3 = this._dataSource) || void 0 === _this$_dataSource3 ? void 0 : _this$_dataSource3.push(...args)
    }
    itemsCount() {
        var _this$_dataSource4;
        return this._dataSource ? null === (_this$_dataSource4 = this._dataSource) || void 0 === _this$_dataSource4 ? void 0 : _this$_dataSource4.itemsCount() : 0
    }
    totalItemsCount() {
        var _this$_dataSource5;
        return this._dataSource ? null === (_this$_dataSource5 = this._dataSource) || void 0 === _this$_dataSource5 ? void 0 : _this$_dataSource5.totalItemsCount() : 0
    }
    hasKnownLastPage() {
        var _this$_dataSource6;
        return this._dataSource ? null === (_this$_dataSource6 = this._dataSource) || void 0 === _this$_dataSource6 ? void 0 : _this$_dataSource6.hasKnownLastPage() : true
    }
    isLoaded() {
        var _this$_dataSource7;
        return this._dataSource ? null === (_this$_dataSource7 = this._dataSource) || void 0 === _this$_dataSource7 ? void 0 : _this$_dataSource7.isLoaded() : true
    }
    totalCount() {
        var _this$_dataSource8;
        return this._dataSource ? null === (_this$_dataSource8 = this._dataSource) || void 0 === _this$_dataSource8 ? void 0 : _this$_dataSource8.totalCount() : 0
    }
    hasLoadOperation() {
        var _this$_dataSource9;
        const operationTypes = (null === (_this$_dataSource9 = this._dataSource) || void 0 === _this$_dataSource9 ? void 0 : _this$_dataSource9.operationTypes()) ?? {};
        return Object.keys(operationTypes).some((type => operationTypes[type]))
    }
}
exports.DataController = DataController;
const dataControllerModule = exports.dataControllerModule = {
    defaultOptions: () => ({
        loadingTimeout: 0,
        dataSource: null,
        cacheEnabled: true,
        repaintChangesOnly: false,
        highlightChanges: false,
        onDataErrorOccurred: null,
        remoteOperations: "auto",
        paging: {
            enabled: true,
            pageSize: void 0,
            pageIndex: void 0
        }
    }),
    controllers: {
        data: DataController
    }
};
