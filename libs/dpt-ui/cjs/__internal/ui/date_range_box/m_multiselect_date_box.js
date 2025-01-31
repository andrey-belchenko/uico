/**
 * DevExtreme (cjs/__internal/ui/date_range_box/m_multiselect_date_box.js)
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
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _utils = require("../../../events/utils");
var _date_box = _interopRequireDefault(require("../../../ui/date_box"));
var _m_date_range = require("./m_date_range.utils");
var _m_rangeCalendar = _interopRequireDefault(require("./strategy/m_rangeCalendar"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const START_DATEBOX_CLASS = "dx-start-datebox";
const TypedDateBox = _date_box.default;
class MultiselectDateBox extends TypedDateBox {
    _initStrategy() {
        this._strategy = new _m_rangeCalendar.default(this)
    }
    _initMarkup() {
        super._initMarkup();
        this._renderInputClickEvent()
    }
    _renderInputClickEvent() {
        const clickEventName = (0, _utils.addNamespace)("dxclick", this.NAME);
        _events_engine.default.off(this._input(), clickEventName);
        _events_engine.default.on(this._input(), clickEventName, (e => {
            this._processValueChange(e)
        }))
    }
    _applyButtonHandler(_ref) {
        let {
            event: event
        } = _ref;
        const strategy = this.getStrategy();
        const value = strategy.getValue();
        strategy.getDateRangeBox().updateValue(value, event);
        this.close();
        this.option("focusStateEnabled") && this.focus()
    }
    _openHandler(e) {
        if (this.getStrategy().getDateRangeBox().option("opened")) {
            return
        }
        super._openHandler(e)
    }
    _renderOpenedState() {
        const {
            opened: opened
        } = this.option();
        this._getDateRangeBox().option("opened", opened);
        if (this._isStartDateBox()) {
            if (opened) {
                this._createPopup()
            }
            this._getDateRangeBox()._popupContentIdentifier(this._getControlsAria());
            this._setPopupOption("visible", opened);
            this._getDateRangeBox()._setAriaAttributes()
        }
    }
    _getDateRangeBox() {
        return this.getStrategy().getDateRangeBox()
    }
    _isStartDateBox() {
        return (0, _renderer.default)(this.element()).hasClass("dx-start-datebox")
    }
    _renderPopup() {
        super._renderPopup();
        if (this._isStartDateBox()) {
            this._getDateRangeBox()._bindInnerWidgetOptions(this._popup, "dropDownOptions")
        }
    }
    _popupShownHandler() {
        var _this$_getDateRangeBo;
        super._popupShownHandler();
        null === (_this$_getDateRangeBo = this._getDateRangeBox()._validationMessage) || void 0 === _this$_getDateRangeBo || _this$_getDateRangeBo.option("positionSide", this._getValidationMessagePositionSide())
    }
    _popupHiddenHandler() {
        var _this$_getDateRangeBo2;
        super._popupHiddenHandler();
        null === (_this$_getDateRangeBo2 = this._getDateRangeBox()._validationMessage) || void 0 === _this$_getDateRangeBo2 || _this$_getDateRangeBo2.option("positionSide", this._getValidationMessagePositionSide())
    }
    _focusInHandler(e) {
        super._focusInHandler(e);
        this._processValueChange(e)
    }
    _popupTabHandler(e) {
        const $element = (0, _renderer.default)(e.target);
        if (e.shiftKey && $element.is(this._getFirstPopupElement())) {
            this._getDateRangeBox().getEndDateBox().focus();
            e.preventDefault()
        }
        if (!e.shiftKey && $element.is(this._getLastPopupElement())) {
            this._getDateRangeBox().getStartDateBox().focus();
            e.preventDefault()
        }
    }
    _processValueChange(e) {
        const {
            target: target
        } = e;
        const dateRangeBox = this._getDateRangeBox();
        const [startDateInput, endDateInput] = dateRangeBox.field();
        if ((0, _renderer.default)(target).is((0, _renderer.default)(startDateInput))) {
            dateRangeBox.option("_currentSelection", "startDate")
        }
        if ((0, _renderer.default)(target).is((0, _renderer.default)(endDateInput))) {
            dateRangeBox.option("_currentSelection", "endDate")
        }
        if (!dateRangeBox.getStartDateBox().getStrategy().getWidget()) {
            return
        }
        const calendar = dateRangeBox.getStartDateBox().getStrategy().getWidget();
        const {
            value: value
        } = calendar.option();
        const startDate = (0, _m_date_range.getDeserializedDate)(null === value || void 0 === value ? void 0 : value[0]);
        const endDate = (0, _m_date_range.getDeserializedDate)(null === value || void 0 === value ? void 0 : value[1]);
        if ((0, _renderer.default)(target).is((0, _renderer.default)(startDateInput))) {
            if (startDate) {
                calendar._skipNavigate = true;
                calendar.option("currentDate", startDate)
            }
            this.getStrategy().setActiveStartDateBox();
            calendar.option("_currentSelection", "startDate");
            if (dateRangeBox.option("disableOutOfRangeSelection")) {
                calendar._setViewsMaxOption(endDate)
            }
        }
        if ((0, _renderer.default)(target).is((0, _renderer.default)(endDateInput))) {
            if (endDate) {
                if (startDate && (0, _m_date_range.monthDifference)(startDate, endDate) > 1) {
                    calendar.option("currentDate", calendar._getDateByOffset(null, endDate));
                    calendar.option("currentDate", calendar._getDateByOffset(-1, endDate))
                }
                calendar._skipNavigate = true;
                calendar.option("currentDate", endDate)
            }
            dateRangeBox.getStartDateBox().getStrategy().setActiveEndDateBox();
            calendar.option("_currentSelection", "endDate");
            if (dateRangeBox.option("disableOutOfRangeSelection")) {
                calendar._setViewsMinOption(startDate)
            }
        }
    }
    _invalidate() {
        super._invalidate();
        this._refreshStrategy()
    }
    _updateInternalValidationState(isValid, validationMessage) {
        this.option({
            isValid: isValid,
            validationError: isValid ? null : {
                message: validationMessage
            }
        })
    }
    _recallInternalValidation(value) {
        this._applyInternalValidation(value)
    }
    _isTargetOutOfComponent(target) {
        const $dateRangeBox = (0, _renderer.default)(this._getDateRangeBox().element());
        const isTargetOutOfDateRangeBox = 0 === (0, _renderer.default)(target).closest($dateRangeBox).length;
        return super._isTargetOutOfComponent(target) && isTargetOutOfDateRangeBox
    }
    _updateLabelWidth() {
        const $beforeButtonsContainer = this._getDateRangeBox()._$beforeButtonsContainer;
        const {
            labelMode: labelMode
        } = this.option();
        if ("outside" === labelMode && $beforeButtonsContainer && this._isStartDateBox()) {
            this._label._updateLabelTransform((0, _size.getWidth)($beforeButtonsContainer));
            return
        }
        super._updateLabelWidth()
    }
    _optionChanged(args) {
        switch (args.name) {
            case "isValid": {
                const isValid = this._getDateRangeBox().option("isValid");
                if (this._skipIsValidOptionChange || isValid === args.value) {
                    super._optionChanged(args);
                    return
                }
                this._skipIsValidOptionChange = true;
                this.option({
                    isValid: isValid
                });
                this._skipIsValidOptionChange = false;
                break
            }
            default:
                super._optionChanged(args)
        }
    }
    close() {
        this.getStrategy().getDateRangeBox().getStartDateBox().option("opened", false)
    }
    getStrategy() {
        return this._strategy
    }
}
var _default = exports.default = MultiselectDateBox;
