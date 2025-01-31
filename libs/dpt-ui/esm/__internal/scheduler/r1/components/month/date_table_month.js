/**
 * DevExtreme (esm/__internal/scheduler/r1/components/month/date_table_month.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["viewData", "viewContext", "addDateTableClass", "addVerticalSizesClassToRows", "dataCellTemplate", "groupOrientation", "tableRef", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    createReRenderEffect,
    InfernoWrapperComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    DateTable,
    DateTableDefaultProps
} from "../base/date_table";
import {
    DateTableMonthCell
} from "./date_table_month_cell";
export class DateTableMonth extends InfernoWrapperComponent {
    createEffects() {
        return [createReRenderEffect()]
    }
    render() {
        const _this$props = this.props,
            {
                viewData: viewData,
                viewContext: viewContext,
                addDateTableClass: addDateTableClass,
                addVerticalSizesClassToRows: addVerticalSizesClassToRows,
                dataCellTemplate: dataCellTemplate,
                groupOrientation: groupOrientation,
                tableRef: tableRef,
                width: width
            } = _this$props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        const DataCellTemplateComponent = getTemplate(dataCellTemplate);
        return normalizeProps(createComponentVNode(2, DateTable, _extends({}, restProps, {
            viewData: viewData,
            viewContext: viewContext,
            groupOrientation: groupOrientation,
            addDateTableClass: addDateTableClass,
            dataCellTemplate: DataCellTemplateComponent,
            cellTemplate: DateTableMonthCell,
            tableRef: tableRef,
            addVerticalSizesClassToRows: addVerticalSizesClassToRows,
            width: width
        })))
    }
}
DateTableMonth.defaultProps = DateTableDefaultProps;
