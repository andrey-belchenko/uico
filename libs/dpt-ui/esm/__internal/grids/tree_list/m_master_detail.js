/**
 * DevExtreme (esm/__internal/grids/tree_list/m_master_detail.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import {
    dataMasterDetailExtenderMixin,
    masterDetailModule
} from "../../grids/grid_core/master_detail/m_master_detail";
import treeListCore from "./m_core";
const data = Base => class extends(dataMasterDetailExtenderMixin(Base)) {
    isRowExpanded() {
        return this.isRowExpandedHack.apply(this, arguments)
    }
    _processItems() {
        return this._processItemsHack.apply(this, arguments)
    }
    _processDataItem() {
        return this._processDataItemHack.apply(this, arguments)
    }
};
treeListCore.registerModule("masterDetail", extend(true, {}, masterDetailModule, {
    extenders: {
        controllers: {
            data: data
        }
    }
}));
