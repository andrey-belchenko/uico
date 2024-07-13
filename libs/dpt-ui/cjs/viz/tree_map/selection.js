/**
 * DevExtreme (cjs/viz/tree_map/selection.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _tree_map = _interopRequireDefault(require("./tree_map.base"));
var _node = _interopRequireDefault(require("./node"));
var _helpers = require("../core/helpers");
var _common = require("./common");
var _utils = require("../core/utils");
require("./api");
require("./states");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const proto = _tree_map.default.prototype;
const nodeProto = _node.default.prototype;
const MODE_NONE = 0;
const MODE_SINGLE = 1;
const MODE_MULTIPLE = 2;
const STATE_CODE = 2;
proto._eventsMap.onSelectionChanged = {
    name: "selectionChanged"
};
(0, _helpers.expand)(proto._handlers, "calculateAdditionalStates", (function(states, options) {
    states[2] = options.selectionStyle ? (0, _common.buildRectAppearance)(options.selectionStyle) : {}
}));
nodeProto.statesMap[2] = nodeProto.statesMap[3] = 2;
nodeProto.additionalStates.push(2);
(0, _helpers.expand)(proto, "_onNodesCreated", (function() {
    this._selectionList.length = 0
}));
(0, _helpers.expand)(proto, "_extendProxyType", (function(proto) {
    const that = this;
    proto.select = function(state) {
        that._selectNode(this._id, !!state)
    };
    proto.isSelected = function() {
        return that._selectionList.includes(this._id)
    };
    that._selectionList = []
}));
_tree_map.default.addChange({
    code: "SELECTION_MODE",
    handler: function() {
        const that = this;
        const option = (0, _utils.normalizeEnum)(that._getOption("selectionMode", true));
        const selectionList = that._selectionList;
        let tmp;
        const mode = "none" === option ? 0 : "multiple" === option ? 2 : 1;
        if (1 === mode && selectionList.length > 1) {
            tmp = selectionList.pop();
            that.clearSelection();
            selectionList.push(tmp)
        } else if (0 === mode) {
            that.clearSelection()
        }
        that._selectionMode = mode
    },
    isThemeDependent: true,
    isOptionChange: true,
    option: "selectionMode"
});
(0, _helpers.expand)(proto, "_applyTilesAppearance", (function() {
    if (this._selectionList.length) {
        bringSelectedTilesToForeground(this._nodes, this._selectionList)
    }
}));
const tileToFront = [leafToFront, groupToFront];

function bringSelectedTilesToForeground(nodes, selectionList) {
    let i;
    const ii = selectionList.length;
    let node;
    for (i = 0; i < ii; ++i) {
        node = nodes[selectionList[i]];
        tileToFront[Number(node.isNode())](node.tile)
    }
}

function leafToFront(content) {
    content.toForeground()
}

function groupToFront(content) {
    content.outer.toForeground();
    content.inner.toForeground()
}
proto._applySelectionState = function(index, state) {
    const node = this._nodes[index];
    node.setState(2, state);
    this._eventTrigger("selectionChanged", {
        node: node.proxy
    })
};
proto._selectNode = function(index, state) {
    const that = this;
    let selectionList;
    let k;
    let tmp;
    if (0 !== that._selectionMode) {
        that._context.suspend();
        selectionList = that._selectionList;
        k = selectionList.indexOf(index);
        if (state && -1 === k) {
            if (1 === that._selectionMode) {
                if (selectionList.length) {
                    tmp = selectionList.pop();
                    that._applySelectionState(tmp, false)
                }
            }
            selectionList.push(index);
            that._applySelectionState(index, true)
        } else if (!state && k >= 0) {
            selectionList.splice(k, 1);
            that._applySelectionState(index, false)
        }
        that._context.resume()
    }
};
proto.clearSelection = function() {
    const that = this;
    const selectionList = that._selectionList;
    let i;
    const ii = selectionList.length;
    if (0 !== that._selectionMode) {
        that._context.suspend();
        for (i = 0; i < ii; ++i) {
            that._applySelectionState(selectionList[i], false)
        }
        selectionList.length = 0;
        that._context.resume()
    }
};
