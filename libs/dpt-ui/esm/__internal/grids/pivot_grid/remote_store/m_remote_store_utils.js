/**
 * DevExtreme (esm/__internal/grids/pivot_grid/remote_store/m_remote_store_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const forEachGroup = function(data, callback, level) {
    data = data || [];
    level = level || 0;
    for (let i = 0; i < data.length; i += 1) {
        const group = data[i];
        callback(group, level);
        if (group && group.items && group.items.length) {
            forEachGroup(group.items, callback, level + 1)
        }
    }
};
export default {
    forEachGroup: forEachGroup
};
export {
    forEachGroup
};
