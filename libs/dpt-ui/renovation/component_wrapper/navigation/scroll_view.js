/**
 * DevExtreme (renovation/component_wrapper/navigation/scroll_view.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.ScrollViewWrapper = void 0;
var _component = _interopRequireDefault(require("../common/component"));
var _deferred = require("../../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class ScrollViewWrapper extends _component.default {
    constructor(element, options) {
        super(element, options);
        this.updateAdditionalOptions()
    }
    update() {
        var _this$viewRef;
        null === (_this$viewRef = this.viewRef) || void 0 === _this$viewRef || _this$viewRef.updateHandler();
        return (0, _deferred.Deferred)().resolve()
    }
    release(preventScrollBottom) {
        this.viewRef.release(preventScrollBottom);
        return (0, _deferred.Deferred)().resolve()
    }
    _dimensionChanged() {
        var _this$viewRef2;
        null === (_this$viewRef2 = this.viewRef) || void 0 === _this$viewRef2 || _this$viewRef2.updateHandler()
    }
    isRenovated() {
        return !!_component.default.IS_RENOVATED_WIDGET
    }
    updateAdditionalOptions() {
        this.option("pullDownEnabled", this.hasActionSubscription("onPullDown"));
        this.option("reachBottomEnabled", this.hasActionSubscription("onReachBottom"))
    }
    on() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        const callBase = super.on.apply(this, args);
        this.updateAdditionalOptions();
        return callBase
    }
    _optionChanged(option) {
        const {
            name: name
        } = option;
        if ("useNative" === name) {
            this._isNodeReplaced = false
        }
        super._optionChanged(option);
        if ("onPullDown" === name || "onReachBottom" === name) {
            this.updateAdditionalOptions()
        }
    }
    _moveIsAllowed(event) {
        return this.viewRef.scrollableRef.current.scrollableRef.moveIsAllowed(event)
    }
}
exports.ScrollViewWrapper = ScrollViewWrapper;
