/**
 * DevExtreme (esm/__internal/scheduler/r1/components/wrappers/all_day_table.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../../../core/component_registrator";
import {
    AllDayTable
} from "../../../../scheduler/r1/components/base/all_day_panel_table";
import {
    DateTableComponent
} from "./date_table";
export class AllDayTableComponent extends DateTableComponent {
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: ["dataCellTemplate"],
            props: ["viewData", "viewContext", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "bottomVirtualRowHeight", "addDateTableClass", "addVerticalSizesClassToRows", "width", "dataCellTemplate"]
        }
    }
    get _viewComponent() {
        return AllDayTable
    }
}
registerComponent("dxAllDayTable", AllDayTableComponent);
