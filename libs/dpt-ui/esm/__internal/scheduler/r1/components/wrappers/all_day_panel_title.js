/**
 * DevExtreme (esm/__internal/scheduler/r1/components/wrappers/all_day_panel_title.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../../../core/component_registrator";
import {
    ComponentWrapper
} from "../../../../core/r1/index";
import {
    AllDayPanelTitle
} from "../base/all_day_panel_title";
export class AllDayPanelTitleComponent extends ComponentWrapper {
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: [],
            props: []
        }
    }
    get _viewComponent() {
        return AllDayPanelTitle
    }
}
registerComponent("dxAllDayPanelTitle", AllDayPanelTitleComponent);
