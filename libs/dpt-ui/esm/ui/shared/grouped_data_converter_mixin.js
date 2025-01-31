/**
 * DevExtreme (esm/ui/shared/grouped_data_converter_mixin.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isObject
} from "../../core/utils/type";
const isCorrectStructure = data => Array.isArray(data) && data.every((item => {
    const hasTwoFields = 2 === Object.keys(item).length;
    const hasCorrectFields = "key" in item && "items" in item;
    return hasTwoFields && hasCorrectFields && Array.isArray(item.items)
}));
export default {
    _getSpecificDataSourceOption: function() {
        let dataSource = this.option("dataSource");
        let hasSimpleItems = false;
        let data = {};
        if (this._getGroupedOption() && isCorrectStructure(dataSource)) {
            data = dataSource.reduce(((accumulator, item) => {
                const items = item.items.map((innerItem => {
                    if (!isObject(innerItem)) {
                        innerItem = {
                            text: innerItem
                        };
                        hasSimpleItems = true
                    }
                    if (!("key" in innerItem)) {
                        innerItem.key = item.key
                    }
                    return innerItem
                }));
                return accumulator.concat(items)
            }), []);
            dataSource = {
                store: {
                    type: "array",
                    data: data
                },
                group: {
                    selector: "key",
                    keepInitialKeyOrder: true
                }
            };
            if (hasSimpleItems) {
                dataSource.searchExpr = "text"
            }
        }
        return dataSource
    }
};
