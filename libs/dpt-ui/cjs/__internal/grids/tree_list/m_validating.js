/**
 * DevExtreme (cjs/__internal/grids/tree_list/m_validating.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _m_validating = require("../../grids/grid_core/validating/m_validating");
var _m_core = _interopRequireDefault(require("./m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const editingControllerExtender = Base => class extends(_m_validating.validatingModule.extenders.controllers.editing(Base)) {
    processDataItem(item) {
        super.processDataItemTreeListHack.apply(this, arguments)
    }
    processItems(items, e) {
        return super.processItemsTreeListHack.apply(this, arguments)
    }
};
_m_core.default.registerModule("validating", {
    defaultOptions: _m_validating.validatingModule.defaultOptions,
    controllers: _m_validating.validatingModule.controllers,
    extenders: {
        controllers: {
            editing: editingControllerExtender,
            editorFactory: _m_validating.validatingModule.extenders.controllers.editorFactory
        },
        views: _m_validating.validatingModule.extenders.views
    }
});
