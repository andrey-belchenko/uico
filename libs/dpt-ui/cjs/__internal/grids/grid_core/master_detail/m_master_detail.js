/**
 * DevExtreme (cjs/__internal/grids/grid_core/master_detail/m_master_detail.js)
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
exports.masterDetailModule = exports.dataMasterDetailExtenderMixin = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _m_utils = _interopRequireDefault(require("../m_utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const MASTER_DETAIL_CELL_CLASS = "dx-master-detail-cell";
const MASTER_DETAIL_ROW_CLASS = "dx-master-detail-row";
const CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
const ROW_LINES_CLASS = "dx-row-lines";
const columns = Base => class extends Base {
    _getExpandColumnsCore() {
        const expandColumns = super._getExpandColumnsCore();
        if (this.option("masterDetail.enabled")) {
            expandColumns.push({
                type: "detailExpand",
                cellTemplate: _m_utils.default.getExpandCellTemplate()
            })
        }
        return expandColumns
    }
};
const initMasterDetail = function(that) {
    that._expandedItems = [];
    that._isExpandAll = that.option("masterDetail.autoExpandAll")
};
const dataMasterDetailExtenderMixin = Base => class extends Base {
    init() {
        initMasterDetail(this);
        super.init()
    }
    expandAll(groupIndex) {
        const that = this;
        if (groupIndex < 0) {
            that._isExpandAll = true;
            that._expandedItems = [];
            that.updateItems()
        } else {
            super.expandAll.apply(that, arguments)
        }
    }
    collapseAll(groupIndex) {
        const that = this;
        if (groupIndex < 0) {
            that._isExpandAll = false;
            that._expandedItems = [];
            that.updateItems()
        } else {
            super.collapseAll.apply(that, arguments)
        }
    }
    isRowExpandedHack() {
        return super.isRowExpanded.apply(this, arguments)
    }
    isRowExpanded(key) {
        const that = this;
        const expandIndex = _m_utils.default.getIndexByKey(key, that._expandedItems);
        if (Array.isArray(key)) {
            return super.isRowExpanded.apply(that, arguments)
        }
        return !!(that._isExpandAll ^ (expandIndex >= 0 && that._expandedItems[expandIndex].visible))
    }
    _getRowIndicesForExpand(key) {
        const rowIndex = this.getRowIndexByKey(key);
        return [rowIndex, rowIndex + 1]
    }
    _changeRowExpandCore(key) {
        const that = this;
        let result;
        if (Array.isArray(key)) {
            result = super._changeRowExpandCore.apply(that, arguments)
        } else {
            const expandIndex = _m_utils.default.getIndexByKey(key, that._expandedItems);
            if (expandIndex >= 0) {
                const {
                    visible: visible
                } = that._expandedItems[expandIndex];
                that._expandedItems[expandIndex].visible = !visible
            } else {
                that._expandedItems.push({
                    key: key,
                    visible: true
                })
            }
            that.updateItems({
                changeType: "update",
                rowIndices: that._getRowIndicesForExpand(key)
            });
            result = (new _deferred.Deferred).resolve()
        }
        return result
    }
    _processDataItemHack() {
        return super._processDataItem.apply(this, arguments)
    }
    _processDataItem(data, options) {
        const dataItem = super._processDataItem.apply(this, arguments);
        dataItem.isExpanded = this.isRowExpanded(dataItem.key);
        if (void 0 === options.detailColumnIndex) {
            options.detailColumnIndex = -1;
            (0, _iterator.each)(options.visibleColumns, ((index, column) => {
                if ("expand" === column.command && !(0, _type.isDefined)(column.groupIndex)) {
                    options.detailColumnIndex = index;
                    return false
                }
                return
            }))
        }
        if (options.detailColumnIndex >= 0) {
            dataItem.values[options.detailColumnIndex] = dataItem.isExpanded
        }
        return dataItem
    }
    _processItemsHack() {
        return super._processItems.apply(this, arguments)
    }
    _processItems(items, change) {
        const that = this;
        const {
            changeType: changeType
        } = change;
        const result = [];
        items = super._processItems.apply(that, arguments);
        if ("loadingAll" === changeType) {
            return items
        }
        if ("refresh" === changeType) {
            that._expandedItems = (0, _common.grep)(that._expandedItems, (item => item.visible))
        }(0, _iterator.each)(items, ((index, item) => {
            result.push(item);
            const expandIndex = _m_utils.default.getIndexByKey(item.key, that._expandedItems);
            if ("data" === item.rowType && (item.isExpanded || expandIndex >= 0) && !item.isNewRow) {
                result.push({
                    visible: item.isExpanded,
                    rowType: "detail",
                    key: item.key,
                    data: item.data,
                    values: []
                })
            }
        }));
        return result
    }
    optionChanged(args) {
        const that = this;
        let isEnabledChanged;
        let isAutoExpandAllChanged;
        if ("masterDetail" === args.name) {
            args.name = "dataSource";
            switch (args.fullName) {
                case "masterDetail": {
                    const value = args.value || {};
                    const previousValue = args.previousValue || {};
                    isEnabledChanged = value.enabled !== previousValue.enabled;
                    isAutoExpandAllChanged = value.autoExpandAll !== previousValue.autoExpandAll;
                    break
                }
                case "masterDetail.template":
                    initMasterDetail(that);
                    break;
                case "masterDetail.enabled":
                    isEnabledChanged = true;
                    break;
                case "masterDetail.autoExpandAll":
                    isAutoExpandAllChanged = true
            }
            if (isEnabledChanged || isAutoExpandAllChanged) {
                initMasterDetail(that)
            }
        }
        super.optionChanged(args)
    }
};
exports.dataMasterDetailExtenderMixin = dataMasterDetailExtenderMixin;
const resizing = Base => class extends Base {
    fireContentReadyAction() {
        super.fireContentReadyAction.apply(this, arguments);
        this._updateParentDataGrids(this.component.$element())
    }
    _updateParentDataGrids($element) {
        const $masterDetailRow = $element.closest(".dx-master-detail-row");
        if ($masterDetailRow.length) {
            (0, _deferred.when)(this._updateMasterDataGrid($masterDetailRow, $element)).done((() => {
                this._updateParentDataGrids($masterDetailRow.parent())
            }))
        }
    }
    _updateMasterDataGrid($masterDetailRow, $detailElement) {
        const masterRowOptions = (0, _renderer.default)($masterDetailRow).data("options");
        const masterDataGrid = (0, _renderer.default)($masterDetailRow).closest(`.${this.getWidgetContainerClass()}`).parent().data("dxDataGrid");
        if (masterRowOptions && masterDataGrid) {
            return this._updateMasterDataGridCore(masterDataGrid, masterRowOptions)
        }
        return
    }
    _updateMasterDataGridCore(masterDataGrid, masterRowOptions) {
        const d = (0, _deferred.Deferred)();
        if (masterDataGrid.getView("rowsView").isFixedColumns()) {
            this._updateFixedMasterDetailGrids(masterDataGrid, masterRowOptions.rowIndex, (0, _renderer.default)(masterRowOptions.rowElement)).done(d.resolve)
        } else {
            if (true === masterDataGrid.option("scrolling.useNative")) {
                masterDataGrid.updateDimensions().done((() => d.resolve(true)));
                return
            }
            const scrollable = masterDataGrid.getScrollable();
            if (scrollable) {
                null === scrollable || void 0 === scrollable || scrollable.update().done((() => d.resolve()))
            } else {
                d.resolve()
            }
        }
        return d.promise()
    }
    _updateFixedMasterDetailGrids(masterDataGrid, masterRowIndex, $detailElement) {
        const d = (0, _deferred.Deferred)();
        const $rows = (0, _renderer.default)(masterDataGrid.getRowElement(masterRowIndex));
        const $tables = (0, _renderer.default)(masterDataGrid.getView("rowsView").getTableElements());
        const rowsNotEqual = 2 === (null === $rows || void 0 === $rows ? void 0 : $rows.length) && (0, _size.getHeight)($rows.eq(0)) !== (0, _size.getHeight)($rows.eq(1));
        const tablesNotEqual = 2 === (null === $tables || void 0 === $tables ? void 0 : $tables.length) && (0, _size.getHeight)($tables.eq(0)) !== (0, _size.getHeight)($tables.eq(1));
        if (rowsNotEqual || tablesNotEqual) {
            const detailElementWidth = (0, _size.getWidth)($detailElement);
            masterDataGrid.updateDimensions().done((() => {
                const isDetailHorizontalScrollCanBeShown = this.option("columnAutoWidth") && true === masterDataGrid.option("scrolling.useNative");
                const isDetailGridWidthChanged = isDetailHorizontalScrollCanBeShown && detailElementWidth !== (0, _size.getWidth)($detailElement);
                if (isDetailHorizontalScrollCanBeShown && isDetailGridWidthChanged) {
                    this.updateDimensions().done((() => d.resolve(true)))
                } else {
                    d.resolve(true)
                }
            }));
            return d.promise()
        }
        return (0, _deferred.Deferred)().resolve()
    }
    _toggleBestFitMode(isBestFit) {
        super._toggleBestFitMode.apply(this, arguments);
        if (this.option("masterDetail.template")) {
            const $rowsTable = this._rowsView.getTableElement();
            if ($rowsTable) {
                $rowsTable.find(".dx-master-detail-cell").css("maxWidth", isBestFit ? 0 : "")
            }
        }
    }
};
const rowsView = Base => class extends Base {
    _getCellTemplate(options) {
        const that = this;
        const {
            column: column
        } = options;
        const editingController = this._editingController;
        const isEditRow = editingController && editingController.isEditRow(options.rowIndex);
        let template;
        if ("detail" === column.command && !isEditRow) {
            template = that.option("masterDetail.template") || {
                allowRenderToDetachedContainer: false,
                render: that._getDefaultTemplate(column)
            }
        } else {
            template = super._getCellTemplate.apply(that, arguments)
        }
        return template
    }
    _isDetailRow(row) {
        return row && row.rowType && 0 === row.rowType.indexOf("detail")
    }
    _createRow(row) {
        const $row = super._createRow.apply(this, arguments);
        if (row && this._isDetailRow(row)) {
            this.option("showRowLines") && $row.addClass("dx-row-lines");
            $row.addClass("dx-master-detail-row");
            if ((0, _type.isDefined)(row.visible)) {
                $row.toggle(row.visible)
            }
        }
        return $row
    }
    _renderCells($row, options) {
        const {
            row: row
        } = options;
        let $detailCell;
        const visibleColumns = this._columnsController.getVisibleColumns();
        if (row.rowType && this._isDetailRow(row)) {
            if (this._needRenderCell(0, options.columnIndices)) {
                $detailCell = this._renderCell($row, {
                    value: null,
                    row: row,
                    rowIndex: row.rowIndex,
                    column: {
                        command: "detail"
                    },
                    columnIndex: 0,
                    change: options.change
                });
                $detailCell.addClass("dx-cell-focus-disabled").addClass("dx-master-detail-cell").attr("colSpan", visibleColumns.length);
                const isEditForm = row.isEditing;
                if (!isEditForm) {
                    $detailCell.attr("aria-roledescription", _message.default.format("dxDataGrid-masterDetail"))
                }
            }
        } else {
            super._renderCells.apply(this, arguments)
        }
    }
};
const masterDetailModule = exports.masterDetailModule = {
    defaultOptions: () => ({
        masterDetail: {
            enabled: false,
            autoExpandAll: false,
            template: null
        }
    }),
    extenders: {
        controllers: {
            columns: columns,
            data: dataMasterDetailExtenderMixin,
            resizing: resizing
        },
        views: {
            rowsView: rowsView
        }
    }
};
