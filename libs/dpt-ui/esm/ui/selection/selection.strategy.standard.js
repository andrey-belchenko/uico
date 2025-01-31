/**
 * DevExtreme (esm/ui/selection/selection.strategy.standard.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getKeyHash
} from "../../core/utils/common";
import {
    isDefined,
    isObject
} from "../../core/utils/type";
import {
    removeDuplicates,
    getUniqueValues
} from "../../core/utils/array";
import {
    isKeysEqual
} from "../../core/utils/array_compare";
import dataQuery from "../../data/query";
import {
    Deferred,
    when
} from "../../core/utils/deferred";
import {
    SelectionFilterCreator
} from "../../core/utils/selection_filter";
import errors from "../widget/ui.errors";
import SelectionStrategy from "./selection.strategy";
export default class StandardStrategy extends SelectionStrategy {
    constructor(options) {
        super(options);
        this._initSelectedItemKeyHash()
    }
    _initSelectedItemKeyHash() {
        this._setOption("keyHashIndices", this.options.equalByReference ? null : {})
    }
    getSelectedItemKeys() {
        return this.options.selectedItemKeys.slice(0)
    }
    getSelectedItems() {
        return this.options.selectedItems.slice(0)
    }
    _preserveSelectionUpdate(items, isDeselect) {
        const keyOf = this.options.keyOf;
        let keyIndicesToRemoveMap;
        let keyIndex;
        let i;
        if (!keyOf) {
            return
        }
        const isBatchDeselect = isDeselect && items.length > 1 && !this.options.equalByReference;
        if (isBatchDeselect) {
            keyIndicesToRemoveMap = {}
        }
        for (i = 0; i < items.length; i++) {
            const item = items[i];
            const key = keyOf(item);
            if (isDeselect) {
                keyIndex = this.removeSelectedItem(key, keyIndicesToRemoveMap, null === item || void 0 === item ? void 0 : item.disabled);
                if (keyIndicesToRemoveMap && keyIndex >= 0) {
                    keyIndicesToRemoveMap[keyIndex] = true
                }
            } else {
                this.addSelectedItem(key, item)
            }
        }
        if (isBatchDeselect) {
            this._batchRemoveSelectedItems(keyIndicesToRemoveMap)
        }
    }
    _batchRemoveSelectedItems(keyIndicesToRemoveMap) {
        const selectedItemKeys = this.options.selectedItemKeys.slice(0);
        const selectedItems = this.options.selectedItems.slice(0);
        this.options.selectedItemKeys.length = 0;
        this.options.selectedItems.length = 0;
        for (let i = 0; i < selectedItemKeys.length; i++) {
            if (!keyIndicesToRemoveMap[i]) {
                this.options.selectedItemKeys.push(selectedItemKeys[i]);
                this.options.selectedItems.push(selectedItems[i])
            }
        }
        this._initSelectedItemKeyHash();
        this.updateSelectedItemKeyHash(this.options.selectedItemKeys)
    }
    _loadSelectedItemsCore(keys, isDeselect, isSelectAll, filter) {
        let forceCombinedFilter = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
        let deferred = new Deferred;
        const key = this.options.key();
        if (!keys.length && !isSelectAll) {
            deferred.resolve([]);
            return deferred
        }
        if (isSelectAll && isDeselect && !filter) {
            deferred.resolve(this.getSelectedItems());
            return deferred
        }
        const selectionFilterCreator = new SelectionFilterCreator(keys, isSelectAll);
        const combinedFilter = selectionFilterCreator.getCombinedFilter(key, filter, forceCombinedFilter);
        let deselectedItems = [];
        if (isDeselect) {
            const selectedItems = this.options.selectedItems;
            deselectedItems = combinedFilter && keys.length !== selectedItems.length ? dataQuery(selectedItems).filter(combinedFilter).toArray() : selectedItems.slice(0)
        }
        let filteredItems = deselectedItems.length ? deselectedItems : this.options.plainItems(true).filter(this.options.isSelectableItem).map(this.options.getItemData);
        const localFilter = selectionFilterCreator.getLocalFilter(this.options.keyOf, this.equalKeys.bind(this), this.options.equalByReference, key);
        filteredItems = filteredItems.filter(localFilter);
        if (deselectedItems.length || !isSelectAll && filteredItems.length === keys.length) {
            deferred.resolve(filteredItems)
        } else {
            deferred = this._loadFilteredData(combinedFilter, localFilter, null, isSelectAll)
        }
        return deferred
    }
    _replaceSelectionUpdate(items) {
        const internalKeys = [];
        const keyOf = this.options.keyOf;
        if (!keyOf) {
            return
        }
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const key = keyOf(item);
            internalKeys.push(key)
        }
        this.setSelectedItems(internalKeys, items)
    }
    _warnOnIncorrectKeys(keys) {
        const allowNullValue = this.options.allowNullValue;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((!allowNullValue || null !== key) && !this.isItemKeySelected(key)) {
                errors.log("W1002", key)
            }
        }
    }
    _isMultiSelectEnabled() {
        const mode = this.options.mode;
        return "all" === mode || "multiple" === mode
    }
    _requestInProgress() {
        var _this$_lastLoadDeferr;
        return "pending" === (null === (_this$_lastLoadDeferr = this._lastLoadDeferred) || void 0 === _this$_lastLoadDeferr ? void 0 : _this$_lastLoadDeferr.state())
    }
    _concatRequestsItems(keys, isDeselect, oldRequestItems, updatedKeys) {
        let selectedItems;
        const deselectedItems = isDeselect ? keys : [];
        if (updatedKeys) {
            selectedItems = updatedKeys
        } else {
            selectedItems = removeDuplicates(keys, this.options.selectedItemKeys)
        }
        return {
            addedItems: oldRequestItems.added.concat(selectedItems),
            removedItems: oldRequestItems.removed.concat(deselectedItems),
            keys: keys
        }
    }
    _collectLastRequestData(keys, isDeselect, isSelectAll, updatedKeys) {
        const isDeselectAll = isDeselect && isSelectAll;
        const oldRequestItems = {
            added: [],
            removed: []
        };
        const multiSelectEnabled = this._isMultiSelectEnabled();
        let lastRequestData = multiSelectEnabled ? this._lastRequestData : {};
        if (multiSelectEnabled) {
            if (this._shouldMergeWithLastRequest) {
                if (isDeselectAll) {
                    this._lastLoadDeferred.reject();
                    lastRequestData = {}
                } else if (!isKeysEqual(keys, this.options.selectedItemKeys)) {
                    oldRequestItems.added = lastRequestData.addedItems;
                    oldRequestItems.removed = lastRequestData.removedItems;
                    if (!isDeselect) {
                        this._lastLoadDeferred.reject()
                    }
                }
            }
            lastRequestData = this._concatRequestsItems(keys, isDeselect, oldRequestItems, this._shouldMergeWithLastRequest ? void 0 : updatedKeys)
        }
        return lastRequestData
    }
    _updateKeysByLastRequestData(keys, isDeselect, isSelectAll) {
        let currentKeys = keys;
        if (this._isMultiSelectEnabled() && this._shouldMergeWithLastRequest && !isDeselect && !isSelectAll) {
            var _this$_lastRequestDat, _this$_lastRequestDat2;
            currentKeys = removeDuplicates(keys.concat(null === (_this$_lastRequestDat = this._lastRequestData) || void 0 === _this$_lastRequestDat ? void 0 : _this$_lastRequestDat.addedItems), null === (_this$_lastRequestDat2 = this._lastRequestData) || void 0 === _this$_lastRequestDat2 ? void 0 : _this$_lastRequestDat2.removedItems);
            currentKeys = getUniqueValues(currentKeys)
        }
        return currentKeys
    }
    _loadSelectedItems(keys, isDeselect, isSelectAll, updatedKeys) {
        let forceCombinedFilter = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
        const that = this;
        const deferred = new Deferred;
        const filter = that.options.filter();
        this._shouldMergeWithLastRequest = this._requestInProgress();
        this._lastRequestData = this._collectLastRequestData(keys, isDeselect, isSelectAll, updatedKeys);
        when(that._lastLoadDeferred).always((function() {
            const currentKeys = that._updateKeysByLastRequestData(keys, isDeselect, isSelectAll);
            that._shouldMergeWithLastRequest = false;
            that._loadSelectedItemsCore(currentKeys, isDeselect, isSelectAll, filter, forceCombinedFilter).done(deferred.resolve).fail(deferred.reject)
        }));
        that._lastLoadDeferred = deferred;
        return deferred
    }
    selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys) {
        let forceCombinedFilter = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : false;
        const that = this;
        const deferred = that._loadSelectedItems(keys, isDeselect, isSelectAll, updatedKeys, forceCombinedFilter);
        deferred.done((function(items) {
            if (preserve) {
                that._preserveSelectionUpdate(items, isDeselect)
            } else {
                that._replaceSelectionUpdate(items)
            }
            that.onSelectionChanged()
        }));
        return deferred
    }
    addSelectedItem(key, itemData) {
        if (isDefined(itemData) && !this.options.ignoreDisabledItems && itemData.disabled) {
            if (-1 === this.options.disabledItemKeys.indexOf(key)) {
                this.options.disabledItemKeys.push(key)
            }
            return
        }
        const keyHash = this._getKeyHash(key);
        if (-1 === this._indexOfSelectedItemKey(keyHash)) {
            if (!isObject(keyHash) && this.options.keyHashIndices) {
                this.options.keyHashIndices[keyHash] = [this.options.selectedItemKeys.length]
            }
            this.options.selectedItemKeys.push(key);
            this.options.addedItemKeys.push(key);
            this.options.addedItems.push(itemData);
            this.options.selectedItems.push(itemData)
        }
    }
    _getSelectedIndexByKey(key, ignoreIndicesMap) {
        const selectedItemKeys = this.options.selectedItemKeys;
        for (let index = 0; index < selectedItemKeys.length; index++) {
            if ((!ignoreIndicesMap || !ignoreIndicesMap[index]) && this.equalKeys(selectedItemKeys[index], key)) {
                return index
            }
        }
        return -1
    }
    _getSelectedIndexByHash(key, ignoreIndicesMap) {
        let indices = this.options.keyHashIndices[key];
        if (indices && indices.length > 1 && ignoreIndicesMap) {
            indices = indices.filter((function(index) {
                return !ignoreIndicesMap[index]
            }))
        }
        return indices && indices[0] >= 0 ? indices[0] : -1
    }
    _indexOfSelectedItemKey(key, ignoreIndicesMap) {
        let selectedIndex;
        if (this.options.equalByReference) {
            selectedIndex = this.options.selectedItemKeys.indexOf(key)
        } else if (isObject(key)) {
            selectedIndex = this._getSelectedIndexByKey(key, ignoreIndicesMap)
        } else {
            selectedIndex = this._getSelectedIndexByHash(key, ignoreIndicesMap)
        }
        return selectedIndex
    }
    _shiftSelectedKeyIndices(keyIndex) {
        for (let currentKeyIndex = keyIndex; currentKeyIndex < this.options.selectedItemKeys.length; currentKeyIndex++) {
            const currentKey = this.options.selectedItemKeys[currentKeyIndex];
            const currentKeyHash = getKeyHash(currentKey);
            const currentKeyIndices = this.options.keyHashIndices[currentKeyHash];
            if (!currentKeyIndices) {
                continue
            }
            for (let i = 0; i < currentKeyIndices.length; i++) {
                if (currentKeyIndices[i] > keyIndex) {
                    currentKeyIndices[i]--
                }
            }
        }
    }
    removeSelectedItem(key, keyIndicesToRemoveMap, isDisabled) {
        if (!this.options.ignoreDisabledItems && isDisabled) {
            return
        }
        const keyHash = this._getKeyHash(key);
        const isBatchDeselect = !!keyIndicesToRemoveMap;
        const keyIndex = this._indexOfSelectedItemKey(keyHash, keyIndicesToRemoveMap);
        if (keyIndex < 0) {
            return keyIndex
        }
        this.options.removedItemKeys.push(key);
        this.options.removedItems.push(this.options.selectedItems[keyIndex]);
        if (isBatchDeselect) {
            return keyIndex
        }
        this.options.selectedItemKeys.splice(keyIndex, 1);
        this.options.selectedItems.splice(keyIndex, 1);
        if (isObject(keyHash) || !this.options.keyHashIndices) {
            return keyIndex
        }
        const keyIndices = this.options.keyHashIndices[keyHash];
        if (!keyIndices) {
            return keyIndex
        }
        keyIndices.shift();
        if (!keyIndices.length) {
            delete this.options.keyHashIndices[keyHash]
        }
        this._shiftSelectedKeyIndices(keyIndex);
        return keyIndex
    }
    _updateAddedItemKeys(keys, items) {
        for (let i = 0; i < keys.length; i++) {
            if (!this.isItemKeySelected(keys[i])) {
                this.options.addedItemKeys.push(keys[i]);
                this.options.addedItems.push(items[i])
            }
        }
    }
    _updateRemovedItemKeys(keys, oldSelectedKeys, oldSelectedItems) {
        for (let i = 0; i < oldSelectedKeys.length; i++) {
            if (!this.isItemKeySelected(oldSelectedKeys[i])) {
                this.options.removedItemKeys.push(oldSelectedKeys[i]);
                this.options.removedItems.push(oldSelectedItems[i])
            }
        }
    }
    _isItemSelectionInProgress(key, checkPending) {
        const shouldCheckPending = checkPending && this._lastRequestData && this._requestInProgress();
        if (shouldCheckPending) {
            const addedItems = this._lastRequestData.addedItems ?? [];
            return addedItems.includes(key)
        } else {
            return false
        }
    }
    _getKeyHash(key) {
        return this.options.equalByReference ? key : getKeyHash(key)
    }
    setSelectedItems(keys, items) {
        this._updateAddedItemKeys(keys, items);
        const oldSelectedKeys = this.options.selectedItemKeys;
        const oldSelectedItems = this.options.selectedItems;
        if (!this.options.equalByReference) {
            this._initSelectedItemKeyHash();
            this.updateSelectedItemKeyHash(keys)
        }
        this._setOption("selectedItemKeys", keys);
        this._setOption("selectedItems", items);
        this._updateRemovedItemKeys(keys, oldSelectedKeys, oldSelectedItems)
    }
    isItemDataSelected(itemData) {
        let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        const key = this.options.keyOf(itemData);
        return this.isItemKeySelected(key, options)
    }
    isItemKeySelected(key) {
        let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        let result = this._isItemSelectionInProgress(key, options.checkPending);
        if (!result) {
            const keyHash = this._getKeyHash(key);
            const index = this._indexOfSelectedItemKey(keyHash);
            result = -1 !== index
        }
        return result
    }
    getSelectAllState(visibleOnly) {
        if (visibleOnly) {
            return this._getVisibleSelectAllState()
        } else {
            return this._getFullSelectAllState()
        }
    }
    loadSelectedItemsWithFilter() {
        const keyExpr = this.options.key();
        const keys = this.getSelectedItemKeys();
        const filter = this.options.filter();
        if (!keys.length) {
            return Deferred().resolve([])
        }
        const selectionFilterCreator = new SelectionFilterCreator(keys);
        const combinedFilter = selectionFilterCreator.getCombinedFilter(keyExpr, filter, true);
        return this._loadFilteredData(combinedFilter)
    }
}
