/**
 * DevExtreme (cjs/__internal/grids/grid_core/error_handling/m_error_handling.js)
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
exports.errorHandlingModule = exports.ErrorHandlingController = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _iterator = require("../../../../core/utils/iterator");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _m_modules = _interopRequireDefault(require("../m_modules"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const ERROR_ROW_CLASS = "dx-error-row";
const ERROR_MESSAGE_CLASS = "dx-error-message";
const ERROR_CLOSEBUTTON_CLASS = "dx-closebutton";
const ACTION_CLASS = "action";
class ErrorHandlingController extends _m_modules.default.ViewController {
    init() {
        this._resizingController = this.getController("resizing");
        this._columnsController = this.getController("columns");
        this._columnHeadersView = this.getView("columnHeadersView");
        this._rowsView = this.getView("rowsView")
    }
    _createErrorRow(error, $tableElements) {
        let $errorRow;
        let $closeButton;
        const $errorMessage = this._renderErrorMessage(error);
        if ($tableElements) {
            $errorRow = (0, _renderer.default)("<tr>").attr("role", "row").addClass("dx-error-row");
            $closeButton = (0, _renderer.default)("<div>").addClass("dx-closebutton").addClass(this.addWidgetPrefix("action"));
            _events_engine.default.on($closeButton, _click.name, this.createAction((args => {
                var _this$_resizingContro, _this$_resizingContro2;
                const e = args.event;
                let $errorRow;
                const errorRowIndex = (0, _renderer.default)(e.currentTarget).closest(".dx-error-row").index();
                e.stopPropagation();
                (0, _iterator.each)($tableElements, ((_, tableElement) => {
                    $errorRow = (0, _renderer.default)(tableElement).children("tbody").children("tr").eq(errorRowIndex);
                    this.removeErrorRow($errorRow)
                }));
                null === (_this$_resizingContro = this._resizingController) || void 0 === _this$_resizingContro || null === (_this$_resizingContro2 = _this$_resizingContro.fireContentReadyAction) || void 0 === _this$_resizingContro2 || _this$_resizingContro2.call(_this$_resizingContro)
            })));
            (0, _renderer.default)("<td>").attr({
                colSpan: this._columnsController.getVisibleColumns().length,
                role: "gridcell"
            }).prepend($closeButton).append($errorMessage).appendTo($errorRow);
            return $errorRow
        }
        return $errorMessage
    }
    _renderErrorMessage(error) {
        const message = error.url ? error.message.replace(error.url, "") : error.message || error;
        const $message = (0, _renderer.default)("<div>").attr("role", "alert").attr("aria-roledescription", _message.default.format("dxDataGrid-ariaError")).addClass("dx-error-message").text(message);
        if (error.url) {
            (0, _renderer.default)("<a>").attr("href", error.url).text(error.url).appendTo($message)
        }
        return $message
    }
    renderErrorRow(error, rowIndex, $popupContent) {
        var _this$_resizingContro3, _this$_resizingContro4;
        const that = this;
        let $errorMessageElement;
        let $firstErrorRow;
        if ($popupContent) {
            $popupContent.find(".dx-error-message").remove();
            $errorMessageElement = that._createErrorRow(error);
            $popupContent.prepend($errorMessageElement);
            return $errorMessageElement
        }
        const viewElement = rowIndex >= 0 || !that._columnHeadersView.isVisible() ? that._rowsView : that._columnHeadersView;
        const $tableElements = viewElement.getTableElements();
        (0, _iterator.each)($tableElements, ((_, tableElement) => {
            $errorMessageElement = that._createErrorRow(error, $tableElements);
            $firstErrorRow = $firstErrorRow || $errorMessageElement;
            if (rowIndex >= 0) {
                const $row = viewElement._getRowElements((0, _renderer.default)(tableElement)).eq(rowIndex);
                that.removeErrorRow($row.next());
                $errorMessageElement.insertAfter($row)
            } else {
                const $tbody = (0, _renderer.default)(tableElement).children("tbody");
                const rowElements = $tbody.children("tr");
                if (that._columnHeadersView.isVisible()) {
                    that.removeErrorRow(rowElements.last());
                    (0, _renderer.default)(tableElement).append($errorMessageElement)
                } else {
                    that.removeErrorRow(rowElements.first());
                    $tbody.first().prepend($errorMessageElement)
                }
            }
        }));
        null === (_this$_resizingContro3 = this._resizingController) || void 0 === _this$_resizingContro3 || null === (_this$_resizingContro4 = _this$_resizingContro3.fireContentReadyAction) || void 0 === _this$_resizingContro4 || _this$_resizingContro4.call(_this$_resizingContro3);
        return $firstErrorRow
    }
    removeErrorRow($row) {
        if (!$row) {
            const $columnHeaders = this._columnHeadersView && this._columnHeadersView.element();
            $row = $columnHeaders && $columnHeaders.find(".dx-error-row");
            if (!$row || !$row.length) {
                const $rowsViewElement = this._rowsView.element();
                $row = $rowsViewElement && $rowsViewElement.find(".dx-error-row")
            }
        }
        $row && $row.hasClass("dx-error-row") && $row.remove()
    }
    optionChanged(args) {
        if ("errorRowEnabled" === args.name) {
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
}
exports.ErrorHandlingController = ErrorHandlingController;
const data = Base => class extends Base {
    init() {
        super.init();
        this.dataErrorOccurred.add(((error, $popupContent) => {
            if (this.option("errorRowEnabled")) {
                this._errorHandlingController.renderErrorRow(error, void 0, $popupContent)
            }
        }));
        this.changed.add((e => {
            if (e && "loadError" === e.changeType) {
                return
            }
            if (this._editingController && !this._editingController.hasChanges()) {
                var _this$_errorHandlingC, _this$_errorHandlingC2;
                null === (_this$_errorHandlingC = this._errorHandlingController) || void 0 === _this$_errorHandlingC || null === (_this$_errorHandlingC2 = _this$_errorHandlingC.removeErrorRow) || void 0 === _this$_errorHandlingC2 || _this$_errorHandlingC2.call(_this$_errorHandlingC)
            }
        }))
    }
};
const errorHandlingModule = exports.errorHandlingModule = {
    defaultOptions: () => ({
        errorRowEnabled: true
    }),
    controllers: {
        errorHandling: ErrorHandlingController
    },
    extenders: {
        controllers: {
            data: data
        }
    }
};
