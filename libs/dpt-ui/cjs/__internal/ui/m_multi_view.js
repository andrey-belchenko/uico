/**
 * DevExtreme (cjs/__internal/ui/m_multi_view.js)
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
var _translator2 = require("../../animation/translator");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _element = require("../../core/element");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _math = require("../../core/utils/math");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _swipeable = _interopRequireDefault(require("../../events/gesture/swipeable"));
var _visibility_change = require("../../events/visibility_change");
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiCollection_widget = _interopRequireDefault(require("../../ui/collection/ui.collection_widget.live_update"));
var _m_multi_view = require("./multi_view/m_multi_view.animation");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const MULTIVIEW_CLASS = "dx-multiview";
const MULTIVIEW_WRAPPER_CLASS = "dx-multiview-wrapper";
const MULTIVIEW_ITEM_CONTAINER_CLASS = "dx-multiview-item-container";
const MULTIVIEW_ITEM_CLASS = "dx-multiview-item";
const MULTIVIEW_ITEM_HIDDEN_CLASS = "dx-multiview-item-hidden";
const MULTIVIEW_ITEM_DATA_KEY = "dxMultiViewItemData";
const MULTIVIEW_ANIMATION_DURATION = 200;
const toNumber = value => +value;
const position = $element => (0, _translator2.locate)($element).left;
const MultiView = _uiCollection_widget.default.inherit({
    _activeStateUnit: ".dx-multiview-item",
    _supportedKeys() {
        return (0, _extend.extend)(this.callBase(), {
            pageUp: _common.noop,
            pageDown: _common.noop
        })
    },
    _getDefaultOptions() {
        return (0, _extend.extend)(this.callBase(), {
            selectedIndex: 0,
            swipeEnabled: true,
            animationEnabled: true,
            loop: false,
            deferRendering: true,
            loopItemFocus: false,
            selectOnFocus: true,
            selectionMode: "single",
            selectionRequired: true,
            selectByClick: false
        })
    },
    _defaultOptionsRules() {
        return this.callBase().concat([{
            device: () => "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator(),
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _itemClass: () => "dx-multiview-item",
    _itemDataKey: () => "dxMultiViewItemData",
    _itemContainer() {
        return this._$itemContainer
    },
    _itemElements() {
        return this._itemContainer().children(this._itemSelector())
    },
    _itemWidth() {
        if (!this._itemWidthValue) {
            this._itemWidthValue = (0, _size.getWidth)(this._$wrapper)
        }
        return this._itemWidthValue
    },
    _clearItemWidthCache() {
        delete this._itemWidthValue
    },
    _itemsCount() {
        return this.option("items").length
    },
    _normalizeIndex(index) {
        const count = this._itemsCount();
        if (index < 0) {
            index += count
        }
        if (index >= count) {
            index -= count
        }
        return index
    },
    _getRTLSignCorrection() {
        return this.option("rtlEnabled") ? -1 : 1
    },
    _init() {
        this.callBase.apply(this, arguments);
        const $element = this.$element();
        $element.addClass("dx-multiview");
        this._$wrapper = (0, _renderer.default)("<div>").addClass("dx-multiview-wrapper");
        this._$wrapper.appendTo($element);
        this._$itemContainer = (0, _renderer.default)("<div>").addClass("dx-multiview-item-container");
        this._$itemContainer.appendTo(this._$wrapper);
        this.option("loopItemFocus", this.option("loop"));
        this._findBoundaryIndices();
        this._initSwipeable()
    },
    _initMarkup() {
        this._deferredItems = [];
        this.callBase();
        const selectedItemIndices = this._getSelectedItemIndices();
        this._updateItemsVisibility(selectedItemIndices[0]);
        this._setElementAria();
        this._setItemsAria()
    },
    _afterItemElementDeleted($item, deletedActionArgs) {
        this.callBase($item, deletedActionArgs);
        if (this._deferredItems) {
            this._deferredItems.splice(deletedActionArgs.itemIndex, 1)
        }
    },
    _beforeItemElementInserted(change) {
        this.callBase.apply(this, arguments);
        if (this._deferredItems) {
            this._deferredItems.splice(change.index, 0, null)
        }
    },
    _executeItemRenderAction(index, itemData, itemElement) {
        index = (this.option("items") || []).indexOf(itemData);
        this.callBase(index, itemData, itemElement)
    },
    _renderItemContent(args) {
        const renderContentDeferred = (0, _deferred.Deferred)();
        const that = this;
        const {
            callBase: callBase
        } = this;
        const deferred = (0, _deferred.Deferred)();
        deferred.done((() => {
            const $itemContent = callBase.call(that, args);
            renderContentDeferred.resolve($itemContent)
        }));
        this._deferredItems[args.index] = deferred;
        this.option("deferRendering") || deferred.resolve();
        return renderContentDeferred.promise()
    },
    _render() {
        this.callBase();
        (0, _common.deferRender)((() => {
            const selectedItemIndices = this._getSelectedItemIndices();
            this._updateItems(selectedItemIndices[0])
        }))
    },
    _getElementAria: () => ({
        role: "group",
        roledescription: _message.default.format("dxMultiView-elementAriaRoleDescription"),
        label: _message.default.format("dxMultiView-elementAriaLabel")
    }),
    _setElementAria() {
        const aria = this._getElementAria();
        this.setAria(aria, this.$element())
    },
    _setItemsAria() {
        const $itemElements = this._itemElements();
        const itemsCount = this._itemsCount();
        $itemElements.each(((itemIndex, item) => {
            const aria = this._getItemAria({
                itemIndex: itemIndex,
                itemsCount: itemsCount
            });
            this.setAria(aria, (0, _renderer.default)(item))
        }))
    },
    _getItemAria(_ref) {
        let {
            itemIndex: itemIndex,
            itemsCount: itemsCount
        } = _ref;
        const aria = {
            role: "group",
            roledescription: _message.default.format("dxMultiView-itemAriaRoleDescription"),
            label: _message.default.format("dxMultiView-itemAriaLabel", itemIndex + 1, itemsCount)
        };
        return aria
    },
    _updateItems(selectedIndex, newIndex) {
        this._updateItemsPosition(selectedIndex, newIndex);
        this._updateItemsVisibility(selectedIndex, newIndex)
    },
    _modifyByChanges() {
        this.callBase.apply(this, arguments);
        const selectedItemIndices = this._getSelectedItemIndices();
        this._updateItemsVisibility(selectedItemIndices[0])
    },
    _updateItemsPosition(selectedIndex, newIndex) {
        const $itemElements = this._itemElements();
        const positionSign = (0, _type.isDefined)(newIndex) ? -this._animationDirection(newIndex, selectedIndex) : void 0;
        const $selectedItem = $itemElements.eq(selectedIndex);
        _m_multi_view._translator.move($selectedItem, 0);
        if ((0, _type.isDefined)(newIndex)) {
            _m_multi_view._translator.move($itemElements.eq(newIndex), 100 * positionSign + "%")
        }
    },
    _updateItemsVisibility(selectedIndex, newIndex) {
        const $itemElements = this._itemElements();
        $itemElements.each(((itemIndex, item) => {
            const $item = (0, _renderer.default)(item);
            const isHidden = itemIndex !== selectedIndex && itemIndex !== newIndex;
            if (!isHidden) {
                this._renderSpecificItem(itemIndex)
            }
            $item.toggleClass("dx-multiview-item-hidden", isHidden);
            this.setAria("hidden", isHidden || void 0, $item)
        }))
    },
    _renderSpecificItem(index) {
        const $item = this._itemElements().eq(index);
        const hasItemContent = $item.find(this._itemContentClass()).length > 0;
        if ((0, _type.isDefined)(index) && !hasItemContent) {
            this._deferredItems[index].resolve();
            (0, _visibility_change.triggerResizeEvent)($item)
        }
    },
    _refreshItem($item, item) {
        this.callBase($item, item);
        this._updateItemsVisibility(this.option("selectedIndex"))
    },
    _setAriaSelectionAttribute: _common.noop,
    _updateSelection(addedSelection, removedSelection) {
        const newIndex = addedSelection[0];
        const prevIndex = removedSelection[0];
        _m_multi_view.animation.complete(this._$itemContainer);
        this._updateItems(prevIndex, newIndex);
        const animationDirection = this._animationDirection(newIndex, prevIndex);
        this._animateItemContainer(animationDirection * this._itemWidth(), (() => {
            _m_multi_view._translator.move(this._$itemContainer, 0);
            this._updateItems(newIndex);
            (0, _size.getWidth)(this._$itemContainer)
        }))
    },
    _animateItemContainer(position, completeCallback) {
        const duration = this.option("animationEnabled") ? 200 : 0;
        _m_multi_view.animation.moveTo(this._$itemContainer, position, duration, completeCallback)
    },
    _animationDirection(newIndex, prevIndex) {
        const containerPosition = position(this._$itemContainer);
        const indexDifference = (prevIndex - newIndex) * this._getRTLSignCorrection() * this._getItemFocusLoopSignCorrection();
        const isSwipePresent = 0 !== containerPosition;
        const directionSignVariable = isSwipePresent ? containerPosition : indexDifference;
        return (0, _math.sign)(directionSignVariable)
    },
    _getSwipeDisabledState() {
        return !this.option("swipeEnabled") || this._itemsCount() <= 1
    },
    _initSwipeable() {
        this._createComponent(this.$element(), _swipeable.default, {
            disabled: this._getSwipeDisabledState(),
            elastic: false,
            itemSizeFunc: this._itemWidth.bind(this),
            onStart: args => this._swipeStartHandler(args.event),
            onUpdated: args => this._swipeUpdateHandler(args.event),
            onEnd: args => this._swipeEndHandler(args.event)
        })
    },
    _findBoundaryIndices() {
        const items = this.option("items");
        let firstIndex;
        let lastIndex;
        items.forEach(((item, index) => {
            const isDisabled = Boolean(null === item || void 0 === item ? void 0 : item.disabled);
            if (!isDisabled) {
                firstIndex ?? (firstIndex = index);
                lastIndex = index
            }
        }));
        this._boundaryIndices = {
            firstAvailableIndex: firstIndex ?? 0,
            lastAvailableIndex: lastIndex ?? items.length - 1,
            firstTrueIndex: 0,
            lastTrueIndex: items.length - 1
        }
    },
    _swipeStartHandler(e) {
        _m_multi_view.animation.complete(this._$itemContainer);
        const selectedIndex = this.option("selectedIndex");
        const loop = this.option("loop");
        const {
            firstAvailableIndex: firstAvailableIndex,
            lastAvailableIndex: lastAvailableIndex
        } = this._boundaryIndices;
        const rtl = this.option("rtlEnabled");
        e.maxLeftOffset = toNumber(loop || (rtl ? selectedIndex > firstAvailableIndex : selectedIndex < lastAvailableIndex));
        e.maxRightOffset = toNumber(loop || (rtl ? selectedIndex < lastAvailableIndex : selectedIndex > firstAvailableIndex));
        this._swipeDirection = null
    },
    _swipeUpdateHandler(e) {
        const {
            offset: offset
        } = e;
        const swipeDirection = (0, _math.sign)(offset) * this._getRTLSignCorrection();
        _m_multi_view._translator.move(this._$itemContainer, offset * this._itemWidth());
        if (swipeDirection !== this._swipeDirection) {
            this._swipeDirection = swipeDirection;
            const selectedIndex = this.option("selectedIndex");
            const newIndex = this._normalizeIndex(selectedIndex - swipeDirection);
            this._updateItems(selectedIndex, newIndex)
        }
    },
    _findNextAvailableIndex(index, offset) {
        const {
            items: items,
            loop: loop
        } = this.option();
        const {
            firstAvailableIndex: firstAvailableIndex,
            lastAvailableIndex: lastAvailableIndex,
            firstTrueIndex: firstTrueIndex,
            lastTrueIndex: lastTrueIndex
        } = this._boundaryIndices;
        const isFirstActive = [firstTrueIndex, firstAvailableIndex].includes(index);
        const isLastActive = [lastTrueIndex, lastAvailableIndex].includes(index);
        if (loop) {
            if (isFirstActive && offset < 0) {
                return lastAvailableIndex
            }
            if (isLastActive && offset > 0) {
                return firstAvailableIndex
            }
        }
        for (let i = index + offset; i >= firstAvailableIndex && i <= lastAvailableIndex; i += offset) {
            const isDisabled = Boolean(items[i].disabled);
            if (!isDisabled) {
                return i
            }
        }
        return index
    },
    _swipeEndHandler(e) {
        const targetOffset = e.targetOffset * this._getRTLSignCorrection();
        if (targetOffset) {
            const newSelectedIndex = this._findNextAvailableIndex(this.option("selectedIndex"), -targetOffset);
            this.option("selectedIndex", newSelectedIndex);
            const $selectedElement = this.itemElements().filter(".dx-item-selected");
            this.option("focusStateEnabled") && this.option("focusedElement", (0, _element.getPublicElement)($selectedElement))
        } else {
            this._animateItemContainer(0, _common.noop)
        }
    },
    _getItemFocusLoopSignCorrection() {
        return this._itemFocusLooped ? -1 : 1
    },
    _moveFocus() {
        this.callBase.apply(this, arguments);
        this._itemFocusLooped = false
    },
    _prevItem($items) {
        const $result = this.callBase.apply(this, arguments);
        this._itemFocusLooped = $result.is($items.last());
        return $result
    },
    _nextItem($items) {
        const $result = this.callBase.apply(this, arguments);
        this._itemFocusLooped = $result.is($items.first());
        return $result
    },
    _dimensionChanged() {
        this._clearItemWidthCache()
    },
    _visibilityChanged(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    },
    _updateSwipeDisabledState() {
        const disabled = this._getSwipeDisabledState();
        _swipeable.default.getInstance(this.$element()).option("disabled", disabled)
    },
    _dispose() {
        delete this._boundaryIndices;
        this.callBase()
    },
    _optionChanged(args) {
        const {
            value: value
        } = args;
        switch (args.name) {
            case "loop":
                this.option("loopItemFocus", value);
                break;
            case "animationEnabled":
                break;
            case "swipeEnabled":
                this._updateSwipeDisabledState();
                break;
            case "deferRendering":
                this._invalidate();
                break;
            case "items":
                this._updateSwipeDisabledState();
                this._findBoundaryIndices();
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)("dxMultiView", MultiView);
var _default = exports.default = MultiView;
