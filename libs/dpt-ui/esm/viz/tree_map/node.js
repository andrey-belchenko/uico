/**
 * DevExtreme (esm/viz/tree_map/node.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend as _extend
} from "../../core/utils/extend";

function Node() {}
const updateTile = [updateLeaf, updateGroup];
_extend(Node.prototype, {
    value: 0,
    isNode: function() {
        return !!(this.nodes && this.level < this.ctx.maxLevel)
    },
    isActive: function() {
        const ctx = this.ctx;
        return this.level >= ctx.minLevel && this.level <= ctx.maxLevel
    },
    updateStyles: function() {
        const isNode = Number(this.isNode());
        this.state = this._buildState(this.ctx.settings[isNode].state, !isNode && this.color && {
            fill: this.color
        })
    },
    _buildState: function(state, extra) {
        const base = _extend({}, state);
        return extra ? _extend(base, extra) : base
    },
    updateLabelStyle: function() {
        const settings = this.ctx.settings[Number(this.isNode())];
        this.labelState = settings.labelState;
        this.labelParams = settings.labelParams
    },
    _getState: function() {
        return this.state
    },
    applyState: function() {
        updateTile[Number(this.isNode())](this.tile, this._getState())
    }
});

function updateLeaf(content, attrs) {
    content.smartAttr(attrs)
}

function updateGroup(content, attrs) {
    content.outer.attr({
        stroke: attrs.stroke,
        "stroke-width": attrs["stroke-width"],
        "stroke-opacity": attrs["stroke-opacity"]
    });
    content.inner.smartAttr({
        fill: attrs.fill,
        opacity: attrs.opacity,
        hatching: attrs.hatching
    })
}
export default Node;
