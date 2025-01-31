/**
 * DevExtreme (esm/__internal/ui/m_button_group.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../core/component_registrator";
import $ from "../../core/renderer";
import {
    BindableTemplate
} from "../../core/templates/bindable_template";
import {
    extend
} from "../../core/utils/extend";
import {
    isDefined,
    isFunction
} from "../../core/utils/type";
import Button from "../../ui/button";
import CollectionWidget from "../../ui/collection/ui.collection_widget.edit";
import Widget from "../../ui/widget/ui.widget";
const BUTTON_GROUP_CLASS = "dx-buttongroup";
const BUTTON_GROUP_WRAPPER_CLASS = "dx-buttongroup-wrapper";
const BUTTON_GROUP_ITEM_CLASS = "dx-buttongroup-item";
const BUTTON_GROUP_FIRST_ITEM_CLASS = "dx-buttongroup-first-item";
const BUTTON_GROUP_LAST_ITEM_CLASS = "dx-buttongroup-last-item";
const BUTTON_GROUP_ITEM_HAS_WIDTH = "dx-buttongroup-item-has-width";
const SHAPE_STANDARD_CLASS = "dx-shape-standard";
const BUTTON_GROUP_STYLING_MODE_CLASS = {
    contained: "dx-buttongroup-mode-contained",
    outlined: "dx-buttongroup-mode-outlined",
    text: "dx-buttongroup-mode-text"
};
const ButtonCollection = CollectionWidget.inherit({
    _initTemplates() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            item: new BindableTemplate((($container, data, model) => {
                this._prepareItemStyles($container);
                const template = this.option("buttonTemplate");
                this._createComponent($container, Button, extend({}, model, data, this._getBasicButtonOptions(), {
                    _templateData: this._hasCustomTemplate(template) ? model : {},
                    template: model.template || template
                }))
            }), ["text", "type", "icon", "disabled", "visible", "hint"], this.option("integrationOptions.watchMethod"))
        })
    },
    _getBasicButtonOptions() {
        return {
            focusStateEnabled: false,
            onClick: null,
            hoverStateEnabled: this.option("hoverStateEnabled"),
            activeStateEnabled: this.option("activeStateEnabled"),
            stylingMode: this.option("stylingMode")
        }
    },
    _getDefaultOptions() {
        return extend(this.callBase(), {
            itemTemplateProperty: null
        })
    },
    _hasCustomTemplate(template) {
        return isFunction(template) || this.option("integrationOptions.templates")[template]
    },
    _selectedItemClass: () => "dx-item-selected dx-state-selected",
    _prepareItemStyles($item) {
        const itemIndex = $item.data("dxItemIndex");
        0 === itemIndex && $item.addClass("dx-buttongroup-first-item");
        const items = this.option("items");
        items && itemIndex === items.length - 1 && $item.addClass("dx-buttongroup-last-item");
        $item.addClass("dx-shape-standard")
    },
    _renderItemContent(args) {
        args.container = $(args.container).parent();
        return this.callBase(args)
    },
    _setAriaSelectionAttribute($target, value) {
        this.setAria("pressed", value, $target)
    },
    _renderItemContentByNode(args, $node) {
        args.container = $(args.container.children().first());
        return this.callBase(args, $node)
    },
    _focusTarget() {
        return this.$element().parent()
    },
    _keyboardEventBindingTarget() {
        return this._focusTarget()
    },
    _refreshContent() {
        this._prepareContent();
        this._renderContent()
    },
    _itemClass: () => "dx-buttongroup-item",
    _itemSelectHandler(e) {
        if ("single" === this.option("selectionMode") && this.isItemSelected(e.currentTarget)) {
            return
        }
        this.callBase(e)
    }
});
const ButtonGroup = Widget.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            hoverStateEnabled: true,
            focusStateEnabled: true,
            selectionMode: "single",
            selectedItems: [],
            selectedItemKeys: [],
            stylingMode: "contained",
            keyExpr: "text",
            items: [],
            buttonTemplate: "content",
            onSelectionChanged: null,
            onItemClick: null
        })
    },
    _init() {
        this.callBase();
        this._createItemClickAction()
    },
    _createItemClickAction() {
        this._itemClickAction = this._createActionByOption("onItemClick")
    },
    _initMarkup() {
        this.setAria("role", "group");
        this.$element().addClass("dx-buttongroup");
        this._renderStylingMode();
        this._renderButtons();
        this._syncSelectionOptions();
        this.callBase()
    },
    _renderStylingMode() {
        const {
            stylingMode: stylingMode
        } = this.option();
        for (const key in BUTTON_GROUP_STYLING_MODE_CLASS) {
            this.$element().removeClass(BUTTON_GROUP_STYLING_MODE_CLASS[key])
        }
        this.$element().addClass(BUTTON_GROUP_STYLING_MODE_CLASS[stylingMode] ?? BUTTON_GROUP_STYLING_MODE_CLASS.contained)
    },
    _fireSelectionChangeEvent(addedItems, removedItems) {
        this._createActionByOption("onSelectionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })({
            addedItems: addedItems,
            removedItems: removedItems
        })
    },
    _renderButtons() {
        const $buttons = $("<div>").addClass("dx-buttongroup-wrapper").appendTo(this.$element());
        const selectedItems = this.option("selectedItems");
        const options = {
            selectionMode: this.option("selectionMode"),
            items: this.option("items"),
            keyExpr: this.option("keyExpr"),
            buttonTemplate: this.option("buttonTemplate"),
            scrollingEnabled: false,
            selectedItemKeys: this.option("selectedItemKeys"),
            focusStateEnabled: this.option("focusStateEnabled"),
            hoverStateEnabled: this.option("hoverStateEnabled"),
            activeStateEnabled: this.option("activeStateEnabled"),
            stylingMode: this.option("stylingMode"),
            accessKey: this.option("accessKey"),
            tabIndex: this.option("tabIndex"),
            noDataText: "",
            selectionRequired: false,
            onItemRendered: e => {
                const width = this.option("width");
                isDefined(width) && $(e.itemElement).addClass(BUTTON_GROUP_ITEM_HAS_WIDTH)
            },
            onSelectionChanged: e => {
                this._syncSelectionOptions();
                this._fireSelectionChangeEvent(e.addedItems, e.removedItems)
            },
            onItemClick: e => {
                this._itemClickAction(e)
            }
        };
        if (isDefined(selectedItems) && selectedItems.length) {
            options.selectedItems = selectedItems
        }
        this._buttonsCollection = this._createComponent($buttons, ButtonCollection, options)
    },
    _syncSelectionOptions() {
        this._setOptionWithoutOptionChange("selectedItems", this._buttonsCollection.option("selectedItems"));
        this._setOptionWithoutOptionChange("selectedItemKeys", this._buttonsCollection.option("selectedItemKeys"))
    },
    _optionChanged(args) {
        switch (args.name) {
            case "stylingMode":
            case "selectionMode":
            case "keyExpr":
            case "buttonTemplate":
            case "items":
            case "activeStateEnabled":
            case "focusStateEnabled":
            case "hoverStateEnabled":
            case "tabIndex":
                this._invalidate();
                break;
            case "selectedItemKeys":
            case "selectedItems":
                this._buttonsCollection.option(args.name, args.value);
                break;
            case "onItemClick":
                this._createItemClickAction();
                break;
            case "onSelectionChanged":
                break;
            case "width":
                this.callBase(args);
                this._buttonsCollection.itemElements().toggleClass(BUTTON_GROUP_ITEM_HAS_WIDTH, !!args.value);
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxButtonGroup", ButtonGroup);
export default ButtonGroup;
