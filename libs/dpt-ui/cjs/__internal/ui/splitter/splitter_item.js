/**
 * DevExtreme (cjs/__internal/ui/splitter/splitter_item.js)
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
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _item = _interopRequireDefault(require("../../../ui/collection/item"));
var _resize_handle = _interopRequireDefault(require("./resize_handle"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class SplitterItem extends _item.default {
    constructor($element, options, rawData) {
        super($element, options, rawData);
        this._owner = options.owner
    }
    _renderResizeHandle() {
        var _this$_rawData;
        if (false !== (null === (_this$_rawData = this._rawData) || void 0 === _this$_rawData ? void 0 : _this$_rawData.visible) && !this.isLast()) {
            const id = `dx_${new _guid.default}`;
            this._setIdAttr(id);
            const config = this._owner._getResizeHandleConfig(id);
            this._resizeHandle = this._owner._createComponent((0, _renderer.default)("<div>"), _resize_handle.default, config);
            if (this._resizeHandle && this._$element) {
                (0, _renderer.default)(this._resizeHandle.element()).insertAfter(this._$element)
            }
        }
    }
    _setIdAttr(id) {
        var _this$_$element;
        null === (_this$_$element = this._$element) || void 0 === _this$_$element || _this$_$element.attr("id", id)
    }
    getIndex() {
        return this._owner._getIndexByItemData(this._rawData)
    }
    getResizeHandle() {
        return this._resizeHandle
    }
    isLast() {
        return this._owner._isLastVisibleItem(this.getIndex())
    }
}
var _default = exports.default = SplitterItem;
