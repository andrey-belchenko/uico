/**
 * DevExtreme (esm/__internal/grids/data_grid/m_data_controller.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import errors from "../../../ui/widget/ui.errors";
import {
    DataController,
    dataControllerModule
} from "../../grids/grid_core/data_controller/m_data_controller";
import gridCore from "./m_core";
import dataSourceAdapterProvider from "./m_data_source_adapter";
class DataGridDataController extends DataController {
    _getDataSourceAdapter() {
        return dataSourceAdapterProvider
    }
    _getSpecificDataSourceOption() {
        const dataSource = this.option("dataSource");
        if (dataSource && !Array.isArray(dataSource) && this.option("keyExpr")) {
            errors.log("W1011")
        }
        return super._getSpecificDataSourceOption()
    }
}
export {
    DataGridDataController as DataController
};
gridCore.registerModule("data", {
    defaultOptions: dataControllerModule.defaultOptions,
    controllers: {
        data: DataGridDataController
    }
});
