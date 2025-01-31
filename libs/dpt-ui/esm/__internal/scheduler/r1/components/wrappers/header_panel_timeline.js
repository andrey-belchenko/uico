/**
 * DevExtreme (esm/__internal/scheduler/r1/components/wrappers/header_panel_timeline.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../../../core/component_registrator";
import {
    HeaderPanelTimeline
} from "../timeline/header_panel_timeline";
import {
    HeaderPanelComponent
} from "./header_panel";
export class HeaderPanelTimelineComponent extends HeaderPanelComponent {
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: ["dateCellTemplate", "timeCellTemplate", "dateHeaderTemplate", "resourceCellTemplate"],
            props: ["viewContext", "dateHeaderData", "isRenderDateHeader", "dateCellTemplate", "timeCellTemplate", "dateHeaderTemplate", "groups", "groupOrientation", "groupPanelData", "groupByDate", "height", "className", "resourceCellTemplate"]
        }
    }
    get _viewComponent() {
        return HeaderPanelTimeline
    }
}
registerComponent("dxTimelineHeaderPanelLayout", HeaderPanelTimelineComponent);
