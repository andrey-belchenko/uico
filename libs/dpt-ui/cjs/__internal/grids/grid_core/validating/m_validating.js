/**
 * DevExtreme (cjs/__internal/grids/grid_core/validating/m_validating.js)
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
exports.validatingRowsViewExtender = exports.validatingModule = exports.validatingEditorFactoryExtender = exports.validatingEditingExtender = exports.validatingDataControllerExtender = exports.ValidatingController = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _string = require("../../../../core/utils/string");
var _type = require("../../../../core/utils/type");
var _array_utils = require("../../../../data/array_utils");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _load_indicator = _interopRequireDefault(require("../../../../ui/load_indicator"));
var _ui = _interopRequireDefault(require("../../../../ui/overlay/ui.overlay"));
var _themes = require("../../../../ui/themes");
var _validation_engine = _interopRequireDefault(require("../../../../ui/validation_engine"));
var _validator = _interopRequireDefault(require("../../../../ui/validator"));
var _selectors = require("../../../../ui/widget/selectors");
var _ui2 = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _const = require("../editing/const");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const INVALIDATE_CLASS = "invalid";
const REVERT_TOOLTIP_CLASS = "revert-tooltip";
const INVALID_MESSAGE_CLASS = "dx-invalid-message";
const INVALID_MESSAGE_ID = "dxInvalidMessage";
const WIDGET_INVALID_MESSAGE_CLASS = "invalid-message";
const INVALID_MESSAGE_ALWAYS_CLASS = "dx-invalid-message-always";
const REVERT_BUTTON_CLASS = "dx-revert-button";
const REVERT_BUTTON_ID = "dxRevertButton";
const VALIDATOR_CLASS = "validator";
const PENDING_INDICATOR_CLASS = "dx-pending-indicator";
const VALIDATION_PENDING_CLASS = "dx-validation-pending";
const CONTENT_CLASS = "content";
const INSERT_INDEX = "__DX_INSERT_INDEX__";
const PADDING_BETWEEN_TOOLTIPS = 2;
const EDIT_MODE_ROW = "row";
const EDIT_MODE_FORM = "form";
const EDIT_MODE_BATCH = "batch";
const EDIT_MODE_CELL = "cell";
const EDIT_MODE_POPUP = "popup";
const GROUP_CELL_CLASS = "dx-group-cell";
const FORM_BASED_MODES = ["popup", "form"];
const COMMAND_TRANSPARENT = "transparent";
const VALIDATION_STATUS = {
    valid: "valid",
    invalid: "invalid",
    pending: "pending"
};
const EDIT_DATA_INSERT_TYPE = "insert";
const EDIT_DATA_REMOVE_TYPE = "remove";
const VALIDATION_CANCELLED = "cancel";
const validationResultIsValid = function(result) {
    return (0, _type.isDefined)(result) && "cancel" !== result
};
const cellValueShouldBeValidated = function(value, rowOptions) {
    return void 0 !== value || void 0 === value && rowOptions && !rowOptions.isNewRow
};
class ValidatingController extends _m_modules.default.Controller {
    constructor() {
        super(...arguments);
        this._isValidationInProgress = false;
        this._disableApplyValidationResults = false
    }
    init() {
        this._editingController = this.getController("editing");
        this._editorFactoryController = this.getController("editorFactory");
        this._columnsController = this.getController("columns");
        this.createAction("onRowValidating");
        if (!this._validationState) {
            this.initValidationState()
        }
    }
    initValidationState() {
        this._validationState = [];
        this._validationStateCache = {}
    }
    _rowIsValidated(change) {
        const validationData = this._getValidationData(null === change || void 0 === change ? void 0 : change.key);
        return !!validationData && !!validationData.validated
    }
    _getValidationData(key, create) {
        const keyHash = (0, _common.getKeyHash)(key);
        const isObjectKeyHash = (0, _type.isObject)(keyHash);
        let validationData;
        if (isObjectKeyHash) {
            validationData = this._validationState.filter((data => (0, _common.equalByValue)(data.key, key)))[0]
        } else {
            validationData = this._validationStateCache[keyHash]
        }
        if (!validationData && create) {
            validationData = {
                key: key,
                isValid: true
            };
            this._validationState.push(validationData);
            if (!isObjectKeyHash) {
                this._validationStateCache[keyHash] = validationData
            }
        }
        return validationData
    }
    _getBrokenRules(validationData, validationResults) {
        let brokenRules;
        if (validationResults) {
            brokenRules = validationResults.brokenRules || validationResults.brokenRule && [validationResults.brokenRule]
        } else {
            brokenRules = validationData.brokenRules || []
        }
        return brokenRules
    }
    _rowValidating(validationData, validationResults) {
        const deferred = new _deferred.Deferred;
        const change = this._editingController.getChangeByKey(null === validationData || void 0 === validationData ? void 0 : validationData.key);
        const brokenRules = this._getBrokenRules(validationData, validationResults);
        const isValid = validationResults ? validationResults.isValid : validationData.isValid;
        const parameters = {
            brokenRules: brokenRules,
            isValid: isValid,
            key: change.key,
            newData: change.data,
            oldData: this._editingController._getOldData(change.key),
            promise: null,
            errorText: this.getHiddenValidatorsErrorText(brokenRules)
        };
        this.executeAction("onRowValidating", parameters);
        (0, _deferred.when)((0, _deferred.fromPromise)(parameters.promise)).always((() => {
            validationData.isValid = parameters.isValid;
            validationData.errorText = parameters.errorText;
            deferred.resolve(parameters)
        }));
        return deferred.promise()
    }
    getHiddenValidatorsErrorText(brokenRules) {
        const brokenRulesMessages = [];
        (0, _iterator.each)(brokenRules, ((_, brokenRule) => {
            const {
                column: column
            } = brokenRule;
            const isGroupExpandColumn = column && void 0 !== column.groupIndex && !column.showWhenGrouped;
            const isVisibleColumn = column && column.visible;
            if (!brokenRule.validator.$element().parent().length && (!isVisibleColumn || isGroupExpandColumn)) {
                brokenRulesMessages.push(brokenRule.message)
            }
        }));
        return brokenRulesMessages.join(", ")
    }
    validate(isFull) {
        let isValid = true;
        const editingController = this._editingController;
        const deferred = new _deferred.Deferred;
        const completeList = [];
        const editMode = editingController.getEditMode();
        isFull = isFull || editMode === EDIT_MODE_ROW;
        if (this._isValidationInProgress) {
            return deferred.resolve(false).promise()
        }
        this._isValidationInProgress = true;
        if (isFull) {
            editingController.addDeferred(deferred);
            const changes = editingController.getChanges();
            (0, _iterator.each)(changes, ((index, _ref) => {
                let {
                    type: type,
                    key: key
                } = _ref;
                if ("remove" !== type) {
                    const validationData = this._getValidationData(key, true);
                    const validationResult = this.validateGroup(validationData);
                    completeList.push(validationResult);
                    validationResult.done((validationResult => {
                        validationData.validated = true;
                        isValid = isValid && validationResult.isValid
                    }))
                }
            }))
        } else if (this._currentCellValidator) {
            const validationResult = this.validateGroup(this._currentCellValidator._findGroup());
            completeList.push(validationResult);
            validationResult.done((validationResult => {
                isValid = validationResult.isValid
            }))
        }(0, _deferred.when)(...completeList).done((() => {
            this._isValidationInProgress = false;
            deferred.resolve(isValid)
        }));
        return deferred.promise()
    }
    validateGroup(validationData) {
        var _validationResult;
        const result = new _deferred.Deferred;
        const validateGroup = validationData && _validation_engine.default.getGroupConfig(validationData);
        let validationResult;
        if (null !== validateGroup && void 0 !== validateGroup && validateGroup.validators.length) {
            this.resetRowValidationResults(validationData);
            validationResult = _validation_engine.default.validateGroup(validationData)
        }(0, _deferred.when)((null === (_validationResult = validationResult) || void 0 === _validationResult ? void 0 : _validationResult.complete) || validationResult).done((validationResult => {
            (0, _deferred.when)(this._rowValidating(validationData, validationResult)).done(result.resolve)
        }));
        return result.promise()
    }
    isRowDataModified(change) {
        return !(0, _type.isEmptyObject)(change.data)
    }
    updateValidationState(change) {
        const editMode = this._editingController.getEditMode();
        const {
            key: key
        } = change;
        const validationData = this._getValidationData(key, true);
        if (!FORM_BASED_MODES.includes(editMode)) {
            if ("insert" === change.type && !this.isRowDataModified(change)) {
                validationData.isValid = true;
                return
            }
            this.setDisableApplyValidationResults(true);
            const groupConfig = _validation_engine.default.getGroupConfig(validationData);
            if (groupConfig) {
                const validationResult = _validation_engine.default.validateGroup(validationData);
                (0, _deferred.when)(validationResult.complete || validationResult).done((validationResult => {
                    validationData.isValid = validationResult.isValid;
                    validationData.brokenRules = validationResult.brokenRules
                }))
            } else if (!validationData.brokenRules || !validationData.brokenRules.length) {
                validationData.isValid = true
            }
            this.setDisableApplyValidationResults(false)
        } else {
            validationData.isValid = true
        }
    }
    setValidator(validator) {
        this._currentCellValidator = validator
    }
    renderCellPendingIndicator($container) {
        let $indicator = $container.find(".dx-pending-indicator");
        if (!$indicator.length) {
            const $indicatorContainer = $container;
            $indicator = (0, _renderer.default)("<div>").appendTo($indicatorContainer).addClass("dx-pending-indicator");
            this._createComponent($indicator, _load_indicator.default);
            $container.addClass("dx-validation-pending")
        }
    }
    disposeCellPendingIndicator($container) {
        const $indicator = $container.find(".dx-pending-indicator");
        if ($indicator.length) {
            const indicator = _load_indicator.default.getInstance($indicator);
            if (indicator) {
                indicator.dispose();
                indicator.$element().remove()
            }
            $container.removeClass("dx-validation-pending")
        }
    }
    validationStatusChanged(result) {
        const {
            validator: validator
        } = result;
        const validationGroup = validator.option("validationGroup");
        const {
            column: column
        } = validator.option("dataGetter")();
        this.updateCellValidationResult({
            rowKey: validationGroup.key,
            columnIndex: column.index,
            validationResult: result
        })
    }
    validatorInitialized(arg) {
        arg.component.on("validating", this.validationStatusChanged.bind(this));
        arg.component.on("validated", this.validationStatusChanged.bind(this))
    }
    validatorDisposing(arg) {
        const validator = arg.component;
        const validationGroup = validator.option("validationGroup");
        const {
            column: column
        } = validator.option("dataGetter")();
        const result = this.getCellValidationResult({
            rowKey: null === validationGroup || void 0 === validationGroup ? void 0 : validationGroup.key,
            columnIndex: column.index
        });
        if (validationResultIsValid(result) && result.status === VALIDATION_STATUS.pending) {
            this.cancelCellValidationResult({
                change: validationGroup,
                columnIndex: column.index
            })
        }
    }
    applyValidationResult($container, result) {
        const {
            validator: validator
        } = result;
        const validationGroup = validator.option("validationGroup");
        const {
            column: column
        } = validator.option("dataGetter")();
        result.brokenRules && result.brokenRules.forEach((rule => {
            rule.columnIndex = column.index;
            rule.column = column
        }));
        if ($container) {
            const validationResult = this.getCellValidationResult({
                rowKey: validationGroup.key,
                columnIndex: column.index
            });
            const requestIsDisabled = validationResultIsValid(validationResult) && validationResult.disabledPendingId === result.id;
            if (this._disableApplyValidationResults || requestIsDisabled) {
                return
            }
            if (result.status === VALIDATION_STATUS.invalid) {
                const $focus = $container.find(":focus");
                if (!(0, _selectors.focused)($focus)) {
                    _events_engine.default.trigger($focus, "focus");
                    _events_engine.default.trigger($focus, _pointer.default.down)
                }
            }
            const editor = !column.editCellTemplate && this._editorFactoryController.getEditorInstance($container);
            if (result.status === VALIDATION_STATUS.pending) {
                if (editor) {
                    editor.option("validationStatus", VALIDATION_STATUS.pending)
                } else {
                    this.renderCellPendingIndicator($container)
                }
            } else if (editor) {
                editor.option("validationStatus", VALIDATION_STATUS.valid)
            } else {
                this.disposeCellPendingIndicator($container)
            }
            $container.toggleClass(this.addWidgetPrefix("invalid"), result.status === VALIDATION_STATUS.invalid)
        }
    }
    _syncInternalEditingData(parameters) {
        var _parameters$row;
        const editingController = this._editingController;
        const change = editingController.getChangeByKey(parameters.key);
        const oldDataFromState = editingController._getOldData(parameters.key);
        const oldData = null === (_parameters$row = parameters.row) || void 0 === _parameters$row ? void 0 : _parameters$row.oldData;
        if (change && oldData && !oldDataFromState) {
            editingController._addInternalData({
                key: parameters.key,
                oldData: oldData
            })
        }
    }
    createValidator(parameters, $container) {
        const editingController = this._editingController;
        const {
            column: column
        } = parameters;
        let {
            showEditorAlways: showEditorAlways
        } = column;
        if ((0, _type.isDefined)(column.command) || !column.validationRules || !Array.isArray(column.validationRules) || !column.validationRules.length) {
            return
        }
        const editIndex = editingController.getIndexByKey(parameters.key, editingController.getChanges());
        let needCreateValidator = editIndex > -1;
        if (!needCreateValidator) {
            if (!showEditorAlways) {
                var _this$_columnsControl;
                const visibleColumns = (null === (_this$_columnsControl = this._columnsController) || void 0 === _this$_columnsControl ? void 0 : _this$_columnsControl.getVisibleColumns()) || [];
                showEditorAlways = visibleColumns.some((column => column.showEditorAlways))
            }
            const isEditRow = (0, _common.equalByValue)(this.option("editing.editRowKey"), parameters.key);
            const isCellOrBatchEditingAllowed = editingController.isCellOrBatchEditMode() && editingController.allowUpdating({
                row: parameters.row
            });
            needCreateValidator = isEditRow || isCellOrBatchEditingAllowed && showEditorAlways;
            if (isCellOrBatchEditingAllowed && showEditorAlways) {
                var _parameters$row2;
                editingController._addInternalData({
                    key: parameters.key,
                    oldData: (null === (_parameters$row2 = parameters.row) || void 0 === _parameters$row2 ? void 0 : _parameters$row2.oldData) ?? parameters.data
                })
            }
        }
        if (needCreateValidator) {
            if ($container && !$container.length) {
                _ui2.default.log("E1050");
                return
            }
            this._syncInternalEditingData(parameters);
            const validationData = this._getValidationData(parameters.key, true);
            const getValue = () => {
                const change = editingController.getChangeByKey(null === validationData || void 0 === validationData ? void 0 : validationData.key);
                const value = column.calculateCellValue((null === change || void 0 === change ? void 0 : change.data) || {});
                return void 0 !== value ? value : parameters.value
            };
            const useDefaultValidator = $container && $container.hasClass("dx-widget");
            $container && $container.addClass(this.addWidgetPrefix("validator"));
            const validator = new _validator.default($container || (0, _renderer.default)("<div>"), {
                name: column.caption,
                validationRules: (0, _extend.extend)(true, [], column.validationRules),
                validationGroup: validationData,
                adapter: useDefaultValidator ? null : {
                    getValue: getValue,
                    applyValidationResults: result => {
                        this.applyValidationResult($container, result)
                    }
                },
                dataGetter() {
                    const key = null === validationData || void 0 === validationData ? void 0 : validationData.key;
                    const change = editingController.getChangeByKey(key);
                    const oldData = editingController._getOldData(key);
                    return {
                        data: (0, _array_utils.createObjectWithChanges)(oldData, null === change || void 0 === change ? void 0 : change.data),
                        column: column
                    }
                },
                onInitialized: this.validatorInitialized.bind(this),
                onDisposing: this.validatorDisposing.bind(this)
            });
            if (useDefaultValidator) {
                const adapter = validator.option("adapter");
                if (adapter) {
                    const originBypass = adapter.bypass;
                    const defaultAdapterBypass = () => parameters.row.isNewRow && !this._isValidationInProgress && !editingController.isCellModified(parameters);
                    adapter.getValue = getValue;
                    adapter.validationRequestsCallbacks = [];
                    adapter.bypass = () => originBypass.call(adapter) || defaultAdapterBypass()
                }
            }
            return validator
        }
        return
    }
    setDisableApplyValidationResults(flag) {
        this._disableApplyValidationResults = flag
    }
    getDisableApplyValidationResults() {
        return this._disableApplyValidationResults
    }
    isCurrentValidatorProcessing(_ref2) {
        let {
            rowKey: rowKey,
            columnIndex: columnIndex
        } = _ref2;
        return this._currentCellValidator && (0, _common.equalByValue)(this._currentCellValidator.option("validationGroup").key, rowKey) && this._currentCellValidator.option("dataGetter")().column.index === columnIndex
    }
    validateCell(validator) {
        const cellParams = {
            rowKey: validator.option("validationGroup").key,
            columnIndex: validator.option("dataGetter")().column.index,
            validationResult: null
        };
        let validationResult = this.getCellValidationResult(cellParams);
        const stateRestored = validationResultIsValid(validationResult);
        const adapter = validator.option("adapter");
        if (!stateRestored) {
            validationResult = validator.validate()
        } else {
            const currentCellValue = adapter.getValue();
            if (!(0, _common.equalByValue)(currentCellValue, validationResult.value)) {
                validationResult = validator.validate()
            }
        }
        const deferred = new _deferred.Deferred;
        if (stateRestored && validationResult.status === VALIDATION_STATUS.pending) {
            this.updateCellValidationResult(cellParams);
            adapter.applyValidationResults(validationResult)
        }(0, _deferred.when)(validationResult.complete || validationResult).done((validationResult => {
            stateRestored && adapter.applyValidationResults(validationResult);
            deferred.resolve(validationResult)
        }));
        return deferred.promise()
    }
    updateCellValidationResult(_ref3) {
        let {
            rowKey: rowKey,
            columnIndex: columnIndex,
            validationResult: validationResult
        } = _ref3;
        const validationData = this._getValidationData(rowKey);
        if (!validationData) {
            return
        }
        if (!validationData.validationResults) {
            validationData.validationResults = {}
        }
        let result;
        if (validationResult) {
            result = (0, _extend.extend)({}, validationResult);
            validationData.validationResults[columnIndex] = result;
            if (validationResult.status === VALIDATION_STATUS.pending) {
                if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
                    result.deferred = new _deferred.Deferred;
                    result.complete.always((() => {
                        result.deferred.resolve()
                    }));
                    this._editingController.addDeferred(result.deferred)
                }
                if (this._disableApplyValidationResults) {
                    result.disabledPendingId = validationResult.id;
                    return
                }
            }
        } else {
            result = validationData.validationResults[columnIndex]
        }
        if (result && result.disabledPendingId) {
            delete result.disabledPendingId
        }
    }
    getCellValidationResult(_ref4) {
        var _validationData$valid;
        let {
            rowKey: rowKey,
            columnIndex: columnIndex
        } = _ref4;
        const validationData = this._getValidationData(rowKey, true);
        return null === validationData || void 0 === validationData || null === (_validationData$valid = validationData.validationResults) || void 0 === _validationData$valid ? void 0 : _validationData$valid[columnIndex]
    }
    removeCellValidationResult(_ref5) {
        let {
            change: change,
            columnIndex: columnIndex
        } = _ref5;
        const validationData = this._getValidationData(null === change || void 0 === change ? void 0 : change.key);
        if (validationData && validationData.validationResults) {
            this.cancelCellValidationResult({
                change: change,
                columnIndex: columnIndex
            });
            delete validationData.validationResults[columnIndex]
        }
    }
    cancelCellValidationResult(_ref6) {
        let {
            change: change,
            columnIndex: columnIndex
        } = _ref6;
        const validationData = this._getValidationData(change.key);
        if (change && validationData.validationResults) {
            const result = validationData.validationResults[columnIndex];
            if (result) {
                result.deferred && result.deferred.reject("cancel");
                validationData.validationResults[columnIndex] = "cancel"
            }
        }
    }
    resetRowValidationResults(validationData) {
        if (validationData) {
            validationData.validationResults && delete validationData.validationResults;
            delete validationData.validated
        }
    }
    isInvalidCell(_ref7) {
        let {
            rowKey: rowKey,
            columnIndex: columnIndex
        } = _ref7;
        const result = this.getCellValidationResult({
            rowKey: rowKey,
            columnIndex: columnIndex
        });
        return validationResultIsValid(result) && result.status === VALIDATION_STATUS.invalid
    }
    getCellValidator(_ref8) {
        let {
            rowKey: rowKey,
            columnIndex: columnIndex
        } = _ref8;
        const validationData = this._getValidationData(rowKey);
        const groupConfig = validationData && _validation_engine.default.getGroupConfig(validationData);
        const validators = groupConfig && groupConfig.validators;
        return validators && validators.filter((v => {
            const {
                column: column
            } = v.option("dataGetter")();
            return column ? column.index === columnIndex : false
        }))[0]
    }
    setCellValidationStatus(cellOptions) {
        const validationResult = this.getCellValidationResult({
            rowKey: cellOptions.key,
            columnIndex: cellOptions.column.index
        });
        if ((0, _type.isDefined)(validationResult)) {
            cellOptions.validationStatus = "cancel" !== validationResult ? validationResult.status : "cancel"
        } else {
            delete cellOptions.validationStatus
        }
    }
}
exports.ValidatingController = ValidatingController;
const validatingEditingExtender = Base => class extends Base {
    processDataItemTreeListHack(item) {
        super.processDataItem.apply(this, arguments)
    }
    processItemsTreeListHack(items, e) {
        return super.processItems.apply(this, arguments)
    }
    _addChange(changeParams) {
        const change = super._addChange.apply(this, arguments);
        if (change && "remove" !== changeParams.type) {
            this._validatingController.updateValidationState(change)
        }
        return change
    }
    _handleChangesChange(args) {
        super._handleChangesChange.apply(this, arguments);
        args.value.forEach((change => {
            if (void 0 === this._validatingController._getValidationData(change.key)) {
                this._validatingController.updateValidationState(change)
            }
        }))
    }
    _updateRowAndPageIndices() {
        const that = this;
        const startInsertIndex = that.getView("rowsView").getTopVisibleItemIndex();
        let rowIndex = startInsertIndex;
        (0, _iterator.each)(that.getChanges(), ((_, _ref9) => {
            let {
                key: key,
                type: type
            } = _ref9;
            const validationData = this._validatingController._getValidationData(key);
            if (validationData && !validationData.isValid && validationData.pageIndex !== that._pageIndex) {
                validationData.pageIndex = that._pageIndex;
                if ("insert" === type) {
                    validationData.rowIndex = startInsertIndex
                } else {
                    validationData.rowIndex = rowIndex
                }
                rowIndex++
            }
        }))
    }
    _getValidationGroupsInForm(detailOptions) {
        const validationData = this._validatingController._getValidationData(detailOptions.key, true);
        return {
            validationGroup: validationData
        }
    }
    _validateEditFormAfterUpdate(row, isCustomSetCellValue) {
        if (isCustomSetCellValue && this._editForm) {
            this._editForm.validate()
        }
        super._validateEditFormAfterUpdate.apply(this, arguments)
    }
    _prepareEditCell(params) {
        const isNotCanceled = super._prepareEditCell.apply(this, arguments);
        if (isNotCanceled && params.column.showEditorAlways) {
            this._validatingController.updateValidationState({
                key: params.key
            })
        }
        return isNotCanceled
    }
    processItems(items, changeType) {
        const changes = this.getChanges();
        const getIndexByChange = (change, items) => {
            let index = -1;
            const isInsert = "insert" === change.type;
            const {
                key: key
            } = change;
            (0, _iterator.each)(items, ((i, item) => {
                if ((0, _common.equalByValue)(key, isInsert ? item.key : this._dataController.keyOf(item))) {
                    index = i;
                    return false
                }
                return
            }));
            return index
        };
        items = super.processItems(items, changeType);
        const itemsCount = items.length;
        if (this.getEditMode() === EDIT_MODE_BATCH && "prepend" !== changeType && "append" !== changeType) {
            changes.forEach((change => {
                const {
                    key: key
                } = change;
                const validationData = this._validatingController._getValidationData(key);
                if (validationData && change.type && validationData.pageIndex === this._pageIndex && (null === change || void 0 === change ? void 0 : change.pageIndex) !== this._pageIndex) {
                    ! function(change, validationData) {
                        const data = {
                            key: change.key
                        };
                        const index = getIndexByChange(change, items);
                        if (index >= 0) {
                            return
                        }
                        validationData.rowIndex = validationData.rowIndex > itemsCount ? validationData.rowIndex % itemsCount : validationData.rowIndex;
                        const {
                            rowIndex: rowIndex
                        } = validationData;
                        data[INSERT_INDEX] = 1;
                        items.splice(rowIndex, 0, data)
                    }(change, validationData)
                }
            }))
        }
        return items
    }
    processDataItem(item) {
        const isInserted = item.data[INSERT_INDEX];
        const key = isInserted ? item.data.key : item.key;
        const editMode = this.getEditMode();
        if (editMode === EDIT_MODE_BATCH && isInserted && key) {
            const changes = this.getChanges();
            const editIndex = _m_utils.default.getIndexByKey(key, changes);
            if (editIndex >= 0) {
                const change = changes[editIndex];
                if ("insert" !== change.type) {
                    const oldData = this._getOldData(change.key);
                    item.data = (0, _extend.extend)(true, {}, oldData, change.data);
                    item.key = key
                }
            }
        }
        super.processDataItem.apply(this, arguments)
    }
    _createInvisibleColumnValidators(changes) {
        const that = this;
        const columns = this._columnsController.getColumns();
        const invisibleColumns = this._columnsController.getInvisibleColumns().filter((column => !column.isBand));
        const groupColumns = this._columnsController.getGroupColumns().filter((column => !column.showWhenGrouped && -1 === invisibleColumns.indexOf(column)));
        const invisibleColumnValidators = [];
        const isCellVisible = (column, rowKey) => this._dataController.getRowIndexByKey(rowKey) >= 0 && invisibleColumns.indexOf(column) < 0;
        invisibleColumns.push(...groupColumns);
        if (!FORM_BASED_MODES.includes(this.getEditMode())) {
            (0, _iterator.each)(columns, ((_, column) => {
                changes.forEach((change => {
                    let data;
                    if (isCellVisible(column, change.key)) {
                        return
                    }
                    if ("insert" === change.type) {
                        data = change.data
                    } else if ("update" === change.type) {
                        const oldData = that._getOldData(change.key);
                        if (!(0, _type.isDefined)(oldData)) {
                            return
                        }
                        data = (0, _array_utils.createObjectWithChanges)(oldData, change.data)
                    }
                    if (data) {
                        const validator = this._validatingController.createValidator({
                            column: column,
                            key: change.key,
                            value: column.calculateCellValue(data)
                        });
                        if (validator) {
                            invisibleColumnValidators.push(validator)
                        }
                    }
                }))
            }))
        }
        return function() {
            invisibleColumnValidators.forEach((validator => {
                validator.dispose()
            }))
        }
    }
    _beforeSaveEditData(change, editIndex) {
        let result = super._beforeSaveEditData.apply(this, arguments);
        const validationData = this._validatingController._getValidationData(null === change || void 0 === change ? void 0 : change.key);
        if (change) {
            const isValid = "remove" === change.type || validationData.isValid;
            result = result || !isValid
        } else {
            const disposeValidators = this._createInvisibleColumnValidators(this.getChanges());
            result = new _deferred.Deferred;
            this.executeOperation(result, (() => {
                this._validatingController.validate(true).done((isFullValid => {
                    disposeValidators();
                    this._updateRowAndPageIndices();
                    switch (this.getEditMode()) {
                        case EDIT_MODE_CELL:
                            if (!isFullValid) {
                                this._focusEditingCell()
                            }
                            break;
                        case EDIT_MODE_BATCH:
                            if (!isFullValid) {
                                this._resetEditRowKey();
                                this._resetEditColumnName();
                                this._dataController.updateItems()
                            }
                    }
                    result.resolve(!isFullValid)
                }))
            }))
        }
        return result.promise ? result.promise() : result
    }
    _beforeEditCell(rowIndex, columnIndex, item) {
        const result = super._beforeEditCell(rowIndex, columnIndex, item);
        if (this.getEditMode() === EDIT_MODE_CELL) {
            const $cell = this._rowsView._getCellElement(rowIndex, columnIndex);
            const validator = $cell && $cell.data("dxValidator");
            const rowOptions = $cell && $cell.closest(".dx-row").data("options");
            const value = validator && validator.option("adapter").getValue();
            if (validator && cellValueShouldBeValidated(value, rowOptions)) {
                const deferred = new _deferred.Deferred;
                (0, _deferred.when)(this._validatingController.validateCell(validator), result).done(((validationResult, result) => {
                    deferred.resolve(validationResult.status === VALIDATION_STATUS.valid && result)
                }));
                return deferred.promise()
            }
            if (!validator) {
                return result
            }
        }
        return false
    }
    _afterSaveEditData(cancel) {
        let $firstErrorRow;
        const isCellEditMode = this.getEditMode() === EDIT_MODE_CELL;
        (0, _iterator.each)(this.getChanges(), ((_, change) => {
            const $errorRow = this._showErrorRow(change);
            $firstErrorRow = $firstErrorRow || $errorRow
        }));
        if ($firstErrorRow) {
            const scrollable = this._rowsView.getScrollable();
            if (scrollable) {
                scrollable.update();
                scrollable.scrollToElement($firstErrorRow)
            }
        }
        if (cancel && isCellEditMode && this._needUpdateRow()) {
            const editRowIndex = this.getEditRowIndex();
            this._dataController.updateItems({
                changeType: "update",
                rowIndices: [editRowIndex]
            });
            this._focusEditingCell()
        } else if (!cancel) {
            let shouldResetValidationState = true;
            if (isCellEditMode) {
                const columns = this._columnsController.getColumns();
                const columnsWithValidatingEditors = columns.filter((col => {
                    var _col$validationRules;
                    return col.showEditorAlways && (null === (_col$validationRules = col.validationRules) || void 0 === _col$validationRules ? void 0 : _col$validationRules.length) > 0
                })).length > 0;
                shouldResetValidationState = !columnsWithValidatingEditors
            }
            if (shouldResetValidationState) {
                this._validatingController.initValidationState()
            }
        }
    }
    _handleDataChanged(args) {
        const validationState = this._validatingController._validationState;
        if ("standard" === this.option("scrolling.mode")) {
            this.resetRowAndPageIndices()
        }
        if ("prepend" === args.changeType) {
            (0, _iterator.each)(validationState, ((_, validationData) => {
                validationData.rowIndex += args.items.length
            }))
        }
        super._handleDataChanged(args)
    }
    resetRowAndPageIndices() {
        const validationState = this._validatingController._validationState;
        (0, _iterator.each)(validationState, ((_, validationData) => {
            if (validationData.pageIndex !== this._pageIndex) {
                delete validationData.pageIndex;
                delete validationData.rowIndex
            }
        }))
    }
    _beforeCancelEditData() {
        this._validatingController.initValidationState();
        super._beforeCancelEditData()
    }
    _showErrorRow(change) {
        let $popupContent;
        const items = this._dataController.items();
        const rowIndex = this.getIndexByKey(change.key, items);
        const validationData = this._validatingController._getValidationData(change.key);
        if (!(null !== validationData && void 0 !== validationData && validationData.isValid) && null !== validationData && void 0 !== validationData && validationData.errorText && rowIndex >= 0) {
            $popupContent = this.getPopupContent();
            return this._errorHandlingController && this._errorHandlingController.renderErrorRow(null === validationData || void 0 === validationData ? void 0 : validationData.errorText, rowIndex, $popupContent)
        }
    }
    updateFieldValue(e) {
        const deferred = new _deferred.Deferred;
        this._validatingController.removeCellValidationResult({
            change: this.getChangeByKey(e.key),
            columnIndex: e.column.index
        });
        super.updateFieldValue.apply(this, arguments).done((() => {
            const currentValidator = this._validatingController.getCellValidator({
                rowKey: e.key,
                columnIndex: e.column.index
            });
            (0, _deferred.when)(currentValidator && this._validatingController.validateCell(currentValidator)).done((validationResult => {
                this._editorFactoryController.refocus();
                deferred.resolve(validationResult)
            }))
        }));
        return deferred.promise()
    }
    highlightDataCell($cell, parameters) {
        super.highlightDataCell.apply(this, arguments);
        this._validatingController.setCellValidationStatus(parameters);
        const isEditableCell = !!parameters.setValue;
        const cellModified = this.isCellModified(parameters);
        const isValidated = (0, _type.isDefined)(parameters.validationStatus);
        const needValidation = cellModified && parameters.column.setCellValue || isEditableCell && !cellModified && !(parameters.row.isNewRow || !isValidated);
        if (needValidation) {
            const validator = $cell.data("dxValidator");
            if (validator) {
                (0, _deferred.when)(this._validatingController.validateCell(validator)).done((() => {
                    this._validatingController.setCellValidationStatus(parameters)
                }))
            }
        }
    }
    getChangeByKey(key) {
        const changes = this.getChanges();
        return changes[_m_utils.default.getIndexByKey(key, changes)]
    }
    isCellModified(parameters) {
        const cellModified = super.isCellModified(parameters);
        const change = this.getChangeByKey(parameters.key);
        const isCellInvalid = !!parameters.row && this._validatingController.isInvalidCell({
            rowKey: parameters.key,
            columnIndex: parameters.column.index
        });
        return cellModified || this._validatingController._rowIsValidated(change) && isCellInvalid
    }
};
exports.validatingEditingExtender = validatingEditingExtender;
const getWidthOfVisibleCells = function(that, element) {
    const rowIndex = (0, _renderer.default)(element).closest("tr").index();
    const $cellElements = (0, _renderer.default)(that._rowsView.getRowElement(rowIndex)).first().children().filter(":not(.dx-hidden-cell)");
    return that._rowsView._getWidths($cellElements).reduce(((w1, w2) => w1 + w2), 0)
};
const getBoundaryNonFixedColumnsInfo = function(fixedColumns) {
    let firstNonFixedColumnIndex;
    let lastNonFixedColumnIndex;
    fixedColumns.some(((column, index) => {
        if ("transparent" === column.command) {
            firstNonFixedColumnIndex = 0 === index ? -1 : index;
            lastNonFixedColumnIndex = index === fixedColumns.length - 1 ? -1 : index + column.colspan - 1;
            return true
        }
        return
    }));
    return {
        startColumnIndex: firstNonFixedColumnIndex,
        endColumnIndex: lastNonFixedColumnIndex
    }
};
const validatingEditorFactoryExtender = Base => class extends Base {
    _showRevertButton($container) {
        var _this$_revertTooltip, _$tooltipElement2;
        let $tooltipElement = null === (_this$_revertTooltip = this._revertTooltip) || void 0 === _this$_revertTooltip ? void 0 : _this$_revertTooltip.$element();
        if (!$container || !$container.length) {
            var _$tooltipElement;
            null === (_$tooltipElement = $tooltipElement) || void 0 === _$tooltipElement || _$tooltipElement.remove();
            this._revertTooltip = void 0;
            return
        }
        if ($container.find($tooltipElement).length) {
            return
        }
        const $overlayContainer = $container.closest(`.${this.addWidgetPrefix("content")}`).parent();
        const revertTooltipClass = this.addWidgetPrefix("revert-tooltip");
        null === (_$tooltipElement2 = $tooltipElement) || void 0 === _$tooltipElement2 || _$tooltipElement2.remove();
        $tooltipElement = (0, _renderer.default)("<div>").addClass(revertTooltipClass).appendTo($container);
        const tooltipOptions = {
            animation: null,
            visible: true,
            width: "auto",
            height: "auto",
            shading: false,
            container: $overlayContainer,
            propagateOutsideClick: true,
            hideOnOutsideClick: false,
            wrapperAttr: {
                class: revertTooltipClass
            },
            contentTemplate: () => {
                const $buttonElement = (0, _renderer.default)("<div>").addClass("dx-revert-button");
                const buttonOptions = {
                    icon: "revert",
                    hint: this.option("editing.texts.validationCancelChanges"),
                    elementAttr: {
                        id: "dxRevertButton",
                        "aria-label": _message.default.format("dxDataGrid-ariaRevertButton")
                    },
                    onClick: () => {
                        this._editingController.cancelEditData()
                    }
                };
                return new _button.default($buttonElement, buttonOptions).$element()
            },
            position: {
                my: "left top",
                at: "right top",
                offset: "1 0",
                collision: "flip",
                boundaryOffset: "0 0",
                boundary: this._rowsView.element(),
                of: $container
            },
            onPositioned: this._positionedHandler.bind(this)
        };
        this._revertTooltip = new _ui.default($tooltipElement, tooltipOptions)
    }
    _hideFixedGroupCell($cell, overlayOptions) {
        let $nextFixedRowElement;
        let $groupCellElement;
        const isFixedColumns = this._rowsView.isFixedColumns();
        const isFormOrPopupEditMode = this._editingController.isFormOrPopupEditMode();
        if (isFixedColumns && !isFormOrPopupEditMode) {
            const nextRowOptions = $cell.closest(".dx-row").next().data("options");
            if (nextRowOptions && "group" === nextRowOptions.rowType) {
                $nextFixedRowElement = (0, _renderer.default)(this._rowsView.getRowElement(nextRowOptions.rowIndex)).last();
                $groupCellElement = $nextFixedRowElement.find(".dx-group-cell");
                if ($groupCellElement.length && "hidden" !== $groupCellElement.get(0).style.visibility) {
                    $groupCellElement.css("visibility", "hidden");
                    overlayOptions.onDisposing = function() {
                        $groupCellElement.css("visibility", "")
                    }
                }
            }
        }
    }
    _positionedHandler(e, isOverlayVisible) {
        if (!e.component.__skipPositionProcessing) {
            const isRevertButton = (0, _renderer.default)(e.element).hasClass(this.addWidgetPrefix("revert-tooltip"));
            const needRepaint = !isRevertButton && this._rowsView.updateFreeSpaceRowHeight();
            const normalizedPosition = this._normalizeValidationMessagePositionAndMaxWidth(e, isRevertButton, isOverlayVisible);
            e.component.__skipPositionProcessing = !!(needRepaint || normalizedPosition);
            if (normalizedPosition) {
                e.component.option(normalizedPosition)
            } else if (needRepaint) {
                e.component.repaint()
            }
        }
    }
    _showValidationMessage($cell, messages, alignment) {
        var _this$_columnsControl2;
        const editorPopup = $cell.find(".dx-dropdowneditor-overlay").data("dxPopup");
        const isOverlayVisible = editorPopup && editorPopup.option("visible");
        const myPosition = isOverlayVisible ? "top right" : `top ${alignment}`;
        const atPosition = isOverlayVisible ? "top left" : `bottom ${alignment}`;
        const hasFixedColumns = (null === (_this$_columnsControl2 = this._columnsController.getFixedColumns()) || void 0 === _this$_columnsControl2 ? void 0 : _this$_columnsControl2.length) > 0;
        const $overlayContainer = hasFixedColumns ? this.getView("rowsView").element() : $cell.closest(`.${this.addWidgetPrefix("content")}`);
        let errorMessageText = "";
        messages && messages.forEach((message => {
            errorMessageText += (errorMessageText.length ? "<br/>" : "") + (0, _string.encodeHtml)(message)
        }));
        const invalidMessageClass = this.addWidgetPrefix("invalid-message");
        this._rowsView.element().find(`.${invalidMessageClass}`).remove();
        const $overlayElement = (0, _renderer.default)("<div>").addClass("dx-invalid-message").addClass("dx-invalid-message-always").addClass(invalidMessageClass).html(errorMessageText).appendTo($cell);
        const overlayOptions = {
            container: $overlayContainer,
            shading: false,
            width: "auto",
            height: "auto",
            visible: true,
            animation: false,
            propagateOutsideClick: true,
            hideOnOutsideClick: false,
            wrapperAttr: {
                id: "dxInvalidMessage",
                class: `dx-invalid-message dx-invalid-message-always ${invalidMessageClass}`
            },
            position: {
                collision: "flip",
                boundary: this._rowsView.element(),
                boundaryOffset: "0 0",
                offset: {
                    x: 0,
                    y: !isOverlayVisible && _browser.default.mozilla ? -1 : 0
                },
                my: myPosition,
                at: atPosition,
                of: $cell
            },
            onPositioned: e => {
                this._positionedHandler(e, isOverlayVisible);
                this._shiftValidationMessageIfNeed(e.component.$content(), $cell)
            }
        };
        this._hideFixedGroupCell($cell, overlayOptions);
        new _ui.default($overlayElement, overlayOptions)
    }
    _hideValidationMessage() {
        var _this$_rowsView$eleme;
        const validationMessages = null === (_this$_rowsView$eleme = this._rowsView.element()) || void 0 === _this$_rowsView$eleme ? void 0 : _this$_rowsView$eleme.find(this._getValidationMessagesSelector());
        null === validationMessages || void 0 === validationMessages || validationMessages.remove()
    }
    _normalizeValidationMessagePositionAndMaxWidth(options, isRevertButton, isOverlayVisible) {
        const fixedColumns = this._columnsController.getFixedColumns();
        if (!fixedColumns || !fixedColumns.length) {
            return
        }
        let position;
        const visibleTableWidth = !isRevertButton && getWidthOfVisibleCells(this, options.element);
        const $overlayContentElement = options.component.$content();
        const validationMessageWidth = (0, _size.getOuterWidth)($overlayContentElement, true);
        const needMaxWidth = !isRevertButton && validationMessageWidth > visibleTableWidth;
        const columnIndex = this._rowsView.getCellIndex((0, _renderer.default)(options.element).closest("td"));
        const boundaryNonFixedColumnsInfo = getBoundaryNonFixedColumnsInfo(fixedColumns);
        if (!isRevertButton && (columnIndex === boundaryNonFixedColumnsInfo.startColumnIndex || needMaxWidth)) {
            position = {
                collision: "none flip",
                my: "top left",
                at: isOverlayVisible ? "top right" : "bottom left"
            }
        } else if (columnIndex === boundaryNonFixedColumnsInfo.endColumnIndex) {
            position = {
                collision: "none flip",
                my: "top right",
                at: isRevertButton || isOverlayVisible ? "top left" : "bottom right"
            };
            if (isRevertButton) {
                position.offset = "-1 0"
            }
        }
        return position && {
            position: position,
            maxWidth: needMaxWidth ? visibleTableWidth - 2 : void 0
        }
    }
    _shiftValidationMessageIfNeed($content, $cell) {
        const $revertContent = this._revertTooltip && this._revertTooltip.$content();
        if (!$revertContent) {
            return
        }
        const contentOffset = $content.offset();
        const revertContentOffset = $revertContent.offset();
        if (contentOffset.top === revertContentOffset.top && contentOffset.left + (0, _size.getWidth)($content) > revertContentOffset.left) {
            const left = (0, _size.getWidth)($revertContent) + 2;
            $content.css("left", revertContentOffset.left < $cell.offset().left ? -left : left)
        }
    }
    _getRevertTooltipsSelector() {
        const revertTooltipClass = this.addWidgetPrefix("revert-tooltip");
        return `.dx-editor-cell .${revertTooltipClass}`
    }
    _getValidationMessagesSelector() {
        const invalidMessageClass = this.addWidgetPrefix("invalid-message");
        return `.dx-editor-cell .${invalidMessageClass}, .dx-cell-modified .${invalidMessageClass}`
    }
    loseFocus(skipValidator) {
        if (!skipValidator) {
            this._validatingController.setValidator(null)
        }
        super.loseFocus()
    }
    updateCellState($element, validationResult, isHideBorder) {
        var _change$data;
        const $focus = null === $element || void 0 === $element ? void 0 : $element.closest(this._getFocusCellSelector());
        const $cell = null !== $focus && void 0 !== $focus && $focus.is("td") ? $focus : null;
        const rowOptions = null === $focus || void 0 === $focus ? void 0 : $focus.closest(".dx-row").data("options");
        const change = rowOptions ? this._editingController.getChangeByKey(rowOptions.key) : null;
        const column = $cell && this._columnsController.getVisibleColumns()[$cell.index()];
        const isCellModified = void 0 !== (null === change || void 0 === change || null === (_change$data = change.data) || void 0 === _change$data ? void 0 : _change$data[null === column || void 0 === column ? void 0 : column.name]) && !this._editingController.isSaving();
        const validationDescriptionValues = [];
        if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
            if ((null === validationResult || void 0 === validationResult ? void 0 : validationResult.status) === VALIDATION_STATUS.invalid || isCellModified) {
                this._showRevertButton($focus);
                validationDescriptionValues.push("dxRevertButton")
            } else {
                this._revertTooltip && this._revertTooltip.$element().remove()
            }
        }
        const showValidationMessage = validationResult && validationResult.status === VALIDATION_STATUS.invalid;
        if (showValidationMessage && $cell && column && validationResult && validationResult.brokenRules) {
            const errorMessages = [];
            validationResult.brokenRules.forEach((rule => {
                if (rule.message) {
                    errorMessages.push(rule.message)
                }
            }));
            if (errorMessages.length) {
                this._showValidationMessage($focus, errorMessages, column.alignment || "left");
                validationDescriptionValues.push("dxInvalidMessage")
            }
        }
        this._updateAriaValidationAttributes($focus, validationDescriptionValues);
        !isHideBorder && this._rowsView.element() && this._rowsView.updateFreeSpaceRowHeight()
    }
    _updateAriaValidationAttributes($focus, inputDescriptionValues) {
        if (0 === inputDescriptionValues.length) {
            return
        }
        const editMode = this._editingController.getEditMode();
        const shouldSetValidationAriaAttributes = [EDIT_MODE_CELL, EDIT_MODE_BATCH, EDIT_MODE_ROW].includes(editMode);
        if (shouldSetValidationAriaAttributes) {
            const $focusElement = this._getCurrentFocusElement($focus);
            $focusElement.attr("aria-labelledby", inputDescriptionValues.join(" "));
            $focusElement.attr("aria-invalid", true)
        }
    }
    _getCurrentFocusElement($focus) {
        if (this._editingController.isEditing()) {
            return $focus.find(_const.EDITORS_INPUT_SELECTOR).first()
        }
        return $focus
    }
    focus($element, isHideBorder) {
        if (!arguments.length) {
            return super.focus()
        }
        this._hideValidationMessage();
        if (null !== $element && void 0 !== $element && $element.hasClass("dx-row") || null !== $element && void 0 !== $element && $element.hasClass("dx-master-detail-cell")) {
            return super.focus($element, isHideBorder)
        }
        const $focus = null === $element || void 0 === $element ? void 0 : $element.closest(this._getFocusCellSelector());
        const validator = $focus && ($focus.data("dxValidator") || $element.find(`.${this.addWidgetPrefix("validator")}`).eq(0).data("dxValidator"));
        const rowOptions = $focus && $focus.closest(".dx-row").data("options");
        const change = rowOptions ? this._editingController.getChangeByKey(rowOptions.key) : null;
        let validationResult;
        if (validator) {
            this._validatingController.setValidator(validator);
            const value = validator.option("adapter").getValue();
            if (cellValueShouldBeValidated(value, rowOptions) || this._validatingController._rowIsValidated(change)) {
                this._editingController.waitForDeferredOperations().done((() => {
                    const isDetached = !this._rowsView.isElementInside($element);
                    if (isDetached) {
                        return
                    }(0, _deferred.when)(this._validatingController.validateCell(validator)).done((result => {
                        validationResult = result;
                        const {
                            column: column
                        } = validationResult.validator.option("dataGetter")();
                        if (change && column && !this._validatingController.isCurrentValidatorProcessing({
                                rowKey: change.key,
                                columnIndex: column.index
                            })) {
                            return
                        }
                        if (!(0, _themes.isFluent)((0, _themes.current)()) && validationResult.status === VALIDATION_STATUS.invalid) {
                            isHideBorder = true
                        }
                        this.updateCellState($element, validationResult, isHideBorder);
                        super.focus.call(this, $element, isHideBorder)
                    }))
                }));
                return super.focus($element, isHideBorder)
            }
        }
        this.updateCellState($element, validationResult, isHideBorder);
        return super.focus($element, isHideBorder)
    }
    getEditorInstance($container) {
        const $editor = $container.find(".dx-texteditor").eq(0);
        return _m_utils.default.getWidgetInstance($editor)
    }
};
exports.validatingEditorFactoryExtender = validatingEditorFactoryExtender;
const validatingDataControllerExtender = Base => class extends Base {
    _getValidationStatus(validationResult) {
        const validationStatus = validationResultIsValid(validationResult) ? validationResult.status : validationResult;
        return validationStatus || VALIDATION_STATUS.valid
    }
    _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
        var _oldRow$cells, _cell$column$validati;
        const cell = null === (_oldRow$cells = oldRow.cells) || void 0 === _oldRow$cells ? void 0 : _oldRow$cells[columnIndex];
        const oldValidationStatus = this._getValidationStatus({
            status: null === cell || void 0 === cell ? void 0 : cell.validationStatus
        });
        const validationResult = this._validatingController.getCellValidationResult({
            rowKey: oldRow.key,
            columnIndex: columnIndex
        });
        const validationData = this._validatingController._getValidationData(oldRow.key);
        const newValidationStatus = this._getValidationStatus(validationResult);
        const rowIsModified = JSON.stringify(newRow.modifiedValues) !== JSON.stringify(oldRow.modifiedValues);
        const validationStatusChanged = oldValidationStatus !== newValidationStatus && rowIsModified;
        const cellIsMarkedAsInvalid = (0, _renderer.default)(null === cell || void 0 === cell ? void 0 : cell.cellElement).hasClass(this.addWidgetPrefix("invalid"));
        const hasValidationRules = null === cell || void 0 === cell || null === (_cell$column$validati = cell.column.validationRules) || void 0 === _cell$column$validati ? void 0 : _cell$column$validati.length;
        const rowEditStateChanged = oldRow.isEditing !== newRow.isEditing && hasValidationRules;
        const cellValidationStateChanged = validationStatusChanged || validationData.isValid && cellIsMarkedAsInvalid;
        if (rowEditStateChanged || cellValidationStateChanged) {
            return true
        }
        return super._isCellChanged.apply(this, arguments)
    }
};
exports.validatingDataControllerExtender = validatingDataControllerExtender;
const validatingRowsViewExtender = Base => class extends Base {
    updateFreeSpaceRowHeight($table) {
        const that = this;
        let $rowElements;
        let $freeSpaceRowElement;
        let $freeSpaceRowElements;
        const $element = that.element();
        const $tooltipContent = $element && $element.find(`.${that.addWidgetPrefix("invalid-message")} .dx-overlay-content`);
        super.updateFreeSpaceRowHeight($table);
        if ($tooltipContent && $tooltipContent.length) {
            $rowElements = that._getRowElements();
            $freeSpaceRowElements = that._getFreeSpaceRowElements($table);
            $freeSpaceRowElement = $freeSpaceRowElements.first();
            if ($freeSpaceRowElement && 1 === $rowElements.length && (!$freeSpaceRowElement.is(":visible") || (0, _size.getOuterHeight)($tooltipContent) > (0, _size.getOuterHeight)($freeSpaceRowElement))) {
                $freeSpaceRowElements.show();
                (0, _size.setHeight)($freeSpaceRowElements, (0, _size.getOuterHeight)($tooltipContent));
                return true
            }
        }
        return
    }
    _formItemPrepared(cellOptions, $container) {
        super._formItemPrepared.apply(this, arguments);
        (0, _common.deferUpdate)((() => {
            const $editor = $container.find(".dx-widget").first();
            const isEditorDisposed = $editor.length && !$editor.children().length;
            if (!isEditorDisposed) {
                this._validatingController.createValidator(cellOptions, $editor)
            }
        }))
    }
    _cellPrepared($cell, parameters) {
        if (!this._editingController.isFormOrPopupEditMode()) {
            this._validatingController.createValidator(parameters, $cell)
        }
        super._cellPrepared.apply(this, arguments)
    }
    _restoreErrorRow(contentTable) {
        this._editingController && this._editingController.hasChanges() && this._getRowElements(contentTable).each(((_, item) => {
            const rowOptions = (0, _renderer.default)(item).data("options");
            if (rowOptions) {
                const change = this._editingController.getChangeByKey(rowOptions.key);
                change && this._editingController._showErrorRow(change)
            }
        }))
    }
};
exports.validatingRowsViewExtender = validatingRowsViewExtender;
const validatingModule = exports.validatingModule = {
    defaultOptions: () => ({
        editing: {
            texts: {
                validationCancelChanges: _message.default.format("dxDataGrid-validationCancelChanges")
            }
        }
    }),
    controllers: {
        validating: ValidatingController
    },
    extenders: {
        controllers: {
            editing: validatingEditingExtender,
            editorFactory: validatingEditorFactoryExtender,
            data: validatingDataControllerExtender
        },
        views: {
            rowsView: validatingRowsViewExtender
        }
    }
};
