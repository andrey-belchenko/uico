/**
 * DevExtreme (esm/common/data/custom-store.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
function isGroupItem(item) {
    if (void 0 === item || null === item || "object" !== typeof item) {
        return false
    }
    return "key" in item && "items" in item
}
export function isLoadResultObject(res) {
    return !Array.isArray(res) && "data" in res
}
export function isGroupItemsArray(res) {
    return Array.isArray(res) && !!res.length && isGroupItem(res[0])
}
export function isItemsArray(res) {
    return Array.isArray(res) && !isGroupItem(res[0])
}
