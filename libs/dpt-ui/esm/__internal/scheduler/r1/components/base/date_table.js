/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/date_table.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["viewData", "viewContext", "tableRef", "addDateTableClass", "width", "cellTemplate", "dataCellTemplate", "groupOrientation", "addVerticalSizesClassToRows"];
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
    DateTableBody,
    DateTableBodyDefaultProps
} from "./date_table_body";
import {
    DateTableCellBase
} from "./date_table_cell_base";
import {
    LayoutDefaultProps
} from "./layout_props";
import {
    Table
} from "./table";
export const DateTableDefaultProps = _extends({}, LayoutDefaultProps, {
    cellTemplate: DateTableCellBase
});
export class DateTable extends InfernoWrapperComponent {
    createEffects() {
        return [createReRenderEffect()]
    }
    render() {
        const _this$props = this.props,
            {
                viewData: viewData,
                viewContext: viewContext,
                tableRef: tableRef,
                addDateTableClass: addDateTableClass,
                width: width,
                cellTemplate: cellTemplate,
                dataCellTemplate: dataCellTemplate,
                groupOrientation: groupOrientation,
                addVerticalSizesClassToRows: addVerticalSizesClassToRows
            } = _this$props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        const classes = addDateTableClass ? "dx-scheduler-date-table" : void 0;
        const topVirtualRowHeight = viewData.topVirtualRowHeight ?? 0;
        const bottomVirtualRowHeight = viewData.bottomVirtualRowHeight ?? 0;
        const leftVirtualCellWidth = viewData.leftVirtualCellWidth ?? 0;
        const rightVirtualCellWidth = viewData.rightVirtualCellWidth ?? 0;
        const virtualCellsCount = viewData.groupedData[0].dateTable[0].cells.length;
        const CellTemplateComponent = getTemplate(cellTemplate);
        const DataCellTemplateComponent = getTemplate(dataCellTemplate);
        return normalizeProps(createComponentVNode(2, Table, _extends({}, restProps, {
            tableRef: tableRef,
            topVirtualRowHeight: topVirtualRowHeight,
            bottomVirtualRowHeight: bottomVirtualRowHeight,
            leftVirtualCellWidth: leftVirtualCellWidth,
            rightVirtualCellWidth: rightVirtualCellWidth,
            leftVirtualCellCount: viewData.leftVirtualCellCount,
            rightVirtualCellCount: viewData.rightVirtualCellCount,
            virtualCellsCount: virtualCellsCount,
            className: classes,
            width: width,
            children: createComponentVNode(2, DateTableBody, {
                viewData: viewData,
                viewContext: viewContext,
                cellTemplate: CellTemplateComponent,
                dataCellTemplate: DataCellTemplateComponent,
                leftVirtualCellWidth: leftVirtualCellWidth,
                rightVirtualCellWidth: rightVirtualCellWidth,
                groupOrientation: groupOrientation,
                addVerticalSizesClassToRows: addVerticalSizesClassToRows,
                topVirtualRowHeight: DateTableBodyDefaultProps.topVirtualRowHeight,
                bottomVirtualRowHeight: DateTableBodyDefaultProps.bottomVirtualRowHeight,
                addDateTableClass: DateTableBodyDefaultProps.addDateTableClass
            })
        })))
    }
}
DateTable.defaultProps = DateTableDefaultProps;
