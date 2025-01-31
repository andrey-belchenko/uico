/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_horizontal.js)
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
    GroupPanelHorizontalRow
} from "./group_panel_horizontal_row";
import {
    GroupPanelBaseDefaultProps
} from "./group_panel_props";
export class GroupPanelHorizontal extends BaseInfernoComponent {
    constructor() {
        super(...arguments);
        this._groupPanelItems = null
    }
    getGroupPanelItems() {
        if (null !== this._groupPanelItems) {
            return this._groupPanelItems
        }
        const {
            groupPanelData: {
                baseColSpan: baseColSpan,
                groupPanelItems: groupPanelItems
            }
        } = this.props;
        const colSpans = groupPanelItems.reduceRight(((currentColSpans, groupsRow, idx) => {
            const nextColSpans = currentColSpans;
            const currentLevelGroupCount = groupsRow.length;
            const previousColSpan = idx === groupPanelItems.length - 1 ? baseColSpan : currentColSpans[idx + 1];
            const previousLevelGroupCount = idx === groupPanelItems.length - 1 ? currentLevelGroupCount : groupPanelItems[idx + 1].length;
            const groupCountDiff = previousLevelGroupCount / currentLevelGroupCount;
            nextColSpans[idx] = groupCountDiff * previousColSpan;
            return nextColSpans
        }), [...new Array(groupPanelItems.length)]);
        this._groupPanelItems = groupPanelItems.map(((groupsRenderRow, index) => {
            const colSpan = colSpans[index];
            return groupsRenderRow.map((groupItem => _extends({}, groupItem, {
                colSpan: colSpan
            })))
        }));
        return this._groupPanelItems
    }
    componentWillUpdate(nextProps) {
        if (this.props.groupPanelData !== nextProps.groupPanelData) {
            this._groupPanelItems = null
        }
    }
    render() {
        const {
            resourceCellTemplate: resourceCellTemplate
        } = this.props;
        const groupPanelItems = this.getGroupPanelItems();
        const ResourceCellTemplateComponent = getTemplate(resourceCellTemplate);
        return createFragment(groupPanelItems.map((group => createComponentVNode(2, GroupPanelHorizontalRow, {
            groupItems: group,
            cellTemplate: ResourceCellTemplateComponent
        }, group[0].key))), 0)
    }
}
GroupPanelHorizontal.defaultProps = GroupPanelBaseDefaultProps;
