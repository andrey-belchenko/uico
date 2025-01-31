/**
 * DevExtreme (renovation/component_wrapper/grid_pager.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.GridPagerWrapper = void 0;
var _component = _interopRequireDefault(require("./common/component"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class GridPagerWrapper extends _component.default {
    _optionChanged(args) {
        switch (args.name) {
            case "pageIndex": {
                const pageIndexChanged = this.option("pageIndexChanged");
                if (pageIndexChanged) {
                    pageIndexChanged(args.value)
                }
                break
            }
            case "pageSize": {
                const pageSizeChanged = this.option("pageSizeChanged");
                if (pageSizeChanged) {
                    pageSizeChanged(args.value)
                }
                break
            }
        }
        super._optionChanged(args)
    }
}
exports.GridPagerWrapper = GridPagerWrapper;
