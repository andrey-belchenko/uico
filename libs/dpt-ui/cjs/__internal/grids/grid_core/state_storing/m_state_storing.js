/**
 * DevExtreme (cjs/__internal/grids/grid_core/state_storing/m_state_storing.js)
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
exports.stateStoringModule = void 0;
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _m_state_storing_core = require("./m_state_storing_core");
const getDataState = that => {
    const pagerView = that.getView("pagerView");
    const dataController = that.getController("data");
    const state = {
        allowedPageSizes: pagerView ? pagerView.getPageSizes() : void 0,
        filterPanel: {
            filterEnabled: that.option("filterPanel.filterEnabled")
        },
        filterValue: that.option("filterValue"),
        focusedRowKey: that.option("focusedRowEnabled") ? that.option("focusedRowKey") : void 0
    };
    return (0, _extend.extend)(state, dataController.getUserState())
};
const processLoadState = that => {
    const columnsController = that.getController("columns");
    const selectionController = that.getController("selection");
    const exportController = that.getController("export");
    const dataController = that.getController("data");
    if (columnsController) {
        columnsController.columnsChanged.add((() => {
            that.updateState({
                columns: columnsController.getUserState()
            })
        }))
    }
    if (selectionController) {
        selectionController.selectionChanged.add((e => {
            that.updateState({
                selectedRowKeys: e.selectedRowKeys,
                selectionFilter: e.selectionFilter
            })
        }))
    }
    if (dataController) {
        that._initialPageSize = that.option("paging.pageSize");
        that._initialFilterValue = that.option("filterValue");
        dataController.changed.add((() => {
            const state = getDataState(that);
            that.updateState(state)
        }))
    }
    if (exportController) {
        exportController.selectionOnlyChanged.add((() => {
            that.updateState({
                exportSelectionOnly: exportController.selectionOnly()
            })
        }))
    }
};
const DEFAULT_FILTER_VALUE = null;
const getFilterValue = (that, state) => {
    const filterSyncController = that.getController("filterSync");
    const columnsController = that.getController("columns");
    const hasFilterState = state.columns || void 0 !== state.filterValue;
    if (filterSyncController) {
        if (hasFilterState) {
            return state.filterValue || filterSyncController.getFilterValueFromColumns(state.columns)
        }
        return that._initialFilterValue || filterSyncController.getFilterValueFromColumns(columnsController.getColumns())
    }
    return null
};
const rowsView = Base => class extends Base {
    init() {
        super.init();
        this._dataController.stateLoaded.add((() => {
            if (this._dataController.isLoaded() && !this._dataController.getDataSource()) {
                this.setLoading(false);
                this.renderNoDataText();
                const columnHeadersView = this.component.getView("columnHeadersView");
                columnHeadersView && columnHeadersView.render();
                this.component._fireContentReadyAction()
            }
        }))
    }
};
const stateStoring = Base => class extends Base {
    init() {
        super.init.apply(this, arguments);
        processLoadState(this);
        return this
    }
    isLoading() {
        return super.isLoading() || this.getDataController().isStateLoading()
    }
    state(state) {
        const result = super.state.apply(this, arguments);
        if (void 0 !== state) {
            this.applyState((0, _extend.extend)(true, {}, state))
        }
        return result
    }
    updateState(state) {
        if (this.isEnabled()) {
            const oldState = this.state();
            const newState = (0, _extend.extend)({}, oldState, state);
            const oldStateHash = (0, _common.getKeyHash)(oldState);
            const newStateHash = (0, _common.getKeyHash)(newState);
            if (!(0, _common.equalByValue)(oldStateHash, newStateHash)) {
                state = (0, _extend.extend)(true, {}, state);
                (0, _extend.extend)(this._state, state);
                this.save()
            }
        } else {
            (0, _extend.extend)(this._state, state)
        }
    }
    applyState(state) {
        var _this$getView;
        const {
            allowedPageSizes: allowedPageSizes
        } = state;
        const {
            searchText: searchText
        } = state;
        const {
            selectedRowKeys: selectedRowKeys
        } = state;
        const {
            selectionFilter: selectionFilter
        } = state;
        const scrollingMode = this.option("scrolling.mode");
        const isVirtualScrollingMode = "virtual" === scrollingMode || "infinite" === scrollingMode;
        const showPageSizeSelector = true === this.option("pager.visible") && this.option("pager.showPageSizeSelector");
        const hasHeight = null === (_this$getView = this.getView("rowsView")) || void 0 === _this$getView ? void 0 : _this$getView.hasHeight();
        this.component.beginUpdate();
        if (this.getColumnsController()) {
            this.getColumnsController().setUserState(state.columns)
        }
        if (this.getExportController()) {
            this.getExportController().selectionOnly(state.exportSelectionOnly)
        }
        if (!this.option("selection.deferred")) {
            this.option("selectedRowKeys", selectedRowKeys || [])
        }
        this.option("selectionFilter", selectionFilter);
        if (allowedPageSizes && "auto" === this.option("pager.allowedPageSizes")) {
            this.option("pager").allowedPageSizes = allowedPageSizes
        }
        if (this.option("focusedRowEnabled")) {
            this.option("focusedRowIndex", -1);
            this.option("focusedRowKey", state.focusedRowKey || null)
        }
        this.component.endUpdate();
        this.option("searchPanel.text", searchText || "");
        this.option("filterValue", getFilterValue(this, state));
        this.option("filterPanel.filterEnabled", state.filterPanel ? state.filterPanel.filterEnabled : true);
        this.option("paging.pageIndex", (!isVirtualScrollingMode || hasHeight) && state.pageIndex || 0);
        this.option("paging.pageSize", (!isVirtualScrollingMode || showPageSizeSelector) && (0, _type.isDefined)(state.pageSize) ? state.pageSize : this._initialPageSize);
        this.getDataController() && this.getDataController().reset()
    }
};
const columns = Base => class extends Base {
    _shouldReturnVisibleColumns() {
        const result = super._shouldReturnVisibleColumns.apply(this, arguments);
        return result && (!this._stateStoringController.isEnabled() || this._stateStoringController.isLoaded())
    }
};
const data = Base => class extends Base {
    dispose() {
        clearTimeout(this._restoreStateTimeoutID);
        super.dispose()
    }
    callbackNames() {
        return super.callbackNames().concat(["stateLoaded"])
    }
    _refreshDataSource() {
        if (this._stateStoringController.isEnabled() && !this._stateStoringController.isLoaded()) {
            clearTimeout(this._restoreStateTimeoutID);
            const deferred = new _deferred.Deferred;
            this._restoreStateTimeoutID = setTimeout((() => {
                this._stateStoringController.load().always((() => {
                    this._restoreStateTimeoutID = null
                })).done((() => {
                    super._refreshDataSource();
                    this.stateLoaded.fire();
                    deferred.resolve()
                })).fail((error => {
                    this.stateLoaded.fire();
                    this._handleLoadError(error || "Unknown error");
                    deferred.reject()
                }))
            }));
            return deferred.promise()
        }
        if (!this.isStateLoading()) {
            super._refreshDataSource()
        }
    }
    isLoading() {
        return super.isLoading() || this._stateStoringController.isLoading()
    }
    isStateLoading() {
        return (0, _type.isDefined)(this._restoreStateTimeoutID)
    }
    isLoaded() {
        return super.isLoaded() && !this.isStateLoading()
    }
};
const selection = Base => class extends Base {
    _fireSelectionChanged(options) {
        const isDeferredSelection = this.option("selection.deferred");
        if (this._stateStoringController.isLoading() && isDeferredSelection) {
            return
        }
        super._fireSelectionChanged.apply(this, arguments)
    }
};
const stateStoringModule = exports.stateStoringModule = {
    defaultOptions: () => ({
        stateStoring: {
            enabled: false,
            storageKey: null,
            type: "localStorage",
            customLoad: null,
            customSave: null,
            savingTimeout: 2e3
        }
    }),
    controllers: {
        stateStoring: _m_state_storing_core.StateStoringController
    },
    extenders: {
        views: {
            rowsView: rowsView
        },
        controllers: {
            stateStoring: stateStoring,
            columns: columns,
            data: data,
            selection: selection
        }
    }
};
