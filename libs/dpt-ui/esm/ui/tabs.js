/**
 * DevExtreme (esm/ui/tabs.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWidth,
    getHeight,
    getOuterWidth
} from "../core/utils/size";
import $ from "../core/renderer";
import eventsEngine from "../events/core/events_engine";
import devices from "../core/devices";
import registerComponent from "../core/component_registrator";
import Button from "./button";
import {
    render
} from "./widget/utils.ink_ripple";
import {
    addNamespace
} from "../events/utils/index";
import {
    extend
} from "../core/utils/extend";
import {
    isPlainObject,
    isDefined
} from "../core/utils/type";
import pointerEvents from "../events/pointer";
import {
    each
} from "../core/utils/iterator";
import TabsItem from "./tabs/item";
import {
    TABS_EXPANDED_CLASS
} from "./tabs/constants";
import {
    isMaterial,
    isFluent,
    current as currentTheme
} from "./themes";
import holdEvent from "../events/hold";
import Scrollable from "./scroll_view/ui.scrollable";
import {
    default as CollectionWidget
} from "./collection/ui.collection_widget.live_update";
import {
    getImageContainer
} from "../core/utils/icon";
import {
    BindableTemplate
} from "../core/templates/bindable_template";
import {
    Deferred,
    when
} from "../core/utils/deferred";
import {
    isReachedLeft,
    isReachedRight,
    isReachedTop,
    isReachedBottom
} from "../renovation/ui/scroll_view/utils/get_boundary_props";
import {
    getScrollLeftMax
} from "../renovation/ui/scroll_view/utils/get_scroll_left_max";
import {
    hasWindow
} from "../core/utils/window";
const TABS_CLASS = "dx-tabs";
const TABS_WRAPPER_CLASS = "dx-tabs-wrapper";
const TABS_STRETCHED_CLASS = "dx-tabs-stretched";
const TABS_SCROLLABLE_CLASS = "dx-tabs-scrollable";
const TABS_NAV_BUTTONS_CLASS = "dx-tabs-nav-buttons";
const OVERFLOW_HIDDEN_CLASS = "dx-overflow-hidden";
const TABS_ITEM_CLASS = "dx-tab";
const TABS_ITEM_SELECTED_CLASS = "dx-tab-selected";
const TABS_SCROLLING_ENABLED_CLASS = "dx-tabs-scrolling-enabled";
const TABS_NAV_BUTTON_CLASS = "dx-tabs-nav-button";
const TABS_LEFT_NAV_BUTTON_CLASS = "dx-tabs-nav-button-left";
const TABS_RIGHT_NAV_BUTTON_CLASS = "dx-tabs-nav-button-right";
const TABS_ITEM_TEXT_CLASS = "dx-tab-text";
const TABS_ITEM_TEXT_SPAN_CLASS = "dx-tab-text-span";
const TABS_ITEM_TEXT_SPAN_PSEUDO_CLASS = "dx-tab-text-span-pseudo";
const STATE_DISABLED_CLASS = "dx-state-disabled";
const FOCUSED_DISABLED_NEXT_TAB_CLASS = "dx-focused-disabled-next-tab";
const FOCUSED_DISABLED_PREV_TAB_CLASS = "dx-focused-disabled-prev-tab";
const TABS_ORIENTATION_CLASS = {
    vertical: "dx-tabs-vertical",
    horizontal: "dx-tabs-horizontal"
};
const INDICATOR_POSITION_CLASS = {
    top: "dx-tab-indicator-position-top",
    right: "dx-tab-indicator-position-right",
    bottom: "dx-tab-indicator-position-bottom",
    left: "dx-tab-indicator-position-left"
};
const TABS_ICON_POSITION_CLASS = {
    top: "dx-tabs-icon-position-top",
    end: "dx-tabs-icon-position-end",
    bottom: "dx-tabs-icon-position-bottom",
    start: "dx-tabs-icon-position-start"
};
const TABS_STYLING_MODE_CLASS = {
    primary: "dx-tabs-styling-mode-primary",
    secondary: "dx-tabs-styling-mode-secondary"
};
const TABS_ITEM_DATA_KEY = "dxTabData";
const BUTTON_NEXT_ICON = "chevronnext";
const BUTTON_PREV_ICON = "chevronprev";
const FEEDBACK_HIDE_TIMEOUT = 100;
const FEEDBACK_DURATION_INTERVAL = 5;
const FEEDBACK_SCROLL_TIMEOUT = 300;
const TAB_OFFSET = 30;
const ORIENTATION = {
    horizontal: "horizontal",
    vertical: "vertical"
};
const INDICATOR_POSITION = {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left"
};
const SCROLLABLE_DIRECTION = {
    horizontal: "horizontal",
    vertical: "vertical"
};
const ICON_POSITION = {
    top: "top",
    end: "end",
    bottom: "bottom",
    start: "start"
};
const STYLING_MODE = {
    primary: "primary",
    secondary: "secondary"
};
const Tabs = CollectionWidget.inherit({
    _activeStateUnit: ".dx-tab",
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            hoverStateEnabled: true,
            showNavButtons: true,
            scrollByContent: true,
            scrollingEnabled: true,
            selectionMode: "single",
            orientation: ORIENTATION.horizontal,
            iconPosition: ICON_POSITION.start,
            stylingMode: STYLING_MODE.primary,
            activeStateEnabled: true,
            selectionRequired: false,
            selectOnFocus: true,
            loopItemFocus: false,
            useInkRipple: false,
            badgeExpr: function(data) {
                return data ? data.badge : void 0
            },
            _itemAttributes: {
                role: "tab"
            },
            _indicatorPosition: null
        })
    },
    _defaultOptionsRules: function() {
        const themeName = currentTheme();
        return this.callBase().concat([{
            device: () => "desktop" !== devices.real().deviceType,
            options: {
                showNavButtons: false
            }
        }, {
            device: {
                deviceType: "desktop"
            },
            options: {
                scrollByContent: false
            }
        }, {
            device: () => "desktop" === devices.real().deviceType && !devices.isSimulator(),
            options: {
                focusStateEnabled: true
            }
        }, {
            device: () => isFluent(themeName),
            options: {
                iconPosition: ICON_POSITION.top,
                stylingMode: STYLING_MODE.secondary
            }
        }, {
            device: () => isMaterial(themeName),
            options: {
                useInkRipple: true,
                selectOnFocus: false,
                iconPosition: ICON_POSITION.top
            }
        }])
    },
    _init() {
        const {
            orientation: orientation,
            stylingMode: stylingMode,
            scrollingEnabled: scrollingEnabled
        } = this.option();
        const indicatorPosition = this._getIndicatorPosition();
        this.callBase();
        this.setAria("role", "tablist");
        this.$element().addClass("dx-tabs");
        this._toggleScrollingEnabledClass(scrollingEnabled);
        this._toggleOrientationClass(orientation);
        this._toggleIndicatorPositionClass(indicatorPosition);
        this._toggleIconPositionClass();
        this._toggleStylingModeClass(stylingMode);
        this._renderWrapper();
        this._renderMultiple();
        this._feedbackHideTimeout = 100
    },
    _prepareDefaultItemTemplate(data, $container) {
        const text = isPlainObject(data) ? null === data || void 0 === data ? void 0 : data.text : data;
        if (isDefined(text)) {
            const $tabTextSpan = $("<span>").addClass("dx-tab-text-span");
            $tabTextSpan.text(text);
            const $tabTextSpanPseudo = $("<span>").addClass("dx-tab-text-span-pseudo");
            $tabTextSpanPseudo.text(text);
            $tabTextSpanPseudo.appendTo($tabTextSpan);
            $tabTextSpan.appendTo($container)
        }
        if (isDefined(data.html)) {
            $container.html(data.html)
        }
    },
    _initTemplates() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            item: new BindableTemplate((($container, data) => {
                this._prepareDefaultItemTemplate(data, $container);
                const $iconElement = getImageContainer(data.icon);
                $iconElement && $iconElement.prependTo($container);
                const $tabItem = $("<div>").addClass("dx-tab-text");
                $container.wrapInner($tabItem)
            }).bind(this), ["text", "html", "icon"], this.option("integrationOptions.watchMethod"))
        })
    },
    _createItemByTemplate: function(itemTemplate, renderArgs) {
        const {
            itemData: itemData,
            container: container,
            index: index
        } = renderArgs;
        this._deferredTemplates[index] = new Deferred;
        return itemTemplate.render({
            model: itemData,
            container: container,
            index: index,
            onRendered: () => this._deferredTemplates[index].resolve()
        })
    },
    _itemClass: function() {
        return "dx-tab"
    },
    _selectedItemClass: function() {
        return "dx-tab-selected"
    },
    _itemDataKey: function() {
        return "dxTabData"
    },
    _initMarkup: function() {
        this._deferredTemplates = [];
        this.callBase();
        this.option("useInkRipple") && this._renderInkRipple();
        this.$element().addClass("dx-overflow-hidden")
    },
    _render: function() {
        this.callBase();
        this._deferRenderScrolling()
    },
    _deferRenderScrolling() {
        when.apply(this, this._deferredTemplates).done((() => this._renderScrolling()))
    },
    _renderScrolling() {
        const removeClasses = ["dx-tabs-stretched", TABS_EXPANDED_CLASS, "dx-overflow-hidden"];
        this.$element().removeClass(removeClasses.join(" "));
        if (this.option("scrollingEnabled") && this._isItemsSizeExceeded()) {
            if (!this._scrollable) {
                this._renderScrollable();
                this._renderNavButtons()
            }
            const scrollable = this.getScrollable();
            scrollable.update();
            if (this.option("rtlEnabled")) {
                const maxLeftOffset = getScrollLeftMax($(this.getScrollable().container()).get(0));
                scrollable.scrollTo({
                    left: maxLeftOffset
                })
            }
            this._updateNavButtonsState();
            this._scrollToItem(this.option("selectedItem"))
        }
        if (!(this.option("scrollingEnabled") && this._isItemsSizeExceeded())) {
            this._cleanScrolling();
            if (this._needStretchItems()) {
                this.$element().addClass("dx-tabs-stretched")
            }
            this.$element().removeClass("dx-tabs-nav-buttons").addClass(TABS_EXPANDED_CLASS)
        }
    },
    _isVertical() {
        return this.option("orientation") === ORIENTATION.vertical
    },
    _isItemsSizeExceeded() {
        const isVertical = this._isVertical();
        const isItemsSizeExceeded = isVertical ? this._isItemsHeightExceeded() : this._isItemsWidthExceeded();
        return isItemsSizeExceeded
    },
    _isItemsWidthExceeded() {
        const $visibleItems = this._getVisibleItems();
        const tabItemTotalWidth = this._getSummaryItemsSize("width", $visibleItems, true);
        const elementWidth = getWidth(this.$element());
        if ([tabItemTotalWidth, elementWidth].includes(0)) {
            return false
        }
        const isItemsWidthExceeded = tabItemTotalWidth > elementWidth - 1;
        return isItemsWidthExceeded
    },
    _isItemsHeightExceeded() {
        const $visibleItems = this._getVisibleItems();
        const itemsHeight = this._getSummaryItemsSize("height", $visibleItems, true);
        const elementHeight = getHeight(this.$element());
        const isItemsHeightExceeded = itemsHeight - 1 > elementHeight;
        return isItemsHeightExceeded
    },
    _needStretchItems() {
        const $visibleItems = this._getVisibleItems();
        const elementWidth = getWidth(this.$element());
        const itemsWidth = [];
        each($visibleItems, ((_, item) => {
            itemsWidth.push(getOuterWidth(item, true))
        }));
        const maxTabItemWidth = Math.max.apply(null, itemsWidth);
        const requireWidth = elementWidth / $visibleItems.length;
        const needStretchItems = maxTabItemWidth > requireWidth + 1;
        return needStretchItems
    },
    _cleanNavButtons: function() {
        if (!this._leftButton || !this._rightButton) {
            return
        }
        this._leftButton.$element().remove();
        this._rightButton.$element().remove();
        this._leftButton = null;
        this._rightButton = null
    },
    _cleanScrolling: function() {
        if (!this._scrollable) {
            return
        }
        this._$wrapper.appendTo(this.$element());
        this._scrollable.$element().remove();
        this._scrollable = null;
        this._cleanNavButtons()
    },
    _renderInkRipple: function() {
        this._inkRipple = render()
    },
    _getPointerEvent: () => pointerEvents.up,
    _toggleActiveState: function($element, value, e) {
        this.callBase.apply(this, arguments);
        if (!this._inkRipple) {
            return
        }
        const config = {
            element: $element,
            event: e
        };
        if (value) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    },
    _renderMultiple: function() {
        if ("multiple" === this.option("selectionMode")) {
            this.option("selectOnFocus", false)
        }
    },
    _renderWrapper: function() {
        this._$wrapper = $("<div>").addClass("dx-tabs-wrapper");
        this.$element().append(this._$wrapper)
    },
    _itemContainer: function() {
        return this._$wrapper
    },
    _getScrollableDirection() {
        const isVertical = this._isVertical();
        const scrollableDirection = isVertical ? SCROLLABLE_DIRECTION.vertical : SCROLLABLE_DIRECTION.horizontal;
        return scrollableDirection
    },
    _updateScrollable() {
        if (this.getScrollable()) {
            this._cleanScrolling()
        }
        this._renderScrolling()
    },
    _renderScrollable() {
        const $itemContainer = this.$element().wrapInner($("<div>").addClass("dx-tabs-scrollable")).children();
        this._scrollable = this._createComponent($itemContainer, Scrollable, {
            direction: this._getScrollableDirection(),
            showScrollbar: "never",
            useKeyboard: false,
            useNative: false,
            scrollByContent: this.option("scrollByContent"),
            onScroll: () => {
                this._updateNavButtonsState()
            }
        });
        this.$element().append(this._scrollable.$element())
    },
    _scrollToItem: function(itemData) {
        if (!this._scrollable) {
            return
        }
        const $item = this._editStrategy.getItemElement(itemData);
        this._scrollable.scrollToElement($item)
    },
    _renderNavButtons: function() {
        const {
            showNavButtons: showNavButtons,
            rtlEnabled: rtlEnabled
        } = this.option();
        this.$element().toggleClass("dx-tabs-nav-buttons", showNavButtons);
        if (!showNavButtons) {
            return
        }
        this._leftButton = this._createNavButton(-30, rtlEnabled ? "chevronnext" : "chevronprev");
        const $leftButton = this._leftButton.$element();
        $leftButton.addClass("dx-tabs-nav-button-left");
        this.$element().prepend($leftButton);
        this._rightButton = this._createNavButton(30, rtlEnabled ? "chevronprev" : "chevronnext");
        const $rightButton = this._rightButton.$element();
        $rightButton.addClass("dx-tabs-nav-button-right");
        this.$element().append($rightButton)
    },
    _updateNavButtonsAriaDisabled() {
        const buttons = [this._leftButton, this._rightButton];
        buttons.forEach((button => {
            null === button || void 0 === button || button.$element().attr({
                "aria-disabled": null
            })
        }))
    },
    _updateNavButtonsState() {
        const isVertical = this._isVertical();
        const scrollable = this.getScrollable();
        if (isVertical) {
            var _this$_leftButton, _this$_rightButton;
            null === (_this$_leftButton = this._leftButton) || void 0 === _this$_leftButton || _this$_leftButton.option("disabled", isReachedTop(scrollable.scrollTop(), 1));
            null === (_this$_rightButton = this._rightButton) || void 0 === _this$_rightButton || _this$_rightButton.option("disabled", isReachedBottom($(scrollable.container()).get(0), scrollable.scrollTop(), 0, 1))
        } else {
            var _this$_leftButton2, _this$_rightButton2;
            null === (_this$_leftButton2 = this._leftButton) || void 0 === _this$_leftButton2 || _this$_leftButton2.option("disabled", isReachedLeft(scrollable.scrollLeft(), 1));
            null === (_this$_rightButton2 = this._rightButton) || void 0 === _this$_rightButton2 || _this$_rightButton2.option("disabled", isReachedRight($(scrollable.container()).get(0), scrollable.scrollLeft(), 1))
        }
        this._updateNavButtonsAriaDisabled()
    },
    _updateScrollPosition: function(offset, duration) {
        this._scrollable.update();
        this._scrollable.scrollBy(offset / duration)
    },
    _createNavButton: function(offset, icon) {
        const holdAction = this._createAction((() => {
            this._holdInterval = setInterval((() => {
                this._updateScrollPosition(offset, 5)
            }), 5)
        }));
        const holdEventName = addNamespace(holdEvent.name, "dxNavButton");
        const pointerUpEventName = addNamespace(pointerEvents.up, "dxNavButton");
        const pointerOutEventName = addNamespace(pointerEvents.out, "dxNavButton");
        const navButton = this._createComponent($("<div>").addClass("dx-tabs-nav-button"), Button, {
            focusStateEnabled: false,
            icon: icon,
            integrationOptions: {},
            elementAttr: {
                role: null,
                "aria-label": null,
                "aria-disabled": null
            },
            onClick: () => {
                this._updateScrollPosition(offset, 1)
            }
        });
        const $navButton = navButton.$element();
        eventsEngine.on($navButton, holdEventName, {
            timeout: 300
        }, (e => {
            holdAction({
                event: e
            })
        }));
        eventsEngine.on($navButton, pointerUpEventName, (() => {
            this._clearInterval()
        }));
        eventsEngine.on($navButton, pointerOutEventName, (() => {
            this._clearInterval()
        }));
        return navButton
    },
    _clearInterval: function() {
        if (this._holdInterval) {
            clearInterval(this._holdInterval)
        }
    },
    _updateSelection: function(addedSelection) {
        this._scrollable && this._scrollable.scrollToElement(this.itemElements().eq(addedSelection[0]))
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    },
    _dimensionChanged: function() {
        this._renderScrolling()
    },
    _itemSelectHandler: function(e) {
        if ("single" === this.option("selectionMode") && this.isItemSelected(e.currentTarget)) {
            return
        }
        this.callBase(e)
    },
    _clean: function() {
        this._deferredTemplates = [];
        this._cleanScrolling();
        this.callBase()
    },
    _toggleTabsVerticalClass(value) {
        this.$element().toggleClass(TABS_ORIENTATION_CLASS.vertical, value)
    },
    _toggleTabsHorizontalClass(value) {
        this.$element().toggleClass(TABS_ORIENTATION_CLASS.horizontal, value)
    },
    _getIndicatorPositionClass: indicatorPosition => INDICATOR_POSITION_CLASS[indicatorPosition],
    _getIndicatorPosition() {
        const {
            _indicatorPosition: _indicatorPosition,
            rtlEnabled: rtlEnabled
        } = this.option();
        if (_indicatorPosition) {
            return _indicatorPosition
        }
        const isVertical = this._isVertical();
        if (rtlEnabled) {
            return isVertical ? INDICATOR_POSITION.left : INDICATOR_POSITION.bottom
        } else {
            return isVertical ? INDICATOR_POSITION.right : INDICATOR_POSITION.bottom
        }
    },
    _toggleIndicatorPositionClass(indicatorPosition) {
        const newClass = this._getIndicatorPositionClass(indicatorPosition);
        this._toggleElementClasses(INDICATOR_POSITION_CLASS, newClass)
    },
    _toggleScrollingEnabledClass(scrollingEnabled) {
        this.$element().toggleClass("dx-tabs-scrolling-enabled", Boolean(scrollingEnabled))
    },
    _toggleOrientationClass(orientation) {
        const isVertical = orientation === ORIENTATION.vertical;
        this._toggleTabsVerticalClass(isVertical);
        this._toggleTabsHorizontalClass(!isVertical)
    },
    _getTabsIconPositionClass() {
        const position = this.option("iconPosition");
        switch (position) {
            case ICON_POSITION.top:
                return TABS_ICON_POSITION_CLASS.top;
            case ICON_POSITION.end:
                return TABS_ICON_POSITION_CLASS.end;
            case ICON_POSITION.bottom:
                return TABS_ICON_POSITION_CLASS.bottom;
            default:
                return TABS_ICON_POSITION_CLASS.start
        }
    },
    _toggleIconPositionClass() {
        const newClass = this._getTabsIconPositionClass();
        this._toggleElementClasses(TABS_ICON_POSITION_CLASS, newClass)
    },
    _toggleStylingModeClass(value) {
        const newClass = TABS_STYLING_MODE_CLASS[value] ?? TABS_STYLING_MODE_CLASS.primary;
        this._toggleElementClasses(TABS_STYLING_MODE_CLASS, newClass)
    },
    _toggleElementClasses(classMap, newClass) {
        for (const key in classMap) {
            this.$element().removeClass(classMap[key])
        }
        this.$element().addClass(newClass)
    },
    _toggleFocusedDisabledNextClass(currentIndex, isNextDisabled) {
        this._itemElements().eq(currentIndex).toggleClass("dx-focused-disabled-next-tab", isNextDisabled)
    },
    _toggleFocusedDisabledPrevClass(currentIndex, isPrevDisabled) {
        this._itemElements().eq(currentIndex).toggleClass("dx-focused-disabled-prev-tab", isPrevDisabled)
    },
    _toggleFocusedDisabledClasses(value) {
        const {
            selectedIndex: currentIndex
        } = this.option();
        this._itemElements().removeClass("dx-focused-disabled-next-tab").removeClass("dx-focused-disabled-prev-tab");
        const prevItemIndex = currentIndex - 1;
        const nextItemIndex = currentIndex + 1;
        const nextFocusedIndex = $(value).index();
        const isNextDisabled = this._itemElements().eq(nextItemIndex).hasClass("dx-state-disabled");
        const isPrevDisabled = this._itemElements().eq(prevItemIndex).hasClass("dx-state-disabled");
        const shouldNextClassBeSetted = isNextDisabled && nextFocusedIndex === nextItemIndex;
        const shouldPrevClassBeSetted = isPrevDisabled && nextFocusedIndex === prevItemIndex;
        this._toggleFocusedDisabledNextClass(currentIndex, shouldNextClassBeSetted);
        this._toggleFocusedDisabledPrevClass(currentIndex, shouldPrevClassBeSetted)
    },
    _updateFocusedElement() {
        const {
            focusStateEnabled: focusStateEnabled,
            selectedIndex: selectedIndex
        } = this.option();
        const itemElements = this._itemElements();
        if (focusStateEnabled && itemElements.length) {
            const selectedItem = itemElements.get(selectedIndex);
            this.option({
                focusedElement: selectedItem
            })
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "useInkRipple":
            case "scrollingEnabled":
                this._toggleScrollingEnabledClass(args.value);
                this._invalidate();
                break;
            case "showNavButtons":
            case "badgeExpr":
                this._invalidate();
                break;
            case "scrollByContent":
                this._scrollable && this._scrollable.option(args.name, args.value);
                break;
            case "width":
            case "height":
                this.callBase(args);
                this._dimensionChanged();
                break;
            case "selectionMode":
                this._renderMultiple();
                this.callBase(args);
                break;
            case "focusedElement":
                this._toggleFocusedDisabledClasses(args.value);
                this.callBase(args);
                this._scrollToItem(args.value);
                break;
            case "rtlEnabled": {
                this.callBase(args);
                const indicatorPosition = this._getIndicatorPosition();
                this._toggleIndicatorPositionClass(indicatorPosition);
                break
            }
            case "orientation": {
                this._toggleOrientationClass(args.value);
                const indicatorPosition = this._getIndicatorPosition();
                this._toggleIndicatorPositionClass(indicatorPosition);
                if (hasWindow()) {
                    this._updateScrollable()
                }
                break
            }
            case "iconPosition":
                this._toggleIconPositionClass();
                if (hasWindow()) {
                    this._dimensionChanged()
                }
                break;
            case "stylingMode":
                this._toggleStylingModeClass(args.value);
                if (hasWindow()) {
                    this._dimensionChanged()
                }
                break;
            case "_indicatorPosition":
                this._toggleIndicatorPositionClass(args.value);
                break;
            case "selectedIndex":
            case "selectedItem":
            case "selectedItems":
                this.callBase(args);
                this._updateFocusedElement();
                break;
            default:
                this.callBase(args)
        }
    },
    _afterItemElementInserted() {
        this.callBase();
        this._deferRenderScrolling()
    },
    _afterItemElementDeleted($item, deletedActionArgs) {
        this.callBase($item, deletedActionArgs);
        this._renderScrolling()
    },
    getScrollable() {
        return this._scrollable
    }
});
Tabs.ItemClass = TabsItem;
registerComponent("dxTabs", Tabs);
export default Tabs;
