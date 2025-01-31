/**
 * DevExtreme (esm/__internal/grids/grid_core/editing/m_editing_form_based.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import devices from "../../../../core/devices";
import Guid from "../../../../core/guid";
import $ from "../../../../core/renderer";
import {
    equalByValue
} from "../../../../core/utils/common";
import {
    Deferred
} from "../../../../core/utils/deferred";
import {
    isElementInDom
} from "../../../../core/utils/dom";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import {
    isDefined,
    isString
} from "../../../../core/utils/type";
import eventsEngine from "../../../../events/core/events_engine";
import {
    removeEvent
} from "../../../../events/remove";
import Button from "../../../../ui/button";
import Form from "../../../../ui/form";
import Popup from "../../../../ui/popup/ui.popup";
import Scrollable from "../../../../ui/scroll_view/ui.scrollable";
import gridCoreUtils from "../m_utils";
import {
    BUTTON_CLASS,
    DATA_EDIT_DATA_INSERT_TYPE,
    EDIT_FORM_ITEM_CLASS,
    EDIT_MODE_FORM,
    EDIT_MODE_POPUP,
    EDIT_POPUP_CLASS,
    EDIT_POPUP_FORM_CLASS,
    EDITING_EDITROWKEY_OPTION_NAME,
    EDITING_FORM_OPTION_NAME,
    EDITING_POPUP_OPTION_NAME,
    FOCUSABLE_ELEMENT_CLASS,
    FOCUSABLE_ELEMENT_SELECTOR,
    FORM_BUTTONS_CONTAINER_CLASS
} from "./const";
import {
    forEachFormItems,
    getEditorType
} from "./m_editing_utils";
const editingControllerExtender = Base => class extends Base {
    init() {
        this._editForm = null;
        this._updateEditFormDeferred = null;
        super.init()
    }
    isFormOrPopupEditMode() {
        return this.isPopupEditMode() || this.isFormEditMode()
    }
    isPopupEditMode() {
        const editMode = this.option("editing.mode");
        return editMode === EDIT_MODE_POPUP
    }
    isFormEditMode() {
        const editMode = this.option("editing.mode");
        return editMode === EDIT_MODE_FORM
    }
    getFirstEditableColumnIndex() {
        const firstFormItem = this._firstFormItem;
        if (this.isFormEditMode() && firstFormItem) {
            const editRowKey = this.option(EDITING_EDITROWKEY_OPTION_NAME);
            const editRowIndex = this._dataController.getRowIndexByKey(editRowKey);
            const $editFormElements = this._rowsView.getCellElements(editRowIndex);
            return this._rowsView._getEditFormEditorVisibleIndex($editFormElements, firstFormItem.column)
        }
        return super.getFirstEditableColumnIndex()
    }
    getEditFormRowIndex() {
        return this.isFormOrPopupEditMode() ? this._getVisibleEditRowIndex() : super.getEditFormRowIndex()
    }
    _isEditColumnVisible() {
        const result = super._isEditColumnVisible();
        const editingOptions = this.option("editing");
        return this.isFormOrPopupEditMode() ? editingOptions.allowUpdating || result : result
    }
    _handleDataChanged(args) {
        if (this.isPopupEditMode()) {
            var _args$items, _args$changeTypes;
            const editRowKey = this.option("editing.editRowKey");
            const hasEditRow = null === args || void 0 === args || null === (_args$items = args.items) || void 0 === _args$items ? void 0 : _args$items.some((item => equalByValue(item.key, editRowKey)));
            const onlyInsertChanges = (null === (_args$changeTypes = args.changeTypes) || void 0 === _args$changeTypes ? void 0 : _args$changeTypes.length) && args.changeTypes.every((item => "insert" === item));
            if (("refresh" === args.changeType || hasEditRow && args.isOptionChanged) && !onlyInsertChanges) {
                this._repaintEditPopup()
            }
        }
        super._handleDataChanged(args)
    }
    getPopupContent() {
        var _this$_editPopup;
        const popupVisible = null === (_this$_editPopup = this._editPopup) || void 0 === _this$_editPopup ? void 0 : _this$_editPopup.option("visible");
        if (this.isPopupEditMode() && popupVisible) {
            return this._$popupContent
        }
    }
    _showAddedRow(rowIndex) {
        if (this.isPopupEditMode()) {
            this._showEditPopup(rowIndex)
        } else {
            super._showAddedRow(rowIndex)
        }
    }
    _cancelEditDataCore() {
        super._cancelEditDataCore();
        if (this.isPopupEditMode()) {
            this._hideEditPopup()
        }
    }
    _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
        const editForm = this._editForm;
        if (this.isPopupEditMode()) {
            if (this.option("repaintChangesOnly")) {
                var _row$update;
                null === (_row$update = row.update) || void 0 === _row$update || _row$update.call(row, row);
                this._rowsView.renderDelayedTemplates()
            } else if (editForm) {
                this._updateEditFormDeferred = (new Deferred).done((() => editForm.repaint()));
                if (!this._updateLockCount) {
                    this._updateEditFormDeferred.resolve()
                }
            }
        } else {
            super._updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue)
        }
    }
    _showEditPopup(rowIndex, repaintForm) {
        const isMobileDevice = "desktop" !== devices.current().deviceType;
        const editPopupClass = this.addWidgetPrefix(EDIT_POPUP_CLASS);
        const popupOptions = extend({
            showTitle: false,
            fullScreen: isMobileDevice,
            wrapperAttr: {
                class: editPopupClass
            },
            toolbarItems: [{
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: this._getSaveButtonConfig()
            }, {
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: this._getCancelButtonConfig()
            }],
            contentTemplate: this._getPopupEditFormTemplate(rowIndex)
        }, this.option(EDITING_POPUP_OPTION_NAME));
        if (!this._editPopup) {
            const $popupContainer = $("<div>").appendTo(this.component.$element()).addClass(editPopupClass);
            this._editPopup = this._createComponent($popupContainer, Popup);
            this._editPopup.on("hiding", this._getEditPopupHiddenHandler());
            this._editPopup.on("shown", (e => {
                eventsEngine.trigger(e.component.$content().find(FOCUSABLE_ELEMENT_SELECTOR).not(`.${FOCUSABLE_ELEMENT_CLASS}`).first(), "focus");
                if (repaintForm) {
                    var _this$_editForm;
                    null === (_this$_editForm = this._editForm) || void 0 === _this$_editForm || _this$_editForm.repaint()
                }
            }))
        }
        this._editPopup.option(popupOptions);
        this._editPopup.show();
        super._showEditPopup(rowIndex, repaintForm)
    }
    _getPopupEditFormTemplate(rowIndex) {
        const row = this.component.getVisibleRows()[rowIndex];
        const templateOptions = {
            row: row,
            values: row.values,
            rowType: row.rowType,
            key: row.key,
            rowIndex: rowIndex
        };
        this._rowsView._addWatchMethod(templateOptions, row);
        return container => {
            const formTemplate = this.getEditFormTemplate();
            const scrollable = this._createComponent($("<div>").appendTo(container), Scrollable);
            this._$popupContent = $(scrollable.content());
            formTemplate(this._$popupContent, templateOptions, {
                isPopupForm: true
            });
            this._rowsView.renderDelayedTemplates();
            $(container).parent().attr("aria-label", this.localize("dxDataGrid-ariaEditForm"))
        }
    }
    _repaintEditPopup() {
        const rowIndex = this._getVisibleEditRowIndex();
        if (rowIndex >= 0) {
            var _this$_editPopup2, _this$_editPopup3;
            const defaultAnimation = null === (_this$_editPopup2 = this._editPopup) || void 0 === _this$_editPopup2 ? void 0 : _this$_editPopup2.option("animation");
            null === (_this$_editPopup3 = this._editPopup) || void 0 === _this$_editPopup3 || _this$_editPopup3.option("animation", null);
            this._showEditPopup(rowIndex, true);
            if (void 0 !== defaultAnimation) {
                this._editPopup.option("animation", defaultAnimation)
            }
        }
    }
    _hideEditPopup() {
        var _this$_editPopup4;
        null === (_this$_editPopup4 = this._editPopup) || void 0 === _this$_editPopup4 || _this$_editPopup4.option("visible", false)
    }
    optionChanged(args) {
        if ("editing" === args.name && this.isFormOrPopupEditMode()) {
            const {
                fullName: fullName
            } = args;
            if (0 === fullName.indexOf(EDITING_FORM_OPTION_NAME)) {
                this._handleFormOptionChange(args);
                args.handled = true
            } else if (0 === fullName.indexOf(EDITING_POPUP_OPTION_NAME)) {
                this._handlePopupOptionChange(args);
                args.handled = true
            }
        }
        super.optionChanged(args)
    }
    _handleFormOptionChange(args) {
        var _this$_editPopup5;
        if (this.isFormEditMode()) {
            const editRowIndex = this._getVisibleEditRowIndex();
            if (editRowIndex >= 0) {
                this._dataController.updateItems({
                    changeType: "update",
                    rowIndices: [editRowIndex]
                })
            }
        } else if (null !== (_this$_editPopup5 = this._editPopup) && void 0 !== _this$_editPopup5 && _this$_editPopup5.option("visible") && 0 === args.fullName.indexOf(EDITING_FORM_OPTION_NAME)) {
            this._repaintEditPopup()
        }
    }
    _handlePopupOptionChange(args) {
        const editPopup = this._editPopup;
        if (editPopup) {
            const popupOptionName = args.fullName.slice(EDITING_POPUP_OPTION_NAME.length + 1);
            if (popupOptionName) {
                editPopup.option(popupOptionName, args.value)
            } else {
                editPopup.option(args.value)
            }
        }
    }
    renderFormEditorTemplate(detailCellOptions, item, formTemplateOptions, container, isReadOnly) {
        const that = this;
        const $container = $(container);
        const {
            column: column
        } = item;
        const editorType = getEditorType(item);
        const row = null === detailCellOptions || void 0 === detailCellOptions ? void 0 : detailCellOptions.row;
        const rowData = null === row || void 0 === row ? void 0 : row.data;
        const form = formTemplateOptions.component;
        const value = column.calculateCellValue(rowData);
        const displayValue = gridCoreUtils.getDisplayValue(column, value, rowData, null === row || void 0 === row ? void 0 : row.rowType);
        const {
            label: label,
            labelMark: labelMark,
            labelMode: labelMode
        } = formTemplateOptions.editorOptions || {};
        const cellOptions = extend({}, detailCellOptions, {
            data: rowData,
            cellElement: null,
            isOnForm: true,
            item: item,
            id: form.getItemID(item.name || item.dataField),
            column: extend({}, column, {
                editorType: editorType,
                editorOptions: extend({
                    label: label,
                    labelMark: labelMark,
                    labelMode: labelMode
                }, column.editorOptions, item.editorOptions)
            }),
            columnIndex: column.index,
            setValue: !isReadOnly && column.allowEditing && function(value, text) {
                that.updateFieldValue(cellOptions, value, text)
            }
        });
        cellOptions.value = value;
        cellOptions.displayValue = displayValue;
        cellOptions.text = !column.command ? gridCoreUtils.formatValue(displayValue, column) : "";
        const template = this._getFormEditItemTemplate.bind(this)(cellOptions, column);
        this._rowsView.renderTemplate($container, template, cellOptions, !!isElementInDom($container)).done((() => {
            this._rowsView._updateCell($container, cellOptions)
        }));
        return cellOptions
    }
    getFormEditorTemplate(cellOptions, item) {
        const column = this.component.columnOption(item.name || item.dataField);
        return (options, container) => {
            const $container = $(container);
            const {
                row: row
            } = cellOptions;
            if (null !== row && void 0 !== row && row.watch) {
                const dispose = row.watch((() => column.selector(row.data)), (() => {
                    var _validator;
                    let $editorElement = $container.find(".dx-widget").first();
                    let validator = $editorElement.data("dxValidator");
                    const validatorOptions = null === (_validator = validator) || void 0 === _validator ? void 0 : _validator.option();
                    $container.contents().remove();
                    cellOptions = this.renderFormEditorTemplate.bind(this)(cellOptions, item, options, $container);
                    $editorElement = $container.find(".dx-widget").first();
                    validator = $editorElement.data("dxValidator");
                    if (validatorOptions && !validator) {
                        $editorElement.dxValidator({
                            validationRules: validatorOptions.validationRules,
                            validationGroup: validatorOptions.validationGroup,
                            dataGetter: validatorOptions.dataGetter
                        })
                    }
                }));
                eventsEngine.on($container, removeEvent, dispose)
            }
            cellOptions = this.renderFormEditorTemplate.bind(this)(cellOptions, item, options, $container)
        }
    }
    getEditFormOptions(detailOptions) {
        var _this$_getValidationG;
        const editFormOptions = null === (_this$_getValidationG = this._getValidationGroupsInForm) || void 0 === _this$_getValidationG ? void 0 : _this$_getValidationG.call(this, detailOptions);
        const userCustomizeItem = this.option("editing.form.customizeItem");
        const editFormItemClass = this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS);
        let items = this.option("editing.form.items");
        const isCustomEditorType = {};
        if (!items) {
            const columns = this._columnsController.getColumns();
            items = [];
            each(columns, ((_, column) => {
                if (!column.isBand && !column.type) {
                    items.push({
                        column: column,
                        name: column.name,
                        dataField: column.dataField
                    })
                }
            }))
        } else {
            forEachFormItems(items, (item => {
                const itemId = (null === item || void 0 === item ? void 0 : item.name) || (null === item || void 0 === item ? void 0 : item.dataField);
                if (itemId) {
                    isCustomEditorType[itemId] = !!item.editorType
                }
            }))
        }
        return extend({}, editFormOptions, {
            items: items,
            formID: `dx-${new Guid}`,
            customizeItem: item => {
                let column;
                const itemId = item.name || item.dataField;
                if (item.column || itemId) {
                    column = item.column || this._columnsController.columnOption(item.name ? `name:${item.name}` : `dataField:${item.dataField}`)
                }
                if (column) {
                    item.label = item.label || {};
                    item.label.text = item.label.text || column.caption;
                    if ("boolean" === column.dataType && void 0 === item.label.visible) {
                        const labelMode = this.option("editing.form.labelMode");
                        if ("floating" === labelMode || "static" === labelMode) {
                            item.label.visible = true
                        }
                    }
                    item.template = item.template || this.getFormEditorTemplate(detailOptions, item);
                    item.column = column;
                    item.isCustomEditorType = isCustomEditorType[itemId];
                    if (column.formItem) {
                        extend(item, column.formItem)
                    }
                    if (void 0 === item.isRequired && column.validationRules) {
                        item.isRequired = column.validationRules.some((rule => "required" === rule.type));
                        item.validationRules = []
                    }
                    const itemVisible = isDefined(item.visible) ? item.visible : true;
                    if (!this._firstFormItem && itemVisible) {
                        this._firstFormItem = item
                    }
                }
                null === userCustomizeItem || void 0 === userCustomizeItem || userCustomizeItem.call(this, item);
                item.cssClass = isString(item.cssClass) ? `${item.cssClass} ${editFormItemClass}` : editFormItemClass
            }
        })
    }
    getEditFormTemplate() {
        return ($container, detailOptions, options) => {
            const editFormOptions = this.option(EDITING_FORM_OPTION_NAME);
            const baseEditFormOptions = this.getEditFormOptions(detailOptions);
            const $formContainer = $("<div>").appendTo($container);
            const isPopupForm = null === options || void 0 === options ? void 0 : options.isPopupForm;
            this._firstFormItem = void 0;
            if (isPopupForm) {
                $formContainer.addClass(this.addWidgetPrefix(EDIT_POPUP_FORM_CLASS))
            }
            this._editForm = this._createComponent($formContainer, Form, extend({}, editFormOptions, baseEditFormOptions));
            if (!isPopupForm) {
                const $buttonsContainer = $("<div>").addClass(this.addWidgetPrefix(FORM_BUTTONS_CONTAINER_CLASS)).appendTo($container);
                this._createComponent($("<div>").appendTo($buttonsContainer), Button, this._getSaveButtonConfig());
                this._createComponent($("<div>").appendTo($buttonsContainer), Button, this._getCancelButtonConfig())
            }
            this._editForm.on("contentReady", (() => {
                var _this$_editPopup6;
                this._rowsView.renderDelayedTemplates();
                null === (_this$_editPopup6 = this._editPopup) || void 0 === _this$_editPopup6 || _this$_editPopup6.repaint()
            }))
        }
    }
    getEditForm() {
        return this._editForm
    }
    _endUpdateCore() {
        var _this$_updateEditForm;
        null === (_this$_updateEditForm = this._updateEditFormDeferred) || void 0 === _this$_updateEditForm || _this$_updateEditForm.resolve()
    }
    _beforeEndSaving(changes) {
        super._beforeEndSaving(changes);
        if (this.isPopupEditMode()) {
            var _this$_editPopup7;
            null === (_this$_editPopup7 = this._editPopup) || void 0 === _this$_editPopup7 || _this$_editPopup7.hide()
        }
    }
    _processDataItemCore(item, change, key, columns, generateDataValues) {
        const {
            type: type
        } = change;
        if (this.isPopupEditMode() && type === DATA_EDIT_DATA_INSERT_TYPE) {
            item.visible = false
        }
        super._processDataItemCore(item, change, key, columns, generateDataValues)
    }
    _editRowFromOptionChangedCore(rowIndices, rowIndex) {
        const isPopupEditMode = this.isPopupEditMode();
        super._editRowFromOptionChangedCore(rowIndices, rowIndex, isPopupEditMode);
        if (isPopupEditMode) {
            this._showEditPopup(rowIndex)
        }
    }
};
const data = Base => class extends Base {
    _updateEditItem(item) {
        if (this._editingController.isFormEditMode()) {
            item.rowType = "detail"
        }
    }
    _getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
        if (false === isLiveUpdate && newItem.isEditing && this._editingController.isFormEditMode()) {
            return
        }
        return super._getChangedColumnIndices.apply(this, arguments)
    }
};
const rowsView = Base => class extends Base {
    _renderCellContent($cell, options) {
        if ("data" === options.rowType && this._editingController.isPopupEditMode() && false === options.row.visible) {
            return
        }
        super._renderCellContent.apply(this, arguments)
    }
    getCellElements(rowIndex) {
        const $cellElements = super.getCellElements(rowIndex);
        const editingController = this._editingController;
        const editForm = editingController.getEditForm();
        const editFormRowIndex = editingController.getEditFormRowIndex();
        if (editFormRowIndex === rowIndex && $cellElements && editForm) {
            return editForm.$element().find(`.${this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS)}, .${BUTTON_CLASS}`)
        }
        return $cellElements
    }
    _getVisibleColumnIndex($cells, rowIndex, columnIdentifier) {
        const editFormRowIndex = this._editingController.getEditFormRowIndex();
        if (editFormRowIndex === rowIndex && isString(columnIdentifier)) {
            const column = this._columnsController.columnOption(columnIdentifier);
            return this._getEditFormEditorVisibleIndex($cells, column)
        }
        return super._getVisibleColumnIndex.apply(this, arguments)
    }
    _getEditFormEditorVisibleIndex($cells, column) {
        let visibleIndex = -1;
        each($cells, ((index, cellElement) => {
            const item = $(cellElement).find(".dx-field-item-content").data("dx-form-item");
            if (null !== item && void 0 !== item && item.column && column && item.column.index === column.index) {
                visibleIndex = index;
                return false
            }
        }));
        return visibleIndex
    }
    _isFormItem(parameters) {
        const isDetailRow = "detail" === parameters.rowType || "detailAdaptive" === parameters.rowType;
        const isPopupEditing = "data" === parameters.rowType && this._editingController.isPopupEditMode();
        return (isDetailRow || isPopupEditing) && parameters.item
    }
    _updateCell($cell, parameters) {
        if (this._isFormItem(parameters)) {
            this._formItemPrepared(parameters, $cell)
        } else {
            super._updateCell($cell, parameters)
        }
    }
    _updateContent() {
        const editingController = this._editingController;
        const oldEditForm = editingController.getEditForm();
        const validationGroup = null === oldEditForm || void 0 === oldEditForm ? void 0 : oldEditForm.option("validationGroup");
        const deferred = super._updateContent.apply(this, arguments);
        return deferred.done((() => {
            const newEditForm = editingController.getEditForm();
            if (validationGroup && newEditForm && newEditForm !== oldEditForm) {
                newEditForm.option("validationGroup", validationGroup)
            }
        }))
    }
};
export const editingFormBasedModule = {
    extenders: {
        controllers: {
            editing: editingControllerExtender,
            data: data
        },
        views: {
            rowsView: rowsView
        }
    }
};
