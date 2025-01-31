/**
 * DevExtreme (esm/__internal/grids/tree_list/m_widget_base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import "./module_not_extended/column_headers";
import "./m_columns_controller";
import "./data_controller/m_data_controller";
import "./module_not_extended/sorting";
import "./rows/m_rows";
import "./module_not_extended/context_menu";
import "./module_not_extended/error_handling";
import "./m_grid_view";
import "./module_not_extended/header_panel";
import registerComponent from "../../../core/component_registrator";
import {
    isDefined
} from "../../../core/utils/type";
import {
    isMaterialBased
} from "../../../ui/themes";
import gridCoreUtils from "../../grids/grid_core/m_utils";
import GridCoreWidget from "../../grids/grid_core/m_widget_base";
import treeListCore from "./m_core";
const TREELIST_CLASS = "dx-treelist";
treeListCore.registerModulesOrder(["stateStoring", "columns", "selection", "editorFactory", "columnChooser", "editingRowBased", "editingFormBased", "editingCellBased", "editing", "grouping", "masterDetail", "validating", "adaptivity", "data", "virtualScrolling", "columnHeaders", "filterRow", "headerPanel", "headerFilter", "sorting", "search", "rows", "pager", "columnsResizingReordering", "contextMenu", "keyboardNavigation", "errorHandling", "summary", "columnFixing", "export", "gridView"]);
class TreeList extends GridCoreWidget {
    _initMarkup() {
        super._initMarkup.apply(this, arguments);
        this.$element().addClass("dx-treelist");
        this.getView("gridView").render(this.$element())
    }
    static registerModule() {
        treeListCore.registerModule.apply(treeListCore, arguments)
    }
    _defaultOptionsRules() {
        return super._defaultOptionsRules().concat([{
            device: () => isMaterialBased(),
            options: {
                showRowLines: true,
                showColumnLines: false,
                headerFilter: {
                    height: 315
                },
                editing: {
                    useIcons: true
                }
            }
        }])
    }
    _init() {
        super._init();
        if (!this.option("_disableDeprecationWarnings")) {
            gridCoreUtils.logHeaderFilterDeprecatedWarningIfNeed(this)
        }
        treeListCore.processModules(this, treeListCore);
        treeListCore.callModuleItemsMethod(this, "init")
    }
    getGridCoreHelper() {
        return treeListCore
    }
    focus(element) {
        super.focus();
        if (isDefined(element)) {
            this.getController("keyboardNavigation").focus(element)
        }
    }
}
registerComponent("dxTreeList", TreeList);
export default TreeList;
