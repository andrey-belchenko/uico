/**
 * DevExtreme (esm/renovation/ui/pager/pager.j.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import {
    GridPagerWrapper
} from "../../component_wrapper/grid_pager";
import {
    Pager as PagerComponent
} from "./pager";
export default class Pager extends GridPagerWrapper {
    getProps() {
        const props = super.getProps();
        props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
        return props
    }
    get _propsInfo() {
        return {
            twoWay: [
                ["pageSize", "defaultPageSize", "pageSizeChange"],
                ["pageIndex", "defaultPageIndex", "pageIndexChange"]
            ],
            allowNull: [],
            elements: [],
            templates: [],
            props: ["defaultPageSize", "pageSizeChange", "defaultPageIndex", "pageIndexChange", "gridCompatibility", "className", "showInfo", "infoText", "lightModeEnabled", "displayMode", "maxPagesCount", "pageCount", "pagesCountText", "visible", "hasKnownLastPage", "pagesNavigatorVisible", "showPageSizes", "pageSizes", "rtlEnabled", "showNavigationButtons", "totalCount", "label", "onKeyDown", "pageSize", "pageIndex"]
        }
    }
    get _viewComponent() {
        return PagerComponent
    }
}
registerComponent("dxPager", Pager);
