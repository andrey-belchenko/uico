/**
 * DevExtreme (esm/__internal/scheduler/r1/components/wrappers/header_panel.js)
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
    HeaderPanel
} from "../base/header_panel";
export class HeaderPanelComponent extends ComponentWrapper {
    _setOptionsByReference() {
        super._setOptionsByReference();
        this._optionsByReference = _extends({}, this._optionsByReference, {
            dateHeaderData: true,
            resourceCellTemplate: true,
            dateCellTemplate: true,
            timeCellTemplate: true
        })
    }
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
        return HeaderPanel
    }
}
registerComponent("dxHeaderPanelLayout", HeaderPanelComponent);
