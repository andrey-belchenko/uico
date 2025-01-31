/**
 * DevExtreme (esm/__internal/ui/date_box/m_date_view_roller.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import fx from "../../../animation/fx";
import {
    resetPosition
} from "../../../animation/translator";
import registerComponent from "../../../core/component_registrator";
import devices from "../../../core/devices";
import $ from "../../../core/renderer";
import {
    extend
} from "../../../core/utils/extend";
import {
    each
} from "../../../core/utils/iterator";
import {
    getHeight
} from "../../../core/utils/size";
import {
    name as clickEventName
} from "../../../events/click";
import eventsEngine from "../../../events/core/events_engine";
import {
    addNamespace
} from "../../../events/utils/index";
import {
    convertToLocation
} from "../../../renovation/ui/scroll_view/utils/convert_location";
import Scrollable from "../scroll_view/m_scrollable";
const DATEVIEW_ROLLER_CLASS = "dx-dateviewroller";
const DATEVIEW_ROLLER_ACTIVE_CLASS = "dx-state-active";
const DATEVIEW_ROLLER_CURRENT_CLASS = "dx-dateviewroller-current";
const DATEVIEW_ROLLER_ITEM_CLASS = "dx-dateview-item";
const DATEVIEW_ROLLER_ITEM_SELECTED_CLASS = "dx-dateview-item-selected";
const DATEVIEW_ROLLER_ITEM_SELECTED_FRAME_CLASS = "dx-dateview-item-selected-frame";
const DATEVIEW_ROLLER_ITEM_SELECTED_BORDER_CLASS = "dx-dateview-item-selected-border";
class DateViewRoller extends Scrollable {
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            showScrollbar: "never",
            useNative: false,
            selectedIndex: 0,
            bounceEnabled: false,
            items: [],
            showOnClick: false,
            onClick: null,
            onSelectedIndexChanged: null,
            scrollByContent: true
        })
    }
    _init() {
        super._init();
        this.option("onVisibilityChange", this._visibilityChangedHandler.bind(this));
        this.option("onEnd", this._endActionHandler.bind(this))
    }
    _render() {
        super._render();
        this._renderSelectedItemFrame();
        this.$element().addClass("dx-dateviewroller");
        this._renderContainerClick();
        this._renderItems();
        this._renderSelectedValue();
        this._renderItemsClick();
        this._renderWheelEvent();
        this._renderSelectedIndexChanged()
    }
    _renderSelectedIndexChanged() {
        this._selectedIndexChanged = this._createActionByOption("onSelectedIndexChanged")
    }
    _renderWheelEvent() {
        eventsEngine.on($(this.container()), "dxmousewheel", (e => {
            this._isWheelScrolled = true
        }))
    }
    _renderContainerClick() {
        if (!this.option("showOnClick")) {
            return
        }
        const eventName = addNamespace(clickEventName, this.NAME);
        const clickAction = this._createActionByOption("onClick");
        eventsEngine.off($(this.container()), eventName);
        eventsEngine.on($(this.container()), eventName, (e => {
            clickAction({
                event: e
            })
        }))
    }
    _renderItems() {
        const items = this.option("items") || [];
        let $items = $();
        $(this.content()).empty();
        items.forEach((item => {
            $items = $items.add($("<div>").addClass("dx-dateview-item").append(item))
        }));
        $(this.content()).append($items);
        this._$items = $items;
        this.update()
    }
    _renderSelectedItemFrame() {
        $("<div>").addClass("dx-dateview-item-selected-frame").append($("<div>").addClass("dx-dateview-item-selected-border")).appendTo($(this.container()))
    }
    _renderSelectedValue(selectedIndex) {
        const index = this._fitIndex(selectedIndex ?? this.option("selectedIndex"));
        this._moveTo({
            top: this._getItemPosition(index)
        });
        this._renderActiveStateItem()
    }
    _fitIndex(index) {
        const items = this.option("items") || [];
        const itemCount = items.length;
        if (index >= itemCount) {
            return itemCount - 1
        }
        if (index < 0) {
            return 0
        }
        return index
    }
    _getItemPosition(index) {
        return Math.round(this._itemHeight() * index)
    }
    _renderItemsClick() {
        const itemSelector = this._getItemSelector();
        const eventName = addNamespace(clickEventName, this.NAME);
        eventsEngine.off(this.$element(), eventName, itemSelector);
        eventsEngine.on(this.$element(), eventName, itemSelector, this._itemClickHandler.bind(this))
    }
    _getItemSelector() {
        return ".dx-dateview-item"
    }
    _itemClickHandler(e) {
        this.option("selectedIndex", this._itemElementIndex(e.currentTarget))
    }
    _itemElementIndex(itemElement) {
        return this._itemElements().index(itemElement)
    }
    _itemElements() {
        return this.$element().find(this._getItemSelector())
    }
    _renderActiveStateItem() {
        const selectedIndex = this.option("selectedIndex");
        each(this._$items, (function(index) {
            $(this).toggleClass("dx-dateview-item-selected", selectedIndex === index)
        }))
    }
    _shouldScrollToNeighborItem() {
        return "desktop" === devices.real().deviceType && this._isWheelScrolled
    }
    _moveTo(targetLocation) {
        const {
            top: top,
            left: left
        } = convertToLocation(targetLocation);
        const location = this.scrollOffset();
        const delta = {
            x: location.left - left,
            y: location.top - top
        };
        if (this._isVisible() && (delta.x || delta.y)) {
            this._prepareDirections(true);
            if (this._animation && !this._shouldScrollToNeighborItem()) {
                const that = this;
                fx.stop($(this.content()));
                fx.animate($(this.content()), {
                    duration: 200,
                    type: "slide",
                    to: {
                        top: Math.floor(delta.y)
                    },
                    complete() {
                        resetPosition($(that.content()));
                        that.handleMove({
                            delta: delta
                        })
                    }
                });
                delete this._animation
            } else {
                this.handleMove({
                    delta: delta
                })
            }
        }
    }
    _validate(e) {
        return this._moveIsAllowed(e)
    }
    _fitSelectedIndexInRange(index) {
        const itemsCount = this.option("items").length;
        return Math.max(Math.min(index, itemsCount - 1), 0)
    }
    _isInNullNeighborhood(x) {
        return -.1 <= x && x <= .1
    }
    _getSelectedIndexAfterScroll(currentSelectedIndex) {
        const locationTop = this.scrollOffset().top;
        const currentSelectedIndexPosition = currentSelectedIndex * this._itemHeight();
        const dy = locationTop - currentSelectedIndexPosition;
        if (this._isInNullNeighborhood(dy)) {
            return currentSelectedIndex
        }
        const direction = dy > 0 ? 1 : -1;
        const newSelectedIndex = this._fitSelectedIndexInRange(currentSelectedIndex + direction);
        return newSelectedIndex
    }
    _getNewSelectedIndex(currentSelectedIndex) {
        if (this._shouldScrollToNeighborItem()) {
            return this._getSelectedIndexAfterScroll(currentSelectedIndex)
        }
        this._animation = true;
        const ratio = this.scrollOffset().top / this._itemHeight();
        return Math.round(ratio)
    }
    _endActionHandler() {
        const currentSelectedIndex = this.option("selectedIndex");
        const newSelectedIndex = this._getNewSelectedIndex(currentSelectedIndex);
        if (newSelectedIndex === currentSelectedIndex) {
            this._renderSelectedValue(newSelectedIndex)
        } else {
            this.option("selectedIndex", newSelectedIndex)
        }
        this._isWheelScrolled = false
    }
    _itemHeight() {
        const $item = this._$items.first();
        return getHeight($item)
    }
    _toggleActive(state) {
        this.$element().toggleClass("dx-state-active", state)
    }
    _isVisible() {
        return $(this.container()).is(":visible")
    }
    _fireSelectedIndexChanged(value, previousValue) {
        this._selectedIndexChanged({
            value: value,
            previousValue: previousValue,
            event: void 0
        })
    }
    _visibilityChanged(visible) {
        super._visibilityChanged(visible);
        this._visibilityChangedHandler(visible)
    }
    _visibilityChangedHandler(visible) {
        if (visible) {
            this._visibilityTimer = setTimeout((() => {
                this._renderSelectedValue(this.option("selectedIndex"))
            }))
        }
        this.toggleActiveState(false)
    }
    toggleActiveState(state) {
        this.$element().toggleClass("dx-dateviewroller-current", state)
    }
    _refreshSelectedIndex() {
        const selectedIndex = this.option("selectedIndex");
        const fitIndex = this._fitIndex(selectedIndex);
        if (fitIndex === selectedIndex) {
            this._renderActiveStateItem()
        } else {
            this.option("selectedIndex", fitIndex)
        }
    }
    _optionChanged(args) {
        switch (args.name) {
            case "selectedIndex":
                this._fireSelectedIndexChanged(args.value, args.previousValue);
                this._renderSelectedValue(args.value);
                break;
            case "items":
                this._renderItems();
                this._refreshSelectedIndex();
                break;
            case "onClick":
            case "showOnClick":
                this._renderContainerClick();
                break;
            case "onSelectedIndexChanged":
                this._renderSelectedIndexChanged();
                break;
            default:
                super._optionChanged(args)
        }
    }
    _dispose() {
        clearTimeout(this._visibilityTimer);
        super._dispose()
    }
}
registerComponent("dxDateViewRoller", DateViewRoller);
export default DateViewRoller;
