/**
 * DevExtreme (esm/__internal/grids/grid_core/filter/m_filter_custom_operations.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    Deferred
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import {
    DataSource
} from "../../../../data/data_source/data_source";
import messageLocalization from "../../../../localization/message";
import errors from "../../../../ui/widget/ui.errors";
import {
    getFilterExpression,
    isCondition,
    isGroup,
    renderValueText
} from "../../../filter_builder/m_utils";

function baseOperation(grid) {
    const getFullText = function(itemText, parentText) {
        return parentText ? `${parentText}/${itemText}` : itemText
    };
    const getSelectedItemsTexts = function(items, parentText) {
        let result = [];
        items.forEach((item => {
            if (item.items) {
                const selectedItemsTexts = getSelectedItemsTexts(item.items, getFullText(item.text, parentText));
                result = result.concat(selectedItemsTexts)
            }
            item.selected && result.push(getFullText(item.text, parentText))
        }));
        return result
    };
    const headerFilterController = grid && grid.getController("headerFilter");
    return {
        dataTypes: ["string", "date", "datetime", "number", "boolean", "object"],
        calculateFilterExpression: function(filterValue, field, fields) {
            const result = [];
            const lastIndex = filterValue.length - 1;
            filterValue && filterValue.forEach(((value, index) => {
                if (isCondition(value) || isGroup(value)) {
                    const filterExpression = getFilterExpression(value, fields, [], "headerFilter");
                    result.push(filterExpression)
                } else {
                    const filterExpression = getFilterExpression([field.dataField, "=", value], fields, [], "headerFilter");
                    result.push(filterExpression)
                }
                index !== lastIndex && result.push("or")
            }));
            if (1 === result.length) {
                return result[0]
            }
            return result
        },
        editorTemplate(conditionInfo, container) {
            const div = $("<div>").addClass("dx-filterbuilder-item-value-text").appendTo(container);
            const column = extend(true, {}, grid.columnOption(conditionInfo.field.dataField));
            renderValueText(div, conditionInfo.text && conditionInfo.text.split("|"));
            column.filterType = "include";
            column.filterValues = conditionInfo.value ? conditionInfo.value.slice() : [];
            headerFilterController.showHeaderFilterMenuBase({
                columnElement: div,
                column: column,
                apply() {
                    value = this.filterValues, void conditionInfo.setValue(value);
                    var value;
                    headerFilterController.hideHeaderFilterMenu();
                    conditionInfo.closeEditor()
                },
                onHidden() {
                    conditionInfo.closeEditor()
                },
                isFilterBuilder: true
            });
            return container
        },
        customizeText: function(fieldInfo, options) {
            options = options || {};
            const {
                value: value
            } = fieldInfo;
            let column = grid.columnOption(fieldInfo.field.dataField);
            const headerFilter = column && column.headerFilter;
            const lookup = column && column.lookup;
            const values = options.values || [value];
            if (headerFilter && headerFilter.dataSource || lookup && lookup.dataSource) {
                const result = new Deferred;
                const itemsDeferred = options.items || new Deferred;
                if (!options.items) {
                    column = extend({}, column, {
                        filterType: "include",
                        filterValues: values
                    });
                    const dataSourceOptions = headerFilterController.getDataSource(column);
                    dataSourceOptions.paginate = false;
                    const dataSource = new DataSource(dataSourceOptions);
                    const key = dataSource.store().key();
                    if (key) {
                        const {
                            values: values
                        } = options;
                        if (values && values.length > 1) {
                            const filter = values.reduce(((result, value) => {
                                if (result.length) {
                                    result.push("or")
                                }
                                result.push([key, "=", value]);
                                return result
                            }), []);
                            dataSource.filter(filter)
                        } else {
                            dataSource.filter([key, "=", fieldInfo.value])
                        }
                    } else if (fieldInfo.field.calculateDisplayValue) {
                        errors.log("W1017")
                    }
                    options.items = itemsDeferred;
                    dataSource.load().done(itemsDeferred.resolve)
                }
                itemsDeferred.done((items => {
                    const index = values.indexOf(fieldInfo.value);
                    result.resolve(getSelectedItemsTexts(items, null)[index])
                }));
                return result
            }
            const text = headerFilterController.getHeaderItemText(value, column, 0, grid.option("headerFilter"));
            return text
        }
    }
}
export function anyOf(grid) {
    return extend(baseOperation(grid), {
        name: "anyof",
        icon: "selectall",
        caption: messageLocalization.format("dxFilterBuilder-filterOperationAnyOf")
    })
}
export function noneOf(grid) {
    const baseOp = baseOperation(grid);
    return extend({}, baseOp, {
        calculateFilterExpression(filterValue, field, fields) {
            const baseFilter = baseOp.calculateFilterExpression(filterValue, field, fields);
            if (!baseFilter || 0 === baseFilter.length) {
                return null
            }
            return "!" === baseFilter[0] ? baseFilter : ["!", baseFilter]
        },
        name: "noneof",
        icon: "unselectall",
        caption: messageLocalization.format("dxFilterBuilder-filterOperationNoneOf")
    })
}
