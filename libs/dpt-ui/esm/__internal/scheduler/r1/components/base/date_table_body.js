/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/date_table_body.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    createFragment,
    createComponentVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    Fragment
} from "inferno";
import {
    renderUtils
} from "../../utils/index";
import {
    DATE_TABLE_ROW_CLASS
} from "../const";
import {
    AllDayPanelTableBody,
    AllDayPanelTableBodyDefaultProps
} from "./all_day_panel_table_body";
import {
    DateTableCellBase
} from "./date_table_cell_base";
import {
    LayoutDefaultProps
} from "./layout_props";
import {
    Row,
    RowDefaultProps
} from "./row";
export const DateTableBodyDefaultProps = _extends({}, LayoutDefaultProps, {
    cellTemplate: DateTableCellBase
});
export class DateTableBody extends BaseInfernoComponent {
    render() {
        const {
            viewData: viewData,
            viewContext: viewContext,
            addVerticalSizesClassToRows: addVerticalSizesClassToRows,
            cellTemplate: cellTemplate,
            dataCellTemplate: dataCellTemplate
        } = this.props;
        const rowClasses = renderUtils.combineClasses({
            [DATE_TABLE_ROW_CLASS]: true,
            "dx-scheduler-cell-sizes-vertical": addVerticalSizesClassToRows
        });
        const CellTemplateComponent = getTemplate(cellTemplate);
        const DataCellTemplateComponent = getTemplate(dataCellTemplate);
        return createFragment(viewData.groupedData.map((_ref => {
            let {
                allDayPanel: allDayPanel,
                dateTable: dateTable,
                isGroupedAllDayPanel: isGroupedAllDayPanel,
                key: fragmentKey
            } = _ref;
            return createFragment([isGroupedAllDayPanel && createComponentVNode(2, AllDayPanelTableBody, {
                viewData: allDayPanel ?? AllDayPanelTableBodyDefaultProps.viewData,
                viewContext: viewContext,
                dataCellTemplate: DataCellTemplateComponent,
                isVerticalGroupOrientation: true,
                leftVirtualCellWidth: viewData.leftVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
                rightVirtualCellWidth: viewData.rightVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
                leftVirtualCellCount: viewData.leftVirtualCellCount,
                rightVirtualCellCount: viewData.rightVirtualCellCount
            }), dateTable.map((_ref2 => {
                let {
                    cells: cells,
                    key: rowKey
                } = _ref2;
                return createComponentVNode(2, Row, {
                    className: rowClasses,
                    leftVirtualCellWidth: viewData.leftVirtualCellWidth ?? RowDefaultProps.leftVirtualCellWidth,
                    rightVirtualCellWidth: viewData.rightVirtualCellWidth ?? RowDefaultProps.rightVirtualCellWidth,
                    leftVirtualCellCount: viewData.leftVirtualCellCount,
                    rightVirtualCellCount: viewData.rightVirtualCellCount,
                    children: cells.map((_ref3 => {
                        let {
                            key: cellKey,
                            endDate: endDate,
                            firstDayOfMonth: firstDayOfMonth,
                            groupIndex: cellGroupIndex,
                            groups: groups,
                            index: cellIndex,
                            isFirstGroupCell: isFirstGroupCell,
                            isFocused: isFocused,
                            isLastGroupCell: isLastGroupCell,
                            isSelected: isSelected,
                            otherMonth: otherMonth,
                            startDate: startDate,
                            text: text,
                            today: today
                        } = _ref3;
                        return CellTemplateComponent({
                            key: cellKey,
                            viewContext: viewContext,
                            isFirstGroupCell: isFirstGroupCell,
                            isLastGroupCell: isLastGroupCell,
                            startDate: startDate,
                            endDate: endDate,
                            groups: groups,
                            groupIndex: cellGroupIndex,
                            index: cellIndex,
                            dataCellTemplate: DataCellTemplateComponent,
                            text: text,
                            today: today,
                            otherMonth: otherMonth,
                            firstDayOfMonth: firstDayOfMonth,
                            isSelected: isSelected,
                            isFocused: isFocused
                        })
                    }))
                }, rowKey)
            }))], 0, fragmentKey)
        })), 0)
    }
}
DateTableBody.defaultProps = DateTableBodyDefaultProps;
