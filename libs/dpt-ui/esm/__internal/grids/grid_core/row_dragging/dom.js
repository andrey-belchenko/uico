/**
 * DevExtreme (esm/__internal/grids/grid_core/row_dragging/dom.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import gridCoreUtils from "../m_utils";
import {
    CLASSES
} from "./const";
const createHandleTemplateFunc = addWidgetPrefix => (container, options) => {
    const $container = $(container);
    if ("data" === options.rowType) {
        $container.addClass(CLASSES.cellFocusDisabled);
        return $("<span>").addClass(addWidgetPrefix(CLASSES.handleIcon))
    }
    gridCoreUtils.setEmptyText($container);
    return
};
export const GridCoreRowDraggingDom = {
    createHandleTemplateFunc: createHandleTemplateFunc
};
