/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/month/date_table_month_cell.js)
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
exports.DateTableMonthCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _date_table_cell_base = require("../base/date_table_cell_base");
class DateTableMonthCell extends _inferno2.BaseInfernoComponent {
    constructor() {
        super(...arguments);
        this.contentTemplateProps = null
    }
    getContentTemplateProps() {
        if (null !== this.contentTemplateProps) {
            return this.contentTemplateProps
        }
        const {
            index: index,
            text: text
        } = this.props;
        this.contentTemplateProps = {
            data: {
                text: text
            },
            index: index
        };
        return this.contentTemplateProps
    }
    componentWillUpdate(nextProps) {
        if (this.props.index !== nextProps.index || this.props.text !== nextProps.text) {
            this.contentTemplateProps = null
        }
    }
    render() {
        const {
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
            startDate: startDate,
            text: text,
            className: className,
            firstDayOfMonth: firstDayOfMonth,
            otherMonth: otherMonth,
            today: today
        } = this.props;
        const classes = _index2.renderUtils.combineClasses({
            "dx-scheduler-date-table-other-month": !!otherMonth,
            "dx-scheduler-date-table-current-date": !!today,
            "dx-scheduler-date-table-first-of-month": !!firstDayOfMonth,
            [className ?? ""]: !!className
        });
        const contentTemplateProps = this.getContentTemplateProps();
        const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
        return (0, _inferno.createComponentVNode)(2, _date_table_cell_base.DateTableCellBase, {
            className: classes,
            viewContext: viewContext,
            dataCellTemplate: DataCellTemplateComponent,
            startDate: startDate,
            endDate: endDate,
            text: text,
            groups: groups,
            groupIndex: groupIndex,
            index: index,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            isSelected: isSelected,
            isFocused: isFocused,
            contentTemplateProps: contentTemplateProps,
            children: (0, _inferno.createVNode)(1, "div", "dx-scheduler-date-table-cell-text", text, 0)
        })
    }
}
exports.DateTableMonthCell = DateTableMonthCell;
DateTableMonthCell.defaultProps = _date_table_cell_base.DateTableCallBaseDefaultProps;
