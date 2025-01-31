/**
 * DevExtreme (esm/__internal/ui/color_box/m_color_box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Color from "../../../color";
import registerComponent from "../../../core/component_registrator";
import $ from "../../../core/renderer";
import {
    extend
} from "../../../core/utils/extend";
import DropDownEditor from "../../../ui/drop_down_editor/ui.drop_down_editor";
import ColorView from "./m_color_view";
const COLOR_BOX_CLASS = "dx-colorbox";
const COLOR_BOX_INPUT_CLASS = "dx-colorbox-input";
const COLOR_BOX_INPUT_CONTAINER_CLASS = "dx-colorbox-input-container";
const COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS = "dx-colorbox-color-result-preview";
const COLOR_BOX_COLOR_IS_NOT_DEFINED = "dx-colorbox-color-is-not-defined";
const COLOR_BOX_OVERLAY_CLASS = "dx-colorbox-overlay";
const COLOR_BOX_CONTAINER_CELL_CLASS = "dx-colorview-container-cell";
const COLOR_BOX_BUTTON_CELL_CLASS = "dx-colorview-button-cell";
const COLOR_BOX_BUTTONS_CONTAINER_CLASS = "dx-colorview-buttons-container";
const COLOR_BOX_APPLY_BUTTON_CLASS = "dx-colorview-apply-button";
const COLOR_BOX_CANCEL_BUTTON_CLASS = "dx-colorview-cancel-button";
const colorEditorPrototype = ColorView.prototype;
const colorUtils = {
    makeTransparentBackground: colorEditorPrototype._makeTransparentBackground.bind(colorEditorPrototype),
    makeRgba: colorEditorPrototype._makeRgba.bind(colorEditorPrototype)
};
const ColorBox = DropDownEditor.inherit({
    _supportedKeys() {
        const arrowHandler = function(e) {
            e.stopPropagation();
            if (this.option("opened")) {
                e.preventDefault();
                return true
            }
        };
        return extend(this.callBase(), {
            enter: this._enterKeyHandler,
            leftArrow: arrowHandler,
            rightArrow: arrowHandler,
            upArrow: function(e) {
                if (!this.option("opened")) {
                    e.preventDefault();
                    return false
                }
                if (e.altKey) {
                    this.close();
                    return false
                }
                return true
            },
            downArrow: function(e) {
                if (!this.option("opened") && !e.altKey) {
                    e.preventDefault();
                    return false
                }
                if (!this.option("opened") && e.altKey) {
                    this._validatedOpening();
                    return false
                }
                return true
            }
        })
    },
    _getDefaultOptions() {
        return extend(this.callBase(), {
            editAlphaChannel: false,
            applyValueMode: "useButtons",
            keyStep: 1,
            fieldTemplate: null,
            buttonsLocation: "bottom after"
        })
    },
    _popupHidingHandler() {
        this.callBase();
        if ("useButtons" === this.option("applyValueMode")) {
            this._updateColorViewValue(this.option("value"))
        }
    },
    _popupConfig() {
        return extend(this.callBase(), {
            width: ""
        })
    },
    _contentReadyHandler() {
        this._createColorView();
        this._addPopupBottomClasses()
    },
    _addPopupBottomClasses() {
        const $popupBottom = this._popup.bottomToolbar();
        if ($popupBottom) {
            $popupBottom.addClass("dx-colorview-container-cell").addClass("dx-colorview-button-cell").find(".dx-toolbar-items-container").addClass("dx-colorview-buttons-container");
            $popupBottom.find(".dx-popup-done").addClass("dx-colorview-apply-button");
            $popupBottom.find(".dx-popup-cancel").addClass("dx-colorview-cancel-button")
        }
    },
    _createColorView() {
        this._popup.$overlayContent().addClass("dx-colorbox-overlay");
        const $colorView = $("<div>").appendTo(this._popup.$content());
        this._colorView = this._createComponent($colorView, ColorView, this._colorViewConfig())
    },
    _applyNewColor(value) {
        this.option("value", value);
        if (value) {
            colorUtils.makeTransparentBackground(this._$colorResultPreview, value)
        }
        if (this._colorViewEnterKeyPressed) {
            this.close();
            this._colorViewEnterKeyPressed = false
        }
    },
    _colorViewConfig() {
        const that = this;
        return {
            value: that.option("value"),
            matchValue: that.option("value"),
            editAlphaChannel: that.option("editAlphaChannel"),
            applyValueMode: that.option("applyValueMode"),
            focusStateEnabled: that.option("focusStateEnabled"),
            stylingMode: this.option("stylingMode"),
            target: this._input(),
            onEnterKeyPressed(_ref) {
                let {
                    event: event
                } = _ref;
                that._colorViewEnterKeyPressed = true;
                if (that._colorView.option("value") !== that.option("value")) {
                    that._saveValueChangeEvent(event);
                    that._applyNewColor(that._colorView.option("value"));
                    that.close()
                }
            },
            onValueChanged(_ref2) {
                let {
                    event: event,
                    value: value,
                    previousValue: previousValue
                } = _ref2;
                const instantlyMode = "instantly" === that.option("applyValueMode");
                const isOldValue = colorUtils.makeRgba(value) === previousValue;
                const changesApplied = instantlyMode || that._colorViewEnterKeyPressed;
                const valueCleared = that._shouldSaveEmptyValue;
                if (isOldValue || !changesApplied || valueCleared) {
                    return
                }
                if (event) {
                    that._saveValueChangeEvent(event)
                }
                that._applyNewColor(value)
            }
        }
    },
    _enterKeyHandler(e) {
        const newValue = this._input().val();
        const {
            value: value,
            editAlphaChannel: editAlphaChannel
        } = this.option();
        const oldValue = value && editAlphaChannel ? colorUtils.makeRgba(value) : value;
        if (!newValue) {
            return false
        }
        const color = new Color(newValue);
        if (color.colorIsInvalid) {
            this._input().val(oldValue);
            return
        }
        if (newValue !== oldValue) {
            this._applyColorFromInput(newValue);
            this._saveValueChangeEvent(e);
            this.option("value", this.option("editAlphaChannel") ? colorUtils.makeRgba(newValue) : newValue)
        }
        if (this._colorView) {
            const colorViewValue = this._colorView.option("value");
            if (value !== colorViewValue) {
                this._saveValueChangeEvent(e);
                this.option("value", colorViewValue)
            }
        }
        this.close();
        return false
    },
    _applyButtonHandler(e) {
        this._saveValueChangeEvent(e.event);
        this._applyNewColor(this._colorView.option("value"));
        this.callBase()
    },
    _cancelButtonHandler() {
        this._resetInputValue();
        this.callBase()
    },
    _getKeyboardListeners() {
        return this.callBase().concat([this._colorView])
    },
    _init() {
        this.callBase()
    },
    _initMarkup() {
        this.$element().addClass("dx-colorbox");
        this.callBase()
    },
    _renderInput() {
        this.callBase();
        this._input().addClass("dx-colorbox-input");
        this._renderColorPreview()
    },
    _renderColorPreview() {
        this.$element().wrapInner($("<div>").addClass("dx-colorbox-input-container"));
        this._$colorBoxInputContainer = this.$element().children().eq(0);
        this._$colorResultPreview = $("<div>").addClass("dx-colorbox-color-result-preview").appendTo(this._$textEditorInputContainer);
        if (!this.option("value")) {
            this._$colorBoxInputContainer.addClass(COLOR_BOX_COLOR_IS_NOT_DEFINED)
        } else {
            colorUtils.makeTransparentBackground(this._$colorResultPreview, this.option("value"))
        }
    },
    _renderValue() {
        const {
            value: value,
            editAlphaChannel: editAlphaChannel
        } = this.option();
        const shouldConvertToColor = value && editAlphaChannel;
        const text = shouldConvertToColor ? colorUtils.makeRgba(value) : value;
        this.option("text", text);
        return this.callBase()
    },
    _resetInputValue() {
        const $input = this._input();
        const value = this.option("value");
        $input.val(value);
        this._updateColorViewValue(value)
    },
    _updateColorViewValue(value) {
        if (this._colorView) {
            this._colorView.option({
                value: value,
                matchValue: value
            })
        }
    },
    _valueChangeEventHandler(e) {
        let value = this._input().val();
        if (value) {
            value = this._applyColorFromInput(value);
            this._updateColorViewValue(value)
        }
        this.callBase(e, value)
    },
    _applyColorFromInput(value) {
        const {
            editAlphaChannel: editAlphaChannel
        } = this.option();
        const newColor = new Color(value);
        if (newColor.colorIsInvalid) {
            this._resetInputValue();
            return this.option("value")
        }
        if (editAlphaChannel) {
            return colorUtils.makeRgba(value)
        }
        return value
    },
    _clean() {
        this.callBase();
        delete this._shouldSaveEmptyValue
    },
    _optionChanged(args) {
        const {
            value: value
        } = args;
        const {
            name: name
        } = args;
        switch (name) {
            case "value":
                this._$colorBoxInputContainer.toggleClass(COLOR_BOX_COLOR_IS_NOT_DEFINED, !value);
                if (value) {
                    colorUtils.makeTransparentBackground(this._$colorResultPreview, value)
                } else {
                    this._$colorResultPreview.removeAttr("style")
                }
                if (null === value) {
                    this._shouldSaveEmptyValue = true
                }
                this._updateColorViewValue(value);
                this._shouldSaveEmptyValue = false;
                this.callBase(args);
                break;
            case "applyButtonText":
            case "cancelButtonText":
                this.callBase(args);
                this._popup && this._addPopupBottomClasses();
                break;
            case "editAlphaChannel":
            case "keyStep":
                if (this._colorView) {
                    this._colorView.option(name, value)
                }
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxColorBox", ColorBox);
export default ColorBox;
