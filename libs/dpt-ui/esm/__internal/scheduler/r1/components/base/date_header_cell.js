/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/date_header_cell.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    createVNode,
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
    renderUtils
} from "../../utils/index";
import {
    CellBaseDefaultProps
} from "./cell";
import {
    DateHeaderText
} from "./date_header_text";
export const DateHeaderCellDefaultProps = _extends({}, CellBaseDefaultProps, {
    today: false,
    colSpan: 1,
    isWeekDayCell: false,
    splitText: false,
    isTimeCellTemplate: false
});
export class DateHeaderCell extends BaseInfernoComponent {
    render() {
        const {
            viewContext: {
                view: {
                    type: viewType
                },
                crossScrollingEnabled: crossScrollingEnabled
            },
            colSpan: colSpan,
            dateCellTemplate: dateCellTemplate,
            groupIndex: groupIndex,
            groups: groups,
            index: index,
            isTimeCellTemplate: isTimeCellTemplate,
            splitText: splitText,
            startDate: startDate,
            text: text,
            timeCellTemplate: timeCellTemplate,
            className: className,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            isWeekDayCell: isWeekDayCell,
            today: today
        } = this.props;
        const cellSizeHorizontalClass = renderUtils.getCellSizeHorizontalClass(viewType, crossScrollingEnabled);
        const cellClasses = renderUtils.combineClasses({
            "dx-scheduler-header-panel-cell": true,
            [cellSizeHorizontalClass]: true,
            "dx-scheduler-header-panel-current-time-cell": today,
            "dx-scheduler-header-panel-week-cell": isWeekDayCell,
            [className ?? ""]: !!className
        });
        const classes = renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, cellClasses);
        const useTemplate = !isTimeCellTemplate && !!dateCellTemplate || isTimeCellTemplate && !!timeCellTemplate;
        const TimeCellTemplateComponent = getTemplate(timeCellTemplate);
        const DateCellTemplateComponent = getTemplate(dateCellTemplate);
        const children = useTemplate ? createFragment([isTimeCellTemplate && TimeCellTemplateComponent && TimeCellTemplateComponent({
            data: {
                date: startDate,
                text: text,
                groups: groups,
                groupIndex: groupIndex
            },
            index: index
        }), !isTimeCellTemplate && DateCellTemplateComponent && DateCellTemplateComponent({
            data: {
                date: startDate,
                text: text,
                groups: groups,
                groupIndex: groupIndex
            },
            index: index
        })], 0) : createComponentVNode(2, DateHeaderText, {
            splitText: splitText,
            text: text
        });
        return createVNode(1, "th", classes, children, 0, {
            colSpan: colSpan,
            title: text
        })
    }
}
DateHeaderCell.defaultProps = DateHeaderCellDefaultProps;
