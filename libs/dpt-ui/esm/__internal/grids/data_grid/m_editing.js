/**
 * DevExtreme (esm/__internal/grids/data_grid/m_editing.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import "./module_not_extended/editor_factory";
import {
    dataControllerEditingExtenderMixin,
    editingModule
} from "../../grids/grid_core/editing/m_editing";
import gridCore from "./m_core";
const data = Base => class extends(dataControllerEditingExtenderMixin(Base)) {
    _changeRowExpandCore(key) {
        const editingController = this._editingController;
        if (Array.isArray(key)) {
            editingController && editingController.refresh()
        }
        return super._changeRowExpandCore.apply(this, arguments)
    }
};
gridCore.registerModule("editing", _extends({}, editingModule, {
    extenders: _extends({}, editingModule.extenders, {
        controllers: _extends({}, editingModule.extenders.controllers, {
            data: data
        })
    })
}));
