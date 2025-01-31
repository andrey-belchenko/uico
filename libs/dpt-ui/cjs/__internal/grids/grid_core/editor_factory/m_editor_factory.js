/**
 * DevExtreme (cjs/__internal/grids/grid_core/editor_factory/m_editor_factory.js)
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
exports.editorFactoryModule = exports.EditorFactory = void 0;
var _position = _interopRequireDefault(require("../../../../animation/position"));
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _extend = require("../../../../core/utils/extend");
var _position2 = require("../../../../core/utils/position");
var _size = require("../../../../core/utils/size");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _index = require("../../../../events/utils/index");
var _ui = _interopRequireDefault(require("../../../../ui/shared/ui.editor_factory_mixin"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const EDITOR_INLINE_BLOCK = "dx-editor-inline-block";
const CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
const CELL_MODIFIED_CLASS = "dx-cell-modified";
const CELL_INVALID_CLASS = "invalid";
const FOCUSED_CELL_MODIFIED_CLASS = "dx-focused-cell-modified";
const FOCUSED_CELL_INVALID_CLASS = "dx-focused-cell-invalid";
const FOCUS_OVERLAY_CLASS = "focus-overlay";
const CONTENT_CLASS = "content";
const FOCUSED_ELEMENT_CLASS = "dx-focused";
const ROW_CLASS = "dx-row";
const MODULE_NAMESPACE = "dxDataGridEditorFactory";
const UPDATE_FOCUS_EVENTS = (0, _index.addNamespace)([_pointer.default.down, "focusin", _click.name].join(" "), MODULE_NAMESPACE);
const DX_HIDDEN = "dx-hidden";
const ViewControllerWithMixin = (0, _ui.default)(_m_modules.default.ViewController);
class EditorFactory extends ViewControllerWithMixin {
    init() {
        this.createAction("onEditorPreparing", {
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering"
        });
        this.createAction("onEditorPrepared", {
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering"
        });
        this._columnsResizerController = this.getController("columnsResizer");
        this._editingController = this.getController("editing");
        this._keyboardNavigationController = this.getController("keyboardNavigation");
        this._columnsController = this.getController("columns");
        this._validatingController = this.getController("validating");
        this._rowsView = this.getView("rowsView");
        this._updateFocusHandler = this._updateFocusHandler || this.createAction(this._updateFocus.bind(this));
        this._subscribedContainerRoot = this._getContainerRoot();
        _events_engine.default.on(this._subscribedContainerRoot, UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
        this._attachContainerEventHandlers()
    }
    dispose() {
        clearTimeout(this._focusTimeoutID);
        clearTimeout(this._updateFocusTimeoutID);
        _events_engine.default.off(this._subscribedContainerRoot, UPDATE_FOCUS_EVENTS, this._updateFocusHandler)
    }
    _getFocusedElement($dataGridElement) {
        const rowSelector = this.option("focusedRowEnabled") ? "tr[tabindex]:focus" : "tr[tabindex]:not(.dx-data-row):focus";
        const focusedElementSelector = ["td[tabindex]:focus", `${rowSelector}`, "input:focus", "button:focus", "textarea:focus", "div[tabindex]:focus", ".dx-lookup-field:focus", ".dx-checkbox:focus", ".dx-switch:focus", ".dx-dropdownbutton .dx-buttongroup:focus", ".dx-adaptive-item-text:focus"].join(",");
        const $focusedElement = $dataGridElement.find(focusedElementSelector);
        return this.elementIsInsideGrid($focusedElement) && $focusedElement
    }
    _getFocusCellSelector() {
        return ".dx-row > td"
    }
    _updateFocusCore() {
        const $dataGridElement = this.component && this.component.$element();
        if ($dataGridElement) {
            let $focus = this._getFocusedElement($dataGridElement);
            if ($focus && $focus.length) {
                let isHideBorder;
                if (!$focus.hasClass("dx-cell-focus-disabled") && !$focus.hasClass("dx-row")) {
                    const $focusCell = $focus.closest(`${this._getFocusCellSelector()}, .dx-cell-focus-disabled`);
                    if ($focusCell.get(0) !== $focus.get(0)) {
                        isHideBorder = this._needHideBorder($focusCell);
                        $focus = $focusCell
                    }
                }
                if ($focus.length && !$focus.hasClass("dx-cell-focus-disabled")) {
                    this.focus($focus, isHideBorder);
                    return
                }
            }
        }
        this.loseFocus()
    }
    _needHideBorder($element) {
        const rowsViewElement = this._rowsView.element();
        const isRowsView = $element.closest(rowsViewElement).length > 0;
        const isEditing = this._editingController.isEditing();
        return $element.hasClass(EDITOR_INLINE_BLOCK) || isRowsView && !isEditing
    }
    _updateFocus(e) {
        const that = this;
        const isFocusOverlay = e && e.event && (0, _renderer.default)(e.event.target).hasClass(that.addWidgetPrefix("focus-overlay"));
        that._isFocusOverlay = that._isFocusOverlay || isFocusOverlay;
        clearTimeout(that._updateFocusTimeoutID);
        that._updateFocusTimeoutID = setTimeout((() => {
            delete that._updateFocusTimeoutID;
            if (!that._isFocusOverlay) {
                that._updateFocusCore()
            }
            that._isFocusOverlay = false
        }))
    }
    _updateFocusOverlaySize($element, position) {
        $element.hide();
        const location = _position.default.calculate($element, (0, _extend.extend)({
            collision: "fit"
        }, position));
        if (location.h.oversize > 0) {
            (0, _size.setOuterWidth)($element, (0, _size.getOuterWidth)($element) - location.h.oversize)
        }
        if (location.v.oversize > 0) {
            (0, _size.setOuterHeight)($element, (0, _size.getOuterHeight)($element) - location.v.oversize)
        }
        $element.show()
    }
    callbackNames() {
        return ["focused"]
    }
    focus($element, isHideBorder) {
        const that = this;
        if (void 0 === $element) {
            return that._$focusedElement
        }
        if ($element) {
            if (!$element.is(that._$focusedElement)) {
                that._$focusedElement && that._$focusedElement.removeClass("dx-focused")
            }
            that._$focusedElement = $element;
            clearTimeout(that._focusTimeoutID);
            that._focusTimeoutID = setTimeout((() => {
                delete that._focusTimeoutID;
                that.renderFocusOverlay($element, isHideBorder);
                $element.addClass("dx-focused");
                that.focused.fire($element)
            }))
        }
    }
    refocus() {
        const $focus = this.focus();
        this.focus($focus)
    }
    renderFocusOverlay($element, isHideBorder) {
        const that = this;
        if (!_m_utils.default.isElementInCurrentGrid(this, $element)) {
            return
        }
        if (!that._$focusOverlay) {
            that._$focusOverlay = (0, _renderer.default)("<div>").addClass(that.addWidgetPrefix("focus-overlay"))
        }
        if (isHideBorder) {
            that._$focusOverlay.addClass(DX_HIDDEN)
        } else if ($element.length) {
            const align = _browser.default.mozilla ? "right bottom" : "left top";
            const $content = $element.closest(`.${that.addWidgetPrefix("content")}`);
            const elemCoord = (0, _position2.getBoundingRect)($element.get(0));
            const isFocusedCellInvalid = $element.hasClass(this.addWidgetPrefix("invalid"));
            const isFocusedCellModified = $element.hasClass("dx-cell-modified") && !isFocusedCellInvalid;
            that._$focusOverlay.removeClass(DX_HIDDEN).toggleClass("dx-focused-cell-invalid", isFocusedCellInvalid).toggleClass("dx-focused-cell-modified", isFocusedCellModified).appendTo($content);
            (0, _size.setOuterHeight)(that._$focusOverlay, elemCoord.bottom - elemCoord.top + 1);
            (0, _size.setOuterWidth)(that._$focusOverlay, elemCoord.right - elemCoord.left + 1);
            const focusOverlayPosition = {
                precise: true,
                my: align,
                at: align,
                of: $element,
                boundary: $content.length && $content
            };
            that._updateFocusOverlaySize(that._$focusOverlay, focusOverlayPosition);
            _position.default.setup(that._$focusOverlay, focusOverlayPosition);
            that._$focusOverlay.css("visibility", "visible")
        }
    }
    resize() {
        const $focusedElement = this._$focusedElement;
        if ($focusedElement) {
            this.focus($focusedElement)
        }
    }
    loseFocus(skipValidator) {
        this._$focusedElement && this._$focusedElement.removeClass("dx-focused");
        this._$focusedElement = null;
        this._$focusOverlay && this._$focusOverlay.addClass(DX_HIDDEN)
    }
    _getContainerRoot() {
        var _this$component;
        const $container = null === (_this$component = this.component) || void 0 === _this$component ? void 0 : _this$component.$element();
        const root = _dom_adapter.default.getRootNode(null === $container || void 0 === $container ? void 0 : $container.get(0));
        if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !root.host) {
            return _dom_adapter.default.getDocument()
        }
        return root
    }
    _attachContainerEventHandlers() {
        const that = this;
        const $container = that.component && that.component.$element();
        if ($container) {
            _events_engine.default.on($container, (0, _index.addNamespace)("keydown", MODULE_NAMESPACE), (e => {
                if ("tab" === (0, _index.normalizeKeyName)(e)) {
                    that._updateFocusHandler(e)
                }
            }))
        }
    }
}
exports.EditorFactory = EditorFactory;
const editorFactoryModule = exports.editorFactoryModule = {
    defaultOptions: () => ({}),
    controllers: {
        editorFactory: EditorFactory
    }
};
