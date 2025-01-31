/**
 * DevExtreme (esm/__internal/grids/tree_list/m_core.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import modules from "../../grids/grid_core/m_modules";
export default extend({}, modules, {
    modules: [],
    foreachNodes(nodes, callBack, ignoreHasChildren) {
        for (let i = 0; i < nodes.length; i++) {
            if (false !== callBack(nodes[i]) && (ignoreHasChildren || nodes[i].hasChildren) && nodes[i].children.length) {
                this.foreachNodes(nodes[i].children, callBack, ignoreHasChildren)
            }
        }
    }
});
