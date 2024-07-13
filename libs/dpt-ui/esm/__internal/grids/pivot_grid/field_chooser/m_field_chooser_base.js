/**
 * DevExtreme (esm/__internal/grids/pivot_grid/field_chooser/m_field_chooser_base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from "../../../../core/component_registrator";
import $ from "../../../../core/renderer";
import {
    Deferred
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each,
    map
} from "../../../../core/utils/iterator";
import {
    isDefined
} from "../../../../core/utils/type";
import ArrayStore from "../../../../data/array_store";
import {
    name as clickEventName
} from "../../../../events/click";
import eventsEngine from "../../../../events/core/events_engine";
import localizationMessage from "../../../../localization/message";
import Widget from "../../../../ui/widget/ui.widget";
import columnStateMixin from "../../../grids/grid_core/column_state_mixin/m_column_state_mixin";
import {
    headerFilterMixin,
    HeaderFilterView as HeaderFilterViewBase,
    updateHeaderFilterItemSelectionState
} from "../../../grids/grid_core/header_filter/m_header_filter_core";
import gridCoreUtils from "../../../grids/grid_core/m_utils";
import sortingMixin from "../../../grids/grid_core/sorting/m_sorting_mixin";
import {
    createPath,
    foreachTree
} from "../m_widget_utils";
import SortableModule from "../sortable/m_sortable";
import {
    ATTRIBUTES,
    CLASSES
} from "./const";
import {
    dragAndDropItemRender
} from "./dom";
import {
    reverseSortOrder
} from "./utils";
const {
    Sortable: Sortable
} = SortableModule;
const DIV = "<div>";
class HeaderFilterView extends HeaderFilterViewBase {
    _getSearchExpr(options, headerFilterOptions) {
        options.useDefaultSearchExpr = true;
        return super._getSearchExpr(options, headerFilterOptions)
    }
}
const processItems = function(groupItems, field) {
    const filterValues = [];
    const isTree = !!field.groupName;
    const isExcludeFilterType = "exclude" === field.filterType;
    if (field.filterValues) {
        each(field.filterValues, ((_, filterValue) => {
            filterValues.push(Array.isArray(filterValue) ? filterValue.join("/") : filterValue && filterValue.valueOf())
        }))
    }
    foreachTree(groupItems, (items => {
        const item = items[0];
        const path = createPath(items);
        const preparedFilterValueByText = isTree ? map(items, (item => item.text)).reverse().join("/") : item.text;
        item.value = isTree ? path.slice(0) : item.key || item.value;
        const preparedFilterValue = isTree ? path.join("/") : item.value && item.value.valueOf();
        if (item.children) {
            item.items = item.children;
            item.children = null
        }
        updateHeaderFilterItemSelectionState(item, item.key && filterValues.includes(preparedFilterValueByText) || filterValues.includes(preparedFilterValue), isExcludeFilterType)
    }))
};

function getMainGroupField(dataSource, sourceField) {
    let field = sourceField;
    if (isDefined(sourceField.groupIndex)) {
        field = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex]
    }
    return field
}

function getStringState(state) {
    state = state || {};
    return JSON.stringify([state.fields, state.columnExpandedPaths, state.rowExpandedPaths])
}
const mixinWidget = headerFilterMixin(sortingMixin(columnStateMixin(Widget)));
export class FieldChooserBase extends mixinWidget {
    _getDefaultOptions() {
        return _extends({}, super._getDefaultOptions(), {
            allowFieldDragging: true,
            applyChangesMode: "instantly",
            state: null,
            headerFilter: {
                width: 252,
                height: 325,
                allowSelectAll: true,
                showRelevantValues: false,
                search: {
                    enabled: false,
                    timeout: 500,
                    editorOptions: {},
                    mode: "contains"
                },
                texts: {
                    emptyValue: localizationMessage.format("dxDataGrid-headerFilterEmptyValue"),
                    ok: localizationMessage.format("dxDataGrid-headerFilterOK"),
                    cancel: localizationMessage.format("dxDataGrid-headerFilterCancel")
                }
            },
            remoteSort: false
        })
    }
    _init() {
        super._init();
        this._headerFilterView = new HeaderFilterView(this);
        this._refreshDataSource();
        this.subscribeToEvents();
        gridCoreUtils.logHeaderFilterDeprecatedWarningIfNeed(this)
    }
    _refreshDataSource() {
        const dataSource = this.option("dataSource");
        if (dataSource && dataSource.fields && dataSource.load) {
            this._dataSource = dataSource
        }
    }
    _optionChanged(args) {
        switch (args.name) {
            case "dataSource":
                this._refreshDataSource();
                break;
            case "applyChangesMode":
            case "remoteSort":
                break;
            case "state":
                if (this._skipStateChange || !this._dataSource) {
                    break
                }
                if ("instantly" === this.option("applyChangesMode") && getStringState(this._dataSource.state()) !== getStringState(args.value)) {
                    this._dataSource.state(args.value)
                } else {
                    this._clean(true);
                    this._renderComponent()
                }
                break;
            case "headerFilter":
            case "allowFieldDragging":
                this._invalidate();
                break;
            default:
                super._optionChanged(args)
        }
    }
    renderField(field, showColumnLines) {
        const that = this;
        const $fieldContent = $(DIV).addClass(CLASSES.area.fieldContent).text(field.caption || field.dataField);
        const $fieldElement = $(DIV).addClass(CLASSES.area.field).addClass(CLASSES.area.box).data("field", field).append($fieldContent);
        const mainGroupField = getMainGroupField(that._dataSource, field);
        if ("data" !== field.area) {
            if (field.allowSorting) {
                that._applyColumnState({
                    name: "sort",
                    rootElement: $fieldElement,
                    column: {
                        alignment: that.option("rtlEnabled") ? "right" : "left",
                        sortOrder: "desc" === field.sortOrder ? "desc" : "asc",
                        allowSorting: field.allowSorting
                    },
                    showColumnLines: showColumnLines
                })
            }
            that._applyColumnState({
                name: "headerFilter",
                rootElement: $fieldElement,
                column: {
                    alignment: that.option("rtlEnabled") ? "right" : "left",
                    filterValues: mainGroupField.filterValues,
                    allowFiltering: mainGroupField.allowFiltering && !field.groupIndex,
                    allowSorting: field.allowSorting
                },
                showColumnLines: showColumnLines
            })
        }
        if (field.groupName) {
            $fieldElement.attr(ATTRIBUTES.itemGroup, field.groupName)
        }
        return $fieldElement
    }
    _clean(value) {}
    _render() {
        super._render();
        this._headerFilterView.render(this.$element())
    }
    renderSortable() {
        const that = this;
        that._createComponent(that.$element(), Sortable, extend({
            allowDragging: that.option("allowFieldDragging"),
            itemSelector: `.${CLASSES.area.field}`,
            itemContainerSelector: `.${CLASSES.area.fieldContainer}`,
            groupSelector: `.${CLASSES.area.fieldList}`,
            groupFilter() {
                const dataSource = that._dataSource;
                const $sortable = $(this).closest(".dx-sortable-old");
                const pivotGrid = $sortable.data("dxPivotGrid");
                const pivotGridFieldChooser = $sortable.data("dxPivotGridFieldChooser");
                if (pivotGrid) {
                    return pivotGrid.getDataSource() === dataSource
                }
                if (pivotGridFieldChooser) {
                    return pivotGridFieldChooser.option("dataSource") === dataSource
                }
                return false
            },
            itemRender: dragAndDropItemRender,
            onDragging(e) {
                const field = e.sourceElement.data("field");
                const {
                    targetGroup: targetGroup
                } = e;
                e.cancel = false;
                if (true === field.isMeasure) {
                    if ("column" === targetGroup || "row" === targetGroup || "filter" === targetGroup) {
                        e.cancel = true
                    }
                } else if (false === field.isMeasure && "data" === targetGroup) {
                    e.cancel = true
                }
            },
            useIndicator: true,
            onChanged(e) {
                const field = e.sourceElement.data("field");
                e.removeSourceElement = !!e.sourceGroup;
                that._adjustSortableOnChangedArgs(e);
                if (field) {
                    const {
                        targetIndex: targetIndex
                    } = e;
                    let mainGroupField;
                    let invisibleFieldsIndexOffset = 0;
                    that._processDemandState((dataSource => {
                        const fields = dataSource.getAreaFields(field.area, true);
                        mainGroupField = getMainGroupField(dataSource, field);
                        const visibleFields = fields.filter((f => false !== f.visible));
                        const fieldBeforeTarget = visibleFields[targetIndex - 1];
                        if (fieldBeforeTarget) {
                            invisibleFieldsIndexOffset = fields.filter((f => false === f.visible && f.areaIndex <= fieldBeforeTarget.areaIndex)).length
                        }
                    }));
                    that._applyChanges([mainGroupField], {
                        area: e.targetGroup,
                        areaIndex: targetIndex + invisibleFieldsIndexOffset
                    })
                }
            }
        }, that._getSortableOptions()))
    }
    _processDemandState(func) {
        const that = this;
        const isInstantlyMode = "instantly" === that.option("applyChangesMode");
        const dataSource = that._dataSource;
        if (isInstantlyMode) {
            func(dataSource, isInstantlyMode)
        } else {
            const currentState = dataSource.state();
            const pivotGridState = that.option("state");
            if (pivotGridState) {
                dataSource.state(pivotGridState, true)
            }
            func(dataSource, isInstantlyMode);
            dataSource.state(currentState, true)
        }
    }
    _applyChanges(fields, props) {
        const that = this;
        that._processDemandState(((dataSource, isInstantlyMode) => {
            fields.forEach((_ref => {
                let {
                    index: index
                } = _ref;
                dataSource.field(index, props)
            }));
            if (isInstantlyMode) {
                dataSource.load()
            } else {
                that._changedHandler()
            }
        }))
    }
    _applyLocalSortChanges(fieldIdx, sortOrder) {
        this._processDemandState((dataSource => {
            dataSource.field(fieldIdx, {
                sortOrder: sortOrder
            });
            dataSource.sortLocal()
        }))
    }
    _adjustSortableOnChangedArgs(e) {
        e.removeSourceElement = false;
        e.removeTargetElement = true;
        e.removeSourceClass = false
    }
    _getSortableOptions() {
        return {
            direction: "auto"
        }
    }
    subscribeToEvents(element) {
        const that = this;
        const func = function(e) {
            const field = $(e.currentTarget).data("field");
            const mainGroupField = extend(true, {}, getMainGroupField(that._dataSource, field));
            const isHeaderFilter = $(e.target).hasClass(CLASSES.headerFilter);
            const dataSource = that._dataSource;
            const type = mainGroupField.groupName ? "tree" : "list";
            const paginate = dataSource.paginate() && "list" === type;
            if (isHeaderFilter) {
                that._headerFilterView.showHeaderFilterMenu($(e.currentTarget), extend(mainGroupField, {
                    type: type,
                    encodeHtml: that.option("encodeHtml"),
                    dataSource: {
                        useDefaultSearch: !paginate,
                        load(options) {
                            const {
                                userData: userData
                            } = options;
                            if (userData.store) {
                                return userData.store.load(options)
                            }
                            const d = new Deferred;
                            dataSource.getFieldValues(mainGroupField.index, that.option("headerFilter.showRelevantValues"), paginate ? options : void 0).done((data => {
                                const emptyValue = that.option("headerFilter.texts.emptyValue");
                                data.forEach((element => {
                                    if (!element.text) {
                                        element.text = emptyValue
                                    }
                                }));
                                if (paginate) {
                                    d.resolve(data)
                                } else {
                                    userData.store = new ArrayStore(data);
                                    userData.store.load(options).done(d.resolve).fail(d.reject)
                                }
                            })).fail(d.reject);
                            return d
                        },
                        postProcess(data) {
                            processItems(data, mainGroupField);
                            return data
                        }
                    },
                    apply() {
                        that._applyChanges([mainGroupField], {
                            filterValues: this.filterValues,
                            filterType: this.filterType
                        })
                    }
                }))
            } else if (field.allowSorting && "data" !== field.area) {
                const isRemoteSort = that.option("remoteSort");
                const sortOrder = reverseSortOrder(field.sortOrder);
                if (isRemoteSort) {
                    that._applyChanges([field], {
                        sortOrder: sortOrder
                    })
                } else {
                    that._applyLocalSortChanges(field.index, sortOrder)
                }
            }
        };
        if (element) {
            eventsEngine.on(element, clickEventName, `.${CLASSES.area.field}.${CLASSES.area.box}`, func);
            return
        }
        eventsEngine.on(that.$element(), clickEventName, `.${CLASSES.area.field}.${CLASSES.area.box}`, func)
    }
    _initTemplates() {}
    addWidgetPrefix(className) {
        return `dx-pivotgrid-${className}`
    }
}
registerComponent("dxPivotGridFieldChooserBase", FieldChooserBase);
export default {
    FieldChooserBase: FieldChooserBase
};
