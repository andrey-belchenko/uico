/**
 * DevExtreme (esm/__internal/grids/grid_core/m_export.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";

function prepareItems(items, emptyCell) {
    const defaultSetter = value => !value ? 1 : value;
    const resultItems = [];
    const cols = (items[0] || []).reduce(((sum, item) => sum + defaultSetter(item.colspan)), 0);
    const getItem = (items => {
        let rowIndex = 0;
        let cellIndex = 0;
        return () => {
            const row = items[rowIndex] || [];
            const item = row[cellIndex++];
            if (cellIndex >= row.length) {
                rowIndex++;
                cellIndex = 0
            }
            if (item) {
                item.colspan = defaultSetter(item.colspan);
                item.rowspan = defaultSetter(item.rowspan)
            }
            return item
        }
    })(items);
    const addItem = (rowIndex, cellIndex, item) => {
        const row = resultItems[rowIndex] = resultItems[rowIndex] || [];
        row[cellIndex] = item;
        if (item.colspan > 1 || item.rowspan > 1) {
            const clone = (item => extend({}, item, emptyCell))(item);
            for (let c = 1; c < item.colspan; c++) {
                addItem(rowIndex, cellIndex + c, clone)
            }
            for (let r = 1; r < item.rowspan; r++) {
                for (let c = 0; c < item.colspan; c++) {
                    addItem(rowIndex + r, cellIndex + c, clone)
                }
            }
        }
    };
    let item = getItem();
    let rowIndex = 0;
    while (item) {
        for (let cellIndex = 0; cellIndex < cols; cellIndex++) {
            if (!item) {
                break
            }
            if (resultItems[rowIndex] && resultItems[rowIndex][cellIndex]) {
                continue
            }
            addItem(rowIndex, cellIndex, item);
            cellIndex += item.colspan - 1;
            item = getItem()
        }
        rowIndex++
    }
    return resultItems
}
export {
    prepareItems
};
