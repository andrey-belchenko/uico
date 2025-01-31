/**
 * DevExtreme (esm/ui/form/ui.form.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import registerComponent from "../../core/component_registrator";
import Guid from "../../core/guid";
import {
    ensureDefined
} from "../../core/utils/common";
import config from "../../core/config";
import {
    isDefined,
    isEmptyObject,
    isObject,
    isString
} from "../../core/utils/type";
import {
    each
} from "../../core/utils/iterator";
import {
    extend
} from "../../core/utils/extend";
import {
    triggerResizeEvent,
    triggerShownEvent
} from "../../events/visibility_change";
import {
    getPublicElement
} from "../../core/element";
import messageLocalization from "../../localization/message";
import Widget from "../widget/ui.widget";
import Editor from "../editor/editor";
import {
    defaultScreenFactorFunc,
    getCurrentScreenFactor,
    hasWindow
} from "../../core/utils/window";
import ValidationEngine from "../validation_engine";
import {
    default as FormItemsRunTimeInfo
} from "./ui.form.items_runtime_info";
import TabPanel from "../tab_panel";
import Scrollable from "../scroll_view/ui.scrollable";
import {
    Deferred
} from "../../core/utils/deferred";
import {
    isMaterialBased,
    isMaterial
} from "../themes";
import tryCreateItemOptionAction from "./ui.form.item_options_actions";
import resizeObserverSingleton from "../../core/resize_observer";
import "./ui.form.layout_manager";
import {
    concatPaths,
    createItemPathByIndex,
    getFullOptionName,
    getOptionNameFromFullName,
    tryGetTabPath,
    getTextWithoutSpaces,
    isEqualToDataFieldOrNameOrTitleOrCaption,
    isFullPathContainsTabs,
    getItemPath,
    convertToLayoutManagerOptions
} from "./ui.form.utils";
import {
    convertToLabelMarkOptions
} from "./ui.form.layout_manager.utils";
import {
    setLabelWidthByMaxLabelWidth
} from "./components/label";
import "../validation_summary";
import "../validation_group";
import {
    FORM_CLASS,
    FIELD_ITEM_CLASS,
    FORM_GROUP_CLASS,
    FORM_GROUP_CONTENT_CLASS,
    FIELD_ITEM_CONTENT_HAS_GROUP_CLASS,
    FIELD_ITEM_CONTENT_HAS_TABS_CLASS,
    FORM_GROUP_WITH_CAPTION_CLASS,
    FORM_GROUP_CAPTION_CLASS,
    FORM_GROUP_CUSTOM_CAPTION_CLASS,
    FIELD_ITEM_TAB_CLASS,
    FORM_FIELD_ITEM_COL_CLASS,
    GROUP_COL_COUNT_CLASS,
    GROUP_COL_COUNT_ATTR,
    FIELD_ITEM_CONTENT_CLASS,
    FORM_VALIDATION_SUMMARY,
    ROOT_SIMPLE_ITEM_CLASS,
    FORM_UNDERLINED_CLASS
} from "./constants";
import {
    TOOLBAR_CLASS
} from "../toolbar/constants";
const FOCUSED_STATE_CLASS = "dx-state-focused";
const ITEM_OPTIONS_FOR_VALIDATION_UPDATING = ["items", "isRequired", "validationRules", "visible"];
const Form = Widget.inherit({
    _init: function() {
        this.callBase();
        this._dirtyFields = new Set;
        this._cachedColCountOptions = [];
        this._itemsRunTimeInfo = new FormItemsRunTimeInfo;
        this._groupsColCount = [];
        this._attachSyncSubscriptions()
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            formID: "dx-" + new Guid,
            formData: {},
            colCount: 1,
            screenByWidth: defaultScreenFactorFunc,
            colCountByScreen: void 0,
            labelLocation: "left",
            readOnly: false,
            onFieldDataChanged: null,
            customizeItem: null,
            onEditorEnterKey: null,
            minColWidth: 200,
            alignItemLabels: true,
            alignItemLabelsInAllGroups: true,
            alignRootItemLabels: true,
            showColonAfterLabel: true,
            showRequiredMark: true,
            showOptionalMark: false,
            requiredMark: "*",
            optionalMark: messageLocalization.format("dxForm-optionalMark"),
            requiredMessage: messageLocalization.getFormatter("dxForm-requiredMessage"),
            showValidationSummary: false,
            items: void 0,
            scrollingEnabled: false,
            validationGroup: void 0,
            stylingMode: config().editorStylingMode,
            labelMode: "outside",
            isDirty: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return isMaterialBased()
            },
            options: {
                labelLocation: "top"
            }
        }, {
            device: function() {
                return isMaterial()
            },
            options: {
                showColonAfterLabel: false
            }
        }])
    },
    _setOptionsByReference: function() {
        this.callBase();
        extend(this._optionsByReference, {
            formData: true,
            validationGroup: true
        })
    },
    _getGroupColCount: function($element) {
        return parseInt($element.attr(GROUP_COL_COUNT_ATTR))
    },
    _applyLabelsWidthByCol: function($container, index) {
        let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        let labelMarkOptions = arguments.length > 3 ? arguments[3] : void 0;
        const fieldItemClass = options.inOneColumn ? FIELD_ITEM_CLASS : FORM_FIELD_ITEM_COL_CLASS + index;
        const cssExcludeTabbedSelector = options.excludeTabbed ? `:not(.${FIELD_ITEM_TAB_CLASS})` : "";
        setLabelWidthByMaxLabelWidth($container, `.${fieldItemClass}${cssExcludeTabbedSelector}`, labelMarkOptions);
        return
    },
    _applyLabelsWidth: function($container, excludeTabbed, inOneColumn, colCount, labelMarkOptions) {
        colCount = inOneColumn ? 1 : colCount || this._getGroupColCount($container);
        const applyLabelsOptions = {
            excludeTabbed: excludeTabbed,
            inOneColumn: inOneColumn
        };
        let i;
        for (i = 0; i < colCount; i++) {
            this._applyLabelsWidthByCol($container, i, applyLabelsOptions, labelMarkOptions)
        }
    },
    _getGroupElementsInColumn: function($container, columnIndex, colCount) {
        const cssColCountSelector = isDefined(colCount) ? "." + GROUP_COL_COUNT_CLASS + colCount : "";
        const groupSelector = "." + FORM_FIELD_ITEM_COL_CLASS + columnIndex + " > ." + FIELD_ITEM_CONTENT_CLASS + " > ." + FORM_GROUP_CLASS + cssColCountSelector;
        return $container.find(groupSelector)
    },
    _applyLabelsWidthWithGroups: function($container, colCount, excludeTabbed, labelMarkOptions) {
        if (true === this.option("alignRootItemLabels")) {
            const $rootSimpleItems = $container.find(`.${ROOT_SIMPLE_ITEM_CLASS}`);
            for (let colIndex = 0; colIndex < colCount; colIndex++) {
                this._applyLabelsWidthByCol($rootSimpleItems, colIndex, excludeTabbed, labelMarkOptions)
            }
        }
        const alignItemLabelsInAllGroups = this.option("alignItemLabelsInAllGroups");
        if (alignItemLabelsInAllGroups) {
            this._applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed, labelMarkOptions)
        } else {
            const $groups = this.$element().find("." + FORM_GROUP_CLASS);
            let i;
            for (i = 0; i < $groups.length; i++) {
                this._applyLabelsWidth($groups.eq(i), excludeTabbed, void 0, void 0, labelMarkOptions)
            }
        }
    },
    _applyLabelsWidthWithNestedGroups: function($container, colCount, excludeTabbed, labelMarkOptions) {
        const applyLabelsOptions = {
            excludeTabbed: excludeTabbed
        };
        let colIndex;
        let groupsColIndex;
        let groupColIndex;
        let $groupsByCol;
        for (colIndex = 0; colIndex < colCount; colIndex++) {
            $groupsByCol = this._getGroupElementsInColumn($container, colIndex);
            this._applyLabelsWidthByCol($groupsByCol, 0, applyLabelsOptions, labelMarkOptions);
            for (groupsColIndex = 0; groupsColIndex < this._groupsColCount.length; groupsColIndex++) {
                $groupsByCol = this._getGroupElementsInColumn($container, colIndex, this._groupsColCount[groupsColIndex]);
                const groupColCount = this._getGroupColCount($groupsByCol);
                for (groupColIndex = 1; groupColIndex < groupColCount; groupColIndex++) {
                    this._applyLabelsWidthByCol($groupsByCol, groupColIndex, applyLabelsOptions, labelMarkOptions)
                }
            }
        }
    },
    _labelLocation: function() {
        return this.option("labelLocation")
    },
    _alignLabelsInColumn: function(_ref) {
        let {
            layoutManager: layoutManager,
            inOneColumn: inOneColumn,
            $container: $container,
            excludeTabbed: excludeTabbed,
            items: items
        } = _ref;
        if (!hasWindow() || "top" === this._labelLocation()) {
            return
        }
        const labelMarkOptions = convertToLabelMarkOptions(layoutManager._getMarkOptions());
        if (inOneColumn) {
            this._applyLabelsWidth($container, excludeTabbed, true, void 0, labelMarkOptions)
        } else if (this._checkGrouping(items)) {
            this._applyLabelsWidthWithGroups($container, layoutManager._getColCount(), excludeTabbed, labelMarkOptions)
        } else {
            this._applyLabelsWidth($container, excludeTabbed, false, layoutManager._getColCount(), labelMarkOptions)
        }
    },
    _prepareFormData: function() {
        if (!isDefined(this.option("formData"))) {
            this.option("formData", {})
        }
    },
    _setStylingModeClass: function() {
        if ("underlined" === this.option("stylingMode")) {
            this.$element().addClass(FORM_UNDERLINED_CLASS)
        }
    },
    _initMarkup: function() {
        ValidationEngine.addGroup(this._getValidationGroup());
        this._clearCachedInstances();
        this._prepareFormData();
        this.$element().addClass(FORM_CLASS);
        this._setStylingModeClass();
        this.callBase();
        this.setAria("role", "form", this.$element());
        if (this.option("scrollingEnabled")) {
            this._renderScrollable()
        }
        this._renderLayout();
        this._renderValidationSummary();
        this._lastMarkupScreenFactor = this._targetScreenFactor || this._getCurrentScreenFactor();
        this._attachResizeObserverSubscription()
    },
    _attachResizeObserverSubscription: function() {
        if (hasWindow()) {
            const formRootElement = this.$element().get(0);
            resizeObserverSingleton.unobserve(formRootElement);
            resizeObserverSingleton.observe(formRootElement, (() => {
                this._resizeHandler()
            }))
        }
    },
    _resizeHandler: function() {
        if (this._cachedLayoutManagers.length) {
            each(this._cachedLayoutManagers, ((_, layoutManager) => {
                var _layoutManager$option;
                null === (_layoutManager$option = layoutManager.option("onLayoutChanged")) || void 0 === _layoutManager$option || _layoutManager$option(layoutManager.isSingleColumnMode())
            }))
        }
    },
    _getCurrentScreenFactor: function() {
        return hasWindow() ? getCurrentScreenFactor(this.option("screenByWidth")) : "lg"
    },
    _clearCachedInstances: function() {
        this._itemsRunTimeInfo.clear();
        this._cachedLayoutManagers = []
    },
    _alignLabels: function(layoutManager, inOneColumn) {
        this._alignLabelsInColumn({
            $container: this.$element(),
            layoutManager: layoutManager,
            excludeTabbed: true,
            items: this.option("items"),
            inOneColumn: inOneColumn
        });
        triggerResizeEvent(this.$element().find(`.${TOOLBAR_CLASS}`))
    },
    _clean: function() {
        this._clearValidationSummary();
        this.callBase();
        this._groupsColCount = [];
        this._cachedColCountOptions = [];
        this._lastMarkupScreenFactor = void 0;
        resizeObserverSingleton.unobserve(this.$element().get(0))
    },
    _renderScrollable: function() {
        const useNativeScrolling = this.option("useNativeScrolling");
        this._scrollable = new Scrollable(this.$element(), {
            useNative: !!useNativeScrolling,
            useSimulatedScrollbar: !useNativeScrolling,
            useKeyboard: false,
            direction: "both",
            bounceEnabled: false
        })
    },
    _getContent: function() {
        return this.option("scrollingEnabled") ? $(this._scrollable.content()) : this.$element()
    },
    _clearValidationSummary: function() {
        var _this$_$validationSum;
        null === (_this$_$validationSum = this._$validationSummary) || void 0 === _this$_$validationSum || _this$_$validationSum.remove();
        this._$validationSummary = void 0;
        this._validationSummary = void 0
    },
    _renderValidationSummary: function() {
        this._clearValidationSummary();
        if (this.option("showValidationSummary")) {
            this._$validationSummary = $("<div>").addClass(FORM_VALIDATION_SUMMARY).appendTo(this._getContent());
            this._validationSummary = this._$validationSummary.dxValidationSummary({
                validationGroup: this._getValidationGroup()
            }).dxValidationSummary("instance")
        }
    },
    _prepareItems(items, parentIsTabbedItem, currentPath, isTabs) {
        if (items) {
            const result = [];
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                const path = concatPaths(currentPath, createItemPathByIndex(i, isTabs));
                const itemRunTimeInfo = {
                    item: item,
                    itemIndex: i,
                    path: path
                };
                const guid = this._itemsRunTimeInfo.add(itemRunTimeInfo);
                if (isString(item)) {
                    item = {
                        dataField: item
                    }
                }
                if (isObject(item)) {
                    const preparedItem = _extends({}, item);
                    itemRunTimeInfo.preparedItem = preparedItem;
                    preparedItem.guid = guid;
                    this._tryPrepareGroupItemCaption(preparedItem);
                    this._tryPrepareGroupItem(preparedItem);
                    this._tryPrepareTabbedItem(preparedItem, path);
                    this._tryPrepareItemTemplate(preparedItem);
                    if (parentIsTabbedItem) {
                        preparedItem.cssItemClass = FIELD_ITEM_TAB_CLASS
                    }
                    if (preparedItem.items) {
                        preparedItem.items = this._prepareItems(preparedItem.items, parentIsTabbedItem, path)
                    }
                    result.push(preparedItem)
                } else {
                    result.push(item)
                }
            }
            return result
        }
    },
    _tryPrepareGroupItemCaption: function(item) {
        if ("group" === item.itemType) {
            item._prepareGroupCaptionTemplate = captionTemplate => {
                if (item.captionTemplate) {
                    item.groupCaptionTemplate = this._getTemplate(captionTemplate)
                }
                item.captionTemplate = this._itemGroupTemplate.bind(this, item)
            };
            item._prepareGroupCaptionTemplate(item.captionTemplate)
        }
    },
    _tryPrepareGroupItem: function(item) {
        if ("group" === item.itemType) {
            item.alignItemLabels = ensureDefined(item.alignItemLabels, true);
            item._prepareGroupItemTemplate = itemTemplate => {
                if (item.template) {
                    item.groupContentTemplate = this._getTemplate(itemTemplate)
                }
                item.template = this._itemGroupTemplate.bind(this, item)
            };
            item._prepareGroupItemTemplate(item.template)
        }
    },
    _tryPrepareTabbedItem: function(item, path) {
        if ("tabbed" === item.itemType) {
            item.template = this._itemTabbedTemplate.bind(this, item);
            item.tabs = this._prepareItems(item.tabs, true, path, true)
        }
    },
    _tryPrepareItemTemplate: function(item) {
        if (item.template) {
            item.template = this._getTemplate(item.template)
        }
    },
    _checkGrouping: function(items) {
        if (items) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if ("group" === item.itemType) {
                    return true
                }
            }
        }
    },
    _renderLayout: function() {
        const that = this;
        let items = that.option("items");
        const $content = that._getContent();
        items = that._prepareItems(items);
        that._rootLayoutManager = that._renderLayoutManager($content, this._createLayoutManagerOptions(items, {
            isRoot: true,
            colCount: that.option("colCount"),
            alignItemLabels: that.option("alignItemLabels"),
            screenByWidth: this.option("screenByWidth"),
            colCountByScreen: this.option("colCountByScreen"),
            onLayoutChanged: function(inOneColumn) {
                that._alignLabels.bind(that)(that._rootLayoutManager, inOneColumn)
            },
            onContentReady: function(e) {
                that._alignLabels(e.component, e.component.isSingleColumnMode())
            }
        }))
    },
    _tryGetItemsForTemplate: function(item) {
        return item.items || []
    },
    _itemTabbedTemplate: function(item, e, $container) {
        const $tabPanel = $("<div>").appendTo($container);
        const tabPanelOptions = extend({}, item.tabPanelOptions, {
            dataSource: item.tabs,
            onItemRendered: args => {
                var _item$tabPanelOptions, _item$tabPanelOptions2;
                null === (_item$tabPanelOptions = item.tabPanelOptions) || void 0 === _item$tabPanelOptions || null === (_item$tabPanelOptions2 = _item$tabPanelOptions.onItemRendered) || void 0 === _item$tabPanelOptions2 || _item$tabPanelOptions2.call(_item$tabPanelOptions, args);
                triggerShownEvent(args.itemElement)
            },
            itemTemplate: (itemData, e, container) => {
                const $container = $(container);
                const alignItemLabels = ensureDefined(itemData.alignItemLabels, true);
                const layoutManager = this._renderLayoutManager($container, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(itemData), {
                    colCount: itemData.colCount,
                    alignItemLabels: alignItemLabels,
                    screenByWidth: this.option("screenByWidth"),
                    colCountByScreen: itemData.colCountByScreen,
                    cssItemClass: itemData.cssItemClass,
                    onLayoutChanged: inOneColumn => {
                        this._alignLabelsInColumn({
                            $container: $container,
                            layoutManager: layoutManager,
                            items: itemData.items,
                            inOneColumn: inOneColumn
                        })
                    }
                }));
                if (this._itemsRunTimeInfo) {
                    this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(itemData.guid, {
                        layoutManager: layoutManager
                    })
                }
                if (alignItemLabels) {
                    this._alignLabelsInColumn({
                        $container: $container,
                        layoutManager: layoutManager,
                        items: itemData.items,
                        inOneColumn: layoutManager.isSingleColumnMode()
                    })
                }
            }
        });
        const tryUpdateTabPanelInstance = (items, instance) => {
            if (Array.isArray(items)) {
                items.forEach((item => this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid, {
                    widgetInstance: instance
                })))
            }
        };
        const tabPanel = this._createComponent($tabPanel, TabPanel, tabPanelOptions);
        $($container).parent().addClass(FIELD_ITEM_CONTENT_HAS_TABS_CLASS);
        tabPanel.on("optionChanged", (e => {
            if ("dataSource" === e.fullName) {
                tryUpdateTabPanelInstance(e.value, e.component)
            }
        }));
        tryUpdateTabPanelInstance([{
            guid: item.guid
        }, ...item.tabs ?? []], tabPanel)
    },
    _itemGroupCaptionTemplate: function(item, $group, id) {
        if (item.groupCaptionTemplate) {
            const $captionTemplate = $("<div>").addClass(FORM_GROUP_CUSTOM_CAPTION_CLASS).attr("id", id).appendTo($group);
            item._renderGroupCaptionTemplate = () => {
                const data = {
                    component: this,
                    caption: item.caption,
                    name: item.name
                };
                item.groupCaptionTemplate.render({
                    model: data,
                    container: getPublicElement($captionTemplate)
                })
            };
            item._renderGroupCaptionTemplate();
            return
        }
        if (item.caption) {
            $("<span>").addClass(FORM_GROUP_CAPTION_CLASS).text(item.caption).attr("id", id).appendTo($group)
        }
    },
    _itemGroupContentTemplate: function(item, $group) {
        const $groupContent = $("<div>").addClass(FORM_GROUP_CONTENT_CLASS).appendTo($group);
        if (item.groupContentTemplate) {
            item._renderGroupContentTemplate = () => {
                $groupContent.empty();
                const data = {
                    formData: this.option("formData"),
                    component: this
                };
                item.groupContentTemplate.render({
                    model: data,
                    container: getPublicElement($groupContent)
                })
            };
            item._renderGroupContentTemplate()
        } else {
            const layoutManager = this._renderLayoutManager($groupContent, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(item), {
                colCount: item.colCount,
                colCountByScreen: item.colCountByScreen,
                alignItemLabels: item.alignItemLabels,
                cssItemClass: item.cssItemClass
            }));
            this._itemsRunTimeInfo && this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid, {
                layoutManager: layoutManager
            });
            const colCount = layoutManager._getColCount();
            if (!this._groupsColCount.includes(colCount)) {
                this._groupsColCount.push(colCount)
            }
            $group.addClass(GROUP_COL_COUNT_CLASS + colCount);
            $group.attr(GROUP_COL_COUNT_ATTR, colCount)
        }
    },
    _itemGroupTemplate: function(item, options, $container) {
        const id = options.editorOptions.inputAttr.id;
        const $group = $("<div>").toggleClass(FORM_GROUP_WITH_CAPTION_CLASS, isDefined(item.caption) && item.caption.length).addClass(FORM_GROUP_CLASS).appendTo($container);
        const groupAria = {
            role: "group",
            labelledby: id
        };
        this.setAria(groupAria, $group);
        $($container).parent().addClass(FIELD_ITEM_CONTENT_HAS_GROUP_CLASS);
        this._itemGroupCaptionTemplate(item, $group, id);
        this._itemGroupContentTemplate(item, $group)
    },
    _createLayoutManagerOptions: function(items, extendedLayoutManagerOptions) {
        return convertToLayoutManagerOptions({
            form: this,
            formOptions: this.option(),
            $formElement: this.$element(),
            items: items,
            validationGroup: this._getValidationGroup(),
            extendedLayoutManagerOptions: extendedLayoutManagerOptions,
            onFieldDataChanged: args => {
                if (!this._isDataUpdating) {
                    this._triggerOnFieldDataChanged(args)
                }
            },
            onContentReady: args => {
                this._itemsRunTimeInfo.addItemsOrExtendFrom(args.component._itemsRunTimeInfo);
                extendedLayoutManagerOptions.onContentReady && extendedLayoutManagerOptions.onContentReady(args)
            },
            onDisposing: _ref2 => {
                let {
                    component: component
                } = _ref2;
                const nestedItemsRunTimeInfo = component.getItemsRunTimeInfo();
                this._itemsRunTimeInfo.removeItemsByItems(nestedItemsRunTimeInfo)
            },
            onFieldItemRendered: () => {
                var _this$_validationSumm;
                null === (_this$_validationSumm = this._validationSummary) || void 0 === _this$_validationSumm || _this$_validationSumm.refreshValidationGroup()
            }
        })
    },
    _renderLayoutManager: function($parent, layoutManagerOptions) {
        const baseColCountByScreen = {
            lg: layoutManagerOptions.colCount,
            md: layoutManagerOptions.colCount,
            sm: layoutManagerOptions.colCount,
            xs: 1
        };
        this._cachedColCountOptions.push({
            colCountByScreen: extend(baseColCountByScreen, layoutManagerOptions.colCountByScreen)
        });
        const $element = $("<div>");
        $element.appendTo($parent);
        const instance = this._createComponent($element, "dxLayoutManager", layoutManagerOptions);
        instance.on("autoColCountChanged", (() => {
            this._clearAutoColCountChangedTimeout();
            this.autoColCountChangedTimeoutId = setTimeout((() => !this._disposed && this._refresh()), 0)
        }));
        this._cachedLayoutManagers.push(instance);
        return instance
    },
    _getValidationGroup: function() {
        return this.option("validationGroup") || this
    },
    _createComponent: function($element, type, config) {
        config = config || {};
        this._extendConfig(config, {
            readOnly: this.option("readOnly")
        });
        return this.callBase($element, type, config)
    },
    _attachSyncSubscriptions: function() {
        const that = this;
        that.on("optionChanged", (function(args) {
            const optionFullName = args.fullName;
            if ("formData" === optionFullName) {
                if (!isDefined(args.value)) {
                    that._options.silent("formData", args.value = {})
                }
                that._triggerOnFieldDataChangedByDataSet(args.value)
            }
            if (that._cachedLayoutManagers.length) {
                each(that._cachedLayoutManagers, (function(index, layoutManager) {
                    if ("formData" === optionFullName) {
                        that._isDataUpdating = true;
                        layoutManager.option("layoutData", args.value);
                        that._isDataUpdating = false
                    }
                    if ("readOnly" === args.name || "disabled" === args.name) {
                        layoutManager.option(optionFullName, args.value)
                    }
                }))
            }
        }))
    },
    _optionChanged: function(args) {
        const splitFullName = args.fullName.split(".");
        if (splitFullName.length > 1 && -1 !== splitFullName[0].search("items") && this._itemsOptionChangedHandler(args)) {
            return
        }
        if (splitFullName.length > 1 && -1 !== splitFullName[0].search("formData") && this._formDataOptionChangedHandler(args)) {
            return
        }
        this._defaultOptionChangedHandler(args)
    },
    _defaultOptionChangedHandler: function(args) {
        switch (args.name) {
            case "formData":
                if (!this.option("items")) {
                    this._invalidate()
                } else if (isEmptyObject(args.value)) {
                    this._clear()
                }
                break;
            case "onFieldDataChanged":
            case "alignRootItemLabels":
            case "readOnly":
            case "isDirty":
                break;
            case "items":
            case "colCount":
            case "onEditorEnterKey":
            case "labelLocation":
            case "labelMode":
            case "alignItemLabels":
            case "showColonAfterLabel":
            case "customizeItem":
            case "alignItemLabelsInAllGroups":
            case "showRequiredMark":
            case "showOptionalMark":
            case "requiredMark":
            case "optionalMark":
            case "requiredMessage":
            case "scrollingEnabled":
            case "formID":
            case "colCountByScreen":
            case "screenByWidth":
            case "stylingMode":
                this._invalidate();
                break;
            case "showValidationSummary":
                this._renderValidationSummary();
                break;
            case "minColWidth":
                if ("auto" === this.option("colCount")) {
                    this._invalidate()
                }
                break;
            case "width":
                this.callBase(args);
                this._rootLayoutManager.option(args.name, args.value);
                this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
                break;
            case "validationGroup":
                ValidationEngine.removeGroup(args.previousValue || this);
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    _itemsOptionChangedHandler: function(args) {
        const nameParts = args.fullName.split(".");
        const value = args.value;
        const itemPath = this._getItemPath(nameParts);
        const item = this.option(itemPath);
        const optionNameWithoutPath = args.fullName.replace(itemPath + ".", "");
        const simpleOptionName = optionNameWithoutPath.split(".")[0].replace(/\[\d+]/, "");
        const itemAction = this._tryCreateItemOptionAction(simpleOptionName, item, item[simpleOptionName], args.previousValue, itemPath);
        let result = this._tryExecuteItemOptionAction(itemAction) || this._tryChangeLayoutManagerItemOption(args.fullName, value);
        if (!result && item) {
            this._changeItemOption(item, optionNameWithoutPath, value);
            const items = this._generateItemsFromData(this.option("items"));
            this.option("items", items);
            result = true
        }
        return result
    },
    _formDataOptionChangedHandler: function(args) {
        const nameParts = args.fullName.split(".");
        const value = args.value;
        const dataField = nameParts.slice(1).join(".");
        const editor = this.getEditor(dataField);
        if (editor) {
            editor.option("value", value)
        } else {
            this._triggerOnFieldDataChanged({
                dataField: dataField,
                value: value
            })
        }
        return true
    },
    _tryCreateItemOptionAction: function(optionName, item, value, previousValue, itemPath) {
        if ("tabs" === optionName) {
            this._itemsRunTimeInfo.removeItemsByPathStartWith(`${itemPath}.tabs`);
            value = this._prepareItems(value, true, itemPath, true)
        }
        return tryCreateItemOptionAction(optionName, {
            item: item,
            value: value,
            previousValue: previousValue,
            itemsRunTimeInfo: this._itemsRunTimeInfo
        })
    },
    _tryExecuteItemOptionAction: function(action) {
        return action && action.tryExecute()
    },
    _updateValidationGroupAndSummaryIfNeeded: function(fullName) {
        const optionName = getOptionNameFromFullName(fullName);
        if (ITEM_OPTIONS_FOR_VALIDATION_UPDATING.indexOf(optionName) > -1) {
            ValidationEngine.addGroup(this._getValidationGroup());
            if (this.option("showValidationSummary")) {
                var _this$_validationSumm2;
                null === (_this$_validationSumm2 = this._validationSummary) || void 0 === _this$_validationSumm2 || _this$_validationSumm2.refreshValidationGroup()
            }
        }
    },
    _setLayoutManagerItemOption(layoutManager, optionName, value, path) {
        if (this._updateLockCount > 0) {
            !layoutManager._updateLockCount && layoutManager.beginUpdate();
            const key = this._itemsRunTimeInfo.findKeyByPath(path);
            this.postponedOperations.add(key, (() => {
                !layoutManager._disposed && layoutManager.endUpdate();
                return (new Deferred).resolve()
            }))
        }
        const contentReadyHandler = e => {
            e.component.off("contentReady", contentReadyHandler);
            if (isFullPathContainsTabs(path)) {
                const tabPath = tryGetTabPath(path);
                const tabLayoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(tabPath);
                if (tabLayoutManager) {
                    this._alignLabelsInColumn({
                        items: tabLayoutManager.option("items"),
                        layoutManager: tabLayoutManager,
                        $container: tabLayoutManager.$element(),
                        inOneColumn: tabLayoutManager.isSingleColumnMode()
                    })
                }
            } else {
                this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode())
            }
        };
        layoutManager.on("contentReady", contentReadyHandler);
        layoutManager.option(optionName, value);
        this._updateValidationGroupAndSummaryIfNeeded(optionName)
    },
    _tryChangeLayoutManagerItemOption(fullName, value) {
        const nameParts = fullName.split(".");
        const optionName = getOptionNameFromFullName(fullName);
        if ("items" === optionName && nameParts.length > 1) {
            const itemPath = this._getItemPath(nameParts);
            const layoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(itemPath);
            if (layoutManager) {
                this._itemsRunTimeInfo.removeItemsByItems(layoutManager.getItemsRunTimeInfo());
                const items = this._prepareItems(value, false, itemPath);
                this._setLayoutManagerItemOption(layoutManager, optionName, items, itemPath);
                return true
            }
        } else if (nameParts.length > 2) {
            const endPartIndex = nameParts.length - 2;
            const itemPath = this._getItemPath(nameParts.slice(0, endPartIndex));
            const layoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(itemPath);
            if (layoutManager) {
                const fullOptionName = getFullOptionName(nameParts[endPartIndex], optionName);
                if ("editorType" === optionName) {
                    if (layoutManager.option(fullOptionName) !== value) {
                        return false
                    }
                }
                if ("visible" === optionName) {
                    const formItems = this.option(getFullOptionName(itemPath, "items"));
                    if (formItems && formItems.length) {
                        const layoutManagerItems = layoutManager.option("items");
                        formItems.forEach(((item, index) => {
                            const layoutItem = layoutManagerItems[index];
                            layoutItem.visibleIndex = item.visibleIndex
                        }))
                    }
                }
                this._setLayoutManagerItemOption(layoutManager, fullOptionName, value, itemPath);
                return true
            }
        }
        return false
    },
    _tryChangeLayoutManagerItemOptions(itemPath, options) {
        let result;
        this.beginUpdate();
        each(options, ((optionName, optionValue) => {
            result = this._tryChangeLayoutManagerItemOption(getFullOptionName(itemPath, optionName), optionValue);
            if (!result) {
                return false
            }
        }));
        this.endUpdate();
        return result
    },
    _getItemPath: function(nameParts) {
        let itemPath = nameParts[0];
        let i;
        for (i = 1; i < nameParts.length; i++) {
            if (-1 !== nameParts[i].search(/items\[\d+]|tabs\[\d+]/)) {
                itemPath += "." + nameParts[i]
            } else {
                break
            }
        }
        return itemPath
    },
    _triggerOnFieldDataChanged: function(args) {
        this._updateIsDirty(args.dataField);
        this._createActionByOption("onFieldDataChanged")(args)
    },
    _triggerOnFieldDataChangedByDataSet(data) {
        if (data && isObject(data)) {
            Object.keys(data).forEach((key => {
                this._triggerOnFieldDataChanged({
                    dataField: key,
                    value: data[key]
                })
            }))
        }
    },
    _updateFieldValue: function(dataField, value) {
        if (isDefined(this.option("formData"))) {
            const editor = this.getEditor(dataField);
            this.option("formData." + dataField, value);
            if (editor) {
                const editorValue = editor.option("value");
                if (editorValue !== value) {
                    editor.option("value", value)
                }
            }
        }
    },
    _generateItemsFromData: function(items) {
        const formData = this.option("formData");
        const result = [];
        if (!items && isDefined(formData)) {
            each(formData, (function(dataField) {
                result.push({
                    dataField: dataField
                })
            }))
        }
        if (items) {
            each(items, (function(index, item) {
                if (isObject(item)) {
                    result.push(item)
                } else {
                    result.push({
                        dataField: item
                    })
                }
            }))
        }
        return result
    },
    _getItemByField: function(field, items) {
        const that = this;
        const fieldParts = isObject(field) ? field : that._getFieldParts(field);
        const fieldName = fieldParts.fieldName;
        const fieldPath = fieldParts.fieldPath;
        let resultItem;
        if (items.length) {
            each(items, (function(index, item) {
                const itemType = item.itemType;
                if (fieldPath.length) {
                    const path = fieldPath.slice();
                    item = that._getItemByFieldPath(path, fieldName, item)
                } else if ("group" === itemType && !(item.caption || item.name) || "tabbed" === itemType && !item.name) {
                    const subItemsField = that._getSubItemField(itemType);
                    item.items = that._generateItemsFromData(item.items);
                    item = that._getItemByField({
                        fieldName: fieldName,
                        fieldPath: fieldPath
                    }, item[subItemsField])
                }
                if (isEqualToDataFieldOrNameOrTitleOrCaption(item, fieldName)) {
                    resultItem = item;
                    return false
                }
            }))
        }
        return resultItem
    },
    _getFieldParts: function(field) {
        let fieldName = field;
        let separatorIndex = fieldName.indexOf(".");
        const resultPath = [];
        while (-1 !== separatorIndex) {
            resultPath.push(fieldName.substr(0, separatorIndex));
            fieldName = fieldName.substr(separatorIndex + 1);
            separatorIndex = fieldName.indexOf(".")
        }
        return {
            fieldName: fieldName,
            fieldPath: resultPath.reverse()
        }
    },
    _getItemByFieldPath: function(path, fieldName, item) {
        const that = this;
        const itemType = item.itemType;
        const subItemsField = that._getSubItemField(itemType);
        const isItemWithSubItems = "group" === itemType || "tabbed" === itemType || item.title;
        let result;
        do {
            if (isItemWithSubItems) {
                const name = item.name || item.caption || item.title;
                const isGroupWithName = isDefined(name);
                const nameWithoutSpaces = getTextWithoutSpaces(name);
                let pathNode;
                item[subItemsField] = that._generateItemsFromData(item[subItemsField]);
                if (isGroupWithName) {
                    pathNode = path.pop()
                }
                if (!path.length) {
                    result = that._getItemByField(fieldName, item[subItemsField]);
                    if (result) {
                        break
                    }
                }
                if (!isGroupWithName || isGroupWithName && nameWithoutSpaces === pathNode) {
                    if (path.length) {
                        result = that._searchItemInEverySubItem(path, fieldName, item[subItemsField])
                    }
                }
            } else {
                break
            }
        } while (path.length && !isDefined(result));
        return result
    },
    _getSubItemField: function(itemType) {
        return "tabbed" === itemType ? "tabs" : "items"
    },
    _searchItemInEverySubItem: function(path, fieldName, items) {
        const that = this;
        let result;
        each(items, (function(index, groupItem) {
            result = that._getItemByFieldPath(path.slice(), fieldName, groupItem);
            if (result) {
                return false
            }
        }));
        if (!result) {
            result = false
        }
        return result
    },
    _changeItemOption: function(item, option, value) {
        if (isObject(item)) {
            item[option] = value
        }
    },
    _dimensionChanged: function() {
        const currentScreenFactor = this._getCurrentScreenFactor();
        if (this._lastMarkupScreenFactor !== currentScreenFactor) {
            if (this._isColCountChanged(this._lastMarkupScreenFactor, currentScreenFactor)) {
                this._targetScreenFactor = currentScreenFactor;
                this._refresh();
                this._targetScreenFactor = void 0
            }
            this._lastMarkupScreenFactor = currentScreenFactor
        }
    },
    _isColCountChanged: function(oldScreenSize, newScreenSize) {
        let isChanged = false;
        each(this._cachedColCountOptions, (function(index, item) {
            if (item.colCountByScreen[oldScreenSize] !== item.colCountByScreen[newScreenSize]) {
                isChanged = true;
                return false
            }
        }));
        return isChanged
    },
    _refresh: function() {
        eventsEngine.trigger(this.$element().find(".dx-state-focused > :not(.dx-dropdowneditor-input-wrapper) input, .dx-state-focused textarea"), "change");
        this.callBase()
    },
    _updateIsDirty: function(dataField) {
        const editor = this.getEditor(dataField);
        if (!editor) {
            return
        }
        if (editor.option("isDirty")) {
            this._dirtyFields.add(dataField)
        } else {
            this._dirtyFields.delete(dataField)
        }
        this.option("isDirty", !!this._dirtyFields.size)
    },
    updateRunTimeInfoForEachEditor: function(editorAction) {
        this._itemsRunTimeInfo.each((function(_, itemRunTimeInfo) {
            const widgetInstance = itemRunTimeInfo.widgetInstance;
            if (isDefined(widgetInstance) && Editor.isEditor(widgetInstance)) {
                editorAction(widgetInstance)
            }
        }))
    },
    _clear: function() {
        this.updateRunTimeInfoForEachEditor((editor => {
            editor.clear();
            editor.option("isValid", true)
        }));
        ValidationEngine.resetGroup(this._getValidationGroup())
    },
    _updateData: function(data, value, isComplexData) {
        const that = this;
        const _data = isComplexData ? value : data;
        if (isObject(_data)) {
            each(_data, (function(dataField, fieldValue) {
                that._updateData(isComplexData ? data + "." + dataField : dataField, fieldValue, isObject(fieldValue))
            }))
        } else if (isString(data)) {
            that._updateFieldValue(data, value)
        }
    },
    registerKeyHandler: function(key, handler) {
        this.callBase(key, handler);
        this._itemsRunTimeInfo.each((function(_, itemRunTimeInfo) {
            if (isDefined(itemRunTimeInfo.widgetInstance)) {
                itemRunTimeInfo.widgetInstance.registerKeyHandler(key, handler)
            }
        }))
    },
    _focusTarget: function() {
        return this.$element().find("." + FIELD_ITEM_CONTENT_CLASS + " [tabindex]").first()
    },
    _visibilityChanged: function() {
        this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode())
    },
    _clearAutoColCountChangedTimeout: function() {
        if (this.autoColCountChangedTimeoutId) {
            clearTimeout(this.autoColCountChangedTimeoutId);
            this.autoColCountChangedTimeoutId = void 0
        }
    },
    _dispose: function() {
        this._clearAutoColCountChangedTimeout();
        ValidationEngine.removeGroup(this._getValidationGroup());
        this.callBase()
    },
    clear: function() {
        this._clear()
    },
    resetValues: function() {
        this._clear()
    },
    reset: function(editorsData) {
        this.updateRunTimeInfoForEachEditor((editor => {
            const editorName = editor.option("name");
            if (editorsData && editorName in editorsData) {
                editor.reset(editorsData[editorName])
            } else {
                editor.reset()
            }
        }));
        this._renderValidationSummary()
    },
    updateData: function(data, value) {
        this._updateData(data, value)
    },
    getEditor: function(dataField) {
        return this._itemsRunTimeInfo.findWidgetInstanceByDataField(dataField) || this._itemsRunTimeInfo.findWidgetInstanceByName(dataField)
    },
    getButton: function(name) {
        return this._itemsRunTimeInfo.findWidgetInstanceByName(name)
    },
    updateDimensions: function() {
        const that = this;
        const deferred = new Deferred;
        if (that._scrollable) {
            that._scrollable.update().done((function() {
                deferred.resolveWith(that)
            }))
        } else {
            deferred.resolveWith(that)
        }
        return deferred.promise()
    },
    itemOption: function(id, option, value) {
        const items = this._generateItemsFromData(this.option("items"));
        const item = this._getItemByField(id, items);
        const path = getItemPath(items, item);
        if (!item) {
            return
        }
        switch (arguments.length) {
            case 1:
                return item;
            case 3: {
                const itemAction = this._tryCreateItemOptionAction(option, item, value, item[option], path);
                this._changeItemOption(item, option, value);
                const fullName = getFullOptionName(path, option);
                if (!this._tryExecuteItemOptionAction(itemAction) && !this._tryChangeLayoutManagerItemOption(fullName, value)) {
                    this.option("items", items)
                }
                break
            }
            default:
                if (isObject(option)) {
                    if (!this._tryChangeLayoutManagerItemOptions(path, option)) {
                        let allowUpdateItems;
                        each(option, ((optionName, optionValue) => {
                            const itemAction = this._tryCreateItemOptionAction(optionName, item, optionValue, item[optionName], path);
                            this._changeItemOption(item, optionName, optionValue);
                            if (!allowUpdateItems && !this._tryExecuteItemOptionAction(itemAction)) {
                                allowUpdateItems = true
                            }
                        }));
                        allowUpdateItems && this.option("items", items)
                    }
                }
        }
    },
    validate: function() {
        return ValidationEngine.validateGroup(this._getValidationGroup())
    },
    getItemID: function(name) {
        return "dx_" + this.option("formID") + "_" + (name || new Guid)
    },
    getTargetScreenFactor: function() {
        return this._targetScreenFactor
    }
});
registerComponent("dxForm", Form);
export default Form;
