/**
 * DevExtreme (esm/ui/text_box/text_box.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import {
    getWindow
} from "../../core/utils/window";
const window = getWindow();
import {
    extend
} from "../../core/utils/extend";
import registerComponent from "../../core/component_registrator";
import TextEditor from "./ui.text_editor";
import {
    normalizeKeyName
} from "../../events/utils/index";
import {
    getOuterWidth,
    getWidth
} from "../../core/utils/size";
const ignoreKeys = ["backspace", "tab", "enter", "pageUp", "pageDown", "end", "home", "leftArrow", "rightArrow", "downArrow", "upArrow", "del"];
const TEXTBOX_CLASS = "dx-textbox";
const SEARCHBOX_CLASS = "dx-searchbox";
const ICON_CLASS = "dx-icon";
const SEARCH_ICON_CLASS = "dx-icon-search";
const TextBox = TextEditor.inherit({
    ctor: function(element, options) {
        if (options) {
            this._showClearButton = options.showClearButton
        }
        this.callBase.apply(this, arguments)
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            value: "",
            mode: "text",
            maxLength: null
        })
    },
    _initMarkup: function() {
        this.$element().addClass("dx-textbox");
        this.callBase();
        this.setAria("role", "textbox")
    },
    _renderInputType: function() {
        this.callBase();
        this._renderSearchMode()
    },
    _useTemplates: function() {
        return false
    },
    _renderProps: function() {
        this.callBase();
        this._toggleMaxLengthProp()
    },
    _toggleMaxLengthProp: function() {
        const maxLength = this._getMaxLength();
        if (maxLength && maxLength > 0) {
            this._input().attr("maxLength", maxLength)
        } else {
            this._input().removeAttr("maxLength")
        }
    },
    _renderSearchMode: function() {
        const $element = this._$element;
        if ("search" === this.option("mode")) {
            $element.addClass("dx-searchbox");
            this._renderSearchIcon();
            if (void 0 === this._showClearButton) {
                this._showClearButton = this.option("showClearButton");
                this.option("showClearButton", true)
            }
        } else {
            $element.removeClass("dx-searchbox");
            this._$searchIcon && this._$searchIcon.remove();
            this.option("showClearButton", void 0 === this._showClearButton ? this.option("showClearButton") : this._showClearButton);
            delete this._showClearButton
        }
    },
    _renderSearchIcon: function() {
        const $searchIcon = $("<div>").addClass("dx-icon").addClass("dx-icon-search");
        $searchIcon.prependTo(this._input().parent());
        this._$searchIcon = $searchIcon
    },
    _getLabelContainerWidth: function() {
        if (this._$searchIcon) {
            const $inputContainer = this._input().parent();
            return getWidth($inputContainer) - this._getLabelBeforeWidth()
        }
        return this.callBase()
    },
    _getLabelBeforeWidth: function() {
        let labelBeforeWidth = this.callBase();
        if (this._$searchIcon) {
            labelBeforeWidth += getOuterWidth(this._$searchIcon)
        }
        return labelBeforeWidth
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "maxLength":
                this._toggleMaxLengthProp();
                break;
            case "mode":
                this.callBase(args);
                this._updateLabelWidth();
                break;
            case "mask":
                this.callBase(args);
                this._toggleMaxLengthProp();
                break;
            default:
                this.callBase(args)
        }
    },
    _onKeyDownCutOffHandler: function(e) {
        const actualMaxLength = this._getMaxLength();
        if (actualMaxLength && !e.ctrlKey && !this._hasSelection()) {
            const $input = $(e.target);
            const key = normalizeKeyName(e);
            this._cutOffExtraChar($input);
            return $input.val().length < actualMaxLength || ignoreKeys.includes(key) || "" !== window.getSelection().toString()
        } else {
            return true
        }
    },
    _onChangeCutOffHandler: function(e) {
        const $input = $(e.target);
        if (this.option("maxLength")) {
            this._cutOffExtraChar($input)
        }
    },
    _cutOffExtraChar: function($input) {
        const actualMaxLength = this._getMaxLength();
        const textInput = $input.val();
        if (actualMaxLength && textInput.length > actualMaxLength) {
            $input.val(textInput.substr(0, actualMaxLength))
        }
    },
    _getMaxLength: function() {
        const isMaskSpecified = !!this.option("mask");
        return isMaskSpecified ? null : this.option("maxLength")
    }
});
registerComponent("dxTextBox", TextBox);
export default TextBox;
