/**
 * DevExtreme (esm/__internal/scheduler/r1/components/month/date_table_month_cell.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    createVNode,
    createComponentVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    getTemplate
} from "../../../../core/r1/utils/index";
import {
    renderUtils
} from "../../utils/index";
import {
    DateTableCallBaseDefaultProps,
    DateTableCellBase
} from "../base/date_table_cell_base";
export class DateTableMonthCell extends BaseInfernoComponent {
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
        const classes = renderUtils.combineClasses({
            "dx-scheduler-date-table-other-month": !!otherMonth,
            "dx-scheduler-date-table-current-date": !!today,
            "dx-scheduler-date-table-first-of-month": !!firstDayOfMonth,
            [className ?? ""]: !!className
        });
        const contentTemplateProps = this.getContentTemplateProps();
        const DataCellTemplateComponent = getTemplate(dataCellTemplate);
        return createComponentVNode(2, DateTableCellBase, {
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
            children: createVNode(1, "div", "dx-scheduler-date-table-cell-text", text, 0)
        })
    }
}
DateTableMonthCell.defaultProps = DateTableCallBaseDefaultProps;
