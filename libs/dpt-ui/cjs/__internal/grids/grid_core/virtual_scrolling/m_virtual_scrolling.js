/**
 * DevExtreme (cjs/__internal/grids/grid_core/virtual_scrolling/m_virtual_scrolling.js)
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
exports.virtualScrollingModule = exports.rowsView = exports.resizing = exports.dataSourceAdapterExtender = exports.data = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _deferred = require("../../../../core/utils/deferred");
var _dom = require("../../../../core/utils/dom");
var _iterator = require("../../../../core/utils/iterator");
var _position = require("../../../../core/utils/position");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _load_indicator = _interopRequireDefault(require("../../../../ui/load_indicator"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _m_virtual_scrolling_core = require("./m_virtual_scrolling_core");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const BOTTOM_LOAD_PANEL_CLASS = "bottom-load-panel";
const GROUP_SPACE_CLASS = "group-space";
const FREESPACE_CLASS = "dx-freespace-row";
const COLUMN_LINES_CLASS = "dx-column-lines";
const VIRTUAL_ROW_CLASS = "dx-virtual-row";
const ROW_INSERTED = "dx-row-inserted";
const SCROLLING_MODE_INFINITE = "infinite";
const SCROLLING_MODE_VIRTUAL = "virtual";
const LOAD_TIMEOUT = 300;
const LEGACY_SCROLLING_MODE = "scrolling.legacyMode";
const VISIBLE_PAGE_INDEX = "paging.pageIndex";
const PAGING_METHOD_NAMES = ["beginPageIndex", "endPageIndex", "pageIndex"];
const isVirtualMode = function(that) {
    return "virtual" === that.option("scrolling.mode")
};
const isAppendMode = function(that) {
    return "infinite" === that.option("scrolling.mode")
};
const isVirtualPaging = function(that) {
    return isVirtualMode(that) || isAppendMode(that)
};
const correctCount = function(items, count, fromEnd, isItemCountableFunc) {
    for (let i = 0; i < count + 1; i++) {
        const item = items[fromEnd ? items.length - 1 - i : i];
        if (item && !isItemCountableFunc(item, i === count, fromEnd)) {
            count++
        }
    }
    return count
};
const isItemCountableByDataSource = function(item, dataSource) {
    return "data" === item.rowType && !item.isNewRow || "group" === item.rowType && dataSource.isGroupItemCountable(item.data)
};
const updateItemIndices = function(items) {
    items.forEach(((item, index) => {
        item.rowIndex = index
    }));
    return items
};
const updateLoading = function(that) {
    const beginPageIndex = that._virtualScrollController.beginPageIndex(-1);
    if (isVirtualMode(that)) {
        if (beginPageIndex < 0 || that.viewportSize() >= 0 && that.getViewportItemIndex() >= 0 && (beginPageIndex * that.pageSize() > that.getViewportItemIndex() || beginPageIndex * that.pageSize() + that.itemsCount() < that.getViewportItemIndex() + that.viewportSize()) && that._dataSource.isLoading()) {
            if (!that._isLoading) {
                that._isLoading = true;
                that.loadingChanged.fire(true)
            }
        } else if (that._isLoading) {
            that._isLoading = false;
            that.loadingChanged.fire(false)
        }
    }
};
const proxyDataSourceAdapterMethod = function(that, methodName, args) {
    if (false === that.option(LEGACY_SCROLLING_MODE) && PAGING_METHOD_NAMES.includes(methodName)) {
        const dataSource = that._dataSource;
        return dataSource.pageIndex.apply(dataSource, args)
    }
    const virtualScrollController = that._virtualScrollController;
    return virtualScrollController[methodName].apply(virtualScrollController, args)
};
const removeEmptyRows = function($emptyRows, className) {
    const tBodies = $emptyRows.toArray().map((row => (0, _renderer.default)(row).parent(`.${className}`).get(0))).filter((row => row));
    if (tBodies.length) {
        $emptyRows = (0, _renderer.default)(tBodies)
    }
    const rowCount = className === FREESPACE_CLASS ? $emptyRows.length - 1 : $emptyRows.length;
    for (let i = 0; i < rowCount; i++) {
        $emptyRows.eq(i).remove()
    }
};
const dataSourceAdapterExtender = Base => class extends Base {
    init() {
        super.init.apply(this, arguments);
        this._items = [];
        this._totalCount = -1;
        this._isLoaded = true;
        this._loadPageCount = 1;
        this._virtualScrollController = new _m_virtual_scrolling_core.VirtualScrollController(this.component, this._getVirtualScrollDataOptions())
    }
    dispose() {
        this._virtualScrollController.dispose();
        super.dispose.apply(this, arguments)
    }
    _getVirtualScrollDataOptions() {
        const that = this;
        return {
            pageSize: () => that.pageSize(),
            totalItemsCount: () => that.totalItemsCount(),
            hasKnownLastPage: () => that.hasKnownLastPage(),
            pageIndex: index => that._dataSource.pageIndex(index),
            isLoading: () => that._dataSource.isLoading() && !that.isCustomLoading(),
            pageCount: () => that.pageCount(),
            load: () => that._dataSource.load(),
            updateLoading() {
                updateLoading(that)
            },
            itemsCount: () => that.itemsCount(true),
            items: () => that._dataSource.items(),
            viewportItems(items) {
                if (items) {
                    that._items = items
                }
                return that._items
            },
            onChanged(e) {
                that.changed.fire(e)
            },
            changingDuration() {
                if (that.isLoading()) {
                    return 300
                }
                return that._renderTime || 0
            }
        }
    }
    _handleLoadingChanged(isLoading) {
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            super._handleLoadingChanged.apply(this, arguments);
            return
        }
        if (!isVirtualMode(this) || this._isLoadingAll) {
            this._isLoading = isLoading;
            super._handleLoadingChanged.apply(this, arguments)
        }
        if (isLoading) {
            this._startLoadTime = new Date
        } else {
            this._startLoadTime = void 0
        }
    }
    _handleLoadError() {
        if (false !== this.option(LEGACY_SCROLLING_MODE)) {
            this._isLoading = false;
            this.loadingChanged.fire(false)
        }
        super._handleLoadError.apply(this, arguments)
    }
    _handleDataChanged(e) {
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            this._items = this._dataSource.items().slice();
            this._totalCount = this._dataSourceTotalCount(true);
            super._handleDataChanged.apply(this, arguments);
            return
        }
        const callBase = super._handleDataChanged.bind(this);
        this._virtualScrollController.handleDataChanged(callBase, e)
    }
    _customizeRemoteOperations(options, operationTypes) {
        const newMode = false === this.option(LEGACY_SCROLLING_MODE);
        let renderAsync = this.option("scrolling.renderAsync");
        if (!(0, _type.isDefined)(renderAsync)) {
            renderAsync = this._renderTime >= this.option("scrolling.renderingThreshold")
        }
        if ((isVirtualMode(this) || isAppendMode(this) && newMode) && !operationTypes.reload && (operationTypes.skip || newMode) && !renderAsync) {
            options.delay = void 0
        }
        super._customizeRemoteOperations.apply(this, arguments)
    }
    items() {
        return this._items
    }
    _dataSourceTotalCount(isBase) {
        return false === this.option(LEGACY_SCROLLING_MODE) && isVirtualMode(this) && !isBase ? this._totalCount : super._dataSourceTotalCount()
    }
    itemsCount(isBase) {
        if (isBase || false === this.option(LEGACY_SCROLLING_MODE)) {
            return super.itemsCount()
        }
        return this._virtualScrollController.itemsCount()
    }
    load(loadOptions) {
        if (false === this.option(LEGACY_SCROLLING_MODE) || loadOptions) {
            return super.load(loadOptions)
        }
        return this._virtualScrollController.load()
    }
    isLoading() {
        return false === this.option(LEGACY_SCROLLING_MODE) ? this._dataSource.isLoading() : this._isLoading
    }
    isLoaded() {
        return this._dataSource.isLoaded() && this._isLoaded
    }
    resetPagesCache(isLiveUpdate) {
        if (!isLiveUpdate) {
            this._virtualScrollController.reset(true)
        }
        super.resetPagesCache.apply(this, arguments)
    }
    _changeRowExpandCore() {
        const result = super._changeRowExpandCore.apply(this, arguments);
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            return result
        }
        this.resetPagesCache();
        updateLoading(this);
        return result
    }
    reload() {
        this._dataSource.pageIndex(this.pageIndex());
        const virtualScrollController = this._virtualScrollController;
        if (false !== this.option(LEGACY_SCROLLING_MODE) && virtualScrollController) {
            const d = new _deferred.Deferred;
            super.reload.apply(this, arguments).done((r => {
                const delayDeferred = virtualScrollController.getDelayDeferred();
                if (delayDeferred) {
                    delayDeferred.done(d.resolve).fail(d.reject)
                } else {
                    d.resolve(r)
                }
            })).fail(d.reject);
            return d
        }
        return super.reload.apply(this, arguments)
    }
    refresh(options, operationTypes) {
        if (false !== this.option(LEGACY_SCROLLING_MODE)) {
            const {
                storeLoadOptions: storeLoadOptions
            } = options;
            const dataSource = this._dataSource;
            if (operationTypes.reload) {
                this._virtualScrollController.reset();
                dataSource.items().length = 0;
                this._isLoaded = false;
                updateLoading(this);
                this._isLoaded = true;
                if (isAppendMode(this)) {
                    this.pageIndex(0);
                    dataSource.pageIndex(0);
                    storeLoadOptions.pageIndex = 0;
                    options.pageIndex = 0;
                    storeLoadOptions.skip = 0
                } else {
                    dataSource.pageIndex(this.pageIndex());
                    if (dataSource.paginate()) {
                        options.pageIndex = this.pageIndex();
                        storeLoadOptions.skip = this.pageIndex() * this.pageSize()
                    }
                }
            } else if (isAppendMode(this) && storeLoadOptions.skip && this._totalCountCorrection < 0) {
                storeLoadOptions.skip += this._totalCountCorrection
            }
        }
        return super.refresh.apply(this, arguments)
    }
    loadPageCount(count) {
        if (!(0, _type.isDefined)(count)) {
            return this._loadPageCount
        }
        this._loadPageCount = count
    }
    _handleDataLoading(options) {
        const loadPageCount = this.loadPageCount();
        const pageSize = this.pageSize();
        const newMode = false === this.option(LEGACY_SCROLLING_MODE);
        const {
            storeLoadOptions: storeLoadOptions
        } = options;
        const takeIsDefined = (0, _type.isDefined)(storeLoadOptions.take);
        options.loadPageCount = loadPageCount;
        if (!options.isCustomLoading && newMode && takeIsDefined && loadPageCount > 1 && pageSize > 0) {
            storeLoadOptions.take = loadPageCount * pageSize
        }
        super._handleDataLoading.apply(this, arguments)
    }
    _loadPageSize() {
        return super._loadPageSize.apply(this, arguments) * this.loadPageCount()
    }
    beginPageIndex() {
        return proxyDataSourceAdapterMethod(this, "beginPageIndex", [...arguments])
    }
    endPageIndex() {
        return proxyDataSourceAdapterMethod(this, "endPageIndex", [...arguments])
    }
    pageIndex(pageIndex) {
        return proxyDataSourceAdapterMethod(this, "pageIndex", [...arguments])
    }
    virtualItemsCount() {
        return proxyDataSourceAdapterMethod(this, "virtualItemsCount", [...arguments])
    }
    getContentOffset() {
        return proxyDataSourceAdapterMethod(this, "getContentOffset", [...arguments])
    }
    getVirtualContentSize() {
        return proxyDataSourceAdapterMethod(this, "getVirtualContentSize", [...arguments])
    }
    setContentItemSizes() {
        return proxyDataSourceAdapterMethod(this, "setContentItemSizes", [...arguments])
    }
    setViewportPosition() {
        return proxyDataSourceAdapterMethod(this, "setViewportPosition", [...arguments])
    }
    getViewportItemIndex() {
        return proxyDataSourceAdapterMethod(this, "getViewportItemIndex", [...arguments])
    }
    setViewportItemIndex(viewportItemIndex) {
        return proxyDataSourceAdapterMethod(this, "setViewportItemIndex", [...arguments])
    }
    getItemIndexByPosition() {
        return proxyDataSourceAdapterMethod(this, "getItemIndexByPosition", [...arguments])
    }
    viewportSize() {
        return proxyDataSourceAdapterMethod(this, "viewportSize", [...arguments])
    }
    viewportItemSize() {
        return proxyDataSourceAdapterMethod(this, "viewportItemSize", [...arguments])
    }
    getItemSize() {
        return proxyDataSourceAdapterMethod(this, "getItemSize", [...arguments])
    }
    getItemSizes() {
        return proxyDataSourceAdapterMethod(this, "getItemSizes", [...arguments])
    }
    loadIfNeed() {
        return proxyDataSourceAdapterMethod(this, "loadIfNeed", [...arguments])
    }
};
exports.dataSourceAdapterExtender = dataSourceAdapterExtender;
const data = Base => class extends Base {
    dispose() {
        const rowsScrollController = this._rowsScrollController;
        rowsScrollController && rowsScrollController.dispose();
        super.dispose.apply(this, arguments)
    }
    _refreshDataSource() {
        const baseResult = super._refreshDataSource.apply(this, arguments) || (new _deferred.Deferred).resolve().promise();
        baseResult.done(this.initVirtualRows.bind(this));
        return baseResult
    }
    _loadDataSource() {
        if (this._rowsScrollController && isVirtualPaging(this)) {
            var _this$_dataSource;
            const {
                loadPageCount: loadPageCount
            } = (0, _type.isDefined)(this._loadViewportParams) ? this.getLoadPageParams(): {
                loadPageCount: 0
            };
            loadPageCount >= 1 && (null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource ? void 0 : _this$_dataSource.loadPageCount(loadPageCount))
        }
        return super._loadDataSource.apply(this, arguments)
    }
    getRowPageSize() {
        const rowPageSize = this.option("scrolling.rowPageSize");
        const pageSize = this.pageSize();
        return pageSize && pageSize < rowPageSize ? pageSize : rowPageSize
    }
    reload() {
        const rowsScrollController = this._rowsScrollController || this._dataSource;
        const itemIndex = rowsScrollController && rowsScrollController.getItemIndexByPosition();
        const result = super.reload.apply(this, arguments);
        return result && result.done((() => {
            if (isVirtualMode(this) || _m_utils.default.isVirtualRowRendering(this)) {
                const rowIndexOffset = this.getRowIndexOffset();
                const rowIndex = Math.floor(itemIndex) - rowIndexOffset;
                const {
                    component: component
                } = this;
                const scrollable = component.getScrollable && component.getScrollable();
                const isSortingOperation = this.dataSource().operationTypes().sorting;
                if (scrollable && !isSortingOperation && rowIndex >= 0) {
                    var _$rowElement$position;
                    const rowElement = component.getRowElement(rowIndex);
                    const $rowElement = rowElement && rowElement[0] && (0, _renderer.default)(rowElement[0]);
                    let top = $rowElement && (null === (_$rowElement$position = $rowElement.position()) || void 0 === _$rowElement$position ? void 0 : _$rowElement$position.top);
                    const isChromeLatest = _browser.default.chrome && Number(_browser.default.version ?? 0) >= 91;
                    const allowedTopOffset = _browser.default.mozilla || isChromeLatest ? 1 : 0;
                    if (top && top > allowedTopOffset) {
                        top = Math.round(top + (0, _size.getOuterHeight)($rowElement) * (itemIndex % 1));
                        scrollable.scrollTo({
                            y: top
                        })
                    }
                }
            }
        }))
    }
    initVirtualRows() {
        const virtualRowsRendering = _m_utils.default.isVirtualRowRendering(this);
        this._allItems = null;
        this._loadViewportParams = null;
        if ("virtual" !== this.option("scrolling.mode") && !virtualRowsRendering || !virtualRowsRendering || false !== this.option(LEGACY_SCROLLING_MODE) && !this.option("scrolling.rowPageSize")) {
            this._visibleItems = null;
            this._rowsScrollController = null;
            return
        }
        const pageIndex = !isVirtualMode(this) && this.pageIndex() >= this.pageCount() ? this.pageCount() - 1 : this.pageIndex();
        this._rowPageIndex = Math.ceil(pageIndex * this.pageSize() / this.getRowPageSize());
        this._visibleItems = false === this.option(LEGACY_SCROLLING_MODE) ? null : [];
        this._viewportChanging = false;
        this._needUpdateViewportAfterLoading = false;
        if (!this._rowsScrollController) {
            this._rowsScrollController = new _m_virtual_scrolling_core.VirtualScrollController(this.component, this._getRowsScrollDataOptions(), true);
            this._rowsScrollController.positionChanged.add((() => {
                var _this$_dataSource2;
                if (false === this.option(LEGACY_SCROLLING_MODE)) {
                    this._viewportChanging = true;
                    this.loadViewport();
                    this._viewportChanging = false;
                    return
                }
                null === (_this$_dataSource2 = this._dataSource) || void 0 === _this$_dataSource2 || _this$_dataSource2.setViewportItemIndex(this._rowsScrollController.getViewportItemIndex())
            }))
        }
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            this._updateLoadViewportParams()
        }
        if (this.isLoaded() && false !== this.option(LEGACY_SCROLLING_MODE)) {
            this._rowsScrollController.load()
        }
    }
    isViewportChanging() {
        return this._viewportChanging
    }
    _getRowsScrollDataOptions() {
        const that = this;
        const isItemCountable = function(item) {
            return isItemCountableByDataSource(item, that._dataSource)
        };
        return {
            pageSize: () => that.getRowPageSize(),
            loadedOffset() {
                var _that$_dataSource;
                return isVirtualMode(that) && (null === (_that$_dataSource = that._dataSource) || void 0 === _that$_dataSource ? void 0 : _that$_dataSource.lastLoadOptions().skip) || 0
            },
            loadedItemCount: () => that._itemCount,
            totalItemsCount() {
                if (isVirtualPaging(that)) {
                    return that.totalItemsCount()
                }
                return false === that.option(LEGACY_SCROLLING_MODE) ? that._itemCount : that._items.filter(isItemCountable).length
            },
            hasKnownLastPage: () => false === that.option(LEGACY_SCROLLING_MODE) ? that.hasKnownLastPage() : true,
            pageIndex(index) {
                if (void 0 !== index) {
                    that._rowPageIndex = index
                }
                return that._rowPageIndex
            },
            isLoading: () => that.isLoading(),
            pageCount() {
                const pageCount = Math.ceil(this.totalItemsCount() / this.pageSize());
                return pageCount || 1
            },
            load() {
                if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                    that._rowPageIndex = this.pageCount() - 1;
                    that._rowsScrollController.pageIndex(that._rowPageIndex)
                }
                if (!this.items().length && this.totalItemsCount()) {
                    return
                }
                that._rowsScrollController.handleDataChanged((change => {
                    change = change || {};
                    change.changeType = change.changeType || "refresh";
                    change.items = change.items || that._visibleItems;
                    that._visibleItems.forEach(((item, index) => {
                        item.rowIndex = index
                    }));
                    that._fireChanged(change)
                }))
            },
            updateLoading() {},
            itemsCount() {
                return this.items(true).length
            },
            correctCount: (items, count, fromEnd) => correctCount(items, count, fromEnd, ((item, isNextAfterLast, fromEnd) => {
                if (item.isNewRow) {
                    return isNextAfterLast && !fromEnd
                }
                if (isNextAfterLast && fromEnd) {
                    return !item.isNewRow
                }
                return isItemCountable(item)
            })),
            items(countableOnly) {
                let result = that._items;
                if (that.option(LEGACY_SCROLLING_MODE)) {
                    const dataSource = that.dataSource();
                    const virtualItemsCount = null === dataSource || void 0 === dataSource ? void 0 : dataSource.virtualItemsCount();
                    const begin = virtualItemsCount ? virtualItemsCount.begin : 0;
                    const rowPageSize = that.getRowPageSize();
                    let skip = that._rowPageIndex * rowPageSize - begin;
                    let take = rowPageSize;
                    if (skip < 0) {
                        return []
                    }
                    if (skip) {
                        skip = this.correctCount(result, skip);
                        result = result.slice(skip)
                    }
                    if (take) {
                        take = this.correctCount(result, take);
                        result = result.slice(0, take)
                    }
                }
                return countableOnly ? result.filter(isItemCountable) : result
            },
            viewportItems(items) {
                if (items && false !== that.option(LEGACY_SCROLLING_MODE)) {
                    that._visibleItems = items
                }
                return that._visibleItems
            },
            onChanged() {},
            changingDuration() {
                const dataSource = that.dataSource();
                if (null !== dataSource && void 0 !== dataSource && dataSource.isLoading() && false !== that.option(LEGACY_SCROLLING_MODE)) {
                    return 300
                }
                return (null === dataSource || void 0 === dataSource ? void 0 : dataSource._renderTime) || 0
            }
        }
    }
    _updateItemsCore(change) {
        const delta = this.getRowIndexDelta();
        super._updateItemsCore.apply(this, arguments);
        if (false === this.option(LEGACY_SCROLLING_MODE) && _m_utils.default.isVirtualRowRendering(this)) {
            if ("update" === change.changeType && 0 === change.rowIndices.length && change.cancelEmptyChanges) {
                change.cancel = true
            }
            return
        }
        const rowsScrollController = this._rowsScrollController;
        if (rowsScrollController) {
            const visibleItems = this._visibleItems;
            const isRefresh = "refresh" === change.changeType || change.isLiveUpdate;
            if ("append" === change.changeType && change.items && !change.items.length) {
                return
            }
            if (isRefresh || "append" === change.changeType || "prepend" === change.changeType) {
                change.cancel = true;
                isRefresh && rowsScrollController.reset(true);
                rowsScrollController.load()
            } else {
                if ("update" === change.changeType) {
                    change.rowIndices.forEach(((rowIndex, index) => {
                        const changeType = change.changeTypes[index];
                        const newItem = change.items[index];
                        if ("update" === changeType) {
                            visibleItems[rowIndex] = newItem
                        } else if ("insert" === changeType) {
                            visibleItems.splice(rowIndex, 0, newItem)
                        } else if ("remove" === changeType) {
                            visibleItems.splice(rowIndex, 1)
                        }
                    }))
                } else {
                    visibleItems.forEach(((item, index) => {
                        visibleItems[index] = this._items[index + delta] || visibleItems[index]
                    }));
                    change.items = visibleItems
                }
                updateItemIndices(visibleItems)
            }
        }
    }
    _updateLoadViewportParams() {
        const viewportParams = this._rowsScrollController.getViewportParams();
        const pageSize = this.pageSize();
        if (viewportParams && !isVirtualPaging(this) && pageSize > 0) {
            const pageOffset = this.pageIndex() * pageSize;
            viewportParams.skip += pageOffset
        }
        this._loadViewportParams = viewportParams
    }
    _processItems() {
        const resultItems = super._processItems.apply(this, arguments);
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            const dataSource = this._dataSource;
            let currentIndex = (null === dataSource || void 0 === dataSource ? void 0 : dataSource.lastLoadOptions().skip) ?? 0;
            let prevCountable;
            let prevRowType;
            let isPrevRowNew;
            let wasCountableItem = false;
            let newRows = [];
            resultItems.forEach((item => {
                const {
                    rowType: rowType
                } = item;
                const itemCountable = isItemCountableByDataSource(item, dataSource);
                const isNextGroupItem = "group" === rowType && (prevCountable || itemCountable || "group" !== prevRowType && currentIndex > 0);
                const isNextDataItem = "data" === rowType && itemCountable && (prevCountable || "group" !== prevRowType);
                if (!item.isNewRow && (0, _type.isDefined)(prevCountable)) {
                    const isPrevNewRowFirst = isPrevRowNew && !wasCountableItem;
                    if ((isNextGroupItem || isNextDataItem) && !isPrevNewRowFirst) {
                        currentIndex++
                    }
                }
                if (isNextGroupItem || isNextDataItem) {
                    wasCountableItem = true
                }
                if (item.isNewRow) {
                    newRows.push(item)
                } else {
                    newRows.forEach((it => {
                        it.loadIndex = currentIndex
                    }));
                    newRows = []
                }
                item.loadIndex = currentIndex;
                prevCountable = itemCountable;
                prevRowType = rowType;
                isPrevRowNew = item.isNewRow
            }));
            newRows.forEach((it => {
                it.loadIndex = currentIndex
            }))
        }
        return resultItems
    }
    _afterProcessItems(items) {
        this._itemCount = items.filter((item => isItemCountableByDataSource(item, this._dataSource))).length;
        if ((0, _type.isDefined)(this._loadViewportParams)) {
            this._updateLoadViewportParams();
            let result = items;
            this._allItems = items;
            if (items.length) {
                const {
                    skipForCurrentPage: skipForCurrentPage
                } = this.getLoadPageParams(true);
                const skip = items[0].loadIndex + skipForCurrentPage;
                const {
                    take: take
                } = this._loadViewportParams;
                result = items.filter((it => {
                    const isNewRowInEmptyData = it.isNewRow && it.loadIndex === skip && 0 === take;
                    const isLoadIndexGreaterStart = it.loadIndex >= skip;
                    const isLoadIndexLessEnd = it.loadIndex < skip + take || isNewRowInEmptyData;
                    return isLoadIndexGreaterStart && isLoadIndexLessEnd
                }))
            }
            return result
        }
        return super._afterProcessItems.apply(this, arguments)
    }
    _applyChange(change) {
        const that = this;
        const {
            items: items
        } = change;
        const {
            changeType: changeType
        } = change;
        let {
            removeCount: removeCount
        } = change;
        if (removeCount) {
            const fromEnd = "prepend" === changeType;
            removeCount = correctCount(that._items, removeCount, fromEnd, ((item, isNextAfterLast) => "data" === item.rowType && !item.isNewRow || "group" === item.rowType && (that._dataSource.isGroupItemCountable(item.data) || isNextAfterLast)));
            change.removeCount = removeCount
        }
        switch (changeType) {
            case "prepend":
                that._items.unshift.apply(that._items, items);
                if (removeCount) {
                    that._items.splice(-removeCount)
                }
                break;
            case "append":
                that._items.push.apply(that._items, items);
                if (removeCount) {
                    that._items.splice(0, removeCount)
                }
                break;
            default:
                super._applyChange(change)
        }
    }
    items(allItems) {
        return allItems ? this._allItems || this._items : this._visibleItems || this._items
    }
    getRowIndexDelta() {
        let delta = 0;
        if (this.option(LEGACY_SCROLLING_MODE)) {
            const visibleItems = this._visibleItems;
            if (visibleItems && visibleItems[0]) {
                delta = this._items.indexOf(visibleItems[0])
            }
        }
        return delta < 0 ? 0 : delta
    }
    getRowIndexOffset(byLoadedRows, needGroupOffset) {
        let offset = 0;
        const dataSource = this.dataSource();
        const rowsScrollController = this._rowsScrollController;
        const newMode = false === this.option(LEGACY_SCROLLING_MODE);
        const virtualPaging = isVirtualPaging(this);
        if (rowsScrollController && !byLoadedRows) {
            if (newMode && (0, _type.isDefined)(this._loadViewportParams)) {
                const {
                    skipForCurrentPage: skipForCurrentPage,
                    pageIndex: pageIndex
                } = this.getLoadPageParams(true);
                const items = this.items(true);
                offset = virtualPaging ? pageIndex * this.pageSize() : 0;
                if (items.length) {
                    const firstLoadIndex = items[0].loadIndex;
                    offset += items.filter((item => item.loadIndex < firstLoadIndex + skipForCurrentPage)).length
                }
            } else {
                offset = rowsScrollController.beginPageIndex() * rowsScrollController.pageSize()
            }
        } else if (virtualPaging && newMode && dataSource) {
            var _lastLoadOptions$skip;
            const lastLoadOptions = dataSource.lastLoadOptions();
            if (needGroupOffset && null !== (_lastLoadOptions$skip = lastLoadOptions.skips) && void 0 !== _lastLoadOptions$skip && _lastLoadOptions$skip.length) {
                offset = lastLoadOptions.skips.reduce(((res, skip) => res + skip), 0)
            } else {
                offset = lastLoadOptions.skip ?? 0
            }
        } else if (isVirtualMode(this) && dataSource) {
            offset = dataSource.beginPageIndex() * dataSource.pageSize()
        }
        return offset
    }
    getDataIndex() {
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            return this.getRowIndexOffset(true, true)
        }
        return super.getDataIndex.apply(this, arguments)
    }
    viewportSize() {
        const rowsScrollController = this._rowsScrollController;
        const dataSource = this._dataSource;
        const result = null === rowsScrollController || void 0 === rowsScrollController ? void 0 : rowsScrollController.viewportSize.apply(rowsScrollController, arguments);
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            return result
        }
        return null === dataSource || void 0 === dataSource ? void 0 : dataSource.viewportSize.apply(dataSource, arguments)
    }
    viewportHeight(height, scrollTop) {
        var _this$_rowsScrollCont;
        null === (_this$_rowsScrollCont = this._rowsScrollController) || void 0 === _this$_rowsScrollCont || _this$_rowsScrollCont.viewportHeight(height, scrollTop)
    }
    viewportItemSize() {
        const rowsScrollController = this._rowsScrollController;
        const dataSource = this._dataSource;
        const result = null === rowsScrollController || void 0 === rowsScrollController ? void 0 : rowsScrollController.viewportItemSize.apply(rowsScrollController, arguments);
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            return result
        }
        return null === dataSource || void 0 === dataSource ? void 0 : dataSource.viewportItemSize.apply(dataSource, arguments)
    }
    setViewportPosition() {
        const rowsScrollController = this._rowsScrollController;
        const dataSource = this._dataSource;
        this._isPaging = false;
        if (rowsScrollController) {
            rowsScrollController.setViewportPosition.apply(rowsScrollController, arguments)
        } else {
            null === dataSource || void 0 === dataSource || dataSource.setViewportPosition.apply(dataSource, arguments)
        }
    }
    setContentItemSizes(sizes) {
        const rowsScrollController = this._rowsScrollController;
        const dataSource = this._dataSource;
        const result = null === rowsScrollController || void 0 === rowsScrollController ? void 0 : rowsScrollController.setContentItemSizes(sizes);
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            return result
        }
        return null === dataSource || void 0 === dataSource ? void 0 : dataSource.setContentItemSizes(sizes)
    }
    getPreloadedRowCount() {
        const preloadCount = this.option("scrolling.preloadedRowCount");
        const preloadEnabled = this.option("scrolling.preloadEnabled");
        if ((0, _type.isDefined)(preloadCount)) {
            return preloadCount
        }
        const viewportSize = this.viewportSize();
        return preloadEnabled ? 2 * viewportSize : viewportSize
    }
    getLoadPageParams(byLoadedPage) {
        var _this$_dataSource3, _this$_dataSource4;
        const pageSize = this.pageSize();
        const viewportParams = this._loadViewportParams;
        const lastLoadOptions = null === (_this$_dataSource3 = this._dataSource) || void 0 === _this$_dataSource3 ? void 0 : _this$_dataSource3.lastLoadOptions();
        const loadedPageIndex = (null === lastLoadOptions || void 0 === lastLoadOptions ? void 0 : lastLoadOptions.pageIndex) || 0;
        const loadedTake = (null === lastLoadOptions || void 0 === lastLoadOptions ? void 0 : lastLoadOptions.take) || 0;
        const isScrollingBack = this._rowsScrollController.isScrollingBack();
        const topPreloadCount = isScrollingBack ? this.getPreloadedRowCount() : 0;
        const bottomPreloadCount = isScrollingBack ? 0 : this.getPreloadedRowCount();
        const totalCountCorrection = (null === (_this$_dataSource4 = this._dataSource) || void 0 === _this$_dataSource4 ? void 0 : _this$_dataSource4.totalCountCorrection()) || 0;
        const skipWithPreload = Math.max(0, viewportParams.skip - topPreloadCount);
        const pageIndex = byLoadedPage ? loadedPageIndex : Math.floor(pageSize ? skipWithPreload / pageSize : 0);
        const pageOffset = pageIndex * pageSize;
        const skipForCurrentPage = viewportParams.skip - pageOffset;
        const loadingTake = viewportParams.take + skipForCurrentPage + bottomPreloadCount - totalCountCorrection;
        const take = byLoadedPage ? loadedTake : loadingTake;
        const loadPageCount = Math.ceil(pageSize ? take / pageSize : 0);
        return {
            pageIndex: pageIndex,
            loadPageCount: Math.max(1, loadPageCount),
            skipForCurrentPage: Math.max(0, skipForCurrentPage)
        }
    }
    _updateVisiblePageIndex(currentPageIndex) {
        if (!this._rowsScrollController) {
            return
        }
        if ((0, _type.isDefined)(currentPageIndex)) {
            this._silentOption("paging.pageIndex", currentPageIndex);
            this.pageChanged.fire();
            return
        }
        const viewPortItemIndex = this._rowsScrollController.getViewportItemIndex();
        const newPageIndex = Math.floor(viewPortItemIndex / this.pageSize());
        if (this.pageIndex() !== newPageIndex) {
            this._silentOption("paging.pageIndex", newPageIndex);
            this.updateItems({
                changeType: "pageIndex"
            })
        }
    }
    _getChangedLoadParams() {
        const loadedPageParams = this.getLoadPageParams(true);
        const {
            pageIndex: pageIndex,
            loadPageCount: loadPageCount
        } = this.getLoadPageParams();
        const pageIndexIsValid = this._pageIndexIsValid(pageIndex);
        let result = null;
        if (!this._isLoading && pageIndexIsValid && (pageIndex !== loadedPageParams.pageIndex || loadPageCount !== loadedPageParams.loadPageCount)) {
            result = {
                pageIndex: pageIndex,
                loadPageCount: loadPageCount
            }
        }
        return result
    }
    _pageIndexIsValid(pageIndex) {
        let result = true;
        if (isAppendMode(this) && this.hasKnownLastPage() || isVirtualMode(this)) {
            result = pageIndex * this.pageSize() < this.totalItemsCount()
        }
        return result
    }
    _loadItems(checkLoading, viewportIsFilled) {
        const virtualPaging = isVirtualPaging(this);
        const dataSourceAdapter = this._dataSource;
        const changedParams = this._getChangedLoadParams();
        const currentLoadPageCount = (null === dataSourceAdapter || void 0 === dataSourceAdapter ? void 0 : dataSourceAdapter.loadPageCount()) ?? 0;
        const lastRequiredItemCount = this.pageSize() * currentLoadPageCount;
        const currentPageIndex = (null === dataSourceAdapter || void 0 === dataSourceAdapter ? void 0 : dataSourceAdapter.pageIndex()) ?? 0;
        const pageIndexNotChanged = (null === changedParams || void 0 === changedParams ? void 0 : changedParams.pageIndex) === currentPageIndex;
        const allLoadedInAppendMode = isAppendMode(this) && this.totalItemsCount() < lastRequiredItemCount;
        const isRepaintMode = "repaint" === this.option("editing.refreshMode");
        const pageIndexIncreased = (null === changedParams || void 0 === changedParams ? void 0 : changedParams.pageIndex) > currentPageIndex;
        let result = false;
        if (!dataSourceAdapter || virtualPaging && checkLoading && (isRepaintMode && viewportIsFilled || pageIndexIncreased || pageIndexNotChanged && allLoadedInAppendMode)) {
            return result
        }
        if (virtualPaging && this._isLoading) {
            this._needUpdateViewportAfterLoading = true
        }
        if (virtualPaging && changedParams) {
            result = true;
            dataSourceAdapter.pageIndex(changedParams.pageIndex);
            dataSourceAdapter.loadPageCount(changedParams.loadPageCount);
            this._repaintChangesOnly = true;
            this._needUpdateDimensions = true;
            const viewportChanging = this._viewportChanging;
            this.load().always((() => {
                this._repaintChangesOnly = void 0;
                this._needUpdateDimensions = void 0
            })).done((() => {
                const isLastPage = this.pageCount() > 0 && this.pageIndex() === this.pageCount() - 1;
                (viewportChanging || isLastPage) && this._updateVisiblePageIndex();
                if (this._needUpdateViewportAfterLoading) {
                    this._needUpdateViewportAfterLoading = false;
                    this.loadViewport({
                        checkLoadedParamsOnly: true
                    })
                }
            }))
        }
        return result
    }
    loadViewport(params) {
        const {
            checkLoadedParamsOnly: checkLoadedParamsOnly,
            checkLoading: checkLoading,
            viewportIsNotFilled: viewportIsNotFilled
        } = params ?? {};
        const virtualPaging = isVirtualPaging(this);
        if (virtualPaging || _m_utils.default.isVirtualRowRendering(this)) {
            var _this$_dataSource5;
            this._updateLoadViewportParams();
            const loadingItemsStarted = this._loadItems(checkLoading, !viewportIsNotFilled);
            const isCustomLoading = null === (_this$_dataSource5 = this._dataSource) || void 0 === _this$_dataSource5 ? void 0 : _this$_dataSource5.isCustomLoading();
            const isLoading = checkLoading && !isCustomLoading && this._isLoading;
            const needToUpdateItems = !(loadingItemsStarted || isLoading || checkLoadedParamsOnly);
            if (needToUpdateItems) {
                var _this$_editingControl;
                const noPendingChangesInEditing = !(null !== (_this$_editingControl = this._editingController) && void 0 !== _this$_editingControl && null !== (_this$_editingControl = _this$_editingControl.getChanges()) && void 0 !== _this$_editingControl && _this$_editingControl.length);
                this.updateItems({
                    repaintChangesOnly: true,
                    needUpdateDimensions: true,
                    useProcessedItemsCache: noPendingChangesInEditing,
                    cancelEmptyChanges: true
                })
            }
        }
    }
    updateViewport() {
        var _this$_loadViewportPa;
        const viewportSize = this.viewportSize();
        const itemCount = this.items().length;
        const viewportIsNotFilled = viewportSize > itemCount;
        const currentTake = (null === (_this$_loadViewportPa = this._loadViewportParams) || void 0 === _this$_loadViewportPa ? void 0 : _this$_loadViewportPa.take) ?? 0;
        const rowsScrollController = this._rowsScrollController;
        const newTake = null === rowsScrollController || void 0 === rowsScrollController ? void 0 : rowsScrollController.getViewportParams().take;
        (viewportIsNotFilled || currentTake < newTake) && !this._isPaging && itemCount && this.loadViewport({
            checkLoading: true,
            viewportIsNotFilled: viewportIsNotFilled
        })
    }
    loadIfNeed() {
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            return
        }
        const rowsScrollController = this._rowsScrollController;
        rowsScrollController && rowsScrollController.loadIfNeed();
        const dataSource = this._dataSource;
        return dataSource && dataSource.loadIfNeed()
    }
    getItemSize() {
        const rowsScrollController = this._rowsScrollController;
        if (rowsScrollController) {
            return rowsScrollController.getItemSize.apply(rowsScrollController, arguments)
        }
        const dataSource = this._dataSource;
        return dataSource && dataSource.getItemSize.apply(dataSource, arguments)
    }
    getItemSizes() {
        const rowsScrollController = this._rowsScrollController;
        if (rowsScrollController) {
            return rowsScrollController.getItemSizes.apply(rowsScrollController, arguments)
        }
        const dataSource = this._dataSource;
        return dataSource && dataSource.getItemSizes.apply(dataSource, arguments)
    }
    getContentOffset() {
        const rowsScrollController = this._rowsScrollController;
        if (rowsScrollController) {
            return rowsScrollController.getContentOffset.apply(rowsScrollController, arguments)
        }
        const dataSource = this._dataSource;
        return dataSource && dataSource.getContentOffset.apply(dataSource, arguments)
    }
    refresh(options) {
        const dataSource = this._dataSource;
        if (dataSource && options && options.load && isAppendMode(this)) {
            dataSource.resetCurrentTotalCount()
        }
        return super.refresh.apply(this, arguments)
    }
    topItemIndex() {
        var _this$_loadViewportPa2;
        return null === (_this$_loadViewportPa2 = this._loadViewportParams) || void 0 === _this$_loadViewportPa2 ? void 0 : _this$_loadViewportPa2.skip
    }
    bottomItemIndex() {
        const viewportParams = this._loadViewportParams;
        return viewportParams && viewportParams.skip + viewportParams.take
    }
    virtualItemsCount() {
        const rowsScrollController = this._rowsScrollController;
        if (rowsScrollController) {
            return rowsScrollController.virtualItemsCount.apply(rowsScrollController, arguments)
        }
        const dataSource = this._dataSource;
        return null === dataSource || void 0 === dataSource ? void 0 : dataSource.virtualItemsCount.apply(dataSource, arguments)
    }
    pageIndex(pageIndex) {
        const virtualPaging = isVirtualPaging(this);
        const rowsScrollController = this._rowsScrollController;
        if (false === this.option(LEGACY_SCROLLING_MODE) && virtualPaging && rowsScrollController) {
            if (void 0 === pageIndex) {
                return this.option("paging.pageIndex") ?? 0
            }
        }
        return super.pageIndex.apply(this, arguments)
    }
    _fireChanged(e) {
        super._fireChanged.apply(this, arguments);
        const {
            operationTypes: operationTypes
        } = e;
        if (false === this.option(LEGACY_SCROLLING_MODE) && isVirtualPaging(this) && operationTypes) {
            const {
                fullReload: fullReload,
                pageIndex: pageIndex
            } = operationTypes;
            if (e.isDataChanged && !fullReload && pageIndex) {
                this._updateVisiblePageIndex(this._dataSource.pageIndex())
            }
        }
    }
    _getPagingOptionValue(optionName) {
        let result = super._getPagingOptionValue.apply(this, arguments);
        if (false === this.option(LEGACY_SCROLLING_MODE) && isVirtualPaging(this)) {
            result = this[optionName]()
        }
        return result
    }
    isEmpty() {
        return false === this.option(LEGACY_SCROLLING_MODE) ? !this.items(true).length : super.isEmpty.apply(this, arguments)
    }
    isLastPageLoaded() {
        let result = false;
        if (false === this.option(LEGACY_SCROLLING_MODE) && isVirtualPaging(this)) {
            const {
                pageIndex: pageIndex,
                loadPageCount: loadPageCount
            } = this.getLoadPageParams(true);
            const pageCount = this.pageCount();
            result = pageIndex + loadPageCount >= pageCount
        } else {
            result = super.isLastPageLoaded.apply(this, arguments)
        }
        return result
    }
    reset() {
        this._itemCount = 0;
        this._allItems = null;
        super.reset.apply(this, arguments)
    }
    _applyFilter() {
        var _this$_dataSource6;
        null === (_this$_dataSource6 = this._dataSource) || void 0 === _this$_dataSource6 || _this$_dataSource6.loadPageCount(1);
        return super._applyFilter.apply(this, arguments)
    }
    getVirtualContentSize() {
        var _this$_dataSource7;
        return null === (_this$_dataSource7 = this._dataSource) || void 0 === _this$_dataSource7 ? void 0 : _this$_dataSource7.getVirtualContentSize.apply(this._dataSource, arguments)
    }
    setViewportItemIndex() {
        var _this$_dataSource8;
        return null === (_this$_dataSource8 = this._dataSource) || void 0 === _this$_dataSource8 ? void 0 : _this$_dataSource8.setViewportItemIndex.apply(this._dataSource, arguments)
    }
};
exports.data = data;
const resizing = Base => class extends Base {
    dispose() {
        super.dispose.apply(this, arguments);
        clearTimeout(this._resizeTimeout)
    }
    _updateMasterDataGridCore(masterDataGrid) {
        return (0, _deferred.when)(super._updateMasterDataGridCore.apply(this, arguments)).done((masterDataGridUpdated => {
            const isNewVirtualMode = isVirtualMode(masterDataGrid) && false === masterDataGrid.option(LEGACY_SCROLLING_MODE);
            if (!masterDataGridUpdated && isNewVirtualMode) {
                const scrollable = masterDataGrid.getScrollable();
                if (scrollable) {
                    masterDataGrid.updateDimensions()
                }
            }
        }))
    }
    hasResizeTimeout() {
        return !!this._resizeTimeout
    }
    resize() {
        let result;
        if (isVirtualMode(this) || _m_utils.default.isVirtualRowRendering(this)) {
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = null;
            const diff = new Date - this._lastTime;
            const updateTimeout = this.option("scrolling.updateTimeout");
            if (this._lastTime && diff < updateTimeout) {
                result = new _deferred.Deferred;
                this._resizeTimeout = setTimeout((() => {
                    this._resizeTimeout = null;
                    super.resize.apply(this).done(result.resolve).fail(result.reject);
                    this._lastTime = new Date
                }), updateTimeout);
                this._lastTime = new Date
            } else {
                result = super.resize.apply(this);
                if (this._dataController.isLoaded()) {
                    this._lastTime = new Date
                }
            }
        } else {
            result = super.resize.apply(this)
        }
        return result
    }
};
exports.resizing = resizing;
const rowsView = Base => class extends Base {
    init() {
        var _this$_dataController;
        super.init();
        this._dataController.pageChanged.add((pageIndex => {
            const scrollTop = this._scrollTop;
            this.scrollToPage(pageIndex ?? this._dataController.pageIndex());
            if (false === this.option(LEGACY_SCROLLING_MODE) && this._scrollTop === scrollTop) {
                this._dataController.updateViewport()
            }
        }));
        this._dataController.dataSourceChanged.add((() => {
            !this._scrollTop && this._scrollToCurrentPageOnResize()
        }));
        null === (_this$_dataController = this._dataController.stateLoaded) || void 0 === _this$_dataController || _this$_dataController.add((() => {
            this._scrollToCurrentPageOnResize()
        }));
        this._scrollToCurrentPageOnResize()
    }
    dispose() {
        clearTimeout(this._scrollTimeoutID);
        super.dispose()
    }
    _scrollToCurrentPageOnResize() {
        if (this._dataController.pageIndex() > 0) {
            const resizeHandler = () => {
                this.resizeCompleted.remove(resizeHandler);
                this.scrollToPage(this._dataController.pageIndex())
            };
            this.resizeCompleted.add(resizeHandler)
        }
    }
    scrollToPage(pageIndex) {
        const pageSize = this._dataController ? this._dataController.pageSize() : 0;
        let scrollPosition;
        if (isVirtualMode(this) || isAppendMode(this)) {
            const itemSize = this._dataController.getItemSize();
            const itemSizes = this._dataController.getItemSizes();
            const itemIndex = pageIndex * pageSize;
            scrollPosition = itemIndex * itemSize;
            for (const index in itemSizes) {
                if (parseInt(index) < itemIndex) {
                    scrollPosition += itemSizes[index] - itemSize
                }
            }
        } else {
            scrollPosition = 0
        }
        this.scrollTo({
            y: scrollPosition,
            x: this._scrollLeft
        })
    }
    renderDelayedTemplates() {
        this.waitAsyncTemplates().done((() => {
            this._updateContentPosition(true)
        }));
        super.renderDelayedTemplates.apply(this, arguments)
    }
    _renderCore(e) {
        const startRenderTime = new Date;
        const deferred = super._renderCore.apply(this, arguments);
        const dataSource = this._dataController._dataSource;
        if (dataSource && e) {
            const itemCount = e.items ? e.items.length : 20;
            const viewportSize = this._dataController.viewportSize() || 20;
            if (_m_utils.default.isVirtualRowRendering(this) && itemCount > 0 && false !== this.option(LEGACY_SCROLLING_MODE)) {
                dataSource._renderTime = (new Date - startRenderTime) * viewportSize / itemCount
            } else {
                dataSource._renderTime = new Date - startRenderTime
            }
        }
        return deferred
    }
    _getRowElements(tableElement) {
        const $rows = super._getRowElements(tableElement);
        return $rows && $rows.not(".dx-virtual-row")
    }
    _removeRowsElements(contentTable, removeCount, changeType) {
        let rowElements = this._getRowElements(contentTable).toArray();
        if ("append" === changeType) {
            rowElements = rowElements.slice(0, removeCount)
        } else {
            rowElements = rowElements.slice(-removeCount)
        }
        rowElements.map((rowElement => {
            const $rowElement = (0, _renderer.default)(rowElement);
            this._errorHandlingController && this._errorHandlingController.removeErrorRow($rowElement.next());
            $rowElement.remove()
        }))
    }
    _updateContent(tableElement, change) {
        let $freeSpaceRowElements;
        const contentElement = this._findContentElement();
        const changeType = change && change.changeType;
        const d = (0, _deferred.Deferred)();
        const contentTable = contentElement.children().first();
        if ("append" === changeType || "prepend" === changeType) {
            this.waitAsyncTemplates().done((() => {
                const $tBodies = this._getBodies(tableElement);
                if (1 === $tBodies.length) {
                    this._getBodies(contentTable)["append" === changeType ? "append" : "prepend"]($tBodies.children())
                } else {
                    $tBodies["append" === changeType ? "appendTo" : "prependTo"](contentTable)
                }
                tableElement.remove();
                $freeSpaceRowElements = this._getFreeSpaceRowElements(contentTable);
                removeEmptyRows($freeSpaceRowElements, FREESPACE_CLASS);
                if (change.removeCount) {
                    this._removeRowsElements(contentTable, change.removeCount, changeType)
                }
                this._restoreErrorRow(contentTable);
                d.resolve()
            })).fail(d.reject)
        } else {
            super._updateContent.apply(this, arguments).done((() => {
                if ("update" === changeType) {
                    this._restoreErrorRow(contentTable)
                }
                d.resolve()
            })).fail(d.reject)
        }
        return d.promise().done((() => {
            this._updateBottomLoading()
        }))
    }
    _addVirtualRow($table, isFixed, location, position) {
        if (!position) {
            return
        }
        let $virtualRow = this._createEmptyRow("dx-virtual-row", isFixed, position);
        $virtualRow = this._wrapRowIfNeed($table, $virtualRow);
        this._appendEmptyRow($table, $virtualRow, location)
    }
    _updateContentItemSizes() {
        const rowHeights = this._getRowHeights();
        const correctedRowHeights = this._correctRowHeights(rowHeights);
        this._dataController.setContentItemSizes(correctedRowHeights)
    }
    _updateViewportSize(viewportHeight, scrollTop) {
        if (!(0, _type.isDefined)(viewportHeight)) {
            viewportHeight = this._hasHeight ? (0, _size.getOuterHeight)(this.element()) : (0, _size.getOuterHeight)((0, _window.getWindow)())
        }
        this._dataController.viewportHeight(viewportHeight, scrollTop)
    }
    _getRowHeights() {
        var _this$_editingControl2, _this$_editingControl3;
        const isPopupEditMode = null === (_this$_editingControl2 = this._editingController) || void 0 === _this$_editingControl2 || null === (_this$_editingControl3 = _this$_editingControl2.isPopupEditMode) || void 0 === _this$_editingControl3 ? void 0 : _this$_editingControl3.call(_this$_editingControl2);
        let rowElements = this._getRowElements(this._tableElement).toArray();
        if (isPopupEditMode) {
            rowElements = rowElements.filter((row => !(0, _renderer.default)(row).hasClass(ROW_INSERTED)))
        }
        return rowElements.map((row => (0, _position.getBoundingRect)(row).height))
    }
    _correctRowHeights(rowHeights) {
        const dataController = this._dataController;
        const dataSource = dataController._dataSource;
        const correctedRowHeights = [];
        const visibleRows = dataController.getVisibleRows();
        let itemSize = 0;
        let firstCountableItem = true;
        let lastLoadIndex = -1;
        for (let i = 0; i < rowHeights.length; i++) {
            const currentItem = visibleRows[i];
            if (!(0, _type.isDefined)(currentItem)) {
                continue
            }
            if (false === this.option(LEGACY_SCROLLING_MODE)) {
                if (lastLoadIndex >= 0 && lastLoadIndex !== currentItem.loadIndex) {
                    correctedRowHeights.push(itemSize);
                    itemSize = 0
                }
                lastLoadIndex = currentItem.loadIndex
            } else if (isItemCountableByDataSource(currentItem, dataSource)) {
                if (firstCountableItem) {
                    firstCountableItem = false
                } else {
                    correctedRowHeights.push(itemSize);
                    itemSize = 0
                }
            }
            itemSize += rowHeights[i]
        }
        itemSize > 0 && correctedRowHeights.push(itemSize);
        return correctedRowHeights
    }
    _updateContentPosition(isRender) {
        const rowHeight = this._rowHeight || 20;
        this._dataController.viewportItemSize(rowHeight);
        if (isVirtualMode(this) || _m_utils.default.isVirtualRowRendering(this)) {
            if (!isRender) {
                this._updateContentItemSizes()
            }
            const top = this._dataController.getContentOffset("begin");
            const bottom = this._dataController.getContentOffset("end");
            const $tables = this.getTableElements();
            const $virtualRows = $tables.children("tbody").children(".dx-virtual-row");
            removeEmptyRows($virtualRows, "dx-virtual-row");
            $tables.each(((index, element) => {
                const isFixed = index > 0;
                const prevFixed = this._isFixedTableRendering;
                this._isFixedTableRendering = isFixed;
                this._addVirtualRow((0, _renderer.default)(element), isFixed, "top", top);
                this._addVirtualRow((0, _renderer.default)(element), isFixed, "bottom", bottom);
                this._isFixedTableRendering = prevFixed
            }))
        }
    }
    _isTableLinesDisplaysCorrect(table) {
        const hasColumnLines = table.find(".dx-column-lines").length > 0;
        return hasColumnLines === this.option("showColumnLines")
    }
    _isColumnElementsEqual($columns, $virtualColumns) {
        let result = $columns.length === $virtualColumns.length;
        if (result) {
            (0, _iterator.each)($columns, ((index, element) => {
                if (element.style.width !== $virtualColumns[index].style.width) {
                    result = false;
                    return result
                }
                return
            }))
        }
        return result
    }
    _getCellClasses(column) {
        const classes = [];
        const {
            cssClass: cssClass
        } = column;
        const isExpandColumn = "expand" === column.command;
        cssClass && classes.push(cssClass);
        isExpandColumn && classes.push(this.addWidgetPrefix("group-space"));
        return classes
    }
    _findBottomLoadPanel($contentElement) {
        const $element = $contentElement || this.element();
        const $bottomLoadPanel = $element && $element.find(`.${this.addWidgetPrefix("bottom-load-panel")}`);
        if ($bottomLoadPanel && $bottomLoadPanel.length) {
            return $bottomLoadPanel
        }
    }
    _updateBottomLoading() {
        const that = this;
        const virtualMode = isVirtualMode(this);
        const appendMode = isAppendMode(this);
        const showBottomLoading = !that._dataController.hasKnownLastPage() && that._dataController.isLoaded() && (virtualMode || appendMode);
        const $contentElement = that._findContentElement();
        const bottomLoadPanelElement = that._findBottomLoadPanel($contentElement);
        if (showBottomLoading) {
            if (!bottomLoadPanelElement) {
                (0, _renderer.default)("<div>").addClass(that.addWidgetPrefix("bottom-load-panel")).append(that._createComponent((0, _renderer.default)("<div>"), _load_indicator.default, {
                    elementAttr: {
                        role: null,
                        "aria-label": null
                    }
                }).$element()).appendTo($contentElement)
            }
        } else if (bottomLoadPanelElement) {
            bottomLoadPanelElement.remove()
        }
    }
    _handleScroll(e) {
        const legacyScrollingMode = true === this.option(LEGACY_SCROLLING_MODE);
        const zeroTopPosition = 0 === e.scrollOffset.top;
        const isScrollTopChanged = this._scrollTop !== e.scrollOffset.top;
        const hasScrolled = isScrollTopChanged || e.forceUpdateScrollPosition;
        const isValidScrollTarget = this._hasHeight || !legacyScrollingMode && zeroTopPosition;
        if (hasScrolled && isValidScrollTarget && this._rowHeight) {
            this._scrollTop = e.scrollOffset.top;
            const isVirtualRowRendering = isVirtualMode(this) || "standard" !== this.option("scrolling.rowRenderingMode");
            if (isVirtualRowRendering && false === this.option(LEGACY_SCROLLING_MODE)) {
                this._updateContentItemSizes();
                this._updateViewportSize(null, this._scrollTop)
            }
            this._dataController.setViewportPosition(e.scrollOffset.top)
        }
        super._handleScroll.apply(this, arguments)
    }
    _needUpdateRowHeight(itemsCount) {
        return super._needUpdateRowHeight.apply(this, arguments) || itemsCount > 0 && isAppendMode(this) && !_m_utils.default.isVirtualRowRendering(this)
    }
    _updateRowHeight() {
        super._updateRowHeight.apply(this, arguments);
        if (this._rowHeight) {
            this._updateContentPosition();
            const viewportHeight = this._hasHeight ? (0, _size.getOuterHeight)(this.element()) : (0, _size.getOuterHeight)((0, _window.getWindow)());
            if (false === this.option(LEGACY_SCROLLING_MODE)) {
                this._updateViewportSize(viewportHeight);
                this._dataController.updateViewport()
            } else {
                this._dataController.viewportSize(Math.ceil(viewportHeight / this._rowHeight))
            }
        }
    }
    updateFreeSpaceRowHeight() {
        const result = super.updateFreeSpaceRowHeight.apply(this, arguments);
        if (result) {
            this._updateContentPosition()
        }
        return result
    }
    setLoading(isLoading, messageText) {
        const dataController = this._dataController;
        const hasBottomLoadPanel = dataController.pageIndex() > 0 && dataController.isLoaded() && !!this._findBottomLoadPanel();
        if (false === this.option(LEGACY_SCROLLING_MODE) && isLoading && dataController.isViewportChanging()) {
            return
        }
        if (hasBottomLoadPanel) {
            isLoading = false
        }
        super.setLoading.call(this, isLoading, messageText)
    }
    throwHeightWarningIfNeed() {
        if (void 0 === this._hasHeight) {
            return
        }
        const needToThrow = !this._hasHeight && isVirtualPaging(this);
        if (needToThrow && !this._heightWarningIsThrown) {
            this._heightWarningIsThrown = true;
            _ui.default.log("W1025")
        }
    }
    _resizeCore() {
        const that = this;
        const $element = that.element();
        super._resizeCore();
        this.throwHeightWarningIfNeed();
        if (that.component.$element() && !that._windowScroll && (0, _dom.isElementInDom)($element)) {
            that._windowScroll = (0, _m_virtual_scrolling_core.subscribeToExternalScrollers)($element, (scrollPos => {
                if (!that._hasHeight && that._rowHeight) {
                    that._dataController.setViewportPosition(scrollPos)
                }
            }), that.component.$element());
            that.on("disposing", (() => {
                that._windowScroll.dispose()
            }))
        }
        if (false !== this.option(LEGACY_SCROLLING_MODE)) {
            that.loadIfNeed()
        }
    }
    loadIfNeed() {
        var _this$_dataController2, _this$_dataController3;
        null === (_this$_dataController2 = this._dataController) || void 0 === _this$_dataController2 || null === (_this$_dataController3 = _this$_dataController2.loadIfNeed) || void 0 === _this$_dataController3 || _this$_dataController3.call(_this$_dataController2)
    }
    _restoreErrorRow(contentTable) {
        if (false === this.option(LEGACY_SCROLLING_MODE)) {
            var _this$_errorHandlingC;
            null === (_this$_errorHandlingC = this._errorHandlingController) || void 0 === _this$_errorHandlingC || _this$_errorHandlingC.removeErrorRow()
        }
        super._restoreErrorRow.apply(this, arguments)
    }
};
exports.rowsView = rowsView;
const virtualScrollingModule = exports.virtualScrollingModule = {
    defaultOptions: () => ({
        scrolling: {
            timeout: 300,
            updateTimeout: 300,
            minTimeout: 0,
            renderingThreshold: 100,
            removeInvisiblePages: true,
            rowPageSize: 5,
            prerenderedRowChunkSize: 1,
            mode: "standard",
            preloadEnabled: false,
            rowRenderingMode: "standard",
            loadTwoPagesOnStart: false,
            legacyMode: false,
            prerenderedRowCount: 1
        }
    }),
    extenders: {
        controllers: {
            data: data,
            resizing: resizing
        },
        views: {
            rowsView: rowsView
        }
    }
};
