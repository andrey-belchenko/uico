/**
 * DevExtreme (esm/__internal/grids/grid_core/header_filter/m_header_filter_core.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import "../../../../ui/list/modules/search";
import "../../../../ui/list/modules/selection";
import $ from "../../../../core/renderer";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import {
    isDefined,
    isFunction
} from "../../../../core/utils/type";
import messageLocalization from "../../../../localization/message";
import List from "../../../../ui/list_light";
import Popup from "../../../../ui/popup/ui.popup";
import TreeView from "../../../../ui/tree_view";
import Modules from "../../../grids/grid_core/m_modules";
import gridCoreUtils from "../m_utils";
const HEADER_FILTER_CLASS = "dx-header-filter";
const HEADER_FILTER_MENU_CLASS = "dx-header-filter-menu";
const DEFAULT_SEARCH_EXPRESSION = "text";

function resetChildrenItemSelection(items) {
    items = items || [];
    for (let i = 0; i < items.length; i++) {
        items[i].selected = false;
        resetChildrenItemSelection(items[i].items)
    }
}

function getSelectAllCheckBox(listComponent) {
    const selector = "dxTreeView" === listComponent.NAME ? ".dx-treeview-select-all-item" : ".dx-list-select-all-checkbox";
    return listComponent.$element().find(selector).dxCheckBox("instance")
}

function updateListSelectAllState(e, filterValues) {
    if (e.component.option("searchValue")) {
        return
    }
    const selectAllCheckBox = getSelectAllCheckBox(e.component);
    if (selectAllCheckBox && filterValues && filterValues.length) {
        selectAllCheckBox.option("value", void 0)
    }
}
export function updateHeaderFilterItemSelectionState(item, filterValuesMatch, isExcludeFilter) {
    if (filterValuesMatch ^ isExcludeFilter) {
        item.selected = true;
        if (isExcludeFilter && item.items) {
            for (let j = 0; j < item.items.length; j++) {
                if (!item.items[j].selected) {
                    item.selected = void 0;
                    break
                }
            }
        }
    } else if (isExcludeFilter || item.selected) {
        item.selected = false;
        resetChildrenItemSelection(item.items)
    }
}
export class HeaderFilterView extends Modules.View {
    getPopupContainer() {
        return this._popupContainer
    }
    getListComponent() {
        return this._listComponent
    }
    applyHeaderFilter(options) {
        const list = this.getListComponent();
        const searchValue = list.option("searchValue");
        const selectAllCheckBox = getSelectAllCheckBox(list);
        const isAllSelected = !searchValue && !options.isFilterBuilder && (null === selectAllCheckBox || void 0 === selectAllCheckBox ? void 0 : selectAllCheckBox.option("value"));
        const filterValues = [];
        const fillSelectedItemKeys = function(filterValues, items, isExclude) {
            each(items, ((_, item) => {
                if (void 0 !== item.selected && !!item.selected ^ isExclude) {
                    const node = list._getNode(item);
                    const hasChildren = list._hasChildren(node);
                    const hasChildrenWithSelection = hasChildren && item.items && item.items.some((item => item.selected));
                    if (!searchValue || !hasChildrenWithSelection) {
                        filterValues.push(item.value);
                        return
                    }
                }
                if (item.items && item.items.length) {
                    fillSelectedItemKeys(filterValues, item.items, isExclude)
                }
            }))
        };
        if (!isAllSelected) {
            if ("tree" === options.type) {
                if (options.filterType) {
                    options.filterType = "include"
                }
                fillSelectedItemKeys(filterValues, list.option("items"), false);
                options.filterValues = filterValues
            }
        } else {
            if ("tree" === options.type) {
                options.filterType = "exclude"
            }
            if (Array.isArray(options.filterValues)) {
                options.filterValues = []
            }
        }
        if (options.filterValues && !options.filterValues.length) {
            options.filterValues = null
        }
        options.apply();
        this.hideHeaderFilterMenu()
    }
    showHeaderFilterMenu($columnElement, options) {
        const that = this;
        if (options) {
            that._initializePopupContainer(options);
            const popupContainer = that.getPopupContainer();
            that.hideHeaderFilterMenu();
            that.updatePopup($columnElement, options);
            popupContainer.show()
        }
    }
    hideHeaderFilterMenu() {
        const headerFilterMenu = this.getPopupContainer();
        headerFilterMenu && headerFilterMenu.hide()
    }
    updatePopup($element, options) {
        const that = this;
        const showColumnLines = this.option("showColumnLines");
        const alignment = "right" === options.alignment ^ !showColumnLines ? "left" : "right";
        that._popupContainer.setAria({
            role: "dialog",
            label: messageLocalization.format("dxDataGrid-headerFilterLabel")
        });
        if (that._popupContainer) {
            that._cleanPopupContent();
            that._popupContainer.option("position", {
                my: `${alignment} top`,
                at: `${alignment} bottom`,
                of: $element,
                collision: "fit fit"
            })
        }
    }
    _getSearchExpr(options, headerFilterOptions) {
        const {
            lookup: lookup
        } = options;
        const {
            useDefaultSearchExpr: useDefaultSearchExpr
        } = options;
        const headerFilterDataSource = headerFilterOptions.dataSource;
        const filterSearchExpr = headerFilterOptions.search.searchExpr;
        if (filterSearchExpr) {
            return filterSearchExpr
        }
        if (useDefaultSearchExpr || isDefined(headerFilterDataSource) && !isFunction(headerFilterDataSource)) {
            return "text"
        }
        if (lookup) {
            return lookup.displayExpr || "this"
        }
        if (options.dataSource) {
            const {
                group: group
            } = options.dataSource;
            if (Array.isArray(group) && group.length > 0) {
                return group[0].selector
            }
            if (isFunction(group) && !options.remoteFiltering) {
                return group
            }
        }
        return options.dataField || options.selector
    }
    _cleanPopupContent() {
        this._popupContainer && this._popupContainer.$content().empty()
    }
    _initializePopupContainer(options) {
        const that = this;
        const $element = that.element();
        const headerFilterOptions = this._normalizeHeaderFilterOptions(options);
        const {
            height: height,
            width: width
        } = headerFilterOptions;
        const dxPopupOptions = {
            width: width,
            height: height,
            visible: false,
            shading: false,
            showTitle: false,
            showCloseButton: false,
            hideOnParentScroll: false,
            dragEnabled: false,
            hideOnOutsideClick: true,
            wrapperAttr: {
                class: "dx-header-filter-menu"
            },
            focusStateEnabled: false,
            toolbarItems: [{
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: {
                    text: headerFilterOptions.texts.ok,
                    onClick() {
                        that.applyHeaderFilter(options)
                    }
                }
            }, {
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: {
                    text: headerFilterOptions.texts.cancel,
                    onClick() {
                        that.hideHeaderFilterMenu()
                    }
                }
            }],
            resizeEnabled: true,
            onShowing(e) {
                e.component.$content().parent().addClass("dx-dropdowneditor-overlay");
                that._initializeListContainer(options, headerFilterOptions);
                options.onShowing && options.onShowing(e)
            },
            onShown() {
                that.getListComponent().focus()
            },
            onHidden: options.onHidden,
            onInitialized(e) {
                const {
                    component: component
                } = e;
                component.option("animation", component._getDefaultOptions().animation)
            }
        };
        if (!isDefined(that._popupContainer)) {
            that._popupContainer = that._createComponent($element, Popup, dxPopupOptions)
        } else {
            that._popupContainer.option(dxPopupOptions)
        }
    }
    _initializeListContainer(options, headerFilterOptions) {
        const that = this;
        const $content = that._popupContainer.$content();
        const needShowSelectAllCheckbox = !options.isFilterBuilder && headerFilterOptions.allowSelectAll;
        const widgetOptions = {
            searchEnabled: headerFilterOptions.search.enabled,
            searchTimeout: headerFilterOptions.search.timeout,
            searchEditorOptions: headerFilterOptions.search.editorOptions,
            searchMode: headerFilterOptions.search.mode || "",
            dataSource: options.dataSource,
            onContentReady() {
                that.renderCompleted.fire()
            },
            itemTemplate(data, _, element) {
                const $element = $(element);
                if (options.encodeHtml) {
                    return $element.text(data.text)
                }
                return $element.html(data.text)
            }
        };

        function onOptionChanged(e) {
            if ("searchValue" === e.fullName && needShowSelectAllCheckbox && false !== that.option("headerFilter.hideSelectAllOnSearch")) {
                if ("tree" === options.type) {
                    e.component.option("showCheckBoxesMode", e.value ? "normal" : "selectAll")
                } else {
                    e.component.option("selectionMode", e.value ? "multiple" : "all")
                }
            }
        }
        if ("tree" === options.type) {
            that._listComponent = that._createComponent($("<div>").appendTo($content), TreeView, extend(widgetOptions, {
                showCheckBoxesMode: needShowSelectAllCheckbox ? "selectAll" : "normal",
                onOptionChanged: onOptionChanged,
                keyExpr: "id"
            }))
        } else {
            that._listComponent = that._createComponent($("<div>").appendTo($content), List, extend(widgetOptions, {
                searchExpr: that._getSearchExpr(options, headerFilterOptions),
                pageLoadMode: "scrollBottom",
                showSelectionControls: true,
                selectionMode: needShowSelectAllCheckbox ? "all" : "multiple",
                onOptionChanged: onOptionChanged,
                onSelectionChanged(e) {
                    const items = e.component.option("items");
                    const selectedItems = e.component.option("selectedItems");
                    if (!e.component._selectedItemsUpdating && !e.component.option("searchValue") && !options.isFilterBuilder) {
                        const filterValues = options.filterValues || [];
                        const isExclude = "exclude" === options.filterType;
                        if (0 === selectedItems.length && items.length && (filterValues.length <= 1 || isExclude && filterValues.length === items.length - 1)) {
                            options.filterType = "include";
                            options.filterValues = []
                        } else if (selectedItems.length === items.length) {
                            options.filterType = "exclude";
                            options.filterValues = []
                        }
                    }
                    each(items, ((index, item) => {
                        const selected = gridCoreUtils.getIndexByKey(item, selectedItems, null) >= 0;
                        const oldSelected = !!item.selected;
                        if (oldSelected !== selected) {
                            item.selected = selected;
                            options.filterValues = options.filterValues || [];
                            const filterValueIndex = gridCoreUtils.getIndexByKey(item.value, options.filterValues, null);
                            if (filterValueIndex >= 0) {
                                options.filterValues.splice(filterValueIndex, 1)
                            }
                            const isExcludeFilterType = "exclude" === options.filterType;
                            if (selected ^ isExcludeFilterType) {
                                options.filterValues.push(item.value)
                            }
                        }
                    }));
                    updateListSelectAllState(e, options.filterValues)
                },
                onContentReady(e) {
                    const {
                        component: component
                    } = e;
                    const items = component.option("items");
                    const selectedItems = [];
                    each(items, (function() {
                        if (this.selected) {
                            selectedItems.push(this)
                        }
                    }));
                    component._selectedItemsUpdating = true;
                    component.option("selectedItems", selectedItems);
                    component._selectedItemsUpdating = false;
                    updateListSelectAllState(e, options.filterValues)
                }
            }))
        }
    }
    _normalizeHeaderFilterOptions(options) {
        const generalHeaderFilter = this.option("headerFilter") || {};
        const specificHeaderFilter = options.headerFilter || {};
        const generalDeprecated = {
            search: {
                enabled: generalHeaderFilter.allowSearch,
                timeout: generalHeaderFilter.searchTimeout
            }
        };
        const specificDeprecated = {
            search: {
                enabled: specificHeaderFilter.allowSearch,
                mode: specificHeaderFilter.searchMode,
                timeout: specificHeaderFilter.searchTimeout
            }
        };
        return extend(true, {}, generalHeaderFilter, generalDeprecated, specificHeaderFilter, specificDeprecated)
    }
    _renderCore() {
        this.element().addClass("dx-header-filter-menu")
    }
}
export const allowHeaderFiltering = function(column) {
    return isDefined(column.allowHeaderFiltering) ? column.allowHeaderFiltering : column.allowFiltering
};
export const headerFilterMixin = Base => class extends Base {
    optionChanged(args) {
        if ("headerFilter" === args.name) {
            const requireReady = "columnHeadersView" === this.name;
            this._invalidate(requireReady, requireReady);
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
    _applyColumnState(options) {
        let $headerFilterIndicator;
        const {
            rootElement: rootElement
        } = options;
        const {
            column: column
        } = options;
        if ("headerFilter" === options.name) {
            rootElement.find(".dx-header-filter").remove();
            if (allowHeaderFiltering(column)) {
                $headerFilterIndicator = super._applyColumnState(options).toggleClass("dx-header-filter-empty", this._isHeaderFilterEmpty(column));
                if (!this.option("useLegacyKeyboardNavigation")) {
                    $headerFilterIndicator.attr("tabindex", this.option("tabindex") || 0)
                }
                const indicatorLabel = messageLocalization.format("dxDataGrid-headerFilterIndicatorLabel", column.caption);
                $headerFilterIndicator.attr("aria-label", indicatorLabel);
                $headerFilterIndicator.attr("aria-haspopup", "dialog");
                $headerFilterIndicator.attr("role", "button")
            }
            return $headerFilterIndicator
        }
        return super._applyColumnState(options)
    }
    _isHeaderFilterEmpty(column) {
        return !column.filterValues || !column.filterValues.length
    }
    _getIndicatorClassName(name) {
        if ("headerFilter" === name) {
            return "dx-header-filter"
        }
        return super._getIndicatorClassName(name)
    }
    _renderIndicator(options) {
        const $container = options.container;
        const $indicator = options.indicator;
        if ("headerFilter" === options.name) {
            const rtlEnabled = this.option("rtlEnabled");
            if ($container.children().length && (!rtlEnabled && "right" === options.columnAlignment || rtlEnabled && "left" === options.columnAlignment)) {
                $container.prepend($indicator);
                return
            }
        }
        super._renderIndicator(options)
    }
};
