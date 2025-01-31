/**
 * DevExtreme (esm/__internal/ui/radio_group/m_radio_button.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import devices from "../../../core/devices";
import $ from "../../../core/renderer";
import {
    extend
} from "../../../core/utils/extend";
import {
    name as clickEventName
} from "../../../events/click";
import eventsEngine from "../../../events/core/events_engine";
import {
    addNamespace
} from "../../../events/utils/index";
import Editor from "../../../ui/editor/editor";
const RADIO_BUTTON_CLASS = "dx-radiobutton";
const RADIO_BUTTON_ICON_CLASS = "dx-radiobutton-icon";
const RADIO_BUTTON_ICON_DOT_CLASS = "dx-radiobutton-icon-dot";
const RADIO_BUTTON_CHECKED_CLASS = "dx-radiobutton-checked";
const RADIO_BUTTON_ICON_CHECKED_CLASS = "dx-radiobutton-icon-checked";
const RadioButton = Editor.inherit({
    _supportedKeys() {
        return extend(this.callBase(), {
            space: function(e) {
                e.preventDefault();
                this._clickAction({
                    event: e
                })
            }
        })
    },
    _getDefaultOptions() {
        return extend(this.callBase(), {
            hoverStateEnabled: true,
            activeStateEnabled: true,
            value: false
        })
    },
    _canValueBeChangedByClick: () => true,
    _defaultOptionsRules() {
        return this.callBase().concat([{
            device: () => "desktop" === devices.real().deviceType && !devices.isSimulator(),
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _init() {
        this.callBase();
        this.$element().addClass("dx-radiobutton")
    },
    _initMarkup() {
        this.callBase();
        this._renderIcon();
        this._renderCheckedState(this.option("value"));
        this._renderClick();
        this.setAria("role", "radio")
    },
    _renderIcon() {
        this._$icon = $("<div>").addClass("dx-radiobutton-icon");
        $("<div>").addClass("dx-radiobutton-icon-dot").appendTo(this._$icon);
        this.$element().append(this._$icon)
    },
    _renderCheckedState(checked) {
        this.$element().toggleClass("dx-radiobutton-checked", checked).find(".dx-radiobutton-icon").toggleClass("dx-radiobutton-icon-checked", checked);
        this.setAria("checked", checked)
    },
    _renderClick() {
        const eventName = addNamespace(clickEventName, this.NAME);
        this._clickAction = this._createAction((args => {
            this._clickHandler(args.event)
        }));
        eventsEngine.off(this.$element(), eventName);
        eventsEngine.on(this.$element(), eventName, (e => {
            this._clickAction({
                event: e
            })
        }))
    },
    _clickHandler(e) {
        this._saveValueChangeEvent(e);
        this.option("value", true)
    },
    _optionChanged(args) {
        if ("value" === args.name) {
            this._renderCheckedState(args.value);
            this.callBase(args)
        } else {
            this.callBase(args)
        }
    }
});
registerComponent("dxRadioButton", RadioButton);
export default RadioButton;
