/**
 * DevExtreme (esm/__internal/grids/pivot_grid/field_chooser/m_field_chooser.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import "../data_source/m_data_source";
import registerComponent from "../../../../core/component_registrator";
import $ from "../../../../core/renderer";
import {
    extend
} from "../../../../core/utils/extend";
import {
    getImageContainer
} from "../../../../core/utils/icon";
import {
    each
} from "../../../../core/utils/iterator";
import {
    isDefined
} from "../../../../core/utils/type";
import {
    hasWindow as hasWindowFn
} from "../../../../core/utils/window";
import localizationMessage from "../../../../localization/message";
import ContextMenu from "../../../../ui/context_menu";
import TreeView from "../../../../ui/tree_view";
import {
    foreachDataLevel,
    getCompareFunction
} from "../m_widget_utils";
import {
    ATTRIBUTES,
    CLASSES,
    ICONS
} from "./const";
import {
    FieldChooserBase
} from "./m_field_chooser_base";
const DIV = "<div>";
const hasWindow = hasWindowFn();

function getDimensionFields(item, fields) {
    const result = [];
    if (item.items) {
        for (let i = 0; i < item.items.length; i += 1) {
            result.push.apply(result, getDimensionFields(item.items[i], fields))
        }
    } else if (isDefined(item.index)) {
        result.push(fields[item.index])
    }
    return result
}

function getFirstItem(item, condition) {
    if (item.items) {
        for (let i = 0; i < item.items.length; i += 1) {
            const childrenItem = getFirstItem(item.items[i], condition);
            if (childrenItem) {
                return childrenItem
            }
        }
    }
    if (condition(item)) {
        return item
    }
    return
}
const compareOrder = [function(a, b) {
    const aValue = -!!a.isMeasure;
    const bValue = +!!b.isMeasure;
    return aValue + bValue
}, function(a, b) {
    const aValue = -!!(a.items && a.items.length);
    const bValue = +!!(b.items && b.items.length);
    return aValue + bValue
}, function(a, b) {
    const aValue = +!!(false === a.isMeasure && a.field && a.field.levels && a.field.levels.length);
    const bValue = -!!(false === b.isMeasure && b.field && b.field.levels && b.field.levels.length);
    return aValue + bValue
}, getCompareFunction((item => item.text))];

function compareItems(a, b) {
    let result = 0;
    let i = 0;
    while (!result && compareOrder[i]) {
        result = compareOrder[i++](a, b)
    }
    return result
}

function getScrollable(container) {
    return container.find(`.${CLASSES.scrollable.self}`).dxScrollable("instance")
}
export class FieldChooser extends FieldChooserBase {
    _getDefaultOptions() {
        return _extends({}, super._getDefaultOptions(), {
            height: 400,
            layout: 0,
            dataSource: null,
            encodeHtml: true,
            onContextMenuPreparing: null,
            allowSearch: false,
            searchTimeout: 500,
            texts: {
                columnFields: localizationMessage.format("dxPivotGrid-columnFields"),
                rowFields: localizationMessage.format("dxPivotGrid-rowFields"),
                dataFields: localizationMessage.format("dxPivotGrid-dataFields"),
                filterFields: localizationMessage.format("dxPivotGrid-filterFields"),
                allFields: localizationMessage.format("dxPivotGrid-allFields")
            }
        })
    }
    _refreshDataSource() {
        const that = this;
        that._expandedPaths = [];
        that._changedHandler = that._changedHandler || function() {
            each(that._dataChangedHandlers, ((_, func) => {
                func()
            }));
            that._fireContentReadyAction();
            that._skipStateChange = true;
            that.option("state", that._dataSource.state());
            that._skipStateChange = false
        };
        that._disposeDataSource();
        super._refreshDataSource();
        that._dataSource && that._dataSource.on("changed", that._changedHandler)
    }
    _disposeDataSource() {
        const that = this;
        const dataSource = that._dataSource;
        if (dataSource) {
            dataSource.off("changed", that._changedHandler);
            that._dataSource = void 0
        }
    }
    _dispose() {
        this._disposeDataSource();
        super._dispose.apply(this, arguments)
    }
    _init() {
        super._init();
        this._refreshDataSource();
        this._dataChangedHandlers = [];
        this._initActions()
    }
    _initActions() {
        this._actions = {
            onContextMenuPreparing: this._createActionByOption("onContextMenuPreparing")
        }
    }
    _trigger(eventName, eventArg) {
        this._actions[eventName](eventArg)
    }
    _setOptionsByReference() {
        super._setOptionsByReference();
        extend(this._optionsByReference, {
            dataSource: true
        })
    }
    _optionChanged(args) {
        const that = this;
        switch (args.name) {
            case "dataSource":
                that._refreshDataSource();
                that._invalidate();
                break;
            case "layout":
            case "texts":
            case "allowSearch":
            case "searchTimeout":
            case "encodeHtml":
                that._invalidate();
                break;
            case "onContextMenuPreparing":
                that._actions[args.name] = that._createActionByOption(args.name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    _clean(skipStateSetting) {
        !skipStateSetting && this._dataSource && this.option("state", this._dataSource.state());
        this.$element().children(`.${CLASSES.fieldChooser.container}`).remove()
    }
    _renderLayout0($container) {
        $container.addClass(CLASSES.layout.zero);
        const $row1 = $(DIV).addClass(CLASSES.row).appendTo($container);
        const $row2 = $(DIV).addClass(CLASSES.row).appendTo($container);
        const $col1 = $(DIV).addClass(CLASSES.col).appendTo($row1);
        const $col2 = $(DIV).addClass(CLASSES.col).appendTo($row1);
        const $col3 = $(DIV).addClass(CLASSES.col).appendTo($row2);
        const $col4 = $(DIV).addClass(CLASSES.col).appendTo($row2);
        this._renderArea($col1, "all");
        this._renderArea($col2, "row");
        this._renderArea($col2, "column");
        this._renderArea($col3, "filter");
        this._renderArea($col4, "data")
    }
    _renderLayout1($container) {
        const $col1 = $(DIV).addClass(CLASSES.col).appendTo($container);
        const $col2 = $(DIV).addClass(CLASSES.col).appendTo($container);
        this._renderArea($col1, "all");
        this._renderArea($col2, "filter");
        this._renderArea($col2, "row");
        this._renderArea($col2, "column");
        this._renderArea($col2, "data")
    }
    _renderLayout2($container) {
        $container.addClass(CLASSES.layout.second);
        const $row1 = $(DIV).addClass(CLASSES.row).appendTo($container);
        this._renderArea($row1, "all");
        const $row2 = $(DIV).addClass(CLASSES.row).appendTo($container);
        const $col1 = $(DIV).addClass(CLASSES.col).appendTo($row2);
        const $col2 = $(DIV).addClass(CLASSES.col).appendTo($row2);
        this._renderArea($col1, "filter");
        this._renderArea($col1, "row");
        this._renderArea($col2, "column");
        this._renderArea($col2, "data")
    }
    _initMarkup() {
        const that = this;
        const $element = this.$element();
        const $container = $(DIV).addClass(CLASSES.fieldChooser.container).appendTo($element);
        const layout = that.option("layout");
        super._initMarkup();
        $element.addClass(CLASSES.fieldChooser.self).addClass(CLASSES.pivotGrid.fieldsContainer);
        that._dataChangedHandlers = [];
        const dataSource = this._dataSource;
        const currentState = "instantly" !== that.option("applyChangesMode") && dataSource && dataSource.state();
        currentState && that.option("state") && dataSource.state(that.option("state"), true);
        if (0 === layout) {
            that._renderLayout0($container)
        } else if (1 === layout) {
            that._renderLayout1($container)
        } else {
            that._renderLayout2($container)
        }
        currentState && dataSource.state(currentState, true)
    }
    _renderContentImpl() {
        super._renderContentImpl();
        this.renderSortable();
        this._renderContextMenu();
        this.updateDimensions()
    }
    _fireContentReadyAction() {
        if (!this._dataSource || !this._dataSource.isLoading()) {
            super._fireContentReadyAction()
        }
    }
    _getContextMenuArgs(dxEvent) {
        const targetFieldElement = $(dxEvent.target).closest(`.${CLASSES.area.field}`);
        const targetGroupElement = $(dxEvent.target).closest(`.${CLASSES.area.fieldList}`);
        let field;
        let area;
        if (targetFieldElement.length) {
            const fieldCopy = targetFieldElement.data("field");
            if (fieldCopy) {
                field = this.getDataSource().field(fieldCopy.index) || fieldCopy
            }
        }
        if (targetGroupElement.length) {
            area = targetGroupElement.attr("group")
        }
        return {
            event: dxEvent,
            field: field,
            area: area,
            items: []
        }
    }
    _renderContextMenu() {
        const that = this;
        const $container = that.$element();
        if (that._contextMenu) {
            that._contextMenu.$element().remove()
        }
        that._contextMenu = that._createComponent($(DIV).appendTo($container), ContextMenu, {
            onPositioning(actionArgs) {
                const {
                    event: event
                } = actionArgs;
                if (!event) {
                    return
                }
                const args = that._getContextMenuArgs(event);
                that._trigger("onContextMenuPreparing", args);
                if (args.items && args.items.length) {
                    actionArgs.component.option("items", args.items)
                } else {
                    actionArgs.cancel = true
                }
            },
            target: $container,
            onItemClick(params) {
                params.itemData.onItemClick && params.itemData.onItemClick(params)
            },
            cssClass: CLASSES.fieldChooser.contextMenu
        })
    }
    _createTreeItems(fields, groupFieldNames, path) {
        const that = this;
        let isMeasure;
        let resultItems = [];
        const groupedItems = [];
        const groupFieldName = groupFieldNames[0];
        const fieldsByGroup = {};
        if (!groupFieldName) {
            each(fields, ((_, field) => {
                let icon;
                if (true === field.isMeasure) {
                    icon = ICONS.measure
                }
                if (false === field.isMeasure) {
                    icon = field.groupName ? ICONS.hierarchy : ICONS.dimension
                }
                resultItems.push({
                    index: field.index,
                    field: field,
                    key: field.dataField,
                    selected: isDefined(field.area),
                    text: field.caption || field.dataField,
                    icon: icon,
                    isMeasure: field.isMeasure,
                    isDefault: field.isDefault
                })
            }))
        } else {
            each(fields, ((_, field) => {
                const groupName = field[groupFieldName] || "";
                fieldsByGroup[groupName] = fieldsByGroup[groupName] || [];
                fieldsByGroup[groupName].push(field);
                if (void 0 === isMeasure) {
                    isMeasure = true
                }
                isMeasure = isMeasure && true === field.isMeasure
            }));
            each(fieldsByGroup, ((groupName, fields) => {
                const currentPath = path ? `${path}.${groupName}` : groupName;
                const items = that._createTreeItems(fields, groupFieldNames.slice(1), currentPath);
                if (groupName) {
                    groupedItems.push({
                        key: groupName,
                        text: groupName,
                        path: currentPath,
                        isMeasure: items.isMeasure,
                        expanded: that._expandedPaths.includes(currentPath),
                        items: items
                    })
                } else {
                    resultItems = items
                }
            }));
            resultItems = groupedItems.concat(resultItems);
            resultItems.isMeasure = isMeasure
        }
        return resultItems
    }
    _createFieldsDataSource(dataSource) {
        let fields = dataSource && dataSource.fields() || [];
        fields = fields.filter((field => false !== field.visible && !isDefined(field.groupIndex)));
        const treeItems = this._createTreeItems(fields, ["dimension", "displayFolder"]);
        foreachDataLevel(treeItems, (items => {
            items.sort(compareItems)
        }), 0, "items");
        return treeItems
    }
    _renderFieldsTreeView(container) {
        const that = this;
        const dataSource = that._dataSource;
        const treeView = that._createComponent(container, TreeView, {
            dataSource: that._createFieldsDataSource(dataSource),
            showCheckBoxesMode: "normal",
            expandNodesRecursive: false,
            searchEnabled: that.option("allowSearch"),
            searchTimeout: that.option("searchTimeout"),
            useNativeScrolling: false,
            itemTemplate(itemData, itemIndex, itemElement) {
                const $item = $("<div>").toggleClass(CLASSES.area.field, !itemData.items).attr(ATTRIBUTES.treeViewItem, true).data("field", itemData.field).appendTo(itemElement);
                if (itemData.icon) {
                    var _getImageContainer;
                    null === (_getImageContainer = getImageContainer(itemData.icon)) || void 0 === _getImageContainer || _getImageContainer.appendTo($item)
                }
                $("<span>").text(itemData.text).appendTo($item)
            },
            onItemCollapsed(e) {
                const index = that._expandedPaths.indexOf(e.itemData.path);
                if (index >= 0) {
                    that._expandedPaths.splice(index, 1)
                }
            },
            onItemExpanded(e) {
                const index = that._expandedPaths.indexOf(e.itemData.path);
                if (index < 0) {
                    that._expandedPaths.push(e.itemData.path)
                }
            },
            onItemSelectionChanged(e) {
                const data = e.itemData;
                let field;
                let fields;
                let needSelectDefaultItem = true;
                let area;
                if (data.items) {
                    if (data.selected) {
                        treeView.unselectItem(data);
                        return
                    }
                    that._processDemandState((() => {
                        fields = getDimensionFields(data, dataSource.fields());
                        for (let i = 0; i < fields.length; i += 1) {
                            if (fields[i].area) {
                                needSelectDefaultItem = false;
                                break
                            }
                        }
                    }));
                    if (needSelectDefaultItem) {
                        const item = getFirstItem(data, (item => item.isDefault)) || getFirstItem(data, (item => isDefined(item.index)));
                        item && treeView.selectItem(item);
                        return
                    }
                } else {
                    field = dataSource.fields()[data.index];
                    if (data.selected) {
                        area = field.isMeasure ? "data" : "column"
                    }
                    if (field) {
                        fields = [field]
                    }
                }
                that._applyChanges(fields, {
                    area: area,
                    areaIndex: void 0
                })
            }
        });
        that._dataChangedHandlers.push((function() {
            let scrollable = getScrollable(container);
            const scrollTop = scrollable ? scrollable.scrollTop() : 0;
            treeView.option({
                dataSource: that._createFieldsDataSource(dataSource)
            });
            scrollable = getScrollable(container);
            if (scrollable) {
                scrollable.scrollTo({
                    y: scrollTop
                });
                scrollable.update()
            }
        }))
    }
    _renderAreaFields($container, area) {
        const that = this;
        const dataSource = that._dataSource;
        const fields = dataSource ? extend(true, [], dataSource.getAreaFields(area, true)) : [];
        $container.empty();
        each(fields, ((_, field) => {
            if (false !== field.visible) {
                that.renderField(field, true).appendTo($container)
            }
        }))
    }
    _renderArea(container, area) {
        const that = this;
        const $areaContainer = $(DIV).addClass(CLASSES.area.self).appendTo(container);
        const $fieldsHeaderContainer = $(DIV).addClass(CLASSES.area.fieldListHeader).appendTo($areaContainer);
        const caption = that.option(`texts.${area}Fields`);
        let $fieldsContent;
        let render;
        $("<span>").addClass(CLASSES.area.icon).addClass(`dx-icon-${ICONS[area]}`).appendTo($fieldsHeaderContainer);
        $("<span>").html("&nbsp;").appendTo($fieldsHeaderContainer);
        $("<span>").addClass(CLASSES.area.caption).text(caption).appendTo($fieldsHeaderContainer);
        const $fieldsContainer = $(DIV).addClass(CLASSES.area.fieldList).addClass(CLASSES.pivotGrid.dragAction).appendTo($areaContainer);
        if ("all" !== area) {
            $fieldsContainer.attr("group", area).attr(ATTRIBUTES.allowScrolling, true);
            $fieldsContent = $(DIV).addClass(CLASSES.area.fieldContainer).appendTo($fieldsContainer);
            render = function() {
                that._renderAreaFields($fieldsContent, area)
            };
            that._dataChangedHandlers.push(render);
            render();
            $fieldsContainer.dxScrollable({
                useNative: false
            })
        } else {
            $areaContainer.addClass(CLASSES.allFields);
            $fieldsContainer.addClass(CLASSES.treeView.borderVisible);
            that._renderFieldsTreeView($fieldsContainer)
        }
    }
    _getSortableOptions() {
        return {
            direction: ""
        }
    }
    _adjustSortableOnChangedArgs() {}
    resetTreeView() {
        const treeView = this.$element().find(`.${CLASSES.treeView.self}`).dxTreeView("instance");
        if (treeView) {
            treeView.option("searchValue", "");
            treeView.collapseAll()
        }
    }
    applyChanges() {
        const state = this.option("state");
        if (isDefined(state)) {
            this._dataSource.state(state)
        }
    }
    cancelChanges() {
        const dataSource = this._dataSource;
        if (!dataSource.isLoading()) {
            this.option("state", dataSource.state());
            return true
        }
        return false
    }
    getDataSource() {
        return this._dataSource
    }
    updateDimensions() {
        const $scrollableElements = this.$element().find(`.${CLASSES.area.self} .${CLASSES.scrollable.self}`);
        $scrollableElements.dxScrollable("update")
    }
    _visibilityChanged(visible) {
        if (visible && hasWindow) {
            this.updateDimensions()
        }
    }
}
registerComponent("dxPivotGridFieldChooser", FieldChooser);
export default {
    FieldChooser: FieldChooser
};
