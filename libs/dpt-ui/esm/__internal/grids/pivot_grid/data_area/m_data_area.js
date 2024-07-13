/**
 * DevExtreme (esm/__internal/grids/pivot_grid/data_area/m_data_area.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    nativeScrolling
} from "../../../../core/utils/support";
import {
    AreaItem
} from "../area_item/m_area_item";
import {
    calculateScrollbarWidth
} from "../m_widget_utils";
const PIVOTGRID_AREA_CLASS = "dx-pivotgrid-area";
const PIVOTGRID_AREA_DATA_CLASS = "dx-pivotgrid-area-data";
const PIVOTGRID_TOTAL_CLASS = "dx-total";
const PIVOTGRID_GRAND_TOTAL_CLASS = "dx-grandtotal";
const PIVOTGRID_ROW_TOTAL_CLASS = "dx-row-total";
const DataArea = AreaItem.inherit({
    _getAreaName: () => "data",
    _createGroupElement: () => $("<div>").addClass("dx-pivotgrid-area").addClass("dx-pivotgrid-area-data").css("borderTopWidth", 0),
    _applyCustomStyles(options) {
        const {
            cell: cell
        } = options;
        const {
            classArray: classArray
        } = options;
        if ("T" === cell.rowType || "T" === cell.columnType) {
            classArray.push("dx-total")
        }
        if ("GT" === cell.rowType || "GT" === cell.columnType) {
            classArray.push("dx-grandtotal")
        }
        if ("T" === cell.rowType || "GT" === cell.rowType) {
            classArray.push("dx-row-total")
        }
        if (options.rowIndex === options.rowsCount - 1) {
            options.cssArray.push("border-bottom: 0px")
        }
        this.callBase(options)
    },
    _moveFakeTable(scrollPos) {
        this._moveFakeTableHorizontally(scrollPos.x);
        this._moveFakeTableTop(scrollPos.y);
        this.callBase()
    },
    renderScrollable() {
        this._groupElement.dxScrollable({
            useNative: this.getUseNativeValue(),
            useSimulatedScrollbar: false,
            rtlEnabled: this.component.option("rtlEnabled"),
            bounceEnabled: false,
            updateManually: true
        })
    },
    getUseNativeValue() {
        const {
            useNative: useNative
        } = this.component.option("scrolling");
        return "auto" === useNative ? !!nativeScrolling : !!useNative
    },
    getScrollbarWidth() {
        return this.getUseNativeValue() ? calculateScrollbarWidth() : 0
    },
    updateScrollableOptions(_ref) {
        let {
            direction: direction,
            rtlEnabled: rtlEnabled
        } = _ref;
        const scrollable = this._getScrollable();
        scrollable.option("useNative", this.getUseNativeValue());
        scrollable.option({
            direction: direction,
            rtlEnabled: rtlEnabled
        })
    },
    getScrollableDirection(horizontal, vertical) {
        if (horizontal && !vertical) {
            return "horizontal"
        }
        if (!horizontal && vertical) {
            return "vertical"
        }
        return "both"
    },
    reset() {
        this.callBase();
        if (this._virtualContent) {
            this._virtualContent.parent().css("height", "auto")
        }
    },
    setVirtualContentParams(params) {
        this.callBase(params);
        this._virtualContent.parent().css("height", params.height);
        this._setTableCss({
            top: params.top,
            left: params.left
        })
    }
});
export default {
    DataArea: DataArea
};
export {
    DataArea
};
