/**
 * DevExtreme (esm/__internal/grids/grid_core/focus/m_focus.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    equalByValue
} from "../../../../core/utils/common";
import {
    Deferred,
    when
} from "../../../../core/utils/deferred";
import {
    each
} from "../../../../core/utils/iterator";
import {
    isBoolean,
    isDefined
} from "../../../../core/utils/type";
import {
    isNewRowTempKey
} from "../editing/m_editing_utils";
import core from "../m_modules";
import gridCoreUtils from "../m_utils";
import {
    UiGridCoreFocusUtils
} from "./m_focus_utils";
const ROW_FOCUSED_CLASS = "dx-row-focused";
const FOCUSED_ROW_SELECTOR = ".dx-row.dx-row-focused";
const TABLE_POSTFIX_CLASS = "table";
const CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
export class FocusController extends core.ViewController {
    getKeyboardController() {
        return this.getController("keyboardNavigation")
    }
    getDataController() {
        return this.getController("data")
    }
    init() {
        this.component._optionsByReference.focusedRowKey = true
    }
    optionChanged(args) {
        const {
            name: name,
            value: value,
            previousValue: previousValue
        } = args;
        switch (name) {
            case "focusedRowIndex":
                this._focusRowByIndex(value);
                this.getKeyboardController()._fireFocusedRowChanged();
                args.handled = true;
                break;
            case "focusedRowKey":
                if (Array.isArray(value) && JSON.stringify(value) === JSON.stringify(previousValue)) {
                    return
                }
                this._focusRowByKey(value);
                this.getKeyboardController()._fireFocusedRowChanged();
                args.handled = true;
                break;
            case "focusedColumnIndex":
            case "focusedRowEnabled":
            case "autoNavigateToFocusedRow":
                args.handled = true;
                break;
            default:
                super.optionChanged(args)
        }
    }
    publicMethods() {
        return ["navigateToRow", "isRowFocused"]
    }
    isAutoNavigateToFocusedRow() {
        return "infinite" !== this.option("scrolling.mode") && this.option("autoNavigateToFocusedRow")
    }
    _focusRowByIndex(index, operationTypes) {
        if (!this.option("focusedRowEnabled")) {
            return
        }
        index = void 0 !== index ? index : this.option("focusedRowIndex");
        if (index < 0) {
            if (this.isAutoNavigateToFocusedRow()) {
                this._resetFocusedRow()
            }
        } else {
            this._focusRowByIndexCore(index, operationTypes)
        }
    }
    _focusRowByIndexCore(index, operationTypes) {
        const pageSize = this.getDataController().pageSize();
        const setKeyByIndex = () => {
            if (this._isValidFocusedRowIndex(index)) {
                let rowIndex = index - this.getDataController().getRowIndexOffset(true);
                if (!operationTypes || operationTypes.paging && !operationTypes.filtering) {
                    const lastItemIndex = this.getDataController()._getLastItemIndex();
                    rowIndex = Math.min(rowIndex, lastItemIndex)
                }
                const focusedRowKey = this.getDataController().getKeyByRowIndex(rowIndex, true);
                if (isDefined(focusedRowKey) && !this.isRowFocused(focusedRowKey)) {
                    this.option("focusedRowKey", focusedRowKey)
                }
            }
        };
        if (pageSize >= 0) {
            if (!this._isLocalRowIndex(index)) {
                const pageIndex = Math.floor(index / this.getDataController().pageSize());
                when(this.getDataController().pageIndex(pageIndex), this.getDataController().waitReady()).done((() => {
                    setKeyByIndex()
                }))
            } else {
                setKeyByIndex()
            }
        }
    }
    _isLocalRowIndex(index) {
        const isVirtualScrolling = this.getKeyboardController()._isVirtualScrolling();
        if (isVirtualScrolling) {
            const pageIndex = Math.floor(index / this.getDataController().pageSize());
            const virtualItems = this.getDataController().virtualItemsCount();
            const virtualItemsBegin = virtualItems ? virtualItems.begin : -1;
            const visibleRowsCount = this.getDataController().getVisibleRows().length + this.getDataController().getRowIndexOffset();
            const visiblePagesCount = Math.ceil(visibleRowsCount / this.getDataController().pageSize());
            return virtualItemsBegin <= index && visiblePagesCount > pageIndex
        }
        return true
    }
    _setFocusedRowKeyByIndex(index) {
        if (this._isValidFocusedRowIndex(index)) {
            const rowIndex = Math.min(index - this.getDataController().getRowIndexOffset(), this.getDataController().items().length - 1);
            const focusedRowKey = this.getDataController().getKeyByRowIndex(rowIndex);
            if (isDefined(focusedRowKey) && !this.isRowFocused(focusedRowKey)) {
                this.option("focusedRowKey", focusedRowKey)
            }
        }
    }
    _focusRowByKey(key) {
        if (!isDefined(key)) {
            this._resetFocusedRow()
        } else {
            this._navigateToRow(key, true)
        }
    }
    _resetFocusedRow() {
        const focusedRowKey = this.option("focusedRowKey");
        const isFocusedRowKeyDefined = isDefined(focusedRowKey);
        if (!isFocusedRowKeyDefined && this.option("focusedRowIndex") < 0) {
            return
        }
        if (isFocusedRowKeyDefined) {
            this.option("focusedRowKey", null)
        }
        this.getKeyboardController().setFocusedRowIndex(-1);
        this.option("focusedRowIndex", -1);
        this.getDataController().updateItems({
            changeType: "updateFocusedRow",
            focusedRowKey: null
        });
        this.getKeyboardController()._fireFocusedRowChanged()
    }
    _isValidFocusedRowIndex(rowIndex) {
        const row = this.getDataController().getVisibleRows()[rowIndex];
        return !row || "data" === row.rowType || "group" === row.rowType
    }
    navigateToRow(key) {
        if (!this.isAutoNavigateToFocusedRow()) {
            this.option("focusedRowIndex", -1)
        }
        return this._navigateToRow(key)
    }
    _navigateToRow(key, needFocusRow) {
        const that = this;
        const isAutoNavigate = that.isAutoNavigateToFocusedRow();
        const d = new Deferred;
        if (void 0 === key || !this.getDataController().dataSource()) {
            return d.reject().promise()
        }
        const rowIndexByKey = that.getFocusedRowIndexByKey(key);
        if (!isAutoNavigate && needFocusRow || rowIndexByKey >= 0) {
            that._navigateTo(key, d, needFocusRow)
        } else {
            this.getDataController().getPageIndexByKey(key).done((pageIndex => {
                if (pageIndex < 0) {
                    d.resolve(-1);
                    return
                }
                if (pageIndex === this.getDataController().pageIndex()) {
                    this.getDataController().reload().done((() => {
                        if (that.isRowFocused(key) && this.getDataController().getRowIndexByKey(key) >= 0) {
                            d.resolve(that.getFocusedRowIndexByKey(key))
                        } else {
                            that._navigateTo(key, d, needFocusRow)
                        }
                    })).fail(d.reject)
                } else {
                    this.getDataController().pageIndex(pageIndex).done((() => {
                        that._navigateTo(key, d, needFocusRow)
                    })).fail(d.reject)
                }
            })).fail(d.reject)
        }
        return d.promise()
    }
    _navigateTo(key, deferred, needFocusRow) {
        const visibleRowIndex = this.getDataController().getRowIndexByKey(key);
        const isVirtualRowRenderingMode = gridCoreUtils.isVirtualRowRendering(this);
        const isAutoNavigate = this.isAutoNavigateToFocusedRow();
        if (isAutoNavigate && isVirtualRowRenderingMode && visibleRowIndex < 0) {
            this._navigateToVirtualRow(key, deferred, needFocusRow)
        } else {
            this._navigateToVisibleRow(key, deferred, needFocusRow)
        }
    }
    _navigateToVisibleRow(key, deferred, needFocusRow) {
        if (needFocusRow) {
            this._triggerUpdateFocusedRow(key, deferred)
        } else {
            const focusedRowIndex = this.getFocusedRowIndexByKey(key);
            this.getView("rowsView").scrollToRowElement(key, deferred).done((() => {
                deferred.resolve(focusedRowIndex)
            }))
        }
    }
    _navigateToVirtualRow(key, deferred, needFocusRow) {
        const rowsScrollController = this.getDataController()._rowsScrollController;
        const rowIndex = gridCoreUtils.getIndexByKey(key, this.getDataController().items(true));
        const scrollable = this.getView("rowsView").getScrollable();
        if (rowsScrollController && scrollable && rowIndex >= 0) {
            const focusedRowIndex = rowIndex + this.getDataController().getRowIndexOffset(true);
            const offset = rowsScrollController.getItemOffset(focusedRowIndex);
            const triggerUpdateFocusedRow = () => {
                if (this.getDataController().totalCount() && !this.getDataController().items().length) {
                    return
                }
                this.component.off("contentReady", triggerUpdateFocusedRow);
                if (needFocusRow) {
                    this._triggerUpdateFocusedRow(key, deferred)
                } else {
                    deferred.resolve(focusedRowIndex)
                }
            };
            this.component.on("contentReady", triggerUpdateFocusedRow);
            this.getView("rowsView").scrollTopPosition(offset)
        } else {
            deferred.resolve(-1)
        }
    }
    _triggerUpdateFocusedRow(key, deferred) {
        const focusedRowIndex = this.getFocusedRowIndexByKey(key);
        if (this._isValidFocusedRowIndex(focusedRowIndex)) {
            let d;
            if (this.option("focusedRowEnabled")) {
                this.getDataController().updateItems({
                    changeType: "updateFocusedRow",
                    focusedRowKey: key
                })
            } else {
                d = this.getView("rowsView").scrollToRowElement(key)
            }
            when(d).done((() => {
                this.getKeyboardController().setFocusedRowIndex(focusedRowIndex);
                deferred && deferred.resolve(focusedRowIndex)
            }))
        } else {
            deferred && deferred.resolve(-1)
        }
    }
    getFocusedRowIndexByKey(key) {
        const loadedRowIndex = this.getDataController().getRowIndexByKey(key, true);
        return loadedRowIndex >= 0 ? loadedRowIndex + this.getDataController().getRowIndexOffset(true) : -1
    }
    _focusRowByKeyOrIndex() {
        const focusedRowKey = this.option("focusedRowKey");
        let currentFocusedRowIndex = this.option("focusedRowIndex");
        if (isDefined(focusedRowKey)) {
            const visibleRowIndex = this.getDataController().getRowIndexByKey(focusedRowKey);
            if (visibleRowIndex >= 0) {
                if (this.getKeyboardController()._isVirtualScrolling()) {
                    currentFocusedRowIndex = visibleRowIndex + this.getDataController().getRowIndexOffset()
                }
                this.getKeyboardController().setFocusedRowIndex(currentFocusedRowIndex);
                this._triggerUpdateFocusedRow(focusedRowKey)
            } else {
                this._navigateToRow(focusedRowKey, true).done((focusedRowIndex => {
                    if (currentFocusedRowIndex >= 0 && focusedRowIndex < 0) {
                        this._focusRowByIndex()
                    } else if (currentFocusedRowIndex < 0 && focusedRowIndex >= 0) {
                        this.getKeyboardController().setFocusedRowIndex(focusedRowIndex)
                    }
                }))
            }
        } else if (currentFocusedRowIndex >= 0) {
            this._focusRowByIndex(currentFocusedRowIndex)
        }
    }
    isRowFocused(key) {
        const focusedRowKey = this.option("focusedRowKey");
        if (isDefined(focusedRowKey)) {
            return equalByValue(key, this.option("focusedRowKey"))
        }
        return
    }
    updateFocusedRow(e) {
        const that = this;
        const focusedRowIndex = e.focusedRowIndex ?? that.getDataController().getRowIndexByKey(e.focusedRowKey);
        const rowsView = that.getView("rowsView");
        let $tableElement;
        let $mainRow;
        each(rowsView.getTableElements(), ((index, element) => {
            const isMainTable = 0 === index;
            $tableElement = $(element);
            that._clearPreviousFocusedRow($tableElement, focusedRowIndex);
            const $row = that._prepareFocusedRow({
                changedItem: that.getDataController().getVisibleRows()[focusedRowIndex],
                $tableElement: $tableElement,
                focusedRowIndex: focusedRowIndex
            });
            if (isMainTable) {
                $mainRow = $row
            }
        }));
        if (!e.preventScroll && $mainRow) {
            rowsView.scrollToElementVertically($mainRow)
        }
    }
    _clearPreviousFocusedRow($tableElement, focusedRowIndex) {
        const $prevRowFocusedElement = $tableElement.find(FOCUSED_ROW_SELECTOR).filter(((_, focusedRow) => {
            const $focusedRowTable = $(focusedRow).closest(`.${this.addWidgetPrefix("table")}`);
            return $tableElement.is($focusedRowTable)
        }));
        $prevRowFocusedElement.removeClass("dx-row-focused").removeClass("dx-cell-focus-disabled").removeAttr("tabindex");
        $prevRowFocusedElement.children("td").removeAttr("tabindex");
        if (0 !== focusedRowIndex) {
            const $firstRow = $(this.getView("rowsView").getRowElement(0));
            $firstRow.removeClass("dx-cell-focus-disabled").removeAttr("tabIndex")
        }
    }
    _prepareFocusedRow(options) {
        let $row;
        const {
            changedItem: changedItem
        } = options;
        if (changedItem && ("data" === changedItem.rowType || "group" === changedItem.rowType)) {
            const {
                focusedRowIndex: focusedRowIndex
            } = options;
            const {
                $tableElement: $tableElement
            } = options;
            const tabIndex = this.option("tabindex") || 0;
            const rowsView = this.getView("rowsView");
            $row = $(rowsView._getRowElements($tableElement).eq(focusedRowIndex));
            $row.addClass("dx-row-focused").attr("tabindex", tabIndex)
        }
        return $row
    }
}
const keyboardNavigation = Base => class extends Base {
    init() {
        const rowIndex = this.option("focusedRowIndex");
        const columnIndex = this.option("focusedColumnIndex");
        this.createAction("onFocusedRowChanging", {
            excludeValidators: ["disabled", "readOnly"]
        });
        this.createAction("onFocusedRowChanged", {
            excludeValidators: ["disabled", "readOnly"]
        });
        this.createAction("onFocusedCellChanging", {
            excludeValidators: ["disabled", "readOnly"]
        });
        this.createAction("onFocusedCellChanged", {
            excludeValidators: ["disabled", "readOnly"]
        });
        super.init();
        this.setRowFocusType();
        this._focusedCellPosition = {};
        if (isDefined(rowIndex) && rowIndex >= 0) {
            this._focusedCellPosition.rowIndex = rowIndex
        }
        if (isDefined(columnIndex) && columnIndex >= 0) {
            this._focusedCellPosition.columnIndex = columnIndex
        }
    }
    setFocusedRowIndex(rowIndex) {
        super.setFocusedRowIndex(rowIndex);
        this.option("focusedRowIndex", rowIndex)
    }
    setFocusedColumnIndex(columnIndex) {
        super.setFocusedColumnIndex(columnIndex);
        this.option("focusedColumnIndex", columnIndex)
    }
    _escapeKeyHandler(eventArgs, isEditing) {
        if (isEditing || !this.option("focusedRowEnabled")) {
            return super._escapeKeyHandler(eventArgs, isEditing)
        }
        if (this.isCellFocusType()) {
            this.setRowFocusType();
            this._focus(this._getCellElementFromTarget(eventArgs.originalEvent.target), true);
            return true
        }
        return false
    }
    _updateFocusedCellPosition($cell, direction) {
        const position = super._updateFocusedCellPosition($cell, direction);
        if (position && position.columnIndex >= 0) {
            this._fireFocusedCellChanged($cell)
        }
        return position
    }
};
const editorFactory = Base => class extends Base {
    renderFocusOverlay($element, isHideBorder) {
        var _this$_keyboardNaviga;
        const focusedRowEnabled = this.option("focusedRowEnabled");
        let $cell;
        if (!focusedRowEnabled || !(null !== (_this$_keyboardNaviga = this._keyboardNavigationController) && void 0 !== _this$_keyboardNaviga && _this$_keyboardNaviga.isRowFocusType()) || this._editingController.isEditing()) {
            super.renderFocusOverlay($element, isHideBorder)
        } else if (focusedRowEnabled) {
            const isRowElement = "row" === this._keyboardNavigationController._getElementType($element);
            if (isRowElement && !$element.hasClass("dx-row-focused")) {
                $cell = this._keyboardNavigationController.getFirstValidCellInRow($element);
                this._keyboardNavigationController.focus($cell)
            }
        }
    }
};
const columns = Base => class extends Base {
    getSortDataSourceParameters(_, sortByKey) {
        let result = super.getSortDataSourceParameters.apply(this, arguments);
        const dataSource = this._dataController._dataSource;
        const store = this._dataController.store();
        let key = store && store.key();
        const remoteOperations = dataSource && dataSource.remoteOperations() || {};
        const isLocalOperations = Object.keys(remoteOperations).every((operationName => !remoteOperations[operationName]));
        if (key && (this.option("focusedRowEnabled") && false !== this._focusController.isAutoNavigateToFocusedRow() || sortByKey)) {
            key = Array.isArray(key) ? key : [key];
            const notSortedKeys = key.filter((key => !this.columnOption(key, "sortOrder")));
            if (notSortedKeys.length) {
                result = result || [];
                if (isLocalOperations) {
                    result.push({
                        selector: dataSource.getDataIndexGetter(),
                        desc: false
                    })
                } else {
                    notSortedKeys.forEach((notSortedKey => result.push({
                        selector: notSortedKey,
                        desc: false
                    })))
                }
            }
        }
        return result
    }
};
const data = Base => class extends Base {
    _applyChange(change) {
        if (change && "updateFocusedRow" === change.changeType) {
            return
        }
        return super._applyChange.apply(this, arguments)
    }
    _fireChanged(e) {
        super._fireChanged(e);
        if (this.option("focusedRowEnabled") && this._dataSource) {
            const isPartialUpdate = "update" === e.changeType && e.repaintChangesOnly;
            const isPartialUpdateWithDeleting = isPartialUpdate && e.changeTypes && e.changeTypes.indexOf("remove") >= 0;
            if ("refresh" === e.changeType && e.items.length || isPartialUpdateWithDeleting) {
                this._updatePageIndexes();
                this._updateFocusedRow(e)
            } else if ("append" === e.changeType || "prepend" === e.changeType) {
                this._updatePageIndexes()
            } else if ("update" === e.changeType && e.repaintChangesOnly) {
                this._updateFocusedRow(e)
            }
        }
    }
    _updatePageIndexes() {
        const prevRenderingPageIndex = this._lastRenderingPageIndex || 0;
        const renderingPageIndex = this._rowsScrollController ? this._rowsScrollController.pageIndex() : 0;
        this._lastRenderingPageIndex = renderingPageIndex;
        this._isPagingByRendering = renderingPageIndex !== prevRenderingPageIndex
    }
    isPagingByRendering() {
        return this._isPagingByRendering
    }
    _updateFocusedRow(e) {
        const operationTypes = e.operationTypes || {};
        const {
            reload: reload,
            fullReload: fullReload,
            pageIndex: pageIndex,
            paging: paging
        } = operationTypes;
        const isVirtualScrolling = this._keyboardNavigationController._isVirtualScrolling();
        const pagingWithoutVirtualScrolling = paging && !isVirtualScrolling;
        const focusedRowKey = this.option("focusedRowKey");
        const isAutoNavigate = this._focusController.isAutoNavigateToFocusedRow();
        const isReload = reload && false === pageIndex;
        if (isReload && !fullReload && isDefined(focusedRowKey)) {
            this._focusController._navigateToRow(focusedRowKey, true).done((focusedRowIndex => {
                if (focusedRowIndex < 0) {
                    this._focusController._focusRowByIndex(void 0, operationTypes)
                }
            }))
        } else if (pagingWithoutVirtualScrolling && isAutoNavigate) {
            const rowIndexByKey = this.getRowIndexByKey(focusedRowKey);
            const focusedRowIndex = this.option("focusedRowIndex");
            const isValidRowIndexByKey = rowIndexByKey >= 0;
            const isValidFocusedRowIndex = focusedRowIndex >= 0;
            const isSameRowIndex = focusedRowIndex === rowIndexByKey;
            if (isValidFocusedRowIndex && (isSameRowIndex || !isValidRowIndexByKey)) {
                this._focusController._focusRowByIndex(focusedRowIndex, operationTypes)
            }
        } else if (pagingWithoutVirtualScrolling && !isAutoNavigate && this.getRowIndexByKey(focusedRowKey) < 0) {
            this.option("focusedRowIndex", -1)
        } else if (operationTypes.fullReload) {
            this._focusController._focusRowByKeyOrIndex()
        }
    }
    getPageIndexByKey(key) {
        const that = this;
        const d = new Deferred;
        that.getGlobalRowIndexByKey(key).done((globalIndex => {
            d.resolve(globalIndex >= 0 ? Math.floor(globalIndex / that.pageSize()) : -1)
        })).fail(d.reject);
        return d.promise()
    }
    getGlobalRowIndexByKey(key) {
        if (this._dataSource.group()) {
            return this._calculateGlobalRowIndexByGroupedData(key)
        }
        return this._calculateGlobalRowIndexByFlatData(key)
    }
    _calculateGlobalRowIndexByFlatData(key, groupFilter, useGroup) {
        const that = this;
        const deferred = new Deferred;
        const dataSource = that._dataSource;
        if (Array.isArray(key) || isNewRowTempKey(key)) {
            return deferred.resolve(-1).promise()
        }
        let filter = that._generateFilterByKey(key);
        dataSource.load({
            filter: that._concatWithCombinedFilter(filter),
            skip: 0,
            take: 1
        }).done((data => {
            if (data.length > 0) {
                filter = that._generateOperationFilterByKey(key, data[0], useGroup);
                dataSource.load({
                    filter: that._concatWithCombinedFilter(filter, groupFilter),
                    skip: 0,
                    take: 1,
                    requireTotalCount: true
                }).done(((_, extra) => {
                    deferred.resolve(extra.totalCount)
                }))
            } else {
                deferred.resolve(-1)
            }
        }));
        return deferred.promise()
    }
    _concatWithCombinedFilter(filter, groupFilter) {
        const combinedFilter = this.getCombinedFilter();
        return gridCoreUtils.combineFilters([filter, combinedFilter, groupFilter])
    }
    _generateBooleanFilter(selector, value, sortInfo) {
        const {
            desc: desc
        } = sortInfo;
        switch (true) {
            case false === value && desc:
                return [selector, "=", true];
            case false === value && !desc:
                return [selector, "=", null];
            case true === value && !desc:
            case !isBoolean(value) && desc:
                return [selector, "<>", value];
            default:
                return
        }
    }
    _generateOperationFilterByKey(key, rowData, useGroup) {
        const that = this;
        const dateSerializationFormat = that.option("dateSerializationFormat");
        const isRemoteFiltering = that._dataSource.remoteOperations().filtering;
        const isRemoteSorting = that._dataSource.remoteOperations().sorting;
        let filter = that._generateFilterByKey(key, "<");
        let sort = that._columnsController.getSortDataSourceParameters(!isRemoteFiltering, true);
        if (useGroup) {
            const group = that._columnsController.getGroupDataSourceParameters(!isRemoteFiltering);
            if (group) {
                sort = sort ? group.concat(sort) : group
            }
        }
        if (sort) {
            sort.slice().reverse().forEach((sortInfo => {
                const {
                    selector: selector,
                    desc: desc,
                    compare: compare
                } = sortInfo;
                const {
                    getter: getter,
                    rawValue: rawValue,
                    safeValue: safeValue
                } = UiGridCoreFocusUtils.getSortFilterValue(sortInfo, rowData, {
                    isRemoteFiltering: isRemoteFiltering,
                    dateSerializationFormat: dateSerializationFormat,
                    getSelector: selector => that._columnsController.columnOption(selector, "selector")
                });
                filter = [
                    [selector, "=", safeValue], "and", filter
                ];
                if (null === rawValue || isBoolean(rawValue)) {
                    const booleanFilter = that._generateBooleanFilter(selector, safeValue, desc);
                    if (booleanFilter) {
                        filter = [booleanFilter, "or", filter]
                    }
                } else {
                    const filterOperation = desc ? ">" : "<";
                    let sortFilter;
                    if (compare && !isRemoteSorting) {
                        sortFilter = data => {
                            if ("<" === filterOperation) {
                                return compare(rawValue, getter(data)) >= 1
                            }
                            return compare(rawValue, getter(data)) <= -1
                        }
                    } else {
                        sortFilter = [selector, filterOperation, safeValue];
                        if (!desc) {
                            sortFilter = [sortFilter, "or", [selector, "=", null]]
                        }
                    }
                    filter = [sortFilter, "or", filter]
                }
            }))
        }
        return filter
    }
    _generateFilterByKey(key, operation) {
        const dataSourceKey = this._dataSource.key();
        let filter = [];
        if (!operation) {
            operation = "="
        }
        if (Array.isArray(dataSourceKey)) {
            for (let i = 0; i < dataSourceKey.length; ++i) {
                const keyPart = key[dataSourceKey[i]];
                if (keyPart) {
                    if (filter.length > 0) {
                        filter.push("and")
                    }
                    filter.push([dataSourceKey[i], operation, keyPart])
                }
            }
        } else {
            filter = [dataSourceKey, operation, key]
        }
        return filter
    }
    _getLastItemIndex() {
        return this.items(true).length - 1
    }
};
const editing = Base => class extends Base {
    _deleteRowCore(rowIndex) {
        const deferred = super._deleteRowCore.apply(this, arguments);
        const rowKey = this._dataController.getKeyByRowIndex(rowIndex);
        deferred.done((() => {
            const rowIndex = this._dataController.getRowIndexByKey(rowKey);
            const visibleRows = this._dataController.getVisibleRows();
            if (-1 === rowIndex && !visibleRows.length) {
                this._focusController._resetFocusedRow()
            }
        }))
    }
};
const rowsView = Base => class extends Base {
    _createRow(row) {
        const $row = super._createRow.apply(this, arguments);
        if (this.option("focusedRowEnabled") && row) {
            if (this._focusController.isRowFocused(row.key)) {
                $row.addClass("dx-row-focused")
            }
        }
        return $row
    }
    _checkRowKeys(options) {
        super._checkRowKeys.apply(this, arguments);
        if (this.option("focusedRowEnabled") && this.option("dataSource")) {
            const store = this._dataController.store();
            if (store && !store.key()) {
                this._dataController.fireError("E1042", "Row focusing")
            }
        }
    }
    _update(change) {
        if ("updateFocusedRow" === change.changeType) {
            if (this.option("focusedRowEnabled")) {
                this._focusController.updateFocusedRow(change)
            }
        } else {
            super._update(change)
        }
    }
    updateFocusElementTabIndex($cellElements, preventScroll) {
        if (this.option("focusedRowEnabled")) {
            this._setFocusedRowElementTabIndex(preventScroll)
        } else {
            super.updateFocusElementTabIndex($cellElements)
        }
    }
    _setFocusedRowElementTabIndex(preventScroll) {
        const focusedRowKey = this.option("focusedRowKey");
        const tabIndex = this.option("tabIndex") ?? 0;
        const columnsController = this._columnsController;
        let rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);
        let columnIndex = this.option("focusedColumnIndex");
        const $row = this._findRowElementForTabIndex();
        const dataSource = this._dataController.dataSource();
        const operationTypes = null === dataSource || void 0 === dataSource ? void 0 : dataSource.operationTypes();
        const isPaging = !operationTypes || operationTypes.paging;
        if (!isDefined(this._scrollToFocusOnResize)) {
            this._scrollToFocusOnResize = () => {
                this.scrollToElementVertically(this._findRowElementForTabIndex());
                this.resizeCompleted.remove(this._scrollToFocusOnResize)
            }
        }
        $row.attr("tabIndex", tabIndex);
        const rowIndexFromOption = this.option("focusedRowIndex") - this._dataController.getRowIndexOffset(true);
        if (!isPaging && rowIndex < 0 && rowIndexFromOption >= 0) {
            this._focusController.updateFocusedRow({
                focusedRowIndex: rowIndexFromOption,
                preventScroll: preventScroll
            })
        }
        if (rowIndex >= 0 && !preventScroll) {
            if (columnIndex < 0) {
                columnIndex = 0
            }
            rowIndex += this._dataController.getRowIndexOffset();
            columnIndex += columnsController.getColumnIndexOffset();
            this._keyboardNavigationController.setFocusedCellPosition(rowIndex, columnIndex);
            if (this._focusController.isAutoNavigateToFocusedRow()) {
                if (!isPaging && !this._dataController.isPagingByRendering()) {
                    this.resizeCompleted.remove(this._scrollToFocusOnResize);
                    this.resizeCompleted.add(this._scrollToFocusOnResize)
                }
            }
        }
    }
    _findRowElementForTabIndex() {
        const focusedRowKey = this.option("focusedRowKey");
        const rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);
        return $(this.getRowElement(rowIndex >= 0 ? rowIndex : 0))
    }
    scrollToRowElement(key) {
        const rowIndex = this._dataController.getRowIndexByKey(key);
        const $row = $(this.getRow(rowIndex));
        return this.scrollToElementVertically($row)
    }
    scrollToElementVertically($row) {
        const scrollable = this.getScrollable();
        if (scrollable && $row.length) {
            const position = scrollable.getScrollElementPosition($row, "vertical");
            return this.scrollTopPosition(position)
        }
        return (new Deferred).resolve()
    }
    scrollTopPosition(scrollTop) {
        const d = new Deferred;
        const scrollable = this.getScrollable();
        if (scrollable) {
            const currentScrollTop = scrollable.scrollTop();
            const scrollHandler = () => {
                scrollable.off("scroll", scrollHandler);
                d.resolve()
            };
            if (scrollTop !== currentScrollTop) {
                scrollable.on("scroll", scrollHandler);
                this._dataController.resetFilterApplying();
                scrollable.scrollTo({
                    top: scrollTop
                });
                return d.promise()
            }
        }
        return d.resolve()
    }
};
export const focusModule = {
    defaultOptions: () => ({
        focusedRowEnabled: false,
        autoNavigateToFocusedRow: true,
        focusedRowKey: null,
        focusedRowIndex: -1,
        focusedColumnIndex: -1
    }),
    controllers: {
        focus: FocusController
    },
    extenders: {
        controllers: {
            keyboardNavigation: keyboardNavigation,
            editorFactory: editorFactory,
            columns: columns,
            data: data,
            editing: editing
        },
        views: {
            rowsView: rowsView
        }
    }
};
