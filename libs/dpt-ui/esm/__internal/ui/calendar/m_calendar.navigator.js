/**
 * DevExtreme (esm/__internal/ui/calendar/m_calendar.navigator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from "../../../core/renderer";
import Button from "../../../ui/button";
import {
    isFluent,
    isMaterial
} from "../../../ui/themes";
import Widget from "../widget";
const CALENDAR_NAVIGATOR_CLASS = "dx-calendar-navigator";
const CALENDAR_NAVIGATOR_PREVIOUS_MONTH_CLASS = "dx-calendar-navigator-previous-month";
const CALENDAR_NAVIGATOR_NEXT_MONTH_CLASS = "dx-calendar-navigator-next-month";
const CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS = "dx-calendar-navigator-previous-view";
const CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS = "dx-calendar-navigator-next-view";
const CALENDAR_NAVIGATOR_DISABLED_LINK_CLASS = "dx-calendar-disabled-navigator-link";
const CALENDAR_NAVIGATOR_CAPTION_BUTTON_CLASS = "dx-calendar-caption-button";
const BUTTON_TEXT_CLASS = "dx-button-text";
class Navigator extends Widget {
    _getDefaultOptions() {
        return _extends({}, super._getDefaultOptions(), {
            onClick: void 0,
            onCaptionClick: void 0,
            type: "normal",
            stylingMode: "outlined",
            text: ""
        })
    }
    _defaultOptionsRules() {
        return super._defaultOptionsRules().concat([{
            device: () => isMaterial(),
            options: {
                type: "default",
                stylingMode: "text"
            }
        }, {
            device: () => isFluent(),
            options: {
                type: "normal",
                stylingMode: "text"
            }
        }])
    }
    _init() {
        super._init();
        this._initActions()
    }
    _initActions() {
        this._clickAction = this._createActionByOption("onClick");
        this._captionClickAction = this._createActionByOption("onCaptionClick")
    }
    _initMarkup() {
        super._initMarkup();
        $(this.element()).addClass("dx-calendar-navigator");
        this._renderButtons();
        this._renderCaption()
    }
    _renderButtons() {
        const {
            rtlEnabled: rtlEnabled,
            type: type,
            stylingMode: stylingMode,
            focusStateEnabled: focusStateEnabled
        } = this.option();
        this._prevButton = this._createComponent($("<div>"), Button, {
            focusStateEnabled: focusStateEnabled,
            icon: rtlEnabled ? "chevronright" : "chevronleft",
            onClick: e => {
                this._clickAction({
                    direction: -1,
                    event: e
                })
            },
            type: type,
            stylingMode: stylingMode,
            integrationOptions: {}
        });
        const $prevButton = $(this._prevButton.element()).addClass("dx-calendar-navigator-previous-view").addClass("dx-calendar-navigator-previous-month");
        this._nextButton = this._createComponent($("<div>"), Button, {
            focusStateEnabled: focusStateEnabled,
            icon: rtlEnabled ? "chevronleft" : "chevronright",
            onClick: e => {
                this._clickAction({
                    direction: 1,
                    event: e
                })
            },
            type: type,
            stylingMode: stylingMode,
            integrationOptions: {}
        });
        const $nextButton = $(this._nextButton.element()).addClass("dx-calendar-navigator-next-view").addClass("dx-calendar-navigator-next-month");
        this._caption = this._createComponent($("<div>").addClass("dx-calendar-caption-button"), Button, {
            focusStateEnabled: focusStateEnabled,
            onClick: e => {
                this._captionClickAction({
                    event: e
                })
            },
            type: type,
            stylingMode: stylingMode,
            template: (_, content) => {
                const {
                    text: text
                } = this.option();
                const viewCaptionTexts = text.split(" - ");
                viewCaptionTexts.forEach((captionText => {
                    $(content).append($("<span>").addClass("dx-button-text").text(captionText))
                }))
            },
            integrationOptions: {}
        });
        const $caption = this._caption.$element();
        this.$element().append($prevButton, $caption, $nextButton)
    }
    _renderCaption() {
        var _this$_caption;
        null === (_this$_caption = this._caption) || void 0 === _this$_caption || _this$_caption.option("text", this.option("text"))
    }
    toggleButton(buttonPrefix, value) {
        const buttonName = `_${buttonPrefix}Button`;
        const button = this[buttonName];
        if (button) {
            button.option("disabled", value);
            button.$element().toggleClass("dx-calendar-disabled-navigator-link", value)
        }
    }
    _optionChanged(args) {
        if ("text" === args.name) {
            this._renderCaption()
        } else {
            super._optionChanged(args)
        }
    }
}
export default Navigator;
