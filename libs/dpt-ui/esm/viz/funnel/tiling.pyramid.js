/**
 * DevExtreme (esm/viz/funnel/tiling.pyramid.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const CENTER = .5;
const LEFTCORNER = 0;
const RIGHTCORNER = 1;
export default {
    getFigures: function(data, neckWidth, neckHeight) {
        let height = 0;
        let y = 0;
        let x = 0;
        let offsetX = 0;
        const halfNeckWidth = neckWidth / 2;
        const offsetFromCorner = .5 - halfNeckWidth;
        const funnelHeight = 1 - neckHeight;
        const neckLeftCorner = .5 - halfNeckWidth;
        const neckRightCorner = .5 + halfNeckWidth;
        return data.map((function(value) {
            x = offsetX;
            y = height;
            height += value;
            offsetX = offsetFromCorner * height / funnelHeight;
            if (y <= funnelHeight && height <= funnelHeight) {
                return [x, y, 1 - x, y, 1 - offsetX, height, 0 + offsetX, height]
            } else if (y <= funnelHeight && height > funnelHeight) {
                return [x, y, 1 - x, y, neckRightCorner, funnelHeight, neckRightCorner, height, neckLeftCorner, height, neckLeftCorner, funnelHeight]
            } else {
                return [neckLeftCorner, y, neckRightCorner, y, neckRightCorner, height, neckLeftCorner, height]
            }
        }))
    },
    normalizeValues: function(items) {
        const sum = items.reduce((function(sum, item) {
            return sum + item.value
        }), 0);
        return items.map((function(item) {
            return item.value / sum
        }))
    }
};
