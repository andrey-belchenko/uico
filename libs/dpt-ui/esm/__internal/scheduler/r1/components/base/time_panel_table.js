/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/time_panel_table.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["timePanelData", "viewContext", "tableRef", "timeCellTemplate"];
import {
    createFragment,
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
    Fragment
} from "inferno";
import {
    AllDayPanelTitle
} from "./all_day_panel_title";
import {
    CellBase,
    CellBaseDefaultProps
} from "./cell";
import {
    Row,
    RowDefaultProps
} from "./row";
import {
    Table
} from "./table";
import {
    TimePanelCell
} from "./time_panel_cell";
export const TimePanelTableDefaultProps = {
    timePanelData: {
        groupedData: [],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        topVirtualRowCount: 0,
        bottomVirtualRowCount: 0
    }
};
export class TimePanelTable extends InfernoWrapperComponent {
    createEffects() {
        return [createReRenderEffect()]
    }
    render() {
        const _this$props = this.props,
            {
                timePanelData: timePanelData,
                viewContext: viewContext,
                tableRef: tableRef,
                timeCellTemplate: timeCellTemplate
            } = _this$props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        const {
            topVirtualRowHeight: topVirtualRowHeight,
            bottomVirtualRowHeight: bottomVirtualRowHeight
        } = timePanelData;
        const TimeCellTemplateComponent = getTemplate(timeCellTemplate);
        return normalizeProps(createComponentVNode(2, Table, _extends({}, restProps, {
            className: "dx-scheduler-time-panel",
            topVirtualRowHeight: topVirtualRowHeight ?? 0,
            bottomVirtualRowHeight: bottomVirtualRowHeight ?? 0,
            virtualCellsCount: 1,
            tableRef: tableRef,
            children: timePanelData.groupedData.map((_ref => {
                let {
                    dateTable: dateTable,
                    groupIndex: groupIndex,
                    isGroupedAllDayPanel: isGroupedAllDayPanel,
                    key: fragmentKey
                } = _ref;
                return createFragment([isGroupedAllDayPanel && createComponentVNode(2, Row, {
                    leftVirtualCellWidth: RowDefaultProps.leftVirtualCellWidth,
                    rightVirtualCellWidth: RowDefaultProps.rightVirtualCellWidth,
                    children: createComponentVNode(2, CellBase, {
                        className: "dx-scheduler-time-panel-title-cell",
                        viewContext: viewContext,
                        startDate: CellBaseDefaultProps.startDate,
                        endDate: CellBaseDefaultProps.endDate,
                        index: CellBaseDefaultProps.index,
                        children: createComponentVNode(2, AllDayPanelTitle)
                    })
                }), dateTable.map((_ref2 => {
                    let {
                        groups: groups,
                        highlighted: highlighted,
                        index: cellIndex,
                        isFirstGroupCell: isFirstGroupCell,
                        isLastGroupCell: isLastGroupCell,
                        key: key,
                        startDate: startDate,
                        text: text
                    } = _ref2;
                    return createComponentVNode(2, Row, {
                        className: "dx-scheduler-time-panel-row",
                        leftVirtualCellWidth: RowDefaultProps.leftVirtualCellWidth,
                        rightVirtualCellWidth: RowDefaultProps.rightVirtualCellWidth,
                        children: createComponentVNode(2, TimePanelCell, {
                            viewContext: viewContext,
                            startDate: startDate,
                            endDate: CellBaseDefaultProps.endDate,
                            text: text,
                            groups: groups,
                            groupIndex: groupIndex,
                            isFirstGroupCell: isFirstGroupCell,
                            isLastGroupCell: isLastGroupCell,
                            index: cellIndex,
                            timeCellTemplate: TimeCellTemplateComponent,
                            highlighted: highlighted
                        })
                    }, key)
                }))], 0, fragmentKey)
            }))
        })))
    }
}
TimePanelTable.defaultProps = TimePanelTableDefaultProps;
