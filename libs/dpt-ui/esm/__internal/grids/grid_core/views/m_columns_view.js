/**
 * DevExtreme (esm/__internal/grids/grid_core/views/m_columns_view.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../../../../core/dom_adapter";
import {
    getPublicElement
} from "../../../../core/element";
import {
    data as elementData
} from "../../../../core/element_data";
import Guid from "../../../../core/guid";
import $ from "../../../../core/renderer";
import browser from "../../../../core/utils/browser";
import {
    noop
} from "../../../../core/utils/common";
import {
    Deferred,
    when
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import * as iteratorUtils from "../../../../core/utils/iterator";
import {
    getBoundingRect,
    getDefaultAlignment
} from "../../../../core/utils/position";
import {
    getHeight,
    getOuterHeight,
    getOuterWidth,
    getWidth
} from "../../../../core/utils/size";
import {
    setWidth
} from "../../../../core/utils/style";
import {
    nativeScrolling
} from "../../../../core/utils/support";
import {
    isDefined,
    isFunction,
    isNumeric,
    isRenderer,
    isString
} from "../../../../core/utils/type";
import {
    getWindow,
    hasWindow
} from "../../../../core/utils/window";
import {
    name as clickEventName
} from "../../../../events/click";
import eventsEngine from "../../../../events/core/events_engine";
import {
    name as dblclickEvent
} from "../../../../events/double_click";
import pointerEvents from "../../../../events/pointer";
import {
    removeEvent
} from "../../../../events/remove";
import {
    ColumnStateMixin
} from "../../../grids/grid_core/column_state_mixin/m_column_state_mixin";
import modules from "../m_modules";
import gridCoreUtils from "../m_utils";
const SCROLL_CONTAINER_CLASS = "scroll-container";
const SCROLLABLE_SIMULATED_CLASS = "scrollable-simulated";
const GROUP_SPACE_CLASS = "group-space";
const CONTENT_CLASS = "content";
const TABLE_CLASS = "table";
const TABLE_FIXED_CLASS = "table-fixed";
const CONTENT_FIXED_CLASS = "content-fixed";
const ROW_CLASS = "dx-row";
const GROUP_ROW_CLASS = "dx-group-row";
const GROUP_CELL_CLASS = "dx-group-cell";
const DETAIL_ROW_CLASS = "dx-master-detail-row";
const FILTER_ROW_CLASS = "filter-row";
const ERROR_ROW_CLASS = "dx-error-row";
const CELL_UPDATED_ANIMATION_CLASS = "cell-updated-animation";
const HIDDEN_COLUMNS_WIDTH = "0.0001px";
const CELL_HINT_VISIBLE = "dxCellHintVisible";
const FORM_FIELD_ITEM_CONTENT_CLASS = "dx-field-item-content";
const appendElementTemplate = {
    render(options) {
        options.container.append(options.content)
    }
};
const subscribeToRowEvents = function(that, $table) {
    let touchTarget;
    let touchCurrentTarget;
    let timeoutId;

    function clearTouchTargets(timeout) {
        return setTimeout((() => {
            touchTarget = touchCurrentTarget = null
        }), timeout)
    }
    eventsEngine.on($table, "touchstart touchend", ".dx-row", (e => {
        clearTimeout(timeoutId);
        if ("touchstart" === e.type) {
            touchTarget = e.target;
            touchCurrentTarget = e.currentTarget;
            timeoutId = clearTouchTargets(1e3)
        } else {
            timeoutId = clearTouchTargets()
        }
    }));
    eventsEngine.on($table, [clickEventName, dblclickEvent, pointerEvents.down].join(" "), ".dx-row", that.createAction((e => {
        const {
            event: event
        } = e;
        if (touchTarget) {
            event.target = touchTarget;
            event.currentTarget = touchCurrentTarget
        }
        if (!$(event.target).closest("a").length) {
            e.rowIndex = that.getRowIndex(event.currentTarget);
            if (e.rowIndex >= 0) {
                e.rowElement = getPublicElement($(event.currentTarget));
                e.columns = that.getColumns();
                if (event.type === pointerEvents.down) {
                    that._rowPointerDown(e)
                } else if (event.type === clickEventName) {
                    that._rowClick(e)
                } else {
                    that._rowDblClick(e)
                }
            }
        }
    })))
};
const getWidthStyle = function(width) {
    if ("auto" === width) {
        return ""
    }
    return isNumeric(width) ? `${width}px` : width
};
const setCellWidth = function(cell, column, width) {
    cell.style.width = cell.style.maxWidth = "auto" === column.width ? "" : width
};
const copyAttributes = function(element, newElement) {
    if (!element || !newElement) {
        return
    }
    const oldAttributes = element.attributes;
    const newAttributes = newElement.attributes;
    let i;
    for (i = 0; i < oldAttributes.length; i++) {
        const name = oldAttributes[i].nodeName;
        if (!newElement.hasAttribute(name)) {
            element.removeAttribute(name)
        }
    }
    for (i = 0; i < newAttributes.length; i++) {
        element.setAttribute(newAttributes[i].nodeName, newAttributes[i].nodeValue)
    }
};
const removeHandler = function(templateDeferred) {
    templateDeferred.resolve()
};
export const normalizeWidth = width => {
    if ("number" === typeof width) {
        return `${width.toFixed(3)}px`
    }
    if ("adaptiveHidden" === width) {
        return "0.0001px"
    }
    return width
};
export class ColumnsView extends(ColumnStateMixin(modules.View)) {
    init() {
        this._scrollLeft = -1;
        this._columnsController = this.getController("columns");
        this._dataController = this.getController("data");
        this._adaptiveColumnsController = this.getController("adaptiveColumns");
        this._columnChooserController = this.getController("columnChooser");
        this._editorFactoryController = this.getController("editorFactory");
        this._selectionController = this.getController("selection");
        this._columnChooserView = this.getView("columnChooserView");
        this._delayedTemplates = [];
        this._templateDeferreds = new Set;
        this._templatesCache = {};
        this._templateTimeouts = new Set;
        this.createAction("onCellClick");
        this.createAction("onRowClick");
        this.createAction("onCellDblClick");
        this.createAction("onRowDblClick");
        this.createAction("onCellHoverChanged", {
            excludeValidators: ["disabled", "readOnly"]
        });
        this.createAction("onCellPrepared", {
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering"
        });
        this.createAction("onRowPrepared", {
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering",
            afterExecute: e => {
                this._afterRowPrepared(e)
            }
        });
        this._columnsController.columnsChanged.add(this._columnOptionChanged.bind(this));
        this._dataController && this._dataController.changed.add(this._handleDataChanged.bind(this))
    }
    dispose() {
        if (hasWindow()) {
            var _this$_templateTimeou, _this$_templateTimeou2;
            const window = getWindow();
            null === (_this$_templateTimeou = this._templateTimeouts) || void 0 === _this$_templateTimeou || _this$_templateTimeou.forEach((templateTimeout => window.clearTimeout(templateTimeout)));
            null === (_this$_templateTimeou2 = this._templateTimeouts) || void 0 === _this$_templateTimeou2 || _this$_templateTimeou2.clear()
        }
    }
    optionChanged(args) {
        super.optionChanged(args);
        switch (args.name) {
            case "cellHintEnabled":
            case "onCellPrepared":
            case "onRowPrepared":
            case "onCellHoverChanged":
                this._invalidate(true, true);
                args.handled = true;
                break;
            case "keyboardNavigation":
                if ("keyboardNavigation.enabled" === args.fullName) {
                    this._invalidate(true, true)
                }
                args.handled = true
        }
    }
    _createScrollableOptions() {
        const scrollingOptions = this.option("scrolling");
        let useNativeScrolling = this.option("scrolling.useNative");
        const options = extend({}, scrollingOptions, {
            direction: "both",
            bounceEnabled: false,
            useKeyboard: false
        });
        if (void 0 === useNativeScrolling) {
            useNativeScrolling = true
        }
        if ("auto" === useNativeScrolling) {
            delete options.useNative;
            delete options.useSimulatedScrollbar
        } else {
            options.useNative = !!useNativeScrolling;
            options.useSimulatedScrollbar = !useNativeScrolling
        }
        return options
    }
    _updateCell($cell, parameters) {
        if (parameters.rowType) {
            this._cellPrepared($cell, parameters)
        }
    }
    _createCell(options) {
        const {
            column: column
        } = options;
        const alignment = column.alignment || getDefaultAlignment(this.option("rtlEnabled"));
        const cell = domAdapter.createElement("td");
        cell.style.textAlign = alignment;
        const $cell = $(cell);
        if ("data" === options.rowType && column.headerId && !column.type) {
            if (this.component.option("showColumnHeaders")) {
                this.setAria("describedby", column.headerId, $cell)
            }
        }
        if (column.cssClass) {
            $cell.addClass(column.cssClass)
        }
        if (Array.isArray(column.elementAttr)) {
            column.elementAttr.forEach((_ref => {
                let {
                    name: name,
                    value: value
                } = _ref;
                $cell.attr(name, value)
            }))
        }
        if ("expand" === column.command) {
            $cell.addClass(column.cssClass);
            $cell.addClass(this.addWidgetPrefix("group-space"))
        }
        if (column.colspan > 1) {
            $cell.attr("colSpan", column.colspan)
        } else if (!column.isBand && "auto" !== column.visibleWidth && this.option("columnAutoWidth")) {
            if (column.width || column.minWidth) {
                cell.style.minWidth = getWidthStyle(column.minWidth || column.width)
            }
            if (column.width) {
                setCellWidth(cell, column, getWidthStyle(column.width))
            }
        }
        return $cell
    }
    _createRow(rowObject, tagName) {
        tagName = tagName || "tr";
        const $element = $(`<${tagName}>`).addClass("dx-row");
        if ("tr" === tagName) {
            this.setAria("role", "row", $element)
        }
        return $element
    }
    _isAltRow(row) {
        return row && row.dataIndex % 2 === 1
    }
    _createTable(columns, isAppend) {
        const $table = $("<table>").addClass(this.addWidgetPrefix("table")).addClass(this.addWidgetPrefix("table-fixed"));
        if (columns && !isAppend) {
            $table.attr("id", `dx-${new Guid}`).append(this._createColGroup(columns));
            if (browser.safari) {
                $table.append($("<thead>").append("<tr>"))
            }
            this.setAria("role", "presentation", $table)
        } else {
            this.setAria("hidden", true, $table)
        }
        this.setAria("role", "presentation", $("<tbody>").appendTo($table));
        if (isAppend) {
            return $table
        }
        if (browser.mozilla) {
            eventsEngine.on($table, "mousedown", "td", (e => {
                if (e.ctrlKey) {
                    e.preventDefault()
                }
            }))
        }
        if (this.option("cellHintEnabled")) {
            eventsEngine.on($table, "mousemove", ".dx-row > td", this.createAction((args => {
                const e = args.event;
                const $element = $(e.target);
                const $cell = $(e.currentTarget);
                const $row = $cell.parent();
                const visibleColumns = this._columnsController.getVisibleColumns();
                const rowOptions = $row.data("options");
                const columnIndex = $cell.index();
                const cellOptions = rowOptions && rowOptions.cells && rowOptions.cells[columnIndex];
                const column = cellOptions ? cellOptions.column : visibleColumns[columnIndex];
                const isHeaderRow = $row.hasClass("dx-header-row");
                const isDataRow = $row.hasClass("dx-data-row");
                const isMasterDetailRow = $row.hasClass(DETAIL_ROW_CLASS);
                const isGroupRow = $row.hasClass("dx-group-row");
                const isFilterRow = $row.hasClass(this.addWidgetPrefix("filter-row"));
                const isDataRowWithTemplate = isDataRow && (!column || column.cellTemplate);
                const isEditorShown = isDataRow && cellOptions && (rowOptions.isEditing || cellOptions.isEditing || (null === column || void 0 === column ? void 0 : column.showEditorAlways));
                const isHeaderRowWithTemplate = isHeaderRow && (!column || column.headerCellTemplate);
                const isGroupCellWithTemplate = isGroupRow && (!column || column.groupIndex && column.groupCellTemplate);
                const shouldShowHint = !isMasterDetailRow && !isFilterRow && !isEditorShown && !isDataRowWithTemplate && !isHeaderRowWithTemplate && !isGroupCellWithTemplate;
                if (shouldShowHint) {
                    if ($element.data(CELL_HINT_VISIBLE)) {
                        $element.removeAttr("title");
                        $element.data(CELL_HINT_VISIBLE, false)
                    }
                    const difference = $element[0].scrollWidth - $element[0].clientWidth;
                    if (difference > 0 && !isDefined($element.attr("title"))) {
                        $element.attr("title", $element.text());
                        $element.data(CELL_HINT_VISIBLE, true)
                    }
                }
            })))
        }
        const getOptions = event => {
            const $cell = $(event.currentTarget);
            const $fieldItemContent = $(event.target).closest(".dx-field-item-content");
            const $row = $cell.parent();
            const rowOptions = $row.data("options");
            const options = rowOptions && rowOptions.cells && rowOptions.cells[$cell.index()];
            if (!$cell.closest("table").is(event.delegateTarget)) {
                return
            }
            const resultOptions = extend({}, options, {
                cellElement: getPublicElement($cell),
                event: event,
                eventType: event.type
            });
            resultOptions.rowIndex = this.getRowIndex($row);
            if ($fieldItemContent.length) {
                const formItemOptions = $fieldItemContent.data("dx-form-item");
                if (formItemOptions.column) {
                    resultOptions.column = formItemOptions.column;
                    resultOptions.columnIndex = this._columnsController.getVisibleIndex(resultOptions.column.index)
                }
            }
            return resultOptions
        };
        eventsEngine.on($table, "mouseover", ".dx-row > td", (e => {
            const options = getOptions(e);
            options && this.executeAction("onCellHoverChanged", options)
        }));
        eventsEngine.on($table, "mouseout", ".dx-row > td", (e => {
            const options = getOptions(e);
            options && this.executeAction("onCellHoverChanged", options)
        }));
        eventsEngine.on($table, clickEventName, ".dx-row > td", (e => {
            const options = getOptions(e);
            options && this.executeAction("onCellClick", options)
        }));
        eventsEngine.on($table, dblclickEvent, ".dx-row > td", (e => {
            const options = getOptions(e);
            options && this.executeAction("onCellDblClick", options)
        }));
        subscribeToRowEvents(this, $table);
        return $table
    }
    _rowPointerDown(e) {}
    _rowClick() {}
    _rowDblClick() {}
    _createColGroup(columns) {
        const colgroupElement = $("<colgroup>");
        for (let i = 0; i < columns.length; i++) {
            const colspan = columns[i].colspan || 1;
            for (let j = 0; j < colspan; j++) {
                colgroupElement.append(this._createCol(columns[i]))
            }
        }
        return colgroupElement
    }
    _createCol(column) {
        let width = column.visibleWidth || column.width;
        if ("adaptiveHidden" === width) {
            width = "0.0001px"
        }
        const col = $("<col>");
        setWidth(col, width);
        return col
    }
    renderDelayedTemplates(change) {
        const delayedTemplates = this._delayedTemplates;
        const syncTemplates = delayedTemplates.filter((template => !template.async));
        const asyncTemplates = delayedTemplates.filter((template => template.async));
        this._delayedTemplates = [];
        this._renderDelayedTemplatesCore(syncTemplates, false, change);
        this._renderDelayedTemplatesCoreAsync(asyncTemplates)
    }
    _renderDelayedTemplatesCoreAsync(templates) {
        if (templates.length) {
            const templateTimeout = getWindow().setTimeout((() => {
                this._templateTimeouts.delete(templateTimeout);
                this._renderDelayedTemplatesCore(templates, true)
            }));
            this._templateTimeouts.add(templateTimeout)
        }
    }
    _renderDelayedTemplatesCore(templates, isAsync, change) {
        const date = new Date;
        while (templates.length) {
            const templateParameters = templates.shift();
            const {
                options: options
            } = templateParameters;
            const doc = domAdapter.getRootNode($(options.container).get(0));
            const needWaitAsyncTemplates = this.needWaitAsyncTemplates();
            if (!isAsync || $(options.container).closest(doc).length || needWaitAsyncTemplates) {
                if (change) {
                    options.change = change
                }
                templateParameters.template.render(options)
            }
            if (isAsync && new Date - date > 30) {
                this._renderDelayedTemplatesCoreAsync(templates);
                break
            }
        }
        if (!templates.length && this._delayedTemplates.length) {
            this.renderDelayedTemplates()
        }
    }
    _processTemplate(template, options) {
        const that = this;
        let renderingTemplate;
        if (template && template.render && !isRenderer(template)) {
            renderingTemplate = {
                allowRenderToDetachedContainer: template.allowRenderToDetachedContainer,
                render(options) {
                    template.render(options.container, options.model, options.change);
                    options.deferred && options.deferred.resolve()
                }
            }
        } else if (isFunction(template)) {
            renderingTemplate = {
                render(options) {
                    const renderedTemplate = template(getPublicElement(options.container), options.model, options.change);
                    if (renderedTemplate && (renderedTemplate.nodeType || isRenderer(renderedTemplate))) {
                        options.container.append(renderedTemplate)
                    }
                    options.deferred && options.deferred.resolve()
                }
            }
        } else {
            const templateID = isString(template) ? template : $(template).attr("id");
            if (!templateID) {
                renderingTemplate = that.getTemplate(template)
            } else {
                if (!that._templatesCache[templateID]) {
                    that._templatesCache[templateID] = that.getTemplate(template)
                }
                renderingTemplate = that._templatesCache[templateID]
            }
        }
        return renderingTemplate
    }
    renderTemplate(container, template, options, allowRenderToDetachedContainer, change) {
        const renderingTemplate = this._processTemplate(template, options);
        const {
            column: column
        } = options;
        const isDataRow = "data" === options.rowType;
        const templateDeferred = new Deferred;
        const templateOptions = {
            container: container,
            model: options,
            deferred: templateDeferred,
            onRendered: () => {
                if (this.isDisposed()) {
                    templateDeferred.reject()
                } else {
                    templateDeferred.resolve()
                }
            }
        };
        if (renderingTemplate) {
            options.component = this.component;
            const columnAsync = column && (column.renderAsync && isDataRow || this.option("renderAsync") && (false !== column.renderAsync && (column.command || column.showEditorAlways) && isDataRow || "filter" === options.rowType));
            const async = options.renderAsync ?? columnAsync;
            if ((renderingTemplate.allowRenderToDetachedContainer || allowRenderToDetachedContainer) && !async) {
                renderingTemplate.render(templateOptions)
            } else {
                this._delayedTemplates.push({
                    template: renderingTemplate,
                    options: templateOptions,
                    async: async
                })
            }
            this._templateDeferreds.add(templateDeferred);
            eventsEngine.on(container, removeEvent, removeHandler.bind(null, templateDeferred))
        } else {
            templateDeferred.reject()
        }
        return templateDeferred.promise().always((() => {
            this._templateDeferreds.delete(templateDeferred)
        }))
    }
    _getBodies(tableElement) {
        return $(tableElement).children("tbody").not(".dx-header").not(".dx-footer")
    }
    _needWrapRow($tableElement) {
        var _this$_getBodies;
        const hasRowTemplate = !!this.option().rowTemplate;
        return hasRowTemplate && !!(null !== (_this$_getBodies = this._getBodies($tableElement)) && void 0 !== _this$_getBodies && _this$_getBodies.filter(".dx-row").length)
    }
    _wrapRowIfNeed($table, $row, isRefreshing) {
        const $tableElement = isRefreshing ? $table || this._tableElement : this._tableElement || $table;
        const needWrapRow = this._needWrapRow($tableElement);
        if (needWrapRow) {
            const $tbody = $("<tbody>").addClass($row.attr("class"));
            this.setAria("role", "presentation", $tbody);
            return $tbody.append($row)
        }
        return $row
    }
    _appendRow($table, $row, appendTemplate) {
        appendTemplate = appendTemplate || appendElementTemplate;
        appendTemplate.render({
            content: $row,
            container: $table
        })
    }
    _resizeCore() {
        const scrollLeft = this._scrollLeft;
        if (scrollLeft >= 0) {
            this._scrollLeft = 0;
            this.scrollTo({
                left: scrollLeft
            })
        }
    }
    _renderCore(e) {
        const $root = this.element().parent();
        if (!$root || $root.parent().length) {
            this.renderDelayedTemplates(e)
        }
    }
    _renderTable(options) {
        options = options || {};
        options.columns = this._columnsController.getVisibleColumns();
        const changeType = options.change && options.change.changeType;
        const $table = this._createTable(options.columns, "append" === changeType || "prepend" === changeType || "update" === changeType);
        this._renderRows($table, options);
        return $table
    }
    _renderRows($table, options) {
        const that = this;
        const rows = that._getRows(options.change);
        const columnIndices = options.change && options.change.columnIndices || [];
        const changeTypes = options.change && options.change.changeTypes || [];
        for (let i = 0; i < rows.length; i++) {
            that._renderRow($table, extend({
                row: rows[i],
                columnIndices: columnIndices[i],
                changeType: changeTypes[i]
            }, options))
        }
    }
    _renderRow($table, options) {
        if (!options.columnIndices) {
            options.row.cells = []
        }
        const $row = this._createRow(options.row);
        const $wrappedRow = this._wrapRowIfNeed($table, $row);
        if ("remove" !== options.changeType) {
            this._renderCells($row, options)
        }
        this._appendRow($table, $wrappedRow);
        const rowOptions = extend({
            columns: options.columns
        }, options.row);
        this._addWatchMethod(rowOptions, options.row);
        this._rowPrepared($wrappedRow, rowOptions, options.row)
    }
    _needRenderCell(columnIndex, columnIndices) {
        return !columnIndices || columnIndices.indexOf(columnIndex) >= 0
    }
    _renderCells($row, options) {
        const that = this;
        let columnIndex = 0;
        const {
            row: row
        } = options;
        const {
            columns: columns
        } = options;
        for (let i = 0; i < columns.length; i++) {
            if (this._needRenderCell(i, options.columnIndices)) {
                that._renderCell($row, extend({
                    column: columns[i],
                    columnIndex: columnIndex,
                    value: row.values && row.values[columnIndex],
                    oldValue: row.oldValues && row.oldValues[columnIndex]
                }, options))
            }
            if (columns[i].colspan > 1) {
                columnIndex += columns[i].colspan
            } else {
                columnIndex++
            }
        }
    }
    _updateCells($rowElement, $newRowElement, columnIndices) {
        const $cells = $rowElement.children();
        const $newCells = $newRowElement.children();
        const highlightChanges = this.option("highlightChanges");
        const cellUpdatedClass = this.addWidgetPrefix("cell-updated-animation");
        columnIndices.forEach(((columnIndex, index) => {
            const $cell = $cells.eq(columnIndex);
            const $newCell = $newCells.eq(index);
            $cell.replaceWith($newCell);
            if (highlightChanges && !$newCell.hasClass("dx-command-expand")) {
                $newCell.addClass(cellUpdatedClass)
            }
        }));
        copyAttributes($rowElement.get(0), $newRowElement.get(0))
    }
    _setCellAriaAttributes($cell, cellOptions) {
        if ("freeSpace" !== cellOptions.rowType) {
            this.setAria("role", "gridcell", $cell);
            const columnIndexOffset = this._columnsController.getColumnIndexOffset();
            const ariaColIndex = cellOptions.columnIndex + columnIndexOffset + 1;
            this.setAria("colindex", ariaColIndex, $cell)
        }
    }
    _renderCell($row, options) {
        const cellOptions = this._getCellOptions(options);
        if (options.columnIndices) {
            if (options.row.cells) {
                const cellIndex = options.row.cells.findIndex((cell => cell.columnIndex === cellOptions.columnIndex));
                options.row.cells[cellIndex] = cellOptions
            }
        } else {
            options.row.cells.push(cellOptions)
        }
        const $cell = this._createCell(cellOptions);
        this._setCellAriaAttributes($cell, cellOptions);
        this._renderCellContent($cell, cellOptions, options);
        $row.get(0).appendChild($cell.get(0));
        return $cell
    }
    _renderCellContent($cell, options, renderOptions) {
        const template = this._getCellTemplate(options);
        when(!template || this.renderTemplate($cell, template, options, void 0, renderOptions.change)).done((() => {
            this._updateCell($cell, options)
        }))
    }
    _getCellTemplate(options) {}
    _getRows(change) {
        return []
    }
    _getCellOptions(options) {
        const cellOptions = {
            column: options.column,
            columnIndex: options.columnIndex,
            rowType: options.row.rowType,
            isAltRow: this._isAltRow(options.row)
        };
        this._addWatchMethod(cellOptions);
        return cellOptions
    }
    _addWatchMethod(options, source) {
        if (!this.option("repaintChangesOnly")) {
            return
        }
        const watchers = [];
        source = source || options;
        source.watch = source.watch || function(getter, updateValueFunc, updateRowFunc) {
            let oldValue = getter(source.data);
            const watcher = function(row) {
                if (row && updateRowFunc) {
                    updateRowFunc(row)
                }
                const newValue = getter(source.data);
                if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                    if (row) {
                        updateValueFunc(newValue)
                    }
                    oldValue = newValue
                }
            };
            watchers.push(watcher);
            return function() {
                const index = watchers.indexOf(watcher);
                if (index >= 0) {
                    watchers.splice(index, 1)
                }
            }
        };
        source.update = source.update || function(row, keepRow) {
            if (row) {
                this.data = options.data = row.data;
                this.rowIndex = options.rowIndex = row.rowIndex;
                this.dataIndex = options.dataIndex = row.dataIndex;
                this.isExpanded = options.isExpanded = row.isExpanded;
                if (options.row && !keepRow) {
                    options.row = row
                }
            }
            watchers.forEach((watcher => {
                watcher(row)
            }))
        };
        if (source !== options) {
            options.watch = source.watch.bind(source)
        }
        return options
    }
    _cellPrepared(cell, options) {
        options.cellElement = getPublicElement($(cell));
        this.executeAction("onCellPrepared", options)
    }
    _rowPrepared($row, options, row) {
        elementData($row.get(0), "options", options);
        options.rowElement = getPublicElement($row);
        this.executeAction("onRowPrepared", options)
    }
    _columnOptionChanged(e) {
        const {
            optionNames: optionNames
        } = e;
        if (gridCoreUtils.checkChanges(optionNames, ["width", "visibleWidth"])) {
            const visibleColumns = this._columnsController.getVisibleColumns();
            const widths = visibleColumns.map((column => column.visibleWidth || column.width));
            this.setColumnWidths({
                widths: widths,
                optionNames: optionNames
            });
            return
        }
        if (!this._requireReady) {
            this.render()
        }
    }
    getCellIndex($cell, rowIndex) {
        const cellIndex = $cell.length ? $cell[0].cellIndex : -1;
        return cellIndex
    }
    getTableElements() {
        return this._tableElement || $()
    }
    getTableElement(isFixedTableRendering) {
        return this._tableElement
    }
    setTableElement(tableElement, isFixedTableRendering) {
        this._tableElement = tableElement
    }
    _afterRowPrepared(e) {}
    _handleDataChanged(e) {}
    callbackNames() {
        return ["scrollChanged"]
    }
    _updateScrollLeftPosition() {
        const scrollLeft = this._scrollLeft;
        if (scrollLeft >= 0) {
            this._scrollLeft = 0;
            this.scrollTo({
                left: scrollLeft
            })
        }
    }
    scrollTo(pos) {
        const $element = this.element();
        const $scrollContainer = $element && $element.children(`.${this.addWidgetPrefix("scroll-container")}`).not(`.${this.addWidgetPrefix("content-fixed")}`);
        if (isDefined(pos) && isDefined(pos.left) && this._scrollLeft !== pos.left) {
            this._scrollLeft = pos.left;
            $scrollContainer && $scrollContainer.scrollLeft(pos.left)
        }
    }
    _getContent(isFixedTableRendering) {
        var _this$_tableElement;
        return null === (_this$_tableElement = this._tableElement) || void 0 === _this$_tableElement ? void 0 : _this$_tableElement.parent()
    }
    _removeContent(isFixedTableRendering) {
        const $scrollContainer = this._getContent(isFixedTableRendering);
        if (null !== $scrollContainer && void 0 !== $scrollContainer && $scrollContainer.length) {
            $scrollContainer.remove()
        }
    }
    _wrapTableInScrollContainer($table, isFixedTableRendering) {
        const $scrollContainer = $("<div>");
        const useNative = this.option("scrolling.useNative");
        if (false === useNative || "auto" === useNative && !nativeScrolling) {
            $scrollContainer.addClass(this.addWidgetPrefix("scrollable-simulated"))
        }
        eventsEngine.on($scrollContainer, "scroll", (() => {
            const scrollLeft = $scrollContainer.scrollLeft();
            if (scrollLeft !== this._scrollLeft) {
                this.scrollChanged.fire({
                    left: scrollLeft
                }, this.name)
            }
        }));
        $scrollContainer.addClass(this.addWidgetPrefix("content")).addClass(this.addWidgetPrefix("scroll-container")).append($table).appendTo(this.element());
        this.setAria("role", "presentation", $scrollContainer);
        return $scrollContainer
    }
    needWaitAsyncTemplates() {
        return this.option("templatesRenderAsynchronously") && false === this.option("renderAsync")
    }
    waitAsyncTemplates() {
        let forceWaiting = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
        const result = new Deferred;
        const needWaitAsyncTemplates = forceWaiting || this.needWaitAsyncTemplates();
        if (!needWaitAsyncTemplates) {
            return result.resolve()
        }
        const waitTemplatesRecursion = () => when.apply(this, Array.from(this._templateDeferreds)).done((() => {
            if (this.isDisposed()) {
                result.reject()
            } else if (this._templateDeferreds.size > 0) {
                waitTemplatesRecursion()
            } else {
                result.resolve()
            }
        })).fail(result.reject);
        waitTemplatesRecursion();
        return result.promise()
    }
    _updateContent($newTableElement, change, isFixedTableRendering) {
        return this.waitAsyncTemplates().done((() => {
            this._removeContent(isFixedTableRendering);
            this.setTableElement($newTableElement, isFixedTableRendering);
            this._wrapTableInScrollContainer($newTableElement, isFixedTableRendering)
        }))
    }
    _findContentElement(isFixedTableRendering) {}
    _getWidths($cellElements) {
        if (!$cellElements) {
            return []
        }
        const result = [];
        const cellElements = $cellElements.toArray();
        cellElements.forEach((cell => {
            let width = cell.offsetWidth;
            if (cell.getBoundingClientRect) {
                const rect = getBoundingRect(cell);
                if (rect.width > cell.offsetWidth - 1) {
                    width = rect.width
                }
            }
            result.push(width)
        }));
        return result
    }
    getColumnWidths($tableElement) {
        (this.option("forceApplyBindings") || noop)();
        $tableElement = $tableElement ?? this.getTableElement();
        if ($tableElement) {
            const $rows = $tableElement.children("tbody:not(.dx-header)").children();
            for (let i = 0; i < $rows.length; i++) {
                const $row = $rows.eq(i);
                const isGroupRow = $row.hasClass("dx-group-row");
                const isDetailRow = $row.hasClass(DETAIL_ROW_CLASS);
                const isErrorRow = $row.hasClass("dx-error-row");
                const isRowVisible = "none" !== $row.get(0).style.display && !$row.hasClass("dx-state-invisible");
                const isRelevantRow = !isGroupRow && !isDetailRow && !isErrorRow;
                if (isRowVisible && isRelevantRow) {
                    const $cells = $row.children("td");
                    const result = this._getWidths($cells);
                    return result
                }
            }
        }
        return []
    }
    getVisibleColumnIndex(columnIndex, rowIndex) {
        return columnIndex
    }
    setColumnWidths(_ref2) {
        let {
            widths: widths,
            optionNames: optionNames
        } = _ref2;
        const $tableElement = this.getTableElement();
        if (!(null !== $tableElement && void 0 !== $tableElement && $tableElement.length) || !widths) {
            return
        }
        const columns = this.getColumns();
        const columnAutoWidth = this.option("columnAutoWidth");
        const $cols = $tableElement.children("colgroup").children("col");
        $cols.toArray().forEach((col => col.removeAttribute("style")));
        columns.forEach(((column, columnIndex) => {
            if (columnAutoWidth && column.width && !column.command) {
                const width = getWidthStyle(column.visibleWidth || column.width);
                const minWidth = getWidthStyle(column.minWidth || width);
                const $rows = $tableElement.children().children(".dx-row").not(`.${DETAIL_ROW_CLASS}`);
                for (let rowIndex = 0; rowIndex < $rows.length; rowIndex++) {
                    const visibleIndex = this.getVisibleColumnIndex(columnIndex, rowIndex);
                    if (visibleIndex >= 0) {
                        const $row = $rows.eq(rowIndex);
                        const $cell = $row.hasClass("dx-group-row") ? $row.find(`td[aria-colindex='${visibleIndex+1}']:not(.dx-group-cell)`) : $row.find("td").eq(visibleIndex);
                        if ($cell.length) {
                            const cell = $cell.get(0);
                            setCellWidth(cell, column, width);
                            cell.style.minWidth = minWidth
                        }
                    }
                }
            }
            const colWidth = normalizeWidth(widths[columnIndex]);
            if (isDefined(colWidth)) {
                setWidth($cols.eq(columnIndex), colWidth)
            }
        }))
    }
    getCellElements(rowIndex) {
        return this._getCellElementsCore(rowIndex)
    }
    _getCellElementsCore(rowIndex) {
        if (rowIndex < 0) {
            return
        }
        const $row = this._getRowElements().eq(rowIndex);
        return $row.children()
    }
    _getCellElement(rowIndex, columnIdentifier) {
        const $cells = this.getCellElements(rowIndex);
        const columnVisibleIndex = this._getVisibleColumnIndex($cells, rowIndex, columnIdentifier);
        if (!(null !== $cells && void 0 !== $cells && $cells.length) || columnVisibleIndex < 0) {
            return
        }
        const $cell = $cells.eq(columnVisibleIndex);
        return $cell.length > 0 ? $cell : void 0
    }
    _getRowElement(rowIndex) {
        const that = this;
        let $rowElement = $();
        const $tableElements = that.getTableElements();
        iteratorUtils.each($tableElements, ((_, tableElement) => {
            $rowElement = $rowElement.add(that._getRowElements($(tableElement)).eq(rowIndex))
        }));
        if ($rowElement.length) {
            return $rowElement
        }
        return
    }
    getCellElement(rowIndex, columnIdentifier) {
        const $cell = this._getCellElement(rowIndex, columnIdentifier);
        if ($cell) {
            return getPublicElement($cell)
        }
        return
    }
    getRowElement(rowIndex) {
        const $rows = this._getRowElement(rowIndex);
        let elements = [];
        if ($rows && !getPublicElement($rows).get) {
            for (let i = 0; i < $rows.length; i++) {
                elements.push($rows[i])
            }
        } else {
            elements = $rows
        }
        return elements
    }
    _getVisibleColumnIndex($cells, rowIndex, columnIdentifier) {
        if (isString(columnIdentifier)) {
            const columnIndex = this._columnsController.columnOption(columnIdentifier, "index");
            return this._columnsController.getVisibleIndex(columnIndex)
        }
        return columnIdentifier
    }
    getColumnElements() {}
    getColumns(rowIndex, $tableElement) {
        return this._columnsController.getVisibleColumns(rowIndex)
    }
    getCell(cellPosition, rows, cells) {
        const $rows = rows || this._getRowElements();
        let $cells;
        if ($rows.length > 0 && cellPosition.rowIndex >= 0) {
            var _$cells;
            if ("virtual" !== this.option("scrolling.mode") && "virtual" !== this.option("scrolling.rowRenderingMode")) {
                cellPosition.rowIndex = cellPosition.rowIndex < $rows.length ? cellPosition.rowIndex : $rows.length - 1
            }
            $cells = cells || this.getCellElements(cellPosition.rowIndex);
            if ((null === (_$cells = $cells) || void 0 === _$cells ? void 0 : _$cells.length) > 0) {
                return $cells.eq($cells.length > cellPosition.columnIndex ? cellPosition.columnIndex : $cells.length - 1)
            }
        }
    }
    getRowsCount() {
        const tableElement = this.getTableElement();
        if (tableElement && 1 === tableElement.length) {
            return tableElement[0].rows.length
        }
        return 0
    }
    _getRowElementsCore(tableElement) {
        tableElement = tableElement || this.getTableElement();
        if (tableElement) {
            const hasRowTemplate = this.option().rowTemplate || this.option("dataRowTemplate");
            const tBodies = hasRowTemplate && tableElement.find("> tbody.dx-row");
            return tBodies && tBodies.length ? tBodies : tableElement.find("> tbody > .dx-row, > .dx-row")
        }
        return $()
    }
    _getRowElements(tableElement) {
        return this._getRowElementsCore(tableElement)
    }
    getRowIndex($row) {
        return this._getRowElements().index($row)
    }
    getBoundingRect() {}
    getName() {}
    setScrollerSpacing(width) {
        const $element = this.element();
        const rtlEnabled = this.option("rtlEnabled");
        $element && $element.css({
            paddingLeft: rtlEnabled ? width : "",
            paddingRight: !rtlEnabled ? width : ""
        })
    }
    isScrollbarVisible(isHorizontal) {
        const $element = this.element();
        const $tableElement = this._tableElement;
        if ($element && $tableElement) {
            return isHorizontal ? getOuterWidth($tableElement) - getWidth($element) > 0 : getOuterHeight($tableElement) - getHeight($element) > 0
        }
        return false
    }
    isDisposed() {
        var _this$component;
        return null === (_this$component = this.component) || void 0 === _this$component ? void 0 : _this$component._disposed
    }
}
