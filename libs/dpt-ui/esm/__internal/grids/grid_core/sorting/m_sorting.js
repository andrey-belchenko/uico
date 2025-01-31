/**
 * DevExtreme (esm/__internal/grids/grid_core/sorting/m_sorting.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    isDefined
} from "../../../../core/utils/type";
import {
    name as clickEventName
} from "../../../../events/click";
import eventsEngine from "../../../../events/core/events_engine";
import {
    addNamespace,
    isCommandKeyPressed
} from "../../../../events/utils/index";
import messageLocalization from "../../../../localization/message";
import sortingMixin from "./m_sorting_mixin";
const COLUMN_HEADERS_VIEW_NAMESPACE = "dxDataGridColumnHeadersView";
const columnHeadersView = Base => class extends(sortingMixin(Base)) {
    optionChanged(args) {
        const that = this;
        if ("sorting" === args.name) {
            that._invalidate();
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
    _createRow(row) {
        const $row = super._createRow(row);
        if ("header" === row.rowType) {
            eventsEngine.on($row, addNamespace(clickEventName, "dxDataGridColumnHeadersView"), "td", this.createAction((e => {
                this._processHeaderAction(e.event, $row)
            })))
        }
        return $row
    }
    _processHeaderAction(event, $row) {
        if ($(event.currentTarget).parent().get(0) !== $row.get(0)) {
            return
        }
        const that = this;
        let keyName = null;
        const $cellElementFromEvent = $(event.currentTarget);
        const rowIndex = $cellElementFromEvent.parent().index();
        let columnIndex = -1;
        [].slice.call(that.getCellElements(rowIndex)).some((($cellElement, index) => {
            if ($cellElement === $cellElementFromEvent.get(0)) {
                columnIndex = index;
                return true
            }
            return
        }));
        const visibleColumns = that._columnsController.getVisibleColumns(rowIndex);
        const column = visibleColumns[columnIndex];
        const editingController = that.getController("editing");
        const editingMode = that.option("editing.mode");
        const isCellEditing = editingController && editingController.isEditing() && ("batch" === editingMode || "cell" === editingMode);
        if (isCellEditing || !that._isSortableElement($(event.target))) {
            return
        }
        if (column && !isDefined(column.groupIndex) && !column.command) {
            if (event.shiftKey) {
                keyName = "shift"
            } else if (isCommandKeyPressed(event)) {
                keyName = "ctrl"
            }
            setTimeout((() => {
                that._columnsController.changeSortOrder(column.index, keyName)
            }))
        }
    }
    _renderCellContent($cell, options) {
        const that = this;
        const {
            column: column
        } = options;
        if (!column.command && "header" === options.rowType) {
            that._applyColumnState({
                name: "sort",
                rootElement: $cell,
                column: column,
                showColumnLines: that.option("showColumnLines")
            })
        }
        super._renderCellContent.apply(this, arguments)
    }
    _columnOptionChanged(e) {
        const {
            changeTypes: changeTypes
        } = e;
        if (1 === changeTypes.length && changeTypes.sorting) {
            this._updateIndicators("sort");
            return
        }
        super._columnOptionChanged(e)
    }
};
const headerPanel = Base => class extends(sortingMixin(Base)) {
    optionChanged(args) {
        const that = this;
        if ("sorting" === args.name) {
            that._invalidate();
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
    _createGroupPanelItem($rootElement, groupColumn) {
        const that = this;
        const $item = super._createGroupPanelItem(...arguments);
        eventsEngine.on($item, addNamespace(clickEventName, "dxDataGridHeaderPanel"), that.createAction((() => {
            that._processGroupItemAction(groupColumn.index)
        })));
        that._applyColumnState({
            name: "sort",
            rootElement: $item,
            column: {
                alignment: that.option("rtlEnabled") ? "right" : "left",
                allowSorting: groupColumn.allowSorting,
                sortOrder: "desc" === groupColumn.sortOrder ? "desc" : "asc",
                isGrouped: true
            },
            showColumnLines: true
        });
        return $item
    }
    _processGroupItemAction(groupColumnIndex) {
        setTimeout((() => this.getController("columns").changeSortOrder(groupColumnIndex)))
    }
};
export const sortingModule = {
    defaultOptions: () => ({
        sorting: {
            mode: "single",
            ascendingText: messageLocalization.format("dxDataGrid-sortingAscendingText"),
            descendingText: messageLocalization.format("dxDataGrid-sortingDescendingText"),
            clearText: messageLocalization.format("dxDataGrid-sortingClearText"),
            showSortIndexes: true
        }
    }),
    extenders: {
        views: {
            columnHeadersView: columnHeadersView,
            headerPanel: headerPanel
        }
    }
};
