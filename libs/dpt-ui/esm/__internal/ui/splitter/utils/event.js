/**
 * DevExtreme (esm/__internal/ui/splitter/utils/event.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    camelize
} from "../../../../core/utils/inflector";
export function getActionNameByEventName(eventName) {
    return `_${camelize(eventName.replace("on",""))}Action`
}
export const RESIZE_EVENT = {
    onResize: "onResize",
    onResizeStart: "onResizeStart",
    onResizeEnd: "onResizeEnd"
};
export const COLLAPSE_EVENT = {
    onCollapsePrev: "onCollapsePrev",
    onCollapseNext: "onCollapseNext"
};
export const ITEM_COLLAPSED_EVENT = "onItemCollapsed";
export const ITEM_EXPANDED_EVENT = "onItemExpanded";
