/**
 * DevExtreme (cjs/__internal/grids/grid_core/filter/m_filter_row.js)
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
exports.filterRowModule = exports.ApplyFilterViewController = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _index = require("../../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _editor = _interopRequireDefault(require("../../../../ui/editor/editor"));
var _menu = _interopRequireDefault(require("../../../../ui/menu"));
var _ui = _interopRequireDefault(require("../../../../ui/overlay/ui.overlay"));
var _accessibility = require("../../../../ui/shared/accessibility");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));

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
const OPERATION_ICONS = {
    "=": "filter-operation-equals",
    "<>": "filter-operation-not-equals",
    "<": "filter-operation-less",
    "<=": "filter-operation-less-equal",
    ">": "filter-operation-greater",
    ">=": "filter-operation-greater-equal",
    default: "filter-operation-default",
    notcontains: "filter-operation-not-contains",
    contains: "filter-operation-contains",
    startswith: "filter-operation-starts-with",
    endswith: "filter-operation-ends-with",
    between: "filter-operation-between"
};
const OPERATION_DESCRIPTORS = {
    "=": "equal",
    "<>": "notEqual",
    "<": "lessThan",
    "<=": "lessThanOrEqual",
    ">": "greaterThan",
    ">=": "greaterThanOrEqual",
    startswith: "startsWith",
    contains: "contains",
    notcontains: "notContains",
    endswith: "endsWith",
    between: "between"
};
const FILTERING_TIMEOUT = 700;
const CORRECT_FILTER_RANGE_OVERLAY_WIDTH = 1;
const FILTER_ROW_CLASS = "filter-row";
const FILTER_RANGE_OVERLAY_CLASS = "filter-range-overlay";
const FILTER_RANGE_START_CLASS = "filter-range-start";
const FILTER_RANGE_END_CLASS = "filter-range-end";
const MENU_CLASS = "dx-menu";
const EDITOR_WITH_MENU_CLASS = "dx-editor-with-menu";
const EDITOR_CONTAINER_CLASS = "dx-editor-container";
const EDITOR_CELL_CLASS = "dx-editor-cell";
const FILTER_MENU = "dx-filter-menu";
const APPLY_BUTTON_CLASS = "dx-apply-button";
const HIGHLIGHT_OUTLINE_CLASS = "dx-highlight-outline";
const FOCUSED_CLASS = "dx-focused";
const CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
const FILTER_RANGE_CONTENT_CLASS = "dx-filter-range-content";
const FILTER_MODIFIED_CLASS = "dx-filter-modified";
const EDITORS_INPUT_SELECTOR = "input:not([type='hidden'])";
const BETWEEN_OPERATION_DATA_TYPES = ["date", "datetime", "number"];
const ARIA_SEARCH_BOX = _message.default.format("dxDataGrid-ariaSearchBox");

function isOnClickApplyFilterMode(that) {
    return "onClick" === that.option("filterRow.applyFilter")
}
const getEditorInstance = function($editorContainer) {
    const $editor = $editorContainer && $editorContainer.children();
    const componentNames = $editor && $editor.data("dxComponents");
    const editor = componentNames && componentNames.length && $editor.data(componentNames[0]);
    if (editor instanceof _editor.default) {
        return editor
    }
    return null
};
const getRangeTextByFilterValue = function(that, column) {
    let result = "";
    let rangeEnd = "";
    const filterValue = getColumnFilterValue(that, column);
    const formatOptions = _m_utils.default.getFormatOptionsByColumn(column, "filterRow");
    if (Array.isArray(filterValue)) {
        result = _m_utils.default.formatValue(filterValue[0], formatOptions);
        rangeEnd = _m_utils.default.formatValue(filterValue[1], formatOptions);
        if ("" !== rangeEnd) {
            result += ` - ${rangeEnd}`
        }
    } else if ((0, _type.isDefined)(filterValue)) {
        result = _m_utils.default.formatValue(filterValue, formatOptions)
    }
    return result
};

function getColumnFilterValue(that, column) {
    if (column) {
        return isOnClickApplyFilterMode(that) && void 0 !== column.bufferedFilterValue ? column.bufferedFilterValue : column.filterValue
    }
}
const getColumnSelectedFilterOperation = function(that, column) {
    if (column) {
        return isOnClickApplyFilterMode(that) && void 0 !== column.bufferedSelectedFilterOperation ? column.bufferedSelectedFilterOperation : column.selectedFilterOperation
    }
};
const isValidFilterValue = function(filterValue, column) {
    if (column && BETWEEN_OPERATION_DATA_TYPES.includes(column.dataType) && Array.isArray(filterValue)) {
        return false
    }
    return void 0 !== filterValue
};
const getFilterValue = function(that, columnIndex, $editorContainer) {
    const column = that._columnsController.columnOption(columnIndex);
    const filterValue = getColumnFilterValue(that, column);
    const isFilterRange = $editorContainer.closest(`.${that.addWidgetPrefix("filter-range-overlay")}`).length;
    const isRangeStart = $editorContainer.hasClass(that.addWidgetPrefix("filter-range-start"));
    if (filterValue && Array.isArray(filterValue) && "between" === getColumnSelectedFilterOperation(that, column)) {
        if (isRangeStart) {
            return filterValue[0]
        }
        return filterValue[1]
    }
    return !isFilterRange && isValidFilterValue(filterValue, column) ? filterValue : null
};
const normalizeFilterValue = function(that, filterValue, column, $editorContainer) {
    if ("between" === getColumnSelectedFilterOperation(that, column)) {
        const columnFilterValue = getColumnFilterValue(that, column);
        if ($editorContainer.hasClass(that.addWidgetPrefix("filter-range-start"))) {
            return [filterValue, Array.isArray(columnFilterValue) ? columnFilterValue[1] : void 0]
        }
        return [Array.isArray(columnFilterValue) ? columnFilterValue[0] : columnFilterValue, filterValue]
    }
    return filterValue
};
const updateFilterValue = function(that, options) {
    const value = "" === options.value ? null : options.value;
    const $editorContainer = options.container;
    const column = that._columnsController.columnOption(options.column.index);
    const filterValue = getFilterValue(that, column.index, $editorContainer);
    if (!(0, _type.isDefined)(filterValue) && !(0, _type.isDefined)(value)) {
        return
    }
    that._applyFilterViewController.setHighLight($editorContainer, filterValue !== value);
    const columnOptionName = isOnClickApplyFilterMode(that) ? "bufferedFilterValue" : "filterValue";
    const normalizedValue = normalizeFilterValue(that, value, column, $editorContainer);
    const isBetween = "between" === getColumnSelectedFilterOperation(that, column);
    const notFireEvent = options.notFireEvent || isBetween && Array.isArray(normalizedValue) && normalizedValue.includes(void 0);
    that._columnsController.columnOption(column.index, columnOptionName, normalizedValue, notFireEvent)
};
const columnHeadersView = Base => class extends Base {
    init() {
        super.init();
        this._applyFilterViewController = this.getController("applyFilter")
    }
    optionChanged(args) {
        switch (args.name) {
            case "filterRow":
            case "showColumnLines":
                this._invalidate(true, true);
                args.handled = true;
                break;
            case "syncLookupFilterValues":
                if (args.value) {
                    this.updateLookupDataSource()
                } else {
                    this.render()
                }
                args.handled = true;
                break;
            default:
                super.optionChanged(args)
        }
    }
    _updateEditorValue(column, $editorContainer) {
        const editor = getEditorInstance($editorContainer);
        editor && editor.option("value", getFilterValue(this, column.index, $editorContainer))
    }
    _columnOptionChanged(e) {
        const that = this;
        const {
            optionNames: optionNames
        } = e;
        let $cell;
        let $editorContainer;
        let $editorRangeElements;
        let $menu;
        if (_m_utils.default.checkChanges(optionNames, ["filterValue", "bufferedFilterValue", "selectedFilterOperation", "bufferedSelectedFilterOperation", "filterValues", "filterType"]) && void 0 !== e.columnIndex) {
            const visibleIndex = that._columnsController.getVisibleIndex(e.columnIndex);
            const column = that._columnsController.columnOption(e.columnIndex);
            $cell = that._getCellElement(that.element().find(`.${that.addWidgetPrefix("filter-row")}`).index(), visibleIndex) ?? (0, _renderer.default)();
            $editorContainer = $cell.find(".dx-editor-container").first();
            if (optionNames.filterValue || optionNames.bufferedFilterValue) {
                that._updateEditorValue(column, $editorContainer);
                const overlayInstance = $cell.find(`.${that.addWidgetPrefix("filter-range-overlay")}`).data("dxOverlay");
                if (overlayInstance) {
                    $editorRangeElements = overlayInstance.$content().find(".dx-editor-container");
                    that._updateEditorValue(column, $editorRangeElements.first());
                    that._updateEditorValue(column, $editorRangeElements.last())
                }
                if (!overlayInstance || !overlayInstance.option("visible")) {
                    that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column))
                }
            }
            if (optionNames.selectedFilterOperation || optionNames.bufferedSelectedFilterOperation) {
                if (visibleIndex >= 0 && column) {
                    $menu = $cell.find(".dx-menu");
                    if ($menu.length) {
                        that._updateFilterOperationChooser($menu, column, $editorContainer);
                        if ("between" === getColumnSelectedFilterOperation(that, column)) {
                            that._renderFilterRangeContent($cell, column)
                        } else if ($editorContainer.find(".dx-filter-range-content").length) {
                            that._renderEditor($editorContainer, that._getEditorOptions($editorContainer, column));
                            that._hideFilterRange()
                        }
                    }
                }
            }
            return
        }
        super._columnOptionChanged(e)
    }
    _renderCore() {
        this._filterRangeOverlayInstance = null;
        return super._renderCore.apply(this, arguments)
    }
    _resizeCore() {
        var _this$_filterRangeOve;
        super._resizeCore.apply(this, arguments);
        null === (_this$_filterRangeOve = this._filterRangeOverlayInstance) || void 0 === _this$_filterRangeOve || _this$_filterRangeOve.repaint()
    }
    isFilterRowVisible() {
        return this._isElementVisible(this.option("filterRow"))
    }
    isVisible() {
        return super.isVisible() || this.isFilterRowVisible()
    }
    _initFilterRangeOverlay($cell, column) {
        const that = this;
        const sharedData = {};
        const $editorContainer = $cell.find(".dx-editor-container");
        const filterRangeOverlayClass = that.addWidgetPrefix("filter-range-overlay");
        const $overlay = (0, _renderer.default)("<div>").addClass(filterRangeOverlayClass).appendTo($cell);
        return that._createComponent($overlay, _ui.default, {
            height: "auto",
            shading: false,
            showTitle: false,
            focusStateEnabled: false,
            hideOnOutsideClick: true,
            wrapperAttr: {
                class: filterRangeOverlayClass
            },
            animation: false,
            position: {
                my: "top",
                at: "top",
                of: $editorContainer.length && $editorContainer || $cell,
                offset: "0 -1"
            },
            contentTemplate(contentElement) {
                let editorOptions;
                let $editor = (0, _renderer.default)("<div>").addClass(`dx-editor-container ${that.addWidgetPrefix("filter-range-start")}`).appendTo(contentElement);
                column = that._columnsController.columnOption(column.index);
                editorOptions = that._getEditorOptions($editor, column);
                editorOptions.sharedData = sharedData;
                that._renderEditor($editor, editorOptions);
                _events_engine.default.on($editor.find(EDITORS_INPUT_SELECTOR), "keydown", (e => {
                    let $prevElement = $cell.find("[tabindex]").not(e.target).first();
                    if ("tab" === (0, _index.normalizeKeyName)(e) && e.shiftKey) {
                        e.preventDefault();
                        that._hideFilterRange();
                        if (!$prevElement.length) {
                            $prevElement = $cell.prev().find("[tabindex]").last()
                        }
                        _events_engine.default.trigger($prevElement, "focus")
                    }
                }));
                $editor = (0, _renderer.default)("<div>").addClass(`dx-editor-container ${that.addWidgetPrefix("filter-range-end")}`).appendTo(contentElement);
                editorOptions = that._getEditorOptions($editor, column);
                editorOptions.sharedData = sharedData;
                that._renderEditor($editor, editorOptions);
                _events_engine.default.on($editor.find(EDITORS_INPUT_SELECTOR), "keydown", (e => {
                    if ("tab" === (0, _index.normalizeKeyName)(e) && !e.shiftKey) {
                        e.preventDefault();
                        that._hideFilterRange();
                        _events_engine.default.trigger($cell.next().find("[tabindex]").first(), "focus")
                    }
                }));
                return (0, _renderer.default)(contentElement).addClass(that.getWidgetContainerClass())
            },
            onShown(e) {
                const $editor = e.component.$content().find(".dx-editor-container").first();
                _events_engine.default.trigger($editor.find(EDITORS_INPUT_SELECTOR), "focus")
            },
            onHidden() {
                column = that._columnsController.columnOption(column.index);
                $cell.find(".dx-menu").parent().addClass("dx-editor-with-menu");
                if ("between" === getColumnSelectedFilterOperation(that, column)) {
                    that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column));
                    that.component.updateDimensions()
                }
            }
        })
    }
    _updateFilterRangeOverlay(options) {
        const overlayInstance = this._filterRangeOverlayInstance;
        overlayInstance && overlayInstance.option(options)
    }
    _showFilterRange($cell, column) {
        const that = this;
        const $overlay = $cell.children(`.${that.addWidgetPrefix("filter-range-overlay")}`);
        let overlayInstance = $overlay.length && $overlay.data("dxOverlay");
        if (!overlayInstance && column) {
            overlayInstance = that._initFilterRangeOverlay($cell, column)
        }
        if (!overlayInstance.option("visible")) {
            that._filterRangeOverlayInstance && that._filterRangeOverlayInstance.hide();
            that._filterRangeOverlayInstance = overlayInstance;
            that._updateFilterRangeOverlay({
                width: (0, _size.getOuterWidth)($cell, true) + 1
            });
            that._filterRangeOverlayInstance && that._filterRangeOverlayInstance.show()
        }
    }
    _hideFilterRange() {
        const overlayInstance = this._filterRangeOverlayInstance;
        overlayInstance && overlayInstance.hide()
    }
    getFilterRangeOverlayInstance() {
        return this._filterRangeOverlayInstance
    }
    _createRow(row) {
        const $row = super._createRow(row);
        if ("filter" === row.rowType) {
            $row.addClass(this.addWidgetPrefix("filter-row"));
            if (!this.option("useLegacyKeyboardNavigation")) {
                _events_engine.default.on($row, "keydown", (event => (0, _accessibility.selectView)("filterRow", this, event)))
            }
        }
        return $row
    }
    _getRows() {
        const result = super._getRows();
        if (this.isFilterRowVisible()) {
            result.push({
                rowType: "filter"
            })
        }
        return result
    }
    _renderFilterCell(cell, options) {
        const that = this;
        const {
            column: column
        } = options;
        const $cell = (0, _renderer.default)(cell);
        if (that.component.option("showColumnHeaders")) {
            that.setAria("describedby", column.headerId, $cell)
        }
        that.setAria("label", _message.default.format("dxDataGrid-ariaFilterCell"), $cell);
        $cell.addClass("dx-editor-cell");
        const $container = (0, _renderer.default)("<div>").appendTo($cell);
        const $editorContainer = (0, _renderer.default)("<div>").addClass("dx-editor-container").appendTo($container);
        if ("between" === getColumnSelectedFilterOperation(that, column)) {
            that._renderFilterRangeContent($cell, column)
        } else {
            const editorOptions = that._getEditorOptions($editorContainer, column);
            that._renderEditor($editorContainer, editorOptions)
        }
        const {
            alignment: alignment
        } = column;
        if (alignment && "center" !== alignment) {
            $cell.find(EDITORS_INPUT_SELECTOR).first().css("textAlign", column.alignment)
        }
        if (column.filterOperations && column.filterOperations.length) {
            that._renderFilterOperationChooser($container, column, $editorContainer)
        }
    }
    _renderCellContent($cell, options) {
        const that = this;
        const {
            column: column
        } = options;
        if ("filter" === options.rowType) {
            if (column.command) {
                $cell.html("&nbsp;")
            } else if (column.allowFiltering) {
                that.renderTemplate($cell, that._renderFilterCell.bind(that), options).done((() => {
                    that._updateCell($cell, options)
                }));
                return
            }
        }
        super._renderCellContent.apply(this, arguments)
    }
    _getEditorOptions($editorContainer, column) {
        const that = this;
        const accessibilityOptions = {
            editorOptions: {
                inputAttr: that._getFilterInputAccessibilityAttributes(column)
            }
        };
        const result = (0, _extend.extend)(accessibilityOptions, column, {
            value: getFilterValue(that, column.index, $editorContainer),
            parentType: "filterRow",
            showAllText: that.option("filterRow.showAllText"),
            updateValueTimeout: "onClick" === that.option("filterRow.applyFilter") ? 0 : 700,
            width: null,
            setValue(value, notFireEvent) {
                updateFilterValue(that, {
                    column: column,
                    value: value,
                    container: $editorContainer,
                    notFireEvent: notFireEvent
                })
            }
        });
        if ("between" === getColumnSelectedFilterOperation(that, column)) {
            if ($editorContainer.hasClass(that.addWidgetPrefix("filter-range-start"))) {
                result.placeholder = that.option("filterRow.betweenStartText")
            } else {
                result.placeholder = that.option("filterRow.betweenEndText")
            }
        }
        return result
    }
    _getFilterInputAccessibilityAttributes(column) {
        const columnAriaLabel = _message.default.format("dxDataGrid-ariaFilterCell");
        if (this.component.option("showColumnHeaders")) {
            return {
                "aria-label": columnAriaLabel,
                "aria-describedby": column.headerId
            }
        }
        return {
            "aria-label": columnAriaLabel
        }
    }
    _renderEditor($editorContainer, options) {
        $editorContainer.empty();
        const $element = (0, _renderer.default)("<div>").appendTo($editorContainer);
        const dataSource = this._dataController.dataSource();
        if (options.lookup && this.option("syncLookupFilterValues")) {
            this._applyFilterViewController.setCurrentColumnForFiltering(options);
            const filter = this._dataController.getCombinedFilter();
            this._applyFilterViewController.setCurrentColumnForFiltering(null);
            const lookupDataSource = _m_utils.default.getWrappedLookupDataSource(options, dataSource, filter);
            const lookupOptions = _extends({}, options, {
                lookup: _extends({}, options.lookup, {
                    dataSource: lookupDataSource
                })
            });
            return this._editorFactoryController.createEditor($element, lookupOptions)
        }
        return this._editorFactoryController.createEditor($element, options)
    }
    _renderFilterRangeContent($cell, column) {
        const that = this;
        const $editorContainer = $cell.find(".dx-editor-container").first();
        $editorContainer.empty();
        const $filterRangeContent = (0, _renderer.default)("<div>").addClass("dx-filter-range-content").attr("tabindex", this.option("tabIndex"));
        _events_engine.default.on($filterRangeContent, "focusin", (() => {
            that._showFilterRange($cell, column)
        }));
        $filterRangeContent.appendTo($editorContainer);
        that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column))
    }
    _updateFilterRangeContent($cell, value) {
        const $filterRangeContent = $cell.find(".dx-filter-range-content");
        if ($filterRangeContent.length) {
            if ("" === value) {
                $filterRangeContent.html("&nbsp;")
            } else {
                $filterRangeContent.text(value)
            }
        }
    }
    _updateFilterOperationChooser($menu, column, $editorContainer) {
        const that = this;
        let isCellWasFocused;
        const restoreFocus = function() {
            const menu = _menu.default.getInstance($menu);
            menu && menu.option("focusedElement", null);
            isCellWasFocused && that._focusEditor($editorContainer)
        };
        const editorFactoryController = this._editorFactoryController;
        that._createComponent($menu, _menu.default, {
            integrationOptions: {},
            activeStateEnabled: false,
            selectionMode: "single",
            cssClass: `${that.getWidgetContainerClass()} dx-cell-focus-disabled ${FILTER_MENU}`,
            showFirstSubmenuMode: "onHover",
            hideSubmenuOnMouseLeave: true,
            items: [{
                disabled: !(column.filterOperations && column.filterOperations.length),
                icon: OPERATION_ICONS[getColumnSelectedFilterOperation(that, column) || "default"],
                selectable: false,
                items: that._getFilterOperationMenuItems(column)
            }],
            onItemRendered: _ref => {
                let {
                    itemElement: itemElement
                } = _ref;
                this.setAria("label", ARIA_SEARCH_BOX, (0, _renderer.default)(itemElement))
            },
            onItemClick(properties) {
                const selectedFilterOperation = properties.itemData.name;
                const columnSelectedFilterOperation = getColumnSelectedFilterOperation(that, column);
                let notFocusEditor = false;
                const isOnClickMode = isOnClickApplyFilterMode(that);
                const options = {};
                if (properties.itemData.items || selectedFilterOperation && selectedFilterOperation === columnSelectedFilterOperation) {
                    return
                }
                if (selectedFilterOperation) {
                    options[isOnClickMode ? "bufferedSelectedFilterOperation" : "selectedFilterOperation"] = selectedFilterOperation;
                    if ("between" === selectedFilterOperation || "between" === columnSelectedFilterOperation) {
                        notFocusEditor = "between" === selectedFilterOperation;
                        options[isOnClickMode ? "bufferedFilterValue" : "filterValue"] = null
                    }
                } else {
                    options[isOnClickMode ? "bufferedFilterValue" : "filterValue"] = null;
                    options[isOnClickMode ? "bufferedSelectedFilterOperation" : "selectedFilterOperation"] = column.defaultSelectedFilterOperation || null
                }
                that._columnsController.columnOption(column.index, options);
                that._applyFilterViewController.setHighLight($editorContainer, true);
                if (!selectedFilterOperation) {
                    const editor = getEditorInstance($editorContainer);
                    if (editor && "dxDateBox" === editor.NAME && !editor.option("isValid")) {
                        editor.clear();
                        editor.option("isValid", true)
                    }
                }
                if (!notFocusEditor) {
                    that._focusEditor($editorContainer)
                } else {
                    that._showFilterRange($editorContainer.closest(".dx-editor-cell"), column)
                }
            },
            onSubmenuShowing() {
                isCellWasFocused = that._isEditorFocused($editorContainer);
                editorFactoryController.loseFocus()
            },
            onSubmenuHiding() {
                _events_engine.default.trigger($menu, "blur");
                restoreFocus()
            },
            onContentReady(e) {
                _events_engine.default.on($menu, "blur", (() => {
                    const menu = e.component;
                    menu._hideSubmenuAfterTimeout();
                    restoreFocus()
                }))
            },
            rtlEnabled: that.option("rtlEnabled")
        })
    }
    _isEditorFocused($container) {
        return $container.hasClass("dx-focused") || $container.parents(".dx-focused").length
    }
    _focusEditor($container) {
        this._editorFactoryController.focus($container);
        _events_engine.default.trigger($container.find(EDITORS_INPUT_SELECTOR), "focus")
    }
    _renderFilterOperationChooser($container, column, $editorContainer) {
        const that = this;
        let $menu;
        if (that.option("filterRow.showOperationChooser")) {
            $container.addClass("dx-editor-with-menu");
            $menu = (0, _renderer.default)("<div>").prependTo($container);
            that._updateFilterOperationChooser($menu, column, $editorContainer)
        }
    }
    _getFilterOperationMenuItems(column) {
        const that = this;
        let result = [{}];
        const filterRowOptions = that.option("filterRow");
        const operationDescriptions = filterRowOptions && filterRowOptions.operationDescriptions || {};
        if (column.filterOperations && column.filterOperations.length) {
            const availableFilterOperations = column.filterOperations.filter((value => (0, _type.isDefined)(OPERATION_DESCRIPTORS[value])));
            result = (0, _iterator.map)(availableFilterOperations, (value => {
                const descriptionName = OPERATION_DESCRIPTORS[value];
                return {
                    name: value,
                    selected: (getColumnSelectedFilterOperation(that, column) || column.defaultFilterOperation) === value,
                    text: operationDescriptions[descriptionName],
                    icon: OPERATION_ICONS[value]
                }
            }));
            result.push({
                name: null,
                text: filterRowOptions && filterRowOptions.resetOperationText,
                icon: OPERATION_ICONS.default
            })
        }
        return result
    }
    _handleDataChanged(e) {
        var _this$_dataController, _this$_dataController2, _dataSource$lastLoadO, _e$operationTypes, _e$operationTypes2;
        const dataSource = null === (_this$_dataController = this._dataController) || void 0 === _this$_dataController || null === (_this$_dataController2 = _this$_dataController.dataSource) || void 0 === _this$_dataController2 ? void 0 : _this$_dataController2.call(_this$_dataController);
        const lastLoadOptions = null === dataSource || void 0 === dataSource || null === (_dataSource$lastLoadO = dataSource.lastLoadOptions) || void 0 === _dataSource$lastLoadO ? void 0 : _dataSource$lastLoadO.call(dataSource);
        super._handleDataChanged.apply(this, arguments);
        if (null !== (_e$operationTypes = e.operationTypes) && void 0 !== _e$operationTypes && _e$operationTypes.filtering || null !== (_e$operationTypes2 = e.operationTypes) && void 0 !== _e$operationTypes2 && _e$operationTypes2.fullReload) {
            var _e$operationTypes3;
            this.updateLookupDataSource((null === (_e$operationTypes3 = e.operationTypes) || void 0 === _e$operationTypes3 ? void 0 : _e$operationTypes3.filtering) || (null === lastLoadOptions || void 0 === lastLoadOptions ? void 0 : lastLoadOptions.filter))
        }
    }
    updateLookupDataSource(filterChanged) {
        if (!this.option("syncLookupFilterValues")) {
            return
        }
        if (!this.element()) {
            return
        }
        const columns = this._columnsController.getVisibleColumns();
        const dataSource = this._dataController.dataSource();
        const applyFilterViewController = this._applyFilterViewController;
        const rowIndex = this.element().find(`.${this.addWidgetPrefix("filter-row")}`).index();
        if (-1 === rowIndex) {
            return
        }
        columns.forEach(((column, index) => {
            if (!column.lookup || column.calculateCellValue !== column.defaultCalculateCellValue) {
                return
            }
            const $cell = this._getCellElement(rowIndex, index);
            const editor = getEditorInstance(null === $cell || void 0 === $cell ? void 0 : $cell.find(".dx-editor-container"));
            if (editor) {
                applyFilterViewController.setCurrentColumnForFiltering(column);
                const filter = this._dataController.getCombinedFilter() || null;
                applyFilterViewController.setCurrentColumnForFiltering(null);
                const editorDataSource = editor.option("dataSource");
                const shouldUpdateFilter = !filterChanged || !(0, _common.equalByValue)(editorDataSource.__dataGridSourceFilter || null, filter);
                if (shouldUpdateFilter) {
                    const lookupDataSource = _m_utils.default.getWrappedLookupDataSource(column, dataSource, filter);
                    editor.option("dataSource", lookupDataSource)
                }
            }
        }))
    }
};
const data = Base => class extends Base {
    skipCalculateColumnFilters() {
        return false
    }
    _calculateAdditionalFilter() {
        if (this.skipCalculateColumnFilters()) {
            return super._calculateAdditionalFilter()
        }
        const filters = [super._calculateAdditionalFilter()];
        const columns = this._columnsController.getVisibleColumns(null, true);
        const applyFilterController = this._applyFilterController;
        (0, _iterator.each)(columns, (function() {
            var _applyFilterControlle;
            const shouldSkip = (null === (_applyFilterControlle = applyFilterController.getCurrentColumnForFiltering()) || void 0 === _applyFilterControlle ? void 0 : _applyFilterControlle.index) === this.index;
            if (this.allowFiltering && this.calculateFilterExpression && (0, _type.isDefined)(this.filterValue) && !shouldSkip) {
                const filter = this.createFilterExpression(this.filterValue, this.selectedFilterOperation || this.defaultFilterOperation, "filterRow");
                filters.push(filter)
            }
        }));
        return _m_utils.default.combineFilters(filters)
    }
};
class ApplyFilterViewController extends _m_modules.default.ViewController {
    init() {
        this._columnsController = this.getController("columns")
    }
    _getHeaderPanel() {
        if (!this._headerPanel) {
            this._headerPanel = this.getView("headerPanel")
        }
        return this._headerPanel
    }
    setHighLight($element, value) {
        if (isOnClickApplyFilterMode(this)) {
            $element && $element.toggleClass("dx-highlight-outline", value) && $element.closest(".dx-editor-cell").toggleClass("dx-filter-modified", value);
            this._getHeaderPanel().enableApplyButton(value)
        }
    }
    applyFilter() {
        const columns = this._columnsController.getColumns();
        this._columnsController.beginUpdate();
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            if (void 0 !== column.bufferedFilterValue) {
                this._columnsController.columnOption(i, "filterValue", column.bufferedFilterValue);
                column.bufferedFilterValue = void 0
            }
            if (void 0 !== column.bufferedSelectedFilterOperation) {
                this._columnsController.columnOption(i, "selectedFilterOperation", column.bufferedSelectedFilterOperation);
                column.bufferedSelectedFilterOperation = void 0
            }
        }
        this._columnsController.endUpdate();
        this.removeHighLights()
    }
    removeHighLights() {
        if (isOnClickApplyFilterMode(this)) {
            const columnHeadersViewElement = this.getView("columnHeadersView").element();
            columnHeadersViewElement.find(`.${this.addWidgetPrefix("filter-row")} .dx-highlight-outline`).removeClass("dx-highlight-outline");
            columnHeadersViewElement.find(`.${this.addWidgetPrefix("filter-row")} .dx-filter-modified`).removeClass("dx-filter-modified");
            this._getHeaderPanel().enableApplyButton(false)
        }
    }
    setCurrentColumnForFiltering(column) {
        this._currentColumn = column
    }
    getCurrentColumnForFiltering() {
        return this._currentColumn
    }
}
exports.ApplyFilterViewController = ApplyFilterViewController;
const columnsResizer = Base => class extends Base {
    _startResizing() {
        const that = this;
        super._startResizing.apply(that, arguments);
        if (that.isResizing()) {
            const overlayInstance = that._columnHeadersView.getFilterRangeOverlayInstance();
            if (overlayInstance) {
                const cellIndex = overlayInstance.$element().closest("td").index();
                if (cellIndex === that._targetPoint.columnIndex || cellIndex === that._targetPoint.columnIndex + 1) {
                    overlayInstance.$content().hide()
                }
            }
        }
    }
    _endResizing() {
        const that = this;
        let $cell;
        if (that.isResizing()) {
            const overlayInstance = that._columnHeadersView.getFilterRangeOverlayInstance();
            if (overlayInstance) {
                $cell = overlayInstance.$element().closest("td");
                that._columnHeadersView._updateFilterRangeOverlay({
                    width: (0, _size.getOuterWidth)($cell, true) + 1
                });
                overlayInstance.$content().show()
            }
        }
        super._endResizing.apply(that, arguments)
    }
};
const editing = Base => class extends Base {
    updateFieldValue(options) {
        if (options.column.lookup) {
            this._needUpdateLookupDataSource = true
        }
        return super.updateFieldValue.apply(this, arguments)
    }
    _afterSaveEditData(cancel) {
        if (this._needUpdateLookupDataSource && !cancel) {
            var _this$getView;
            null === (_this$getView = this.getView("columnHeadersView")) || void 0 === _this$getView || _this$getView.updateLookupDataSource()
        }
        this._needUpdateLookupDataSource = false;
        return super._afterSaveEditData.apply(this, arguments)
    }
    _afterCancelEditData() {
        this._needUpdateLookupDataSource = false;
        return super._afterCancelEditData.apply(this, arguments)
    }
};
const headerPanel = Base => class extends Base {
    init() {
        super.init();
        this._dataController = this.getController("data");
        this._applyFilterViewController = this.getController("applyFilter")
    }
    optionChanged(args) {
        if ("filterRow" === args.name) {
            this._invalidate();
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
    _getToolbarItems() {
        const items = super._getToolbarItems();
        const filterItem = this._prepareFilterItem();
        return filterItem.concat(items)
    }
    _prepareFilterItem() {
        const that = this;
        const filterItem = [];
        if (that._isShowApplyFilterButton()) {
            const hintText = that.option("filterRow.applyFilterText");
            const columns = that._columnsController.getColumns();
            const disabled = !columns.filter((column => void 0 !== column.bufferedFilterValue)).length;
            const onInitialized = function(e) {
                (0, _renderer.default)(e.element).addClass(that._getToolbarButtonClass("dx-apply-button"))
            };
            const onClickHandler = function() {
                that._applyFilterViewController.applyFilter()
            };
            const toolbarItem = {
                widget: "dxButton",
                options: {
                    icon: "apply-filter",
                    disabled: disabled,
                    onClick: onClickHandler,
                    hint: hintText,
                    text: hintText,
                    onInitialized: onInitialized
                },
                showText: "inMenu",
                name: "applyFilterButton",
                location: "after",
                locateInMenu: "auto",
                sortIndex: 10
            };
            filterItem.push(toolbarItem)
        }
        return filterItem
    }
    _isShowApplyFilterButton() {
        const filterRowOptions = this.option("filterRow");
        return !!(null !== filterRowOptions && void 0 !== filterRowOptions && filterRowOptions.visible) && "onClick" === filterRowOptions.applyFilter
    }
    enableApplyButton(value) {
        this.setToolbarItemDisabled("applyFilterButton", !value)
    }
    isVisible() {
        return super.isVisible() || this._isShowApplyFilterButton()
    }
};
const filterRowModule = exports.filterRowModule = {
    defaultOptions: () => ({
        syncLookupFilterValues: true,
        filterRow: {
            visible: false,
            showOperationChooser: true,
            showAllText: _message.default.format("dxDataGrid-filterRowShowAllText"),
            resetOperationText: _message.default.format("dxDataGrid-filterRowResetOperationText"),
            applyFilter: "auto",
            applyFilterText: _message.default.format("dxDataGrid-applyFilterText"),
            operationDescriptions: {
                equal: _message.default.format("dxDataGrid-filterRowOperationEquals"),
                notEqual: _message.default.format("dxDataGrid-filterRowOperationNotEquals"),
                lessThan: _message.default.format("dxDataGrid-filterRowOperationLess"),
                lessThanOrEqual: _message.default.format("dxDataGrid-filterRowOperationLessOrEquals"),
                greaterThan: _message.default.format("dxDataGrid-filterRowOperationGreater"),
                greaterThanOrEqual: _message.default.format("dxDataGrid-filterRowOperationGreaterOrEquals"),
                startsWith: _message.default.format("dxDataGrid-filterRowOperationStartsWith"),
                contains: _message.default.format("dxDataGrid-filterRowOperationContains"),
                notContains: _message.default.format("dxDataGrid-filterRowOperationNotContains"),
                endsWith: _message.default.format("dxDataGrid-filterRowOperationEndsWith"),
                between: _message.default.format("dxDataGrid-filterRowOperationBetween"),
                isBlank: _message.default.format("dxFilterBuilder-filterOperationIsBlank"),
                isNotBlank: _message.default.format("dxFilterBuilder-filterOperationIsNotBlank")
            },
            betweenStartText: _message.default.format("dxDataGrid-filterRowOperationBetweenStartText"),
            betweenEndText: _message.default.format("dxDataGrid-filterRowOperationBetweenEndText")
        }
    }),
    controllers: {
        applyFilter: ApplyFilterViewController
    },
    extenders: {
        controllers: {
            data: data,
            columnsResizer: columnsResizer,
            editing: editing
        },
        views: {
            columnHeadersView: columnHeadersView,
            headerPanel: headerPanel
        }
    }
};
