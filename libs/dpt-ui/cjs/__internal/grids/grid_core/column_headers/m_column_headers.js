/**
 * DevExtreme (cjs/__internal/grids/grid_core/column_headers/m_column_headers.js)
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
exports.columnHeadersModule = exports.ColumnHeadersView = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _m_accessibility = require("../m_accessibility");
var _m_columns_view = require("../views/m_columns_view");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const CELL_CONTENT_CLASS = "text-content";
const HEADERS_CLASS = "headers";
const NOWRAP_CLASS = "nowrap";
const ROW_CLASS_SELECTOR = ".dx-row";
const HEADER_ROW_CLASS = "dx-header-row";
const COLUMN_LINES_CLASS = "dx-column-lines";
const CONTEXT_MENU_SORT_ASC_ICON = "context-menu-sort-asc";
const CONTEXT_MENU_SORT_DESC_ICON = "context-menu-sort-desc";
const CONTEXT_MENU_SORT_NONE_ICON = "context-menu-sort-none";
const CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
const VISIBILITY_HIDDEN_CLASS = "dx-visibility-hidden";
const TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX = "dx-text-content-alignment-";
const SORT_INDICATOR_CLASS = "dx-sort-indicator";
const SORT_INDEX_INDICATOR_CLASS = "dx-sort-index-indicator";
const HEADER_FILTER_CLASS_SELECTOR = ".dx-header-filter";
const HEADER_FILTER_INDICATOR_CLASS = "dx-header-filter-indicator";
const MULTI_ROW_HEADER_CLASS = "dx-header-multi-row";
const LINK = "dx-link";
const createCellContent = function(that, $cell, options) {
    const $cellContent = (0, _renderer.default)("<div>").addClass(that.addWidgetPrefix("text-content"));
    that.setAria("role", "presentation", $cellContent);
    addCssClassesToCellContent(that, $cell, options.column, $cellContent);
    const showColumnLines = that.option("showColumnLines");
    const contentAlignment = that.getController("columns").getHeaderContentAlignment(options.column.alignment);
    return $cellContent[showColumnLines || "right" === contentAlignment ? "appendTo" : "prependTo"]($cell)
};

function addCssClassesToCellContent(that, $cell, column, $cellContent) {
    const $indicatorElements = that._getIndicatorElements($cell, true);
    const $visibleIndicatorElements = that._getIndicatorElements($cell);
    const indicatorCount = $indicatorElements && $indicatorElements.length;
    const columnAlignment = that._getColumnAlignment(column.alignment);
    const sortIndicatorClassName = `.${that._getIndicatorClassName("sort")}`;
    const sortIndexIndicatorClassName = `.${that._getIndicatorClassName("sortIndex")}`;
    const $sortIndicator = $visibleIndicatorElements.filter(sortIndicatorClassName);
    const $sortIndexIndicator = $visibleIndicatorElements.children().filter(sortIndexIndicatorClassName);
    $cellContent = $cellContent || $cell.children(`.${that.addWidgetPrefix("text-content")}`);
    $cellContent.toggleClass("dx-text-content-alignment-" + columnAlignment, indicatorCount > 0).toggleClass("dx-text-content-alignment-" + ("left" === columnAlignment ? "right" : "left"), indicatorCount > 0 && "center" === column.alignment).toggleClass("dx-sort-indicator", !!$sortIndicator.length).toggleClass("dx-sort-index-indicator", !!$sortIndexIndicator.length).toggleClass("dx-header-filter-indicator", !!$visibleIndicatorElements.filter(`.${that._getIndicatorClassName("headerFilter")}`).length)
}
class ColumnHeadersView extends _m_columns_view.ColumnsView {
    init() {
        super.init();
        this._headerPanelView = this.getView("headerPanel");
        this._headerFilterController = this.getController("headerFilter");
        this._dataController = this.getController("data")
    }
    _createTable() {
        const $table = super._createTable.apply(this, arguments);
        _events_engine.default.on($table, "mousedown selectstart", this.createAction((e => {
            const {
                event: event
            } = e;
            if (event.shiftKey) {
                event.preventDefault()
            }
        })));
        return $table
    }
    _isLegacyKeyboardNavigation() {
        return this.option("useLegacyKeyboardNavigation")
    }
    _getDefaultTemplate(column) {
        const that = this;
        return function($container, options) {
            const {
                caption: caption
            } = column;
            const needCellContent = !column.command || caption && "expand" !== column.command;
            if ("empty" === column.command) {
                that._renderEmptyMessage($container, options)
            } else if (needCellContent) {
                const $content = createCellContent(that, $container, options);
                $content.text(caption)
            } else if (column.command) {
                $container.html("&nbsp;")
            }
        }
    }
    _renderEmptyMessage($container, options) {
        const textEmpty = this._getEmptyHeaderText();
        if (!textEmpty) {
            $container.html("&nbsp;");
            return
        }
        const $cellContent = createCellContent(this, $container, options);
        const needSplit = textEmpty.includes("{0}");
        if (needSplit) {
            const [leftPart, rightPart] = textEmpty.split("{0}");
            const columnChooserTitle = _message.default.format("dxDataGrid-emptyHeaderColumnChooserText");
            const columnChooserView = this._columnChooserView;
            const $link = (0, _renderer.default)("<a>").text(columnChooserTitle).addClass(LINK);
            _events_engine.default.on($link, "click", this.createAction((() => columnChooserView.showColumnChooser())));
            $cellContent.append(_dom_adapter.default.createTextNode(leftPart)).append($link).append(_dom_adapter.default.createTextNode(rightPart))
        } else {
            $cellContent.text(textEmpty)
        }
    }
    _getEmptyHeaderText() {
        const hasHiddenColumns = !!this._columnChooserView.hasHiddenColumns();
        const hasGroupedColumns = !!this._headerPanelView.hasGroupedColumns();
        switch (true) {
            case hasHiddenColumns && hasGroupedColumns:
                return _message.default.format("dxDataGrid-emptyHeaderWithColumnChooserAndGroupPanelText");
            case hasGroupedColumns:
                return _message.default.format("dxDataGrid-emptyHeaderWithGroupPanelText");
            case hasHiddenColumns:
                return _message.default.format("dxDataGrid-emptyHeaderWithColumnChooserText");
            default:
                return ""
        }
    }
    _getHeaderTemplate(column) {
        return column.headerCellTemplate || {
            allowRenderToDetachedContainer: true,
            render: this._getDefaultTemplate(column)
        }
    }
    _processTemplate(template, options) {
        const that = this;
        let resultTemplate;
        const {
            column: column
        } = options;
        const renderingTemplate = super._processTemplate(template);
        if ("header" === options.rowType && renderingTemplate && column.headerCellTemplate && !column.command) {
            resultTemplate = {
                render(options) {
                    const $content = createCellContent(that, options.container, options.model);
                    renderingTemplate.render((0, _extend.extend)({}, options, {
                        container: $content
                    }))
                }
            }
        } else {
            resultTemplate = renderingTemplate
        }
        return resultTemplate
    }
    _handleDataChanged(e) {
        if ("refresh" !== e.changeType) {
            return
        }
        if (this._isGroupingChanged || this._requireReady) {
            this._isGroupingChanged = false;
            this.render()
        }
    }
    _renderCell($row, options) {
        const $cell = super._renderCell($row, options);
        if ("header" === options.row.rowType) {
            $cell.addClass("dx-cell-focus-disabled");
            if (!this._isLegacyKeyboardNavigation()) {
                if (options.column && !options.column.type) {
                    $cell.attr("tabindex", this.option("tabindex") || 0)
                }
            }
        }
        return $cell
    }
    _setCellAriaAttributes($cell, cellOptions) {
        super._setCellAriaAttributes($cell, cellOptions);
        if ("header" === cellOptions.rowType) {
            if (!cellOptions.column.type) {
                this.setAria("role", "columnheader", $cell)
            }
            if (cellOptions.column && !cellOptions.column.command && !cellOptions.column.isBand) {
                $cell.attr("id", cellOptions.column.headerId);
                this.setAria("label", `${_message.default.format("dxDataGrid-ariaColumn")} ${cellOptions.column.caption}`, $cell)
            }
        }
    }
    _createRow(row) {
        const $row = super._createRow.apply(this, arguments);
        $row.toggleClass("dx-column-lines", this.option("showColumnLines"));
        if ("header" === row.rowType) {
            $row.addClass("dx-header-row");
            if (!this._isLegacyKeyboardNavigation()) {
                (0, _m_accessibility.registerKeyboardAction)("columnHeaders", this, $row, "td", this._handleActionKeyDown.bind(this))
            }
        }
        return $row
    }
    _processHeaderAction(event, $row) {}
    _handleActionKeyDown(args) {
        const {
            event: event
        } = args;
        const $target = (0, _renderer.default)(event.target);
        this._lastActionElement = event.target;
        if ($target.is(".dx-header-filter")) {
            const headerFilterController = this._headerFilterController;
            const $column = $target.closest("td");
            const columnIndex = this.getColumnIndexByElement($column);
            if (columnIndex >= 0) {
                headerFilterController.showHeaderFilterMenu(columnIndex, false)
            }
        } else {
            const $row = $target.closest(".dx-row");
            this._processHeaderAction(event, $row)
        }
        event.preventDefault()
    }
    _renderCore() {
        const $container = this.element();
        const change = {};
        if (this._tableElement && !this._dataController.isLoaded() && !this._hasRowElements) {
            return
        }
        $container.addClass(this.addWidgetPrefix("headers")).toggleClass(this.addWidgetPrefix("nowrap"), !this.option("wordWrapEnabled")).empty();
        this.setAria("role", "presentation", $container);
        const deferred = this._updateContent(this._renderTable({
            change: change
        }), change);
        if (this.getRowCount() > 1) {
            $container.addClass("dx-header-multi-row")
        }
        super._renderCore.apply(this, arguments);
        return deferred
    }
    _renderRows() {
        const that = this;
        if (that._dataController.isLoaded() || that._hasRowElements) {
            super._renderRows.apply(that, arguments);
            that._hasRowElements = true
        }
    }
    _renderRow($table, options) {
        const rowIndex = 1 === this.getRowCount() ? null : options.row.rowIndex;
        options.columns = this.getColumns(rowIndex);
        super._renderRow($table, options)
    }
    _createCell(options) {
        const {
            column: column
        } = options;
        const $cellElement = super._createCell.apply(this, arguments);
        column.rowspan > 1 && "header" === options.rowType && $cellElement.attr("rowSpan", column.rowspan);
        return $cellElement
    }
    _getRows() {
        const result = [];
        const rowCount = this.getRowCount();
        if (this.option("showColumnHeaders")) {
            for (let i = 0; i < rowCount; i++) {
                result.push({
                    rowType: "header",
                    rowIndex: i
                })
            }
        }
        return result
    }
    _getCellTemplate(options) {
        if ("header" === options.rowType) {
            return this._getHeaderTemplate(options.column)
        }
    }
    _columnOptionChanged(e) {
        const {
            changeTypes: changeTypes
        } = e;
        const {
            optionNames: optionNames
        } = e;
        if (changeTypes.grouping || changeTypes.groupExpanding) {
            if (changeTypes.grouping) {
                this._isGroupingChanged = true
            }
            return
        }
        super._columnOptionChanged(e);
        if (optionNames.width || optionNames.visible) {
            this.resizeCompleted.fire()
        }
    }
    _isElementVisible(elementOptions) {
        return elementOptions && elementOptions.visible
    }
    _alignCaptionByCenter($cell) {
        let $indicatorsContainer = this._getIndicatorContainer($cell, true);
        if ($indicatorsContainer && $indicatorsContainer.length) {
            $indicatorsContainer.filter(".dx-visibility-hidden").remove();
            $indicatorsContainer = this._getIndicatorContainer($cell);
            $indicatorsContainer.clone().addClass("dx-visibility-hidden").css("float", "").insertBefore($cell.children(`.${this.addWidgetPrefix("text-content")}`))
        }
    }
    _updateCell($cell, options) {
        if ("header" === options.rowType && "center" === options.column.alignment) {
            this._alignCaptionByCenter($cell)
        }
        super._updateCell.apply(this, arguments)
    }
    _updateIndicator($cell, column, indicatorName) {
        const $indicatorElement = super._updateIndicator.apply(this, arguments);
        if ("center" === column.alignment) {
            this._alignCaptionByCenter($cell)
        }
        addCssClassesToCellContent(this, $cell, column);
        return $indicatorElement
    }
    _getIndicatorContainer($cell, returnAll) {
        const $indicatorsContainer = super._getIndicatorContainer($cell);
        return returnAll ? $indicatorsContainer : $indicatorsContainer.filter(":not(.dx-visibility-hidden)")
    }
    _isSortableElement($target) {
        return true
    }
    getHeadersRowHeight() {
        const $tableElement = this.getTableElement();
        const $headerRows = $tableElement && $tableElement.find(".dx-header-row");
        return $headerRows && $headerRows.toArray().reduce(((sum, headerRow) => sum + (0, _size.getHeight)(headerRow)), 0) || 0
    }
    getHeaderElement(index) {
        const columnElements = this.getColumnElements();
        return columnElements && columnElements.eq(index)
    }
    getColumnElements(index, bandColumnIndex) {
        const that = this;
        let $cellElement;
        const columnsController = that._columnsController;
        const rowCount = that.getRowCount();
        if (that.option("showColumnHeaders")) {
            if (rowCount > 1 && (!(0, _type.isDefined)(index) || (0, _type.isDefined)(bandColumnIndex))) {
                const result = [];
                const visibleColumns = (0, _type.isDefined)(bandColumnIndex) ? columnsController.getChildrenByBandColumn(bandColumnIndex, true) : columnsController.getVisibleColumns();
                (0, _iterator.each)(visibleColumns, ((_, column) => {
                    const rowIndex = (0, _type.isDefined)(index) ? index : columnsController.getRowIndex(column.index);
                    $cellElement = that._getCellElement(rowIndex, columnsController.getVisibleIndex(column.index, rowIndex));
                    $cellElement && result.push($cellElement.get(0))
                }));
                return (0, _renderer.default)(result)
            }
            if (!index || index < rowCount) {
                return that.getCellElements(index || 0)
            }
        }
        return
    }
    getColumnIndexByElement($cell) {
        const cellIndex = this.getCellIndex($cell);
        const $row = $cell.closest(".dx-row");
        const {
            rowIndex: rowIndex
        } = $row[0];
        const column = this.getColumns(rowIndex)[cellIndex];
        return column ? column.index : -1
    }
    getVisibleColumnIndex(columnIndex, rowIndex) {
        const column = this.getColumns()[columnIndex];
        return column ? this._columnsController.getVisibleIndex(column.index, rowIndex) : -1
    }
    getColumnWidths() {
        const $columnElements = this.getColumnElements();
        if ($columnElements && $columnElements.length) {
            return this._getWidths($columnElements)
        }
        return super.getColumnWidths.apply(this, arguments)
    }
    allowDragging(column) {
        const rowIndex = column && this._columnsController.getRowIndex(column.index);
        const columns = this.getColumns(rowIndex);
        const isReorderingEnabled = this.option("allowColumnReordering") ?? this._columnsController.isColumnOptionUsed("allowReordering");
        return isReorderingEnabled && column.allowReordering && columns.length > 1
    }
    getBoundingRect() {
        const that = this;
        const $columnElements = that.getColumnElements();
        if ($columnElements && $columnElements.length) {
            const offset = that.getTableElement().offset();
            return {
                top: offset.top
            }
        }
        return null
    }
    getName() {
        return "headers"
    }
    getColumnCount() {
        const $columnElements = this.getColumnElements();
        return $columnElements ? $columnElements.length : 0
    }
    isVisible() {
        return this.option("showColumnHeaders")
    }
    optionChanged(args) {
        const that = this;
        switch (args.name) {
            case "showColumnHeaders":
            case "wordWrapEnabled":
            case "showColumnLines":
                that._invalidate(true, true);
                args.handled = true;
                break;
            default:
                super.optionChanged(args)
        }
    }
    getHeight() {
        return this.getElementHeight()
    }
    getContextMenuItems(options) {
        const that = this;
        const {
            column: column
        } = options;
        if (options.row && ("header" === options.row.rowType || "detailAdaptive" === options.row.rowType)) {
            const sortingOptions = that.option("sorting");
            if (sortingOptions && "none" !== sortingOptions.mode && column && column.allowSorting) {
                const onItemClick = function(params) {
                    setTimeout((() => {
                        that._columnsController.changeSortOrder(column.index, params.itemData.value)
                    }))
                };
                return [{
                    text: sortingOptions.ascendingText,
                    value: "asc",
                    disabled: "asc" === column.sortOrder,
                    icon: "context-menu-sort-asc",
                    onItemClick: onItemClick
                }, {
                    text: sortingOptions.descendingText,
                    value: "desc",
                    disabled: "desc" === column.sortOrder,
                    icon: "context-menu-sort-desc",
                    onItemClick: onItemClick
                }, {
                    text: sortingOptions.clearText,
                    value: "none",
                    disabled: !column.sortOrder,
                    icon: "context-menu-sort-none",
                    onItemClick: onItemClick
                }]
            }
        }
        return
    }
    getRowCount() {
        return this._columnsController && this._columnsController.getRowCount()
    }
    setRowsOpacity(columnIndex, value, rowIndex) {
        let i;
        let columnElements;
        const rowCount = this.getRowCount();
        const columns = this._columnsController.getColumns();
        const column = columns && columns[columnIndex];
        const columnID = column && column.isBand && column.index;
        const setColumnOpacity = (column, index) => {
            if (column.ownerBand === columnID) {
                columnElements.eq(index).css({
                    opacity: value
                });
                if (column.isBand) {
                    this.setRowsOpacity(column.index, value, i + 1)
                }
            }
        };
        if ((0, _type.isDefined)(columnID)) {
            rowIndex = rowIndex || 0;
            for (i = rowIndex; i < rowCount; i++) {
                columnElements = this.getCellElements(i);
                if (columnElements) {
                    const rowColumns = this.getColumns(i);
                    rowColumns.forEach(setColumnOpacity)
                }
            }
        }
    }
}
exports.ColumnHeadersView = ColumnHeadersView;
const columnHeadersModule = exports.columnHeadersModule = {
    defaultOptions: () => ({
        showColumnHeaders: true,
        cellHintEnabled: true
    }),
    views: {
        columnHeadersView: ColumnHeadersView
    }
};
