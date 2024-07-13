/**
 * DevExtreme (esm/ui/gantt/ui.gantt.export_helper.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWindow
} from "../../core/utils/window";
import gridCoreUtils from "../../__internal/grids/grid_core/m_utils";
import {
    isDate,
    isDefined,
    isNumeric
} from "../../core/utils/type";
import dateLocalization from "../../localization/date";
import numberLocalization from "../../localization/number";
const window = getWindow();
const TREELIST_EMPTY_SPACE = "dx-treelist-empty-space";
const TREELIST_TABLE = "dx-treelist-table";
export class GanttExportHelper {
    constructor(gantt) {
        this._gantt = gantt;
        this._treeList = gantt._treeList;
        this._cache = {}
    }
    reset() {
        this._cache = {}
    }
    getTreeListTableStyle() {
        const table = this._getTreeListTable();
        const style = window.getComputedStyle(table);
        return {
            color: style.color,
            backgroundColor: style.backgroundColor,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            fontWeight: style.fontWeight,
            fontStyle: style.fontStyle,
            textAlign: "left",
            verticalAlign: "middle"
        }
    }
    getTreeListColCount() {
        const headerView = this._getHeaderView();
        const widths = headerView.getColumnWidths().filter((w => w > 0));
        return widths.length
    }
    getTreeListHeaderInfo(colIndex) {
        const element = this._getHeaderElement(colIndex);
        if (!element) {
            return null
        }
        const style = window.getComputedStyle(element);
        const styleForExport = {
            color: style.color,
            padding: style.padding,
            paddingLeft: style.paddingLeft,
            paddingTop: style.paddingTop,
            paddingRight: style.paddingRight,
            paddingBottom: style.paddingBottom,
            verticalAlign: style.verticalAlign,
            width: this._getColumnWidth(colIndex)
        };
        return {
            content: element.textContent,
            styles: styleForExport
        }
    }
    getTreeListCellInfo(key, colIndex) {
        const node = this._treeList.getNodeByKey(key);
        const visibleRowIndex = this._treeList.getRowIndexByKey(key);
        const cell = visibleRowIndex > -1 ? this._getDataCell(visibleRowIndex, colIndex) : null;
        const style = cell ? window.getComputedStyle(cell) : this._getColumnCellStyle(colIndex);
        const styleForExport = {
            color: style.color,
            padding: style.padding,
            paddingLeft: style.paddingLeft,
            paddingTop: style.paddingTop,
            paddingRight: style.paddingRight,
            paddingBottom: style.paddingBottom,
            width: this._getColumnWidth(colIndex)
        };
        if (0 === colIndex) {
            styleForExport.extraLeftPadding = this._getEmptySpaceWidth(node.level)
        }
        return {
            content: (null === cell || void 0 === cell ? void 0 : cell.textContent) ?? this._getDisplayText(key, colIndex),
            styles: styleForExport
        }
    }
    getTreeListEmptyDataCellInfo() {
        return {
            content: this._treeList.option("noDataText")
        }
    }
    _ensureColumnWidthCache(colIndex) {
        var _this$_cache;
        (_this$_cache = this._cache)["columnWidths"] ?? (_this$_cache.columnWidths = {});
        if (!this._cache.columnWidths[colIndex]) {
            const header = this._getHeaderElement(colIndex);
            this._cache.columnWidths[colIndex] = (null === header || void 0 === header ? void 0 : header.clientWidth) ?? 0
        }
    }
    _getColumnWidth(colIndex) {
        this._ensureColumnWidthCache(colIndex);
        const widths = this._cache.columnWidths;
        return widths && widths[colIndex]
    }
    _getEmptySpaceWidth(level) {
        if (!this._cache.emptyWidth) {
            var _this$_cache2;
            const element = this._getTreeListElement(TREELIST_EMPTY_SPACE);
            (_this$_cache2 = this._cache)["emptyWidth"] ?? (_this$_cache2.emptyWidth = element.offsetWidth ?? 0)
        }
        return this._cache.emptyWidth * (level + 1)
    }
    _getColumnCellStyle(colIndex) {
        this._ensureColumnCellStyleCache(colIndex);
        return this._cache.columnStyles[colIndex]
    }
    _ensureColumnCellStyleCache(colIndex) {
        var _this$_cache3;
        (_this$_cache3 = this._cache)["columnStyles"] ?? (_this$_cache3.columnStyles = {});
        if (!this._cache.columnStyles[colIndex]) {
            const cell = this._getDataCell(0, colIndex);
            this._cache.columnStyles[colIndex] = window.getComputedStyle(cell)
        }
    }
    _getTask(key) {
        this._ensureTaskCache(key);
        return this._cache.tasks[key]
    }
    _ensureTaskCache(key) {
        var _this$_cache4, _this$_cache$tasks;
        (_this$_cache4 = this._cache)["tasks"] ?? (_this$_cache4.tasks = {});
        (_this$_cache$tasks = this._cache.tasks)[key] ?? (_this$_cache$tasks[key] = this._gantt._findTaskByKey(key))
    }
    _getTreeListTable() {
        return this._getTreeListElement(TREELIST_TABLE)
    }
    _getTreeListElement(className) {
        return this._treeList._$element.find("." + className).get(0)
    }
    _getDataCell(rowIndex, colIndex) {
        const treeList = this._treeList;
        const cellElement = treeList.getCellElement(rowIndex, colIndex);
        return cellElement && cellElement.length ? cellElement[0] : cellElement
    }
    _getHeaderElement(index) {
        return this._getHeaderView().getHeaderElement(index).get(0)
    }
    _getHeaderView() {
        return this._treeList._views.columnHeadersView
    }
    _getDisplayText(key, colIndex) {
        const task = this._getTask(key);
        return task && this._getGridDisplayText(colIndex, task)
    }
    _getGridDisplayText(colIndex, data) {
        const columns = this._treeList.getController("columns").getColumns();
        const column = columns[colIndex];
        const field = null === column || void 0 === column ? void 0 : column.dataField;
        const format = null === column || void 0 === column ? void 0 : column.format;
        const value = gridCoreUtils.getDisplayValue(column, data[field], data, "data");
        if (isDefined(format)) {
            if ("date" === (null === column || void 0 === column ? void 0 : column.dataType) || "datetime" === (null === column || void 0 === column ? void 0 : column.dataType)) {
                const date = isDate(value) ? value : new Date(value);
                return dateLocalization.format(date, format)
            }
            if (isNumeric(value)) {
                return numberLocalization.format(value, format)
            }
        }
        return "string" === typeof value ? value : null === value || void 0 === value ? void 0 : value.toString()
    }
}
