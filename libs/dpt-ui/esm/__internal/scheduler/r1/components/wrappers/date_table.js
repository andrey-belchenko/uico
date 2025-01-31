/**
 * DevExtreme (esm/__internal/scheduler/r1/components/wrappers/date_table.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from "../../../../../core/component_registrator";
import {
    ComponentWrapper
} from "../../../../core/r1/index";
import {
    DateTable
} from "../base/date_table";
export class DateTableComponent extends ComponentWrapper {
    _setOptionsByReference() {
        super._setOptionsByReference();
        this._optionsByReference = _extends({}, this._optionsByReference, {
            dataCellTemplate: true
        })
    }
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
        return DateTable
    }
}
registerComponent("dxDateTableLayoutBase", DateTableComponent);
