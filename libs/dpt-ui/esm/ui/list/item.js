/**
 * DevExtreme (esm/ui/list/item.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import CollectionWidgetItem from "../collection/item";
const LIST_ITEM_BADGE_CONTAINER_CLASS = "dx-list-item-badge-container";
const LIST_ITEM_BADGE_CLASS = "dx-list-item-badge";
const BADGE_CLASS = "dx-badge";
const LIST_ITEM_CHEVRON_CONTAINER_CLASS = "dx-list-item-chevron-container";
const LIST_ITEM_CHEVRON_CLASS = "dx-list-item-chevron";
const ListItem = CollectionWidgetItem.inherit({
    _renderWatchers: function() {
        this.callBase();
        this._startWatcher("badge", this._renderBadge.bind(this));
        this._startWatcher("showChevron", this._renderShowChevron.bind(this))
    },
    _renderBadge: function(badge) {
        this._$element.children(".dx-list-item-badge-container").remove();
        if (!badge) {
            return
        }
        const $badge = $("<div>").addClass("dx-list-item-badge-container").append($("<div>").addClass("dx-list-item-badge").addClass("dx-badge").text(badge));
        const $chevron = this._$element.children(".dx-list-item-chevron-container").first();
        $chevron.length > 0 ? $badge.insertBefore($chevron) : $badge.appendTo(this._$element)
    },
    _renderShowChevron: function(showChevron) {
        this._$element.children(".dx-list-item-chevron-container").remove();
        if (!showChevron) {
            return
        }
        const $chevronContainer = $("<div>").addClass("dx-list-item-chevron-container");
        const $chevron = $("<div>").addClass("dx-list-item-chevron");
        $chevronContainer.append($chevron).appendTo(this._$element)
    }
});
export default ListItem;
