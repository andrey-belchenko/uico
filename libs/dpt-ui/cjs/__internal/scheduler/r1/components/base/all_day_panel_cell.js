/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/all_day_panel_cell.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AllDayPanelCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _const = require("../const");
var _date_table_cell_base = require("./date_table_cell_base");
class AllDayPanelCell extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            className: className,
            viewContext: viewContext,
            dataCellTemplate: dataCellTemplate,
            endDate: endDate,
            groupIndex: groupIndex,
            groups: groups,
            index: index,
            isFirstGroupCell: isFirstGroupCell,
            isFocused: isFocused,
            isLastGroupCell: isLastGroupCell,
            isSelected: isSelected,
            startDate: startDate
        } = this.props;
        const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
        return (0, _inferno.createComponentVNode)(2, _date_table_cell_base.DateTableCellBase, {
            className: `${_const.ALL_DAY_PANEL_CELL_CLASS} ${className}`,
            viewContext: viewContext,
            startDate: startDate,
            endDate: endDate,
            groups: groups,
            groupIndex: groupIndex,
            allDay: true,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            index: index,
            dataCellTemplate: DataCellTemplateComponent,
            isSelected: isSelected,
            isFocused: isFocused
        })
    }
}
exports.AllDayPanelCell = AllDayPanelCell;
AllDayPanelCell.defaultProps = _date_table_cell_base.DateTableCallBaseDefaultProps;
