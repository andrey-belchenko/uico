/**
 * DevExtreme (esm/__internal/grids/data_grid/m_widget_base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import "./module_not_extended/column_headers";
import "./m_columns_controller";
import "./m_data_controller";
import "./module_not_extended/sorting";
import "./module_not_extended/rows";
import "./module_not_extended/context_menu";
import "./module_not_extended/error_handling";
import "./module_not_extended/grid_view";
import "./module_not_extended/header_panel";
import registerComponent from "../../../core/component_registrator";
import $ from "../../../core/renderer";
import browser from "../../../core/utils/browser";
import {
    logger
} from "../../../core/utils/console";
import {
    extend
} from "../../../core/utils/extend";
import {
    isString
} from "../../../core/utils/type";
import {
    isMaterialBased
} from "../../../ui/themes";
import gridCoreUtils from "../../grids/grid_core/m_utils";
import GridCoreWidget from "../../grids/grid_core/m_widget_base";
import gridCore from "./m_core";
const DATAGRID_DEPRECATED_TEMPLATE_WARNING = "Specifying grid templates with the jQuery selector name is now deprecated. Use the DOM Node or the jQuery object that references this selector instead.";
gridCore.registerModulesOrder(["stateStoring", "columns", "selection", "editorFactory", "columnChooser", "grouping", "editing", "editingRowBased", "editingFormBased", "editingCellBased", "masterDetail", "validating", "adaptivity", "data", "virtualScrolling", "columnHeaders", "filterRow", "headerPanel", "headerFilter", "sorting", "search", "rows", "pager", "columnsResizingReordering", "contextMenu", "keyboardNavigation", "errorHandling", "summary", "columnFixing", "export", "gridView"]);
class DataGrid extends GridCoreWidget {
    _defaultOptionsRules() {
        return super._defaultOptionsRules().concat([{
            device: {
                platform: "ios"
            },
            options: {
                showRowLines: true
            }
        }, {
            device: () => isMaterialBased(),
            options: {
                showRowLines: true,
                showColumnLines: false,
                headerFilter: {
                    height: 315
                },
                editing: {
                    useIcons: true
                },
                selection: {
                    showCheckBoxesMode: "always"
                }
            }
        }, {
            device: () => browser.webkit,
            options: {
                loadingTimeout: 30,
                loadPanel: {
                    animation: {
                        show: {
                            easing: "cubic-bezier(1, 0, 1, 0)",
                            duration: 500,
                            from: {
                                opacity: 0
                            },
                            to: {
                                opacity: 1
                            }
                        }
                    }
                }
            }
        }, {
            device: device => "desktop" !== device.deviceType,
            options: {
                grouping: {
                    expandMode: "rowClick"
                }
            }
        }])
    }
    _init() {
        super._init();
        gridCoreUtils.logHeaderFilterDeprecatedWarningIfNeed(this);
        gridCore.processModules(this, gridCore);
        gridCore.callModuleItemsMethod(this, "init")
    }
    _initMarkup() {
        super._initMarkup.apply(this, arguments);
        this.getView("gridView").render(this.$element())
    }
    _setDeprecatedOptions() {
        super._setDeprecatedOptions();
        extend(this._deprecatedOptions, {
            useKeyboard: {
                since: "19.2",
                alias: "keyboardNavigation.enabled"
            },
            rowTemplate: {
                since: "21.2",
                message: 'Use the "dataRowTemplate" option instead'
            }
        })
    }
    static registerModule(name, module) {
        gridCore.registerModule(name, module)
    }
    getGridCoreHelper() {
        return gridCore
    }
    _getTemplate(templateName) {
        let template = templateName;
        if (isString(template) && template.startsWith("#")) {
            template = $(templateName);
            logger.warn(DATAGRID_DEPRECATED_TEMPLATE_WARNING)
        }
        return super._getTemplate(template)
    }
    focus(element) {
        this.getController("keyboardNavigation").focus(element)
    }
}
registerComponent("dxDataGrid", DataGrid);
export default DataGrid;
