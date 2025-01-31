/**
 * DevExtreme (esm/viz/funnel/tooltip.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    noop
} from "../../core/utils/common";
import {
    plugin as pluginTooltip
} from "../core/tooltip";

function getCoords(coords, figureCoords, renderer) {
    const offset = renderer.getRootOffset();
    return coords || figureCoords && [(figureCoords[0] + figureCoords[2]) / 2 + offset.left, (figureCoords[1] + figureCoords[5]) / 2 + offset.top] || [-1e3, -1e3]
}
export const plugin = {
    name: "funnel-tooltip",
    init: noop,
    dispose: noop,
    extenders: {
        _buildNodes: function() {
            this.hideTooltip()
        },
        _change_TILING: function() {
            if (this._tooltipIndex >= 0) {
                this._moveTooltip(this._items[this._tooltipIndex])
            }
        }
    },
    members: {
        hideTooltip: function() {
            if (this._tooltipIndex >= 0) {
                this._tooltipIndex = -1;
                this._tooltip.hide()
            }
        },
        _moveTooltip: function(item, coords) {
            const xy = getCoords(coords, item.coords, this._renderer);
            this._tooltip.move(xy[0], xy[1], 0)
        },
        _showTooltip: function(index, coords) {
            const that = this;
            const tooltip = that._tooltip;
            const item = that._items[index];
            if (that._tooltipIndex === index) {
                that._moveTooltip(item, coords);
                return
            }
            const callback = result => {
                if (void 0 === result) {
                    return
                }
                if (!result) {
                    tooltip.hide()
                }
                that._tooltipIndex = result ? index : -1
            };
            const xy = getCoords(coords, item.coords, this._renderer);
            callback(tooltip.show({
                value: item.value,
                valueText: tooltip.formatValue(item.value),
                percentText: tooltip.formatValue(item.percent, "percent"),
                percent: item.percent,
                item: item
            }, {
                x: xy[0],
                y: xy[1],
                offset: 0
            }, {
                item: item
            }, void 0, callback))
        }
    },
    customize: function(constructor) {
        constructor.addPlugin(pluginTooltip)
    }
};
