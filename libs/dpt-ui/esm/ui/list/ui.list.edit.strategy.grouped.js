/**
 * DevExtreme (esm/ui/list/ui.list.edit.strategy.grouped.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import {
    isNumeric
} from "../../core/utils/type";
import {
    each
} from "../../core/utils/iterator";
import storeHelper from "../../data/store_helper";
import query from "../../data/query";
import EditStrategy from "../collection/ui.collection_widget.edit.strategy.plain";
const LIST_ITEM_CLASS = "dx-list-item";
const LIST_GROUP_CLASS = "dx-list-group";
const SELECTION_SHIFT = 20;
const SELECTION_MASK = 1048575;
const combineIndex = function(indices) {
    return (indices.group << 20) + indices.item
};
const splitIndex = function(combinedIndex) {
    return {
        group: combinedIndex >> 20,
        item: 1048575 & combinedIndex
    }
};
const GroupedEditStrategy = EditStrategy.inherit({
    _groupElements: function() {
        return this._collectionWidget._itemContainer().find(".dx-list-group")
    },
    _groupItemElements: function($group) {
        return $group.find(".dx-list-item")
    },
    getIndexByItemData: function(itemData) {
        const groups = this._collectionWidget.option("items");
        let index = false;
        if (!itemData) {
            return false
        }
        if (itemData.items && itemData.items.length) {
            itemData = itemData.items[0]
        }
        each(groups, (function(groupIndex, group) {
            if (!group.items) {
                return false
            }
            each(group.items, (function(itemIndex, item) {
                if (item !== itemData) {
                    return true
                }
                index = {
                    group: groupIndex,
                    item: itemIndex
                };
                return false
            }));
            if (index) {
                return false
            }
        }));
        return index
    },
    getItemDataByIndex: function(index) {
        const items = this._collectionWidget.option("items");
        if (isNumeric(index)) {
            return this.itemsGetter()[index]
        }
        return index && items[index.group] && items[index.group].items[index.item] || null
    },
    itemsGetter: function() {
        let resultItems = [];
        const items = this._collectionWidget.option("items");
        for (let i = 0; i < items.length; i++) {
            if (items[i] && items[i].items) {
                resultItems = resultItems.concat(items[i].items)
            } else {
                resultItems.push(items[i])
            }
        }
        return resultItems
    },
    deleteItemAtIndex: function(index) {
        const indices = splitIndex(index);
        const itemGroup = this._collectionWidget.option("items")[indices.group].items;
        itemGroup.splice(indices.item, 1)
    },
    getKeysByItems: function(items) {
        let plainItems = [];
        let i;
        for (i = 0; i < items.length; i++) {
            if (items[i] && items[i].items) {
                plainItems = plainItems.concat(items[i].items)
            } else {
                plainItems.push(items[i])
            }
        }
        const result = [];
        for (i = 0; i < plainItems.length; i++) {
            result.push(this._collectionWidget.keyOf(plainItems[i]))
        }
        return result
    },
    getIndexByKey: function(key, items) {
        const groups = items || this._collectionWidget.option("items");
        let index = -1;
        const that = this;
        each(groups, (function(groupIndex, group) {
            if (!group.items) {
                return
            }
            each(group.items, (function(itemIndex, item) {
                const itemKey = that._collectionWidget.keyOf(item);
                if (that._equalKeys(itemKey, key)) {
                    index = {
                        group: groupIndex,
                        item: itemIndex
                    };
                    return false
                }
            }));
            if (-1 !== index) {
                return false
            }
        }));
        return index
    },
    _getGroups: function(items) {
        const dataController = this._collectionWidget._dataController;
        const group = dataController.group();
        if (group) {
            return storeHelper.queryByOptions(query(items), {
                group: group
            }).toArray()
        }
        return this._collectionWidget.option("items")
    },
    getItemsByKeys: function(keys, items) {
        const result = [];
        const groups = this._getGroups(items);
        const groupItemByKeyMap = {};
        const getItemMeta = key => {
            const index = this.getIndexByKey(key, groups);
            const group = index && groups[index.group];
            if (!group) {
                return
            }
            return {
                groupKey: group.key,
                item: group.items[index.item]
            }
        };
        each(keys, (function(_, key) {
            const itemMeta = getItemMeta(key);
            if (!itemMeta) {
                return
            }
            const groupKey = itemMeta.groupKey;
            const item = itemMeta.item;
            let selectedGroup = groupItemByKeyMap[groupKey];
            if (!selectedGroup) {
                selectedGroup = {
                    key: groupKey,
                    items: []
                };
                groupItemByKeyMap[groupKey] = selectedGroup;
                result.push(selectedGroup)
            }
            selectedGroup.items.push(item)
        }));
        return result
    },
    moveItemAtIndexToIndex: function(movingIndex, destinationIndex) {
        const items = this._collectionWidget.option("items");
        const movingIndices = splitIndex(movingIndex);
        const destinationIndices = splitIndex(destinationIndex);
        const movingItemGroup = items[movingIndices.group].items;
        const destinationItemGroup = items[destinationIndices.group].items;
        const movedItemData = movingItemGroup[movingIndices.item];
        movingItemGroup.splice(movingIndices.item, 1);
        destinationItemGroup.splice(destinationIndices.item, 0, movedItemData)
    },
    _isItemIndex: function(index) {
        return index && isNumeric(index.group) && isNumeric(index.item)
    },
    _getNormalizedItemIndex: function(itemElement) {
        const $item = $(itemElement);
        const $group = $item.closest(".dx-list-group");
        if (!$group.length) {
            return -1
        }
        return combineIndex({
            group: this._groupElements().index($group),
            item: this._groupItemElements($group).index($item)
        })
    },
    _normalizeItemIndex: function(index) {
        return combineIndex(index)
    },
    _denormalizeItemIndex: function(index) {
        return splitIndex(index)
    },
    _getItemByNormalizedIndex: function(index) {
        const indices = splitIndex(index);
        const $group = this._groupElements().eq(indices.group);
        return this._groupItemElements($group).eq(indices.item)
    },
    _itemsFromSameParent: function(firstIndex, secondIndex) {
        return splitIndex(firstIndex).group === splitIndex(secondIndex).group
    }
});
export default GroupedEditStrategy;
