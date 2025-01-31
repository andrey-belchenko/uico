/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/all_day_panel_table.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    createComponentVNode
} from "inferno";
import {
    createReRenderEffect,
    InfernoWrapperComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    DefaultSizes
} from "../const";
import {
    AllDayPanelTableBody,
    AllDayPanelTableBodyDefaultProps
} from "./all_day_panel_table_body";
import {
    LayoutDefaultProps
} from "./layout_props";
import {
    Table
} from "./table";
export class AllDayTable extends InfernoWrapperComponent {
    constructor() {
        super(...arguments);
        this.allDayPanelData = null
    }
    createEffects() {
        return [createReRenderEffect()]
    }
    getAllDayPanelData() {
        if (null !== this.allDayPanelData) {
            return this.allDayPanelData
        }
        this.allDayPanelData = this.props.viewData.groupedData[0].allDayPanel;
        return this.allDayPanelData
    }
    componentWillUpdate(nextProps) {
        super.componentWillUpdate();
        if (this.props.viewData !== nextProps.viewData) {
            this.allDayPanelData = null
        }
    }
    render() {
        const {
            viewData: viewData,
            viewContext: viewContext,
            width: width,
            tableRef: tableRef,
            dataCellTemplate: dataCellTemplate
        } = this.props;
        const allDayPanelData = this.getAllDayPanelData();
        const DataCellTemplateComponent = getTemplate(dataCellTemplate);
        return createComponentVNode(2, Table, {
            className: "dx-scheduler-all-day-table",
            height: allDayPanelData ? void 0 : DefaultSizes.allDayPanelHeight,
            width: width,
            tableRef: tableRef,
            children: createComponentVNode(2, AllDayPanelTableBody, {
                viewData: allDayPanelData ?? AllDayPanelTableBodyDefaultProps.viewData,
                viewContext: viewContext,
                leftVirtualCellWidth: viewData.leftVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
                rightVirtualCellWidth: viewData.rightVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
                leftVirtualCellCount: viewData.leftVirtualCellCount,
                rightVirtualCellCount: viewData.rightVirtualCellCount,
                dataCellTemplate: DataCellTemplateComponent
            })
        })
    }
}
AllDayTable.defaultProps = LayoutDefaultProps;
