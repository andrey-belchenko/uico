/**
 * DevExtreme (esm/__internal/ui/m_tooltip.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../core/component_registrator";
import Guid from "../../core/guid";
import $ from "../../core/renderer";
import {
    extend
} from "../../core/utils/extend";
import {
    isWindow
} from "../../core/utils/type";
import Popover from "../../ui/popover/ui.popover";
const TOOLTIP_CLASS = "dx-tooltip";
const TOOLTIP_WRAPPER_CLASS = "dx-tooltip-wrapper";
const Tooltip = Popover.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            toolbarItems: [],
            showCloseButton: false,
            enableBodyScroll: true,
            showTitle: false,
            title: null,
            titleTemplate: null,
            onTitleRendered: null,
            bottomTemplate: null,
            preventScrollEvents: false,
            propagateOutsideClick: true
        })
    },
    _render() {
        this.$element().addClass("dx-tooltip");
        this.$wrapper().addClass("dx-tooltip-wrapper");
        this.callBase()
    },
    _renderContent() {
        this.callBase();
        this._toggleAriaAttributes()
    },
    _toggleAriaDescription(showing) {
        const $target = $(this.option("target"));
        const label = showing ? this._contentId : void 0;
        if (!isWindow($target.get(0))) {
            this.setAria("describedby", label, $target)
        }
    },
    _toggleAriaAttributes() {
        this._contentId = `dx-${new Guid}`;
        this.$overlayContent().attr({
            id: this._contentId
        });
        this._toggleAriaDescription(true)
    }
});
registerComponent("dxTooltip", Tooltip);
export default Tooltip;
