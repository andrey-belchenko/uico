/**
 * DevExtreme (esm/renovation/component_wrapper/button.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import ValidationEngine from "../../ui/validation_engine";
import Component from "./common/component";
import {
    getImageSourceType
} from "../../core/utils/icon";
export default class ButtonWrapper extends Component {
    get _validationGroupConfig() {
        return ValidationEngine.getGroupConfig(this._findGroup())
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
        const iconType = getImageSourceType(props.icon);
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
        return void 0 !== validationGroup && "" !== validationGroup ? validationGroup : ValidationEngine.findGroup($element, this._modelByElement($element))
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
