/**
 * DevExtreme (cjs/ui/html_editor/modules/toolbar.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dpt-uiQuill = _interopRequireDefault(require("dpt-ui-quill"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _base = _interopRequireDefault(require("./base"));
var _toolbar = _interopRequireDefault(require("../../toolbar"));
require("../../select_box");
require("../../../__internal/ui/color_box/m_color_view");
require("../../number_box");
var _ui = _interopRequireDefault(require("../../widget/ui.errors"));
var _widget_collector = _interopRequireDefault(require("./widget_collector"));
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _extend = require("../../../core/utils/extend");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _inflector = require("../../../core/utils/inflector");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _index = require("../../../events/utils/index");
var _table_helper = require("../utils/table_helper");
var _toolbar_helper = require("../utils/toolbar_helper");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
let ToolbarModule = _base.default;
if (_dpt-uiQuill.default) {
    const TOOLBAR_WRAPPER_CLASS = "dx-htmleditor-toolbar-wrapper";
    const TOOLBAR_CLASS = "dx-htmleditor-toolbar";
    const TOOLBAR_FORMAT_WIDGET_CLASS = "dx-htmleditor-toolbar-format";
    const TOOLBAR_SEPARATOR_CLASS = "dx-htmleditor-toolbar-separator";
    const TOOLBAR_MENU_SEPARATOR_CLASS = "dx-htmleditor-toolbar-menu-separator";
    const ACTIVE_FORMAT_CLASS = "dx-format-active";
    const SELECTED_STATE_CLASS = "dx-state-selected";
    const ICON_CLASS = "dx-icon";
    const SELECTION_CHANGE_EVENT = "selection-change";
    const USER_ACTION = "user";
    const SILENT_ACTION = "silent";
    const FORMAT_HOTKEYS = {
        66: "bold",
        73: "italic",
        85: "underline"
    };
    const KEY_CODES = {
        b: 66,
        i: 73,
        u: 85
    };
    const localize = name => _message.default.format(`dxHtmlEditor-${(0,_inflector.camelize)(name)}`);
    const localizeValue = (value, name) => {
        if ("header" === name) {
            const isHeaderValue = (0, _type.isDefined)(value) && false !== value;
            return isHeaderValue ? `${localize("heading")} ${value}` : localize("normalText")
        }
        return localize(value) || value
    };
    ToolbarModule = class extends _base.default {
        constructor(quill, options) {
            var _this;
            super(quill, options);
            _this = this;
            this._toolbarWidgets = new _widget_collector.default;
            this._formatHandlers = (0, _toolbar_helper.getFormatHandlers)(this);
            this._tableFormats = (0, _table_helper.getTableFormats)(quill);
            if ((0, _type.isDefined)(options.items)) {
                this._addCallbacks();
                this._renderToolbar();
                const toolbarMenu = this.toolbarInstance._layoutStrategy._menu;
                if (toolbarMenu) {
                    const _renderPopup = toolbarMenu._renderPopup;
                    toolbarMenu._renderPopup = function() {
                        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key]
                        }
                        _renderPopup.apply(toolbarMenu, ...args);
                        toolbarMenu._popup.on("showing", (() => {
                            _this._updateToolbar(true)
                        }))
                    }
                }
                this.quill.on("editor-change", ((eventName, newValue, oldValue, eventSource) => {
                    const isSilentMode = eventSource === SILENT_ACTION && (0, _type.isEmptyObject)(this.quill.getFormat());
                    if (!isSilentMode) {
                        const isSelectionChanged = eventName === SELECTION_CHANGE_EVENT;
                        this._updateToolbar(isSelectionChanged)
                    }
                }))
            }
        }
        _addCallbacks() {
            this.addCleanCallback(this.clean.bind(this));
            this.editorInstance.addContentInitializedCallback(this.updateHistoryWidgets.bind(this))
        }
        _updateToolbar(isSelectionChanged) {
            this.updateFormatWidgets(isSelectionChanged);
            this.updateHistoryWidgets();
            this.updateTableWidgets()
        }
        _updateFormatWidget(name, isApplied, formats) {
            const widget = this._toolbarWidgets.getByName(name);
            if (!widget) {
                return
            }
            if (isApplied) {
                this._markActiveFormatWidget(name, widget, formats)
            } else {
                this._resetFormatWidget(name, widget);
                if (Object.prototype.hasOwnProperty.call(name)) {
                    delete formats[name]
                }
            }
            this._toggleClearFormatting(isApplied || !(0, _type.isEmptyObject)(formats))
        }
        _renderToolbar() {
            const container = this.options.container || this._getContainer();
            this._$toolbar = (0, _renderer.default)("<div>").addClass(TOOLBAR_CLASS).appendTo(container);
            this._$toolbarContainer = (0, _renderer.default)(container).addClass(TOOLBAR_WRAPPER_CLASS);
            _events_engine.default.on(this._$toolbarContainer, (0, _index.addNamespace)("mousedown", this.editorInstance.NAME), (e => {
                e.target.focus();
                e.preventDefault()
            }));
            this._subscribeFormatHotKeys();
            this.toolbarInstance = this.editorInstance._createComponent(this._$toolbar, _toolbar.default, this.toolbarConfig);
            this.editorInstance.on("optionChanged", (_ref => {
                let {
                    name: name
                } = _ref;
                if ("readOnly" === name || "disabled" === name) {
                    this.toolbarInstance.option("disabled", this.isInteractionDisabled)
                }
            }))
        }
        get toolbarConfig() {
            return {
                dataSource: this._prepareToolbarItems(),
                disabled: this.isInteractionDisabled,
                menuContainer: this._$toolbarContainer,
                multiline: this.isMultilineMode()
            }
        }
        get isInteractionDisabled() {
            return this.editorInstance.option("readOnly") || this.editorInstance.option("disabled")
        }
        isMultilineMode() {
            return this.options.multiline ?? true
        }
        clean() {
            this._toolbarWidgets.clear();
            if (this._$toolbarContainer) {
                this._$toolbarContainer.empty().removeClass(TOOLBAR_WRAPPER_CLASS)
            }
        }
        repaint() {
            this.toolbarInstance && this.toolbarInstance.repaint()
        }
        _getContainer() {
            const $container = (0, _renderer.default)("<div>");
            this.editorInstance.$element().prepend($container);
            return $container
        }
        _detectRenamedOptions(item) {
            const optionsInfo = [{
                newName: "name",
                oldName: "formatName"
            }, {
                newName: "acceptedValues",
                oldName: "formatValues"
            }];
            if ((0, _type.isObject)(item)) {
                (0, _iterator.each)(optionsInfo, ((index, optionName) => {
                    if (Object.prototype.hasOwnProperty.call(item, optionName.oldName)) {
                        _ui.default.log("W1016", optionName.oldName, optionName.newName)
                    }
                }))
            }
        }
        _subscribeFormatHotKeys() {
            this.quill.keyboard.addBinding({
                which: KEY_CODES.b,
                shortKey: true
            }, this._handleFormatHotKey.bind(this));
            this.quill.keyboard.addBinding({
                which: KEY_CODES.i,
                shortKey: true
            }, this._handleFormatHotKey.bind(this));
            this.quill.keyboard.addBinding({
                which: KEY_CODES.u,
                shortKey: true
            }, this._handleFormatHotKey.bind(this))
        }
        _handleFormatHotKey(range, context, _ref2) {
            let {
                which: which
            } = _ref2;
            const formatName = FORMAT_HOTKEYS[which];
            this._updateButtonState(formatName)
        }
        _updateButtonState(formatName) {
            const formatWidget = this._toolbarWidgets.getByName(formatName);
            const currentFormat = this.quill.getFormat();
            const formatValue = currentFormat[formatName];
            if (formatValue) {
                this._markActiveFormatWidget(formatName, formatWidget, currentFormat)
            } else {
                this._resetFormatWidget(formatName, formatWidget)
            }
        }
        _prepareToolbarItems() {
            const resultItems = [];
            (0, _iterator.each)(this.options.items, ((index, item) => {
                let newItem;
                this._detectRenamedOptions(item);
                if ((0, _type.isObject)(item)) {
                    newItem = this._handleObjectItem(item)
                } else if ((0, _type.isString)(item)) {
                    const buttonItemConfig = this._prepareButtonItemConfig(item);
                    newItem = this._getToolbarItem(buttonItemConfig)
                }
                if (newItem) {
                    resultItems.push(newItem)
                }
            }));
            return resultItems
        }
        _handleObjectItem(item) {
            if (item.name && item.acceptedValues && this._isAcceptableItem(item.widget, "dxSelectBox")) {
                const selectItemConfig = this._prepareSelectItemConfig(item);
                return this._getToolbarItem(selectItemConfig)
            } else if (item.name && this._isAcceptableItem(item.widget, "dxButton")) {
                const defaultButtonItemConfig = this._prepareButtonItemConfig(item.name);
                const buttonItemConfig = (0, _extend.extend)(true, defaultButtonItemConfig, item);
                return this._getToolbarItem(buttonItemConfig)
            } else {
                return this._getToolbarItem(item)
            }
        }
        _isAcceptableItem(widget, acceptableWidgetName) {
            return !widget || widget === acceptableWidgetName
        }
        _prepareButtonItemConfig(name) {
            const iconName = _toolbar_helper.ICON_MAP[name] ?? name;
            const buttonText = (0, _inflector.titleize)(name);
            return {
                widget: "dxButton",
                name: name,
                options: {
                    hint: localize(buttonText),
                    text: localize(buttonText),
                    icon: iconName.toLowerCase(),
                    onClick: this._formatHandlers[name] || (0, _toolbar_helper.getDefaultClickHandler)(this, name),
                    stylingMode: "text"
                },
                showText: "inMenu"
            }
        }
        _prepareSelectItemConfig(item) {
            const {
                name: name,
                acceptedValues: acceptedValues
            } = item;
            return (0, _extend.extend)(true, {
                widget: "dxSelectBox",
                name: name,
                options: {
                    stylingMode: "filled",
                    dataSource: acceptedValues,
                    displayExpr: value => localizeValue(value, name),
                    placeholder: localize(name),
                    onValueChanged: e => {
                        if (!this._isReset) {
                            this._hideAdaptiveMenu();
                            (0, _toolbar_helper.applyFormat)(this, [name, e.value, USER_ACTION], e.event);
                            this._setValueSilent(e.component, e.value)
                        }
                    }
                }
            }, item)
        }
        _hideAdaptiveMenu() {
            if (this.toolbarInstance.option("overflowMenuVisible")) {
                this.toolbarInstance.option("overflowMenuVisible", false)
            }
        }
        _getToolbarItem(item) {
            const baseItem = {
                options: {
                    onInitialized: e => {
                        if (item.name) {
                            e.component.$element().addClass(TOOLBAR_FORMAT_WIDGET_CLASS);
                            e.component.$element().toggleClass(`dx-${item.name.toLowerCase()}-format`, !!item.name);
                            this._toolbarWidgets.add(item.name, e.component)
                        }
                    },
                    onDisposing: () => {
                        this._toolbarWidgets.remove(item.name)
                    }
                }
            };
            return (0, _extend.extend)(true, {
                location: "before",
                locateInMenu: "auto"
            }, this._getDefaultConfig(item.name), item, baseItem)
        }
        _getDefaultItemsConfig() {
            return {
                clear: {
                    options: {
                        disabled: true
                    }
                },
                undo: {
                    options: {
                        disabled: true
                    }
                },
                redo: {
                    options: {
                        disabled: true
                    }
                },
                insertRowAbove: {
                    options: {
                        disabled: true
                    }
                },
                insertRowBelow: {
                    options: {
                        disabled: true
                    }
                },
                insertHeaderRow: {
                    options: {
                        disabled: true
                    }
                },
                insertColumnLeft: {
                    options: {
                        disabled: true
                    }
                },
                insertColumnRight: {
                    options: {
                        disabled: true
                    }
                },
                deleteRow: {
                    options: {
                        disabled: true
                    }
                },
                deleteColumn: {
                    options: {
                        disabled: true
                    }
                },
                deleteTable: {
                    options: {
                        disabled: true
                    }
                },
                cellProperties: {
                    options: {
                        disabled: true
                    }
                },
                tableProperties: {
                    options: {
                        disabled: true
                    }
                },
                separator: {
                    template: (data, index, element) => {
                        (0, _renderer.default)(element).addClass(TOOLBAR_SEPARATOR_CLASS)
                    },
                    menuItemTemplate: (data, index, element) => {
                        (0, _renderer.default)(element).addClass(TOOLBAR_MENU_SEPARATOR_CLASS)
                    }
                }
            }
        }
        _getDefaultConfig(name) {
            return this._getDefaultItemsConfig()[name]
        }
        updateHistoryWidgets() {
            const historyModule = this.quill.history;
            if (!historyModule) {
                return
            }
            const {
                undo: undoOps,
                redo: redoOps
            } = historyModule.stack;
            this._updateManipulationWidget(this._toolbarWidgets.getByName("undo"), Boolean(undoOps.length));
            this._updateManipulationWidget(this._toolbarWidgets.getByName("redo"), Boolean(redoOps.length))
        }
        updateTableWidgets() {
            const table = this.quill.getModule("table");
            if (!table) {
                return
            }
            const selection = this.quill.getSelection();
            const formats = selection && this.quill.getFormat(selection) || {};
            const isTableOperationsEnabled = this._tableFormats.some((format => Boolean(formats[format])));
            _table_helper.TABLE_OPERATIONS.forEach((operationName => {
                const isInsertTable = "insertTable" === operationName;
                const widget = this._toolbarWidgets.getByName(operationName);
                this._updateManipulationWidget(widget, isInsertTable ? !isTableOperationsEnabled : isTableOperationsEnabled)
            }))
        }
        _updateManipulationWidget(widget, isOperationEnabled) {
            if (!widget) {
                return
            }
            widget.option("disabled", !isOperationEnabled)
        }
        updateFormatWidgets(isResetRequired) {
            const selection = this.quill.getSelection();
            if (!selection) {
                return
            }
            const formats = this.quill.getFormat(selection);
            const hasFormats = !(0, _type.isEmptyObject)(formats);
            if (!hasFormats || isResetRequired) {
                this._resetFormatWidgets()
            }
            for (const formatName in formats) {
                const widgetName = this._getFormatWidgetName(formatName, formats);
                const formatWidget = this._toolbarWidgets.getByName(widgetName) || this._toolbarWidgets.getByName(formatName);
                if (!formatWidget) {
                    continue
                }
                this._markActiveFormatWidget(formatName, formatWidget, formats)
            }
            this._toggleClearFormatting(hasFormats || selection.length > 1)
        }
        _markActiveFormatWidget(name, widget, formats) {
            if (this._isColorFormat(name)) {
                this._updateColorWidget(name, formats[name])
            }
            if ("value" in widget.option()) {
                this._setValueSilent(widget, formats[name])
            } else {
                widget.$element().addClass(ACTIVE_FORMAT_CLASS);
                widget.$element().addClass(SELECTED_STATE_CLASS)
            }
        }
        _toggleClearFormatting(hasFormats) {
            const clearWidget = this._toolbarWidgets.getByName("clear");
            if (clearWidget) {
                clearWidget.option("disabled", !hasFormats)
            }
        }
        _isColorFormat(name) {
            return "color" === name || "background" === name
        }
        _updateColorWidget(name, color) {
            const formatWidget = this._toolbarWidgets.getByName(name);
            if (!formatWidget) {
                return
            }
            formatWidget.$element().find(`.${ICON_CLASS}`).css("borderBottomColor", color || "transparent")
        }
        _getFormatWidgetName(name, formats) {
            let widgetName;
            switch (name) {
                case "align":
                    widgetName = name + (0, _inflector.titleize)(formats[name]);
                    break;
                case "list":
                    widgetName = formats[name] + (0, _inflector.titleize)(name);
                    break;
                case "code-block":
                    widgetName = "codeBlock";
                    break;
                case "script":
                    widgetName = formats[name] + name;
                    break;
                case "imageSrc":
                    widgetName = "image";
                    break;
                default:
                    widgetName = name
            }
            return widgetName
        }
        _setValueSilent(widget, value) {
            this._isReset = true;
            widget.option("value", value);
            this._isReset = false
        }
        _resetFormatWidgets() {
            this._toolbarWidgets.each(((name, widget) => {
                this._resetFormatWidget(name, widget)
            }))
        }
        _resetFormatWidget(name, widget) {
            widget.$element().removeClass(ACTIVE_FORMAT_CLASS);
            widget.$element().removeClass(SELECTED_STATE_CLASS);
            if (this._isColorFormat(name)) {
                this._updateColorWidget(name)
            }
            if ("clear" === name) {
                widget.option("disabled", true)
            }
            if ("dxSelectBox" === widget.NAME) {
                this._setValueSilent(widget, null)
            }
        }
        addClickHandler(name, handler) {
            this._formatHandlers[name] = handler;
            const formatWidget = this._toolbarWidgets.getByName(name);
            if (formatWidget && "dxButton" === formatWidget.NAME) {
                formatWidget.option("onClick", handler)
            }
        }
    }
}
var _default = exports.default = ToolbarModule;
module.exports = exports.default;
module.exports.default = exports.default;
