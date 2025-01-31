/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/base/group_panel_horizontal_cell.js)
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
exports.GroupPanelHorizontalCellDefaultProps = exports.GroupPanelHorizontalCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@dpt-ui/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _group_panel_props = require("./group_panel_props");

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const GroupPanelHorizontalCellDefaultProps = exports.GroupPanelHorizontalCellDefaultProps = _extends({}, _group_panel_props.GroupPanelCellDefaultProps, {
    isFirstGroupCell: false,
    isLastGroupCell: false,
    colSpan: 1
});
class GroupPanelHorizontalCell extends _inferno2.BaseInfernoComponent {
    render() {
        const {
            cellTemplate: cellTemplate,
            colSpan: colSpan,
            color: color,
            data: data,
            id: id,
            index: index,
            text: text,
            className: className,
            isFirstGroupCell: isFirstGroupCell,
            isLastGroupCell: isLastGroupCell
        } = this.props;
        const classes = _index2.renderUtils.combineClasses({
            "dx-scheduler-group-header": true,
            "dx-scheduler-first-group-cell": isFirstGroupCell,
            "dx-scheduler-last-group-cell": isLastGroupCell,
            [className ?? ""]: !!className
        });
        const CellTemplateComponent = (0, _index.getTemplate)(cellTemplate);
        return (0, _inferno.createVNode)(1, "th", classes, (0, _inferno.createVNode)(1, "div", "dx-scheduler-group-header-content", CellTemplateComponent ? CellTemplateComponent({
            data: {
                data: data,
                id: id,
                color: color,
                text: text
            },
            index: index
        }) : (0, _inferno.createVNode)(1, "div", null, text, 0), 0), 2, {
            colSpan: colSpan
        })
    }
}
exports.GroupPanelHorizontalCell = GroupPanelHorizontalCell;
GroupPanelHorizontalCell.defaultProps = GroupPanelHorizontalCellDefaultProps;
