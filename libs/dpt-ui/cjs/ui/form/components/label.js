/**
 * DevExtreme (cjs/ui/form/components/label.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = void 0;
exports.renderLabel = renderLabel;
exports.setLabelWidthByMaxLabelWidth = setLabelWidthByMaxLabelWidth;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
var _element = require("../../../core/element");
var _uiFormLayout_manager = require("../ui.form.layout_manager.utils");
var _constants = require("../constants");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const GET_LABEL_WIDTH_BY_TEXT_CLASS = exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = "dx-layout-manager-hidden-label";
const FIELD_ITEM_REQUIRED_MARK_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = "dx-field-item-required-mark";
const FIELD_ITEM_LABEL_LOCATION_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = "dx-field-item-label-location-";
const FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = "dx-field-item-optional-mark";
const FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_LABEL_TEXT_CLASS = "dx-field-item-label-text";

function renderLabel(_ref) {
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
    if ((!(0, _type.isDefined)(text) || text.length <= 0) && !(0, _type.isDefined)(labelTemplate)) {
        return null
    }
    const $label = (0, _renderer.default)("<label>").addClass(_constants.FIELD_ITEM_LABEL_CLASS + " " + FIELD_ITEM_LABEL_LOCATION_CLASS + location).attr("for", id).attr("id", labelID).css("textAlign", alignment);
    const $labelContainer = (0, _renderer.default)("<span>").addClass(_constants.FIELD_ITEM_LABEL_CONTENT_CLASS);
    let $labelContent = (0, _renderer.default)("<span>").addClass(FIELD_ITEM_LABEL_TEXT_CLASS).text(text);
    if (labelTemplate) {
        $labelContent = (0, _renderer.default)("<div>").addClass("dx-field-item-custom-label-content");
        labelTemplateData.text = text;
        labelTemplate.render({
            container: (0, _element.getPublicElement)($labelContent),
            model: labelTemplateData,
            onRendered() {
                null === onLabelTemplateRendered || void 0 === onLabelTemplateRendered || onLabelTemplateRendered()
            }
        })
    }
    return $label.append($labelContainer.append($labelContent, _renderLabelMark(markOptions)))
}

function _renderLabelMark(markOptions) {
    const markText = (0, _uiFormLayout_manager.getLabelMarkText)(markOptions);
    if ("" === markText) {
        return null
    }
    return (0, _renderer.default)("<span>").addClass(markOptions.showRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS).text(markText)
}

function setLabelWidthByMaxLabelWidth($targetContainer, labelsSelector, labelMarkOptions) {
    const FIELD_ITEM_LABEL_CONTENT_CLASS_Selector = `${labelsSelector} > .${_constants.FIELD_ITEM_LABEL_CLASS}:not(.${FIELD_ITEM_LABEL_LOCATION_CLASS}top) > .${_constants.FIELD_ITEM_LABEL_CONTENT_CLASS}`;
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
