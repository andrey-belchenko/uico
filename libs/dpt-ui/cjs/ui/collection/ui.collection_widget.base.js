/**
 * DevExtreme (cjs/ui/collection/ui.collection_widget.base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _common = require("../../core/utils/common");
var _template_manager = require("../../core/utils/template_manager");
var _element = require("../../core/element");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _action = _interopRequireDefault(require("../../core/action"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _data_helper = _interopRequireDefault(require("../../data_helper"));
var _item = _interopRequireDefault(require("./item"));
var _selectors = require("../widget/selectors");
var _message = _interopRequireDefault(require("../../localization/message"));
var _hold = _interopRequireDefault(require("../../events/hold"));
var _data = require("../../core/utils/data");
var _click = require("../../events/click");
var _contextmenu = require("../../events/contextmenu");
var _bindable_template = require("../../core/templates/bindable_template");

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
const COLLECTION_CLASS = "dx-collection";
const ITEM_CLASS = "dx-item";
const CONTENT_CLASS_POSTFIX = "-content";
const ITEM_CONTENT_PLACEHOLDER_CLASS = "dx-item-content-placeholder";
const ITEM_DATA_KEY = "dxItemData";
const ITEM_INDEX_KEY = "dxItemIndex";
const ITEM_TEMPLATE_ID_PREFIX = "tmpl-";
const ITEMS_OPTIONS_NAME = "dxItem";
const SELECTED_ITEM_CLASS = "dx-item-selected";
const ITEM_RESPONSE_WAIT_CLASS = "dx-item-response-wait";
const EMPTY_COLLECTION = "dx-empty-collection";
const TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
const ITEM_PATH_REGEX = /^([^.]+\[\d+\]\.)+([\w.]+)$/;
const ANONYMOUS_TEMPLATE_NAME = "item";
const FOCUS_UP = "up";
const FOCUS_DOWN = "down";
const FOCUS_LEFT = "left";
const FOCUS_RIGHT = "right";
const FOCUS_PAGE_UP = "pageup";
const FOCUS_PAGE_DOWN = "pagedown";
const FOCUS_LAST = "last";
const FOCUS_FIRST = "first";
const CollectionWidget = _ui.default.inherit({
    _activeStateUnit: "." + ITEM_CLASS,
    _supportedKeys: function() {
        const move = function(location, e) {
            if (!(0, _index.isCommandKeyPressed)(e)) {
                e.preventDefault();
                e.stopPropagation();
                this._moveFocus(location, e)
            }
        };
        return (0, _extend.extend)(this.callBase(), {
            space: function(e) {
                e.preventDefault();
                this._enterKeyHandler(e)
            },
            enter: this._enterKeyHandler,
            leftArrow: move.bind(this, "left"),
            rightArrow: move.bind(this, "right"),
            upArrow: move.bind(this, "up"),
            downArrow: move.bind(this, "down"),
            pageUp: move.bind(this, "up"),
            pageDown: move.bind(this, "down"),
            home: move.bind(this, "first"),
            end: move.bind(this, "last")
        })
    },
    _enterKeyHandler: function(e) {
        const $itemElement = (0, _renderer.default)(this.option("focusedElement"));
        if (!$itemElement.length) {
            return
        }
        const itemData = this._getItemData($itemElement);
        if (null !== itemData && void 0 !== itemData && itemData.onClick) {
            this._itemEventHandlerByHandler($itemElement, itemData.onClick, {
                event: e
            })
        }
        this._itemClickHandler((0, _extend.extend)({}, e, {
            target: $itemElement.get(0),
            currentTarget: $itemElement.get(0)
        }))
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            selectOnFocus: false,
            loopItemFocus: true,
            items: [],
            itemTemplate: "item",
            onItemRendered: null,
            onItemClick: null,
            onItemHold: null,
            itemHoldTimeout: 750,
            onItemContextMenu: null,
            onFocusedItemChanged: null,
            noDataText: _message.default.format("dxCollectionWidget-noDataText"),
            encodeNoDataText: false,
            dataSource: null,
            _dataController: null,
            _itemAttributes: {},
            itemTemplateProperty: "template",
            focusOnSelectedItem: true,
            focusedElement: null,
            displayExpr: void 0,
            disabledExpr: function(data) {
                return data ? data.disabled : void 0
            },
            visibleExpr: function(data) {
                return data ? data.visible : void 0
            }
        })
    },
    _init: function() {
        this._compileDisplayGetter();
        this._initDataController();
        this.callBase();
        this._cleanRenderedItems();
        this._refreshDataSource()
    },
    _compileDisplayGetter: function() {
        const displayExpr = this.option("displayExpr");
        this._displayGetter = displayExpr ? (0, _data.compileGetter)(this.option("displayExpr")) : void 0
    },
    _initTemplates: function() {
        this._initItemsFromMarkup();
        this._initDefaultItemTemplate();
        this.callBase()
    },
    _getAnonymousTemplateName: function() {
        return "item"
    },
    _initDefaultItemTemplate: function() {
        const fieldsMap = this._getFieldsMap();
        this._templateManager.addDefaultTemplates({
            item: new _bindable_template.BindableTemplate(function($container, data) {
                if ((0, _type.isPlainObject)(data)) {
                    this._prepareDefaultItemTemplate(data, $container)
                } else {
                    if (fieldsMap && (0, _type.isFunction)(fieldsMap.text)) {
                        data = fieldsMap.text(data)
                    }
                    $container.text(String((0, _common.ensureDefined)(data, "")))
                }
            }.bind(this), this._getBindableFields(), this.option("integrationOptions.watchMethod"), fieldsMap)
        })
    },
    _getBindableFields: function() {
        return ["text", "html"]
    },
    _getFieldsMap: function() {
        if (this._displayGetter) {
            return {
                text: this._displayGetter
            }
        }
    },
    _prepareDefaultItemTemplate: function(data, $container) {
        if ((0, _type.isDefined)(data.text)) {
            $container.text(data.text)
        }
        if ((0, _type.isDefined)(data.html)) {
            $container.html(data.html)
        }
    },
    _initItemsFromMarkup: function() {
        const rawItems = (0, _template_manager.findTemplates)(this.$element(), "dxItem");
        if (!rawItems.length || this.option("items").length) {
            return
        }
        const items = rawItems.map((_ref => {
            let {
                element: element,
                options: options
            } = _ref;
            const isTemplateRequired = /\S/.test(element.innerHTML) && !options.template;
            if (isTemplateRequired) {
                options.template = this._prepareItemTemplate(element)
            } else {
                (0, _renderer.default)(element).remove()
            }
            return options
        }));
        this.option("items", items)
    },
    _prepareItemTemplate: function(item) {
        const templateId = "tmpl-" + new _guid.default;
        const $template = (0, _renderer.default)(item).detach().clone().removeAttr("data-options").addClass("dx-template-wrapper");
        this._saveTemplate(templateId, $template);
        return templateId
    },
    _dataSourceOptions: function() {
        return {
            paginate: false
        }
    },
    _cleanRenderedItems: function() {
        this._renderedItemsCount = 0
    },
    _focusTarget: function() {
        return this.$element()
    },
    _focusInHandler: function(e) {
        this.callBase.apply(this, arguments);
        if (!this._isFocusTarget(e.target)) {
            return
        }
        const $focusedElement = (0, _renderer.default)(this.option("focusedElement"));
        if ($focusedElement.length) {
            this._setFocusedItem($focusedElement)
        } else {
            const $activeItem = this._getActiveItem();
            if ($activeItem.length) {
                this.option("focusedElement", (0, _element.getPublicElement)($activeItem))
            }
        }
    },
    _focusOutHandler: function() {
        this.callBase.apply(this, arguments);
        const $target = (0, _renderer.default)(this.option("focusedElement"));
        this._updateFocusedItemState($target, false)
    },
    _findActiveTarget($element) {
        return $element.find(this._activeStateUnit)
    },
    _getActiveItem: function(last) {
        const $focusedElement = (0, _renderer.default)(this.option("focusedElement"));
        if ($focusedElement.length) {
            return $focusedElement
        }
        let index = this.option("focusOnSelectedItem") ? this.option("selectedIndex") : 0;
        const activeElements = this._getActiveElement();
        const lastIndex = activeElements.length - 1;
        if (index < 0) {
            index = last ? lastIndex : 0
        }
        return activeElements.eq(index)
    },
    _moveFocus: function(location) {
        const $items = this._getAvailableItems();
        let $newTarget;
        switch (location) {
            case "pageup":
            case "up":
                $newTarget = this._prevItem($items);
                break;
            case "pagedown":
            case "down":
                $newTarget = this._nextItem($items);
                break;
            case "right":
                $newTarget = this.option("rtlEnabled") ? this._prevItem($items) : this._nextItem($items);
                break;
            case "left":
                $newTarget = this.option("rtlEnabled") ? this._nextItem($items) : this._prevItem($items);
                break;
            case "first":
                $newTarget = $items.first();
                break;
            case "last":
                $newTarget = $items.last();
                break;
            default:
                return false
        }
        if (0 !== $newTarget.length) {
            this.option("focusedElement", (0, _element.getPublicElement)($newTarget))
        }
    },
    _getVisibleItems: function($itemElements) {
        $itemElements = $itemElements || this._itemElements();
        return $itemElements.filter(":visible")
    },
    _getAvailableItems: function($itemElements) {
        return this._getVisibleItems($itemElements)
    },
    _prevItem: function($items) {
        const $target = this._getActiveItem();
        const targetIndex = $items.index($target);
        const $last = $items.last();
        let $item = (0, _renderer.default)($items[targetIndex - 1]);
        const loop = this.option("loopItemFocus");
        if (0 === $item.length && loop) {
            $item = $last
        }
        return $item
    },
    _nextItem: function($items) {
        const $target = this._getActiveItem(true);
        const targetIndex = $items.index($target);
        const $first = $items.first();
        let $item = (0, _renderer.default)($items[targetIndex + 1]);
        const loop = this.option("loopItemFocus");
        if (0 === $item.length && loop) {
            $item = $first
        }
        return $item
    },
    _selectFocusedItem: function($target) {
        this.selectItem($target)
    },
    _updateFocusedItemState: function(target, isFocused, needCleanItemId) {
        const $target = (0, _renderer.default)(target);
        if ($target.length) {
            this._refreshActiveDescendant();
            this._refreshItemId($target, needCleanItemId);
            this._toggleFocusClass(isFocused, $target)
        }
        this._updateParentActiveDescendant()
    },
    _refreshActiveDescendant: function($target) {
        this.setAria("activedescendant", (0, _type.isDefined)(this.option("focusedElement")) ? this.getFocusedItemId() : null, $target)
    },
    _refreshItemId: function($target, needCleanItemId) {
        if (!needCleanItemId && this.option("focusedElement")) {
            this.setAria("id", this.getFocusedItemId(), $target)
        } else {
            this.setAria("id", null, $target)
        }
    },
    _isDisabled: $element => $element && "true" === (0, _renderer.default)($element).attr("aria-disabled"),
    _setFocusedItem: function($target) {
        if (!$target || !$target.length) {
            return
        }
        this._updateFocusedItemState($target, true);
        this.onFocusedItemChanged(this.getFocusedItemId());
        const {
            selectOnFocus: selectOnFocus
        } = this.option();
        const isTargetDisabled = this._isDisabled($target);
        if (selectOnFocus && !isTargetDisabled) {
            this._selectFocusedItem($target)
        }
    },
    _findItemElementByItem: function(item) {
        let result = (0, _renderer.default)();
        const that = this;
        this.itemElements().each((function() {
            const $item = (0, _renderer.default)(this);
            if ($item.data(that._itemDataKey()) === item) {
                result = $item;
                return false
            }
        }));
        return result
    },
    _getIndexByItem: function(item) {
        return this.option("items").indexOf(item)
    },
    _itemOptionChanged: function(item, property, value, oldValue) {
        const $item = this._findItemElementByItem(item);
        if (!$item.length) {
            return
        }
        if (!this.constructor.ItemClass.getInstance($item).setDataField(property, value)) {
            this._refreshItem($item, item)
        }
        const isDisabling = "disabled" === property && value;
        if (isDisabling) {
            this._resetItemFocus($item)
        }
    },
    _resetItemFocus($item) {
        if ($item.is(this.option("focusedElement"))) {
            this.option("focusedElement", null)
        }
    },
    _refreshItem: function($item) {
        const itemData = this._getItemData($item);
        const index = $item.data(this._itemIndexKey());
        this._renderItem(this._renderedItemsCount + index, itemData, null, $item)
    },
    _updateParentActiveDescendant: _common.noop,
    _optionChanged: function(args) {
        if ("items" === args.name) {
            const matches = args.fullName.match(ITEM_PATH_REGEX);
            if (matches && matches.length) {
                const property = matches[matches.length - 1];
                const itemPath = args.fullName.replace("." + property, "");
                const item = this.option(itemPath);
                this._itemOptionChanged(item, property, args.value, args.previousValue);
                return
            }
        }
        switch (args.name) {
            case "items":
            case "_itemAttributes":
            case "itemTemplateProperty":
            case "useItemTextAsTitle":
                this._cleanRenderedItems();
                this._invalidate();
                break;
            case "dataSource":
                this._refreshDataSource();
                this._renderEmptyMessage();
                break;
            case "noDataText":
            case "encodeNoDataText":
                this._renderEmptyMessage();
                break;
            case "itemTemplate":
            case "visibleExpr":
            case "disabledExpr":
                this._invalidate();
                break;
            case "onItemRendered":
                this._createItemRenderAction();
                break;
            case "onItemClick":
            case "selectOnFocus":
            case "loopItemFocus":
            case "focusOnSelectedItem":
                break;
            case "onItemHold":
            case "itemHoldTimeout":
                this._attachHoldEvent();
                break;
            case "onItemContextMenu":
                this._attachContextMenuEvent();
                break;
            case "onFocusedItemChanged":
                this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
                break;
            case "focusedElement":
                this._updateFocusedItemState(args.previousValue, false, true);
                this._setFocusedItem((0, _renderer.default)(args.value));
                break;
            case "displayExpr":
                this._compileDisplayGetter();
                this._initDefaultItemTemplate();
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    _invalidate: function() {
        this.option("focusedElement", null);
        return this.callBase.apply(this, arguments)
    },
    _loadNextPage: function() {
        this._expectNextPageLoading();
        return this._dataController.loadNextPage()
    },
    _expectNextPageLoading: function() {
        this._startIndexForAppendedItems = 0
    },
    _expectLastItemLoading: function() {
        this._startIndexForAppendedItems = -1
    },
    _forgetNextPageLoading: function() {
        this._startIndexForAppendedItems = null
    },
    _dataSourceChangedHandler: function(newItems) {
        const items = this.option("items");
        if (this._initialized && items && this._shouldAppendItems()) {
            this._renderedItemsCount = items.length;
            if (!this._isLastPage() || -1 !== this._startIndexForAppendedItems) {
                this.option().items = items.concat(newItems.slice(this._startIndexForAppendedItems))
            }
            this._forgetNextPageLoading();
            this._refreshContent()
        } else {
            this.option("items", newItems.slice())
        }
    },
    _refreshContent: function() {
        this._prepareContent();
        this._renderContent()
    },
    _dataSourceLoadErrorHandler: function() {
        this._forgetNextPageLoading();
        this.option("items", this.option("items"))
    },
    _shouldAppendItems: function() {
        return null != this._startIndexForAppendedItems && this._allowDynamicItemsAppend()
    },
    _allowDynamicItemsAppend: function() {
        return false
    },
    _clean: function() {
        this._cleanFocusState();
        this._cleanItemContainer();
        this._inkRipple && delete this._inkRipple;
        this._resetActiveState()
    },
    _cleanItemContainer: function() {
        (0, _renderer.default)(this._itemContainer()).empty()
    },
    _dispose: function() {
        this.callBase();
        clearTimeout(this._itemFocusTimeout)
    },
    _refresh: function() {
        this._cleanRenderedItems();
        this.callBase.apply(this, arguments)
    },
    _itemContainer: function() {
        return this.$element()
    },
    _itemClass: function() {
        return ITEM_CLASS
    },
    _itemContentClass: function() {
        return this._itemClass() + "-content"
    },
    _selectedItemClass: function() {
        return "dx-item-selected"
    },
    _itemResponseWaitClass: function() {
        return "dx-item-response-wait"
    },
    _itemSelector: function() {
        return "." + this._itemClass()
    },
    _itemDataKey: function() {
        return "dxItemData"
    },
    _itemIndexKey: function() {
        return "dxItemIndex"
    },
    _itemElements: function() {
        return this._itemContainer().find(this._itemSelector())
    },
    _initMarkup: function() {
        this.callBase();
        this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
        this.$element().addClass("dx-collection");
        this._prepareContent()
    },
    _prepareContent: (0, _common.deferRenderer)((function() {
        this._renderContentImpl()
    })),
    _renderContent: function() {
        this._fireContentReadyAction()
    },
    _render: function() {
        this.callBase();
        this._attachClickEvent();
        this._attachHoldEvent();
        this._attachContextMenuEvent()
    },
    _getPointerEvent: () => _pointer.default.down,
    _attachClickEvent() {
        const itemSelector = this._itemSelector();
        const pointerEvent = this._getPointerEvent();
        const clickEventNamespace = (0, _index.addNamespace)(_click.name, this.NAME);
        const pointerEventNamespace = (0, _index.addNamespace)(pointerEvent, this.NAME);
        const pointerAction = new _action.default((args => {
            const {
                event: event
            } = args;
            this._itemPointerDownHandler(event)
        }));
        _events_engine.default.off(this._itemContainer(), clickEventNamespace, itemSelector);
        _events_engine.default.off(this._itemContainer(), pointerEventNamespace, itemSelector);
        _events_engine.default.on(this._itemContainer(), clickEventNamespace, itemSelector, (e => this._itemClickHandler(e)));
        _events_engine.default.on(this._itemContainer(), pointerEventNamespace, itemSelector, (e => {
            pointerAction.execute({
                element: (0, _renderer.default)(e.target),
                event: e
            })
        }))
    },
    _itemClickHandler: function(e, args, config) {
        this._itemDXEventHandler(e, "onItemClick", args, config)
    },
    _itemPointerDownHandler: function(e) {
        if (!this.option("focusStateEnabled")) {
            return
        }
        this._itemFocusHandler = function() {
            clearTimeout(this._itemFocusTimeout);
            this._itemFocusHandler = null;
            if (e.isDefaultPrevented()) {
                return
            }
            const $target = (0, _renderer.default)(e.target);
            const $closestItem = $target.closest(this._itemElements());
            const $closestFocusable = this._closestFocusable($target);
            if ($closestItem.length && this._isFocusTarget(null === $closestFocusable || void 0 === $closestFocusable ? void 0 : $closestFocusable.get(0))) {
                this.option("focusedElement", (0, _element.getPublicElement)($closestItem))
            }
        }.bind(this);
        this._itemFocusTimeout = setTimeout(this._forcePointerDownFocus.bind(this))
    },
    _closestFocusable: function($target) {
        if ($target.is(_selectors.focusable)) {
            return $target
        } else {
            $target = $target.parent();
            while ($target.length && !_dom_adapter.default.isDocument($target.get(0)) && !_dom_adapter.default.isDocumentFragment($target.get(0))) {
                if ($target.is(_selectors.focusable)) {
                    return $target
                }
                $target = $target.parent()
            }
        }
    },
    _forcePointerDownFocus: function() {
        this._itemFocusHandler && this._itemFocusHandler()
    },
    _updateFocusState: function() {
        this.callBase.apply(this, arguments);
        this._forcePointerDownFocus()
    },
    _attachHoldEvent: function() {
        const $itemContainer = this._itemContainer();
        const itemSelector = this._itemSelector();
        const eventName = (0, _index.addNamespace)(_hold.default.name, this.NAME);
        _events_engine.default.off($itemContainer, eventName, itemSelector);
        _events_engine.default.on($itemContainer, eventName, itemSelector, {
            timeout: this._getHoldTimeout()
        }, this._itemHoldHandler.bind(this))
    },
    _getHoldTimeout: function() {
        return this.option("itemHoldTimeout")
    },
    _shouldFireHoldEvent: function() {
        return this.hasActionSubscription("onItemHold")
    },
    _itemHoldHandler: function(e) {
        if (this._shouldFireHoldEvent()) {
            this._itemDXEventHandler(e, "onItemHold")
        } else {
            e.cancel = true
        }
    },
    _attachContextMenuEvent: function() {
        const $itemContainer = this._itemContainer();
        const itemSelector = this._itemSelector();
        const eventName = (0, _index.addNamespace)(_contextmenu.name, this.NAME);
        _events_engine.default.off($itemContainer, eventName, itemSelector);
        _events_engine.default.on($itemContainer, eventName, itemSelector, this._itemContextMenuHandler.bind(this))
    },
    _shouldFireContextMenuEvent: function() {
        return this.hasActionSubscription("onItemContextMenu")
    },
    _itemContextMenuHandler: function(e) {
        if (this._shouldFireContextMenuEvent()) {
            this._itemDXEventHandler(e, "onItemContextMenu")
        } else {
            e.cancel = true
        }
    },
    _renderContentImpl: function() {
        const items = this.option("items") || [];
        if (this._renderedItemsCount) {
            this._renderItems(items.slice(this._renderedItemsCount))
        } else {
            this._renderItems(items)
        }
    },
    _renderItems: function(items) {
        if (items.length) {
            (0, _iterator.each)(items, function(index, itemData) {
                this._renderItem(this._renderedItemsCount + index, itemData)
            }.bind(this))
        }
        this._renderEmptyMessage()
    },
    _getItemsContainer: function() {
        return this._itemContainer()
    },
    _setAttributes($element) {
        const attributes = _extends({}, this.option("_itemAttributes"));
        const {
            class: customClassValue
        } = attributes;
        if (customClassValue) {
            const currentClassValue = $element.get(0).className;
            attributes.class = [currentClassValue, customClassValue].join(" ")
        }
        $element.attr(attributes)
    },
    _renderItem: function(index, itemData, $container, $itemToReplace) {
        const itemIndex = (null === index || void 0 === index ? void 0 : index.item) ?? index;
        $container = $container || this._getItemsContainer();
        const $itemFrame = this._renderItemFrame(itemIndex, itemData, $container, $itemToReplace);
        this._setElementData($itemFrame, itemData, itemIndex);
        this._setAttributes($itemFrame);
        this._attachItemClickEvent(itemData, $itemFrame);
        const $itemContent = this._getItemContent($itemFrame);
        const renderContentPromise = this._renderItemContent({
            index: itemIndex,
            itemData: itemData,
            container: (0, _element.getPublicElement)($itemContent),
            contentClass: this._itemContentClass(),
            defaultTemplateName: this.option("itemTemplate")
        });
        const that = this;
        (0, _deferred.when)(renderContentPromise).done((function($itemContent) {
            that._postprocessRenderItem({
                itemElement: $itemFrame,
                itemContent: $itemContent,
                itemData: itemData,
                itemIndex: itemIndex
            });
            that._executeItemRenderAction(index, itemData, (0, _element.getPublicElement)($itemFrame))
        }));
        return $itemFrame
    },
    _getItemContent: function($itemFrame) {
        const $itemContent = $itemFrame.find(".dx-item-content-placeholder");
        $itemContent.removeClass("dx-item-content-placeholder");
        return $itemContent
    },
    _attachItemClickEvent: function(itemData, $itemElement) {
        if (!itemData || !itemData.onClick) {
            return
        }
        _events_engine.default.on($itemElement, _click.name, function(e) {
            this._itemEventHandlerByHandler($itemElement, itemData.onClick, {
                event: e
            })
        }.bind(this))
    },
    _renderItemContent: function(args) {
        const itemTemplateName = this._getItemTemplateName(args);
        const itemTemplate = this._getTemplate(itemTemplateName);
        this._addItemContentClasses(args);
        const $templateResult = (0, _renderer.default)(this._createItemByTemplate(itemTemplate, args));
        if (!$templateResult.hasClass("dx-template-wrapper")) {
            return args.container
        }
        return this._renderItemContentByNode(args, $templateResult)
    },
    _renderItemContentByNode: function(args, $node) {
        (0, _renderer.default)(args.container).replaceWith($node);
        args.container = (0, _element.getPublicElement)($node);
        this._addItemContentClasses(args);
        return $node
    },
    _addItemContentClasses: function(args) {
        const classes = [ITEM_CLASS + "-content", args.contentClass];
        (0, _renderer.default)(args.container).addClass(classes.join(" "))
    },
    _appendItemToContainer: function($container, $itemFrame, index) {
        $itemFrame.appendTo($container)
    },
    _renderItemFrame: function(index, itemData, $container, $itemToReplace) {
        const $itemFrame = (0, _renderer.default)("<div>");
        new this.constructor.ItemClass($itemFrame, this._itemOptions(), itemData || {});
        if ($itemToReplace && $itemToReplace.length) {
            $itemToReplace.replaceWith($itemFrame)
        } else {
            this._appendItemToContainer.call(this, $container, $itemFrame, index)
        }
        if (this.option("useItemTextAsTitle")) {
            const displayValue = this._displayGetter ? this._displayGetter(itemData) : itemData;
            $itemFrame.attr("title", displayValue)
        }
        return $itemFrame
    },
    _itemOptions: function() {
        const that = this;
        return {
            watchMethod: function() {
                return that.option("integrationOptions.watchMethod")
            },
            owner: that,
            fieldGetter: function(field) {
                const expr = that.option(field + "Expr");
                const getter = (0, _data.compileGetter)(expr);
                return getter
            }
        }
    },
    _postprocessRenderItem: _common.noop,
    _executeItemRenderAction: function(index, itemData, itemElement) {
        this._getItemRenderAction()({
            itemElement: itemElement,
            itemIndex: index,
            itemData: itemData
        })
    },
    _setElementData: function(element, data, index) {
        element.addClass([ITEM_CLASS, this._itemClass()].join(" ")).data(this._itemDataKey(), data).data(this._itemIndexKey(), index)
    },
    _createItemRenderAction: function() {
        return this._itemRenderAction = this._createActionByOption("onItemRendered", {
            element: this.element(),
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering"
        })
    },
    _getItemRenderAction: function() {
        return this._itemRenderAction || this._createItemRenderAction()
    },
    _getItemTemplateName: function(args) {
        const data = args.itemData;
        const templateProperty = args.templateProperty || this.option("itemTemplateProperty");
        const template = data && data[templateProperty];
        return template || args.defaultTemplateName
    },
    _createItemByTemplate: function(itemTemplate, renderArgs) {
        return itemTemplate.render({
            model: renderArgs.itemData,
            container: renderArgs.container,
            index: renderArgs.index,
            onRendered: this._onItemTemplateRendered(itemTemplate, renderArgs)
        })
    },
    _onItemTemplateRendered: function() {
        return _common.noop
    },
    _emptyMessageContainer: function() {
        return this._itemContainer()
    },
    _renderEmptyMessage: function(items) {
        items = items || this.option("items");
        const noDataText = this.option("noDataText");
        const hideNoData = !noDataText || items && items.length || this._dataController.isLoading();
        if (hideNoData && this._$noData) {
            this._$noData.remove();
            this._$noData = null;
            this.setAria("label", void 0)
        }
        if (!hideNoData) {
            this._$noData = this._$noData || (0, _renderer.default)("<div>").addClass("dx-empty-message");
            this._$noData.appendTo(this._emptyMessageContainer());
            if (this.option("encodeNoDataText")) {
                this._$noData.text(noDataText)
            } else {
                this._$noData.html(noDataText)
            }
        }
        this.$element().toggleClass(EMPTY_COLLECTION, !hideNoData)
    },
    _itemDXEventHandler: function(dxEvent, handlerOptionName, actionArgs, actionConfig) {
        this._itemEventHandler(dxEvent.target, handlerOptionName, (0, _extend.extend)(actionArgs, {
            event: dxEvent
        }), actionConfig)
    },
    _itemEventHandler: function(initiator, handlerOptionName, actionArgs, actionConfig) {
        const action = this._createActionByOption(handlerOptionName, (0, _extend.extend)({
            validatingTargetName: "itemElement"
        }, actionConfig));
        return this._itemEventHandlerImpl(initiator, action, actionArgs)
    },
    _itemEventHandlerByHandler: function(initiator, handler, actionArgs, actionConfig) {
        const action = this._createAction(handler, (0, _extend.extend)({
            validatingTargetName: "itemElement"
        }, actionConfig));
        return this._itemEventHandlerImpl(initiator, action, actionArgs)
    },
    _itemEventHandlerImpl: function(initiator, action, actionArgs) {
        const $itemElement = this._closestItemElement((0, _renderer.default)(initiator));
        const args = (0, _extend.extend)({}, actionArgs);
        return action((0, _extend.extend)(actionArgs, this._extendActionArgs($itemElement), args))
    },
    _extendActionArgs: function($itemElement) {
        return {
            itemElement: (0, _element.getPublicElement)($itemElement),
            itemIndex: this._itemElements().index($itemElement),
            itemData: this._getItemData($itemElement)
        }
    },
    _closestItemElement: function($element) {
        return (0, _renderer.default)($element).closest(this._itemSelector())
    },
    _getItemData: function(itemElement) {
        return (0, _renderer.default)(itemElement).data(this._itemDataKey())
    },
    _getSummaryItemsSize(dimension, items, includeMargin) {
        let result = 0;
        if (items) {
            (0, _iterator.each)(items, (function(_, item) {
                if ("width" === dimension) {
                    result += (0, _size.getOuterWidth)(item, includeMargin || false)
                } else if ("height" === dimension) {
                    result += (0, _size.getOuterHeight)(item, includeMargin || false)
                }
            }))
        }
        return result
    },
    getFocusedItemId: function() {
        if (!this._focusedItemId) {
            this._focusedItemId = "dx-" + new _guid.default
        }
        return this._focusedItemId
    },
    itemElements: function() {
        return this._itemElements()
    },
    itemsContainer: function() {
        return this._itemContainer()
    }
}).include(_data_helper.default);
CollectionWidget.ItemClass = _item.default;
var _default = exports.default = CollectionWidget;
module.exports = exports.default;
module.exports.default = exports.default;
