/**
 * DevExtreme (esm/__internal/scheduler/r1/components/wrappers/date_table_month.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../../../core/component_registrator";
import {
    DateTableMonth
} from "../month/date_table_month";
import {
    DateTableComponent
} from "./date_table";
export class DateTableMonthComponent extends DateTableComponent {
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: ["cellTemplate", "dataCellTemplate"],
            props: ["viewData", "viewContext", "cellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "bottomVirtualRowHeight", "addDateTableClass", "addVerticalSizesClassToRows", "width", "dataCellTemplate"]
        }
    }
    get _viewComponent() {
        return DateTableMonth
    }
}
registerComponent("dxMonthDateTableLayout", DateTableMonthComponent);
