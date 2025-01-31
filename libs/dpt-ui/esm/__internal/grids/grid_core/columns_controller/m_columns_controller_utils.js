/**
 * DevExtreme (esm/__internal/grids/grid_core/columns_controller/m_columns_controller_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    normalizeIndexes
} from "../../../../core/utils/array";
import {
    equalByValue
} from "../../../../core/utils/common";
import {
    compileGetter,
    compileSetter
} from "../../../../core/utils/data";
import dateSerialization from "../../../../core/utils/date_serialization";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each,
    map
} from "../../../../core/utils/iterator";
import {
    deepExtendArraySafe
} from "../../../../core/utils/object";
import {
    getDefaultAlignment
} from "../../../../core/utils/position";
import {
    isDefined,
    isFunction,
    isNumeric,
    isObject,
    isString,
    type
} from "../../../../core/utils/type";
import variableWrapper from "../../../../core/utils/variable_wrapper";
import numberLocalization from "../../../../localization/number";
import gridCoreUtils from "../m_utils";
import {
    COLUMN_CHOOSER_LOCATION,
    COLUMN_INDEX_OPTIONS,
    DEFAULT_COLUMN_OPTIONS,
    GROUP_COMMAND_COLUMN_NAME,
    GROUP_LOCATION,
    IGNORE_COLUMN_OPTION_NAMES,
    USER_STATE_FIELD_NAMES,
    USER_STATE_FIELD_NAMES_15_1
} from "./const";
export const setFilterOperationsAsDefaultValues = function(column) {
    column.filterOperations = column.defaultFilterOperations
};
let globalColumnId = 1;
export const createColumn = function(that, columnOptions, userStateColumnOptions, bandColumn) {
    let commonColumnOptions = {};
    if (columnOptions) {
        if (isString(columnOptions)) {
            columnOptions = {
                dataField: columnOptions
            }
        }
        that.setName(columnOptions);
        let result = {};
        if (columnOptions.command) {
            result = deepExtendArraySafe(commonColumnOptions, columnOptions)
        } else {
            commonColumnOptions = that.getCommonSettings(columnOptions);
            if (userStateColumnOptions && userStateColumnOptions.name && userStateColumnOptions.dataField) {
                columnOptions = extend({}, columnOptions, {
                    dataField: userStateColumnOptions.dataField
                })
            }
            const calculatedColumnOptions = that._createCalculatedColumnOptions(columnOptions, bandColumn);
            if (!columnOptions.type) {
                result = {
                    headerId: "dx-col-" + globalColumnId++
                }
            }
            result = deepExtendArraySafe(result, DEFAULT_COLUMN_OPTIONS);
            deepExtendArraySafe(result, commonColumnOptions);
            deepExtendArraySafe(result, calculatedColumnOptions);
            deepExtendArraySafe(result, columnOptions);
            deepExtendArraySafe(result, {
                selector: null
            })
        }
        if (columnOptions.filterOperations === columnOptions.defaultFilterOperations) {
            setFilterOperationsAsDefaultValues(result)
        }
        return result
    }
};
export const createColumnsFromOptions = function(that, columnsOptions, bandColumn, createdColumnCount) {
    let result = [];
    if (columnsOptions) {
        each(columnsOptions, ((index, columnOptions) => {
            const currentIndex = (createdColumnCount ?? 0) + result.length;
            const userStateColumnOptions = that._columnsUserState && checkUserStateColumn(columnOptions, that._columnsUserState[currentIndex]) && that._columnsUserState[currentIndex];
            const column = createColumn(that, columnOptions, userStateColumnOptions, bandColumn);
            if (column) {
                if (bandColumn) {
                    column.ownerBand = bandColumn
                }
                result.push(column);
                if (column.columns) {
                    result = result.concat(createColumnsFromOptions(that, column.columns, column, result.length));
                    delete column.columns;
                    column.hasColumns = true
                }
            }
        }))
    }
    return result
};
export const getParentBandColumns = function(columnIndex, columnParentByIndex) {
    const result = [];
    let parent = columnParentByIndex[columnIndex];
    while (parent) {
        result.unshift(parent);
        columnIndex = parent.index;
        parent = columnParentByIndex[columnIndex]
    }
    return result
};
export const getChildrenByBandColumn = function(columnIndex, columnChildrenByIndex, recursive) {
    let result = [];
    const children = columnChildrenByIndex[columnIndex];
    if (children) {
        for (let i = 0; i < children.length; i++) {
            const column = children[i];
            if (!isDefined(column.groupIndex) || column.showWhenGrouped) {
                result.push(column);
                if (recursive && column.isBand) {
                    result = result.concat(getChildrenByBandColumn(column.index, columnChildrenByIndex, recursive))
                }
            }
        }
    }
    return result
};
export const getColumnByIndexes = function(that, columnIndexes) {
    let result;
    let columns;
    const bandColumnsCache = that.getBandColumnsCache();
    const callbackFilter = function(column) {
        const ownerBand = result ? result.index : void 0;
        return column.ownerBand === ownerBand
    };
    if (bandColumnsCache.isPlain) {
        result = that._columns[columnIndexes[0]]
    } else {
        columns = that._columns.filter(callbackFilter);
        for (let i = 0; i < columnIndexes.length; i++) {
            result = columns[columnIndexes[i]];
            if (result) {
                columns = that._columns.filter(callbackFilter)
            }
        }
    }
    return result
};
export const getColumnFullPath = function(that, column) {
    let result = [];
    let columns;
    const bandColumnsCache = that.getBandColumnsCache();
    const callbackFilter = function(item) {
        return item.ownerBand === column.ownerBand
    };
    if (bandColumnsCache.isPlain) {
        const columnIndex = that._columns.indexOf(column);
        if (columnIndex >= 0) {
            result = [`columns[${columnIndex}]`]
        }
    } else {
        columns = that._columns.filter(callbackFilter);
        while (columns.length && -1 !== columns.indexOf(column)) {
            result.unshift(`columns[${columns.indexOf(column)}]`);
            column = bandColumnsCache.columnParentByIndex[column.index];
            columns = column ? that._columns.filter(callbackFilter) : []
        }
    }
    return result.join(".")
};
export const calculateColspan = function(that, columnID) {
    let colspan = 0;
    const columns = that.getChildrenByBandColumn(columnID, true);
    each(columns, ((_, column) => {
        if (column.isBand) {
            column.colspan = column.colspan || calculateColspan(that, column.index);
            colspan += column.colspan || 1
        } else {
            colspan += 1
        }
    }));
    return colspan
};
export const processBandColumns = function(that, columns, bandColumnsCache) {
    let rowspan;
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (column.visible || column.command) {
            if (column.isBand) {
                column.colspan = column.colspan || calculateColspan(that, column.index)
            }
            if (!column.isBand || !column.colspan) {
                rowspan = that.getRowCount();
                if (!column.command && (!isDefined(column.groupIndex) || column.showWhenGrouped)) {
                    rowspan -= getParentBandColumns(column.index, bandColumnsCache.columnParentByIndex).length
                }
                if (rowspan > 1) {
                    column.rowspan = rowspan
                }
            }
        }
    }
};
export const getValueDataType = function(value) {
    let dataType = type(value);
    if ("string" !== dataType && "boolean" !== dataType && "number" !== dataType && "date" !== dataType && "object" !== dataType) {
        dataType = void 0
    }
    return dataType
};
export const getSerializationFormat = function(dataType, value) {
    switch (dataType) {
        case "date":
        case "datetime":
            return dateSerialization.getDateSerializationFormat(value);
        case "number":
            if (isString(value)) {
                return "string"
            }
            if (isNumeric(value)) {
                return null
            }
    }
};
export const updateSerializers = function(options, dataType) {
    if (!options.deserializeValue) {
        if (gridCoreUtils.isDateType(dataType)) {
            options.deserializeValue = function(value) {
                return dateSerialization.deserializeDate(value)
            };
            options.serializeValue = function(value) {
                return isString(value) ? value : dateSerialization.serializeDate(value, this.serializationFormat)
            }
        }
        if ("number" === dataType) {
            options.deserializeValue = function(value) {
                const parsedValue = parseFloat(value);
                return isNaN(parsedValue) ? value : parsedValue
            };
            options.serializeValue = function(value, target) {
                if ("filter" === target) {
                    return value
                }
                return isDefined(value) && "string" === this.serializationFormat ? value.toString() : value
            }
        }
    }
};
export const getAlignmentByDataType = function(dataType, isRTL) {
    switch (dataType) {
        case "number":
            return "right";
        case "boolean":
            return "center";
        default:
            return getDefaultAlignment(isRTL)
    }
};
export const customizeTextForBooleanDataType = function(e) {
    if (true === e.value) {
        return this.trueText || "true"
    }
    if (false === e.value) {
        return this.falseText || "false"
    }
    return e.valueText || ""
};
export const getCustomizeTextByDataType = function(dataType) {
    if ("boolean" === dataType) {
        return customizeTextForBooleanDataType
    }
};
export const createColumnsFromDataSource = function(that, dataSource) {
    const firstItems = that._getFirstItems(dataSource);
    let fieldName;
    const processedFields = {};
    const result = [];
    for (let i = 0; i < firstItems.length; i++) {
        if (firstItems[i]) {
            for (fieldName in firstItems[i]) {
                if (!isFunction(firstItems[i][fieldName]) || variableWrapper.isWrapped(firstItems[i][fieldName])) {
                    processedFields[fieldName] = true
                }
            }
        }
    }
    for (fieldName in processedFields) {
        if (0 !== fieldName.indexOf("__")) {
            const column = createColumn(that, fieldName);
            result.push(column)
        }
    }
    return result
};
export const updateColumnIndexes = function(that) {
    each(that._columns, ((index, column) => {
        column.index = index
    }));
    each(that._columns, ((index, column) => {
        if (isObject(column.ownerBand)) {
            column.ownerBand = column.ownerBand.index
        }
    }));
    each(that._commandColumns, ((index, column) => {
        column.index = -(index + 1)
    }))
};
export const updateColumnGroupIndexes = function(that, currentColumn) {
    normalizeIndexes(that._columns, "groupIndex", currentColumn, (column => {
        const {
            grouped: grouped
        } = column;
        delete column.grouped;
        return grouped
    }))
};
export const updateColumnSortIndexes = function(that, currentColumn) {
    each(that._columns, ((index, column) => {
        if (isDefined(column.sortIndex) && !isSortOrderValid(column.sortOrder)) {
            delete column.sortIndex
        }
    }));
    normalizeIndexes(that._columns, "sortIndex", currentColumn, (column => !isDefined(column.groupIndex) && isSortOrderValid(column.sortOrder)))
};
export const updateColumnVisibleIndexes = function(that, currentColumn) {
    let column;
    const result = [];
    const bandColumnsCache = that.getBandColumnsCache();
    const bandedColumns = [];
    const columns = that._columns.filter((column => !column.command));
    for (let i = 0; i < columns.length; i++) {
        column = columns[i];
        const parentBandColumns = getParentBandColumns(i, bandColumnsCache.columnParentByIndex);
        if (parentBandColumns.length) {
            bandedColumns.push(column)
        } else {
            result.push(column)
        }
    }
    normalizeIndexes(bandedColumns, "visibleIndex", currentColumn);
    normalizeIndexes(result, "visibleIndex", currentColumn)
};
export const getColumnIndexByVisibleIndex = function(that, visibleIndex, location) {
    const rowIndex = isObject(visibleIndex) ? visibleIndex.rowIndex : null;
    const columns = location === GROUP_LOCATION ? that.getGroupColumns() : location === COLUMN_CHOOSER_LOCATION ? that.getChooserColumns() : that.getVisibleColumns(rowIndex);
    let column;
    visibleIndex = isObject(visibleIndex) ? visibleIndex.columnIndex : visibleIndex;
    column = columns[visibleIndex];
    if (column && column.type === GROUP_COMMAND_COLUMN_NAME) {
        column = that._columns.filter((col => column.type === col.type))[0] || column
    }
    return column && isDefined(column.index) ? column.index : -1
};
export const moveColumnToGroup = function(that, column, groupIndex) {
    const groupColumns = that.getGroupColumns();
    let i;
    if (groupIndex >= 0) {
        for (i = 0; i < groupColumns.length; i++) {
            if (groupColumns[i].groupIndex >= groupIndex) {
                groupColumns[i].groupIndex++
            }
        }
    } else {
        groupIndex = 0;
        for (i = 0; i < groupColumns.length; i++) {
            groupIndex = Math.max(groupIndex, groupColumns[i].groupIndex + 1)
        }
    }
    return groupIndex
};

function checkUserStateColumn(column, userStateColumn) {
    return column && userStateColumn && userStateColumn.name === (column.name || column.dataField) && (userStateColumn.dataField === column.dataField || column.name)
}
export const applyUserState = function(that) {
    const columnsUserState = that._columnsUserState;
    const ignoreColumnOptionNames = that._ignoreColumnOptionNames || [];
    const columns = that._columns;
    const columnCountById = {};
    let resultColumns = [];
    let allColumnsHaveState = true;
    const userStateColumnIndexes = [];
    let column;
    let userStateColumnIndex;
    let i;

    function applyFieldsState(column, userStateColumn) {
        if (!userStateColumn) {
            return
        }
        for (let index = 0; index < USER_STATE_FIELD_NAMES.length; index++) {
            const fieldName = USER_STATE_FIELD_NAMES[index];
            if (ignoreColumnOptionNames.includes(fieldName)) {
                continue
            }
            if ("dataType" === fieldName) {
                column[fieldName] = column[fieldName] || userStateColumn[fieldName]
            } else if (USER_STATE_FIELD_NAMES_15_1.includes(fieldName)) {
                if (fieldName in userStateColumn) {
                    column[fieldName] = userStateColumn[fieldName]
                }
            } else {
                if ("selectedFilterOperation" === fieldName && userStateColumn[fieldName]) {
                    column.defaultSelectedFilterOperation = column[fieldName] || null
                }
                column[fieldName] = userStateColumn[fieldName]
            }
        }
    }

    function findUserStateColumn(columnsUserState, column) {
        const id = column.name || column.dataField;
        let count = columnCountById[id] || 0;
        for (let j = 0; j < columnsUserState.length; j++) {
            if (checkUserStateColumn(column, columnsUserState[j])) {
                if (count) {
                    count--
                } else {
                    columnCountById[id] = columnCountById[id] || 0;
                    columnCountById[id]++;
                    return j
                }
            }
        }
        return -1
    }
    if (columnsUserState) {
        for (i = 0; i < columns.length; i++) {
            userStateColumnIndex = findUserStateColumn(columnsUserState, columns[i]);
            allColumnsHaveState = allColumnsHaveState && userStateColumnIndex >= 0;
            userStateColumnIndexes.push(userStateColumnIndex)
        }
        for (i = 0; i < columns.length; i++) {
            column = columns[i];
            userStateColumnIndex = userStateColumnIndexes[i];
            if (that._hasUserState || allColumnsHaveState) {
                applyFieldsState(column, columnsUserState[userStateColumnIndex])
            }
            if (userStateColumnIndex >= 0 && isDefined(columnsUserState[userStateColumnIndex].initialIndex)) {
                resultColumns[userStateColumnIndex] = column
            } else {
                resultColumns.push(column)
            }
        }
        let hasAddedBands = false;
        for (i = 0; i < columnsUserState.length; i++) {
            const columnUserState = columnsUserState[i];
            if (columnUserState.added && findUserStateColumn(columns, columnUserState) < 0) {
                column = createColumn(that, columnUserState.added);
                applyFieldsState(column, columnUserState);
                resultColumns.push(column);
                if (columnUserState.added.columns) {
                    hasAddedBands = true
                }
            }
        }
        if (hasAddedBands) {
            updateColumnIndexes(that);
            resultColumns = createColumnsFromOptions(that, resultColumns)
        }
        assignColumns(that, resultColumns)
    }
};
export const updateIndexes = function(that, column) {
    updateColumnIndexes(that);
    updateColumnGroupIndexes(that, column);
    updateColumnSortIndexes(that, column);
    resetBandColumnsCache(that);
    updateColumnVisibleIndexes(that, column)
};
export const resetColumnsCache = function(that) {
    that.resetColumnsCache()
};
export function assignColumns(that, columns) {
    that._previousColumns = that._columns;
    that._columns = columns;
    resetColumnsCache(that);
    that.updateColumnDataTypes()
}
export const updateColumnChanges = function(that, changeType, optionName, columnIndex) {
    const columnChanges = that._columnChanges || {
        optionNames: {
            length: 0
        },
        changeTypes: {
            length: 0
        },
        columnIndex: columnIndex
    };
    optionName = optionName || "all";
    optionName = optionName.split(".")[0];
    const {
        changeTypes: changeTypes
    } = columnChanges;
    if (changeType && !changeTypes[changeType]) {
        changeTypes[changeType] = true;
        changeTypes.length++
    }
    const {
        optionNames: optionNames
    } = columnChanges;
    if (optionName && !optionNames[optionName]) {
        optionNames[optionName] = true;
        optionNames.length++
    }
    if (void 0 === columnIndex || columnIndex !== columnChanges.columnIndex) {
        if (isDefined(columnIndex)) {
            columnChanges.columnIndices ?? (columnChanges.columnIndices = []);
            if (isDefined(columnChanges.columnIndex)) {
                columnChanges.columnIndices.push(columnChanges.columnIndex)
            }
            columnChanges.columnIndices.push(columnIndex)
        }
        delete columnChanges.columnIndex
    }
    that._columnChanges = columnChanges;
    resetColumnsCache(that)
};
export const fireColumnsChanged = function(that) {
    const onColumnsChanging = that.option("onColumnsChanging");
    const columnChanges = that._columnChanges;
    const reinitOptionNames = ["dataField", "lookup", "dataType", "columns"];
    if (that.isInitialized() && !that._updateLockCount && columnChanges) {
        if (onColumnsChanging) {
            that._updateLockCount++;
            onColumnsChanging(extend({
                component: that.component
            }, columnChanges));
            that._updateLockCount--
        }
        that._columnChanges = void 0;
        if (options = columnChanges.optionNames, options && reinitOptionNames.some((name => options[name]))) {
            that._reinitAfterLookupChanges = null === columnChanges || void 0 === columnChanges ? void 0 : columnChanges.optionNames.lookup;
            that.reinit();
            that._reinitAfterLookupChanges = void 0
        } else {
            that.columnsChanged.fire(columnChanges)
        }
    }
    var options
};
export const updateSortOrderWhenGrouping = function(that, column, groupIndex, prevGroupIndex) {
    const columnWasGrouped = prevGroupIndex >= 0;
    if (groupIndex >= 0) {
        if (!columnWasGrouped) {
            column.lastSortOrder = column.sortOrder
        }
    } else {
        const sortMode = that.option("sorting.mode");
        let sortOrder = column.lastSortOrder;
        if ("single" === sortMode) {
            const sortedByAnotherColumn = that._columns.some((col => col !== column && isDefined(col.sortIndex)));
            if (sortedByAnotherColumn) {
                sortOrder = void 0
            }
        }
        column.sortOrder = sortOrder
    }
};
export const fireOptionChanged = function(that, options) {
    const {
        value: value
    } = options;
    const {
        optionName: optionName
    } = options;
    const {
        prevValue: prevValue
    } = options;
    const {
        fullOptionName: fullOptionName
    } = options;
    const fullOptionPath = `${fullOptionName}.${optionName}`;
    if (!IGNORE_COLUMN_OPTION_NAMES[optionName] && that._skipProcessingColumnsChange !== fullOptionPath) {
        that._skipProcessingColumnsChange = fullOptionPath;
        that.component._notifyOptionChanged(fullOptionPath, value, prevValue);
        that._skipProcessingColumnsChange = false
    }
};
export const columnOptionCore = function(that, column, optionName, value, notFireEvent) {
    const optionGetter = compileGetter(optionName);
    const columnIndex = column.index;
    let columns;
    let changeType;
    let initialColumn;
    if (3 === arguments.length) {
        return optionGetter(column, {
            functionsAsIs: true
        })
    }
    const prevValue = optionGetter(column, {
        functionsAsIs: true
    });
    if (!equalByValue(prevValue, value, {
            maxDepth: 5
        })) {
        if ("groupIndex" === optionName || "calculateGroupValue" === optionName) {
            changeType = "grouping";
            updateSortOrderWhenGrouping(that, column, value, prevValue)
        } else if ("sortIndex" === optionName || "sortOrder" === optionName || "calculateSortValue" === optionName) {
            changeType = "sorting"
        } else {
            changeType = "columns"
        }
        const optionSetter = compileSetter(optionName);
        optionSetter(column, value, {
            functionsAsIs: true
        });
        const fullOptionName = getColumnFullPath(that, column);
        if (COLUMN_INDEX_OPTIONS[optionName]) {
            updateIndexes(that, column);
            value = optionGetter(column)
        }
        if ("name" === optionName || "allowEditing" === optionName) {
            that._checkColumns()
        }
        if (!isDefined(prevValue) && !isDefined(value) && 0 !== optionName.indexOf("buffer")) {
            notFireEvent = true
        }
        if (!notFireEvent) {
            if (!USER_STATE_FIELD_NAMES.includes(optionName) && "visibleWidth" !== optionName) {
                columns = that.option("columns");
                initialColumn = that.getColumnByPath(fullOptionName, columns);
                if (isString(initialColumn)) {
                    initialColumn = columns[columnIndex] = {
                        dataField: initialColumn
                    }
                }
                if (initialColumn && checkUserStateColumn(initialColumn, column)) {
                    optionSetter(initialColumn, value, {
                        functionsAsIs: true
                    })
                }
            }
            updateColumnChanges(that, changeType, optionName, columnIndex)
        } else {
            resetColumnsCache(that)
        }
        fullOptionName && fireOptionChanged(that, {
            fullOptionName: fullOptionName,
            optionName: optionName,
            value: value,
            prevValue: prevValue
        })
    }
};
export function isSortOrderValid(sortOrder) {
    return "asc" === sortOrder || "desc" === sortOrder
}
export const addExpandColumn = function(that) {
    const options = that._getExpandColumnOptions();
    that.addCommandColumn(options)
};
export const defaultSetCellValue = function(data, value) {
    if (!this.dataField) {
        return
    }
    const path = this.dataField.split(".");
    const dotCount = path.length - 1;
    if (this.serializeValue) {
        value = this.serializeValue(value)
    }
    for (let i = 0; i < dotCount; i++) {
        const name = path[i];
        data = data[name] = data[name] || {}
    }
    data[path[dotCount]] = value
};
export const getDataColumns = function(columns, rowIndex, bandColumnID) {
    const result = [];
    rowIndex = rowIndex || 0;
    columns[rowIndex] && each(columns[rowIndex], ((_, column) => {
        if (column.ownerBand === bandColumnID || column.type === GROUP_COMMAND_COLUMN_NAME) {
            if (!column.isBand || !column.colspan) {
                if (!column.command || rowIndex < 1) {
                    result.push(column)
                }
            } else {
                result.push.apply(result, getDataColumns(columns, rowIndex + 1, column.index))
            }
        }
    }));
    return result
};
export const getRowCount = function(that) {
    let rowCount = 1;
    const bandColumnsCache = that.getBandColumnsCache();
    const {
        columnParentByIndex: columnParentByIndex
    } = bandColumnsCache;
    that._columns.forEach((column => {
        const parents = getParentBandColumns(column.index, columnParentByIndex);
        const invisibleParents = parents.filter((column => !column.visible));
        if (column.visible && !invisibleParents.length) {
            rowCount = Math.max(rowCount, parents.length + 1)
        }
    }));
    return rowCount
};
export const isCustomCommandColumn = (that, commandColumn) => {
    const customCommandColumns = that._columns.filter((column => column.type === commandColumn.type));
    return !!customCommandColumns.length
};
export const getFixedPosition = function(that, column) {
    const rtlEnabled = that.option("rtlEnabled");
    if (column.command && !isCustomCommandColumn(that, column) || !column.fixedPosition) {
        return rtlEnabled ? "right" : "left"
    }
    return column.fixedPosition
};
export const processExpandColumns = function(columns, expandColumns, type, columnIndex) {
    let customColumnIndex;
    const rowCount = this.getRowCount();
    let rowspan = columns[columnIndex] && columns[columnIndex].rowspan;
    let expandColumnsByType = expandColumns.filter((column => column.type === type));
    columns.forEach(((column, index) => {
        if (column.type === type) {
            customColumnIndex = index;
            rowspan = columns[index + 1] ? columns[index + 1].rowspan : rowCount
        }
    }));
    if (rowspan > 1) {
        expandColumnsByType = map(expandColumnsByType, (expandColumn => extend({}, expandColumn, {
            rowspan: rowspan
        })))
    }
    expandColumnsByType.unshift.apply(expandColumnsByType, isDefined(customColumnIndex) ? [customColumnIndex, 1] : [columnIndex, 0]);
    columns.splice.apply(columns, expandColumnsByType);
    return rowspan || 1
};
export const digitsCount = function(number) {
    let i;
    for (i = 0; number > 1; i++) {
        number /= 10
    }
    return i
};
export const numberToString = function(number, digitsCount) {
    let str = number ? number.toString() : "0";
    while (str.length < digitsCount) {
        str = `0${str}`
    }
    return str
};
export const mergeColumns = (that, columns, commandColumns, needToExtend) => {
    let column;
    let commandColumnIndex;
    let result = columns.slice().map((column => extend({}, column)));
    const isColumnFixing = that._isColumnFixing();
    let defaultCommandColumns = commandColumns.slice().map((column => extend({
        fixed: isColumnFixing
    }, column)));
    const getCommandColumnIndex = column => commandColumns.reduce(((result, commandColumn, index) => {
        const columnType = needToExtend && column.type === GROUP_COMMAND_COLUMN_NAME ? "expand" : column.type;
        return commandColumn.type === columnType || commandColumn.command === column.command ? index : result
    }), -1);
    const callbackFilter = commandColumn => commandColumn.command !== commandColumns[commandColumnIndex].command;
    for (let i = 0; i < columns.length; i++) {
        column = columns[i];
        commandColumnIndex = column && (column.type || column.command) ? getCommandColumnIndex(column) : -1;
        if (commandColumnIndex >= 0) {
            if (needToExtend) {
                result[i] = extend({
                    fixed: isColumnFixing
                }, commandColumns[commandColumnIndex], column);
                if (column.type !== GROUP_COMMAND_COLUMN_NAME) {
                    defaultCommandColumns = defaultCommandColumns.filter(callbackFilter)
                }
            } else {
                const columnOptions = {
                    visibleIndex: column.visibleIndex,
                    index: column.index,
                    headerId: column.headerId,
                    allowFixing: 0 === column.groupIndex,
                    allowReordering: 0 === column.groupIndex,
                    groupIndex: column.groupIndex
                };
                result[i] = extend({}, column, commandColumns[commandColumnIndex], column.type === GROUP_COMMAND_COLUMN_NAME && columnOptions)
            }
        }
    }
    if (columns.length && needToExtend && defaultCommandColumns.length) {
        result = result.concat(defaultCommandColumns)
    }
    return result
};
export const isColumnFixed = (that, column) => isDefined(column.fixed) || !column.type ? column.fixed : that._isColumnFixing();
export const convertOwnerBandToColumnReference = columns => {
    columns.forEach((column => {
        if (isDefined(column.ownerBand)) {
            column.ownerBand = columns[column.ownerBand]
        }
    }))
};
export const resetBandColumnsCache = that => {
    that._bandColumnsCache = void 0
};
export const findColumn = (columns, identifier) => {
    const identifierOptionName = isString(identifier) && identifier.substr(0, identifier.indexOf(":"));
    let column;
    if (void 0 === identifier) {
        return
    }
    if (identifierOptionName) {
        identifier = identifier.substr(identifierOptionName.length + 1)
    }
    if (identifierOptionName) {
        column = columns.filter((column => `${column[identifierOptionName]}` === identifier))[0]
    } else {
        ["index", "name", "dataField", "caption"].some((optionName => {
            column = columns.filter((column => column[optionName] === identifier))[0];
            return !!column
        }))
    }
    return column
};
export const sortColumns = (columns, sortOrder) => {
    if ("asc" !== sortOrder && "desc" !== sortOrder) {
        return columns
    }
    const sign = "asc" === sortOrder ? 1 : -1;
    columns.sort(((column1, column2) => {
        const caption1 = column1.caption || "";
        const caption2 = column2.caption || "";
        return sign * caption1.localeCompare(caption2)
    }));
    return columns
};
export const strictParseNumber = function(text, format) {
    const parsedValue = numberLocalization.parse(text);
    if (isNumeric(parsedValue)) {
        const formattedValue = numberLocalization.format(parsedValue, format);
        const formattedValueWithDefaultFormat = numberLocalization.format(parsedValue, "decimal");
        if (formattedValue === text || formattedValueWithDefaultFormat === text) {
            return parsedValue
        }
    }
};
