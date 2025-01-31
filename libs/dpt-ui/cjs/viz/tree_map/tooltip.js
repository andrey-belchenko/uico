/**
 * DevExtreme (cjs/viz/tree_map/tooltip.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _helpers = require("../core/helpers");
var _tree_map = _interopRequireDefault(require("./tree_map.base"));
require("./api");
var _tooltip = require("../core/tooltip");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const proto = _tree_map.default.prototype;
(0, _helpers.expand)(proto, "_extendProxyType", (function(proto) {
    const that = this;
    proto.showTooltip = function(coords) {
        that._showTooltip(this._id, coords)
    }
}));
(0, _helpers.expand)(proto, "_onNodesCreated", (function() {
    if (this._tooltipIndex >= 0) {
        this._tooltip.hide()
    }
    this._tooltipIndex = -1
}));
(0, _helpers.expand)(proto, "_onTilingPerformed", (function() {
    if (this._tooltipIndex >= 0) {
        this._moveTooltip(this._nodes[this._tooltipIndex])
    }
}));

function getCoords(coords, rect, renderer) {
    const offset = renderer.getRootOffset();
    return coords || rect && [(rect[0] + rect[2]) / 2 + offset.left, (rect[1] + rect[3]) / 2 + offset.top] || [-1e3, -1e3]
}
proto._showTooltip = function(index, coords) {
    const that = this;
    const tooltip = that._tooltip;
    const node = that._nodes[index];
    if (that._tooltipIndex === index) {
        that._moveTooltip(node, coords);
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
    const xy = getCoords(coords, node.rect, this._renderer);
    callback(tooltip.show({
        value: node.value,
        valueText: tooltip.formatValue(node.value),
        node: node.proxy
    }, {
        x: xy[0],
        y: xy[1],
        offset: 0
    }, {
        node: node.proxy
    }, void 0, callback))
};
proto._moveTooltip = function(node, coords) {
    const xy = getCoords(coords, node.rect, this._renderer);
    this._tooltip.move(xy[0], xy[1], 0)
};
proto.hideTooltip = function() {
    if (this._tooltipIndex >= 0) {
        this._tooltipIndex = -1;
        this._tooltip.hide()
    }
};
_tree_map.default.addPlugin(_tooltip.plugin);
