/**
 * DevExtreme (esm/ui/collection/item.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import Class from "../../core/class";
import {
    each
} from "../../core/utils/iterator";
import {
    attachInstanceToElement,
    getInstanceByElement
} from "../../core/utils/public_component";
const INVISIBLE_STATE_CLASS = "dx-state-invisible";
const DISABLED_STATE_CLASS = "dx-state-disabled";
const ITEM_CONTENT_PLACEHOLDER_CLASS = "dx-item-content-placeholder";
const forcibleWatcher = function(watchMethod, fn, callback) {
    const filteredCallback = function() {
        let oldValue;
        return function(value) {
            if (oldValue !== value) {
                callback(value, oldValue);
                oldValue = value
            }
        }
    }();
    return {
        dispose: watchMethod(fn, filteredCallback),
        force: function() {
            filteredCallback(fn())
        }
    }
};
const CollectionItem = Class.inherit({
    ctor: function($element, options, rawData) {
        this._$element = $element;
        this._options = options;
        this._rawData = rawData;
        attachInstanceToElement($element, this, this._dispose);
        this._render()
    },
    _render: function() {
        const $placeholder = $("<div>").addClass("dx-item-content-placeholder");
        this._$element.append($placeholder);
        this._watchers = [];
        this._renderWatchers()
    },
    _renderWatchers: function() {
        this._startWatcher("disabled", this._renderDisabled.bind(this));
        this._startWatcher("visible", this._renderVisible.bind(this))
    },
    _startWatcher: function(field, render) {
        const rawData = this._rawData;
        const exprGetter = this._options.fieldGetter(field);
        const watcher = forcibleWatcher(this._options.watchMethod(), (function() {
            return exprGetter(rawData)
        }), function(value, oldValue) {
            this._dirty = true;
            render(value, oldValue)
        }.bind(this));
        this._watchers.push(watcher)
    },
    setDataField: function() {
        this._dirty = false;
        each(this._watchers, (function(_, watcher) {
            watcher.force()
        }));
        if (this._dirty) {
            return true
        }
    },
    _renderDisabled: function(value, oldValue) {
        this._$element.toggleClass("dx-state-disabled", !!value);
        this._$element.attr("aria-disabled", !!value);
        this._updateOwnerFocus(value)
    },
    _updateOwnerFocus: function(isDisabled) {
        const ownerComponent = this._options.owner;
        if (ownerComponent && isDisabled) {
            ownerComponent._resetItemFocus(this._$element)
        }
    },
    _renderVisible: function(value, oldValue) {
        this._$element.toggleClass("dx-state-invisible", void 0 !== value && !value)
    },
    _dispose: function() {
        each(this._watchers, (function(_, watcher) {
            watcher.dispose()
        }))
    }
});
CollectionItem.getInstance = function($element) {
    return getInstanceByElement($element, this)
};
export default CollectionItem;
