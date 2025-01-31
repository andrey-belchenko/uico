/**
 * DevExtreme (esm/ui/form/components/field_item.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import eventsEngine from "../../../events/core/events_engine";
import {
    name as clickEventName
} from "../../../events/click";
import {
    getPublicElement
} from "../../../core/element";
import {
    captionize
} from "../../../core/utils/inflector";
import {
    format
} from "../../../core/utils/string";
import {
    isMaterialBased
} from "../../themes";
import errors from "../../widget/ui.errors";
import Validator from "../../validator";
import {
    FIELD_ITEM_CONTENT_CLASS
} from "../constants";
export const FLEX_LAYOUT_CLASS = "dx-flex-layout";
export const FIELD_ITEM_OPTIONAL_CLASS = "dx-field-item-optional";
export const FIELD_ITEM_REQUIRED_CLASS = "dx-field-item-required";
export const FIELD_ITEM_CONTENT_WRAPPER_CLASS = "dx-field-item-content-wrapper";
export const FIELD_ITEM_CONTENT_LOCATION_CLASS = "dx-field-item-content-location-";
export const FIELD_ITEM_LABEL_ALIGN_CLASS = "dx-field-item-label-align";
export const FIELD_ITEM_HELP_TEXT_CLASS = "dx-field-item-help-text";
export const LABEL_VERTICAL_ALIGNMENT_CLASS = "dx-label-v-align";
export const LABEL_HORIZONTAL_ALIGNMENT_CLASS = "dx-label-h-align";
export const TOGGLE_CONTROLS_PADDING_CLASS = "dx-toggle-controls-paddings";
import {
    renderLabel
} from "./label";
const TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
const VALIDATION_TARGET_CLASS = "dx-validation-target";
const INVALID_CLASS = "dx-invalid";
export function renderFieldItem(_ref) {
    let {
        $parent: $parent,
        rootElementCssClassList: rootElementCssClassList,
        formOrLayoutManager: formOrLayoutManager,
        createComponentCallback: createComponentCallback,
        labelOptions: labelOptions,
        labelNeedBaselineAlign: labelNeedBaselineAlign,
        labelLocation: labelLocation,
        needRenderLabel: needRenderLabel,
        formLabelLocation: formLabelLocation,
        item: item,
        editorOptions: editorOptions,
        isSimpleItem: isSimpleItem,
        isRequired: isRequired,
        template: template,
        helpID: helpID,
        labelID: labelID,
        name: name,
        helpText: helpText,
        requiredMessageTemplate: requiredMessageTemplate,
        validationGroup: validationGroup
    } = _ref;
    const $rootElement = $("<div>").addClass(rootElementCssClassList.join(" ")).appendTo($parent);
    $rootElement.addClass(isRequired ? "dx-field-item-required" : "dx-field-item-optional");
    if (isSimpleItem) {
        $rootElement.addClass("dx-flex-layout")
    }
    if (isSimpleItem && labelNeedBaselineAlign) {
        $rootElement.addClass("dx-field-item-label-align")
    }
    const $fieldEditorContainer = $("<div>");
    $fieldEditorContainer.data("dx-form-item", item);
    $fieldEditorContainer.addClass(FIELD_ITEM_CONTENT_CLASS).addClass("dx-field-item-content-location-" + {
        right: "left",
        left: "right",
        top: "bottom"
    } [formLabelLocation]);
    let $label = null;
    if (needRenderLabel) {
        if (labelOptions.labelTemplate) {
            labelOptions.labelTemplateData = getTemplateData(item, editorOptions, formOrLayoutManager)
        }
        $label = renderLabel(labelOptions)
    }
    if ($label) {
        const {
            editorType: editorType
        } = item;
        $rootElement.append($label);
        if ("top" === labelLocation || "left" === labelLocation) {
            $rootElement.append($fieldEditorContainer)
        }
        if ("right" === labelLocation) {
            $rootElement.prepend($fieldEditorContainer)
        }
        if ("top" === labelLocation) {
            $rootElement.addClass("dx-label-v-align")
        } else {
            $rootElement.addClass("dx-label-h-align")
        }
        if ("dxCheckBox" === editorType || "dxSwitch" === editorType) {
            eventsEngine.on($label, clickEventName, (function() {
                eventsEngine.trigger($fieldEditorContainer.children(), clickEventName)
            }))
        }
        const toggleControls = ["dxCheckBox", "dxSwitch", "dxRadioGroup"];
        const isToggleControls = toggleControls.includes(editorType);
        const labelAlignment = labelOptions.alignment;
        const isLabelAlignmentLeft = "left" === labelAlignment || !labelAlignment;
        const hasNotTemplate = !template;
        const isLabelOnTop = "top" === labelLocation;
        if (hasNotTemplate && isToggleControls && isLabelOnTop && isLabelAlignmentLeft) {
            $fieldEditorContainer.addClass("dx-toggle-controls-paddings")
        }
    } else {
        $rootElement.append($fieldEditorContainer)
    }
    let widgetInstance;
    if (template) {
        template.render({
            container: getPublicElement($fieldEditorContainer),
            model: getTemplateData(item, editorOptions, formOrLayoutManager),
            onRendered() {
                const $validationTarget = getValidationTarget($fieldEditorContainer);
                const validationTargetInstance = tryGetValidationTargetInstance($validationTarget);
                subscribeWrapperInvalidClassToggle(validationTargetInstance)
            }
        })
    } else {
        const $div = $("<div>").appendTo($fieldEditorContainer);
        try {
            widgetInstance = createComponentCallback($div, item.editorType, editorOptions);
            widgetInstance.setAria("describedby", helpID);
            if (labelID) {
                widgetInstance.setAria("labelledby", labelID)
            }
            widgetInstance.setAria("required", isRequired)
        } catch (e) {
            errors.log("E1035", e.message)
        }
    }
    const $validationTarget = getValidationTarget($fieldEditorContainer);
    const validationTargetInstance = $validationTarget && $validationTarget.data(VALIDATION_TARGET_CLASS);
    if (validationTargetInstance) {
        const isItemHaveCustomLabel = item.label && item.label.text;
        const itemName = isItemHaveCustomLabel ? null : name;
        const fieldName = isItemHaveCustomLabel ? item.label.text : itemName && captionize(itemName);
        let validationRules;
        if (isSimpleItem) {
            if (item.validationRules) {
                validationRules = item.validationRules
            } else {
                const requiredMessage = format(requiredMessageTemplate, fieldName || "");
                validationRules = item.isRequired ? [{
                    type: "required",
                    message: requiredMessage
                }] : null
            }
        }
        if (Array.isArray(validationRules) && validationRules.length) {
            createComponentCallback($validationTarget, Validator, {
                validationRules: validationRules,
                validationGroup: validationGroup,
                dataGetter: function() {
                    return {
                        formItem: item
                    }
                }
            })
        }
        subscribeWrapperInvalidClassToggle(validationTargetInstance)
    }
    if (helpText && isSimpleItem) {
        const $editorParent = $fieldEditorContainer.parent();
        $editorParent.append($("<div>").addClass(FIELD_ITEM_CONTENT_WRAPPER_CLASS).append($fieldEditorContainer).append($("<div>").addClass("dx-field-item-help-text").attr("id", helpID).text(helpText)))
    }
    return {
        $fieldEditorContainer: $fieldEditorContainer,
        $rootElement: $rootElement,
        widgetInstance: widgetInstance
    }
}

function getValidationTarget($fieldEditorContainer) {
    const $editor = $fieldEditorContainer.children().first();
    return $editor.hasClass(TEMPLATE_WRAPPER_CLASS) ? $editor.children().first() : $editor
}

function tryGetValidationTargetInstance($validationTarget) {
    var _$validationTarget$pa;
    return (null === $validationTarget || void 0 === $validationTarget ? void 0 : $validationTarget.data(VALIDATION_TARGET_CLASS)) || (null === $validationTarget || void 0 === $validationTarget || null === (_$validationTarget$pa = $validationTarget.parent) || void 0 === _$validationTarget$pa || null === (_$validationTarget$pa = _$validationTarget$pa.call($validationTarget)) || void 0 === _$validationTarget$pa ? void 0 : _$validationTarget$pa.data(VALIDATION_TARGET_CLASS))
}

function subscribeWrapperInvalidClassToggle(validationTargetInstance) {
    if (validationTargetInstance && isMaterialBased()) {
        const wrapperClass = `.${FIELD_ITEM_CONTENT_WRAPPER_CLASS}`;
        const toggleInvalidClass = _ref2 => {
            let {
                element: element,
                component: component
            } = _ref2;
            const {
                isValid: isValid,
                validationMessageMode: validationMessageMode
            } = component.option();
            $(element).parents(wrapperClass).toggleClass(INVALID_CLASS, false === isValid && (component._isFocused() || "always" === validationMessageMode))
        };
        validationTargetInstance.on("optionChanged", (e => {
            if ("isValid" !== e.name) {
                return
            }
            toggleInvalidClass(e)
        }));
        validationTargetInstance.on("focusIn", toggleInvalidClass).on("focusOut", toggleInvalidClass).on("enterKey", toggleInvalidClass)
    }
}

function getTemplateData(item, editorOptions, formOrLayoutManager) {
    return {
        dataField: item.dataField,
        editorType: item.editorType,
        editorOptions: editorOptions,
        component: formOrLayoutManager,
        name: item.name
    }
}
