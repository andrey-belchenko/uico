/**
 * DevExtreme (cjs/__internal/grids/grid_core/context_menu/m_context_menu.js)
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
exports.contextMenuModule = exports.ContextMenuView = exports.ContextMenuController = void 0;
var _element = require("../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _iterator = require("../../../../core/utils/iterator");
var _context_menu = _interopRequireDefault(require("../../../../ui/context_menu"));
var _m_modules = _interopRequireDefault(require("../m_modules"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const CONTEXT_MENU = "dx-context-menu";
const viewName = {
    columnHeadersView: "header",
    rowsView: "content",
    footerView: "footer",
    headerPanel: "headerPanel"
};
const VIEW_NAMES = ["columnHeadersView", "rowsView", "footerView", "headerPanel"];
class ContextMenuController extends _m_modules.default.ViewController {
    init() {
        this.createAction("onContextMenuPreparing")
    }
    getContextMenuItems(dxEvent) {
        if (!dxEvent) {
            return false
        }
        const that = this;
        const $targetElement = (0, _renderer.default)(dxEvent.target);
        let $element;
        let $targetRowElement;
        let $targetCellElement;
        let menuItems;
        (0, _iterator.each)(VIEW_NAMES, (function() {
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
                    targetElement: (0, _element.getPublicElement)($targetElement),
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
exports.ContextMenuController = ContextMenuController;
class ContextMenuView extends _m_modules.default.View {
    init() {
        super.init();
        this._contextMenuController = this.getController("contextMenu")
    }
    _renderCore() {
        const $element = this.element().addClass(CONTEXT_MENU);
        this.setAria("role", "presentation", $element);
        this._createComponent($element, _context_menu.default, {
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
exports.ContextMenuView = ContextMenuView;
const contextMenuModule = exports.contextMenuModule = {
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
