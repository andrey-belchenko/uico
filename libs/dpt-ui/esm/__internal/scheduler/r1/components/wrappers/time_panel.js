/**
 * DevExtreme (esm/__internal/scheduler/r1/components/wrappers/time_panel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from "../../../../../core/component_registrator";
import {
    ComponentWrapper
} from "../../../../core/r1/index";
import {
    TimePanelTable
} from "../base/time_panel_table";
export class TimePanelComponent extends ComponentWrapper {
    _setOptionsByReference() {
        super._setOptionsByReference();
        this._optionsByReference = _extends({}, this._optionsByReference, {
            timeCellTemplate: true
        })
    }
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: ["timeCellTemplate"],
            props: ["viewContext", "groupOrientation", "timePanelData", "timeCellTemplate"]
        }
    }
    get _viewComponent() {
        return TimePanelTable
    }
}
registerComponent("dxTimePanelTableLayout", TimePanelComponent);
