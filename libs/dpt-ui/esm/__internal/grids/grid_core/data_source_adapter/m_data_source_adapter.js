/**
 * DevExtreme (esm/__internal/grids/grid_core/data_source_adapter/m_data_source_adapter.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Callbacks from "../../../../core/utils/callbacks";
import {
    getKeyHash
} from "../../../../core/utils/common";
import {
    Deferred,
    when
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import {
    isDefined,
    isFunction,
    isPlainObject
} from "../../../../core/utils/type";
import ArrayStore from "../../../../data/array_store";
import {
    applyBatch
} from "../../../../data/array_utils";
import modules from "../m_modules";
import gridCoreUtils from "../m_utils";
import {
    calculateOperationTypes,
    cloneItems,
    createEmptyCachedData,
    executeTask,
    getPageDataFromCache,
    setPageDataToCache
} from "./m_data_source_adapter_utils";
export default class DataSourceAdapter extends modules.Controller {
    init(dataSource, remoteOperations) {
        const that = this;
        that._dataSource = dataSource;
        that._remoteOperations = remoteOperations || {};
        that._isLastPage = !dataSource.isLastPage();
        that._hasLastPage = false;
        that._currentTotalCount = 0;
        that._cachedData = createEmptyCachedData();
        that._lastOperationTypes = {};
        that._eventsStrategy = dataSource._eventsStrategy;
        that._totalCountCorrection = 0;
        that._isLoadingAll = false;
        that.changed = Callbacks();
        that.loadingChanged = Callbacks();
        that.loadError = Callbacks();
        that.customizeStoreLoadOptions = Callbacks();
        that.changing = Callbacks();
        that.pushed = Callbacks();
        that._dataChangedHandler = that._handleDataChanged.bind(that);
        that._customizeStoreLoadOptionsHandler = that._handleCustomizeStoreLoadOptions.bind(that);
        that._dataLoadedHandler = that._handleDataLoaded.bind(that);
        that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
        that._loadErrorHandler = that._handleLoadError.bind(that);
        that._pushHandler = that._handlePush.bind(that);
        that._changingHandler = that._handleChanging.bind(that);
        dataSource.on("changed", that._dataChangedHandler);
        dataSource.on("customizeStoreLoadOptions", that._customizeStoreLoadOptionsHandler);
        dataSource.on("customizeLoadResult", that._dataLoadedHandler);
        dataSource.on("loadingChanged", that._loadingChangedHandler);
        dataSource.on("loadError", that._loadErrorHandler);
        dataSource.on("changing", that._changingHandler);
        dataSource.store().on("beforePush", that._pushHandler);
        each(dataSource, ((memberName, member) => {
            if (!that[memberName] && isFunction(member)) {
                that[memberName] = function() {
                    return this._dataSource[memberName].apply(this._dataSource, arguments)
                }
            }
        }))
    }
    dispose(isSharedDataSource) {
        const dataSource = this._dataSource;
        const store = dataSource.store();
        dataSource.off("changed", this._dataChangedHandler);
        dataSource.off("customizeStoreLoadOptions", this._customizeStoreLoadOptionsHandler);
        dataSource.off("customizeLoadResult", this._dataLoadedHandler);
        dataSource.off("loadingChanged", this._loadingChangedHandler);
        dataSource.off("loadError", this._loadErrorHandler);
        dataSource.off("changing", this._changingHandler);
        store && store.off("beforePush", this._pushHandler);
        if (!isSharedDataSource) {
            dataSource.dispose()
        }
    }
    remoteOperations() {
        return this._remoteOperations
    }
    refresh(options, operationTypes) {
        const that = this;
        const dataSource = that._dataSource;
        if (operationTypes.reload) {
            that.resetCurrentTotalCount();
            that._isLastPage = !dataSource.paginate();
            that._hasLastPage = that._isLastPage
        }
    }
    resetCurrentTotalCount() {
        this._currentTotalCount = 0;
        this._totalCountCorrection = 0
    }
    resetCache() {
        this._cachedStoreData = void 0;
        this._cachedPagingData = void 0
    }
    resetPagesCache(isLiveUpdate) {
        this._cachedData = createEmptyCachedData()
    }
    _needClearStoreDataCache() {
        const remoteOperations = this.remoteOperations();
        const operationTypes = calculateOperationTypes(this._lastLoadOptions || {}, {});
        const isLocalOperations = Object.keys(remoteOperations).every((operationName => !operationTypes[operationName] || !remoteOperations[operationName]));
        return !isLocalOperations
    }
    push(changes, fromStore) {
        const store = this.store();
        if (this._needClearStoreDataCache()) {
            this._cachedStoreData = void 0
        }
        this._cachedPagingData = void 0;
        this.resetPagesCache(true);
        if (this._cachedStoreData) {
            applyBatch({
                keyInfo: store,
                data: this._cachedStoreData,
                changes: changes
            })
        }
        if (!fromStore) {
            this._applyBatch(changes)
        }
        this.pushed.fire(changes)
    }
    getDataIndexGetter() {
        if (!this._dataIndexGetter) {
            let indexByKey;
            let storeData;
            const store = this.store();
            this._dataIndexGetter = data => {
                const isCacheUpdated = storeData && storeData !== this._cachedStoreData;
                if (!indexByKey || isCacheUpdated) {
                    storeData = this._cachedStoreData || [];
                    indexByKey = {};
                    for (let i = 0; i < storeData.length; i++) {
                        indexByKey[getKeyHash(store.keyOf(storeData[i]))] = i
                    }
                }
                return indexByKey[getKeyHash(store.keyOf(data))]
            }
        }
        return this._dataIndexGetter
    }
    _getKeyInfo() {
        return this.store()
    }
    _needToCopyDataObject() {
        return true
    }
    _applyBatch(changes, fromStore) {
        const keyInfo = this._getKeyInfo();
        const dataSource = this._dataSource;
        const groupCount = gridCoreUtils.normalizeSortingInfo(this.group()).length;
        const isReshapeMode = "reshape" === this.option("editing.refreshMode");
        const isVirtualMode = "virtual" === this.option("scrolling.mode");
        changes = changes.filter((change => !dataSource.paginate() || "insert" !== change.type || void 0 !== change.index));
        const getItemCount = () => groupCount ? this.itemsCount() : this.items().length;
        const oldItemCount = getItemCount();
        applyBatch({
            keyInfo: keyInfo,
            data: this._items,
            changes: changes,
            groupCount: groupCount,
            useInsertIndex: true,
            skipCopying: !this._needToCopyDataObject()
        });
        applyBatch({
            keyInfo: keyInfo,
            data: dataSource.items(),
            changes: changes,
            groupCount: groupCount,
            useInsertIndex: true,
            skipCopying: !this._needToCopyDataObject()
        });
        const needUpdateTotalCountCorrection = this._currentTotalCount > 0 || (fromStore || !isReshapeMode) && isVirtualMode;
        if (needUpdateTotalCountCorrection) {
            this._totalCountCorrection += getItemCount() - oldItemCount
        }
        changes.splice(0, changes.length)
    }
    _handlePush(_ref) {
        let {
            changes: changes
        } = _ref;
        this.push(changes, true)
    }
    _handleChanging(e) {
        this.changing.fire(e);
        this._applyBatch(e.changes, true)
    }
    _needCleanCacheByOperation(operationType, remoteOperations) {
        const operationTypesByOrder = ["filtering", "sorting", "paging"];
        const operationTypeIndex = operationTypesByOrder.indexOf(operationType);
        const currentOperationTypes = operationTypeIndex >= 0 ? operationTypesByOrder.slice(operationTypeIndex) : [operationType];
        return currentOperationTypes.some((operationType => remoteOperations[operationType]))
    }
    _customizeRemoteOperations(options, operationTypes) {
        let cachedStoreData = this._cachedStoreData;
        let cachedPagingData = this._cachedPagingData;
        let cachedData = this._cachedData;
        if (options.storeLoadOptions.filter && !options.remoteOperations.filtering || options.storeLoadOptions.sort && !options.remoteOperations.sorting) {
            options.remoteOperations = {
                filtering: options.remoteOperations.filtering,
                summary: options.remoteOperations.summary
            }
        }
        if (operationTypes.fullReload) {
            cachedStoreData = void 0;
            cachedPagingData = void 0;
            cachedData = createEmptyCachedData()
        } else {
            if (operationTypes.reload) {
                cachedPagingData = void 0;
                cachedData = createEmptyCachedData()
            } else if (operationTypes.groupExpanding) {
                cachedData = createEmptyCachedData()
            }
            each(operationTypes, ((operationType, value) => {
                if (value && this._needCleanCacheByOperation(operationType, options.remoteOperations)) {
                    cachedStoreData = void 0;
                    cachedPagingData = void 0
                }
            }))
        }
        if (cachedPagingData) {
            options.remoteOperations.paging = false
        }
        options.cachedStoreData = cachedStoreData;
        options.cachedPagingData = cachedPagingData;
        options.cachedData = cachedData;
        if (!options.isCustomLoading) {
            this._cachedStoreData = cachedStoreData;
            this._cachedPagingData = cachedPagingData;
            this._cachedData = cachedData
        }
    }
    _handleCustomizeStoreLoadOptions(options) {
        var _options$data;
        this._handleDataLoading(options);
        if (!(0 === (null === (_options$data = options.data) || void 0 === _options$data ? void 0 : _options$data.length))) {
            options.data = getPageDataFromCache(options, true) || options.cachedStoreData
        }
    }
    _handleDataLoading(options) {
        const dataSource = this._dataSource;
        const lastLoadOptions = this._lastLoadOptions;
        this.customizeStoreLoadOptions.fire(options);
        options.delay = this.option("loadingTimeout");
        options.originalStoreLoadOptions = options.storeLoadOptions;
        options.remoteOperations = extend({}, this.remoteOperations());
        const isFullReload = !this.isLoaded() && !this._isRefreshing;
        if (this.option("integrationOptions.renderedOnServer") && !this.isLoaded()) {
            options.delay = void 0
        }
        const loadOptions = extend({
            pageIndex: this.pageIndex(),
            pageSize: this.pageSize()
        }, options.storeLoadOptions);
        const operationTypes = calculateOperationTypes(loadOptions, lastLoadOptions, isFullReload);
        this._customizeRemoteOperations(options, operationTypes);
        if (!options.isCustomLoading) {
            const isRefreshing = this._isRefreshing;
            options.pageIndex = dataSource.pageIndex();
            options.lastLoadOptions = loadOptions;
            options.operationTypes = operationTypes;
            this._loadingOperationTypes = operationTypes;
            this._isRefreshing = true;
            when(isRefreshing || this._isRefreshed || this.refresh(options, operationTypes)).done((() => {
                if (this._lastOperationId === options.operationId) {
                    this._isRefreshed = true;
                    this.load().always((() => {
                        this._isRefreshed = false
                    }))
                }
            })).fail((() => {
                dataSource.cancel(options.operationId)
            })).always((() => {
                this._isRefreshing = false
            }));
            dataSource.cancel(this._lastOperationId);
            this._lastOperationId = options.operationId;
            if (this._isRefreshing) {
                dataSource.cancel(this._lastOperationId)
            }
        }
        this._handleDataLoadingCore(options)
    }
    _handleDataLoadingCore(options) {
        const {
            remoteOperations: remoteOperations
        } = options;
        options.loadOptions = {};
        const cachedExtra = options.cachedData.extra;
        const localLoadOptionNames = {
            filter: !remoteOperations.filtering,
            sort: !remoteOperations.sorting,
            group: !remoteOperations.grouping,
            summary: !remoteOperations.summary,
            skip: !remoteOperations.paging,
            take: !remoteOperations.paging,
            requireTotalCount: cachedExtra && "totalCount" in cachedExtra || !remoteOperations.paging,
            langParams: !remoteOperations.filtering || !remoteOperations.sorting
        };
        each(options.storeLoadOptions, ((optionName, optionValue) => {
            if (localLoadOptionNames[optionName]) {
                options.loadOptions[optionName] = optionValue;
                delete options.storeLoadOptions[optionName]
            }
        }));
        if (cachedExtra) {
            options.extra = cachedExtra
        }
    }
    _handleDataLoaded(options) {
        const {
            loadOptions: loadOptions
        } = options;
        const localPaging = options.remoteOperations && !options.remoteOperations.paging;
        const {
            cachedData: cachedData
        } = options;
        const {
            storeLoadOptions: storeLoadOptions
        } = options;
        const needCache = false !== this.option("cacheEnabled") && storeLoadOptions;
        const needPageCache = needCache && !options.isCustomLoading && cachedData && (!localPaging || storeLoadOptions.group);
        const needPagingCache = needCache && localPaging;
        const needStoreCache = needPagingCache && !options.isCustomLoading;
        if (!loadOptions) {
            this._dataSource.cancel(options.operationId);
            return
        }
        if (localPaging) {
            options.skip = loadOptions.skip;
            options.take = loadOptions.take;
            delete loadOptions.skip;
            delete loadOptions.take
        }
        if (loadOptions.group) {
            loadOptions.group = options.group || loadOptions.group
        }
        const groupCount = gridCoreUtils.normalizeSortingInfo(options.group || storeLoadOptions.group || loadOptions.group).length;
        if (options.cachedDataPartBegin) {
            options.data = options.cachedDataPartBegin.concat(options.data)
        }
        if (options.cachedDataPartEnd) {
            options.data = options.data.concat(options.cachedDataPartEnd)
        }
        if (!needPageCache || !getPageDataFromCache(options)) {
            var _options$extra;
            if (needPagingCache && options.cachedPagingData) {
                options.data = cloneItems(options.cachedPagingData, groupCount)
            } else {
                if (needStoreCache) {
                    if (!this._cachedStoreData) {
                        this._cachedStoreData = cloneItems(options.data, gridCoreUtils.normalizeSortingInfo(storeLoadOptions.group).length)
                    } else if (options.mergeStoreLoadData) {
                        options.data = this._cachedStoreData = this._cachedStoreData.concat(options.data)
                    }
                }
                new ArrayStore(options.data).load(loadOptions).done((data => {
                    options.data = data;
                    if (needStoreCache) {
                        this._cachedPagingData = cloneItems(options.data, groupCount)
                    }
                })).fail((error => {
                    options.data = (new Deferred).reject(error)
                }))
            }
            if (loadOptions.requireTotalCount && localPaging) {
                options.extra = isPlainObject(options.extra) ? options.extra : {};
                options.extra.totalCount = options.data.length
            }
            if (options.extra && options.extra.totalCount >= 0 && (false === storeLoadOptions.requireTotalCount || false === loadOptions.requireTotalCount)) {
                options.extra.totalCount = -1
            }
            if (!loadOptions.data && (storeLoadOptions.requireTotalCount || ((null === (_options$extra = options.extra) || void 0 === _options$extra ? void 0 : _options$extra.totalCount) ?? -1) >= 0)) {
                this._totalCountCorrection = 0
            }
            this._handleDataLoadedCore(options);
            if (needPageCache) {
                cachedData.extra = cachedData.extra || extend({}, options.extra);
                when(options.data).done((data => {
                    setPageDataToCache(options, data, groupCount)
                }))
            }
        }
        when(options.data).done((() => {
            if (options.lastLoadOptions) {
                this._lastLoadOptions = options.lastLoadOptions;
                Object.keys(options.operationTypes).forEach((operationType => {
                    this._lastOperationTypes[operationType] = this._lastOperationTypes[operationType] || options.operationTypes[operationType]
                }))
            }
        }));
        options.storeLoadOptions = options.originalStoreLoadOptions
    }
    _handleDataLoadedCore(options) {
        if (options.remoteOperations && !options.remoteOperations.paging && Array.isArray(options.data)) {
            if (void 0 !== options.skip) {
                options.data = options.data.slice(options.skip)
            }
            if (void 0 !== options.take) {
                options.data = options.data.slice(0, options.take)
            }
        }
    }
    _handleLoadingChanged(isLoading) {
        this.loadingChanged.fire(isLoading)
    }
    _handleLoadError(error) {
        this.loadError.fire(error);
        this.changed.fire({
            changeType: "loadError",
            error: error
        })
    }
    _loadPageSize() {
        return this.pageSize()
    }
    _handleDataChanged(args) {
        let currentTotalCount;
        const dataSource = this._dataSource;
        let isLoading = false;
        const isDataLoading = !args || isDefined(args.changeType);
        const itemsCount = this.itemsCount();
        if (isDataLoading) {
            this._isLastPage = !itemsCount || !this._loadPageSize() || itemsCount < this._loadPageSize();
            if (this._isLastPage) {
                this._hasLastPage = true
            }
        }
        if (dataSource.totalCount() >= 0) {
            if (dataSource.pageIndex() >= this.pageCount()) {
                dataSource.pageIndex(this.pageCount() - 1);
                this.pageIndex(dataSource.pageIndex());
                this.resetPagesCache();
                dataSource.load();
                isLoading = true
            }
        } else if (isDataLoading) {
            currentTotalCount = dataSource.pageIndex() * this.pageSize() + itemsCount;
            if (currentTotalCount > this._currentTotalCount) {
                this._currentTotalCount = currentTotalCount;
                if (0 === dataSource.pageIndex() || !this.option("scrolling.legacyMode")) {
                    this._totalCountCorrection = 0
                }
            }
            if (0 === itemsCount && dataSource.pageIndex() >= this.pageCount()) {
                dataSource.pageIndex(this.pageCount() - 1);
                if ("infinite" !== this.option("scrolling.mode")) {
                    dataSource.load();
                    isLoading = true
                }
            }
        }
        if (!isLoading) {
            this._operationTypes = this._lastOperationTypes;
            this._lastOperationTypes = {};
            this.component._optionCache = {};
            this.changed.fire(args);
            this.component._optionCache = void 0
        }
    }
    _scheduleCustomLoadCallbacks(deferred) {
        const that = this;
        that._isCustomLoading = true;
        deferred.always((() => {
            that._isCustomLoading = false
        }))
    }
    loadingOperationTypes() {
        return this._loadingOperationTypes
    }
    operationTypes() {
        return this._operationTypes
    }
    lastLoadOptions() {
        return this._lastLoadOptions || {}
    }
    isLastPage() {
        return this._isLastPage
    }
    _dataSourceTotalCount() {
        return this._dataSource.totalCount()
    }
    _changeRowExpandCore(path) {}
    changeRowExpand(path) {}
    totalCount() {
        return parseInt((this._currentTotalCount || this._dataSourceTotalCount()) + this._totalCountCorrection)
    }
    totalCountCorrection() {
        return this._totalCountCorrection
    }
    items() {}
    itemsCount() {
        return this._dataSource.items().length
    }
    totalItemsCount() {
        return this.totalCount()
    }
    pageSize() {
        const dataSource = this._dataSource;
        if (!arguments.length && !dataSource.paginate()) {
            return 0
        }
        return dataSource.pageSize.apply(dataSource, arguments)
    }
    pageCount() {
        const count = this.totalItemsCount() - this._totalCountCorrection;
        const pageSize = this.pageSize();
        if (pageSize && count > 0) {
            return Math.max(1, Math.ceil(count / pageSize))
        }
        return 1
    }
    hasKnownLastPage() {
        return this._hasLastPage || this._dataSource.totalCount() >= 0
    }
    loadFromStore(loadOptions, store) {
        const dataSource = this._dataSource;
        const d = new Deferred;
        if (!dataSource) {
            return
        }
        store = store || dataSource.store();
        store.load(loadOptions).done(((data, extra) => {
            if (data && !Array.isArray(data) && Array.isArray(data.data)) {
                extra = data;
                data = data.data
            }
            d.resolve(data, extra)
        })).fail(d.reject);
        return d
    }
    isCustomLoading() {
        return !!this._isCustomLoading
    }
    load(options) {
        const that = this;
        const dataSource = that._dataSource;
        const d = new Deferred;
        if (options) {
            const store = dataSource.store();
            const dataSourceLoadOptions = dataSource.loadOptions();
            const loadResult = {
                storeLoadOptions: extend({}, options, {
                    langParams: null === dataSourceLoadOptions || void 0 === dataSourceLoadOptions ? void 0 : dataSourceLoadOptions.langParams
                }),
                isCustomLoading: true
            };
            each(store._customLoadOptions() || [], ((_, optionName) => {
                if (!(optionName in loadResult.storeLoadOptions)) {
                    loadResult.storeLoadOptions[optionName] = dataSourceLoadOptions[optionName]
                }
            }));
            this._isLoadingAll = options.isLoadingAll;
            that._scheduleCustomLoadCallbacks(d);
            dataSource._scheduleLoadCallbacks(d);
            that._handleCustomizeStoreLoadOptions(loadResult);
            executeTask((() => {
                if (!dataSource.store()) {
                    return d.reject("canceled")
                }
                when(loadResult.data || that.loadFromStore(loadResult.storeLoadOptions)).done(((data, extra) => {
                    loadResult.data = data;
                    loadResult.extra = extra || {};
                    that._handleDataLoaded(loadResult);
                    if (options.requireTotalCount && void 0 === loadResult.extra.totalCount) {
                        loadResult.extra.totalCount = store.totalCount(loadResult.storeLoadOptions)
                    }
                    when(loadResult.data, loadResult.extra.totalCount).done(((data, totalCount) => {
                        loadResult.extra.totalCount = totalCount;
                        d.resolve(data, loadResult.extra)
                    })).fail(d.reject)
                })).fail(d.reject)
            }), that.option("loadingTimeout"));
            return d.fail((function() {
                that._eventsStrategy.fireEvent("loadError", arguments)
            })).always((() => {
                this._isLoadingAll = false
            })).promise()
        }
        return dataSource.load()
    }
    reload(full) {
        return full ? this._dataSource.reload() : this._dataSource.load()
    }
    getCachedStoreData() {
        return this._cachedStoreData
    }
    isLoaded() {}
    pageIndex(pageIndex) {}
}
