/**
 * DevExtreme (esm/__internal/grids/grid_core/column_chooser/m_column_chooser.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import devices from "../../../../core/devices";
import $ from "../../../../core/renderer";
import {
    deferUpdate
} from "../../../../core/utils/common";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import {
    getOuterHeight,
    getOuterWidth
} from "../../../../core/utils/size";
import {
    isDefined
} from "../../../../core/utils/type";
import messageLocalization from "../../../../localization/message";
import Button from "../../../../ui/button";
import Popup from "../../../../ui/popup/ui.popup";
import {
    current,
    isGeneric,
    isMaterial as isMaterialTheme
} from "../../../../ui/themes";
import TreeView from "../../../../ui/tree_view";
import modules from "../m_modules";
import {
    ColumnsView
} from "../views/m_columns_view";
const COLUMN_CHOOSER_CLASS = "column-chooser";
const COLUMN_CHOOSER_BUTTON_CLASS = "column-chooser-button";
const NOTOUCH_ACTION_CLASS = "notouch-action";
const COLUMN_CHOOSER_LIST_CLASS = "column-chooser-list";
const COLUMN_CHOOSER_PLAIN_CLASS = "column-chooser-plain";
const COLUMN_CHOOSER_DRAG_CLASS = "column-chooser-mode-drag";
const COLUMN_CHOOSER_SELECT_CLASS = "column-chooser-mode-select";
const COLUMN_CHOOSER_ICON_NAME = "column-chooser";
const COLUMN_CHOOSER_ITEM_CLASS = "dx-column-chooser-item";
const COLUMN_OPTIONS_USED_IN_ITEMS = ["showInColumnChooser", "caption", "allowHiding", "visible", "cssClass", "ownerBand"];
const processItems = function(that, chooserColumns) {
    const items = [];
    const isSelectMode = that.isSelectMode();
    const isRecursive = that.option("columnChooser.selection.recursive");
    if (chooserColumns.length) {
        each(chooserColumns, ((index, column) => {
            const item = {
                text: column.caption,
                cssClass: column.cssClass,
                allowHiding: column.allowHiding,
                expanded: true,
                id: column.index,
                disabled: false === column.allowHiding,
                parentId: isDefined(column.ownerBand) ? column.ownerBand : null
            };
            const isRecursiveWithColumns = isRecursive && column.hasColumns;
            if (isSelectMode && !isRecursiveWithColumns) {
                item.selected = column.visible
            }
            items.push(item)
        }))
    }
    return items
};
export class ColumnChooserController extends modules.ViewController {
    init() {
        super.init();
        this._rowsView = this.getView("rowsView")
    }
    renderShowColumnChooserButton($element) {
        const that = this;
        const columnChooserButtonClass = that.addWidgetPrefix("column-chooser-button");
        const columnChooserEnabled = that.option("columnChooser.enabled");
        const $showColumnChooserButton = $element.find(`.${columnChooserButtonClass}`);
        let $columnChooserButton;
        if (columnChooserEnabled) {
            if (!$showColumnChooserButton.length) {
                $columnChooserButton = $("<div>").addClass(columnChooserButtonClass).appendTo($element);
                that._createComponent($columnChooserButton, Button, {
                    icon: "column-chooser",
                    onClick() {
                        that.getView("columnChooserView").showColumnChooser()
                    },
                    hint: that.option("columnChooser.title"),
                    integrationOptions: {}
                })
            } else {
                $showColumnChooserButton.show()
            }
        } else {
            $showColumnChooserButton.hide()
        }
    }
    getPosition() {
        const position = this.option("columnChooser.position");
        return isDefined(position) ? position : {
            my: "right bottom",
            at: "right bottom",
            of: this._rowsView && this._rowsView.element(),
            collision: "fit",
            offset: "-2 -2",
            boundaryOffset: "2 2"
        }
    }
}
export class ColumnChooserView extends ColumnsView {
    optionChanged(args) {
        if ("columnChooser" === args.name) {
            this._initializePopupContainer();
            this.render(null, "full")
        } else {
            super.optionChanged(args)
        }
    }
    publicMethods() {
        return ["showColumnChooser", "hideColumnChooser"]
    }
    _resizeCore() {}
    _isWinDevice() {
        return !!devices.real().win
    }
    _initializePopupContainer() {
        const that = this;
        const columnChooserClass = that.addWidgetPrefix("column-chooser");
        const $element = that.element().addClass(columnChooserClass);
        const columnChooserOptions = that.option("columnChooser");
        const popupPosition = this._columnChooserController.getPosition();
        const themeName = current();
        const isGenericTheme = isGeneric(themeName);
        const isMaterial = isMaterialTheme(themeName);
        const dxPopupOptions = {
            visible: false,
            shading: false,
            showCloseButton: false,
            dragEnabled: true,
            resizeEnabled: true,
            wrapperAttr: {
                class: columnChooserClass
            },
            toolbarItems: [{
                text: columnChooserOptions.title,
                toolbar: "top",
                location: isGenericTheme || isMaterial ? "before" : "center"
            }],
            position: popupPosition,
            width: columnChooserOptions.width,
            height: columnChooserOptions.height,
            rtlEnabled: that.option("rtlEnabled"),
            onHidden() {
                if (that._isWinDevice()) {
                    $("body").removeClass(that.addWidgetPrefix("notouch-action"))
                }
            },
            container: columnChooserOptions.container
        };
        if (isGenericTheme || isMaterial) {
            extend(dxPopupOptions, {
                showCloseButton: true
            })
        } else {
            dxPopupOptions.toolbarItems[dxPopupOptions.toolbarItems.length] = {
                shortcut: "cancel"
            }
        }
        if (!isDefined(this._popupContainer)) {
            that._popupContainer = that._createComponent($element, Popup, dxPopupOptions);
            that._popupContainer.on("optionChanged", (args => {
                if ("visible" === args.name) {
                    that.renderCompleted.fire()
                }
            }))
        } else {
            this._popupContainer.option(dxPopupOptions)
        }
        this.setPopupAttributes()
    }
    setPopupAttributes() {
        const isSelectMode = this.isSelectMode();
        const isBandColumnsUsed = this._columnsController.isBandColumnsUsed();
        this._popupContainer.setAria({
            role: "dialog",
            label: messageLocalization.format("dxDataGrid-columnChooserTitle")
        });
        this._popupContainer.$wrapper().toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_DRAG_CLASS), !isSelectMode).toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_SELECT_CLASS), isSelectMode);
        this._popupContainer.$content().addClass(this.addWidgetPrefix("column-chooser-list"));
        if (isSelectMode && !isBandColumnsUsed) {
            this._popupContainer.$content().addClass(this.addWidgetPrefix("column-chooser-plain"))
        }
    }
    _renderCore(change) {
        if (this._popupContainer) {
            const isDragMode = !this.isSelectMode();
            if (!this._columnChooserList || "full" === change) {
                this._renderTreeView()
            } else if (isDragMode) {
                this._updateItems()
            }
        }
    }
    _renderTreeView() {
        var _columnChooser$search, _columnChooser$search2, _columnChooser$search3;
        const that = this;
        const $container = this._popupContainer.$content();
        const columnChooser = this.option("columnChooser");
        const isSelectMode = this.isSelectMode();
        const searchEnabled = isDefined(columnChooser.allowSearch) ? columnChooser.allowSearch : null === (_columnChooser$search = columnChooser.search) || void 0 === _columnChooser$search ? void 0 : _columnChooser$search.enabled;
        const searchTimeout = isDefined(columnChooser.searchTimeout) ? columnChooser.searchTimeout : null === (_columnChooser$search2 = columnChooser.search) || void 0 === _columnChooser$search2 ? void 0 : _columnChooser$search2.timeout;
        const treeViewConfig = {
            dataStructure: "plain",
            activeStateEnabled: true,
            focusStateEnabled: true,
            hoverStateEnabled: true,
            itemTemplate: "item",
            showCheckBoxesMode: "none",
            rootValue: null,
            searchEnabled: searchEnabled,
            searchTimeout: searchTimeout,
            searchEditorOptions: null === (_columnChooser$search3 = columnChooser.search) || void 0 === _columnChooser$search3 ? void 0 : _columnChooser$search3.editorOptions
        };
        if (this._isWinDevice()) {
            treeViewConfig.useNativeScrolling = false
        }
        extend(treeViewConfig, isSelectMode ? this._prepareSelectModeConfig() : this._prepareDragModeConfig());
        if (this._columnChooserList) {
            if (!treeViewConfig.searchEnabled) {
                treeViewConfig.searchValue = ""
            }
            this._columnChooserList.option(treeViewConfig);
            this._updateItems()
        } else {
            this._columnChooserList = this._createComponent($container, TreeView, treeViewConfig);
            this._updateItems();
            let scrollTop = 0;
            this._columnChooserList.on("optionChanged", (e => {
                const scrollable = e.component.getScrollable();
                scrollTop = scrollable.scrollTop()
            }));
            this._columnChooserList.on("contentReady", (e => {
                deferUpdate((() => {
                    const scrollable = e.component.getScrollable();
                    scrollable.scrollTo({
                        y: scrollTop
                    });
                    that.renderCompleted.fire()
                }))
            }))
        }
    }
    _prepareDragModeConfig() {
        const columnChooserOptions = this.option("columnChooser");
        return {
            noDataText: columnChooserOptions.emptyPanelText,
            activeStateEnabled: false,
            focusStateEnabled: false,
            hoverStateEnabled: false,
            itemTemplate(data, index, item) {
                $(item).text(data.text).parent().addClass(data.cssClass).addClass("dx-column-chooser-item")
            }
        }
    }
    _prepareSelectModeConfig() {
        const that = this;
        const selectionOptions = this.option("columnChooser.selection") ?? {};
        let isUpdatingSelection = false;
        return {
            selectByClick: selectionOptions.selectByClick,
            selectNodesRecursive: selectionOptions.recursive,
            showCheckBoxesMode: selectionOptions.allowSelectAll ? "selectAll" : "normal",
            onSelectionChanged: e => {
                if (isUpdatingSelection) {
                    return
                }
                const nodes = (nodes => {
                    const addNodesToArray = (nodes, flatNodesArray) => nodes.reduce(((result, node) => {
                        result.push(node);
                        if (node.children.length) {
                            addNodesToArray(node.children, result)
                        }
                        return result
                    }), flatNodesArray);
                    return addNodesToArray(nodes, [])
                })(e.component.getNodes());
                e.component.beginUpdate();
                isUpdatingSelection = true;
                ((e, nodes) => {
                    nodes.filter((node => false === node.itemData.allowHiding)).forEach((node => e.component.selectItem(node.key)))
                })(e, nodes);
                e.component.endUpdate();
                isUpdatingSelection = false;
                that.component.beginUpdate();
                this._isUpdatingColumnVisibility = true;
                (nodes => {
                    nodes.forEach((node => {
                        const columnIndex = node.itemData.id;
                        const isVisible = false !== node.selected;
                        that._columnsController.columnOption(columnIndex, "visible", isVisible)
                    }))
                })(nodes);
                that.component.endUpdate();
                this._isUpdatingColumnVisibility = false
            }
        }
    }
    _updateItems() {
        const isSelectMode = this.isSelectMode();
        const chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
        const items = processItems(this, chooserColumns);
        this._columnChooserList.option("items", items)
    }
    _updateItemsSelection(columnIndices) {
        const changedColumns = null === columnIndices || void 0 === columnIndices ? void 0 : columnIndices.map((columnIndex => this._columnsController.columnOption(columnIndex)));
        this._columnChooserList.beginUpdate();
        null === changedColumns || void 0 === changedColumns || changedColumns.forEach((_ref => {
            let {
                visible: visible,
                index: index
            } = _ref;
            if (visible) {
                this._columnChooserList.selectItem(index)
            } else {
                this._columnChooserList.unselectItem(index)
            }
        }));
        this._columnChooserList.endUpdate()
    }
    _columnOptionChanged(e) {
        super._columnOptionChanged(e);
        const isSelectMode = this.isSelectMode();
        if (isSelectMode && this._columnChooserList && !this._isUpdatingColumnVisibility) {
            const {
                optionNames: optionNames
            } = e;
            const onlyVisibleChanged = optionNames.visible && 1 === optionNames.length;
            const columnIndices = isDefined(e.columnIndex) ? [e.columnIndex] : e.columnIndices;
            const needUpdate = COLUMN_OPTIONS_USED_IN_ITEMS.some((optionName => optionNames[optionName])) || e.changeTypes.columns && optionNames.all;
            if (needUpdate) {
                this._updateItemsSelection(columnIndices);
                if (!onlyVisibleChanged) {
                    this._updateItems()
                }
            }
        }
    }
    getColumnElements() {
        const result = [];
        const isSelectMode = this.isSelectMode();
        const chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
        const $content = this._popupContainer && this._popupContainer.$content();
        const $nodes = $content && $content.find(".dx-treeview-node");
        if ($nodes) {
            chooserColumns.forEach((column => {
                const $node = $nodes.filter(`[data-item-id = '${column.index}']`);
                const item = $node.length ? $node.children(".dx-column-chooser-item").get(0) : null;
                result.push(item)
            }))
        }
        return $(result)
    }
    getName() {
        return "columnChooser"
    }
    getColumns() {
        return this._columnsController.getChooserColumns()
    }
    allowDragging(column) {
        const isParentColumnVisible = this._columnsController.isParentColumnVisible(column.index);
        const isColumnHidden = !column.visible && column.allowHiding;
        return this.isColumnChooserVisible() && isParentColumnVisible && isColumnHidden
    }
    allowColumnHeaderDragging(column) {
        const isDragMode = !this.isSelectMode();
        return isDragMode && this.isColumnChooserVisible() && column.allowHiding
    }
    getBoundingRect() {
        const container = this._popupContainer && this._popupContainer.$overlayContent();
        if (container && container.is(":visible")) {
            const offset = container.offset();
            return {
                left: offset.left,
                top: offset.top,
                right: offset.left + getOuterWidth(container),
                bottom: offset.top + getOuterHeight(container)
            }
        }
        return null
    }
    showColumnChooser() {
        if (!this._popupContainer) {
            this._initializePopupContainer();
            this.render()
        }
        this._popupContainer.show();
        if (this._isWinDevice()) {
            $("body").addClass(this.addWidgetPrefix("notouch-action"))
        }
    }
    hideColumnChooser() {
        if (this._popupContainer) {
            this._popupContainer.hide()
        }
    }
    isColumnChooserVisible() {
        const popupContainer = this._popupContainer;
        return popupContainer && popupContainer.option("visible")
    }
    isSelectMode() {
        return "select" === this.option("columnChooser.mode")
    }
    hasHiddenColumns() {
        const isEnabled = this.option("columnChooser.enabled");
        const hiddenColumns = this.getColumns().filter((column => !column.visible));
        return isEnabled && hiddenColumns.length
    }
}
const headerPanel = Base => class extends Base {
    _getToolbarItems() {
        const items = super._getToolbarItems();
        return this._appendColumnChooserItem(items)
    }
    _appendColumnChooserItem(items) {
        const that = this;
        const columnChooserEnabled = that.option("columnChooser.enabled");
        if (columnChooserEnabled) {
            const onClickHandler = function() {
                that.component.getView("columnChooserView").showColumnChooser()
            };
            const onInitialized = function(e) {
                $(e.element).addClass(that._getToolbarButtonClass(that.addWidgetPrefix("column-chooser-button")))
            };
            const hintText = that.option("columnChooser.title");
            const toolbarItem = {
                widget: "dxButton",
                options: {
                    icon: "column-chooser",
                    onClick: onClickHandler,
                    hint: hintText,
                    text: hintText,
                    onInitialized: onInitialized,
                    elementAttr: {
                        "aria-haspopup": "dialog"
                    }
                },
                showText: "inMenu",
                location: "after",
                name: "columnChooserButton",
                locateInMenu: "auto",
                sortIndex: 40
            };
            items.push(toolbarItem)
        }
        return items
    }
    optionChanged(args) {
        if ("columnChooser" === args.name) {
            this._invalidate();
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
    isVisible() {
        const columnChooserEnabled = this.option("columnChooser.enabled");
        return super.isVisible() || columnChooserEnabled
    }
};
const columns = Base => class extends Base {
    allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
        const isSelectMode = "select" === this.option("columnChooser.mode");
        const isMoveColumnDisallowed = isSelectMode && "columnChooser" === targetLocation;
        return isMoveColumnDisallowed ? false : super.allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation)
    }
};
const columnHeadersView = Base => class extends Base {
    allowDragging(column) {
        const isDragMode = !this._columnChooserView.isSelectMode();
        const isColumnChooserVisible = this._columnChooserView.isColumnChooserVisible();
        return isDragMode && isColumnChooserVisible && column.allowHiding || super.allowDragging(column)
    }
};
export const columnChooserModule = {
    defaultOptions: () => ({
        columnChooser: {
            enabled: false,
            search: {
                enabled: false,
                timeout: 500,
                editorOptions: {}
            },
            selection: {
                allowSelectAll: false,
                selectByClick: false,
                recursive: false
            },
            position: void 0,
            mode: "dragAndDrop",
            width: 250,
            height: 260,
            title: messageLocalization.format("dxDataGrid-columnChooserTitle"),
            emptyPanelText: messageLocalization.format("dxDataGrid-columnChooserEmptyText"),
            container: void 0
        }
    }),
    controllers: {
        columnChooser: ColumnChooserController
    },
    views: {
        columnChooserView: ColumnChooserView
    },
    extenders: {
        views: {
            headerPanel: headerPanel,
            columnHeadersView: columnHeadersView
        },
        controllers: {
            columns: columns
        }
    }
};
