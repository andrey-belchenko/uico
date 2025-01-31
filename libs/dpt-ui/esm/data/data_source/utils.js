/**
 * DevExtreme (esm/data/data_source/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["items"];
import ajaxUtils from "../../core/utils/ajax";
import Store from "../abstract_store";
import ArrayStore from "../array_store";
import {
    each,
    map
} from "../../core/utils/iterator";
import CustomStore from "../custom_store";
import {
    extend
} from "../../core/utils/extend";
import {
    isPlainObject
} from "../../core/utils/type";
import {
    normalizeSortingInfo
} from "../utils";
export const CANCELED_TOKEN = "canceled";
export const isPending = deferred => "pending" === deferred.state();
export const normalizeStoreLoadOptionAccessorArguments = originalArguments => {
    switch (originalArguments.length) {
        case 0:
            return;
        case 1:
            return originalArguments[0]
    }
    return [].slice.call(originalArguments)
};
const mapGroup = (group, level, mapper) => map(group, (item => {
    const restItem = _objectWithoutPropertiesLoose(item, _excluded);
    return _extends({}, restItem, {
        items: mapRecursive(item.items, level - 1, mapper)
    })
}));
const mapRecursive = (items, level, mapper) => {
    if (!Array.isArray(items)) {
        return items
    }
    return level ? mapGroup(items, level, mapper) : map(items, mapper)
};
export const mapDataRespectingGrouping = (items, mapper, groupInfo) => {
    const level = groupInfo ? normalizeSortingInfo(groupInfo).length : 0;
    return mapRecursive(items, level, mapper)
};
export const normalizeLoadResult = (data, extra) => {
    var _data;
    if (null !== (_data = data) && void 0 !== _data && _data.data) {
        extra = data;
        data = data.data
    }
    if (!Array.isArray(data)) {
        data = [data]
    }
    return {
        data: data,
        extra: extra
    }
};
const createCustomStoreFromLoadFunc = options => {
    const storeConfig = {};
    each(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], (function() {
        storeConfig[this] = options[this];
        delete options[this]
    }));
    return new CustomStore(storeConfig)
};
const createStoreFromConfig = storeConfig => {
    const alias = storeConfig.type;
    delete storeConfig.type;
    return Store.create(alias, storeConfig)
};
const createCustomStoreFromUrl = (url, normalizationOptions) => new CustomStore({
    load: () => ajaxUtils.sendRequest({
        url: url,
        dataType: "json"
    }),
    loadMode: null === normalizationOptions || void 0 === normalizationOptions ? void 0 : normalizationOptions.fromUrlLoadMode
});
export const normalizeDataSourceOptions = (options, normalizationOptions) => {
    let store;
    if ("string" === typeof options) {
        options = {
            paginate: false,
            store: createCustomStoreFromUrl(options, normalizationOptions)
        }
    }
    if (void 0 === options) {
        options = []
    }
    if (Array.isArray(options) || options instanceof Store) {
        options = {
            store: options
        }
    } else {
        options = extend({}, options)
    }
    if (void 0 === options.store) {
        options.store = []
    }
    store = options.store;
    if ("load" in options) {
        store = createCustomStoreFromLoadFunc(options)
    } else if (Array.isArray(store)) {
        store = new ArrayStore(store)
    } else if (isPlainObject(store)) {
        store = createStoreFromConfig(extend({}, store))
    }
    options.store = store;
    return options
};
