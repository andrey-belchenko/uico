/**
 * DevExtreme (esm/__internal/grids/tree_list/selection/m_selection.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    equalByValue,
    noop
} from "../../../../core/utils/common";
import {
    extend
} from "../../../../core/utils/extend";
import {
    isDefined
} from "../../../../core/utils/type";
import {
    columnHeadersSelectionExtenderMixin,
    dataSelectionExtenderMixin,
    rowsViewSelectionExtenderMixin,
    selectionModule
} from "../../../grids/grid_core/selection/m_selection";
import treeListCore from "../m_core";
const TREELIST_SELECT_ALL_CLASS = "dx-treelist-select-all";
const SELECT_CHECKBOX_CLASS = "dx-select-checkbox";
const nodeExists = function(array, currentKey) {
    return !!array.filter((key => key === currentKey)).length
};
const data = Base => class extends(dataSelectionExtenderMixin(Base)) {
    _handleDataChanged(e) {
        const isRecursiveSelection = this._selectionController.isRecursiveSelection();
        if (isRecursiveSelection && (!e || "updateSelectionState" !== e.changeType)) {
            this._selectionController.updateSelectionState({
                selectedItemKeys: this.option("selectedRowKeys")
            })
        }
        super._handleDataChanged.apply(this, arguments)
    }
    loadDescendants() {
        const that = this;
        const d = super.loadDescendants.apply(that, arguments);
        const isRecursiveSelection = this._selectionController.isRecursiveSelection();
        if (isRecursiveSelection) {
            d.done((() => {
                this._selectionController.updateSelectionState({
                    selectedItemKeys: that.option("selectedRowKeys")
                })
            }))
        }
        return d
    }
};
const selection = Base => class extends Base {
    constructor() {
        super(...arguments);
        this._updateSelectColumn = noop
    }
    init() {
        super.init.apply(this, arguments);
        this._selectionStateByKey = {}
    }
    _getSelectionConfig() {
        const config = super._getSelectionConfig.apply(this, arguments);
        const {
            plainItems: plainItems
        } = config;
        config.plainItems = cached => {
            let result;
            if (cached) {
                result = this._dataController.getCachedStoreData()
            }
            result || (result = plainItems.apply(this, arguments).map((item => item.data)));
            return result || []
        };
        config.isItemSelected = item => {
            const key = this._dataController.keyOf(item);
            return this.isRowSelected(key)
        };
        config.isSelectableItem = item => !!item;
        config.getItemData = item => item;
        config.allowLoadByRange = void 0;
        return config
    }
    renderSelectCheckBoxContainer($container, model) {
        const rowsView = this.component.getView("rowsView");
        const $checkbox = rowsView._renderSelectCheckBox($container, {
            value: model.row.isSelected,
            row: model.row,
            column: model.column
        });
        rowsView._attachCheckBoxClickEvent($checkbox)
    }
    _getSelectAllNodeKeys() {
        const {
            component: component
        } = this;
        const root = component.getRootNode();
        const cache = {};
        const keys = [];
        const isRecursiveSelection = this.isRecursiveSelection();
        root && treeListCore.foreachNodes(root.children, (node => {
            if (void 0 !== node.key && (node.visible || isRecursiveSelection)) {
                keys.push(node.key)
            }
            if (!node.visible) {
                return true
            }
            return isRecursiveSelection ? false : component.isRowExpanded(node.key, cache)
        }));
        return keys
    }
    isSelectAll() {
        const selectedRowKeys = this.option("selectedRowKeys") || [];
        if (0 === selectedRowKeys.length) {
            return false
        }
        const {
            component: component
        } = this;
        const visibleKeys = this._getSelectAllNodeKeys();
        const isRecursiveSelection = this.isRecursiveSelection();
        let hasIndeterminateState = false;
        const selectedVisibleKeys = visibleKeys.filter((key => {
            const isRowSelected = component.isRowSelected(key, isRecursiveSelection);
            if (void 0 === isRowSelected) {
                hasIndeterminateState = true
            }
            return isRowSelected
        }));
        if (!selectedVisibleKeys.length) {
            return hasIndeterminateState ? void 0 : false
        }
        if (selectedVisibleKeys.length === visibleKeys.length) {
            return true
        }
        return
    }
    selectAll() {
        const visibleKeys = this._getSelectAllNodeKeys().filter((key => !this.isRowSelected(key)));
        this.focusedItemIndex(-1);
        return this.selectRows(visibleKeys, true)
    }
    deselectAll() {
        const visibleKeys = this._getSelectAllNodeKeys();
        this.focusedItemIndex(-1);
        return this.deselectRows(visibleKeys)
    }
    selectedItemKeys(value, preserve, isDeselect, isSelectAll) {
        const that = this;
        const selectedRowKeys = that.option("selectedRowKeys");
        const isRecursiveSelection = this.isRecursiveSelection();
        const normalizedArgs = isRecursiveSelection && that._normalizeSelectionArgs({
            keys: isDefined(value) ? value : []
        }, preserve, !isDeselect);
        if (normalizedArgs && !equalByValue(normalizedArgs.selectedRowKeys, selectedRowKeys)) {
            that._isSelectionNormalizing = true;
            return super.selectedItemKeys(normalizedArgs.selectedRowKeys, false, false, false).always((() => {
                that._isSelectionNormalizing = false
            })).done((items => {
                normalizedArgs.selectedRowsData = items;
                that._fireSelectionChanged(normalizedArgs)
            }))
        }
        return super.selectedItemKeys(value, preserve, isDeselect, isSelectAll)
    }
    changeItemSelection(itemIndex, keyboardKeys) {
        const isRecursiveSelection = this.isRecursiveSelection();
        const callBase = super.changeItemSelection.bind(this);
        if (isRecursiveSelection && !keyboardKeys.shift) {
            const key = this._dataController.getKeyByRowIndex(itemIndex);
            return this.selectedItemKeys(key, true, this.isRowSelected(key)).done((() => {
                this.isRowSelected(key) && callBase(itemIndex, keyboardKeys, true)
            }))
        }
        return super.changeItemSelection.apply(this, arguments)
    }
    _updateParentSelectionState(node, isSelected) {
        const that = this;
        let state = isSelected;
        const parentNode = node.parent;
        if (parentNode) {
            if (parentNode.children.length > 1) {
                if (false === isSelected) {
                    const hasSelectedState = parentNode.children.some((childNode => that._selectionStateByKey[childNode.key]));
                    state = hasSelectedState ? void 0 : false
                } else if (true === isSelected) {
                    const hasNonSelectedState = parentNode.children.some((childNode => !that._selectionStateByKey[childNode.key]));
                    state = hasNonSelectedState ? void 0 : true
                }
            }
            this._selectionStateByKey[parentNode.key] = state;
            if (parentNode.parent && parentNode.parent.level >= 0) {
                this._updateParentSelectionState(parentNode, state)
            }
        }
    }
    _updateChildrenSelectionState(node, isSelected) {
        const that = this;
        const {
            children: children
        } = node;
        children && children.forEach((childNode => {
            that._selectionStateByKey[childNode.key] = isSelected;
            if (childNode.children.length > 0) {
                that._updateChildrenSelectionState(childNode, isSelected)
            }
        }))
    }
    _updateSelectionStateCore(keys, isSelected) {
        const dataController = this._dataController;
        for (let i = 0; i < keys.length; i++) {
            this._selectionStateByKey[keys[i]] = isSelected;
            const node = dataController.getNodeByKey(keys[i]);
            if (node) {
                this._updateParentSelectionState(node, isSelected);
                this._updateChildrenSelectionState(node, isSelected)
            }
        }
    }
    _getSelectedParentKeys(key, selectedItemKeys, useCash) {
        let selectedParentNode;
        const node = this._dataController.getNodeByKey(key);
        let parentNode = node && node.parent;
        let result = [];
        while (parentNode && parentNode.level >= 0) {
            result.unshift(parentNode.key);
            const isSelected = useCash ? !nodeExists(selectedItemKeys, parentNode.key) && this.isRowSelected(parentNode.key) : selectedItemKeys.indexOf(parentNode.key) >= 0;
            if (isSelected) {
                selectedParentNode = parentNode;
                result = this._getSelectedParentKeys(selectedParentNode.key, selectedItemKeys, useCash).concat(result);
                break
            } else if (useCash) {
                break
            }
            parentNode = parentNode.parent
        }
        return selectedParentNode && result || []
    }
    _getSelectedChildKeys(key, keysToIgnore) {
        const childKeys = [];
        const node = this._dataController.getNodeByKey(key);
        node && treeListCore.foreachNodes(node.children, (childNode => {
            const ignoreKeyIndex = keysToIgnore.indexOf(childNode.key);
            if (ignoreKeyIndex < 0) {
                childKeys.push(childNode.key)
            }
            return ignoreKeyIndex > 0 || ignoreKeyIndex < 0 && void 0 === this._selectionStateByKey[childNode.key]
        }));
        return childKeys
    }
    _normalizeParentKeys(key, args) {
        const that = this;
        let keysToIgnore = [key];
        const parentNodeKeys = that._getSelectedParentKeys(key, args.selectedRowKeys);
        if (parentNodeKeys.length) {
            keysToIgnore = keysToIgnore.concat(parentNodeKeys);
            keysToIgnore.forEach((key => {
                const index = args.selectedRowKeys.indexOf(key);
                if (index >= 0) {
                    args.selectedRowKeys.splice(index, 1)
                }
            }));
            const childKeys = that._getSelectedChildKeys(parentNodeKeys[0], keysToIgnore);
            args.selectedRowKeys = args.selectedRowKeys.concat(childKeys)
        }
    }
    _normalizeChildrenKeys(key, args) {
        const node = this._dataController.getNodeByKey(key);
        node && node.children.forEach((childNode => {
            const index = args.selectedRowKeys.indexOf(childNode.key);
            if (index >= 0) {
                args.selectedRowKeys.splice(index, 1)
            }
            this._normalizeChildrenKeys(childNode.key, args)
        }))
    }
    _normalizeSelectedRowKeysCore(keys, args, preserve, isSelect) {
        const that = this;
        keys.forEach((key => {
            if (preserve && that.isRowSelected(key) === isSelect) {
                return
            }
            that._normalizeChildrenKeys(key, args);
            const index = args.selectedRowKeys.indexOf(key);
            if (isSelect) {
                if (index < 0) {
                    args.selectedRowKeys.push(key)
                }
                args.currentSelectedRowKeys.push(key)
            } else {
                if (index >= 0) {
                    args.selectedRowKeys.splice(index, 1)
                }
                args.currentDeselectedRowKeys.push(key);
                that._normalizeParentKeys(key, args)
            }
        }))
    }
    _normalizeSelectionArgs(args, preserve, isSelect) {
        let result;
        const keys = Array.isArray(args.keys) ? args.keys : [args.keys];
        const selectedRowKeys = this.option("selectedRowKeys") || [];
        if (keys.length) {
            result = {
                currentSelectedRowKeys: [],
                currentDeselectedRowKeys: [],
                selectedRowKeys: preserve ? selectedRowKeys.slice(0) : []
            };
            this._normalizeSelectedRowKeysCore(keys, result, preserve, isSelect)
        }
        return result
    }
    _updateSelectedItems(args) {
        this.updateSelectionState(args);
        super._updateSelectedItems(args)
    }
    _fireSelectionChanged() {
        if (!this._isSelectionNormalizing) {
            super._fireSelectionChanged.apply(this, arguments)
        }
    }
    _isModeLeavesOnly(mode) {
        return "leavesOnly" === mode
    }
    _removeDuplicatedKeys(keys) {
        const result = [];
        const processedKeys = {};
        keys.forEach((key => {
            if (!processedKeys[key]) {
                processedKeys[key] = true;
                result.push(key)
            }
        }));
        return result
    }
    _getAllChildKeys(key) {
        const childKeys = [];
        const node = this._dataController.getNodeByKey(key);
        node && treeListCore.foreachNodes(node.children, (childNode => {
            childKeys.push(childNode.key)
        }), true);
        return childKeys
    }
    _getAllSelectedRowKeys(keys) {
        let result = [];
        keys.forEach((key => {
            const parentKeys = this._getSelectedParentKeys(key, [], true);
            const childKeys = this._getAllChildKeys(key);
            result.push.apply(result, parentKeys.concat([key], childKeys))
        }));
        result = this._removeDuplicatedKeys(result);
        return result
    }
    _getParentSelectedRowKeys(keys) {
        const that = this;
        const result = [];
        keys.forEach((key => {
            const parentKeys = that._getSelectedParentKeys(key, keys);
            !parentKeys.length && result.push(key)
        }));
        return result
    }
    _getLeafSelectedRowKeys(keys) {
        const result = [];
        const dataController = this._dataController;
        keys.forEach((key => {
            const node = dataController.getNodeByKey(key);
            node && !node.hasChildren && result.push(key)
        }));
        return result
    }
    isRecursiveSelection() {
        const selectionMode = this.option("selection.mode");
        const isRecursive = this.option("selection.recursive");
        return "multiple" === selectionMode && isRecursive
    }
    updateSelectionState(options) {
        const removedItemKeys = options.removedItemKeys || [];
        const selectedItemKeys = options.selectedItemKeys || [];
        if (this.isRecursiveSelection()) {
            this._updateSelectionStateCore(removedItemKeys, false);
            this._updateSelectionStateCore(selectedItemKeys, true)
        }
    }
    isRowSelected(key, isRecursiveSelection) {
        const result = super.isRowSelected.apply(this, arguments);
        isRecursiveSelection = isRecursiveSelection ?? this.isRecursiveSelection();
        if (!result && isRecursiveSelection) {
            if (key in this._selectionStateByKey) {
                return this._selectionStateByKey[key]
            }
            return false
        }
        return result
    }
    getSelectedRowKeys(mode) {
        const that = this;
        if (!that._dataController) {
            return []
        }
        let selectedRowKeys = super.getSelectedRowKeys.apply(that, arguments);
        if (mode) {
            if (this.isRecursiveSelection()) {
                selectedRowKeys = this._getAllSelectedRowKeys(selectedRowKeys)
            }
            if ("all" !== mode) {
                if ("excludeRecursive" === mode) {
                    selectedRowKeys = that._getParentSelectedRowKeys(selectedRowKeys)
                } else if (that._isModeLeavesOnly(mode)) {
                    selectedRowKeys = that._getLeafSelectedRowKeys(selectedRowKeys)
                }
            }
        }
        return selectedRowKeys
    }
    getSelectedRowsData(mode) {
        const dataController = this._dataController;
        const selectedKeys = this.getSelectedRowKeys(mode) || [];
        const selectedRowsData = [];
        selectedKeys.forEach((key => {
            const node = dataController.getNodeByKey(key);
            node && selectedRowsData.push(node.data)
        }));
        return selectedRowsData
    }
    refresh() {
        this._selectionStateByKey = {};
        return super.refresh.apply(this, arguments)
    }
};
const columnHeadersView = Base => class extends(columnHeadersSelectionExtenderMixin(Base)) {
    _processTemplate(template, options) {
        const that = this;
        let resultTemplate;
        const renderingTemplate = super._processTemplate(template, options);
        const firstDataColumnIndex = that._columnsController.getFirstDataColumnIndex();
        if (renderingTemplate && "header" === options.rowType && options.column.index === firstDataColumnIndex) {
            resultTemplate = {
                render(options) {
                    if ("multiple" === that.option("selection.mode")) {
                        that.renderSelectAll(options.container, options.model)
                    }
                    renderingTemplate.render(options)
                }
            }
        } else {
            resultTemplate = renderingTemplate
        }
        return resultTemplate
    }
    renderSelectAll($cell, options) {
        $cell.addClass("dx-treelist-select-all");
        this._renderSelectAllCheckBox($cell)
    }
    _isSortableElement($target) {
        return super._isSortableElement($target) && !$target.closest(".dx-select-checkbox").length
    }
};
const rowsView = Base => class extends(rowsViewSelectionExtenderMixin(Base)) {
    _renderIcons($iconContainer, options) {
        super._renderIcons.apply(this, arguments);
        if (!options.row.isNewRow && "multiple" === this.option("selection.mode")) {
            this._selectionController.renderSelectCheckBoxContainer($iconContainer, options)
        }
        return $iconContainer
    }
    _rowClick(e) {
        const $targetElement = $(e.event.target);
        if (this.isExpandIcon($targetElement)) {
            super._rowClickForTreeList.apply(this, arguments)
        } else {
            super._rowClick.apply(this, arguments)
        }
    }
};
treeListCore.registerModule("selection", extend(true, {}, selectionModule, {
    defaultOptions: () => extend(true, selectionModule.defaultOptions(), {
        selection: {
            showCheckBoxesMode: "always",
            recursive: false
        }
    }),
    extenders: {
        controllers: {
            data: data,
            selection: selection
        },
        views: {
            columnHeadersView: columnHeadersView,
            rowsView: rowsView
        }
    }
}));
