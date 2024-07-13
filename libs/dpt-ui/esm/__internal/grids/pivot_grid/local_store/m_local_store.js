/**
 * DevExtreme (esm/__internal/grids/pivot_grid/local_store/m_local_store.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Class from "../../../../core/class";
import {
    noop
} from "../../../../core/utils/common";
import {
    compileGetter,
    toComparable
} from "../../../../core/utils/data";
import dateSerialization from "../../../../core/utils/date_serialization";
import {
    Deferred,
    when
} from "../../../../core/utils/deferred";
import {
    each
} from "../../../../core/utils/iterator";
import {
    isDefined,
    isNumeric,
    isString
} from "../../../../core/utils/type";
import ArrayStore from "../../../../data/array_store";
import CustomStore from "../../../../data/custom_store";
import {
    DataSource
} from "../../../../data/data_source/data_source";
import dataQuery from "../../../../data/query";
import {
    aggregators
} from "../../../../data/utils";
import {
    discoverObjectFields,
    getFiltersByPath,
    setDefaultFieldValueFormatting,
    setFieldProperty,
    storeDrillDownMixin
} from "../m_widget_utils";
const PATH_DELIMETER = "/./";
const LocalStore = Class.inherit(function() {
    const DATE_INTERVAL_SELECTORS = {
        year: date => date && date.getFullYear(),
        quarter: date => date && Math.floor(date.getMonth() / 3) + 1,
        month: date => date && date.getMonth() + 1,
        day: date => date && date.getDate(),
        dayOfWeek: date => date && date.getDay()
    };

    function getDataSelector(dataField) {
        return -1 !== dataField.indexOf(".") ? compileGetter(dataField) : function(data) {
            return data[dataField]
        }
    }

    function getDateValue(dataSelector) {
        return function(data) {
            let value = dataSelector(data);
            if (value && !(value instanceof Date)) {
                value = dateSerialization.deserializeDate(value)
            }
            return value
        }
    }

    function prepareFields(fields) {
        each(fields || [], ((_, field) => {
            let fieldSelector;
            let intervalSelector;
            const {
                dataField: dataField
            } = field;
            let groupInterval;
            const {
                levels: levels
            } = field;
            let dataSelector;
            if (!field.selector) {
                if (!dataField) {
                    dataSelector = function(data) {
                        return data
                    }
                } else {
                    dataSelector = getDataSelector(dataField)
                }
                if (levels) {
                    prepareFields(levels)
                }
                if ("date" === field.dataType) {
                    intervalSelector = DATE_INTERVAL_SELECTORS[field.groupInterval];
                    const valueSelector = getDateValue(dataSelector);
                    fieldSelector = function(data) {
                        const value = valueSelector(data);
                        return intervalSelector ? intervalSelector(value) : value
                    }
                } else if ("number" === field.dataType) {
                    groupInterval = isNumeric(field.groupInterval) && field.groupInterval > 0 && field.groupInterval;
                    fieldSelector = function(data) {
                        let value = dataSelector(data);
                        if (isString(value)) {
                            value = Number(value)
                        }
                        return groupInterval ? Math.floor(value / groupInterval) * groupInterval : value
                    }
                } else {
                    fieldSelector = dataSelector
                }
                setDefaultFieldValueFormatting(field);
                setFieldProperty(field, "selector", fieldSelector)
            }
        }))
    }
    const addHierarchyItem = function(value, hierarchyItems, pathHash, childrenHash) {
        let hierarchyItem = childrenHash[pathHash];
        if (!hierarchyItem) {
            hierarchyItem = {
                value: value,
                index: childrenHash.length++
            };
            childrenHash[pathHash] = hierarchyItem;
            hierarchyItems.push(hierarchyItem)
        }
        return hierarchyItem
    };

    function fillHierarchyItemIndexesCore(indexes, options, children, expandIndex, pathHash) {
        const dimension = options.dimensions[expandIndex];
        const {
            expandedPathsHash: expandedPathsHash
        } = options;
        let dimensionValue;
        let hierarchyItem;
        if (dimension) {
            dimensionValue = dimension.selector(options.data);
            pathHash = void 0 !== pathHash ? pathHash + "/./" + dimensionValue : `${dimensionValue}`;
            hierarchyItem = addHierarchyItem(dimensionValue, children, pathHash, options.childrenHash);
            indexes.push(hierarchyItem.index);
            if (expandedPathsHash && expandedPathsHash[pathHash] || dimension.expanded) {
                if (!hierarchyItem.children) {
                    hierarchyItem.children = []
                }
                fillHierarchyItemIndexesCore(indexes, options, hierarchyItem.children, expandIndex + 1, pathHash)
            }
        }
    }

    function generateHierarchyItems(data, loadOptions, headers, headerName) {
        const result = [0];
        const expandIndex = loadOptions.headerName === headerName ? loadOptions.path.length : 0;
        const expandedPaths = "rows" === headerName ? loadOptions.rowExpandedPaths : loadOptions.columnExpandedPaths;
        const options = {
            data: data,
            childrenHash: headers[`${headerName}Hash`],
            dimensions: loadOptions[headerName],
            expandedPathsHash: loadOptions.headerName !== headerName && expandedPaths && expandedPaths.hash
        };
        fillHierarchyItemIndexesCore(result, options, headers[headerName], expandIndex);
        return result
    }

    function generateAggregationCells(data, cells, headers, options) {
        const cellSet = [];
        let x;
        let y;
        let rowIndex;
        let columnIndex;
        const rowIndexes = generateHierarchyItems(data, options, headers, "rows");
        const columnIndexes = generateHierarchyItems(data, options, headers, "columns");
        for (y = 0; y < rowIndexes.length; y += 1) {
            rowIndex = rowIndexes[y];
            cells[rowIndex] = cells[rowIndex] || [];
            for (x = 0; x < columnIndexes.length; x += 1) {
                columnIndex = columnIndexes[x];
                cellSet.push(cells[rowIndex][columnIndex] = cells[rowIndex][columnIndex] || [])
            }
        }
        return cellSet
    }

    function fillHashExpandedPath(expandedPaths) {
        if (expandedPaths) {
            const hash = expandedPaths.hash = {};
            expandedPaths.forEach((path => {
                const pathValue = path.map((value => `${value}`)).join("/./");
                hash[pathValue] = true
            }))
        }
    }

    function prepareLoadOption(options) {
        options.rows = options.rows || [];
        options.columns = options.columns || [];
        options.filters = options.filters || [];
        fillHashExpandedPath(options.columnExpandedPaths);
        fillHashExpandedPath(options.rowExpandedPaths);
        prepareFields(options.columns);
        prepareFields(options.rows);
        prepareFields(options.values);
        prepareFields(options.filters)
    }

    function getAggregator(field) {
        if ("custom" === field.summaryType) {
            field.calculateCustomSummary = field.calculateCustomSummary || noop;
            return {
                seed() {
                    const options = {
                        summaryProcess: "start",
                        totalValue: void 0
                    };
                    field.calculateCustomSummary(options);
                    return options
                },
                step(options, value) {
                    options.summaryProcess = "calculate";
                    options.value = value;
                    field.calculateCustomSummary(options);
                    return options
                },
                finalize(options) {
                    options.summaryProcess = "finalize";
                    delete options.value;
                    field.calculateCustomSummary(options);
                    return options.totalValue
                }
            }
        }
        return aggregators[field.summaryType] || aggregators.count
    }

    function aggregationStep(measures, aggregationCells, data) {
        for (let aggregatorIndex = 0; aggregatorIndex < measures.length; aggregatorIndex += 1) {
            const cellField = measures[aggregatorIndex];
            const cellValue = cellField.selector(data);
            const aggregator = getAggregator(cellField);
            const isAggregatorSeedFunction = "function" === typeof aggregator.seed;
            for (let cellSetIndex = 0; cellSetIndex < aggregationCells.length; cellSetIndex += 1) {
                const cell = aggregationCells[cellSetIndex];
                if (cell.length <= aggregatorIndex) {
                    cell[aggregatorIndex] = isAggregatorSeedFunction ? aggregator.seed() : aggregator.seed
                }
                if (void 0 === cell[aggregatorIndex]) {
                    cell[aggregatorIndex] = cellValue
                } else if (isDefined(cellValue)) {
                    cell[aggregatorIndex] = aggregator.step(cell[aggregatorIndex], cellValue)
                }
            }
        }
    }

    function areValuesEqual(filterValue, fieldValue) {
        let valueOfFilter = filterValue && filterValue.valueOf();
        let valueOfField = fieldValue && fieldValue.valueOf();
        if (Array.isArray(filterValue)) {
            fieldValue = fieldValue || [];
            for (let i = 0; i < filterValue.length; i += 1) {
                valueOfFilter = filterValue[i] && filterValue[i].valueOf();
                valueOfField = fieldValue[i] && fieldValue[i].valueOf();
                if (valueOfFilter !== valueOfField) {
                    return false
                }
            }
            return true
        }
        return valueOfFilter === valueOfField
    }

    function createDimensionFilters(dimension) {
        const filters = [];
        each(dimension, ((_, field) => {
            const filterValues = field.filterValues || [];
            const {
                groupName: groupName
            } = field;
            if (groupName && isNumeric(field.groupIndex)) {
                return
            }
            filterValues.length && filters.push((function(dataItem) {
                const value = field.levels ? function(levels, data) {
                    const value = [];
                    each(levels, ((_, field) => {
                        value.push(field.selector(data))
                    }));
                    return value
                }(field.levels, dataItem) : field.selector(dataItem);
                let result = false;
                for (let i = 0; i < filterValues.length; i += 1) {
                    if (areValuesEqual(filterValues[i], value)) {
                        result = true;
                        break
                    }
                }
                return "exclude" === field.filterType ? !result : result
            }))
        }));
        return filters
    }

    function createFilter(options) {
        const filters = createDimensionFilters(options.rows).concat(createDimensionFilters(options.columns)).concat(createDimensionFilters(options.filters));
        const expandedDimensions = options[options.headerName];
        const {
            path: path
        } = options;
        if (expandedDimensions) {
            filters.push((dataItem => {
                let expandValue;
                for (let i = 0; i < path.length; i += 1) {
                    expandValue = expandedDimensions[i].selector(dataItem);
                    if (toComparable(expandValue, true) !== toComparable(path[i], true)) {
                        return false
                    }
                }
                return true
            }))
        }
        return function(dataItem) {
            for (let i = 0; i < filters.length; i += 1) {
                if (!filters[i](dataItem)) {
                    return false
                }
            }
            return true
        }
    }

    function loadCore(items, options, notifyProgress) {
        const headers = {
            columns: [],
            rows: [],
            columnsHash: {
                length: 1
            },
            rowsHash: {
                length: 1
            }
        };
        const values = [];
        let aggregationCells;
        let data;
        const d = new Deferred;
        let i = 0;
        const filter = createFilter(options);
        ! function processData() {
            const t = new Date;
            const startIndex = i;
            for (; i < items.length; i += 1) {
                if (i > startIndex && i % 1e4 === 0) {
                    if (new Date - t >= 300) {
                        notifyProgress(i / items.length);
                        setTimeout(processData, 0);
                        return
                    }
                }
                data = items[i];
                if (filter(data)) {
                    aggregationCells = generateAggregationCells(data, values, headers, options);
                    aggregationStep(options.values, aggregationCells, data)
                }
            }
            measures = options.values, cells = values, void each(measures, ((aggregatorIndex, cellField) => {
                const aggregator = getAggregator(cellField);
                if (aggregator.finalize) {
                    each(cells, ((_, row) => {
                        each(row, ((_, cell) => {
                            if (cell && void 0 !== cell[aggregatorIndex]) {
                                cell[aggregatorIndex] = aggregator.finalize(cell[aggregatorIndex])
                            }
                        }))
                    }))
                }
            }));
            var measures, cells;
            notifyProgress(1);
            d.resolve({
                rows: headers.rows,
                columns: headers.columns,
                values: values,
                grandTotalRowIndex: 0,
                grandTotalColumnIndex: 0
            })
        }();
        return d
    }

    function filterDataSource(dataSource, fieldSelectors) {
        let filter = dataSource.filter();
        if (dataSource.store() instanceof CustomStore && filter) {
            filter = processFilter(filter, fieldSelectors);
            return dataQuery(dataSource.items()).filter(filter).toArray()
        }
        return dataSource.items()
    }

    function loadDataSource(dataSource, fieldSelectors, reload) {
        const d = new Deferred;
        const customizeStoreLoadOptionsHandler = function(options) {
            if (dataSource.store() instanceof ArrayStore) {
                options.storeLoadOptions.filter = processFilter(options.storeLoadOptions.filter, fieldSelectors)
            }
        };
        dataSource.on("customizeStoreLoadOptions", customizeStoreLoadOptionsHandler);
        if (!dataSource.isLoaded() || reload) {
            const loadDeferred = reload ? dataSource.load() : dataSource.reload();
            when(loadDeferred).done((() => {
                loadDataSource(dataSource, fieldSelectors).done((() => {
                    d.resolve(filterDataSource(dataSource, fieldSelectors))
                })).fail(d.reject)
            })).fail(d.reject)
        } else {
            d.resolve(filterDataSource(dataSource, fieldSelectors))
        }
        return d.always((() => {
            dataSource.off("customizeStoreLoadOptions", customizeStoreLoadOptionsHandler)
        }))
    }

    function fillSelectorsByFields(selectors, fields) {
        fields.forEach((field => {
            if (field.dataField && "date" === field.dataType) {
                const valueSelector = getDateValue(getDataSelector(field.dataField));
                selectors[field.dataField] = function(data) {
                    return valueSelector(data)
                }
            }
        }))
    }

    function getFieldSelectors(options) {
        const selectors = {};
        if (Array.isArray(options)) {
            fillSelectorsByFields(selectors, options)
        } else if (options) {
            ["rows", "columns", "filters"].forEach((area => {
                options[area] && fillSelectorsByFields(selectors, options[area])
            }))
        }
        return selectors
    }

    function processFilter(filter, fieldSelectors) {
        if (!Array.isArray(filter)) {
            return filter
        }
        filter = filter.slice(0);
        if (isString(filter[0]) && (filter[1] instanceof Date || filter[2] instanceof Date)) {
            filter[0] = fieldSelectors[filter[0]]
        }
        for (let i = 0; i < filter.length; i += 1) {
            filter[i] = processFilter(filter[i], fieldSelectors)
        }
        return filter
    }
    return {
        ctor(options) {
            this._progressChanged = options.onProgressChanged || noop;
            this._dataSource = new DataSource(options);
            this._dataSource.paginate(false)
        },
        getFields(fields) {
            const dataSource = this._dataSource;
            const d = new Deferred;
            loadDataSource(dataSource, getFieldSelectors(fields)).done((data => {
                d.resolve(discoverObjectFields(data, fields))
            })).fail(d.reject);
            return d
        },
        key() {
            return this._dataSource.key()
        },
        load(options) {
            const that = this;
            const dataSource = that._dataSource;
            const d = new Deferred;
            prepareLoadOption(options);
            loadDataSource(dataSource, getFieldSelectors(options), options.reload).done((data => {
                when(loadCore(data, options, that._progressChanged)).done(d.resolve)
            })).fail(d.reject);
            return d
        },
        filter() {
            const dataSource = this._dataSource;
            return dataSource.filter.apply(dataSource, arguments)
        },
        supportPaging: () => false,
        getDrillDownItems(loadOptions, params) {
            loadOptions = loadOptions || {};
            params = params || {};
            prepareLoadOption(loadOptions);
            const drillDownItems = [];
            const items = this._dataSource.items();
            let item;
            const {
                maxRowCount: maxRowCount
            } = params;
            const {
                customColumns: customColumns
            } = params;
            const filter = createFilter(loadOptions);
            const pathFilter = createFilter({
                rows: getFiltersByPath(loadOptions.rows, params.rowPath),
                columns: getFiltersByPath(loadOptions.columns, params.columnPath),
                filters: []
            });
            for (let i = 0; i < items.length; i += 1) {
                if (pathFilter(items[i]) && filter(items[i])) {
                    if (customColumns) {
                        item = {};
                        for (let j = 0; j < customColumns.length; j += 1) {
                            item[customColumns[j]] = items[i][customColumns[j]]
                        }
                    } else {
                        item = items[i]
                    }
                    drillDownItems.push(item)
                }
                if (maxRowCount > 0 && drillDownItems.length === maxRowCount) {
                    break
                }
            }
            return drillDownItems
        }
    }
}()).include(storeDrillDownMixin);
export default {
    LocalStore: LocalStore
};
export {
    LocalStore
};
