/**
 * DevExtreme (cjs/data/data_source/data_source.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.DataSource = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _utils = require("../utils");
var _array_utils = require("../array_utils");
var _custom_store = _interopRequireDefault(require("../custom_store"));
var _events_strategy = require("../../core/events_strategy");
var _errors = require("../errors");
var _queue = require("../../core/utils/queue");
var _deferred = require("../../core/utils/deferred");
var _operation_manager = _interopRequireDefault(require("./operation_manager"));
var _utils2 = require("./utils");

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
const DataSource = exports.DataSource = _class.default.inherit({
    ctor(options) {
        options = (0, _utils2.normalizeDataSourceOptions)(options);
        this._eventsStrategy = new _events_strategy.EventsStrategy(this, {
            syncStrategy: true
        });
        this._store = options.store;
        this._changedTime = 0;
        const needThrottling = 0 !== options.pushAggregationTimeout;
        if (needThrottling) {
            const throttlingTimeout = void 0 === options.pushAggregationTimeout ? () => 5 * this._changedTime : options.pushAggregationTimeout;
            let pushDeferred;
            let lastPushWaiters;
            const throttlingPushHandler = (0, _utils.throttleChanges)((changes => {
                pushDeferred.resolve();
                const storePushPending = (0, _deferred.when)(...lastPushWaiters);
                storePushPending.done((() => this._onPush(changes)));
                lastPushWaiters = void 0;
                pushDeferred = void 0
            }), throttlingTimeout);
            this._onPushHandler = args => {
                this._aggregationTimeoutId = throttlingPushHandler(args.changes);
                if (!pushDeferred) {
                    pushDeferred = new _deferred.Deferred
                }
                lastPushWaiters = args.waitFor;
                args.waitFor.push(pushDeferred.promise())
            };
            this._store.on("beforePushAggregation", this._onPushHandler)
        } else {
            this._onPushHandler = changes => this._onPush(changes);
            this._store.on("push", this._onPushHandler)
        }
        this._storeLoadOptions = this._extractLoadOptions(options);
        this._mapFunc = options.map;
        this._postProcessFunc = options.postProcess;
        this._pageIndex = void 0 !== options.pageIndex ? options.pageIndex : 0;
        this._pageSize = void 0 !== options.pageSize ? options.pageSize : 20;
        this._loadingCount = 0;
        this._loadQueue = this._createLoadQueue();
        this._searchValue = "searchValue" in options ? options.searchValue : null;
        this._searchOperation = options.searchOperation || "contains";
        this._searchExpr = options.searchExpr;
        this._paginate = options.paginate;
        this._reshapeOnPush = options.reshapeOnPush ?? false;
        (0, _iterator.each)(["onChanged", "onLoadError", "onLoadingChanged", "onCustomizeLoadResult", "onCustomizeStoreLoadOptions"], ((_, optionName) => {
            if (optionName in options) {
                this.on(optionName.substr(2, 1).toLowerCase() + optionName.substr(3), options[optionName])
            }
        }));
        this._operationManager = new _operation_manager.default;
        this._init()
    },
    _init() {
        this._items = [];
        this._userData = {};
        this._totalCount = -1;
        this._isLoaded = false;
        if (!(0, _type.isDefined)(this._paginate)) {
            this._paginate = !this.group()
        }
        this._isLastPage = !this._paginate
    },
    dispose() {
        var _this$_delayedLoadTas;
        this._store.off("beforePushAggregation", this._onPushHandler);
        this._store.off("push", this._onPushHandler);
        this._eventsStrategy.dispose();
        clearTimeout(this._aggregationTimeoutId);
        null === (_this$_delayedLoadTas = this._delayedLoadTask) || void 0 === _this$_delayedLoadTas || _this$_delayedLoadTas.abort();
        this._operationManager.cancelAll();
        delete this._store;
        delete this._items;
        delete this._delayedLoadTask;
        this._disposed = true
    },
    _extractLoadOptions(options) {
        const result = {};
        let names = ["sort", "filter", "langParams", "select", "group", "requireTotalCount"];
        const customNames = this._store._customLoadOptions();
        if (customNames) {
            names = names.concat(customNames)
        }(0, _iterator.each)(names, (function() {
            result[this] = options[this]
        }));
        return result
    },
    loadOptions() {
        return this._storeLoadOptions
    },
    items() {
        return this._items
    },
    pageIndex(newIndex) {
        if (!(0, _type.isNumeric)(newIndex)) {
            return this._pageIndex
        }
        this._pageIndex = newIndex;
        this._isLastPage = !this._paginate
    },
    paginate(value) {
        if (!(0, _type.isBoolean)(value)) {
            return this._paginate
        }
        if (this._paginate !== value) {
            this._paginate = value;
            this.pageIndex(0)
        }
    },
    pageSize(value) {
        if (!(0, _type.isNumeric)(value)) {
            return this._pageSize
        }
        this._pageSize = value
    },
    isLastPage() {
        return this._isLastPage
    },
    generateStoreLoadOptionAccessor(optionName) {
        return args => {
            const normalizedArgs = (0, _utils2.normalizeStoreLoadOptionAccessorArguments)(args);
            if (void 0 === normalizedArgs) {
                return this._storeLoadOptions[optionName]
            }
            this._storeLoadOptions[optionName] = normalizedArgs
        }
    },
    sort() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        return this.generateStoreLoadOptionAccessor("sort")(args)
    },
    filter() {
        const newFilter = (0, _utils2.normalizeStoreLoadOptionAccessorArguments)(arguments);
        if (void 0 === newFilter) {
            return this._storeLoadOptions.filter
        }
        this._storeLoadOptions.filter = newFilter;
        this.pageIndex(0)
    },
    group() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2]
        }
        return this.generateStoreLoadOptionAccessor("group")(args)
    },
    select() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3]
        }
        return this.generateStoreLoadOptionAccessor("select")(args)
    },
    requireTotalCount(value) {
        if (!(0, _type.isBoolean)(value)) {
            return this._storeLoadOptions.requireTotalCount
        }
        this._storeLoadOptions.requireTotalCount = value
    },
    searchValue(value) {
        if (arguments.length < 1) {
            return this._searchValue
        }
        this._searchValue = value;
        this.pageIndex(0)
    },
    searchOperation(op) {
        if (!(0, _type.isString)(op)) {
            return this._searchOperation
        }
        this._searchOperation = op;
        this.pageIndex(0)
    },
    searchExpr(expr) {
        const argc = arguments.length;
        if (0 === argc) {
            return this._searchExpr
        }
        if (argc > 1) {
            expr = [].slice.call(arguments)
        }
        this._searchExpr = expr;
        this.pageIndex(0)
    },
    store() {
        return this._store
    },
    key() {
        var _this$_store;
        return null === (_this$_store = this._store) || void 0 === _this$_store ? void 0 : _this$_store.key()
    },
    totalCount() {
        return this._totalCount
    },
    isLoaded() {
        return this._isLoaded
    },
    isLoading() {
        return this._loadingCount > 0
    },
    beginLoading() {
        this._changeLoadingCount(1)
    },
    endLoading() {
        this._changeLoadingCount(-1)
    },
    _createLoadQueue: () => (0, _queue.create)(),
    _changeLoadingCount(increment) {
        const oldLoading = this.isLoading();
        this._loadingCount += increment;
        const newLoading = this.isLoading();
        if (oldLoading ^ newLoading) {
            this._eventsStrategy.fireEvent("loadingChanged", [newLoading])
        }
    },
    _scheduleLoadCallbacks(deferred) {
        this.beginLoading();
        deferred.always((() => {
            this.endLoading()
        }))
    },
    _scheduleFailCallbacks(deferred) {
        var _this = this;
        deferred.fail((function() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4]
            }
            if (args[0] === _utils2.CANCELED_TOKEN) {
                return
            }
            _this._eventsStrategy.fireEvent("loadError", args)
        }))
    },
    _fireChanged(args) {
        const date = new Date;
        this._eventsStrategy.fireEvent("changed", args);
        this._changedTime = new Date - date
    },
    _scheduleChangedCallbacks(deferred) {
        deferred.done((() => this._fireChanged()))
    },
    loadSingle(propName, propValue) {
        const d = new _deferred.Deferred;
        const key = this.key();
        const store = this._store;
        const options = this._createStoreLoadOptions();
        this._scheduleFailCallbacks(d);
        if (arguments.length < 2) {
            propValue = propName;
            propName = key
        }
        delete options.skip;
        delete options.group;
        delete options.refresh;
        delete options.pageIndex;
        delete options.searchString;
        (() => {
            if (propName === key || store instanceof _custom_store.default && !store._byKeyViaLoad()) {
                return store.byKey(propValue, options)
            }
            options.take = 1;
            options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
            return store.load(options)
        })().fail(d.reject).done((data => {
            const isEmptyArray = Array.isArray(data) && !data.length;
            if (!(0, _type.isDefined)(data) || isEmptyArray) {
                d.reject(new _errors.errors.Error("E4009"))
            } else {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                d.resolve(this._applyMapFunction(data)[0])
            }
        }));
        return d.promise()
    },
    load() {
        const d = new _deferred.Deferred;
        const loadTask = () => {
            if (this._disposed) {
                return
            }
            if (!(0, _utils2.isPending)(d)) {
                return
            }
            return this._loadFromStore(loadOperation, d)
        };
        this._scheduleLoadCallbacks(d);
        this._scheduleFailCallbacks(d);
        this._scheduleChangedCallbacks(d);
        const loadOperation = this._createLoadOperation(d);
        this._eventsStrategy.fireEvent("customizeStoreLoadOptions", [loadOperation]);
        this._loadQueue.add((() => {
            if ("number" === typeof loadOperation.delay) {
                this._delayedLoadTask = (0, _common.executeAsync)(loadTask, loadOperation.delay)
            } else {
                loadTask()
            }
            return d.promise()
        }));
        return d.promise({
            operationId: loadOperation.operationId
        })
    },
    _onPush(changes) {
        if (this._reshapeOnPush) {
            this.load()
        } else {
            const changingArgs = {
                changes: changes
            };
            this._eventsStrategy.fireEvent("changing", [changingArgs]);
            const group = this.group();
            const items = this.items();
            let groupLevel = 0;
            let dataSourceChanges = this.paginate() || group ? changes.filter((item => "update" === item.type)) : changes;
            if (group) {
                groupLevel = Array.isArray(group) ? group.length : 1
            }
            if (this._mapFunc) {
                dataSourceChanges.forEach((item => {
                    if ("insert" === item.type) {
                        item.data = this._mapFunc(item.data)
                    }
                }))
            }
            if (changingArgs.postProcessChanges) {
                dataSourceChanges = changingArgs.postProcessChanges(dataSourceChanges)
            }(0, _array_utils.applyBatch)({
                keyInfo: this.store(),
                data: items,
                changes: dataSourceChanges,
                groupCount: groupLevel,
                useInsertIndex: true
            });
            this._fireChanged([{
                changes: changes
            }])
        }
    },
    _createLoadOperation(deferred) {
        const operationId = this._operationManager.add(deferred);
        const storeLoadOptions = this._createStoreLoadOptions();
        if (this._store && !(0, _type.isEmptyObject)(null === storeLoadOptions || void 0 === storeLoadOptions ? void 0 : storeLoadOptions.langParams)) {
            this._store._langParams = _extends({}, this._store._langParams, storeLoadOptions.langParams)
        }
        deferred.always((() => this._operationManager.remove(operationId)));
        return {
            operationId: operationId,
            storeLoadOptions: storeLoadOptions
        }
    },
    reload() {
        const store = this.store();
        store._clearCache();
        this._init();
        return this.load()
    },
    cancel(operationId) {
        return this._operationManager.cancel(operationId)
    },
    cancelAll() {
        return this._operationManager.cancelAll()
    },
    _addSearchOptions(storeLoadOptions) {
        if (this._disposed) {
            return
        }
        if (this.store()._useDefaultSearch) {
            this._addSearchFilter(storeLoadOptions)
        } else {
            storeLoadOptions.searchOperation = this._searchOperation;
            storeLoadOptions.searchValue = this._searchValue;
            storeLoadOptions.searchExpr = this._searchExpr
        }
    },
    _createStoreLoadOptions() {
        const result = (0, _extend.extend)({}, this._storeLoadOptions);
        this._addSearchOptions(result);
        if (this._paginate) {
            if (this._pageSize) {
                result.skip = this._pageIndex * this._pageSize;
                result.take = this._pageSize
            }
        }
        result.userData = this._userData;
        return result
    },
    _addSearchFilter(storeLoadOptions) {
        const value = this._searchValue;
        const op = this._searchOperation;
        let selector = this._searchExpr;
        const searchFilter = [];
        if (!value) {
            return
        }
        if (!selector) {
            selector = "this"
        }
        if (!Array.isArray(selector)) {
            selector = [selector]
        }(0, _iterator.each)(selector, (function(i, item) {
            if (searchFilter.length) {
                searchFilter.push("or")
            }
            searchFilter.push([item, op, value])
        }));
        if (storeLoadOptions.filter) {
            storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter]
        } else {
            storeLoadOptions.filter = searchFilter
        }
    },
    _loadFromStore(loadOptions, pendingDeferred) {
        const handleSuccess = (data, extra) => {
            if (this._disposed) {
                return
            }
            if (!(0, _utils2.isPending)(pendingDeferred)) {
                return
            }
            const loadResult = (0, _extend.extend)((0, _utils2.normalizeLoadResult)(data, extra), loadOptions);
            this._eventsStrategy.fireEvent("customizeLoadResult", [loadResult]);
            (0, _deferred.when)(loadResult.data).done((data => {
                loadResult.data = data;
                this._processStoreLoadResult(loadResult, pendingDeferred)
            })).fail(pendingDeferred.reject)
        };
        if (loadOptions.data) {
            return (new _deferred.Deferred).resolve(loadOptions.data).done(handleSuccess)
        }
        return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject)
    },
    _processStoreLoadResult(loadResult, pendingDeferred) {
        let data = loadResult.data;
        let extra = loadResult.extra;
        const storeLoadOptions = loadResult.storeLoadOptions;
        const resolvePendingDeferred = () => {
            this._isLoaded = true;
            this._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
            return pendingDeferred.resolve(data, extra)
        };
        const proceedLoadingTotalCount = () => {
            this.store().totalCount(storeLoadOptions).done((function(count) {
                extra.totalCount = count;
                resolvePendingDeferred()
            })).fail(pendingDeferred.reject)
        };
        if (this._disposed) {
            return
        }
        data = this._applyPostProcessFunction(this._applyMapFunction(data));
        if (!(0, _type.isObject)(extra)) {
            extra = {}
        }
        this._items = data;
        if (!data.length || !this._paginate || this._pageSize && data.length < this._pageSize) {
            this._isLastPage = true
        }
        if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
            proceedLoadingTotalCount()
        } else {
            resolvePendingDeferred()
        }
    },
    _applyMapFunction(data) {
        if (this._mapFunc) {
            return (0, _utils2.mapDataRespectingGrouping)(data, this._mapFunc, this.group())
        }
        return data
    },
    _applyPostProcessFunction(data) {
        if (this._postProcessFunc) {
            return this._postProcessFunc(data)
        }
        return data
    },
    on(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    }
});
