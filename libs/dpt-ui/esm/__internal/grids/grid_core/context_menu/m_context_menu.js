/**
 * DevExtreme (esm/__internal/grids/grid_core/context_menu/m_context_menu.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getPublicElement
} from "../../../../core/element";
import $ from "../../../../core/renderer";
import {
    each
} from "../../../../core/utils/iterator";
import ContextMenu from "../../../../ui/context_menu";
import modules from "../m_modules";
const CONTEXT_MENU = "dx-context-menu";
const viewName = {
    columnHeadersView: "header",
    rowsView: "content",
    footerView: "footer",
    headerPanel: "headerPanel"
};
const VIEW_NAMES = ["columnHeadersView", "rowsView", "footerView", "headerPanel"];
export class ContextMenuController extends modules.ViewController {
    init() {
        this.createAction("onContextMenuPreparing")
    }
    getContextMenuItems(dxEvent) {
        if (!dxEvent) {
            return false
        }
        const that = this;
        const $targetElement = $(dxEvent.target);
        let $element;
        let $targetRowElement;
        let $targetCellElement;
        let menuItems;
        each(VIEW_NAMES, (function() {
            const view = that.getView(this);
            $element = view && view.element();
            if ($element && ($element.is($targetElement) || $element.find($targetElement).length)) {
                var _rowOptions$cells;
                $targetCellElement = $targetElement.closest(".dx-row > td, .dx-row > tr");
                $targetRowElement = $targetCellElement.parent();
                const rowIndex = view.getRowIndex($targetRowElement);
                const columnIndex = $targetCellElement[0] && $targetCellElement[0].cellIndex;
                const rowOptions = $targetRowElement.data("options");
                const options = {
                    event: dxEvent,
                    targetElement: getPublicElement($targetElement),
                    target: viewName[this],
                    rowIndex: rowIndex,
                    row: view._getRows()[rowIndex],
                    columnIndex: columnIndex,
                    column: null === rowOptions || void 0 === rowOptions || null === (_rowOptions$cells = rowOptions.cells) || void 0 === _rowOptions$cells || null === (_rowOptions$cells = _rowOptions$cells[columnIndex]) || void 0 === _rowOptions$cells ? void 0 : _rowOptions$cells.column
                };
                options.items = view.getContextMenuItems && view.getContextMenuItems(options);
                that.executeAction("onContextMenuPreparing", options);
                that._contextMenuPrepared(options);
                menuItems = options.items;
                if (menuItems) {
                    return false
                }
            }
            return
        }));
        return menuItems
    }
    _contextMenuPrepared(options) {}
}
export class ContextMenuView extends modules.View {
    init() {
        super.init();
        this._contextMenuController = this.getController("contextMenu")
    }
    _renderCore() {
        const $element = this.element().addClass(CONTEXT_MENU);
        this.setAria("role", "presentation", $element);
        this._createComponent($element, ContextMenu, {
            onPositioning: actionArgs => {
                const {
                    event: event
                } = actionArgs;
                const contextMenuInstance = actionArgs.component;
                const items = this._contextMenuController.getContextMenuItems(event);
                if (items) {
                    contextMenuInstance.option("items", items);
                    event.stopPropagation()
                } else {
                    actionArgs.cancel = true
                }
            },
            onItemClick(params) {
                var _params$itemData, _params$itemData$onIt;
                null === (_params$itemData = params.itemData) || void 0 === _params$itemData || null === (_params$itemData$onIt = _params$itemData.onItemClick) || void 0 === _params$itemData$onIt || _params$itemData$onIt.call(_params$itemData, params)
            },
            cssClass: this.getWidgetContainerClass(),
            target: this.component.$element()
        })
    }
}
export const contextMenuModule = {
    defaultOptions: () => ({
        onContextMenuPreparing: null
    }),
    controllers: {
        contextMenu: ContextMenuController
    },
    views: {
        contextMenuView: ContextMenuView
    }
};
