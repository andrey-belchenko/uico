/**
 * DevExtreme (esm/ui/tab_panel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../core/renderer";
import {
    touch
} from "../core/utils/support";
import {
    extend
} from "../core/utils/extend";
import devices from "../core/devices";
import domAdapter from "../core/dom_adapter";
import registerComponent from "../core/component_registrator";
import MultiView from "./multi_view";
import Tabs from "./tabs";
import {
    default as TabPanelItem
} from "./tab_panel/item";
import {
    getImageContainer
} from "../core/utils/icon";
import {
    getPublicElement
} from "../core/element";
import {
    isPlainObject,
    isDefined
} from "../core/utils/type";
import {
    BindableTemplate
} from "../core/templates/bindable_template";
import {
    isMaterialBased,
    isFluent,
    current as currentTheme
} from "./themes";
const TABPANEL_CLASS = "dx-tabpanel";
const TABPANEL_TABS_CLASS = "dx-tabpanel-tabs";
const TABPANEL_TABS_ITEM_CLASS = "dx-tabpanel-tab";
const TABPANEL_CONTAINER_CLASS = "dx-tabpanel-container";
const TABS_ITEM_TEXT_CLASS = "dx-tab-text";
const DISABLED_FOCUSED_TAB_CLASS = "dx-disabled-focused-tab";
const TABS_ITEM_TEXT_SPAN_CLASS = "dx-tab-text-span";
const TABS_ITEM_TEXT_SPAN_PSEUDO_CLASS = "dx-tab-text-span-pseudo";
const TABPANEL_TABS_POSITION_CLASS = {
    top: "dx-tabpanel-tabs-position-top",
    right: "dx-tabpanel-tabs-position-right",
    bottom: "dx-tabpanel-tabs-position-bottom",
    left: "dx-tabpanel-tabs-position-left"
};
const TABS_POSITION = {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left"
};
const TABS_INDICATOR_POSITION_BY_TABS_POSITION = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
};
const TABS_ORIENTATION = {
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
const TabPanel = MultiView.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            itemTitleTemplate: "title",
            hoverStateEnabled: true,
            showNavButtons: false,
            scrollByContent: true,
            scrollingEnabled: true,
            tabsPosition: TABS_POSITION.top,
            iconPosition: ICON_POSITION.start,
            stylingMode: STYLING_MODE.primary,
            onTitleClick: null,
            onTitleHold: null,
            onTitleRendered: null,
            badgeExpr: function(data) {
                return data ? data.badge : void 0
            },
            _tabsIndicatorPosition: null
        })
    },
    _defaultOptionsRules: function() {
        const themeName = currentTheme();
        return this.callBase().concat([{
            device: function() {
                return "desktop" === devices.real().deviceType && !devices.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return !touch
            },
            options: {
                swipeEnabled: false
            }
        }, {
            device: {
                platform: "generic"
            },
            options: {
                animationEnabled: false
            }
        }, {
            device: () => isFluent(themeName),
            options: {
                stylingMode: STYLING_MODE.secondary
            }
        }, {
            device: () => isMaterialBased(themeName),
            options: {
                iconPosition: ICON_POSITION.top
            }
        }])
    },
    _init: function() {
        this.callBase();
        this.$element().addClass("dx-tabpanel");
        this._toggleTabPanelTabsPositionClass()
    },
    _getElementAria: () => ({
        role: "tabpanel"
    }),
    _getItemAria: () => ({
        role: "tabpanel"
    }),
    _initMarkup: function() {
        this.callBase();
        this._createTitleActions();
        this._renderLayout()
    },
    _prepareTabsItemTemplate(data, $container) {
        const $iconElement = getImageContainer(null === data || void 0 === data ? void 0 : data.icon);
        if ($iconElement) {
            $container.append($iconElement)
        }
        const title = isPlainObject(data) ? null === data || void 0 === data ? void 0 : data.title : data;
        if (isDefined(title) && !isPlainObject(title)) {
            const $tabTextSpan = $("<span>").addClass("dx-tab-text-span");
            $tabTextSpan.append(domAdapter.createTextNode(title));
            const $tabTextSpanPseudo = $("<span>").addClass("dx-tab-text-span-pseudo");
            $tabTextSpanPseudo.append(domAdapter.createTextNode(title));
            $tabTextSpanPseudo.appendTo($tabTextSpan);
            $tabTextSpan.appendTo($container)
        }
    },
    _initTemplates() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            title: new BindableTemplate((($container, data) => {
                this._prepareTabsItemTemplate(data, $container);
                const $tabItem = $("<div>").addClass("dx-tab-text");
                $container.wrapInner($tabItem)
            }), ["title", "icon"], this.option("integrationOptions.watchMethod"))
        })
    },
    _createTitleActions: function() {
        this._createTitleClickAction();
        this._createTitleHoldAction();
        this._createTitleRenderedAction()
    },
    _createTitleClickAction: function() {
        this._titleClickAction = this._createActionByOption("onTitleClick")
    },
    _createTitleHoldAction: function() {
        this._titleHoldAction = this._createActionByOption("onTitleHold")
    },
    _createTitleRenderedAction: function() {
        this._titleRenderedAction = this._createActionByOption("onTitleRendered")
    },
    _renderLayout: function() {
        if (this._tabs) {
            return
        }
        const $element = this.$element();
        this._$tabContainer = $("<div>").addClass("dx-tabpanel-tabs").appendTo($element);
        const $tabs = $("<div>").appendTo(this._$tabContainer);
        this._tabs = this._createComponent($tabs, Tabs, this._tabConfig());
        this._$container = $("<div>").addClass("dx-tabpanel-container").appendTo($element);
        this._$container.append(this._$wrapper)
    },
    _refreshActiveDescendant: function() {
        if (!this._tabs) {
            return
        }
        const tabs = this._tabs;
        const tabItems = tabs.itemElements();
        const $activeTab = $(tabItems[tabs.option("selectedIndex")]);
        const id = this.getFocusedItemId();
        this.setAria("controls", void 0, $(tabItems));
        this.setAria("controls", id, $activeTab)
    },
    _getTabsIndicatorPosition() {
        const {
            _tabsIndicatorPosition: _tabsIndicatorPosition,
            tabsPosition: tabsPosition
        } = this.option();
        return _tabsIndicatorPosition ?? TABS_INDICATOR_POSITION_BY_TABS_POSITION[tabsPosition]
    },
    _tabConfig() {
        const tabsIndicatorPosition = this._getTabsIndicatorPosition();
        return {
            selectOnFocus: true,
            focusStateEnabled: this.option("focusStateEnabled"),
            hoverStateEnabled: this.option("hoverStateEnabled"),
            repaintChangesOnly: this.option("repaintChangesOnly"),
            tabIndex: this.option("tabIndex"),
            selectedIndex: this.option("selectedIndex"),
            badgeExpr: this.option("badgeExpr"),
            onItemClick: this._titleClickAction.bind(this),
            onItemHold: this._titleHoldAction.bind(this),
            itemHoldTimeout: this.option("itemHoldTimeout"),
            onSelectionChanged: function(e) {
                this.option("selectedIndex", e.component.option("selectedIndex"));
                this._refreshActiveDescendant()
            }.bind(this),
            onItemRendered: this._titleRenderedAction.bind(this),
            itemTemplate: this._getTemplateByOption("itemTitleTemplate"),
            items: this.option("items"),
            noDataText: null,
            scrollingEnabled: this.option("scrollingEnabled"),
            scrollByContent: this.option("scrollByContent"),
            showNavButtons: this.option("showNavButtons"),
            itemTemplateProperty: "tabTemplate",
            loopItemFocus: this.option("loop"),
            selectionRequired: true,
            onOptionChanged: function(args) {
                if ("focusedElement" === args.name) {
                    if (args.value) {
                        const $value = $(args.value);
                        const $newItem = this._itemElements().eq($value.index());
                        this.option("focusedElement", getPublicElement($newItem))
                    } else {
                        this.option("focusedElement", args.value)
                    }
                }
            }.bind(this),
            onFocusIn: function(args) {
                this._focusInHandler(args.event)
            }.bind(this),
            onFocusOut: function(args) {
                if (!this._isFocusOutHandlerExecuting) {
                    this._focusOutHandler(args.event)
                }
            }.bind(this),
            orientation: this._getTabsOrientation(),
            iconPosition: this.option("iconPosition"),
            stylingMode: this.option("stylingMode"),
            _itemAttributes: {
                class: "dx-tabpanel-tab"
            },
            _indicatorPosition: tabsIndicatorPosition
        }
    },
    _renderFocusTarget: function() {
        this._focusTarget().attr("tabIndex", -1)
    },
    _getTabsOrientation() {
        const {
            tabsPosition: tabsPosition
        } = this.option();
        if ([TABS_POSITION.right, TABS_POSITION.left].includes(tabsPosition)) {
            return TABS_ORIENTATION.vertical
        }
        return TABS_ORIENTATION.horizontal
    },
    _getTabPanelTabsPositionClass() {
        const position = this.option("tabsPosition");
        switch (position) {
            case TABS_POSITION.right:
                return TABPANEL_TABS_POSITION_CLASS.right;
            case TABS_POSITION.bottom:
                return TABPANEL_TABS_POSITION_CLASS.bottom;
            case TABS_POSITION.left:
                return TABPANEL_TABS_POSITION_CLASS.left;
            case TABS_POSITION.top:
            default:
                return TABPANEL_TABS_POSITION_CLASS.top
        }
    },
    _toggleTabPanelTabsPositionClass() {
        for (const key in TABPANEL_TABS_POSITION_CLASS) {
            this.$element().removeClass(TABPANEL_TABS_POSITION_CLASS[key])
        }
        const newClass = this._getTabPanelTabsPositionClass();
        this.$element().addClass(newClass)
    },
    _updateTabsOrientation() {
        const orientation = this._getTabsOrientation();
        this._setTabsOption("orientation", orientation)
    },
    _toggleWrapperFocusedClass(isFocused) {
        this._toggleFocusClass(isFocused, this._$wrapper)
    },
    _toggleDisabledFocusedClass(isFocused) {
        this._focusTarget().toggleClass("dx-disabled-focused-tab", isFocused)
    },
    _updateFocusState: function(e, isFocused) {
        this.callBase(e, isFocused);
        const isTabsTarget = e.target === this._tabs._focusTarget().get(0);
        const isMultiViewTarget = e.target === this._focusTarget().get(0);
        if (isTabsTarget) {
            this._toggleFocusClass(isFocused, this._focusTarget())
        }
        if (isTabsTarget || isMultiViewTarget) {
            const isDisabled = this._isDisabled(this.option("focusedElement"));
            this._toggleWrapperFocusedClass(isFocused && !isDisabled);
            this._toggleDisabledFocusedClass(isFocused && isDisabled)
        }
        if (isMultiViewTarget) {
            this._toggleFocusClass(isFocused, this._tabs.option("focusedElement"))
        }
    },
    _focusOutHandler: function(e) {
        this._isFocusOutHandlerExecuting = true;
        this.callBase.apply(this, arguments);
        this._tabs._focusOutHandler(e);
        this._isFocusOutHandlerExecuting = false
    },
    _setTabsOption(name, value) {
        if (this._tabs) {
            this._tabs.option(name, value)
        }
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._tabs._dimensionChanged()
        }
    },
    registerKeyHandler: function(key, handler) {
        this.callBase(key, handler);
        if (this._tabs) {
            this._tabs.registerKeyHandler(key, handler)
        }
    },
    repaint: function() {
        this.callBase();
        this._tabs.repaint()
    },
    _updateTabsIndicatorPosition() {
        const value = this._getTabsIndicatorPosition();
        this._setTabsOption("_indicatorPosition", value)
    },
    _optionChanged: function(args) {
        const {
            name: name,
            value: value,
            fullName: fullName
        } = args;
        switch (name) {
            case "dataSource":
            default:
                this.callBase(args);
                break;
            case "items":
                this._setTabsOption(name, this.option(name));
                if (!this.option("repaintChangesOnly")) {
                    this._tabs.repaint()
                }
                this.callBase(args);
                break;
            case "width":
                this.callBase(args);
                this._tabs.repaint();
                break;
            case "selectedIndex":
            case "selectedItem":
                this._setTabsOption(fullName, value);
                this.callBase(args);
                if (true === this.option("focusStateEnabled")) {
                    const selectedIndex = this.option("selectedIndex");
                    const selectedTabContent = this._itemElements().eq(selectedIndex);
                    this.option("focusedElement", getPublicElement(selectedTabContent))
                }
                break;
            case "itemHoldTimeout":
            case "focusStateEnabled":
            case "hoverStateEnabled":
                this._setTabsOption(fullName, value);
                this.callBase(args);
                break;
            case "scrollingEnabled":
            case "scrollByContent":
            case "showNavButtons":
                this._setTabsOption(fullName, value);
                break;
            case "focusedElement": {
                const id = value ? $(value).index() : value;
                const newItem = value ? this._tabs._itemElements().eq(id) : value;
                this._setTabsOption("focusedElement", getPublicElement(newItem));
                if (value) {
                    const isDisabled = this._isDisabled(value);
                    this._toggleWrapperFocusedClass(!isDisabled);
                    this._toggleDisabledFocusedClass(isDisabled)
                }
                this.callBase(args);
                break
            }
            case "itemTitleTemplate":
                this._setTabsOption("itemTemplate", this._getTemplateByOption("itemTitleTemplate"));
                break;
            case "onTitleClick":
                this._createTitleClickAction();
                this._setTabsOption("onItemClick", this._titleClickAction.bind(this));
                break;
            case "onTitleHold":
                this._createTitleHoldAction();
                this._setTabsOption("onItemHold", this._titleHoldAction.bind(this));
                break;
            case "onTitleRendered":
                this._createTitleRenderedAction();
                this._setTabsOption("onItemRendered", this._titleRenderedAction.bind(this));
                break;
            case "loop":
                this._setTabsOption("loopItemFocus", value);
                break;
            case "badgeExpr":
                this._invalidate();
                break;
            case "tabsPosition":
                this._toggleTabPanelTabsPositionClass();
                this._updateTabsIndicatorPosition();
                this._updateTabsOrientation();
                break;
            case "iconPosition":
                this._setTabsOption("iconPosition", value);
                break;
            case "stylingMode":
                this._setTabsOption("stylingMode", value);
                break;
            case "_tabsIndicatorPosition":
                this._setTabsOption("_indicatorPosition", value)
        }
    }
});
TabPanel.ItemClass = TabPanelItem;
registerComponent("dxTabPanel", TabPanel);
export default TabPanel;
