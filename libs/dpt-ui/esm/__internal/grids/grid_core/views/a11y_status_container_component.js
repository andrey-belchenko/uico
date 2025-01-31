/**
 * DevExtreme (esm/__internal/grids/grid_core/views/a11y_status_container_component.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
const CLASSES = {
    container: "dx-gridbase-a11y-status-container"
};
export const A11yStatusContainerComponent = _ref => {
    let {
        statusText: statusText
    } = _ref;
    return $("<div>").text(statusText ?? "").addClass(CLASSES.container).attr("role", "status")
};
