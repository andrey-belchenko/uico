/**
 * DevExtreme (esm/__internal/grids/grid_core/search/m_search.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../../../../core/dom_adapter";
import $ from "../../../../core/renderer";
import {
    compileGetter,
    toComparable
} from "../../../../core/utils/data";
import dataQuery from "../../../../data/query";
import messageLocalization from "../../../../localization/message";
import gridCoreUtils from "../m_utils";
const SEARCH_PANEL_CLASS = "search-panel";
const SEARCH_TEXT_CLASS = "search-text";
const HEADER_PANEL_CLASS = "header-panel";
const FILTERING_TIMEOUT = 700;

function allowSearch(column) {
    return !!(column.allowSearch ?? column.allowFiltering)
}

function parseValue(column, text) {
    const {
        lookup: lookup
    } = column;
    if (!column.parseValue) {
        return text
    }
    if (lookup) {
        return column.parseValue.call(lookup, text)
    }
    return column.parseValue(text)
}
const dataController = base => class extends base {
    optionChanged(args) {
        switch (args.fullName) {
            case "searchPanel.text":
            case "searchPanel":
                this._applyFilter();
                args.handled = true;
                break;
            default:
                super.optionChanged(args)
        }
    }
    publicMethods() {
        return super.publicMethods().concat(["searchByText"])
    }
    _calculateAdditionalFilter() {
        const filter = super._calculateAdditionalFilter();
        const searchFilter = this.calculateSearchFilter(this.option("searchPanel.text"));
        return gridCoreUtils.combineFilters([filter, searchFilter])
    }
    searchByText(text) {
        this.option("searchPanel.text", text)
    }
    calculateSearchFilter(text) {
        let i;
        let column;
        const columns = this._columnsController.getColumns();
        const searchVisibleColumnsOnly = this.option("searchPanel.searchVisibleColumnsOnly");
        let lookup;
        const filters = [];
        if (!text) {
            return null
        }

        function onQueryDone(items) {
            const valueGetter = compileGetter(lookup.valueExpr);
            for (let i = 0; i < items.length; i++) {
                const value = valueGetter(items[i]);
                filters.push(column.createFilterExpression(value, null, "search"))
            }
        }
        for (i = 0; i < columns.length; i++) {
            column = columns[i];
            if (searchVisibleColumnsOnly && !column.visible) {
                continue
            }
            if (allowSearch(column) && column.calculateFilterExpression) {
                lookup = column.lookup;
                const filterValue = parseValue(column, text);
                if (lookup && lookup.items) {
                    dataQuery(lookup.items).filter(column.createFilterExpression.call({
                        dataField: lookup.displayExpr,
                        dataType: lookup.dataType,
                        calculateFilterExpression: column.calculateFilterExpression
                    }, filterValue, null, "search")).enumerate().done(onQueryDone)
                } else if (void 0 !== filterValue) {
                    filters.push(column.createFilterExpression(filterValue, null, "search"))
                }
            }
        }
        if (0 === filters.length) {
            return ["!"]
        }
        return gridCoreUtils.combineFilters(filters, "or")
    }
};
const headerPanel = Base => class extends Base {
    optionChanged(args) {
        if ("searchPanel" === args.name) {
            if ("searchPanel.text" === args.fullName) {
                const editor = this.getSearchTextEditor();
                if (editor) {
                    editor.option("value", args.value)
                }
            } else {
                this._invalidate()
            }
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
    _getToolbarItems() {
        const items = super._getToolbarItems();
        return this._prepareSearchItem(items)
    }
    _prepareSearchItem(items) {
        const that = this;
        const dataController = this._dataController;
        const searchPanelOptions = this.option("searchPanel");
        if (searchPanelOptions && searchPanelOptions.visible) {
            const toolbarItem = {
                template(data, index, container) {
                    const $search = $("<div>").addClass(that.addWidgetPrefix("search-panel")).appendTo(container);
                    that._editorFactoryController.createEditor($search, {
                        width: searchPanelOptions.width,
                        placeholder: searchPanelOptions.placeholder,
                        parentType: "searchPanel",
                        value: that.option("searchPanel.text"),
                        updateValueTimeout: 700,
                        setValue(value) {
                            dataController.searchByText(value)
                        },
                        editorOptions: {
                            inputAttr: {
                                "aria-label": messageLocalization.format(`${that.component.NAME}-ariaSearchInGrid`)
                            }
                        }
                    });
                    that.resize()
                },
                name: "searchPanel",
                location: "after",
                locateInMenu: "never",
                sortIndex: 40
            };
            items.push(toolbarItem)
        }
        return items
    }
    getSearchTextEditor() {
        const that = this;
        const $element = that.element();
        const $searchPanel = $element.find(`.${that.addWidgetPrefix("search-panel")}`).filter((function() {
            return $(this).closest(`.${that.addWidgetPrefix("header-panel")}`).is($element)
        }));
        if ($searchPanel.length) {
            return $searchPanel.dxTextBox("instance")
        }
        return null
    }
    isVisible() {
        const searchPanelOptions = this.option("searchPanel");
        return super.isVisible() || !!(null !== searchPanelOptions && void 0 !== searchPanelOptions && searchPanelOptions.visible)
    }
};
const rowsView = Base => class extends Base {
    init() {
        super.init.apply(this, arguments);
        this._searchParams = [];
        this._dataController = this.getController("data")
    }
    dispose() {
        clearTimeout(this._highlightTimer);
        super.dispose()
    }
    _getFormattedSearchText(column, searchText) {
        const value = parseValue(column, searchText);
        const formatOptions = gridCoreUtils.getFormatOptionsByColumn(column, "search");
        return gridCoreUtils.formatValue(value, formatOptions)
    }
    _getStringNormalizer() {
        var _this$_dataController, _this$_dataController2, _dataSource$loadOptio;
        const isCaseSensitive = this.option("searchPanel.highlightCaseSensitive");
        const dataSource = null === (_this$_dataController = this._dataController) || void 0 === _this$_dataController || null === (_this$_dataController2 = _this$_dataController.getDataSource) || void 0 === _this$_dataController2 ? void 0 : _this$_dataController2.call(_this$_dataController);
        const langParams = null === dataSource || void 0 === dataSource || null === (_dataSource$loadOptio = dataSource.loadOptions) || void 0 === _dataSource$loadOptio || null === (_dataSource$loadOptio = _dataSource$loadOptio.call(dataSource)) || void 0 === _dataSource$loadOptio ? void 0 : _dataSource$loadOptio.langParams;
        return str => toComparable(str, isCaseSensitive, langParams)
    }
    _findHighlightingTextNodes(column, cellElement, searchText) {
        var _$items;
        const that = this;
        let $parent = cellElement.parent();
        let $items;
        const stringNormalizer = this._getStringNormalizer();
        const normalizedSearchText = stringNormalizer(searchText);
        const resultTextNodes = [];
        if (!$parent.length) {
            $parent = $("<div>").append(cellElement)
        } else if (column) {
            if (column.groupIndex >= 0 && !column.showWhenGrouped) {
                $items = cellElement
            } else {
                const columnIndex = that._columnsController.getVisibleIndex(column.index);
                $items = $parent.children("td").eq(columnIndex).find("*")
            }
        }
        $items = null !== (_$items = $items) && void 0 !== _$items && _$items.length ? $items : $parent.find("*");
        $items.each(((_, element) => {
            const $contents = $(element).contents();
            for (let i = 0; i < $contents.length; i++) {
                const node = $contents.get(i);
                if (3 === node.nodeType) {
                    const normalizedText = stringNormalizer(node.textContent ?? node.nodeValue ?? "");
                    if (normalizedText.includes(normalizedSearchText)) {
                        resultTextNodes.push(node)
                    }
                }
            }
        }));
        return resultTextNodes
    }
    _highlightSearchTextCore($textNode, searchText) {
        const that = this;
        const $searchTextSpan = $("<span>").addClass(that.addWidgetPrefix("search-text"));
        const text = $textNode.text();
        const firstContentElement = $textNode[0];
        const stringNormalizer = this._getStringNormalizer();
        const index = stringNormalizer(text).indexOf(stringNormalizer(searchText));
        if (index >= 0) {
            if (firstContentElement.textContent) {
                firstContentElement.textContent = text.substr(0, index)
            } else {
                firstContentElement.nodeValue = text.substr(0, index)
            }
            $textNode.after($searchTextSpan.text(text.substr(index, searchText.length)));
            $textNode = $(domAdapter.createTextNode(text.substr(index + searchText.length))).insertAfter($searchTextSpan);
            return that._highlightSearchTextCore($textNode, searchText)
        }
    }
    _highlightSearchText(cellElement, isEquals, column) {
        const that = this;
        const stringNormalizer = this._getStringNormalizer();
        let searchText = that.option("searchPanel.text");
        if (isEquals && column) {
            searchText = searchText && that._getFormattedSearchText(column, searchText)
        }
        if (searchText && that.option("searchPanel.highlightSearchText")) {
            const textNodes = that._findHighlightingTextNodes(column, cellElement, searchText);
            textNodes.forEach((textNode => {
                if (isEquals) {
                    if (stringNormalizer($(textNode).text()) === stringNormalizer(searchText ?? "")) {
                        $(textNode).replaceWith($("<span>").addClass(that.addWidgetPrefix("search-text")).text($(textNode).text()))
                    }
                } else {
                    that._highlightSearchTextCore($(textNode), searchText)
                }
            }))
        }
    }
    _renderCore() {
        const deferred = super._renderCore.apply(this, arguments);
        if (this.option().rowTemplate || this.option("dataRowTemplate")) {
            if (this.option("templatesRenderAsynchronously")) {
                clearTimeout(this._highlightTimer);
                this._highlightTimer = setTimeout((() => {
                    this._highlightSearchText(this.getTableElement())
                }))
            } else {
                this._highlightSearchText(this.getTableElement())
            }
        }
        return deferred
    }
    _updateCell($cell, parameters) {
        const {
            column: column
        } = parameters;
        const dataType = column.lookup && column.lookup.dataType || column.dataType;
        const isEquals = "string" !== dataType;
        if (allowSearch(column) && !parameters.isOnForm) {
            if (this.option("templatesRenderAsynchronously")) {
                if (!this._searchParams.length) {
                    clearTimeout(this._highlightTimer);
                    this._highlightTimer = setTimeout((() => {
                        this._searchParams.forEach((params => {
                            this._highlightSearchText.apply(this, params)
                        }));
                        this._searchParams = []
                    }))
                }
                this._searchParams.push([$cell, isEquals, column])
            } else {
                this._highlightSearchText($cell, isEquals, column)
            }
        }
        super._updateCell($cell, parameters)
    }
};
export const searchModule = {
    defaultOptions: () => ({
        searchPanel: {
            visible: false,
            width: 160,
            placeholder: messageLocalization.format("dxDataGrid-searchPanelPlaceholder"),
            highlightSearchText: true,
            highlightCaseSensitive: false,
            text: "",
            searchVisibleColumnsOnly: false
        }
    }),
    extenders: {
        controllers: {
            data: dataController
        },
        views: {
            headerPanel: headerPanel,
            rowsView: rowsView
        }
    }
};
