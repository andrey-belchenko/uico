/**
 * DevExtreme (esm/__internal/grids/tree_list/m_focus.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    Deferred
} from "../../../core/utils/deferred";
import {
    focusModule
} from "../../grids/grid_core/focus/m_focus";
import core from "./m_core";

function findIndex(items, callback) {
    let result = -1;
    items.forEach(((node, index) => {
        if (callback(node)) {
            result = index
        }
    }));
    return result
}
const data = Base => class extends(focusModule.extenders.controllers.data(Base)) {
    changeRowExpand(key) {
        if (this.option("focusedRowEnabled") && this.isRowExpanded(key)) {
            if (this._isFocusedRowInside(key)) {
                this.option("focusedRowKey", key)
            }
        }
        return super.changeRowExpand.apply(this, arguments)
    }
    _isFocusedRowInside(parentKey) {
        const focusedRowKey = this.option("focusedRowKey");
        const rowIndex = this.getRowIndexByKey(focusedRowKey);
        const focusedRow = rowIndex >= 0 && this.getVisibleRows()[rowIndex];
        let parent = focusedRow && focusedRow.node.parent;
        while (parent) {
            if (parent.key === parentKey) {
                return true
            }
            parent = parent.parent
        }
        return false
    }
    getParentKey(key) {
        const dataSource = this._dataSource;
        const node = this.getNodeByKey(key);
        const d = new Deferred;
        if (node) {
            d.resolve(node.parent ? node.parent.key : void 0)
        } else {
            dataSource.load({
                filter: [dataSource.getKeyExpr(), "=", key]
            }).done((items => {
                const parentData = items[0];
                if (parentData) {
                    d.resolve(dataSource.parentKeyOf(parentData))
                } else {
                    d.resolve()
                }
            })).fail(d.reject)
        }
        return d.promise()
    }
    expandAscendants(key) {
        const that = this;
        const dataSource = that._dataSource;
        const d = new Deferred;
        that.getParentKey(key).done((parentKey => {
            if (dataSource && void 0 !== parentKey && parentKey !== that.option("rootValue")) {
                dataSource._isNodesInitializing = true;
                that.expandRow(parentKey);
                dataSource._isNodesInitializing = false;
                that.expandAscendants(parentKey).done(d.resolve).fail(d.reject)
            } else {
                d.resolve()
            }
        })).fail(d.reject);
        return d.promise()
    }
    getPageIndexByKey(key) {
        const that = this;
        const dataSource = that._dataSource;
        const d = new Deferred;
        that.expandAscendants(key).done((() => {
            dataSource.load({
                parentIds: []
            }).done((nodes => {
                const offset = findIndex(nodes, (node => that.keyOf(node.data) === key));
                let pageIndex = -1;
                if (offset >= 0) {
                    pageIndex = Math.floor(offset / that.pageSize())
                }
                d.resolve(pageIndex)
            })).fail(d.reject)
        })).fail(d.reject);
        return d.promise()
    }
};
core.registerModule("focus", _extends({}, focusModule, {
    extenders: _extends({}, focusModule.extenders, {
        controllers: _extends({}, focusModule.extenders.controllers, {
            data: data
        })
    })
}));
