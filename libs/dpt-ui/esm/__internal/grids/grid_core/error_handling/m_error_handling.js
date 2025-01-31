/**
 * DevExtreme (esm/__internal/grids/grid_core/error_handling/m_error_handling.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    each
} from "../../../../core/utils/iterator";
import {
    name as clickEventName
} from "../../../../events/click";
import eventsEngine from "../../../../events/core/events_engine";
import messageLocalization from "../../../../localization/message";
import modules from "../m_modules";
const ERROR_ROW_CLASS = "dx-error-row";
const ERROR_MESSAGE_CLASS = "dx-error-message";
const ERROR_CLOSEBUTTON_CLASS = "dx-closebutton";
const ACTION_CLASS = "action";
export class ErrorHandlingController extends modules.ViewController {
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
            $errorRow = $("<tr>").attr("role", "row").addClass("dx-error-row");
            $closeButton = $("<div>").addClass("dx-closebutton").addClass(this.addWidgetPrefix("action"));
            eventsEngine.on($closeButton, clickEventName, this.createAction((args => {
                var _this$_resizingContro, _this$_resizingContro2;
                const e = args.event;
                let $errorRow;
                const errorRowIndex = $(e.currentTarget).closest(".dx-error-row").index();
                e.stopPropagation();
                each($tableElements, ((_, tableElement) => {
                    $errorRow = $(tableElement).children("tbody").children("tr").eq(errorRowIndex);
                    this.removeErrorRow($errorRow)
                }));
                null === (_this$_resizingContro = this._resizingController) || void 0 === _this$_resizingContro || null === (_this$_resizingContro2 = _this$_resizingContro.fireContentReadyAction) || void 0 === _this$_resizingContro2 || _this$_resizingContro2.call(_this$_resizingContro)
            })));
            $("<td>").attr({
                colSpan: this._columnsController.getVisibleColumns().length,
                role: "gridcell"
            }).prepend($closeButton).append($errorMessage).appendTo($errorRow);
            return $errorRow
        }
        return $errorMessage
    }
    _renderErrorMessage(error) {
        const message = error.url ? error.message.replace(error.url, "") : error.message || error;
        const $message = $("<div>").attr("role", "alert").attr("aria-roledescription", messageLocalization.format("dxDataGrid-ariaError")).addClass("dx-error-message").text(message);
        if (error.url) {
            $("<a>").attr("href", error.url).text(error.url).appendTo($message)
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
        each($tableElements, ((_, tableElement) => {
            $errorMessageElement = that._createErrorRow(error, $tableElements);
            $firstErrorRow = $firstErrorRow || $errorMessageElement;
            if (rowIndex >= 0) {
                const $row = viewElement._getRowElements($(tableElement)).eq(rowIndex);
                that.removeErrorRow($row.next());
                $errorMessageElement.insertAfter($row)
            } else {
                const $tbody = $(tableElement).children("tbody");
                const rowElements = $tbody.children("tr");
                if (that._columnHeadersView.isVisible()) {
                    that.removeErrorRow(rowElements.last());
                    $(tableElement).append($errorMessageElement)
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
export const errorHandlingModule = {
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
