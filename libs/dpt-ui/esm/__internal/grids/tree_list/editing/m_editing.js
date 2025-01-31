/**
 * DevExtreme (esm/__internal/grids/tree_list/editing/m_editing.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import "../module_not_extended/editor_factory";
import $ from "../../../../core/renderer";
import {
    Deferred
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import {
    isDefined
} from "../../../../core/utils/type";
import messageLocalization from "../../../../localization/message";
import errors from "../../../../ui/widget/ui.errors";
import {
    dataControllerEditingExtenderMixin,
    editingModule
} from "../../../grids/grid_core/editing/m_editing";
import gridCoreUtils from "../../../grids/grid_core/m_utils";
import treeListCore from "../m_core";
const TREELIST_EXPAND_ICON_CONTAINER_CLASS = "dx-treelist-icon-container";
const SELECT_CHECKBOX_CLASS = "dx-select-checkbox";
const DATA_EDIT_DATA_INSERT_TYPE = "insert";
class EditingController extends editingModule.controllers.editing {
    _generateNewItem(key) {
        const item = super._generateNewItem(key);
        item.data = {
            key: key
        };
        item.children = [];
        item.level = 0;
        item.parentKey = this.option("rootValue");
        return item
    }
    _isProcessedItem() {
        return true
    }
    _setInsertAfterOrBeforeKey(change, parentKey) {
        if (void 0 !== parentKey && parentKey !== this.option("rootValue")) {
            change.insertAfterKey = parentKey
        } else {
            super._setInsertAfterOrBeforeKey.apply(this, arguments)
        }
    }
    _getLoadedRowIndex(items, change) {
        const dataSourceAdapter = this._dataController.dataSource();
        const parentKey = null === dataSourceAdapter || void 0 === dataSourceAdapter ? void 0 : dataSourceAdapter.parentKeyOf(change.data);
        if (void 0 !== parentKey && parentKey !== this.option("rootValue")) {
            const rowIndex = gridCoreUtils.getIndexByKey(parentKey, items);
            if (rowIndex >= 0 && this._dataController.isRowExpanded(parentKey)) {
                return rowIndex + 1
            }
            return -1
        }
        return super._getLoadedRowIndex.apply(this, arguments)
    }
    _isEditColumnVisible() {
        const result = super._isEditColumnVisible.apply(this, arguments);
        const editingOptions = this.option("editing");
        return result || editingOptions.allowAdding
    }
    _isDefaultButtonVisible(button, options) {
        const result = super._isDefaultButtonVisible.apply(this, arguments);
        const {
            row: row
        } = options;
        if ("add" === button.name) {
            return this.allowAdding(options) && row.rowIndex !== this._getVisibleEditRowIndex() && !(row.removed || row.isNewRow)
        }
        return result
    }
    _getEditingButtons(options) {
        const buttons = super._getEditingButtons.apply(this, arguments);
        if (!options.column.buttons) {
            buttons.unshift(this._getButtonConfig("add", options))
        }
        return buttons
    }
    _beforeSaveEditData(change) {
        const result = super._beforeSaveEditData.apply(this, arguments);
        if (change && "insert" !== change.type) {
            var _this$_dataController;
            const store = null === (_this$_dataController = this._dataController) || void 0 === _this$_dataController ? void 0 : _this$_dataController.store();
            const key = null === store || void 0 === store ? void 0 : store.key();
            if (!isDefined(key)) {
                throw errors.Error("E1045")
            }
        }
        return result
    }
    addRowByRowIndex(rowIndex) {
        const row = this._dataController.getVisibleRows()[rowIndex];
        return this.addRow(row ? row.key : void 0)
    }
    addRow(key) {
        if (void 0 === key) {
            key = this.option("rootValue")
        }
        return super.addRow.call(this, key)
    }
    _addRowCore(data, parentKey, oldEditRowIndex) {
        const rootValue = this.option("rootValue");
        const dataSourceAdapter = this._dataController.dataSource();
        const parentKeyGetter = dataSourceAdapter.createParentIdGetter();
        parentKey = parentKeyGetter(data);
        if (void 0 !== parentKey && parentKey !== rootValue && !this._dataController.isRowExpanded(parentKey)) {
            const deferred = new Deferred;
            this._dataController.expandRow(parentKey).done((() => {
                setTimeout((() => {
                    super._addRowCore.call(this, data, parentKey, oldEditRowIndex).done(deferred.resolve).fail(deferred.reject)
                }))
            })).fail(deferred.reject);
            return deferred.promise()
        }
        return super._addRowCore.call(this, data, parentKey, oldEditRowIndex)
    }
    _initNewRow(options, parentKey) {
        const dataSourceAdapter = this._dataController.dataSource();
        const parentIdSetter = dataSourceAdapter.createParentIdSetter();
        parentIdSetter(options.data, parentKey);
        return super._initNewRow.apply(this, arguments)
    }
    allowAdding(options) {
        return this._allowEditAction("allowAdding", options)
    }
    _needToCloseEditableCell($targetElement) {
        return super._needToCloseEditableCell.apply(this, arguments) || $targetElement.closest(".dx-treelist-icon-container").length && this.isEditing()
    }
    getButtonLocalizationNames() {
        const names = super.getButtonLocalizationNames.apply(this);
        names.add = "dxTreeList-editingAddRowToNode";
        return names
    }
}
const rowsView = Base => class extends(editingModule.extenders.views.rowsView(Base)) {
    _renderCellCommandContent($container, options) {
        const editingController = this._editingController;
        const isEditRow = options.row && editingController.isEditRow(options.row.rowIndex);
        const isEditing = options.isEditing || isEditRow;
        if (!isEditing) {
            return super._renderCellCommandContent.apply(this, arguments)
        }
        return false
    }
    validateClick(e) {
        const $targetElement = $(e.event.target);
        const originalClickHandler = "dxdblclick" === e.event.type ? super._rowDblClick : super._rowClick;
        if ($targetElement.closest(".dx-select-checkbox").length) {
            return false
        }
        return !this.needToCallOriginalClickHandler(e, originalClickHandler)
    }
    needToCallOriginalClickHandler(e, originalClickHandler) {
        const $targetElement = $(e.event.target);
        if (!$targetElement.closest(".dx-treelist-icon-container").length) {
            originalClickHandler.call(this, e);
            return true
        }
        return false
    }
    _rowClick(e) {
        if (this.validateClick(e)) {
            super._rowClickTreeListHack.apply(this, arguments)
        }
    }
    _rowDblClick(e) {
        if (this.validateClick(e)) {
            super._rowDblClickTreeListHack.apply(this, arguments)
        }
    }
};
const data = Base => class extends(dataControllerEditingExtenderMixin(Base)) {
    changeRowExpand() {
        this._editingController.refresh();
        return super.changeRowExpand.apply(this, arguments)
    }
};
treeListCore.registerModule("editing", {
    defaultOptions: () => extend(true, editingModule.defaultOptions(), {
        editing: {
            texts: {
                addRowToNode: messageLocalization.format("dxTreeList-editingAddRowToNode")
            }
        }
    }),
    controllers: {
        editing: EditingController
    },
    extenders: {
        controllers: {
            data: data
        },
        views: {
            rowsView: rowsView,
            headerPanel: editingModule.extenders.views.headerPanel
        }
    }
});
