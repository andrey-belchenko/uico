/**
 * DevExtreme (cjs/__internal/grids/pivot_grid/field_chooser/m_field_chooser.js)
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
exports.default = exports.FieldChooser = void 0;
require("../data_source/m_data_source");
var _component_registrator = _interopRequireDefault(require("../../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _icon = require("../../../../core/utils/icon");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _context_menu = _interopRequireDefault(require("../../../../ui/context_menu"));
var _tree_view = _interopRequireDefault(require("../../../../ui/tree_view"));
var _m_widget_utils = require("../m_widget_utils");
var _const = require("./const");
var _m_field_chooser_base = require("./m_field_chooser_base");

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
const DIV = "<div>";
const hasWindow = (0, _window.hasWindow)();

function getDimensionFields(item, fields) {
    const result = [];
    if (item.items) {
        for (let i = 0; i < item.items.length; i += 1) {
            result.push.apply(result, getDimensionFields(item.items[i], fields))
        }
    } else if ((0, _type.isDefined)(item.index)) {
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
}, (0, _m_widget_utils.getCompareFunction)((item => item.text))];

function compareItems(a, b) {
    let result = 0;
    let i = 0;
    while (!result && compareOrder[i]) {
        result = compareOrder[i++](a, b)
    }
    return result
}

function getScrollable(container) {
    return container.find(`.${_const.CLASSES.scrollable.self}`).dxScrollable("instance")
}
class FieldChooser extends _m_field_chooser_base.FieldChooserBase {
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
                columnFields: _message.default.format("dxPivotGrid-columnFields"),
                rowFields: _message.default.format("dxPivotGrid-rowFields"),
                dataFields: _message.default.format("dxPivotGrid-dataFields"),
                filterFields: _message.default.format("dxPivotGrid-filterFields"),
                allFields: _message.default.format("dxPivotGrid-allFields")
            }
        })
    }
    _refreshDataSource() {
        const that = this;
        that._expandedPaths = [];
        that._changedHandler = that._changedHandler || function() {
            (0, _iterator.each)(that._dataChangedHandlers, ((_, func) => {
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
        (0, _extend.extend)(this._optionsByReference, {
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
        this.$element().children(`.${_const.CLASSES.fieldChooser.container}`).remove()
    }
    _renderLayout0($container) {
        $container.addClass(_const.CLASSES.layout.zero);
        const $row1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.row).appendTo($container);
        const $row2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.row).appendTo($container);
        const $col1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row1);
        const $col2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row1);
        const $col3 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row2);
        const $col4 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row2);
        this._renderArea($col1, "all");
        this._renderArea($col2, "row");
        this._renderArea($col2, "column");
        this._renderArea($col3, "filter");
        this._renderArea($col4, "data")
    }
    _renderLayout1($container) {
        const $col1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($container);
        const $col2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($container);
        this._renderArea($col1, "all");
        this._renderArea($col2, "filter");
        this._renderArea($col2, "row");
        this._renderArea($col2, "column");
        this._renderArea($col2, "data")
    }
    _renderLayout2($container) {
        $container.addClass(_const.CLASSES.layout.second);
        const $row1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.row).appendTo($container);
        this._renderArea($row1, "all");
        const $row2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.row).appendTo($container);
        const $col1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row2);
        const $col2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row2);
        this._renderArea($col1, "filter");
        this._renderArea($col1, "row");
        this._renderArea($col2, "column");
        this._renderArea($col2, "data")
    }
    _initMarkup() {
        const that = this;
        const $element = this.$element();
        const $container = (0, _renderer.default)(DIV).addClass(_const.CLASSES.fieldChooser.container).appendTo($element);
        const layout = that.option("layout");
        super._initMarkup();
        $element.addClass(_const.CLASSES.fieldChooser.self).addClass(_const.CLASSES.pivotGrid.fieldsContainer);
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
        const targetFieldElement = (0, _renderer.default)(dxEvent.target).closest(`.${_const.CLASSES.area.field}`);
        const targetGroupElement = (0, _renderer.default)(dxEvent.target).closest(`.${_const.CLASSES.area.fieldList}`);
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
        that._contextMenu = that._createComponent((0, _renderer.default)(DIV).appendTo($container), _context_menu.default, {
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
            cssClass: _const.CLASSES.fieldChooser.contextMenu
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
            (0, _iterator.each)(fields, ((_, field) => {
                let icon;
                if (true === field.isMeasure) {
                    icon = _const.ICONS.measure
                }
                if (false === field.isMeasure) {
                    icon = field.groupName ? _const.ICONS.hierarchy : _const.ICONS.dimension
                }
                resultItems.push({
                    index: field.index,
                    field: field,
                    key: field.dataField,
                    selected: (0, _type.isDefined)(field.area),
                    text: field.caption || field.dataField,
                    icon: icon,
                    isMeasure: field.isMeasure,
                    isDefault: field.isDefault
                })
            }))
        } else {
            (0, _iterator.each)(fields, ((_, field) => {
                const groupName = field[groupFieldName] || "";
                fieldsByGroup[groupName] = fieldsByGroup[groupName] || [];
                fieldsByGroup[groupName].push(field);
                if (void 0 === isMeasure) {
                    isMeasure = true
                }
                isMeasure = isMeasure && true === field.isMeasure
            }));
            (0, _iterator.each)(fieldsByGroup, ((groupName, fields) => {
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
        fields = fields.filter((field => false !== field.visible && !(0, _type.isDefined)(field.groupIndex)));
        const treeItems = this._createTreeItems(fields, ["dimension", "displayFolder"]);
        (0, _m_widget_utils.foreachDataLevel)(treeItems, (items => {
            items.sort(compareItems)
        }), 0, "items");
        return treeItems
    }
    _renderFieldsTreeView(container) {
        const that = this;
        const dataSource = that._dataSource;
        const treeView = that._createComponent(container, _tree_view.default, {
            dataSource: that._createFieldsDataSource(dataSource),
            showCheckBoxesMode: "normal",
            expandNodesRecursive: false,
            searchEnabled: that.option("allowSearch"),
            searchTimeout: that.option("searchTimeout"),
            useNativeScrolling: false,
            itemTemplate(itemData, itemIndex, itemElement) {
                const $item = (0, _renderer.default)("<div>").toggleClass(_const.CLASSES.area.field, !itemData.items).attr(_const.ATTRIBUTES.treeViewItem, true).data("field", itemData.field).appendTo(itemElement);
                if (itemData.icon) {
                    var _getImageContainer;
                    null === (_getImageContainer = (0, _icon.getImageContainer)(itemData.icon)) || void 0 === _getImageContainer || _getImageContainer.appendTo($item)
                }(0, _renderer.default)("<span>").text(itemData.text).appendTo($item)
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
                        const item = getFirstItem(data, (item => item.isDefault)) || getFirstItem(data, (item => (0, _type.isDefined)(item.index)));
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
        const fields = dataSource ? (0, _extend.extend)(true, [], dataSource.getAreaFields(area, true)) : [];
        $container.empty();
        (0, _iterator.each)(fields, ((_, field) => {
            if (false !== field.visible) {
                that.renderField(field, true).appendTo($container)
            }
        }))
    }
    _renderArea(container, area) {
        const that = this;
        const $areaContainer = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.self).appendTo(container);
        const $fieldsHeaderContainer = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.fieldListHeader).appendTo($areaContainer);
        const caption = that.option(`texts.${area}Fields`);
        let $fieldsContent;
        let render;
        (0, _renderer.default)("<span>").addClass(_const.CLASSES.area.icon).addClass(`dx-icon-${_const.ICONS[area]}`).appendTo($fieldsHeaderContainer);
        (0, _renderer.default)("<span>").html("&nbsp;").appendTo($fieldsHeaderContainer);
        (0, _renderer.default)("<span>").addClass(_const.CLASSES.area.caption).text(caption).appendTo($fieldsHeaderContainer);
        const $fieldsContainer = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.fieldList).addClass(_const.CLASSES.pivotGrid.dragAction).appendTo($areaContainer);
        if ("all" !== area) {
            $fieldsContainer.attr("group", area).attr(_const.ATTRIBUTES.allowScrolling, true);
            $fieldsContent = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.fieldContainer).appendTo($fieldsContainer);
            render = function() {
                that._renderAreaFields($fieldsContent, area)
            };
            that._dataChangedHandlers.push(render);
            render();
            $fieldsContainer.dxScrollable({
                useNative: false
            })
        } else {
            $areaContainer.addClass(_const.CLASSES.allFields);
            $fieldsContainer.addClass(_const.CLASSES.treeView.borderVisible);
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
        const treeView = this.$element().find(`.${_const.CLASSES.treeView.self}`).dxTreeView("instance");
        if (treeView) {
            treeView.option("searchValue", "");
            treeView.collapseAll()
        }
    }
    applyChanges() {
        const state = this.option("state");
        if ((0, _type.isDefined)(state)) {
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
        const $scrollableElements = this.$element().find(`.${_const.CLASSES.area.self} .${_const.CLASSES.scrollable.self}`);
        $scrollableElements.dxScrollable("update")
    }
    _visibilityChanged(visible) {
        if (visible && hasWindow) {
            this.updateDimensions()
        }
    }
}
exports.FieldChooser = FieldChooser;
(0, _component_registrator.default)("dxPivotGridFieldChooser", FieldChooser);
var _default = exports.default = {
    FieldChooser: FieldChooser
};
