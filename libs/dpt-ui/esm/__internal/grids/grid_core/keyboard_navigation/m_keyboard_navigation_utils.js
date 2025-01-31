/**
 * DevExtreme (esm/__internal/grids/grid_core/keyboard_navigation/m_keyboard_navigation_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import devices from "../../../../core/devices";
import {
    isDefined
} from "../../../../core/utils/type";
import {
    EDITOR_CELL_CLASS
} from "../editing/const";
import {
    COMMAND_SELECT_CLASS,
    DATA_ROW_CLASS,
    EDIT_FORM_CLASS,
    FREESPACE_ROW_CLASS,
    GROUP_ROW_CLASS,
    HEADER_ROW_CLASS,
    MASTER_DETAIL_ROW_CLASS,
    VIRTUAL_ROW_CLASS
} from "./const";
const DATAGRID_GROUP_FOOTER_CLASS = "dx-datagrid-group-footer";
export function isGroupRow($row) {
    return $row && $row.hasClass(GROUP_ROW_CLASS)
}
export function isGroupFooterRow($row) {
    return $row && $row.hasClass("dx-datagrid-group-footer")
}
export function isDetailRow($row) {
    return $row && $row.hasClass(MASTER_DETAIL_ROW_CLASS)
}
export function isEditForm($row) {
    return $row && $row.hasClass(MASTER_DETAIL_ROW_CLASS) && $row.hasClass(EDIT_FORM_CLASS)
}
export function isDataRow($row) {
    return $row && $row.hasClass(DATA_ROW_CLASS)
}
export function isNotFocusedRow($row) {
    return !$row || $row.hasClass(FREESPACE_ROW_CLASS) || $row.hasClass(VIRTUAL_ROW_CLASS)
}
export function isEditorCell(that, $cell) {
    return !that._isRowEditMode() && $cell && !$cell.hasClass(COMMAND_SELECT_CLASS) && $cell.hasClass(EDITOR_CELL_CLASS)
}
export function isElementDefined($element) {
    return isDefined($element) && $element.length > 0
}
export function isMobile() {
    return "desktop" !== devices.current().deviceType
}
export function isCellInHeaderRow($cell) {
    return !!$cell.parent(`.${HEADER_ROW_CLASS}`).length
}
export function isFixedColumnIndexOffsetRequired(that, column) {
    const rtlEnabled = that.option("rtlEnabled");
    if (rtlEnabled) {
        return !("right" === column.fixedPosition || isDefined(column.command) && !isDefined(column.fixedPosition))
    }
    return !(!isDefined(column.fixedPosition) || "left" === column.fixedPosition)
}
export function shouldPreventScroll(that) {
    const keyboardController = that.getController("keyboardNavigation");
    return keyboardController._isVirtualScrolling() ? that.option("focusedRowIndex") === keyboardController.getRowIndex() : false
}
