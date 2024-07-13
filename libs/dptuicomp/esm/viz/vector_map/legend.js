/**
 * DevExtreme (esm/viz/vector_map/legend.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import {
    extend
} from "../../core/utils/extend";
import {
    each
} from "../../core/utils/iterator";
import {
    clone
} from "../../core/utils/object";
const _extend = extend;
const _each = each;
import {
    Legend as _BaseLegend
} from "../components/legend";
const unknownSource = {
    category: "UNKNOWN",
    name: "UNKNOWN"
};

function buildData(partition, values, field) {
    let i;
    const ii = values.length;
    const list = [];
    let item;
    for (i = 0; i < ii; ++i) {
        list[i] = item = {
            start: partition[i],
            end: partition[i + 1],
            index: i
        };
        item[field] = values[i];
        item.states = {
            normal: {
                fill: item.color
            }
        };
        item.visible = true
    }
    return list
}
let Legend = function(parameters) {
    const that = this;
    that._params = parameters;
    that._root = parameters.renderer.g().attr({
        class: "dxm-legend"
    }).linkOn(parameters.container, {
        name: "legend",
        after: "legend-base"
    }).enableLinks().linkAppend();
    parameters.layoutControl.addItem(that);
    _BaseLegend.call(that, {
        renderer: parameters.renderer,
        widget: parameters.widget,
        group: that._root,
        backgroundClass: null,
        itemsGroupClass: null,
        textField: "text",
        getFormatObject: function(data) {
            return data
        }
    });
    that._onDataChanged = function(data) {
        that._updateData(data)
    }
};
Legend.prototype = _extend(clone(_BaseLegend.prototype), {
    constructor: Legend,
    dispose: function() {
        this._params.layoutControl.removeItem(this);
        this._unbindData();
        this._root.linkRemove().linkOff();
        this._params = this._root = this._onDataChanged = null;
        return _BaseLegend.prototype.dispose.apply(this, arguments)
    },
    resize: function(size) {
        this._params.notifyDirty();
        if (null === size) {
            this.erase()
        } else {
            this.draw(size.width, size.height)
        }
        this._params.notifyReady()
    },
    locate: _BaseLegend.prototype.shift,
    _updateData: function(data) {
        this._options.defaultColor = data && data.defaultColor;
        this.update(data ? buildData(data.partition, data.values, this._dataName) : [], this._options, this._params.themeManager.theme("legend").title);
        this.updateLayout()
    },
    _unbindData: function() {
        if (this._dataCategory) {
            this._params.dataExchanger.unbind(this._dataCategory, this._dataName, this._onDataChanged)
        }
    },
    _bindData: function(arg) {
        this._params.dataExchanger.bind(this._dataCategory = arg.category, this._dataName = arg.name, this._onDataChanged)
    },
    setOptions: function(options) {
        this.update(this._data, options, this._params.themeManager.theme("legend").title);
        this._unbindData();
        const source = options.source;
        this._bindData(source ? {
            category: source.layer,
            name: source.grouping
        } : unknownSource);
        this.updateLayout();
        return this
    }
});
export function LegendsControl(parameters) {
    this._params = parameters;
    this._items = [];
    parameters.container.virtualLink("legend-base")
}
LegendsControl.prototype = {
    constructor: LegendsControl,
    dispose: function() {
        _each(this._items, (function(_, item) {
            item.dispose()
        }));
        this._params = this._items = null
    },
    setOptions: function(options) {
        const optionList = options && options.length ? options : [];
        const items = this._items;
        let i;
        const ii = optionList.length;
        const params = this._params;
        const theme = params.themeManager.theme("legend");
        for (i = items.length; i < ii; ++i) {
            items[i] = new Legend(params)
        }
        for (i = items.length - 1; i >= ii; --i) {
            items[i].dispose();
            items.splice(i, 1)
        }
        params.layoutControl.suspend();
        for (i = 0; i < ii; ++i) {
            items[i].setOptions(_extend(true, {}, theme, optionList[i]))
        }
        params.layoutControl.resume()
    }
};
