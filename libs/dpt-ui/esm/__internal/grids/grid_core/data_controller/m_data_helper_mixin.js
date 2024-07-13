/**
 * DevExtreme (esm/__internal/grids/grid_core/data_controller/m_data_helper_mixin.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../../core/utils/extend";
import {
    DataSource
} from "../../../../data/data_source/data_source";
import {
    normalizeDataSourceOptions
} from "../../../../data/data_source/utils";
import DataController from "../../../../ui/collection/data_controller";
const DATA_SOURCE_OPTIONS_METHOD = "_dataSourceOptions";
const DATA_SOURCE_CHANGED_METHOD = "_dataSourceChangedHandler";
const DATA_SOURCE_LOAD_ERROR_METHOD = "_dataSourceLoadErrorHandler";
const DATA_SOURCE_LOADING_CHANGED_METHOD = "_dataSourceLoadingChangedHandler";
const DATA_SOURCE_FROM_URL_LOAD_MODE_METHOD = "_dataSourceFromUrlLoadMode";
const SPECIFIC_DATA_SOURCE_OPTION = "_getSpecificDataSourceOption";
const NORMALIZE_DATA_SOURCE = "_normalizeDataSource";
export const DataHelperMixin = Base => class extends Base {
    postCtor() {
        this.on("disposing", (() => {
            this._disposeDataSource()
        }))
    }
    _refreshDataSource() {
        this._initDataSource();
        this._loadDataSource()
    }
    _initDataSource() {
        let dataSourceOptions = SPECIFIC_DATA_SOURCE_OPTION in this ? this[SPECIFIC_DATA_SOURCE_OPTION]() : this.option("dataSource");
        let widgetDataSourceOptions;
        let dataSourceType;
        this._disposeDataSource();
        if (dataSourceOptions) {
            if (dataSourceOptions instanceof DataSource) {
                this._isSharedDataSource = true;
                this._dataSource = dataSourceOptions
            } else {
                widgetDataSourceOptions = "_dataSourceOptions" in this ? this._dataSourceOptions() : {};
                dataSourceType = this._dataSourceType ? this._dataSourceType() : DataSource;
                dataSourceOptions = normalizeDataSourceOptions(dataSourceOptions, {
                    fromUrlLoadMode: "_dataSourceFromUrlLoadMode" in this && this._dataSourceFromUrlLoadMode()
                });
                this._dataSource = new dataSourceType(extend(true, {}, widgetDataSourceOptions, dataSourceOptions))
            }
            if (NORMALIZE_DATA_SOURCE in this) {
                this._dataSource = this[NORMALIZE_DATA_SOURCE](this._dataSource)
            }
            this._addDataSourceHandlers();
            this._initDataController()
        }
    }
    _initDataController() {
        var _this$option;
        const dataController = null === (_this$option = this.option) || void 0 === _this$option ? void 0 : _this$option.call(this, "_dataController");
        const dataSource = this._dataSource;
        if (dataController) {
            this._dataController = dataController
        } else {
            this._dataController = new DataController(dataSource)
        }
    }
    _addDataSourceHandlers() {
        if (DATA_SOURCE_CHANGED_METHOD in this) {
            this._addDataSourceChangeHandler()
        }
        if ("_dataSourceLoadErrorHandler" in this) {
            this._addDataSourceLoadErrorHandler()
        }
        if ("_dataSourceLoadingChangedHandler" in this) {
            this._addDataSourceLoadingChangedHandler()
        }
        this._addReadyWatcher()
    }
    _addReadyWatcher() {
        this.readyWatcher = function(isLoading) {
            this._ready && this._ready(!isLoading)
        }.bind(this);
        this._dataSource.on("loadingChanged", this.readyWatcher)
    }
    _addDataSourceChangeHandler() {
        const dataSource = this._dataSource;
        this._proxiedDataSourceChangedHandler = function(e) {
            this[DATA_SOURCE_CHANGED_METHOD](dataSource.items(), e)
        }.bind(this);
        dataSource.on("changed", this._proxiedDataSourceChangedHandler)
    }
    _addDataSourceLoadErrorHandler() {
        this._proxiedDataSourceLoadErrorHandler = this._dataSourceLoadErrorHandler.bind(this);
        this._dataSource.on("loadError", this._proxiedDataSourceLoadErrorHandler)
    }
    _addDataSourceLoadingChangedHandler() {
        this._proxiedDataSourceLoadingChangedHandler = this._dataSourceLoadingChangedHandler.bind(this);
        this._dataSource.on("loadingChanged", this._proxiedDataSourceLoadingChangedHandler)
    }
    _loadDataSource() {
        const dataSource = this._dataSource;
        if (dataSource) {
            if (dataSource.isLoaded()) {
                this._proxiedDataSourceChangedHandler && this._proxiedDataSourceChangedHandler()
            } else {
                dataSource.load()
            }
        }
    }
    _loadSingle(key, value) {
        key = "this" === key ? this._dataSource.key() || "this" : key;
        return this._dataSource.loadSingle(key, value)
    }
    _isLastPage() {
        return !this._dataSource || this._dataSource.isLastPage() || !this._dataSource._pageSize
    }
    _isDataSourceLoading() {
        return this._dataSource && this._dataSource.isLoading()
    }
    _disposeDataSource() {
        if (this._dataSource) {
            if (this._isSharedDataSource) {
                delete this._isSharedDataSource;
                this._proxiedDataSourceChangedHandler && this._dataSource.off("changed", this._proxiedDataSourceChangedHandler);
                this._proxiedDataSourceLoadErrorHandler && this._dataSource.off("loadError", this._proxiedDataSourceLoadErrorHandler);
                this._proxiedDataSourceLoadingChangedHandler && this._dataSource.off("loadingChanged", this._proxiedDataSourceLoadingChangedHandler);
                if (this._dataSource._eventsStrategy) {
                    this._dataSource._eventsStrategy.off("loadingChanged", this.readyWatcher)
                }
            } else {
                this._dataSource.dispose()
            }
            delete this._dataSource;
            delete this._proxiedDataSourceChangedHandler;
            delete this._proxiedDataSourceLoadErrorHandler;
            delete this._proxiedDataSourceLoadingChangedHandler
        }
    }
    getDataSource() {
        return this._dataSource || null
    }
};
