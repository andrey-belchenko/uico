/**
 * DevExtreme (cjs/__internal/grids/grid_core/filter/m_filter_sync.js)
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
exports.filterSyncModule = exports.FilterSyncController = void 0;
var _deferred = require("../../../../core/utils/deferred");
var _type = require("../../../../core/utils/type");
var _filtering = _interopRequireDefault(require("../../../../ui/shared/filtering"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_utils = require("../../../filter_builder/m_utils");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils2 = _interopRequireDefault(require("../m_utils"));
var _m_filter_custom_operations = require("./m_filter_custom_operations");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const FILTER_ROW_OPERATIONS = ["=", "<>", "<", "<=", ">", ">=", "notcontains", "contains", "startswith", "endswith", "between"];
const FILTER_TYPES_INCLUDE = "include";
const FILTER_TYPES_EXCLUDE = "exclude";

function getColumnIdentifier(column) {
    return column.name || column.dataField
}

function checkForErrors(columns) {
    columns.forEach((column => {
        const identifier = getColumnIdentifier(column);
        if (!(0, _type.isDefined)(identifier) && column.allowFiltering) {
            throw new _ui.default.Error("E1049", column.caption)
        }
    }))
}
const getEmptyFilterValues = function() {
    return {
        filterType: "include",
        filterValues: void 0
    }
};
const canSyncHeaderFilterWithFilterRow = function(column) {
    const filterValues = column.filterValues || [];
    return !_filtering.default.getGroupInterval(column) && !(column.headerFilter && column.headerFilter.dataSource) || 1 === filterValues.length && null === filterValues[0]
};
const getHeaderFilterFromCondition = function(headerFilterCondition, column) {
    if (!headerFilterCondition) {
        return getEmptyFilterValues()
    }
    let filterType;
    const selectedFilterOperation = headerFilterCondition[1];
    const value = headerFilterCondition[2];
    const hasArrayValue = Array.isArray(value);
    if (!hasArrayValue) {
        if (!canSyncHeaderFilterWithFilterRow(column)) {
            return getEmptyFilterValues()
        }
    }
    switch (selectedFilterOperation) {
        case "anyof":
        case "=":
            filterType = "include";
            break;
        case "noneof":
        case "<>":
            filterType = "exclude";
            break;
        default:
            return getEmptyFilterValues()
    }
    return {
        filterType: filterType,
        filterValues: hasArrayValue ? value : [value]
    }
};
const getConditionFromFilterRow = function(column) {
    const value = column.filterValue;
    if ((0, _type.isDefined)(value)) {
        const operation = column.selectedFilterOperation || column.defaultFilterOperation || (0, _m_utils.getDefaultOperation)(column);
        const filter = [getColumnIdentifier(column), operation, column.filterValue];
        return filter
    }
    return null
};
const getConditionFromHeaderFilter = function(column) {
    let selectedOperation;
    let value;
    const {
        filterValues: filterValues
    } = column;
    if (!filterValues) {
        return null
    }
    if (1 === filterValues.length && canSyncHeaderFilterWithFilterRow(column) && !Array.isArray(filterValues[0])) {
        "exclude" === column.filterType ? selectedOperation = "<>" : selectedOperation = "=";
        value = filterValues[0]
    } else {
        "exclude" === column.filterType ? selectedOperation = "noneof" : selectedOperation = "anyof";
        value = filterValues
    }
    return [getColumnIdentifier(column), selectedOperation, value]
};
const updateHeaderFilterCondition = function(columnsController, column, headerFilterCondition) {
    const headerFilter = getHeaderFilterFromCondition(headerFilterCondition, column);
    columnsController.columnOption(getColumnIdentifier(column), headerFilter)
};
const updateFilterRowCondition = function(columnsController, column, condition) {
    let filterRowOptions;
    let selectedFilterOperation = null === condition || void 0 === condition ? void 0 : condition[1];
    const filterValue = null === condition || void 0 === condition ? void 0 : condition[2];
    const filterOperations = column.filterOperations || column.defaultFilterOperations;
    if ((!filterOperations || filterOperations.indexOf(selectedFilterOperation) >= 0 || selectedFilterOperation === column.defaultFilterOperation) && FILTER_ROW_OPERATIONS.includes(selectedFilterOperation) && null !== filterValue) {
        if (selectedFilterOperation === column.defaultFilterOperation && !(0, _type.isDefined)(column.selectedFilterOperation)) {
            selectedFilterOperation = column.selectedFilterOperation
        }
        filterRowOptions = {
            filterValue: filterValue,
            selectedFilterOperation: selectedFilterOperation
        }
    } else {
        filterRowOptions = {
            filterValue: void 0,
            selectedFilterOperation: void 0
        }
    }
    columnsController.columnOption(getColumnIdentifier(column), filterRowOptions)
};
class FilterSyncController extends _m_modules.default.Controller {
    init() {
        this._dataController = this.getController("data");
        this._columnsController = this.getController("columns");
        if (this._dataController.isFilterSyncActive()) {
            if (this._columnsController.isAllDataTypesDefined()) {
                this._initSync()
            } else {
                this._dataController.dataSourceChanged.add((() => this._initSync()))
            }
        }
    }
    publicMethods() {
        return ["getCustomFilterOperations"]
    }
    syncFilterValue() {
        const that = this;
        const columns = this._columnsController.getFilteringColumns();
        this._skipSyncColumnOptions = true;
        columns.forEach((column => {
            const filterConditions = (0, _m_utils.getMatchedConditions)(that.option("filterValue"), getColumnIdentifier(column));
            if (1 === filterConditions.length) {
                const filterCondition = filterConditions[0];
                updateHeaderFilterCondition(this._columnsController, column, filterCondition);
                updateFilterRowCondition(this._columnsController, column, filterCondition)
            } else {
                (0, _type.isDefined)(column.filterValues) && updateHeaderFilterCondition(this._columnsController, column, null);
                (0, _type.isDefined)(column.filterValue) && updateFilterRowCondition(this._columnsController, column, null)
            }
        }));
        this._skipSyncColumnOptions = false
    }
    _initSync() {
        const columns = this._columnsController.getColumns();
        const pageIndex = this._dataController.pageIndex();
        checkForErrors(columns);
        if (!this.option("filterValue")) {
            const filteringColumns = this._columnsController.getFilteringColumns();
            const filterValue = this.getFilterValueFromColumns(filteringColumns);
            this._silentOption("filterValue", filterValue)
        }
        this.syncFilterValue();
        this._dataController.pageIndex(pageIndex)
    }
    _getSyncFilterRow(filterValue, column) {
        const filter = getConditionFromFilterRow(column);
        if ((0, _type.isDefined)(filter)) {
            return (0, _m_utils.syncFilters)(filterValue, filter)
        }
        return (0, _m_utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(column))
    }
    _getSyncHeaderFilter(filterValue, column) {
        const filter = getConditionFromHeaderFilter(column);
        if (filter) {
            return (0, _m_utils.syncFilters)(filterValue, filter)
        }
        return (0, _m_utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(column))
    }
    getFilterValueFromColumns(columns) {
        if (!this._dataController.isFilterSyncActive()) {
            return null
        }
        const filterValue = ["and"];
        columns && columns.forEach((column => {
            const headerFilter = getConditionFromHeaderFilter(column);
            const filterRow = getConditionFromFilterRow(column);
            headerFilter && (0, _m_utils.addItem)(headerFilter, filterValue);
            filterRow && (0, _m_utils.addItem)(filterRow, filterValue)
        }));
        return (0, _m_utils.getNormalizedFilter)(filterValue)
    }
    syncFilterRow(column, filterValue) {
        this.option("filterValue", this._getSyncFilterRow(this.option("filterValue"), column))
    }
    syncHeaderFilter(column) {
        this.option("filterValue", this._getSyncHeaderFilter(this.option("filterValue"), column))
    }
    getCustomFilterOperations() {
        const filterBuilderCustomOperations = this.option("filterBuilder.customOperations") ?? [];
        return [(0, _m_filter_custom_operations.anyOf)(this.component), (0, _m_filter_custom_operations.noneOf)(this.component)].concat(filterBuilderCustomOperations)
    }
}
exports.FilterSyncController = FilterSyncController;
const data = Base => class extends Base {
    optionChanged(args) {
        switch (args.name) {
            case "filterValue":
                this._applyFilter();
                this.isFilterSyncActive() && this._filterSyncController.syncFilterValue();
                args.handled = true;
                break;
            case "filterSyncEnabled":
                args.handled = true;
                break;
            case "columns":
                if (this.isFilterSyncActive()) {
                    const column = this._columnsController.getColumnByPath(args.fullName);
                    if (column && !this._filterSyncController._skipSyncColumnOptions) {
                        const propertyName = this._parseColumnPropertyName(args.fullName);
                        this._filterSyncController._skipSyncColumnOptions = true;
                        if ("filterType" === propertyName) {
                            if ("exclude" === args.value || "exclude" === args.previousValue) {
                                this._filterSyncController.syncHeaderFilter(column)
                            }
                        } else if ("filterValues" === propertyName) {
                            this._filterSyncController.syncHeaderFilter(column)
                        } else if (["filterValue", "selectedFilterOperation"].includes(propertyName)) {
                            this._filterSyncController.syncFilterRow(column, column.filterValue)
                        }
                        this._filterSyncController._skipSyncColumnOptions = false
                    }
                }
                super.optionChanged(args);
                break;
            default:
                super.optionChanged(args)
        }
    }
    isFilterSyncActive() {
        const filterSyncEnabledValue = this.option("filterSyncEnabled");
        return "auto" === filterSyncEnabledValue ? this.option("filterPanel.visible") : filterSyncEnabledValue
    }
    skipCalculateColumnFilters() {
        return ((0, _type.isDefined)(this.option("filterValue")) || this._filterSyncController._skipSyncColumnOptions) && this.isFilterSyncActive()
    }
    _calculateAdditionalFilter() {
        if (false === this.option("filterPanel.filterEnabled")) {
            return super._calculateAdditionalFilter()
        }
        const filters = [super._calculateAdditionalFilter()];
        const columns = this._columnsController.getFilteringColumns();
        let filterValue = this.option("filterValue");
        if (this.isFilterSyncActive()) {
            const currentColumnForHeaderFilter = this._headerFilterController.getCurrentColumn();
            const currentColumnForFilterRow = this._applyFilterController.getCurrentColumnForFiltering();
            const currentColumn = currentColumnForHeaderFilter || currentColumnForFilterRow;
            const needRemoveCurrentColumnFilter = currentColumnForHeaderFilter || (0, _type.isDefined)(null === currentColumnForFilterRow || void 0 === currentColumnForFilterRow ? void 0 : currentColumnForFilterRow.filterValue);
            if (needRemoveCurrentColumnFilter && filterValue) {
                filterValue = (0, _m_utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(currentColumn))
            }
        }
        const customOperations = this._filterSyncController.getCustomFilterOperations();
        const calculatedFilterValue = (0, _m_utils.getFilterExpression)(filterValue, columns, customOperations, "filterBuilder");
        if (calculatedFilterValue) {
            filters.push(calculatedFilterValue)
        }
        return _m_utils2.default.combineFilters(filters)
    }
    _parseColumnPropertyName(fullName) {
        const matched = fullName.match(/.*\.(.*)/);
        if (matched) {
            return matched[1]
        }
        return null
    }
    clearFilter(filterName) {
        this.component.beginUpdate();
        if (arguments.length > 0) {
            if ("filterValue" === filterName) {
                this.option("filterValue", null)
            }
            super.clearFilter(filterName)
        } else {
            this.option("filterValue", null);
            super.clearFilter()
        }
        this.component.endUpdate()
    }
    _applyFilter() {
        if (this._filterSyncController._skipSyncColumnOptions) {
            return (new _deferred.Deferred).resolve()
        }
        return super._applyFilter.apply(this, arguments)
    }
};
const columnHeadersView = Base => class extends Base {
    optionChanged(args) {
        if ("filterValue" === args.name) {
            this._updateHeaderFilterIndicators()
        } else {
            super.optionChanged(args)
        }
    }
    _isHeaderFilterEmpty(column) {
        if (this._dataController.isFilterSyncActive()) {
            return !(0, _m_utils.filterHasField)(this.option("filterValue"), getColumnIdentifier(column))
        }
        return super._isHeaderFilterEmpty(column)
    }
    _needUpdateFilterIndicators() {
        return !this._dataController.isFilterSyncActive()
    }
};
const filterSyncModule = exports.filterSyncModule = {
    defaultOptions: () => ({
        filterValue: null,
        filterSyncEnabled: "auto"
    }),
    controllers: {
        filterSync: FilterSyncController
    },
    extenders: {
        controllers: {
            data: data
        },
        views: {
            columnHeadersView: columnHeadersView
        }
    }
};
