/**
 * DevExtreme (esm/__internal/grids/data_grid/module_not_extended/virtual_scrolling.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    dataSourceAdapterExtender,
    virtualScrollingModule
} from "../../../grids/grid_core/virtual_scrolling/m_virtual_scrolling";
import gridCore from "../m_core";
import dataSourceAdapterProvider from "../m_data_source_adapter";
gridCore.registerModule("virtualScrolling", virtualScrollingModule);
dataSourceAdapterProvider.extend(dataSourceAdapterExtender);
