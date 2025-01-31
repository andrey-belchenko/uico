/**
 * DevExtreme (cjs/renovation/component_wrapper/button.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _validation_engine = _interopRequireDefault(require("../../ui/validation_engine"));
var _component = _interopRequireDefault(require("./common/component"));
var _icon = require("../../core/utils/icon");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
class ButtonWrapper extends _component.default {
    get _validationGroupConfig() {
        return _validation_engine.default.getGroupConfig(this._findGroup())
    }
    getDefaultTemplateNames() {
        return ["content"]
    }
    getSupportedKeyNames() {
        return ["space", "enter"]
    }
    getProps() {
        const props = super.getProps();
        props.onClick = _ref => {
            let {
                event: event
            } = _ref;
            this._clickAction({
                event: event,
                validationGroup: this._validationGroupConfig
            })
        };
        const iconType = (0, _icon.getImageSourceType)(props.icon);
        if ("svg" === iconType) {
            props.iconTemplate = this._createTemplateComponent((() => props.icon))
        }
        return props
    }
    get _templatesInfo() {
        return {
            template: "content"
        }
    }
    _toggleActiveState(_, value) {
        const button = this.viewRef;
        value ? button.activate() : button.deactivate()
    }
    _getSubmitAction() {
        let needValidate = true;
        let validationStatus = "valid";
        return this._createAction((_ref2 => {
            let {
                event: event,
                submitInput: submitInput
            } = _ref2;
            if (needValidate) {
                const validationGroup = this._validationGroupConfig;
                if (void 0 !== validationGroup && "" !== validationGroup) {
                    const validationResult = validationGroup.validate();
                    validationStatus = validationResult.status;
                    if ("pending" === validationResult.status) {
                        needValidate = false;
                        this.option("disabled", true);
                        validationResult.complete.then((_ref3 => {
                            let {
                                status: status
                            } = _ref3;
                            this.option("disabled", false);
                            validationStatus = status;
                            "valid" === validationStatus && submitInput.click();
                            needValidate = true
                        }))
                    }
                }
            }
            "valid" !== validationStatus && event.preventDefault();
            event.stopPropagation()
        }))
    }
    _initializeComponent() {
        super._initializeComponent();
        this._addAction("onSubmit", this._getSubmitAction());
        this._clickAction = this._createClickAction()
    }
    _initMarkup() {
        super._initMarkup();
        const $content = this.$element().find(".dx-button-content").first();
        const $template = $content.children().filter(".dx-template-wrapper");
        const $input = $content.children().filter(".dx-button-submit-input");
        if ($template.length) {
            $template.addClass("dx-button-content");
            $template.append($input);
            $content.replaceWith($template)
        }
    }
    _patchOptionValues(options) {
        return super._patchOptionValues(_extends({}, options, {
            templateData: options._templateData
        }))
    }
    _findGroup() {
        const $element = this.$element();
        const validationGroup = this.option("validationGroup");
        return void 0 !== validationGroup && "" !== validationGroup ? validationGroup : _validation_engine.default.findGroup($element, this._modelByElement($element))
    }
    _createClickAction() {
        return this._createActionByOption("onClick", {
            excludeValidators: ["readOnly"]
        })
    }
    _optionChanged(option) {
        if ("onClick" === option.name) {
            this._clickAction = this._createClickAction()
        }
        super._optionChanged(option)
    }
}
exports.default = ButtonWrapper;
module.exports = exports.default;
module.exports.default = exports.default;
