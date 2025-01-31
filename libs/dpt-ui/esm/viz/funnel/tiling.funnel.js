/**
 * DevExtreme (esm/viz/funnel/tiling.funnel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const CENTER = .5;
export default {
    getFigures: function(data) {
        const height = 1 / data.length;
        return data.map((function(value, index, array) {
            const nextValue = array[index + 1] ? array[index + 1] : array[index];
            return [.5 - value / 2, height * index, .5 + value / 2, height * index, .5 + nextValue / 2, height * (index + 1), .5 - nextValue / 2, height * (index + 1)]
        }))
    },
    normalizeValues: function(items) {
        const max = items.reduce((function(max, item) {
            return Math.max(item.value, max)
        }), items[0] && items[0].value || 0);
        return items.map((function(item) {
            return item.value / max
        }))
    }
};
