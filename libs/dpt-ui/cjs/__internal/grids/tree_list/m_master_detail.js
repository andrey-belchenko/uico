/**
 * DevExtreme (cjs/__internal/grids/tree_list/m_master_detail.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _extend = require("../../../core/utils/extend");
var _m_master_detail = require("../../grids/grid_core/master_detail/m_master_detail");
var _m_core = _interopRequireDefault(require("./m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const data = Base => class extends((0, _m_master_detail.dataMasterDetailExtenderMixin)(Base)) {
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
_m_core.default.registerModule("masterDetail", (0, _extend.extend)(true, {}, _m_master_detail.masterDetailModule, {
    extenders: {
        controllers: {
            data: data
        }
    }
}));
