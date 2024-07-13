/**
 * DevExtreme (esm/renovation/component_wrapper/navigation/scrollable.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Component from "../common/component";
import {
    Deferred
} from "../../../core/utils/deferred";
export class ScrollableWrapper extends Component {
    handleMove(event) {
        this.viewRef.scrollableRef.handleMove(event)
    }
    update() {
        var _this$viewRef;
        null === (_this$viewRef = this.viewRef) || void 0 === _this$viewRef || _this$viewRef.updateHandler();
        return Deferred().resolve()
    }
    isRenovated() {
        return !!Component.IS_RENOVATED_WIDGET
    }
    _visibilityChanged() {}
    _dimensionChanged() {
        var _this$viewRef2;
        null === (_this$viewRef2 = this.viewRef) || void 0 === _this$viewRef2 || _this$viewRef2.updateHandler()
    }
    $content() {
        return this.$element().find(".dx-scrollable-content").eq(0)
    }
    _moveIsAllowed(event) {
        return this.viewRef.scrollableRef.moveIsAllowed(event)
    }
    _prepareDirections(value) {
        this.viewRef.scrollableRef.prepareDirections(value)
    }
    _optionChanged(option) {
        const {
            name: name
        } = option;
        if ("useNative" === name) {
            this._isNodeReplaced = false
        }
        super._optionChanged(option)
    }
}
