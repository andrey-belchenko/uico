/**
 * DevExtreme (esm/__internal/grids/pivot_grid/field_chooser/utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    SORT_ORDER
} from "./const";
export const reverseSortOrder = sortOrder => sortOrder === SORT_ORDER.descending ? SORT_ORDER.ascending : SORT_ORDER.descending;
