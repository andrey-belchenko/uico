/**
 * DevExtreme (cjs/__internal/filter_builder/m_filter_builder.js)
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
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _message = _interopRequireDefault(require("../../localization/message"));
var _utils = require("../../ui/overlay/utils");
var _popup = _interopRequireDefault(require("../../ui/popup"));
var _ui = _interopRequireDefault(require("../../ui/shared/ui.editor_factory_mixin"));
var _tree_view = _interopRequireDefault(require("../../ui/tree_view"));
var _ui2 = _interopRequireDefault(require("../../ui/widget/ui.widget"));
var _m_utils = require("./m_utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const FILTER_BUILDER_CLASS = "dx-filterbuilder";
const FILTER_BUILDER_GROUP_CLASS = "dx-filterbuilder-group";
const FILTER_BUILDER_GROUP_ITEM_CLASS = "dx-filterbuilder-group-item";
const FILTER_BUILDER_GROUP_CONTENT_CLASS = "dx-filterbuilder-group-content";
const FILTER_BUILDER_GROUP_OPERATIONS_CLASS = "dx-filterbuilder-group-operations";
const FILTER_BUILDER_GROUP_OPERATION_CLASS = "dx-filterbuilder-group-operation";
const FILTER_BUILDER_ACTION_CLASS = "dx-filterbuilder-action";
const FILTER_BUILDER_IMAGE_CLASS = "dx-filterbuilder-action-icon";
const FILTER_BUILDER_IMAGE_ADD_CLASS = "dx-icon-plus";
const FILTER_BUILDER_IMAGE_REMOVE_CLASS = "dx-icon-remove";
const FILTER_BUILDER_ITEM_TEXT_CLASS = "dx-filterbuilder-text";
const FILTER_BUILDER_ITEM_FIELD_CLASS = "dx-filterbuilder-item-field";
const FILTER_BUILDER_ITEM_OPERATION_CLASS = "dx-filterbuilder-item-operation";
const FILTER_BUILDER_ITEM_VALUE_CLASS = "dx-filterbuilder-item-value";
const FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS = "dx-filterbuilder-item-value-text";
const FILTER_BUILDER_OVERLAY_CLASS = "dx-filterbuilder-overlay";
const FILTER_BUILDER_FILTER_OPERATIONS_CLASS = "dx-filterbuilder-operations";
const FILTER_BUILDER_FIELDS_CLASS = "dx-filterbuilder-fields";
const FILTER_BUILDER_ADD_CONDITION_CLASS = "dx-filterbuilder-add-condition";
const ACTIVE_CLASS = "dx-state-active";
const FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS = "dx-filterbuilder-menu-custom-operation";
const SOURCE = "filterBuilder";
const DISABLED_STATE_CLASS = "dx-state-disabled";
const TAB_KEY = "tab";
const ENTER_KEY = "enter";
const ESCAPE_KEY = "escape";
const ACTIONS = [{
    name: "onEditorPreparing",
    config: {
        excludeValidators: ["disabled", "readOnly"],
        category: "rendering"
    }
}, {
    name: "onEditorPrepared",
    config: {
        excludeValidators: ["disabled", "readOnly"],
        category: "rendering"
    }
}, {
    name: "onValueChanged",
    config: {
        excludeValidators: ["disabled", "readOnly"]
    }
}];
const OPERATORS = {
    and: "and",
    or: "or",
    notAnd: "!and",
    notOr: "!or"
};
const EditorFactory = (0, _ui.default)(class {});
class FilterBuilder extends _ui2.default {
    _getDefaultOptions() {
        return (0, _extend.extend)(super._getDefaultOptions(), {
            onEditorPreparing: null,
            onEditorPrepared: null,
            onValueChanged: null,
            fields: [],
            groupOperations: ["and", "or", "notAnd", "notOr"],
            maxGroupLevel: void 0,
            value: null,
            allowHierarchicalFields: false,
            groupOperationDescriptions: {
                and: _message.default.format("dxFilterBuilder-and"),
                or: _message.default.format("dxFilterBuilder-or"),
                notAnd: _message.default.format("dxFilterBuilder-notAnd"),
                notOr: _message.default.format("dxFilterBuilder-notOr")
            },
            customOperations: [],
            closePopupOnTargetScroll: true,
            filterOperationDescriptions: {
                between: _message.default.format("dxFilterBuilder-filterOperationBetween"),
                equal: _message.default.format("dxFilterBuilder-filterOperationEquals"),
                notEqual: _message.default.format("dxFilterBuilder-filterOperationNotEquals"),
                lessThan: _message.default.format("dxFilterBuilder-filterOperationLess"),
                lessThanOrEqual: _message.default.format("dxFilterBuilder-filterOperationLessOrEquals"),
                greaterThan: _message.default.format("dxFilterBuilder-filterOperationGreater"),
                greaterThanOrEqual: _message.default.format("dxFilterBuilder-filterOperationGreaterOrEquals"),
                startsWith: _message.default.format("dxFilterBuilder-filterOperationStartsWith"),
                contains: _message.default.format("dxFilterBuilder-filterOperationContains"),
                notContains: _message.default.format("dxFilterBuilder-filterOperationNotContains"),
                endsWith: _message.default.format("dxFilterBuilder-filterOperationEndsWith"),
                isBlank: _message.default.format("dxFilterBuilder-filterOperationIsBlank"),
                isNotBlank: _message.default.format("dxFilterBuilder-filterOperationIsNotBlank")
            }
        })
    }
    _optionChanged(args) {
        switch (args.name) {
            case "closePopupOnTargetScroll":
                break;
            case "onEditorPreparing":
            case "onEditorPrepared":
            case "onValueChanged":
                this._initActions();
                break;
            case "customOperations":
                this._initCustomOperations();
                this._invalidate();
                break;
            case "fields":
            case "maxGroupLevel":
            case "groupOperations":
            case "allowHierarchicalFields":
            case "groupOperationDescriptions":
            case "filterOperationDescriptions":
                this._invalidate();
                break;
            case "value":
                if (args.value !== args.previousValue) {
                    const disableInvalidateForValue = this._disableInvalidateForValue;
                    if (!disableInvalidateForValue) {
                        this._initModel();
                        this._invalidate()
                    }
                    this._disableInvalidateForValue = false;
                    this.executeAction("onValueChanged", {
                        value: args.value,
                        previousValue: args.previousValue
                    });
                    this._disableInvalidateForValue = disableInvalidateForValue
                }
                break;
            default:
                super._optionChanged(args)
        }
    }
    getFilterExpression() {
        const fields = this._getNormalizedFields();
        const value = (0, _extend.extend)(true, [], this._model);
        return (0, _m_utils.getFilterExpression)((0, _m_utils.getNormalizedFilter)(value), fields, this._customOperations, SOURCE)
    }
    _getNormalizedFields() {
        return (0, _m_utils.getNormalizedFields)(this.option("fields"))
    }
    _updateFilter() {
        this._disableInvalidateForValue = true;
        const value = (0, _extend.extend)(true, [], this._model);
        const normalizedValue = (0, _m_utils.getNormalizedFilter)(value);
        const oldValue = (0, _m_utils.getNormalizedFilter)(this._getModel(this.option("value")));
        if (JSON.stringify(oldValue) !== JSON.stringify(normalizedValue)) {
            this.option("value", normalizedValue)
        }
        this._disableInvalidateForValue = false;
        this._fireContentReadyAction()
    }
    _init() {
        this._initCustomOperations();
        this._initModel();
        this._initEditorFactory();
        this._initActions();
        super._init()
    }
    _initEditorFactory() {
        this._editorFactory = new EditorFactory
    }
    _initCustomOperations() {
        this._customOperations = (0, _m_utils.getMergedOperations)(this.option("customOperations"), this.option("filterOperationDescriptions.between"), this)
    }
    _getDefaultGroupOperation() {
        var _this$option;
        return (null === (_this$option = this.option("groupOperations")) || void 0 === _this$option ? void 0 : _this$option[0]) ?? OPERATORS.and
    }
    _getModel(value) {
        return (0, _m_utils.convertToInnerStructure)(value, this._customOperations, this._getDefaultGroupOperation())
    }
    _initModel() {
        this._model = this._getModel(this.option("value"))
    }
    _initActions() {
        const that = this;
        that._actions = {};
        ACTIONS.forEach((action => {
            const actionConfig = (0, _extend.extend)({}, action.config);
            that._actions[action.name] = that._createActionByOption(action.name, actionConfig)
        }))
    }
    executeAction(actionName, options) {
        const action = this._actions[actionName];
        return action && action(options)
    }
    _initMarkup() {
        this.$element().addClass("dx-filterbuilder");
        super._initMarkup();
        this._createGroupElementByCriteria(this._model).appendTo(this.$element())
    }
    _createConditionElement(condition, parent) {
        return (0, _renderer.default)("<div>").addClass("dx-filterbuilder-group").append(this._createConditionItem(condition, parent))
    }
    _createGroupElementByCriteria(criteria, parent) {
        let groupLevel = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        const $group = this._createGroupElement(criteria, parent, groupLevel);
        const $groupContent = $group.find(".dx-filterbuilder-group-content");
        const groupCriteria = (0, _m_utils.getGroupCriteria)(criteria);
        for (let i = 0; i < groupCriteria.length; i++) {
            const innerCriteria = groupCriteria[i];
            if ((0, _m_utils.isGroup)(innerCriteria)) {
                this._createGroupElementByCriteria(innerCriteria, criteria, groupLevel + 1).appendTo($groupContent)
            } else if ((0, _m_utils.isCondition)(innerCriteria)) {
                this._createConditionElement(innerCriteria, criteria).appendTo($groupContent)
            }
        }
        return $group
    }
    _createGroupElement(criteria, parent, groupLevel) {
        const $groupItem = (0, _renderer.default)("<div>").addClass("dx-filterbuilder-group-item");
        const $groupContent = (0, _renderer.default)("<div>").addClass("dx-filterbuilder-group-content");
        const $group = (0, _renderer.default)("<div>").addClass("dx-filterbuilder-group").append($groupItem).append($groupContent);
        if (null != parent) {
            this._createRemoveButton((() => {
                (0, _m_utils.removeItem)(parent, criteria);
                $group.remove();
                this._updateFilter()
            })).appendTo($groupItem)
        }
        this._createGroupOperationButton(criteria).appendTo($groupItem);
        this._createAddButton((() => {
            const newGroup = (0, _m_utils.createEmptyGroup)(this._getDefaultGroupOperation());
            (0, _m_utils.addItem)(newGroup, criteria);
            this._createGroupElement(newGroup, criteria, groupLevel + 1).appendTo($groupContent);
            this._updateFilter()
        }), (() => {
            const field = this.option("fields")[0];
            const newCondition = (0, _m_utils.createCondition)(field, this._customOperations);
            (0, _m_utils.addItem)(newCondition, criteria);
            this._createConditionElement(newCondition, criteria).appendTo($groupContent);
            this._updateFilter()
        }), groupLevel).appendTo($groupItem);
        return $group
    }
    _createButton(caption) {
        return (0, _renderer.default)("<div>").text(caption)
    }
    _createGroupOperationButton(criteria) {
        const groupOperations = this._getGroupOperations(criteria);
        let groupMenuItem = (0, _m_utils.getGroupMenuItem)(criteria, groupOperations);
        const caption = groupMenuItem.text;
        const $operationButton = groupOperations && groupOperations.length < 2 ? this._createButton(caption).addClass("dx-state-disabled") : this._createButtonWithMenu({
            caption: caption,
            menu: {
                items: groupOperations,
                displayExpr: "text",
                keyExpr: "value",
                onItemClick: e => {
                    if (groupMenuItem !== e.itemData) {
                        (0, _m_utils.setGroupValue)(criteria, e.itemData.value);
                        $operationButton.text(e.itemData.text);
                        groupMenuItem = e.itemData;
                        this._updateFilter()
                    }
                },
                onContentReady(e) {
                    e.component.selectItem(groupMenuItem)
                },
                cssClass: "dx-filterbuilder-group-operations"
            }
        });
        return $operationButton.addClass("dx-filterbuilder-text").addClass("dx-filterbuilder-group-operation").attr("tabindex", 0)
    }
    _createButtonWithMenu(options) {
        const that = this;
        const removeMenu = function() {
            that.$element().find(`.${ACTIVE_CLASS}`).removeClass(ACTIVE_CLASS);
            that.$element().find(".dx-overlay .dx-treeview").remove();
            that.$element().find(".dx-overlay").remove()
        };
        const rtlEnabled = this.option("rtlEnabled");
        const position = rtlEnabled ? "right" : "left";
        const $button = this._createButton(options.caption);
        (0, _extend.extend)(options.menu, {
            focusStateEnabled: true,
            selectionMode: "single",
            onItemClick: (handler = options.menu.onItemClick, function(e) {
                handler(e);
                if ("dxclick" === e.event.type) {
                    removeMenu()
                }
            }),
            onHiding() {
                $button.removeClass(ACTIVE_CLASS)
            },
            position: {
                my: `${position} top`,
                at: `${position} bottom`,
                offset: "0 1",
                of: $button,
                collision: "flip"
            },
            animation: null,
            onHidden() {
                removeMenu()
            },
            cssClass: `dx-filterbuilder-overlay ${options.menu.cssClass}`,
            rtlEnabled: rtlEnabled
        });
        var handler;
        options.popup = {
            onShown(info) {
                const treeViewElement = (0, _renderer.default)(info.component.content()).find(".dx-treeview");
                const treeView = treeViewElement.dxTreeView("instance");
                _events_engine.default.on(treeViewElement, "keyup keydown", (e => {
                    const keyName = (0, _index.normalizeKeyName)(e);
                    if ("keydown" === e.type && "tab" === keyName || "keyup" === e.type && ("escape" === keyName || "enter" === keyName)) {
                        info.component.hide();
                        _events_engine.default.trigger(options.menu.position.of, "focus")
                    }
                }));
                treeView.focus();
                treeView.option("focusedElement", null)
            }
        };
        this._subscribeOnClickAndEnterKey($button, (() => {
            removeMenu();
            that._createPopupWithTreeView(options, that.$element());
            $button.addClass(ACTIVE_CLASS)
        }));
        return $button
    }
    _hasValueButton(condition) {
        const customOperation = (0, _m_utils.getCustomOperation)(this._customOperations, condition[1]);
        return customOperation ? false !== customOperation.hasValue : null !== condition[2]
    }
    _createOperationButtonWithMenu(condition, field) {
        const that = this;
        const availableOperations = (0, _m_utils.getAvailableOperations)(field, this.option("filterOperationDescriptions"), this._customOperations);
        let currentOperation = (0, _m_utils.getOperationFromAvailable)((0, _m_utils.getOperationValue)(condition), availableOperations);
        const $operationButton = this._createButtonWithMenu({
            caption: currentOperation.text,
            menu: {
                items: availableOperations,
                displayExpr: "text",
                onItemRendered(e) {
                    e.itemData.isCustom && (0, _renderer.default)(e.itemElement).addClass("dx-filterbuilder-menu-custom-operation")
                },
                onContentReady(e) {
                    e.component.selectItem(currentOperation)
                },
                onItemClick: e => {
                    if (currentOperation !== e.itemData) {
                        currentOperation = e.itemData;
                        (0, _m_utils.updateConditionByOperation)(condition, currentOperation.value, that._customOperations);
                        const $valueButton = $operationButton.siblings().filter(".dx-filterbuilder-item-value");
                        if (that._hasValueButton(condition)) {
                            if (0 !== $valueButton.length) {
                                $valueButton.remove()
                            }
                            that._createValueButton(condition, field).appendTo($operationButton.parent())
                        } else {
                            $valueButton.remove()
                        }
                        $operationButton.text(currentOperation.text);
                        this._updateFilter()
                    }
                },
                cssClass: "dx-filterbuilder-operations"
            }
        }).addClass("dx-filterbuilder-text").addClass("dx-filterbuilder-item-operation").attr("tabindex", 0);
        return $operationButton
    }
    _createOperationAndValueButtons(condition, field, $item) {
        this._createOperationButtonWithMenu(condition, field).appendTo($item);
        if (this._hasValueButton(condition)) {
            this._createValueButton(condition, field).appendTo($item)
        }
    }
    _createFieldButtonWithMenu(fields, condition, field) {
        const that = this;
        const allowHierarchicalFields = this.option("allowHierarchicalFields");
        const items = (0, _m_utils.getItems)(fields, allowHierarchicalFields);
        let item = (0, _m_utils.getField)(field.name || field.dataField, items);
        const getFullCaption = function(item, items) {
            return allowHierarchicalFields ? (0, _m_utils.getCaptionWithParents)(item, items) : item.caption
        };
        const $fieldButton = this._createButtonWithMenu({
            caption: getFullCaption(item, items),
            menu: {
                items: items,
                dataStructure: "plain",
                keyExpr: "id",
                parentId: "parentId",
                displayExpr: "caption",
                onItemClick: e => {
                    if (item !== e.itemData) {
                        item = e.itemData;
                        condition[0] = item.name || item.dataField;
                        condition[2] = "object" === item.dataType ? null : "";
                        (0, _m_utils.updateConditionByOperation)(condition, (0, _m_utils.getDefaultOperation)(item), that._customOperations);
                        $fieldButton.siblings().filter(".dx-filterbuilder-text").remove();
                        that._createOperationAndValueButtons(condition, item, $fieldButton.parent());
                        const caption = getFullCaption(item, e.component.option("items"));
                        $fieldButton.text(caption);
                        this._updateFilter()
                    }
                },
                onContentReady(e) {
                    e.component.selectItem(item)
                },
                cssClass: "dx-filterbuilder-fields"
            }
        }).addClass("dx-filterbuilder-text").addClass("dx-filterbuilder-item-field").attr("tabindex", 0);
        return $fieldButton
    }
    _createConditionItem(condition, parent) {
        const $item = (0, _renderer.default)("<div>").addClass("dx-filterbuilder-group-item");
        const fields = this._getNormalizedFields();
        const field = (0, _m_utils.getField)(condition[0], fields);
        this._createRemoveButton((() => {
            (0, _m_utils.removeItem)(parent, condition);
            const isSingleChild = 1 === $item.parent().children().length;
            if (isSingleChild) {
                $item.parent().remove()
            } else {
                $item.remove()
            }
            this._updateFilter()
        })).appendTo($item);
        this._createFieldButtonWithMenu(fields, condition, field).appendTo($item);
        this._createOperationAndValueButtons(condition, field, $item);
        return $item
    }
    _getGroupOperations(criteria) {
        let groupOperations = this.option("groupOperations");
        const groupOperationDescriptions = this.option("groupOperationDescriptions");
        if (!groupOperations || !groupOperations.length) {
            groupOperations = [(0, _m_utils.getGroupValue)(criteria).replace("!", "not")]
        }
        return groupOperations.map((operation => ({
            text: groupOperationDescriptions[operation],
            value: OPERATORS[operation]
        })))
    }
    _createRemoveButton(handler) {
        const $removeButton = (0, _renderer.default)("<div>").addClass(FILTER_BUILDER_IMAGE_CLASS).addClass("dx-icon-remove").addClass("dx-filterbuilder-action").attr("tabindex", 0);
        this._subscribeOnClickAndEnterKey($removeButton, handler);
        return $removeButton
    }
    _createAddButton(addGroupHandler, addConditionHandler, groupLevel) {
        let $button;
        const maxGroupLevel = this.option("maxGroupLevel");
        if ((0, _type.isDefined)(maxGroupLevel) && groupLevel >= maxGroupLevel) {
            $button = this._createButton();
            this._subscribeOnClickAndEnterKey($button, addConditionHandler)
        } else {
            $button = this._createButtonWithMenu({
                menu: {
                    items: [{
                        caption: _message.default.format("dxFilterBuilder-addCondition"),
                        click: addConditionHandler
                    }, {
                        caption: _message.default.format("dxFilterBuilder-addGroup"),
                        click: addGroupHandler
                    }],
                    displayExpr: "caption",
                    onItemClick(e) {
                        e.itemData.click()
                    },
                    cssClass: "dx-filterbuilder-add-condition"
                }
            })
        }
        return $button.addClass(FILTER_BUILDER_IMAGE_CLASS).addClass("dx-icon-plus").addClass("dx-filterbuilder-action").attr("tabindex", 0)
    }
    _createValueText(item, field, $container) {
        const that = this;
        const $text = (0, _renderer.default)("<div>").html("&nbsp;").addClass("dx-filterbuilder-item-value-text").attr("tabindex", 0).appendTo($container);
        const value = item[2];
        const customOperation = (0, _m_utils.getCustomOperation)(that._customOperations, item[1]);
        if (!customOperation && field.lookup) {
            (0, _m_utils.getCurrentLookupValueText)(field, value, (result => {
                (0, _m_utils.renderValueText)($text, result)
            }))
        } else {
            (0, _deferred.when)((0, _m_utils.getCurrentValueText)(field, value, customOperation)).done((result => {
                (0, _m_utils.renderValueText)($text, result, customOperation)
            }))
        }
        that._subscribeOnClickAndEnterKey($text, (e => {
            if ("keyup" === e.type) {
                e.stopPropagation()
            }
            that._createValueEditorWithEvents(item, field, $container)
        }));
        return $text
    }
    _updateConditionValue(item, value, callback) {
        const areValuesDifferent = item[2] !== value;
        if (areValuesDifferent) {
            item[2] = value
        }
        callback();
        this._updateFilter()
    }
    _addDocumentKeyUp($editor, handler) {
        let isComposing = false;
        let hasCompositionJustEnded = false;
        const document = _dom_adapter.default.getDocument();
        const documentKeyUpHandler = e => {
            if (isComposing || hasCompositionJustEnded) {
                hasCompositionJustEnded = false;
                return
            }
            handler(e)
        };
        _events_engine.default.on(document, "keyup", documentKeyUpHandler);
        const input = $editor.find("input");
        _events_engine.default.on(input, "compositionstart", (() => {
            isComposing = true
        }));
        _events_engine.default.on(input, "compositionend", (() => {
            isComposing = false;
            hasCompositionJustEnded = true
        }));
        _events_engine.default.on(input, "keydown", (event => {
            if (229 !== event.which) {
                hasCompositionJustEnded = false
            }
        }));
        this._documentKeyUpHandler = documentKeyUpHandler
    }
    _addDocumentClick($editor, closeEditorFunc) {
        const document = _dom_adapter.default.getDocument();
        const documentClickHandler = e => {
            if (!this._isFocusOnEditorParts($editor, e.target)) {
                _events_engine.default.trigger($editor.find("input"), "change");
                closeEditorFunc()
            }
        };
        _events_engine.default.on(document, "dxpointerdown", documentClickHandler);
        this._documentClickHandler = documentClickHandler
    }
    _isFocusOnEditorParts($editor, target) {
        const activeElement = target || _dom_adapter.default.getActiveElement();
        return (0, _renderer.default)(activeElement).closest($editor.children()).length || (0, _renderer.default)(activeElement).closest(".dx-dropdowneditor-overlay").length
    }
    _removeEvents() {
        const document = _dom_adapter.default.getDocument();
        (0, _type.isDefined)(this._documentKeyUpHandler) && _events_engine.default.off(document, "keyup", this._documentKeyUpHandler);
        (0, _type.isDefined)(this._documentClickHandler) && _events_engine.default.off(document, "dxpointerdown", this._documentClickHandler)
    }
    _dispose() {
        this._removeEvents();
        super._dispose()
    }
    _createValueEditorWithEvents(item, field, $container) {
        let value = item[2];
        const createValueText = () => {
            $container.empty();
            this._removeEvents();
            return this._createValueText(item, field, $container)
        };
        const closeEditor = () => {
            this._updateConditionValue(item, value, (() => {
                createValueText()
            }))
        };
        const options = {
            value: "" === value ? null : value,
            filterOperation: (0, _m_utils.getOperationValue)(item),
            setValue(data) {
                value = null === data ? "" : data
            },
            closeEditor: closeEditor,
            text: $container.text()
        };
        $container.empty();
        const $editor = this._createValueEditor($container, field, options);
        _events_engine.default.trigger($editor.find("input").not(":hidden").eq(0), "focus");
        this._removeEvents();
        this._addDocumentClick($editor, closeEditor);
        this._addDocumentKeyUp($editor, (e => {
            const keyName = (0, _index.normalizeKeyName)(e);
            if ("tab" === keyName) {
                if (this._isFocusOnEditorParts($editor)) {
                    return
                }
                this._updateConditionValue(item, value, (() => {
                    createValueText();
                    if (e.shiftKey) {
                        _events_engine.default.trigger($container.prev(), "focus")
                    }
                }))
            }
            if ("escape" === keyName) {
                _events_engine.default.trigger(createValueText(), "focus")
            }
            if ("enter" === keyName) {
                this._updateConditionValue(item, value, (() => {
                    _events_engine.default.trigger(createValueText(), "focus")
                }))
            }
        }));
        this._fireContentReadyAction()
    }
    _createValueButton(item, field) {
        const $valueButton = (0, _renderer.default)("<div>").addClass("dx-filterbuilder-text").addClass("dx-filterbuilder-item-value");
        this._createValueText(item, field, $valueButton);
        return $valueButton
    }
    _createValueEditor($container, field, options) {
        const $editor = (0, _renderer.default)("<div>").attr("tabindex", 0).appendTo($container);
        const customOperation = (0, _m_utils.getCustomOperation)(this._customOperations, options.filterOperation);
        const editorTemplate = customOperation && customOperation.editorTemplate ? customOperation.editorTemplate : field.editorTemplate;
        if (editorTemplate) {
            const template = this._getTemplate(editorTemplate);
            template.render({
                model: (0, _extend.extend)({
                    field: field
                }, options),
                container: $editor
            })
        } else {
            this._editorFactory.createEditor.call(this, $editor, (0, _extend.extend)({}, field, options, {
                parentType: SOURCE
            }))
        }
        return $editor
    }
    _createPopupWithTreeView(options, $container) {
        const that = this;
        const $popup = (0, _renderer.default)("<div>").addClass(options.menu.cssClass).appendTo($container);
        this._createComponent($popup, _popup.default, {
            onHiding: options.menu.onHiding,
            onHidden: options.menu.onHidden,
            rtlEnabled: options.menu.rtlEnabled,
            position: options.menu.position,
            animation: options.menu.animation,
            contentTemplate(contentElement) {
                const $menuContainer = (0, _renderer.default)("<div>").appendTo(contentElement);
                that._createComponent($menuContainer, _tree_view.default, options.menu);
                this.repaint()
            },
            _ignoreFunctionValueDeprecation: true,
            maxHeight: () => (0, _utils.getElementMaxHeightByWindow)(options.menu.position.of),
            visible: true,
            focusStateEnabled: false,
            hideOnParentScroll: this.option("closePopupOnTargetScroll"),
            hideOnOutsideClick: true,
            onShown: options.popup.onShown,
            shading: false,
            width: "auto",
            height: "auto",
            showTitle: false,
            _wrapperClassExternal: options.menu.cssClass
        })
    }
    _subscribeOnClickAndEnterKey($button, handler) {
        _events_engine.default.on($button, "dxclick", handler);
        _events_engine.default.on($button, "keyup", (e => {
            if ("enter" === (0, _index.normalizeKeyName)(e)) {
                handler(e)
            }
        }))
    }
}(0, _component_registrator.default)("dxFilterBuilder", FilterBuilder);
var _default = exports.default = FilterBuilder;
