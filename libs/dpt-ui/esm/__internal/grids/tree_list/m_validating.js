/**
 * DevExtreme (esm/__internal/grids/tree_list/m_validating.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    validatingModule
} from "../../grids/grid_core/validating/m_validating";
import treeListCore from "./m_core";
const editingControllerExtender = Base => class extends(validatingModule.extenders.controllers.editing(Base)) {
    processDataItem(item) {
        super.processDataItemTreeListHack.apply(this, arguments)
    }
    processItems(items, e) {
        return super.processItemsTreeListHack.apply(this, arguments)
    }
};
treeListCore.registerModule("validating", {
    defaultOptions: validatingModule.defaultOptions,
    controllers: validatingModule.controllers,
    extenders: {
        controllers: {
            editing: editingControllerExtender,
            editorFactory: validatingModule.extenders.controllers.editorFactory
        },
        views: validatingModule.extenders.views
    }
});
