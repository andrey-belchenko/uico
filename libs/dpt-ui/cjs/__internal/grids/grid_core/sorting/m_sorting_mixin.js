/**
 * DevExtreme (cjs/__internal/grids/grid_core/sorting/m_sorting_mixin.js)
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
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../localization/message"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const SORT_CLASS = "dx-sort";
const SORT_NONE_CLASS = "dx-sort-none";
const SORTUP_CLASS = "dx-sort-up";
const SORTDOWN_CLASS = "dx-sort-down";
const SORT_INDEX_CLASS = "dx-sort-index";
const SORT_INDEX_ICON_CLASS = "dx-sort-index-icon";
const HEADERS_ACTION_CLASS = "action";
const sortingMixin = Base => class extends Base {
    _applyColumnState(options) {
        const that = this;
        let ariaSortState;
        let $sortIndicator;
        const sortingMode = that.option("sorting.mode");
        const {
            rootElement: rootElement
        } = options;
        const {
            column: column
        } = options;
        const $indicatorsContainer = that._getIndicatorContainer(rootElement);
        if ("sort" === options.name) {
            rootElement.find(".dx-sort").remove();
            !$indicatorsContainer.children().length && $indicatorsContainer.remove();
            const isSortingAllowed = "none" !== sortingMode && column.allowSorting;
            const hasSeveralSortIndexes = that.getController && !!that.getController("columns").columnOption("sortIndex:1");
            if (!(0, _type.isDefined)(column.groupIndex) && (isSortingAllowed || (0, _type.isDefined)(column.sortOrder))) {
                ariaSortState = "asc" === column.sortOrder ? "ascending" : "descending";
                $sortIndicator = super._applyColumnState(options).toggleClass("dx-sort-up", "asc" === column.sortOrder).toggleClass("dx-sort-down", "desc" === column.sortOrder);
                if (hasSeveralSortIndexes && that.option("sorting.showSortIndexes") && column.sortIndex >= 0) {
                    (0, _renderer.default)("<span>").addClass("dx-sort-index-icon").text(column.sortIndex + 1).appendTo($sortIndicator);
                    $sortIndicator.addClass("dx-sort-index")
                }
                if (isSortingAllowed) {
                    options.rootElement.addClass(that.addWidgetPrefix("action"))
                }
            }
            this._setAriaSortAttribute(column, ariaSortState, rootElement, hasSeveralSortIndexes);
            return $sortIndicator
        }
        return super._applyColumnState(options)
    }
    _setAriaSortAttribute(column, ariaSortState, $rootElement, hasSeveralSortIndexes) {
        $rootElement.removeAttr("aria-roledescription");
        if (column.isGrouped) {
            let description = this.localize("dxDataGrid-ariaNotSortedColumn");
            if ((0, _type.isDefined)(column.sortOrder)) {
                description = "asc" === column.sortOrder ? this.localize("dxDataGrid-ariaSortedAscendingColumn") : this.localize("dxDataGrid-ariaSortedDescendingColumn")
            }
            this.setAria("roledescription", description, $rootElement)
        } else if (!(0, _type.isDefined)(column.sortOrder)) {
            this.setAria("sort", "none", $rootElement)
        } else {
            this.setAria("sort", ariaSortState, $rootElement);
            if (hasSeveralSortIndexes && column.sortIndex >= 0) {
                const ariaColumnHeader = _message.default.format("dxDataGrid-ariaColumnHeader");
                const ariaSortIndex = _message.default.format("dxDataGrid-ariaSortIndex", column.sortIndex + 1);
                const description = `${ariaColumnHeader}, ${ariaSortIndex}`;
                this.setAria("roledescription", description, $rootElement)
            }
        }
    }
    _getIndicatorClassName(name) {
        if ("sort" === name) {
            return "dx-sort"
        }
        if ("sortIndex" === name) {
            return "dx-sort-index-icon"
        }
        return super._getIndicatorClassName(name)
    }
    _renderIndicator(options) {
        const {
            column: column
        } = options;
        const $container = options.container;
        const $indicator = options.indicator;
        if ("sort" === options.name) {
            const rtlEnabled = this.option("rtlEnabled");
            if (!(0, _type.isDefined)(column.sortOrder)) {
                $indicator && $indicator.addClass("dx-sort-none")
            }
            if ($container.children().length && (!rtlEnabled && "left" === options.columnAlignment || rtlEnabled && "right" === options.columnAlignment)) {
                $container.prepend($indicator);
                return
            }
        }
        super._renderIndicator(options)
    }
    _updateIndicator($cell, column, indicatorName) {
        if ("sort" === indicatorName && (0, _type.isDefined)(column.groupIndex)) {
            return
        }
        return super._updateIndicator.apply(this, arguments)
    }
    _getIndicatorElements($cell, returnAll) {
        const $indicatorElements = super._getIndicatorElements($cell);
        return returnAll ? $indicatorElements : $indicatorElements && $indicatorElements.not(".dx-sort-none")
    }
};
var _default = exports.default = sortingMixin;
