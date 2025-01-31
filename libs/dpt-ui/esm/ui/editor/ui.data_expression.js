/**
 * DevExtreme (esm/ui/editor/ui.data_expression.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import variableWrapper from "../../core/utils/variable_wrapper";
import {
    compileGetter,
    toComparable
} from "../../core/utils/data";
import {
    ensureDefined,
    noop
} from "../../core/utils/common";
import {
    isDefined,
    isObject as isObjectType,
    isString,
    isFunction
} from "../../core/utils/type";
import {
    extend
} from "../../core/utils/extend";
import DataHelperMixin from "../../data_helper";
import {
    DataSource
} from "../../data/data_source/data_source";
import ArrayStore from "../../data/array_store";
import {
    Deferred
} from "../../core/utils/deferred";
const DataExpressionMixin = extend({}, DataHelperMixin, {
    _dataExpressionDefaultOptions: function() {
        return {
            items: [],
            dataSource: null,
            itemTemplate: "item",
            value: null,
            valueExpr: "this",
            displayExpr: void 0
        }
    },
    _initDataExpressions: function() {
        this._compileValueGetter();
        this._compileDisplayGetter();
        this._initDynamicTemplates();
        this._initDataSource();
        this._itemsToDataSource()
    },
    _itemsToDataSource: function() {
        if (!this.option("dataSource")) {
            this._dataSource = new DataSource({
                store: new ArrayStore(this.option("items")),
                pageSize: 0
            });
            this._initDataController()
        }
    },
    _compileDisplayGetter: function() {
        this._displayGetter = compileGetter(this._displayGetterExpr())
    },
    _displayGetterExpr: function() {
        return this.option("displayExpr")
    },
    _compileValueGetter: function() {
        this._valueGetter = compileGetter(this._valueGetterExpr())
    },
    _valueGetterExpr: function() {
        return this.option("valueExpr") || "this"
    },
    _loadValue: function(value) {
        const deferred = new Deferred;
        value = this._unwrappedValue(value);
        if (!isDefined(value)) {
            return deferred.reject().promise()
        }
        this._loadSingle(this._valueGetterExpr(), value).done(function(item) {
            this._isValueEquals(this._valueGetter(item), value) ? deferred.resolve(item) : deferred.reject()
        }.bind(this)).fail((function() {
            deferred.reject()
        }));
        this._loadValueDeferred = deferred;
        return deferred.promise()
    },
    _rejectValueLoading: function() {
        var _this$_loadValueDefer;
        null === (_this$_loadValueDefer = this._loadValueDeferred) || void 0 === _this$_loadValueDefer || _this$_loadValueDefer.reject({
            shouldSkipCallback: true
        })
    },
    _getCurrentValue: function() {
        return this.option("value")
    },
    _unwrappedValue: function(value) {
        value = value ?? this._getCurrentValue();
        if (value && this._dataSource && "this" === this._valueGetterExpr()) {
            value = this._getItemKey(value)
        }
        return variableWrapper.unwrap(value)
    },
    _getItemKey: function(value) {
        const key = this._dataSource.key();
        if (Array.isArray(key)) {
            const result = {};
            for (let i = 0, n = key.length; i < n; i++) {
                result[key[i]] = value[key[i]]
            }
            return result
        }
        if (key && "object" === typeof value) {
            value = value[key]
        }
        return value
    },
    _isValueEquals: function(value1, value2) {
        const dataSourceKey = this._dataSource && this._dataSource.key();
        let result = this._compareValues(value1, value2);
        if (!result && dataSourceKey && isDefined(value1) && isDefined(value2)) {
            if (Array.isArray(dataSourceKey)) {
                result = this._compareByCompositeKey(value1, value2, dataSourceKey)
            } else {
                result = this._compareByKey(value1, value2, dataSourceKey)
            }
        }
        return result
    },
    _compareByCompositeKey: function(value1, value2, key) {
        const isObject = isObjectType;
        if (!isObject(value1) || !isObject(value2)) {
            return false
        }
        for (let i = 0, n = key.length; i < n; i++) {
            if (value1[key[i]] !== value2[key[i]]) {
                return false
            }
        }
        return true
    },
    _compareByKey: function(value1, value2, key) {
        const unwrapObservable = variableWrapper.unwrap;
        const valueKey1 = ensureDefined(unwrapObservable(value1[key]), value1);
        const valueKey2 = ensureDefined(unwrapObservable(value2[key]), value2);
        return this._compareValues(valueKey1, valueKey2)
    },
    _compareValues: function(value1, value2) {
        return toComparable(value1, true) === toComparable(value2, true)
    },
    _initDynamicTemplates: noop,
    _setCollectionWidgetItemTemplate: function() {
        this._initDynamicTemplates();
        this._setCollectionWidgetOption("itemTemplate", this.option("itemTemplate"))
    },
    _getCollectionKeyExpr: function() {
        const valueExpr = this.option("valueExpr");
        const isValueExprField = isString(valueExpr) && "this" !== valueExpr || isFunction(valueExpr);
        return isValueExprField ? valueExpr : null
    },
    _dataExpressionOptionChanged: function(args) {
        switch (args.name) {
            case "items":
                this._itemsToDataSource();
                this._setCollectionWidgetOption("items");
                break;
            case "dataSource":
                this._initDataSource();
                break;
            case "itemTemplate":
                this._setCollectionWidgetItemTemplate();
                break;
            case "valueExpr":
                this._compileValueGetter();
                break;
            case "displayExpr":
                this._compileDisplayGetter();
                this._initDynamicTemplates();
                this._setCollectionWidgetOption("displayExpr")
        }
    }
});
export default DataExpressionMixin;
