/**
 * DevExtreme (cjs/__internal/ui/radio_group/m_radio_button.js)
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
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _click = require("../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _index = require("../../../events/utils/index");
var _editor = _interopRequireDefault(require("../../../ui/editor/editor"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const RADIO_BUTTON_CLASS = "dx-radiobutton";
const RADIO_BUTTON_ICON_CLASS = "dx-radiobutton-icon";
const RADIO_BUTTON_ICON_DOT_CLASS = "dx-radiobutton-icon-dot";
const RADIO_BUTTON_CHECKED_CLASS = "dx-radiobutton-checked";
const RADIO_BUTTON_ICON_CHECKED_CLASS = "dx-radiobutton-icon-checked";
const RadioButton = _editor.default.inherit({
    _supportedKeys() {
        return (0, _extend.extend)(this.callBase(), {
            space: function(e) {
                e.preventDefault();
                this._clickAction({
                    event: e
                })
            }
        })
    },
    _getDefaultOptions() {
        return (0, _extend.extend)(this.callBase(), {
            hoverStateEnabled: true,
            activeStateEnabled: true,
            value: false
        })
    },
    _canValueBeChangedByClick: () => true,
    _defaultOptionsRules() {
        return this.callBase().concat([{
            device: () => "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator(),
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
        this._$icon = (0, _renderer.default)("<div>").addClass("dx-radiobutton-icon");
        (0, _renderer.default)("<div>").addClass("dx-radiobutton-icon-dot").appendTo(this._$icon);
        this.$element().append(this._$icon)
    },
    _renderCheckedState(checked) {
        this.$element().toggleClass("dx-radiobutton-checked", checked).find(".dx-radiobutton-icon").toggleClass("dx-radiobutton-icon-checked", checked);
        this.setAria("checked", checked)
    },
    _renderClick() {
        const eventName = (0, _index.addNamespace)(_click.name, this.NAME);
        this._clickAction = this._createAction((args => {
            this._clickHandler(args.event)
        }));
        _events_engine.default.off(this.$element(), eventName);
        _events_engine.default.on(this.$element(), eventName, (e => {
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
(0, _component_registrator.default)("dxRadioButton", RadioButton);
var _default = exports.default = RadioButton;
