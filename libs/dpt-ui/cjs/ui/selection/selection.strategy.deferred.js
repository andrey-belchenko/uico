/**
 * DevExtreme (cjs/ui/selection/selection.strategy.deferred.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../core/utils/type");
var _selection = _interopRequireDefault(require("./selection.strategy"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _query = _interopRequireDefault(require("../../data/query"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class DeferredStrategy extends _selection.default {
    getSelectedItems() {
        return this._loadFilteredData(this.options.selectionFilter)
    }
    getSelectedItemKeys() {
        const d = new _deferred.Deferred;
        const that = this;
        const key = this.options.key();
        const select = (0, _type.isString)(key) ? [key] : key;
        this._loadFilteredData(this.options.selectionFilter, null, select).done((function(items) {
            const keys = items.map((function(item) {
                return that.options.keyOf(item)
            }));
            d.resolve(keys)
        })).fail(d.reject);
        return d.promise()
    }
    selectedItemKeys(keys, preserve, isDeselect, isSelectAll) {
        if (isSelectAll) {
            const filter = this.options.filter();
            const needResetSelectionFilter = !filter || JSON.stringify(filter) === JSON.stringify(this.options.selectionFilter) && isDeselect;
            if (needResetSelectionFilter) {
                this._setOption("selectionFilter", isDeselect ? [] : null)
            } else {
                this._addSelectionFilter(isDeselect, filter, isSelectAll)
            }
        } else {
            if (!preserve) {
                this._setOption("selectionFilter", [])
            }
            for (let i = 0; i < keys.length; i++) {
                if (isDeselect) {
                    this.removeSelectedItem(keys[i])
                } else {
                    this.addSelectedItem(keys[i], isSelectAll, !preserve)
                }
            }
        }
        this.onSelectionChanged();
        return (new _deferred.Deferred).resolve()
    }
    setSelectedItems(keys) {
        this._setOption("selectionFilter", null);
        for (let i = 0; i < keys.length; i++) {
            this.addSelectedItem(keys[i])
        }
    }
    isItemDataSelected(itemData) {
        return this.isItemKeySelected(itemData)
    }
    isItemKeySelected(itemData) {
        const selectionFilter = this.options.selectionFilter;
        if (!selectionFilter) {
            return true
        }
        return !!(0, _query.default)([itemData]).filter(selectionFilter).toArray().length
    }
    _getKeyExpr() {
        const keyField = this.options.key();
        if (Array.isArray(keyField) && 1 === keyField.length) {
            return keyField[0]
        }
        return keyField
    }
    _normalizeKey(key) {
        const keyExpr = this.options.key();
        if (Array.isArray(keyExpr) && 1 === keyExpr.length) {
            return key[keyExpr[0]]
        }
        return key
    }
    _getFilterByKey(key) {
        const keyField = this._getKeyExpr();
        let filter = [keyField, "=", this._normalizeKey(key)];
        if (Array.isArray(keyField)) {
            filter = [];
            for (let i = 0; i < keyField.length; i++) {
                filter.push([keyField[i], "=", key[keyField[i]]]);
                if (i !== keyField.length - 1) {
                    filter.push("and")
                }
            }
        }
        return filter
    }
    addSelectedItem(key, isSelectAll, skipFilter) {
        const filter = this._getFilterByKey(key);
        this._addSelectionFilter(false, filter, isSelectAll, skipFilter)
    }
    removeSelectedItem(key) {
        const filter = this._getFilterByKey(key);
        this._addSelectionFilter(true, filter)
    }
    validate() {
        const key = this.options.key;
        if (key && void 0 === key()) {
            throw _ui.default.Error("E1042", "Deferred selection")
        }
    }
    _findSubFilter(selectionFilter, filter) {
        if (!selectionFilter) {
            return -1
        }
        const filterString = JSON.stringify(filter);
        for (let index = 0; index < selectionFilter.length; index++) {
            const subFilter = selectionFilter[index];
            if (subFilter && JSON.stringify(subFilter) === filterString) {
                return index
            }
        }
        return -1
    }
    _isLastSubFilter(selectionFilter, filter) {
        if (selectionFilter && filter) {
            return this._findSubFilter(selectionFilter, filter) === selectionFilter.length - 1 || 0 === this._findSubFilter([selectionFilter], filter)
        }
        return false
    }
    _addFilterOperator(selectionFilter, filterOperator) {
        if (selectionFilter.length > 1 && (0, _type.isString)(selectionFilter[1]) && selectionFilter[1] !== filterOperator) {
            selectionFilter = [selectionFilter]
        }
        if (selectionFilter.length) {
            selectionFilter.push(filterOperator)
        }
        return selectionFilter
    }
    _denormalizeFilter(filter) {
        if (filter && (0, _type.isString)(filter[0])) {
            filter = [filter]
        }
        return filter
    }
    _isOnlyNegativeFiltersLeft(filters) {
        return filters.every(((filterItem, i) => {
            if (i % 2 === 0) {
                return Array.isArray(filterItem) && "!" === filterItem[0]
            } else {
                return "and" === filterItem
            }
        }))
    }
    _addSelectionFilter(isDeselect, filter, isSelectAll, skipFilter) {
        var _selectionFilter;
        const that = this;
        const currentFilter = isDeselect ? ["!", filter] : filter;
        const currentOperation = isDeselect ? "and" : "or";
        let needAddFilter = true;
        let selectionFilter = that.options.selectionFilter || [];
        selectionFilter = that._denormalizeFilter(selectionFilter);
        if (null !== (_selectionFilter = selectionFilter) && void 0 !== _selectionFilter && _selectionFilter.length && !skipFilter) {
            const removedIndex = that._removeSameFilter(selectionFilter, filter, isDeselect, isSelectAll);
            const filterIndex = that._removeSameFilter(selectionFilter, filter, !isDeselect);
            const shouldCleanFilter = isDeselect && (-1 !== removedIndex || -1 !== filterIndex) && this._isOnlyNegativeFiltersLeft(selectionFilter);
            if (shouldCleanFilter) {
                selectionFilter = []
            }
            const isKeyOperatorsAfterRemoved = this._isKeyFilter(filter) && this._hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex);
            needAddFilter = filter.length && !isKeyOperatorsAfterRemoved
        }
        if (needAddFilter) {
            selectionFilter = that._addFilterOperator(selectionFilter, currentOperation);
            selectionFilter.push(currentFilter)
        }
        selectionFilter = that._normalizeFilter(selectionFilter);
        that._setOption("selectionFilter", !isDeselect && !selectionFilter.length ? null : selectionFilter)
    }
    _normalizeFilter(filter) {
        if (filter && 1 === filter.length) {
            filter = filter[0]
        }
        return filter
    }
    _removeFilterByIndex(filter, filterIndex, isSelectAll) {
        const operation = filter[1];
        if (filterIndex > 0) {
            filter.splice(filterIndex - 1, 2)
        } else {
            filter.splice(filterIndex, 2)
        }
        if (isSelectAll && "and" === operation) {
            filter.splice(0, filter.length)
        }
    }
    _isSimpleKeyFilter(filter, key) {
        return 3 === filter.length && filter[0] === key && "=" === filter[1]
    }
    _isKeyFilter(filter) {
        if (2 === filter.length && "!" === filter[0]) {
            return this._isKeyFilter(filter[1])
        }
        const keyField = this._getKeyExpr();
        if (Array.isArray(keyField)) {
            if (filter.length !== 2 * keyField.length - 1) {
                return false
            }
            for (let i = 0; i < keyField.length; i++) {
                if (i > 0 && "and" !== filter[2 * i - 1]) {
                    return false
                }
                if (!this._isSimpleKeyFilter(filter[2 * i], keyField[i])) {
                    return false
                }
            }
            return true
        }
        return this._isSimpleKeyFilter(filter, keyField)
    }
    _hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex) {
        if (filterIndex >= 0) {
            for (let i = filterIndex; i < selectionFilter.length; i++) {
                if ("string" !== typeof selectionFilter[i] && !this._isKeyFilter(selectionFilter[i])) {
                    return false
                }
            }
            return true
        }
        return false
    }
    _removeSameFilter(selectionFilter, filter, inverted, isSelectAll) {
        filter = inverted ? ["!", filter] : filter;
        if (JSON.stringify(filter) === JSON.stringify(selectionFilter)) {
            selectionFilter.splice(0, selectionFilter.length);
            return 0
        }
        const filterIndex = this._findSubFilter(selectionFilter, filter);
        if (filterIndex >= 0) {
            this._removeFilterByIndex(selectionFilter, filterIndex, isSelectAll);
            return filterIndex
        } else {
            for (let i = 0; i < selectionFilter.length; i++) {
                if (Array.isArray(selectionFilter[i]) && selectionFilter[i].length > 2) {
                    const filterIndex = this._removeSameFilter(selectionFilter[i], filter, false, isSelectAll);
                    if (filterIndex >= 0) {
                        if (!selectionFilter[i].length) {
                            this._removeFilterByIndex(selectionFilter, i, isSelectAll)
                        } else if (1 === selectionFilter[i].length) {
                            selectionFilter[i] = selectionFilter[i][0]
                        }
                        return filterIndex
                    }
                }
            }
            return -1
        }
    }
    getSelectAllState() {
        const filter = this.options.filter();
        let selectionFilter = this.options.selectionFilter;
        if (!selectionFilter) {
            return true
        }
        if (!selectionFilter.length) {
            return false
        }
        if (!filter || !filter.length) {
            return
        }
        selectionFilter = this._denormalizeFilter(selectionFilter);
        if (this._isLastSubFilter(selectionFilter, filter)) {
            return true
        }
        if (this._isLastSubFilter(selectionFilter, ["!", filter])) {
            return false
        }
        return
    }
    loadSelectedItemsWithFilter() {
        const componentFilter = this.options.filter();
        const selectionFilter = this.options.selectionFilter;
        const filter = componentFilter ? [componentFilter, "and", selectionFilter] : selectionFilter;
        return this._loadFilteredData(filter)
    }
}
exports.default = DeferredStrategy;
module.exports = exports.default;
module.exports.default = exports.default;
