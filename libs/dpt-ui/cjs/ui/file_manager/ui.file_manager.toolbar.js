/**
 * DevExtreme (cjs/ui/file_manager/ui.file_manager.toolbar.js)
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
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _common = require("../../core/utils/common");
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiFile_manager = require("./ui.file_manager.common");
var _themes = require("../themes");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _toolbar = _interopRequireDefault(require("../toolbar"));
require("../drop_down_button");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const FILE_MANAGER_TOOLBAR_CLASS = "dx-filemanager-toolbar";
const FILE_MANAGER_GENERAL_TOOLBAR_CLASS = "dx-filemanager-general-toolbar";
const FILE_MANAGER_FILE_TOOLBAR_CLASS = "dx-filemanager-file-toolbar";
const FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS = "dx-filemanager-toolbar-separator-item";
const FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS = "dx-filemanager-toolbar-viewmode-item";
const FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS = "dx-filemanager-toolbar-has-large-icon";
const FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS = "dx-filemanager-view-switcher-popup";
const DEFAULT_ITEM_CONFIGS = {
    showNavPane: {
        location: "before"
    },
    create: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    upload: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    refresh: {
        location: "after",
        showText: "inMenu",
        cssClass: "dx-filemanager-toolbar-has-large-icon",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    switchView: {
        location: "after"
    },
    download: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    move: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    copy: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    rename: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    delete: {
        location: "before",
        compactMode: {
            showText: "inMenu"
        }
    },
    clearSelection: {
        location: "after",
        locateInMenu: "never",
        compactMode: {
            showText: "inMenu"
        }
    },
    separator: {
        location: "before"
    }
};
const DEFAULT_ITEM_ALLOWED_PROPERTIES = ["visible", "location", "locateInMenu", "disabled", "showText"];
const DEFAULT_ITEM_ALLOWED_OPTION_PROPERTIES = ["accessKey", "elementAttr", "height", "hint", "icon", "stylingMode", "tabIndex", "text", "width"];
const ALWAYS_VISIBLE_TOOLBAR_ITEMS = ["separator", "switchView"];
const REFRESH_ICON_MAP = {
    default: "dx-filemanager-i dx-filemanager-i-refresh",
    progress: "dx-filemanager-i dx-filemanager-i-progress",
    success: "dx-filemanager-i dx-filemanager-i-done",
    error: "dx-filemanager-i dx-filemanager-i-danger"
};
const REFRESH_ITEM_PROGRESS_MESSAGE_DELAY = 500;
class FileManagerToolbar extends _ui.default {
    _init() {
        super._init();
        this._generalToolbarVisible = true;
        this._refreshItemState = {
            message: "",
            status: "default"
        }
    }
    _initMarkup() {
        this._createItemClickedAction();
        this._$viewSwitcherPopup = (0, _renderer.default)("<div>").addClass("dx-filemanager-view-switcher-popup");
        this._generalToolbar = this._createToolbar(this.option("generalItems"), !this._generalToolbarVisible);
        this._fileToolbar = this._createToolbar(this.option("fileItems"), this._generalToolbarVisible);
        this._$viewSwitcherPopup.appendTo(this.$element());
        this.$element().addClass("dx-filemanager-toolbar dx-filemanager-general-toolbar")
    }
    _render() {
        super._render();
        const toolbar = this._getVisibleToolbar();
        this._checkCompactMode(toolbar)
    }
    _clean() {
        delete this._commandManager;
        delete this._itemClickedAction;
        delete this._$viewSwitcherPopup;
        delete this._generalToolbar;
        delete this._fileToolbar;
        super._clean()
    }
    _dimensionChanged(dimension) {
        if (!dimension || "height" !== dimension) {
            const toolbar = this._getVisibleToolbar();
            this._checkCompactMode(toolbar)
        }
    }
    _getVisibleToolbar() {
        return this._generalToolbarVisible ? this._generalToolbar : this._fileToolbar
    }
    _createToolbar(items, hidden) {
        const toolbarItems = this._getPreparedItems(items);
        const $toolbar = (0, _renderer.default)("<div>").appendTo(this.$element());
        const result = this._createComponent($toolbar, _toolbar.default, {
            items: toolbarItems,
            visible: !hidden,
            onItemClick: args => this._raiseItemClicked(args)
        });
        result.compactMode = false;
        return result
    }
    _getPreparedItems(items) {
        items = items.map((item => {
            let extendedItem = item;
            if ((0, _type.isString)(item)) {
                extendedItem = {
                    name: item
                }
            }
            const commandName = extendedItem.name;
            const preparedItem = this._configureItemByCommandName(commandName, extendedItem);
            preparedItem.originalItemData = item;
            if ("separator" !== commandName) {
                this._setItemVisibleAvailable(preparedItem)
            }
            return preparedItem
        }));
        this._updateSeparatorsVisibility(items);
        return items
    }
    _updateSeparatorsVisibility(items, toolbar) {
        let hasModifications = false;
        const menuItems = this._getMenuItems(toolbar);
        const hasItemsBefore = {
            before: false,
            center: false,
            after: false
        };
        const itemGroups = {
            before: this._getItemsInGroup(items, menuItems, "before"),
            center: this._getItemsInGroup(items, menuItems, "center"),
            after: this._getItemsInGroup(items, menuItems, "after")
        };
        items.forEach(((item, i) => {
            const itemLocation = item.location;
            if ("separator" === item.name) {
                const isSeparatorVisible = hasItemsBefore[itemLocation] && this._groupHasItemsAfter(itemGroups[itemLocation]);
                if (item.visible !== isSeparatorVisible) {
                    hasModifications = true;
                    item.visible = isSeparatorVisible
                }
                hasItemsBefore[itemLocation] = false
            } else {
                if (!this._isItemInMenu(menuItems, item)) {
                    hasItemsBefore[itemLocation] = hasItemsBefore[itemLocation] || item.visible
                }
                itemGroups[itemLocation].shift()
            }
        }));
        if (toolbar && hasModifications) {
            toolbar.repaint()
        }
        return hasModifications
    }
    _getMenuItems(toolbar) {
        const result = toolbar ? toolbar._getMenuItems() : [];
        return result.map((menuItem => menuItem.originalItemData))
    }
    _isItemInMenu(menuItems, item) {
        return !!menuItems.length && "never" !== (0, _common.ensureDefined)(item.locateInMenu, "never") && -1 !== menuItems.indexOf(item.originalItemData)
    }
    _getItemsInGroup(items, menuItems, groupName) {
        return items.filter((item => item.location === groupName && !this._isItemInMenu(menuItems, item)))
    }
    _groupHasItemsAfter(items) {
        for (let i = 0; i < items.length; i++) {
            if ("separator" !== items[i].name && items[i].visible) {
                return true
            }
        }
        return false
    }
    _configureItemByCommandName(commandName, item) {
        var _result$options;
        let result = {};
        const command = this._commandManager.getCommandByName(commandName);
        if (command) {
            result = this._createCommandItem(command)
        }
        switch (commandName) {
            case "separator":
                result = this._createSeparatorItem();
                break;
            case "switchView":
                result = this._createViewModeItem()
        }
        if (this._isDefaultItem(commandName)) {
            const defaultConfig = DEFAULT_ITEM_CONFIGS[commandName];
            (0, _extend.extend)(true, result, defaultConfig);
            let resultCssClass = result.cssClass || "";
            (0, _uiFile_manager.extendAttributes)(result, item, DEFAULT_ITEM_ALLOWED_PROPERTIES);
            if ((0, _type.isDefined)(item.options)) {
                (0, _uiFile_manager.extendAttributes)(result.options, item.options, DEFAULT_ITEM_ALLOWED_OPTION_PROPERTIES)
            }(0, _uiFile_manager.extendAttributes)(result.options, item, ["text", "icon"]);
            if (item.cssClass) {
                resultCssClass = `${resultCssClass} ${item.cssClass}`
            }
            if (resultCssClass) {
                result.cssClass = resultCssClass
            }
            if (!(0, _type.isDefined)(item.visible)) {
                result._autoHide = true
            }
            if ("dxButton" === result.widget) {
                if ("inMenu" === result.showText && !(0, _type.isDefined)(result.options.hint)) {
                    result.options.hint = result.options.text
                }
                if (result.compactMode && !(0, _type.isDefined)(result.options.hint)) {
                    this._configureHintForCompactMode(result)
                }
            }
        } else {
            (0, _extend.extend)(true, result, item);
            if (!result.widget) {
                result.widget = "dxButton"
            }
            if ("dxButton" === result.widget && !result.compactMode && !result.showText && result.options && result.options.icon && result.options.text) {
                result.compactMode = {
                    showText: "inMenu"
                }
            }
        }
        if (commandName && !result.name) {
            (0, _extend.extend)(result, {
                name: commandName
            })
        }
        result.location = (0, _common.ensureDefined)(result.location, "before");
        if (!(0, _type.isDefined)(null === (_result$options = result.options) || void 0 === _result$options ? void 0 : _result$options.stylingMode)) {
            if ("dxButton" === result.widget) {
                (0, _extend.extend)(true, result, {
                    options: {
                        stylingMode: "text"
                    }
                })
            }
            if ("dxSelectBox" === result.widget) {
                (0, _extend.extend)(true, result, {
                    options: {
                        stylingMode: "filled"
                    }
                })
            }
        }
        return result
    }
    _isDefaultItem(commandName) {
        return !!DEFAULT_ITEM_CONFIGS[commandName]
    }
    _createCommandItem(command) {
        return {
            widget: "dxButton",
            options: {
                text: command.text,
                hint: command.hint,
                commandText: command.text,
                icon: command.icon,
                stylingMode: "text",
                onClick: e => this._executeCommand(command)
            }
        }
    }
    _createSeparatorItem() {
        return {
            template: (data, index, element) => {
                (0, _renderer.default)(element).addClass("dx-filemanager-toolbar-separator-item")
            }
        }
    }
    _createViewModeItem() {
        const commandItems = ["details", "thumbnails"].map((name => {
            const {
                text: text,
                icon: icon
            } = this._commandManager.getCommandByName(name);
            return {
                name: name,
                text: text,
                icon: icon
            }
        }));
        const selectedIndex = "thumbnails" === this.option("itemViewMode") ? 1 : 0;
        const dropDownOptions = {
            container: this._$viewSwitcherPopup
        };
        if ((0, _themes.isMaterial)()) {
            dropDownOptions.width = (0, _themes.isCompact)() ? 28 : 36
        } else if ((0, _themes.isFluent)()) {
            dropDownOptions.width = (0, _themes.isCompact)() ? 34 : 40
        }
        return {
            cssClass: "dx-filemanager-toolbar-viewmode-item",
            widget: "dxDropDownButton",
            options: {
                items: commandItems,
                keyExpr: "name",
                selectedItemKey: this.option("itemViewMode"),
                displayExpr: " ",
                hint: commandItems[selectedIndex].text,
                stylingMode: "text",
                showArrowIcon: false,
                useSelectMode: true,
                dropDownOptions: dropDownOptions,
                onItemClick: e => this._executeCommand(e.itemData.name)
            }
        }
    }
    _configureHintForCompactMode(item) {
        item.options.hint = "";
        item.compactMode.options = item.compactMode.options || {};
        item.compactMode.options.hint = item.options.text
    }
    _checkCompactMode(toolbar) {
        if (toolbar.compactMode) {
            this._toggleCompactMode(toolbar, false)
        }
        const useCompactMode = this._toolbarHasItemsOverflow(toolbar);
        if (toolbar.compactMode !== useCompactMode) {
            if (!toolbar.compactMode) {
                this._toggleCompactMode(toolbar, useCompactMode)
            }
            toolbar.compactMode = useCompactMode
        } else if (toolbar.compactMode) {
            this._toggleCompactMode(toolbar, true)
        }
    }
    _toolbarHasItemsOverflow(toolbar) {
        const toolbarWidth = (0, _size.getWidth)(toolbar.$element());
        const itemsWidth = toolbar._getItemsWidth();
        return toolbarWidth < itemsWidth
    }
    _toggleCompactMode(toolbar, useCompactMode) {
        let hasModifications = false;
        const items = toolbar.option("items");
        items.forEach((item => {
            if (item.compactMode) {
                let optionsSource = null;
                if (useCompactMode) {
                    item.saved = this._getCompactModeOptions(item, item._available);
                    optionsSource = item.compactMode
                } else {
                    optionsSource = item.saved
                }
                const options = this._getCompactModeOptions(optionsSource, item._available);
                (0, _extend.extend)(true, item, options);
                hasModifications = true
            }
        }));
        hasModifications = this._updateSeparatorsVisibility(items) || hasModifications;
        if (hasModifications) {
            toolbar.repaint()
        }
        this._updateSeparatorsVisibility(items, toolbar)
    }
    _getCompactModeOptions(_ref, available) {
        let {
            showText: showText,
            locateInMenu: locateInMenu,
            options: options
        } = _ref;
        return {
            visible: available,
            showText: (0, _common.ensureDefined)(showText, "always"),
            locateInMenu: (0, _common.ensureDefined)(locateInMenu, "never"),
            options: {
                hint: null === options || void 0 === options ? void 0 : options.hint
            }
        }
    }
    _ensureAvailableCommandsVisible(toolbar) {
        let hasModifications = false;
        const items = toolbar.option("items");
        items.forEach((item => {
            if ("separator" !== item.name) {
                const itemVisible = item._available;
                this._setItemVisibleAvailable(item);
                if (item._available !== itemVisible) {
                    hasModifications = true
                }
            }
        }));
        hasModifications = this._updateSeparatorsVisibility(items) || hasModifications;
        if (hasModifications) {
            toolbar.repaint()
        }
        this._updateSeparatorsVisibility(items, toolbar)
    }
    _setItemVisibleAvailable(item) {
        var _item$originalItemDat;
        const originalVisible = null === (_item$originalItemDat = item.originalItemData) || void 0 === _item$originalItemDat ? void 0 : _item$originalItemDat.visible;
        item._available = this._isToolbarItemAvailable(item);
        item.visible = (0, _type.isDefined)(originalVisible) ? originalVisible : item._available
    }
    _fileToolbarHasEffectiveItems() {
        const items = this._fileToolbar.option("items");
        return items.some((item => this._isFileToolbarItemAvailable(item)))
    }
    _executeCommand(command) {
        this._commandManager.executeCommand(command)
    }
    _isToolbarItemAvailable(toolbarItem) {
        if (!this._isDefaultItem(toolbarItem.name) || !toolbarItem._autoHide) {
            return (0, _common.ensureDefined)(toolbarItem.visible, true)
        }
        if ("refresh" === toolbarItem.name) {
            return this._generalToolbarVisible || !!this._isRefreshVisibleInFileToolbar
        }
        if (ALWAYS_VISIBLE_TOOLBAR_ITEMS.indexOf(toolbarItem.name) > -1) {
            return true
        }
        return this._isCommandAvailable(toolbarItem.name)
    }
    _isFileToolbarItemAvailable(_ref2) {
        let {
            name: name,
            visible: visible
        } = _ref2;
        return !this._isDefaultItem(name) && (0, _common.ensureDefined)(visible, true) || "clearSelection" !== name && "refresh" !== name && this._isCommandAvailable(name)
    }
    _isCommandAvailable(name) {
        return this._commandManager.isCommandAvailable(name, this.option("contextItems"))
    }
    _updateItemInToolbar(toolbar, commandName, options) {
        toolbar.beginUpdate();
        const items = toolbar.option("items");
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.name === commandName) {
                toolbar.option(`items[${i}]`, options);
                break
            }
        }
        toolbar.endUpdate()
    }
    _raiseItemClicked(args) {
        const changedArgs = (0, _extend.extend)(true, {}, args);
        changedArgs.itemData = args.itemData.originalItemData;
        this._itemClickedAction(changedArgs)
    }
    _createItemClickedAction() {
        this._itemClickedAction = this._createActionByOption("onItemClick")
    }
    _getDefaultOptions() {
        return (0, _extend.extend)(super._getDefaultOptions(), {
            commandManager: null,
            generalItems: [],
            fileItems: [],
            contextItems: [],
            itemViewMode: "details",
            onItemClick: null
        })
    }
    _optionChanged(args) {
        const name = args.name;
        switch (name) {
            case "commandManager":
            case "itemViewMode":
            case "generalItems":
            case "fileItems":
                this.repaint();
                break;
            case "contextItems":
                this._update();
                break;
            case "onItemClick":
                this._itemClickedAction = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    updateItemPermissions() {
        this.repaint();
        this._restoreRefreshItemState()
    }
    _restoreRefreshItemState() {
        this.updateRefreshItem(this._refreshItemState.message, this._refreshItemState.status)
    }
    updateRefreshItem(message, status) {
        let generalToolbarOptions = null;
        let text = _message.default.format("dxFileManager-commandRefresh");
        let showText = "inMenu";
        this._isRefreshVisibleInFileToolbar = false;
        this._refreshItemState = {
            message: message,
            status: status
        };
        if ("default" === status) {
            generalToolbarOptions = {
                options: {
                    icon: REFRESH_ICON_MAP.default
                }
            }
        } else {
            generalToolbarOptions = {
                options: {
                    icon: REFRESH_ICON_MAP[status]
                }
            };
            this._isRefreshVisibleInFileToolbar = true;
            text = message;
            showText = "always"
        }
        const fileToolbarOptions = (0, _extend.extend)({}, generalToolbarOptions, {
            visible: this._isRefreshVisibleInFileToolbar
        });
        this._applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions);
        this._refreshItemTextTimeout = this._updateRefreshItemText("progress" === status, text, showText)
    }
    _updateRefreshItemText(isDeferredUpdate, text, showText) {
        const options = {
            showText: showText,
            options: {
                text: text
            }
        };
        if (isDeferredUpdate) {
            return setTimeout((() => {
                this._applyRefreshItemOptions(options);
                this._refreshItemTextTimeout = void 0
            }), 500)
        } else {
            if (this._refreshItemTextTimeout) {
                clearTimeout(this._refreshItemTextTimeout)
            }
            this._applyRefreshItemOptions(options);
            return
        }
    }
    _applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions) {
        if (!fileToolbarOptions) {
            fileToolbarOptions = (0, _extend.extend)({}, generalToolbarOptions)
        }
        this._updateItemInToolbar(this._generalToolbar, "refresh", generalToolbarOptions);
        this._updateItemInToolbar(this._fileToolbar, "refresh", fileToolbarOptions)
    }
    _update() {
        const showGeneralToolbar = 0 === this.option("contextItems").length || !this._fileToolbarHasEffectiveItems();
        if (this._generalToolbarVisible !== showGeneralToolbar) {
            this._generalToolbar.option("visible", showGeneralToolbar);
            this._fileToolbar.option("visible", !showGeneralToolbar);
            this._generalToolbarVisible = showGeneralToolbar;
            this.$element().toggleClass("dx-filemanager-general-toolbar", showGeneralToolbar);
            this.$element().toggleClass("dx-filemanager-file-toolbar", !showGeneralToolbar)
        }
        const toolbar = this._getVisibleToolbar();
        this._ensureAvailableCommandsVisible(toolbar);
        this._checkCompactMode(toolbar)
    }
    get _commandManager() {
        return this.option("commandManager")
    }
}
var _default = exports.default = FileManagerToolbar;
module.exports = exports.default;
module.exports.default = exports.default;
