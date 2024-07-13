/**
 * DevExtreme (esm/__internal/grids/grid_core/filter/m_filter_panel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    Deferred,
    when
} from "../../../../core/utils/deferred";
import {
    captionize
} from "../../../../core/utils/inflector";
import {
    isDefined
} from "../../../../core/utils/type";
import eventsEngine from "../../../../events/core/events_engine";
import messageLocalization from "../../../../localization/message";
import CheckBox from "../../../../ui/check_box";
import {
    getCaptionByOperation,
    getCurrentLookupValueText,
    getCurrentValueText,
    getCustomOperation,
    getField,
    getGroupValue,
    isCondition,
    isGroup
} from "../../../filter_builder/m_utils";
import {
    registerKeyboardAction
} from "../m_accessibility";
import modules from "../m_modules";
import gridUtils from "../m_utils";
const FILTER_PANEL_CLASS = "filter-panel";
const FILTER_PANEL_TEXT_CLASS = "filter-panel-text";
const FILTER_PANEL_CHECKBOX_CLASS = "filter-panel-checkbox";
const FILTER_PANEL_CLEAR_FILTER_CLASS = "filter-panel-clear-filter";
const FILTER_PANEL_LEFT_CONTAINER = "filter-panel-left";
const FILTER_PANEL_TARGET = "filterPanel";
export class FilterPanelView extends modules.View {
    init() {
        this._dataController = this.getController("data");
        this._columnsController = this.getController("columns");
        this._filterSyncController = this.getController("filterSync");
        this._dataController.dataSourceChanged.add((() => this.render()))
    }
    isVisible() {
        return this.option("filterPanel.visible") && this._dataController.dataSource()
    }
    _renderCore() {
        const $element = this.element();
        $element.empty();
        const isColumnsDefined = !!this._columnsController.getColumns().length;
        if (!isColumnsDefined) {
            return
        }
        $element.addClass(this.addWidgetPrefix("filter-panel"));
        const $leftContainer = $("<div>").addClass(this.addWidgetPrefix("filter-panel-left")).appendTo($element);
        this._renderFilterBuilderText($element, $leftContainer)
    }
    _renderFilterBuilderText($element, $leftContainer) {
        const $filterElement = this._getFilterElement();
        const $textElement = this._getTextElement();
        if (this.option("filterValue") || this._filterValueBuffer) {
            const $checkElement = this._getCheckElement();
            const $removeButtonElement = this._getRemoveButtonElement();
            $leftContainer.append($checkElement).append($filterElement).append($textElement);
            $element.append($removeButtonElement);
            return
        }
        $leftContainer.append($filterElement).append($textElement)
    }
    _getCheckElement() {
        const that = this;
        const $element = $("<div>").addClass(this.addWidgetPrefix("filter-panel-checkbox"));
        that._createComponent($element, CheckBox, {
            value: that.option("filterPanel.filterEnabled"),
            onValueChanged(e) {
                that.option("filterPanel.filterEnabled", e.value)
            }
        });
        $element.attr("title", this.option("filterPanel.texts.filterEnabledHint"));
        return $element
    }
    _getFilterElement() {
        const that = this;
        const $element = $("<div>").addClass("dx-icon-filter");
        eventsEngine.on($element, "click", (() => that._showFilterBuilder()));
        registerKeyboardAction("filterPanel", that, $element, void 0, (() => that._showFilterBuilder()));
        that._addTabIndexToElement($element);
        return $element
    }
    _getTextElement() {
        const that = this;
        const $textElement = $("<div>").addClass(that.addWidgetPrefix("filter-panel-text"));
        let filterText;
        const filterValue = that.option("filterValue");
        if (filterValue) {
            when(that.getFilterText(filterValue, this._filterSyncController.getCustomFilterOperations())).done((filterText => {
                const customizeText = that.option("filterPanel.customizeText");
                if (customizeText) {
                    const customText = customizeText({
                        component: that.component,
                        filterValue: filterValue,
                        text: filterText
                    });
                    if ("string" === typeof customText) {
                        filterText = customText
                    }
                }
                $textElement.text(filterText)
            }))
        } else {
            filterText = that.option("filterPanel.texts.createFilter");
            $textElement.text(filterText)
        }
        eventsEngine.on($textElement, "click", (() => that._showFilterBuilder()));
        registerKeyboardAction("filterPanel", that, $textElement, void 0, (() => that._showFilterBuilder()));
        that._addTabIndexToElement($textElement);
        return $textElement
    }
    _showFilterBuilder() {
        this.option("filterBuilderPopup.visible", true)
    }
    _getRemoveButtonElement() {
        const that = this;
        const clearFilterValue = () => that.option("filterValue", null);
        const $element = $("<div>").addClass(that.addWidgetPrefix("filter-panel-clear-filter")).text(that.option("filterPanel.texts.clearFilter"));
        eventsEngine.on($element, "click", clearFilterValue);
        registerKeyboardAction("filterPanel", this, $element, void 0, clearFilterValue);
        that._addTabIndexToElement($element);
        return $element
    }
    _addTabIndexToElement($element) {
        if (!this.option("useLegacyKeyboardNavigation")) {
            const tabindex = this.option("tabindex") || 0;
            $element.attr("tabindex", tabindex)
        }
    }
    optionChanged(args) {
        switch (args.name) {
            case "filterValue":
                this._invalidate();
                this.option("filterPanel.filterEnabled", true);
                args.handled = true;
                break;
            case "filterPanel":
                this._invalidate();
                args.handled = true;
                break;
            default:
                super.optionChanged(args)
        }
    }
    _getConditionText(fieldText, operationText, valueText) {
        let result = `[${fieldText}] ${operationText}`;
        if (isDefined(valueText)) {
            result += valueText
        }
        return result
    }
    _getValueMaskedText(value) {
        return Array.isArray(value) ? `('${value.join("', '")}')` : ` '${value}'`
    }
    _getValueText(field, customOperation, value) {
        const deferred = new Deferred;
        const hasCustomOperation = customOperation && customOperation.customizeText;
        if (isDefined(value) || hasCustomOperation) {
            if (!hasCustomOperation && field.lookup) {
                getCurrentLookupValueText(field, value, (data => {
                    deferred.resolve(this._getValueMaskedText(data))
                }))
            } else {
                const displayValue = Array.isArray(value) ? value : gridUtils.getDisplayValue(field, value, null);
                when(getCurrentValueText(field, displayValue, customOperation, "filterPanel")).done((data => {
                    deferred.resolve(this._getValueMaskedText(data))
                }))
            }
        } else {
            deferred.resolve("")
        }
        return deferred.promise()
    }
    getConditionText(filterValue, options) {
        const that = this;
        const operation = filterValue[1];
        const deferred = new Deferred;
        const customOperation = getCustomOperation(options.customOperations, operation);
        let operationText;
        const field = getField(filterValue[0], options.columns);
        const fieldText = field.caption || "";
        const value = filterValue[2];
        if (customOperation) {
            operationText = customOperation.caption || captionize(customOperation.name)
        } else if (null === value) {
            operationText = getCaptionByOperation("=" === operation ? "isblank" : "isnotblank", options.filterOperationDescriptions)
        } else {
            operationText = getCaptionByOperation(operation, options.filterOperationDescriptions)
        }
        this._getValueText(field, customOperation, value).done((valueText => {
            deferred.resolve(that._getConditionText(fieldText, operationText, valueText))
        }));
        return deferred
    }
    getGroupText(filterValue, options, isInnerGroup) {
        const that = this;
        const result = new Deferred;
        const textParts = [];
        const groupValue = getGroupValue(filterValue);
        filterValue.forEach((item => {
            if (isCondition(item)) {
                textParts.push(that.getConditionText(item, options))
            } else if (isGroup(item)) {
                textParts.push(that.getGroupText(item, options, true))
            }
        }));
        when.apply(this, textParts).done((function() {
            let text;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            if (groupValue.startsWith("!")) {
                const groupText = options.groupOperationDescriptions[`not${groupValue.substring(1,2).toUpperCase()}${groupValue.substring(2)}`].split(" ");
                text = `${groupText[0]} ${args[0]}`
            } else {
                text = args.join(` ${options.groupOperationDescriptions[groupValue]} `)
            }
            if (isInnerGroup) {
                text = `(${text})`
            }
            result.resolve(text)
        }));
        return result
    }
    getFilterText(filterValue, customOperations) {
        const options = {
            customOperations: customOperations,
            columns: this._columnsController.getFilteringColumns(),
            filterOperationDescriptions: this.option("filterBuilder.filterOperationDescriptions"),
            groupOperationDescriptions: this.option("filterBuilder.groupOperationDescriptions")
        };
        return isCondition(filterValue) ? this.getConditionText(filterValue, options) : this.getGroupText(filterValue, options)
    }
}
const data = Base => class extends Base {
    optionChanged(args) {
        if ("filterPanel" === args.name) {
            this._applyFilter();
            args.handled = true
        } else {
            super.optionChanged(args)
        }
    }
};
export const filterPanelModule = {
    defaultOptions: () => ({
        filterPanel: {
            visible: false,
            filterEnabled: true,
            texts: {
                createFilter: messageLocalization.format("dxDataGrid-filterPanelCreateFilter"),
                clearFilter: messageLocalization.format("dxDataGrid-filterPanelClearFilter"),
                filterEnabledHint: messageLocalization.format("dxDataGrid-filterPanelFilterEnabledHint")
            }
        }
    }),
    views: {
        filterPanelView: FilterPanelView
    },
    extenders: {
        controllers: {
            data: data
        }
    }
};
