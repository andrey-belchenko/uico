/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/time_panel_cell.js)
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
exports.TimePanelCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _cell = require("./cell");
class TimePanelCell extends _inferno2.BaseInfernoComponent {
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
        const cellSizeVerticalClass = _index2.renderUtils.getCellSizeVerticalClass(false);
        const classes = _index2.renderUtils.combineClasses({
            "dx-scheduler-time-panel-cell": true,
            [cellSizeVerticalClass]: true,
            "dx-scheduler-time-panel-current-time-cell": !!highlighted,
            [className ?? ""]: true
        });
        const timeCellTemplateProps = this.getTimeCellTemplateProps();
        const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
        return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
            className: classes,
            viewContext: viewContext,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell,
            startDate: _cell.CellBaseDefaultProps.startDate,
            endDate: _cell.CellBaseDefaultProps.endDate,
            index: _cell.CellBaseDefaultProps.index,
            children: TimeCellTemplateComponent ? TimeCellTemplateComponent({
                index: timeCellTemplateProps.index,
                data: timeCellTemplateProps.data
            }) : (0, _inferno.createVNode)(1, "div", null, text, 0)
        })
    }
}
exports.TimePanelCell = TimePanelCell;
TimePanelCell.defaultProps = _cell.CellBaseDefaultProps;
