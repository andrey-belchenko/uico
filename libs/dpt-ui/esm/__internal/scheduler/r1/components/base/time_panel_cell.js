/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/time_panel_cell.js)
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
    CellBase,
    CellBaseDefaultProps
} from "./cell";
export class TimePanelCell extends BaseInfernoComponent {
    constructor() {
        super(...arguments);
        this.timeCellTemplateProps = null
    }
    getTimeCellTemplateProps() {
        if (null !== this.timeCellTemplateProps) {
            return this.timeCellTemplateProps
        }
        const {
            groupIndex: groupIndex,
            groups: groups,
            index: index,
            startDate: startDate,
            text: text
        } = this.props;
        this.timeCellTemplateProps = {
            data: {
                date: startDate,
                groups: groups,
                groupIndex: groupIndex,
                text: text
            },
            index: index
        };
        return this.timeCellTemplateProps
    }
    componentWillUpdate(nextProps) {
        if (this.props.groupIndex !== nextProps.groupIndex || this.props.groups !== nextProps.groups || this.props.index !== nextProps.index || this.props.startDate !== nextProps.startDate || this.props.text !== nextProps.text) {
            this.timeCellTemplateProps = null
        }
    }
    render() {
        const {
            className: className,
            viewContext: viewContext,
            highlighted: highlighted,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            text: text,
            timeCellTemplate: timeCellTemplate
        } = this.props;
        const cellSizeVerticalClass = renderUtils.getCellSizeVerticalClass(false);
        const classes = renderUtils.combineClasses({
            "dx-scheduler-time-panel-cell": true,
            [cellSizeVerticalClass]: true,
            "dx-scheduler-time-panel-current-time-cell": !!highlighted,
            [className ?? ""]: true
        });
        const timeCellTemplateProps = this.getTimeCellTemplateProps();
        const TimeCellTemplateComponent = getTemplate(timeCellTemplate);
        return createComponentVNode(2, CellBase, {
            className: classes,
            viewContext: viewContext,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            startDate: CellBaseDefaultProps.startDate,
            endDate: CellBaseDefaultProps.endDate,
            index: CellBaseDefaultProps.index,
            children: TimeCellTemplateComponent ? TimeCellTemplateComponent({
                index: timeCellTemplateProps.index,
                data: timeCellTemplateProps.data
            }) : createVNode(1, "div", null, text, 0)
        })
    }
}
TimePanelCell.defaultProps = CellBaseDefaultProps;
