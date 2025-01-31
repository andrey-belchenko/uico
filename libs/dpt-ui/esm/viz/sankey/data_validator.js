/**
 * DevExtreme (esm/viz/sankey/data_validator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import graphModule from "./graph";
const validator = {
    validate: function(data, incidentOccurred) {
        let result = null;
        if (this._hasCycle(data)) {
            result = "E2006";
            incidentOccurred("E2006")
        }
        return result
    },
    _hasCycle: function(data) {
        return graphModule.struct.hasCycle(data)
    }
};
export default validator;
