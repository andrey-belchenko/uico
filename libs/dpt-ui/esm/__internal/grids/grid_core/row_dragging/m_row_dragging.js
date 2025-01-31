/**
 * DevExtreme (esm/__internal/grids/grid_core/row_dragging/m_row_dragging.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/../core/renderer";
import {
    extend
} from "../../../../core/../core/utils/extend";
import {
    deferUpdate
} from "../../../../core/utils/common";
import {
    getWidth,
    setWidth
} from "../../../../core/utils/size";
import {
    isDefined
} from "../../../../core/utils/type";
import Sortable from "../../../../ui/sortable";
import gridCoreUtils from "../m_utils";
import {
    ATTRIBUTES,
    CLASSES
} from "./const";
import {
    GridCoreRowDraggingDom
} from "./dom";
const rowsView = Base => class extends Base {
    init() {
        super.init.apply(this, arguments);
        this._updateHandleColumn()
    }
    optionChanged(args) {
        if ("rowDragging" === args.name) {
            this._updateHandleColumn();
            this._invalidate(true, true);
            args.handled = true
        }
        super.optionChanged.apply(this, arguments)
    }
    _allowReordering() {
        const rowDragging = this.option("rowDragging");
        return !!(rowDragging && (rowDragging.allowReordering || rowDragging.allowDropInsideItem || rowDragging.group))
    }
    _updateHandleColumn() {
        const rowDragging = this.option("rowDragging");
        const allowReordering = this._allowReordering();
        const columnsController = this._columnsController;
        const isHandleColumnVisible = allowReordering && rowDragging.showDragIcons;
        null === columnsController || void 0 === columnsController || columnsController.addCommandColumn({
            type: "drag",
            command: "drag",
            visibleIndex: -2,
            alignment: "center",
            elementAttr: [{
                name: ATTRIBUTES.dragCell,
                value: ""
            }],
            cssClass: CLASSES.commandDrag,
            width: "auto",
            cellTemplate: this._getHandleTemplate(),
            visible: isHandleColumnVisible
        });
        null === columnsController || void 0 === columnsController || columnsController.columnOption("type:drag", "visible", isHandleColumnVisible)
    }
    _renderContent() {
        const rowDragging = this.option("rowDragging");
        const allowReordering = this._allowReordering();
        const $content = super._renderContent.apply(this, arguments);
        const isFixedTableRendering = this._isFixedTableRendering;
        const currentSortableName = isFixedTableRendering ? "_sortableFixed" : "_sortable";
        const anotherSortableName = isFixedTableRendering ? "_sortable" : "_sortableFixed";
        const togglePointerEventsStyle = toggle => {
            var _this$sortableFixedNa;
            null === (_this$sortableFixedNa = this._sortableFixed) || void 0 === _this$sortableFixedNa || _this$sortableFixedNa.$element().css("pointerEvents", toggle ? "auto" : "")
        };
        const rowSelector = ".dx-row:not(.dx-freespace-row):not(.dx-virtual-row):not(.dx-header-row):not(.dx-footer-row)";
        const filter = this.option("dataRowTemplate") ? `> table > tbody${rowSelector}` : `> table > tbody > ${rowSelector}`;
        if ((allowReordering || this[currentSortableName]) && $content.length) {
            this[currentSortableName] = this._createComponent($content, Sortable, extend({
                component: this.component,
                contentTemplate: null,
                filter: filter,
                cursorOffset: options => {
                    const {
                        event: event
                    } = options;
                    const rowsViewOffset = $(this.element()).offset();
                    return {
                        x: event.pageX - rowsViewOffset.left
                    }
                },
                onDraggableElementShown: e => {
                    if (rowDragging.dragTemplate) {
                        return
                    }
                    const $dragElement = $(e.dragElement);
                    const gridInstance = $dragElement.children(".dx-widget").data(this.component.NAME);
                    this._synchronizeScrollLeftPosition(gridInstance)
                },
                dragTemplate: this._getDraggableRowTemplate(),
                handle: rowDragging.showDragIcons && `.${CLASSES.commandDrag}`,
                dropFeedbackMode: "indicate"
            }, rowDragging, {
                onDragStart: e => {
                    var _this$getController, _rowDragging$onDragSt;
                    null === (_this$getController = this.getController("keyboardNavigation")) || void 0 === _this$getController || _this$getController._resetFocusedCell();
                    const row = e.component.getVisibleRows()[e.fromIndex];
                    e.itemData = row && row.data;
                    const isDataRow = row && "data" === row.rowType;
                    e.cancel = !allowReordering || !isDataRow;
                    null === (_rowDragging$onDragSt = rowDragging.onDragStart) || void 0 === _rowDragging$onDragSt || _rowDragging$onDragSt.call(rowDragging, e)
                },
                onDragEnter: () => {
                    togglePointerEventsStyle(true)
                },
                onDragLeave: () => {
                    togglePointerEventsStyle(false)
                },
                onDragEnd: e => {
                    var _rowDragging$onDragEn;
                    togglePointerEventsStyle(false);
                    null === (_rowDragging$onDragEn = rowDragging.onDragEnd) || void 0 === _rowDragging$onDragEn || _rowDragging$onDragEn.call(rowDragging, e)
                },
                onAdd: e => {
                    var _rowDragging$onAdd;
                    togglePointerEventsStyle(false);
                    null === (_rowDragging$onAdd = rowDragging.onAdd) || void 0 === _rowDragging$onAdd || _rowDragging$onAdd.call(rowDragging, e)
                },
                dropFeedbackMode: rowDragging.dropFeedbackMode,
                onOptionChanged: e => {
                    const hasFixedSortable = this._sortableFixed;
                    if (hasFixedSortable) {
                        if ("fromIndex" === e.name || "toIndex" === e.name) {
                            this[anotherSortableName].option(e.name, e.value)
                        }
                    }
                }
            }));
            $content.toggleClass("dx-scrollable-container", isFixedTableRendering);
            $content.toggleClass(CLASSES.sortableWithoutHandle, allowReordering && !rowDragging.showDragIcons)
        }
        return $content
    }
    _renderCore(e) {
        super._renderCore.apply(this, arguments);
        if (e && "update" === e.changeType && e.repaintChangesOnly && gridCoreUtils.isVirtualRowRendering(this)) {
            deferUpdate((() => {
                this._updateSortable()
            }))
        }
    }
    _updateSortable() {
        const offset = this._dataController.getRowIndexOffset();
        const offsetDiff = offset - this._previousOffset;
        [this._sortable, this._sortableFixed].forEach((sortable => {
            const toIndex = null === sortable || void 0 === sortable ? void 0 : sortable.option("toIndex");
            if (isDefined(toIndex) && isDefined(this._previousOffset)) {
                null === sortable || void 0 === sortable || sortable.option("toIndex", toIndex - offsetDiff)
            }
            null === sortable || void 0 === sortable || sortable.option("offset", offset);
            null === sortable || void 0 === sortable || sortable.update()
        }));
        this._previousOffset = offset
    }
    _resizeCore() {
        super._resizeCore.apply(this, arguments);
        this._updateSortable()
    }
    _getDraggableGridOptions(options) {
        const gridOptions = this.option();
        const columns = this.getColumns();
        const $rowElement = $(this.getRowElement(options.rowIndex));
        return {
            dataSource: [{
                id: 1,
                parentId: 0
            }],
            showBorders: true,
            showColumnHeaders: false,
            scrolling: {
                useNative: false,
                showScrollbar: "never"
            },
            pager: {
                visible: false
            },
            loadingTimeout: null,
            columnFixing: gridOptions.columnFixing,
            columnAutoWidth: gridOptions.columnAutoWidth,
            showColumnLines: gridOptions.showColumnLines,
            columns: columns.map((column => ({
                width: column.width || column.visibleWidth,
                fixed: column.fixed,
                fixedPosition: column.fixedPosition
            }))),
            onRowPrepared: e => {
                const rowsView = e.component.getView("rowsView");
                $(e.rowElement).replaceWith($rowElement.eq(rowsView._isFixedTableRendering ? 1 : 0).clone())
            }
        }
    }
    _synchronizeScrollLeftPosition(gridInstance) {
        const scrollable = null === gridInstance || void 0 === gridInstance ? void 0 : gridInstance.getScrollable();
        null === scrollable || void 0 === scrollable || scrollable.scrollTo({
            x: this._scrollLeft
        })
    }
    _getDraggableRowTemplate() {
        return options => {
            const $rootElement = this.component.$element();
            const $dataGridContainer = $("<div>");
            setWidth($dataGridContainer, getWidth($rootElement));
            const items = this._dataController.items();
            const row = items && items[options.fromIndex];
            const gridOptions = this._getDraggableGridOptions(row);
            this._createComponent($dataGridContainer, this.component.NAME, gridOptions);
            $dataGridContainer.find(".dx-gridbase-container").children(`:not(.${this.addWidgetPrefix(CLASSES.rowsView)})`).hide();
            $dataGridContainer.addClass(this.addWidgetPrefix(CLASSES.dragView));
            return $dataGridContainer
        }
    }
    _getHandleTemplate() {
        return GridCoreRowDraggingDom.createHandleTemplateFunc((string => this.addWidgetPrefix(string)))
    }
};
export const rowDraggingModule = {
    defaultOptions: () => ({
        rowDragging: {
            showDragIcons: true,
            dropFeedbackMode: "indicate",
            allowReordering: false,
            allowDropInsideItem: false
        }
    }),
    extenders: {
        views: {
            rowsView: rowsView
        }
    }
};
