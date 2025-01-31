/**
 * DevExtreme (esm/ui/form/components/label.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import {
    isDefined
} from "../../../core/utils/type";
import {
    getPublicElement
} from "../../../core/element";
import {
    getLabelMarkText
} from "../ui.form.layout_manager.utils";
import {
    FIELD_ITEM_LABEL_CONTENT_CLASS,
    FIELD_ITEM_LABEL_CLASS
} from "../constants";
export const GET_LABEL_WIDTH_BY_TEXT_CLASS = "dx-layout-manager-hidden-label";
export const FIELD_ITEM_REQUIRED_MARK_CLASS = "dx-field-item-required-mark";
export const FIELD_ITEM_LABEL_LOCATION_CLASS = "dx-field-item-label-location-";
export const FIELD_ITEM_OPTIONAL_MARK_CLASS = "dx-field-item-optional-mark";
export const FIELD_ITEM_LABEL_TEXT_CLASS = "dx-field-item-label-text";
export function renderLabel(_ref) {
    let {
        text: text,
        id: id,
        location: location,
        alignment: alignment,
        labelID: labelID = null,
        markOptions: markOptions = {},
        labelTemplate: labelTemplate,
        labelTemplateData: labelTemplateData,
        onLabelTemplateRendered: onLabelTemplateRendered
    } = _ref;
    if ((!isDefined(text) || text.length <= 0) && !isDefined(labelTemplate)) {
        return null
    }
    const $label = $("<label>").addClass(FIELD_ITEM_LABEL_CLASS + " dx-field-item-label-location-" + location).attr("for", id).attr("id", labelID).css("textAlign", alignment);
    const $labelContainer = $("<span>").addClass(FIELD_ITEM_LABEL_CONTENT_CLASS);
    let $labelContent = $("<span>").addClass("dx-field-item-label-text").text(text);
    if (labelTemplate) {
        $labelContent = $("<div>").addClass("dx-field-item-custom-label-content");
        labelTemplateData.text = text;
        labelTemplate.render({
            container: getPublicElement($labelContent),
            model: labelTemplateData,
            onRendered() {
                null === onLabelTemplateRendered || void 0 === onLabelTemplateRendered || onLabelTemplateRendered()
            }
        })
    }
    return $label.append($labelContainer.append($labelContent, _renderLabelMark(markOptions)))
}

function _renderLabelMark(markOptions) {
    const markText = getLabelMarkText(markOptions);
    if ("" === markText) {
        return null
    }
    return $("<span>").addClass(markOptions.showRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS).text(markText)
}
export function setLabelWidthByMaxLabelWidth($targetContainer, labelsSelector, labelMarkOptions) {
    const FIELD_ITEM_LABEL_CONTENT_CLASS_Selector = `${labelsSelector} > .${FIELD_ITEM_LABEL_CLASS}:not(.dx-field-item-label-location-top) > .${FIELD_ITEM_LABEL_CONTENT_CLASS}`;
    const $FIELD_ITEM_LABEL_CONTENT_CLASS_Items = $targetContainer.find(FIELD_ITEM_LABEL_CONTENT_CLASS_Selector);
    const FIELD_ITEM_LABEL_CONTENT_CLASS_Length = $FIELD_ITEM_LABEL_CONTENT_CLASS_Items.length;
    let labelWidth;
    let i;
    let maxWidth = 0;
    for (i = 0; i < FIELD_ITEM_LABEL_CONTENT_CLASS_Length; i++) {
        labelWidth = getLabelWidthByHTML($FIELD_ITEM_LABEL_CONTENT_CLASS_Items[i]);
        if (labelWidth > maxWidth) {
            maxWidth = labelWidth
        }
    }
    for (i = 0; i < FIELD_ITEM_LABEL_CONTENT_CLASS_Length; i++) {
        $FIELD_ITEM_LABEL_CONTENT_CLASS_Items[i].style.width = maxWidth + "px"
    }
}

function getLabelWidthByHTML(labelContent) {
    let result = 0;
    const itemsCount = labelContent.children.length;
    for (let i = 0; i < itemsCount; i++) {
        const child = labelContent.children[i];
        result += child.offsetWidth
    }
    return result
}
