/**
 * DevExtreme (cjs/__internal/grids/grid_core/column_state_mixin/m_column_state_mixin.js)
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
exports.default = exports.ColumnStateMixin = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _position = require("../../../../core/utils/position");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const COLUMN_INDICATORS_CLASS = "dx-column-indicators";
const GROUP_PANEL_ITEM_CLASS = "dx-group-panel-item";
const ColumnStateMixin = Base => class extends Base {
    _applyColumnState(options) {
        var _that$component;
        const rtlEnabled = this.option("rtlEnabled");
        const columnAlignment = this._getColumnAlignment(options.column.alignment, rtlEnabled);
        const parameters = (0, _extend.extend)(true, {
            columnAlignment: columnAlignment
        }, options);
        const isGroupPanelItem = parameters.rootElement.hasClass("dx-group-panel-item");
        const $indicatorsContainer = this._createIndicatorContainer(parameters, isGroupPanelItem);
        const $span = (0, _renderer.default)("<span>").addClass(this._getIndicatorClassName(options.name));
        const columnsController = null === (_that$component = this.component) || void 0 === _that$component ? void 0 : _that$component.getController("columns");
        const indicatorAlignment = (null === columnsController || void 0 === columnsController ? void 0 : columnsController.getHeaderContentAlignment(columnAlignment)) || columnAlignment;
        parameters.container = $indicatorsContainer;
        parameters.indicator = $span;
        this._renderIndicator(parameters);
        $indicatorsContainer[(isGroupPanelItem || !options.showColumnLines) && "left" === indicatorAlignment ? "appendTo" : "prependTo"](options.rootElement);
        return $span
    }
    _getIndicatorClassName(name) {}
    _getColumnAlignment(alignment, rtlEnabled) {
        rtlEnabled = rtlEnabled || this.option("rtlEnabled");
        return alignment && "center" !== alignment ? alignment : (0, _position.getDefaultAlignment)(rtlEnabled)
    }
    _createIndicatorContainer(options, ignoreIndicatorAlignment) {
        let $indicatorsContainer = this._getIndicatorContainer(options.rootElement);
        const indicatorAlignment = "left" === options.columnAlignment ? "right" : "left";
        if (!$indicatorsContainer.length) {
            $indicatorsContainer = (0, _renderer.default)("<div>").addClass("dx-column-indicators")
        }
        this.setAria("role", "presentation", $indicatorsContainer);
        return $indicatorsContainer.css("float", options.showColumnLines && !ignoreIndicatorAlignment ? indicatorAlignment : null)
    }
    _getIndicatorContainer($cell) {
        return $cell && $cell.find(".dx-column-indicators")
    }
    _getIndicatorElements($cell) {
        const $indicatorContainer = this._getIndicatorContainer($cell);
        return $indicatorContainer && $indicatorContainer.children()
    }
    _renderIndicator(options) {
        const $container = options.container;
        const $indicator = options.indicator;
        $container && $indicator && $container.append($indicator)
    }
    _updateIndicators(indicatorName) {
        const that = this;
        const columns = that.getColumns();
        const $cells = that.getColumnElements();
        let $cell;
        if (!$cells || columns.length !== $cells.length) {
            return
        }
        for (let i = 0; i < columns.length; i++) {
            $cell = $cells.eq(i);
            that._updateIndicator($cell, columns[i], indicatorName);
            const rowOptions = $cell.parent().data("options");
            if (rowOptions && rowOptions.cells) {
                rowOptions.cells[$cell.index()].column = columns[i]
            }
        }
    }
    _updateIndicator($cell, column, indicatorName) {
        if (!column.command) {
            return this._applyColumnState({
                name: indicatorName,
                rootElement: $cell,
                column: column,
                showColumnLines: this.option("showColumnLines")
            })
        }
        return
    }
};
exports.ColumnStateMixin = ColumnStateMixin;
var _default = exports.default = ColumnStateMixin;
